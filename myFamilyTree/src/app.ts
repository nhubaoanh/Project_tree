/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                              APP.TS - MAIN APPLICATION                        ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║                                                                               ║
 * ║  SECURITY FLOW - THỨ TỰ XỬ LÝ REQUEST:                                       ║
 * ║                                                                               ║
 * ║  Request từ Client                                                            ║
 * ║       ↓                                                                       ║
 * ║  1. CORS            → Kiểm tra origin                                        ║
 * ║  2. SECURITY HEADERS → Thêm headers bảo mật (Helmet)                         ║
 * ║  3. RATE LIMITING   → Chặn spam/DDoS (100 req/15 phút)                       ║
 * ║  4. BODY PARSER     → Parse JSON (giới hạn 10KB)                             ║
 * ║  5. HPP             → Chống duplicate params                                 ║
 * ║  6. SANITIZATION    → Làm sạch input (loại bỏ script, XSS)                   ║
 * ║  7. SQL CHECK       → Kiểm tra SQL injection                                 ║
 * ║  8. ROUTES          → Xử lý business logic                                   ║
 * ║       ↓                                                                       ║
 * ║  Response về Client                                                           ║
 * ║                                                                               ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import express, { Request, Response } from "express";
import "reflect-metadata";
import path from "path";
import cors from "cors";
import hpp from "hpp";

// Security middlewares
import {
  securityHeaders,
  customSecurityHeaders,
} from "./middlewares/securityHeaders";
import { generalLimiter } from "./middlewares/rateLimiter";
import {
  sanitizeBody,
  sanitizeQuery,
  sanitizeParams,
  checkSqlInjection,
} from "./middlewares/sanitizer";

// Routes
import router from "./routes/index";
import core_router from "./core/routes";
import aiRouter from "./routes/aiRouter";
import { errorHandler } from "./errors/errorHandle";

const app = express();

// ============================================================================
// 1. CORS - Cho phép cross-origin requests
// ============================================================================
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ============================================================================
// 2. SECURITY HEADERS - Bảo vệ HTTP headers (Helmet)
// ============================================================================
app.use(securityHeaders);
app.use(customSecurityHeaders);

// ============================================================================
// 3. RATE LIMITING - Chống DDoS/Brute Force
// ============================================================================
app.use("/api-core", generalLimiter);

// ============================================================================
// 4. BODY PARSER - Parse JSON với giới hạn size
// ============================================================================
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ============================================================================
// 5. HPP - Chống HTTP Parameter Pollution
// ============================================================================
app.use(hpp());

// ============================================================================
// 6. SANITIZATION - Làm sạch dữ liệu đầu vào
// ============================================================================
app.use(sanitizeBody);
app.use(sanitizeQuery);
app.use(sanitizeParams);

// ============================================================================
// 7. SQL INJECTION CHECK - Kiểm tra SQL injection
// ============================================================================
app.use(checkSqlInjection);

// ============================================================================
// STATIC FILES
// ============================================================================
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// ============================================================================
// 8. ROUTES
// ============================================================================
app.use("/api-core", core_router);
app.use("/api-core", router);
app.use("/api-core/ai", aiRouter);

// ============================================================================
// ERROR HANDLING
// ============================================================================
app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Không tìm thấy đường dẫn",
    error_code: "NOT_FOUND",
  });
});

export default app;
