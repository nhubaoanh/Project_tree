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
import {
  createUser,
} from "@/service/user.service";
import { IContributionUp, IsearchContributionUp } from "@/types/contribuitionUp";
import { ContributionTable } from "./components/contribuitionUpTable";
import { createContributionUp, deleteContributionUp, searchContributionUp, updateContributionUp } from "@/service/contribuitionUp.service";
import { ContributionUpModal } from "./components/contribuitionUpModal";
import { useToast } from "@/service/useToas";
import storage from "@/utils/storage";

export default function QuanLyTaiChinhThuPage() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IContributionUp | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<IContributionUp[]>([]);

  const { showSuccess, showError } = useToast();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IsearchContributionUp = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: dongHoId || undefined,
  };

  const usersQuery = useQuery({
    queryKey: ["contribuitionUp", searchParams],
    queryFn: () => searchContributionUp(searchParams),
    placeholderData: keepPreviousData,
    enabled: isReady && !!dongHoId,
  });

  const userData = usersQuery.data?.data || [];
  const totalRecords = usersQuery.data?.totalItems || 0;
  const totalPages = usersQuery.data?.pageCount || 0;
  const isLoading = usersQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createContributionUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
      showSuccess("Thêm dữ liệu đóng góp thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      toast.error("Có lỗi xảy ra khi thêm.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateContributionUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
      showSuccess("Cập nhật dữ liệu thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (listJson: { thuId: number }[]) => deleteContributionUp(listJson, user?.nguoiDungId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
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
      setSelectedIds(userData.map((e: IContributionUp) => e.thuId));
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

  const handleEdit = (item: IContributionUp) => {
    setEditingUser(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: IContributionUp) => {
    if (selectedIds.length > 1 && selectedIds.includes(item.thuId)) {
      const selected = userData.filter((e: IContributionUp) => selectedIds.includes(e.thuId));
      setItemsToDelete(selected);
    } else {
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = userData.filter((e: IContributionUp) => selectedIds.includes(e.thuId));
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const listJson = itemsToDelete.map((item) => ({ thuId: item.thuId }));
    deleteMutation.mutate(listJson);
  };

  const handleSaveUser = (data: Partial<IContributionUp>) => {
    if (editingUser) {
      updateMutation.mutate(data as IContributionUp);
    } else {
      createMutation.mutate(data as IContributionUp);
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
    XLSX.utils.book_append_sheet(workbook, worksheet, "TaiChinhThu");
    XLSX.writeFile(workbook, `TaiChinhThu_Trang${pageIndex}.xlsx`);
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const dataParsed = XLSX.utils.sheet_to_json(ws) as IContributionUp[];

        if (dataParsed.length > 0) {
          const promises = dataParsed.map(async (u) => {
            try {
              await createUser(u);
            } catch (err) {
              console.error("Import error for row", u);
            }
          });

          Promise.all(promises).then(() => {
            queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
            toast.success(`Đã xử lý nhập ${dataParsed.length} dòng.`);
            if (fileInputRef.current) fileInputRef.current.value = "";
          });
        }
      };
      reader.readAsBinaryString(file);
    }
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
            Quản Lý Tài Chính Thu
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Danh sách các khoản thu tài chính
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
              onChange={handleImportExcel}
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
              Bạn có chắc chắn muốn xóa {itemsToDelete.length} khoản thu đã chọn?
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
