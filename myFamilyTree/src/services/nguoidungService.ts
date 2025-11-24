import { injectable } from "tsyringe";
import { nguoiDungReponsitory } from "../repositories/nguoidungResponsitory";
import { nguoiDung } from "../models/nguoidung";
import { v4 as uuidv4 } from "uuid";
import { system_email } from "../config/system_email";
import nodemailer from "nodemailer";
import { verifyToken } from "../config/jwt";
import { Tree } from "../ultis/tree";
import { Action } from "../models/Actions";

var md5 = require("md5");

@injectable()
export class nguoiDungService {
  constructor(private nguoidungResponsitory: nguoiDungReponsitory,
    private treeUltility: Tree
  ) {}

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
    if(user) {
      let functions = await this.nguoidungResponsitory.getFunctionByUserId(
        user.nguoiDungId
      );
      

      console.log("functions", functions);
      let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
      let actions = await this.nguoidungResponsitory.getActionByUserId(
        user.nguoiDungId
      );
      return {
        user_id: user.nguoiDungId,
        dongHoId: user.dongHoId,
        hoTen: user.hoTen,
        email: user.email,
        soDienThoai: user.soDienThoai,
        roleId: user.roleId,
        anhDaiDien: user.anhDaiDien,
        ngayTao: user.ngayTao,
        online_flag: user.online_flag,
        functions: functionTree,
        actions: actions,
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

  async authrize(token: string){
    let user_data = verifyToken(token);
    console.log(user_data);
    
    if(user_data == null) throw new Error("Phien dang nhap het han.");
    let functions = await this.nguoidungResponsitory.getFunctionByUserId(user_data.nguoiDungId);

    console.log("functions",functions);
    let functionTree = this.treeUltility.getFunctionTree(functions, 1, "0");
    let actions = await this.nguoidungResponsitory.getActionByUserId(user_data.nguoiDungId);

    let action_result = [];
    for(let row of actions) {
      let row_data = row as Action;
      action_result.push(row_data.action_code);
    }
    let data = {
      user_id : user_data.nguoiDungId,
      dongHoId : user_data.dongHoId,
      hoTen: user_data.hoTen,
      email: user_data.email,
      soDienThoai: user_data.soDienThoai,
      roleId: user_data.roleId,
      anhDaiDien: user_data.anhDaiDien,
      ngayTao: user_data.ngayTao,
      online_flag: user_data.online_flag,
      functions: functionTree,
      actions: action_result,      
    };
    return data;
  }
}
