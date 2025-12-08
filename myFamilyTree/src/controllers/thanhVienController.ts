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

  async searchThanhVien(req: Request, res: Response) : Promise<void> {
    try{
      const object =req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
        thanhVienId: number;
      };

      const data : any = await this.thanhvienService.searchThanhVien(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.dongHoId,
        object.thanhVienId
      );
      if(data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount: 0
          ),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount: 0) /
            (object.pageSize ? object.pageSize : 1)
          ),
        });
      }else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
      }
    }catch(error: any){
      console.log("error", error);
      res
        .status(500)
        .json({ message: "Tim kiếm thanh vien that bai", success: false });
    }
  }
}