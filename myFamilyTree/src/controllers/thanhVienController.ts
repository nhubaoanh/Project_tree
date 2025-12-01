import { thanhVien } from "../models/thanhvien";
import { thanhVienService } from "../services/thanhVienService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";

@injectable()
export class thanhVienController {
  constructor(private thanhvienService: thanhVienService) {}

  async createThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const thanhvien = req.body as thanhVien;
      const results = await this.thanhvienService.createThanhVien(thanhvien);
      res.status(200).json({
        message: "Them thanh vien thanh cong",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.log("error", error);
      res
        .status(500)
        .json({ message: "Them thanh vien that bai", success: false });
    }
  }

  // Tạo nhiều thành viên
  async createMultipleThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const thanhViens = req.body as thanhVien[];
      const results = await this.thanhvienService.createMultipleThanhVien(
        thanhViens
      );
      res.status(200).json({
        message: "Thêm nhiều thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.log("error", error);
      res
        .status(500)
        .json({ message: "Thêm nhiều thành viên thất bại", success: false });
    }
  }

  async getAllThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const results = await this.thanhvienService.getAllThanhVien();
      res.status(200).json({
        message: "Lay danh sach thanh vien thanh cong",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.log("error", error);
      res
        .status(500)
        .json({ message: "Lay danh sach thanh vien that bai", success: false });
    }
  }
}