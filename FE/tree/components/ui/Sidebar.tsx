"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import storage from "@/utils/storage";
import { ChevronDown, ChevronRight } from "lucide-react";

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

// Menu mặc định cho ADMIN
const ADMIN_MENU: MenuItem[] = [
  { 
    code: "QUANLY_HETHONG", name: "Quản trị hệ thống", href: "#", icon: "/icon/iconmember.png", sortOrder: 1, actions: ["VIEW"],
    children: [
      { code: "USERS", name: "Quản lý người dùng", href: "/users", icon: "/icon/iconmember.png", sortOrder: 1, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
      { code: "ROLES", name: "Quản lý nhóm quyền", href: "/roles", icon: "/icon/iconmember.png", sortOrder: 2, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
      { code: "CHUCNANG", name: "Quản lý tính năng", href: "/features", icon: "/icon/iconmember.png", sortOrder: 3, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
      { code: "AI_CHAT", name: "Hỏi đáp AI", href: "/genAI", icon: "/icon/iconmember.png", sortOrder: 4, actions: ["VIEW"] },
    ]
  },
];

// Menu mặc định cho THỦ ĐỒ / THÀNH VIÊN
const DEFAULT_MENU: MenuItem[] = [
  { code: "DASHBOARD", name: "Trang chủ", href: "/dashboard", icon: "/icon/iconmember.png", sortOrder: 1, actions: ["VIEW"] },
  { code: "THANHVIEN", name: "Quản lý thành viên", href: "/family-trees", icon: "/icon/iconmember.png", sortOrder: 2, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
  { code: "SUKIEN", name: "Quản lý sự kiện", href: "/manageEvents", icon: "/icon/iconmember.png", sortOrder: 3, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
  { 
    code: "TAICHINH", name: "Quản lý tài chính", href: "#", icon: "/icon/dollar.png", sortOrder: 4, actions: ["VIEW"],
    children: [
      { code: "TAICHINH_THU", name: "Thu", href: "/contributions", icon: "/icon/dollar.png", sortOrder: 1, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
      { code: "TAICHINH_CHI", name: "Chi", href: "/contributionsDown", icon: "/icon/dollar.png", sortOrder: 2, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
    ]
  },
  { code: "TAILIEU", name: "Quản lý tài liệu", href: "/documents", icon: "/icon/iconmember.png", sortOrder: 5, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
  { code: "TINTUC", name: "Quản lý tin tức", href: "/manage-news", icon: "/icon/iconmember.png", sortOrder: 6, actions: ["VIEW", "CREATE", "UPDATE", "DELETE"] },
  { code: "AI_CHAT", name: "Hỏi đáp AI", href: "/genAI", icon: "/icon/iconmember.png", sortOrder: 7, actions: ["VIEW"] },
];

export default function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Build tree từ flat list
  const buildMenuTree = (items: MenuItem[]): MenuItem[] => {
    const map = new Map<string, MenuItem>();
    const roots: MenuItem[] = [];

    // Tạo map
    items.forEach(item => {
      map.set(item.code, { ...item, children: [] });
    });

    // Build tree
    items.forEach(item => {
      const node = map.get(item.code)!;
      if (item.parentId && map.has(item.parentId)) {
        const parent = map.get(item.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    });

    // Sort by sortOrder
    const sortItems = (items: MenuItem[]): MenuItem[] => {
      return items.sort((a, b) => a.sortOrder - b.sortOrder).map(item => ({
        ...item,
        children: item.children ? sortItems(item.children) : []
      }));
    };

    return sortItems(roots);
  };

  useEffect(() => {
    // Lấy user info từ storage
    const user = storage.getUser();
    if (user) {
      // Lấy menu từ storage và build tree
      const menus = user.menus || [];
      if (menus.length > 0) {
        const menuTree = buildMenuTree(menus);
        setSidebarItems(menuTree);
      } else {
        // Fallback menu mặc định theo role
        if (user.roleCode === "sa") {
          setSidebarItems(ADMIN_MENU);
        } else {
          setSidebarItems(DEFAULT_MENU);
        }
      }
    } else {
      // Chưa đăng nhập - dùng menu mặc định
      setSidebarItems(DEFAULT_MENU);
    }
  }, []);

  const toggleMenu = (code: string) => {
    setExpandedMenus((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.code);
    const active = isActive(item.href);

    if (hasChildren) {
      return (
        <div key={item.code}>
          <button
            onClick={() => toggleMenu(item.code)}
            className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-md transition-colors ${
              active ? "bg-white/20 text-white" : "text-gray-200 hover:bg-white/10"
            }`}
            style={{ paddingLeft: `${16 + level * 12}px` }}
          >
            <div className="flex items-center gap-3">
              <Image
                src={item.icon || "/icon/iconmember.png"}
                width={22}
                height={22}
                alt={item.name}
                className="object-contain"
              />
              {isSidebarOpen && (
                <span className="whitespace-nowrap text-sm">{item.name}</span>
              )}
            </div>
            {isSidebarOpen && (
              isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
            )}
          </button>
          
          {isExpanded && isSidebarOpen && (
            <div className="ml-2 border-l border-white/20">
              {item.children!.map((child) => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={item.code}
        href={item.href || "#"}
        className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
          active ? "bg-white/20 text-white font-medium" : "text-gray-200 hover:bg-white/10"
        }`}
        style={{ paddingLeft: `${16 + level * 12}px` }}
      >
        <Image
          src={item.icon || "/icon/iconmember.png"}
          width={22}
          height={22}
          alt={item.name}
          className="object-contain"
        />
        {isSidebarOpen && (
          <span className="whitespace-nowrap text-sm">{item.name}</span>
        )}
      </Link>
    );
  };

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#A20105] text-white p-4 flex flex-col justify-between overflow-hidden">
        <div>
          {/* Logo */}
          <div className="mb-4">
            <Image src="/images/logo1.png" width={300} height={50} alt="logo" />
          </div>

          {/* Menu */}
          <nav className="flex flex-col space-y-1">
            {sidebarItems.map((item) => renderMenuItem(item))}
          </nav>
        </div>

        {/* Footer decoration */}
        <div className="relative mt-4 w-full h-32 overflow-visible">
          <Image
            src="/images/phuong.png"
            width={isSidebarOpen ? 180 : 100}
            height={isSidebarOpen ? 180 : 100}
            alt="Phượng hoàng"
            className="absolute bottom-0 left-0 object-contain drop-shadow-md transition-all duration-300"
            priority
          />
          <Image
            src="/images/may.png"
            width={isSidebarOpen ? 70 : 40}
            height={isSidebarOpen ? 70 : 40}
            alt="Mây"
            className="absolute bottom-2 right-0 left-35 object-contain drop-shadow-md transition-all duration-300"
            priority
          />
        </div>
      </div>
    </div>
  );
}
