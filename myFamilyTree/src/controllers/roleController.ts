import { roleService } from "../services/roleService";
import { Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class roleController {
  constructor(private role: roleService) {}

  // Lấy tất cả role
  async getAllRole(_req: Request, res: Response): Promise<void> {
    try {
      const result = await this.role.getAllRole();
      res.status(200).json({
        message: "Lấy danh sách role thành công",
        success: true,
        data: result[0],
      });
    } catch (err: any) {
      res.status(500).json({ message: "Lỗi server", success: false });
    }
  }

  // Tạo role mới
  async createRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleName, roleCode, description } = req.body;
      
      if (!roleName || !roleCode) {
        res.status(400).json({ success: false, message: "Thiếu thông tin bắt buộc" });
        return;
      }

      const result = await this.role.createRole({ roleName, roleCode, description });
      res.status(200).json({
        success: true,
        message: "Tạo nhóm quyền thành công",
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Lỗi server" });
    }
  }

  // Cập nhật role
  async updateRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const { roleName, description } = req.body;

      const result = await this.role.updateRole(roleId, { roleName, description });
      res.status(200).json({
        success: true,
        message: "Cập nhật nhóm quyền thành công",
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Lỗi server" });
    }
  }

  // Xóa role
  async deleteRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;

      // Không cho xóa role admin
      const roles = await this.role.getAllRole();
      const role = roles[0]?.find((r: any) => r.roleId === roleId);
      if (role?.roleCode === "sa") {
        res.status(400).json({ success: false, message: "Không thể xóa nhóm quyền Admin" });
        return;
      }

      await this.role.deleteRole(roleId);
      res.status(200).json({
        success: true,
        message: "Xóa nhóm quyền thành công",
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Lỗi server" });
    }
  }

  // Lấy menu theo role của user đang đăng nhập
  async getMyMenu(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      if (!user) {
        res.status(401).json({ success: false, message: "Chưa đăng nhập" });
        return;
      }

      const menus = await this.role.getMenuByRole(user.roleId);
      const menuTree = this.buildMenuTree(menus);

      res.status(200).json({
        success: true,
        data: {
          menus: menuTree,
          roleCode: user.roleCode,
          dongHoId: user.dongHoId,
        },
      });
    } catch (err: any) {
      console.error("getMyMenu error:", err);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

  // Lấy menu theo roleId (cho admin xem)
  async getMenuByRole(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const menus = await this.role.getMenuByRole(roleId);
      const menuTree = this.buildMenuTree(menus);

      res.status(200).json({
        success: true,
        data: menuTree,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

  // Lấy tất cả chức năng (cho admin cấu hình)
  async getAllChucNang(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.role.getAllChucNang();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

  // Lấy tất cả thao tác (cho admin cấu hình)
  async getAllThaoTac(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.role.getAllThaoTac();
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

  // Lấy quyền của role (matrix)
  async getRolePermissions(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const permissions = await this.role.getRolePermissions(roleId);

      // Group theo chức năng
      const grouped: any = {};
      for (const perm of permissions) {
        if (!grouped[perm.chucNangCode]) {
          grouped[perm.chucNangCode] = {
            chucNangId: perm.chucNangId,
            chucNangCode: perm.chucNangCode,
            tenChucNang: perm.tenChucNang,
            thaoTac: {},
          };
        }
        grouped[perm.chucNangCode].thaoTac[perm.thaoTacCode] = perm.active_flag === 1;
      }

      res.status(200).json({
        success: true,
        data: Object.values(grouped),
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

  // Cập nhật quyền cho role
  async updateRolePermissions(req: Request, res: Response): Promise<void> {
    try {
      const { roleId } = req.params;
      const { permissions } = req.body;

      await this.role.updateRolePermissions(roleId, permissions);

      res.status(200).json({
        success: true,
        message: "Cập nhật quyền thành công",
      });
    } catch (err: any) {
      console.error("updateRolePermissions error:", err);
      res.status(500).json({ success: false, message: "Lỗi server" });
    }
  }

  // Helper: Build menu tree từ flat list
  // Input từ stored procedure: {chucNangId, code, name, href, icon, sortOrder, parentId, actions, roleCode, canSelectAllDongHo}
  private buildMenuTree(menus: any[]): any[] {
    const menuMap = new Map();
    const roots: any[] = [];

    // Tạo map với format chuẩn
    menus.forEach((menu) => {
      menuMap.set(menu.chucNangId, {
        code: menu.code || menu.chucNangCode,
        name: menu.name || menu.tenChucNang,
        href: menu.href || menu.duongDan,
        icon: menu.icon || "/icon/default.png",
        sortOrder: menu.sortOrder || menu.thuTu || 0,
        parentId: menu.parentId || null,
        actions: menu.actions ? menu.actions.split(",") : [],
        children: [],
      });
    });

    // Build tree
    menus.forEach((menu) => {
      const node = menuMap.get(menu.chucNangId);
      if (menu.parentId && menuMap.has(menu.parentId)) {
        menuMap.get(menu.parentId).children.push(node);
      } else {
        roots.push(node);
      }
    });

    // Sort by sortOrder
    const sortItems = (items: any[]): any[] => {
      return items.sort((a, b) => a.sortOrder - b.sortOrder).map((item) => ({
        ...item,
        children: item.children.length > 0 ? sortItems(item.children) : [],
      }));
    };

    return sortItems(roots);
  }
}
