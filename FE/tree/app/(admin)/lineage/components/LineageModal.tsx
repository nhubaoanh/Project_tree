"use client";
import React, { useEffect, useState } from "react";
import { X, Check, Loader2, Users } from "lucide-react";
import { IDongHo } from "@/service/dongho.service";
import { useToast } from "@/service/useToas";
import { FormRules, validateForm, validateField } from "@/lib/validator";
import storage from "@/utils/storage";

// ==================== PROPS ====================
interface LineageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: IDongHo | null;
  isLoading: boolean;
}

// ==================== VALIDATION RULES ====================
const lineageRules: FormRules = {
  tenDongHo: {
    label: "Tên dòng họ",
    rules: ["required", { min: 3 }, { max: 200 }],
  },
  queQuanGoc: { label: "Quê quán gốc", rules: [{ max: 300 }] },
  nguoiQuanLy: { label: "Người quản lý", rules: [{ max: 200 }] },
  ghiChu: { label: "Ghi chú", rules: [{ max: 1000 }] },
};

// ==================== MAIN COMPONENT ====================
export const LineageModal: React.FC<LineageModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { showError } = useToast();

  // ========== FORM STATE ==========
  const [formData, setFormData] = useState<Partial<IDongHo>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // ========== RESET FORM KHI MODAL MỞ ==========
  useEffect(() => {
    if (isOpen) {
      const user = storage.getUser();
      setFormData({
        tenDongHo: initialData?.tenDongHo || "",
        queQuanGoc: initialData?.queQuanGoc || "",
        ngayThanhLap: initialData?.ngayThanhLap,
        nguoiQuanLy: initialData?.nguoiQuanLy || "",
        ghiChu: initialData?.ghiChu || "",
        nguoiTaoId: user?.nguoiDungId || "",
        nguoiCapNhatId: user?.nguoiDungId || "",
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, initialData]);

  // ========== HANDLE CHANGE ==========
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value, lineageRules, formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // ========== HANDLE BLUR ==========
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, lineageRules, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ========== HANDLE SUBMIT ==========
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { isValid, errors: formErrors } = validateForm(formData, lineageRules);
    setErrors(formErrors);
    setTouched(
      Object.keys(lineageRules).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    );

    if (!isValid) {
      showError("Vui lòng kiểm tra lại thông tin!");
      const firstErrorField = Object.keys(formErrors).find((k) => formErrors[k]);
      if (firstErrorField) {
        document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    const user = storage.getUser();
    const dataToSubmit = {
      ...formData,
      nguoiTaoId: user?.nguoiDungId || "",
      nguoiCapNhatId: user?.nguoiDungId || "",
    };

    console.log("Submitting lineage data:", dataToSubmit);
    onSubmit(dataToSubmit);
  };

  // ========== HELPER: FORMAT DATE ==========
  const formatDateForInput = (date: Date | string | undefined): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    return d.toISOString().split("T")[0];
  };

  // ========== RENDER ==========
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-2xl p-0 rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">
        {/* ========== HEADER ========== */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold uppercase tracking-wider flex items-center gap-2">
            <Users size={24} />
            {initialData ? "Chỉnh sửa dòng họ" : "Thêm dòng họ mới"}
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* ========== BODY - FORM ========== */}
        <form
          id="lineageForm"
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto space-y-5"
        >
          {/* Tên dòng họ */}
          <InputField
            label="Tên dòng họ"
            name="tenDongHo"
            required
            value={formData.tenDongHo || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.tenDongHo ? errors.tenDongHo : null}
            placeholder="VD: Dòng họ Nguyễn Văn"
          />

          {/* Quê quán gốc */}
          <InputField
            label="Quê quán gốc"
            name="queQuanGoc"
            value={formData.queQuanGoc || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.queQuanGoc ? errors.queQuanGoc : null}
            placeholder="VD: Xã ABC, Huyện XYZ, Tỉnh DEF"
          />

          {/* Ngày thành lập */}
          <InputField
            label="Ngày thành lập"
            name="ngayThanhLap"
            type="date"
            value={formatDateForInput(formData.ngayThanhLap)}
            onChange={(e) => {
              setFormData({
                ...formData,
                ngayThanhLap: e.target.value ? new Date(e.target.value) : undefined,
              });
            }}
            onBlur={handleBlur}
          />

          {/* Người quản lý */}
          <InputField
            label="Người quản lý"
            name="nguoiQuanLy"
            value={formData.nguoiQuanLy || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.nguoiQuanLy ? errors.nguoiQuanLy : null}
            placeholder="VD: Nguyễn Văn A"
          />

          {/* Ghi chú */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-[#8b5e3c] uppercase">
              Ghi chú
            </label>
            <textarea
              name="ghiChu"
              rows={3}
              value={formData.ghiChu || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Ghi chú thêm về dòng họ..."
              className={`w-full p-3 bg-white border rounded shadow-inner focus:outline-none resize-none ${
                touched.ghiChu && errors.ghiChu
                  ? "border-red-500"
                  : "border-[#d4af37]/50 focus:border-[#b91c1c]"
              }`}
            />
            {touched.ghiChu && errors.ghiChu && (
              <p className="text-red-500 text-xs">{errors.ghiChu}</p>
            )}
          </div>
        </form>

        {/* ========== FOOTER ========== */}
        <div className="p-6 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c] transition-colors"
          >
            Đóng
          </button>

          <button
            type="submit"
            form="lineageForm"
            disabled={isLoading}
            className="px-8 py-2 bg-[#b91c1c] text-white font-bold rounded shadow hover:bg-[#991b1b] flex items-center gap-2 disabled:opacity-50 transition-colors"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            {isLoading ? "Đang lưu..." : "Lưu dòng họ"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ==========================================
   REUSABLE COMPONENTS
========================================== */

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
  placeholder?: string;
  readOnly?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  readOnly,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-[#8b5e3c] uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      readOnly={readOnly}
      className={`w-full p-3 bg-white border rounded shadow-inner focus:outline-none transition-colors ${
        error
          ? "border-red-500 focus:border-red-500"
          : "border-[#d4af37]/50 focus:border-[#b91c1c]"
      } ${readOnly ? "bg-gray-100 text-gray-500 cursor-not-allowed" : ""}`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
