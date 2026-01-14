import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { TaiLieuService } from "../services/taiLieuService";
import { TaiLieu } from "../models/tailieu";

@injectable()
export class TaiLieuController {
  constructor(private taiLieuService: TaiLieuService) {}

  async search(req: Request, res: Response): Promise<void> {
    try {
      const { pageIndex, pageSize, search_content, dongHoId, loaiTaiLieu } = req.body;

      if (!dongHoId) {
        res.status(400).json({ success: false, message: "dongHoId là bắt buộc" });
        return;
      }

      const data = await this.taiLieuService.search(
        pageIndex || 1,
        pageSize || 10,
        search_content || "",
        dongHoId,
        loaiTaiLieu || ""
      );

      res.json({
        success: true,
        totalItems: data && data.length > 0 ? (data[0] as any).RecordCount : 0,
        page: pageIndex || 1,
        pageSize: pageSize || 10,
        data: data,
        pageCount: Math.ceil(
          (data && data.length > 0 ? (data[0] as any).RecordCount : 0) / (pageSize || 10)
        ),
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Lỗi tìm kiếm tài liệu" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const taiLieu = req.body as TaiLieu;

      if (!taiLieu.dongHoId) {
        res.status(400).json({ success: false, message: "dongHoId là bắt buộc" });
        return;
      }
      if (!taiLieu.tenTaiLieu) {
        res.status(400).json({ success: false, message: "Tên tài liệu là bắt buộc" });
        return;
      }

      taiLieu.nguoiTaoId = (req as any).user?.userId;
      const result = await this.taiLieuService.create(taiLieu);

      res.status(201).json({
        success: true,
        message: "Tạo tài liệu thành công",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Lỗi tạo tài liệu" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const taiLieuId = req.params.id;
      const taiLieu = req.body as TaiLieu;
      taiLieu.taiLieuId = taiLieuId;

      if (!taiLieu.dongHoId) {
        res.status(400).json({ success: false, message: "dongHoId là bắt buộc" });
        return;
      }

      taiLieu.lu_user_id = (req as any).user?.userId;
      const result = await this.taiLieuService.update(taiLieu);

      res.json({
        success: true,
        message: "Cập nhật tài liệu thành công",
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message || "Lỗi cập nhật tài liệu" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const taiLieuId = req.params.id;
      const luUserId = (req as any).user?.userId || "";

      if (!taiLieuId) {
        res.status(400).json({ 
          success: false, 
          message: "Thiếu ID tài liệu" 
        });
        return;
      }

      const result = await this.taiLieuService.delete(taiLieuId, luUserId);

      // Kiểm tra kết quả từ service
      if (result && result.success !== false) {
        res.json({
          success: true,
          message: "Xóa tài liệu thành công",
          data: result,
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: result?.message || "Không thể xóa tài liệu" 
        });
      }
    } catch (error: any) {
      console.error("Delete error:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Lỗi xóa tài liệu" 
      });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const taiLieuId = req.params.id;
      const result = await this.taiLieuService.getById(taiLieuId);

      if (!result) {
        res.status(404).json({ success: false, message: "Không tìm thấy tài liệu" });
        return;
      }

      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: "Lỗi lấy tài liệu" });
    }
  }

  async deleteMultiple(req: Request, res: Response): Promise<void> {
    try {
      const { list_json, lu_user_id } = req.body;
      
      // Validate input
      if (!list_json || !Array.isArray(list_json) || list_json.length === 0) {
        res.status(400).json({ 
          success: false, 
          message: "Danh sách tài liệu không hợp lệ" 
        });
        return;
      }

      if (!lu_user_id) {
        res.status(400).json({ 
          success: false, 
          message: "Thiếu thông tin người dùng" 
        });
        return;
      }

      const result = await this.taiLieuService.deleteMultiple(list_json, lu_user_id);
      
      // Kiểm tra kết quả từ service
      if (result && result.success !== false) {
        res.json({ 
          success: true, 
          message: `Đã xóa ${list_json.length} tài liệu thành công`, 
          data: result 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: result?.message || "Không thể xóa tài liệu" 
        });
      }
    } catch (error: any) {
      console.error("Delete multiple error:", error);
      res.status(500).json({ 
        success: false, 
        message: error.message || "Lỗi xóa tài liệu" 
      });
    }
  }
}
