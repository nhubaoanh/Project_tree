import { thanhVien } from "../models/thanhvien";
import { thanhVienService } from "../services/thanhVienService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
import multer from "multer";
// import * as XLSX from 'xlsx'
import ExcelJS, { BorderStyle, Alignment } from "exceljs";
import { Readable } from "stream";

@injectable()
export class thanhVienController {
  constructor(private thanhvienService: thanhVienService) {}

  private upload = multer({
    storage: multer.memoryStorage(),
    limits: { fieldSize: 5 * 1024 * 1024 }, // 5mb
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.mimetype === "application/vnd.ms-excel"
      ) {
        cb(null, true);
      } else {
        cb(new Error("chỉ nhận file Excel (.xlsx, .xls)"));
      }
    },
  }).single("file");

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

  async searchThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
        thanhVienId: number;
      };

      const data: any = await this.thanhvienService.searchThanhVien(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.dongHoId,
        object.thanhVienId
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
        .json({ message: "Tim kiếm thanh vien that bai", success: false });
    }
  }

  async importFromExcel(req: Request, res: Response): Promise<void> {
    this.upload(req, res, async (err: any) => {
      try {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message || "Đã xảy ra lỗi khi nhập dữ liệu từ Excel",
          });
        }

        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "vui lòng chọn file excel để nhập dữ liệu",
          });
        }

        // đọc file
        const workbook = new ExcelJS.Workbook();

        // Tạo stream từ buffer multer
        const stream = new Readable();
        stream.push(req.file!.buffer);
        stream.push(null);

        // Đọc excel từ stream
        await workbook.xlsx.read(stream);
        const worksheet = workbook.worksheets[0];

        // Lấy dữ liệu từ sheet
        const data: any[] = [];
        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
          // Bỏ qua dòng tiêu đề (hàng đầu tiên)
          if (rowNumber === 1) return;

          const rowData: any = {};
          row.eachCell((cell, colNumber) => {
            const header =
              worksheet.getRow(1).getCell(colNumber).value?.toString() || "";
            rowData[header] = cell.value;
          });

          if (Object.keys(rowData).length > 0) {
            data.push(rowData);
          }
        });

        // Gọi service để xử lý dữ liệu
        const result = await this.thanhvienService.importFromExcel(data);

        res.status(200).json({
          success: true,
          message: "Nhập dữ liệu thành công",
          data: result,
        });
      } catch (error: any) {
        res.status(500).json({
          success: false,
          message: error.message || "đã xảy ra lỗi khi nhập dữ liệu từ Excel",
        });
      }
    });
  }

  async exportTemplate(req: Request, res: Response): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Mẫu nhập liệu");
      const headers = [
        "STT",
        "Họ và tên",
        "Giới tính",
        "Ngày sinh",
        "Ngày mất",
        "Nơi sinh",
        "Nơi mất",
        "Nghề nghiệp",
        "Trình độ học vấn",
        "Địa chỉ",
        "Tiểu sử",
        "Đời thứ",
        "ID Cha",
        "ID Mẹ",
        "ID Vợ",
        "ID Chồng",
        "Dòng họ ID",
        "Người tạo ID",
      ];

      sheet.addRow(headers);
      const headerRow = sheet.getRow(1);
      headerRow.height = 22;

      headerRow.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "C6E0B4" },
        };
        cell.font = { bold: true };
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      const row = sheet.addRow([
        "1",
        "Nguyễn Văn A",
        1,
        new Date(),
        "",
        "Hà Nội",
        "Hải Dương",
        "Kỹ sư",
        "Đại học",
        "Hà Nội, Việt Nam",
        "Nông dân",
        1,
        "",
        "",
        "",
        "",
        "1",
        "1",
      ]);
      row.height = 20;

      // Border for all sample row cells
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
      });

      sheet.getColumn(4).numFmt = "yyyy-mm-dd";
      sheet.getColumn(5).numFmt = "yyyy-mm-dd";

      // Giới tính dropdown
      sheet.getCell("C2").dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: ['"0,1"'],
      };

      // Ngày sinh: chỉ cho nhập đúng ngày
      sheet.getCell("D2").dataValidation = {
        type: "date",
        allowBlank: true,
        operator: "greaterThan",
        formulae: [new Date(1900, 0, 1)],
      };

      // Ngày mất
      sheet.getCell("E2").dataValidation = {
        type: "date",
        allowBlank: true,
        operator: "greaterThan",
        formulae: [new Date(1900, 0, 1)],
      };
      sheet.columns = [
        { width: 5, alignment: { horizontal: "center" } },
        { width: 20 },
        { width: 10, alignment: { horizontal: "center" } },
        { width: 12, alignment: { horizontal: "center" } },
        { width: 12, alignment: { horizontal: "center" } },
        { width: 15, alignment: { horizontal: "center" } },
        { width: 15, alignment: { horizontal: "center" } },
        { width: 12, alignment: { horizontal: "center" } },
        { width: 15, alignment: { horizontal: "center" } },
        { width: 20, alignment: { horizontal: "center" } },
        { width: 20, alignment: { horizontal: "center" } },
        { width: 8, alignment: { horizontal: "center" } },
        { width: 8, alignment: { horizontal: "center" } },
        { width: 8, alignment: { horizontal: "center" } },
        { width: 8, alignment: { horizontal: "center" } },
        { width: 8, alignment: { horizontal: "center" } },
        { width: 10, alignment: { horizontal: "center" } },
        { width: 10, alignment: { horizontal: "center" } },
      ];

      res.setHeader(
        "Content-Disposition",
        'attachment; filename="Mau_nhap_du_lieu_thanh_vien.xlsx"'
      );
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Lỗi tạo Excel" });
    }
  }
}
