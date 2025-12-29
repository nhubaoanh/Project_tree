/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SECURITY HEADERS MIDDLEWARE                           ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  MỤC ĐÍCH: Thêm các HTTP headers bảo mật vào response                        ║
 * ║                                                                               ║
 * ║  HTTP HEADERS LÀ GÌ?                                                          ║
 * ║  - Metadata đi kèm request/response                                          ║
 * ║  - Browser đọc headers để biết cách xử lý response                           ║
 * ║  - Security headers báo browser cách bảo vệ user                             ║
 * ║                                                                               ║
 * ║  VÍ DỤ:                                                                       ║
 * ║  Response headers:                                                            ║
 * ║    X-Frame-Options: DENY          → Không cho nhúng vào iframe               ║
 * ║    X-XSS-Protection: 1            → Bật filter XSS của browser               ║
 * ║    X-Content-Type-Options: nosniff → Không đoán MIME type                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import helmet from "helmet";
import { Request, Response, NextFunction } from "express";

// ============================================================================
// HELMET - THƯ VIỆN BẢO MẬT HTTP HEADERS
// ============================================================================
/**
 * Helmet là thư viện phổ biến nhất để set security headers
 * Nó bao gồm nhiều middleware nhỏ, mỗi cái set 1 loại header
 */
export const securityHeaders = helmet({
  // --------------------------------------------------------------------------
  // 1. X-Frame-Options: Chống Clickjacking
  // --------------------------------------------------------------------------
  /**
   * CLICKJACKING LÀ GÌ?
   * - Hacker tạo trang web có iframe ẩn chứa trang bank của bạn
   * - User click vào nút "Xem ảnh đẹp"
   * - Thực ra đang click nút "Chuyển tiền" trong iframe ẩn
   * - Mất tiền!
   *
   * CÁCH CHỐNG:
   * - X-Frame-Options: DENY → Không cho nhúng vào iframe
   * - Browser sẽ từ chối hiển thị trang trong iframe
   */
  frameguard: {
    action: "deny", // Không cho phép nhúng vào iframe
  },

  // --------------------------------------------------------------------------
  // 2. X-Content-Type-Options: Chống MIME Sniffing
  // --------------------------------------------------------------------------
  /**
   * MIME SNIFFING LÀ GÌ?
   * - Browser cố đoán loại file dựa vào nội dung
   * - Hacker upload file .txt chứa JavaScript
   * - Browser đoán đây là JS → Chạy code độc
   *
   * CÁCH CHỐNG:
   * - X-Content-Type-Options: nosniff
   * - Browser chỉ tin Content-Type header, không đoán
   */
  noSniff: true,

  // --------------------------------------------------------------------------
  // 3. X-XSS-Protection: Bật XSS Filter của Browser
  // --------------------------------------------------------------------------
  /**
   * Browser có sẵn filter để phát hiện XSS đơn giản
   * Header này bật filter đó lên
   *
   * Lưu ý: Các browser mới đã bỏ filter này
   * Nhưng vẫn nên set để hỗ trợ browser cũ
   */
  xssFilter: true,

  // --------------------------------------------------------------------------
  // 4. X-Powered-By: Ẩn thông tin server
  // --------------------------------------------------------------------------
  /**
   * Mặc định Express gửi: X-Powered-By: Express
   * Hacker biết bạn dùng Express → Tìm lỗ hổng của Express
   *
   * CÁCH CHỐNG:
   * - Xóa header này đi
   * - Hacker không biết bạn dùng framework gì
   */
  hidePoweredBy: true,

  // --------------------------------------------------------------------------
  // 5. Strict-Transport-Security (HSTS): Bắt buộc HTTPS
  // --------------------------------------------------------------------------
  /**
   * HSTS LÀ GÌ?
   * - Báo browser: "Luôn dùng HTTPS khi truy cập trang này"
   * - Lần sau user gõ http://... → Browser tự chuyển https://...
   *
   * TẠI SAO CẦN?
   * - HTTP không mã hóa → Hacker đọc được mật khẩu
   * - HTTPS mã hóa → An toàn
   *
   * maxAge: 31536000 = 1 năm
   * - Browser nhớ trong 1 năm phải dùng HTTPS
   */
  hsts: {
    maxAge: 31536000, // 1 năm (tính bằng giây)
    includeSubDomains: true, // Áp dụng cho cả subdomain
    preload: true, // Cho phép thêm vào HSTS preload list
  },

  // --------------------------------------------------------------------------
  // 6. Content-Security-Policy (CSP): Kiểm soát nguồn tài nguyên
  // --------------------------------------------------------------------------
  /**
   * CSP LÀ GÌ?
   * - Quy định browser chỉ được load tài nguyên từ nguồn cho phép
   * - Hacker chèn <script src="hacker.com/evil.js"> → Browser từ chối load
   *
   * CÁC DIRECTIVE:
   * - defaultSrc: Nguồn mặc định cho tất cả
   * - scriptSrc: Nguồn cho JavaScript
   * - styleSrc: Nguồn cho CSS
   * - imgSrc: Nguồn cho hình ảnh
   * - connectSrc: Nguồn cho AJAX/fetch
   */
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"], // Chỉ load từ cùng domain
      scriptSrc: ["'self'"], // JS chỉ từ cùng domain
      styleSrc: ["'self'", "'unsafe-inline'"], // CSS cho phép inline
      imgSrc: ["'self'", "data:", "https:"], // Ảnh từ self, data URL, HTTPS
      connectSrc: ["'self'"], // AJAX chỉ đến cùng domain
      fontSrc: ["'self'"], // Font từ cùng domain
      objectSrc: ["'none'"], // Không cho <object>, <embed>
      mediaSrc: ["'self'"], // Video/audio từ cùng domain
      frameSrc: ["'none'"], // Không cho iframe
    },
  },

  // --------------------------------------------------------------------------
  // 7. DNS Prefetch Control
  // --------------------------------------------------------------------------
  /**
   * Browser tự động resolve DNS cho các link trong trang
   * Có thể bị lợi dụng để tracking user
   *
   * allow: false → Tắt tính năng này
   */
  dnsPrefetchControl: {
    allow: false,
  },

  // --------------------------------------------------------------------------
  // 8. Referrer Policy
  // --------------------------------------------------------------------------
  /**
   * Khi click link từ trang A sang trang B
   * Browser gửi header Referer: https://trang-a.com/path
   *
   * Vấn đề: URL có thể chứa thông tin nhạy cảm
   * VD: https://bank.com/account/123456
   *
   * strict-origin-when-cross-origin:
   * - Cùng domain: Gửi full URL
   * - Khác domain: Chỉ gửi origin (https://bank.com)
   */
  referrerPolicy: {
    policy: "strict-origin-when-cross-origin",
  },
});

