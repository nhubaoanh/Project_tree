import { taiChinhChi } from "../models/TaiChinhChi";
import { taiChinhChiService } from "../services/taiChinhChiService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
@injectable()
export class taiChinhChiController {
  constructor(private taiChinhChiService: taiChinhChiService) {}

  async searchTaiChinhChi(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
      };

      const data: any = await this.taiChinhChiService.searchTaiChinhChi(
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
        .json({ message: "Tim kiếm tài chính chi that bai", success: false });
    }
  }

  async createTaiChinhChi(req: Request, res: Response): Promise<void> {
      try {
        const taiChinhChi = req.body as taiChinhChi;
        const results = await this.taiChinhChiService.createTaiChinhChi(taiChinhChi);
        console.log("res", results);
        res.json({
          message: "Tạo tài chính chi thành công.",
          success: true,
          data: results,
        });
        
      } catch (error: any) {
        res.status(500).json({
          message: error.message || "Tạo tài chính chi thất bại.",
          success: false,
        });
      }
    }
  
    async updateTaiChinhChi(req: Request, res: Response) : Promise<void> {
        try {
          const taiChinhChi = req.body as taiChinhChi;
          const results = await this.taiChinhChiService.updateTaiChinhChi(taiChinhChi);
          res.json({
            message : 'Cap nhat tai chinh chi thanh cong',
            success : true,
            data : results
          })
        }catch (error: any) {
          res.status(500).json({ message: "Cap nhat tai chinh chi that bai", success: false });
        }
      }

    async deleteTaiChinhChi(req: Request, res: Response): Promise<void> {
      try {
        const { list_json, lu_user_id } = req.body;
        await this.taiChinhChiService.deleteTaiChinhChi(list_json, lu_user_id);
        res.json({ message: "Xóa tài chính chi thành công", success: true });
      } catch (error: any) {
        res.status(500).json({ message: error.message || "Xóa tài chính chi thất bại", success: false });
      }
    }
}
