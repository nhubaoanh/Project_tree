"use client";

import React from "react";
import { Loader2, AlertCircle, RefreshCw, FileX } from "lucide-react";

// Loading Spinner Component
export interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = "md", 
  message = "Đang tải...", 
  className = "" 
}: LoadingSpinnerProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm": return "w-6 h-6";
      case "md": return "w-10 h-10";
      case "lg": return "w-16 h-16";
      default: return "w-10 h-10";
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center p-8 ${className}`}>
      <Loader2 className={`${getSizeClass()} text-[#d4af37] animate-spin mb-4`} />
      <p className="text-[#8b5e3c] font-medium">{message}</p>
    </div>
  );
}

// Full Page Loading
export interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Đang tải dữ liệu..." }: PageLoadingProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37] mx-auto mb-4"></div>
        <p className="text-[#8b5e3c] font-medium">{message}</p>
      </div>
    </div>
  );
}

// Error State Component
export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
  className?: string;
}

export function ErrorState({
  title = "Có lỗi xảy ra",
  message = "Không thể tải dữ liệu. Vui lòng thử lại sau.",
  onRetry,
  retryText = "Thử lại",
  className = "",
}: ErrorStateProps) {
  return (
    <div className={`text-center p-8 ${className}`}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h3 className="text-lg font-bold text-[#5d4037] mb-2">{title}</h3>
      <p className="text-[#8b5e3c] mb-6">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] transition-colors mx-auto"
        >
          <RefreshCw size={16} />
          {retryText}
        </button>
      )}
    </div>
  );
}

// Empty State Component
export interface EmptyStateProps {
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Không có dữ liệu",
  message = "Chưa có dữ liệu để hiển thị",
  actionText,
  onAction,
  icon,
  className = "",
}: EmptyStateProps) {
  return (
    <div className={`text-center p-12 ${className}`}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon || <FileX className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-lg font-bold text-[#5d4037] mb-2">{title}</h3>
      <p className="text-[#8b5e3c] mb-6">{message}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

// No Permission State
export function NoPermissionState({ 
  message = "Bạn không có quyền truy cập trang này" 
}: { message?: string }) {
  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      <div className="text-center py-16">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-[#b91c1c] mb-4">Không có quyền truy cập</h2>
        <p className="text-[#8b5e3c] text-lg">{message}</p>
      </div>
    </div>
  );
}

// No Family Tree State
export function NoFamilyTreeState({ 
  message = "Tài khoản của bạn chưa được gán vào dòng họ nào" 
}: { message?: string }) {
  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      <div className="text-center py-16">
        <Loader2 size={64} className="mx-auto text-[#d4af37] mb-4 opacity-50" />
        <h2 className="text-2xl font-bold text-[#b91c1c] mb-2">Chưa được gán dòng họ</h2>
        <p className="text-[#8b5e3c] text-lg">{message}</p>
      </div>
    </div>
  );
}