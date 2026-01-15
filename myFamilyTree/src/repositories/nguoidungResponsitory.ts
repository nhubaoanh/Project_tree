import { injectable } from "tsyringe";
import { nguoiDung, UserProfile } from "../models/nguoidung";
import { Database } from "../config/database";

@injectable()
export class nguoiDungReponsitory {
  constructor(private db: Database) {}

  async logUpUser(nguoiDung: nguoiDung): Promise<any> {
    try {
      const sql = "CALL SignUp (?,?,?,?,?,?, @err_code, @err_msg)";

      await this.db.query(sql, [
        nguoiDung.nguoiDungId,
        nguoiDung.tenDangNhap,
        nguoiDung.matKhau,
        nguoiDung.tenDongHo,
        nguoiDung.queQuanGoc,
        nguoiDung.ngayThanhLap,
      ]);

      // Lấy error code và message từ OUT parameters
      const [result] = await this.db.query("SELECT @err_code as error_code, @err_msg as error_message", []);
      const errorInfo = Array.isArray(result) ? result[0] : result;

      console.log("📊 [logUpUser] Stored procedure result:", errorInfo);

      if (errorInfo.error_code !== 0) {
        throw new Error(errorInfo.error_message || "Đăng ký thất bại");
      }

      return true;
    } catch (error: any) {
      console.error("❌ [logUpUser] Error:", error.message);
      throw new Error(error.message || "Đăng ký thất bại");
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
      return Array.isArray(results) ? results : [];
    } catch (error: any) {
      return [];
    }
  }

  async getActionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetActionByUserId(?, @err_code, @err_msg)";
      const results = await this.db.query(sql, [id]);      
      // Handle nested array từ stored procedure
      if (Array.isArray(results) && results.length > 0) {
        if (Array.isArray(results[0])) {
          console.log("Returning results[0] with", results[0].length, "items");
          return results[0];
        }
        return results;
      }
      return [];
    } catch (error: any) {
      return [];
    }
  }

  async getFunctionByUserId(id: string): Promise<any[]> {
    try {
      const sql = "CALL GetFunctionsByUserId(?, @err_code, @err_msg)";
      const results = await this.db.query(sql, [id]);
      // Handle nested array từ stored procedure - MySQL trả về [[data], ResultSetHeader]
      if (Array.isArray(results) && results.length > 0) {
        // results[0] là data array
        const data = results[0];
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
        // Nếu results[0] không phải array, có thể results chính là data
        if (!Array.isArray(data) && typeof data === 'object') {
          return [data];
        }
      }
      return [];
    } catch (error: any) {
      return [];
    }
  }

  async insertUser(nguoidung: nguoiDung): Promise<any> {
    try {
      const sql = "CALL InsertUser(?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        nguoidung.nguoiDungId,
        nguoidung.dongHoId,
        nguoidung.roleId,
        nguoidung.tenDangNhap,
        nguoidung.matKhau,
        nguoidung.full_name,
        nguoidung.phone,
        nguoidung.gender ?? 1, // gender (default to 1 if not provided)
        nguoidung.nguoiTaoId,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async updateUser(nguoidung: nguoiDung): Promise<any> {
    try {
      const sql = "CALL UpdateUser(?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        nguoidung.nguoiDungId,
        nguoidung.dongHoId,
        nguoidung.roleId,
        nguoidung.tenDangNhap,
        nguoidung.matKhau || null, // Gửi null nếu không có mật khẩu mới
        nguoidung.full_name,
        nguoidung.phone,
        nguoidung.email || nguoidung.tenDangNhap,
        nguoidung.gender ?? 1,
        nguoidung.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async UpdateMyProfile(nguoidung: UserProfile): Promise<any> {
    try {
      const sql =
        "CALL UpdateMyAccountAndProfile(?,?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        nguoidung.userId,
        nguoidung.tenDangNhap,
        nguoidung.matKhau,
        nguoidung.first_name,
        nguoidung.middle_name,
        nguoidung.last_name,
        nguoidung.gender,
        nguoidung.date_of_birthday,
        nguoidung.avatar,
        nguoidung.email,
        nguoidung.phone,
        nguoidung.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async deleteUser(list_json: any, updated_by_id: string): Promise<any> {
    try {
      const sql = "CALL DeleteUser(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [JSON.stringify(list_json), updated_by_id]);
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Lấy danh sách quyền của user từ stored procedure GetUserPermissions
   */
  async getUserPermissions(nguoiDungId: string): Promise<any[]> {
    try {
      const sql = "CALL GetUserPermissions(?)";
      const results = await this.db.query(sql, [nguoiDungId]);
      return Array.isArray(results) ? results : [];
    } catch (error: any) {
      console.error("getUserPermissions error:", error.message);
      return [];
    }
  }

  /**
   * Lấy menu + quyền theo roleId
   */
  async getMenuByRoleId(roleId: string): Promise<any[]> {
    try {
      const sql = "CALL GetMenuByRoleId(?)";
      const results = await this.db.query(sql, [roleId]);
      if (Array.isArray(results) && results.length > 0) {
        // Nếu results[0] là array (nested), lấy results[0]
        if (Array.isArray(results[0])) {
          return results[0];
        }
        // Nếu results[0] là object (flat), trả về results
        return results;
      }
      return [];
    } catch (error: any) {
      console.error("getMenuByRoleId error:", error.message);
      return [];
    }
  }
}
