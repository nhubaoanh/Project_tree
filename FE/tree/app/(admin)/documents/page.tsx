"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Filter, Edit } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useToast } from "@/service/useToas";
import {
  searchTaiLieu,
  createTaiLieu,
  updateTaiLieu,
  deleteTaiLieu,
  ITaiLieu,
  ISearchTaiLieu,
  LOAI_TAI_LIEU,
} from "@/service/tailieu.service";
import { TaiLieuModal } from "./components/TaiLieuModal";
import { DocumentDetailModal } from "./components/DocumentDetailModal";
import { DataTable, ColumnConfig } from "@/components/shared";
import storage from "@/utils/storage";

export default function QuanLyTaiLieuPage() {
  const queryClient = useQueryClient();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filterLoai, setFilterLoai] = useState("");
  const [dongHoId, setDongHoId] = useState<string>("");

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ITaiLieu | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<ITaiLieu[]>([]);

  // Detail modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<ITaiLieu | null>(null);

  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const user = storage.getUser();
    if (user?.dongHoId) {
      setDongHoId(user.dongHoId);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: ISearchTaiLieu = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: dongHoId,
    loaiTaiLieu: filterLoai,
  };

  const dataQuery = useQuery({
    queryKey: ["tailieu", searchParams],
    queryFn: () => searchTaiLieu(searchParams),
    placeholderData: keepPreviousData,
    enabled: !!dongHoId,
  });

  const dataList = dataQuery.data?.data || [];
  const totalRecords = dataQuery.data?.totalItems || 0;
  const totalPages = dataQuery.data?.pageCount || 0;
  const isLoading = dataQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createTaiLieu,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tailieu"] });
      showSuccess("Thêm tài liệu thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => showError(error.message || "Có lỗi xảy ra."),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ITaiLieu) => updateTaiLieu(data.taiLieuId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tailieu"] });
      showSuccess("Cập nhật thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => showError(error.message || "Có lỗi xảy ra."),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ listJson, luUserId }: { listJson: { taiLieuId: string }[]; luUserId: string }) =>
      deleteTaiLieu(listJson, luUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tailieu"] });
      showSuccess(itemsToDelete.length > 1 ? `Đã xóa ${itemsToDelete.length} tài liệu.` : "Đã xóa tài liệu.");
      setIsDeleteModalOpen(false);
      setItemsToDelete([]);
      setSelectedIds([]);
    },
    onError: (error: any) => showError(error.message || "Không thể xóa."),
  });

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(dataList.map((item: ITaiLieu) => item.taiLieuId!));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string | number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, String(id)]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== String(id)));
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ITaiLieu) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleViewDetail = (item: ITaiLieu) => {
    setSelectedDocument(item);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (item: ITaiLieu) => {
    if (selectedIds.length > 1 && selectedIds.includes(item.taiLieuId!)) {
      const selected = dataList.filter((i: ITaiLieu) => selectedIds.includes(i.taiLieuId!));
      setItemsToDelete(selected);
    } else {
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = dataList.filter((i: ITaiLieu) => selectedIds.includes(i.taiLieuId!));
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const user = storage.getUser();
    if (itemsToDelete.length > 0 && user?.nguoiDungId) {
      const listJson = itemsToDelete.map((i) => ({ taiLieuId: i.taiLieuId! }));
      deleteMutation.mutate({ listJson, luUserId: user.nguoiDungId });
    }
  };

  const handleSave = (data: Partial<ITaiLieu>) => {
    const payload = { ...data, dongHoId };
    if (editingItem) {
      updateMutation.mutate({ ...payload, taiLieuId: editingItem.taiLieuId } as ITaiLieu);
    } else {
      createMutation.mutate(payload as ITaiLieu);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // Column configuration for DataTable
  const columns: ColumnConfig<ITaiLieu>[] = [
    {
      key: "tenTaiLieu",
      label: "Tên tài liệu",
      clickable: true,
      align: "left",
    },
    {
      key: "loaiTaiLieu",
      label: "Loại",
      align: "left",
      render: (value) => (
        <span className="px-2 py-1 bg-[#f5e6d3] text-[#8b5e3c] text-xs rounded">{value || "-"}</span>
      ),
    },
    {
      key: "tacGia",
      label: "Tác giả",
      align: "left",
    },
    {
      key: "namSangTac",
      label: "Năm",
      align: "center",
    },
    {
      key: "nguonGoc",
      label: "Nguồn gốc",
      align: "left",
    },
  ];

  if (!dongHoId) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-amber-700">Bạn chưa được gán vào dòng họ nào.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
            Quản Lý Tài Liệu
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">Tài liệu của dòng họ</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700 text-sm font-bold"
            >
              <Trash2 size={16} />
              <span>Xóa ({selectedIds.length})</span>
            </button>
          )}
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] text-sm font-bold"
          >
            <Plus size={16} />
            <span>Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-6 flex items-center gap-2">
        <Filter size={16} className="text-[#8b5e3c]" />
        <select
          value={filterLoai}
          onChange={(e) => { setFilterLoai(e.target.value); setPageIndex(1); }}
          className="px-3 py-2 border border-[#d4af37] rounded bg-white text-[#5d4037]"
        >
          <option value="">Tất cả loại</option>
          {LOAI_TAI_LIEU.map((loai) => (
            <option key={loai} value={loai}>{loai}</option>
          ))}
        </select>
      </div>

      {/* DataTable Component */}
      <DataTable
        data={dataList}
        columns={columns}
        keyField="taiLieuId"
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        isLoading={isLoading}
        emptyMessage="Chưa có tài liệu nào"
        enableSelection={true}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        onViewDetail={handleViewDetail}
        customActions={[
          { icon: Edit, label: "Sửa", onClick: handleEdit, color: "blue" },
          { icon: Trash2, label: "Xóa", onClick: handleDeleteClick, color: "red" },
        ]}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo tên tài liệu..."
      />

      {/* Modals */}
      <TaiLieuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingItem}
        isLoading={isSaving}
      />

      <DocumentDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        document={selectedDocument}
      />

      {/* Delete Modal */}
      {isDeleteModalOpen && itemsToDelete.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-[#d4af37]">
            <h3 className="text-lg font-bold text-[#5d4037] mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              {itemsToDelete.length === 1 ? (
                <>Bạn có chắc chắn muốn xóa tài liệu <strong className="text-[#b91c1c]">{itemsToDelete[0].tenTaiLieu}</strong>?</>
              ) : (
                <>Bạn có chắc chắn muốn xóa <strong className="text-[#b91c1c]">{itemsToDelete.length} tài liệu</strong> đã chọn?</>
              )}
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => { setIsDeleteModalOpen(false); setItemsToDelete([]); }} className="px-4 py-2 border rounded hover:bg-gray-50">Hủy</button>
              <button onClick={handleConfirmDelete} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
