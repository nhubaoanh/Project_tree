"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import storage from "@/utils/storage";

// Các route public (không cần đăng nhập)
const PUBLIC_ROUTES = ["/login", "/register", "/forgotPass", "/reset-password"];

interface RouteGuardProps {
  children: React.ReactNode;
}

/**
 * Component bảo vệ route
 * Kiểm tra đăng nhập và phân quyền trước khi render children
 */
export default function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // 1. Route public - cho phép truy cập
      if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // 2. Kiểm tra đăng nhập
      const token = storage.getToken();
      const user = storage.getUser();

      if (!token || !user) {
        // Chưa đăng nhập - redirect về login
        setAuthorized(false);
        setChecking(false);
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // 3. Kiểm tra quyền truy cập route (dựa trên menus từ DB)
      const menus = storage.getMenus();
      
      console.log("[RouteGuard] Checking access for:", pathname);
      console.log("[RouteGuard] User menus:", menus);
      console.log("[RouteGuard] Menu hrefs:", menus.map(m => m.href));
      
      // Nếu chưa có menus (chưa load xong) => cho phép tạm
      if (menus.length === 0) {
        console.log("[RouteGuard] No menus loaded, allowing access");
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // Dashboard luôn được phép nếu đã đăng nhập
      if (pathname === "/dashboard") {
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // Tìm menu item có href match với pathname
      const hasAccess = menus.some(
        (item) => item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))
      );

      console.log("[RouteGuard] hasAccess:", hasAccess);

      if (!hasAccess) {
        // Không có quyền - redirect về trang 403 trong admin
        setAuthorized(false);
        setChecking(false);
        console.warn(`[RouteGuard] Access denied: ${pathname} for role ${user.roleCode}`);
        router.replace("/dashboard"); // Redirect về dashboard thay vì 403
        return;
      }

      // 4. Có quyền - cho phép truy cập
      setAuthorized(true);
      setChecking(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Đang kiểm tra - hiển thị loading
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Không có quyền - không render gì (đang redirect)
  if (!authorized) {
    return null;
  }

  // Có quyền - render children
  return <>{children}</>;
}
