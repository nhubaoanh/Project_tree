"use client";
import { useState, useEffect } from "react";
import { Search, Plus, X, Loader2, Pin, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ITinTuc | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<ITinTuc[]>([]);

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

  // Selection handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(dataList.map((item: ITinTuc) => item.tinTucId!));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
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
  const allSelected = dataList.length > 0 && dataList.every((i: ITinTuc) => selectedIds.includes(i.tinTucId!));
  const someSelected = dataList.some((i: ITinTuc) => selectedIds.includes(i.tinTucId!));

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

      {/* Search */}
      <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2">
        <div className="p-2 text-stone-400">
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo tiêu đề..."
          className="w-full p-2 outline-none bg-transparent text-[#5d4037]"
        />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")} className="p-2 text-stone-400 hover:text-[#b91c1c]">
            <X size={16} />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-[#d4af37] overflow-hidden">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-[#f5e6d3] to-[#e8d4b8]">
            <tr>
              <th className="px-4 py-3 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => { if (el) el.indeterminate = someSelected && !allSelected; }}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  className="w-4 h-4 accent-[#b91c1c]"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[#5d4037]">Tiêu đề</th>
              <th className="px-4 py-3 text-left text-sm font-bold text-[#5d4037]">Tác giả</th>
              <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Ngày đăng</th>
              <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Lượt xem</th>
              <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Ghim</th>
              <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <Loader2 className="animate-spin mx-auto text-[#d4af37]" size={32} />
                </td>
              </tr>
            ) : dataList.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-gray-500">Chưa có tin tức nào</td>
              </tr>
            ) : (
              dataList.map((item: ITinTuc) => (
                <tr
                  key={item.tinTucId}
                  className={`border-t border-[#e8d4b8] hover:bg-[#faf6f0] ${selectedIds.includes(item.tinTucId!) ? "bg-[#fff8e1]" : ""}`}
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.tinTucId!)}
                      onChange={(e) => handleSelectOne(item.tinTucId!, e.target.checked)}
                      className="w-4 h-4 accent-[#b91c1c]"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#5d4037] line-clamp-2">{item.tieuDe}</div>
                    {item.tomTat && <div className="text-xs text-gray-500 line-clamp-1 mt-1">{item.tomTat}</div>}
                  </td>
                  <td className="px-4 py-3 text-sm">{item.tacGia || "-"}</td>
                  <td className="px-4 py-3 text-center text-sm">
                    {item.ngayDang ? new Date(item.ngayDang).toLocaleDateString("vi-VN") : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-sm"><Eye size={14} /> {item.luotXem || 0}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.ghim ? <Pin size={16} className="text-[#d4af37] mx-auto" /> : "-"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center gap-2">
                      <button onClick={() => handleEdit(item)} className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDeleteClick(item)} className="p-2 text-red-600 hover:bg-red-50 rounded">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="bg-[#fdf6e3] p-4 border-t border-[#d4af37] flex items-center justify-between">
          <div className="text-sm text-[#8b5e3c]">
            {selectedIds.length > 0 && <span className="mr-4 text-[#b91c1c] font-bold">Đã chọn {selectedIds.length}</span>}
            Hiển thị <span className="font-bold">{dataList.length}</span> / Tổng <span className="font-bold">{totalRecords}</span>
          </div>
          <div className="flex gap-1 items-center">
            <select
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setPageIndex(1); }}
              className="mr-4 bg-white border border-[#d4af37] rounded px-2 py-1 text-sm text-[#5d4037]"
            >
              <option value={5}>5 dòng/trang</option>
              <option value={10}>10 dòng/trang</option>
              <option value={20}>20 dòng/trang</option>
            </select>
            <button
              onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
              disabled={pageIndex === 1}
              className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 hover:bg-[#fff8e1]"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="px-4 text-sm font-bold text-[#5d4037]">Trang {pageIndex} / {totalPages || 1}</span>
            <button
              onClick={() => setPageIndex((p) => Math.min(totalPages, p + 1))}
              disabled={pageIndex === totalPages || totalPages === 0}
              className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 hover:bg-[#fff8e1]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <TinTucModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleSave} initialData={editingItem} isLoading={isSaving} />

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
              <button onClick={handleConfirmDelete} disabled={isDeleting} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2">
                {isDeleting && <Loader2 className="animate-spin" size={16} />}
                {isDeleting ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
