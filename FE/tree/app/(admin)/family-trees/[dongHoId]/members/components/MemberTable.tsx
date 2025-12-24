"use client";

import React from "react";
import { Edit, Trash2, FileSpreadsheet, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { IMember } from "@/types/member";

interface MemberTableProps {
  data: IMember[];
  isLoading: boolean;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (member: IMember) => void;
  onDelete: (member: IMember) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({
  data, isLoading, pageIndex, pageSize, totalRecords, totalPages,
  onPageChange, onPageSizeChange, onEdit, onDelete,
}) => {
  return (
    <div className="bg-white rounded-lg border border-[#d4af37] shadow-lg overflow-hidden relative min-h-[400px] flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
          <div className="flex flex-col items-center">
            <Loader2 className="text-[#b91c1c] w-10 h-10 animate-spin mb-2" />
            <span className="text-[#8b5e3c] font-bold">Đang tải dữ liệu...</span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf6e3] border-b-2 border-[#d4af37] text-[#8b5e3c] text-sm uppercase font-bold">
              <th className="p-4 w-12 text-center">#</th>
              <th className="p-4 text-center min-w-[150px]">Họ và Tên</th>
              <th className="p-4 text-center min-w-[100px]">Giới Tính</th>
              <th className="p-4 text-center min-w-[120px]">Ngày sinh</th>
              <th className="p-4 text-center min-w-[120px]">Ngày mất</th>
              <th className="p-4 text-center min-w-[150px]">Nơi sinh</th>
              <th className="p-4 text-center min-w-[120px]">Nghề nghiệp</th>
              <th className="p-4 text-center min-w-[100px]">Đời thứ</th>
              <th className="p-4 text-center min-w-[120px]">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaddcf]">
            {data.length > 0 ? data.map((member, index) => (
              <tr key={index} className="hover:bg-[#fffdf5] transition-colors group">
                <td className="p-4 w-12 text-center text-stone-400 font-mono text-xs">{(pageIndex - 1) * pageSize + index + 1}</td>
                <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c]">{member.hoTen}</td>
                <td className="p-4 text-center text-[#5d4037]">{member.gioiTinh === 1 ? "Nam" : "Nữ"}</td>
                <td className="p-4 text-center text-[#5d4037] text-sm">{member.ngaySinh ? new Date(member.ngaySinh).toLocaleDateString("vi-VN") : "-"}</td>
                <td className="p-4 text-center text-[#5d4037] text-sm">{member.ngayMat ? new Date(member.ngayMat).toLocaleDateString("vi-VN") : "-"}</td>
                <td className="p-4 text-center text-[#5d4037] text-sm">{member.noiSinh || "-"}</td>
                <td className="p-4 text-center text-[#5d4037] text-sm">{member.ngheNghiep || "-"}</td>
                <td className="p-4 text-center text-[#5d4037] text-sm">{member.doiThuoc || "-"}</td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100">
                    <button onClick={() => onEdit(member)} className="p-2 text-blue-600 hover:bg-blue-50 rounded" title="Sửa"><Edit size={18} /></button>
                    <button onClick={() => onDelete(member)} className="p-2 text-red-600 hover:bg-red-50 rounded" title="Xóa"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            )) : !isLoading && (
              <tr>
                <td colSpan={9} className="p-12 text-center text-stone-500 italic">
                  <div className="flex flex-col items-center">
                    <FileSpreadsheet size={48} className="mb-4 opacity-20" />
                    Chưa có thành viên nào trong dòng họ này.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-[#fdf6e3] p-4 border-t border-[#d4af37] flex items-center justify-between">
        <div className="text-sm text-[#8b5e3c]">
          Hiển thị <span className="font-bold">{data.length}</span> / Tổng <span className="font-bold">{totalRecords}</span> thành viên
        </div>
        <div className="flex gap-1 items-center">
          <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))} className="mr-4 bg-white border border-[#d4af37] rounded px-2 py-1 text-sm text-[#5d4037]">
            <option value={5}>5 dòng/trang</option>
            <option value={10}>10 dòng/trang</option>
            <option value={20}>20 dòng/trang</option>
          </select>
          <button onClick={() => onPageChange(Math.max(1, pageIndex - 1))} disabled={pageIndex === 1 || isLoading} className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 hover:bg-[#fff8e1]"><ChevronLeft size={16} /></button>
          <span className="px-4 text-sm font-bold text-[#5d4037]">Trang {pageIndex} / {totalPages || 1}</span>
          <button onClick={() => onPageChange(totalPages && pageIndex < totalPages ? pageIndex + 1 : pageIndex)} disabled={pageIndex === totalPages || totalPages === 0 || isLoading} className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 hover:bg-[#fff8e1]"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};
