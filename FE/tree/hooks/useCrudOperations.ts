"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/service/useToas";

export interface CrudOperations<T, CreateData = Partial<T>, UpdateData = Partial<T>> {
  create: (data: CreateData) => Promise<any>;
  update: (data: UpdateData) => Promise<any>;
  delete: (items: any[], userId: string) => Promise<any>;
}

export interface UseCrudOperationsProps<T> {
  queryKey: string[];
  operations: CrudOperations<T>;
  messages?: {
    createSuccess?: string;
    updateSuccess?: string;
    deleteSuccess?: string;
    createError?: string;
    updateError?: string;
    deleteError?: string;
  };
}

export function useCrudOperations<T>({
  queryKey,
  operations,
  messages = {},
}: UseCrudOperationsProps<T>) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [itemsToDelete, setItemsToDelete] = useState<T[]>([]);

  // Selection state
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: operations.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSuccess(messages.createSuccess || "Thêm thành công!");
      setIsModalOpen(false);
      setEditingItem(null);
    },
    onError: (error: any) => {
      showError(error.message || messages.createError || "Có lỗi xảy ra khi thêm.");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: operations.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSuccess(messages.updateSuccess || "Cập nhật thành công!");
      setIsModalOpen(false);
      setEditingItem(null);
    },
    onError: (error: any) => {
      showError(error.message || messages.updateError || "Có lỗi xảy ra khi cập nhật.");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: ({ items, userId }: { items: any[]; userId: string }) => 
      operations.delete(items, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSuccess(messages.deleteSuccess || "Xóa thành công!");
      setIsDeleteModalOpen(false);
      setItemsToDelete([]);
      setSelectedIds([]);
    },
    onError: (error: any) => {
      showError(error.message || messages.deleteError || "Có lỗi xảy ra khi xóa.");
    },
  });

  // Handlers
  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: T, keyField: string) => {
    const itemId = (item as any)[keyField];
    // Nếu đã chọn nhiều items và item hiện tại nằm trong danh sách đã chọn
    if (selectedIds.length > 1 && selectedIds.includes(itemId)) {
      // Xóa tất cả items đã chọn
      setItemsToDelete(selectedIds.map(id => 
        // Tìm item theo id (cần có data array để tìm)
        item // Tạm thời chỉ xóa item hiện tại, cần cải thiện logic này
      ));
    } else {
      // Chỉ xóa item được click
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = (data: T[], keyField: string) => {
    const selected = data.filter((item) => 
      selectedIds.includes((item as any)[keyField])
    );
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingItem) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  const handleConfirmDelete = (userId: string) => {
    deleteMutation.mutate({ items: itemsToDelete, userId });
  };

  const handleSelectAll = (data: T[], keyField: string, checked: boolean) => {
    if (checked) {
      setSelectedIds(data.map((item) => (item as any)[keyField]));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string | number, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemsToDelete([]);
  };

  return {
    // States
    isModalOpen,
    isDeleteModalOpen,
    editingItem,
    itemsToDelete,
    selectedIds,

    // Loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSaving: createMutation.isPending || updateMutation.isPending,

    // Handlers
    handleAdd,
    handleEdit,
    handleDeleteClick,
    handleDeleteSelected,
    handleSave,
    handleConfirmDelete,
    handleSelectAll,
    handleSelectOne,
    closeModal,
    closeDeleteModal,

    // Setters (for manual control if needed)
    setSelectedIds,
    setIsModalOpen,
    setEditingItem,
  };
}