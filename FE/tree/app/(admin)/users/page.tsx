"use client";
import React, { useState, useEffect } from "react";
import { Users, Plus, Trash2, Edit } from "lucide-react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";

import { IUser, IUserSearch } from "@/types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/service/user.service";
import { UserModal } from "./components/userModal";
import { UserDetailModal } from "./components/UserDetailModal";
import { useToast } from "@/service/useToas";
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

export default function QuanLyNguoiDungPage() {
  const queryClient = useQueryClient();

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [usersToDelete, setUsersToDelete] = useState<IUser[]>([]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedUserForDetail, setSelectedUserForDetail] = useState<IUser | null>(null);

  const { showSuccess, showError } = useToast();

  // Lấy dongHoId từ user hiện tại để filter người dùng
  const user = storage.getUser();
  const userDongHoId = user?.dongHoId;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IUserSearch = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: userDongHoId, // Chỉ lấy người dùng của dòng họ hiện tại
  };

  const usersQuery = useQuery({
    queryKey: ["users", searchParams],
    queryFn: () => getUsers(searchParams),
    placeholderData: keepPreviousData,
    enabled: !!userDongHoId, // Chỉ fetch khi có dongHoId
  });

  const userData = usersQuery.data?.data || [];
  console.log("User Data:", userData);
  const totalRecords = usersQuery.data?.totalItems || 0;
  const totalPages = usersQuery.data?.pageCount || 0;
  const isLoading = usersQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccess("Thêm người dùng thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi thêm người dùng.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (user: Partial<IUser>) => updateUser(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccess("Cập nhật thông tin thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userIds: string[]) => deleteUser(userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccess("Đã xóa người dùng.");
      setIsDeleteModalOpen(false);
      setUsersToDelete([]);
      setSelectedIds([]);
    },
    onError: (error: any) => {
      showError(error.message || "Không thể xóa người dùng này.");
    },
  });

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(userData.map((u: IUser) => u.nguoiDungId));
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

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: IUser) => {
    // Cho phép mở modal để xem thông tin
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: IUser) => {
    const currentUser = storage.getUser();
    
    // Không cho phép xóa chính mình
    if (user.nguoiDungId === currentUser?.nguoiDungId) {
      showError("Không thể xóa tài khoản của chính mình!");
      return;
    }
    
    if (selectedIds.length > 1 && selectedIds.includes(user.nguoiDungId)) {
      const selected = userData.filter((u: IUser) => selectedIds.includes(u.nguoiDungId));
      setUsersToDelete(selected);
    } else {
      setUsersToDelete([user]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = userData.filter((u: IUser) => selectedIds.includes(u.nguoiDungId));
    setUsersToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const userIds = usersToDelete.map(u => u.nguoiDungId);
    deleteMutation.mutate(userIds);
  };

  const handleSaveUser = (user: Partial<IUser>) => {
    const currentUser = storage.getUser();
    const userDataToSave = {
      ...user,
      nguoiDungId: editingUser?.nguoiDungId,
      nguoiTaoId: editingUser ? editingUser.nguoiTaoId : currentUser?.nguoiDungId,
      lu_user_id: currentUser?.nguoiDungId || undefined,
    };

    if (editingUser) {
      updateMutation.mutate(userDataToSave as Partial<IUser>);
    } else {
      createMutation.mutate(userDataToSave);
    }
  };

  const handleViewDetail = (user: IUser) => {
    setSelectedUserForDetail(user);
    setIsDetailModalOpen(true);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  if (usersQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách người dùng..." />;
  }

  if (usersQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách người dùng. Vui lòng thử lại sau."
        onRetry={() => usersQuery.refetch()}
      />
    );
  }

  // --- NO FAMILY TREE STATE ---
  if (!userDongHoId) {
    return <NoFamilyTreeState />;
  }

  const columns: ColumnConfig<IUser>[] = [
    {
      key: "full_name",
      label: "Họ và tên",
      clickable: true,
    },
    {
      key: "tenDangNhap",
      label: "Tên đăng nhập",
    },
    {
      key: "email",
      label: "Email",
      render: (value) => value || "-",
    },
    {
      key: "phone",
      label: "Số điện thoại",
      render: (value) => value || "-",
    },
    {
      key: "tenDongHo",
      label: "Dòng họ",
      render: (value) => value || "-",
    },
    {
      key: "roleCode",
      label: "Vai trò",
      render: (value) => {
        const roles: Record<string, string> = {
          sa: "Super Admin",
          td: "Thủ Đồ",
          tv: "Thành Viên",
        };
        return roles[value?.toLowerCase()] || value || "-";
      },
    },
    {
      key: "active_flag",
      label: "Tình trạng",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
          value === 1 
            ? "bg-green-100 text-green-800" 
            : "bg-red-100 text-red-800"
        }`}>
          {value === 1 ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              Hoạt động
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              Ngưng hoạt động
            </>
          )}
        </span>
      ),
    },
    {
      key: "online_flag",
      label: "Trạng thái",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${
          value === 1 
            ? "bg-blue-100 text-blue-800" 
            : "bg-gray-100 text-gray-800"
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            value === 1 ? "bg-blue-600 animate-pulse" : "bg-gray-400"
          }`}></span>
          {value === 1 ? "Online" : "Offline"}
        </span>
      ),
    },
  ];

  const customActions: ActionConfig<IUser>[] = [
    {
      icon: Edit,
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

  return (
    <PageLayout
      title="Quản Lý Người Dùng"
      subtitle="Danh sách người dùng và tài khoản truy cập hệ thống"
      icon={Users}
      actions={pageActions}
    >
      <DataTable
        data={userData}
        columns={columns}
        keyField="nguoiDungId"
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
        searchPlaceholder="Tìm kiếm theo họ tên, tài khoản..."
        emptyMessage="Chưa có người dùng nào"
        onViewDetail={handleViewDetail}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
        initialData={editingUser}
        isLoading={isSaving}
      />

      <UserDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        user={selectedUserForDetail}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        items={usersToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setUsersToDelete([]);
        }}
        onConfirm={handleConfirmDelete}
        itemDisplayField="full_name"
        title={usersToDelete.length === 1 ? "Xác nhận xóa người dùng" : `Xác nhận xóa ${usersToDelete.length} người dùng`}
        message={usersToDelete.length === 1 ? 
          "Bạn có chắc chắn muốn xóa người dùng này? Hành động này không thể hoàn tác." :
          `Bạn có chắc chắn muốn xóa ${usersToDelete.length} người dùng đã chọn? Hành động này không thể hoàn tác.`
        }
        isLoading={isDeleting}
      />
    </PageLayout>
  );
}
