"use client";
import { X, Newspaper, User, Calendar, Eye, Pin, Building } from "lucide-react";
import { ITinTuc } from "@/service/tintuc.service";
import { API_DOWNLOAD } from "@/constant/config";

interface TinTucDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  tinTuc: ITinTuc | null;
}

export function TinTucDetailModal({ isOpen, onClose, tinTuc }: TinTucDetailModalProps) {
  if (!isOpen || !tinTuc) return null;

  const formatDate = (date: string | null | undefined) => {
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
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl border border-[#d4af37]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#d4af37] bg-gradient-to-r from-[#f5e6d3] to-[#e8d4b8]">
          <h2 className="text-xl font-bold text-[#5d4037]">Chi Tiết Tin Tức</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Ảnh đại diện */}
          {tinTuc.anhDaiDien && (
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={`${API_DOWNLOAD}/${tinTuc.anhDaiDien}`}
                alt={tinTuc.tieuDe}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tiêu đề */}
          <div className="text-center pb-4 border-b border-[#e8d4b8]">
            <h3 className="text-2xl font-bold text-[#b91c1c]">{tinTuc.tieuDe}</h3>
            {tinTuc.ghim === 1 && (
              <span className="inline-flex items-center gap-1 mt-2 px-3 py-1 bg-[#d4af37] text-white rounded-full text-sm">
                <Pin size={14} /> Đã ghim
              </span>
            )}
          </div>

          {/* Thông tin meta */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 text-sm text-[#8b5e3c]">
              <User size={16} className="text-[#d4af37]" />
              <span>{tinTuc.tacGia || "Ẩn danh"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8b5e3c]">
              <Calendar size={16} className="text-[#d4af37]" />
              <span>{formatDate(tinTuc.ngayDang)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8b5e3c]">
              <Eye size={16} className="text-[#d4af37]" />
              <span>{tinTuc.luotXem || 0} lượt xem</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#8b5e3c]">
              <Building size={16} className="text-[#d4af37]" />
              <span>{tinTuc.tenDongHo || "-"}</span>
            </div>
          </div>

          {/* Tóm tắt */}
          {tinTuc.tomTat && (
            <div className="p-4 bg-[#faf6f0] rounded-lg border-l-4 border-[#d4af37]">
              <p className="text-sm text-[#8b5e3c] mb-1 font-medium">Tóm tắt</p>
              <p className="text-[#5d4037] italic">{tinTuc.tomTat}</p>
            </div>
          )}

          {/* Nội dung */}
          {tinTuc.noiDung && (
            <div className="prose prose-stone max-w-none">
              <p className="text-sm text-[#8b5e3c] mb-2 font-medium">Nội dung</p>
              <div 
                className="text-[#5d4037] whitespace-pre-wrap leading-relaxed"
                dangerouslySetInnerHTML={{ __html: tinTuc.noiDung }}
              />
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
