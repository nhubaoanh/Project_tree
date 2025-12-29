"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { ITinTuc } from "@/service/tintuc.service";
import { FormRules, validateForm, validateField } from "@/lib/validator";
import { useToast } from "@/service/useToas";

interface TinTucModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<ITinTuc>) => void;
  initialData: ITinTuc | null;
  isLoading: boolean;
}

// Validation rules
const tinTucRules: FormRules = {
  tieuDe: { label: "Tiêu đề", rules: ["required", { min: 5 }, { max: 200 }] },
  tacGia: { label: "Tác giả", rules: ["fullName"] },
  tomTat: { label: "Tóm tắt", rules: [{ max: 500 }] },
  noiDung: { label: "Nội dung", rules: [{ max: 10000 }] },
  anhDaiDien: { label: "Ảnh đại diện", rules: ["url"] },
};

export function TinTucModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}: TinTucModalProps) {
  const { showError } = useToast();
  
  const [formData, setFormData] = useState<Partial<ITinTuc>>({
    tieuDe: "",
    noiDung: "",
    tomTat: "",
    anhDaiDien: "",
    tacGia: "",
    ghim: 0,
  });
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        tieuDe: initialData?.tieuDe || "",
        noiDung: initialData?.noiDung || "",
        tomTat: initialData?.tomTat || "",
        anhDaiDien: initialData?.anhDaiDien || "",
        tacGia: initialData?.tacGia || "",
        ghim: initialData?.ghim || 0,
      });
      setErrors({});
      setTouched({});
    }
  }, [initialData, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    let newValue: string = value;
    
    // Chặn nhập số vào field tác giả
    if (name === "tacGia") {
      newValue = value.replace(/\d/g, "");
    }
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    if (touched[name]) {
      const error = validateField(name, newValue, tinTucRules, formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, tinTucRules, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors: formErrors } = validateForm(formData, tinTucRules);
    setErrors(formErrors);
    setTouched(Object.keys(tinTucRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    
    if (!isValid) {
      showError("Vui lòng kiểm tra lại thông tin!");
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
              name="tieuDe"
              value={formData.tieuDe || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${
                touched.tieuDe && errors.tieuDe ? "border-red-500" : "border-[#d4af37]"
              }`}
              placeholder="Nhập tiêu đề tin tức"
            />
            {touched.tieuDe && errors.tieuDe && (
              <p className="text-red-500 text-xs mt-1">{errors.tieuDe}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">Tóm tắt</label>
            <textarea
              name="tomTat"
              value={formData.tomTat || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={2}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${
                touched.tomTat && errors.tomTat ? "border-red-500" : "border-[#d4af37]"
              }`}
              placeholder="Tóm tắt ngắn gọn nội dung"
            />
            {touched.tomTat && errors.tomTat && (
              <p className="text-red-500 text-xs mt-1">{errors.tomTat}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#5d4037] mb-1">Nội dung</label>
            <textarea
              name="noiDung"
              value={formData.noiDung || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={6}
              className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${
                touched.noiDung && errors.noiDung ? "border-red-500" : "border-[#d4af37]"
              }`}
              placeholder="Nội dung chi tiết của tin tức"
            />
            {touched.noiDung && errors.noiDung && (
              <p className="text-red-500 text-xs mt-1">{errors.noiDung}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Tác giả</label>
              <input
                type="text"
                name="tacGia"
                value={formData.tacGia || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${
                  touched.tacGia && errors.tacGia ? "border-red-500" : "border-[#d4af37]"
                }`}
                placeholder="Tên tác giả (không nhập số)"
              />
              {touched.tacGia && errors.tacGia && (
                <p className="text-red-500 text-xs mt-1">{errors.tacGia}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-[#5d4037] mb-1">Ảnh đại diện</label>
              <input
                type="text"
                name="anhDaiDien"
                value={formData.anhDaiDien || ""}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 ${
                  touched.anhDaiDien && errors.anhDaiDien ? "border-red-500" : "border-[#d4af37]"
                }`}
                placeholder="URL ảnh đại diện"
              />
              {touched.anhDaiDien && errors.anhDaiDien && (
                <p className="text-red-500 text-xs mt-1">{errors.anhDaiDien}</p>
              )}
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
