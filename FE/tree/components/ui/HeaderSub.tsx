"use client";

import Image from "next/image";
import { CustomNavButton } from "./NavButton";

interface HeaderSubProps {
  isScrolled: boolean;
}

export function HeaderSub() {
    const navButtons = [
      { key: "phaky", label: "phả ký" },
      { key: "diagram", label: "phả đồ" },
      { key: "history", label: "sự kiện" },
      { key: "news", label: "Tin tức" },
    ];

  return (
    // bg-[#A20105]
    <header className="sticky top-0 z-50 w-full h-[210px]">
      <div className="relative grid grid-cols-3 gap-2 items-center p-2">
        <div className="flex justify-start">
          <Image
            src="/images/backgroudleft.png"
            alt="Mai"
            width={280}
            height={280}
            quality={80}
          />
        </div>
        <div className="flex justify-center mb-10">
          <Image
            src="/images/logo1.png"
            alt="Logo"
            width={350}
            height={350}
            quality={80}
            priority
          />
          <nav className="absolute w-full top-38 z-20 flex justify-center items-center space-x-4 pb-4">
            {navButtons.map((button) => (
              <CustomNavButton
                key={button.key}
                text={button.label}
                href={`/${button.key}`}
              />
            ))}
          </nav>
        </div>
        <div className="flex justify-end">
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
}
