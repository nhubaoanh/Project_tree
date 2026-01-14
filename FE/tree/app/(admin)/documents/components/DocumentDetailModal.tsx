"use client";

import React from "react";
import { X, FileText, User, Calendar, Tag, BookOpen, MapPin, Download, ExternalLink } from "lucide-react";
import { DetailModal, DetailSection } from "@/components/shared";
import { ITaiLieu } from "@/service/tailieu.service";
import { getImageUrl } from "@/utils/imageUtils";

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

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) {
            return '🖼️';
        } else if (['pdf'].includes(ext || '')) {
            return '📄';
        } else if (['doc', 'docx'].includes(ext || '')) {
            return '📝';
        } else if (['xls', 'xlsx'].includes(ext || '')) {
            return '📊';
        }
        return '📎';
    };

    const getFileName = (path: string) => {
        return path.split('/').pop() || path;
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

    // Footer content for file display
    const footerContent = document.duongDan ? (
        <div className="w-full space-y-3">
            <div className="bg-[#fdf6e3] border border-[#d4af37] rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{getFileIcon(document.duongDan)}</span>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#8b5e3c] uppercase font-bold">File đính kèm</p>
                        <p className="text-sm font-medium text-[#5d4037] truncate">
                            {getFileName(document.duongDan)}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a
                        href={getImageUrl(document.duongDan)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded hover:bg-[#b8962f] transition-colors text-sm font-bold"
                    >
                        <ExternalLink size={14} />
                        Xem file
                    </a>
                    <a
                        href={getImageUrl(document.duongDan)}
                        download
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] transition-colors text-sm font-bold"
                    >
                        <Download size={14} />
                        Tải xuống
                    </a>
                </div>
            </div>
            <button
                onClick={onClose}
                className="w-full py-3.5 bg-gradient-to-r from-yellow-800 to-yellow-900 text-white rounded-2xl hover:shadow-lg transition-all font-bold text-sm tracking-widest uppercase"
            >
                Đóng thông tin
            </button>
        </div>
    ) : undefined;

    return (
      <DetailModal
        isOpen={isOpen}
        onClose={onClose}
        title={document.tenTaiLieu || "Tài liệu"}
        subtitle={document.loaiTaiLieu}
        badge={`Năm ${document.namSangTac || "N/A"}`}
        gradient="red-yellow"
        sections={sections}
        notes={document.moTa}
        footerContent={footerContent}
      />
    );
}
