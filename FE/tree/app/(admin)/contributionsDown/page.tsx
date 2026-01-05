"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search, Plus, Download, Upload, X, Loader2, Trash2 } from "lucide-react";
import * as XLSX from "xlsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ContributionTable } from "./components/contribuitionDownTable";
import { ContributionUpModal } from "./components/contribuitionDownModal";
import { createContributionDown, deleteContributionDown, searchContributionDown, updateContributionDown } from "@/service/contribuitionDown.service";
import { IContributionDown, IsearchContributionDown } from "@/types/contribuitionDown";
import { useToast } from "@/service/useToas";
import storage from "@/utils/storage";

export default function QuanLyTaiChinhChiPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(null);
  const [dongHoId, setDongHoId] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userData = storage.getUser();
    setUser(userData);
    if (userData?.dongHoId) {
      setDongHoId(userData.dongHoId);
    }
    setIsReady(true);
  }, []);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Selection state
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { showSuccess, showError } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IContributionDown | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<IContributionDown[]>([]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IsearchContributionDown = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: dongHoId || undefined,
  };

  const usersQuery = useQuery({
    queryKey: ["contribuitionDown", searchParams],
    queryFn: () => searchContributionDown(searchParams),
    placeholderData: keepPreviousData,
    enabled: isReady && !!dongHoId,
  });

  const userData = usersQuery.data?.data || [];
  const totalRecords = usersQuery.data?.totalItems || 0;
  const totalPages = usersQuery.data?.pageCount || 0;
  const isLoading = usersQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createContributionDown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionDown"] });
      showSuccess("Thêm khoản chi thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi thêm.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; data: Partial<IContributionDown> }) =>
      updateContributionDown(vars.id, vars.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionDown"] });
      showSuccess("Cập nhật thông tin thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (listJson: { chiId: number }[]) => deleteContributionDown(listJson, user?.nguoiDungId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionDown"] });
      showSuccess("Đã xóa thành công.");
      setIsDeleteModalOpen(false);
      setItemsToDelete([]);
      setSelectedIds([]);
    },
    onError: () => {
      showError("Không thể xóa.");
    },
  });

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(userData.map((e: IContributionDown) => e.chiId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: IContributionDown) => {
    setEditingUser(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: IContributionDown) => {
    if (selectedIds.length > 1 && selectedIds.includes(item.chiId)) {
      const selected = userData.filter((e: IContributionDown) => selectedIds.includes(e.chiId));
      setItemsToDelete(selected);
    } else {
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = userData.filter((e: IContributionDown) => selectedIds.includes(e.chiId));
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const listJson = itemsToDelete.map((item) => ({ chiId: item.chiId }));
    deleteMutation.mutate(listJson);
  };

  const handleSaveUser = (data: Partial<IContributionDown>) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.chiId, data });
    } else {
      createMutation.mutate(data as IContributionDown);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const handleExportExcel = () => {
    if (userData.length === 0) {
      toast("Không có dữ liệu để xuất");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TaiChinhChi");
    XLSX.writeFile(workbook, `TaiChinhChi_Trang${pageIndex}.xlsx`);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  if (isReady && !dongHoId) {
    return (
      <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
        <div className="text-center py-16">
          <Loader2 size={64} className="mx-auto text-[#d4af37] mb-4 opacity-50" />
          <h2 className="text-2xl font-bold text-[#b91c1c] mb-2">Chưa được gán dòng họ</h2>
          <p className="text-[#8b5e3c] text-lg">
            Tài khoản của bạn chưa được gán vào dòng họ nào.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
            Quản Lý Tài Chính Chi
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Danh sách các khoản chi tài chính
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-end">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 transition-all text-sm font-bold"
            >
              <Trash2 size={16} />
              <span>Xóa ({selectedIds.length})</span>
            </button>
          )}
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c5282] text-white rounded shadow hover:bg-[#2a4365] transition-all text-sm font-bold"
          >
            <Download size={16} />
            <span className="hidden sm:inline">Xuất Excel</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-[#276749] text-white rounded shadow hover:bg-[#22543d] transition-all text-sm font-bold relative overflow-hidden"
          >
            <Upload size={16} />
            <span className="hidden sm:inline">Nhập Excel</span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold ml-2"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2 transition-all focus-within:ring-2 ring-[#d4af37]/50">
        <div className="p-2 text-stone-400">
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm..."
          className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="p-2 text-stone-400 hover:text-[#b91c1c]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Table Component */}
      <ContributionTable
        data={userData}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={handlePageSizeChange}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
      />

      {/* Modals */}
      <ContributionUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
        initialData={editingUser}
        isLoading={isSaving}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && itemsToDelete.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-[#5d4037] mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa {itemsToDelete.length} khoản chi đã chọn?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setItemsToDelete([]);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
