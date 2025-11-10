// components/Header.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Menu, Bell, Settings, LogOut, User } from "lucide-react";
import { Button } from "antd";
// import { useSidebar } from "../srt/context/SidebarContext"; // ← DÙNG CONTEXT
import { useSidebar } from "../src/context/SidebarContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { toggleSidebar } = useSidebar(); // ← LẤY TỪ CONTEXT
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  // Đóng dropdown khi click ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-gradient-to-r from-[#A20105] to-[#8B0000] shadow-lg">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        {/* Nút Menu */}
        <button
          onClick={toggleSidebar} // ← DÙNG TOGGLE TỪ CONTEXT
          className="p-2 rounded-full hover:bg-white/20 transition-all duration-200"
        >
          <Menu size={24} className="text-white" />
        </button>

        {/* Tiêu đề */}
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
          Gia Phả Việt
        </h1>

        {/* Avatar + Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src="https://via.placeholder.com/40"
              alt="avatar"
              className="w-10 h-10 rounded-full ring-2 ring-white/50 shadow-md"
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-3 z-50 border border-gray-100">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="font-semibold text-gray-800">Nguyễn Văn A</p>
                <p className="text-sm text-gray-500">admin@giaphaviet.vn</p>
              </div>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                <User size={18} />
                Trang cá nhân
              </button>

              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings size={18} />
                Cài đặt
              </button>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} />
                  Đăng xuất
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
