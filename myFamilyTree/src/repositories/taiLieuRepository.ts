import { injectable } from "tsyringe";
import { TaiLieu } from "../models/tailieu";
import { Database } from "../config/database";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class TaiLieuRepository {
  constructor(private db: Database) {}

  async search(
    pageIndex: number,
    pageSize: number,
    searchContent: string,
    dongHoId: string,
    loaiTaiLieu: string
  ): Promise<TaiLieu[]> {
    try {
      const sql = "CALL SearchTaiLieu(?,?,?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        searchContent || null,
        dongHoId || null,
        loaiTaiLieu || null,
      ]);
      return result as TaiLieu[];
    } catch (error: any) {
      console.error("SearchTaiLieu error:", error.message);
      throw new Error(error.message);
    }
  }

  async create(taiLieu: TaiLieu): Promise<any> {
    try {
      const id = uuidv4();
      const sql = `CALL InsertTaiLieu(?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)`;
      await this.db.query(sql, [
        id,
        taiLieu.dongHoId,
        taiLieu.tenTaiLieu,
        taiLieu.duongDan || null,
        taiLieu.moTa || null,
        taiLieu.loaiTaiLieu || null,
        taiLieu.namSangTac || null,
        taiLieu.tacGia || null,
        taiLieu.nguonGoc || null,
        taiLieu.ghiChu || null,
        taiLieu.nguoiTaoId || null,
      ]);
      return { success: true, taiLieuId: id };
    } catch (error: any) {
      console.error("InsertTaiLieu error:", error.message);
      throw new Error(error.message);
    }
  }

  async update(taiLieu: TaiLieu): Promise<any> {
    try {
      const sql = `CALL UpdateTaiLieu(?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)`;
      await this.db.query(sql, [
        taiLieu.taiLieuId,
        taiLieu.dongHoId,
        taiLieu.tenTaiLieu,
        taiLieu.duongDan || null,
        taiLieu.moTa || null,
        taiLieu.loaiTaiLieu || null,
        taiLieu.namSangTac || null,
        taiLieu.tacGia || null,
        taiLieu.nguonGoc || null,
        taiLieu.ghiChu || null,
        taiLieu.lu_user_id || null,
      ]);
      return { success: true };
    } catch (error: any) {
      console.error("UpdateTaiLieu error:", error.message);
      throw new Error(error.message);
    }
  }

  async delete(taiLieuId: string, luUserId: string): Promise<any> {
    try {
      const sql = `CALL DeleteTaiLieu(?,?, @err_code, @err_msg)`;
      await this.db.query(sql, [taiLieuId, luUserId]);
      return { success: true };
    } catch (error: any) {
      console.error("DeleteTaiLieu error:", error.message);
      throw new Error(error.message);
    }
  }

  async getById(taiLieuId: string): Promise<TaiLieu | null> {
    try {
      const sql = `CALL GetTaiLieuById(?, @err_code, @err_msg)`;
      const [result]: any = await this.db.query(sql, [taiLieuId]);
      return result && result.length > 0 ? result[0] : null;
    } catch (error: any) {
      console.error("GetTaiLieuById error:", error.message);
      throw new Error(error.message);
    }
  }

  async deleteMultiple(listJson: any[], luUserId: string): Promise<any> {
    try {
      const sql = `CALL DeleteTaiLieu(?, ?, @err_code, @err_msg)`;
      await this.db.query(sql, [JSON.stringify(listJson), luUserId]);
      return { success: true };
    } catch (error: any) {
      console.error("DeleteTaiLieu error:", error.message);
      throw new Error(error.message);
    }
  }
}
