"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSidebar } from "../context/SidebarContext"; // ✅ dùng context để đồng bộ toggle
import Image from "next/image";

type SidebarItem = {
  name: string;
  href: string;
  icon: string;
};

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // ✅ lấy từ context
  const pathname = usePathname();
  const [sidebarItems, setSidebarItems] = useState<SidebarItem[]>([]);

    useEffect(() => {
      setSidebarItems([
        { name: "Dashboard", href: "/Overview", icon: "/icon/iconmember.png" },
        { name: "Members", href: "/members", icon: "/icon/iconmember.png" },
        { name: "Genealogy", href: "/genealogy", icon: "/icon/pen.png" },
        { name: "Events", href: "/events", icon: "/icon/calendar.png" },
        {
          name: "Notifications",
          href: "/notifications",
          icon: "/icon/bell.png",
        },
        {
          name: "Contributions",
          href: "/contributions",
          icon: "/icon/dollar.png",
        },
        { name: "Assets", href: "/assets", icon: "/icon/time.png" },
        { name: "users", href: "/users", icon: "/icon/iconmember.png" },
      ]);
    }, []);

  return (
    <div
      className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
        isSidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <div className="h-full bg-[#A20105] text-white p-4">
        {/* ✅ Gọi toggleSidebar() từ context */}
        {/* <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-[#2f2f2f] transition-colors max-w-fit cursor-pointer"
        >
          <Menu size={24} />
        </button> */}
        <Image src="/images/logo1.png" width={300} height={50} alt={"logo"} />

        <nav className="flex flex-col space-y-2">
          {sidebarItems.map((item) => {
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
            );
          })}
        </nav>

        <div className="mt-auto flex justify-between items-end px-4 pb-4 pt-8">
          {/* Bên trái: Phượng nhỏ */}
          <div className="flex justify-start">
            <Image
              src="/images/phuong.png"
              width={isSidebarOpen ? 350 : 40}
              height={isSidebarOpen ? 350 : 40}
              alt="Phượng hoàng"
              className="object-contain drop-shadow-md"
              priority
            />
          </div>

          {/* Bên phải: Mây lớn hơn */}
          <div className="flex justify-end">
            <Image
              src="/images/may.png"
              width={isSidebarOpen ? 70 : 30}
              height={isSidebarOpen ? 70 : 30}
              alt="Mây"
              className="object-contain drop-shadow-md"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
