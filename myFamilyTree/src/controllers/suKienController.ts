import { suKien } from "../models/sukien";
import { suKienService } from "../services/suKienService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
@injectable()
export class suKienController {
  constructor(private suKienService: suKienService) {}

  async searchSuKien(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
      };

      const data: any = await this.suKienService.searchSuKien(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.dongHoId
      );
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0
          ),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.pageSize ? object.pageSize : 1)
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
      }
    } catch (error: any) {
      console.log("error", error);
      res
        .status(500)
        .json({ message: "Tim kiếm sự kiện that bai", success: false });
    }
  }

  async createSuKien(req: Request, res: Response): Promise<void> {
    try {
      const sukien = req.body as suKien;
      console.log("re", sukien);
      const results = await this.suKienService.createSuKien(sukien);
      console.log("res", results);
      res.json({
        message: "Tạo sự kiện thành công.",
        success: true,
        data: results,
      });
      
    } catch (error: any) {
      res.status(500).json({
        message: error.message || "Tạo sự kiện thất bại.",
        success: false,
      });
    }
  }

  async updateSuKien(req: Request, res: Response) : Promise<void> {
      try {
        const sukien = req.body as suKien;
        const results = await this.suKienService.updateSuKien(sukien);
        res.json({
          message : 'Cap nhat su kien thanh cong',
          success : true,
          data : results
        })
      }catch (error: any) {
        res.status(500).json({ message: "Cap nhat su kien that bai", success: false });
      }
    }
}
