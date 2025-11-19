// "use client";

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table";
// import {
//   ArrowUpDown,
//   ChevronDown,
//   MoreHorizontal,
//   Edit,
//   Trash,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { IUser, IUserSearch } from "@/types/user"; // Đảm bảo import này đúng
// import { useSearchParams } from "next/navigation";
// import { SEARCH_CONTENT, SEARCH_PAGE, SEARCH_SIZE, SEARCH_DONGHOID, ERROR_TIMEOUT } from "@/constant/config";
// // quan ly state
// import { useRecoilState, useRecoilValue } from "recoil";
// import { userSearchUser } from "@/loader/user.loader";
// // import { queryClient } from "@/lib/react-query";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { getUsers } from "@/service/user.service";
// import { useToast } from "@/service/useToas";

// // Khai báo lại props để truyền các hàm xử lý xuống cột
// interface UserTableProps {
//   onEdit: (user: IUser) => void; // Bắt buộc phải có
//   onDelete: (user: IUser) => void; // Bắt buộc phải có
// }

// // Định nghĩa props mới cho các cột hành động
// interface ActionCellProps {
//   onEdit: (user: IUser) => void;
//   onDelete: (user: IUser) => void;
// }
// // ----------------------------------------------------
// // ĐỊNH NGHĨA CỘT (COLUMNS)
// // ----------------------------------------------------

// // Sử dụng Factory Pattern để tạo cột Actions, truyền các handler vào
// const createColumns = ({
//   onEdit,
//   onDelete,
// }: ActionCellProps): ColumnDef<IUser>[] => [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "nguoiDungId",
//     header: "Mã người dùng",
//     cell: ({ row }) => (
//       <div className="font-mono text-xs">{row.getValue("nguoiDungId")}</div>
//     ), // Tối ưu: Dùng font-mono cho ID
//   },
//   {
//     accessorKey: "tenDangNhap",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//         >
//           Tên đăng nhập
//           <ArrowUpDown className="ml-2 h-4 w-4" />
//         </Button>
//       );
//     },
//     cell: ({ row }) => (
//       <div className="capitalize">{row.getValue("tenDangNhap")}</div>
//     ), // Tối ưu: Thêm capitalize
//   },
//   {
//     accessorKey: "hoTen",
//     header: "Họ tên",
//     cell: ({ row }) => (
//       <div className="font-medium">{row.getValue("hoTen")}</div>
//     ), // Tối ưu: In đậm nhẹ tên
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//     cell: ({ row }) => (
//       <div className="text-muted-foreground">{row.getValue("email")}</div>
//     ), // Tối ưu: Giảm độ sáng cho email
//   },
//   {
//     accessorKey: "soDienThoai",
//     header: "SĐT",
//     cell: ({ row }) => <div>{row.getValue("soDienThoai")}</div>,
//   },
//   {
//     accessorKey: "vaiTro",
//     header: "Vai trò",
//     cell: ({ row }) => {
//       const vaiTro = row.getValue("vaiTro");
//       // Tối ưu: Hiển thị vai trò dạng chữ thay vì số (Giả sử 0: User, 1: Admin)
//       const displayVaiTro = vaiTro === 1 ? "Quản trị viên" : "Người dùng";
//       return <div className="text-right font-semibold">{displayVaiTro}</div>;
//     },
//   },
//   {
//     id: "actions",
//     enableHiding: false,
//     cell: ({ row }) => {
//       const user = row.original;

//       return (
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <Button variant="ghost" className="h-8 w-8 p-0">
//               <span className="sr-only">Mở menu hành động</span>
//               <MoreHorizontal className="h-4 w-4" />
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align="end">
//             <DropdownMenuLabel>Hành động</DropdownMenuLabel>
//             <DropdownMenuItem
//               onClick={() => navigator.clipboard.writeText(user.nguoiDungId)}
//             >
//               Copy user ID
//             </DropdownMenuItem>
//             <DropdownMenuSeparator />

