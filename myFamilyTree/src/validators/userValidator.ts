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
 * - email: Bắt buộc, format email
 */
export const resetPasswordRules: ValidationChain[] = [emailRule("email")];

// ============================================================================
// UPDATE USER VALIDATOR
// ============================================================================
/**
 * Validate dữ liệu cập nhật user
 *
 * Fields:
 * - id: Bắt buộc, số nguyên dương
 * - email: Tùy chọn
 * - hoTen: Tùy chọn
 * - soDienThoai: Tùy chọn
 */
export const updateUserRules: ValidationChain[] = [
  requiredId("id", "ID"),
  optionalEmail("email"),
  optionalStringLength("hoTen", "Họ tên", 100),
  optionalPhone("soDienThoai"),
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
