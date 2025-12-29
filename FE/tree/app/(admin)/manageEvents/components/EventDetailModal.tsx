"use client";
import { X, Calendar, Clock, MapPin, User, Tag, AlertCircle } from "lucide-react";
import { IEvent } from "@/types/event";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: IEvent | null;
}

const TRANG_THAI = ["Chưa diễn ra", "Đang diễn ra", "Đã kết thúc", "Đã hủy"];
const UU_TIEN = ["Thấp", "Trung bình", "Cao", "Khẩn cấp"];

export function EventDetailModal({ isOpen, onClose, event }: EventDetailModalProps) {
  if (!isOpen || !event) return null;

  const formatDate = (date: Date | string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("vi-VN", {
      weekday: "long",
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
          <h2 className="text-xl font-bold text-[#5d4037]">Chi Tiết Sự Kiện</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Tên sự kiện */}
          <div className="text-center pb-4 border-b border-[#e8d4b8]">
            <h3 className="text-2xl font-bold text-[#b91c1c]">{event.tenSuKien}</h3>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
              event.trangThai === 0 ? "bg-yellow-100 text-yellow-700" :
              event.trangThai === 1 ? "bg-green-100 text-green-700" :
              event.trangThai === 2 ? "bg-gray-100 text-gray-700" :
              "bg-red-100 text-red-700"
            }`}>
              {TRANG_THAI[event.trangThai] || "Không xác định"}
            </span>
          </div>

          {/* Thông tin chi tiết */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Calendar className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Ngày diễn ra</p>
                <p className="font-medium text-[#5d4037]">{formatDate(event.ngayDienRa)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Clock className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Giờ diễn ra</p>
                <p className="font-medium text-[#5d4037]">{event.gioDienRa || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <MapPin className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Địa điểm</p>
                <p className="font-medium text-[#5d4037]">{event.diaDiem || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <Tag className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Loại sự kiện</p>
                <p className="font-medium text-[#5d4037]">{event.tenLoaiSuKien || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <User className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Thành viên liên quan</p>
                <p className="font-medium text-[#5d4037]">{event.hoTen || "-"}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-[#faf6f0] rounded-lg">
              <AlertCircle className="text-[#d4af37] mt-1" size={20} />
              <div>
                <p className="text-sm text-[#8b5e3c]">Mức độ ưu tiên</p>
                <p className={`font-medium ${
                  event.uuTien === 3 ? "text-red-600" :
                  event.uuTien === 2 ? "text-orange-600" :
                  event.uuTien === 1 ? "text-yellow-600" :
                  "text-green-600"
                }`}>
                  {UU_TIEN[event.uuTien] || "Thấp"}
                </p>
              </div>
            </div>
          </div>

          {/* Mô tả */}
          {event.moTa && (
            <div className="p-4 bg-[#faf6f0] rounded-lg">
              <p className="text-sm text-[#8b5e3c] mb-2">Mô tả</p>
              <p className="text-[#5d4037] whitespace-pre-wrap">{event.moTa}</p>
            </div>
          )}
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
