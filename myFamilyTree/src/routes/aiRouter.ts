import { Router, Request, Response } from "express";
import { container } from "tsyringe";
import { AIChatService } from "../services/aiChatService";
import { AIProviderService } from "../services/aiProviderService";

const router = Router();

// POST /api-core/ai/chat
router.post("/chat", async (req: Request, res: Response) => {
  try {
    const aiChatService = container.resolve(AIChatService);
    const { message, dongHoId } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ 
        success: false, 
        message: "Vui lòng nhập câu hỏi" 
      });
    }

    if (!dongHoId) {
      return res.status(400).json({ 
        success: false, 
        message: "Vui lòng chọn dòng họ để tra cứu" 
      });
    }

    // Load dữ liệu dòng họ
    await aiChatService.loadData(dongHoId);

    // Build prompt và kiểm tra có cần gọi AI không
    const prompt = aiChatService.buildPrompt(message);

    // Nếu có câu trả lời trực tiếp từ dữ liệu
    if (prompt.startsWith("DIRECT_ANSWER:")) {
      const directAnswer = prompt.replace("DIRECT_ANSWER:", "");
      return res.json({
        success: true,
        data: directAnswer,
        debug: aiChatService.getDebugInfo(),
      });
    }

    // Gọi AI để hỗ trợ trả lời
    const aiReply = await AIProviderService.callAI(prompt);

    return res.json({
      success: true,
      data: aiReply,
      debug: aiChatService.getDebugInfo(),
    });
  } catch (error: any) {
    console.error("[AI Chat] Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Xin lỗi, có lỗi xảy ra. Vui lòng thử lại!",
    });
  }
});

// GET /api-core/ai/test - Test endpoint
router.get("/test", (req: Request, res: Response) => {
  res.json({ success: true, message: "AI Chat API is working" });
});

export default router;
