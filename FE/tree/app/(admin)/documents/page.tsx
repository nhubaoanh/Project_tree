"use client";
import React from "react";
import { FileText, Plus, Trash2, Edit, User, Calendar, Download, Eye, Tag } from "lucide-react";
import { ITaiLieu, ISearchTaiLieu, searchTaiLieu, createTaiLieu, updateTaiLieu, deleteTaiLieu } from "@/service/tailieu.service";
import { TaiLieuModal } from "./components/TaiLieuModal";
import { useCrudPage } from "@/hooks";
import storage from "@/utils/storage";
import { getFileUrl } from "@/utils/imageUtils";
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

export default function QuanLyTaiLieuPage() {
  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Use generic CRUD hook
  const crud = useCrudPage<ITaiLieu>({
    queryKey: ["taiLieu", dongHoId || ""],
    operations: {
      search: (params) => {
        const searchParams: ISearchTaiLieu = {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize,
          search_content: params.search_content,
          dongHoId: dongHoId || "",
        };
        return searchTaiLieu(searchParams);
      },
      create: (data) => createTaiLieu({ ...data, dongHoId: dongHoId || "" } as ITaiLieu),
      update: (data) => {
        const id = (data as any).taiLieuId;
        return updateTaiLieu(id, { ...data, dongHoId: dongHoId || "" } as ITaiLieu);
      },
      delete: (params) => {
        const listJson = params.items.map((item: ITaiLieu) => ({ 
          taiLieuId: item.taiLieuId! 
        }));
        return deleteTaiLieu(listJson, params.userId || user?.nguoiDungId || "");
      },
    },
    searchParams: { dongHoId: dongHoId || "" },
    tableConfig: {
      initialPageSize: 10,
      enableSelection: true,
      enableSearch: true
    },
    messages: {
      createSuccess: "Thêm tài liệu thành công!",
      updateSuccess: "Cập nhật tài liệu thành công!",
      deleteSuccess: "Đã xóa tài liệu thành công.",
      createError: "Có lỗi xảy ra khi thêm tài liệu.",
      updateError: "Có lỗi xảy ra khi cập nhật tài liệu.",
      deleteError: "Không thể xóa tài liệu này."
    }
  });

  // Custom handlers
  const handleDeleteClick = (item: ITaiLieu) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(item.taiLieuId!)) {
      const selected = crud.data.filter((e: ITaiLieu) => crud.selectedIds.includes(e.taiLieuId!));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([item]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = crud.data.filter((e: ITaiLieu) => crud.selectedIds.includes(e.taiLieuId!));
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
      label: "Thêm tài liệu",
      onClick: crud.handleAdd,
      variant: "primary" as const,
    },
  ], [crud.hasSelection, crud.selectedIds.length, handleDeleteSelected, crud.handleAdd]);

  // Loading state
  if (crud.isLoading) {
    return <PageLoading message="Đang tải danh sách tài liệu..." />;
  }

  // Error state
  if (crud.error) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách tài liệu. Vui lòng thử lại sau."
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

  // Format file size helper
  const formatFileSize = (bytes: number | null | undefined) => {
    if (!bytes) return "-";
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  // Column configuration
  const columns: ColumnConfig<ITaiLieu>[] = [
    {
      key: "tenTaiLieu",
      label: "Tên tài liệu",
      clickable: true,
    },
    {
      key: "loaiTaiLieu",
      label: "Loại tài liệu",
      render: (value) => value || "-",
    },
    {
      key: "moTa",
      label: "Mô tả",
      render: (value) => {
        if (!value) return "-";
        // Truncate long descriptions
        return value.length > 50 ? value.substring(0, 50) + "..." : value;
      },
    },
    {
      key: "ngayTaiLen",
      label: "Ngày tải lên",
      render: (value) => formatDate(value),
    },
    {
      key: "tacGia",
      label: "Tác giả",
      render: (value) => value || "-",
    },
    {
      key: "trangThai",
      label: "Trạng thái",
      render: () => (
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Hoạt động
        </span>
      ),
    },
  ];

  // Action configuration
  const customActions: ActionConfig<ITaiLieu>[] = [
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
  const getDetailSections = (taiLieu: ITaiLieu): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: FileText,
          label: "Tên tài liệu",
          value: taiLieu.tenTaiLieu,
        } as DetailField,
        {
          icon: Tag,
          label: "Loại tài liệu",
          value: taiLieu.loaiTaiLieu || "Không có",
        } as DetailField,
        {
          icon: Calendar,
          label: "Ngày tải lên",
          value: taiLieu.ngayTaiLen,
          render: (value) => formatDate(value),
        } as DetailField,
      ],
    },
    {
      title: "Tải xuống",
      fields: [
        {
          icon: Download,
          label: "File đính kèm",
          value: taiLieu.duongDan,
          render: (value) => {
            if (!value) return "Không có file";
            return (
              <button
                onClick={() => window.open(getFileUrl(value), '_blank')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                <Download size={16} />
                Tải xuống tài liệu
              </button>
            );
          },
        } as DetailField,
      ],
    },
    {
      title: "Thông tin chi tiết",
      fields: [
        {
          icon: User,
          label: "Tác giả",
          value: taiLieu.tacGia || "Không có",
        } as DetailField,
        {
          icon: Calendar,
          label: "Năm sáng tác",
          value: taiLieu.namSangTac || "Không có",
        } as DetailField,
        {
          icon: Tag,
          label: "Nguồn gốc",
          value: taiLieu.nguonGoc || "Không có",
        } as DetailField,
      ],
    },
  ];

  return (
    <PageLayout
      title="QUẢN LÝ TÀI LIỆU"
      subtitle="Danh sách tài liệu và file đính kèm"
      icon={FileText}
      actions={pageActions}
    >
      {/* Data Table */}
      <DataTable
        data={crud.data}
        columns={columns}
        keyField="taiLieuId"
        pageIndex={crud.pageIndex}
        pageSize={crud.pageSize}
        totalRecords={crud.totalRecords}
        totalPages={crud.totalPages}
        onPageChange={crud.handlePageChange}
        onPageSizeChange={crud.handlePageSizeChange}
        isLoading={crud.isLoading}
        enableSelection={true}
        selectedIds={crud.selectedIds as string[]}
        onSelectAll={crud.handleSelectAll}
        onSelectOne={crud.handleSelectOne}
        customActions={customActions}
        onViewDetail={crud.handleViewDetail}
        searchValue={crud.searchTerm}
        onSearchChange={crud.handleSearch}
        searchPlaceholder="Tìm kiếm theo tên tài liệu, loại tài liệu..."
        emptyMessage="Chưa có tài liệu nào được tạo"
      />

      {/* Modals */}
      {crud.isFormOpen && (
        <TaiLieuModal
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
          title={crud.selectedItemForDetail.tenTaiLieu}
          subtitle={`Tài liệu tải lên ngày ${formatDate(crud.selectedItemForDetail.ngayTaiLen)}`}
          gradient="red-yellow"
          sections={getDetailSections(crud.selectedItemForDetail)}
          notes={crud.selectedItemForDetail.moTa || crud.selectedItemForDetail.ghiChu}
        />
      )}

      {crud.isDeleteOpen && (
        <DeleteModal
          isOpen={crud.isDeleteOpen}
          onClose={crud.handleCloseDelete}
          onConfirm={crud.handleConfirmDelete}
          isLoading={crud.isDeleting}
          title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa tài liệu" : `Xác nhận xóa ${crud.itemsToDelete.length} tài liệu`}
          message={crud.itemsToDelete.length === 1 ? 
            "Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác." :
            `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} tài liệu đã chọn? Hành động này không thể hoàn tác.`
          }
          items={crud.itemsToDelete}
        />
      )}
    </PageLayout>
  );
}