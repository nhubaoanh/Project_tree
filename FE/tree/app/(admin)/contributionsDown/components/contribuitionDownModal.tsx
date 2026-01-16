"use client";

import React, { useEffect } from "react";
import { X, Check, Loader2, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getDongHoById } from "@/service/dongho.service";
import { useToast } from "@/service/useToas";
import { useFormValidation } from "@/lib/useFormValidation";
import { FormRules } from "@/lib/validator";
import { IContributionDown } from "@/types/contribuitionDown";
import storage from "@/utils/storage";

// ==================== PROPS ====================
interface ContributionUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<IContributionDown>) => void;
  initialData?: IContributionDown | null;
  isLoading: boolean;
}

// ==================== VALIDATION RULES ====================
const rules: FormRules = {
  nguoiNhan: {
    label: "Người nhận",
    rules: ["required", { max: 255 }],
  },
  ngayChi: {
    label: "Ngày chi",
    rules: ["required", "date"],
  },
  soTien: {
    label: "Số tiền",
    rules: ["required", "positive"],
  },
  dongHoId: {
    label: "Dòng họ",
    rules: ["required"],
  },
  // danhMucId: { label: "Danh mục", rules: ["required"] },  // ❌ REMOVED
  phuongThucThanhToan: {
    label: "Phương thức thanh toán",
    rules: ["required"],
  },
  noiDung: {
    label: "Nội dung",
    rules: ["required", { max: 500 }],  // ✅ Bắt buộc thay cho danh mục
  },
  ghiChu: {
    label: "Ghi chú",
    rules: [{ max: 300 }],
  },
};

// ==================== PAYMENT METHODS ====================
const PAYMENT_METHODS = [
  { value: "Tiền mặt", label: "Tiền mặt" },
  { value: "Chuyển khoản", label: "Chuyển khoản" },
  { value: "Khác", label: "Khác" },
];
// ==================== INITIAL VALUES ====================
const getInitialValues = (data?: IContributionDown | null, dongHoId?: string): Partial<IContributionDown> => ({
  dongHoId: data?.dongHoId || dongHoId || "",
  // danhMucId: data?.danhMucId || 1,  // ❌ REMOVED
  ngayChi: data?.ngayChi || new Date(),
  soTien: data?.soTien || 0,
  phuongThucThanhToan: data?.phuongThucThanhToan || "Tiền mặt",
  noiDung: data?.noiDung || "",
  nguoiNhan: data?.nguoiNhan || "",
  ghiChu: data?.ghiChu || "",
});

