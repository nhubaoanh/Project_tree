"use client";
import { useState, useRef, useEffect } from "react";
import { Menu, Settings, LogOut, User } from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { useRouter } from "next/navigation";
import storage from "@/utils/storage";
import Link from "next/link";

import { getAvatarUrl } from "@/utils/imageUtils";

const DEFAULT_AVATAR = "/images/vangoc.jpg";


export default function Header() {
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<{ full_name: string; email: string; avatar?: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    storage.clearToken();
    storage.removeUser();
    router.push("/login");
  };

  const refreshUserData = () => {
    const user = storage.getUser();
    if (user) {
      setUserData({ 
        full_name: user.full_name || '', 
        email: user.email,
        avatar: user.avatar // Chỉ cần lấy avatar từ user data
      });
    }
  };

  useEffect(() => {
    // Lấy thông tin user từ localStorage
    refreshUserData();
    
    // Listen for storage changes để update khi user thay đổi avatar
    const handleStorageChange = () => {
      refreshUserData();
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Custom event cho cùng tab
    window.addEventListener('userDataUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userDataUpdated', handleStorageChange);
    };
  }, []);

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
    <header className="bg-[#A20105] shadow-lg">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between">
        <button
          onClick={toggleSidebar} // ← DÙNG TOGGLE TỪ CONTEXT
          className="p-2 rounded-full hover:bg-white/20 transition-all duration-200"
        >
          <Menu size={24} className="text-white" />
        </button>

        <h1 className="text-3xl md:text-4xl font-bold font-dancing text-white tracking-wide drop-shadow-lg">
          Gia Phả Việt
        </h1>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <img
              src={getAvatarUrl(userData?.avatar)}
              alt="avatar"
              className="w-10 h-10 rounded-full ring-2 ring-white/50 shadow-md object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
            />
          </button>
          {open && (
            <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl py-3 z-50 border border-gray-100">
              <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 rounded-t-lg transition-colors">
                <p className="font-semibold text-gray-900">{userData?.full_name || 'Người dùng'}</p>
                <p className="text-sm text-gray-600">{userData?.email || ''}</p>
              </div>

              <Link
                href="#"
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-lg"
                onClick={() => setOpen(false)}
              >
                <User size={18} className="flex-shrink-0" />
                <span>Trang cá nhân</span>
              </Link>

              <Link
                href="/settings"
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors rounded-lg"
                onClick={() => setOpen(false)}
              >
                <Settings size={18} className="flex-shrink-0" />
                <span>Cài đặt</span>
              </Link>

              <div className="border-t border-gray-100 mt-1 pt-1">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors rounded-lg"
                >
                  <LogOut size={18} className="flex-shrink-0" />
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


