"use client";

import React, { useEffect, useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getAllDongHo } from "@/service/lineage.service";
import { getAllRole } from "@/service/role.service";
import { useToast } from "@/service/useToas";
import { checkUsernameExist } from "@/service/user.service";
import { FormRules, validateForm, validateField } from "@/lib/validator";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<IUser>) => void;
  initialData?: IUser | null;
  isLoading: boolean;
}

// Định nghĩa rules validate
const userRules: FormRules = {
  hoTen: { label: "Họ và tên", rules: ["required", "fullName"] },
  tenDangNhap: { label: "Tên đăng nhập", rules: ["required", "email"] },
  matKhau: { label: "Mật khẩu", rules: ["required", "password"] },
  email: { label: "Email", rules: ["email"] },
  soDienThoai: { label: "Số điện thoại", rules: ["phone"] },
  dongHoId: { label: "Dòng họ", rules: ["required"] },
};

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { showSuccess, showError } = useToast();

  // Form state
  const [formData, setFormData] = useState<Partial<IUser>>({});
  const [errors, setErrors] = useState<Record<string, string | null>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Username check state
  const [checking, setChecking] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Load data
  const { data: dongHoData } = useQuery({
    queryKey: ["Lineage"],
    queryFn: getAllDongHo,
  });

  const { data: roleData } = useQuery({
    queryKey: ["Role"],
    queryFn: getAllRole,
  });

  const dongHoList = Array.isArray(dongHoData) ? dongHoData : dongHoData?.data ?? [];
  const roleList = Array.isArray(roleData) ? roleData : roleData?.data ?? [];

  // Reset form khi modal mở
  useEffect(() => {
    if (isOpen) {
      setFormData({
        hoTen: initialData?.hoTen || "",
        tenDangNhap: initialData?.tenDangNhap || "",
        matKhau: initialData?.matKhau || "",
        email: initialData?.email || "",
        soDienThoai: initialData?.soDienThoai || "",
        dongHoId: initialData?.dongHoId || "",
        roleId: initialData?.roleId || "",
      });
      setErrors({});
      setTouched({});
      setUsernameError(null);
    }
  }, [isOpen, initialData]);

  // Handle change + chặn nhập số vào họ tên
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    
    // Chặn nhập số vào họ tên
    if (name === "hoTen") {
      newValue = value.replace(/\d/g, "");
    }
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Validate lại nếu đã touched
    if (touched[name]) {
      const error = validateField(name, newValue, userRules, formData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur - validate field
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value, userRules, formData);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Check username exist
  const handleCheckUsername = async (value: string) => {
    if (!value) return;
    
    // Nếu đang edit và username không đổi thì bỏ qua
    if (initialData && value === initialData.tenDangNhap) {
      setUsernameError(null);
      return;
    }

    try {
      setChecking(true);
      const result = await checkUsernameExist(value);
      if (result?.exists === 1) {
        setUsernameError("Tên đăng nhập đã tồn tại!");
        showError("Tên đăng nhập đã tồn tại!");
      } else {
        setUsernameError(null);
        showSuccess("Tên đăng nhập hợp lệ!");
      }
    } catch (err) {
      setUsernameError("Lỗi kết nối server!");
      showError("Lỗi kết nối server!");
    } finally {
      setChecking(false);
    }
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate toàn bộ form
    const { isValid, errors: formErrors } = validateForm(formData, userRules);
    setErrors(formErrors);
    setTouched(
      Object.keys(userRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    if (!isValid) {
      showError("Vui lòng kiểm tra lại thông tin!");
      return;
    }

    if (checking) {
      showError("Đang kiểm tra tên đăng nhập...");
      return;
    }

    if (usernameError) {
      showError("Tên đăng nhập đã tồn tại!");
      return;
    }

    const user: Partial<IUser> = {
      ...formData,
      nguoiDungId: initialData?.nguoiDungId,
      nguoiTaoId: initialData?.nguoiTaoId,
    };

    onSubmit(user);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-2xl p-0 rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold uppercase tracking-wider">
            {initialData ? "Chỉnh sửa thành viên" : "Thêm thành viên mới"}
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <form
          id="userForm"
          onSubmit={handleSubmit}
          className="p-8 overflow-y-auto space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ tên */}
            <InputField
              label="Họ và tên"
              name="hoTen"
              required
              value={formData.hoTen || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.hoTen ? errors.hoTen : null}
            />

            {/* Dòng họ */}
            <SelectField
              label="Dòng họ"
              name="dongHoId"
              required
              value={formData.dongHoId || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={isLoading}
              options={dongHoList}
              optionLabel="tenDongHo"
              optionValue="dongHoId"
              error={touched.dongHoId ? errors.dongHoId : null}
            />

            {/* Tên đăng nhập */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  name="tenDangNhap"
                  value={formData.tenDangNhap || ""}
                  onChange={handleChange}
                  onBlur={(e) => {
                    handleBlur(e);
                    handleCheckUsername(e.target.value);
                  }}
                  className={`w-full p-3 bg-white border rounded shadow-inner focus:outline-none ${
                    (touched.tenDangNhap && errors.tenDangNhap) || usernameError
                      ? "border-red-500"
                      : "border-[#d4af37]/50 focus:border-[#b91c1c]"
                  }`}
                />
                {checking && (
                  <Loader2 className="absolute right-3 top-3 w-5 h-5 animate-spin text-yellow-600" />
                )}
              </div>
              {touched.tenDangNhap && errors.tenDangNhap && (
                <p className="text-red-500 text-xs">{errors.tenDangNhap}</p>
              )}
              {usernameError && (
                <p className="text-red-500 text-xs">{usernameError}</p>
              )}
            </div>

            {/* Mật khẩu */}
            <InputField
              label="Mật khẩu"
              name="matKhau"
              type="password"
              required
              value={formData.matKhau || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.matKhau ? errors.matKhau : null}
            />

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : null}
            />

            {/* Số điện thoại */}
            <InputField
              label="Số điện thoại"
              name="soDienThoai"
              value={formData.soDienThoai || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.soDienThoai ? errors.soDienThoai : null}
            />

            {/* Vai trò */}
            <SelectField
              label="Vai trò"
              name="roleId"
              value={formData.roleId || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              options={roleList}
              optionLabel="roleName"
              optionValue="roleId"
            />
          </div>
        </form>

        {/* FOOTER */}
        <div className="p-6 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c]"
          >
            Đóng
          </button>

          <button
            type="submit"
            form="userForm"
            disabled={isLoading || checking}
            className="px-8 py-2 bg-[#b91c1c] text-white font-bold rounded shadow hover:bg-[#991b1b] flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            {isLoading ? "Đang lưu..." : "Lưu thông tin"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================
   COMPONENT TÁCH NHỎ
================================ */

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null;
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
      readOnly={readOnly}
      className={`w-full p-3 bg-white border rounded shadow-inner focus:outline-none ${
        error
          ? "border-red-500"
          : "border-[#d4af37]/50 focus:border-[#b91c1c]"
      } ${readOnly ? "bg-gray-100 text-gray-500" : ""}`}
    />
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

interface SelectFieldProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: any[];
  optionLabel: string;
  optionValue: string;
  error?: string | null;
  disabled?: boolean;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  required,
  value,
  onChange,
  onBlur,
  options,
  optionLabel,
  optionValue,
  error,
  disabled,
}) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-[#8b5e3c] uppercase">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`w-full p-3 bg-white border rounded shadow-inner focus:outline-none ${
        error
          ? "border-red-500"
          : "border-[#d4af37]/50 focus:border-[#b91c1c]"
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
