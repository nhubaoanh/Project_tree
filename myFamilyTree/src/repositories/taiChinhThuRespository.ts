import { injectable } from "tsyringe";
import { taiChinhThu } from "../models/TaiChinhThu";
import { Database } from "../config/database";
import { ITaiChinhThuImport } from "../services/taiChinhThuService";

@injectable()
export class taiChinhThuRespository {
  constructor(private db: Database) {}

  async searchTaiChinhThu(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchTaiChinhThu(?,?,?,?, @err_code, @err_msg)";
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

  async createTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
    const connection = await this.db.getRawConnection();
    try {
      const sql =
        "CALL InsertTaiChinhThu(?,?,?,?,?,?,?,?, @thuId, @err_code, @err_msg)";
      await connection.query(sql, [
        taiChinhThu.dongHoId,
        taiChinhThu.hoTenNguoiDong,
        taiChinhThu.ngayDong,
        taiChinhThu.soTien,
        taiChinhThu.phuongThucThanhToan,
        taiChinhThu.noiDung,
        taiChinhThu.ghiChu,
        taiChinhThu.nguoiNhapId,
      ]);
      
      // Lấy thuId vừa tạo
      const [outParams]: any = await connection.query(
        'SELECT @thuId AS thuId, @err_code AS err_code, @err_msg AS err_msg'
      );
      
      const thuId = outParams[0].thuId;
      const errorCode = outParams[0].err_code;
      const message = outParams[0].err_msg;
      
      if (errorCode !== 0) {
        throw new Error(message || 'Lỗi khi tạo khoản thu');
      }
      
      return { thuId, dongHoId: taiChinhThu.dongHoId };
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    } finally {
      connection.release();
    }
  }

  async UpdateTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
    try {
      const sql =
        "CALL UpdateTaiChinhThu(?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        taiChinhThu.thuId,
        taiChinhThu.dongHoId,
        taiChinhThu.hoTenNguoiDong,
        taiChinhThu.ngayDong,
        taiChinhThu.soTien,
        taiChinhThu.phuongThucThanhToan,
        taiChinhThu.noiDung,
        taiChinhThu.ghiChu,
        taiChinhThu.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async deleteTaiChinhThu(listJson: any[], luUserId: string): Promise<any> {
    try {
      const sql = "CALL DeleteTaiChinhThu(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(listJson), luUserId]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  // Import từ JSON - sử dụng procedure mới (theo pattern thành viên)
  async importFromJson(
    data: ITaiChinhThuImport[],
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    const connection = await this.db.getRawConnection();
    try {
      const jsonData = JSON.stringify(data);

      // Gọi stored procedure với OUT params
      await connection.query(
        'CALL ImportTaiChinhThuFromJson(?, ?, ?, @err_code, @err_msg)',
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
        throw new Error(message || 'Lỗi khi import dữ liệu thu');
      }
    } catch (error: any) {
      console.error("❌ Import THU error:", error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
}
