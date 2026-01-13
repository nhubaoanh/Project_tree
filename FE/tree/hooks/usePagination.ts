"use client";

import { useState } from "react";

export interface UsePaginationProps {
  initialPageIndex?: number;
  initialPageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export function usePagination({
  initialPageIndex = 1,
  initialPageSize = 10,
  onPageChange,
  onPageSizeChange,
}: UsePaginationProps = {}) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const handlePageChange = (page: number) => {
    setPageIndex(page);
    onPageChange?.(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPageIndex(1); // Reset to first page when changing page size
    onPageSizeChange?.(size);
  };

  const resetPagination = () => {
    setPageIndex(initialPageIndex);
    setPageSize(initialPageSize);
  };

  return {
    pageIndex,
    pageSize,
    setPageIndex: handlePageChange,
    setPageSize: handlePageSizeChange,
    handlePageChange,
    handlePageSizeChange,
    resetPagination,
  };
}