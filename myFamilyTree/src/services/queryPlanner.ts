/**
 * Query Planner - Chọn chiến lược thực thi
 * Sử dụng Ollama để generate SQL khi cần
 */

import { Intent } from "./nluService";
import { OllamaService } from "./ollamaService";

export type QueryStrategy = "bfs" | "sql" | "hybrid";

export interface QueryPlan {
  strategy: QueryStrategy;
  bfsQuery?: {
    personName?: string;
    relationType: string;
  };
  sqlQuery?: string;
  steps?: QueryStep[];
  postProcess?: (data: any) => any;
}

export interface QueryStep {
  action: "find_children" | "find_relative" | "select_nth" | "filter";
  params?: any;
}

export class QueryPlanner {
  private ollama: OllamaService;
  private sqlCache = new Map<string, string>();

  constructor() {
    this.ollama = new OllamaService();
  }

  /**
   * Plan query dựa trên intent
   */
  async planQuery(intent: Intent, dongHoId: string): Promise<QueryPlan> {
    console.log(`[Planner] Planning for type: ${intent.type}`);

    switch (intent.type) {
      case "find_relative":
        return this.planFindRelative(intent);

      case "list_members":
        return await this.planListMembers(intent, dongHoId);

      case "count":
        return await this.planCount(intent, dongHoId);

      case "complex_query":
        return await this.planComplex(intent, dongHoId);

      default:
        return { strategy: "bfs", bfsQuery: { relationType: "children" } };
    }
  }

  /**
   * Plan: Tìm người thân
   */
  private planFindRelative(intent: Intent): QueryPlan {
    const relation = intent.relation || "children";

    // Quan hệ đơn giản → BFS
    if (this.isSimpleRelation(relation)) {
      const plan: QueryPlan = {
        strategy: "bfs",
        bfsQuery: {
          personName: intent.person,
          relationType: relation
        }
      };

      // Thêm filter nếu có
      if (intent.filters?.gender) {
        plan.postProcess = this.buildGenderFilter(intent.filters.gender);
      }

      return plan;
    }

    // Quan hệ phức tạp → Hybrid
    return {
      strategy: "hybrid",
      bfsQuery: {
        personName: intent.person,
        relationType: relation
      },
      postProcess: this.buildComplexFilter(intent)
    };
  }

  /**
   * Plan: Liệt kê thành viên (dùng Ollama generate SQL)
   */
  private async planListMembers(intent: Intent, dongHoId: string): Promise<QueryPlan> {
    const filters = intent.filters || {};
    
    // Nếu query đơn giản, tự build SQL
    if (this.isSimpleListQuery(filters)) {
      return {
        strategy: "sql",
        sqlQuery: this.buildSimpleListSQL(filters, dongHoId)
      };
    }

    // Query phức tạp → Dùng Ollama Text-to-SQL
    try {
      const sql = await this.generateSQLWithOllama(intent, dongHoId);
      return {
        strategy: "sql",
        sqlQuery: sql
      };
    } catch (error) {
      console.warn("[Planner] Ollama SQL generation failed, using fallback");
      return {
        strategy: "sql",
        sqlQuery: this.buildSimpleListSQL(filters, dongHoId)
      };
    }
  }

  /**
   * Plan: Đếm số lượng (dùng Ollama nếu phức tạp)
   */
  private async planCount(intent: Intent, dongHoId: string): Promise<QueryPlan> {
    const filters = intent.filters || {};
    
    // Simple count
    if (this.isSimpleListQuery(filters)) {
      return {
        strategy: "sql",
        sqlQuery: this.buildSimpleCountSQL(filters, dongHoId)
      };
    }

    // Complex count → Ollama
    try {
      const sql = await this.generateSQLWithOllama(intent, dongHoId);
      return {
        strategy: "sql",
        sqlQuery: sql.replace("SELECT *", "SELECT COUNT(*) as total")
      };
    } catch (error) {
      return {
        strategy: "sql",
        sqlQuery: this.buildSimpleCountSQL(filters, dongHoId)
      };
    }
  }

  /**
   * Plan: Query phức tạp (Ollama Text-to-SQL)
   */
  private async planComplex(intent: Intent, dongHoId: string): Promise<QueryPlan> {
    // Thử dùng Ollama generate SQL
    try {
      const sql = await this.generateSQLWithOllama(intent, dongHoId);
      return {
        strategy: "sql",
        sqlQuery: sql
      };
    } catch (error) {
      console.warn("[Planner] Complex query fallback to BFS");
      
      // Fallback: Multi-step BFS
      if (intent.filters?.childOrder) {
        return {
          strategy: "hybrid",
          bfsQuery: {
            personName: intent.person,
            relationType: "children"
          },
          steps: [
            { action: "filter", params: { gender: intent.filters.gender } },
            { action: "select_nth", params: { n: intent.filters.childOrder } }
          ]
        };
      }

      return {
        strategy: "bfs",
        bfsQuery: {
          personName: intent.person,
          relationType: "children"
        }
      };
    }
  }

