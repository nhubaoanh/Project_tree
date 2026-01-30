/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         TEXT-TO-SQL SERVICE                                   ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Chuyển đổi câu hỏi tiếng Việt thành SQL query sử dụng GROQ hoặc Gemini AI ║
 * ║                                                                               ║
 * ║  FLOW:                                                                        ║
 * ║  1. Nhận câu hỏi tiếng Việt từ user                                          ║
 * ║  2. Build prompt với schema + examples                                       ║
 * ║  3. Gọi GROQ API (ưu tiên) hoặc Gemini API (fallback)                       ║
 * ║  4. Parse và validate SQL                                                    ║
 * ║  5. Thực thi SQL trên database                                               ║
 * ║  6. Format và trả kết quả                                                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { GoogleGenerativeAI } from "@google/generative-ai";
import Groq from "groq-sdk";
import { Database } from "../config/database";
import * as fs from "fs";
import * as path from "path";

// Database Schema - Mô tả chi tiết cho AI
const DATABASE_SCHEMA = `
-- Bảng thành viên gia phả
CREATE TABLE thanhvien (
  thanhVienId INT PRIMARY KEY AUTO_INCREMENT,
  dongHoId VARCHAR(50) NOT NULL,           -- ID dòng họ (bắt buộc filter)
  hoTen VARCHAR(255) NOT NULL,             -- Họ tên đầy đủ (VD: "Nguyễn Văn A")
  gioiTinh TINYINT,                        -- 1=Nam, 0=Nữ
  ngaySinh DATE,                           -- Ngày sinh
  ngayMat DATE,                            -- Ngày mất (NULL = còn sống)
  noiSinh VARCHAR(255),                    -- Nơi sinh (VD: "Hà Nội")
  noiMat VARCHAR(255),                     -- Nơi mất
  ngheNghiep VARCHAR(255),                 -- Nghề nghiệp
  trinhDoHocVan VARCHAR(255),              -- Trình độ học vấn
  soDienThoai VARCHAR(11),                 -- Số điện thoại
  diaChiHienTai VARCHAR(255),              -- Địa chỉ hiện tại
  tieuSu TEXT,                             -- Tiểu sử
  doiThuoc INT,                            -- Đời thứ mấy (1, 2, 3...)
  chaId INT,                               -- ID của cha (NULL = không có)
  meId INT,                                -- ID của mẹ (NULL = không có)
  voId INT,                                -- ID của vợ (NULL = chưa có vợ)
  chongId INT,                             -- ID của chồng (NULL = chưa có chồng)
  active_flag TINYINT DEFAULT 1,           -- 1=active, 0=deleted
  FOREIGN KEY (chaId) REFERENCES thanhvien(thanhVienId),
  FOREIGN KEY (meId) REFERENCES thanhvien(thanhVienId)
);

-- Bảng quan hệ giữa các thành viên
CREATE TABLE quanhe (
  quanHeId VARCHAR(50) PRIMARY KEY,
  thanhVien1Id INT NOT NULL,               -- ID thành viên 1
  thanhVien2Id INT NOT NULL,               -- ID thành viên 2
  loaiQuanHeId VARCHAR(50) NOT NULL,       -- Loại quan hệ (HONNHAN, CHACONRUOT...)
  dongHoId1 VARCHAR(50),                   -- Dòng họ của thành viên 1
  dongHoId2 VARCHAR(50),                   -- Dòng họ của thành viên 2
  ngayBatDau DATE,                         -- Ngày bắt đầu quan hệ
  ngayKetThuc DATE,                        -- Ngày kết thúc (NULL = còn hiệu lực)
  active_flag TINYINT DEFAULT 1,
  FOREIGN KEY (thanhVien1Id) REFERENCES thanhvien(thanhVienId),
  FOREIGN KEY (thanhVien2Id) REFERENCES thanhvien(thanhVienId)
);

-- Bảng loại quan hệ
CREATE TABLE loaiquanhe (
  loaiQuanHeId VARCHAR(50) PRIMARY KEY,
  tenLoaiQuanHe VARCHAR(100) NOT NULL      -- Tên loại quan hệ
);
`;

// Few-shot examples từ dataset
let FEW_SHOT_EXAMPLES: Array<{ question: string; sql: string }> = [];

