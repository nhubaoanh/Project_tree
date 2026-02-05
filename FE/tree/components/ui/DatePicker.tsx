"use client";

import React from "react";

interface DatePickerProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  max?: string;
  min?: string;
  required?: boolean;
  name?: string;
  id?: string;
}

export function DatePicker({
  value,
  onChange,
  placeholder,
  className = "",
  max,
  min,
  required,
  name,
  id,
}: DatePickerProps) {
  // Format date to Vietnamese display
  const formatDateToVietnamese = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric"
    });
  };

  // Convert Vietnamese date back to ISO format
  const parseVietnameseDate = (vietnameseDate: string) => {
    if (!vietnameseDate) return "";
    const parts = vietnameseDate.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return vietnameseDate;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="date"
        id={id}
        name={name}
        value={value || ""}
        onChange={handleChange}
        className={`w-full ${className}`}
        max={max}
        min={min}
        required={required}
        style={{
          colorScheme: 'light',
        }}
      />
      
      {/* Custom styling for Vietnamese date display */}
      <style jsx>{`
        input[type="date"] {
          position: relative;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3e%3cpath fill-rule='evenodd' d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z' clip-rule='evenodd'/%3e%3c/svg%3e") no-repeat;
          background-size: 20px 20px;
          cursor: pointer;
          opacity: 0.7;
        }
        
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
        
        /* Hide default date format and show Vietnamese format */
        input[type="date"]:valid:before {
          content: attr(data-date);
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #374151;
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}

// Utility functions for date formatting
export const formatDateForInput = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().split('T')[0];
};

export const formatDateToVietnamese = (date: Date | string | null | undefined): string => {
  if (!date) return "";
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

export const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};