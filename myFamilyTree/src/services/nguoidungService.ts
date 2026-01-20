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
  private treeUtility: Tree;

  constructor(private nguoidungResponsitory: nguoiDungReponsitory) {
    this.treeUtility = new Tree();
  }

  async createNguoiDung(nguoiDung: nguoiDung): Promise<any> {
    nguoiDung.nguoiDungId = uuidv4();
    nguoiDung.tenDangNhap = nguoiDung.tenDangNhap.toLowerCase();
    nguoiDung.matKhau = md5(nguoiDung.matKhau);
    return this.nguoidungResponsitory.logUpUser(nguoiDung);
  }

  async loginUser(tenDangNhap: string, matKhau: string): Promise<any> {    
    try {
      const md5_pass = md5(matKhau);      
      const user = await this.nguoidungResponsitory.LoginUser(tenDangNhap);
      
      if (user && user.matKhau === md5_pass) {
        // Lấy danh sách functions và actions (có thể không có nếu chưa tạo stored procedure)
        let functionTree: any[] = [];
        let actions: any[] = [];
        
        try {
          const functions = await this.nguoidungResponsitory.getFunctionByUserId(user.nguoiDungId);
          functionTree = this.treeUtility.getFunctionTree(functions || [], 1, "0");
        } catch (err) {
          console.log("getFunctionByUserId error:", err);
        }
        
        try {
          actions = await this.nguoidungResponsitory.getActionByUserId(user.nguoiDungId);
        } catch (err) {
          console.log("getActionByUserId error:", err);
        }
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
          tenDongHo: user.tenDongHo,
          roleId: user.roleId,
          roleCode: user.roleCode,
          online_flag: user.online_flag,
          functions: functionTree,
          actions: actions || [],
        };
      }
      return null;
    } catch (error: any) {
      throw error;
    }
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
    var hashed_password = md5(new_password);
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
        <p>Mật khẩu mới của bạn là: <b>${new_password}</b></p>
        <p>Trân trọng.</p>
      `;
      var mailOptions = {
        from: system_email.email,
        to: tenDangNhap,
        subject: "Đổi mật khẩu",
        html: emailBody,
      };

      mailTransporter.sendMail(mailOptions, function (err, data) {
        if (err) console.log(err);
      });
    }
    return new_password;
  }
  async authorize(token: string) {
    try {
      let user_data = verifyToken(token);
      if (user_data == null) throw new Error("Phiên đăng nhập hết hạn");
      // Lấy functions từ DB và build tree
      let functionTree: any[] = [];
      let permissions: Record<string, string[]> = {};

      try {
        const functions = await this.nguoidungResponsitory.getFunctionByUserId(user_data.nguoiDungId);        
        if (functions && functions.length > 0) {
          // Dùng treeUtility để build tree (giống loginUser)
          console.log("Building function tree...");
          
          // Chuẩn hóa data trước khi build tree
          const normalizedFunctions = functions.map(func => {
            let normalizedFunc = { ...func };
            
            // Chuẩn hóa parent_id
            if (func.parent_id === "" || func.parent_id === null || func.parent_id === undefined) {
              normalizedFunc.parent_id = null;
              normalizedFunc.level = 1; // Root level
            } else {
              normalizedFunc.level = 2; // Child level
            }
            
            return normalizedFunc;
          });          
          functionTree = this.treeUtility.getFunctionTree(normalizedFunctions, 1, null);
          // Sort tree theo sort_order
          const sortTree = (items: any[]): any[] => {
            return items
              .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
              .map(item => ({
                ...item,
                children: item.children && item.children.length > 0 
                  ? sortTree(item.children) 
                  : item.children
              }));
          };
          
          functionTree = sortTree(functionTree);
        } else {
          console.log("No functions found from DB - functionTree will be empty");
        }
      } catch (err: any) {
        console.log("Error stack:", err.stack);
      }

      try {
        const actions = await this.nguoidungResponsitory.getActionByUserId(user_data.nguoiDungId);                
        if (actions && actions.length > 0) {
          // Group actions theo function_code
          actions.forEach((action: any) => {
            const code = action.function_code;
            if (!permissions[code]) {
              permissions[code] = [];
            }
            if (action.action_code && !permissions[code].includes(action.action_code)) {
              permissions[code].push(action.action_code);
            }
          });
        } else {
          console.log("No actions found from DB - permissions will be empty");
        }
      } catch (err: any) {
        console.log("Error stack:", err.stack);
      }

      // Convert functionTree sang format FE Sidebar cần
      const convertToMenuFormat = (items: any[]): any[] => {
        const result = items.map(item => ({
          code: item.code,
          name: item.title,
          href: item.url || '#',
          icon: item.icon || '/icon/iconmember.png',
          sortOrder: item.sort_order || 1,
          parentId: item.parent_id || null,
          actions: permissions[item.code] || [],
          children: item.children && item.children.length > 0 
            ? convertToMenuFormat(item.children) 
            : undefined
        }));
        return result;
      };
      const menus = convertToMenuFormat(functionTree);
      return {
        nguoiDungId: user_data.nguoiDungId,
        first_name: user_data.first_name,
        middle_name: user_data.middle_name,
        last_name: user_data.last_name,
        full_name: user_data.full_name,
        hoTen: user_data.full_name,
        gender: user_data.gender,
        date_of_birthday: user_data.date_of_birthday,
        avatar: user_data.avatar,
        email: user_data.email,
        phone: user_data.phone,
        dongHoId: user_data.dongHoId,
        roleId: user_data.roleId,
        roleCode: user_data.roleCode,
        online_flag: user_data.online_flag,
        menus: menus,
        permissions: permissions,
        canSelectAllDongHo: user_data.roleCode === 'sa',
      };
    } catch (error: any) {
      throw error;
    }
  }

  async insertUser(nguoidung: nguoiDung): Promise<any> {
    nguoidung.nguoiDungId = uuidv4();
    nguoidung.tenDangNhap = nguoidung.tenDangNhap.toLowerCase();
    nguoidung.matKhau = md5(nguoidung.matKhau);
    return this.nguoidungResponsitory.insertUser(nguoidung);
  }

  async updateUser(nguoidung: nguoiDung): Promise<any> {
    // Chỉ hash mật khẩu nếu có mật khẩu mới
    if (nguoidung.matKhau && nguoidung.matKhau.trim() !== "") {
      nguoidung.matKhau = md5(nguoidung.matKhau);
    } else {
      // Nếu không có mật khẩu mới, gửi null để stored procedure giữ nguyên mật khẩu cũ
      nguoidung.matKhau = null as any;
    }
    return this.nguoidungResponsitory.updateUser(nguoidung);
  }

  async UpdateMyProfile(nguoidung: UserProfile): Promise<any> {
    if (nguoidung.matKhau && nguoidung.matKhau.trim() !== "") {
      nguoidung.matKhau = md5(nguoidung.matKhau);
    } else {
      nguoidung.matKhau = "";
    }
    return this.nguoidungResponsitory.UpdateMyProfile(nguoidung);
  }

  async checkUser(userName: string): Promise<any> {
    return this.nguoidungResponsitory.checkUser(userName);
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    return this.nguoidungResponsitory.deleteUser(list_json, updated_by_id);
  }

  async getUserPermissions(nguoiDungId: string): Promise<any[]> {
    return this.nguoidungResponsitory.getUserPermissions(nguoiDungId);
  }

  async getMenuByRoleId(roleId: string): Promise<any[]> {
    return this.nguoidungResponsitory.getMenuByRoleId(roleId);
  }

  async getUserById(nguoiDungId: string): Promise<any> {
    return this.nguoidungResponsitory.getUserById(nguoiDungId);
  }
}
