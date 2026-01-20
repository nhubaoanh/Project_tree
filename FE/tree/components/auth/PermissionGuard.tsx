"use client";

import { ReactNode } from "react";
import storage from "@/utils/storage";

interface PermissionGuardProps {
  /** Mã chức năng (VD: THANHVIEN, SUKIEN...) */
  chucNangCode: string;
  /** Mã thao tác (VD: VIEW, CREATE, UPDATE, DELETE) */
  thaoTacCode: string;
  /** Nội dung hiển thị nếu có quyền */
  children: ReactNode;
  /** Nội dung hiển thị nếu không có quyền (optional) */
  fallback?: ReactNode;
}

/**
 * Component kiểm tra quyền trước khi render children
 * Sử dụng để ẩn/hiện các button, form dựa trên quyền của user
 * 
 * @example
 * <PermissionGuard chucNangCode="THANHVIEN" thaoTacCode="CREATE">
 *   <Button>Thêm thành viên</Button>
 * </PermissionGuard>
 */
export default function PermissionGuard({
  chucNangCode,
  thaoTacCode,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const user = storage.getUser();
  
  // Thủ độ có tất cả quyền
  if (user?.roleCode === "thudo") {
    return <>{children}</>;
  }

  // Kiểm tra quyền từ permissions map
  const hasPermission = storage.checkPermission(chucNangCode, thaoTacCode);

  if (hasPermission) {
    return <>{children}</>;
  }

  return <>{fallback}</>;
}

/**
 * Hook kiểm tra quyền
 * @returns Object với các hàm kiểm tra quyền
 */
export function usePermission() {
  const user = storage.getUser();
  const isThuDo = user?.roleCode === "thudo";
  const isThanhVien = user?.roleCode === "thanhvien";

  const hasPermission = (chucNangCode: string, thaoTacCode: string): boolean => {
    if (isThuDo) return true;
    return storage.checkPermission(chucNangCode, thaoTacCode);
  };

  const canView = (chucNangCode: string) => hasPermission(chucNangCode, "VIEW");
  const canCreate = (chucNangCode: string) => hasPermission(chucNangCode, "CREATE");
  const canUpdate = (chucNangCode: string) => hasPermission(chucNangCode, "UPDATE");
  const canDelete = (chucNangCode: string) => hasPermission(chucNangCode, "DELETE");

  return {
    isThuDo,
    isThanhVien,
    hasPermission,
    canView,
    canCreate,
    canUpdate,
    canDelete,
    roleCode: user?.roleCode || "",
    dongHoId: user?.dongHoId || null,
  };
}
