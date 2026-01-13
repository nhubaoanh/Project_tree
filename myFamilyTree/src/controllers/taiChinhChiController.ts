import { taiChinhChi } from "../models/TaiChinhChi";
import { taiChinhChiService } from "../services/taiChinhChiService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
import ExcelJS from "exceljs";
import fs from "fs";
import { 
  validateFinanceChiImport, 
  FinanceChiImportData,
  createValidationResponse
} from "../ultis/financeValidation";

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
      res
        .status(500)
        .json({ message: "Tim kiếm tài chính chi that bai", success: false });
    }
  }

  async createTaiChinhChi(req: Request, res: Response): Promise<void> {
      try {
        const taiChinhChi = req.body as taiChinhChi;
        const results = await this.taiChinhChiService.createTaiChinhChi(taiChinhChi);
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

    // ============================================================================
    // EXPORT TEMPLATE EXCEL (THEO PATTERN THÀNH VIÊN)
    // ============================================================================
    async exportTemplate(req: Request, res: Response): Promise<void> {
      try {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet("Nhập liệu CHI");

        // Header
        const headers = [
          "STT", "Ngày chi", "Danh mục", "Số tiền", "Phương thức thanh toán",
          "Nội dung", "Người nhận", "Ghi chú"
        ];

        // Row 1: Header
        sheet.addRow(headers);
        const headerRow = sheet.getRow(1);
        headerRow.height = 28;
        headerRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "DC2626" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 2: Gợi ý nhập liệu
        const hints = [
          "Số TT", "DD/MM/YYYY", "Tên danh mục", "Số tiền (VND)", "Tiền mặt/Chuyển khoản",
          "Mô tả chi tiết", "Tên người nhận", "Ghi chú thêm"
        ];
        const hintRow = sheet.addRow(hints);
        hintRow.height = 30;
        hintRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FEE2E2" } };
          cell.font = { italic: true, size: 9, color: { argb: "991B1B" } };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 3-4: Dữ liệu mẫu
        const samples = [
          [1, "01/01/2025", "Chi giỗ tổ", 800000, "Tiền mặt", "Chi tổ chức giỗ tổ", "Nhà hàng ABC", ""],
          [2, "02/01/2025", "Chi sửa mộ", 1200000, "Chuyển khoản", "Sửa chữa mộ tổ", "Thợ xây Nguyễn A", "Đã thanh toán"],
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
          { text: "📖 HƯỚNG DẪN NHẬP LIỆU CHI", bold: true, size: 14, color: "DC2626" },
          { text: "" },
          { text: "1. CỘT BẮT BUỘC:", bold: true },
          { text: "   - STT: Số thứ tự" },
          { text: "   - Ngày chi: DD/MM/YYYY" },
          { text: "   - Danh mục: Tên danh mục có sẵn" },
          { text: "   - Số tiền: Số tiền > 0" },
          { text: "" },
          { text: "2. DANH MỤC:", bold: true },
          { text: "   - Nhập tên danh mục tùy ý" },
          { text: "   - Ví dụ: Chi giỗ tổ, Chi sửa mộ..." },
          { text: "" },
          { text: "3. PHƯƠNG THỨC THANH TOÁN:", bold: true },
          { text: "   - Tiền mặt" },
          { text: "   - Chuyển khoản" },
          { text: "" },
          { text: "⚠️ LƯU Ý:", bold: true, color: "C00000" },
          { text: "   - Xóa dòng mẫu trước khi nhập thật" },
          { text: "   - Chỉ import 8 cột đầu" },
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
        sheet.getColumn(2).width = 12;  // Ngày
        sheet.getColumn(3).width = 20;  // Danh mục
        sheet.getColumn(4).width = 15;  // Số tiền
        sheet.getColumn(5).width = 18;  // Phương thức
        sheet.getColumn(6).width = 25;  // Nội dung
        sheet.getColumn(7).width = 20;  // Người nhận
        sheet.getColumn(8).width = 20;  // Ghi chú
        sheet.getColumn(9).width = 3;   // Cột trống
        sheet.getColumn(10).width = 40; // Hướng dẫn

        // Format số tiền
        sheet.getColumn(4).numFmt = '#,##0';
        sheet.getColumn(2).numFmt = '@'; // Format ngày là text

        res.setHeader("Content-Disposition", 'attachment; filename="MauNhap_TaiChinhChi.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        await workbook.xlsx.write(res);
        res.end();
      } catch (err) {
        console.error("Export template CHI error:", err);
        res.status(500).json({ success: false, message: "Lỗi tạo template CHI" });
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
          "STT", "Ngày chi", "Danh mục", "Số tiền", "Phương thức thanh toán",
          "Nội dung", "Người nhận", "Ghi chú"
        ];

        const actualHeaders: string[] = [];
        headerRow.eachCell((cell, colNumber) => {
          if (colNumber <= 8) {
            actualHeaders.push(cell.value?.toString() || '');
          }
        });

        const headerValid = expectedHeaders.every((header, index) => 
          actualHeaders[index]?.toLowerCase().includes(header.toLowerCase().split(' ')[0])
        );

        if (!headerValid) {
          if (fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
          }
          res.status(400).json({
            success: false,
            message: "File Excel không đúng định dạng template. Vui lòng tải template mẫu và sử dụng đúng format."
          });
          return;
        }

        // Parse data từ Excel
        const data: FinanceChiImportData[] = [];
        let totalRows = 0;

        worksheet.eachRow((row, rowNumber) => {
          if (rowNumber <= 2) return; // Bỏ qua header và gợi ý

          const rowData = {
            stt: row.getCell(1).value ? Number(row.getCell(1).value) : null,
            ngay_chi: this.parseExcelDate(row.getCell(2).value) || '',
            danh_muc: row.getCell(3).value?.toString() || '',
            so_tien: row.getCell(4).value ? Number(row.getCell(4).value) : 0,
            phuong_thuc_thanh_toan: row.getCell(5).value?.toString() || 'Tiền mặt',
            noi_dung: row.getCell(6).value?.toString() || '',
            nguoi_nhan: row.getCell(7).value?.toString() || '',
            ghi_chu: row.getCell(8).value?.toString() || ''
          };

          // Kiểm tra dòng trống
          if (!rowData.danh_muc && !rowData.so_tien) {
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
        const validation = validateFinanceChiImport(data);
        
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
        const result = await this.taiChinhChiService.importFromJson(validation.validData, dongHoId, nguoiTaoId);

        res.json({
          success: true,
          message: `Import thành công ${validation.validData.length} khoản chi từ Excel`,
          data: result
        });

      } catch (error: any) {
        // Xóa file nếu có lỗi
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        
        console.error("Import Excel CHI error:", error);
        
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

        const result = await this.taiChinhChiService.importFromJson(
          data, 
          finalDongHoId,
          nguoiTaoId
        );

        res.status(200).json({
          success: true,
          message: `Import thành công ${data.length} khoản chi`,
          data: result,
        });
      } catch (error: any) {
        console.error("Import CHI JSON error:", error);
        
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
          message: error.message || "Lỗi khi import dữ liệu chi",
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
        const sheet = workbook.addWorksheet("Nhập liệu CHI");

        // Header
        const headers = [
          "STT", "Ngày chi", "Danh mục", "Số tiền", "Phương thức thanh toán",
          "Nội dung", "Người nhận", "Ghi chú"
        ];

        // Row 1: Header
        sheet.addRow(headers);
        const headerRow = sheet.getRow(1);
        headerRow.height = 28;
        headerRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "DC2626" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 2: Gợi ý nhập liệu
        const hints = [
          "Số TT", "DD/MM/YYYY", "Tên danh mục", "Số tiền (VND)", "Tiền mặt/Chuyển khoản",
          "Mô tả chi tiết", "Tên người nhận", "Ghi chú thêm"
        ];
        const hintRow = sheet.addRow(hints);
        hintRow.height = 30;
        hintRow.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FEE2E2" } };
          cell.font = { italic: true, size: 9, color: { argb: "991B1B" } };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { 
            top: { style: "thin" }, bottom: { style: "thin" }, 
            left: { style: "thin" }, right: { style: "thin" } 
          };
        });

        // Row 3-7: Dữ liệu mẫu
        const samples = [
          [1, "01/01/2025", "Chi giỗ tổ", 800000, "Tiền mặt", "Chi tổ chức giỗ tổ", "Nhà hàng ABC", ""],
          [2, "02/01/2025", "Chi sửa mộ", 1200000, "Chuyển khoản", "Sửa chữa mộ tổ", "Thợ xây Nguyễn A", "Đã thanh toán"],
          [3, "03/01/2025", "Chi họp họ", 500000, "Tiền mặt", "Chi phí tổ chức họp họ", "Ban tổ chức", ""],
          [4, "04/01/2025", "Chi khác", 300000, "Chuyển khoản", "Chi phí in ấn tài liệu", "Công ty in ABC", ""],
          [5, "05/01/2025", "Chi giỗ tổ", 600000, "Tiền mặt", "Mua hoa quả cúng", "Chợ truyền thống", "Đã mua"],
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
          { text: "📖 HƯỚNG DẪN NHẬP LIỆU CHI", bold: true, size: 14, color: "DC2626" },
          { text: "" },
          { text: "1. CỘT BẮT BUỘC:", bold: true },
          { text: "   - STT: Số thứ tự" },
          { text: "   - Ngày chi: DD/MM/YYYY" },
          { text: "   - Danh mục: Tên danh mục có sẵn" },
          { text: "   - Số tiền: Số tiền > 0" },
          { text: "" },
          { text: "2. DANH MỤC:", bold: true },
          { text: "   - Nhập tên danh mục tùy ý" },
          { text: "   - Ví dụ: Chi giỗ tổ, Chi sửa mộ..." },
          { text: "" },
          { text: "3. PHƯƠNG THỨC THANH TOÁN:", bold: true },
          { text: "   - Tiền mặt" },
          { text: "   - Chuyển khoản" },
          { text: "" },
          { text: "⚠️ LƯU Ý:", bold: true, color: "C00000" },
          { text: "   - XÓA DỮ LIỆU MẪU trước khi nhập thật" },
          { text: "   - Chỉ import 8 cột đầu" },
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
        sheet.getColumn(2).width = 12;  // Ngày
        sheet.getColumn(3).width = 20;  // Danh mục
        sheet.getColumn(4).width = 15;  // Số tiền
        sheet.getColumn(5).width = 18;  // Phương thức
        sheet.getColumn(6).width = 25;  // Nội dung
        sheet.getColumn(7).width = 20;  // Người nhận
        sheet.getColumn(8).width = 20;  // Ghi chú
        sheet.getColumn(9).width = 3;   // Cột trống
        sheet.getColumn(10).width = 40; // Hướng dẫn

        // Format số tiền
        sheet.getColumn(4).numFmt = '#,##0';
        sheet.getColumn(2).numFmt = '@'; // Format ngày là text

        res.setHeader("Content-Disposition", 'attachment; filename="MauNhap_TaiChinhChi.xlsx"');
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        await workbook.xlsx.write(res);
        res.end();
      } catch (err) {
        console.error("Export template with sample CHI error:", err);
        res.status(500).json({ success: false, message: "Lỗi tạo template có dữ liệu mẫu CHI" });
      }
    }
}

