import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { nguoiDungService } from "../services/nguoidungService";
import { nguoiDung } from "../models/nguoidung";
import { generateToken } from "../config/jwt";
import { callbackify } from "util";

@injectable()
export class NguoiDungController {
  constructor(private nguoiDungService: nguoiDungService) {}

  async createNguoiDung(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      const results = await this.nguoiDungService.createNguoiDung(nguoiDung);
      res.json({ message: "Dang ky thanh cong.", succes: true, data: results });
      console.log(results);
    } catch (error: any) {
      // res.json({ message: error.message, success: false });
      console.error("Lỗi đăng ký:", error); // ← Log để debug
      res.status(500).json({
        message: error.message || "Đăng ký thất bại.",
        success: false,
      });
    }
  }

  //   async searchUser(req: Request, res: Response): Promise<void> {
  //     try {
  //       const object = req.body as {
  //         pageIndex: number;
  //         pageSize: number;
  //         search_content: string;
  //         dongHoId: string;
  //       };

  //       const data: any = await this.nguoiDungService.searchUser(
  //         object.pageIndex,
  //         object.pageSize,
  //         object.search_content,
  //         object.dongHoId
  //       );
  //       if (data) {
  //         res.json({
  //           totalItems: Math.ceil(
  //             data && data.length > 0 ? data[0].RecordCount : 0
  //           ),
  //           page: object.pageIndex,
  //           pageSize: object.pageSize,
  //           data: data.length > 0 ? data : [],
  //           pageCount: Math.ceil(
  //             (data && data.length > 0 ? data[0].RecordCount : 0) /
  //               (object.pageSize ? object.pageSize : 1)
  //           ),
  //         });
  //       } else {
  //         res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
  //       }
  //     } catch (error: any) {
  //       res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
  //     }
  //   }

  async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const { pageIndex, pageSize, search_content, dongHoId } = req.body;

      const rows: any[] = await this.nguoiDungService.searchUser(
        pageIndex,
        pageSize,
        search_content,
        dongHoId
      );

      const totalItems =
        rows.length > 0 ? Number(rows[0]?.RecordCount || rows.length) : 0;
      const pageCount = Math.ceil(totalItems / (pageSize || 1));

      res.json({
        totalItems,
        page: pageIndex,
        pageSize,
        pageCount,
        data: rows, // trả về **mảng tất cả user**
      });
    } catch (error: any) {
      console.error("Lỗi searchUser:", error);
      res
        .status(500)
        .json({ message: "Không tồn tại kết quả tìm kiếm.", success: false });
    }
  }
}
