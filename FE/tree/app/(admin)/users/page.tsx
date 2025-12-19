"use client";
import React, { useState } from "react";
import { Search, Plus, Download, X, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { IUser, IUserSearch } from "@/types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/service/user.service";
import { MemberTable } from "./components/userTable";
import { UserModal } from "./components/userModal";
import { ConfirmDeleteModal } from "./components/userDelete";
import { useToast } from "@/service/useToas";

// --- MAIN PAGE COMPONENT ---

export default function QuanLyThanhVienPage() {
  const queryClient = useQueryClient();

  // --- STATE FOR API QUERY PARAMETERS ---
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IUser | null>(null);

  const {showSuccess, showError} = useToast();

  // --- DEBOUNCE SEARCH ---
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // --- FETCHING DATA ---
  const searchParams: IUserSearch = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
  };

  const usersQuery = useQuery({
    queryKey: ["users", searchParams],
    queryFn: () => getUsers(searchParams),
    placeholderData: keepPreviousData,
  });

  const userData = usersQuery.data?.data || [];
  console.log("User Data:", userData);
  const totalRecords = usersQuery.data?.totalItems || 0;
  const totalPages = usersQuery.data?.pageCount || 0;
  const isLoading = usersQuery.isLoading;


  // --- MUTATIONS - CRUD ---
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccess("Thêm thành viên thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      // toast.error("Có lỗi xảy ra khi thêm thành viên.");
      showError("Có lỗi xảy ra khi thêm thành viên.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: string; user: Partial<IUser> }) =>
      updateUser(vars.id, vars.user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      // toast.success("Cập nhật thông tin thành công!");
      showSuccess("Cập nhật thông tin thành công!")
      setIsModalOpen(false);
    },
    onError: () => {
      // toast.error("Có lỗi xảy ra khi cập nhật.");
      showError("Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (userIds: string[]) => deleteUser(userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccess("Đã xóa thành viên.");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    },
    onError: () => {
      showError("Không thể xóa thành viên này.");
    },
  });

  // --- EVENT HANDLERS ---

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
      deleteMutation.mutate([userToDelete.nguoiDungId]);
    }
  };

  const handleSaveUser = (user: Partial<IUser>) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.nguoiDungId, user });
    } else {
      createMutation.mutate(user);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  // --- EXCEL HANDLERS ---

  const handleExportExcel = () => {
    if (userData.length === 0) {
      toast("Không có dữ liệu để xuất");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachThanhVien");
    XLSX.writeFile(workbook, `DanhSachThanhVien_Trang${pageIndex}.xlsx`);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // --- RENDER UI ---
  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
      {/* Header & Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
            Quản Lý Người Dùng
          </h2>
          <p className="text-[#8b5e3c] italic text-sm">
            Danh sách nhân đinh và tài khoản truy cập hệ thống
          </p>
        </div>

        <div className="flex gap-2 flex-wrap justify-end">
          <button
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c5282] text-white rounded shadow hover:bg-[#2a4365] transition-all text-sm font-bold"
          >
            <Download size={16} />{" "}
            <span className="hidden sm:inline">Xuất Excel</span>
          </button>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] transition-all text-sm font-bold ml-2"
          >
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">Thêm Mới</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2 transition-all focus-within:ring-2 ring-[#d4af37]/50">
        <div className="p-2 text-stone-400">
          {isLoading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <Search size={20} />
          )}
        </div>
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm theo họ tên, tài khoản..."
          className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400"
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

      {/* Table Component */}
      <MemberTable
        data={userData}
        isLoading={isLoading}
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={handlePageSizeChange}
        onEdit={handleEdit}
        onDelete={handleDeleteClick}
      />

      {/* Modals */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
        initialData={editingUser}
        isLoading={isSaving}
      />

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={userToDelete?.full_name || ""}
        isLoading={isDeleting}
      />
    </div>
  );
};

