"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/service/useToas";

// Generic API operations interface
export interface ApiOperations<T, CreateData = Partial<T>, UpdateData = Partial<T>> {
  search: (params: any) => Promise<any>;
  create: (data: CreateData) => Promise<any>;
  update: (data: UpdateData) => Promise<any>;
  delete: (params: { items: T[]; userId?: string }) => Promise<any>;
  export?: () => Promise<Blob>;
  import?: (file: File) => Promise<any>;
}

// Success callbacks interface
export interface SuccessCallbacks {
  create?: () => void;
  update?: () => void;
  delete?: () => void;
}

// Messages interface
export interface ApiMessages {
  createSuccess?: string;
  updateSuccess?: string;
  deleteSuccess?: string;
  createError?: string;
  updateError?: string;
  deleteError?: string;
}

// Hook props interface
export interface UseApiOperationsProps<T> {
  queryKey: string[];
  operations: ApiOperations<T>;
  messages?: ApiMessages;
  onSuccess?: SuccessCallbacks;
}

/**
 * Hook for managing API operations (CRUD)
 * Provides consistent API behavior with loading states and error handling
 */
export function useApiOperations<T>({
  queryKey,
  operations,
  messages = {},
  onSuccess = {},
}: UseApiOperationsProps<T>) {
  const queryClient = useQueryClient();
  const { showSuccess, showError } = useToast();

  // --- CREATE MUTATION ---
  const createMutation = useMutation({
    mutationFn: operations.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSuccess(messages.createSuccess || "Tạo mới thành công!");
      onSuccess.create?.();
    },
    onError: (error: any) => {
      console.error("Create error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || messages.createError || "Có lỗi xảy ra khi tạo mới";
      showError(errorMessage);
    },
  });

  // --- UPDATE MUTATION ---
  const updateMutation = useMutation({
    mutationFn: operations.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSuccess(messages.updateSuccess || "Cập nhật thành công!");
      onSuccess.update?.();
    },
    onError: (error: any) => {
      console.error("Update error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || messages.updateError || "Có lỗi xảy ra khi cập nhật";
      showError(errorMessage);
    },
  });

  // --- DELETE MUTATION ---
  const deleteMutation = useMutation({
    mutationFn: operations.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      showSuccess(messages.deleteSuccess || "Xóa thành công!");
      onSuccess.delete?.();
    },
    onError: (error: any) => {
      console.error("Delete error:", error);
      const errorMessage = error?.response?.data?.message || error?.message || messages.deleteError || "Có lỗi xảy ra khi xóa";
      showError(errorMessage);
    },
  });

  // --- API OPERATION HANDLERS ---
  const create = (data: any) => {
    createMutation.mutate(data);
  };

  const update = (data: any) => {
    updateMutation.mutate(data);
  };

  const deleteItems = (params: { items: T[]; userId?: string }) => {
    deleteMutation.mutate(params);
  };

  return {
    // Mutation functions
    create,
    update,
    delete: deleteItems,
    
    // Loading states
    isSaving: createMutation.isPending || updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    
    // Individual loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    
    // Error states
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    
    // Success states
    createSuccess: createMutation.isSuccess,
    updateSuccess: updateMutation.isSuccess,
    deleteSuccess: deleteMutation.isSuccess,
    
    // Reset functions
    resetCreate: createMutation.reset,
    resetUpdate: updateMutation.reset,
    resetDelete: deleteMutation.reset,
  };
}