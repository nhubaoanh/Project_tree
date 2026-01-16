"use client";

import { useCallback, useEffect } from "react";
import { Eye, Edit, Trash2, Target, Copy } from "lucide-react";

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
  useEffect(() => {
    const handleClick = () => onClose();
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [onClose]);

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
        onClose();
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
      <MenuItem icon={Eye} label="Xem chi tiết" onClick={onViewDetail} />
      <MenuItem icon={Edit} label="Chỉnh sửa" onClick={onEdit} />
      <MenuItem icon={Target} label="Căn giữa" onClick={onCenter} />
      <div className="border-t border-gray-200 dark:border-gray-700 my-1" />
      <MenuItem icon={Trash2} label="Xóa" onClick={onDelete} danger />
    </div>
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
