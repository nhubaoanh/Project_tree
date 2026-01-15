/**
 * Ollama Service - Text-to-SQL cho gia phả
 */

import axios from "axios";

interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface OllamaRequest {
  model: string;
  messages: OllamaMessage[];
  stream?: boolean;
  temperature?: number;
}

export class OllamaService {
  private baseURL: string;
  private model: string;

  constructor() {
    this.baseURL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    this.model = process.env.OLLAMA_MODEL || "deepseek-coder";
  }

  /**
   * TEXT-TO-SQL: Chuyển câu hỏi tiếng Việt thành SQL
   */
  async textToSQL(userQuestion: string, dongHoId: string): Promise<string> {
    const systemPrompt = `You are a SQL expert for family tree database.

DATABASE SCHEMA:
Table: thanhvien
Columns:
- thanhVienId (INT, PRIMARY KEY)
- dongHoId (VARCHAR, family tree ID)
- hoTen (VARCHAR, full name)
- gioiTinh (INT, 0=Female, 1=Male)
- doiThuoc (INT, generation number)
- chaId (INT, father's thanhVienId)
- meId (INT, mother's thanhVienId)
- voId (INT, wife's thanhVienId)
- chongId (INT, husband's thanhVienId)
- ngaySinh (DATE, birth date)
- ngayMat (DATE, death date)
- active_flag (INT, 1=active)

RELATIONSHIPS:
- Father: chaId references thanhVienId
- Mother: meId references thanhVienId
- Uncle (chú/bác): father's brothers (same chaId, gioiTinh=1)
- Aunt (cô): father's sisters (same chaId, gioiTinh=0)
- Maternal uncle (cậu): mother's brothers (same meId, gioiTinh=1)
- Maternal aunt (dì): mother's sisters (same meId, gioiTinh=0)
- Siblings: same chaId or meId
- Children: thanhVienId = someone's chaId or meId
- Spouse: voId or chongId

RULES:
1. ALWAYS filter by dongHoId = '${dongHoId}'
2. ALWAYS filter by active_flag = 1
3. Return ONLY the SQL query, no explanation
4. Use proper JOINs for relationships
5. Use Vietnamese column aliases (AS)

EXAMPLES:

Q: "Ai là tổ tiên?" or "Đời 1"
A: SELECT hoTen, gioiTinh FROM thanhvien WHERE dongHoId = '${dongHoId}' AND doiThuoc = 1 AND active_flag = 1;

Q: "Liệt kê thành viên đời 2"
A: SELECT hoTen, gioiTinh FROM thanhvien WHERE dongHoId = '${dongHoId}' AND doiThuoc = 2 AND active_flag = 1;

Q: "Trần Văn A là con ai?" or "Cha mẹ của Trần Văn A"
A: SELECT p.hoTen AS 'Cha', m.hoTen AS 'Mẹ' FROM thanhvien t LEFT JOIN thanhvien p ON t.chaId = p.thanhVienId LEFT JOIN thanhvien m ON t.meId = m.thanhVienId WHERE t.hoTen LIKE '%Trần Văn A%' AND t.dongHoId = '${dongHoId}' AND t.active_flag = 1;

Q: "Con của Trần Văn A" or "Trần Văn A có mấy con"
A: SELECT hoTen, gioiTinh FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen LIKE '%Trần Văn A%' AND dongHoId = '${dongHoId}' LIMIT 1) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen LIKE '%Trần Văn A%' AND dongHoId = '${dongHoId}' LIMIT 1)) AND dongHoId = '${dongHoId}' AND active_flag = 1;

Q: "Chú của Trần Văn A" or "Bác của Trần Văn A"
A: SELECT u.hoTen FROM thanhvien t JOIN thanhvien f ON t.chaId = f.thanhVienId JOIN thanhvien u ON f.chaId = u.chaId WHERE t.hoTen LIKE '%Trần Văn A%' AND u.thanhVienId != f.thanhVienId AND u.gioiTinh = 1 AND t.dongHoId = '${dongHoId}' AND t.active_flag = 1 AND u.active_flag = 1;

Q: "Anh chị em của Trần Văn A"
A: SELECT s.hoTen, s.gioiTinh FROM thanhvien t JOIN thanhvien s ON (t.chaId = s.chaId OR t.meId = s.meId) WHERE t.hoTen LIKE '%Trần Văn A%' AND s.thanhVienId != t.thanhVienId AND t.dongHoId = '${dongHoId}' AND t.active_flag = 1 AND s.active_flag = 1;

Now generate SQL for this question:`;

    try {
      const messages: OllamaMessage[] = [
        { role: "system", content: systemPrompt },
        { role: "user", content: userQuestion },
      ];

      const response = await axios.post(
        `${this.baseURL}/api/chat`,
        {
          model: this.model,
          messages,
          stream: false,
          temperature: 0.1, // Low temperature for precise SQL
        } as OllamaRequest,
        { timeout: 30000 }
      );

      if (response.data && response.data.message) {
        let sql = response.data.message.content.trim();

        // Clean up SQL (remove markdown, extra text)
        sql = sql.replace(/```sql\n?/g, "").replace(/```\n?/g, "");
        sql = sql.split("\n")[0]; // Take first line only

        return sql;
      }

      throw new Error("Invalid response from Ollama");
    } catch (error: any) {
      throw new Error("Không thể tạo SQL query");
    }
  }

  /**
   * Chat thông thường (fallback)
   */
  async chat(userMessage: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: OllamaMessage[] = [];

      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
      }

      messages.push({ role: "user", content: userMessage });

      const response = await axios.post(
        `${this.baseURL}/api/chat`,
        {
          model: this.model,
          messages,
          stream: false,
          temperature: 0.7,
        } as OllamaRequest,
        { timeout: 60000 }
      );

      if (response.data && response.data.message) {
        return response.data.message.content;
      }

      throw new Error("Invalid response from Ollama");
    } catch (error: any) {
      if (error.code === "ECONNREFUSED") {
        throw new Error(
          "Không thể kết nối với Ollama. Vui lòng chạy: ollama serve"
        );
      }

      throw new Error(error.message || "Lỗi khi gọi Ollama API");
    }
  }

  /**
   * Kiểm tra Ollama có đang chạy không
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  }

  /**
   * Lấy danh sách models có sẵn
   */
  async listModels(): Promise<string[]> {
    try {
      const response = await axios.get(`${this.baseURL}/api/tags`);
      if (response.data && response.data.models) {
        return response.data.models.map((m: any) => m.name);
      }
      return [];
    } catch (error) {
      return [];
    }
  }
}
