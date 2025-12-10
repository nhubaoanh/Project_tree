"use client";
import React, { useState, useRef } from "react";
import { Search, Plus, Download, Upload, X, Loader2 } from "lucide-react";
import * as XLSX from "xlsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { IMember, IMemberSearch } from "@/types/member";
import { useToast } from "@/service/useToas";
import { MemberTable } from "./components/memberTable";
import { getMembers, importExcel, searchMember } from "@/service/member.service";
import toast from "react-hot-toast";
import { ExcelTemplateButton } from "./components/ExcelTemplateButton";

// --- MAIN PAGE COMPONENT ---

export default function QuanLyThanhVienPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE FOR API QUERY PARAMETERS ---
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IMember | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<IMember | null>(null);

  const { showSuccess, showError } = useToast();

  // --- DEBOUNCE SEARCH ---
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1); // Reset to page 1 on new search
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // // --- FETCHING DATA ---
  const searchParams: IMemberSearch = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
  };

  const memberQuery = useQuery({
    queryKey: ["member", searchParams],
    queryFn: () => searchMember(searchParams),
    placeholderData: keepPreviousData,
  });

  const memberData = memberQuery.data?.data || [];
  // showSuccess("lay du lieu len thanh cong!")
  console.log("memberData", memberData);
  const totalRecords = memberQuery.data?.totalItems || 0;
  const totalPages = memberQuery.data?.pageCount || 0;
  const isLoading = memberQuery.isLoading;


  // --- MUTATIONS - CRUD ---
  // const createMutation = useMutation({
  //   mutationFn: createUser,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //     // toast.success("Thêm thành viên thành công!");
  //     showSuccess("Thêm thành viên thành công!");
  //     setIsModalOpen(false);
  //   },
  //   onError: () => {
  //     // toast.error("Có lỗi xảy ra khi thêm thành viên.");
  //     showError("Có lỗi xảy ra khi thêm thành viên.");
  //   },
  // });

  // const updateMutation = useMutation({
  //   mutationFn: (vars: { id: string; user: Partial<IUser> }) =>
  //     updateUser(vars.id, vars.user),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //     // toast.success("Cập nhật thông tin thành công!");
  //     showSuccess("Cập nhật thông tin thành công!")
  //     setIsModalOpen(false);
  //   },
  //   onError: () => {
  //     // toast.error("Có lỗi xảy ra khi cập nhật.");
  //     showError("Có lỗi xảy ra khi cập nhật.");
  //   },
  // });

  // const deleteMutation = useMutation({
  //   mutationFn: deleteUser,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //     toast.success("Đã xóa thành viên.");
  //     setIsDeleteModalOpen(false);
  //     setUserToDelete(null);
  //   },
  //   onError: () => {
  //     toast.error("Không thể xóa thành viên này.");
  //   },
  // });

  // --- EVENT HANDLERS ---

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (user: IMember) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (user: IMember) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  // const handleConfirmDelete = () => {
  //   if (userToDelete) {
  //     deleteMutation.mutate(userToDelete.nguoiDungId);
  //   }
  // };

  // const handleSaveUser = (user: Partial<IUser>) => {
  //   if (editingUser) {
  //     updateMutation.mutate({ id: editingUser.nguoiDungId, user });
  //   } else {
  //     createMutation.mutate(user);
  //   }
  // };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  // --- EXCEL HANDLERS ---

  const handleExportExcel = () => {
    if (memberData.length === 0) {
      showError("Không có dữ liệu để xuất");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(memberData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DanhSachThanhVien");
    XLSX.writeFile(workbook, `DanhSachThanhVien_Trang${pageIndex}.xlsx`);
  };

  const handleImportExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file", file)
    if (!file) {
      alert("Vui lòng chọn file Excel");
      return;
    }

    try {
      // Kiểm tra định dạng file
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        alert('Vui lòng chọn file Excel (.xlsx hoặc .xls)');
        return;
      }

      // Gọi API import
      const result = await importExcel(file);
      console.log('Import thành công:', result);

      // Hiển thị thông báo thành công
      alert('Nhập dữ liệu thành công!');

      // Làm mới dữ liệu nếu cần
      // await fetchData();

      // Reset input file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Lỗi khi import file:', error);
      alert('Có lỗi xảy ra khi nhập dữ liệu. Vui lòng thử lại.');
    }
  };

  // const handleImportExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = (evt) => {
  //       const bstr = evt.target?.result;
  //       const wb = XLSX.read(bstr, { type: "binary" });
  //       const wsname = wb.SheetNames[0];
  //       const ws = wb.Sheets[wsname];
  //       const dataParsed = XLSX.utils.sheet_to_json(ws) as IUser[];

  //       console.log("Imported Data:", dataParsed);

  //       if (dataParsed.length > 0) {
  //         let successCount = 0;
  //         const promises = dataParsed.map(async (u) => {
  //           try {
  //             const res = await createUser(u);
  //             console.log("Import result:", res);
  //             successCount++;
  //           } catch (err) {
  //             console.error("Import error for row", u);
  //           }
  //         });

  //         Promise.all(promises).then(() => {
  //           queryClient.invalidateQueries({ queryKey: ["users"] });
  //           toast.success(`Đã xử lý nhập ${dataParsed.length} dòng.`);
  //           if (fileInputRef.current) fileInputRef.current.value = "";
  //         });
  //       }
  //     };
  //     reader.readAsBinaryString(file);
  //   }
  // };

  // const isSaving = createMutation.isPending || updateMutation.isPending;
  // const isDeleting = deleteMutation.isPending;

  // Handle loading state
  if (memberQuery.isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d4af37]"></div>
      </div>
    );
  }

  // Handle error state
  if (memberQuery.isError) {
    return (
      <div className="p-4 mb-4 text-red-600 bg-red-100 rounded flex justify-between items-center">
        <span>Lỗi khi tải dữ liệu. Vui lòng thử lại sau.</span>
        <button
          onClick={() => memberQuery.refetch()}
          className="px-3 py-1 bg-[#d4af37] text-white rounded hover:bg-[#b8962a]"
        >
          Thử lại
        </button>
      </div>
    );
  }


  // --- RENDER UI ---
  return (
    <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
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

        <div className="flex gap-2 flex-wrap justify-end">
          <button
            // onClick={handleExportExcel}
            className="flex items-center gap-2 px-4 py-2 bg-[#2c5282] text-white rounded shadow hover:bg-[#2a4365] transition-all text-sm font-bold"
          >
            <Download size={16} />{" "}
            <span className="hidden sm:inline">Xuất Excel</span>
          </button>
          <ExcelTemplateButton />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-[#276749] text-white rounded shadow hover:bg-[#22543d] transition-all text-sm font-bold relative overflow-hidden"
          >
            <Upload size={16} />{" "}
            <span className="hidden sm:inline">Nhập Excel</span>
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
        data={memberData}
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

      {/*<UserModal
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
        itemName={userToDelete?.hoTen || ""}
        isLoading={isDeleting}
      /> */}
    </div>
  );
};

