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

  // async logInUser(nguoiDung: nguoiDung) : Promise<any> {
  //     try{
  //         const sql = "CALL SignIn (?, ?, @err_code, @err_msg)";

  //         await this.db.query(sql, [
  //             nguoiDung.tenDangNhap,
  //             nguoiDung.matKhau
  //         ]);
  //         return true;
  //     }catch(error : any){
  //         throw new Error(error)
  //     }
  // }

  // async searchUser(
  //     pageIndex: number,
  //     pageSize : number,
  //     search_content: string,
  //     dongHoId: string,
  // ): Promise<any[]> {
  //     try{
  //         const sql = "CALL SearchNguoiDung(? ,? ,? ,? , @err_code, @err_msg)";
  //         const [result] = await this.db.query(sql, [
  //             pageIndex,
  //             pageSize,
  //             search_content,
  //             dongHoId,
  //         ])
  //         return result[0] || [];
  //     }catch(error : any){
  //         throw new Error(error)
  //     }
  // }
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

      // results[0] là các row
      // Nếu RecordCount nằm trong mỗi row, lấy từ row đầu tiên
      return results[0] || [];
    } catch (error: any) {
      throw new Error(error);
    }
  }
}