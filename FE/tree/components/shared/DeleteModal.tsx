"use client";

import React from "react";
import { Trash2, AlertTriangle, Loader2 } from "lucide-react";

export interface DeleteModalProps<T = any> {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  items: T[];
  isLoading?: boolean;
  title?: string;
  message?: string;
  itemDisplayField?: string; // Field to display item name (e.g., "tenSuKien", "hoTen")
  maxDisplayItems?: number;
  confirmText?: string;
  cancelText?: string;
}

export function DeleteModal<T = any>({
  isOpen,
  onClose,
  onConfirm,
  items,
  isLoading = false,
  title,
  message,
  itemDisplayField,
  maxDisplayItems = 5,
  confirmText = "Xóa",
  cancelText = "Hủy",
}: DeleteModalProps<T>) {
  if (!isOpen || items.length === 0) return null;

  const getDefaultTitle = () => {
    return items.length === 1 ? "Xác nhận xóa" : `Xác nhận xóa ${items.length} mục`;
  };

  const getDefaultMessage = () => {
    if (items.length === 1) {
      return "Bạn có chắc chắn muốn xóa mục này? Hành động này không thể hoàn tác.";
    }
    return `Bạn có chắc chắn muốn xóa ${items.length} mục đã chọn? Hành động này không thể hoàn tác.`;
  };

  const displayItems = items.slice(0, maxDisplayItems);
  const remainingCount = items.length - maxDisplayItems;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl border border-red-200">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#5d4037]">
              {title || getDefaultTitle()}
            </h3>
          </div>
        </div>

        {/* Message */}
        <p className="text-gray-600 mb-4">
          {message || getDefaultMessage()}
        </p>

        {/* Item List */}
        {itemDisplayField && items.length > 0 && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <h4 className="text-sm font-bold text-red-700 mb-2 uppercase">
              {items.length === 1 ? "Mục sẽ bị xóa:" : "Các mục sẽ bị xóa:"}
            </h4>
            <ul className="space-y-1">
              {displayItems.map((item, index) => (
                <li key={index} className="text-sm text-red-600 flex items-center gap-2">
                  <Trash2 size={12} />
                  <span className="font-medium">
                    {(item as any)[itemDisplayField] || `Mục ${index + 1}`}
                  </span>
                </li>
              ))}
              {remainingCount > 0 && (
                <li className="text-sm text-red-500 italic">
                  ... và {remainingCount} mục khác
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Warning */}
        <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-yellow-600" size={16} />
            <span className="text-sm font-medium text-yellow-800">
              Cảnh báo: Hành động này không thể hoàn tác!
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={16} />
                Đang xóa...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                {confirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}