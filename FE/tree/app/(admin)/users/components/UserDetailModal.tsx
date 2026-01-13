"use client";

import React from "react";
import { User, Mail, Phone, Shield, Calendar, MapPin, Briefcase } from "lucide-react";
import { DetailModal, DetailSection } from "@/components/shared";
import { INguoiDung } from "@/service/nguoidung.service";
import { API_DOWNLOAD } from "@/service/api";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: INguoiDung | null;
}

export function UserDetailModal({ isOpen, onClose, user }: UserDetailModalProps) {
  if (!user) return null;

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "Chưa cập nhật";
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
  };

  const sections: DetailSection[] = [
    {
      title: "Thông tin cá nhân",
      fields: [
        { icon: User, label: "Họ và tên", value: user.hoTen },
        { icon: Mail, label: "Email", value: user.email },
        { icon: Phone, label: "Số điện thoại", value: user.soDienThoai },
      ]
    },
    {
      title: "Thông tin hệ thống",
      fields: [
        { icon: Shield, label: "Vai trò", value: user.vaiTro },
        { icon: Calendar, label: "Ngày tạo", value: formatDate(user.ngayTao) },
        { icon: Briefcase, label: "Trạng thái", value: user.trangThai || "Hoạt động" },
      ]
    }
  ];

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title={user.hoTen || "Người dùng"}
      subtitle={user.email}
      badge={user.vaiTro}
      gradient="red-yellow"
      avatar={user.anhDaiDien ? `${API_DOWNLOAD}/${user.anhDaiDien}` : undefined}
      avatarFallback={<User size={48} className="text-white/80" />}
      sections={sections}
    />
  );
}
