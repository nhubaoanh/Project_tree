import React from "react";
import { X, Check, Loader2 } from "lucide-react";
import { IUser } from "@/types/user";

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
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user: any = {
      hoTen: formData.get("hoTen"),
      tenDangNhap: formData.get("tenDangNhap"),
      email: formData.get("email"),
      soDienThoai: formData.get("soDienThoai"),
      roleId: Number(formData.get("roleId")),
    };

    // If editing, preserve ID (handled by parent usually, but good for object consistency)
    if (initialData?.nguoiDungId) {
      user.nguoiDungId = initialData.nguoiDungId;
    }

    onSubmit(user);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-2xl p-0 rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold font-display uppercase tracking-wider">
            {initialData ? "Chỉnh sửa thông tin" : "Thêm thành viên mới"}
          </h3>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="hover:text-white transition-colors disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form
          id="userForm"
          onSubmit={handleSubmit}
          className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Họ và tên <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="hoTen"
                defaultValue={initialData?.hoTen}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Tên đăng nhập <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="tenDangNhap"
                defaultValue={initialData?.tenDangNhap}
                readOnly={!!initialData}
                className={`w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner ${
                  initialData ? "bg-gray-100 text-gray-500" : ""
                }`}
                placeholder="nguyenvana"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={initialData?.email}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Số điện thoại
              </label>
              <input
                name="soDienThoai"
                defaultValue={initialData?.soDienThoai}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="0987654321"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Vai trò
              </label>
              <select
                name="roleId"
                defaultValue={initialData?.roleId ?? 0}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
              >
                <option value={0}>Thành viên (Xem và đóng góp)</option>
                <option value={1}>Quản Trị Viên (Toàn quyền)</option>
                <option value={2}>Thư ký (Biên tập nội dung)</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c] transition-colors disabled:opacity-50"
          >
            Đóng lại
          </button>
          <button
            type="submit"
            form="userForm"
            disabled={isLoading}
            className="px-8 py-2 bg-[#b91c1c] text-white font-bold rounded shadow hover:bg-[#991b1b] flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Check size={18} />
            )}
            {isLoading ? "Đang lưu..." : "Lưu Thông Tin"}
          </button>
        </div>
      </div>
    </div>
  );
};
