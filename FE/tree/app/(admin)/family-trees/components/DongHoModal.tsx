"use client";
import React, { useState, useEffect } from "react";
import { X, Loader2, Check } from "lucide-react";
import { IDongHoCreate, IDongHo } from "@/service/dongho.service";
import { FormRules, validateForm, validateField } from "@/lib/validator";
import { useToast } from "@/service/useToas";

// ==================== VALIDATION RULES ====================
const dongHoRules: FormRules = {
    tenDongHo: {
        label: "Tên dòng họ",
        rules: ["required", { min: 2 }, { max: 100 }, "noNumber"],
    },
    queQuanGoc: {
        label: "Quê quán gốc",
        rules: [{ max: 200 }],
    },
    ngayThanhLap: {
        label: "Ngày thành lập",
        rules: ["date"],
    },
    nguoiQuanLy: {
        label: "Người quản lý",
        rules: [{ max: 100 }, "fullName"],
    },
    ghiChu: {
        label: "Ghi chú",
        rules: [{ max: 500 }],
    },
};

interface DongHoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: IDongHoCreate) => void;
    isLoading?: boolean;
    editData?: IDongHo | null;
    mode?: "create" | "edit";
}

export function DongHoModal({ isOpen, onClose, onSave, isLoading, editData, mode = "create" }: DongHoModalProps) {
    const { showError } = useToast();
    
    // Form state
    const [formData, setFormData] = useState<IDongHoCreate>({
        tenDongHo: "",
        queQuanGoc: "",
        ngayThanhLap: "",
        nguoiQuanLy: "",
        ghiChu: "",
    });
    const [errors, setErrors] = useState<Record<string, string | null>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Reset form khi modal mở
    useEffect(() => {
        if (isOpen) {
            if (mode === "edit" && editData) {
                // Format date for input field
                const formatDateForInput = (date: string | Date | null) => {
                    if (!date) return "";
                    const d = new Date(date);
                    return d.toISOString().split('T')[0];
                };
                
                setFormData({
                    tenDongHo: editData.tenDongHo || "",
                    queQuanGoc: editData.queQuanGoc || "",
                    ngayThanhLap: formatDateForInput(editData.ngayThanhLap) || "",
                    nguoiQuanLy: editData.nguoiQuanLy || "",
                    ghiChu: editData.ghiChu || "",
                });
            } else {
                setFormData({
                    tenDongHo: "",
                    queQuanGoc: "",
                    ngayThanhLap: "",
                    nguoiQuanLy: "",
                    ghiChu: "",
                });
            }
            setErrors({});
            setTouched({});
        }
    }, [isOpen, editData, mode]);

    // Handle change với validation
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let newValue = value;
        
        // Chặn nhập số vào tên dòng họ và người quản lý
        if (name === "tenDongHo" || name === "nguoiQuanLy") {
            newValue = value.replace(/\d/g, "");
        }
        
        setFormData((prev) => ({ ...prev, [name]: newValue }));
        
        // Validate lại nếu đã touched
        if (touched[name]) {
            const error = validateField(name, newValue, dongHoRules, formData);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    // Handle blur - validate field
    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        const error = validateField(name, value, dongHoRules, formData);
        setErrors((prev) => ({ ...prev, [name]: error }));
    };

    // Submit form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate toàn bộ form
        const { isValid, errors: formErrors } = validateForm(formData, dongHoRules);
        setErrors(formErrors);
        setTouched(Object.keys(dongHoRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
        
        if (!isValid) {
            showError("Vui lòng kiểm tra lại thông tin!");
            // Scroll đến field lỗi đầu tiên
            const firstErrorField = Object.keys(formErrors).find((k) => formErrors[k]);
            if (firstErrorField) {
                document.querySelector(`[name="${firstErrorField}"]`)?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
            return;
        }
        
        onSave(formData);
    };

    const handleClose = () => {
        setFormData({
            tenDongHo: "",
            queQuanGoc: "",
            ngayThanhLap: "",
            nguoiQuanLy: "",
            ghiChu: "",
        });
        setErrors({});
        setTouched({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-[#fffdf5] rounded-xl shadow-2xl w-full max-w-lg border-2 border-[#d4af37] overflow-hidden">
                {/* Header */}
                <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex items-center justify-between">
                    <h3 className="text-xl font-bold uppercase tracking-wider">
                        {mode === "edit" ? "Chỉnh Sửa Dòng Họ" : "Tạo Cây Gia Phả Mới"}
                    </h3>
                    <button
                        onClick={handleClose}
                        disabled={isLoading}
                        className="hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Tên dòng họ */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#8b5e3c] uppercase">
                            Tên dòng họ <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="tenDongHo"
                            value={formData.tenDongHo}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="VD: Dòng họ Nguyễn"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none transition-colors ${
                                touched.tenDongHo && errors.tenDongHo
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/50"
                            }`}
                        />
                        {touched.tenDongHo && errors.tenDongHo && (
                            <p className="text-red-500 text-xs">{errors.tenDongHo}</p>
                        )}
                    </div>

                    {/* Quê quán */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#8b5e3c] uppercase">
                            Quê quán gốc
                        </label>
                        <input
                            type="text"
                            name="queQuanGoc"
                            value={formData.queQuanGoc}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="VD: Hải Dương"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none transition-colors ${
                                touched.queQuanGoc && errors.queQuanGoc
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-[#d4af37]/50"
                            }`}
                        />
                        {touched.queQuanGoc && errors.queQuanGoc && (
                            <p className="text-red-500 text-xs">{errors.queQuanGoc}</p>
                        )}
                    </div>

                    {/* Ngày thành lập */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#8b5e3c] uppercase">
                            Ngày thành lập
                        </label>
                        <input
                            type="date"
                            name="ngayThanhLap"
                            value={formData.ngayThanhLap}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none transition-colors ${
                                touched.ngayThanhLap && errors.ngayThanhLap
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-[#d4af37]/50"
                            }`}
                        />
                        {touched.ngayThanhLap && errors.ngayThanhLap && (
                            <p className="text-red-500 text-xs">{errors.ngayThanhLap}</p>
                        )}
                    </div>

                    {/* Người quản lý */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#8b5e3c] uppercase">
                            Người quản lý
                        </label>
                        <input
                            type="text"
                            name="nguoiQuanLy"
                            value={formData.nguoiQuanLy}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="VD: Nguyễn Văn A"
                            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none transition-colors ${
                                touched.nguoiQuanLy && errors.nguoiQuanLy
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-[#d4af37]/50"
                            }`}
                        />
                        {touched.nguoiQuanLy && errors.nguoiQuanLy && (
                            <p className="text-red-500 text-xs">{errors.nguoiQuanLy}</p>
                        )}
                    </div>

                    {/* Ghi chú */}
                    <div className="space-y-1">
                        <label className="block text-sm font-bold text-[#8b5e3c] uppercase">
                            Ghi chú
                        </label>
                        <textarea
                            name="ghiChu"
                            value={formData.ghiChu}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            rows={3}
                            placeholder="Mô tả về dòng họ..."
                            className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none resize-none transition-colors ${
                                touched.ghiChu && errors.ghiChu
                                    ? "border-red-500 focus:border-red-500"
                                    : "border-gray-300 focus:ring-2 focus:ring-[#d4af37]/50"
                            }`}
                        />
                        {touched.ghiChu && errors.ghiChu && (
                            <p className="text-red-500 text-xs">{errors.ghiChu}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-[#e8dcc8]">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isLoading}
                            className="px-5 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c] transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-[#b91c1c] text-white font-bold rounded-lg hover:bg-[#991b1b] transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                            {isLoading ? (
                                <Loader2 size={18} className="animate-spin" />
                            ) : (
                                <Check size={18} />
                            )}
                            {isLoading ? "Đang xử lý..." : mode === "edit" ? "Cập nhật" : "Tạo dòng họ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
