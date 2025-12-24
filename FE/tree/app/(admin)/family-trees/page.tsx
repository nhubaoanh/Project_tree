"use client";
import React, { useState } from "react";
import { Plus, Search, Users, Calendar, MapPin, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/service/useToas";
import {
    getAllDongHo,
    createDongHo,
    IDongHo,
    IDongHoCreate,
} from "@/service/dongho.service";
import { DongHoModal } from "./components/DongHoModal";
import { DongHoCard } from "./components/DongHoCard";

export default function FamilyTreesPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch danh sách dòng họ
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["dongho-list"],
        queryFn: getAllDongHo,
    });

    const dongHoList: IDongHo[] = data?.data || [];

    console.log("dongho", dongHoList);

    // Filter theo search
    const filteredList = dongHoList.filter((item) =>
        item.tenDongHo?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Mutation tạo mới
    const createMutation = useMutation({
        mutationFn: createDongHo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dongho-list"] });
            showSuccess("Tạo dòng họ thành công!");
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            showError(error.message || "Có lỗi xảy ra khi tạo dòng họ.");
        },
    });

    const handleCreateDongHo = (data: IDongHoCreate) => {
        createMutation.mutate(data);
    };

    const handleCardClick = (dongHoId: string) => {
        // Lưu dongHoId vào localStorage để các trang khác sử dụng
        localStorage.setItem("currentDongHoId", dongHoId);
        // Navigate đến trang quản lý thành viên của dòng họ đó
        router.push(`/family-trees/${dongHoId}/members`);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 mb-4 text-red-600 bg-red-100 rounded flex justify-between items-center">
                <span>Lỗi khi tải dữ liệu. Vui lòng thử lại sau.</span>
                <button
                    onClick={() => refetch()}
                    className="px-3 py-1 bg-[#d4af37] text-white rounded hover:bg-[#b8962a]"
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
                <div>
                    <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
                        Danh Sách Gia Phả
                    </h2>
                    <p className="text-[#8b5e3c] italic text-sm">
                        Quản lý các dòng họ và cây gia phả của bạn
                    </p>
                </div>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold"
                >
                    <Plus size={16} />
                    <span>Tạo Cây Mới</span>
                </button>
            </div>

            {/* Search */}
            <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2">
                <div className="p-2 text-stone-400">
                    <Search size={20} />
                </div>
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Tìm kiếm dòng họ..."
                    className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400"
                />
            </div>

            {/* Grid Cards */}
            {filteredList.length === 0 ? (
                <div className="text-center py-16">
                    <Users size={64} className="mx-auto text-[#d4af37] mb-4 opacity-50" />
                    <p className="text-[#8b5e3c] text-lg">
                        {searchTerm
                            ? "Không tìm thấy dòng họ nào"
                            : "Chưa có dòng họ nào. Hãy tạo cây gia phả đầu tiên!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredList.map((dongHo) => (
                        <DongHoCard
                            key={dongHo.dongHoId}
                            dongHo={dongHo}
                            onClick={() => handleCardClick(dongHo.dongHoId)}
                        />
                    ))}
                </div>
            )}

            {/* Modal tạo mới */}
            <DongHoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleCreateDongHo}
                isLoading={createMutation.isPending}
            />
        </div>
    );
}
