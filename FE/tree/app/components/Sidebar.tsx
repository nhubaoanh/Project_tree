"use client";

import React, { useEffect, useState } from "react";
import {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const ICONS = {
  Bell,
  DollarSign,
  House,
  Info,
  Mail,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
};

type SidebarItem = {
  name: string;
  href: string;
  icon: keyof typeof ICONS;
};

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    // Bạn có thể fetch từ API thật ở đây
    // Tạm thời mình mock data
    setSidebarItems([
      { name: "Dashboard", href: "/Overview", icon: "House" },
      { name: "Users", href: "/Users", icon: "Users" },
      { name: "Orders", href: "/Orders", icon: "ShoppingCart" },
      { name: "Products", href: "/Products", icon: "ShoppingBag" },
      { name: "Revenue", href: "/revenue", icon: "DollarSign" },
      { name: "Notifications", href: "/notifications", icon: "Bell" },
      { name: "Messages", href: "/messages", icon: "Mail" },
      { name: "Settings", href: "/settings", icon: "Settings" },
      { name: "About", href: "/about", icon: "Info" },
    ]);
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#A20105] text-white p-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={24} />
        </button>
        <nav className="flex flex-col space-y-2">
          {sidebarItems.map((item) => {
            const IconComponent = ICONS[item.icon];
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                {IconComponent && <IconComponent size={18} />}
                {isSidebarOpen && (
                  <span className="ml-4 whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
