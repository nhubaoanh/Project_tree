import { injectable } from "tsyringe";
import { suKien } from "../models/sukien";
import { Database } from "../config/database";

@injectable()
export class suKienRespository {
  constructor(private db: Database) {}


  async searchSuKien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string,
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
}