import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/role`;

export interface IRole {
  roleId: string;
  roleCode: string;
  roleName: string;
  description: string;
  active_flag: number;
}

// Menu item từ DB - match với format từ GetMenuByRoleId stored procedure
export interface IMenuItem {
  code: string;
  name: string;
  href: string;
  icon: string;
  sortOrder: number;
  parentId?: string | null;
  actions: string[];
  children?: IMenuItem[];
}

export interface IMyMenuResponse {
  menus: IMenuItem[];
  roleCode: string;
  dongHoId: string | null;
}

export interface IChucNang {
  chucNangId: string;
  chucNangCode: string;
  tenChucNang: string;
  moTa: string;
  parentId: string | null;
  icon: string;
  duongDan: string;
  thuTu: number;
}

export interface IThaoTac {
  thaoTacId: string;
  thaoTacCode: string;
  tenThaoTac: string;
  moTa: string;
}

export interface IRolePermission {
  chucNangId: string;
  chucNangCode: string;
  tenChucNang: string;
  thaoTac: Record<string, boolean>;
}

// Lấy tất cả role
export const getAllRoles = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/getAllRole`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getAllRoles] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

// Lấy menu của user đang đăng nhập
export const getMyMenu = async (): Promise<{ success: boolean; data?: IMyMenuResponse; message?: string }> => {
  try {
    const res = await apiClient.get(`${prefix}/my-menu`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getMyMenu] ${err.message}`);
    return { success: false, message: err.message };
  }
};

// Lấy menu theo roleId (admin)
export const getMenuByRole = async (roleId: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/menu/${roleId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getMenuByRole] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

// Lấy tất cả chức năng (admin)
export const getAllChucNang = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/chucnang`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getAllChucNang] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

// Lấy tất cả thao tác (admin)
export const getAllThaoTac = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/thaotac`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getAllThaoTac] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

// Lấy quyền của role (admin)
export const getRolePermissions = async (roleId: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/permissions/${roleId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getRolePermissions] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

// Cập nhật quyền cho role (admin)
export const updateRolePermissions = async (
  roleId: string,
  permissions: { chucNangId: string; thaoTacId: string; active: boolean }[]
): Promise<any> => {
  try {
    const res = await apiClient.put(`${prefix}/permissions/${roleId}`, { permissions });
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateRolePermissions] ${err.message}`);
    throw new Error(err.message);
  }
};

// ============== CRUD ROLE ==============

// Tạo role mới
export const createRole = async (data: { roleName: string; roleCode: string; description?: string }): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/create`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[createRole] ${err.message}`);
    throw new Error(err.message);
  }
};

// Cập nhật role
export const updateRole = async (roleId: string, data: { roleName: string; description?: string }): Promise<any> => {
  try {
    const res = await apiClient.put(`${prefix}/${roleId}`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateRole] ${err.message}`);
    throw new Error(err.message);
  }
};

// Xóa role
export const deleteRole = async (roleId: string): Promise<any> => {
  try {
    const res = await apiClient.delete(`${prefix}/${roleId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[deleteRole] ${err.message}`);
    throw new Error(err.message);
  }
};
