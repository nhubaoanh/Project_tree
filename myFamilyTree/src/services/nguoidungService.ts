import { injectable } from "tsyringe";
import { nguoiDungReponsitory } from "../repositories/nguoidungResponsitory";
import { nguoiDung } from "../models/nguoidung";
import { v4 as uuidv4 } from "uuid";

var md5 = require("md5");

@injectable()
export class nguoiDungService {
  constructor(private nguoidungResponsitory: nguoiDungReponsitory) {}

  async createNguoiDung(nguoiDung: nguoiDung): Promise<any> {
    nguoiDung.nguoiDungId = uuidv4();
    nguoiDung.tenDangNhap = nguoiDung.tenDangNhap.toLowerCase();
    nguoiDung.matKhau = md5(nguoiDung.matKhau);
    return this.nguoidungResponsitory.logUpUser(nguoiDung);
  }

  // async loginUser(tenDangNhap: string, matKhau: string): Promise<any>{
  //     let md5_pass = md5(matKhau);
  //     console.log("password: ",md5_pass);
  //     let user = await this.nguoidungResponsitory.LoginUser(tenDangNhap, md5_pass);
  //     console.log("User raw from repository:", user);

  //      if (!user || user.length === 0) {
  //        return {
  //          success: false,
  //          message: "Tài khoản không tồn tại hoặc đã bị vô hiệu hóa!",
  //        };
  //      }

  //     const User = user[0][0]; // thông tin người dùng trả về

  //     console.log("User fetched from repository:", User);

  //     // So sánh mật khẩu hash
  //     if (User.matKhau !== md5_pass) {
  //       return { success: false, message: "Mật khẩu không đúng!" };
  //     }

  //     console.log("User fetched in service:", user);

  //     return {success: true, message: "Đăng nhập thành công!", data: user};
  // }
  async loginUser(tenDangNhap: string, matKhau: string): Promise<any> {
    const md5_pass = md5(matKhau);
    console.log("password: ", md5_pass);

    const user = await this.nguoidungResponsitory.LoginUser(
      tenDangNhap,
    );
    console.log("User raw from repository:", user);

    if (!user) {
      return {
        success: false,
        message: "Tài khoản không tồn tại hoặc đã bị vô hiệu hóa!",
      };
    }

    // So sánh mật khẩu hash
    if (user.matKhau !== md5_pass) {
      return { success: false, message: "Mật khẩu không đúng!" };
    }

    return { success: true, message: "Đăng nhập thành công!", data: user };
  }

  async searchUser(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any[]> {
    return this.nguoidungResponsitory.searchUser(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }
}