//             {/* Tích hợp hàm onEdit */}
//             <DropdownMenuItem onClick={() => onEdit(user)}>
//               <Edit className="mr-2 h-4 w-4" />
//               Sửa
//             </DropdownMenuItem>

//             {/* Tích hợp hàm onDelete */}
//             <DropdownMenuItem
//               onClick={() => onDelete(user)}
//               className="text-red-600 focus:text-red-700"
//             >
//               <Trash className="mr-2 h-4 w-4" />
//               Xóa
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       );
//     },
//   },
// ];

// // ----------------------------------------------------
// // COMPONENT CHÍNH
// // ----------------------------------------------------

// export function useUsers(params: IUserSearch){
//   return useQuery({
//     queryKey: ["users", params],
//     queryFn: () => getUsers(params),
//   });
// }

// export function DataTableDemo({onEdit, onDelete }: UserTableProps) {
//   const searchParams = useSearchParams();
//   const page = searchParams.get(SEARCH_PAGE) || "1";
//   const pageSize = searchParams.get(SEARCH_SIZE) || "10";
//   const searchContent = searchParams.get(SEARCH_CONTENT) || "";
//   const dongHoId = searchParams.get(SEARCH_DONGHOID) || "";

//   // 1. Lấy hàm Toast từ Hook
//   const { showSuccess, showError } = useToast();

//   const usersQuery = useUsers({
//     search_content: searchContent?.toLowerCase()?.trim(),
//     pageIndex: +page,
//     pageSize: +pageSize,
//     dongHoId: dongHoId || undefined,
//   });

//   const isLoading = usersQuery.isLoading;

//   const userData = usersQuery.data?.data ?? [];

//   // 2. Sử dụng useEffect để theo dõi lỗi
//   useEffect(() => {
//     // Kiểm tra nếu query thất bại
//     if (usersQuery.isError) {
//       // ✅ Báo lỗi tổng quát
//       showError();
//       // Ghi log để debug
//       console.error("React Query Error:", usersQuery.error);
//     }
//   }, [usersQuery.isError, usersQuery.error, showError]); // Dependencies quan trọng!

//   // Xử lý trạng thái tải dữ liệu

//   const columns = useMemo(
//     () => createColumns({ onEdit, onDelete }),
//     [onEdit, onDelete]
//   );

//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
//     []
//   );
//   const [columnVisibility, setColumnVisibility] =
//     useState<VisibilityState>({});
//   const [rowSelection, setRowSelection] = useState({});

//   const table = useReactTable({
//     data: userData,
//     columns, // Sử dụng columns đã tạo trong useMemo
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//     // Tối ưu: Thiết lập bộ lọc mặc định là 'hoTen'
//     initialState: {
//       pagination: {
//         pageSize: 10, // Mặc định 10 dòng
//       },
//     },
//   });

