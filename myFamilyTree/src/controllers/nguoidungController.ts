import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { nguoiDungService } from "../services/nguoidungService";
import { nguoiDung, UserProfile } from "../models/nguoidung";
import { generateToken, generateRefreshToken, verifyRefreshToken } from "../config/jwt";
@injectable()
export class NguoiDungController {
  constructor(private nguoiDungService: nguoiDungService) {}

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { tenDangNhap, matKhau } = req.body;
      const user = await this.nguoiDungService.loginUser(tenDangNhap, matKhau);
      if (user) {
        let obj: any = {
          nguoiDungId: user.nguoiDungId,
          first_name: user.first_name,
          middle_name: user.middle_name,
          last_name: user.last_name,
          full_name: user.full_name,
          gender: user.gender,
          date_of_birthday: user.date_of_birthday,
          avatar: user.avatar,
          email: user.email,
          phone: user.phone,
          dongHoId: user.dongHoId,
          roleId: user.roleId,
          roleCode: user.roleCode,
          online_flag: user.online_flag,
          // Không đưa functions và actions vào token để giảm kích thước
        };
        
        // Generate access token (1 hour)
        const token = generateToken(obj);
        
        // Generate refresh token (7 days)
        const refreshToken = generateRefreshToken({ 
          nguoiDungId: user.nguoiDungId,
          roleCode: user.roleCode,
          dongHoId: user.dongHoId
        });
        
        user.token = token;
        user.refreshToken = refreshToken;
        
        res.json(user);
      } else {
        res.json({
          message: "Sai tài khoản hoặc mật khẩu.",
          success: false,
        });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Đăng nhập thất bại.", success: false });
    }
  }

  /**
   * Refresh access token using refresh token
   */
  async refreshToken(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        res.status(401).json({ 
          message: "Refresh token is required", 
          success: false 
        });
        return;
      }

      // Verify refresh token
      const decoded = verifyRefreshToken(refreshToken);
      
      if (!decoded) {
        res.status(401).json({ 
          message: "Invalid or expired refresh token", 
          success: false 
        });
        return;
      }

      // Get fresh user data from database
      const user = await this.nguoiDungService.getUserById(decoded.nguoiDungId);
      
      if (!user) {
        res.status(401).json({ 
          message: "User not found", 
          success: false 
        });
        return;
      }

      // Generate new access token
      let obj: any = {
        nguoiDungId: user.nguoiDungId,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        full_name: user.full_name,
        gender: user.gender,
        date_of_birthday: user.date_of_birthday,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
        dongHoId: user.dongHoId,
        roleId: user.roleId,
        roleCode: user.roleCode,
        online_flag: user.online_flag,
      };
      
      const newToken = generateToken(obj);
      
      res.json({
        success: true,
        token: newToken,
        message: "Token refreshed successfully"
      });
      
    } catch (error: any) {
      console.error("Refresh token error:", error);
      res.status(500).json({ 
        message: "Failed to refresh token", 
        success: false 
      });
    }
  }

  async createNguoiDung(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      console.log("📝 [createNguoiDung] Received data:", JSON.stringify(nguoiDung, null, 2));
      const results = await this.nguoiDungService.createNguoiDung(nguoiDung);
      res.json({
        message: "Dang ky thanh cong.",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.error("❌ [createNguoiDung] Error:", error.message);
      res.status(500).json({
        message: error.message || "Đăng ký thất bại.",
        success: false,
      });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      var userName = req.body.tenDangNhap;
      await this.nguoiDungService.resetPassword(userName);
      res.json({
        message: "Reset password thanh cong. Vui long check email.",
        success: true,
      });
    } catch (err: any) {
      res.json({ message: err.message, success: false });
    }
  }

  async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
      };

      const data: any = await this.nguoiDungService.searchUser(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.dongHoId
      );

      // Luôn trả về format nhất quán dù có data hay không
      const totalItems = data && data.length > 0 ? data[0].RecordCount : 0;
      const pageCount = Math.ceil(totalItems / (object.pageSize || 1));

      res.json({
        success: true,
        totalItems,
        page: object.pageIndex,
        pageSize: object.pageSize,
        data: data || [],
        pageCount,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi tìm kiếm người dùng.",
        data: [],
        totalItems: 0,
        pageCount: 0,
      });
    }
  }

  async authorize(req: Request, res: Response): Promise<void> {
    try {
      let token = req.params.token;
      let result = await this.nguoiDungService.authorize(token);
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "Bản ghi không tồn tại.", success: false });
      }
    } catch (error: any) {
      if (error.message === "Phiên đăng nhập hết hạn") {
        res.status(401).json({ message: error.message, success: false });
      } else {
        res.status(500).json({ message: error.message || "Lỗi máy chủ", success: false });
      }
    }
  }

  async insertUser(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      console.log("InsertUser - Received data:", nguoiDung);
      console.log("InsertUser - roleId:", nguoiDung.roleId, "type:", typeof nguoiDung.roleId);
      const results = await this.nguoiDungService.insertUser(nguoiDung);
      res.json({
        message: "Them nguoi dung thanh cong",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.error("InsertUser error:", error);
      res
        .status(500)
        .json({ 
          message: error.message || "Them nguoi dung that bai", 
          success: false 
        });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      const results = await this.nguoiDungService.updateUser(nguoiDung);
      res.json({
        message: "Cap nhat nguoi dung thanh cong",
        success: true,
        data: results,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Cap nhat nguoi dung that bai", success: false });
    }
  }

  async UpdateMyProfile(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as UserProfile;
      const results = await this.nguoiDungService.UpdateMyProfile(nguoiDung);
      res.json({
        message: "Cap nhat thông tin nguoi dung thanh cong",
        success: true,
        data: results,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({
          message: error.message || "Cap nhat thông tin nguoi dung that bai",
          success: false,
        });
    }
  }

  async checkUser(req: Request, res: Response): Promise<void> {
    try {
      const userName = req.body.userName;
      if (!userName) {
        res
          .status(400)
          .json({ message: "userName is required", success: false });
        return;
      }
      const results = await this.nguoiDungService.checkUser(userName);
      res.json({
        message: "check nguoi dung thanh cong",
        success: true,
        exists: results,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "check nguoi dung that bai.", success: false });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as { list_json: any; updated_by_id: string };
      const results = await this.nguoiDungService.deleteUser(
        object.list_json,
        object.updated_by_id
      );
      res.json({
        message: "Đã xóa thành công.",
        success: true,
        results: results,
      });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Xoa nguoi dung that bai.", success: false });
    }
  }
}
    