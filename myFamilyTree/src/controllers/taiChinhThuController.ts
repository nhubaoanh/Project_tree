import { taiChinhThu } from "../models/TaiChinhThu";
import { taiChinhThuService } from "../services/taiChinhThuService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
import ExcelJS from "exceljs";
import multer from "multer";
import path from "path";
import fs from "fs";
import { 
  validateFinanceThuImport, 
  FinanceThuImportData,
  createValidationResponse
} from "../ultis/financeValidation";

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
      res
        .status(500)
        .json({ message: "Tim kiếm tài chính thu that bai", success: false });
    }
  }

  async createTaiChinhThu(req: Request, res: Response): Promise<void> {
      try {
        const taiChinhThu = req.body as taiChinhThu;
        const results = await this.taiChinhThuService.createTaiChinhThu(taiChinhThu);
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

    async deleteTaiChinhThu(req: Request, res: Response): Promise<void> {
      try {
        const { list_json, lu_user_id } = req.body;
        await this.taiChinhThuService.deleteTaiChinhThu(list_json, lu_user_id);
        res.json({ message: "Xóa tài chính thu thành công", success: true });
      } catch (error: any) {
        res.status(500).json({ message: error.message || "Xóa tài chính thu thất bại", success: false });
      }
    }

    // ============================================================================
    // EXPORT TEMPLATE EXCEL (THEO PATTERN THÀNH VIÊN)
    // ============================================================================
    async exportTemplate(req: Request, res: Response): Promise<void> {
      try {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Nhập liệu THU");

        // Header - 7 cột (STT chính là thuId)
        const headers = [
          "STT", "Họ tên người đóng", "Ngày đóng", "Số tiền",
          "Phương thức thanh toán", "Nội dung", "Ghi chú"
        ];

        // Row 1: Header
        sheet.addRow(headers);
        const headerRow = sheet.getRow(1);
        headerRow.height = 28;
        headerRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 2: Gợi ý nhập liệu
        const hints = [
          "Số TT", "Bắt buộc", "DD/MM/YYYY", "Số tiền (VND)",
          "Tiền mặt/Chuyển khoản", "Mô tả chi tiết", "Ghi chú thêm"
        ];
        const hintRow = sheet.addRow(hints);
        hintRow.height = 30;
        hintRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2CC" } };
          cell.font = { italic: true, size: 9, color: { argb: "806000" } };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 3-4: Dữ liệu mẫu
        const samples = [
          [1, "Nguyễn Văn A", "01/01/2025", 500000, "Tiền mặt", "Đóng góp giỗ tổ năm 2025", ""],
          [2, "Trần Thị B", "02/01/2025", 300000, "Chuyển khoản", "Đóng quỹ họ tháng 1", "Đã chuyển khoản"],
        ];
        samples.forEach(sample => {
          const row = sheet.addRow(sample);
          row.height = 22;
          row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = { 
              top: { style: "thin" }, bottom: { style: "thin" }, 
              left: { style: "thin" }, right: { style: "thin" } 
            };
          });
        });

        // Hướng dẫn bên phải
        const guideCol = 10;
        const guideLines = [
          { text: "📖 HƯỚNG DẪN NHẬP LIỆU THU", bold: true, size: 14, color: "4472C4" },
          { text: "" },
          { text: "1. CỘT BẮT BUỘC:", bold: true },
          { text: "   - STT: Số thứ tự (là ID)" },
          { text: "   - Họ tên người đóng: Bắt buộc" },
          { text: "   - Ngày đóng: DD/MM/YYYY" },
          { text: "   - Số tiền: Số tiền > 0" },
          { text: "   - Nội dung: Mô tả khoản thu" },
          { text: "" },
          { text: "2. PHƯƠNG THỨC THANH TOÁN:", bold: true },
          { text: "   - Tiền mặt" },
          { text: "   - Chuyển khoản" },
          { text: "" },
          { text: "⚠️ LƯU Ý:", bold: true, color: "C00000" },
          { text: "   - Xóa dòng mẫu trước khi nhập" },
          { text: "   - Xuất Excel → Sửa → Import lại" },
        ];

        guideLines.forEach((line, idx) => {
          const cell = sheet.getCell(idx + 1, guideCol);
          cell.value = line.text;
          cell.font = {
            bold: line.bold || false,
            size: line.size || 11,
            color: line.color ? { argb: line.color } : undefined
          };
          cell.alignment = { vertical: "middle" };
        });

        // Column widths
        sheet.getColumn(1).width = 6;   // STT
        sheet.getColumn(2).width = 20;  // Họ tên
        sheet.getColumn(3).width = 12;  // Ngày
        sheet.getColumn(4).width = 15;  // Số tiền
        sheet.getColumn(5).width = 18;  // Phương thức
        sheet.getColumn(6).width = 30;  // Nội dung
        sheet.getColumn(7).width = 20;  // Ghi chú
        sheet.getColumn(8).width = 3;   // Cột trống
        sheet.getColumn(9).width = 40;  // Hướng dẫn

        // Format số tiền
        sheet.getColumn(4).numFmt = '#,##0';
        sheet.getColumn(3).numFmt = '@'; // Format ngày là text
        sheet.getColumn(1).numFmt = '0'; // STT là số nguyên

        res.setHeader("Content-Disposition", 'attachment; filename="MauNhap_TaiChinhThu.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        await workbook.xlsx.write(res);
        res.end();
      } catch (err) {
        console.error("Export template THU error:", err);
        res.status(500).json({ success: false, message: "Lỗi tạo template THU" });
      }
    }

    // ============================================================================
    // EXPORT EXCEL VỚI DỮ LIỆU THẬT (GIỐNG TEMPLATE)
    // ============================================================================
    async exportExcel(req: Request, res: Response): Promise<void> {
      try {
        const dongHoId = (req as any).user?.dongHoId;
        if (!dongHoId) {
          res.status(400).json({ success: false, message: "Không tìm thấy thông tin dòng họ" });
          return;
        }

        // Lấy dữ liệu từ service - searchTaiChinhThu trả về array trực tiếp
        const data = await this.taiChinhThuService.searchTaiChinhThu(
          1,      // pageIndex
          10000,  // pageSize - lấy tất cả
          '',     // search_content - không filter
          dongHoId
        );

        if (!data || data.length === 0) {
          res.status(400).json({ success: false, message: "Không có dữ liệu để xuất" });
          return;
        }

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Tài chính THU");

        // Header - 7 cột (giống template)
        const headers = [
          "STT", "Họ tên người đóng", "Ngày đóng", "Số tiền",
          "Phương thức thanh toán", "Nội dung", "Ghi chú"
        ];

        sheet.addRow(headers);
        const headerRow = sheet.getRow(1);
        headerRow.height = 28;
        headerRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 2: Gợi ý
        const hints = [
          "Số TT", "Bắt buộc", "DD/MM/YYYY", "Số tiền (VND)",
          "Tiền mặt/Chuyển khoản", "Mô tả chi tiết", "Ghi chú thêm"
        ];
        const hintRow = sheet.addRow(hints);
        hintRow.height = 30;
        hintRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2CC" } };
          cell.font = { italic: true, size: 9, color: { argb: "806000" } };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Dữ liệu thật
        data.forEach((item: any) => {
          const rowData = [
            item.thuId,
            item.hoTenNguoiDong || "",
            item.ngayDong ? new Date(item.ngayDong).toLocaleDateString('vi-VN') : "",
            item.soTien || 0,
            item.phuongThucThanhToan || "",
            item.noiDung || "",
            item.ghiChu || ""
          ];
          const row = sheet.addRow(rowData);
          row.height = 22;
          row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = { 
              top: { style: "thin" }, bottom: { style: "thin" }, 
              left: { style: "thin" }, right: { style: "thin" } 
            };
          });
        });

        // Hướng dẫn
        const guideCol = 10;
        const guideLines = [
          { text: "📖 HƯỚNG DẪN", bold: true, size: 14, color: "4472C4" },
          { text: "" },
          { text: "Sửa dữ liệu rồi Import lại" },
          { text: "STT đã có → Cập nhật" },
          { text: "STT mới → Thêm mới" },
        ];
        guideLines.forEach((line, idx) => {
          const cell = sheet.getCell(idx + 1, guideCol);
          cell.value = line.text;
          cell.font = {
            bold: line.bold || false,
            size: line.size || 11,
            color: line.color ? { argb: line.color } : undefined
          };
        });

        // Column widths
        sheet.getColumn(1).width = 6;
        sheet.getColumn(2).width = 20;
        sheet.getColumn(3).width = 12;
        sheet.getColumn(4).width = 15;
        sheet.getColumn(5).width = 18;
        sheet.getColumn(6).width = 30;
        sheet.getColumn(7).width = 20;
        sheet.getColumn(8).width = 3;
        sheet.getColumn(9).width = 40;

        sheet.getColumn(4).numFmt = '#,##0';
        sheet.getColumn(3).numFmt = '@';
        sheet.getColumn(1).numFmt = '0';

        const fileName = `TaiChinhThu_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.xlsx`;
        res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        await workbook.xlsx.write(res);
        res.end();
      } catch (err) {
        console.error("Export Excel THU error:", err);
        res.status(500).json({ success: false, message: "Lỗi xuất Excel THU" });
      }
    }

    // ============================================================================
    // IMPORT EXCEL (THEO PATTERN THÀNH VIÊN)
    // ============================================================================
    async importExcel(req: Request, res: Response): Promise<void> {
      try {
        // Kiểm tra file upload
        if (!req.file) {
          res.status(400).json({
            success: false,
            message: "Vui lòng chọn file Excel để import"
          });
          return;
        }

        // Validate file type
        const allowedTypes = [
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
          'application/vnd.ms-excel' // .xls
        ];

        if (!allowedTypes.includes(req.file.mimetype)) {
          // Xóa file đã upload
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          res.status(400).json({
            success: false,
            message: "File không đúng định dạng. Chỉ chấp nhận file Excel (.xlsx, .xls)"
          });
          return;
        }

        // Validate file size (10MB)
        if (req.file.size > 10 * 1024 * 1024) {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          res.status(400).json({
            success: false,
            message: "File quá lớn. Kích thước tối đa 10MB"
          });
          return;
        }

        const dongHoId = (req as any).user?.dongHoId;
        const nguoiTaoId = (req as any).user?.nguoiDungId;

        if (!dongHoId || !nguoiTaoId) {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          res.status(400).json({
            success: false,
            message: "Không tìm thấy thông tin người dùng"
          });
          return;
        }

        // Đọc và validate Excel
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.readFile(req.file.path);
        const worksheet = workbook.getWorksheet(1);

        if (!worksheet) {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          res.status(400).json({
            success: false,
            message: "Không tìm thấy worksheet trong file Excel"
          });
          return;
        }

        // Validate header
        const headerRow = worksheet.getRow(1);
        const expectedHeaders = [
          "STT", "Họ tên người đóng", "Ngày đóng", "Số tiền",
          "Phương thức thanh toán", "Nội dung", "Ghi chú"
        ];

        const actualHeaders: string[] = [];
        headerRow.eachCell((cell, colNumber) => {
          if (colNumber <= 7) {
            actualHeaders.push(cell.value?.toString() || '');
          }
        });

        // Parse data từ Excel
        const data: FinanceThuImportData[] = [];
        let totalRows = 0;

        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber <= 2) return; // Bỏ qua header và gợi ý

          // Format: STT | Họ tên | Ngày đóng | Số tiền | Phương thức | Nội dung | Ghi chú
          // STT chính là thuId
          const rowData: FinanceThuImportData = {
            stt: row.getCell(1).value ? Number(row.getCell(1).value) : null,  // STT = thuId
            ho_ten_nguoi_dong: row.getCell(2).value?.toString() || '',
            ngay_dong: this.parseExcelDate(row.getCell(3).value) || '',
            so_tien: row.getCell(4).value ? Number(row.getCell(4).value) : 0,
            phuong_thuc_thanh_toan: row.getCell(5).value?.toString() || 'Tiền mặt',
            noi_dung: row.getCell(6).value?.toString() || '',
            ghi_chu: row.getCell(7).value?.toString() || ''
          };

          // Kiểm tra dòng trống
          if (!rowData.ho_ten_nguoi_dong && !rowData.so_tien) {
            return; // Bỏ qua dòng trống
          }

          totalRows++;
          data.push(rowData);
        });

        // Xóa file sau khi đọc xong
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }

        // Kiểm tra có dữ liệu không
        if (totalRows === 0) {
          res.status(400).json({
            success: false,
            message: "File Excel không có dữ liệu để import"
          });
          return;
        }

        // Validate dữ liệu bằng financeValidation
        const validation = validateFinanceThuImport(data);
        
        if (!validation.isValid) {
          const errorResponse = createValidationResponse(validation);
          res.status(400).json(errorResponse);
          return;
        }

        // Giới hạn số lượng record
        if (validation.validData.length > 1000) {
          res.status(400).json({
            success: false,
            message: "Số lượng dòng dữ liệu vượt quá giới hạn 1000 dòng"
          });
          return;
        }

        // Import dữ liệu
        const result = await this.taiChinhThuService.importFromJson(validation.validData, dongHoId, nguoiTaoId);

        res.json({
          success: true,
          message: `Import thành công ${validation.validData.length} khoản thu từ Excel`,
          data: result
        });

      } catch (error: any) {
        // Xóa file nếu có lỗi
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        
        console.error("Import Excel THU error:", error);
        
        // Kiểm tra nếu error là validation response
        try {
          const validationError = JSON.parse(error.message);
          if (validationError.errors) {
            res.status(400).json({
              success: false,
              message: validationError.message,
              errors: validationError.errors,
              warnings: validationError.warnings,
              validCount: validationError.validCount,
              totalCount: validationError.totalCount
            });
            return;
          }
        } catch (parseError) {
          // Không phải validation error, xử lý như error thường
        }
        
        res.status(500).json({
          success: false,
          message: error.message || "Lỗi khi import file Excel"
        });
      }
    }

    // ============================================================================
    // IMPORT JSON (THEO PATTERN THÀNH VIÊN)
    // ============================================================================
    async importFromJson(req: Request, res: Response): Promise<void> {
      try {
        const { data, dongHoId } = req.body;

        if (!data || !Array.isArray(data) || data.length === 0) {
          res.status(400).json({
            success: false,
            message: "Dữ liệu không hợp lệ hoặc rỗng",
          });
          return;
        }

        // Lấy dongHoId từ request hoặc user context
        const finalDongHoId = dongHoId || (req as any).user?.dongHoId;
        const nguoiTaoId = (req as any).user?.nguoiDungId || "1";

        if (!finalDongHoId) {
          res.status(400).json({
            success: false,
            message: "Không tìm thấy thông tin dòng họ",
          });
          return;
        }

        const result = await this.taiChinhThuService.importFromJson(
          data, 
          finalDongHoId,
          nguoiTaoId
        );

        res.status(200).json({
          success: true,
          message: `Import thành công ${data.length} khoản thu`,
          data: result,
        });
      } catch (error: any) {
        console.error("Import THU JSON error:", error);
        
        // Kiểm tra nếu error là validation response
        try {
          const validationError = JSON.parse(error.message);
          if (validationError.errors) {
            res.status(400).json({
              success: false,
              message: validationError.message,
              errors: validationError.errors,
              warnings: validationError.warnings,
              validCount: validationError.validCount,
              totalCount: validationError.totalCount
            });
            return;
          }
        } catch (parseError) {
          // Không phải validation error, xử lý như error thường
        }
        
        res.status(500).json({
          success: false,
          message: error.message || "Lỗi khi import dữ liệu thu",
        });
      }
    }

    // ============================================================================
    // HELPER METHODS
    // ============================================================================
    private parseExcelDate(dateValue: any): string | null {
      if (!dateValue) return null;
      
      try {
        // Nếu là Date object từ Excel
        if (dateValue instanceof Date) {
          const day = dateValue.getDate().toString().padStart(2, '0');
          const month = (dateValue.getMonth() + 1).toString().padStart(2, '0');
          const year = dateValue.getFullYear();
          return `${day}/${month}/${year}`;
        }
        
        // Nếu là string, kiểm tra format DD/MM/YYYY
        const dateStr = dateValue.toString();
        const dateRegex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
        const match = dateStr.match(dateRegex);
        
        if (match) {
          const day = parseInt(match[1]);
          const month = parseInt(match[2]);
          const year = parseInt(match[3]);
          
          // Validate ngày hợp lệ
          const date = new Date(year, month - 1, day);
          if (date.getFullYear() === year && 
              date.getMonth() === month - 1 && 
              date.getDate() === day) {
            return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
          }
        }
        
        // Thử parse các format khác
        const date = new Date(dateStr);
        if (!isNaN(date.getTime())) {
          const day = date.getDate().toString().padStart(2, '0');
          const month = (date.getMonth() + 1).toString().padStart(2, '0');
          const year = date.getFullYear();
          return `${day}/${month}/${year}`;
        }
      } catch (e) {
        console.warn('Cannot parse date:', dateValue);
      }
      
      return null;
    }

    // ============================================================================
    // EXPORT TEMPLATE CÓ DỮ LIỆU MẪU (THEO PATTERN THÀNH VIÊN)
    // ============================================================================
    async exportTemplateWithSample(req: Request, res: Response): Promise<void> {
      try {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Nhập liệu THU");

        // Header (removed "Danh mục" - not needed anymore)
        const headers = [
          "STT", "Họ tên người đóng", "Ngày đóng", "Số tiền",
          "Phương thức thanh toán", "Nội dung", "Ghi chú"
        ];

        // Row 1: Header
        sheet.addRow(headers);
        const headerRow = sheet.getRow(1);
        headerRow.height = 28;
        headerRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "10B981" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 2: Gợi ý nhập liệu
        const hints = [
          "Số TT", "Tên người đóng góp", "DD/MM/YYYY", "Số tiền (VND)",
          "Tiền mặt/Chuyển khoản", "Mô tả chi tiết", "Ghi chú thêm"
        ];
        const hintRow = sheet.addRow(hints);
        hintRow.height = 30;
        hintRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "D1FAE5" } };
          cell.font = { italic: true, size: 9, color: { argb: "065F46" } };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 3-7: Dữ liệu mẫu
        const samples = [
          [1, "Nguyễn Văn A", "01/01/2025", 500000, "Tiền mặt", "Đóng góp cho lễ giỗ tổ", ""],
          [2, "Trần Thị B", "02/01/2025", 1000000, "Chuyển khoản", "Đóng góp xây nhà thờ họ", "Đã chuyển khoản"],
          [3, "Lê Văn C", "03/01/2025", 300000, "Tiền mặt", "Hỗ trợ gia đình khó khăn", ""],
          [4, "Phạm Thị D", "04/01/2025", 200000, "Chuyển khoản", "Thu từ bán sách phả", ""],
          [5, "Hoàng Văn E", "05/01/2025", 800000, "Tiền mặt", "Đóng góp tổ chức họp họ", "Đã thanh toán"],
        ];
        samples.forEach(sample => {
          const row = sheet.addRow(sample);
          row.height = 22;
          row.eachCell((cell) => {
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = { 
              top: { style: "thin" }, bottom: { style: "thin" }, 
              left: { style: "thin" }, right: { style: "thin" } 
            };
          });
        });

        // Hướng dẫn bên phải
        const guideCol = 9;
        const guideLines = [
          { text: "📖 HƯỚNG DẪN NHẬP LIỆU THU", bold: true, size: 14, color: "10B981" },
          { text: "" },
          { text: "1. CỘT BẮT BUỘC:", bold: true },
          { text: "   - STT: Số thứ tự" },
          { text: "   - Họ tên người đóng: Tên người đóng góp" },
          { text: "   - Ngày đóng: DD/MM/YYYY" },
          { text: "   - Số tiền: Số tiền > 0" },
          { text: "   - Nội dung: Mô tả khoản thu" },
          { text: "" },
          { text: "2. PHƯƠNG THỨC THANH TOÁN:", bold: true },
          { text: "   - Tiền mặt" },
          { text: "   - Chuyển khoản" },
          { text: "" },
          { text: "⚠️ LƯU Ý:", bold: true, color: "C00000" },
          { text: "   - XÓA DỮ LIỆU MẪU trước khi nhập thật" },
          { text: "   - Chỉ import 7 cột đầu" },
          { text: "   - Chỉ chọn 1 file Excel (.xlsx)" },
        ];

        guideLines.forEach((line, idx) => {
          const cell = sheet.getCell(idx + 1, guideCol);
          cell.value = line.text;
          cell.font = {
            bold: line.bold || false,
            size: line.size || 11,
            color: line.color ? { argb: line.color } : undefined
          };
          cell.alignment = { vertical: "middle" };
        });

        // Column widths
        sheet.getColumn(1).width = 6;   // STT
        sheet.getColumn(2).width = 20;  // Họ tên
        sheet.getColumn(3).width = 12;  // Ngày
        sheet.getColumn(4).width = 15;  // Số tiền
        sheet.getColumn(5).width = 18;  // Phương thức
        sheet.getColumn(6).width = 30;  // Nội dung
        sheet.getColumn(7).width = 20;  // Ghi chú
        sheet.getColumn(8).width = 3;   // Cột trống
        sheet.getColumn(9).width = 40;  // Hướng dẫn

        // Format số tiền
        sheet.getColumn(4).numFmt = '#,##0';
        sheet.getColumn(3).numFmt = '@'; // Format ngày là text

        res.setHeader("Content-Disposition", 'attachment; filename="MauNhap_TaiChinhThu.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        await workbook.xlsx.write(res);
        res.end();
      } catch (err) {
        console.error("Export template with sample THU error:", err);
        res.status(500).json({ success: false, message: "Lỗi tạo template có dữ liệu mẫu THU" });
      }
    }
}
