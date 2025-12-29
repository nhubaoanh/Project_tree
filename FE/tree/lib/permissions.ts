/**
 * Permission helper - Kiểm tra quyền truy cập
 * Dữ liệu quyền được load từ DB khi login và lưu trong storage
 */

import storage from "@/utils/storage";

// Mã thao tác
export const THAO_TAC = {
  VIEW: "VIEW",
  CREATE: "CREATE",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  EXPORT: "EXPORT",
  IMPORT: "IMPORT",
} as const;

// Mã chức năng - match với database
export const CHUC_NANG = {
  DASHBOARD: "DASHBOARD",
  THANHVIEN: "THANHVIEN",
  SUKIEN: "SUKIEN",
  TAICHINH: "TAICHINH",
  TAILIEU: "TAILIEU",
  TINTUC: "TINTUC",
  NGUOIDUNG: "NGUOIDUNG",
  DONGHO: "DONGHO",
  PHANQUYEN: "PHANQUYEN",
} as const;

// Role codes
export const ROLE_CODES = {
  SUPER_ADMIN: "sa",
  THU_DO: "thudo",
  THANH_VIEN: "thanhvien",
} as const;

// Kiểm tra có phải Super Admin không
export const isSuperAdmin = (): boolean => {
  const user = storage.getUser();
  return user?.roleCode === ROLE_CODES.SUPER_ADMIN;
};

// Kiểm tra có phải Thư đồ không
export const isThuDo = (): boolean => {
  const user = storage.getUser();
  return user?.roleCode === ROLE_CODES.THU_DO;
};

// Kiểm tra có phải Admin (Super Admin hoặc Thư đồ)
export const isAdmin = (): boolean => {
  const user = storage.getUser();
  return user?.roleCode === ROLE_CODES.SUPER_ADMIN || user?.roleCode === ROLE_CODES.THU_DO;
};

// Kiểm tra có quyền chọn dòng họ khác không
export const canSelectOtherDongHo = (): boolean => {
  return storage.canSelectAllDongHo();
};

// Kiểm tra có quyền thao tác trên chức năng không
export const hasPermission = (chucNangCode: string, thaoTacCode: string): boolean => {
  return storage.checkPermission(chucNangCode, thaoTacCode);
};

// Kiểm tra có quyền xem không
export const canView = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.VIEW);
};

// Kiểm tra có quyền thêm không
export const canCreate = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.CREATE);
};

// Kiểm tra có quyền sửa không
export const canUpdate = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.UPDATE);
};

// Kiểm tra có quyền xóa không
export const canDelete = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.DELETE);
};

// Kiểm tra có quyền thêm/sửa/xóa không (bất kỳ)
export const canModify = (chucNangCode: string): boolean => {
  return canCreate(chucNangCode) || canUpdate(chucNangCode) || canDelete(chucNangCode);
};

// Lấy dongHoId của user hiện tại
export const getUserDongHoId = (): string | undefined => {
  const user = storage.getUser();
  return user?.dongHoId;
};

// Lấy thông tin user hiện tại
export const getCurrentUser = () => {
  return storage.getUser();
};

// Lấy roleCode của user hiện tại
export const getUserRoleCode = (): string | undefined => {
  const user = storage.getUser();
  return user?.roleCode;
};
