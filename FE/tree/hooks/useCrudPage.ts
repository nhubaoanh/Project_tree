"use client";

import { useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/service/useToas";
import { useApiOperations } from "./useApiOperations";
import { useTableState } from "./useTableState";
import { useModalState } from "./useModalState";
import { useErrorModal } from "./useErrorModal";
import { AlertCircle, CheckCircle, Info } from "lucide-react";

// Generic search parameters interface
export interface SearchParams {
  pageIndex: number;
  pageSize: number;
  search_content?: string;
  dongHoId?: string;
  [key: string]: any;
}

// Generic search result interface
export interface SearchResult<T> {
  data: T[];
  totalItems: number;
  pageCount: number;
  success: boolean;
  message?: string;
}

// Generic CRUD operations interface
export interface CrudOperations<T, CreateData = Partial<T>, UpdateData = Partial<T>> {
  search: (params: SearchParams) => Promise<SearchResult<T>>;
  create: (data: CreateData) => Promise<any>;
  update: (data: UpdateData) => Promise<any>;
  delete: (params: { items: T[]; userId?: string }) => Promise<any>;
  export?: () => Promise<Blob>;
  import?: (file: File) => Promise<any>;
}

// Hook configuration interface
export interface UseCrudPageProps<T> {
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
  searchParams?: Partial<SearchParams>;
  tableConfig?: {
    initialPageSize?: number;
    enableSelection?: boolean;
    enableSearch?: boolean;
    searchDebounceMs?: number;
  };
  enableImportExport?: boolean;
}

/**
 * Generic CRUD page hook - Combines table state, modal state, and API operations
 * Provides complete CRUD functionality with consistent behavior
 * Import errors are displayed using DetailModal from shared components
 */
export function useCrudPage<T extends { [key: string]: any }>({
  queryKey,
  operations,
  messages = {},
  searchParams: additionalParams = {},
  tableConfig = {},
  enableImportExport = false,
}: UseCrudPageProps<T>) {
  const { showSuccess, showError } = useToast();

  // --- SUB-HOOKS ---
  const tableState = useTableState<T>(tableConfig);
  const modalState = useModalState<T>();
  const errorModal = useErrorModal();
  
  // --- BUILD SEARCH PARAMS ---
  const searchParams: SearchParams = {
    pageIndex: tableState.pageIndex,
    pageSize: tableState.pageSize,
    search_content: tableState.debouncedSearch,
    ...additionalParams,
  };

  // --- DATA FETCHING ---
  const dataQuery = useQuery({
    queryKey: [...queryKey, searchParams],
    queryFn: () => operations.search(searchParams),
    placeholderData: (previousData) => previousData,
  });

  const data = dataQuery.data?.data || [];
  console.log("dtaa", data)
  const totalRecords = dataQuery.data?.totalItems || 0;
  const totalPages = dataQuery.data?.pageCount || 0;
  const isLoading = dataQuery.isLoading;
  const error = dataQuery.error;

  // --- API OPERATIONS ---
  const apiOps = useApiOperations<T>({
    queryKey,
    operations: {
      ...operations,
      // Adapter để chuyển đổi signature của delete method
      delete: (params: { items: T[]; userId?: string }) => operations.delete(params)
    },
    messages,
    onSuccess: {
      create: () => modalState.closeForm(),
      update: () => modalState.closeForm(),
      delete: () => {
        modalState.closeDeleteModal();
        tableState.clearSelection();
      }
    }
  });

  // --- IMPORT/EXPORT HANDLERS ---
  const handleExport = useCallback(async () => {
    if (!operations.export) {
      showError("Chức năng xuất file không được hỗ trợ");
      return;
    }
    
    try {
      const blob = await operations.export();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `export_${Date.now()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      showSuccess("Xuất file thành công!");
    } catch (error: any) {
      showError(error?.message || "Có lỗi xảy ra khi xuất file");
    }
  }, [operations.export, showSuccess, showError]);

  const handleImport = useCallback(async (file: File) => {
    if (!operations.import) {
      showError("Chức năng nhập file không được hỗ trợ");
      return;
    }
    
    try {
      const result = await operations.import(file);
      
      if (result?.success) {
        dataQuery.refetch(); // Refresh data
        showSuccess(result.message || "Import thành công!");
        return { success: true };
      } else {
        // Nếu có errors từ backend, hiển thị ErrorModal
        if (result?.errors && Array.isArray(result.errors)) {
          errorModal.showError(
            "Lỗi khi nhập dữ liệu Excel",
            result.errors,
            result.warnings || [],
            {
              validCount: result.validCount || 0,
              totalCount: result.totalCount || 0
            }
          );
        } else {
          showError(result?.message || "Import thất bại");
        }
        return { success: false };
      }
    } catch (error: any) {
      console.error("Import error:", error);
      
      // Parse error response để hiển thị ErrorModal
      const errorResponse = error?.response?.data;
      
      if (errorResponse?.errors && Array.isArray(errorResponse.errors)) {
        errorModal.showError(
          "Lỗi khi nhập dữ liệu Excel",
          errorResponse.errors,
          errorResponse.warnings || [],
          {
            validCount: errorResponse.validCount || 0,
            totalCount: errorResponse.totalCount || 0
          }
        );
      } else {
        // Fallback: hiển thị lỗi generic
        errorModal.showError(
          "Lỗi khi nhập dữ liệu Excel",
          [{
            field: "Lỗi hệ thống",
            message: error?.message || "Có lỗi xảy ra khi nhập file",
            value: "UNKNOWN_ERROR"
          }]
        );
      }
      
      return { success: false };
    }
  }, [operations.import, dataQuery, showSuccess, showError, errorModal]);

  // --- COMBINED HANDLERS ---
  const handleAdd = useCallback(() => {
    modalState.openFormForAdd();
  }, [modalState]);

  const handleEdit = useCallback((item: T) => {
    modalState.openFormForEdit(item);
  }, [modalState]);

  const handleDelete = useCallback((items: T[]) => {
    modalState.openDeleteModal(items);
  }, [modalState]);

  const handleViewDetail = useCallback((item: T) => {
    modalState.openDetailModal(item);
  }, [modalState]);

  const handleSave = useCallback((data: any) => {
    if (modalState.editingItem) {
      apiOps.update(data);
    } else {
      apiOps.create(data);
    }
  }, [modalState.editingItem, apiOps]);

  const handleConfirmDelete = useCallback(() => {
    if (modalState.itemsToDelete.length > 0) {
      apiOps.delete({ 
        items: modalState.itemsToDelete,
        userId: additionalParams.userId as string
      });
    }
  }, [modalState.itemsToDelete, apiOps, additionalParams.userId]);

  const handleDeleteSelected = useCallback(() => {
    const itemsToDeleteSelected = data.filter((item: T) => 
      tableState.selectedIds.includes(
        item.id || item.nguoiDungId || item.thanhVienId || item.suKienId || 
        item.roleId || item.tinTucId || item.taiLieuId || item.thuId || item.chiId
      )
    );
    if (itemsToDeleteSelected.length > 0) {
      handleDelete(itemsToDeleteSelected);
    }
  }, [data, tableState.selectedIds, handleDelete]);

  // --- NOTIFICATION MODAL SECTIONS GENERATOR ---
  const getNotificationSections = useCallback(() => {
    if (!modalState.notificationData) return [];
    
    const { type, message, details } = modalState.notificationData;
    
    const getIcon = () => {
      switch (type) {
        case "success": return CheckCircle;
        case "error": return AlertCircle;
        case "info": return Info;
        default: return Info;
      }
    };

    const getColorClass = () => {
      switch (type) {
        case "success": return "text-green-600";
        case "error": return "text-red-600";
        case "info": return "text-blue-600";
        default: return "text-blue-600";
      }
    };

    return [
      {
        title: "Thông báo",
        fields: [
          {
            icon: getIcon(),
            label: "Trạng thái",
            value: message,
            colorClass: getColorClass(),
          },
          ...(details ? [{
            icon: Info,
            label: "Chi tiết",
            value: details,
            colorClass: "text-gray-600",
          }] : []),
        ],
      },
    ];
  }, [modalState.notificationData]);

  return {
    // Data
    data,
    isLoading,
    error,
    
    // Pagination
    pageIndex: tableState.pageIndex,
    pageSize: tableState.pageSize,
    totalRecords,
    totalPages,
    
    // Search
    searchTerm: tableState.searchTerm,
    
    // Selection
    selectedIds: tableState.selectedIds,
    hasSelection: tableState.hasSelection,
    isAllSelected: tableState.isAllSelected(data),
    
    // Modals
    isFormOpen: modalState.isFormOpen,
    isDeleteOpen: modalState.isDeleteOpen,
    isDetailOpen: modalState.isDetailOpen,
    isNotificationOpen: modalState.isNotificationOpen,
    editingItem: modalState.editingItem,
    itemsToDelete: modalState.itemsToDelete,
    selectedItemForDetail: modalState.selectedItemForDetail,
    notificationData: modalState.notificationData,
    
    // Error Modal (for import errors)
    isErrorModalOpen: errorModal.isOpen,
    errorModalTitle: errorModal.title,
    errorModalErrors: errorModal.errors,
    errorModalWarnings: errorModal.warnings,
    errorModalValidCount: errorModal.validCount,
    errorModalTotalCount: errorModal.totalCount,
    handleCloseErrorModal: errorModal.hideError,
    
    // Loading states
    isSaving: apiOps.isSaving,
    isDeleting: apiOps.isDeleting,
    isExporting: false, // TODO: Add export loading state
    isImporting: false, // TODO: Add import loading state
    
    // Handlers - Table
    handleSearch: tableState.handleSearch,
    handlePageChange: tableState.handlePageChange,
    handlePageSizeChange: tableState.handlePageSizeChange,
    handleSelectAll: (checked: boolean) => tableState.handleSelectAll(checked, data),
    handleSelectOne: tableState.handleSelectOne,
    
    // Handlers - CRUD
    handleAdd,
    handleEdit,
    handleDelete,
    handleViewDetail,
    handleSave,
    handleConfirmDelete,
    handleDeleteSelected,
    
    // Handlers - Modal
    handleCloseForm: modalState.closeForm,
    handleCloseDelete: modalState.closeDeleteModal,
    handleCloseDetail: modalState.closeDetailModal,
    handleCloseNotification: modalState.closeNotificationModal,
    
    // Handlers - Import/Export
    handleExport: enableImportExport ? handleExport : undefined,
    handleImport: enableImportExport ? handleImport : undefined,
    
    // Utilities
    clearSelection: tableState.clearSelection,
    resetPagination: tableState.resetPagination,
    resetSearch: tableState.resetSearch,
    resetAll: tableState.resetAll,
    closeAllModals: modalState.closeAllModals,
    
    // Notification modal helpers
    getNotificationSections,
    
    // Direct setters (for advanced usage)
    setSelectedIds: tableState.setSelectedIds,
    setIsFormOpen: modalState.setIsFormOpen,
    setEditingItem: modalState.setEditingItem,
  };
}