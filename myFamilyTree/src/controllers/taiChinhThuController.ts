import { taiChinhThu } from "../models/TaiChinhThu";
import { taiChinhThuService } from "../services/taiChinhThuService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
@injectable()
export class taiChinhThuController {
  constructor(private taiChinhThuService: taiChinhThuService) {}

  async searchTaiChinhThu(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
      };

      const data: any = await this.taiChinhThuService.searchTaiChinhThu(
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
        .json({ message: "Tim kiếm tài chính thu that bai", success: false });
    }
  }

  async createTaiChinhThu(req: Request, res: Response): Promise<void> {
      try {
        const taiChinhThu = req.body as taiChinhThu;
        const results = await this.taiChinhThuService.createTaiChinhThu(taiChinhThu);
        console.log("res", results);
        res.json({
          message: "Tạo tài chính thu thành công.",
          success: true,
          data: results,
        });
        
      } catch (error: any) {
        res.status(500).json({
          message: error.message || "Tạo tài chính thu thất bại.",
          success: false,
        });
      }
    }
  
    async updateTaiChinhThu(req: Request, res: Response) : Promise<void> {
        try {
          const taiChinhThu = req.body as taiChinhThu;
          const results = await this.taiChinhThuService.updateTaiChinhThu(taiChinhThu);
          res.json({
            message : 'Cap nhat tai chinh thu thanh cong',
            success : true,
            data : results
          })
        }catch (error: any) {
          res.status(500).json({ message: "Cap nhat tai chinh thu that bai", success: false });
        }
      }
}