//   return (
//     <>
//       {isLoading ? (
//         <div>Đang tải dữ liệu ...</div>
//       ) : (
//         <div className="w-full">
//           <div className="flex items-center py-4">
//             <Input
//               placeholder="Tìm kiếm theo Họ tên..."
//               value={
//                 (table.getColumn("hoTen")?.getFilterValue() as string) ?? ""
//               }
//               onChange={(event) =>
//                 table.getColumn("hoTen")?.setFilterValue(event.target.value)
//               }
//               className="max-w-sm"
//             />
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="ml-auto">
//                   Ẩn/Hiện Cột <ChevronDown className="ml-2 h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end">
//                 {table
//                   .getAllColumns()
//                   .filter((column) => column.getCanHide())
//                   .map((column) => {
//                     return (
//                       <DropdownMenuCheckboxItem
//                         key={column.id}
//                         className="capitalize"
//                         checked={column.getIsVisible()}
//                         onCheckedChange={(value) =>
//                           column.toggleVisibility(!!value)
//                         }
//                       >
//                         {column.id}
//                       </DropdownMenuCheckboxItem>
//                     );
//                   })}
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//           <div className="overflow-hidden rounded-md border">
//             <Table>
//               <TableHeader>
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <TableRow key={headerGroup.id}>
//                     {headerGroup.headers.map((header) => {
//                       return (
//                         <TableHead key={header.id}>
//                           {header.isPlaceholder
//                             ? null
//                             : flexRender(
//                                 header.column.columnDef.header,
//                                 header.getContext()
//                               )}
//                         </TableHead>
//                       );
//                     })}
//                   </TableRow>
//                 ))}
//               </TableHeader>
//               <TableBody>
//                 {table.getRowModel().rows?.length ? (
//                   table.getRowModel().rows.map((row) => (
//                     <TableRow
//                       key={row.id}
//                       data-state={row.getIsSelected() && "selected"}
//                     >
//                       {row.getVisibleCells().map((cell) => (
//                         <TableCell key={cell.id}>
//                           {flexRender(
//                             cell.column.columnDef.cell,
//                             cell.getContext()
//                           )}
//                         </TableCell>
//                       ))}
//                     </TableRow>
//                   ))
//                 ) : (
//                   <TableRow>
//                     <TableCell
//                       colSpan={columns.length}
//                       className="h-24 text-center text-gray-500 italic" // Thêm style cho rõ ràng hơn
//                     >
//                       Không có dữ liệu.
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="flex items-center justify-end space-x-2 py-4">
//             <div className="text-muted-foreground flex-1 text-sm">
//               {table.getFilteredSelectedRowModel().rows.length} của{" "}
//               {table.getFilteredRowModel().rows.length} dòng được chọn.
//             </div>
//             <div className="space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.previousPage()}
//                 disabled={!table.getCanPreviousPage()}
//               >
//                 Trước
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => table.nextPage()}
//                 disabled={!table.getCanNextPage()}
//               >
//                 Sau
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
"use client"
import React, { useState, useMemo, useRef } from "react";
import {
  Edit,
  Trash2,
  Search,
  Plus,
  Download,
  Upload,
  X,
  Check,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import * as XLSX from "xlsx";
import { IUser } from "@/types/user";

// --- COMPONENT: CONFIRM DELETE MODAL ---
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-md p-6 rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-2 border-[#b91c1c]">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="text-[#b91c1c] w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#5d4037] mb-2 font-display">
            Xác nhận xóa?
          </h3>
          <p className="text-stone-600 mb-6">
            Bạn có chắc chắn muốn xóa thành viên{" "}
            <span className="font-bold text-[#b91c1c]">{itemName}</span>?
            <br />
            Hành động này không thể hoàn tác.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-stone-300 rounded text-stone-600 hover:bg-stone-100 font-bold transition-colors"
            >
              Hủy bỏ
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-[#b91c1c] text-white rounded hover:bg-[#991b1b] font-bold shadow-md transition-colors"
            >
              Xóa ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENT: USER MODAL (ADD/EDIT) ---
interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (user: Partial<IUser>) => void;
  initialData?: IUser | null;
}

const UserModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const user: any = {
      nguoiDungId: initialData?.nguoiDungId || `USER_${Date.now()}`,
      hoTen: formData.get("hoTen"),
      tenDangNhap: formData.get("tenDangNhap"),
      email: formData.get("email"),
      soDienThoai: formData.get("soDienThoai"),
      vaiTro: Number(formData.get("vaiTro")),
    };
    onSubmit(user);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#fffdf5] w-full max-w-2xl p-0 rounded-lg shadow-2xl border border-[#d4af37] overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#b91c1c] text-yellow-400 px-6 py-4 flex justify-between items-center">
          <h3 className="text-xl font-bold font-display uppercase tracking-wider">
            {initialData ? "Chỉnh sửa thông tin" : "Thêm thành viên mới"}
          </h3>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <form
          onSubmit={handleSubmit}
          className="p-8 overflow-y-auto custom-scrollbar flex-1 space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Họ và tên
              </label>
              <input
                required
                name="hoTen"
                defaultValue={initialData?.hoTen}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="Nguyễn Văn A"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Tên đăng nhập
              </label>
              <input
                required
                name="tenDangNhap"
                defaultValue={initialData?.tenDangNhap}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="nguyenvana"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={initialData?.email}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="example@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Số điện thoại
              </label>
              <input
                name="soDienThoai"
                defaultValue={initialData?.soDienThoai}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
                placeholder="0987654321"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-[#8b5e3c] uppercase">
                Vai trò
              </label>
              <select
                name="vaiTro"
                defaultValue={initialData?.roleId || 0}
                className="w-full p-3 bg-white border border-[#d4af37]/50 rounded focus:border-[#b91c1c] focus:outline-none shadow-inner"
              >
                <option value={0}>Thành viên (Xem và đóng góp)</option>
                <option value={1}>Trưởng họ (Quản trị toàn quyền)</option>
                <option value={2}>Thư ký (Biên tập nội dung)</option>
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 bg-[#fdf6e3] border-t border-[#d4af37]/30 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2 text-[#5d4037] font-bold hover:text-[#b91c1c] transition-colors"
          >
            Đóng lại
          </button>
          <button
            onClick={() =>
              (
                document.querySelector("form") as HTMLFormElement
              )?.requestSubmit()
            }
            className="px-8 py-2 bg-[#b91c1c] text-white font-bold rounded shadow hover:bg-[#991b1b] flex items-center gap-2 transition-all"
          >
            <Check size={18} /> Lưu Thông Tin
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---

export const QuanLyThanhVienPage: React.FC = () => {
  // --- STATE ---
  // Mock data ban đầu
  const [data, setData] = useState<IUser[]>([
    {
      nguoiDungId: "string",
      dongHoId: "string",
      tenDangNhap: "string",
      matKhau: "string",
      hoTen: "string",
      email: "string",
      soDienThoai: "string",
      roleId: "string",
      anhDaiDien: "string",
      ngayTao: null,
      nguoiTaoId: "string",
    },
    {
      nguoiDungId: "string2",
      dongHoId: "string",
      tenDangNhap: "string",
      matKhau: "string",
      hoTen: "string",
      email: "string",
      soDienThoai: "string",
      roleId: "string",
      anhDaiDien: "string",
      ngayTao: null,
      nguoiTaoId: "string",
    },
    {
      nguoiDungId: "string3",
      dongHoId: "string",
      tenDangNhap: "string",
      matKhau: "string",
      hoTen: "string",
      email: "string",
      soDienThoai: "string",
      roleId: "string",
      anhDaiDien: "string",
      ngayTao: null,
      nguoiTaoId: "string",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  // --- LOGIC HANDLERS ---

  // Filter Data
  const filteredData = useMemo(() => {
    return data.filter(
      (user) =>
        user.hoTen.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.tenDangNhap.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // CRUD Operations
  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: IUser) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setData((prev) =>
        prev.filter((u) => u.nguoiDungId !== userToDelete.nguoiDungId)
      );
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const handleSaveUser = (user: Partial<IUser>) => {
    if (editingUser) {
      // Update existing
      setData((prev) =>
        prev.map((u) =>
          u.nguoiDungId === editingUser.nguoiDungId
            ? ({ ...u, ...user } as IUser)
            : u
        )
      );
    } else {
      // Create new
      setData((prev) => [...prev, user as IUser]);
    }
    setIsModalOpen(false);
  };

  // --- EXCEL LOGIC ---
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachThanhVien");
    XLSX.writeFile(workbook, "DanhSachThanhVien_GiaPha.xlsx");
  };

  const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target?.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const dataParsed = XLSX.utils.sheet_to_json(ws) as IUser[];

        // Mocking API call: In reality, you'd send this array to backend
        console.log("Imported Data:", dataParsed);

        // Merge imported data with existing (simple append for demo)
        setData((prev) => [...prev, ...dataParsed]);
        alert(`Đã nhập thành công ${dataParsed.length} thành viên từ Excel!`);
      };
      reader.readAsBinaryString(file);
    }
  };

  // --- RENDER UI ---
  return (
    <div className="max-w-6xl mx-auto font-serif text-[#4a4a4a] pb-20 animate-fadeIn">
      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
            Quản Lý Thành Viên
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Danh sách nhân đinh và tài khoản truy cập hệ thống
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c5282] text-white rounded shadow hover:bg-[#2a4365] transition-all text-sm font-bold"
          >
            <Download size={16} /> Xuất Excel
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-[#276749] text-white rounded shadow hover:bg-[#22543d] transition-all text-sm font-bold relative overflow-hidden"
          >
            <Upload size={16} /> Nhập Excel
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx, .xls"
              onChange={handleImportExcel}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold ml-2"
          >
            <Plus size={16} /> Thêm Mới
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2">
        <div className="p-2 text-stone-400">
          <Search size={20} />
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo họ tên hoặc tên đăng nhập..."
          className="w-full p-2 outline-none bg-transparent text-[#5d4037]"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="p-2 text-stone-400 hover:text-[#b91c1c]"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-[#d4af37] shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#fdf6e3] border-b-2 border-[#d4af37] text-[#8b5e3c] text-sm uppercase font-bold">
                <th className="p-4 w-12 text-center">#</th>
                <th className="p-4">Mã Người Dùng</th>
                <th className="p-4">Họ và Tên</th>
                <th className="p-4">Tên Đăng Nhập</th>
                <th className="p-4 hidden md:table-cell">Email</th>
                <th className="p-4 hidden md:table-cell">Vai Trò</th>
                <th className="p-4 text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eaddcf]">
              {currentData.length > 0 ? (
                currentData.map((user, index) => (
                  <tr
                    key={user.nguoiDungId}
                    className="hover:bg-[#fffdf5] transition-colors group"
                  >
                    <td className="p-4 text-center text-stone-400 font-mono text-xs">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    {/* <td className="p-4 font-mono text-xs text-stone-500">
                      {user.nguoiDungId}
                    </td> */}
                    <td className="p-4 font-bold text-[#5d4037] group-hover:text-[#b91c1c]">
                      {user.hoTen}
                    </td>
                    <td className="p-4">{user.tenDangNhap}</td>
                    <td className="p-4 text-stone-500 hidden md:table-cell text-sm">
                      {user.email}
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      {/* <span
                        className={`px-3 py-1 rounded-full text-xs font-bold border ${
                          user.roleId === 1
                            ? "bg-red-100 text-red-800 border-red-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}
                      >
                        {user.roleId === 1 ? "Quản Trị Viên" : "Thành Viên"}
                      </span> */}
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Sửa"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Xóa"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="p-12 text-center text-stone-500 italic"
                  >
                    <div className="flex flex-col items-center">
                      <FileSpreadsheet size={48} className="mb-4 opacity-20" />
                      Không tìm thấy dữ liệu phù hợp.
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="bg-[#fdf6e3] p-4 border-t border-[#d4af37] flex items-center justify-between">
          <div className="text-sm text-[#8b5e3c]">
            Hiển thị{" "}
            <span className="font-bold">
              {filteredData.length > 0
                ? (currentPage - 1) * itemsPerPage + 1
                : 0}
            </span>{" "}
            -{" "}
            <span className="font-bold">
              {Math.min(currentPage * itemsPerPage, filteredData.length)}
            </span>{" "}
            trong số <span className="font-bold">{filteredData.length}</span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 hover:bg-[#fff8e1] text-[#5d4037]"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 border border-[#d4af37] rounded font-bold text-sm transition-colors ${
                  currentPage === page
                    ? "bg-[#b91c1c] text-white border-[#b91c1c]"
                    : "bg-white text-[#5d4037] hover:bg-[#fff8e1]"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-[#d4af37] rounded bg-white disabled:opacity-50 hover:bg-[#fff8e1] text-[#5d4037]"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
        initialData={editingUser}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={userToDelete?.hoTen || ""}
      />
    </div>
  );
};
