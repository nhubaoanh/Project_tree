"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { ITaiLieu, LOAI_TAI_LIEU } from "@/service/tailieu.service";

interface TaiLieuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ITaiLieu>) => void;
  initialData: ITaiLieu | null;
  isLoading: boolean;
}

export function TaiLieuModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: TaiLieuModalProps) {
  const [formData, setFormData] = useState<Partial<ITaiLieu>>({
    tenTaiLieu: "",
    moTa: "",
    loaiTaiLieu: "",
    namSangTac: undefined,
    tacGia: "",
    nguonGoc: "",
    ghiChu: "",
    duongDan: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        tenTaiLieu: initialData.tenTaiLieu || "",
        moTa: initialData.moTa || "",
        loaiTaiLieu: initialData.loaiTaiLieu || "",
        namSangTac: initialData.namSangTac,
        tacGia: initialData.tacGia || "",
        nguonGoc: initialData.nguonGoc || "",
        ghiChu: initialData.ghiChu || "",
        duongDan: initialData.duongDan || "",
      });
    } else {
      setFormData({
        tenTaiLieu: "",
        moTa: "",
        loaiTaiLieu: "",
        namSangTac: undefined,
        tacGia: "",
        nguonGoc: "",
        ghiChu: "",
        duongDan: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tenTaiLieu?.trim()) {
      alert("Vui lòng nhập tên tài liệu");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#fffdf5] rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-[#d4af37]">
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#5d4037]">
            {initialData ? "Chỉnh sửa tài liệu" : "Thêm tài liệu mới"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-white/50 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Tên tài liệu <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tenTaiLieu}
              onChange={(e) =>
                setFormData({ ...formData, tenTaiLieu: e.target.value })
              }
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Nhập tên tài liệu"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Loại tài liệu
              </label>
              <select
                value={formData.loaiTaiLieu}
                onChange={(e) =>
                  setFormData({ ...formData, loaiTaiLieu: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              >
                <option value="">-- Chọn loại --</option>
                {LOAI_TAI_LIEU.map((loai) => (
                  <option key={loai} value={loai}>
                    {loai}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Năm sáng tác
              </label>
              <input
                type="number"
                value={formData.namSangTac || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    namSangTac: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="VD: 1920"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Tác giả
              </label>
              <input
                type="text"
                value={formData.tacGia}
                onChange={(e) =>
                  setFormData({ ...formData, tacGia: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="Tên tác giả"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">
                Nguồn gốc
              </label>
              <input
                type="text"
                value={formData.nguonGoc}
                onChange={(e) =>
                  setFormData({ ...formData, nguonGoc: e.target.value })
                }
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="VD: Lưu trữ tại nhà thờ họ"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Mô tả
            </label>
            <textarea
              value={formData.moTa}
              onChange={(e) =>
                setFormData({ ...formData, moTa: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Mô tả chi tiết về tài liệu"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Đường dẫn file
            </label>
            <input
              type="text"
              value={formData.duongDan}
              onChange={(e) =>
                setFormData({ ...formData, duongDan: e.target.value })
              }
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="URL hoặc đường dẫn file"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Ghi chú
            </label>
            <textarea
              value={formData.ghiChu}
              onChange={(e) =>
                setFormData({ ...formData, ghiChu: e.target.value })
              }
              rows={2}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Ghi chú thêm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] disabled:opacity-50 flex items-center gap-2"
            >
              {isLoading && <Loader2 className="animate-spin" size={16} />}
              {isLoading
                ? "Đang lưu..."
                : initialData
                ? "Cập nhật"
                : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
