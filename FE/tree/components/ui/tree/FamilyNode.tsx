"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const DEFAULT_AVATAR = "/images/vangoc.jpg";

export interface FamilyNodeData {
  memberId?: number;
  hoTen: string;
  gioiTinh: number;
  ngayMat?: string | null;
  ngheNghiep?: string;
  anhChanDung?: string | null;
  doiThuoc?: number;
}

const getImageUrl = (img: string | null | undefined): string => {
  if (!img?.trim()) return DEFAULT_AVATAR;
  
  try {
    let decodedImg = decodeURIComponent(img);
    if (decodedImg.startsWith("http")) {
      if (decodedImg.includes(":6001")) {
        decodedImg = decodedImg.replace(":6001", ":8080");
      }
      return decodedImg;
    }
    const path = decodedImg.startsWith("uploads/") ? decodedImg : `uploads/${decodedImg}`;
    return `${API_BASE_URL}/${path}`;
  } catch (error) {
    let fallbackImg = img;
    if (fallbackImg.startsWith("http")) {
      if (fallbackImg.includes(":6001")) {
        fallbackImg = fallbackImg.replace(":6001", ":8080");
      }
      return fallbackImg;
    }
    const path = fallbackImg.startsWith("uploads/") ? fallbackImg : `uploads/${fallbackImg}`;
    return `${API_BASE_URL}/${path}`;
  }
};

export const FamilyNode = memo(({ data, selected }: NodeProps<FamilyNodeData>) => {
  const isDead = !!data.ngayMat;
  const isMale = data.gioiTinh === 1;
  
  // Màu sắc theo giới tính và trạng thái
  const bgColor = isDead 
    ? "bg-gray-100 dark:bg-gray-800" 
    : isMale 
      ? "bg-blue-50 dark:bg-blue-900/30" 
      : "bg-pink-50 dark:bg-pink-900/30";
  
  const borderColor = isDead
    ? "border-gray-400 dark:border-gray-600"
    : isMale
      ? "border-blue-500 dark:border-blue-400"
      : "border-pink-500 dark:border-pink-400";
  
  const headerBg = isDead
    ? "bg-gray-400 dark:bg-gray-600"
    : isMale
      ? "bg-blue-500 dark:bg-blue-600"
      : "bg-pink-500 dark:bg-pink-600";

  return (
    <div
      className={`
        relative w-[180px] rounded-lg shadow-lg transition-all duration-200
        ${bgColor} ${borderColor} border-2
        ${selected ? "ring-4 ring-amber-400 shadow-xl scale-105" : "hover:shadow-xl"}
        ${isDead ? "opacity-85" : ""}
      `}
    >
      {/* Handles cho kết nối */}
      <Handle type="target" position={Position.Top} className="w-3 h-3 !bg-amber-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 !bg-amber-500" />
      
      {/* Header */}
      <div className={`${headerBg} text-white text-center py-2 rounded-t-md`}>
        <p className="font-bold text-sm truncate px-2">{data.hoTen || "Chưa rõ"}</p>
      </div>
      
      {/* Avatar */}
      <div className="flex justify-center py-3">
        <Avatar className="w-14 h-14 border-2 border-white shadow-md">
          <AvatarImage 
            src={getImageUrl(data.anhChanDung)} 
            alt={data.hoTen}
            className="object-cover"
            onError={(e) => {
              // Ẩn ảnh lỗi và hiển thị fallback
              e.currentTarget.style.display = 'none';
            }}
          />
          <AvatarFallback className={headerBg}>
            <User className="w-6 h-6" />
          </AvatarFallback>
        </Avatar>
      </div>
      
      {/* Info */}
      <div className="px-2 pb-2 text-center space-y-1">
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {isDead ? `Mất: ${new Date(data.ngayMat!).toLocaleDateString("vi-VN")}` : "Còn sống"}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {data.ngheNghiep || "Chưa rõ"}
        </p>
      </div>
      
      {/* Generation badge */}
      {data.doiThuoc && (
        <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow">
          {data.doiThuoc}
        </div>
      )}
    </div>
  );
});

FamilyNode.displayName = "FamilyNode";
