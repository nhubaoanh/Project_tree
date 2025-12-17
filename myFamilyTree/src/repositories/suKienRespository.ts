import { injectable } from "tsyringe";
import { suKien } from "../models/sukien";
import { Database } from "../config/database";

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
export class suKienRespository {
  constructor(private db: Database) {}

  async searchSuKien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchEvent(?,?,?,?, @err_code, @err_msg)";
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

  async createSuKien(sukien: suKien): Promise<any> {
    try {
      const sql =
        "CALL InsertEvent(?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        sukien.suKienId,
        sukien.dongHoId,
        sukien.tenSuKien,
        formatDateForMySQL(sukien.ngayDienRa),
        sukien.gioDienRa,
        sukien.diaDiem,
        sukien.moTa,
        sukien.lapLai,
        sukien.nguoiTaoId,
        sukien.loaiSuKien,
        sukien.uuTien,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateSuKien(sukien: suKien): Promise<any> {
    try {
      const sql =
        "CALL UpdateEvent(?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        sukien.suKienId,
        sukien.dongHoId,
        sukien.tenSuKien,
        formatDateForMySQL(sukien.ngayDienRa),
        sukien.gioDienRa,
        sukien.diaDiem,
        sukien.moTa,
        sukien.lapLai,
        sukien.loaiSuKien,
        sukien.uuTien,
        sukien.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }
}
