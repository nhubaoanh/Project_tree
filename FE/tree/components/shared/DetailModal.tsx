"use client";

import React from "react";
import { X } from "lucide-react";
import { DetailModalProps, DetailField } from "./types";

export function DetailModal({
    isOpen,
    onClose,
    title,
    subtitle,
    badge,
    badgeColor = "white/20",
    avatar,
    avatarFallback,
    gradient = "red-yellow",
    sections,
    footerContent,
    notes,
}: DetailModalProps) {
    if (!isOpen) return null;

    // Gradient class mapping - using full class names for Tailwind
    const getGradientClass = () => {
        switch (gradient) {
            case "red-yellow":
                return "bg-gradient-to-br from-red-900 via-red-700 to-yellow-600";
            case "green-yellow":
                return "bg-gradient-to-br from-green-900 via-green-700 to-yellow-600";
            case "blue-yellow":
                return "bg-gradient-to-br from-blue-900 via-blue-600 to-yellow-600";
            case "purple-yellow":
                return "bg-gradient-to-br from-purple-900 via-purple-600 to-yellow-600";
            default:
                return "bg-gradient-to-br from-red-900 via-red-700 to-yellow-600";
        }
    };

    const InfoRow = ({ icon: Icon, label, value, render, colorClass }: DetailField) => (
        <div className="flex items-start gap-4 py-3 border-b border-yellow-200 last:border-0 hover:bg-yellow-50 px-2 transition-colors rounded-lg">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center flex-shrink-0">
                <Icon size={18} className={colorClass || "text-yellow-700"} />
            </div>
            <div className="flex-1">
                <p className="text-[10px] text-yellow-900 uppercase font-bold tracking-widest">{label}</p>
                <div className={`text-yellow-950 font-semibold text-sm mt-0.5 ${colorClass || ""}`}>
                    {render ? render(value) : value || "Chưa cập nhật"}
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-opacity-10 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl border border-yellow-200 max-h-[90vh] flex flex-col">
                {/* Header Section */}
                <div className={`relative ${getGradientClass()} p-8 text-white flex-shrink-0`}>
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-2.5 hover:bg-opacity-20 rounded-2xl transition-all"
                        aria-label="Đóng"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        {(avatar || avatarFallback) && (
                            <div className="w-28 h-28 rounded-3xl border-4 border-white border-opacity-40 overflow-hidden shadow-xl bg-white bg-opacity-20 flex-shrink-0">
                                {avatar ? (
                                    <img
                                        src={avatar}
                                        alt={title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white from-opacity-10 to-white to-opacity-30">
                                        {avatarFallback}
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="text-center md:text-left flex-1">
                            <h2 className="text-3xl font-black tracking-tight">{title}</h2>
                            {subtitle && <p className="text-white text-opacity-80 text-sm font-medium mt-2">{subtitle}</p>}
                            {/* {badge && (
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3">
                                    <span className="px-4 py-1.5 bg-white bg-opacity-20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white border-opacity-20">
                                        {badge}
                                    </span>
                                </div>
                            )} */}
                        </div>
                    </div>
                </div>

                {/* Content Section - Scrollable */}
                <div className="p-8 bg-gradient-to-b from-yellow-50 to-white overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
                        {sections.map((section, idx) => (
                            <div key={idx} className={idx > 0 && idx % 2 === 0 ? "md:col-span-2" : ""}>
                                <h3 className="text-xs font-black text-red-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <span className="w-6 h-0.5 bg-yellow-600"></span>
                                    {section.title}
                                </h3>
                                {section.fields.map((field, fieldIdx) => (
                                    <InfoRow key={fieldIdx} {...field} />
                                ))}
                            </div>
                        ))}
                    </div>

                    {notes && (
                        <div className="mt-10">
                            <h3 className="text-xs font-black text-red-700 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-6 h-0.5 bg-yellow-600"></span>
                                Ghi chú
                            </h3>
                            <div className="p-6 bg-white border-2 border-yellow-200 rounded-3xl relative overflow-hidden">
                                <p className="text-yellow-950 leading-relaxed whitespace-pre-wrap italic">{notes}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Action Section */}
                <div className="p-6 border-t border-yellow-200 bg-yellow-50 flex justify-center flex-shrink-0">
                    {footerContent || (
                        <button
                            onClick={onClose}
                            className="w-full max-w-xs py-3.5 bg-gradient-to-r from-yellow-800 to-yellow-900 text-white rounded-2xl hover:shadow-lg transition-all font-bold text-sm tracking-widest uppercase"
                        >
                            Đóng thông tin
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
