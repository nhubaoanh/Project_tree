/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         VALIDATE REQUEST MIDDLEWARE                           ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Middleware xử lý kết quả validation từ express-validator                    ║
 * ║                                                                               ║
 * ║  CÁCH SỬ DỤNG:                                                               ║
 * ║  import { validate } from "../middlewares/validateRequest";                  ║
 * ║  import { loginRules } from "../validators";                                 ║
 * ║                                                                               ║
 * ║  router.post("/login", validate(loginRules), controller.login);              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

/**
 * Middleware xử lý kết quả validation
 *
 * Chạy SAU các validation rules
 * Kiểm tra có lỗi không → Trả về response lỗi chi tiết
 */
export const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Lấy tất cả lỗi validation
  const errors = validationResult(req);

  // Nếu có lỗi → Trả về 400 Bad Request
  if (!errors.isEmpty()) {
    // Format lỗi cho dễ đọc
    const errorMessages = errors.array().map((err) => ({
      field: (err as any).path || (err as any).param,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      error_code: "VALIDATION_ERROR",
      errors: errorMessages,
    });
  }

  // Không có lỗi → Tiếp tục xử lý
  next();
};

/**
 * Helper function: Kết hợp validation rules với handler
 *
 * @param rules - Mảng các ValidationChain từ validators
 * @returns Mảng middleware (rules + handler)
 *
 * VÍ DỤ:
 * ```typescript
 * import { validate } from "../middlewares/validateRequest";
 * import { loginRules } from "../validators";
 *
 * // Cách 1: Dùng validate()
 * router.post("/login", validate(loginRules), controller.login);
 *
 * // Cách 2: Spread rules + handler
 * router.post("/login", ...loginRules, handleValidationResult, controller.login);
 * ```
 */
export const validate = (rules: ValidationChain[]) => {
  return [...rules, handleValidationResult];
};
