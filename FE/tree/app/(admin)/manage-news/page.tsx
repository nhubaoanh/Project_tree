"use client";
import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Pin, Eye } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { useToast } from "@/service/useToas";
import {
  searchTinTuc,
  createTinTuc,
  updateTinTuc,
  deleteTinTuc,
  ITinTuc,
  ISearchTinTuc,
} from "@/service/tintuc.service";
import { TinTucModal } from "./components/TinTucModal";
import { NewsDetailModal } from "./components/NewsDetailModal";
import { DataTable, ColumnConfig } from "@/components/shared";
import storage from "@/utils/storage";

export default function QuanLyTinTucPage() {
  const queryClient = useQueryClient();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dongHoId, setDongHoId] = useState<string>("");

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ITinTuc | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<ITinTuc[]>([]);

  // Detail modal state
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState<ITinTuc | null>(null);

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

  const searchParams: ISearchTinTuc = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: dongHoId,
  };

  const dataQuery = useQuery({
    queryKey: ["tintuc", searchParams],
    queryFn: () => searchTinTuc(searchParams),
    placeholderData: keepPreviousData,
    enabled: !!dongHoId,
  });

  const dataList = dataQuery.data?.data || [];
  const totalRecords = dataQuery.data?.totalItems || 0;
  const totalPages = dataQuery.data?.pageCount || 0;
  const isLoading = dataQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createTinTuc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tintuc"] });
      showSuccess("Thêm tin tức thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => showError(error.message || "Có lỗi xảy ra."),
  });

  const updateMutation = useMutation({
    mutationFn: (data: ITinTuc) => updateTinTuc(data.tinTucId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tintuc"] });
      showSuccess("Cập nhật thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => showError(error.message || "Có lỗi xảy ra."),
  });

  const deleteMutation = useMutation({
    mutationFn: ({ listJson, luUserId }: { listJson: { tinTucId: string }[]; luUserId: string }) =>
      deleteTinTuc(listJson, luUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tintuc"] });
      showSuccess(itemsToDelete.length > 1 ? `Đã xóa ${itemsToDelete.length} tin tức.` : "Đã xóa tin tức.");
      setIsDeleteModalOpen(false);
      setItemsToDelete([]);
      setSelectedIds([]);
    },
    onError: (error: any) => showError(error.message || "Không thể xóa."),
  });

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(dataList.map((item: ITinTuc) => item.tinTucId!));
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

  const handleEdit = (item: ITinTuc) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleViewDetail = (item: ITinTuc) => {
    setSelectedNews(item);
    setIsDetailModalOpen(true);
  };

  const handleDeleteClick = (item: ITinTuc) => {
    if (selectedIds.length > 1 && selectedIds.includes(item.tinTucId!)) {
      const selected = dataList.filter((i: ITinTuc) => selectedIds.includes(i.tinTucId!));
      setItemsToDelete(selected);
    } else {
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = dataList.filter((i: ITinTuc) => selectedIds.includes(i.tinTucId!));
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const user = storage.getUser();
    if (itemsToDelete.length > 0 && user?.nguoiDungId) {
      const listJson = itemsToDelete.map((i) => ({ tinTucId: i.tinTucId! }));
      deleteMutation.mutate({ listJson, luUserId: user.nguoiDungId });
    }
  };

  const handleSave = (data: Partial<ITinTuc>) => {
    const payload = { ...data, dongHoId };
    if (editingItem) {
      updateMutation.mutate({ ...payload, tinTucId: editingItem.tinTucId } as ITinTuc);
    } else {
      createMutation.mutate(payload as ITinTuc);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // Column configuration for DataTable
  const columns: ColumnConfig<ITinTuc>[] = [
    {
      key: "tieuDe",
      label: "Tiêu đề",
      clickable: true,
      align: "left",
      // render: (value, row) => (
      //   <div>
      //     <div className="font-medium text-[#5d4037] line-clamp-2">{value}</div>
      //     {row.tomTat && <div className="text-xs text-gray-500 line-clamp-1 mt-1">{row.tomTat}</div>}
      //   </div>
      // ),
    },
    {
      key: "tacGia",
      label: "Tác giả",
      align: "left",
    },
    {
      key: "ngayDang",
      label: "Ngày đăng",
      align: "center",
      render: (value) => value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    {
      key: "luotXem",
      label: "Lượt xem",
      align: "center",
      render: (value) => (
        <span className="inline-flex items-center gap-1 text-sm">
          <Eye size={14} /> {value || 0}
        </span>
      ),
    },
    {
      key: "ghim",
      label: "Ghim",
      align: "center",
      render: (value) => value ? <Pin size={16} className="text-[#d4af37] mx-auto" /> : "-",
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
            Quản Lý Tin Tức
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">Tin tức và thông báo của dòng họ</p>
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

      {/* DataTable Component */}
      <DataTable
        data={dataList}
        columns={columns}
        keyField="tinTucId"
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={setPageSize}
        isLoading={isLoading}
        emptyMessage="Chưa có tin tức nào"
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
        searchPlaceholder="Tìm kiếm theo tiêu đề..."
      />

      {/* Modals */}
      <TinTucModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingItem}
        isLoading={isSaving}
      />

      <NewsDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        news={selectedNews}
      />

      {/* Delete Modal */}
      {isDeleteModalOpen && itemsToDelete.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-[#d4af37]">
            <h3 className="text-lg font-bold text-[#5d4037] mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              {itemsToDelete.length === 1 ? (
                <>Bạn có chắc chắn muốn xóa tin tức <strong className="text-[#b91c1c]">{itemsToDelete[0].tieuDe}</strong>?</>
              ) : (
                <>Bạn có chắc chắn muốn xóa <strong className="text-[#b91c1c]">{itemsToDelete.length} tin tức</strong> đã chọn?</>
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
