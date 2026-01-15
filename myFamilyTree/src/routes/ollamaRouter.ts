/**
 * Ollama Router - Routes cho DeepSeek-Coder AI
 */

import { Router } from 'express';
import { container } from 'tsyringe';
import { OllamaController } from '../controllers/ollamaController';
import { authenticate } from '../middlewares/authMiddleware';

const ollamaRouter = Router();
const ollamaController = container.resolve(OllamaController);

/**
 * POST /chat
 * Chat với DeepSeek-Coder về gia phả
 * Requires authentication
 */
ollamaRouter.post(
  '/chat',
  authenticate,
  ollamaController.chat.bind(ollamaController)
);

/**
 * GET /health
 * Kiểm tra Ollama có đang chạy không
 */
ollamaRouter.get(
  '/health',
  ollamaController.healthCheck.bind(ollamaController)
);

/**
 * GET /models
 * Lấy danh sách models có sẵn
 */
ollamaRouter.get(
  '/models',
  ollamaController.listModels.bind(ollamaController)
);

export default ollamaRouter;
