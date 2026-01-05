import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { TinTucService } from "../services/tinTucService";
import { TinTuc } from "../models/tintuc";

@injectable()
export class TinTucController {
  constructor(private tinTucService: TinTucService) {}

  async search(req: Request, res: Response): Promise<void> {
    try {
      const { pageIndex, pageSize, search_content, dongHoId } = req.body;

      if (!dongHoId) {
        res.status(400).json({ success: false, message: "dongHoId là bắt buộc" });
        return;
      }

      const data = await this.tinTucService.search(
        pageIndex || 1,
        pageSize || 10,
        search_content || "",
        dongHoId
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
      console.log("error", error);
      res.status(500).json({ success: false, message: "Lỗi tìm kiếm tin tức" });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const tinTuc = req.body as TinTuc;

      if (!tinTuc.dongHoId) {
        res.status(400).json({ success: false, message: "dongHoId là bắt buộc" });
        return;
      }
      if (!tinTuc.tieuDe) {
        res.status(400).json({ success: false, message: "Tiêu đề là bắt buộc" });
        return;
      }

      tinTuc.nguoiTaoId = (req as any).user?.userId;
      const result = await this.tinTucService.create(tinTuc);

      res.status(201).json({
        success: true,
        message: "Tạo tin tức thành công",
        data: result,
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ success: false, message: error.message || "Lỗi tạo tin tức" });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const tinTucId = req.params.id;
      const tinTuc = req.body as TinTuc;
      tinTuc.tinTucId = tinTucId;

      if (!tinTuc.dongHoId) {
        res.status(400).json({ success: false, message: "dongHoId là bắt buộc" });
        return;
      }

      tinTuc.lu_user_id = (req as any).user?.userId;
      const result = await this.tinTucService.update(tinTuc);

      res.json({
        success: true,
        message: "Cập nhật tin tức thành công",
        data: result,
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ success: false, message: error.message || "Lỗi cập nhật tin tức" });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const tinTucId = req.params.id;
      const luUserId = (req as any).user?.userId || "";

      const result = await this.tinTucService.delete(tinTucId, luUserId);

      res.json({
        success: true,
        message: "Xóa tin tức thành công",
        data: result,
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ success: false, message: "Lỗi xóa tin tức" });
    }
  }

  // Xóa nhiều tin tức
  async deleteMultiple(req: Request, res: Response): Promise<void> {
    try {
      const { list_json, lu_user_id } = req.body;
      await this.tinTucService.deleteMultiple(list_json, lu_user_id);
      res.json({
        success: true,
        message: "Xóa tin tức thành công",
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ success: false, message: error.message || "Lỗi xóa tin tức" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const tinTucId = req.params.id;
      const result = await this.tinTucService.getById(tinTucId);

      if (!result) {
        res.status(404).json({ success: false, message: "Không tìm thấy tin tức" });
        return;
      }

      res.json({ success: true, data: result });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ success: false, message: "Lỗi lấy tin tức" });
    }
  }
}
