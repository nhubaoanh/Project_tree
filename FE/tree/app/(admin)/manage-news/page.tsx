"use client";
import React from "react";
import { Newspaper, Plus, Trash2, Edit, User, Calendar, Eye, FileText, Tag } from "lucide-react";
import { ITinTuc, ISearchTinTuc, searchTinTuc, createTinTuc, updateTinTuc, deleteTinTuc } from "@/service/tintuc.service";
import { TinTucModal } from "./components/TinTucModal";
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

export default function QuanLyTinTucPage() {
  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Use generic CRUD hook
  const crud = useCrudPage<ITinTuc>({
    queryKey: ["tinTuc", dongHoId || ""],
    operations: {
      search: (params) => {
        const searchParams: ISearchTinTuc = {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize,
          search_content: params.search_content,
          dongHoId: dongHoId || "",
        };
        return searchTinTuc(searchParams);
      },
      create: (data) => createTinTuc(data as ITinTuc),
      update: (data) => {
        const id = (data as any).tinTucId;
        return updateTinTuc(id, data as ITinTuc);
      },
      delete: (params) => {
        const listJson = params.items.map((item: ITinTuc) => ({ 
          tinTucId: item.tinTucId! 
        }));
        return deleteTinTuc(listJson, params.userId || user?.nguoiDungId || "");
      },
    },
    searchParams: { dongHoId: dongHoId || "" },
    tableConfig: {
      initialPageSize: 10,
      enableSelection: true,
      enableSearch: true
    },
    messages: {
      createSuccess: "Thêm tin tức thành công!",
      updateSuccess: "Cập nhật tin tức thành công!",
      deleteSuccess: "Đã xóa tin tức thành công.",
      createError: "Có lỗi xảy ra khi thêm tin tức.",
      updateError: "Có lỗi xảy ra khi cập nhật tin tức.",
      deleteError: "Không thể xóa tin tức này."
    }
  });

  // Custom handlers
  const handleDeleteClick = (item: ITinTuc) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(item.tinTucId!)) {
      const selected = crud.data.filter((e: ITinTuc) => crud.selectedIds.includes(e.tinTucId!));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([item]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = crud.data.filter((e: ITinTuc) => crud.selectedIds.includes(e.tinTucId!));
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
      label: "Thêm tin tức",
      onClick: crud.handleAdd,
      variant: "primary" as const,
    },
  ], [crud.hasSelection, crud.selectedIds.length, handleDeleteSelected, crud.handleAdd]);

  // Loading state
  if (crud.isLoading) {
    return <PageLoading message="Đang tải danh sách tin tức..." />;
  }

  // Error state
  if (crud.error) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách tin tức. Vui lòng thử lại sau."
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

  // Column configuration
  const columns: ColumnConfig<ITinTuc>[] = [
    {
      key: "tieuDe",
      label: "Tiêu đề",
      clickable: true,
    },
    {
      key: "tomTat",
      label: "Tóm tắt",
      render: (value) => {
        if (!value) return "-";
        const truncated = value.length > 100 ? value.substring(0, 100) + "..." : value;
        return (
          <span className="text-sm text-gray-600" title={value}>
            {truncated}
          </span>
        );
      },
    },
    {
      key: "ngayDang",
      label: "Ngày đăng",
      render: (value) => formatDate(value),
    },
    {
      key: "tacGia",
      label: "Tác giả",
      render: (value) => value || "-",
    },
    {
      key: "ghim",
      label: "Trạng thái",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 1 
            ? "bg-yellow-100 text-yellow-800" 
            : "bg-green-100 text-green-800"
        }`}>
          {value === 1 ? "Đã ghim" : "Hoạt động"}
        </span>
      ),
    },
  ];

  // Action configuration
  const customActions: ActionConfig<ITinTuc>[] = [
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
  const getDetailSections = (tinTuc: ITinTuc): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: FileText,
          label: "Tiêu đề",
          value: tinTuc.tieuDe,
        } as DetailField,
        {
          icon: Tag,
          label: "Tóm tắt",
          value: tinTuc.tomTat || "Không có",
        } as DetailField,
        {
          icon: Calendar,
          label: "Ngày đăng",
          value: tinTuc.ngayDang,
          render: (value) => formatDate(value),
        } as DetailField,
        {
          icon: User,
          label: "Tác giả",
          value: tinTuc.tacGia || "Không có",
        } as DetailField,
      ],
    },
    {
      title: "Trạng thái",
      fields: [
        {
          icon: Eye,
          label: "Lượt xem",
          value: tinTuc.luotXem || 0,
        } as DetailField,
        {
          icon: Eye,
          label: "Ghim",
          value: tinTuc.ghim,
          render: (value) => value === 1 ? "Đã ghim" : "Không ghim",
          colorClass: tinTuc.ghim === 1 ? "text-yellow-600" : "text-gray-600",
        } as DetailField,
      ],
    },
  ];

  return (
    <PageLayout
      title="Quản lý tin tức"
      subtitle="Danh sách tin tức và bài viết"
      icon={Newspaper}
      actions={pageActions}
    >
      {/* Data Table */}
      <DataTable
        data={crud.data}
        columns={columns}
        keyField="tinTucId"
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
        searchPlaceholder="Tìm kiếm theo tiêu đề, tóm tắt..."
        emptyMessage="Chưa có tin tức nào được tạo"
      />

      {/* Modals */}
      {crud.isFormOpen && (
        <TinTucModal
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
          title={crud.selectedItemForDetail.tieuDe}
          subtitle={`Tin tức ngày ${formatDate(crud.selectedItemForDetail.ngayDang)}`}
          gradient="red-yellow"
          sections={getDetailSections(crud.selectedItemForDetail)}
          notes={crud.selectedItemForDetail.noiDung}
        />
      )}

      {crud.isDeleteOpen && (
        <DeleteModal
          isOpen={crud.isDeleteOpen}
          onClose={crud.handleCloseDelete}
          onConfirm={crud.handleConfirmDelete}
          isLoading={crud.isDeleting}
          title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa tin tức" : `Xác nhận xóa ${crud.itemsToDelete.length} tin tức`}
          message={crud.itemsToDelete.length === 1 ? 
            "Bạn có chắc chắn muốn xóa tin tức này? Hành động này không thể hoàn tác." :
            `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} tin tức đã chọn? Hành động này không thể hoàn tác.`
          }
          items={crud.itemsToDelete}
        />
      )}
    </PageLayout>
  );
}