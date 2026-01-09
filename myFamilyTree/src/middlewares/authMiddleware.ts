/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         AUTH & AUTHORIZATION MIDDLEWARE                       ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  1. authenticate: Xác thực token JWT                                         ║
 * ║  2. authorize: Kiểm tra quyền truy cập chức năng                            ║
 * ║  3. checkDongHoAccess: Kiểm tra quyền truy cập dòng họ                      ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../config/jwt";

// Extend Request để thêm user info
declare global {
  namespace Express {
    interface Request {
      user?: {
        nguoiDungId: string;
        dongHoId: string | null;
        roleId: string;
        roleCode: string;
        full_name: string;
      };
    }
  }
}

/**
 * Middleware xác thực JWT token
 * Decode token và gắn user info vào request
 */
export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập",
      error_code: "NO_TOKEN",
    });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({
      success: false,
      message: "Phiên đăng nhập hết hạn",
      error_code: "INVALID_TOKEN",
    });
  }

  // Gắn user info vào request
  req.user = {
    nguoiDungId: decoded.nguoiDungId,
    dongHoId: decoded.dongHoId,
    roleId: decoded.roleId,
    roleCode: decoded.roleCode,
    full_name: decoded.full_name,
  };

  next();
};

/**
 * Middleware kiểm tra quyền truy cập chức năng
 * @param chucNangCode - Mã chức năng (VD: THANHVIEN, SUKIEN...)
 * @param thaoTacCode - Mã thao tác (VD: VIEW, CREATE, UPDATE, DELETE)
 */
export const authorize = (chucNangCode: string, thaoTacCode: string = "VIEW") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Vui lòng đăng nhập",
        error_code: "NOT_AUTHENTICATED",
      });
    }

    // Admin (sa) có tất cả quyền
    if (user.roleCode === "sa") {
      return next();
    }

    // TODO: Kiểm tra quyền từ database (role_chucnang)
    // Tạm thời cho phép Thủ đồ truy cập các chức năng cơ bản
    if (user.roleCode === "thudo") {
      const allowedFunctions = [
        "DASHBOARD", "THANHVIEN", "SUKIEN", "TAICHINH", 
        "TAILIEU", "TINTUC", "CHICHI"
      ];
      if (allowedFunctions.includes(chucNangCode)) {
        return next();
      }
    }

    // Thành viên chỉ được xem
    if (user.roleCode === "thanhvien") {
      const viewOnlyFunctions = ["DASHBOARD", "THANHVIEN", "SUKIEN", "TINTUC"];
      if (viewOnlyFunctions.includes(chucNangCode) && thaoTacCode === "VIEW") {
        return next();
      }
    }

    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền thực hiện thao tác này",
      error_code: "FORBIDDEN",
    });
  };
};

/**
 * Middleware kiểm tra quyền truy cập dòng họ
 * - Admin: Truy cập tất cả dòng họ
 * - Thủ đồ/Thành viên: Chỉ truy cập dòng họ của mình
 */
export const checkDongHoAccess = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập",
      error_code: "NOT_AUTHENTICATED",
    });
  }

  // Admin có quyền truy cập tất cả
  if (user.roleCode === "sa") {
    return next();
  }

  // Lấy dongHoId từ request (params, query, hoặc body)
  const requestedDongHoId =
    req.params.dongHoId ||
    req.query.dongHoId ||
    req.body.dongHoId;

  // Nếu không có dongHoId trong request, tự động dùng dongHoId của user
  if (!requestedDongHoId) {
    // Gắn dongHoId của user vào request để các handler sử dụng
    req.body.dongHoId = user.dongHoId;
    req.query.dongHoId = user.dongHoId as any;
    return next();
  }

  // Kiểm tra user có quyền truy cập dongHoId này không
  if (user.dongHoId !== requestedDongHoId) {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền truy cập dòng họ này",
      error_code: "DONGHO_ACCESS_DENIED",
    });
  }

  next();
};

/**
 * Middleware chỉ cho phép Admin
 */
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập",
      error_code: "NOT_AUTHENTICATED",
    });
  }

  if (user.roleCode !== "thudo") {
    return res.status(403).json({
      success: false,
      message: "Chỉ Admin mới có quyền thực hiện thao tác này",
      error_code: "ADMIN_ONLY",
    });
  }

  next();
};

/**
 * Middleware cho phép Admin và Thủ đồ
 */
export const adminOrThuDo = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập",
      error_code: "NOT_AUTHENTICATED",
    });
  }

  if (user.roleCode !== "sa" && user.roleCode !== "thudo") {
    return res.status(403).json({
      success: false,
      message: "Bạn không có quyền thực hiện thao tác này",
      error_code: "FORBIDDEN",
    });
  }

  next();
};
