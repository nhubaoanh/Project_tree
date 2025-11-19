// src/components/NavButton.tsx

"use client"; // Bắt buộc phải có vì sử dụng Hook (useRouter)

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ Dùng 'next/navigation' cho App Router

interface CustomNavButtonProps {
  text: string;
  href: string;
  isActive?: boolean;
}

export function CustomNavButton({
  text,
  href,
  isActive = false,
}: CustomNavButtonProps) {
  const router = useRouter(); // ✅ Khởi tạo hook useRouter

  const textColor = isActive ? "text-red-700" : "text-amber-800";
  const fontWeight = isActive ? "font-bold" : "font-semibold";

  // Hàm xử lý khi nút được nhấn
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định (nếu có)

    // ✅ Thực hiện logic (ví dụ: console.log, kiểm tra điều kiện)
    console.log(`Đang chuyển đến trang: ${href}`);

    // ✅ Sử dụng router.push() để điều hướng
    router.push(href);
  };

  return (
    <div className="relative w-[130px] h-[55px] ">
      {/* Lớp 1: Hình nền */}
      <Image
        src="/images/button.png"
        alt={`Nền nút ${text}`}
        fill
        style={{ objectFit: "contain" }}
        className="z-10"
      />

      {/* Lớp 2: Chữ (Shadcn Button) */}
      <Button
        // Dùng type="button" để tránh submit form (nếu button nằm trong form)
        type="button"
        variant="ghost"
        // ✅ Gán hàm xử lý sự kiện onClick
        onClick={handleClick}
        className={`absolute inset-0  z-20 w-full h-full p-0 flex items-center justify-center 
                    bg-transparent hover:bg-transparent ${fontWeight} 
                    ${textColor} text-base italic `}
      >
        {/* Không cần thẻ <a> bên trong nữa */}
        {text}
      </Button>
    </div>
  );
}
