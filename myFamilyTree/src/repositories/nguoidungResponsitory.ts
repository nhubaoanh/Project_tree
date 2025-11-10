import { injectable } from "tsyringe";
import { nguoiDung } from "../models/nguoidung";
import { Database } from "../config/database";

@injectable()
export class nguoiDungReponsitory {
    constructor(private db : Database) {}

    async logUpUser(nguoiDung: nguoiDung) : Promise<any> {
        try{
            const sql = "CALL SignUp (?,?,?, @err_code, @err_msg)";

            await this.db.query(sql, [
                nguoiDung.nguoiDungId,
                nguoiDung.tenDangNhap,
                nguoiDung.matKhau
            ]);
            return true;
        }catch(error : any){
            throw new Error(error)
        }
    }

    async logInUser(nguoiDung: nguoiDung) : Promise<any> {
        try{
            const sql = "CALL SignIn (?, ?, @err_code, @err_msg)";

            await this.db.query(sql, [
                nguoiDung.tenDangNhap,
                nguoiDung.matKhau
            ]);
            return true;
        }catch(error : any){
            throw new Error(error)
        }
    }
}