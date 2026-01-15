/**
 * AI Controller - Sử dụng BFS + Ollama
 */

import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { AIChatService } from "../services/aiChatService";

@injectable()
export class AIController {
  constructor(private aiService: AIChatService) {}

  /**
   * POST /api/ai/chat
   * Chat với AI sử dụng BFS để tìm quan hệ
   */
  async chat(req: Request, res: Response): Promise<void> {
    try {
      const { message, dongHoId } = req.body;

      if (!message) {
        res.status(400).json({ 
          success: false, 
          message: "Thiếu nội dung tin nhắn" 
        });
        return;
      }

      if (!dongHoId) {
        res.status(400).json({ 
          success: false, 
          message: "Thiếu dongHoId" 
        });
        return;
      }

      console.log(`[AI Chat] Question: "${message}" | DongHo: ${dongHoId}`);

      // Load dữ liệu dòng họ (cache trong service)
      await this.aiService.loadData(dongHoId);

      // Phân tích và trả lời câu hỏi (BFS + Ollama)
      const response = await this.aiService.analyzeQuestion(message);
      
      console.log(`[AI Chat] ✓ Response ready`);

      res.json({ 
        success: true, 
        data: response,
        debug: this.aiService.getDebugInfo()
      });
    } catch (error: any) {
      console.error("[AI Chat] ✗ Error:", error.message);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Lỗi khi xử lý yêu cầu AI" 
      });
    }
  }
}
