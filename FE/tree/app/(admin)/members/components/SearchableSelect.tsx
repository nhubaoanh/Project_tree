"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { IMember } from "@/types/member";

interface SearchableSelectProps {
    label: string;
    value: number | null | undefined;
    onChange: (value: number | null) => void;
    options: IMember[];
    placeholder?: string;
    filterGender?: 0 | 1; // 0 = nữ, 1 = nam
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
    label,
    value,
    onChange,
    options,
    placeholder = "Chọn...",
    filterGender
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Filter options
    const filteredOptions = options.filter(option => {
        const matchesSearch = option.hoTen.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = filterGender === undefined || option.gioiTinh === filterGender;
        return matchesSearch && matchesGender;
    });

    // Get selected option
    const selectedOption = options.find(opt => opt.thanhVienId === value);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <label className="block text-sm font-bold text-[#8b5e3c] uppercase mb-2">{label}</label>
            
            {/* Selected value display */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded shadow-inner focus:outline-none focus:border-[#b91c1c] cursor-pointer flex items-center justify-between"
            >
                <span className={selectedOption ? "text-[#5d4037]" : "text-gray-400"}>
                    {selectedOption ? `${selectedOption.hoTen} (ID: ${selectedOption.thanhVienId})` : placeholder}
                </span>
                <ChevronDown size={16} className={`transition-transform text-[#8b5e3c] ${isOpen ? "rotate-180" : ""}`} />
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-[#d4af37] rounded shadow-lg max-h-64 overflow-hidden">
                    {/* Search box */}
                    <div className="p-2 border-b border-[#d4af37]/30">
                        <div className="flex items-center gap-2 px-2 py-1 border border-[#d4af37]/50 rounded">
                            <Search size={14} className="text-[#8b5e3c]" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Tìm kiếm..."
                                className="flex-1 outline-none text-sm"
                                onClick={(e) => e.stopPropagation()}
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm("")} className="text-gray-400 hover:text-[#b91c1c]">
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Options list */}
                    <div className="overflow-y-auto max-h-48">
                        {/* Clear selection option */}
                        <div
                            onClick={() => {
                                onChange(null);
                                setIsOpen(false);
                                setSearchTerm("");
                            }}
                            className="px-3 py-2 hover:bg-[#fdf6e3] cursor-pointer text-sm text-gray-500 italic border-b border-[#d4af37]/20"
                        >
                            -- Không chọn --
                        </div>

                        {filteredOptions.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-400 italic">Không tìm thấy</div>
                        ) : (
                            filteredOptions.map(option => (
                                <div
                                    key={option.thanhVienId}
                                    onClick={() => {
                                        onChange(option.thanhVienId);
                                        setIsOpen(false);
                                        setSearchTerm("");
                                    }}
                                    className={`px-3 py-2 hover:bg-[#fdf6e3] cursor-pointer text-sm border-b border-[#d4af37]/10 ${
                                        value === option.thanhVienId ? "bg-[#fdf6e3] font-semibold text-[#b91c1c]" : "text-[#5d4037]"
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option.hoTen}</span>
                                        <span className="text-xs text-[#8b5e3c]">
                                            ID: {option.thanhVienId} | Đời {option.doiThuoc}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
