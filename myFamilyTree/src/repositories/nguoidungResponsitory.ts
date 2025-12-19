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

  async checkUser(userName: string): Promise<any> {
    try {
      const sql = "CALL checkUsernameExist(?, @err_code, @err_msg)";
      const [rows] = await this.db.query(sql, [userName]);
      return rows[0].exist; // 0 hoặc 1
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async LoginUser(tenDangNhap: string): Promise<any> {
    try {
      const sql = "CALL LoginUserByAccount(? ,@err_code, @err_msg)";
      const [results] = await this.db.query(sql, [tenDangNhap]);
      if (Array.isArray(results) && results.length > 0) {
        const user = results[0];
        return user;
      }
      return null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async resetPassword(tenDangNhap: string, matKhauMoi: string): Promise<any> {
    try {
      const sql = "CALL ResetPassWord(? ,?, @err_code, @err_msg)";
      await this.db.query(sql, [tenDangNhap, matKhauMoi]);
      return true;
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
      console.log("searchUser results:", results);
      // Nếu results là mảng rỗng hoặc undefined, trả về []
      return Array.isArray(results) ? results : [];
    } catch (error: any) {
      console.error("searchUser repository error:", error.message);
      // Trả về mảng rỗng thay vì throw error để không làm crash app
      return [];
    }
  }

  async getActionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetActionByUserId(?, @err_code, @err_msg)";
      const [results] = await this.db.query(sql, [id]);
      return results;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getFunctionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetFunctionsByUserId(?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [id]);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async insertUser(nguoidung: nguoiDung): Promise<any> {
    try {
      const sql = "CALL InsertUser(?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        nguoidung.nguoiDungId,
        nguoidung.dongHoId,
        nguoidung.roleId,
        nguoidung.tenDangNhap,
        nguoidung.matKhau,
        nguoidung.full_name,
        nguoidung.phone,
        nguoidung.nguoiTaoId,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUser(nguoidung: nguoiDung): Promise<any> {
    try {
      const sql = "CALL UpdateUser(?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        nguoidung.nguoiDungId,
        nguoidung.dongHoId,
        nguoidung.roleId,
        nguoidung.tenDangNhap,
        nguoidung.matKhau,
        nguoidung.full_name,
        nguoidung.phone,
        nguoidung.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteUser(list_json: any, updated_by_id: string) : Promise<any>{
    try{
      const sql = "CALL DeleteUser(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    }catch(error: any) {
      throw new Error(error.message);
    }
  }
}
