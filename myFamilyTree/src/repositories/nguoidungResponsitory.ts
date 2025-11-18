import { injectable } from "tsyringe";
import { nguoiDung } from "../models/nguoidung";
import { Database } from "../config/database";

@injectable()
export class nguoiDungReponsitory {
  constructor(private db: Database) {}

  async logUpUser(nguoiDung: nguoiDung): Promise<any> {
    try {
      const sql = "CALL SignUp (?,?,?, @err_code, @err_msg)";

      await this.db.query(sql, [
        nguoiDung.nguoiDungId,
        nguoiDung.tenDangNhap,
        nguoiDung.matKhau,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error);
    }
  }


  async LoginUser(tenDangNhap: string): Promise<any> {
    try {
      const sql = "CALL LoginUserByAccount(? ,@err_code, @err_msg)";
      const [results] = await this.db.query(sql, [tenDangNhap]);

      console.log("Results from LoginUserByAccount:", results);

      // Lấy object user trực tiếp từ mảng
      if (Array.isArray(results) && results.length > 0) {
        const user = results[0];
        console.log("User fetched in repository:", user);

        return user;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchUser(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchNguoiDung(? ,? ,? ,? , @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content || null,
        dongHoId || null,
      ]);

      // tra ra toan bo mang object
      return results;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}