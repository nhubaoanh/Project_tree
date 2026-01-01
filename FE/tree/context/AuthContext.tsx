"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import storage from "@/utils/storage";
import { getMyMenu } from "@/service/role.service";

// Menu item từ DB - match với format từ GetMenuByRoleId stored procedure
interface MenuItem {
  code: string;
  name: string;
  href: string;
  icon: string;
  sortOrder: number;
  parentId?: string | null;
  actions: string[];
  children?: MenuItem[];
}

interface User {
  nguoiDungId: string;
  full_name: string;
  email: string;
  avatar?: string;
  dongHoId: string | null;
  roleId: string;
  roleCode: string;
}

interface AuthContextType {
  user: User | null;
  menus: MenuItem[];
  roleCode: string;
  dongHoId: string | null;
  isAdmin: boolean;
  isThuDo: boolean;
  isThanhVien: boolean;
  canSelectAllDongHo: boolean;
  isLoading: boolean;
  // Methods
  loadUserMenu: () => Promise<void>;
  hasPermission: (chucNangCode: string, thaoTacCode: string) => boolean;
  canAccessRoute: (pathname: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [roleCode, setRoleCode] = useState<string>("");
  const [dongHoId, setDongHoId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user từ storage khi mount
  useEffect(() => {
    const storedUser = storage.getUser();
    if (storedUser) {
      setUser({
        nguoiDungId: storedUser.nguoiDungId,
        full_name: storedUser.full_name || "",
        email: storedUser.email,
        avatar: storedUser.avatar,
        dongHoId: storedUser.dongHoId || null,
        roleId: storedUser.roleId || "",
        roleCode: storedUser.roleCode || "",
      });
      setRoleCode(storedUser.roleCode || "");
      setDongHoId(storedUser.dongHoId || null);

      // Load menu từ storage nếu có
      if (storedUser.menus) {
        setMenus(storedUser.menus);
      }
    }
    setIsLoading(false);
  }, []);

  // Load menu từ API
  const loadUserMenu = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getMyMenu();
      
      if (response.success && response.data) {
        const { menus: newMenus, roleCode: newRoleCode, dongHoId: newDongHoId } = response.data;
        
        setMenus(newMenus);
        setRoleCode(newRoleCode);
        setDongHoId(newDongHoId);

        // Cập nhật storage
        const storedUser = storage.getUser();
        if (storedUser) {
          storage.setUser({
            ...storedUser,
            menus: newMenus,
            roleCode: newRoleCode,
            dongHoId: newDongHoId || undefined,
            canSelectAllDongHo: newRoleCode === "sa",
            permissions: buildPermissionsMap(newMenus),
          });
        }
      }
    } catch (error) {
      console.error("Load menu error:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Build permissions map từ menus
  const buildPermissionsMap = (menus: MenuItem[]): Record<string, string[]> => {
    const map: Record<string, string[]> = {};
    const processMenu = (menu: MenuItem) => {
      map[menu.code] = menu.actions || [];
      if (menu.children) {
        menu.children.forEach(processMenu);
      }
    };
    menus.forEach(processMenu);
    return map;
  };

  // Kiểm tra quyền
  const hasPermission = useCallback((chucNangCode: string, thaoTacCode: string): boolean => {
    // Admin có tất cả quyền
    if (roleCode === "sa") return true;

    // Tìm trong menus
    const findInMenus = (items: MenuItem[]): boolean => {
      for (const item of items) {
        if (item.code === chucNangCode) {
          return item.actions?.includes(thaoTacCode) || false;
        }
        if (item.children && findInMenus(item.children)) {
          return true;
        }
      }
      return false;
    };

    return findInMenus(menus);
  }, [menus, roleCode]);

  // Kiểm tra có thể truy cập route
  const canAccessRoute = useCallback((pathname: string): boolean => {
    // Admin truy cập tất cả
    if (roleCode === "sa") return true;

    // Tìm menu có đường dẫn match
    const findRoute = (items: MenuItem[]): boolean => {
      for (const item of items) {
        if (item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))) {
          return true;
        }
        if (item.children && findRoute(item.children)) {
          return true;
        }
      }
      return false;
    };

    return findRoute(menus);
  }, [menus, roleCode]);

  // Logout
  const logout = useCallback(() => {
    storage.clearAll();
    setUser(null);
    setMenus([]);
    setRoleCode("");
    setDongHoId(null);
  }, []);

  const value: AuthContextType = {
    user,
    menus,
    roleCode,
    dongHoId,
    isAdmin: roleCode === "sa",
    isThuDo: roleCode === "thudo",
    isThanhVien: roleCode === "thanhvien",
    canSelectAllDongHo: roleCode === "sa",
    isLoading,
    loadUserMenu,
    hasPermission,
    canAccessRoute,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
