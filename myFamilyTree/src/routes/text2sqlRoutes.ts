/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         TEXT-TO-SQL ROUTES                                    ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Routes cho Text-to-SQL API                                                  ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Router } from "express";
import {
  queryText2SQL,
  getExamples,
  reloadExamples,
  healthCheck,
} from "../controllers/text2sqlController";

const router = Router();

/**
 * POST /api-core/text2sql/query
 * Gửi câu hỏi và nhận kết quả SQL
 * Body: { question: string, dongHoId: string }
 */
router.post("/query", queryText2SQL);

/**
 * GET /api-core/text2sql/examples
 * Lấy danh sách câu hỏi mẫu
 */
router.get("/examples", getExamples);

/**
 * POST /api-core/text2sql/reload-examples
 * Reload examples từ dataset file
 */
router.post("/reload-examples", reloadExamples);

/**
 * GET /api-core/text2sql/health
 * Health check
 */
router.get("/health", healthCheck);

export default router;
