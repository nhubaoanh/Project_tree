"use client";
import React, { useRef, useState } from "react";
import { Users, Plus, Trash2, Edit, Upload, Download, GitBranch, Filter, User, Calendar, Phone, MapPin, Briefcase, GraduationCap, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import { IMember, IMemberSearch, IMemberImport } from "@/types/member";
import {
  searchMemberByDongHo,
  importMembersJson,
  createMemberWithDongHo,
  updateMember,
  deleteMember,
  exportMembersExcel,
  dowExcelTemple,
} from "@/service/member.service";
import { getDongHoById } from "@/service/dongho.service";
import { MemberModal } from "./components/MemberModal";
import { MemberDetailModal } from "./components/MemberDetailModal";
import { useCrudPage } from "@/hooks";
import storage from "@/utils/storage";
import { 
  PageLayout,
  DataTable, 
  DeleteModal, 
  PageLoading, 
  ErrorState,
  NoFamilyTreeState,
  ColumnConfig,
  ActionConfig,
  DetailModal,
  DetailSection,
  DetailField
} from "@/components/shared";
import { ErrorModal } from "@/components/shared/ErrorModal";
import { useQuery } from "@tanstack/react-query";

export default function QuanLyThanhVienPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
  const [allMembers, setAllMembers] = useState<IMember[]>([]);

  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Fetch thông tin dòng họ
  const dongHoQuery = useQuery({
    queryKey: ["dongho", dongHoId],
    queryFn: () => getDongHoById(dongHoId!),
    enabled: !!dongHoId,
  });
  const dongHoInfo = dongHoQuery.data?.data || null;

  // Use generic CRUD hook với custom search logic
  const crud = useCrudPage<IMember>({
    queryKey: ["allMembers", dongHoId || ""],
    operations: {
      search: async (params) => {
        const searchParams: IMemberSearch = {
          pageIndex: 1,
          pageSize: 0, // Lấy tất cả
          search_content: "",
          dongHoId: dongHoId!,
        };
        const response = await searchMemberByDongHo(searchParams);
        
        // Lưu tất cả members để dùng cho filter và modal
        const rawMembers = (response?.data || []) as IMember[];
        const uniqueMembers = Array.from(
          new Map(rawMembers.map((m: IMember) => [m.thanhVienId, m])).values()
        );
        setAllMembers(uniqueMembers);
        
        return response;
      },
      create: (data) => {
        const memberData = {
          ...data,
          dongHoId: dongHoId!,
          lu_user_id: user?.nguoiDungId || "",
        };
        return createMemberWithDongHo(memberData, dongHoId!);
      },
      update: (data) => {
        const memberData = data as IMember;
        
        // Validate thanhVienId
        if (!memberData.thanhVienId || memberData.thanhVienId <= 0) {
          console.error('❌ [Update Member] Invalid data:', memberData);
          throw new Error("ID thành viên không hợp lệ");
        }
        
        // Thêm các field bắt buộc
        const finalData = {
          ...memberData,
          dongHoId: dongHoId!,
          lu_user_id: user?.nguoiDungId || "",
        };
        
        console.log('🔄 [Update Member] Data:', finalData);
        
        // Loại bỏ thanhVienId khỏi body trước khi gửi
        const { thanhVienId, ...bodyData } = finalData;
        return updateMember(thanhVienId, bodyData);
      },
      delete: (params) => {
        const deleteData = params.items.map((item: IMember) => ({
          thanhVienId: item.thanhVienId,
          dongHoId: dongHoId!,
        }));
        return deleteMember(deleteData, params.userId || user?.nguoiDungId || "");
      },
      export: async () => {
        await exportMembersExcel(dongHoId!);
        return new Blob(); // Return empty blob for compatibility
      },
      import: async (file) => {
        const members = await parseExcelToJson(file, dongHoId!);
        return importMembersJson(members, dongHoId!);
      },
    },
    searchParams: { dongHoId: dongHoId || "" },
    tableConfig: {
      initialPageSize: 5,
      enableSelection: true,
      enableSearch: true,
    },
    enableImportExport: true,
    messages: {
      createSuccess: "Thêm thành viên thành công!",
      updateSuccess: "Cập nhật thành công!",
      deleteSuccess: "Đã xóa thành viên.",
      createError: "Có lỗi xảy ra khi thêm thành viên.",
      updateError: "Có lỗi xảy ra khi cập nhật.",
      deleteError: "Không thể xóa thành viên này.",
    },
  });

  // Client-side filtering với generation và search
  const filteredData = React.useMemo(() => {
    let filtered = crud.data;
    
    // Filter by search term
    if (crud.searchTerm) {
      const searchLower = crud.searchTerm.toLowerCase();
      filtered = filtered.filter((m: IMember) => 
        m.hoTen?.toLowerCase().includes(searchLower) ||
        m.ngheNghiep?.toLowerCase().includes(searchLower) ||
        m.noiSinh?.toLowerCase().includes(searchLower) ||
        m.soDienThoai?.toLowerCase().includes(searchLower) ||
        m.diaChiHienTai?.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by generation
    if (selectedGeneration) {
      filtered = filtered.filter((m: IMember) => m.doiThuoc === selectedGeneration);
    }
    
    return filtered;
  }, [crud.data, crud.searchTerm, selectedGeneration]);

  // Paginated data - lấy dữ liệu theo trang
  const paginatedData = React.useMemo(() => {
    const startIndex = (crud.pageIndex - 1) * crud.pageSize;
    const endIndex = startIndex + crud.pageSize;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, crud.pageIndex, crud.pageSize]);

  // Get unique generations for filter dropdown
  const generations = React.useMemo(() => {
    return Array.from(
      new Set(allMembers.map((m: IMember) => m.doiThuoc).filter(Boolean))
    ).sort((a, b) => (a as number) - (b as number)) as number[];
  }, [allMembers]);

  // Custom handlers
  const handleDeleteClick = (member: IMember) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(member.thanhVienId)) {
      const selected = paginatedData.filter((m: IMember) => crud.selectedIds.includes(m.thanhVienId));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([member]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = paginatedData.filter((m: IMember) => crud.selectedIds.includes(m.thanhVienId));
    crud.handleDelete(selected);
  };

  // Download template handler
  const handleDownloadTemplate = async () => {
    try {
      const blob = await dowExcelTemple();
      if (!blob) return;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Mau_nhap_du_lieu_thanh_vien.xlsx');
      document.body.appendChild(link);
      link.click();
      if (link.parentNode) link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Lỗi khi tải file mẫu:', error);
    }
  };

  // File input handler
  const handleFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Sử dụng crud.handleImport
    if (crud.handleImport) {
      await crud.handleImport(file);
    }
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Page actions
  const pageActions = React.useMemo(() => [
    ...(crud.hasSelection ? [{
      id: "bulk-delete",
      icon: Trash2,
      label: `Xóa đã chọn (${crud.selectedIds.length})`,
      onClick: handleDeleteSelected,
      variant: "danger" as const,
    }] : []),
    {
      id: "download-template",
      icon: Download,
      label: "Tải File Mẫu",
      onClick: handleDownloadTemplate,
      variant: "secondary" as const,
    },
    {
      id: "export-excel",
      icon: Download,
      label: "Xuất Excel",
      onClick: crud.handleExport || (() => console.log("Export không khả dụng")),
      variant: "success" as const,
    },
    {
      id: "import-excel",
      icon: Upload,
      label: "Nhập Excel",
      onClick: () => fileInputRef.current?.click(),
      variant: "primary" as const,
    },
    {
      id: "add-new",
      icon: Plus,
      label: "Thêm Mới",
      onClick: crud.handleAdd,
      variant: "primary" as const,
    },
  ], [crud.hasSelection, crud.selectedIds.length, handleDeleteSelected, crud.handleAdd, crud.handleExport, handleDownloadTemplate]);

  // Loading state
  if (crud.isLoading || dongHoQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách thành viên..." />;
  }

  // Error state
  if (crud.error || dongHoQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách thành viên. Vui lòng thử lại sau."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // No family tree state
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
      onClick: crud.handleEdit,
      color: "blue",
    },
    {
      icon: Trash2,
      label: "Xóa",
      onClick: handleDeleteClick,
      color: "red",
    },
  ];

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
        onChange={handleFileInputChange} 
        className="hidden" 
      />

      {/* Custom Filter Bar - ngang hàng với search */}
      <div className="mb-6 flex flex-col md:flex-row gap-3 items-center">
        {/* Search box - chiếm phần lớn không gian */}
        <div className="flex-1 w-full flex items-center bg-white border border-yellow-600 rounded-lg p-1 shadow-sm transition-all focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-opacity-50">
          <div className="p-2 text-stone-400">
            {crud.isLoading ? (
              <div className="animate-spin w-5 h-5 border-2 border-stone-400 border-t-transparent rounded-full"></div>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
          <input
            value={crud.searchTerm}
            onChange={(e) => crud.handleSearch(e.target.value)}
            placeholder="Tìm kiếm theo họ tên, nghề nghiệp, nơi sinh..."
            className="w-full p-2 outline-none bg-transparent text-yellow-900 placeholder-stone-400"
          />
          {crud.searchTerm && (
            <button 
              onClick={() => crud.handleSearch("")} 
              className="p-2 text-stone-400 hover:text-red-700 transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Filter theo đời */}
        <div className="flex items-center gap-2 min-w-[180px]">
          <Filter size={16} className="text-gray-500" />
          <select
            value={selectedGeneration || ""}
            onChange={(e) => {
              setSelectedGeneration(e.target.value === "" ? null : Number(e.target.value));
              crud.handlePageChange(1);
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium whitespace-nowrap cursor-pointer text-sm"
        >
          <GitBranch size={16} />
          Xem Cây Gia Phả
        </button>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        keyField="thanhVienId"
        pageIndex={crud.pageIndex}
        pageSize={crud.pageSize}
        totalRecords={filteredData.length}
        totalPages={Math.ceil(filteredData.length / crud.pageSize)}
        onPageChange={crud.handlePageChange}
        onPageSizeChange={crud.handlePageSizeChange}
        isLoading={crud.isLoading}
        enableSelection={true}
        selectedIds={crud.selectedIds as number[]}
        onSelectAll={crud.handleSelectAll}
        onSelectOne={crud.handleSelectOne}
        customActions={customActions}
        emptyMessage="Chưa có thành viên nào"
        onViewDetail={crud.handleViewDetail}
      />

      <MemberModal
        isOpen={crud.isFormOpen}
        onClose={crud.handleCloseForm}
        onSave={crud.handleSave}
        member={crud.editingItem}
        isLoading={crud.isSaving}
        dongHoId={dongHoId!}
        allMembers={allMembers}
      />

      <MemberDetailModal
        isOpen={crud.isDetailOpen}
        onClose={crud.handleCloseDetail}
        member={crud.selectedItemForDetail}
        allMembers={allMembers}
        onNavigate={(member: IMember) => crud.handleViewDetail(member)}
      />

      <ErrorModal
        isOpen={crud.isErrorModalOpen}
        onClose={crud.handleCloseErrorModal}
        title={crud.errorModalTitle}
        errors={crud.errorModalErrors}
        warnings={crud.errorModalWarnings}
        validCount={crud.errorModalValidCount}
        totalCount={crud.errorModalTotalCount}
      />

      <DeleteModal
        isOpen={crud.isDeleteOpen}
        items={crud.itemsToDelete}
        onClose={crud.handleCloseDelete}
        onConfirm={crud.handleConfirmDelete}
        itemDisplayField="hoTen"
        title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa thành viên" : `Xác nhận xóa ${crud.itemsToDelete.length} thành viên`}
        message={crud.itemsToDelete.length === 1 ? 
          "Bạn có chắc chắn muốn xóa thành viên này? Hành động này không thể hoàn tác." :
          `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} thành viên đã chọn? Hành động này không thể hoàn tác.`
        }
        isLoading={crud.isDeleting}
      />
    </PageLayout>
  );
}

// Helper functions for Excel parsing
const parseExcelToJson = (file: File, dongHoId: string): Promise<IMemberImport[]> => {
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
            dongHoId: dongHoId,
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
  
  if (typeof phoneValue === "number") {
    const phoneStr = phoneValue.toString();
    if (phoneStr.length === 9 && /^[9873]/.test(phoneStr)) {
      return "0" + phoneStr;
    }
    return phoneStr;
  }
  
  const phoneStr = String(phoneValue).trim();
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