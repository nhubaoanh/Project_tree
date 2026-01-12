import { injectable } from "tsyringe";
import { Request, Response } from "express";
import { ThongKeService } from "../services/thongKeService";

@injectable()
export class ThongKeController {
  constructor(private thongKeService: ThongKeService) {}

  // GET /thongke/tongquan/:dongHoId
  async getThongKeTongQuan(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getThongKeTongQuan(dongHoId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/theodoi/:dongHoId
  async getThongKeoTheoDoi(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getThongKeoTheoDoi(dongHoId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/theochi/:dongHoId
  async getThongKeoTheoChi(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getThongKeoTheoChi(dongHoId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/dashboard?dongHoId=xxx
  async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.query.dongHoId as string | undefined;
      const data = await this.thongKeService.getDashboardStats(dongHoId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/moinhat?dongHoId=xxx&limit=10
  async getThanhVienMoiNhat(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.query.dongHoId as string | undefined;
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await this.thongKeService.getThanhVienMoiNhat(dongHoId, limit);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/full/:dongHoId - Lấy tất cả thống kê
  async getFullStats(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getFullStats(dongHoId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // ========== TÀI CHÍNH ==========

  // GET /thongke/thuChi/:dongHoId?nam=2025
  async getThongKeThuChi(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      const nam = req.query.nam ? parseInt(req.query.nam as string) : undefined;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getThongKeThuChi(dongHoId, nam);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/thuChiTheoThang/:dongHoId?nam=2025
  async getThongKeThuChiTheoThang(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      const nam = req.query.nam ? parseInt(req.query.nam as string) : undefined;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getThongKeThuChiTheoThang(dongHoId, nam);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/thuGanDay?dongHoId=xxx&limit=5
  async getThuGanDay(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.query.dongHoId as string | undefined;
      const limit = parseInt(req.query.limit as string) || 5;
      const data = await this.thongKeService.getThuGanDay(dongHoId, limit);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/chiGanDay?dongHoId=xxx&limit=5
  async getChiGanDay(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.query.dongHoId as string | undefined;
      const limit = parseInt(req.query.limit as string) || 5;
      const data = await this.thongKeService.getChiGanDay(dongHoId, limit);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // ========== SỰ KIỆN ==========

  async getThongKeSuKien(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      const nam = req.query.nam ? parseInt(req.query.nam as string) : undefined;
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      const data = await this.thongKeService.getThongKeSuKien(dongHoId, nam);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /thongke/suKienSapToi?dongHoId=xxx&limit=5
  async getSuKienSapToi(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.query.dongHoId as string | undefined;
      const limit = parseInt(req.query.limit as string) || 5;
      const data = await this.thongKeService.getSuKienSapToi(dongHoId, limit);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}
