"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { FamilyNodeData } from "./FamilyNode";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
const DEFAULT_AVATAR = "/images/vangoc.jpg";

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

export const PhotoNode = memo(({ data, selected }: NodeProps<FamilyNodeData>) => {
  const isDead = !!data.ngayMat;
  const isMale = data.gioiTinh === 1;
  
  const borderColor = isDead
    ? "border-gray-400 dark:border-gray-600"
    : isMale
      ? "border-blue-500 dark:border-blue-400"
      : "border-pink-500 dark:border-pink-400";

  return (
    <div
      className={`
        relative w-[100px] rounded-lg shadow-lg transition-all duration-200
        bg-white dark:bg-gray-800 ${borderColor} border-2
        ${selected ? "ring-4 ring-amber-400 shadow-xl scale-105" : "hover:shadow-xl"}
        ${isDead ? "opacity-85" : ""}
      `}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-amber-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-amber-500" />
      
      <div className="p-2 flex flex-col items-center gap-1">
        <Avatar className="w-16 h-16 border-2 border-white shadow">
          <AvatarImage 
            src={getImageUrl(data.anhChanDung)} 
            alt={data.hoTen}
            className="object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <AvatarFallback className={isDead ? "bg-gray-400" : isMale ? "bg-blue-500" : "bg-pink-500"}>
            <User className="w-8 h-8 text-white" />
          </AvatarFallback>
        </Avatar>
        <p className="font-semibold text-[10px] text-center truncate w-full dark:text-white">
          {data.hoTen || "Chưa rõ"}
        </p>
      </div>
      
      {data.doiThuoc && (
        <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
          {data.doiThuoc}
        </div>
      )}
    </div>
  );
});

PhotoNode.displayName = "PhotoNode";
