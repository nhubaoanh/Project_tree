"use client";
import React from "react";
import { Users, Plus, Trash2, Edit, User, Mail, Phone, Shield, Calendar, Eye } from "lucide-react";
import { IUser, IsearchUser } from "@/types/user";
import { getUsers as searchUser, createUser, updateUser, deleteUser } from "@/service/user.service";
import { UserModal } from "./components/userModal";
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

export default function QuanLyNguoiDungPage() {
  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Use generic CRUD hook
  const crud = useCrudPage<IUser>({
    queryKey: ["users", dongHoId || ""],
    operations: {
      search: (params) => {
        const searchParams: IsearchUser = {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize,
          search_content: params.search_content,
          dongHoId: dongHoId || "",
        };
        return searchUser(searchParams);
      },
      create: (data) => createUser(data as IUser),
      update: (data) => updateUser(data as IUser),
      delete: (params) => {
        const userIds = params.items.map((item: IUser) => item.nguoiDungId);
        return deleteUser(userIds, params.userId || user?.nguoiDungId);
      },
    },
    searchParams: { dongHoId: dongHoId || "" },
    tableConfig: {
      initialPageSize: 10,
      enableSelection: true,
      enableSearch: true
    },
    messages: {
      createSuccess: "Thêm người dùng thành công!",
      updateSuccess: "Cập nhật người dùng thành công!",
      deleteSuccess: "Đã xóa người dùng thành công.",
      createError: "Có lỗi xảy ra khi thêm người dùng.",
      updateError: "Có lỗi xảy ra khi cập nhật người dùng.",
      deleteError: "Không thể xóa người dùng này."
    }
  });

  // Custom handlers
  const handleDeleteClick = (item: IUser) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(item.nguoiDungId)) {
      const selected = crud.data.filter((e: IUser) => crud.selectedIds.includes(e.nguoiDungId));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([item]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = crud.data.filter((e: IUser) => crud.selectedIds.includes(e.nguoiDungId));
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
      label: "Thêm người dùng",
      onClick: crud.handleAdd,
      variant: "primary" as const,
    },
  ], [crud.hasSelection, crud.selectedIds.length, handleDeleteSelected, crud.handleAdd]);

  // Loading state
  if (crud.isLoading) {
    return <PageLoading message="Đang tải danh sách người dùng..." />;
  }

  // Error state
  if (crud.error) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách người dùng. Vui lòng thử lại sau."
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
  const columns: ColumnConfig<IUser>[] = [
    {
      key: "hoTen",
      label: "Họ và tên",
      clickable: true,
    },
    {
      key: "email",
      label: "Email",
      render: (value) => value || "-",
    },
    {
      key: "soDienThoai",
      label: "Số điện thoại",
      render: (value) => value || "-",
    },
    {
      key: "roleCode",
      label: "Vai trò",
      render: (value) => {
        const roles: Record<string, { label: string; color: string }> = {
          "thanhvien": { label: "Thành viên", color: "bg-blue-100 text-blue-800" },
          "thudo": { label: "Thủ độ", color: "bg-purple-100 text-purple-800" },
        };
        const role = roles[value] || { label: value || "-", color: "bg-gray-100 text-gray-800" };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${role.color}`}>
            {role.label}
          </span>
        );
      },
    },
    {
      key: "ngayTao",
      label: "Ngày tạo",
      render: (value) => formatDate(value),
    },
    {
      key: "active_flag",
      label: "Trạng thái",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 1 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {value === 1 ? "Hoạt động" : "Không hoạt động"}
        </span>
      ),
    },
  ];

  // Action configuration
  const customActions: ActionConfig<IUser>[] = [
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
  const getDetailSections = (nguoiDung: IUser): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: User,
          label: "Họ và tên",
          value: nguoiDung.hoTen,
        } as DetailField,
        {
          icon: Mail,
          label: "Email",
          value: nguoiDung.email || "Không có",
        } as DetailField,
        {
          icon: Phone,
          label: "Số điện thoại",
          value: nguoiDung.soDienThoai || "Không có",
        } as DetailField,
        {
          icon: Calendar,
          label: "Ngày tạo",
          value: nguoiDung.ngayTao,
          render: (value) => formatDate(value),
        } as DetailField,
      ],
    },
    {
      title: "Phân quyền",
      fields: [
        {
          icon: Shield,
          label: "Vai trò",
          value: nguoiDung.roleCode,
          render: (value) => {
            const roles: Record<string, string> = {
              "thanhvien": "Thành viên",
              "thudo": "Thủ độ",
            };
            return roles[value] || value || "Không có";
          },
          colorClass: nguoiDung.roleCode === "thudo" ? "text-purple-600" : "text-blue-600",
        } as DetailField,
        {
          icon: Eye,
          label: "Trạng thái",
          value: nguoiDung.active_flag,
          render: (value) => value === 1 ? "Hoạt động" : "Không hoạt động",
          colorClass: nguoiDung.active_flag === 1 ? "text-green-600" : "text-red-600",
        } as DetailField,
      ],
    },
  ];

  return (
    <PageLayout
      title="QUẢN LÝ NGƯỜI DÙNG"
      subtitle="Danh sách người dùng và phân quyền"
      icon={Users}
      actions={pageActions}
    >
      {/* Data Table */}
      <DataTable
        data={crud.data}
        columns={columns}
        keyField="nguoiDungId"
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
        searchPlaceholder="Tìm kiếm theo tên, email, số điện thoại..."
        emptyMessage="Chưa có người dùng nào được tạo"
      />

      {/* Modals */}
      {crud.isFormOpen && (
        <UserModal
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
          title={crud.selectedItemForDetail.hoTen}
          subtitle={`Người dùng tạo ngày ${formatDate(crud.selectedItemForDetail.ngayTao)}`}
          gradient="red-yellow"
          sections={getDetailSections(crud.selectedItemForDetail)}
        />
      )}

      {crud.isDeleteOpen && (
        <DeleteModal
          isOpen={crud.isDeleteOpen}
          onClose={crud.handleCloseDelete}
          onConfirm={crud.handleConfirmDelete}
          isLoading={crud.isDeleting}
          title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa người dùng" : `Xác nhận xóa ${crud.itemsToDelete.length} người dùng`}
          message={crud.itemsToDelete.length === 1 ? 
            "Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác." :
            `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} người dùng đã chọn? Hành động này không thể hoàn tác.`
          }
          items={crud.itemsToDelete}
        />
      )}
    </PageLayout>
  );
}