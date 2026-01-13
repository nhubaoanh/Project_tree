"use client";

import React from "react";
import { Search, X, Loader2, ChevronLeft, ChevronRight, Eye, FileSpreadsheet } from "lucide-react";
import { DataTableProps } from "./types";

export function DataTable<T = any>({
    data,
    columns,
    keyField,
    pageIndex,
    pageSize,
    totalRecords,
    totalPages,
    onPageChange,
    onPageSizeChange,
    isLoading = false,
    emptyMessage = "Không có dữ liệu",
    enableSelection = false,
    selectedIds = [],
    onSelectAll,
    onSelectOne,
    onViewDetail,
    customActions = [],
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Tìm kiếm...",
    className = "",
    rowClassName,
}: DataTableProps<T>) {
    const selectedIdsArray = selectedIds as any[];
    const allSelected = data.length > 0 && data.every((item) => selectedIdsArray.includes((item as any)[keyField]));
    const someSelected = data.some((item) => selectedIdsArray.includes((item as any)[keyField]));

    const renderCellContent = (column: any, row: any) => {
        const value = row[column.key];

        if (column.render) {
            return column.render(value, row);
        }

        if (column.clickable && onViewDetail) {
            return (
                <button
                    onClick={() => onViewDetail(row)}
                    className="font-bold text-yellow-900 hover:text-red-700 hover:underline transition-colors text-left"
                >
                    {value}
                </button>
            );
        }

        return <span className="font-bold text-yellow-900">{value || "-"}</span>;
    };

    return (
        <div className={className}>
            {/* Search Bar */}
            {onSearchChange && (
                <div className="mb-6 flex items-center bg-white border border-yellow-600 rounded-lg p-1 shadow-sm w-full md:w-1/2 transition-all focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-opacity-50">
                    <div className="p-2 text-stone-400">
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
                    </div>
                    <input
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder={searchPlaceholder}
                        className="w-full p-2 outline-none bg-transparent text-yellow-900 placeholder-stone-400"
                    />
                    {searchValue && (
                        <button onClick={() => onSearchChange("")} className="p-2 text-stone-400 hover:text-red-700">
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-lg border border-yellow-600 shadow-lg overflow-hidden relative min-h-[400px] flex flex-col">
                {isLoading && (
                    <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex items-center justify-center backdrop-blur-sm">
                        <div className="flex flex-col items-center">
                            <Loader2 className="text-red-700 w-10 h-10 animate-spin mb-2" />
                            <span className="text-yellow-800 font-bold">Đang tải dữ liệu...</span>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto flex-1">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-yellow-50 border-b-2 border-yellow-600 text-yellow-800 text-sm uppercase font-bold">
                                {enableSelection && (
                                    <th className="p-4 w-12 text-center">
                                        <input
                                            type="checkbox"
                                            checked={allSelected}
                                            ref={(el) => {
                                                if (el) el.indeterminate = someSelected && !allSelected;
                                            }}
                                            onChange={(e) => onSelectAll?.(e.target.checked)}
                                            className="w-4 h-4 accent-red-700 cursor-pointer"
                                        />
                                    </th>
                                )}
                                <th className="p-4 w-12 text-center">#</th>
                                {columns.map((col) => {
                                    const alignClass = col.align === "left" ? "text-left" : col.align === "right" ? "text-right" : "text-center";
                                    return (
                                        <th
                                            key={col.key}
                                            className={`p-4 ${alignClass} ${col.className || ""}`}
                                        >
                                            {col.label}
                                        </th>
                                    );
                                })}
                                {(onViewDetail || customActions.length > 0) && (
                                    <th className="p-4 text-center">Hành động</th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-yellow-200">
                            {data.length > 0 ? (
                                data.map((row, index) => (
                                    <tr
                                        key={(row as any)[keyField]}
                                        className={`hover:bg-yellow-50 transition-colors group ${selectedIdsArray.includes((row as any)[keyField]) ? "bg-yellow-100" : ""
                                            } ${rowClassName ? rowClassName(row) : ""}`}
                                    >
                                        {enableSelection && (
                                            <td className="p-4 w-12 text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIdsArray.includes((row as any)[keyField])}
                                                    onChange={(e) => onSelectOne?.((row as any)[keyField], e.target.checked)}
                                                    className="w-4 h-4 accent-red-700 cursor-pointer"
                                                />
                                            </td>
                                        )}
                                        <td className="p-4 text-center text-stone-400 font-mono text-xs">
                                            {(pageIndex - 1) * pageSize + index + 1}
                                        </td>
                                        {columns.map((col) => {
                                            const alignClass = col.align === "left" ? "text-left" : col.align === "right" ? "text-right" : "text-center";
                                            return (
                                                <td
                                                    key={col.key}
                                                    className={`p-4 ${alignClass} group-hover:text-red-700 ${col.className || ""}`}
                                                >
                                                    {renderCellContent(col, row)}
                                                </td>
                                            );
                                        })}
                                        {(onViewDetail || customActions.length > 0) && (
                                            <td className="p-4 text-center">
                                                <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {onViewDetail && (
                                                        <button
                                                            onClick={() => onViewDetail(row)}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded transition-colors"
                                                            title="Xem chi tiết"
                                                        >
                                                            <Eye size={18} />
                                                        </button>
                                                    )}
                                                    {customActions.map((action, idx) => {
                                                        const Icon = action.icon;
                                                        const colorMap = {
                                                            blue: "text-blue-600 hover:bg-blue-50",
                                                            red: "text-red-600 hover:bg-red-50",
                                                            green: "text-green-600 hover:bg-green-50",
                                                            yellow: "text-yellow-600 hover:bg-yellow-50",
                                                        };
                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => action.onClick(row)}
                                                                className={`p-2 rounded transition-colors ${colorMap[action.color || "blue"]} ${action.className || ""}`}
                                                                title={action.label}
                                                            >
                                                                <Icon size={18} />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))
                            ) : !isLoading ? (
                                <tr>
                                    <td colSpan={columns.length + (enableSelection ? 2 : 1) + (onViewDetail || customActions.length > 0 ? 1 : 0)} className="p-12 text-center text-stone-500 italic">
                                        <div className="flex flex-col items-center">
                                            <FileSpreadsheet size={48} className="mb-4 opacity-20" />
                                            {emptyMessage}
                                        </div>
                                    </td>
                                </tr>
                            ) : null}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                <div className="bg-yellow-50 p-4 border-t border-yellow-600 flex items-center justify-between">
                    <div className="text-sm text-yellow-800">
                        {enableSelection && selectedIdsArray.length > 0 && (
                            <span className="mr-4 text-red-700 font-bold">Đã chọn {selectedIdsArray.length}</span>
                        )}
                        Hiển thị <span className="font-bold">{data.length}</span> / Tổng{" "}
                        <span className="font-bold">{totalRecords}</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <select
                            value={pageSize}
                            onChange={(e) => onPageSizeChange(Number(e.target.value))}
                            className="mr-4 bg-white border border-yellow-600 rounded px-2 py-1 text-sm text-yellow-900 outline-none focus:border-red-700"
                        >
                            <option value={5}>5 dòng/trang</option>
                            <option value={10}>10 dòng/trang</option>
                            <option value={20}>20 dòng/trang</option>
                        </select>

                        <button
                            onClick={() => onPageChange(Math.max(1, pageIndex - 1))}
                            disabled={pageIndex === 1 || isLoading}
                            className="p-2 border border-yellow-600 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-100 text-yellow-900 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>

                        <span className="px-4 text-sm font-bold text-yellow-900">
                            Trang {pageIndex} / {totalPages || 1}
                        </span>

                        <button
                            onClick={() => onPageChange(totalPages && pageIndex < totalPages ? pageIndex + 1 : pageIndex)}
                            disabled={pageIndex === totalPages || totalPages === 0 || isLoading}
                            className="p-2 border border-yellow-600 rounded bg-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-100 text-yellow-900 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
