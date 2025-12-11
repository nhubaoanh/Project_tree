"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import storage from "@/utils/storage"; // 👉 nhớ import

type SidebarItem = {
  name: string;
  href: string;
  icon: string;
};

export default function Sidebar() {
  const { isSidebarOpen } = useSidebar();
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

  useEffect(() => {
    const user = storage.getUser();
    const roleCode = user?.roleCode;

    console.log("Role ID:", roleCode);
    console.log("User:", user);

    // ================================
    // 🔥 MENU THEO ROLE
    // ================================
    const menuAdmin: SidebarItem[] = [
      { name: "Dashboard", href: "/dashboard", icon: "/icon/iconmember.png" },
      { name: "Members", href: "/members", icon: "/icon/iconmember.png" },
      { name: "Genealogy", href: "/genealogy", icon: "/icon/pen.png" },
      { name: "Events", href: "/manageEvents", icon: "/icon/calendar.png" },
      { name: "Notifications", href: "/notifications", icon: "/icon/bell.png" },
      {
        name: "Contributions",
        href: "/contributions",
        icon: "/icon/dollar.png",
      },
      { name: "Assets", href: "/assets", icon: "/icon/time.png" },
      { name: "users", href: "/users", icon: "/icon/iconmember.png" },
    ];

    const menuManager: SidebarItem[] = [
      { name: "Dashboard", href: "/dashboard", icon: "/icon/iconmember.png" },
      { name: "Members", href: "/members", icon: "/icon/iconmember.png" },
      { name: "Events", href: "/manageEvents", icon: "/icon/calendar.png" },
      {
        name: "Contributions",
        href: "/contributions",
        icon: "/icon/dollar.png",
      },
    ];

    const menuUser: SidebarItem[] = [
      { name: "Dashboard", href: "/dashboard", icon: "/icon/iconmember.png" },
      { name: "Events", href: "/manageEvents", icon: "/icon/calendar.png" },
    ];

    // ================================
    // 🔥 CHỌN MENU TƯƠNG ỨNG
    // ================================
    if (roleCode === "sa") setSidebarItems(menuAdmin);
    else if (roleCode === "thanhvien") setSidebarItems(menuManager);
    else setSidebarItems(menuUser);
  }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#A20105] text-white p-4 flex flex-col justify-between overflow-hidden">
        {/* Logo */}
        <div>
          <Image src="/images/logo1.png" width={300} height={50} alt="logo" />

          <nav className="flex flex-col space-y-2 mt-4">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-1.5 rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <Image
                  src={item.icon}
                  width={25}
                  height={25}
                  alt={item.name}
                  className="object-contain"
                />
                {isSidebarOpen && (
                  <span className="ml-4 whitespace-nowrap">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>
        </div>

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
