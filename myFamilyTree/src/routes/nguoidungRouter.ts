/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         NGUOI DUNG ROUTER                                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Routes quản lý người dùng (đăng nhập, đăng ký, cập nhật...)                 ║
 * ║                                                                               ║
 * ║  BẢO MẬT:                                                                    ║
 * ║  - authenticate: Xác thực JWT token                                          ║
 * ║  - adminOnly: Chỉ Admin mới được thực hiện                                   ║
 * ║  - loginLimiter: 5 lần/15 phút (chống brute force)                           ║
 * ║  - registerLimiter: 3 tài khoản/giờ (chống spam)                             ║
 * ║  - sensitiveLimiter: 5 lần/giờ (thao tác nhạy cảm)                           ║
 * ║  - validate(): Kiểm tra format dữ liệu                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Router } from "express";
import { container } from "tsyringe";
import { NguoiDungController } from "../controllers/nguoidungController";

// Auth Middleware
import { authenticate, adminOnly, checkDongHoAccess } from "../middlewares/authMiddleware";

// Rate Limiters
import {
  loginLimiter,
  registerLimiter,
  sensitiveLimiter,
} from "../middlewares/rateLimiter";

// Validation
import { validate } from "../middlewares/validateRequest";
import {
  loginRules,
  signupRules,
  resetPasswordRules,
  updateUserRules,
  searchUserRules,
} from "../validators";

const nguoiDungRouter = Router();
const userController = container.resolve(NguoiDungController);


// ============================================================================
// PUBLIC ROUTES - Không cần đăng nhập
// ============================================================================

/**
 * GET /authorize/:token
 * Xác thực token
 */
nguoiDungRouter.get(
  "/authorize/:token",
  userController.authorize.bind(userController)
);

/**
 * POST /checkuser
 * Kiểm tra user tồn tại
 */
nguoiDungRouter.post(
  "/checkuser",
  userController.checkUser.bind(userController)
);

/**
 * POST /login
 * Đăng nhập
 *
 * Rate Limit: 5 lần/15 phút (chống brute force)
 * Validation: taiKhoan (3-50 ký tự), matKhau (6-50 ký tự)
 */
nguoiDungRouter.post(
  "/login",
  loginLimiter,
  validate(loginRules),
  userController.loginUser.bind(userController)
);

/**
 * POST /signup
 * Đăng ký tài khoản mới
 *
 * Rate Limit: 3 tài khoản/giờ (chống spam)
 * Validation: taiKhoan, matKhau (mạnh), email, hoTen, soDienThoai
 */
nguoiDungRouter.post(
  "/signup",
  registerLimiter,
  validate(signupRules),
  userController.createNguoiDung.bind(userController)
);

/**
 * POST /reset-password
 * Reset mật khẩu qua email
 *
 * Rate Limit: 5 lần/giờ (thao tác nhạy cảm)
 * Validation: email
 */
nguoiDungRouter.post(
  "/reset-password",
  sensitiveLimiter,
  validate(resetPasswordRules),
  userController.resetPassword.bind(userController)
);

// ============================================================================
// PROTECTED ROUTES - Cần đăng nhập
// ============================================================================


/**
 * POST /search
 * Tìm kiếm user (Admin only)
 */
nguoiDungRouter.post(
  "/search",
  authenticate,
  adminOnly,
  validate(searchUserRules),
  userController.searchUser.bind(userController)
);

/**
 * POST /insert-user
 * Thêm user mới (Admin only)
 */
nguoiDungRouter.post(
  "/insert-user",
  authenticate,
  adminOnly,
  registerLimiter,
  userController.insertUser.bind(userController)
);

/**
 * POST /update-user
 * Cập nhật thông tin user (Admin only)
 */
nguoiDungRouter.post(
  "/update-user",
  authenticate,
  adminOnly,
  validate(updateUserRules),
  userController.updateUser.bind(userController)
);

/**
 * POST /update-user-profile
 * Cập nhật profile cá nhân (user tự cập nhật)
 */
nguoiDungRouter.post(
  "/update-user-profile",
  authenticate,
  userController.UpdateMyProfile.bind(userController)
);

/**
 * POST /delete
 * Xóa user (Admin only)
 *
 * Rate Limit: 5 lần/giờ (thao tác nhạy cảm)
 */
nguoiDungRouter.post(
  "/delete",
  authenticate,
  adminOnly,
  sensitiveLimiter,
  userController.deleteUser.bind(userController)
);

export default nguoiDungRouter;
