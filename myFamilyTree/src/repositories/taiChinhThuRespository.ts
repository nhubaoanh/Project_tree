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

}
