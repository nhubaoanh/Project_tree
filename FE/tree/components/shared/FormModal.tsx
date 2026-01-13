"use client";

import React from "react";
import { X, Check, Loader2, LucideIcon } from "lucide-react";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "time" | "email" | "tel" | "select" | "textarea" | "checkbox" | "hidden" | "display";
  required?: boolean;
  placeholder?: string;
  options?: { value: any; label: string }[];
  rows?: number;
  value?: any;
  onChange?: (e: React.ChangeEvent<any>) => void;
  onBlur?: (e: React.FocusEvent<any>) => void;
  error?: string | null;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
  displayValue?: string; // For display-only fields
}

export interface FormSection {
  title?: string;
  fields: FormField[];
  columns?: 1 | 2 | 3;
}

export interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  sections: FormSection[];
  isLoading?: boolean;
  submitText?: string;
  cancelText?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl";
  gradient?: "red-yellow" | "green-yellow" | "blue-yellow" | "purple-yellow";
}

export function FormModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  subtitle,
  icon: Icon,
  sections,
  isLoading = false,
  submitText = "Lưu",
  cancelText = "Đóng",
  maxWidth = "xl",
  gradient = "red-yellow",
}: FormModalProps) {
  if (!isOpen) return null;

  const getGradientClass = () => {
    switch (gradient) {
      case "red-yellow":
        return "bg-gradient-to-br from-[#b91c1c] via-[#dc2626] to-[#d4af37]";
      case "green-yellow":
        return "bg-gradient-to-br from-green-700 via-green-600 to-[#d4af37]";
      case "blue-yellow":
        return "bg-gradient-to-br from-blue-700 via-blue-600 to-[#d4af37]";
      case "purple-yellow":
        return "bg-gradient-to-br from-purple-700 via-purple-600 to-[#d4af37]";
      default:
        return "bg-gradient-to-br from-[#b91c1c] via-[#dc2626] to-[#d4af37]";
    }
  };

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm": return "max-w-sm";
      case "md": return "max-w-md";
      case "lg": return "max-w-lg";
      case "xl": return "max-w-xl";
      case "2xl": return "max-w-2xl";
      default: return "max-w-xl";
    }
  };

  const renderField = (field: FormField) => {
    const baseInputClass = `w-full p-3 bg-white border rounded focus:outline-none transition-colors ${
      field.error ? "border-red-500" : "border-[#d4af37]/50 focus:border-[#b91c1c]"
    } ${field.disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;

    switch (field.type) {
      case "hidden":
        return <input type="hidden" name={field.name} value={field.value || ""} />;

      case "display":
        return (
          <div className="w-full p-3 bg-gray-50 border border-[#d4af37]/50 rounded text-[#5d4037] font-medium">
            {field.displayValue || field.value || "Đang tải..."}
          </div>
        );

      case "select":
        return (
          <select
            name={field.name}
            value={field.value || ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            disabled={field.disabled}
            className={baseInputClass}
          >
            <option value="">-- Chọn --</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "textarea":
        return (
          <textarea
            name={field.name}
            value={field.value || ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            disabled={field.disabled}
            readOnly={field.readOnly}
            className={`${baseInputClass} resize-none`}
          />
        );

      case "checkbox":
        return (
          <label className="flex items-center gap-3 p-3 bg-white border border-[#d4af37]/50 rounded cursor-pointer hover:bg-[#fdf6e3]">
            <input
              type="checkbox"
              name={field.name}
              checked={field.value === 1 || field.value === true}
              onChange={field.onChange}
              disabled={field.disabled}
              className="w-5 h-5 accent-[#b91c1c]"
            />
            <span className="text-[#5d4037]">
              {field.value === 1 || field.value === true ? "Có" : "Không"}
            </span>
          </label>
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={field.value || ""}
            onChange={field.onChange}
            onBlur={field.onBlur}
            placeholder={field.placeholder}
            disabled={field.disabled}
            readOnly={field.readOnly}
            className={baseInputClass}
          />
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className={`bg-[#fffdf5] w-full ${getMaxWidthClass()} rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]`}>
        
        {/* HEADER */}
        <div className={`${getGradientClass()} text-yellow-400 px-6 py-4 flex justify-between items-center`}>
          <h3 className="text-xl font-bold uppercase flex items-center gap-2">
            {Icon && <Icon size={24} />}
            <div>
              <div>{title}</div>
              {subtitle && <div className="text-sm font-normal opacity-90">{subtitle}</div>}
            </div>
          </h3>
          <button onClick={onClose} disabled={isLoading} className="hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={onSubmit} className="p-6 overflow-y-auto space-y-6">
          {sections.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className="text-lg font-bold text-[#8b5e3c] uppercase mb-4 border-b border-[#d4af37]/30 pb-2">
                  {section.title}
                </h4>
              )}
              
              <div className={`grid gap-4 ${
                section.columns === 1 ? "grid-cols-1" :
                section.columns === 2 ? "grid-cols-1 md:grid-cols-2" :
                section.columns === 3 ? "grid-cols-1 md:grid-cols-3" :
                "grid-cols-1 md:grid-cols-2"
              }`}>
                {section.fields.map((field, fieldIdx) => (
                  <div key={fieldIdx} className={field.type === "hidden" ? "" : "space-y-1"}>
                    {field.type !== "hidden" && (
                      <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                    )}
                    {renderField(field)}
                    {field.error && <p className="text-red-500 text-xs">{field.error}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </form>

        {/* FOOTER */}
        <div className="p-4 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-5 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c]"
          >
            {cancelText}
          </button>
          <button
            type="submit"
            form="form"
            disabled={isLoading}
            className="px-6 py-2 bg-[#b91c1c] text-white font-bold rounded hover:bg-[#991b1b] flex items-center gap-2 disabled:opacity-50"
            onClick={onSubmit}
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            {isLoading ? "Đang lưu..." : submitText}
          </button>
        </div>
      </div>
    </div>
  );
}