import { injectable } from "tsyringe";
import { taiChinhChi } from "../models/TaiChinhChi";
import { Database } from "../config/database";

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
}
