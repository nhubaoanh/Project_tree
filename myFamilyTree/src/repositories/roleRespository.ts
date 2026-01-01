import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class roleRespository {
  constructor(private db: Database) {}

  async getAllRole(): Promise<any> {
    try {
      const sql = "CALL getAllRole(@err_code, @err_mgs)";
      const result = await this.db.query(sql, []);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }

  // Tạo role mới
  async createRole(data: { roleName: string; roleCode: string; description?: string }): Promise<any> {
    try {
      const roleId = uuidv4();
      const sql = "CALL CreateRole(?, ?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [roleId, data.roleCode, data.roleName, data.description || null]);
      return { roleId, ...data };
    } catch (err: any) {
      console.error("createRole DB error:", err);
      throw new Error(err.message);
    }
  }

  // Cập nhật role
  async updateRole(roleId: string, data: { roleName: string; description?: string }): Promise<any> {
    try {
      const sql = "CALL UpdateRole(?, ?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [roleId, data.roleName, data.description || null]);
      return { success: true };
    } catch (err: any) {
      console.error("updateRole DB error:", err);
      throw new Error(err.message);
    }
  }

  // Xóa role (soft delete)
  async deleteRole(roleId: string): Promise<any> {
    try {
      const sql = "CALL DeleteRole(?, @err_code, @err_msg)";
      await this.db.query(sql, [roleId]);  
      return { success: true };
    } catch (err: any) {
      console.error("deleteRole DB error:", err);
      throw new Error(err.message);
    }
  }

  // Lấy menu và quyền theo roleId
  async getMenuByRole(roleId: string): Promise<any> {
    try {
      const sql = "CALL GetMenuByRole(?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [roleId]);
      if (Array.isArray(result) && result.length > 0) {
        return Array.isArray(result[0]) ? result[0] : result;
      }
      return [];
    } catch (err: any) {
      console.error("getMenuByRole DB error:", err);
      return [];
    }
  }

  // Lấy tất cả chức năng
  async getAllChucNang(): Promise<any> {
    try {
      const sql = "CALL GetAllChucNang(@err_code, @err_msg)";
      const result = await this.db.query(sql, []);
      if (Array.isArray(result) && result.length > 0) {
        return Array.isArray(result[0]) ? result[0] : result;
      }
      return [];
    } catch (err: any) {
      console.error("getAllChucNang DB error:", err);
      return [];
    }
  }

  // Lấy tất cả thao tác
  async getAllThaoTac(): Promise<any> {
    try {
      const sql = "CALL GetAllThaoTac(@err_code, @err_msg)";
      const result = await this.db.query(sql, []);
      if (Array.isArray(result) && result.length > 0) {
        return Array.isArray(result[0]) ? result[0] : result;
      }
      return [];
    } catch (err: any) {
      console.error("getAllThaoTac DB error:", err);
      return [];
    }
  }

  // Lấy quyền của role (matrix chức năng - thao tác)
  async getRolePermissions(roleId: string): Promise<any> {
    try {
      const sql = "CALL GetRolePermissions(?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [roleId]);
      if (Array.isArray(result) && result.length > 0) {
        return Array.isArray(result[0]) ? result[0] : result;
      }
      return [];
    } catch (err: any) {
      console.error("getRolePermissions DB error:", err);
      return [];
    }
  }

  // Cập nhật quyền cho role
  async updateRolePermissions(
    roleId: string,
    permissions: { chucNangId: string; thaoTacId: string; active: boolean }[]
  ): Promise<any> {
    try {
      const sql = "CALL UpdateRolePermissions(?, ?, @err_code, @err_msg)";
      await this.db.query(sql, [roleId, JSON.stringify(permissions)]);
      return { success: true };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
