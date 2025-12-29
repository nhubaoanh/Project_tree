/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         RATE LIMITING MIDDLEWARE                              ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  MỤC ĐÍCH: Giới hạn số lượng request từ một IP trong khoảng thời gian        ║
 * ║                                                                               ║
 * ║  TẠI SAO CẦN?                                                                 ║
 * ║  1. Chống DDoS: Hacker gửi hàng triệu request để làm sập server              ║
 * ║  2. Chống Brute Force: Thử hàng nghìn mật khẩu để đăng nhập                  ║
 * ║  3. Bảo vệ tài nguyên: Server không bị quá tải                               ║
 * ║  4. Công bằng: Không cho 1 user chiếm hết bandwidth                          ║
 * ║                                                                               ║
 * ║  VÍ DỤ THỰC TẾ:                                                              ║
 * ║  - Không có Rate Limit: Hacker thử 10,000 mật khẩu/giây → Hack được          ║
 * ║  - Có Rate Limit: Chỉ cho 5 lần/15 phút → Hacker mất 50 năm để thử hết       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import rateLimit from "express-rate-limit";
import { Request } from "express";

// ============================================================================
// HELPER: Lấy IP của client (hỗ trợ cả proxy)
// ============================================================================
const getClientIP = (req: Request): string => {
  // Nếu có proxy (nginx, cloudflare), IP thật nằm trong header
  const forwardedFor = req.headers["x-forwarded-for"];
  if (forwardedFor) {
    // x-forwarded-for có thể là: "client, proxy1, proxy2"
    // Lấy IP đầu tiên (client thật)
    return (forwardedFor as string).split(",")[0].trim();
  }
  return req.ip || "unknown";
};

// ============================================================================
// 1. GENERAL LIMITER - Giới hạn chung cho tất cả API
// ============================================================================
/**
 * Áp dụng cho: Tất cả routes
 * Giới hạn: 500 requests / 15 phút / IP
 *
 * Tại sao 500/15 phút?
 * - Dashboard có thể load 10-20 API cùng lúc
 * - User navigate nhiều trang, mỗi trang load data
 * - Cho phép đủ cho UX mượt mà
 * - Vẫn đủ thấp để chặn bot spam
 */
export const generalLimiter = rateLimit({
  // Cửa sổ thời gian: 15 phút (tính bằng milliseconds)
  windowMs: 15 * 60 * 1000,

  // Số request tối đa trong cửa sổ thời gian
  max: 500,

  // Message trả về khi vượt giới hạn
  message: {
    success: false,
    message: "Quá nhiều request, vui lòng thử lại sau 15 phút",
    error_code: "TOO_MANY_REQUESTS",
  },

  // Trả về headers: X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset
  standardHeaders: true,
  legacyHeaders: false,

  // Hàm lấy key để đếm (dùng IP)
  keyGenerator: getClientIP,
});

// ============================================================================
// 2. LOGIN LIMITER - Chống Brute Force Attack
// ============================================================================
/**
 * Áp dụng cho: POST /login
 * Giới hạn: 5 lần thử / 15 phút / IP
 *
 * BRUTE FORCE LÀ GÌ?
 * - Hacker thử tất cả mật khẩu có thể: "000000", "000001", ..., "999999"
 * - Với 6 số: 1,000,000 tổ hợp
 * - Không có limit: Thử 1000 lần/giây → 17 phút là xong
 * - Có limit 5/15 phút: Cần 50 năm để thử hết!
 *
 * LƯU Ý: Đếm TẤT CẢ request, không chỉ request thất bại
 * Vì controller có thể trả về status 200 với success: false
 */
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 5, // Chỉ 5 lần thử

  message: {
    success: false,
    message: "Quá nhiều lần đăng nhập thất bại, thử lại sau 15 phút",
    error_code: "LOGIN_BLOCKED",
  },

  standardHeaders: true,
  legacyHeaders: false,

  // Block theo TÀI KHOẢN + IP (kết hợp cả 2 để bảo mật hơn)
  // - Cùng IP, khác tài khoản: Không bị block lẫn nhau
  // - Cùng tài khoản, khác IP: Mỗi IP có limit riêng
  keyGenerator: (req: Request): string => {
    const ip = getClientIP(req);
    const username = req.body?.tenDangNhap || "unknown";
    return `${ip}:${username}`;
  },

  // Đếm TẤT CẢ request (không dùng skipSuccessfulRequests)
  // Vì controller trả về 200 với success: false khi sai mật khẩu
});

// ============================================================================
// 3. REGISTER LIMITER - Chống Spam Tài Khoản
// ============================================================================
/**
 * Áp dụng cho: POST /signup, POST /register
 * Giới hạn: 3 tài khoản / 1 giờ / IP
 *
 * TẠI SAO CẦN?
 * - Chống tạo hàng loạt tài khoản fake
 * - Chống spam email xác nhận
 * - Bảo vệ database khỏi dữ liệu rác
 */
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 3, // Tối đa 3 tài khoản

  message: {
    success: false,
    message: "Đã tạo quá nhiều tài khoản, thử lại sau 1 giờ",
    error_code: "REGISTER_BLOCKED",
  },

  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIP,
});

// ============================================================================
// 4. SENSITIVE LIMITER - Bảo vệ Thao Tác Nhạy Cảm
// ============================================================================
/**
 * Áp dụng cho: Đổi mật khẩu, xóa tài khoản, xóa dữ liệu quan trọng
 * Giới hạn: 5 lần / 1 giờ / IP
 *
 * TẠI SAO CẦN?
 * - Hacker chiếm được session → Không thể xóa hết dữ liệu ngay
 * - Cho user thời gian phát hiện và khóa tài khoản
 */
export const sensitiveLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 5,

  message: {
    success: false,
    message: "Quá nhiều thao tác nhạy cảm, thử lại sau 1 giờ",
    error_code: "SENSITIVE_BLOCKED",
  },

  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIP,
});

// ============================================================================
// 5. UPLOAD LIMITER - Giới Hạn Upload File
// ============================================================================
/**
 * Áp dụng cho: Upload ảnh, file, import data
 * Giới hạn: 20 files / 1 giờ / IP
 *
 * TẠI SAO CẦN?
 * - Upload file tốn nhiều tài nguyên server
 * - Chống spam file rác chiếm hết disk space
 */
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 giờ
  max: 20,

  message: {
    success: false,
    message: "Đã upload quá nhiều file, thử lại sau 1 giờ",
    error_code: "UPLOAD_BLOCKED",
  },

  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: getClientIP,
});
