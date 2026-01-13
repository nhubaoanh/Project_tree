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
    try {
      const sql =
        "CALL InsertTaiChinhThu(?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        taiChinhThu.dongHoId,
        taiChinhThu.danhMucId,
        taiChinhThu.hoTenNguoiDong,
        taiChinhThu.ngayDong,
        taiChinhThu.soTien,
        taiChinhThu.phuongThucThanhToan,
        taiChinhThu.noiDung,
        taiChinhThu.ghiChu,
        taiChinhThu.nguoiNhapId,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async UpdateTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
    try {
      const sql =
        "CALL UpdateTaiChinhThu(?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        taiChinhThu.thuId,
        taiChinhThu.dongHoId,
        taiChinhThu.danhMucId,
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
      console.log("🔍 Debug import THU:");
      console.log("- Data length:", data.length);
      console.log("- Sample data:", JSON.stringify(data[0], null, 2));
      console.log("- dongHoId:", dongHoId);
      console.log("- nguoiTaoId:", nguoiTaoId);

      const jsonData = JSON.stringify(data);
      console.log("- JSON data:", jsonData);

      // Gọi stored procedure với OUT params
      await connection.query(
        'CALL ImportTaiChinhThuFromJson(?, ?, ?, @err_code, @err_msg)',
        [jsonData, dongHoId, nguoiTaoId]
      );

      // Lấy output params
      const [outParams]: any = await connection.query(
        'SELECT @err_code AS err_code, @err_msg AS err_msg'
      );

      console.log("- Stored procedure result:", outParams[0]);

      const errorCode = outParams[0].err_code;
      const message = outParams[0].err_msg;

      // Xử lý các trường hợp khác nhau
      if (errorCode === 0) {
        // Thành công hoàn toàn
        console.log("✅ Import THU thành công hoàn toàn");
        return { 
          success: true, 
          count: data.length,
          message: message 
        };
      } else if (errorCode === 1001) {
        // Thành công một phần (có lỗi nhưng vẫn import được một số dòng)
        console.log("⚠️ Import THU thành công một phần");
        return { 
          success: true, 
          partial: true,
          count: data.length,
          message: message 
        };
      } else {
        // Lỗi hoàn toàn
        console.log("❌ Import THU thất bại:", message);
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
