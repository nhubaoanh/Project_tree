import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { AIChatService } from "../services/aiChatService";

@injectable()
export class AIController {
  constructor(private aiService: AIChatService) {}

  async chat(req: Request, res: Response): Promise<void> {
    try {
      const { message, dongHoId } = req.body;

      if (!message) {
        res.status(400).json({ success: false, message: "Thiếu nội dung tin nhắn" });
        return;
      }

      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }

      // Load dữ liệu dòng họ
      await this.aiService.loadData(dongHoId);

      // Phân tích và trả lời câu hỏi
      const response = this.aiService.analyzeQuestion(message);
      
      res.json({ success: true, data: response });
    } catch (error: any) {
      console.error("AI Chat error:", error.message);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Lỗi khi xử lý yêu cầu AI" 
      });
    }
  }
}
