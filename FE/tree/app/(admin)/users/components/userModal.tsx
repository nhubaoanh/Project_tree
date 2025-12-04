import React, { useEffect, useState } from "react";
import { X, Check, Loader2 } from "lucide-react";
import { IUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { getAllDongHo } from "@/service/lineage.service";
import { getAllRole } from "@/service/role.service";
import { useToast } from "@/service/useToas";

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<IUser>) => void;
  initialData?: IUser | null;
  isLoading: boolean;
}

export const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const { showSuccess } = useToast();

  // Load lineage (dòng họ)
  const { data: dongHoData } = useQuery({
    queryKey: ["Lineage"],
    queryFn: getAllDongHo,
  });

  // Load role
  const { data: roleData } = useQuery({
    queryKey: ["Role"],
    queryFn: getAllRole,
  });

  const dongHoList = Array.isArray(dongHoData) ? dongHoData : dongHoData?.data ?? [];
  const roleList = Array.isArray(roleData) ? roleData : roleData?.data ?? [];

  if (!isOpen) return null;

  // =============================
  //  ✔ CLEAN handleSubmit
  // =============================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);

    const user: any = {
      hoTen: form.get("hoTen"),
      tenDangNhap: form.get("tenDangNhap"),
      email: form.get("email"),
      soDienThoai: form.get("soDienThoai"),

      // Fallback giữ nguyên giá trị cũ khi EDIT
      dongHoId: Number(form.get("dongHoId")) || Number(initialData?.dongHoId),
      roleId: Number(form.get("roleId")) || Number(initialData?.roleId),


      matKhau: form.get("matKhau"),
      nguoiDungId: initialData?.nguoiDungId,
      nguoiTaoId: initialData?.nguoiTaoId,
    };

    onSubmit(user);
    showSuccess("Lưu thông tin thành công");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-2xl p-0 rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold uppercase tracking-wider">
            {initialData ? "Chỉnh sửa thành viên" : "Thêm thành viên mới"}
          </h3>
          <button onClick={onClose} disabled={isLoading} className="hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* BODY */}
        <form id="userForm" onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Họ tên */}
            <InputField
              label="Họ và tên"
              name="hoTen"
              required
              defaultValue={initialData?.hoTen}
            />

            {/* Dòng họ */}
            <SelectField
              label="Dòng họ"
              name="dongHoId"
              required
              defaultValue={initialData?.dongHoId ?? ""}
              disabled={isLoading}
              options={dongHoList}
              optionLabel="tenDongHo"
              optionValue="dongHoId"
            />

            {/* Username */}
            <InputField
              label="Tên đăng nhập"
              name="tenDangNhap"
              required
              readOnly={!!initialData}
              defaultValue={initialData?.tenDangNhap}
            />

            {/* Mật khẩu */}
            <InputField
              label="Mật khẩu"
              name="matKhau"
              required
              readOnly={!!initialData}
              defaultValue={initialData?.matKhau}
            />

            {/* Email */}
            <InputField
              label="Email"
              name="email"
              type="email"
              defaultValue={initialData?.email}
            />

            {/* Số điện thoại */}
            <InputField
              label="Số điện thoại"
              name="soDienThoai"
              defaultValue={initialData?.soDienThoai}
            />

            {/* Vai trò */}
            <SelectField
              label="Vai trò"
              name="roleId"
              defaultValue={initialData?.roleId ?? ""}
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
            disabled={isLoading}
            className="px-8 py-2 bg-[#b91c1c] text-white font-bold rounded shadow hover:bg-[#991b1b] flex items-center gap-2"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            {isLoading ? "Đang lưu..." : "Lưu thông tin"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ================================
   COMPONENT TÁCH NHỎ CHO CODE SẠCH
================================ */

const InputField = ({ label, ...props }: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-[#8b5e3c] uppercase">{label}</label>
    <input
      {...props}
      className={`w-full p-3 bg-white border border-[#d4af37]/50 rounded shadow-inner focus:border-[#b91c1c] focus:outline-none ${props.readOnly ? "bg-gray-100 text-gray-500" : ""
        }`}
    />
  </div>
);

const SelectField = ({
  label,
  name,
  options,
  optionLabel,
  optionValue,
  defaultValue,
  ...props
}: any) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-[#8b5e3c] uppercase">{label}</label>
    <select
      name={name}
      defaultValue={defaultValue}
      {...props}
      className="w-full p-3 bg-white border border-[#d4af37]/50 rounded shadow-inner focus:border-[#b91c1c] focus:outline-none"
    >
      <option value="">-- Chọn --</option>
      {options.map((item: any) => (
        <option key={item[optionValue]} value={item[optionValue]}>
          {item[optionLabel]}
        </option>
      ))}
    </select>
  </div>
);
