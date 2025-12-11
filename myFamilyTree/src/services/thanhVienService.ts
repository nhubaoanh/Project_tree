import { thanhVien } from "../models/thanhvien";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { injectable } from "tsyringe";
import * as XLSX from "xlsx";

@injectable()
export class thanhVienService {
  constructor(private thanhvienRespository: thanhVienRespository) {}

  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    return await this.thanhvienRespository.createThanhVien(thanhvien);
  }

  // Tạo nhiều thành viên cùng lúc
  async createMultipleThanhVien(thanhViens: thanhVien[]): Promise<any> {
    return await this.thanhvienRespository.createMultipleThanhVien(thanhViens);
  }

  async updateMultipleThanhVien(thanhVien: thanhVien): Promise<any> {
    return await this.thanhvienRespository.updateMultipleThanhVien(thanhVien);
  }

  async getAllThanhVien(): Promise<any> {
    return await this.thanhvienRespository.getAllThanhVien();
  }

  async searchThanhVien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string,
    thanhVienId: number
  ): Promise<any> {
    return await this.thanhvienRespository.searchThanhVien(
      pageIndex,
      pageSize,
      search_content,
      dongHoId,
      thanhVienId
    );
  }

  async importFromExcel(data: any[]): Promise<any> {
    try {
      const importedData = [];

      const parseDate = (excelDate: any) => {
        if (!excelDate) return null;
        if (typeof excelDate === "number") {
          // Chuyển đổi từ số ngày Excel sang Date
          const date = new Date((excelDate - 25569) * 86400 * 1000);
          return date.toISOString().split("T")[0]; // Trả về YYYY-MM-DD
        }
        return excelDate;
      };

      const dongHoId = "e9022e64-cbae-11f0-8020-a8934a9bae74";

      // ánh xạ dữ liệu
      const toIntOrNull = (v: any, defaultValue: number | null = null) => {
        // Handle empty values
        if (v === undefined || v === null || v === "" || v === " ") {
          return defaultValue;
        }

        // If it's already a number, ensure it's an integer
        if (typeof v === "number") {
          return Number.isInteger(v) ? v : Math.round(v);
        }

        // If it's a string that can be converted to a number
        if (typeof v === "string") {
          // Remove any whitespace and try to convert
          const trimmed = v.trim();
          if (trimmed === "") return defaultValue;

          // Handle "Nam"/"Nữ" for gender
          if (trimmed.toLowerCase() === "nam") return 1;
          if (trimmed.toLowerCase() === "nữ" || trimmed.toLowerCase() === "nu")
            return 0;

          // Try to convert to number
          const num = Number(trimmed);
          return isNaN(num) ? defaultValue : Math.round(num);
        }

        return defaultValue;
      };

      // In the mapping section:
      const thanhViens = data.map((row: any) => {
        const gioiTinh = toIntOrNull(row["Giới tính"]);
        const importedVoId = toIntOrNull(row["ID Vợ"]);
        const importedChongId = toIntOrNull(row["ID Chồng"]);

        const item = {
          thanhVienId: toIntOrNull(row["STT"]),
          hoTen: row["Họ và tên"] || "",
          gioiTinh: toIntOrNull(row["Giới tính"]), // Force 0 or 1
          ngaySinh: parseDate(row["Ngày sinh"]),
          ngayMat: parseDate(row["Ngày mất"]),
          noiSinh: row["Nơi sinh"] || "",
          noiMat: row["Nơi mất"] || "",
          ngheNghiep: row["Nghề nghiệp"] || "",
          trinhDoHocVan: row["Trình độ học vấn"] || "",
          diaChiHienTai: row["Địa chỉ"] || "",
          tieuSu: row["Tiểu sử"] || "",
          doiThuoc: toIntOrNull(row["Đời thứ"], 1),
          chaId: toIntOrNull(row["ID Cha"]),
          meId: toIntOrNull(row["ID Mẹ"]),
          // voId: toIntOrNull(row["ID Vợ"]),
          // chongId: toIntOrNull(row["ID Chồng"]),
          // Nếu là NAM (1) -> gán voId, chongId = null
          voId: gioiTinh === 1 ? importedVoId : null,
          // Nếu là NỮ (0) -> gán chongId, voId = null
          chongId: gioiTinh === 0 ? importedChongId : null,
          dongHoId: dongHoId,
          nguoiTaoId: toIntOrNull(row["Người tạo ID"], 1),
        };

        return item;
      });

      thanhViens.sort((a, b) => {
        const doiThuocA = a.doiThuoc !== null ? a.doiThuoc : Infinity;
        const doiThuocB = b.doiThuoc !== null ? b.doiThuoc : Infinity;
        return doiThuocA - doiThuocB;
      });

      // gọi res

      const result = await this.thanhvienRespository.importFromExcel(
        thanhViens
      );
      console.log(result);
      importedData.push(result);
      return {
        success: true,
        message: `Đã nhập thành công ${result} / ${thanhViens.length} thành viên`,
        result: importedData,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Lỗi khi nhập dữ liệu: ${err.message}`,
      };
    }
  }
}
