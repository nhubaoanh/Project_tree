/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         THANH VIEN ROUTER                                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Routes quản lý thành viên trong gia phả                                     ║
 * ║                                                                               ║
 * ║  BẢO MẬT:                                                                    ║
 * ║  - authenticate: Xác thực JWT token                                          ║
 * ║  - checkDongHoAccess: Kiểm tra quyền truy cập dòng họ                       ║
 * ║  - uploadLimiter: 20 files/giờ (cho import)                                  ║
 * ║  - sensitiveLimiter: 5 lần/giờ (cho delete)                                  ║
 * ║  - validate(): Kiểm tra format dữ liệu                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Router } from "express";
import { container } from "tsyringe";
import { thanhVienController } from "../controllers/thanhVienController";

// Auth Middleware
import { authenticate, checkDongHoAccess, adminOrThuDo, adminOnly } from "../middlewares/authMiddleware";

// Rate Limiters
import { uploadLimiter, sensitiveLimiter } from "../middlewares/rateLimiter";

// Validation
import { validate } from "../middlewares/validateRequest";
import {
  createThanhVienRules,
  updateThanhVienRules,
  idParamRules,
  searchThanhVienRules,
} from "../validators";

const thanhVienRouter = Router();
const controller = container.resolve(thanhVienController);


// ============================================================================
// ERROR HANDLER
// ============================================================================
thanhVienRouter.use((err: any, req: any, res: any, next: any) => {
  if (err) {
    return res.status(400).json({
      success: false,
      message: err.message || "Có lỗi xảy ra",
    });
  }
  next();
});

// ============================================================================
// GET ROUTES
// ============================================================================

/**
 * GET /getAllMember
 * Lấy tất cả thành viên (Admin only)
 */
thanhVienRouter.get(
  "/getAllMember",
  authenticate,
  adminOnly,
  controller.getAllThanhVien.bind(controller)
);

/**
 * GET /dongho/:dongHoId/all
 * Lấy tất cả thành viên theo dòng họ
 * Admin: xem tất cả, Thủ đồ/Thành viên: chỉ xem dòng họ của mình
 */
thanhVienRouter.get(
  "/dongho/:dongHoId/all",
  authenticate,
  checkDongHoAccess,
  controller.getAllByDongHo.bind(controller)
);

/**
 * GET /export-template
 * Export template Excel
 */
thanhVienRouter.get(
  "/export-template",
  authenticate,
  controller.exportTemplate.bind(controller)
);

/**
 * GET /export/:dongHoId
 * Export danh sách thành viên ra Excel
 * Kiểm tra quyền truy cập dòng họ
 */
thanhVienRouter.get(
  "/export/:dongHoId",
  authenticate,
  checkDongHoAccess,
  controller.exportMembers.bind(controller)
);

/**
 * GET /:id
 * Lấy thành viên theo ID
 */
thanhVienRouter.get(
  "/:id",
  authenticate,
  validate(idParamRules),
  controller.getThanhVienById.bind(controller)
);

// ============================================================================
// POST ROUTES
// ============================================================================

/**
 * POST /
 * POST /create
 * Tạo thành viên mới
 * Chỉ Admin và Thủ đồ mới được tạo
 *
 * Validation: hoTen (2-100), gioiTinh, ngaySinh, ngayMat, dongHoId, chaId, meId
 */
thanhVienRouter.post(
  "",
  authenticate,
  adminOrThuDo,
  checkDongHoAccess,
  validate(createThanhVienRules),
  controller.createThanhVien.bind(controller)
);

thanhVienRouter.post(
  "/create",
  authenticate,
  adminOrThuDo,
  checkDongHoAccess,
  validate(createThanhVienRules),
  controller.createThanhVien.bind(controller)
);

/**
 * POST /search
 * Tìm kiếm thành viên
 */
thanhVienRouter.post(
  "/search",
  authenticate,
  validate(searchThanhVienRules),
  controller.searchThanhVien.bind(controller)
);

/**
 * POST /search-by-dongho
 * Tìm kiếm thành viên theo dòng họ
 * Kiểm tra quyền truy cập dòng họ
 */
thanhVienRouter.post(
  "/search-by-dongho",
  authenticate,
  checkDongHoAccess,
  validate(searchThanhVienRules),
  controller.searchThanhVienByDongHo.bind(controller)
);

/**
 * POST /import-json
 * Import thành viên từ JSON
 * Chỉ Admin và Thủ đồ mới được import
 *
 * Rate Limit: 20 files/giờ
 */
thanhVienRouter.post(
  "/import-json",
  authenticate,
  adminOrThuDo,
  checkDongHoAccess,
  uploadLimiter,
  controller.importFromJson.bind(controller)
);

// ============================================================================
// PUT ROUTES
// ============================================================================

/**
 * PUT /:id
 * Cập nhật thành viên
 * Chỉ Admin và Thủ đồ mới được cập nhật
 *
 * Validation: id (param), hoTen, gioiTinh, ngaySinh, ngayMat
 */
thanhVienRouter.put(
  "/:id",
  authenticate,
  adminOrThuDo,
  validate(updateThanhVienRules),
  controller.updateThanhVien.bind(controller)
);

// ============================================================================
// DELETE ROUTES
// ============================================================================

/**
 * DELETE /:id
 * Xóa thành viên
 * Chỉ Admin và Thủ đồ mới được xóa
 *
 * Rate Limit: 5 lần/giờ (thao tác nhạy cảm)
 * Validation: id phải là số nguyên dương
 */
thanhVienRouter.delete(
  "/:id",
  authenticate,
  adminOrThuDo,
  sensitiveLimiter,
  validate(idParamRules),
  controller.deleteThanhVien.bind(controller)
);

/**
 * POST /delete
 * Xóa nhiều thành viên
 */
thanhVienRouter.post(
  "/delete",
  authenticate,
  adminOrThuDo,
  sensitiveLimiter,
  controller.deleteMultipleThanhVien.bind(controller)
);

export default thanhVienRouter;
