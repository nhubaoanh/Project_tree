"use client";

import { useState, useCallback, useEffect } from "react";

export interface TableConfig {
  initialPageSize?: number;
  enableSelection?: boolean;
  enableSearch?: boolean;
  searchDebounceMs?: number;
}

/**
 * Hook for managing table state (pagination, search, selection)
 * Provides consistent table behavior across components
 */
export function useTableState<T extends { [key: string]: any }>(config: TableConfig = {}) {
  const {
    initialPageSize = 10,
    enableSelection = false,
    enableSearch = false,
    searchDebounceMs = 500,
  } = config;

  // --- PAGINATION STATE ---
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // --- SEARCH STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --- SELECTION STATE ---
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);

  // --- DEBOUNCED SEARCH EFFECT ---
  useEffect(() => {
    if (!enableSearch) return;
    
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1); // Reset to first page when searching
    }, searchDebounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, searchDebounceMs, enableSearch]);

  // --- PAGINATION HANDLERS ---
  const handlePageChange = useCallback((newPage: number) => {
    setPageIndex(newPage);
  }, []);

  const handlePageSizeChange = useCallback((newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1); // Reset to first page when changing page size
  }, []);

  // --- SEARCH HANDLERS ---
  const handleSearch = useCallback((term: string) => {
    if (!enableSearch) return;
    setSearchTerm(term);
  }, [enableSearch]);

  // --- SELECTION HANDLERS ---
  const handleSelectAll = useCallback((checked: boolean, data: T[]) => {
    if (!enableSelection) return;
    
    if (checked) {
      // Tìm tất cả các ID field có thể có
      const allIds = data.map((item: T) => {
        // Thử các field ID phổ biến
        return item.id || 
               item.nguoiDungId || 
               item.thanhVienId || 
               item.suKienId || 
               item.roleId ||
               item.tinTucId ||
               item.taiLieuId ||
               item.thuId ||
               item.chiId ||
               item.dongHoId ||
               item.loaiSuKienId;
      }).filter(Boolean);
      
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  }, [enableSelection]);

  const handleSelectOne = useCallback((id: string | number, checked: boolean) => {
    if (!enableSelection) return;
    
    if (checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(selectedId => selectedId !== id));
    }
  }, [enableSelection]);

  // --- COMPUTED VALUES ---
  const hasSelection = selectedIds.length > 0;
  
  const isAllSelected = useCallback((data: T[]) => {
    if (!enableSelection || data.length === 0) return false;
    
    const dataIds = data.map((item: T) => {
      return item.id || 
             item.nguoiDungId || 
             item.thanhVienId || 
             item.suKienId || 
             item.roleId ||
             item.tinTucId ||
             item.taiLieuId ||
             item.thuId ||
             item.chiId ||
             item.dongHoId ||
             item.loaiSuKienId;
    }).filter(Boolean);
    
    return dataIds.length > 0 && dataIds.every(id => selectedIds.includes(id));
  }, [selectedIds, enableSelection]);

  // --- UTILITY HANDLERS ---
  const clearSelection = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const resetPagination = useCallback(() => {
    setPageIndex(1);
    setPageSize(initialPageSize);
  }, [initialPageSize]);

  const resetSearch = useCallback(() => {
    setSearchTerm("");
    setDebouncedSearch("");
  }, []);

  const resetAll = useCallback(() => {
    setPageIndex(1);
    setPageSize(initialPageSize);
    setSearchTerm("");
    setDebouncedSearch("");
    setSelectedIds([]);
  }, [initialPageSize]);

  return {
    // Pagination
    pageIndex,
    pageSize,
    handlePageChange,
    handlePageSizeChange,
    
    // Search
    searchTerm,
    debouncedSearch,
    handleSearch,
    
    // Selection
    selectedIds,
    hasSelection,
    isAllSelected,
    handleSelectAll,
    handleSelectOne,
    
    // Utilities
    clearSelection,
    resetPagination,
    resetSearch,
    resetAll,
    
    // Direct setters (for advanced usage)
    setSelectedIds,
    setPageIndex,
    setPageSize,
    setSearchTerm,
  };
}