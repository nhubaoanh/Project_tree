"use client";

import React from "react";
import { Newspaper, User, Calendar, Eye, Pin, FileText, Clock } from "lucide-react";
import { DetailModal, DetailSection } from "@/components/shared";
import { ITinTuc } from "@/service/tintuc.service";

interface NewsDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    news: ITinTuc | null;
}

export function NewsDetailModal({ isOpen, onClose, news }: NewsDetailModalProps) {
    if (!news) return null;

    const formatDate = (date: Date | string | null | undefined) => {
        if (!date) return "Chưa cập nhật";
        return new Date(date).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const sections: DetailSection[] = [
        {
            title: "Thông tin Tin tức",
            fields: [
                { icon: Newspaper, label: "Tiêu đề", value: news.tieuDe },
                { icon: User, label: "Tác giả", value: news.tacGia },
                { icon: Calendar, label: "Ngày đăng", value: formatDate(news.ngayDang) },
            ]
        },
        {
            title: "Thống kê",
            fields: [
                {
                    icon: Eye,
                    label: "Lượt xem",
                    value: news.luotXem || 0,
                    colorClass: "text-blue-600"
                },
                {
                    icon: Pin,
                    label: "Trạng thái ghim",
                    value: news.ghim ? "Đã ghim" : "Chưa ghim",
                    colorClass: news.ghim ? "text-yellow-600" : "text-gray-500"
                },
            ]
        }
    ];

    return (
        <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            title={news.tieuDe || "Tin tức"}
            subtitle={news.tacGia}
            badge={news.ghim ? "📌 Đã ghim" : undefined}
            badgeColor="yellow-500/30"
            gradient="blue-yellow"
            sections={sections}
            notes={news.tomTat ? `Tóm tắt: ${news.tomTat}\n\n${news.noiDung || ""}` : news.noiDung}
        />
    );
}
