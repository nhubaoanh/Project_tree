import { injectable } from "tsyringe";
import { nguoiDungReponsitory } from "../repositories/nguoidungResponsitory";
import { nguoiDung } from "../models/nguoidung";
import { v4 as uuidv4 } from "uuid";
import { system_email } from "../config/system_email";
import nodemailer from "nodemailer";

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
  async loginUser(tenDangNhap: string, matKhau: string): Promise<any> {
    const md5_pass = md5(matKhau);
    console.log("password: ", md5_pass);

    const user = await this.nguoidungResponsitory.LoginUser(tenDangNhap);
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

  async resetPassword(tenDangNhap: string): Promise<any> {

    console.log("tenDangNhap",tenDangNhap);
    const generateRandomString = (length: number) => {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    };

    var new_password = generateRandomString(8);
    console.log("new_password",new_password);
    var hashed_password = md5(new_password);
    console.log("hashed_password",hashed_password);
    let result = await this.nguoidungResponsitory.resetPassword(
      tenDangNhap,
      hashed_password
    );

    if (result) {
      let mailTransporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: system_email.email,
          pass: system_email.password,
        },
      });

      const emailBody = `
          <p>Xin chào,</p>
                      <p>Hệ thống đã nhận được yêu cầu đổi mật từ bạn.</p>
                      <p>Mật khẩu mới của bạn là: <b> ${new_password}</b></p>
                      <p>Trân trọng.  
                    `;
      var mailOptions = {
        from: system_email.email,
        to: tenDangNhap,
        subject: "Đổi mật khâu",
        html: emailBody,
      }

      mailTransporter.sendMail(mailOptions, function(err, data){
        if(err) console.log(err);
      })

    }
    return new_password;
  }
}
