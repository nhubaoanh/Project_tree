import { Router } from "express";
import { container } from "tsyringe";
import { AIController } from "../controllers/aiController";

const aiRouter = Router();
const aiController = container.resolve(AIController);

// POST /api-core/ai/chat - Chat với AI
aiRouter.post("/chat", aiController.chat.bind(aiController));

export default aiRouter;
