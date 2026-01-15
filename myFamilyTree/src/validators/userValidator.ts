/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         USER VALIDATORS                                       ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Validators cho các route liên quan đến người dùng                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { ValidationChain } from "express-validator";
import {
  stringLength,
  passwordRule,
  strongPasswordRule,
  emailRule,
  optionalEmail,
  optionalPhone,
  optionalStringLength,
  requiredId,
  paginationRules,
} from "./commonRules";

// ============================================================================
// LOGIN VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu đăng nhập
 *
 * Fields:
 * - tenDangNhap: Bắt buộc, 3-50 ký tự (đúng với controller)
 * - matKhau: Bắt buộc, 6-50 ký tự
 */
export const loginRules: ValidationChain[] = [
  stringLength("tenDangNhap", "Tên đăng nhập", 3, 50),
  passwordRule("matKhau"),
];

// ============================================================================
// SIGNUP VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu đăng ký
 *
 * Fields:
 * - taiKhoan: Bắt buộc, 3-50 ký tự
 * - matKhau: Bắt buộc, mật khẩu mạnh (8+ ký tự, chữ hoa, thường, số)
 * - email: Tùy chọn, format email
 * - hoTen: Tùy chọn, tối đa 100 ký tự
 * - soDienThoai: Tùy chọn, format SĐT Việt Nam
 */
export const signupRules: ValidationChain[] = [
  stringLength("taiKhoan", "Tài khoản", 3, 50),
  strongPasswordRule("matKhau"),
  optionalEmail("email"),
  optionalStringLength("hoTen", "Họ tên", 100),
  optionalPhone("soDienThoai"),
];

// ============================================================================
// RESET PASSWORD VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu reset mật khẩu
 *
 * Fields:
 * - tenDangNhap: Bắt buộc, 3-50 ký tự (username hoặc email)
 */
export const resetPasswordRules: ValidationChain[] = [
  stringLength("tenDangNhap", "Tên đăng nhập", 3, 50)
];

// ============================================================================
// UPDATE USER VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu cập nhật user
 *
 * Fields:
 * - nguoiDungId: Bắt buộc (UUID)
 * - email: Tùy chọn
 * - full_name: Tùy chọn
 * - phone: Tùy chọn
 * - gender: Tùy chọn (0 hoặc 1)
 */
export const updateUserRules: ValidationChain[] = [
  stringLength("nguoiDungId", "ID người dùng", 1, 50),
  optionalEmail("email"),
  optionalStringLength("full_name", "Họ tên", 100),
  optionalPhone("phone"),
  // Không validate gender vì có thể là 0 (falsy)
];

// ============================================================================
// SEARCH USER VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu tìm kiếm user
 */
export const searchUserRules: ValidationChain[] = [
  optionalStringLength("keyword", "Từ khóa", 100),
  ...paginationRules,
];
