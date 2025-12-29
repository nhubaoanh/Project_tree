"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { ITinTuc } from "@/service/tintuc.service";

interface TinTucModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ITinTuc>) => void;
  initialData: ITinTuc | null;
  isLoading: boolean;
}

export function TinTucModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: TinTucModalProps) {
  const [formData, setFormData] = useState<Partial<ITinTuc>>({
    tieuDe: "",
    noiDung: "",
    tomTat: "",
    anhDaiDien: "",
    tacGia: "",
    ghim: 0,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        tieuDe: initialData.tieuDe || "",
        noiDung: initialData.noiDung || "",
        tomTat: initialData.tomTat || "",
        anhDaiDien: initialData.anhDaiDien || "",
        tacGia: initialData.tacGia || "",
        ghim: initialData.ghim || 0,
      });
    } else {
      setFormData({
        tieuDe: "",
        noiDung: "",
        tomTat: "",
        anhDaiDien: "",
        tacGia: "",
        ghim: 0,
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.tieuDe?.trim()) {
      alert("Vui lòng nhập tiêu đề");
      return;
    }
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-[#d4af37]">
        <div className="flex justify-between items-center p-4 border-b border-[#d4af37] bg-gradient-to-r from-[#f5e6d3] to-[#e8d4b8]">
          <h3 className="text-xl font-bold text-[#5d4037]">
            {initialData ? "Chỉnh sửa tin tức" : "Thêm tin tức mới"}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-white/50 rounded">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.tieuDe}
              onChange={(e) => setFormData({ ...formData, tieuDe: e.target.value })}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Nhập tiêu đề tin tức"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">Tóm tắt</label>
            <textarea
              value={formData.tomTat}
              onChange={(e) => setFormData({ ...formData, tomTat: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Tóm tắt ngắn gọn nội dung"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">Nội dung</label>
            <textarea
              value={formData.noiDung}
              onChange={(e) => setFormData({ ...formData, noiDung: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
              placeholder="Nội dung chi tiết của tin tức"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Tác giả</label>
              <input
                type="text"
                value={formData.tacGia}
                onChange={(e) => setFormData({ ...formData, tacGia: e.target.value })}
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="Tên tác giả"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Ảnh đại diện</label>
              <input
                type="text"
                value={formData.anhDaiDien}
                onChange={(e) => setFormData({ ...formData, anhDaiDien: e.target.value })}
                className="w-full px-3 py-2 border border-[#d4af37] rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                placeholder="URL ảnh đại diện"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="ghim"
              checked={formData.ghim === 1}
              onChange={(e) => setFormData({ ...formData, ghim: e.target.checked ? 1 : 0 })}
              className="w-4 h-4 text-[#d4af37] border-[#d4af37] rounded focus:ring-[#d4af37]"
            />
            <label htmlFor="ghim" className="text-sm text-[#5d4037]">
              Ghim tin tức này lên đầu
            </label>
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
              {isLoading ? "Đang lưu..." : initialData ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
