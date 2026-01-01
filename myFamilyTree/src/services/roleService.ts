import { injectable } from "tsyringe";
import { roleRespository } from "../repositories/roleRespository";

@injectable()
export class roleService {
  constructor(private roleRes: roleRespository) {}

  async getAllRole(): Promise<any> {
    return this.roleRes.getAllRole();
  }

  // Tạo role mới
  async createRole(data: { roleName: string; roleCode: string; description?: string }): Promise<any> {
    return this.roleRes.createRole(data);
  }

  // Cập nhật role
  async updateRole(roleId: string, data: { roleName: string; description?: string }): Promise<any> {
    return this.roleRes.updateRole(roleId, data);
  }

  // Xóa role
  async deleteRole(roleId: string): Promise<any> {
    return this.roleRes.deleteRole(roleId);
  }

  // Lấy menu và quyền theo roleId
  async getMenuByRole(roleId: string): Promise<any> {
    return this.roleRes.getMenuByRole(roleId);
  }

  // Lấy tất cả chức năng
  async getAllChucNang(): Promise<any> {
    return this.roleRes.getAllChucNang();
  }

  // Lấy tất cả thao tác
  async getAllThaoTac(): Promise<any> {
    return this.roleRes.getAllThaoTac();
  }

  // Lấy quyền của role
  async getRolePermissions(roleId: string): Promise<any> {
    return this.roleRes.getRolePermissions(roleId);
  }

  // Cập nhật quyền cho role
  async updateRolePermissions(
    roleId: string,
    permissions: { chucNangId: string; thaoTacId: string; active: boolean }[]
  ): Promise<any> {
    return this.roleRes.updateRolePermissions(roleId, permissions);
  }
}
