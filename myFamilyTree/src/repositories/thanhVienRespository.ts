import { injectable } from "tsyringe";
import { thanhVien } from "../models/thanhvien";
import { Database } from "../config/database";

// Helper: Format date cho MySQL (YYYY-MM-DD)
const formatDateForMySQL = (date: any): string | null => {
  if (!date) return null;
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0]; // "2022-12-31"
  } catch {
    return null;
  }
};

@injectable()
export class thanhVienRespository {
  constructor(private db: Database) {}

  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    try {
      const sql =
        "CALL InsertMember(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        thanhvien.thanhVienId,
        thanhvien.dongHoId,
        thanhvien.hoTen,
        thanhvien.gioiTinh,
        formatDateForMySQL(thanhvien.ngaySinh),
        formatDateForMySQL(thanhvien.ngayMat),
        thanhvien.noiSinh,
        thanhvien.noiMat,
        thanhvien.ngheNghiep,
        thanhvien.trinhDoHocVan,
        thanhvien.diaChiHienTai,
        thanhvien.tieuSu,
        thanhvien.anhChanDung,
        thanhvien.doiThuoc,
        thanhvien.chaId,
        thanhvien.meId,
        thanhvien.voId,
        thanhvien.chongId,
        thanhvien.nguoiTaoId,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async updateMultipleThanhVien(thanhVien: thanhVien): Promise<any> {
    try {
      const sql =
        "CALL updateMember(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        thanhVien.thanhVienId,
        thanhVien.dongHoId,
        thanhVien.hoTen,
        thanhVien.gioiTinh,
        formatDateForMySQL(thanhVien.ngaySinh),
        formatDateForMySQL(thanhVien.ngayMat),
        thanhVien.noiSinh,
        thanhVien.noiMat,
        thanhVien.ngheNghiep,
        thanhVien.trinhDoHocVan,
        thanhVien.diaChiHienTai,
        thanhVien.tieuSu,
        thanhVien.anhChanDung,
        thanhVien.doiThuoc,
        thanhVien.chaId,
        thanhVien.meId,
        thanhVien.voId,
        thanhVien.chongId,
        thanhVien.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async getThanhVienById(thanhVienId: number): Promise<any> {
    try {
      const sql = "CALL GetThanhVienById(?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [thanhVienId]);
      return result[0];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteThanhVien(thanhVienId: number): Promise<any> {
    try {
      const sql = "UPDATE thanhvien SET active_flag = 0 WHERE thanhVienId = ?";
      await this.db.query(sql, [thanhVienId]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }


  async getAllThanhVien(): Promise<any> {
    try {
      const sql = "CALL getAllMember(@err_code, @err_msg)";
      const result = await this.db.query(sql, []);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchThanhVien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string,
    thanhVienId: number
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchThanhVien(?,?,?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content || null,
        dongHoId || null,
        thanhVienId || null,
      ]);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // Import từ JSON - gọi stored procedure
  async importFromJson(
    thanhviens: any[],
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    const connection = await this.db.getRawConnection();
    try {
      const jsonData = JSON.stringify(thanhviens);
      // Gọi stored procedure
      await connection.query(
        'CALL ImportThanhVienFromJson(?, ?, ?, @err_code, @err_msg)',
        [jsonData, dongHoId, nguoiTaoId]
      );

      // Lấy output params
      const [outParams]: any = await connection.query(
        'SELECT @err_code AS err_code, @err_msg AS err_msg'
      );
      

      if (outParams[0].err_code !== 0 && outParams[0].err_code !== null) {
        throw new Error(outParams[0].err_msg || 'Lỗi khi import dữ liệu');
      }

      return { 
        success: true, 
        count: thanhviens.length,
        message: outParams[0].err_msg 
      };
    } catch (error: any) {
      console.error("❌ Import error:", error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
}