  /**
   * Generate SQL bằng Ollama (Text-to-SQL)
   */
  private async generateSQLWithOllama(intent: Intent, dongHoId: string): Promise<string> {
    const cacheKey = JSON.stringify(intent);
    
    // Check cache
    if (this.sqlCache.has(cacheKey)) {
      console.log("[Planner] SQL cache hit");
      return this.sqlCache.get(cacheKey)!;
    }

    const prompt = `Bạn là SQL expert cho database gia phả. Generate SQL query.

DATABASE SCHEMA:
Table: thanhvien
- thanhVienId (INT, PRIMARY KEY)
- dongHoId (VARCHAR)
- hoTen (VARCHAR, tên người)
- gioiTinh (INT, 0=Nữ, 1=Nam)
- doiThuoc (INT, số đời)
- chaId (INT, ID cha)
- meId (INT, ID mẹ)
- voId (INT, ID vợ)
- chongId (INT, ID chồng)
- ngaySinh (DATE)
- ngayMat (DATE)
- active_flag (INT, 1=active)

INTENT:
${JSON.stringify(intent, null, 2)}

RULES:
1. ALWAYS filter: dongHoId = '${dongHoId}' AND active_flag = 1
2. Return ONLY SQL query, no explanation
3. Use proper WHERE conditions
4. For gender: 0=Female, 1=Male

EXAMPLES:

Intent: {"type":"list_members","filters":{"generation":2}}
SQL: SELECT * FROM thanhvien WHERE dongHoId = '${dongHoId}' AND doiThuoc = 2 AND active_flag = 1;

Intent: {"type":"list_members","filters":{"generation":3,"gender":"M"}}
SQL: SELECT * FROM thanhvien WHERE dongHoId = '${dongHoId}' AND doiThuoc = 3 AND gioiTinh = 1 AND active_flag = 1;

Intent: {"type":"count","filters":{"generation":2}}
SQL: SELECT COUNT(*) as total FROM thanhvien WHERE dongHoId = '${dongHoId}' AND doiThuoc = 2 AND active_flag = 1;

Generate SQL:`;

    try {
      const response = await this.ollama.chat(prompt);
      const sql = this.extractSQL(response);
      
      // Cache result
      this.sqlCache.set(cacheKey, sql);
      
      console.log("[Planner] Generated SQL:", sql);
      return sql;
    } catch (error: any) {
      throw new Error(`Ollama SQL generation failed: ${error.message}`);
    }
  }

  /**
   * Extract SQL từ response
   */
  private extractSQL(text: string): string {
    // Remove markdown code blocks
    let sql = text.replace(/```sql\n?/g, "").replace(/```\n?/g, "");
    
    // Take first line (SQL query)
    sql = sql.split("\n")[0].trim();
    
    // Remove trailing semicolon if exists
    sql = sql.replace(/;$/, "");
    
    if (!sql.toUpperCase().startsWith("SELECT")) {
      throw new Error("Invalid SQL query");
    }
    
    return sql;
  }

  /**
   * Check simple list query
   */
  private isSimpleListQuery(filters: any): boolean {
    const keys = Object.keys(filters);
    return keys.length <= 2 && 
           keys.every(k => ["generation", "gender"].includes(k));
  }

  /**
   * Build simple list SQL
   */
  private buildSimpleListSQL(filters: any, dongHoId: string): string {
    let conditions: string[] = [
      `dongHoId = '${dongHoId}'`,
      "active_flag = 1"
    ];

    if (filters.generation) {
      conditions.push(`doiThuoc = ${filters.generation}`);
    }

    if (filters.gender) {
      conditions.push(`gioiTinh = ${filters.gender === "M" ? 1 : 0}`);
    }

    return `SELECT * FROM thanhvien WHERE ${conditions.join(" AND ")}`;
  }

  /**
   * Build simple count SQL
   */
  private buildSimpleCountSQL(filters: any, dongHoId: string): string {
    return this.buildSimpleListSQL(filters, dongHoId)
      .replace("SELECT *", "SELECT COUNT(*) as total");
  }

  /**
   * Check quan hệ đơn giản
   */
  private isSimpleRelation(relation: string): boolean {
    const simple = [
      "father", "mother", "parents",
      "children", "siblings", "spouse",
      "paternal_grandfather", "paternal_grandmother",
      "maternal_grandfather", "maternal_grandmother"
    ];
    return simple.includes(relation);
  }

  /**
   * Build gender filter
   */
  private buildGenderFilter(gender: "M" | "F"): (data: any[]) => any[] {
    return (data: any[]) => {
      return data.filter(m => 
        m.gioiTinh === (gender === "M" ? 1 : 0)
      );
    };
  }

  /**
   * Build complex filter
   */
  private buildComplexFilter(intent: Intent): (data: any[]) => any[] {
    return (data: any[]) => {
      let result = data;

      // Filter by gender
      if (intent.filters?.gender) {
        result = result.filter(m => 
          m.gioiTinh === (intent.filters!.gender === "M" ? 1 : 0)
        );
      }

      // Filter by generation
      if (intent.filters?.generation) {
        result = result.filter(m => 
          m.doiThuoc === intent.filters!.generation
        );
      }

      // Select nth
      if (intent.filters?.childOrder) {
        const n = intent.filters.childOrder - 1;
        result = result[n] ? [result[n]] : [];
      }

      return result;
    };
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.sqlCache.clear();
  }
}
