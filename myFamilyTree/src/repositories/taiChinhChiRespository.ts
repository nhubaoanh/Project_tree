import { injectable } from "tsyringe";
import { taiChinhChi } from "../models/TaiChinhChi";
import { Database } from "../config/database";
import taiChinhThu from "../routes/taiChinhThu";

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
}
