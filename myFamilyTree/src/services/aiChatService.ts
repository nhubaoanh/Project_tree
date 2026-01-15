/**
 * AI Chat Service - Đơn giản hóa: BFS + Ollama diễn giải
 */

import { injectable } from "tsyringe";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { dongHoResponsitory } from "../repositories/dongHoRespository";
import { RelationshipService } from "./relationshipService";
import { OllamaService } from "./ollamaService";

@injectable()
export class AIChatService {
  private cachedDongHoId: string = "";

  constructor(
    private thanhvienRepo: thanhVienRespository,
    private donghoRepo: dongHoResponsitory,
    private relationshipService: RelationshipService,
    private ollamaService: OllamaService
  ) {}

  // Load dữ liệu theo dongHoId (cache trong RelationshipService)
  async loadData(dongHoId: string): Promise<void> {
    this.cachedDongHoId = dongHoId;
    console.log(`[AI Chat] Sẵn sàng cho dòng họ: ${dongHoId}`);
  }

  // Phân tích câu hỏi và trả lời bằng BFS
  async analyzeQuestion(message: string): Promise<string> {
    try {
      // Dùng BFS để tìm quan hệ
      const result = await this.relationshipService.analyzeQuestion(
        this.cachedDongHoId,
        message
      );

      if (!result.success) {
        return result.message || "Không thể trả lời câu hỏi này.";
      }

      const { person, relatives, relationshipType } = result.data!;

      // Nếu không có người thân, trả lời đơn giản
      if (relatives.length === 0) {
        return `${person.hoTen} không có thông tin về ${relationshipType}.`;
      }

      // Dùng Ollama để diễn giải kết quả
      try {
        const explanation = await this.ollamaService.explainRelationship(
          person.hoTen,
          relatives,
          relationshipType
        );
        return explanation;
      } catch (error) {
        // Fallback: Trả lời đơn giản không cần AI
        const names = relatives.map(r => r.hoTen).join(", ");
        return `${person.hoTen} có ${relatives.length} ${relationshipType}: ${names}`;
      }
    } catch (error: any) {
      console.error("[AI Chat] Lỗi:", error.message);
      return "Xin lỗi, đã có lỗi xảy ra khi xử lý câu hỏi.";
    }
  }

  // Build prompt đơn giản (không dùng nữa, giữ lại để tương thích)
  buildPrompt(userMessage: string): string {
    return `Câu hỏi: ${userMessage}`;
  }

  getDebugInfo() {
    return {
      dongHoId: this.cachedDongHoId,
      status: "BFS Mode"
    };
  }
}
