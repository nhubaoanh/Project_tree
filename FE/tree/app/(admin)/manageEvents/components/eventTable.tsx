"use client";

import React from "react";
import {
  Edit,
  Trash2,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { IEvent } from "@/types/event";

interface EventTableProps {
  data: IEvent[];
  isLoading: boolean;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit?: (event: IEvent) => void;
  onDelete?: (event: IEvent) => void;
  onView?: (event: IEvent) => void;
  // Props mới cho selection
  selectedIds?: string[];
  onSelectAll?: (checked: boolean) => void;
  onSelectOne?: (id: string, checked: boolean) => void;
}

export const EventTable: React.FC<EventTableProps> = ({
  data,
  isLoading,
  pageIndex,
  pageSize,
  totalRecords,
  totalPages,
  onPageChange,
  onPageSizeChange,
  onEdit,
  onDelete,
  onView,
  selectedIds = [],
  onSelectAll,
  onSelectOne,
}) => {
  const allSelected = data.length > 0 && data.every((e) => selectedIds.includes(e.suKienId));
  const someSelected = data.some((e) => selectedIds.includes(e.suKienId));

  return (
    <div className="bg-white rounded-lg border border-[#d4af37] shadow-lg overflow-hidden relative min-h-[400px] flex flex-col">
      {isLoading && (
        <div className="absolute inset-0 bg-white/60 z-10 flex items-center justify-center backdrop-blur-[1px]">
          <div className="flex flex-col items-center">
            <Loader2 className="text-[#b91c1c] w-10 h-10 animate-spin mb-2" />
            <span className="text-[#8b5e3c] font-bold">
              Đang tải dữ liệu...
            </span>
          </div>
        </div>
      )}

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#fdf6e3] border-b-2 border-[#d4af37] text-[#8b5e3c] text-sm uppercase font-bold">
              {/* Checkbox chọn tất cả */}
              <th className="p-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected && !allSelected;
                  }}
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  className="w-4 h-4 accent-[#b91c1c] cursor-pointer"
                />
              </th>
              <th className="p-4 w-12 text-center">#</th>
              <th className="p-4 text-center min-w-[150px]">Tên Sự Kiện</th>
              <th className="p-4 text-center min-w-[120px]">Ngày Diễn Ra</th>
              <th className="p-4 text-center min-w-[120px]">Giờ Diễn ra</th>
              <th className="p-4 text-center min-w-[120px]">Địa Điểm</th>
              <th className="p-4 text-center hidden md:table-cell min-w-[180px]">
                Mô tả 
              </th>
              <th className="p-4 text-center min-w-[120px]">Lặp lại</th>
              <th className="p-4 text-center min-w-[120px]">Hành Động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaddcf]">
            {data.length > 0
              ? data.map((event, index) => (
                  <tr
                    key={event.suKienId}
                    onClick={() => onView?.(event)}
                    className={`hover:bg-[#fffdf5] transition-colors group cursor-pointer ${
                      selectedIds.includes(event.suKienId) ? "bg-[#fff8e1]" : ""
                    }`}
                  >
                    {/* Checkbox chọn từng dòng */}
                    <td className="p-4 w-12 text-center" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(event.suKienId)}
                        onChange={(e) => onSelectOne?.(event.suKienId, e.target.checked)}
                        className="w-4 h-4 accent-[#b91c1c] cursor-pointer"
                      />
                    </td>
                    <td className="p-4 w-12 text-center text-stone-400 font-mono text-xs">
                      {(pageIndex - 1) * pageSize + index + 1}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]">
                      {event.tenSuKien}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] hidden md:table-cell text-sm min-w-[180px]">
                      {event.ngayDienRa
                        ? new Date(event.ngayDienRa).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] hidden md:table-cell text-sm min-w-[180px]">
                      {event.gioDienRa?.substring(0, 5) || "Chưa cập nhật"}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] hidden md:table-cell text-sm min-w-[180px]">
                      {event.diaDiem || "-"}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[120px]">
                      {event.moTa || "-"}
                    </td>
                    <td className="p-4 text-center font-bold text-sm text-[#5d4037] min-w-[150px]">
                      {event.lapLai || "-"}
                    </td>
                    <td className="p-4 min-w-[120px] text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(event)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            title="Sửa"
                          >
                            <Edit size={18} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(event)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Xóa"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              : !isLoading && (
                  <tr>
                    <td
                      colSpan={12}
                      className="p-12 text-center text-stone-500 italic"
                    >
                      <div className="flex flex-col items-center">
                        <FileSpreadsheet
                          size={48}
                          className="mb-4 opacity-20"
                        />
                        Không tìm thấy sự kiện nào phù hợp.
                      </div>
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="bg-[#fdf6e3] p-4 border-t border-[#d4af37] flex items-center justify-between">
        <div className="text-sm text-[#8b5e3c]">
          {selectedIds.length > 0 && (
            <span className="mr-4 text-[#b91c1c] font-bold">
              Đã chọn {selectedIds.length} sự kiện
            </span>
          )}
          Hiển thị <span className="font-bold">{data.length}</span> / Tổng{" "}
          <span className="font-bold">{totalRecords}</span> sự kiện
        </div>
        <div className="flex gap-1 items-center">
          <select
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(Number(e.target.value));
            }}
            className="mr-4 bg-white border border-[#d4af37] rounded px-2 py-1 text-sm text-[#5d4037] outline-none focus:border-[#b91c1c]"
          >
            <option value={5}>5 dòng/trang</option>
            <option value={10}>10 dòng/trang</option>
            <option value={20}>20 dòng/trang</option>
          </select>

          <button
            onClick={() => onPageChange(Math.max(1, pageIndex - 1))}
            disabled={pageIndex === 1 || isLoading}
            className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#fff8e1] text-[#5d4037] transition-colors"
          >
            <ChevronLeft size={16} />
          </button>

          <span className="px-4 text-sm font-bold text-[#5d4037]">
            Trang {pageIndex} / {totalPages || 1}
          </span>

          <button
            onClick={() =>
              onPageChange(
                totalPages && pageIndex < totalPages ? pageIndex + 1 : pageIndex
              )
            }
            disabled={pageIndex === totalPages || totalPages === 0 || isLoading}
            className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#fff8e1] text-[#5d4037] transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
