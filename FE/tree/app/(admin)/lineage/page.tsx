"use client";
import React, { useState } from "react";
import { Users, Plus, Trash2, Edit } from "lucide-react";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { useToast } from "@/service/useToas";
import { LineageModal } from "./components/LineageModal";
import { 
  IDongHo, 
  IDongHoSearch, 
  searchDongHo, 
  createDongHo, 
  updateDongHo, 
  deleteDongHo 
} from "@/service/dongho.service";
import { 
  PageLayout, 
  DataTable, 
  DeleteModal, 
  PageLoading, 
  ErrorState 
} from "@/components/shared";
import type { ColumnConfig, ActionConfig } from "@/components/shared";

export default function LineagePage() {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  // States
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLineage, setEditingLineage] = useState<IDongHo | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lineageToDelete, setLineageToDelete] = useState<IDongHo | null>(null);

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch data
  const searchParams: IDongHoSearch = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
  };

  const lineageQuery = useQuery({
    queryKey: ["lineage", searchParams],
    queryFn: () => searchDongHo(searchParams),
    placeholderData: keepPreviousData,
  });

  const lineageData = lineageQuery.data?.data || [];
  const totalRecords = lineageQuery.data?.totalItems || 0;
  const totalPages = lineageQuery.data?.pageCount || 0;
  const isLoading = lineageQuery.isLoading;

  // Mutations
  const createMutation = useMutation({
    mutationFn: createDongHo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lineage"] });
      showSuccess("Thêm dòng họ thành công!");
      setIsModalOpen(false);
      setEditingLineage(null);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi thêm dòng họ.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateDongHo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lineage"] });
      showSuccess("Cập nhật dòng họ thành công!");
      setIsModalOpen(false);
      setEditingLineage(null);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteDongHo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lineage"] });
      showSuccess("Đã xóa dòng họ thành công.");
      setIsDeleteModalOpen(false);
      setLineageToDelete(null);
      setSelectedIds([]);
    },
    onError: (error: any) => {
      showError(error.message || "Không thể xóa dòng họ.");
    },
  });

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(lineageData.map((l: IDongHo) => l.dongHoId));
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
    setEditingLineage(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lineage: IDongHo) => {
    setEditingLineage(lineage);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (lineage: IDongHo) => {
    setLineageToDelete(lineage);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (lineageToDelete) {
      deleteMutation.mutate(lineageToDelete.dongHoId);
    }
  };

  const handleSaveLineage = (data: any) => {
    if (editingLineage) {
      updateMutation.mutate({ id: editingLineage.dongHoId, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // Loading state
  if (lineageQuery.isLoading && !lineageData.length) {
    return <PageLoading message="Đang tải danh sách dòng họ..." />;
  }

  // Error state
  if (lineageQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách dòng họ. Vui lòng thử lại sau."
        onRetry={() => lineageQuery.refetch()}
      />
    );
  }

  // Column configuration
  const columns: ColumnConfig<IDongHo>[] = [
    {
      key: "tenDongHo",
      label: "Tên dòng họ",
      clickable: true,
    },
    {
      key: "queQuanGoc",
      label: "Quê quán gốc",
      render: (value) => value || "-",
    },
    {
      key: "ngayThanhLap",
      label: "Ngày thành lập",
      render: (value) => value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    {
      key: "nguoiQuanLy",
      label: "Người quản lý",
      render: (value) => value || "-",
    },
  ];

  // Action configuration
  const customActions: ActionConfig<IDongHo>[] = [
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

  // Page actions
  const pageActions = [
    {
      icon: Plus,
      label: "Thêm Dòng Họ",
      onClick: handleAdd,
      variant: "primary" as const,
    },
  ];

  return (
    <PageLayout
      title="Quản Lý Dòng Họ"
      subtitle="Danh sách các dòng họ trong hệ thống"
      icon={Users}
      actions={pageActions}
    >
      <DataTable
        data={lineageData}
        columns={columns}
        keyField="dongHoId"
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
        enableSelection={false}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        customActions={customActions}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo tên dòng họ..."
        emptyMessage="Chưa có dòng họ nào được tạo"
      />

      <LineageModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingLineage(null);
        }}
        onSubmit={handleSaveLineage}
        initialData={editingLineage}
        isLoading={isSaving}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        items={lineageToDelete ? [lineageToDelete] : []}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setLineageToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        itemDisplayField="tenDongHo"
        title="Xác nhận xóa dòng họ"
        message="Bạn có chắc chắn muốn xóa dòng họ này? Hành động này không thể hoàn tác."
      />
    </PageLayout>
  );
}
