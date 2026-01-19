"use client";
import React, { useState, useRef, useEffect } from "react";
import { Users, Plus, Trash2, Edit, Upload, Download, GitBranch, Filter } from "lucide-react";
import * as XLSX from "xlsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { IMember, IMemberSearch, IMemberImport } from "@/types/member";
import {
  searchMemberByDongHo,
  importMembersJson,
  createMemberWithDongHo,
  updateMember,
  deleteMember,
  exportMembersExcel,
} from "@/service/member.service";
import { getDongHoById, IDongHo } from "@/service/dongho.service";
import { MemberModal } from "./components/MemberModal";
import { MemberDetailModal } from "./components/MemberDetailModal";
import { dowExcelTemple } from "@/service/member.service";
import { useToast } from "@/service/useToas";
import { useErrorModal } from "@/hooks";
import storage from "@/utils/storage";
import { 
  PageLayout,
  DataTable, 
  DeleteModal, 
  PageLoading, 
  ErrorState,
  NoFamilyTreeState,
  ValidationErrorModal,
  ErrorModal,
  ColumnConfig,
  ActionConfig 
} from "@/components/shared";

export default function QuanLyThanhVienPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);

  // --- SELECTION STATE ---
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // --- MODAL STATES ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<IMember | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [membersToDelete, setMembersToDelete] = useState<IMember[]>([]);

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMemberForDetail, setSelectedMemberForDetail] = useState<IMember | null>(null);
  const [isValidationErrorModalOpen, setIsValidationErrorModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<any[]>([]);
  const [validationSummary, setValidationSummary] = useState({ validCount: 0, totalCount: 0 });

  const { showSuccess, showError } = useToast();
  const errorModal = useErrorModal();

  // Lấy dongHoId từ user hiện tại
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch thông tin dòng họ
  const dongHoQuery = useQuery({
    queryKey: ["dongho", dongHoId],
    queryFn: () => getDongHoById(dongHoId!),
    enabled: !!dongHoId,
  });
  const dongHoInfo: IDongHo | null = dongHoQuery.data?.data || null;

  // Fetch TẤT CẢ members theo dongHoId - xử lý search và pagination ở client
  const allMembersParams: IMemberSearch = { 
    pageIndex: 1, 
    pageSize: 0, // 0 = lấy tất cả
    search_content: "", // Không search ở server
    dongHoId: dongHoId! 
  };
  
  const allMembersQuery = useQuery({
    queryKey: ["allMembers", dongHoId],
    queryFn: () => searchMemberByDongHo(allMembersParams),
    enabled: !!dongHoId,
  });

  // TẤT CẢ members từ server
  const rawAllMembers = (allMembersQuery.data?.data || []) as IMember[];
  const allMembers: IMember[] = Array.from(
    new Map(rawAllMembers.map((m: IMember) => [m.thanhVienId, m])).values()
  );

  // Client-side search filtering
  const searchedMembers = debouncedSearch 
    ? allMembers.filter((member: IMember) => 
        member.hoTen?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        member.ngheNghiep?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        member.noiSinh?.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : allMembers;

  // Client-side generation filtering
  const filteredMembers = selectedGeneration 
    ? searchedMembers.filter((member: IMember) => member.doiThuoc === selectedGeneration)
    : searchedMembers;

  // Get unique generations for filter dropdown
  const generations = Array.from(
    new Set(allMembers.map((m: IMember) => m.doiThuoc).filter(Boolean))
  ).sort((a, b) => (a as number) - (b as number)) as number[];

  // Client-side pagination
  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const memberData = filteredMembers.slice(startIndex, endIndex);
  
  const isLoading = allMembersQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: (data: Partial<IMember>) => createMemberWithDongHo(data, dongHoId!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
      showSuccess("Thêm thành viên thành công!");
      setIsModalOpen(false);
      setEditingMember(null);
    },
    onError: (error: any) => {
      console.error("Create member error:", error);
      
      // Kiểm tra nếu có validation errors từ server
      if (error.response?.data?.errors) {
        errorModal.showError(
          "Lỗi khi tạo thành viên",
          error.response.data.errors,
          error.response.data.warnings || []
        );
      } else {
        // Lỗi thông thường
        const errorMessage = error.message || "Có lỗi xảy ra khi thêm thành viên.";
        errorModal.showError("Lỗi khi tạo thành viên", [{
          field: "Hệ thống",
          message: errorMessage
        }]);
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; data: Partial<IMember> }) => updateMember(vars.id, vars.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
      showSuccess("Cập nhật thành công!");
      setIsModalOpen(false);
      setEditingMember(null);
    },
    onError: (error: any) => {
      console.error("Update member error:", error);
      
      // Kiểm tra nếu có validation errors từ server
      if (error.response?.data?.errors) {
        errorModal.showError(
          "Lỗi khi cập nhật thành viên",
          error.response.data.errors,
          error.response.data.warnings || []
        );
      } else {
        // Lỗi thông thường
        const errorMessage = error.message || "Có lỗi xảy ra khi cập nhật.";
        errorModal.showError("Lỗi khi cập nhật thành viên", [{
          field: "Hệ thống",
          message: errorMessage
        }]);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (memberIds: number[]) => {
      const deleteData = memberIds.map(id => ({ 
        thanhVienId: id,
        dongHoId: dongHoId! 
      }));
      const currentUser = storage.getUser();
      return deleteMember(deleteData, currentUser?.nguoiDungId || "");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
      showSuccess("Đã xóa thành viên.");
      setIsDeleteModalOpen(false);
      setMembersToDelete([]);
      setSelectedIds([]); // Reset selection như events page
    },
    onError: (error: any) => {
      console.error("Delete member error:", error);
      
      // Kiểm tra nếu có validation errors từ server
      if (error.response?.data?.errors) {
        errorModal.showError(
          "Lỗi khi xóa thành viên",
          error.response.data.errors,
          error.response.data.warnings || []
        );
      } else {
        // Lỗi thông thường
        const errorMessage = error.message || "Không thể xóa thành viên này.";
        errorModal.showError("Lỗi khi xóa thành viên", [{
          field: "Hệ thống",
          message: errorMessage
        }]);
      }
    },
  });

  // --- SELECTION HANDLERS ---
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(memberData.map((m: IMember) => m.thanhVienId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string | number, checked: boolean) => {
    const numId = Number(id);
    if (checked) {
      setSelectedIds((prev) => {
        const newIds = [...prev, numId];
        return newIds;
      });
    } else {
      setSelectedIds((prev) => {
        const newIds = prev.filter((i) => i !== numId);
        return newIds;
      });
    }
  };

  // --- MEMBER HANDLERS ---
  const handleAdd = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleEdit = (member: IMember) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  // Xóa 1 thành viên hoặc nhiều nếu đã chọn
  const handleDeleteClick = (member: IMember) => {
    // Nếu đã tick nhiều checkbox và member hiện tại nằm trong danh sách đã chọn
    // thì xóa tất cả những cái đã chọn
    if (selectedIds.length > 1 && selectedIds.includes(member.thanhVienId)) {
      const selected = memberData.filter((m: IMember) => selectedIds.includes(m.thanhVienId));
      setMembersToDelete(selected);
    } else {
      // Nếu không, chỉ xóa 1 cái được click
      setMembersToDelete([member]);
    }
    setIsDeleteModalOpen(true);
  };

  // Xóa nhiều thành viên đã chọn
  const handleDeleteSelected = () => {
    const selected = memberData.filter((m: IMember) => selectedIds.includes(m.thanhVienId));
    setMembersToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const memberIds = membersToDelete.map(m => m.thanhVienId);
    deleteMutation.mutate(memberIds);
  };

  const handleSaveMember = (member: Partial<IMember>) => {
    const currentUser = storage.getUser();
    const memberDataToSave = {
      ...member,
      dongHoId: dongHoId!,
      lu_user_id: currentUser?.nguoiDungId || "",
    };

    if (editingMember) {
      updateMutation.mutate({ id: editingMember.thanhVienId, data: memberDataToSave });
    } else {
      createMutation.mutate(memberDataToSave);
    }
  };

  const handleViewDetail = (member: IMember) => {
    setSelectedMemberForDetail(member);
    setIsDetailModalOpen(true);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  // Export Excel
  const handleExportExcel = async () => {
    if (!dongHoId) return;
    try {
      await exportMembersExcel(dongHoId);
      showSuccess("Xuất Excel thành công!");
    } catch (error: any) {
      showError(error.message || "Có lỗi khi xuất Excel");
    }
  };

  // Download Excel template
  const handleDownloadTemplate = async () => {
    try {
      const blob = await dowExcelTemple();
      if (!blob) {
        showError('Không thể tải file mẫu');
        return;
      }
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Mau_nhap_du_lieu_thanh_vien.xlsx');
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess('Tải file mẫu thành công!');
    } catch (error) {
      console.error('Lỗi khi tải file mẫu:', error);
      showError('Có lỗi xảy ra khi tải file mẫu');
    }
  };

  // Import Excel
  const handleImportExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!dongHoId) return;
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      showError("Chỉ chấp nhận file Excel (.xlsx, .xls)");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      showError("File quá lớn. Kích thước tối đa 10MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      showSuccess("Đang xử lý file Excel...");
      const members = await parseExcelToJson(file);
      if (members.length === 0) { 
        showError("File Excel không có dữ liệu"); 
        return; 
      }
      
      const result = await importMembersJson(members, dongHoId);
      
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
        showSuccess(result.message || `Nhập thành công ${members.length} thành viên!`);
      } else {
        // Hiển thị modal errors
        if (result.errors && result.errors.length > 0) {
          errorModal.showError(
            "Lỗi khi nhập dữ liệu Excel",
            result.errors,
            result.warnings || [],
            {
              validCount: result.validCount || 0,
              totalCount: result.totalCount || 0
            }
          );
        } else {
          errorModal.showError("Lỗi khi nhập dữ liệu Excel", [{
            field: "Import thất bại",
            message: result.message || "Không thể nhập dữ liệu. Vui lòng kiểm tra file Excel và thử lại."
          }]);
        }
      }
    } catch (error: any) {
      console.error("Import error:", error);
      
      // Luôn hiển thị modal thay vì toast
      if (error.response?.data?.errors) {
        errorModal.showError(
          "Lỗi khi nhập dữ liệu Excel",
          error.response.data.errors,
          error.response.data.warnings || [],
          {
            validCount: error.response.data.validCount || 0,
            totalCount: error.response.data.totalCount || 0
          }
        );
      } else if (error.response?.status === 500) {
        errorModal.showError("Lỗi hệ thống khi nhập Excel", [{
          row: 0,
          field: "Server Error",
          message: error.response?.data?.message || "Lỗi server khi xử lý file Excel. Vui lòng kiểm tra định dạng file và thử lại.",
          value: "HTTP 500"
        }]);
      } else {
        errorModal.showError("Lỗi khi nhập dữ liệu Excel", [{
          field: "Lỗi hệ thống",
          message: error?.message || "Có lỗi xảy ra khi nhập dữ liệu. Vui lòng kiểm tra file Excel và thử lại.",
          value: error?.code || "UNKNOWN_ERROR"
        }]);
      }
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Parse Excel helper
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
          const members: IMemberImport[] = rawData
            .filter((row: any) => { 
              const stt = row["STT"]; 
              if (stt === undefined || stt === null) return false; 
              if (typeof stt === "string" && isNaN(Number(stt))) return false; 
              return true; 
            })
            .map((row: any) => ({
              stt: toIntOrNull(row["STT"]),
              dongHoId: dongHoId!,
              hoTen: row["Họ và tên"] || "",
              gioiTinh: parseGioiTinh(row["Giới tính"]),
              ngaySinh: parseExcelDate(row["Ngày sinh"]),
              ngayMat: parseExcelDate(row["Ngày mất"]),
              noiSinh: row["Nơi sinh"] || "",
              noiMat: row["Nơi mất"] || "",
              ngheNghiep: row["Nghề nghiệp"] || "",
              trinhDoHocVan: row["Trình độ học vấn"] || "",
              soDienThoai: parsePhoneNumber(row["Số điện thoại"]),
              diaChiHienTai: row["Địa chỉ"] || "",
              tieuSu: row["Tiểu sử"] || "",
              anhChanDung: "",
              doiThuoc: toIntOrNull(row["Đời thứ"], 1) ?? 1,
              chaId: toIntOrNull(row["ID Cha"]),
              meId: toIntOrNull(row["ID Mẹ"]),
              voId: toIntOrNull(row["ID Vợ"]),
              chongId: toIntOrNull(row["ID Chồng"]),
              trangthai: 1,
              active_flag: 1,
              lu_user_id: "",
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

  const toIntOrNull = (v: any, defaultValue: number | null = null): number | null => {
    if (v === undefined || v === null || v === "") return defaultValue;
    if (typeof v === "number") return Math.round(v);
    const num = Number(String(v).trim());
    return isNaN(num) ? defaultValue : Math.round(num);
  };

  const parseGioiTinh = (v: any): number => { 
    if (typeof v === "number") return v === 1 ? 1 : 0; 
    const str = String(v || "").toLowerCase().trim(); 
    return (str === "nam" || str === "1") ? 1 : 0; 
  };

  const parsePhoneNumber = (phoneValue: any): string => {
    if (!phoneValue && phoneValue !== 0) return "";
    
    // Nếu là số, chuyển thành string và thêm số 0 đầu nếu cần
    if (typeof phoneValue === "number") {
      const phoneStr = phoneValue.toString();
      // Nếu số điện thoại có 9 chữ số và bắt đầu bằng 9, 8, 7, 3 thì thêm số 0 đầu
      if (phoneStr.length === 9 && /^[9873]/.test(phoneStr)) {
        return "0" + phoneStr;
      }
      return phoneStr;
    }
    
    // Nếu là string, giữ nguyên
    const phoneStr = String(phoneValue).trim();
    
    // Nếu string có 9 chữ số và bắt đầu bằng 9, 8, 7, 3 thì thêm số 0 đầu
    if (phoneStr.length === 9 && /^[9873]/.test(phoneStr)) {
      return "0" + phoneStr;
    }
    
    return phoneStr;
  };

  const parseExcelDate = (excelDate: any): string | null => {
    if (!excelDate && excelDate !== 0) return null;
    if (typeof excelDate === "number") { 
      if (excelDate >= 1800 && excelDate <= 2100) return `${excelDate}-01-01`; 
      const date = new Date((excelDate - 25569) * 86400 * 1000); 
      return date.toISOString().split("T")[0]; 
    }
    const str = String(excelDate).trim(); 
    if (!str) return null;
    if (/^\d{4}$/.test(str)) return `${str}-01-01`;
    const monthYearMatch = str.match(/^(\d{1,2})\/(\d{4})$/); 
    if (monthYearMatch) return `${monthYearMatch[2]}-${monthYearMatch[1].padStart(2, "0")}-01`;
    const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); 
    if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
    if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
    return str;
  };

  if (allMembersQuery.isLoading || dongHoQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách thành viên..." />;
  }

  if (allMembersQuery.isError || dongHoQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách thành viên. Vui lòng thử lại sau."
        onRetry={() => {
          allMembersQuery.refetch();
          dongHoQuery.refetch();
        }}
      />
    );
  }

  // --- NO FAMILY TREE STATE ---
  if (!dongHoId) {
    return <NoFamilyTreeState />;
  }

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "-";
    try {
      return new Date(date).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return "-";
    }
  };

  const columns: ColumnConfig<IMember>[] = [
    {
      key: "hoTen",
      label: "Họ và tên",
      clickable: true,
    },
    {
      key: "gioiTinh",
      label: "Giới tính",
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 1 
            ? "bg-blue-100 text-blue-800" 
            : "bg-pink-100 text-pink-800"
        }`}>
          {value === 1 ? "Nam" : "Nữ"}
        </span>
      ),
    },
    {
      key: "ngaySinh",
      label: "Ngày sinh",
      render: (value) => formatDate(value),
    },
    {
      key: "ngayMat",
      label: "Ngày mất",
      render: (value) => value ? formatDate(value) : (
        <span className="text-green-600 text-xs font-medium">Còn sống</span>
      ),
    },
    {
      key: "noiSinh",
      label: "Nơi sinh",
      render: (value) => value || "-",
    },
    {
      key: "noiMat",
      label: "Nơi mất",
      render: (value) => value || "-",
    },
    {
      key: "ngheNghiep",
      label: "Nghề nghiệp",
      render: (value) => value || "-",
    },
    {
      key: "trinhDoHocVan",
      label: "Trình độ học vấn",
      render: (value) => value || "-",
    },
    {
      key: "soDienThoai",
      label: "Số điện thoại",
      render: (value) => value || "-",
    },
    {
      key: "diaChiHienTai",
      label: "Địa chỉ hiện tại",
      render: (value) => value || "-",
    },
    {
      key: "doiThuoc",
      label: "Đời",
      render: (value) => (
        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
          Đời {value || "-"}
        </span>
      ),
    },
    {
      key: "tieuSu",
      label: "Tiểu sử",
      render: (value) => {
        if (!value) return "-";
        const truncated = value.length > 50 ? value.substring(0, 50) + "..." : value;
        return (
          <span className="text-sm text-gray-600" title={value}>
            {truncated}
          </span>
        );
      },
    },
  ];

  const customActions: ActionConfig<IMember>[] = [
    {
      icon: Edit,
      label: "Sửa",
      onClick: handleEdit,
      color: "blue",
    },
    {
      icon: Trash2,
      label: "Xóa",
      onClick: handleDeleteClick,
      color: "red",
    },
  ];

  const pageActions = [
    ...(selectedIds.length > 0 ? [{
      icon: Trash2,
      label: "Xóa",
      onClick: handleDeleteSelected,
      variant: "danger" as const,
      count: selectedIds.length,
    }] : []),
    {
      icon: Download,
      label: "Tải File Mẫu",
      onClick: handleDownloadTemplate,
      variant: "secondary" as const,
    },
    {
      icon: Download,
      label: "Xuất Excel",
      onClick: handleExportExcel,
      variant: "success" as const,
    },
    {
      icon: Upload,
      label: "Nhập Excel",
      onClick: () => fileInputRef.current?.click(),
      variant: "secondary" as const,
    },
    {
      icon: Plus,
      label: "Thêm Mới",
      onClick: handleAdd,
      variant: "primary" as const,
    },
  ];

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  if (allMembersQuery.isLoading || dongHoQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách thành viên..." />;
  }

  if (allMembersQuery.isError || dongHoQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách thành viên. Vui lòng thử lại sau."
        onRetry={() => {
          allMembersQuery.refetch();
          dongHoQuery.refetch();
        }}
      />
    );
  }

  // --- NO FAMILY TREE STATE ---
  if (!dongHoId) {
    return <NoFamilyTreeState />;
  }

  return (
    <PageLayout
      title={`Quản Lý Thành Viên - ${dongHoInfo?.tenDongHo || "Dòng Họ"}`}
      subtitle={dongHoInfo?.queQuanGoc ? `Quê quán: ${dongHoInfo.queQuanGoc}` : "Danh sách thành viên trong dòng họ"}
      icon={Users}
      actions={pageActions}
    >
      <input 
        ref={fileInputRef} 
        type="file" 
        accept=".xlsx, .xls" 
        onChange={handleImportExcel} 
        className="hidden" 
      />

      {/* Custom Search Bar với Filter và Xem cây */}
      <div className="mb-6">
        {/* Search và Filter cùng hàng */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 flex items-center bg-white border border-yellow-600 rounded-lg p-1 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-opacity-50">
            <div className="p-2 text-stone-400">
              {isLoading ? (
                <div className="animate-spin w-5 h-5 border-2 border-stone-400 border-t-transparent rounded-full"></div>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Tìm kiếm theo họ tên, nghề nghiệp, nơi sinh..."
              className="w-full p-2 outline-none bg-transparent text-yellow-900 placeholder-stone-400"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")} 
                className="p-2 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter theo đời */}
          <div className="flex items-center gap-2 min-w-[150px]">
            <Filter size={16} className="text-gray-500" />
            <select
              value={selectedGeneration || ""}
              onChange={(e) => {
                setSelectedGeneration(e.target.value === "" ? null : Number(e.target.value));
                setPageIndex(1);
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Tất cả đời</option>
              {generations.map(gen => (
                <option key={gen} value={gen}>
                  Đời {gen}
                </option>
              ))}
            </select>
          </div>

          {/* Xem cây gia phả */}
          <button
            onClick={() => window.open(`/genealogy?dongHoId=${dongHoId}`, '_blank')}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium whitespace-nowrap cursor-pointer"
          >
            <GitBranch size={1} />
            Xem Cây Gia Phả
          </button>
        </div>
      </div>

      <DataTable
        data={memberData}
        columns={columns}
        keyField="thanhVienId"
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalRecords={totalRecords}
        totalPages={totalPages}
        onPageChange={setPageIndex}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isLoading}
        enableSelection={true}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectOne={handleSelectOne}
        customActions={customActions}
        emptyMessage="Chưa có thành viên nào"
        onViewDetail={handleViewDetail}
      />

      <MemberModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingMember(null);
        }}
        onSave={handleSaveMember}
        member={editingMember}
        isLoading={isSaving}
        dongHoId={dongHoId!}
        allMembers={allMembers}
      />

      <MemberDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedMemberForDetail(null);
        }}
        member={selectedMemberForDetail}
        allMembers={allMembers}
        onNavigate={(member: IMember) => setSelectedMemberForDetail(member)}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        items={membersToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setMembersToDelete([]);
        }}
        onConfirm={handleConfirmDelete}
        itemDisplayField="hoTen"
        title={membersToDelete.length === 1 ? "Xác nhận xóa thành viên" : `Xác nhận xóa ${membersToDelete.length} thành viên`}
        message={membersToDelete.length === 1 ? 
          "Bạn có chắc chắn muốn xóa thành viên này? Hành động này không thể hoàn tác." :
          `Bạn có chắc chắn muốn xóa ${membersToDelete.length} thành viên đã chọn? Hành động này không thể hoàn tác.`
        }
        isLoading={isDeleting}
      />

      <ErrorModal
        isOpen={errorModal.isOpen}
        onClose={errorModal.hideError}
        title={errorModal.title}
        errors={errorModal.errors}
        warnings={errorModal.warnings}
        validCount={errorModal.validCount}
        totalCount={errorModal.totalCount}
      />

      <ValidationErrorModal
        isOpen={isValidationErrorModalOpen}
        onClose={() => {
          setIsValidationErrorModalOpen(false);
          setValidationErrors([]);
          setValidationWarnings([]);
        }}
        title="Lỗi nhập dữ liệu Excel"
        errors={validationErrors}
        warnings={validationWarnings}
        validCount={validationSummary.validCount}
        totalCount={validationSummary.totalCount}
      />
    </PageLayout>
  );
}