import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log chi tiết lỗi để debug
  console.error("═".repeat(50));
  console.error("[ERROR HANDLER]");
  console.error("URL:", req.method, req.originalUrl);
  
  // Safe log body (có thể undefined khi upload file)
  try {
    const bodyStr = req.body ? JSON.stringify(req.body) : "undefined";
    console.error("Body:", bodyStr.substring(0, 200));
  } catch {
    console.error("Body: [Cannot stringify]");
  }
  
  console.error("Error:", err.message);
  console.error("Stack:", err.stack);
  console.error("═".repeat(50));

  // Trả về response
  res.status(500).json({
    success: false,
    error: "Lỗi máy chủ",
    message: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
