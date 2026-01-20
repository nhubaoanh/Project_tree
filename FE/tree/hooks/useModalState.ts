"use client";

import { useState, useCallback } from "react";

// Interface cho notification modal sử dụng DetailModal
export interface NotificationData {
  type: "success" | "error" | "info";
  title: string;
  message: string;
  details?: string;
}

/**
 * Hook for managing modal states
 * Provides consistent modal behavior across components
 */
export function useModalState<T>() {
  // --- MODAL STATES ---
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [itemsToDelete, setItemsToDelete] = useState<T[]>([]);
  const [selectedItemForDetail, setSelectedItemForDetail] = useState<T | null>(null);
  const [notificationData, setNotificationData] = useState<NotificationData | null>(null);

  // --- FORM MODAL HANDLERS ---
  const openFormForAdd = useCallback(() => {
    setEditingItem(null);
    setIsFormOpen(true);
  }, []);

  const openFormForEdit = useCallback((item: T) => {
    setEditingItem(item);
    setIsFormOpen(true);
  }, []);

  const closeForm = useCallback(() => {
    setIsFormOpen(false);
    setEditingItem(null);
  }, []);

  // --- DELETE MODAL HANDLERS ---
  const openDeleteModal = useCallback((items: T[]) => {
    setItemsToDelete(items);
    setIsDeleteOpen(true);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsDeleteOpen(false);
    setItemsToDelete([]);
  }, []);

  // --- DETAIL MODAL HANDLERS ---
  const openDetailModal = useCallback((item: T) => {
    setSelectedItemForDetail(item);
    setIsDetailOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setIsDetailOpen(false);
    setSelectedItemForDetail(null);
  }, []);

  // --- NOTIFICATION MODAL HANDLERS (sử dụng DetailModal) ---
  const openNotificationModal = useCallback((data: NotificationData) => {
    setNotificationData(data);
    setIsNotificationOpen(true);
  }, []);

  const closeNotificationModal = useCallback(() => {
    setIsNotificationOpen(false);
    setNotificationData(null);
  }, []);

  // --- UTILITY HANDLERS ---
  const closeAllModals = useCallback(() => {
    setIsFormOpen(false);
    setIsDeleteOpen(false);
    setIsDetailOpen(false);
    setIsNotificationOpen(false);
    setEditingItem(null);
    setItemsToDelete([]);
    setSelectedItemForDetail(null);
    setNotificationData(null);
  }, []);

  return {
    // States
    isFormOpen,
    isDeleteOpen,
    isDetailOpen,
    isNotificationOpen,
    editingItem,
    itemsToDelete,
    selectedItemForDetail,
    notificationData,
    
    // Form modal
    openFormForAdd,
    openFormForEdit,
    closeForm,
    
    // Delete modal
    openDeleteModal,
    closeDeleteModal,
    
    // Detail modal
    openDetailModal,
    closeDetailModal,
    
    // Notification modal
    openNotificationModal,
    closeNotificationModal,
    
    // Utilities
    closeAllModals,
    
    // Direct setters (for advanced usage)
    setIsFormOpen,
    setIsDeleteOpen,
    setIsDetailOpen,
    setIsNotificationOpen,
    setEditingItem,
    setItemsToDelete,
    setSelectedItemForDetail,
    setNotificationData,
  };
}