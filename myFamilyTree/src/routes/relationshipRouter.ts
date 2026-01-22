/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         RELATIONSHIP ROUTER                                   ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Routes quản lý đồng bộ quan hệ trong gia phả                                ║
 * ║                                                                               ║
 * ║  BẢO MẬT:                                                                    ║
 * ║  - authenticate: Xác thực JWT token                                          ║
 * ║  - checkDongHoAccess: Kiểm tra quyền truy cập dòng họ                       ║
 * ║  - adminOrThuDo: Chỉ Admin và Thủ đồ mới được đồng bộ/xóa quan hệ           ║
 * ║  - sensitiveLimiter: 5 lần/giờ (cho clear relationships)                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Router } from "express";
import { container } from "tsyringe";
import { RelationshipController } from "../controllers/relationshipController";

// Auth Middleware
import { authenticate, checkDongHoAccess, adminOrThuDo } from "../middlewares/authMiddleware";

// Rate Limiters
import { sensitiveLimiter } from "../middlewares/rateLimiter";

const relationshipRouter = Router();
const controller = container.resolve(RelationshipController);

// ============================================================================
// GET ROUTES
// ============================================================================

/**
 * GET /stats/:dongHoId
 * Lấy thống kê quan hệ của một dòng họ
 * Tất cả user có quyền truy cập dòng họ đều có thể xem
 */
relationshipRouter.get(
  "/stats/:dongHoId",
  authenticate,
  checkDongHoAccess,
  controller.getRelationshipStats.bind(controller)
);

// ============================================================================
// POST ROUTES
// ============================================================================

/**
 * POST /sync/:dongHoId
 * Đồng bộ tất cả quan hệ cho một dòng họ
 * Chỉ Admin và Thủ đồ mới được đồng bộ
 */
relationshipRouter.post(
  "/sync/:dongHoId",
  authenticate,
  adminOrThuDo,
  checkDongHoAccess,
  controller.syncAllRelationships.bind(controller)
);

/**
 * POST /sync-partial/:dongHoId
 * Đồng bộ một loại quan hệ cụ thể
 * Body: { type: "parent_child" | "spouse" | "sibling" | "grandparent" | "paternal_uncle_aunt" | "maternal_uncle_aunt" }
 * Chỉ Admin và Thủ đồ mới được đồng bộ
 */
relationshipRouter.post(
  "/sync-partial/:dongHoId",
  authenticate,
  adminOrThuDo,
  checkDongHoAccess,
  controller.syncPartialRelationships.bind(controller)
);

// ============================================================================
// DELETE ROUTES
// ============================================================================

/**
 * DELETE /clear/:dongHoId
 * Xóa tất cả quan hệ của một dòng họ
 * Chỉ Admin và Thủ đồ mới được xóa
 * Rate Limit: 5 lần/giờ (thao tác nhạy cảm)
 */
relationshipRouter.delete(
  "/clear/:dongHoId",
  authenticate,
  adminOrThuDo,
  checkDongHoAccess,
  sensitiveLimiter,
  controller.clearRelationships.bind(controller)
);

export default relationshipRouter;