// Load examples từ file JSON
function loadExamples() {
  try {
    // Đường dẫn tới file dataset (từ myFamilyTree/src/services -> myFamilyTree/data)
    const datasetPath = path.join(__dirname, "../../data/member.json");
    
    if (fs.existsSync(datasetPath)) {
      const data = fs.readFileSync(datasetPath, "utf-8");
      FEW_SHOT_EXAMPLES = JSON.parse(data);
      console.log(`✅ Loaded ${FEW_SHOT_EXAMPLES.length} examples from dataset`);
      console.log(`📁 Dataset path: ${datasetPath}`);
    } else {
      console.warn("⚠️ Dataset file not found at:", datasetPath);
      console.warn("⚠️ Using empty examples");
    }
  } catch (error) {
    console.error("❌ Error loading examples:", error);
  }
}

// Initialize examples
loadExamples();

/**
 * Build prompt cho Gemini AI
 */
function buildPrompt(question: string, dongHoId: string): string {
  let prompt = `### NHIỆM VỤ
Bạn là chuyên gia SQL cho hệ thống gia phả Việt Nam. 
Nhiệm vụ: Chuyển câu hỏi tiếng Việt thành SQL query chính xác.

### DATABASE SCHEMA
${DATABASE_SCHEMA}

### QUY TẮC BẮT BUỘC
1. ✅ LUÔN LUÔN thêm điều kiện: dongHoId = '${dongHoId}' 
2. ✅ LUÔN LUÔN thêm điều kiện: active_flag = 1 (trừ khi câu hỏi về deleted records)
3. ✅ CHỈ trả về SQL query thuần túy, KHÔNG giải thích, KHÔNG markdown
4. ✅ Sử dụng LIKE '%keyword%' cho tìm kiếm text (VD: hoTen LIKE '%Nguyễn%')
5. ✅ gioiTinh: 1=Nam, 0=Nữ
6. ✅ ngayMat IS NULL = còn sống, ngayMat IS NOT NULL = đã mất
7. ✅ Với câu hỏi về người cụ thể, dùng hoTen = 'Tên đầy đủ'
8. ✅ Khi đếm con: dùng chaId hoặc meId tùy giới tính
9. ✅ Khi tìm anh chị em: cùng chaId hoặc meId

### VÍ DỤ THAM KHẢO
${FEW_SHOT_EXAMPLES.slice(0, 10)
  .map((ex) => `Q: ${ex.question}\nSQL: ${ex.sql.replace(/dongHoId = \?/g, `dongHoId = '${dongHoId}'`)}`)
  .join("\n\n")}

### CÂU HỎI CỦA NGƯỜI DÙNG
Q: ${question}

### SQL QUERY (chỉ trả về SQL, không có text khác):`;

  return prompt;
}

/**
 * Parse SQL từ response của Gemini
 */
function parseSQL(response: string): string {
  // Remove markdown code blocks
  let sql = response.trim();
  sql = sql.replace(/```sql\n?/gi, "");
  sql = sql.replace(/```\n?/g, "");
  sql = sql.replace(/^SQL:\s*/i, "");
  sql = sql.trim();

  // Remove trailing semicolon if exists
  if (sql.endsWith(";")) {
    sql = sql.slice(0, -1);
  }

  return sql;
}

/**
 * Validate SQL query
 */
function validateSQL(sql: string): { valid: boolean; error?: string } {
  // Check if SQL is empty
  if (!sql || sql.length === 0) {
    return { valid: false, error: "SQL query is empty" };
  }

  // Check for dangerous operations
  const dangerousKeywords = ["DROP", "DELETE", "TRUNCATE", "ALTER", "CREATE", "INSERT", "UPDATE"];
  const upperSQL = sql.toUpperCase();

  for (const keyword of dangerousKeywords) {
    if (upperSQL.includes(keyword)) {
      return { valid: false, error: `Dangerous operation detected: ${keyword}` };
    }
  }

  // Must be SELECT query
  if (!upperSQL.startsWith("SELECT")) {
    return { valid: false, error: "Only SELECT queries are allowed" };
  }

  return { valid: true };
}

/**
 * Format kết quả query
 */
