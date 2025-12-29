"use client";
import { X, User, Mail, Phone, Shield, Calendar, Building } from "lucide-react";
import { IUser } from "@/types/user";
import { API_DOWNLOAD } from "@/constant/config";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
}

const ROLE_MAP: Record<string, string> = {
  "ADMIN": "Quản trị viên",
  "USER": "Người dùng",
  "MANAGER": "Quản lý",
};

export function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl border border-[#d4af37]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#d4af37] bg-gradient-to-r from-[#f5e6d3] to-[#e8d4b8]">
          <h2 className="text-xl font-bold text-[#5d4037]">Chi Tiết Người Dùng</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Avatar và tên */}
          <div className="flex flex-col items-center pb-4 border-b border-[#e8d4b8]">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#d4af37] mb-3">
              {user.anhDaiDien ? (
                <img
                  src={`${API_DOWNLOAD}/${user.anhDaiDien}`}
                  alt={user.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#d4af37] to-[#b8962f] flex items-center justify-center">
                  <User size={40} className="text-white" />
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold text-[#b91c1c]">{user.full_name}</h3>
            <p className="text-[#8b5e3c]">@{user.tenDangNhap}</p>
          </div>

          {/* Thông tin chi tiết */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Mail className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Email</p>
                <p className="font-medium text-[#5d4037]">{user.email || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Phone className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Số điện thoại</p>
                <p className="font-medium text-[#5d4037]">{user.phone || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Shield className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Vai trò</p>
                <p className="font-medium text-[#5d4037]">
                  {ROLE_MAP[user.roleCode] || user.roleCode || "-"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Building className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Dòng họ</p>
                <p className="font-medium text-[#5d4037]">{user.tenDongHo || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg md:col-span-2">
              <Calendar className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Ngày tạo tài khoản</p>
                <p className="font-medium text-[#5d4037]">{formatDate(user.ngayTao)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t border-[#d4af37]">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#d4af37] text-white rounded hover:bg-[#b8962f] transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
