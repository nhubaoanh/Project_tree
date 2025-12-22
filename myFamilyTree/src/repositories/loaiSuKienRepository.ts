import { injectable } from "tsyringe";
import { loaiSuKien } from "../models/loaisukien";
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
export class loaiSuKienRespository {
  constructor(private db: Database) {}

  async searchLoaiSuKien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchLoaiSuKien(?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content || null,
      ]);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
