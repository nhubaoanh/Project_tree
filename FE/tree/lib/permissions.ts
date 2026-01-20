/**
 * Permission helper - Kiểm tra quyền truy cập
 * Dữ liệu quyền được load từ DB khi login và lưu trong storage
 * Backend trả về permissions cho từng chức năng, frontend chỉ check
 */

import storage from "@/utils/storage";

// Mã thao tác - match với database
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
  THU_DO: "thudo",
  THANH_VIEN: "thanhvien",
} as const;

// ============ ROLE CHECKS ============

/**
 * Kiểm tra có phải Thủ độ không
 * Thủ độ có tất cả quyền trong hệ thống
 */
export const isThuDo = (): boolean => {
  const user = storage.getUser();
  return user?.roleCode === ROLE_CODES.THU_DO;
};

/**
 * Kiểm tra có phải Thành viên không
 */
export const isThanhVien = (): boolean => {
  const user = storage.getUser();
  return user?.roleCode === ROLE_CODES.THANH_VIEN;
};

/**
 * Kiểm tra có quyền chọn dòng họ khác không
 * Chỉ Thủ độ mới có quyền này
 */
export const canSelectOtherDongHo = (): boolean => {
  return storage.canSelectAllDongHo();
};

// ============ PERMISSION CHECKS ============

/**
 * Kiểm tra có quyền thao tác trên chức năng không
 * Thủ độ luôn có tất cả quyền
 * Thành viên check permissions từ backend
 */
export const hasPermission = (chucNangCode: string, thaoTacCode: string): boolean => {
  // Thủ độ có tất cả quyền
  if (isThuDo()) return true;
  
  // Thành viên check permissions từ storage (backend đã trả về)
  return storage.checkPermission(chucNangCode, thaoTacCode);
};

/**
 * Kiểm tra có quyền xem không
 */
export const canView = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.VIEW);
};

/**
 * Kiểm tra có quyền thêm không
 */
export const canCreate = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.CREATE);
};

/**
 * Kiểm tra có quyền sửa không
 */
export const canUpdate = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.UPDATE);
};

/**
 * Kiểm tra có quyền xóa không
 */
export const canDelete = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.DELETE);
};

/**
 * Kiểm tra có quyền export không
 */
export const canExport = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.EXPORT);
};

/**
 * Kiểm tra có quyền import không
 */
export const canImport = (chucNangCode: string): boolean => {
  return hasPermission(chucNangCode, THAO_TAC.IMPORT);
};

/**
 * Kiểm tra có quyền thêm/sửa/xóa không (bất kỳ)
 */
export const canModify = (chucNangCode: string): boolean => {
  return canCreate(chucNangCode) || canUpdate(chucNangCode) || canDelete(chucNangCode);
};

// ============ USER INFO GETTERS ============

/**
 * Lấy thông tin user hiện tại từ localStorage
 */
export const getCurrentUser = () => {
  return storage.getUser();
};

/**
 * Lấy dongHoId của user hiện tại
 */
export const getUserDongHoId = (): string | undefined => {
  const user = storage.getUser();
  return user?.dongHoId;
};

/**
 * Lấy roleCode của user hiện tại
 */
export const getUserRoleCode = (): string | undefined => {
  const user = storage.getUser();
  return user?.roleCode;
};

/**
 * Lấy danh sách menus của user từ localStorage
 */
export const getUserMenus = () => {
  return storage.getMenus();
};

/**
 * Lấy permissions map của user từ localStorage
 */
export const getUserPermissions = () => {
  return storage.getPermissions();
};

/**
 * Kiểm tra có quyền truy cập route không
 */
export const canAccessRoute = (pathname: string): boolean => {
  // Thủ độ truy cập tất cả
  if (isThuDo()) return true;
  
  // Thành viên check menu từ storage
  return storage.canAccessRoute(pathname);
};
