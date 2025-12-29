# 🔐 HƯỚNG DẪN BẢO MẬT BACKEND NODE.JS/EXPRESS

> Tài liệu này giải thích chi tiết các kỹ thuật bảo mật đã triển khai, cách hoạt động và cách sử dụng lại trong các dự án khác.

---

## 📋 MỤC LỤC

1. [Tổng quan Security Flow](#1-tổng-quan-security-flow)
2. [Rate Limiting](#2-rate-limiting---giới-hạn-request)
3. [Security Headers](#3-security-headers---bảo-vệ-http)
4. [Sanitization](#4-sanitization---làm-sạch-dữ-liệu)
5. [Validation](#5-validation---kiểm-tra-dữ-liệu)
6. [Cách triển khai nhanh](#6-cách-triển-khai-nhanh)

---

## 1. TỔNG QUAN SECURITY FLOW

```
Request từ Client
       ↓
┌─────────────────────────────────────────┐
│  1. CORS                                │  ← Kiểm tra domain được phép
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  2. SECURITY HEADERS (Helmet)           │  ← Thêm headers bảo mật
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  3. RATE LIMITING                       │  ← Chặn spam/DDoS
│     Quá giới hạn? → 429 Too Many        │
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  4. BODY PARSER (giới hạn size)         │  ← Parse JSON, chặn payload lớn
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  5. SANITIZATION                        │  ← Làm sạch input (XSS, SQL)
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  6. VALIDATION                          │  ← Kiểm tra format
│     Sai format? → 400 Bad Request       │
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  7. AUTHENTICATION                      │  ← Xác thực user (JWT)
└─────────────────────────────────────────┘
       ↓
┌─────────────────────────────────────────┐
│  8. BUSINESS LOGIC                      │  ← Xử lý nghiệp vụ
└─────────────────────────────────────────┘
       ↓
Response về Client
```

---

## 2. RATE LIMITING - Giới hạn Request

### 🎯 Mục đích
- **Chống DDoS**: Hacker gửi hàng triệu request làm sập server
- **Chống Brute Force**: Thử hàng nghìn mật khẩu để đăng nhập
- **Bảo vệ tài nguyên**: Server không bị quá tải

### 💡 Ví dụ thực tế
```
Không có Rate Limit:
- Hacker thử 10,000 mật khẩu/giây
- 17 phút = thử hết 1 triệu tổ hợp
- → Hack được tài khoản!

Có Rate Limit (5 lần/15 phút):
- Hacker chỉ thử được 5 lần
- Sau đó bị block 15 phút
- → Cần 50 năm để thử hết!
```

### 📦 Cài đặt
```bash
npm install express-rate-limit
```

### 🔧 Code mẫu
```typescript
// middlewares/rateLimiter.ts
import rateLimit from "express-rate-limit";

// Rate limit chung: 100 request / 15 phút
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 phút
  max: 100,                   // 100 requests
  message: {
    success: false,
    message: "Quá nhiều request, thử lại sau 15 phút",
  },
});

// Rate limit cho login: 5 lần / 15 phút
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  skipSuccessfulRequests: true,  // Chỉ đếm request thất bại
  message: {
    success: false,
    message: "Quá nhiều lần đăng nhập thất bại",
  },
});

// Rate limit cho đăng ký: 3 tài khoản / giờ
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 giờ
  max: 3,
  message: {
    success: false,
    message: "Đã tạo quá nhiều tài khoản",
  },
});
```

### 🚀 Cách sử dụng
```typescript
// app.ts - Áp dụng cho tất cả routes
app.use("/api", generalLimiter);

// routes/auth.ts - Áp dụng cho route cụ thể
router.post("/login", loginLimiter, controller.login);
router.post("/register", registerLimiter, controller.register);
```

---

## 3. SECURITY HEADERS - Bảo vệ HTTP

### 🎯 Mục đích
Thêm các HTTP headers báo browser cách bảo vệ user.

### 📊 Các headers quan trọng

| Header | Tác dụng | Ví dụ tấn công nếu không có |
|--------|----------|----------------------------|
| `X-Frame-Options` | Chống Clickjacking | Hacker nhúng trang bank vào iframe ẩn, user click "Xem ảnh" thực ra click "Chuyển tiền" |
| `X-XSS-Protection` | Bật XSS filter | Hacker chèn `<script>` đánh cắp cookie |
| `X-Content-Type-Options` | Chống MIME sniffing | Hacker upload file .txt chứa JS, browser chạy như JS |
| `Strict-Transport-Security` | Bắt buộc HTTPS | Hacker đọc được mật khẩu qua HTTP |
| `Content-Security-Policy` | Kiểm soát nguồn tài nguyên | Hacker load script từ server độc hại |

### 📦 Cài đặt
```bash
npm install helmet
```

### 🔧 Code mẫu
```typescript
// middlewares/securityHeaders.ts
import helmet from "helmet";

export const securityHeaders = helmet({
  // Chống Clickjacking
  frameguard: { action: "deny" },
  
  // Chống MIME sniffing
  noSniff: true,
  
  // Bật XSS filter
  xssFilter: true,
  
  // Ẩn X-Powered-By
  hidePoweredBy: true,
  
  // Bắt buộc HTTPS
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
  },
  
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
});
```

### 🚀 Cách sử dụng
```typescript
// app.ts
app.use(securityHeaders);
```

---

## 4. SANITIZATION - Làm sạch dữ liệu

### 🎯 Mục đích
Loại bỏ code độc hại trong input trước khi xử lý.

### 💡 Sanitization vs Validation
```
Input: "Hello <script>alert('hack')</script> World"

Validation: ❌ "Input chứa ký tự không hợp lệ" (từ chối)
Sanitization: ✅ "Hello  World" (loại bỏ script, giữ text)
```

### 🔧 Code mẫu
```typescript
// middlewares/sanitizer.ts

// Các pattern nguy hiểm cần loại bỏ
const XSS_PATTERNS = [
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,  // onclick=, onerror=
];

const SQL_PATTERNS = [
  /'\s*OR\s+'.*'\s*=\s*'/gi,  // ' OR '1'='1
  /;\s*DROP\s+/gi,             // ; DROP TABLE
  /UNION\s+SELECT/gi,          // UNION SELECT
];

// Làm sạch một giá trị
export function sanitizeValue(value: any): any {
  if (typeof value === "string") {
    let clean = value.trim();
    
    // Loại bỏ XSS patterns
    for (const pattern of XSS_PATTERNS) {
      clean = clean.replace(pattern, "");
    }
    
    return clean;
  }
  
  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }
  
  if (typeof value === "object" && value !== null) {
    const result: any = {};
    for (const key of Object.keys(value)) {
      result[key] = sanitizeValue(value[key]);
    }
    return result;
  }
  
  return value;
}

// Middleware
export const sanitizeBody = (req, res, next) => {
  if (req.body) {
    req.body = sanitizeValue(req.body);
  }
  next();
};

// Kiểm tra SQL Injection
export const checkSqlInjection = (req, res, next) => {
  const checkString = (str: string): boolean => {
    return SQL_PATTERNS.some(pattern => pattern.test(str));
  };
  
  const checkObject = (obj: any): boolean => {
    for (const value of Object.values(obj)) {
      if (typeof value === "string" && checkString(value)) {
        return true;
      }
      if (typeof value === "object" && value && checkObject(value)) {
        return true;
      }
    }
    return false;
  };
  
  if (checkObject(req.body) || checkObject(req.query)) {
    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
    });
  }
  
  next();
};
```

### 🚀 Cách sử dụng
```typescript
// app.ts
app.use(express.json({ limit: "10kb" }));  // Giới hạn size
app.use(sanitizeBody);
app.use(checkSqlInjection);
```

---

## 5. VALIDATION - Kiểm tra dữ liệu

### 🎯 Mục đích
Kiểm tra dữ liệu có đúng format không TRƯỚC KHI xử lý.

### 📦 Cài đặt
```bash
npm install express-validator
```

### 🔧 Cấu trúc thư mục
```
src/
├── validators/
│   ├── commonRules.ts      ← Rules dùng chung
│   ├── userValidator.ts    ← Rules cho user
│   ├── productValidator.ts ← Rules cho product
│   └── index.ts            ← Export tất cả
│
├── middlewares/
│   └── validateRequest.ts  ← Xử lý kết quả validation
```

### 🔧 Code mẫu

**validators/commonRules.ts** - Rules dùng chung
```typescript
import { body, param, ValidationChain } from "express-validator";

// String bắt buộc
export const requiredString = (field: string, label: string): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label} không được để trống`);

// String với độ dài
export const stringLength = (
  field: string,
  label: string,
  min: number,
  max: number
): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isLength({ min, max })
    .withMessage(`${label} phải từ ${min} đến ${max} ký tự`);

// Email
export const emailRule = (field: string = "email"): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage("Email không được để trống")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .normalizeEmail();

// Số điện thoại Việt Nam
export const phoneRule = (field: string = "phone"): ValidationChain =>
  body(field)
    .trim()
    .notEmpty()
    .withMessage("SĐT không được để trống")
    .matches(/^(0|\+84)[0-9]{9,10}$/)
    .withMessage("SĐT không hợp lệ");

// Mật khẩu mạnh
export const strongPassword = (field: string = "password"): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage("Mật khẩu không được để trống")
    .isLength({ min: 8 })
    .withMessage("Mật khẩu tối thiểu 8 ký tự")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage("Mật khẩu phải có chữ hoa, chữ thường và số");

// ID trong URL params
export const idParam = (field: string = "id"): ValidationChain =>
  param(field)
    .isInt({ min: 1 })
    .withMessage("ID không hợp lệ");

// Số dương
export const positiveNumber = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isFloat({ min: 0.01 })
    .withMessage(`${label} phải lớn hơn 0`);

// Ngày tháng
export const dateRule = (field: string, label: string): ValidationChain =>
  body(field)
    .notEmpty()
    .withMessage(`${label} không được để trống`)
    .isISO8601()
    .withMessage(`${label} không đúng định dạng`);

// Optional versions
export const optionalString = (field: string, label: string): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .trim()
    .isString()
    .withMessage(`${label} phải là chuỗi`);

export const optionalEmail = (field: string = "email"): ValidationChain =>
  body(field)
    .optional({ values: "falsy" })
    .isEmail()
    .withMessage("Email không hợp lệ");
```

**validators/userValidator.ts** - Rules cho user
```typescript
import { ValidationChain } from "express-validator";
import { stringLength, strongPassword, emailRule, optionalEmail } from "./commonRules";

export const loginRules: ValidationChain[] = [
  stringLength("username", "Tài khoản", 3, 50),
  stringLength("password", "Mật khẩu", 6, 50),
];

export const signupRules: ValidationChain[] = [
  stringLength("username", "Tài khoản", 3, 50),
  strongPassword("password"),
  emailRule("email"),
];

export const updateUserRules: ValidationChain[] = [
  optionalEmail("email"),
  // ... các rules khác
];
```

**middlewares/validateRequest.ts** - Xử lý kết quả
```typescript
import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

// Middleware xử lý kết quả validation
export const handleValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => ({
      field: (err as any).path,
      message: err.msg,
    }));

    return res.status(400).json({
      success: false,
      message: "Dữ liệu không hợp lệ",
      errors: errorMessages,
    });
  }

  next();
};

// Helper: Kết hợp rules với handler
export const validate = (rules: ValidationChain[]) => {
  return [...rules, handleValidationResult];
};
```

### 🚀 Cách sử dụng
```typescript
// routes/user.ts
import { validate } from "../middlewares/validateRequest";
import { loginRules, signupRules } from "../validators";

router.post("/login", validate(loginRules), controller.login);
router.post("/signup", validate(signupRules), controller.signup);
```

---

## 6. CÁCH TRIỂN KHAI NHANH

### Bước 1: Cài đặt packages
```bash
npm install express-rate-limit helmet express-validator hpp
```

### Bước 2: Copy các file middleware
```
middlewares/
├── rateLimiter.ts
├── securityHeaders.ts
├── sanitizer.ts
├── validateRequest.ts
└── index.ts

validators/
├── commonRules.ts
├── userValidator.ts
└── index.ts
```

### Bước 3: Cấu hình app.ts
```typescript
import express from "express";
import cors from "cors";
import hpp from "hpp";
import { securityHeaders } from "./middlewares/securityHeaders";
import { generalLimiter } from "./middlewares/rateLimiter";
import { sanitizeBody, checkSqlInjection } from "./middlewares/sanitizer";

const app = express();

// 1. CORS
app.use(cors());

// 2. Security Headers
app.use(securityHeaders);

// 3. Rate Limiting
app.use("/api", generalLimiter);

// 4. Body Parser với giới hạn size
app.use(express.json({ limit: "10kb" }));

// 5. HPP
app.use(hpp());

// 6. Sanitization
app.use(sanitizeBody);
app.use(checkSqlInjection);

// 7. Routes
app.use("/api", routes);

export default app;
```

### Bước 4: Sử dụng trong routes
```typescript
import { validate } from "../middlewares/validateRequest";
import { loginLimiter } from "../middlewares/rateLimiter";
import { loginRules } from "../validators";

// Route với đầy đủ bảo mật
router.post(
  "/login",
  loginLimiter,           // Rate limit
  validate(loginRules),   // Validation
  controller.login        // Business logic
);
```

---

## 📝 CHECKLIST BẢO MẬT

- [ ] Rate Limiting cho tất cả API
- [ ] Rate Limiting nghiêm ngặt cho login (5 lần/15 phút)
- [ ] Rate Limiting cho đăng ký (3 tài khoản/giờ)
- [ ] Security Headers (Helmet)
- [ ] Giới hạn body size (10KB)
- [ ] Sanitization (XSS, SQL Injection)
- [ ] Validation cho tất cả input
- [ ] HTTPS (production)
- [ ] Parameterized Queries (trong repository)
- [ ] JWT với expiration time
- [ ] Password hashing (bcrypt)

---

## 🔗 Tài liệu tham khảo

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet.js](https://helmetjs.github.io/)
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit)
- [express-validator](https://express-validator.github.io/)
