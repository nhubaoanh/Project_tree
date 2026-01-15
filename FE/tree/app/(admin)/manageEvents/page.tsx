"use client";
import React, { useState } from "react";
import { Calendar, Plus, Trash2 } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { IEvent, IsearchEvent } from "@/types/event";
import { useToast } from "@/service/useToas";
import { EventModal } from "./components/eventModal";
import { EventDetailModal } from "./components/EventDetailModal";
import { searchEvent, createEvent, updateEvent, deleteEvent } from "@/service/event.service";
import storage from "@/utils/storage";
import { 
  PageLayout, 
  DataTable, 
  DeleteModal, 
  PageLoading, 
  ErrorState,
  NoFamilyTreeState,
  ColumnConfig,
  ActionConfig 
} from "@/components/shared";

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

  // Detail Modal State
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<IEvent | null>(null);

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

  const deleteMutation = useMutation({
    mutationFn: (listJson: { suKienId: string }[]) => deleteEvent(listJson, user?.nguoiDungId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event"] });
      showSuccess("Đã xóa sự kiện thành công.");
      setIsDeleteModalOpen(false);
      setEventsToDelete([]);
      setSelectedIds([]);
    },
    onError: (error: any) => {
      showError(error.message || "Không thể xóa sự kiện.");
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

  const handleSelectOne = (id: string | number, checked: boolean) => {
    const stringId = String(id);
    if (checked) {
      setSelectedIds((prev) => [...prev, stringId]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== stringId));
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

  const handleConfirmDelete = () => {
    const listJson = eventsToDelete.map((event) => ({ suKienId: event.suKienId }));
    deleteMutation.mutate(listJson);
  };

  const handleSaveEvent = (event: Partial<IEvent>) => {
    if (editingEvent) {
      updateMutation.mutate(event as IEvent);
    } else {
      createMutation.mutate(event as IEvent);
    }
  };

  const handleViewDetail = (event: IEvent) => {
    setSelectedEventForDetail(event);
    setIsDetailModalOpen(true);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // --- LOADING STATE ---
  if (eventQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách sự kiện..." />;
  }

  // --- ERROR STATE ---
  if (eventQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách sự kiện. Vui lòng thử lại sau."
        onRetry={() => eventQuery.refetch()}
      />
    );
  }

  // --- NO FAMILY TREE STATE ---
  if (!userDongHoId) {
    return <NoFamilyTreeState />;
  }

  // --- COLUMN CONFIGURATION ---
  const columns: ColumnConfig<IEvent>[] = [
    {
      key: "tenSuKien",
      label: "Tên sự kiện",
      clickable: true,
    },
    {
      key: "ngayDienRa",
      label: "Ngày diễn ra",
      render: (value) => value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    {
      key: "gioDienRa",
      label: "Giờ",
      render: (value) => value || "-",
    },
    {
      key: "diaDiem",
      label: "Địa điểm",
      render: (value) => value || "-",
    },
    {
      key: "tenLoaiSuKien",
      label: "Loại sự kiện",
    },
    {
      key: "uuTien",
      label: "Ưu tiên",
      render: (value) => {
        const priority = ["", "Thấp", "Trung bình", "Cao"];
        return priority[value] || "-";
      },
    },
  ];

  // --- ACTION CONFIGURATION ---
  const customActions: ActionConfig<IEvent>[] = [
    {
      icon: Calendar,
      label: "Sửa",
      onClick: handleEdit,
      color: "blue",
    },
    {
      icon: Trash2,
      label: "Xóa",
      onClick: handleDeleteClick,
      color: "red",
    },
  ];

  // --- PAGE ACTIONS ---
  const pageActions = [
    ...(selectedIds.length > 0 ? [{
      icon: Trash2,
      label: "Xóa",
      onClick: handleDeleteSelected,
      variant: "danger" as const,
      count: selectedIds.length,
    }] : []),
    {
      icon: Plus,
      label: "Thêm Mới",
      onClick: handleAdd,
      variant: "primary" as const,
    },
  ];

  // --- RENDER ---
  return (
    <PageLayout
      title="Quản Lý Sự Kiện"
      subtitle="Danh sách sự kiện trong hệ thống"
      icon={Calendar}
      actions={pageActions}
    >
      {/* Table */}
      <DataTable
        data={eventData}
        columns={columns}
        keyField="suKienId"
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
        enableSelection={true}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        customActions={customActions}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo tên sự kiện..."
        emptyMessage="Chưa có sự kiện nào được tạo"
        onViewDetail={handleViewDetail}
      />

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveEvent}
        initialData={editingEvent}
        isLoading={isSaving}
      />

      {/* Event Detail Modal */}
      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        event={selectedEventForDetail}
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        items={eventsToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setEventsToDelete([]);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        itemDisplayField="tenSuKien"
        title={eventsToDelete.length === 1 ? "Xác nhận xóa sự kiện" : `Xác nhận xóa ${eventsToDelete.length} sự kiện`}
        message={eventsToDelete.length === 1 ? 
          "Bạn có chắc chắn muốn xóa sự kiện này? Hành động này không thể hoàn tác." :
          `Bạn có chắc chắn muốn xóa ${eventsToDelete.length} sự kiện đã chọn? Hành động này không thể hoàn tác.`
        }
      />
    </PageLayout>
  );
}