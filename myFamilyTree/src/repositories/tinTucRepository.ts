import { injectable } from "tsyringe";
import { TinTuc } from "../models/tintuc";
import { Database } from "../config/database";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class TinTucRepository {
  constructor(private db: Database) {}

  async search(
    pageIndex: number,
    pageSize: number,
    searchContent: string,
    dongHoId: string
  ): Promise<TinTuc[]> {
    try {
      const sql = "CALL SearchTinTuc(?,?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        searchContent || null,
        dongHoId || null,
      ]);
      return result as TinTuc[];
    } catch (error: any) {
      console.error("SearchTinTuc error:", error.message);
      throw new Error(error.message);
    }
  }

  async create(tinTuc: TinTuc): Promise<any> {
    try {
      const id = uuidv4();
      const sql = `CALL InsertTinTuc(?,?,?,?,?,?,?,?,?, @err_code, @err_msg)`;
      await this.db.query(sql, [
        id,
        tinTuc.dongHoId,
        tinTuc.tieuDe,
        tinTuc.noiDung || null,
        tinTuc.tomTat || null,
        tinTuc.anhDaiDien || null,
        tinTuc.tacGia || null,
        tinTuc.ghim || 0,
        tinTuc.nguoiTaoId || null,
      ]);
      return { success: true, tinTucId: id };
    } catch (error: any) {
      console.error("InsertTinTuc error:", error.message);
      throw new Error(error.message);
    }
  }

  async update(tinTuc: TinTuc): Promise<any> {
    try {
      const sql = `CALL UpdateTinTuc(?,?,?,?,?,?,?,?,?, @err_code, @err_msg)`;
      await this.db.query(sql, [
        tinTuc.tinTucId,
        tinTuc.dongHoId,
        tinTuc.tieuDe,
        tinTuc.noiDung || null,
        tinTuc.tomTat || null,
        tinTuc.anhDaiDien || null,
        tinTuc.tacGia || null,
        tinTuc.ghim || 0,
        tinTuc.lu_user_id || null,
      ]);
      return { success: true };
    } catch (error: any) {
      console.error("UpdateTinTuc error:", error.message);
      throw new Error(error.message);
    }
  }

  async delete(tinTucId: string, luUserId: string): Promise<any> {
    try {
      const sql = `CALL DeleteTinTuc(?,?, @err_code, @err_msg)`;
      await this.db.query(sql, [tinTucId, luUserId]);
      return { success: true };
    } catch (error: any) {
      console.error("DeleteTinTuc error:", error.message);
      throw new Error(error.message);
    }
  }

  async getById(tinTucId: string): Promise<TinTuc | null> {
    try {
      const sql = `CALL GetTinTucById(?, @err_code, @err_msg)`;
      const [result]: any = await this.db.query(sql, [tinTucId]);
      return result && result.length > 0 ? result[0] : null;
    } catch (error: any) {
      console.error("GetTinTucById error:", error.message);
      throw new Error(error.message);
    }
  }
}
