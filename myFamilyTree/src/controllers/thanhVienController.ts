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
  async createThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const thanhvien = req.body as thanhVien;
      // Gán dongHoId mặc định nếu chưa có
      if (!thanhvien.dongHoId) {
        thanhvien.dongHoId = "e9022e64-cbae-11f0-8020-a8934a9bae74";
      }
      const results = await this.thanhvienService.createThanhVien(thanhvien);
      res.status(200).json({
        message: "Thêm thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.log("error", error);
      res
        .status(500)
        .json({ message: "Thêm thành viên thất bại", success: false });
    }
  }

  async getThanhVienById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const result = await this.thanhvienService.getThanhVienById(id);
      if (result) {
        res.status(200).json({ success: true, data: result });
      } else {
        res.status(404).json({ success: false, message: "Không tìm thấy thành viên" });
      }
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ message: "Lỗi khi lấy thông tin thành viên", success: false });
    }
  }

  async updateThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const thanhvien = req.body as thanhVien;
      thanhvien.thanhVienId = id;
      const results = await this.thanhvienService.updateThanhVien(thanhvien);
      res.status(200).json({
        message: "Cập nhật thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ message: "Cập nhật thành viên thất bại", success: false });
    }
  }

  async deleteThanhVien(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id);
      const results = await this.thanhvienService.deleteThanhVien(id);
      res.status(200).json({
        message: "Xóa thành viên thành công",
        success: true,
        data: results,
      });
    } catch (error: any) {
      console.log("error", error);
      res.status(500).json({ message: "Xóa thành viên thất bại", success: false });
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
      console.log("error", error);
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

  async exportTemplate(req: Request, res: Response): Promise<void> {
    try {
      const workbook = new ExcelJS.Workbook();
      
      // ========== SHEET 1: Mẫu nhập liệu ==========
      const sheet = workbook.addWorksheet("Nhập liệu");
      
      // Headers - bỏ Dòng họ ID và Người tạo ID (sẽ tự động gán)
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
      ];

      // Row 1: Tiêu đề chính
      sheet.addRow(headers);
      const headerRow = sheet.getRow(1);
      headerRow.height = 28;
      headerRow.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "4472C4" } };
        cell.font = { bold: true, color: { argb: "FFFFFF" }, size: 11 };
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Row 2: Hướng dẫn nhập
      const guideRow = sheet.addRow([
        "Số thứ tự",
        "Bắt buộc",
        "1=Nam, 0=Nữ",
        "Năm hoặc DD/MM/YYYY",
        "Năm hoặc DD/MM/YYYY",
        "Tùy chọn",
        "Tùy chọn",
        "Tùy chọn",
        "Tùy chọn",
        "Tùy chọn",
        "Tùy chọn",
        "Số (1,2,3...)",
        "STT của cha",
        "STT của mẹ",
        "STT của vợ (nếu Nam)",
        "STT của chồng (nếu Nữ)",
      ]);
      guideRow.height = 35;
      guideRow.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2CC" } };
        cell.font = { italic: true, size: 9, color: { argb: "806000" } };
        cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Row 3: Dữ liệu mẫu
      const sampleRow = sheet.addRow([
        1,
        "Nguyễn Văn A",
        1,
        "1950",
        "2020",
        "Hà Nội",
        "Hà Nội",
        "Nông dân",
        "Cấp 3",
        "Hà Nội, Việt Nam",
        "Người sáng lập dòng họ",
        1,
        "",
        "",
        2,
        "",
      ]);
      sampleRow.height = 22;
      sampleRow.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Row 4: Dữ liệu mẫu 2 (vợ)
      const sampleRow2 = sheet.addRow([
        2,
        "Trần Thị B",
        0,
        "1955",
        "",
        "Hải Dương",
        "",
        "Nội trợ",
        "Cấp 2",
        "Hà Nội, Việt Nam",
        "",
        1,
        "",
        "",
        "",
        1,
      ]);
      sampleRow2.height = 22;
      sampleRow2.eachCell((cell) => {
        cell.alignment = { horizontal: "center", vertical: "middle" };
        cell.border = {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        };
      });

      // Cột width
      sheet.columns = [
        { width: 6 },   // STT
        { width: 22 },  // Họ tên
        { width: 12 },  // Giới tính
        { width: 18 },  // Ngày sinh
        { width: 18 },  // Ngày mất
        { width: 15 },  // Nơi sinh
        { width: 15 },  // Nơi mất
        { width: 14 },  // Nghề nghiệp
        { width: 16 },  // Trình độ
        { width: 20 },  // Địa chỉ
        { width: 25 },  // Tiểu sử
        { width: 10 },  // Đời thứ
        { width: 10 },  // ID Cha
        { width: 10 },  // ID Mẹ
        { width: 10 },  // ID Vợ
        { width: 12 },  // ID Chồng
      ];

      // Data validation cho nhiều dòng (3-1000)
      for (let i = 3; i <= 1000; i++) {
        // Giới tính: dropdown 0 hoặc 1
        sheet.getCell(`C${i}`).dataValidation = {
          type: "list",
          allowBlank: false,
          formulae: ['"1,0"'],
          showErrorMessage: true,
          errorTitle: "Lỗi giới tính",
          error: "Chỉ được nhập 1 (Nam) hoặc 0 (Nữ)",
        };

        // Đời thứ: số nguyên dương
        sheet.getCell(`L${i}`).dataValidation = {
          type: "whole",
          allowBlank: true,
          operator: "greaterThan",
          formulae: [0],
          showErrorMessage: true,
          errorTitle: "Lỗi đời thứ",
          error: "Đời thứ phải là số nguyên dương (1, 2, 3...)",
        };
      }

      // Format cột ngày là text để cho phép nhập linh hoạt
      sheet.getColumn(4).numFmt = "@"; // Ngày sinh - text
      sheet.getColumn(5).numFmt = "@"; // Ngày mất - text

      // ========== SHEET 2: Hướng dẫn ==========
      const guideSheet = workbook.addWorksheet("Hướng dẫn");
      
      const instructions = [
        ["HƯỚNG DẪN NHẬP DỮ LIỆU GIA PHẢ"],
        [""],
        ["1. CỘT STT (Bắt buộc)"],
        ["   - Số thứ tự duy nhất cho mỗi thành viên"],
        ["   - Dùng để tham chiếu quan hệ cha/mẹ/vợ/chồng"],
        [""],
        ["2. CỘT GIỚI TÍNH (Bắt buộc)"],
        ["   - Nhập 1 = Nam"],
        ["   - Nhập 0 = Nữ"],
        [""],
        ["3. CỘT NGÀY SINH / NGÀY MẤT"],
        ["   - Có thể nhập linh hoạt:"],
        ["     + Chỉ năm: 1950"],
        ["     + Tháng/Năm: 03/1950 hoặc 1950-03"],
        ["     + Đầy đủ: 15/03/1950 hoặc 1950-03-15"],
        ["   - Để trống nếu không biết"],
        [""],
        ["4. CỘT ĐỜI THỨ"],
        ["   - Đời 1: Tổ tiên đầu tiên"],
        ["   - Đời 2: Con của đời 1"],
        ["   - Đời 3: Cháu của đời 1..."],
        [""],
        ["5. CỘT ID CHA / ID MẸ / ID VỢ / ID CHỒNG"],
        ["   - Nhập STT của người tương ứng"],
        ["   - Ví dụ: Ông A có STT=1, con trai B có STT=3"],
        ["     → Ở dòng B, cột ID Cha nhập 1"],
        [""],
        ["6. LƯU Ý QUAN HỆ VỢ CHỒNG"],
        ["   - Nam (giới tính=1): Nhập ID Vợ, để trống ID Chồng"],
        ["   - Nữ (giới tính=0): Nhập ID Chồng, để trống ID Vợ"],
        [""],
        ["7. THỨ TỰ NHẬP"],
        ["   - Nên nhập theo thứ tự đời (đời 1 trước, đời 2 sau...)"],
        ["   - Đảm bảo cha/mẹ có STT nhỏ hơn con"],
      ];

      instructions.forEach((row, index) => {
        const r = guideSheet.addRow(row);
        if (index === 0) {
          r.font = { bold: true, size: 16, color: { argb: "4472C4" } };
          r.height = 30;
        } else if (row[0]?.startsWith("   -")) {
          r.font = { size: 11 };
        } else if (row[0]?.match(/^\d\./)) {
          r.font = { bold: true, size: 12 };
        }
      });

      guideSheet.getColumn(1).width = 60;

      // Response
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="MauNhap_GP.xlsx"'
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
