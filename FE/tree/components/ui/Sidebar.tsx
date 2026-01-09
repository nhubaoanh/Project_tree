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

// Menu mặc định khi chưa đăng nhập
const GUEST_MENU: MenuItem[] = [
  { code: "HOME", name: "Trang chủ", href: "/", icon: "/icon/iconmember.png", sortOrder: 1, actions: ["VIEW"] },
];

export default function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<MenuItem[]>([]);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  // Build tree từ flat list (dựa vào parentId)
  const buildMenuTree = (items: MenuItem[]): MenuItem[] => {
    const map = new Map<string, MenuItem>();
    const roots: MenuItem[] = [];
    // Tạo map với code làm key
    items.forEach(item => {
      map.set(item.code, { ...item, children: [] });
    });

    // Build tree dựa vào parentId
    items.forEach(item => {
      const node = map.get(item.code)!;
      if (item.parentId && map.has(item.parentId)) {
        // Có parent -> thêm vào children của parent
        const parent = map.get(item.parentId)!;
        parent.children = parent.children || [];
        parent.children.push(node);
      } else if (!item.parentId) {
        // Không có parent -> là root
        roots.push(node);
      }
    });

    // Sort by sortOrder
    const sortItems = (items: MenuItem[]): MenuItem[] => {
      return items.sort((a, b) => a.sortOrder - b.sortOrder).map(item => ({
        ...item,
        children: item.children && item.children.length > 0 ? sortItems(item.children) : undefined
      }));
    };

    const result = sortItems(roots);
    return result;
  };

  useEffect(() => {
    // Lấy user info từ storage
    const user = storage.getUser();
    if (user) {
      // Lấy menu từ storage - đã được build tree sẵn từ backend
      const menus = user.menus || [];
      if (menus.length > 0) {
        // Kiểm tra xem menu đã có children chưa (đã build tree từ backend)
        const hasChildren = menus.some((m: MenuItem) => m.children && m.children.length > 0);
        
        if (hasChildren) {
          // Menu đã build tree từ backend, dùng trực tiếp
          setSidebarItems(menus);
        } else {
          // Menu chưa build tree, build ở FE (fallback)
          const menuTree = buildMenuTree(menus);
          setSidebarItems(menuTree);
        }
      } else {
        // Không có menu từ DB - hiển thị thông báo hoặc menu rỗng
        setSidebarItems([]);
      }
    } else {
      // Chưa đăng nhập - dùng menu guest
      setSidebarItems(GUEST_MENU);
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
