import { injectable } from "tsyringe";
import { taiChinhThu } from "../models/TaiChinhThu";
import { Database } from "../config/database";


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
}
