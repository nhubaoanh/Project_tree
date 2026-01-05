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
import { IContributionDown } from "@/types/contribuitionDown";

interface ContributionTableProps {
  data: IContributionDown[];
  isLoading: boolean;
  pageIndex: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onEdit: (contribution: IContributionDown) => void;
  onDelete: (contribution: IContributionDown) => void;
  selectedIds?: number[];
  onSelectAll?: (checked: boolean) => void;
  onSelectOne?: (id: number, checked: boolean) => void;
}

export const ContributionTable: React.FC<ContributionTableProps> = ({
  data = [],
  isLoading = false,
  pageIndex = 1,
  pageSize = 10,
  totalRecords = 0,
  totalPages = 1,
  onPageChange = () => {},
  onPageSizeChange = () => {},
  onEdit = () => {},
  onDelete = () => {},
  selectedIds = [],
  onSelectAll,
  onSelectOne,
}) => {
  const allSelected = data.length > 0 && data.every((e) => selectedIds.includes(e.chiId));
  const someSelected = data.some((e) => selectedIds.includes(e.chiId));

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
              <th className="p-4 text-center min-w-[240px]">Người nhận</th>
              <th className="p-4 text-center min-w-[150px]">Số tiền</th>
              <th className="p-4 text-center min-w-[150px]">Ngày chi</th>
              <th className="p-4 text-center min-w-[150px]">Danh mục</th>
              <th className="p-4 text-center min-w-[150px]">Phương thức</th>
              <th className="p-4 text-center min-w-[300px]">Nội dung</th>
              <th className="p-4 text-center min-w-[150px]">Ngày Tạo</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eaddcf]">
            {data.length > 0
              ? data.map((item, index) => (
                  <tr
                    key={item.chiId}
                    className={`hover:bg-[#fffdf5] transition-colors group ${
                      selectedIds.includes(item.chiId) ? "bg-[#fff8e1]" : ""
                    }`}
                  >
                    <td className="p-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(item.chiId)}
                        onChange={(e) => onSelectOne?.(item.chiId, e.target.checked)}
                        className="w-4 h-4 accent-[#b91c1c] cursor-pointer"
                      />
                    </td>
                    <td className="p-4 text-center text-stone-400 font-mono text-xs">
                      {(pageIndex - 1) * pageSize + index + 1}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[250px]">
                      {item.nguoiNhan}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.soTien)}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]-cell text-sm">
                      {item.ngayChi ? new Date(item.ngayChi).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }) : "N/A"}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]">
                      {item.tenDanhMuc || "Khác"}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]">
                      {item.phuongThucThanhToan}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[300px]">
                      {item.noiDung}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]">
                      {item.ngayTao
                        ? new Date(item.ngayTao).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })
                        : "Không có ngày tạo"}
                    </td>
                    <td className="p-4 text-center font-bold text-[#5d4037] group-hover:text-[#b91c1c] min-w-[150px]">
                      <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Sửa"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => onDelete(item)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : !isLoading && (
                  <tr>
                    <td
                      colSpan={10}
                      className="p-12 text-center text-stone-500 italic"
                    >
                      <div className="flex flex-col items-center">
                        <FileSpreadsheet
                          size={48}
                          className="mb-4 opacity-20"
                        />
                        Không tìm thấy khoản chi nào phù hợp.
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
              Đã chọn {selectedIds.length}
            </span>
          )}
          Hiển thị <span className="font-bold">{data.length}</span> / Tổng{" "}
          <span className="font-bold">{totalRecords}</span> khoản chi
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
