"use client";

import { useCallback, useEffect, useState } from "react";
import { Eye, Edit, Trash2, Target, Copy } from "lucide-react";
import storage from "@/utils/storage";

interface ContextMenuProps {
  id: string;
  top: number;
  left: number;
  onClose: () => void;
  onViewDetail: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onCenter: () => void;
}

export const ContextMenu = ({
  top,
  left,
  onClose,
  onViewDetail,
  onEdit,
  onDelete,
  onCenter,
}: ContextMenuProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  // Kiểm tra quyền user
  const user = storage.getUser();
  const userRoleCode = user?.roleCode?.toLowerCase();
  const canEdit = userRoleCode === "thudo";
  const canDelete = userRoleCode === "thudo";

  useEffect(() => {
    const handleClick = () => {
      if (!showDeleteConfirm) {
        onClose();
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose, showDeleteConfirm]);

  const MenuItem = ({ 
    icon: Icon, 
    label, 
    onClick, 
    danger = false 
  }: { 
    icon: any; 
    label: string; 
    onClick: () => void; 
    danger?: boolean;
  }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        if (!danger) {
          onClose();
        }
      }}
      className={`
        w-full flex items-center gap-3 px-4 py-2 text-sm
        transition-colors
        ${danger 
          ? 'text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20' 
          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteConfirm(false);
    onClose();
  };

  const handleCancelDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div
        style={{ 
          top: `${top}px`, 
          left: `${left}px`,
          position: 'fixed',
          zIndex: 9999,
        }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[180px] animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <MenuItem icon={Eye} label="Xem chi tiết" onClick={onViewDetail} />
        
        {/* Chỉ hiển thị nút chỉnh sửa nếu user có quyền */}
        {canEdit && (
          <MenuItem icon={Edit} label="Chỉnh sửa" onClick={onEdit} />
        )}
        
        <MenuItem icon={Target} label="Căn giữa" onClick={onCenter} />
        
        {/* Chỉ hiển thị nút xóa nếu user có quyền */}
        {canDelete && (
          <>
            <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
            <MenuItem icon={Trash2} label="Xóa" onClick={handleDeleteClick} danger />
          </>
        )}
      </div>

      {/* Modal xác nhận xóa */}
      {showDeleteConfirm && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[10000] flex items-center justify-center animate-in fade-in duration-200"
          onClick={handleCancelDelete}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6 max-w-md w-full mx-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                <Trash2 className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Xác nhận xóa thành viên
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Bạn có chắc chắn muốn xóa thành viên này? Hành động này không thể hoàn tác.
                </p>
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={handleCancelDelete}
                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface CanvasContextMenuProps {
  top: number;
  left: number;
  onClose: () => void;
  onFitView: () => void;
  onExportPng: () => void;
  onExportSvg: () => void;
}

export const CanvasContextMenu = ({
  top,
  left,
  onClose,
  onFitView,
  onExportPng,
  onExportSvg,
}: CanvasContextMenuProps) => {
  useEffect(() => {
    const handleClick = () => onClose();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose]);

  const MenuItem = ({ 
    icon: Icon, 
    label, 
    onClick 
  }: { 
    icon: any; 
    label: string; 
    onClick: () => void;
  }) => (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
        onClose();
      }}
      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
    >
      <Icon className="w-4 h-4" />
      {label}
    </button>
  );

  return (
    <div
      style={{ 
        top: `${top}px`, 
        left: `${left}px`,
        position: 'fixed',
        zIndex: 9999,
      }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 min-w-[180px] animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      <MenuItem icon={Target} label="Vừa màn hình" onClick={onFitView} />
      <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
      <MenuItem icon={Copy} label="Export PNG" onClick={onExportPng} />
      <MenuItem icon={Copy} label="Export SVG" onClick={onExportSvg} />
    </div>
  );
};
