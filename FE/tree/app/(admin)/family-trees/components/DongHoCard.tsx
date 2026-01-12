"use client";
import React from "react";
import { Users, Calendar, MapPin, GitBranch, UserCog, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { IDongHo } from "@/service/dongho.service";

interface DongHoCardProps {
    dongHo: IDongHo;
    canEdit?: boolean;
    canDelete?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    isDeleting?: boolean;
}

export function DongHoCard({ dongHo, canEdit, canDelete, onEdit, onDelete, isDeleting }: DongHoCardProps) {
    const router = useRouter();
    
    const formatDate = (date: string | Date | null) => {
        if (!date) return "Chưa cập nhật";
        return new Date(date).toLocaleDateString("vi-VN");
    };

    const handleGoToGenealogy = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/genealogy?dongHoId=${dongHo.dongHoId}`);
    };

    const handleGoToMembers = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/family-trees/${dongHo.dongHoId}/members`);
    };

    return (
        <div className="bg-white border-2 border-[#d4af37] rounded-xl p-5 shadow-md hover:shadow-xl transition-all group hover:border-[#b91c1c]">
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
                
                {/* Edit/Delete buttons */}
                {(canEdit || canDelete) && (
                    <div className="flex gap-1">
                        {canEdit && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onEdit?.();
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Chỉnh sửa"
                            >
                                <Edit size={16} />
                            </button>
                        )}
                        {canDelete && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDelete?.();
                                }}
                                disabled={isDeleting}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                title="Xóa"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                )}
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

            {/* Action Buttons */}
            <div className="mt-4 pt-3 border-t border-[#e8dcc8] flex gap-2">
                <button
                    onClick={handleGoToGenealogy}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#b91c1c] text-white rounded-lg hover:bg-[#991b1b] transition-colors text-sm font-semibold"
                >
                    <GitBranch size={16} />
                    Xem Cây
                </button>
                <button
                    onClick={handleGoToMembers}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#2c5282] text-white rounded-lg hover:bg-[#2a4365] transition-colors text-sm font-semibold"
                >
                    <UserCog size={16} />
                    Thành Viên
                </button>
            </div>
        </div>
    );
}
