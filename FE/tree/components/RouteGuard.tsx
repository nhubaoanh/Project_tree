"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import storage from "@/utils/storage";
import { canAccessRoute } from "@/lib/routes";

interface RouteGuardProps {
  children: React.ReactNode;
}

// Danh sách các routes KHÔNG CẦN kiểm tra quyền
const PUBLIC_ROUTES = ["/login", "/register", "/forgot-password"];
const SYSTEM_ROUTES = ["/403", "/404", "/500", "/dashbrach"]; // Các trang hệ thống

/**
 * Component bảo vệ routes - Kiểm tra quyền truy cập
 * Wrap component này ở app layout
 */
export function RouteGuard({ children }: RouteGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // 1. Bỏ qua kiểm tra cho các trang public
      if (PUBLIC_ROUTES.includes(pathname)) {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      // 2. Bỏ qua kiểm tra cho các trang hệ thống (403, 404, dashboard)
      if (SYSTEM_ROUTES.includes(pathname)) {
        const token = storage.getToken();
        const user = storage.getUser();

        // Vẫn cần đăng nhập để vào các trang này
        if (!token || !user) {
          router.push("/login");
          return;
        }

        setAuthorized(true);
        setLoading(false);
        return;
      }

      // 3. Kiểm tra đăng nhập
      const token = storage.getToken();
      const user = storage.getUser();

      if (!token || !user) {
        console.warn("Not authenticated, redirecting to login");
        router.push("/login");
        return;
      }

      // 4. Kiểm tra quyền truy cập route (CHỈ với các routes KHÔNG phải system routes)
      const hasAccess = canAccessRoute(pathname);

      if (!hasAccess) {
        console.warn(`No permission to access: ${pathname}`);
        router.push("/403");
        return;
      }

      // 5. Cho phép truy cập
      setAuthorized(true);
      setLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  // Không có quyền
  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}

// ============================================
// HOC để protect từng page cụ thể
// ============================================

interface ProtectedPageProps {
  requiredUrl?: string; // URL cần có quyền
  requiredAction?: string; // Action cần có quyền
}

export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: ProtectedPageProps
) {
  return function ProtectedPage(props: P) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = () => {
        const token = storage.getToken();
        const user = storage.getUser();

        // Kiểm tra đăng nhập
        if (!token || !user) {
          router.push("/login");
          return;
        }

        // Kiểm tra quyền URL nếu được yêu cầu
        if (options?.requiredUrl) {
          const hasAccess = canAccessRoute(options.requiredUrl);
          if (!hasAccess) {
            router.push("/403");
            return;
          }
        }

        // Kiểm tra quyền action nếu được yêu cầu
        if (options?.requiredAction) {
          const hasAction = storage.hasAction(options.requiredAction);
          if (!hasAction) {
            router.push("/403");
            return;
          }
        }

        setIsAuthorized(true);
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải...</p>
          </div>
        </div>
      );
    }

    if (!isAuthorized) {
      return null;
    }

    return <Component {...props} />;
  };
}
