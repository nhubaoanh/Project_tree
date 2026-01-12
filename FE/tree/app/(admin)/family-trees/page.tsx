"use client";
import { useState, useEffect } from "react";
import { Plus, Search, Users, Loader2, X, Trash2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useToast } from "@/service/useToas";
import {
    getAllDongHo,
    createDongHo,
    updateDongHo,
    deleteDongHo,
    getDongHoById,
    IDongHo,
    IDongHoCreate,
    IDongHoUpdate,
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
    const [editingDongHo, setEditingDongHo] = useState<IDongHo | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [dongHoToDelete, setDongHoToDelete] = useState<{ id: string; name: string } | null>(null);
    
    // Lấy thông tin user
    const [user, setUser] = useState<any>(null);
    const [isReady, setIsReady] = useState(false);
    const isThudo = user?.roleCode === "thudo"; // Thudo là quyền cao nhất

    useEffect(() => {
        const userData = storage.getUser();
        setUser(userData);
        setIsReady(true);
    }, []);

    // Fetch dòng họ của user - Tất cả user (bao gồm thudo) chỉ fetch dòng họ của mình
    const myDongHoQuery = useQuery({
        queryKey: ["my-dongho", user?.dongHoId],
        queryFn: () => getDongHoById(user?.dongHoId),
        enabled: isReady && !!user?.dongHoId,
    });

    // Danh sách dòng họ hiển thị - Tất cả user chỉ thấy dòng họ của mình
    const dongHoList: IDongHo[] = myDongHoQuery.data?.data ? [myDongHoQuery.data.data] : [];

    const isLoading = myDongHoQuery.isLoading;
    const isError = myDongHoQuery.isError;
    
    // Chỉ thudo mới được tạo dòng họ mới (không giới hạn)
    const canCreateNew = isThudo;

    // Filter theo search - Bỏ search vì chỉ có 1 dòng họ
    const filteredList = dongHoList;

    // Mutation tạo mới (Chỉ Thudo)
    const createMutation = useMutation({
        mutationFn: (data: IDongHoCreate) => {
            // Check trùng tên trước khi tạo
            const existingNames = dongHoList.map(d => d.tenDongHo?.toLowerCase());
            if (existingNames.includes(data.tenDongHo.toLowerCase())) {
                throw new Error(`Dòng họ "${data.tenDongHo}" đã tồn tại!`);
            }
            
            // Thêm thông tin người tạo
            const dataWithCreator = {
                ...data,
                nguoiTaoId: user?.userId || user?.id,
            };
            
            return createDongHo(dataWithCreator);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dongho-list"] });
            queryClient.invalidateQueries({ queryKey: ["my-dongho"] });
            showSuccess("Tạo dòng họ thành công!");
            setIsModalOpen(false);
        },
        onError: (error: any) => {
            showError(error.message || "Có lỗi xảy ra khi tạo dòng họ.");
        },
    });

    // Mutation cập nhật
    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: IDongHoUpdate }) => {
            // Check trùng tên (trừ chính nó)
            const existingNames = dongHoList
                .filter(d => d.dongHoId !== id)
                .map(d => d.tenDongHo?.toLowerCase());
            if (existingNames.includes(data.tenDongHo.toLowerCase())) {
                throw new Error(`Dòng họ "${data.tenDongHo}" đã tồn tại!`);
            }
            
            // Thêm thông tin người cập nhật
            const dataWithUpdater = {
                ...data,
                nguoiCapNhatId: user?.userId || user?.id,
            };
            
            return updateDongHo(id, dataWithUpdater);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dongho-list"] });
            queryClient.invalidateQueries({ queryKey: ["my-dongho"] });
            showSuccess("Cập nhật dòng họ thành công!");
            setIsModalOpen(false);
            setEditingDongHo(null);
        },
        onError: (error: any) => {
            showError(error.message || "Có lỗi xảy ra khi cập nhật dòng họ.");
        },
    });

    // Mutation xóa
    const deleteMutation = useMutation({
        mutationFn: deleteDongHo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["dongho-list"] });
            queryClient.invalidateQueries({ queryKey: ["my-dongho"] });
            showSuccess("Xóa dòng họ thành công!");
            setIsDeleteModalOpen(false);
            setDongHoToDelete(null);
        },
        onError: (error: any) => {
            showError(error.message || "Có lỗi xảy ra khi xóa dòng họ.");
        },
    });

    const handleCreateDongHo = (data: IDongHoCreate) => {
        createMutation.mutate(data);
    };

    const handleUpdateDongHo = (data: IDongHoUpdate) => {
        if (editingDongHo) {
            updateMutation.mutate({ id: editingDongHo.dongHoId, data });
        }
    };

    const handleDeleteDongHo = (dongHoId: string, tenDongHo: string) => {
        setDongHoToDelete({ id: dongHoId, name: tenDongHo });
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (dongHoToDelete) {
            deleteMutation.mutate(dongHoToDelete.id);
        }
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setDongHoToDelete(null);
    };

    const handleEditDongHo = (dongHo: IDongHo) => {
        setEditingDongHo(dongHo);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingDongHo(null);
    };

    // Chưa ready
    if (!isReady) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" />
            </div>
        );
    }

    // Non-user không có dongHoId
    if (!user?.dongHoId) {
        return (
            <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
                <div className="text-center py-16">
                    <Users size={64} className="mx-auto text-[#d4af37] mb-4 opacity-50" />
                    <h2 className="text-2xl font-bold text-[#b91c1c] mb-2">Chưa được gán dòng họ</h2>
                    <p className="text-[#8b5e3c] text-lg">
                        Tài khoản của bạn chưa được gán vào dòng họ nào.
                    </p>
                    <p className="text-[#8b5e3c] text-sm mt-2">
                        Vui lòng liên hệ Thủ thư để được hỗ trợ.
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
                    onClick={() => myDongHoQuery.refetch()}
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
                        Gia Phả Của Tôi
                    </h2>
                    <p className="text-[#8b5e3c] italic text-sm">
                        {isThudo 
                            ? "Quản lý cây gia phả dòng họ của bạn (Thủ thư)" 
                            : "Quản lý cây gia phả dòng họ của bạn"}
                    </p>
                </div>

                {/* Chỉ Thudo mới có nút tạo mới */}
                {canCreateNew && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold"
                    >
                        <Plus size={16} />
                        <span>Tạo Cây Mới</span>
                    </button>
                )}
            </div>

            {/* Search - Bỏ search vì chỉ có 1 dòng họ */}

            {/* Grid Cards hoặc thông báo chưa có dòng họ */}
            {filteredList.length === 0 ? (
                <div className="text-center py-16">
                    <Users size={64} className="mx-auto text-[#d4af37] mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold text-[#b91c1c] mb-2">Chưa có dòng họ</h3>
                    <p className="text-[#8b5e3c] text-lg mb-4">
                        Bạn chưa có cây gia phả nào. Hãy tạo cây gia phả đầu tiên!
                    </p>
                    {isThudo && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#b91c1c] text-white rounded-lg hover:bg-[#991b1b] transition-colors font-bold"
                        >
                            <Plus size={20} />
                            <span>Tạo Cây Gia Phả Đầu Tiên</span>
                        </button>
                    )}
                    {!isThudo && (
                        <p className="text-[#8b5e3c] text-sm mt-2">
                            Vui lòng liên hệ Thủ thư để được tạo cây gia phả.
                        </p>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredList.map((dongHo) => (
                        <DongHoCard
                            key={dongHo.dongHoId}
                            dongHo={dongHo}
                            canEdit={true} // User luôn có thể edit dòng họ của mình
                            canDelete={isThudo} // Chỉ thudo mới có thể xóa
                            onEdit={() => handleEditDongHo(dongHo)}
                            onDelete={() => handleDeleteDongHo(dongHo.dongHoId, dongHo.tenDongHo)}
                            isDeleting={deleteMutation.isPending}
                        />
                    ))}
                </div>
            )}

            {/* Modal tạo mới/chỉnh sửa - Thudo có thể tạo mới, tất cả user có thể edit dòng họ của mình */}
            {(canCreateNew || editingDongHo) && (
                <DongHoModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={editingDongHo ? handleUpdateDongHo : handleCreateDongHo}
                    isLoading={createMutation.isPending || updateMutation.isPending}
                    editData={editingDongHo}
                    mode={editingDongHo ? "edit" : "create"}
                />
            )}

            {/* Modal xác nhận xóa */}
            {isDeleteModalOpen && dongHoToDelete && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-[#fffdf5] rounded-xl shadow-2xl w-full max-w-md border-2 border-[#d4af37] overflow-hidden">
                        {/* Header */}
                        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex items-center justify-between">
                            <h3 className="text-xl font-bold uppercase tracking-wider">
                                Xác Nhận Xóa
                            </h3>
                            <button
                                onClick={handleCancelDelete}
                                disabled={deleteMutation.isPending}
                                className="hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users size={32} className="text-red-600" />
                                </div>
                                <h4 className="text-lg font-bold text-[#5d4037] mb-2">
                                    Bạn có chắc chắn muốn xóa?
                                </h4>
                                <p className="text-[#8b5e3c] mb-2">
                                    Dòng họ: <strong className="text-[#b91c1c]">"{dongHoToDelete.name}"</strong>
                                </p>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
                                    <strong>Cảnh báo:</strong> Tất cả thành viên và dữ liệu liên quan sẽ bị xóa vĩnh viễn!
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handleCancelDelete}
                                    disabled={deleteMutation.isPending}
                                    className="px-5 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c] transition-colors disabled:opacity-50"
                                >
                                    Hủy
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    disabled={deleteMutation.isPending}
                                    className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
                                >
                                    {deleteMutation.isPending ? (
                                        <Loader2 size={18} className="animate-spin" />
                                    ) : (
                                        <Trash2 size={18} />
                                    )}
                                    {deleteMutation.isPending ? "Đang xóa..." : "Xóa dòng họ"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
