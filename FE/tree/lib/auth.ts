
export type RoleCode = "sa" | "admin" | "thanhvien" | "user";

export interface MenuItem {
  name: string;
  href: string;
  icon: string;
  roles: RoleCode[]; // Roles được phép truy cập
}

// ==================== MENU CONFIG ====================

export const ALL_MENU_ITEMS: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: "/icon/iconmember.png",
    roles: ["sa", "admin", "thanhvien", "user"],
  },
  {
    name: "Gia Phả",
    href: "/family-trees",
    icon: "/icon/tree.png",
    roles: ["sa", "admin", "thanhvien"],
  },
  {
    name: "Members",
    href: "/members",
    icon: "/icon/iconmember.png",
    roles: ["sa", "admin", "thanhvien"],
  },
  {
    name: "Users",
    href: "/users",
    icon: "/icon/iconmember.png",
    roles: ["sa"], // Chỉ super admin
  },
  {
    name: "Genealogy",
    href: "/genealogy",
    icon: "/icon/pen.png",
    roles: ["sa", "admin"],
  },
  {
    name: "Events",
    href: "/manageEvents",
    icon: "/icon/calendar.png",
    roles: ["sa", "admin", "thanhvien", "user"],
  },
  {
    name: "ContributionsUp",
    href: "/contributions",
    icon: "/icon/dollar.png",
    roles: ["sa", "admin"],
  },
  {
    name: "Expense",
    href: "/contributionsDown",
    icon: "/icon/dollar.png",
    roles: ["sa", "admin"],
  },
];

// ==================== HELPER FUNCTIONS ====================

/**
 * Lấy menu items theo role
 */
export function getMenuByRole(roleCode: RoleCode | string | undefined): MenuItem[] {
  if (!roleCode) return [];
  return ALL_MENU_ITEMS.filter(item => item.roles.includes(roleCode as RoleCode));
}

/**
 * Kiểm tra user có quyền truy cập route không
 */
export function canAccessRoute(pathname: string, roleCode: RoleCode | string | undefined): boolean {
  if (!roleCode) return false;
  
  // Tìm menu item tương ứng với pathname
  const menuItem = ALL_MENU_ITEMS.find(item => 
    pathname === item.href || pathname.startsWith(item.href + "/")
  );
  
  // Nếu không tìm thấy trong menu, cho phép (có thể là trang public)
  if (!menuItem) return true;
  
  // Kiểm tra role có trong danh sách được phép không
  return menuItem.roles.includes(roleCode as RoleCode);
}

/**
 * Các route public (không cần đăng nhập)
 */
export const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgotPass",
  "/reset-password",
];

/**
 * Kiểm tra route có phải public không
 */
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}
