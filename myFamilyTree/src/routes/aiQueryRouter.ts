/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         AI QUERY ROUTER                                       ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Routes cho AI Text-to-SQL service                                            ║
 * ║                                                                               ║
 * ║  BẢO MẬT:                                                                    ║
 * ║  - authenticate: Xác thực JWT token                                          ║
 * ║  - checkDongHoAccess: Kiểm tra quyền truy cập dòng họ                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Router } from 'express';
import { container } from 'tsyringe';
import { AIQueryController } from '../controllers/aiQueryController';
import { authenticate, checkDongHoAccess } from '../middlewares/authMiddleware';

const aiQueryRouter = Router();
const controller = container.resolve(AIQueryController);

/**
 * GET /health
 * Check AI service health (không cần auth)
 */
aiQueryRouter.get(
  '/health',
  controller.checkHealth.bind(controller)
);

/**
 * POST /ask
 * Hỏi câu hỏi bằng tiếng Việt và nhận kết quả
 * Body: { question: string, dongHoId: string }
 */
aiQueryRouter.post(
  '/ask',
  authenticate,
  checkDongHoAccess,
  controller.askQuestion.bind(controller)
);

/**
 * POST /test
 * Test SQL generation (không execute)
 * Body: { question: string, dongHoId: string }
 */
aiQueryRouter.post(
  '/test',
  authenticate,
  checkDongHoAccess,
  controller.testQuestion.bind(controller)
);

export default aiQueryRouter;
