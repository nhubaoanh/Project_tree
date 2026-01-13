import { injectable } from "tsyringe";
import { taiChinhChi } from "../models/TaiChinhChi";
import { Database } from "../config/database";
import { ITaiChinhChiImport } from "../services/taiChinhChiService";

@injectable()
export class taiChinhChiRespository {
  constructor(private db: Database) {}

  async searchTaiChinhChi(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchTaiChinhChi(?,?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content || null,
        dongHoId || null,
      ]);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createTaiChinhChi(taiChinhChi: taiChinhChi): Promise<any> {
    try {
      const sql =
        "CALL InsertTaiChinhChi(?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        taiChinhChi.dongHoId,
        taiChinhChi.danhMucId,
        taiChinhChi.ngayChi,
        taiChinhChi.soTien,
        taiChinhChi.phuongThucThanhToan,
        taiChinhChi.noiDung,
        taiChinhChi.nguoiNhan,
        taiChinhChi.ghiChu,
        taiChinhChi.nguoiNhapId,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async UpdateTaiChinhChi(taiChinhChi: taiChinhChi): Promise<any> {
    try {
      const sql =
        "CALL UpdateTaiChinhChi(?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        taiChinhChi.chiId,
        taiChinhChi.dongHoId,
        taiChinhChi.danhMucId,
        taiChinhChi.ngayChi,
        taiChinhChi.soTien,
        taiChinhChi.phuongThucThanhToan,
        taiChinhChi.noiDung,
        taiChinhChi.nguoiNhan,
        taiChinhChi.ghiChu,
        taiChinhChi.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async deleteTaiChinhChi(listJson: any[], luUserId: string): Promise<any> {
    try {
      const sql = "CALL DeleteTaiChinhChi(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(listJson), luUserId]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  // Import từ JSON - sử dụng procedure mới (theo pattern thành viên)
  async importFromJson(
    data: ITaiChinhChiImport[],
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    const connection = await this.db.getRawConnection();
    try {
      const jsonData = JSON.stringify(data);
      // Gọi stored procedure với OUT params
      await connection.query(
        'CALL ImportTaiChinhChiFromJson(?, ?, ?, @err_code, @err_msg)',
        [jsonData, dongHoId, nguoiTaoId]
      );

      // Lấy output params
      const [outParams]: any = await connection.query(
        'SELECT @err_code AS err_code, @err_msg AS err_msg'
      );

      const errorCode = outParams[0].err_code;
      const message = outParams[0].err_msg;

      // Xử lý các trường hợp khác nhau
      if (errorCode === 0) {
        // Thành công hoàn toàn
        return { 
          success: true, 
          count: data.length,
          message: message 
        };
      } else if (errorCode === 1001) {
        // Thành công một phần (có lỗi nhưng vẫn import được một số dòng)
        return { 
          success: true, 
          partial: true,
          count: data.length,
          message: message 
        };
      } else {
        // Lỗi hoàn toàn
        throw new Error(message || 'Lỗi khi import dữ liệu chi');
      }
    } catch (error: any) {
      console.error("❌ Import CHI error:", error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
}
