/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         MIDDLEWARES INDEX                                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Export tất cả middlewares từ một nơi                                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// Rate Limiting - Giới hạn request
export {
  generalLimiter,
  loginLimiter,
  registerLimiter,
  sensitiveLimiter,
  uploadLimiter,
} from "./rateLimiter";

// Security Headers - Bảo vệ HTTP headers
export { securityHeaders, customSecurityHeaders } from "./securityHeaders";

// Sanitization - Làm sạch dữ liệu
export {
  sanitizeBody,
  sanitizeQuery,
  sanitizeParams,
  checkSqlInjection,
  sanitizeRequest,
  escapeHtml,
  sanitizeValue,
} from "./sanitizer";

// Validation - Xử lý kết quả validate
export { validate, handleValidationResult } from "./validateRequest";

// Auth - Xác thực
export * from "./authMiddleware";
