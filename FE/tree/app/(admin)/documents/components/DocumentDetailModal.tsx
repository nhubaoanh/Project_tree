"use client";

import React from "react";
import { X, FileText, User, Calendar, Tag, BookOpen, MapPin } from "lucide-react";
import { DetailModal, DetailSection } from "@/components/shared";
import { ITaiLieu } from "@/service/tailieu.service";

interface DocumentDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    document: ITaiLieu | null;
}

export function DocumentDetailModal({ isOpen, onClose, document }: DocumentDetailModalProps) {
    if (!document) return null;

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
            title: "Thông tin Tài liệu",
            fields: [
                { icon: FileText, label: "Tên tài liệu", value: document.tenTaiLieu },
                { icon: Tag, label: "Loại tài liệu", value: document.loaiTaiLieu },
                { icon: Calendar, label: "Năm sáng tác", value: document.namSangTac },
            ]
        },
        {
            title: "Nguồn gốc & Tác giả",
            fields: [
                { icon: User, label: "Tác giả", value: document.tacGia },
                { icon: MapPin, label: "Nguồn gốc", value: document.nguonGoc },
            ]
        }
    ];

    return (
        <DetailModal
            isOpen={isOpen}
            onClose={onClose}
            title={document.tenTaiLieu || "Tài liệu"}
            subtitle={document.loaiTaiLieu}
            badge={`Năm ${document.namSangTac || "N/A"}`}
            gradient="green-yellow"
            sections={sections}
            notes={document.moTa}
        />
    );
}
