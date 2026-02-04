"use client";

import React, { useEffect, useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getDongHoById } from "@/service/dongho.service";
import { getAllRoles } from "@/service/role.service";
import { useToast } from "@/service/useToas";
import { checkUsernameExist } from "@/service/user.service";
import { FormRules, validateForm, validateField } from "@/lib/validator";
import storage from "@/utils/storage";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<IUser>) => void;
  initialData?: IUser | null;
  isLoading: boolean;
}

// Định nghĩa rules validate
const userRules: FormRules = {
  full_name: { label: "Họ và tên", rules: ["required", "fullName"] },
  tenDangNhap: { label: "Tên đăng nhập", rules: ["required", "email"] },
  matKhau: { label: "Mật khẩu", rules: ["required", "password"] },
  email: { label: "Email", rules: ["required", "email"] },
  phone: { label: "Số điện thoại", rules: ["required", "phone"] },
  dongHoId: { label: "Dòng họ", rules: ["required"] },
  roleId: { label: "Vai trò", rules: ["required"] },
};

// Rules cho edit (mật khẩu không bắt buộc)
const editUserRules: FormRules = {
  full_name: { label: "Họ và tên", rules: ["required", "fullName"] },
  tenDangNhap: { label: "Tên đăng nhập", rules: ["required", "email"] },
  email: { label: "Email", rules: ["required", "email"] },
  phone: { label: "Số điện thoại", rules: ["required", "phone"] },
  dongHoId: { label: "Dòng họ", rules: ["required"] },
  roleId: { label: "Vai trò", rules: ["required"] },
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

  // Password change state
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  // Username check state
  const [checking, setChecking] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);

  // Load data
  const user = storage.getUser();
  const userDongHoId = user?.dongHoId;

  // Query để lấy thông tin dòng họ hiện tại
  const { data: dongHoData } = useQuery({
    queryKey: ["dongho", userDongHoId],
    queryFn: () => getDongHoById(userDongHoId!),
    enabled: !!userDongHoId,
  });
  const dongHoInfo = dongHoData?.data;

  // Query để lấy danh sách roles từ API
  const { data: rolesData } = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });

  // Lọc chỉ lấy Thủ Đồ và Thành Viên
  const allRoles = rolesData?.data || [];
  const roleList = allRoles.filter((role: any) => 
    role.roleCode === 'thudo' || role.roleCode === 'thanhvien'
  );

  // Reset form khi modal mở
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: initialData?.full_name || "",
        tenDangNhap: initialData?.tenDangNhap || "",
        matKhau: initialData?.matKhau || "",
        email: initialData?.email || "",
        phone: initialData?.phone || "",
        dongHoId: initialData?.dongHoId || userDongHoId || "", // Luôn dùng dongHoId của user hiện tại
        roleId: initialData?.roleId || "",
        gender: initialData?.gender ?? 1, // Default to male (1)
        active_flag: initialData?.active_flag ?? 1, // Default to active (1)
      });
      setErrors({});
      setTouched({});
      setUsernameError(null);
      setShowPasswordChange(false);
      setNewPassword("");
    }
  }, [isOpen, initialData, userDongHoId]);

  // Handle change + chặn nhập số vào họ tên + validate email realtime
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let newValue = value;
    
    // Chặn nhập số vào họ tên
    if (name === "full_name") {
      newValue = value.replace(/\d/g, "");
    }
    
    // Validate email realtime
    if (name === "email" && newValue) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(newValue)) {
        setErrors(prev => ({ ...prev, email: "Email không đúng định dạng (VD: user@example.com)" }));
      } else {
        setErrors(prev => ({ ...prev, email: null }));
      }
    }
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Validate lại nếu đã touched
    if (touched[name] && name !== "email") { // Email đã validate ở trên
      const currentRules = initialData ? editUserRules : userRules;
      const error = validateField(name, newValue, currentRules, formData);
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

    // Chọn rules phù hợp
    const currentRules = initialData ? editUserRules : userRules;

    // Validate toàn bộ form
    const { isValid, errors: formErrors } = validateForm(formData, currentRules);
    setErrors(formErrors);
    setTouched(
      Object.keys(currentRules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );

    // Validate giới tính riêng (vì có thể là 0 - falsy)
    if (formData.gender === undefined || formData.gender === null) {
      setErrors(prev => ({ ...prev, gender: "Vui lòng chọn giới tính" }));
      setTouched(prev => ({ ...prev, gender: true }));
      showError("Vui lòng chọn giới tính!");
      return;
    }

    // Validate active_flag riêng (vì có thể là 0 - falsy)
    if (formData.active_flag === undefined || formData.active_flag === null) {
      setErrors(prev => ({ ...prev, active_flag: "Vui lòng chọn tình trạng hoạt động" }));
      setTouched(prev => ({ ...prev, active_flag: true }));
      showError("Vui lòng chọn tình trạng hoạt động!");
      return;
    }

    // Validate mật khẩu mới nếu đang thay đổi
    if (showPasswordChange && (!newPassword || newPassword.trim() === "")) {
      setErrors(prev => ({ ...prev, newPassword: "Vui lòng nhập mật khẩu mới" }));
      setTouched(prev => ({ ...prev, newPassword: true }));
      showError("Vui lòng nhập mật khẩu mới!");
      return;
    }

    // Validate độ mạnh mật khẩu mới
    if (showPasswordChange && newPassword) {
      if (newPassword.length < 6) {
        setErrors(prev => ({ ...prev, newPassword: "Mật khẩu phải có ít nhất 6 ký tự" }));
        setTouched(prev => ({ ...prev, newPassword: true }));
        showError("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
      }
    }

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

    const currentUser = storage.getUser();
    const user = {
      ...formData,
      dongHoId: userDongHoId, // Đảm bảo luôn dùng dongHoId của user hiện tại
      nguoiDungId: initialData?.nguoiDungId,
      nguoiTaoId: initialData ? initialData.nguoiTaoId : currentUser?.nguoiDungId,
      lu_user_id: currentUser?.nguoiDungId || null,
      // Chỉ gửi mật khẩu mới nếu đang thay đổi
      ...(showPasswordChange && newPassword ? { matKhau: newPassword } : {}),
      // Nếu không thay đổi mật khẩu và đang edit, xóa field matKhau
      ...(initialData && !showPasswordChange ? { matKhau: undefined } : {}),
    };

    onSubmit(user as Partial<IUser>);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-2xl p-0 rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">
        {/* HEADER */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold tracking-wider">
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
              name="full_name"
              required
              value={formData.full_name || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.full_name ? errors.full_name : null}
            />

            {/* Dòng họ - Hiển thị thông tin (read-only) */}
            <div className="space-y-2">
              <label className="text-xl font-bold text-[#8b5e3c]">
                Dòng họ <span className="text-red-500">*</span>
              </label>
              <div className="w-full p-3 bg-gray-50 border border-[#d4af37]/50 rounded text-[#5d4037] font-medium">
                {dongHoInfo?.tenDongHo || "Đang tải..."}
              </div>
              {/* Hidden input để gửi dongHoId */}
              <input type="hidden" name="dongHoId" value={userDongHoId || ""} />
            </div>

            {/* Tên đăng nhập */}
            <div className="space-y-2">
              <label className="text-xl font-bold text-[#8b5e3c]">
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
            {!initialData ? (
              // Thêm mới: hiển thị field mật khẩu bắt buộc
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
            ) : (
              // Chỉnh sửa: hiển thị nút thay đổi mật khẩu
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#8b5e3c]">
                  Mật khẩu
                </label>
                {!showPasswordChange ? (
                  <button
                    type="button"
                    onClick={() => setShowPasswordChange(true)}
                    className="w-full p-3 bg-gray-100 border border-[#d4af37]/50 rounded text-left text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    Nhấn để thay đổi mật khẩu
                  </button>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Nhập mật khẩu mới"
                      className={`w-full p-3 bg-white border rounded shadow-inner focus:outline-none ${
                        touched.newPassword && errors.newPassword
                          ? "border-red-500"
                          : "border-[#d4af37]/50 focus:border-[#b91c1c]"
                      }`}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <p className="text-red-500 text-xs">{errors.newPassword}</p>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordChange(false);
                        setNewPassword("");
                        setErrors(prev => ({ ...prev, newPassword: null }));
                        setTouched(prev => ({ ...prev, newPassword: false }));
                      }}
                      className="text-sm text-gray-500 hover:text-red-600"
                    >
                      Hủy thay đổi mật khẩu
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              type="email"
              required
              value={formData.email || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email ? errors.email : null}
            />

            {/* Số điện thoại */}
            <InputField
              label="Số điện thoại"
              name="phone"
              required
              value={formData.phone || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.phone ? errors.phone : null}
            />

            {/* Giới tính */}
            <div className="space-y-2">
              <label className="text-xl font-bold text-[#8b5e3c]">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 p-3 bg-white border border-[#d4af37]/50 rounded">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={formData.gender === 1}
                    onChange={() => setFormData(prev => ({ ...prev, gender: 1 }))}
                    className="w-4 h-4 text-[#b91c1c] focus:ring-[#b91c1c]"
                  />
                  <span className="text-[#5d4037]">Nam</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={formData.gender === 0}
                    onChange={() => setFormData(prev => ({ ...prev, gender: 0 }))}
                    className="w-4 h-4 text-[#b91c1c] focus:ring-[#b91c1c]"
                  />
                  <span className="text-[#5d4037]">Nữ</span>
                </label>
              </div>
              {/* Validation message cho gender */}
              {formData.gender === undefined && (
                <p className="text-red-500 text-xs">Vui lòng chọn giới tính</p>
              )}
            </div>

            {/* Vai trò */}
            <SelectField
              label="Vai trò"
              name="roleId"
              required
              value={formData.roleId || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              options={roleList}
              optionLabel="roleName"
              optionValue="roleId"
              error={touched.roleId ? errors.roleId : null}
            />

            {/* Tình trạng hoạt động */}
            <div className="space-y-2">
              <label className="text-xl font-bold text-[#8b5e3c]">
                Tình trạng hoạt động <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4 p-3 bg-white border border-[#d4af37]/50 rounded">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="active_flag"
                    value="1"
                    checked={formData.active_flag === 1}
                    onChange={() => setFormData(prev => ({ ...prev, active_flag: 1 }))}
                    className="w-4 h-4 text-[#b91c1c] focus:ring-[#b91c1c]"
                  />
                  <span className="text-[#5d4037]">Hoạt động</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="active_flag"
                    value="0"
                    checked={formData.active_flag === 0}
                    onChange={() => setFormData(prev => ({ ...prev, active_flag: 0 }))}
                    className="w-4 h-4 text-[#b91c1c] focus:ring-[#b91c1c]"
                  />
                  <span className="text-[#5d4037]">Ngưng hoạt động</span>
                </label>
              </div>
              {/* Validation message cho active_flag */}
              {formData.active_flag === undefined && (
                <p className="text-red-500 text-xs">Vui lòng chọn tình trạng hoạt động</p>
              )}
            </div>
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
    <label className="text-xl font-bold text-[#8b5e3c]">
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
    <label className="text-xl font-bold text-[#8b5e3c]">
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
