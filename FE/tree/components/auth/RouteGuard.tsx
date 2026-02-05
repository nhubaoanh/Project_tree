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
  const [hydrated, setHydrated] = useState(false);

  // TEMPORARY: Bypass RouteGuard for testing
  if (process.env.NODE_ENV === "production") {
    return <>{children}</>;
  }

  // Đảm bảo component đã hydrated trên client
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return; // Chờ hydration hoàn tất

    const checkAuth = () => {
      console.log("[RouteGuard] Checking auth for:", pathname);
      
      // 1. Route public - cho phép truy cập
      if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
        console.log("[RouteGuard] Public route, allowing access");
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // 2. Kiểm tra đăng nhập
      const token = storage.getToken();
      const user = storage.getUser();
      
      console.log("[RouteGuard] Token:", !!token, "User:", !!user);

      if (!token || !user) {
        // Chưa đăng nhập - redirect về login
        console.log("[RouteGuard] No auth, redirecting to login");
        setAuthorized(false);
        setChecking(false);
        router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      // 3. Dashboard luôn được phép nếu đã đăng nhập
      if (pathname === "/dashboard" || pathname === "/" || pathname.startsWith("/dashboard")) {
        console.log("[RouteGuard] Dashboard route, allowing access");
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // 4. Kiểm tra quyền truy cập route (dựa trên menus từ DB)
      const menus = storage.getMenus();
      console.log("[RouteGuard] Menus count:", menus.length);
      
      // Nếu chưa có menus (chưa load xong) => cho phép tạm
      if (menus.length === 0) {
        console.log("[RouteGuard] No menus loaded, allowing temporary access");
        setAuthorized(true);
        setChecking(false);
        return;
      }

      // Tìm menu item có href match với pathname
      const hasAccess = menus.some(
        (item) => item.href && (pathname === item.href || pathname.startsWith(item.href + "/"))
      );

      console.log("[RouteGuard] hasAccess:", hasAccess, "for path:", pathname);

      if (!hasAccess) {
        // Không có quyền - redirect về dashboard
        console.log("[RouteGuard] No access, redirecting to dashboard");
        setAuthorized(false);
        setChecking(false);
        router.replace("/dashboard");
        return;
      }

      // 5. Có quyền - cho phép truy cập
      console.log("[RouteGuard] Access granted");
      setAuthorized(true);
      setChecking(false);
    };

    // Delay một chút để đảm bảo localStorage đã sẵn sàng
    const timer = setTimeout(checkAuth, 200);
    return () => clearTimeout(timer);
  }, [pathname, router, hydrated]);

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
