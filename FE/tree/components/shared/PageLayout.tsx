"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

export interface PageAction {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "danger" | "success";
  disabled?: boolean;
  count?: number; // For showing count like "Xóa (3)"
}

export interface PageLayoutProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  actions?: PageAction[];
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "6xl" | "full";
}

export function PageLayout({
  title,
  subtitle,
  actions = [],
  children,
  className = "",
  maxWidth = "6xl",
}: PageLayoutProps) {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm": return "max-w-sm";
      case "md": return "max-w-md";
      case "lg": return "max-w-lg";
      case "xl": return "max-w-xl";
      case "2xl": return "max-w-2xl";
      case "6xl": return "max-w-6xl";
      case "full": return "max-w-full";
      default: return "max-w-6xl";
    }
  };

  const getActionVariantClass = (variant: string = "primary") => {
    switch (variant) {
      case "primary":
        return "bg-[#b91c1c] text-white hover:bg-[#991b1b]";
      case "secondary":
        return "bg-[#2c5282] text-white hover:bg-[#2a4365]";
      case "danger":
        return "bg-red-600 text-white hover:bg-red-700";
      case "success":
        return "bg-[#276749] text-white hover:bg-[#22543d]";
      default:
        return "bg-[#b91c1c] text-white hover:bg-[#991b1b]";
    }
  };

  return (
    <div className={`${getMaxWidthClass()} mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn ${className}`}>
      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-3xl font-display font-bold text-[#b91c1c] drop-shadow-sm">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[#8b5e3c] italic text-sm mt-1">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actions.length > 0 && (
          <div className="flex gap-2 flex-wrap justify-end">
            {actions.map((action, index) => {
              const ActionIcon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.onClick}
                  disabled={action.disabled}
                  className={`flex items-center gap-2 px-4 py-2 rounded shadow transition-all text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed ${getActionVariantClass(action.variant)}`}
                >
                  <ActionIcon size={16} />
                  <span className="hidden sm:inline">
                    {action.label}
                    {action.count !== undefined && ` (${action.count})`}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content */}
      {children}
    </div>
  );
}