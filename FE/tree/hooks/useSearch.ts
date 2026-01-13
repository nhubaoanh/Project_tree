"use client";

import { useState, useEffect } from "react";

export interface UseSearchProps {
  initialValue?: string;
  debounceMs?: number;
  onSearchChange?: (value: string) => void;
}

export function useSearch({ 
  initialValue = "", 
  debounceMs = 500,
  onSearchChange 
}: UseSearchProps = {}) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [debouncedSearch, setDebouncedSearch] = useState(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      onSearchChange?.(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs, onSearchChange]);

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearch("");
  };

  return {
    searchTerm,
    debouncedSearch,
    setSearchTerm,
    clearSearch,
  };
}