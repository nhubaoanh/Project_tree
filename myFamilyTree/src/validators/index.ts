/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         VALIDATORS INDEX                                      ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Export tất cả validators từ một nơi                                         ║
 * ║                                                                               ║
 * ║  CÁCH SỬ DỤNG:                                                               ║
 * ║  import { loginRules, validate } from "../validators";                       ║
 * ║  router.post("/login", validate(loginRules), controller.login);              ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// Common rules - Các rules dùng chung
export * from "./commonRules";

// User validators
export * from "./userValidator";

// Thanh vien validators
export * from "./thanhVienValidator";

// Dong ho validators
export * from "./dongHoValidator";

// Su kien validators
export * from "./suKienValidator";

// Tai chinh validators
export * from "./taiChinhValidator";

// Tin tuc validators
export * from "./tinTucValidator";
