/**
 * Ollama Service - Đơn giản: Chỉ diễn giải kết quả
 */

import axios from "axios";

interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export class OllamaService {
  private baseURL: string;
  private model: string;
  private sqlModel: string; // Model chuyên cho SQL

  constructor() {
    this.baseURL = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
    this.model = process.env.OLLAMA_MODEL || "qwen2.5:7b"; // Default: Vietnamese
    this.sqlModel = process.env.OLLAMA_SQL_MODEL || "pxlksr/defog_sqlcoder-7b-2:Q2_KS"; // SQL expert
  }

  /**
   * DIỄN GIẢI KẾT QUẢ: Chuyển dữ liệu quan hệ thành câu trả lời tự nhiên
   */
  async explainRelationship(
    personName: string,
    relatives: Array<{ hoTen: string; gioiTinh: number }>,
    relationType: string
  ): Promise<string> {
    const systemPrompt = `Bạn là trợ lý gia phả. Diễn giải kết quả tra cứu thành câu văn tự nhiên.
Trả lời ngắn gọn bằng tiếng Việt, không dùng emoji.`;

    const relativesText = relatives
      .map(r => `${r.hoTen} (${r.gioiTinh === 1 ? "Nam" : "Nữ"})`)
      .join(", ");

    const userMessage = `${personName} - ${relationType}: ${relativesText}`;

    try {
      const response = await this.chat(userMessage, systemPrompt);
      return response;
    } catch (error) {
      // Fallback
      const names = relatives.map(r => r.hoTen).join(", ");
      return `${personName} có ${relatives.length} ${relationType}: ${names}.`;
    }
  }

  /**
   * Chat với Ollama (general purpose)
   */
  async chat(userMessage: string, systemPrompt?: string, useSQL = false): Promise<string> {
    try {
      const messages: OllamaMessage[] = [];

      if (systemPrompt) {
        messages.push({ role: "system", content: systemPrompt });
      }

      messages.push({ role: "user", content: userMessage });

      // Chọn model phù hợp
      const selectedModel = useSQL ? this.sqlModel : this.model;

      const response = await axios.post(
        `${this.baseURL}/api/chat`,
        {
          model: selectedModel,
          messages,
          stream: false,
          temperature: useSQL ? 0.1 : 0.7, // SQL cần chính xác hơn
        },
        { timeout: 30000 }
      );

      if (response.data && response.data.message) {
        return response.data.message.content;
      }

      throw new Error("Invalid response from Ollama");
    } catch (error: any) {
      if (error.code === "ECONNREFUSED") {
        throw new Error("Không thể kết nối Ollama. Chạy: ollama serve");
      }
      throw new Error(error.message || "Lỗi Ollama API");
    }
  }

  /**
   * Text-to-SQL chuyên dụng
   */
  async textToSQL(prompt: string): Promise<string> {
    return this.chat(prompt, undefined, true);
  }

  /**
   * Health check
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
   * Lấy danh sách models
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
