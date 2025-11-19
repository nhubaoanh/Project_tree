"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Edit,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IUser, IUserSearch } from "@/types/user"; // Đảm bảo import này đúng
import { useSearchParams } from "next/navigation";
import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE, SEARCH_DONGHOID, ERROR_TIMEOUT } from "@/constant/config";
// quan ly state
import { useRecoilState, useRecoilValue } from "recoil";
import { userSearchUser } from "@/loader/user.loader";
// import { queryClient } from "@/lib/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUsers } from "@/service/user.service";
import { useToast } from "@/service/useToas";

// Khai báo lại props để truyền các hàm xử lý xuống cột
interface UserTableProps {
  onEdit: (user: IUser) => void; // Bắt buộc phải có
  onDelete: (user: IUser) => void; // Bắt buộc phải có
}

// Định nghĩa props mới cho các cột hành động
interface ActionCellProps {
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}
// ----------------------------------------------------
// ĐỊNH NGHĨA CỘT (COLUMNS)
// ----------------------------------------------------

// Sử dụng Factory Pattern để tạo cột Actions, truyền các handler vào
const createColumns = ({
  onEdit,
  onDelete,
}: ActionCellProps): ColumnDef<IUser>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nguoiDungId",
    header: "Mã người dùng",
    cell: ({ row }) => (
      <div className="font-mono text-xs">{row.getValue("nguoiDungId")}</div>
    ), // Tối ưu: Dùng font-mono cho ID
  },
  {
    accessorKey: "tenDangNhap",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tên đăng nhập
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("tenDangNhap")}</div>
    ), // Tối ưu: Thêm capitalize
  },
  {
    accessorKey: "hoTen",
    header: "Họ tên",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("hoTen")}</div>
    ), // Tối ưu: In đậm nhẹ tên
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="text-muted-foreground">{row.getValue("email")}</div>
    ), // Tối ưu: Giảm độ sáng cho email
  },
  {
    accessorKey: "soDienThoai",
    header: "SĐT",
    cell: ({ row }) => <div>{row.getValue("soDienThoai")}</div>,
  },
  {
    accessorKey: "vaiTro",
    header: "Vai trò",
    cell: ({ row }) => {
      const vaiTro = row.getValue("vaiTro");
      // Tối ưu: Hiển thị vai trò dạng chữ thay vì số (Giả sử 0: User, 1: Admin)
      const displayVaiTro = vaiTro === 1 ? "Quản trị viên" : "Người dùng";
      return <div className="text-right font-semibold">{displayVaiTro}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Mở menu hành động</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.nguoiDungId)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            {/* Tích hợp hàm onEdit */}
            <DropdownMenuItem onClick={() => onEdit(user)}>
              <Edit className="mr-2 h-4 w-4" />
              Sửa
            </DropdownMenuItem>

            {/* Tích hợp hàm onDelete */}
            <DropdownMenuItem
              onClick={() => onDelete(user)}
              className="text-red-600 focus:text-red-700"
            >
              <Trash className="mr-2 h-4 w-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ----------------------------------------------------
// COMPONENT CHÍNH
// ----------------------------------------------------

export function useUsers(params: IUserSearch){
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
}

export function DataTableDemo({onEdit, onDelete }: UserTableProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get(SEARCH_PAGE) || "1";
  const pageSize = searchParams.get(SEARCH_SIZE) || "10";
  const searchContent = searchParams.get(SEARCH_CONTENT) || "";
  const dongHoId = searchParams.get(SEARCH_DONGHOID) || "";

  
  // 1. Lấy hàm Toast từ Hook
  const { showSuccess, showError } = useToast();

  const usersQuery = useUsers({
    search_content: searchContent?.toLowerCase()?.trim(),
    pageIndex: +page,
    pageSize: +pageSize,
    dongHoId: dongHoId || undefined,
  });

  const isLoading = usersQuery.isLoading;

  const userData = usersQuery.data?.data ?? [];

  // 2. Sử dụng useEffect để theo dõi lỗi
  useEffect(() => {
    // Kiểm tra nếu query thất bại
    if (usersQuery.isError) {
      // ✅ Báo lỗi tổng quát
      showError();
      // Ghi log để debug
      console.error("React Query Error:", usersQuery.error);
    }
  }, [usersQuery.isError, usersQuery.error, showError]); // Dependencies quan trọng!

  // Xử lý trạng thái tải dữ liệu

  const columns = useMemo(
    () => createColumns({ onEdit, onDelete }),
    [onEdit, onDelete]
  );

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data: userData,
    columns, // Sử dụng columns đã tạo trong useMemo
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // Tối ưu: Thiết lập bộ lọc mặc định là 'hoTen'
    initialState: {
      pagination: {
        pageSize: 10, // Mặc định 10 dòng
      },
    },
  });

  return (
    <>
      {isLoading ? (
        <div>Đang tải dữ liệu ...</div>
      ) : (
        <div className="w-full">
          <div className="flex items-center py-4">
            <Input
              placeholder="Tìm kiếm theo Họ tên..."
              value={
                (table.getColumn("hoTen")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("hoTen")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  Ẩn/Hiện Cột <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="overflow-hidden rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center text-gray-500 italic" // Thêm style cho rõ ràng hơn
                    >
                      Không có dữ liệu.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="text-muted-foreground flex-1 text-sm">
              {table.getFilteredSelectedRowModel().rows.length} của{" "}
              {table.getFilteredRowModel().rows.length} dòng được chọn.
            </div>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Trước
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Sau
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
