"use client";
import React, { useState } from "react";
import { Search, Plus, X, Loader2, Trash2 } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { IEvent, IsearchEvent } from "@/types/event";
import { useToast } from "@/service/useToas";
import { EventTable } from "./components/eventTable";
import { EventModal } from "./components/eventModal";
import { EventDeleteModal } from "./components/eventDelete";
import { searchEvent, createEvent, updateEvent } from "@/service/event.service";
import storage from "@/utils/storage";

export default function QuanLySuKienPage() {
  const queryClient = useQueryClient();

  // --- STATE ---
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --- SELECTION STATE ---
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<IEvent | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventsToDelete, setEventsToDelete] = useState<IEvent[]>([]);

  const { showSuccess, showError } = useToast();

  // --- DEBOUNCE SEARCH ---
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // --- FETCHING DATA ---
  // Lấy dongHoId từ user hiện tại để filter sự kiện
  const user = storage.getUser();
  const userDongHoId = user?.dongHoId;

  const searchParams: IsearchEvent = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: userDongHoId, // Chỉ lấy sự kiện của dòng họ hiện tại
  };

  const eventQuery = useQuery({
    queryKey: ["event", searchParams],
    queryFn: () => searchEvent(searchParams),
    placeholderData: keepPreviousData,
    enabled: !!userDongHoId, // Chỉ fetch khi có dongHoId
  });

  const eventData = eventQuery.data?.data || [];
  const totalRecords = eventQuery.data?.totalItems || 0;
  const totalPages = eventQuery.data?.pageCount || 0;
  const isLoading = eventQuery.isLoading;

  // --- MUTATIONS ---
  const createMutation = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      showSuccess("Thêm sự kiện thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi thêm sự kiện.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      showSuccess("Cập nhật sự kiện thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi cập nhật.");
    },
  });

  // --- SELECTION HANDLERS ---
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(eventData.map((e: IEvent) => e.suKienId));
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

  // --- EVENT HANDLERS ---
  const handleAdd = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event: IEvent) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  // Xóa 1 sự kiện hoặc nhiều nếu đã chọn
  const handleDeleteClick = (event: IEvent) => {
    // Nếu đã tick nhiều checkbox và event hiện tại nằm trong danh sách đã chọn
    // thì xóa tất cả những cái đã chọn
    if (selectedIds.length > 1 && selectedIds.includes(event.suKienId)) {
      const selected = eventData.filter((e: IEvent) => selectedIds.includes(e.suKienId));
      setEventsToDelete(selected);
    } else {
      // Nếu không, chỉ xóa 1 cái được click
      setEventsToDelete([event]);
    }
    setIsDeleteModalOpen(true);
  };

  // Xóa nhiều sự kiện đã chọn
  const handleDeleteSelected = () => {
    const selected = eventData.filter((e: IEvent) => selectedIds.includes(e.suKienId));
    setEventsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSuccess = () => {
    setSelectedIds([]);
    setEventsToDelete([]);
  };

  const handleSaveEvent = (event: Partial<IEvent>) => {
    if (editingEvent) {
      updateMutation.mutate(event as IEvent);
    } else {
      createMutation.mutate(event as IEvent);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;

  // --- LOADING STATE ---
  if (eventQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (eventQuery.isError) {
    return (
      <div className="p-4 mb-4 text-red-600 bg-red-100 rounded flex justify-between items-center">
        <span>Lỗi khi tải dữ liệu. Vui lòng thử lại sau.</span>
        <button
          onClick={() => eventQuery.refetch()}
          className="px-3 py-1 bg-[#d4af37] text-white rounded hover:bg-[#b8962a]"
        >
          Thử lại
        </button>
      </div>
    );
  }

  // --- RENDER ---
  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
            Quản Lý Sự Kiện
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Danh sách sự kiện trong hệ thống
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
          placeholder="Tìm kiếm theo tên sự kiện..."
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

      {/* Table */}
      <EventTable
        data={eventData}
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

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveEvent}
        initialData={editingEvent}
        isLoading={isSaving}
      />

      {/* Delete Modal - Tách riêng component */}
      <EventDeleteModal
        isOpen={isDeleteModalOpen}
        events={eventsToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEventsToDelete([]);
        }}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
