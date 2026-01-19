"use client";

import React from "react";
import { User, Calendar, MapPin, Briefcase, GraduationCap, Home, Heart, Users, Baby, Phone } from "lucide-react";
import { DetailModal, DetailSection } from "@/components/shared";
import { IMember } from "@/types/member";
import { getImageUrl } from "@/utils/imageUtils";

interface MemberDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    member: IMember | null;
    allMembers: IMember[];
    onNavigate: (member: IMember) => void;
}

export const MemberDetailModal: React.FC<MemberDetailModalProps> = ({ 
    isOpen, 
    onClose, 
    member,
    allMembers,
    onNavigate 
}) => {
    if (!member) return null;

  const DEFAULT_AVATAR = "/images/vangoc.jpg";


    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return "Chưa cập nhật";
        return new Date(date).toLocaleDateString("vi-VN", { 
            day: "2-digit", 
            month: "2-digit", 
            year: "numeric" 
        });
    };

    // Tìm thành viên theo ID
    const findMemberById = (id: number | null | undefined): IMember | null => {
        if (!id) return null;
        return allMembers.find(m => m.thanhVienId === id) || null;
    };

    // Tìm tất cả vợ (nếu là nam)
    const findWives = (): IMember[] => {
        if (member.gioiTinh !== 1) return [];
        // Tìm tất cả phụ nữ có chongId trỏ đến người này
        return allMembers.filter(m => m.chongId === member.thanhVienId);
    };

    // Tìm tất cả chồng (nếu là nữ) - trường hợp hiếm nhưng có thể xảy ra
    const findHusbands = (): IMember[] => {
        if (member.gioiTinh !== 0) return [];
        // Tìm tất cả nam có voId trỏ đến người này
        const husbandsPointingToMe = allMembers.filter(m => m.voId === member.thanhVienId);
        // Hoặc chồng được lưu trong chongId
        const mainHusband = findMemberById(member.chongId);
        const allHusbands = mainHusband ? [mainHusband, ...husbandsPointingToMe] : husbandsPointingToMe;
        // Loại bỏ trùng lặp
        return Array.from(new Map(allHusbands.map(h => [h.thanhVienId, h])).values());
    };

    // Tìm con cái
    const findChildren = (): IMember[] => {
        return allMembers.filter(m => 
            m.chaId === member.thanhVienId || m.meId === member.thanhVienId
        );
    };

    const father = findMemberById(member.chaId);
    const mother = findMemberById(member.meId);
    const wives = findWives();
    const husbands = findHusbands();
    const children = findChildren();

    // Render clickable name
    const renderClickableName = (person: IMember | null) => {
        if (!person) return "Chưa cập nhật";
        return (
            <button
                onClick={() => onNavigate(person)}
                className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
            >
                {person.hoTen}
            </button>
        );
    };

    // Render multiple wives
    const renderWives = () => {
        if (wives.length === 0) return "Chưa cập nhật";
        return (
            <div className="flex flex-col gap-1">
                {wives.map((wife, idx) => (
                    <button
                        key={wife.thanhVienId}
                        onClick={() => onNavigate(wife)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors text-left"
                    >
                        {idx + 1}. {wife.hoTen}
                    </button>
                ))}
            </div>
        );
    };

    // Render multiple husbands
    const renderHusbands = () => {
        if (husbands.length === 0) return "Chưa cập nhật";
        return (
            <div className="flex flex-col gap-1">
                {husbands.map((husband, idx) => (
                    <button
                        key={husband.thanhVienId}
                        onClick={() => onNavigate(husband)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors text-left"
                    >
                        {idx + 1}. {husband.hoTen}
                    </button>
                ))}
            </div>
        );
    };

    // Render children list
    const renderChildren = () => {
        if (children.length === 0) return "Chưa có con";
        return (
            <div className="flex flex-col gap-1">
                {children.map((child, idx) => (
                    <button
                        key={child.thanhVienId}
                        onClick={() => onNavigate(child)}
                        className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors text-left"
                    >
                        {idx + 1}. {child.hoTen} ({child.gioiTinh === 1 ? "Nam" : "Nữ"})
                    </button>
                ))}
            </div>
        );
    };

    const sections: DetailSection[] = [
        {
            title: "Thông tin cá nhân",
            fields: [
                { 
                    icon: User, 
                    label: "Giới tính", 
                    value: member.gioiTinh === 1 ? "Nam" : "Nữ",
                    colorClass: member.gioiTinh === 1 ? "text-blue-600" : "text-pink-600"
                },
                { 
                    icon: Users, 
                    label: "Đời thứ", 
                    value: member.doiThuoc || "Chưa xác định" 
                },
                { 
                    icon: Calendar, 
                    label: "Ngày sinh", 
                    value: formatDate(member.ngaySinh) 
                },
                { 
                    icon: Calendar, 
                    label: "Ngày mất", 
                    value: member.ngayMat ? formatDate(member.ngayMat) : "Còn sống",
                    colorClass: member.ngayMat ? "text-gray-600" : "text-green-600"
                },
            ]
        },
        {
            title: "Nơi sinh & Nơi mất",
            fields: [
                { icon: MapPin, label: "Nơi sinh", value: member.noiSinh },
                { icon: MapPin, label: "Nơi mất", value: member.noiMat },
            ]
        },
        {
            title: "Nghề nghiệp & Học vấn",
            fields: [
                { icon: Briefcase, label: "Nghề nghiệp", value: member.ngheNghiep },
                { icon: GraduationCap, label: "Trình độ học vấn", value: member.trinhDoHocVan },
                { icon: Phone, label: "Số điện thoại", value: member.soDienThoai },
                { icon: Home, label: "Địa chỉ hiện tại", value: member.diaChiHienTai },
            ]
        },
        {
            title: "Quan hệ gia đình",
            fields: [
                { 
                    icon: Users, 
                    label: "Cha", 
                    value: father,
                    render: () => renderClickableName(father)
                },
                { 
                    icon: Users, 
                    label: "Mẹ", 
                    value: mother,
                    render: () => renderClickableName(mother)
                },
                ...(member.gioiTinh === 1 
                    ? [{ 
                        icon: Heart, 
                        label: wives.length > 1 ? "Các vợ" : "Vợ", 
                        value: wives,
                        render: () => renderWives()
                    }]
                    : [{ 
                        icon: Heart, 
                        label: husbands.length > 1 ? "Các chồng" : "Chồng", 
                        value: husbands,
                        render: () => renderHusbands()
                    }]
                ),
                { 
                    icon: Baby, 
                    label: `Con cái (${children.length})`, 
                    value: children,
                    render: () => renderChildren()
                },
            ]
        },
    ];

    const avatarPath = member.anhChanDung;
      const avatarUrl = avatarPath ? getImageUrl(avatarPath) : DEFAULT_AVATAR;

    return (
        <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            title={member.hoTen}
            subtitle={`Mã thành viên: #${member.thanhVienId}`}
            gradient="red-yellow"
            avatar={avatarUrl}
            avatarFallback={<User size={48} className="text-white/80" />}
            sections={sections}
            notes={member.tieuSu}
        />
    );
};