// ============================================================================
// CUSTOM SECURITY HEADERS - Các headers bổ sung
// ============================================================================
/**
 * Một số headers không có trong Helmet, cần set thủ công
 */
export const customSecurityHeaders = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // --------------------------------------------------------------------------
  // Cache-Control: Không cache response nhạy cảm
  // --------------------------------------------------------------------------
  /**
   * TẠI SAO KHÔNG CACHE?
   * - Response chứa thông tin user → Cache → User khác có thể thấy
   * - Đặc biệt quan trọng với shared computer
   *
   * no-store: Không lưu vào cache
   * no-cache: Phải validate với server trước khi dùng cache
   * must-revalidate: Bắt buộc validate khi cache hết hạn
   */
  res.setHeader(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.setHeader("Pragma", "no-cache"); // HTTP/1.0 compatibility
  res.setHeader("Expires", "0"); // Hết hạn ngay lập tức

  // --------------------------------------------------------------------------
  // Permissions-Policy: Kiểm soát quyền truy cập tính năng
  // --------------------------------------------------------------------------
  /**
   * Quy định trang web có được dùng các tính năng nhạy cảm không
   * - geolocation: Vị trí GPS
   * - microphone: Micro
   * - camera: Camera
   *
   * () = không cho phép
   */
  res.setHeader(
    "Permissions-Policy",
    "geolocation=(), microphone=(), camera=()"
  );

  next();
};
