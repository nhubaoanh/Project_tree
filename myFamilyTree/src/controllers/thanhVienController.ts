import { thanhVien } from "../models/thanhvien";
import { thanhVienService } from "../services/thanhVienService";
import { injectable } from "tsyringe";
import { Request, Response } from "express";
import ExcelJS from "exceljs";

@injectable()
export class thanhVienController {
  constructor(private thanhvienService: thanhVienService) {}

  // Tạo thành viên mới - dongHoId bắt buộc
  async createThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const thanhvien = req.body as thanhVien;      
      if (!thanhvien.dongHoId) {
        res.status(400).json({ message: "Thiếu dongHoId", success: false });
        return;
      }
      const results = await this.thanhvienService.createThanhVien(thanhvien);
      res.status(200).json({
        message: "Thêm thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.error('❌ [createThanhVien] Error:', error.message);
      res.status(500).json({ message: "Thêm thành viên thất bại", success: false });
    }
  }

  // Lấy thành viên theo Composite Key (dongHoId + thanhVienId)
  async getThanhVienById(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.params.dongHoId || req.query.dongHoId as string;
      const thanhVienId = parseInt(req.params.id);
      
      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }
      
      const result = await this.thanhvienService.getThanhVienById(dongHoId, thanhVienId);
      if (result) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, message: "Không tìm thấy thành viên" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Lỗi khi lấy thông tin thành viên", success: false });
    }
  }

  // Cập nhật thành viên - cần dongHoId trong body
  async updateThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const thanhVienId = parseInt(req.params.id);
      const thanhvien = req.body as thanhVien;
      thanhvien.thanhVienId = thanhVienId;
      
      if (!thanhvien.dongHoId) {
        res.status(400).json({ message: "Thiếu dongHoId", success: false });
        return;
      }
      
      const results = await this.thanhvienService.updateThanhVien(thanhvien);
      res.status(200).json({
        message: "Cập nhật thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Cập nhật thành viên thất bại", success: false });
    }
  }

  // Xóa thành viên - cần dongHoId
  async deleteThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.params.dongHoId || req.query.dongHoId as string || req.body.dongHoId;
      const thanhVienId = parseInt(req.params.id);
      
      if (!dongHoId) {
        res.status(400).json({ message: "Thiếu dongHoId", success: false });
        return;
      }
      
      const results = await this.thanhvienService.deleteThanhVien(dongHoId, thanhVienId);
      res.status(200).json({
        message: "Xóa thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Xóa thành viên thất bại", success: false });
    }
  }

  // Xóa nhiều thành viên
  async deleteMultipleThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const { list_json, lu_user_id } = req.body;
      await this.thanhvienService.deleteMultipleThanhVien(list_json, lu_user_id);
      res.json({ message: "Xóa thành viên thành công", success: true });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Xóa thành viên thất bại", success: false });
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
      res
        .status(500)
        .json({ message: "Lay danh sach thanh vien that bai", success: false });
    }
  }

  // Lấy tất cả thành viên theo dongHoId (không phân trang - dùng cho render cây)
  async getAllByDongHo(req: Request, res: Response): Promise<void> {
    try {
      const dongHoId = req.params.dongHoId;
      if (!dongHoId) {
        res.status(400).json({ message: "Thiếu dongHoId", success: false });
        return;
      }
      const results = await this.thanhvienService.getAllByDongHo(dongHoId);
      res.status(200).json({
        message: "Lấy danh sách thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      res.status(500).json({ message: "Lấy danh sách thành viên thất bại", success: false });
    }
  }

  // Search thành viên theo dòng họ cụ thể
  async searchThanhVienByDongHo(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
      };

      if (!object.dongHoId) {
        res.status(400).json({ message: "Thiếu dongHoId", success: false });
        return;
      }

      const data: any = await this.thanhvienService.searchThanhVienByDongHo(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.dongHoId
      );

      if (data) {
        res.json({
          totalItems: data && data.length > 0 ? data[0].RecordCount : 0,
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.pageSize ? object.pageSize : 1)
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true, data: [] });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Tìm kiếm thành viên thất bại", success: false });
    }
  }

  // Import từ JSON (giải pháp mới - 1 transaction)
  async importFromJson(req: Request, res: Response): Promise<void> {
    try {
      const { members, dongHoId } = req.body;

      if (!members || !Array.isArray(members) || members.length === 0) {
        res.status(400).json({
          success: false,
          message: "Dữ liệu không hợp lệ hoặc rỗng",
        });
        return;
      }

      // Lấy dongHoId từ request hoặc user context
      // TODO: Sau này lấy từ user đang đăng nhập
      const finalDongHoId = dongHoId || (req as any).user?.dongHoId || "e9022e64-cbae-11f0-8020-a8934a9bae74";
      const nguoiTaoId = (req as any).user?.userId || "1";

      const result = await this.thanhvienService.importFromJson(
        members, 
        finalDongHoId,
        nguoiTaoId
      );

      res.status(200).json({
        success: true,
        message: `Nhập thành công ${members.length} thành viên`,
        data: result,
      });
    } catch (error: any) {
      console.error("Import JSON error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi nhập dữ liệu",
      });
    }
  }

  // Export thành viên ra Excel (cùng format với template import)
  async exportMembers(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;

      if (!dongHoId) {
        res.status(400).json({ success: false, message: "Thiếu dongHoId" });
        return;
      }

      // Lấy tất cả thành viên của dòng họ
      const members = await this.thanhvienService.getAllByDongHo(dongHoId);

      if (!members || members.length === 0) {
        res.status(404).json({ success: false, message: "Không có thành viên nào" });
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Danh sách thành viên");

      // ========== PHẦN DATA (Cột A-Q) ==========
      const headers = [
        "STT", "Họ và tên", "Giới tính", "Ngày sinh", "Ngày mất",
        "Nơi sinh", "Nơi mất", "Nghề nghiệp", "Trình độ học vấn", "Số điện thoại",
        "Địa chỉ", "Tiểu sử", "Đời thứ", "ID Cha", "ID Mẹ", "ID Vợ", "ID Chồng",
      ];

      // Header row
      const headerRow = sheet.addRow(headers);
      headerRow.height = 28;
      headerRow.eachCell((cell, colNumber) => {
        if (colNumber <= 17) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
          
          // Format cột số điện thoại như text
          if (colNumber === 10) { // Cột số điện thoại
            cell.numFmt = "@"; // Text format
          }
        }
      });

      // Map thanhVienId -> STT
      const idToStt = new Map<number, number>();
      members.forEach((m: any, idx: number) => idToStt.set(m.thanhVienId, idx + 1));

      const formatDate = (date: string | Date | null): string => {
        if (!date) return "";
        const d = new Date(date);
        return isNaN(d.getTime()) ? "" : d.toLocaleDateString("vi-VN");
      };

      // Điền data
      members.forEach((m: any, idx: number) => {
        const row = sheet.addRow([
          idx + 1, m.hoTen || "", m.gioiTinh ?? "", formatDate(m.ngaySinh), formatDate(m.ngayMat),
          m.noiSinh || "", m.noiMat || "", m.ngheNghiep || "", m.trinhDoHocVan || "",
          m.soDienThoai || "", // Thêm số điện thoại
          m.diaChiHienTai || "", m.tieuSu || "", m.doiThuoc || "",
          m.chaId ? idToStt.get(m.chaId) || "" : "",
          m.meId ? idToStt.get(m.meId) || "" : "",
          m.voId ? idToStt.get(m.voId) || "" : "",
          m.chongId ? idToStt.get(m.chongId) || "" : ""
        ]);
        row.height = 22;
        row.eachCell((cell, colNumber) => {
          if (colNumber <= 17) {
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
            
            // Format số điện thoại như text để giữ số 0 đầu
            if (colNumber === 10 && cell.value) { // Cột số điện thoại
              cell.numFmt = "@"; // Text format
              cell.value = String(cell.value); // Đảm bảo là string
            }
          }
        });
      });

      // ========== PHẦN HƯỚNG DẪN (Cột S trở đi - bên phải) ==========
      const guideCol = 19; // Cột S
      const guideLines = [
        { text: "📖 HƯỚNG DẪN", bold: true, size: 14, color: "4472C4" },
        { text: "" },
        { text: "▸ Giới tính: 1=Nam, 0=Nữ", bold: true },
        { text: "▸ Ngày: DD/MM/YYYY hoặc chỉ năm (1950)", bold: true },
        { text: "▸ Đời thứ: 1, 2, 3... (đời 1 là tổ tiên)", bold: true },
        { text: "▸ Số điện thoại: 09xxxxxxxx hoặc 03xxxxxxxx", bold: true },
        { text: "" },
        { text: "▸ ID Cha/Mẹ/Vợ/Chồng:", bold: true },
        { text: "  Nhập STT của người tương ứng" },
        { text: "  VD: Cha có STT=1 → Con nhập ID Cha=1" },
        { text: "" },
        { text: "▸ Quan hệ vợ chồng:", bold: true },
        { text: "  Nam → nhập ID Vợ, bỏ trống ID Chồng" },
        { text: "  Nữ → nhập ID Chồng, bỏ trống ID Vợ" },
        { text: "" },
        { text: "⚠️ LƯU Ý KHI IMPORT:", bold: true, color: "C00000" },
        { text: "  File này có thể import lại hệ thống" },
        { text: "  Giữ nguyên format 17 cột đầu (A-Q)" },
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
      sheet.getColumn(1).width = 6;
      sheet.getColumn(2).width = 22;
      sheet.getColumn(3).width = 10;
      sheet.getColumn(4).width = 14;
      sheet.getColumn(5).width = 14;
      sheet.getColumn(6).width = 15;
      sheet.getColumn(7).width = 15;
      sheet.getColumn(8).width = 14;
      sheet.getColumn(9).width = 16;
      sheet.getColumn(10).width = 16; // Số điện thoại
      sheet.getColumn(11).width = 20;
      sheet.getColumn(12).width = 25;
      sheet.getColumn(13).width = 10;
      sheet.getColumn(14).width = 8;
      sheet.getColumn(15).width = 8;
      sheet.getColumn(16).width = 8;
      sheet.getColumn(17).width = 10;
      sheet.getColumn(18).width = 3;  // Cột trống ngăn cách
      sheet.getColumn(19).width = 40; // Cột hướng dẫn

      res.setHeader("Content-Disposition", `attachment; filename="DanhSach_ThanhVien.xlsx"`);
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      console.error("Export members error:", err);
      res.status(500).json({ success: false, message: "Lỗi xuất Excel" });
    }
  }

  async exportTemplate(req: Request, res: Response): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("Nhập liệu");

      // ========== PHẦN DATA (Cột A-P) ==========
      const headers = [
        "STT", "Họ và tên", "Giới tính", "Ngày sinh", "Ngày mất",
        "Nơi sinh", "Nơi mất", "Nghề nghiệp", "Trình độ học vấn", "Số điện thoại",
        "Địa chỉ", "Tiểu sử", "Đời thứ", "ID Cha", "ID Mẹ", "ID Vợ", "ID Chồng",
      ];

      // Row 1: Header
      sheet.addRow(headers);
      const headerRow = sheet.getRow(1);
      headerRow.height = 28;
      headerRow.eachCell((cell, colNumber) => {
        if (colNumber <= 17) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } };
          cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
          
          // Format cột số điện thoại như text
          if (colNumber === 10) { // Cột số điện thoại
            cell.numFmt = "@"; // Text format
          }
        }
      });

      // Row 2: Gợi ý nhập liệu
      const hints = [
        "Số TT", "Bắt buộc", "1=Nam, 0=Nữ", "Năm/DD/MM/YYYY", "Năm/DD/MM/YYYY",
        "Tùy chọn", "Tùy chọn", "Tùy chọn", "Tùy chọn", "09/03xxxxxxxx", "Tùy chọn", "Tùy chọn",
        "Số (1,2,3...)", "STT cha", "STT mẹ", "STT vợ", "STT chồng"
      ];
      const hintRow = sheet.addRow(hints);
      hintRow.height = 30;
      hintRow.eachCell((cell, colNumber) => {
        if (colNumber <= 17) {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2CC" } };
          cell.font = { italic: true, size: 9, color: { argb: "806000" } };
          cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
          cell.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
          
          // Format cột số điện thoại như text
          if (colNumber === 10) { // Cột số điện thoại
            cell.numFmt = "@"; // Text format
          }
        }
      });

      // Row 3-4: Dữ liệu mẫu
      const samples = [
        [1, "Nguyễn Văn A", 1, "1950", "2020", "Hà Nội", "Hà Nội", "Nông dân", "Cấp 3", "0912345678", "Hà Nội", "Tổ tiên", 1, "", "", 2, ""],
        [2, "Trần Thị B", 0, "1955", "", "Hải Dương", "", "Nội trợ", "Cấp 2", "0987654321", "Hà Nội", "", 1, "", "", "", 1],
      ];
      samples.forEach(sample => {
        const row = sheet.addRow(sample);
        row.height = 22;
        row.eachCell((cell, colNumber) => {
          if (colNumber <= 17) {
            cell.alignment = { horizontal: "center", vertical: "middle" };
            cell.border = { top: { style: "thin" }, bottom: { style: "thin" }, left: { style: "thin" }, right: { style: "thin" } };
            
            // Format số điện thoại như text để giữ số 0 đầu
            if (colNumber === 10 && cell.value) { // Cột số điện thoại
              cell.numFmt = "@"; // Text format
              cell.value = String(cell.value); // Đảm bảo là string
            }
          }
        });
      });

      // ========== PHẦN HƯỚNG DẪN (Cột R - bên phải) ==========
      const guideCol = 18;
      const guideLines = [
        {
          text: "📖 HƯỚNG DẪN NHẬP LIỆU",
          bold: true,
          size: 14,
          color: "4472C4",
        },
        { text: "" },
        { text: "1. CỘT STT (Bắt buộc)", bold: true },
        { text: "   Số thứ tự duy nhất, dùng để tham chiếu quan hệ" },
        { text: "" },
        { text: "2. GIỚI TÍNH (Bắt buộc)", bold: true },
        { text: "   1 = Nam  |  0 = Nữ" },
        { text: "" },
        { text: "3. NGÀY SINH / NGÀY MẤT", bold: true },
        { text: "   Nhập linh hoạt: 1950 | 03/1950 | 15/03/1950" },
        { text: "" },
        { text: "4. ĐỜI THỨ", bold: true },
        { text: "   Đời 1: Tổ tiên | Đời 2: Con | Đời 3: Cháu..." },
        { text: "" },
        { text: "5. ID CHA / MẸ / VỢ / CHỒNG", bold: true },
        { text: "   Nhập STT của người tương ứng" },
        { text: "   VD: Cha STT=1 → Con nhập ID Cha = 1" },
        { text: "" },
        { text: "6. SỐ ĐIỆN THOẠI", bold: true },
        { text: "   Nhập số điện thoại đầy đủ" },
        { text: "   VD: 0912345678, 0387654321" },
        { text: "" },
        { text: "7. QUAN HỆ VỢ CHỒNG", bold: true },
        { text: "   Nam → nhập ID Vợ, bỏ trống ID Chồng" },
        { text: "   Nữ → nhập ID Chồng, bỏ trống ID Vợ" },
        { text: "" },
        { text: "⚠️ LƯU Ý:", bold: true, color: "C00000" },
        { text: "   Chỉ import 17 cột đầu (A-Q)" },
        { text: "   Xóa dòng mẫu trước khi nhập dữ liệu thật" },
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
      sheet.getColumn(1).width = 6;
      sheet.getColumn(2).width = 22;
      sheet.getColumn(3).width = 12;
      sheet.getColumn(4).width = 16;
      sheet.getColumn(5).width = 16;
      sheet.getColumn(6).width = 15;
      sheet.getColumn(7).width = 15;
      sheet.getColumn(8).width = 14;
      sheet.getColumn(9).width = 16;
      sheet.getColumn(10).width = 16;
      sheet.getColumn(11).width = 18;
      sheet.getColumn(12).width = 20;
      sheet.getColumn(13).width = 10;
      sheet.getColumn(14).width = 8;
      sheet.getColumn(15).width = 8;
      sheet.getColumn(16).width = 8;
      sheet.getColumn(17).width = 10;
      sheet.getColumn(18).width = 3;  // Cột trống ngăn cách
      sheet.getColumn(19).width = 45; // Cột hướng dẫn

      // Data validation cho cột Giới tính (từ dòng 3)
      for (let i = 3; i <= 1000; i++) {
        sheet.getCell(`C${i}`).dataValidation = {
          type: "list",
          allowBlank: false,
          formulae: ['"1,0"'],
          showErrorMessage: true,
          errorTitle: "Lỗi",
          error: "Chỉ nhập 1 (Nam) hoặc 0 (Nữ)",
        };
      }

      // Format cột ngày là text
      sheet.getColumn(4).numFmt = "@";
      sheet.getColumn(5).numFmt = "@";

      res.setHeader("Content-Disposition", 'attachment; filename="MauNhap_GiaPha.xlsx"');
      res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

      await workbook.xlsx.write(res);
      res.end();
    } catch (err) {
      res.status(500).json({ success: false, message: "Lỗi tạo Excel" });
    }
  }
  
}
