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
import {
  searchMember,
  importMembersJson,
  IMemberImport,
  createMember,
  updateMember,
  deleteMember,
} from "@/service/member.service";
import { MemberModal } from "./components/memberModal";
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
  const createMutation = useMutation({
    mutationFn: createMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member"] });
      showSuccess("Thêm thành viên thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi thêm thành viên.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; data: Partial<IMember> }) =>
      updateMember(vars.id, vars.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member"] });
      showSuccess("Cập nhật thông tin thành công!");
      setIsModalOpen(false);
    },
    onError: (error: any) => {
      showError(error.message || "Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["member"] });
      showSuccess("Đã xóa thành viên.");
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    },
    onError: (error: any) => {
      showError(error.message || "Không thể xóa thành viên này.");
    },
  });

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

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteMutation.mutate(userToDelete.thanhVienId);
    }
  };

  const handleSaveMember = (member: Partial<IMember>) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.thanhVienId, data: member });
    } else {
      createMutation.mutate(member);
    }
  };

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

  const handleImportExcel = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("Vui lòng chọn file Excel");
      return;
    }

    try {
      // Kiểm tra định dạng file
      if (!file.name.match(/\.(xlsx|xls)$/)) {
        alert("Vui lòng chọn file Excel (.xlsx hoặc .xls)");
        return;
      }

      // Đọc file Excel và parse thành JSON
      const members = await parseExcelToJson(file);

      if (members.length === 0) {
        showError("File Excel không có dữ liệu");
        return;
      }

      console.log("Parsed members:", members);

      // Gọi API import JSON (thay vì gửi file)
      const result = await importMembersJson(members);
      console.log("Import thành công:", result);

      showSuccess(`Nhập thành công ${members.length} thành viên!`);
      await queryClient.invalidateQueries({ queryKey: ["member"] });

      // Reset input file
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error: any) {
      console.error("Lỗi khi import file:", error);
      showError(
        error?.response?.data?.message || "Có lỗi xảy ra khi nhập dữ liệu"
      );
    }
  };

  // Helper: Parse Excel file thành JSON array
  const parseExcelToJson = (file: File): Promise<IMemberImport[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const rawData = XLSX.utils.sheet_to_json(worksheet);

          // Map dữ liệu Excel sang format chuẩn
          // Bỏ qua dòng hướng dẫn (STT không phải số hoặc null)
          const members: IMemberImport[] = rawData
            .filter((row: any) => {
              const stt = row["STT"];
              // Bỏ qua dòng hướng dẫn (STT = "Số thứ tự" hoặc không phải số)
              if (stt === undefined || stt === null) return false;
              if (typeof stt === "string" && isNaN(Number(stt))) return false;
              return true;
            })
            .map((row: any) => ({
              stt: toIntOrNull(row["STT"]),
              hoTen: row["Họ và tên"] || "",
              gioiTinh: parseGioiTinh(row["Giới tính"]),
              ngaySinh: parseExcelDate(row["Ngày sinh"]),
              ngayMat: parseExcelDate(row["Ngày mất"]),
              noiSinh: row["Nơi sinh"] || "",
              noiMat: row["Nơi mất"] || "",
              ngheNghiep: row["Nghề nghiệp"] || "",
              trinhDoHocVan: row["Trình độ học vấn"] || "",
              diaChiHienTai: row["Địa chỉ"] || "",
              tieuSu: row["Tiểu sử"] || "",
              doiThuoc: toIntOrNull(row["Đời thứ"], 1) ?? 1,
              chaId: toIntOrNull(row["ID Cha"]),
              meId: toIntOrNull(row["ID Mẹ"]),
              voId: toIntOrNull(row["ID Vợ"]),
              chongId: toIntOrNull(row["ID Chồng"]),
            }));

          resolve(members);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error("Không thể đọc file"));
      reader.readAsBinaryString(file);
    });
  };

  // Helper functions
  const toIntOrNull = (
    v: any,
    defaultValue: number | null = null
  ): number | null => {
    if (v === undefined || v === null || v === "") return defaultValue;
    if (typeof v === "number") return Math.round(v);
    const num = Number(String(v).trim());
    return isNaN(num) ? defaultValue : Math.round(num);
  };

  const parseGioiTinh = (v: any): number => {
    if (typeof v === "number") return v === 1 ? 1 : 0;
    const str = String(v || "")
      .toLowerCase()
      .trim();
    if (str === "nam" || str === "1") return 1;
    return 0;
  };

  // Xử lý ngày linh hoạt: chỉ năm, tháng/năm, hoặc đầy đủ
  const parseExcelDate = (excelDate: any): string | null => {
    if (!excelDate && excelDate !== 0) return null;

    // Nếu là số (Excel date serial hoặc chỉ năm)
    if (typeof excelDate === "number") {
      // Nếu là năm (1800-2100)
      if (excelDate >= 1800 && excelDate <= 2100) {
        return `${excelDate}-01-01`; // Chỉ năm -> 01/01/năm
      }
      // Excel date serial number
      const date = new Date((excelDate - 25569) * 86400 * 1000);
      return date.toISOString().split("T")[0];
    }

    const str = String(excelDate).trim();
    if (!str) return null;

    // Chỉ năm: "1950"
    if (/^\d{4}$/.test(str)) {
      return `${str}-01-01`;
    }

    // Tháng/Năm: "03/1950" hoặc "3/1950"
    const monthYearMatch = str.match(/^(\d{1,2})\/(\d{4})$/);
    if (monthYearMatch) {
      const month = monthYearMatch[1].padStart(2, "0");
      return `${monthYearMatch[2]}-${month}-01`;
    }

    // Năm-Tháng: "1950-03"
    const yearMonthMatch = str.match(/^(\d{4})-(\d{1,2})$/);
    if (yearMonthMatch) {
      const month = yearMonthMatch[2].padStart(2, "0");
      return `${yearMonthMatch[1]}-${month}-01`;
    }

    // Ngày/Tháng/Năm: "15/03/1950"
    const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dmyMatch) {
      const day = dmyMatch[1].padStart(2, "0");
      const month = dmyMatch[2].padStart(2, "0");
      return `${dmyMatch[3]}-${month}-${day}`;
    }

    // Năm-Tháng-Ngày: "1950-03-15" (ISO format)
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
      return str;
    }

    // Trả về nguyên bản nếu không match pattern nào
    return str;
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

      {/* Member Modal */}
      <MemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveMember}
        member={editingUser}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && userToDelete && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-[#5d4037] mb-4">
              Xác nhận xóa
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa thành viên{" "}
              <strong>{userToDelete.hoTen}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setUserToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {deleteMutation.isPending ? "Đang xóa..." : "Xóa"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
