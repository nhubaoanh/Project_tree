import { injectable } from "tsyringe";
import { nguoiDungReponsitory } from "../repositories/nguoidungResponsitory";
import { nguoiDung, UserProfile } from "../models/nguoidung";
import { v4 as uuidv4 } from "uuid";
import { system_email } from "../config/system_email";
import nodemailer from "nodemailer";
import { verifyToken } from "../config/jwt";
import { Tree } from "../ultis/tree";

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
    const user = await this.nguoidungResponsitory.LoginUser(tenDangNhap);
    if (user) {
      return {
        nguoiDungId: user.nguoiDungId,
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        full_name: user.full_name,
        gender: user.gender,
        date_of_birthday: user.date_of_birthday,
        avatar: user.avatar,
        email: user.email,
        phone: user.phone,
        dongHoId: user.dongHoId,
        roleId: user.roleId,
        roleCode: user.roleCode,
        online_flag: user.online_flag,
      };
    }
    return null;
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
    console.log("tenDangNhap", tenDangNhap);
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
    console.log("new_password", new_password);
    var hashed_password = md5(new_password);
    console.log("hashed_password", hashed_password);
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
      };

      mailTransporter.sendMail(mailOptions, function (err, data) {
        if (err) console.log(err);
      });
    }
    return new_password;
  }

  async authrize(token: string) {
    let user_data = verifyToken(token);
    if (user_data == null) throw new Error("Phien dang nhap het han.")
    
    let data = {
      nguoiDungId: user_data.nguoiDungId,
      first_name: user_data.first_name,
      middle_name: user_data.middle_name,
      last_name: user_data.last_name,
      full_name: user_data.full_name,
      hoTen: user_data.full_name || user_data.hoTen,
      gender: user_data.gender,
      date_of_birthday: user_data.date_of_birthday,
      avatar: user_data.avatar,
      email: user_data.email,
      phone: user_data.phone,
      dongHoId: user_data.dongHoId,
      roleId: user_data.roleId,
      roleCode: user_data.roleCode,
      online_flag: user_data.online_flag,
    };
    return data;
  }

  async insertUser(nguoidung: nguoiDung): Promise<any> {
    nguoidung.nguoiDungId = uuidv4();
    nguoidung.tenDangNhap = nguoidung.tenDangNhap.toLowerCase();
    nguoidung.matKhau = md5(nguoidung.matKhau);
    return this.nguoidungResponsitory.insertUser(nguoidung);
  }

  async updateUser(nguoidung: nguoiDung): Promise<any> {
    nguoidung.matKhau = md5(nguoidung.matKhau);
    return this.nguoidungResponsitory.updateUser(nguoidung);
  }

  async UpdateMyProfile(nguoidung: UserProfile): Promise<any> {
    // Chỉ hash password nếu có nhập mật khẩu mới
    if (nguoidung.matKhau && nguoidung.matKhau.trim() !== '') {
      nguoidung.matKhau = md5(nguoidung.matKhau);
    } else {
      nguoidung.matKhau = ''; // Để trống để proc không update password
    }
    return this.nguoidungResponsitory.UpdateMyProfile(nguoidung);
  }

  async checkUser(userName: string): Promise<any> {
    return this.nguoidungResponsitory.checkUser(userName);
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    return this.nguoidungResponsitory.deleteUser(list_json, updated_by_id);
  }
}
