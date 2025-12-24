"use client";
import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { IDongHoCreate } from "@/service/dongho.service";

interface DongHoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: IDongHoCreate) => void;
    isLoading?: boolean;
}

export function DongHoModal({ isOpen, onClose, onSave, isLoading }: DongHoModalProps) {
    const [formData, setFormData] = useState<IDongHoCreate>({
        tenDongHo: "",
        queQuanGoc: "",
        ngayThanhLap: "",
        nguoiQuanLy: "",
        ghiChu: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.tenDongHo.trim()) {
            alert("Vui lòng nhập tên dòng họ");
            return;
        }
        onSave(formData);
    };

    const resetForm = () => {
        setFormData({
            tenDongHo: "",
            queQuanGoc: "",
            ngayThanhLap: "",
            nguoiQuanLy: "",
            ghiChu: "",
        });
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg border-2 border-[#d4af37]">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#e8dcc8]">
                    <h3 className="text-xl font-bold text-[#5d4037]">
                        Tạo Cây Gia Phả Mới
                    </h3>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Tên dòng họ */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5d4037] mb-1">
                            Tên dòng họ <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="tenDongHo"
                            value={formData.tenDongHo}
                            onChange={handleChange}
                            placeholder="VD: Dòng họ Nguyễn"
                            className="w-full px-3 py-2 border border-[#d4af37] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                            required
                        />
                    </div>

                    {/* Quê quán */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5d4037] mb-1">
                            Quê quán gốc
                        </label>
                        <input
                            type="text"
                            name="queQuanGoc"
                            value={formData.queQuanGoc}
                            onChange={handleChange}
                            placeholder="VD: Hải Dương"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                        />
                    </div>

                    {/* Ngày thành lập */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5d4037] mb-1">
                            Ngày thành lập
                        </label>
                        <input
                            type="date"
                            name="ngayThanhLap"
                            value={formData.ngayThanhLap}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                        />
                    </div>

                    {/* Người quản lý */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5d4037] mb-1">
                            Người quản lý
                        </label>
                        <input
                            type="text"
                            name="nguoiQuanLy"
                            value={formData.nguoiQuanLy}
                            onChange={handleChange}
                            placeholder="VD: Nguyễn Văn A"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50"
                        />
                    </div>

                    {/* Ghi chú */}
                    <div>
                        <label className="block text-sm font-semibold text-[#5d4037] mb-1">
                            Ghi chú
                        </label>
                        <textarea
                            name="ghiChu"
                            value={formData.ghiChu}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Mô tả về dòng họ..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d4af37]/50 resize-none"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#e8dcc8]">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-[#b91c1c] text-white rounded-lg hover:bg-[#991b1b] transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading && <Loader2 size={16} className="animate-spin" />}
                            {isLoading ? "Đang tạo..." : "Tạo dòng họ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
