/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         THANH VIEN ROUTER                                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Routes quản lý thành viên trong gia phả                                     ║
 * ║                                                                               ║
 * ║  BẢO MẬT:                                                                    ║
 * ║  - uploadLimiter: 20 files/giờ (cho import)                                  ║
 * ║  - sensitiveLimiter: 5 lần/giờ (cho delete)                                  ║
 * ║  - validate(): Kiểm tra format dữ liệu                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Router } from "express";
import { container } from "tsyringe";
import { thanhVienController } from "../controllers/thanhVienController";

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
 * Lấy tất cả thành viên
 */
thanhVienRouter.get(
  "/getAllMember",
  controller.getAllThanhVien.bind(controller)
);

/**
 * GET /dongho/:dongHoId/all
 * Lấy tất cả thành viên theo dòng họ
 */
thanhVienRouter.get(
  "/dongho/:dongHoId/all",
  controller.getAllByDongHo.bind(controller)
);

/**
 * GET /export-template
 * Export template Excel
 */
thanhVienRouter.get(
  "/export-template",
  controller.exportTemplate.bind(controller)
);

/**
 * GET /export/:dongHoId
 * Export danh sách thành viên ra Excel
 */
thanhVienRouter.get(
  "/export/:dongHoId",
  controller.exportMembers.bind(controller)
);

/**
 * GET /:id
 * Lấy thành viên theo ID
 *
 * Validation: id phải là số nguyên dương
 */
thanhVienRouter.get(
  "/:id",
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
 *
 * Validation: hoTen (2-100), gioiTinh, ngaySinh, ngayMat, dongHoId, chaId, meId
 */
thanhVienRouter.post(
  "",
  validate(createThanhVienRules),
  controller.createThanhVien.bind(controller)
);

thanhVienRouter.post(
  "/create",
  validate(createThanhVienRules),
  controller.createThanhVien.bind(controller)
);

/**
 * POST /search
 * Tìm kiếm thành viên
 */
thanhVienRouter.post(
  "/search",
  validate(searchThanhVienRules),
  controller.searchThanhVien.bind(controller)
);

/**
 * POST /search-by-dongho
 * Tìm kiếm thành viên theo dòng họ
 */
thanhVienRouter.post(
  "/search-by-dongho",
  validate(searchThanhVienRules),
  controller.searchThanhVienByDongHo.bind(controller)
);

/**
 * POST /import-json
 * Import thành viên từ JSON
 *
 * Rate Limit: 20 files/giờ
 */
thanhVienRouter.post(
  "/import-json",
  uploadLimiter,
  controller.importFromJson.bind(controller)
);

// ============================================================================
// PUT ROUTES
// ============================================================================

/**
 * PUT /:id
 * Cập nhật thành viên
 *
 * Validation: id (param), hoTen, gioiTinh, ngaySinh, ngayMat
 */
thanhVienRouter.put(
  "/:id",
  validate(updateThanhVienRules),
  controller.updateThanhVien.bind(controller)
);

// ============================================================================
// DELETE ROUTES
// ============================================================================

/**
 * DELETE /:id
 * Xóa thành viên
 *
 * Rate Limit: 5 lần/giờ (thao tác nhạy cảm)
 * Validation: id phải là số nguyên dương
 */
thanhVienRouter.delete(
  "/:id",
  sensitiveLimiter,
  validate(idParamRules),
  controller.deleteThanhVien.bind(controller)
);

export default thanhVienRouter;
