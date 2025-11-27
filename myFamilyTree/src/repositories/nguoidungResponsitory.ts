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

  async resetPassword(tenDangNhap: string, matKhauMoi: string) : Promise<any> {
    try{
      const sql = "CALL ResetPassWord(? ,?, @err_code, @err_msg)";
      console.log("sql", sql);
      console.log("tenDangNhap", tenDangNhap);
      console.log("matKhauMoi", matKhauMoi);
      await this.db.query(sql, [tenDangNhap, matKhauMoi]);
      return true;
    }catch(error: any){
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

  async getActionByUserId(id: string) : Promise<any[]> {
    try{
      const sql = 'CALL GetActionByUserId(?, @err_code, @err_msg)';
      const [results] = await this.db.query(sql, [id]);
      return results;
    }catch(error : any){
      throw new Error(error.message);
    }
  }

  async getFunctionByUserId(id: string) : Promise<any[]>{
    try{
      const sql = "CALL GetFunctionsByUserId(?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [id]);
      return result;
    }catch(error :any){
      throw new Error(error.message);
    }
  }

  async insertUser(nguoidung : nguoiDung): Promise<any> {
    try{
      const sql = 'CALL InsertUser(?,?,?,?,?,?,?,?, @err_code, @err_msg)';
      await this.db.query(sql, [
        nguoidung.nguoiDungId,
        nguoidung.dongHoId,
        nguoidung.roleId,
        nguoidung.tenDangNhap,
        nguoidung.matKhau,
        nguoidung.hoTen,
        nguoidung.soDienThoai,
        nguoidung.nguoiTaoId
      ]);

      console.log("sql", sql);
      return true;
    }catch(error : any) {
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
        nguoidung.hoTen,
        nguoidung.soDienThoai,
        nguoidung.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
