/**
 * RATE LIMITING MIDDLEWARE
 * Giới hạn số lượng request từ một IP trong khoảng thời gian
 */

import rateLimit from "express-rate-limit";

// ============================================================================
// 1. GENERAL LIMITER - Giới hạn chung cho tất cả API
// ============================================================================
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 500,
  message: {
    success: false,
    message: "Quá nhiều request, vui lòng thử lại sau 15 phút",
    error_code: "TOO_MANY_REQUESTS",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Bỏ custom keyGenerator để dùng mặc định
});

// ============================================================================
// 2. LOGIN LIMITER - Chống Brute Force Attack
// ============================================================================
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10, // 10 lần thử
  message: {
    success: false,
    message: "Quá nhiều lần đăng nhập thất bại, thử lại sau 15 phút",
    error_code: "LOGIN_BLOCKED",
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Bỏ custom keyGenerator để dùng mặc định
});

// ============================================================================
// 3. REGISTER LIMITER - Chống Spam Tài Khoản
// ============================================================================
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 5,
  message: {
    success: false,
    message: "Đã tạo quá nhiều tài khoản, thử lại sau 1 giờ",
    error_code: "REGISTER_BLOCKED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================================================
// 4. SENSITIVE LIMITER - Bảo vệ Thao Tác Nhạy Cảm
// ============================================================================
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 10,
  message: {
    success: false,
    message: "Quá nhiều thao tác nhạy cảm, thử lại sau 1 giờ",
    error_code: "SENSITIVE_BLOCKED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ============================================================================
// 5. UPLOAD LIMITER - Giới Hạn Upload File
// ============================================================================
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 50,
  message: {
    success: false,
    message: "Đã upload quá nhiều file, thử lại sau 1 giờ",
    error_code: "UPLOAD_BLOCKED",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
