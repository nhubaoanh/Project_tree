"use client";

import React from "react";
import { Calendar, Clock, MapPin, Tag, AlertTriangle, User, FileText } from "lucide-react";
import { IEvent } from "@/types/event";
import { DetailModal, DetailSection } from "@/components/shared";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: IEvent | null;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!event) return null;

  const formatDate = (date: string | Date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("vi-VN");
  };

  const formatTime = (time: string) => {
    if (!time) return "-";
    return time;
  };

  const getPriorityText = (priority: number) => {
    const priorities = ["", "Thấp", "Trung bình", "Cao"];
    return priorities[priority] || "-";
  };

  const getPriorityColor = (priority: number) => {
    const colors = ["", "text-green-600", "text-yellow-600", "text-red-600"];
    return colors[priority] || "text-gray-600";
  };

  const sections: DetailSection[] = [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: Calendar,
          label: "Tên sự kiện",
          value: event.tenSuKien,
        },
        {
          icon: Tag,
          label: "Loại sự kiện",
          value: event.tenLoaiSuKien || "-",
        },
        {
          icon: AlertTriangle,
          label: "Mức độ ưu tiên",
          value: getPriorityText(event.uuTien),
          colorClass: getPriorityColor(event.uuTien),
        },
      ],
    },
    {
      title: "Thời gian & Địa điểm",
      fields: [
        {
          icon: Calendar,
          label: "Ngày diễn ra",
          value: formatDate(event.ngayDienRa),
        },
        {
          icon: Clock,
          label: "Giờ diễn ra",
          value: formatTime(event.gioDienRa),
        },
        {
          icon: MapPin,
          label: "Địa điểm",
          value: event.diaDiem || "-",
        },
      ],
    },
    {
      title: "Chi tiết",
      fields: [
        {
          icon: FileText,
          label: "Mô tả",
          value: event.moTa || "-",
        },
        {
          icon: User,
          label: "Người tạo",
          value: event.nguoiTaoId || "-",
        },
      ],
    },
  ];

  return (
    <DetailModal
      isOpen={isOpen}
      onClose={onClose}
      title={event.tenSuKien}
      subtitle={`Sự kiện ${event.tenLoaiSuKien || ""}`}
      badge={getPriorityText(event.uuTien)}
      badgeColor={event.uuTien === 3 ? "red" : event.uuTien === 2 ? "yellow" : "green"}
      gradient="red-yellow"
      sections={sections}
      notes={event.moTa}
    />
  );
};