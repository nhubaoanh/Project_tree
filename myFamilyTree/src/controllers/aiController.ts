import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { AIService } from "../services/aiService";

@injectable()
export class AIController {
  constructor(private aiService: AIService) {}

  async chat(req: Request, res: Response): Promise<void> {
    try {
      const { message, dongHoId } = req.body;

      if (!message) {
        res.status(400).json({ success: false, message: "Thiếu nội dung tin nhắn" });
        return;
      }

      const response = await this.aiService.chat(message, dongHoId);
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
