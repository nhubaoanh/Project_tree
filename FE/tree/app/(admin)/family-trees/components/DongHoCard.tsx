"use client";
import React from "react";
import { Users, Calendar, MapPin, ChevronRight } from "lucide-react";
import { IDongHo } from "@/service/dongho.service";

interface DongHoCardProps {
    dongHo: IDongHo;
    onClick: () => void;
}

export function DongHoCard({ dongHo, onClick }: DongHoCardProps) {
    const formatDate = (date: string | Date | null) => {
        if (!date) return "Chưa cập nhật";
        return new Date(date).toLocaleDateString("vi-VN");
    };

    return (
        <div
            onClick={onClick}
            className="bg-white border-2 border-[#d4af37] rounded-xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer group hover:border-[#b91c1c] hover:scale-[1.02]"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#b91c1c] to-[#d4af37] rounded-full flex items-center justify-center">
                        <Users size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-[#5d4037] group-hover:text-[#b91c1c] transition-colors">
                            {dongHo.tenDongHo}
                        </h3>
                        <p className="text-sm text-[#8b5e3c]">
                            {dongHo.nguoiQuanLy || "Chưa có người quản lý"}
                        </p>
                    </div>
                </div>
                <ChevronRight
                    size={20}
                    className="text-[#d4af37] group-hover:text-[#b91c1c] group-hover:translate-x-1 transition-all"
                />
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-[#6b5b4f]">
                <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#d4af37]" />
                    <span>{dongHo.queQuanGoc || "Chưa cập nhật quê quán"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[#d4af37]" />
                    <span>Thành lập: {formatDate(dongHo.ngayThanhLap)}</span>
                </div>
            </div>

            {/* Footer */}
            {dongHo.ghiChu && (
                <p className="mt-4 pt-3 border-t border-[#e8dcc8] text-sm text-[#8b5e3c] italic line-clamp-2">
                    {dongHo.ghiChu}
                </p>
            )}

            {/* Action hint */}
            <div className="mt-4 pt-3 border-t border-[#e8dcc8]">
                <span className="text-xs text-[#b91c1c] font-semibold uppercase tracking-wide">
                    Nhấn để quản lý →
                </span>
            </div>
        </div>
    );
}
