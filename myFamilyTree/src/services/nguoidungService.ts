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
    console.log("=== LOGIN DEBUG START ===");
    console.log("tenDangNhap:", tenDangNhap);
    console.log("matKhau length:", matKhau?.length);
    
    try {
      const md5_pass = md5(matKhau);
      console.log("md5_pass:", md5_pass);
      
      const user = await this.nguoidungResponsitory.LoginUser(tenDangNhap);
      console.log("user from DB:", user);
      
      if (user && user.matKhau === md5_pass) {
        console.log("Password match - getting functions and actions");
        // Lấy danh sách functions và actions (có thể không có nếu chưa tạo stored procedure)
        let functionTree: any[] = [];
        let actions: any[] = [];
        
        try {
          const functions = await this.nguoidungResponsitory.getFunctionByUserId(user.nguoiDungId);
          functionTree = this.treeUtility.getFunctionTree(functions || [], 1, "0");
          console.log("Functions loaded successfully");
        } catch (err) {
          console.log("getFunctionByUserId error:", err);
        }
        
        try {
          actions = await this.nguoidungResponsitory.getActionByUserId(user.nguoiDungId);
          console.log("Actions loaded successfully");
        } catch (err) {
          console.log("getActionByUserId error:", err);
        }

        console.log("=== LOGIN DEBUG END - SUCCESS ===");
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
          functions: functionTree,
          actions: actions || [],
        };
      }
      console.log("Password mismatch or user not found");
      console.log("=== LOGIN DEBUG END - FAILED ===");
      return null;
    } catch (error: any) {
      console.error("=== LOGIN SERVICE ERROR ===");
      console.error("Error:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
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

  /**
   * Authorize - verify token và lấy lại functions/actions từ DB
   * Trả về format phù hợp với FE Sidebar (đã build tree)
   */
  async authorize(token: string) {
    try {
      let user_data = verifyToken(token);
      if (user_data == null) throw new Error("Phiên đăng nhập hết hạn");

      console.log("=== AUTHORIZE DEBUG ===");
      console.log("User ID:", user_data.nguoiDungId);

      // Lấy functions từ DB và build tree
      let functionTree: any[] = [];
      let permissions: Record<string, string[]> = {};

      try {
        const functions = await this.nguoidungResponsitory.getFunctionByUserId(user_data.nguoiDungId);
        console.log("Functions from DB:", JSON.stringify(functions, null, 2));
        
        if (functions && functions.length > 0) {
          // Dùng treeUtility để build tree (giống loginUser)
          functionTree = this.treeUtility.getFunctionTree(functions, 1, "0");
          console.log("Built function tree:", JSON.stringify(functionTree, null, 2));
        }
      } catch (err: any) {
        console.log("getFunctionByUserId error:", err.message);
      }

      try {
        const actions = await this.nguoidungResponsitory.getActionByUserId(user_data.nguoiDungId);
        console.log("Actions from DB count:", actions?.length);
        
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
        }
        console.log("Permissions:", JSON.stringify(permissions, null, 2));
      } catch (err: any) {
        console.log("getActionByUserId error:", err.message);
      }

      // Convert functionTree sang format FE Sidebar cần
      const convertToMenuFormat = (items: any[]): any[] => {
        return items.map(item => ({
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
      };

      const menus = convertToMenuFormat(functionTree);
      console.log("Final menus:", JSON.stringify(menus, null, 2));
      console.log("=== END AUTHORIZE DEBUG ===");

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
        // Format cho FE Sidebar - đã build tree sẵn
        menus: menus,
        permissions: permissions,
        canSelectAllDongHo: user_data.roleCode === 'sa',
      };
    } catch (error: any) {
      console.error("authorize error:", error.message);
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
    nguoidung.matKhau = md5(nguoidung.matKhau);
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
}