// ==================== MAIN COMPONENT ====================
export const ContributionUpModal: React.FC<ContributionUpModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { showError } = useToast();

  // ========== LOAD DATA ==========
  // Lấy dongHoId từ user hiện tại thay vì dropdown
  const user = storage.getUser();
  const userDongHoId = user?.dongHoId;

  // ========== FORM VALIDATION HOOK ==========
  const {
    values,
    handleChange,
    handleBlur,
    validateAll,
    setValue,
    getError,
  } = useFormValidation({
    initialValues: getInitialValues(initialData, userDongHoId),
    rules,
  });

  // Query để lấy thông tin dòng họ hiện tại
  const { data: dongHoData } = useQuery({
    queryKey: ["dongho", userDongHoId],
    queryFn: () => getDongHoById(userDongHoId!),
    enabled: !!userDongHoId,
  });
  const dongHoInfo = dongHoData?.data;

  // ========== RESET FORM KHI MODAL MỞ ==========
  useEffect(() => {
    if (isOpen) {
      // Reset với giá trị mới
      Object.entries(getInitialValues(initialData, userDongHoId)).forEach(([key, val]) => {
        setValue(key as keyof IContributionDown, val);
      });
    }
  }, [isOpen, initialData, userDongHoId, setValue]);

  // ========== SUBMIT ==========
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      showError("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    const user = storage.getUser();
    onSubmit({
      chiId: initialData?.chiId,
      dongHoId: values.dongHoId,
      // danhMucId: values.danhMucId,  // ❌ REMOVED
      ngayChi: formatDateForServer(values.ngayChi) as unknown as Date,
      soTien: values.soTien,
      phuongThucThanhToan: values.phuongThucThanhToan,
      noiDung: values.noiDung,
      nguoiNhan: values.nguoiNhan,
      ghiChu: values.ghiChu,
      nguoiNhapId: initialData?.nguoiNhapId || user?.nguoiDungId,
      lu_user_id: user?.nguoiDungId || undefined,
    });
  };

  // ========== HELPERS ==========
  const formatDate = (date: any): string => {
    if (!date) return "";
    const d = new Date(date);
    return isNaN(d.getTime()) ? "" : d.toISOString().split("T")[0];
  };

  // Format ngày để gửi lên server (YYYY-MM-DD)
  const formatDateForServer = (date: any): string => {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d.getTime())) return "";
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-[#fffdf5] w-full max-w-xl rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold uppercase flex items-center gap-2">
            <DollarSign size={24} />
            {initialData ? "Sửa khoản chi" : "Thêm khoản chi"}
          </h3>
          <button onClick={onClose} disabled={isLoading} className="hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form id="contributionForm" onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {/* Người nhận */}
          <Field
            label="Người nhận"
            name="nguoiNhan"
            required
            value={values.nguoiNhan || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("nguoiNhan")}
            placeholder="Nhập tên người nhận"
          />

          {/* Dòng họ (hiển thị thông tin, không cho chọn) */}
          <div className="space-y-1">
            <label className="text-sm font-bold text-[#8b5e3c] uppercase">
              Dòng họ <span className="text-red-500">*</span>
            </label>
            <div className="w-full p-3 bg-gray-50 border border-[#d4af37]/50 rounded text-[#5d4037] font-medium">
              {dongHoInfo?.tenDongHo || "Đang tải..."}
            </div>
            {/* Hidden input để gửi dongHoId */}
            <input type="hidden" name="dongHoId" value={userDongHoId || ""} />
          </div>

          {/* Số tiền + Ngày chi */}
          <div className="grid grid-cols-2 gap-4">
            <Field
              label="Số tiền (VNĐ)"
              name="soTien"
              type="number"
              required
              value={values.soTien?.toString() || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("soTien")}
              placeholder="0"
            />
            <Field
              label="Ngày chi"
              name="ngayChi"
              type="date"
              required
              value={formatDate(values.ngayChi)}
              onChange={handleChange}
              onBlur={handleBlur}
              error={getError("ngayChi")}
            />
          </div>

          {/* Phương thức thanh toán */}
          <Select
            label="Phương thức thanh toán"
            name="phuongThucThanhToan"
            required
            value={values.phuongThucThanhToan || "Tiền mặt"}
            onChange={handleChange}
            onBlur={handleBlur}
            options={PAYMENT_METHODS}
            optionLabel="label"
            optionValue="value"
            error={getError("phuongThucThanhToan")}
          />

          {/* Nội dung - Thay thế cho danh mục */}
          <TextArea
            label="Nội dung"
            name="noiDung"
            required
            value={values.noiDung || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("noiDung")}
            placeholder="VD: Chi xây dựng nhà thờ họ, Chi tổ chức sự kiện, Chi từ thiện..."
            rows={2}
          />

          {/* Ghi chú */}
          <TextArea
            label="Ghi chú"
            name="ghiChu"
            value={values.ghiChu || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError("ghiChu")}
            placeholder="Ghi chú thêm (nếu có)"
            rows={2}
          />
        </form>

        {/* FOOTER */}
        <div className="p-4 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c]"
          >
            Đóng
          </button>
          <button
            type="submit"
            form="contributionForm"
            disabled={isLoading}
            className="px-6 py-2 bg-[#b91c1c] text-white font-bold rounded hover:bg-[#991b1b] flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            {isLoading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ==================== REUSABLE COMPONENTS ==================== */

const Field = ({ label, name, type = "text", required, value, onChange, onBlur, error, placeholder }: any) => (
  <div className="space-y-1">
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
      className={`w-full p-3 bg-white border rounded focus:outline-none ${
        error ? "border-red-500" : "border-[#d4af37]/50 focus:border-[#b91c1c]"
      }`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const Select = ({ label, name, required, value, onChange, onBlur, options, optionLabel, optionValue, error }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-bold text-[#8b5e3c] uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full p-3 bg-white border rounded focus:outline-none ${
        error ? "border-red-500" : "border-[#d4af37]/50 focus:border-[#b91c1c]"
      }`}
    >
      <option value="">-- Chọn --</option>
      {options.map((item: any) => (
        <option key={item[optionValue]} value={item[optionValue]}>
          {item[optionLabel]}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

const TextArea = ({ label, name, required, value, onChange, onBlur, error, placeholder, rows = 3 }: any) => (
  <div className="space-y-1">
    <label className="text-sm font-bold text-[#8b5e3c] uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-3 bg-white border rounded focus:outline-none resize-none ${
        error ? "border-red-500" : "border-[#d4af37]/50 focus:border-[#b91c1c]"
      }`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);
