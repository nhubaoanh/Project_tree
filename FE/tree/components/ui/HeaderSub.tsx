import React from "react";
import { NavButton } from "./NavButton"; 
import { ViewMode } from "@/types/familytree";
import Image from "next/image";


interface HeaderProps {
  activeView: string;
  onNavigate: (view: ViewMode) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeView, onNavigate }) => {
  const navItems = [
    { key: ViewMode.PHA_KY, label: "Phả Ký" },
    { key: ViewMode.DIAGRAM, label: "Phả Đồ" },
    { key: ViewMode.HISTORY, label: "Sự Kiện" },
    { key: ViewMode.NEWS, label: "Tin Tức" },
  ];

  return (
    <header className="w-full h-[180px] sm:h-[220px] bg-gradient-to-b bg-[#ede5b7] shadow-2xl relative overflow-hidden border-b-4 border-yellow-600/50">
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 h-full grid grid-cols-3 gap-2 items-center px-4 md:px-8 max-w-7xl mx-auto">
        {/* Cột 1: Họa tiết trái (Tương đương HeaderSub div justify-start) */}
        <div className="flex justify-start items-center opacity-80 hover:opacity-100 transition-opacity h-full">
          <Image
            src="/images/backgroudleft.png"
            alt="Dao"
            width={280}
            height={280}
            quality={80}
          />
        </div>

        {/* Cột 2: Logo và Navigation (Tương đương HeaderSub div justify-center) */}
        <div className="flex flex-col items-center justify-center h-full pt-2">
          {/* Logo Area (Lấy từ Header ban đầu) */}
          <div className="mb-6 transform hover:scale-105 transition-transform duration-500 cursor-pointer">
            <Image
              src="/images/logo1.png"
              alt="Dao"
              width={280}
              height={280}
              quality={80}
            />
          </div>
          <nav className="flex flex-wrap justify-center items-center gap-3 md:gap-4 w-full absolute bottom-4">
            {navItems.map((item) => (
              <NavButton
                key={item.key}
                text={item.label}
                isActive={activeView === item.key}
                onClick={() => onNavigate(item.key)}
              />
            ))}
          </nav>
        </div>

        {/* Cột 3: Họa tiết phải (Tương đương HeaderSub div justify-end) */}
        <div className="flex justify-end items-center opacity-80 hover:opacity-100 transition-opacity h-full">
          <Image
            src="/images/backgroudrignt.png"
            alt="Dao"
            width={280}
            height={280}
            quality={80}
          />
        </div>
      </div>
    </header>
  );
};