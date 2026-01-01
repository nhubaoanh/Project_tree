"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Users, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/service/useToas";
import {
    getAllDongHo,
    createDongHo,
    getDongHoById,
    IDongHo,
    IDongHoCreate,
} from "@/service/dongho.service";
import { DongHoModal } from "./components/DongHoModal";
import { DongHoCard } from "./components/DongHoCard";
import storage from "@/utils/storage";

export default function FamilyTreesPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { showSuccess, showError } = useToast();

    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Lấy thông tin user
    const [user, setUser] = useState<any>(null);
    const [isReady, setIsReady] = useState(false);
    const isAdmin = user?.roleCode === "sa";

    useEffect(() => {
        const userData = storage.getUser();
        setUser(userData);
        setIsReady(true);
    }, []);

    // Fetch danh sách dòng họ - Admin fetch tất cả
    const allDongHoQuery = useQuery({
        queryKey: ["dongho-list"],
        queryFn: getAllDongHo,
        enabled: isReady && isAdmin,
    });

    // Fetch dòng họ của user - Non-Admin fetch dòng họ của mình
    const myDongHoQuery = useQuery({
        queryKey: ["my-dongho", user?.dongHoId],
        queryFn: () => getDongHoById(user?.dongHoId),
        enabled: isReady && !isAdmin && !!user?.dongHoId,
    });

    // Danh sách dòng họ hiển thị
    const dongHoList: IDongHo[] = isAdmin 
        ? (allDongHoQuery.data?.data || [])
        : (myDongHoQuery.data?.data ? [myDongHoQuery.data.data] : []);

    const isLoading = isAdmin ? allDongHoQuery.isLoading : myDongHoQuery.isLoading;
    const isError = isAdmin ? allDongHoQuery.isError : myDongHoQuery.isError;

    // Filter theo search (chỉ Admin mới có search)
    const filteredList = isAdmin 
        ? dongHoList.filter((item) => item.tenDongHo?.toLowerCase().includes(searchTerm.toLowerCase()))
        : dongHoList;

    // Mutation tạo mới (chỉ Admin)
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

    // Chưa ready
    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" />
            </div>
        );
    }

    // Non-Admin không có dongHoId
    if (!isAdmin && !user?.dongHoId) {
        return (
            <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
                <div className="text-center py-16">
                    <Users size={64} className="mx-auto text-[#d4af37] mb-4 opacity-50" />
                    <h2 className="text-2xl font-bold text-[#b91c1c] mb-2">Chưa được gán dòng họ</h2>
                    <p className="text-[#8b5e3c] text-lg">
                        Tài khoản của bạn chưa được gán vào dòng họ nào.
                    </p>
                    <p className="text-[#8b5e3c] text-sm mt-2">
                        Vui lòng liên hệ Admin để được hỗ trợ.
                    </p>
                </div>
            </div>
        );
    }

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
                    onClick={() => isAdmin ? allDongHoQuery.refetch() : myDongHoQuery.refetch()}
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
                        {isAdmin ? "Danh Sách Gia Phả" : "Gia Phả Của Tôi"}
                    </h2>
                    <p className="text-[#8b5e3c] italic text-sm">
                        {isAdmin 
                            ? "Quản lý các dòng họ và cây gia phả" 
                            : "Quản lý cây gia phả dòng họ của bạn"}
                    </p>
                </div>

                {/* Chỉ Admin mới có nút tạo mới */}
                {isAdmin && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold"
                    >
                        <Plus size={16} />
                        <span>Tạo Cây Mới</span>
                    </button>
                )}
            </div>

            {/* Search - Chỉ Admin mới có */}
            {isAdmin && (
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
            )}

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
                        />
                    ))}
                </div>
            )}

            {/* Modal tạo mới - Chỉ Admin */}
            {isAdmin && (
                <DongHoModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleCreateDongHo}
                    isLoading={createMutation.isPending}
                />
            )}
        </div>
    );
}
