import { loaiSuKien } from "../models/loaisukien";
import { loaiSuKienService } from "../services/loaiSuKienService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
@injectable()
export class loaiSuKienController {
  constructor(private loaiSuKienService: loaiSuKienService) {}

  async searchSuKien(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
      };

      const data: any = await this.loaiSuKienService.searchLoaiSuKien(
        object.pageIndex,
        object.pageSize,
        object.search_content,
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
}