function formatResults(results: any[], sql: string): any {
  // Nếu là COUNT query
  if (sql.toUpperCase().includes("COUNT(*)")) {
    const count = results[0]?.["COUNT(*)"] || 0;
    return {
      type: "count",
      value: count,
      message: `Kết quả: ${count}`,
    };
  }

  // Nếu là query lấy danh sách
  if (results.length > 0) {
    return {
      type: "list",
      count: results.length,
      data: results,
      message: `Tìm thấy ${results.length} kết quả`,
    };
  }

  // Không có kết quả
  return {
    type: "empty",
    count: 0,
    data: [],
    message: "Không tìm thấy kết quả nào",
  };
}

/**
 * Main service: Text to SQL
 */
export class Text2SQLService {
  private groq: Groq | null = null;
  private genAI: GoogleGenerativeAI | null = null;
  private geminiModel: any = null;
  private db: Database;

  constructor() {
    // Initialize GROQ (primary)
    const groqApiKey = process.env.GROQ_API_KEY;
    if (groqApiKey) {
      this.groq = new Groq({ apiKey: groqApiKey });
      console.log("✅ GROQ API initialized");
    } else {
      console.warn("⚠️ GROQ_API_KEY not found");
    }

    // Initialize Gemini (fallback)
    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (geminiApiKey) {
      this.genAI = new GoogleGenerativeAI(geminiApiKey);
      this.geminiModel = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log("✅ Gemini API initialized");
    } else {
      console.warn("⚠️ GEMINI_API_KEY not found");
    }

    if (!this.groq && !this.genAI) {
      throw new Error("Neither GROQ_API_KEY nor GEMINI_API_KEY found in environment variables");
    }

    this.db = new Database();
  }

  /**
   * Gọi GROQ API để sinh SQL
   */
  private async callGroqAPI(prompt: string): Promise<string> {
    if (!this.groq) {
      throw new Error("GROQ API not initialized");
    }

    const completion = await this.groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Model mạnh nhất của GROQ
      temperature: 0.1,
      max_tokens: 1024,
    });

    return completion.choices[0]?.message?.content || "";
  }

  /**
   * Gọi Gemini API để sinh SQL
   */
  private async callGeminiAPI(prompt: string): Promise<string> {
    if (!this.geminiModel) {
      throw new Error("Gemini API not initialized");
    }

    const result = await this.geminiModel.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  /**
   * Xử lý câu hỏi và trả về kết quả
   */
  async processQuestion(question: string, dongHoId: string): Promise<any> {
    try {
      // 1. Build prompt
      const prompt = buildPrompt(question, dongHoId);
      console.log("📝 Prompt built for question:", question);

      let generatedSQL = "";
      let usedAPI = "";

      // 2. Gọi AI API (ưu tiên GROQ, fallback Gemini)
      try {
        if (this.groq) {
          console.log("🤖 Calling GROQ API...");
          generatedSQL = await this.callGroqAPI(prompt);
          usedAPI = "GROQ";
          console.log("✅ GROQ response:", generatedSQL);
        } else {
          throw new Error("GROQ not available");
        }
      } catch (groqError: any) {
        console.warn("⚠️ GROQ API failed:", groqError.message);
        
        if (this.geminiModel) {
          console.log("🔄 Falling back to Gemini API...");
          generatedSQL = await this.callGeminiAPI(prompt);
          usedAPI = "Gemini";
          console.log("✅ Gemini response:", generatedSQL);
        } else {
          throw new Error("Both GROQ and Gemini APIs failed");
        }
      }

      // 3. Parse SQL
      const sql = parseSQL(generatedSQL);
      console.log("🔍 Parsed SQL:", sql);

      // 4. Validate SQL
      const validation = validateSQL(sql);
      if (!validation.valid) {
        throw new Error(`Invalid SQL: ${validation.error}`);
      }

      // 5. Thực thi SQL
      console.log("💾 Executing SQL on database...");
      const [results] = await this.db.rawQuery(sql, []);
      console.log(`✅ Query executed successfully, ${results.length} rows returned`);

      // 6. Format kết quả
      const formattedResults = formatResults(results, sql);

      return {
        success: true,
        question,
        sql,
        result: formattedResults,
        usedAPI, // Thêm thông tin API nào được dùng
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("❌ Error in Text2SQL service:", error);
      throw new Error(`Text2SQL Error: ${error.message}`);
    }
  }

  /**
   * Lấy danh sách examples
   */
  getExamples(): Array<{ question: string; sql: string }> {
    return FEW_SHOT_EXAMPLES;
  }

  /**
   * Reload examples từ file
   */
  reloadExamples(): void {
    loadExamples();
  }
}
