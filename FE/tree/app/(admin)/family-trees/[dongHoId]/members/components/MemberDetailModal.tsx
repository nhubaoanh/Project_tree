"use client";

import React from "react";
import { X, User, Calendar, MapPin, Briefcase, GraduationCap, Home, Heart, Users } from "lucide-react";
import { IMember } from "@/types/member";
import { API_DOWNLOAD } from "@/constant/config";

interface MemberDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: IMember | null;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ isOpen, onClose, member }) => {
    if (!isOpen || !member) return null;

    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return "Chưa cập nhật";
        return new Date(date).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
    };

    const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string | number | null | undefined }) => (
        <div className="flex items-start gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-[#fdf6e3] flex items-center justify-center flex-shrink-0">
                <Icon size={16} className="text-[#d4af37]" />
            </div>
            <div className="flex-1">
                <p className="text-xs text-[#8b5e3c] uppercase tracking-wide">{label}</p>
                <p className="text-[#5d4037] font-medium">{value || "Chưa cập nhật"}</p>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl">
                {/* Header với ảnh */}
                <div className="relative bg-gradient-to-br from-[#b91c1c] to-[#d4af37] p-6 text-white">
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="w-24 h-24 rounded-full border-4 border-white/30 overflow-hidden bg-white/20 flex-shrink-0">
                            {member.anhChanDung ? (
                                <img src={`${API_DOWNLOAD}/${member.anhChanDung}`} alt={member.hoTen} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User size={40} className="text-white/70" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">{member.hoTen}</h2>
                            <p className="text-white/80 flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded text-xs font-semibold ${member.gioiTinh === 1 ? "bg-blue-500" : "bg-pink-500"}`}>
                                    {member.gioiTinh === 1 ? "Nam" : "Nữ"}
                                </span>
                                <span>• Đời thứ {member.doiThuoc || "?"}</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Thông tin cá nhân */}
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-[#b91c1c] uppercase tracking-wide mb-3 border-b border-[#e8dcc8] pb-2">
                                Thông tin cá nhân
                            </h3>
                            <InfoRow icon={Calendar} label="Ngày sinh" value={formatDate(member.ngaySinh)} />
                            <InfoRow icon={Calendar} label="Ngày mất" value={member.ngayMat ? formatDate(member.ngayMat) : "Còn sống"} />
                            <InfoRow icon={MapPin} label="Nơi sinh" value={member.noiSinh} />
                            <InfoRow icon={MapPin} label="Nơi mất" value={member.noiMat} />
                        </div>

                        {/* Nghề nghiệp & Học vấn */}
                        <div className="space-y-1">
                            <h3 className="text-sm font-bold text-[#b91c1c] uppercase tracking-wide mb-3 border-b border-[#e8dcc8] pb-2">
                                Nghề nghiệp & Học vấn
                            </h3>
                            <InfoRow icon={Briefcase} label="Nghề nghiệp" value={member.ngheNghiep} />
                            <InfoRow icon={GraduationCap} label="Trình độ học vấn" value={member.trinhDoHocVan} />
                            <InfoRow icon={Home} label="Địa chỉ hiện tại" value={member.diaChiHienTai} />
                        </div>
                    </div>

                    {/* Quan hệ gia đình */}
                    <div className="mt-6">
                        <h3 className="text-sm font-bold text-[#b91c1c] uppercase tracking-wide mb-3 border-b border-[#e8dcc8] pb-2">
                            Quan hệ gia đình
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="bg-[#fdf6e3] rounded-lg p-3 text-center">
                                <Users size={20} className="mx-auto text-[#d4af37] mb-1" />
                                <p className="text-xs text-[#8b5e3c]">Cha</p>
                                <p className="text-sm font-semibold text-[#5d4037]">{(member as any).tenCha || `ID: ${member.chaId || "-"}`}</p>
                            </div>
                            <div className="bg-[#fdf6e3] rounded-lg p-3 text-center">
                                <Users size={20} className="mx-auto text-[#d4af37] mb-1" />
                                <p className="text-xs text-[#8b5e3c]">Mẹ</p>
                                <p className="text-sm font-semibold text-[#5d4037]">{(member as any).tenMe || `ID: ${member.meId || "-"}`}</p>
                            </div>
                            <div className="bg-[#fdf6e3] rounded-lg p-3 text-center">
                                <Heart size={20} className="mx-auto text-[#d4af37] mb-1" />
                                <p className="text-xs text-[#8b5e3c]">{member.gioiTinh === 1 ? "Vợ" : "Chồng"}</p>
                                <p className="text-sm font-semibold text-[#5d4037]">
                                    {member.gioiTinh === 1 
                                        ? ((member as any).tenVo || `ID: ${member.voId || "-"}`)
                                        : ((member as any).tenChong || `ID: ${member.chongId || "-"}`)}
                                </p>
                            </div>
                            <div className="bg-[#fdf6e3] rounded-lg p-3 text-center">
                                <User size={20} className="mx-auto text-[#d4af37] mb-1" />
                                <p className="text-xs text-[#8b5e3c]">Mã thành viên</p>
                                <p className="text-sm font-semibold text-[#5d4037]">#{member.thanhVienId}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tiểu sử */}
                    {member.tieuSu && (
                        <div className="mt-6">
                            <h3 className="text-sm font-bold text-[#b91c1c] uppercase tracking-wide mb-3 border-b border-[#e8dcc8] pb-2">
                                Tiểu sử
                            </h3>
                            <p className="text-[#5d4037] leading-relaxed bg-[#fdf6e3] p-4 rounded-lg italic">
                                {member.tieuSu}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-[#e8dcc8] bg-[#fdf6e3]">
                    <button onClick={onClose} className="w-full py-2 bg-[#5d4037] text-white rounded-lg hover:bg-[#4a3228] transition-colors font-semibold">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};
