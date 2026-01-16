"use client";

import { memo } from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { FamilyNodeData } from "./FamilyNode";

export const CompactNode = memo(({ data, selected }: NodeProps<FamilyNodeData>) => {
  const isDead = !!data.ngayMat;
  const isMale = data.gioiTinh === 1;
  
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

  return (
    <div
      className={`
        relative w-[120px] rounded-md shadow transition-all duration-200
        ${bgColor} ${borderColor} border-2
        ${selected ? "ring-2 ring-amber-400 shadow-xl scale-105" : "hover:shadow-lg"}
        ${isDead ? "opacity-85" : ""}
      `}
    >
      <Handle type="target" position={Position.Top} className="w-2 h-2 !bg-amber-500" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2 !bg-amber-500" />
      
      <div className="p-2 text-center">
        <p className="font-bold text-xs truncate">{data.hoTen || "Chưa rõ"}</p>
        {data.doiThuoc && (
          <span className="text-[10px] text-gray-500 dark:text-gray-400">Đời {data.doiThuoc}</span>
        )}
      </div>
    </div>
  );
});

CompactNode.displayName = "CompactNode";
