"use client";
import { useState, useEffect } from "react";
import { Search, Plus, X, Loader2, Pin, Eye, Edit, Trash2 } from "lucide-react";
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
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [dongHoId, setDongHoId] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ITinTuc | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<ITinTuc | null>(null);

  const { showSuccess, showError } = useToast();

  // Lấy dongHoId từ user đã đăng nhập
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
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi thêm tin tức.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: ITinTuc) => updateTinTuc(data.tinTucId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tintuc"] });
      showSuccess("Cập nhật tin tức thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTinTuc,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tintuc"] });
      showSuccess("Đã xóa tin tức.");
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    },
    onError: (error: any) => {
      showError(error.message || "Không thể xóa tin tức này.");
    },
  });

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: ITinTuc) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: ITinTuc) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete?.tinTucId) {
      deleteMutation.mutate(itemToDelete.tinTucId);
    }
  };

  const handleSave = (data: Partial<ITinTuc>) => {
    const payload = { ...data, dongHoId: dongHoId };
    if (editingItem) {
      updateMutation.mutate({ ...payload, tinTucId: editingItem.tinTucId } as ITinTuc);
    } else {
      createMutation.mutate(payload as ITinTuc);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  if (!dongHoId) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-amber-700">Bạn chưa được gán vào dòng họ nào. Vui lòng liên hệ quản trị viên.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
            Quản Lý Tin Tức
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Tin tức và thông báo của dòng họ
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold"
        >
          <Plus size={16} />
          <span>Thêm Mới</span>
        </button>
      </div>

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

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow border border-[#d4af37] overflow-hidden">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-[#f5e6d3] to-[#e8d4b8]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-[#5d4037]">Tiêu đề</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-[#5d4037]">Tác giả</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Ngày đăng</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Lượt xem</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Ghim</th>
                  <th className="px-4 py-3 text-center text-sm font-bold text-[#5d4037]">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {dataList.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      Chưa có tin tức nào
                    </td>
                  </tr>
                ) : (
                  dataList.map((item: ITinTuc) => (
                    <tr key={item.tinTucId} className="border-t border-[#e8d4b8] hover:bg-[#faf6f0]">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#5d4037] line-clamp-2">{item.tieuDe}</div>
                        {item.tomTat && (
                          <div className="text-xs text-gray-500 line-clamp-1 mt-1">{item.tomTat}</div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{item.tacGia || "-"}</td>
                      <td className="px-4 py-3 text-center text-sm">
                        {item.ngayDang ? new Date(item.ngayDang).toLocaleDateString("vi-VN") : "-"}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="inline-flex items-center gap-1 text-sm">
                          <Eye size={14} /> {item.luotXem || 0}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {item.ghim ? <Pin size={16} className="text-[#d4af37] mx-auto" /> : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(item)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={() => setPageIndex((p) => Math.max(1, p - 1))}
                disabled={pageIndex === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Trước
              </button>
              <span className="text-sm">
                Trang {pageIndex} / {totalPages}
              </span>
              <button
                onClick={() => setPageIndex((p) => Math.min(totalPages, p + 1))}
                disabled={pageIndex === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}
        </>
      )}

      <TinTucModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingItem}
        isLoading={isSaving}
      />

      {isDeleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl border border-[#d4af37]">
            <h3 className="text-lg font-bold text-[#5d4037] mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa tin tức{" "}
              <strong className="text-[#b91c1c]">{itemToDelete.tieuDe}</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setItemToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
              >
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
