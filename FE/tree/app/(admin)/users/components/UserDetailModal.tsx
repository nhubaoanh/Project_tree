"use client";

import React from "react";
import { User, Mail, Phone, Shield, Calendar, MapPin, Briefcase } from "lucide-react";
import { DetailModal, DetailSection } from "@/components/shared";
import { IUser } from "@/types/user";
import { API_DOWNLOAD } from "@/constant/config";

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUser | null;
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
        { icon: User, label: "Họ và tên", value: user.full_name },
        { icon: Mail, label: "Email", value: user.email },
        { icon: Phone, label: "Số điện thoại", value: user.phone },
      ]
    },
    {
      title: "Thông tin hệ thống",
      fields: [
        { icon: Shield, label: "Vai trò", value: user.roleCode },
        { icon: Calendar, label: "Ngày tạo", value: formatDate(user.ngayTao) },
        // { icon: Briefcase, label: "Trạng thái", value: user. || "Hoạt động" },
      ]
    }
  ];

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title={user.full_name || "Người dùng"}
      subtitle={user.email}
      badge={user.roleCode}
      gradient="red-yellow"
      avatar={user.anhDaiDien ? `${API_DOWNLOAD}/${user.anhDaiDien}` : undefined}
      avatarFallback={<User size={48} className="text-white/80" />}
      sections={sections}
    />
  );
}
