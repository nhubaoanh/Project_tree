import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

// Column Configuration
export interface ColumnConfig<T = any> {
    key: string;
    label: string;
    clickable?: boolean; // If true, clicking this cell opens detail modal
    render?: (value: any, row: T) => ReactNode;
    className?: string;
    align?: "left" | "center" | "right";
    sortable?: boolean;
}

// Action Configuration
export interface ActionConfig<T = any> {
    icon: LucideIcon;
    label: string;
    onClick: (row: T) => void;
    className?: string;
    color?: "blue" | "red" | "green" | "yellow";
}

// Filter Configuration
export interface FilterConfig {
    type: "select" | "text" | "date";
    key: string;
    label: string;
    options?: { value: string; label: string }[];
    placeholder?: string;
}

// DataTable Props
export interface DataTableProps<T = any> {
    // Data
    data: T[];
    columns: ColumnConfig<T>[];
    keyField: string; // Field to use as unique key (e.g., "userId", "eventId")

    // Pagination
    pageIndex: number;
    pageSize: number;
    totalRecords: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;

    // Loading & Empty States
    isLoading?: boolean;
    emptyMessage?: string;

    // Selection
    enableSelection?: boolean;
    selectedIds?: string[] | number[];
    onSelectAll?: (checked: boolean) => void;
    onSelectOne?: (id: string | number, checked: boolean) => void;

    // Actions
    onViewDetail?: (row: T) => void;
    customActions?: ActionConfig<T>[];

    // Search & Filter
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    filters?: FilterConfig[];

    // Styling
    className?: string;
    rowClassName?: (row: T) => string;
}

// DetailModal Field Configuration
export interface DetailField {
    icon: LucideIcon;
    label: string;
    value: any;
    render?: (value: any) => ReactNode;
    colorClass?: string;
}

export interface DetailSection {
    title: string;
    fields: DetailField[];
}

// DetailModal Props
export interface DetailModalProps {
    isOpen: boolean;
    onClose: () => void;

    // Header
    title: string;
    subtitle?: string;
    badge?: string;
    badgeColor?: string;

    // Avatar/Image
    avatar?: string;
    avatarFallback?: ReactNode;

    // Gradient Theme
    gradient?: "red-yellow" | "green-yellow" | "blue-yellow" | "purple-yellow";

    // Content
    sections: DetailSection[];

    // Footer Content (optional)
    footerContent?: ReactNode;

    // Additional Notes/Description
    notes?: string;
}
