"use client";
import React from "react";
import { Calendar, Plus, Trash2, Edit, MapPin, Clock, Tag, AlertCircle } from "lucide-react";
import { IEvent as ISuKien, IsearchEvent as IsearchSuKien } from "@/types/event";
import { searchEvent as searchSuKien, createEvent as createSuKien, updateEvent as updateSuKien, deleteEvent as deleteSuKien } from "@/service/event.service";
import { EventModal } from "./components/eventModal";
import { useCrudPage } from "@/hooks";
import storage from "@/utils/storage";
import {
  PageLayout, 
  DataTable, 
  DeleteModal, 
  DetailModal,
  PageLoading, 
  ErrorState,
  NoFamilyTreeState,
  ColumnConfig,
  ActionConfig,
  DetailSection,
  DetailField
} from "@/components/shared";

export default function QuanLySuKienPage() {
  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Use generic CRUD hook
  const crud = useCrudPage<ISuKien>({
    queryKey: ["suKien", dongHoId || ""],
    operations: {
      search: (params) => {
        const searchParams: IsearchSuKien = {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize,
          search_content: params.search_content,
          dongHoId: dongHoId || "",
        };
        return searchSuKien(searchParams);
      },
      create: (data) => createSuKien(data as ISuKien),
      update: (data) => updateSuKien(data as ISuKien),
      delete: (params) => {
        const listJson = params.items.map((item: ISuKien) => ({ 
          suKienId: item.suKienId,
          dongHoId: item.dongHoId 
        }));
        return deleteSuKien(listJson, params.userId || user?.nguoiDungId || "");
      },
    },
    searchParams: { dongHoId: dongHoId || "" },
    tableConfig: {
      initialPageSize: 10,
      enableSelection: true,
      enableSearch: true
    },
    messages: {
      createSuccess: "Thêm sự kiện thành công!",
      updateSuccess: "Cập nhật sự kiện thành công!",
      deleteSuccess: "Đã xóa sự kiện thành công.",
      createError: "Có lỗi xảy ra khi thêm sự kiện.",
      updateError: "Có lỗi xảy ra khi cập nhật sự kiện.",
      deleteError: "Không thể xóa sự kiện này."
    }
  });

  // Custom handlers
  const handleDeleteClick = (item: ISuKien) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(item.suKienId)) {
      const selected = crud.data.filter((e: ISuKien) => crud.selectedIds.includes(e.suKienId));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([item]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = crud.data.filter((e: ISuKien) => crud.selectedIds.includes(e.suKienId));
    crud.handleDelete(selected);
  };

  // Page actions
  const pageActions = React.useMemo(() => [
    // Bulk actions
    ...(crud.hasSelection ? [
      {
        id: "bulk-delete",
        icon: Trash2,
        label: `Xóa đã chọn (${crud.selectedIds.length})`,
        onClick: handleDeleteSelected,
        variant: "danger" as const,
      }
    ] : []),
    {
      id: "add-new",
      icon: Plus,
      label: "Thêm sự kiện",
      onClick: crud.handleAdd,
      variant: "primary" as const,
    },
  ], [crud.hasSelection, crud.selectedIds.length, handleDeleteSelected, crud.handleAdd]);

  // Loading state
  if (crud.isLoading) {
    return <PageLoading message="Đang tải danh sách sự kiện..." />;
  }

  // Error state
  if (crud.error) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách sự kiện. Vui lòng thử lại sau."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // No family tree state
  if (!dongHoId) {
    return <NoFamilyTreeState />;
  }

  // Format date helper
  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit", 
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  // Format time helper
  const formatTime = (time: string | null | undefined) => {
    if (!time) return "-";
    try {
      // time format: "HH:mm:ss"
      const [hours, minutes] = time.split(":");
      return `${hours}:${minutes}`;
    } catch {
      return "-";
    }
  };

  // Get event status
  const getEventStatus = (ngayDienRa: Date | string | null | undefined) => {
    if (!ngayDienRa) return { text: "Chưa xác định", color: "bg-gray-100 text-gray-800" };
    
    const eventDate = new Date(ngayDienRa);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    eventDate.setHours(0, 0, 0, 0);
    
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { text: "Đã diễn ra", color: "bg-gray-100 text-gray-600" };
    } else if (diffDays === 0) {
      return { text: "Hôm nay", color: "bg-green-100 text-green-800" };
    } else if (diffDays === 1) {
      return { text: "Ngày mai", color: "bg-blue-100 text-blue-800" };
    } else if (diffDays <= 7) {
      return { text: `Còn ${diffDays} ngày`, color: "bg-yellow-100 text-yellow-800" };
    } else {
      return { text: "Sắp diễn ra", color: "bg-purple-100 text-purple-800" };
    }
  };

  // Get priority text and color
  const getPriorityBadge = (uuTien: number | null | undefined) => {
    switch (uuTien) {
      case 3:
        return { text: "Cao", color: "bg-red-100 text-red-800" };
      case 2:
        return { text: "Trung bình", color: "bg-yellow-100 text-yellow-800" };
      case 1:
        return { text: "Thấp", color: "bg-green-100 text-green-800" };
      default:
        return { text: "Không xác định", color: "bg-gray-100 text-gray-800" };
    }
  };

  // Column configuration
  const columns: ColumnConfig<ISuKien>[] = [
    {
      key: "tenSuKien",
      label: "Tên sự kiện",
      clickable: true,
    },
    {
      key: "tenLoaiSuKien",
      label: "Loại sự kiện",
      render: (value) => value || "-",
    },
    {
      key: "ngayDienRa",
      label: "Ngày diễn ra",
      render: (value, row) => {
        const date = formatDate(value);
        const time = formatTime(row.gioDienRa);
        return (
          <div className="flex flex-col">
            <span className="font-medium">{date}</span>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
        );
      },
    },
    {
      key: "uuTien",
      label: "Ưu tiên",
      render: (value) => {
        const badge = getPriorityBadge(value);
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
            {badge.text}
          </span>
        );
      },
    },
    {
      key: "trangThai", // Changed from ngayDienRa to trangThai
      label: "Trạng thái",
      render: (value, row) => {
        const status = getEventStatus(row.ngayDienRa);
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
            {status.text}
          </span>
        );
      },
    },
  ];

  // Action configuration
  const customActions: ActionConfig<ISuKien>[] = [
    {
      icon: Edit,
      label: "Sửa",
      onClick: crud.handleEdit,
      color: "blue",
    },
    {
      icon: Trash2,
      label: "Xóa",
      onClick: handleDeleteClick,
      color: "red",
    },
  ];

  // Detail modal sections
  const getDetailSections = (suKien: ISuKien): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: Tag,
          label: "Tên sự kiện",
          value: suKien.tenSuKien,
        } as DetailField,
        {
          icon: Tag,
          label: "Loại sự kiện",
          value: suKien.tenLoaiSuKien || "Không xác định",
        } as DetailField,
        {
          icon: Calendar,
          label: "Ngày diễn ra",
          value: suKien.ngayDienRa,
          render: (value) => formatDate(value),
        } as DetailField,
        {
          icon: Clock,
          label: "Giờ diễn ra",
          value: suKien.gioDienRa,
          render: (value) => formatTime(value),
        } as DetailField,
      ],
    },
    {
      title: "Chi tiết",
      fields: [
        {
          icon: MapPin,
          label: "Địa điểm",
          value: suKien.diaDiem || "Chưa xác định",
        } as DetailField,
        {
          icon: AlertCircle,
          label: "Ưu tiên",
          value: suKien.uuTien,
          render: (value) => {
            const badge = getPriorityBadge(value);
            return badge.text;
          },
          colorClass: suKien.uuTien === 3 ? "text-red-600" : suKien.uuTien === 2 ? "text-yellow-600" : "text-green-600",
        } as DetailField,
        {
          icon: Calendar,
          label: "Lặp lại",
          value: suKien.lapLai,
          render: (value) => value === 1 ? "Có" : "Không",
        } as DetailField,
        {
          icon: Clock,
          label: "Trạng thái",
          value: suKien.ngayDienRa,
          render: (value) => {
            const status = getEventStatus(value);
            return status.text;
          },
          colorClass: (() => {
            const status = getEventStatus(suKien.ngayDienRa);
            if (status.text === "Hôm nay") return "text-green-600";
            if (status.text === "Ngày mai") return "text-blue-600";
            if (status.text.includes("Còn")) return "text-yellow-600";
            if (status.text === "Đã diễn ra") return "text-gray-600";
            return "text-purple-600";
          })(),
        } as DetailField,
      ],
    },
  ];

  return (
    <PageLayout
      title="QUẢN LÝ SỰ KIỆN"
      subtitle="Danh sách các sự kiện và hoạt động"
      icon={Calendar}
      actions={pageActions}
    >
      {/* Data Table */}
      <DataTable
        data={crud.data}
        columns={columns}
        keyField="suKienId"
        pageIndex={crud.pageIndex}
        pageSize={crud.pageSize}
        totalRecords={crud.totalRecords}
        totalPages={crud.totalPages}
        onPageChange={crud.handlePageChange}
        onPageSizeChange={crud.handlePageSizeChange}
        isLoading={crud.isLoading}
        enableSelection={true}
        selectedIds={crud.selectedIds as number[]}
        onSelectAll={crud.handleSelectAll}
        onSelectOne={crud.handleSelectOne}
        customActions={customActions}
        onViewDetail={crud.handleViewDetail}
        searchValue={crud.searchTerm}
        onSearchChange={crud.handleSearch}
        searchPlaceholder="Tìm kiếm theo tên sự kiện, địa điểm..."
        emptyMessage="Chưa có sự kiện nào được tạo"
      />

      {/* Modals */}
      {crud.isFormOpen && (
        <EventModal
          isOpen={crud.isFormOpen}
          onClose={crud.handleCloseForm}
          onSubmit={crud.handleSave}
          initialData={crud.editingItem}
          isLoading={crud.isSaving}
        />
      )}

      {crud.isDetailOpen && crud.selectedItemForDetail && (
        <DetailModal
          isOpen={crud.isDetailOpen}
          onClose={crud.handleCloseDetail}
          title={crud.selectedItemForDetail.tenSuKien}
          subtitle={`${crud.selectedItemForDetail.tenLoaiSuKien || "Sự kiện"} - ${formatDate(crud.selectedItemForDetail.ngayDienRa)} lúc ${formatTime(crud.selectedItemForDetail.gioDienRa)}`}
          gradient="red-yellow"
          sections={getDetailSections(crud.selectedItemForDetail)}
          notes={crud.selectedItemForDetail.moTa}
        />
      )}

      {crud.isDeleteOpen && (
        <DeleteModal
          isOpen={crud.isDeleteOpen}
          onClose={crud.handleCloseDelete}
          onConfirm={crud.handleConfirmDelete}
          isLoading={crud.isDeleting}
          title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa sự kiện" : `Xác nhận xóa ${crud.itemsToDelete.length} sự kiện`}
          message={crud.itemsToDelete.length === 1 ? 
            "Bạn có chắc chắn muốn xóa sự kiện này? Hành động này không thể hoàn tác." :
            `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} sự kiện đã chọn? Hành động này không thể hoàn tác.`
          }
          items={crud.itemsToDelete}
        />
      )}
    </PageLayout>
  );
}