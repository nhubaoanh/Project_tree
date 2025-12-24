import { injectable } from "tsyringe";
import { thanhVien } from "../models/thanhvien";
import { Database } from "../config/database";

// Helper: Format date cho MySQL (YYYY-MM-DD)
const formatDateForMySQL = (date: any): string | null => {
  if (!date) return null;
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0];
  } catch {
    return null;
  }
};

@injectable()
export class thanhVienRespository {
  constructor(private db: Database) {}

  // Tạo thành viên mới - sử dụng Composite Key (tự động tăng ID theo dòng họ)
  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    try {
      const sql = `CALL InsertMemberComposite(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @newId, @err_code, @err_msg)`;
      await this.db.query(sql, [
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
      
      // Lấy ID mới được tạo
      const [result]: any = await this.db.query('SELECT @newId AS newThanhVienId', []);
      return { success: true, thanhVienId: result[0]?.newThanhVienId };
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  // Update thành viên - cần cả dongHoId và thanhVienId (Composite Key)
  async updateMultipleThanhVien(thanhVien: thanhVien): Promise<any> {
    try {
      const sql = `
        UPDATE thanhvien SET
          hoTen = ?,
          gioiTinh = ?,
          ngaySinh = ?,
          ngayMat = ?,
          noiSinh = ?,
          noiMat = ?,
          ngheNghiep = ?,
          trinhDoHocVan = ?,
          diaChiHienTai = ?,
          tieuSu = ?,
          anhChanDung = ?,
          doiThuoc = ?,
          chaId = ?,
          meId = ?,
          voId = ?,
          chongId = ?,
          lu_updated = NOW(),
          lu_user_id = ?
        WHERE dongHoId = ? AND thanhVienId = ?
      `;
      await this.db.query(sql, [
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
        thanhVien.dongHoId,
        thanhVien.thanhVienId,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  // Lấy thành viên theo Composite Key (dongHoId + thanhVienId)
  async getThanhVienById(dongHoId: string, thanhVienId: number): Promise<any> {
    try {
      const sql = `
        SELECT tv.*, 
          cha.hoTen AS tenCha, me.hoTen AS tenMe, 
          vo.hoTen AS tenVo, chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        WHERE tv.dongHoId = ? AND tv.thanhVienId = ? AND tv.active_flag = 1
      `;
      const [result] = await this.db.query(sql, [dongHoId, thanhVienId]);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Xóa thành viên (soft delete) - cần Composite Key
  async deleteThanhVien(dongHoId: string, thanhVienId: number): Promise<any> {
    try {
      const sql = "UPDATE thanhvien SET active_flag = 0 WHERE dongHoId = ? AND thanhVienId = ?";
      await this.db.query(sql, [dongHoId, thanhVienId]);
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

  // Search thành viên theo dòng họ cụ thể (dùng procedure mới)
  async searchThanhVienByDongHo(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchThanhVienByDongHo(?,?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content || null,
        dongHoId,
      ]);
      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // Import từ JSON - sử dụng procedure mới cho Composite Key
  async importFromJson(
    thanhviens: any[],
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    const connection = await this.db.getRawConnection();
    try {
      const jsonData = JSON.stringify(thanhviens);
      // Gọi stored procedure mới cho Composite Key
      await connection.query(
        'CALL ImportThanhVienFromJsonComposite(?, ?, ?, @err_code, @err_msg)',
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
