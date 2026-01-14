"use client";
import React, { useState, useRef, useEffect } from "react";
import { DollarSign, Plus, Download, Upload, Trash2, Eye, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { IContributionUp, IsearchContributionUp } from "@/types/contribuitionUp";
import { createContributionUp, deleteContributionUp, searchContributionUp, updateContributionUp, downloadTemplate, downloadTemplateWithSample, exportExcel, importFromExcel } from "@/service/contribuitionUp.service";
import { ContributionUpModal } from "./components/contribuitionUpModal";
import { useToast } from "@/service/useToas";
import storage from "@/utils/storage";
import {
  PageLayout, 
  DataTable, 
  DeleteModal, 
  DetailModal,
  PageLoading, 
  ErrorState,
  NoFamilyTreeState,
  ValidationErrorModal,
  ColumnConfig,
  ActionConfig,
  DetailSection,
  DetailField
} from "@/components/shared";
import { User, Calendar, CreditCard, FileText, Phone, MessageSquare } from "lucide-react";

export default function QuanLyTaiChinhThuPage() {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState<any>(null);
  const [dongHoId, setDongHoId] = useState<string>("");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const userData = storage.getUser();
    setUser(userData);
    if (userData?.dongHoId) {
      setDongHoId(userData.dongHoId);
    }
    setIsReady(true);
  }, []);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Selection state
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<IContributionUp | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<IContributionUp[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContributionForDetail, setSelectedContributionForDetail] = useState<IContributionUp | null>(null);
  const [isValidationErrorModalOpen, setIsValidationErrorModalOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [validationWarnings, setValidationWarnings] = useState<any[]>([]);
  const [validationSummary, setValidationSummary] = useState({ validCount: 0, totalCount: 0 });

  const { showSuccess, showError } = useToast();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IsearchContributionUp = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: dongHoId || undefined,
  };

  const usersQuery = useQuery({
    queryKey: ["contribuitionUp", searchParams],
    queryFn: () => searchContributionUp(searchParams),
    placeholderData: keepPreviousData,
    enabled: isReady && !!dongHoId,
  });

  const userData = usersQuery.data?.data || [];
  const totalRecords = usersQuery.data?.totalItems || 0;
  const totalPages = usersQuery.data?.pageCount || 0;
  const isLoading = usersQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createContributionUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
      showSuccess("Thêm dữ liệu đóng góp thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi thêm.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateContributionUp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
      showSuccess("Cập nhật dữ liệu thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (listJson: { thuId: number }[]) => deleteContributionUp(listJson, user?.nguoiDungId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
      showSuccess("Đã xóa thành công.");
      setIsDeleteModalOpen(false);
      setItemsToDelete([]);
      setSelectedIds([]);
    },
    onError: () => {
      showError("Không thể xóa.");
    },
  });

  // Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(userData.map((e: IContributionUp) => e.thuId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string | number, checked: boolean) => {
    const numId = Number(id);
    if (checked) {
      setSelectedIds((prev) => [...prev, numId]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== numId));
    }
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: IContributionUp) => {
    setEditingUser(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: IContributionUp) => {
    if (selectedIds.length > 1 && selectedIds.includes(item.thuId)) {
      const selected = userData.filter((e: IContributionUp) => selectedIds.includes(e.thuId));
      setItemsToDelete(selected);
    } else {
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = userData.filter((e: IContributionUp) => selectedIds.includes(e.thuId));
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const listJson = itemsToDelete.map((item) => ({ thuId: item.thuId }));
    deleteMutation.mutate(listJson);
  };

  const handleSaveUser = (data: Partial<IContributionUp>) => {
    if (editingUser) {
      updateMutation.mutate(data as IContributionUp);
    } else {
      createMutation.mutate(data as IContributionUp);
    }
  };

  const handleViewDetail = (item: IContributionUp) => {
    setSelectedContributionForDetail(item);
    setIsDetailModalOpen(true);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const handleExportExcel = async () => {
    if (userData.length === 0) {
      toast("Không có dữ liệu để xuất");
      return;
    }
    
    try {
      console.log('🔵 Bắt đầu export Excel...');
      // Gọi API backend để export Excel (có format template)
      const blob = await exportExcel();
      console.log('✅ Nhận được blob:', blob.size, 'bytes');
      
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `TaiChinhThu_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess("Đã xuất dữ liệu thành công!");
    } catch (error: any) {
      console.error('❌ Export Excel error:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      console.error('Error message:', error.message);
      
      // Nếu response data là Blob, đọc nội dung
      if (error.response?.data instanceof Blob) {
        const text = await error.response.data.text();
        console.error('Error response text:', text);
        try {
          const json = JSON.parse(text);
          console.error('Error response JSON:', json);
          showError(json.message || "Không thể xuất dữ liệu. Vui lòng thử lại.");
          return;
        } catch (e) {
          console.error('Cannot parse error as JSON');
        }
      }
      
      showError("Không thể xuất dữ liệu. Vui lòng thử lại.");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      const blob = await downloadTemplate();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Template_TaiChinhThu.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess("Đã tải template thành công!");
    } catch (error) {
      showError("Không thể tải template. Vui lòng thử lại.");
    }
  };

  const handleDownloadTemplateWithSample = async () => {
    try {
      const blob = await downloadTemplateWithSample();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'MauNhap_TaiChinhThu.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      showSuccess("Đã tải file mẫu thành công!");
    } catch (error) {
      showError("Không thể tải file mẫu. Vui lòng thử lại.");
    }
  };

  const handleImportExcel = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      toast("Đang xử lý file Excel...", { icon: "⏳" });
      const result = await importFromExcel(file);
      
      if (result.success) {
        queryClient.invalidateQueries({ queryKey: ["contribuitionUp"] });
        showSuccess(result.message || "Import thành công!");
      } else {
        // Hiển thị modal validation errors
        if (result.errors && result.errors.length > 0) {
          setValidationErrors(result.errors);
          setValidationWarnings(result.warnings || []);
          setValidationSummary({
            validCount: result.validCount || 0,
            totalCount: result.totalCount || 0
          });
          setIsValidationErrorModalOpen(true);
        } else {
          showError(result.message || "Import thất bại");
        }
      }
    } catch (error: any) {
      console.error("Import error:", error);
      
      // Kiểm tra nếu error response có validation errors
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
        setValidationWarnings(error.response.data.warnings || []);
        setValidationSummary({
          validCount: error.response.data.validCount || 0,
          totalCount: error.response.data.totalCount || 0
        });
        setIsValidationErrorModalOpen(true);
      } else if (error.response?.status === 500) {
        // Lỗi 500 - hiển thị modal với thông báo lỗi server
        setValidationErrors([{
          row: 0,
          field: "Server Error",
          message: error.response?.data?.message || "Lỗi server khi xử lý file Excel. Vui lòng kiểm tra định dạng file và thử lại.",
          value: "HTTP 500"
        }]);
        setValidationWarnings([]);
        setValidationSummary({ validCount: 0, totalCount: 1 });
        setIsValidationErrorModalOpen(true);
      } else {
        showError(error.response?.data?.message || "Có lỗi xảy ra khi import file Excel");
      }
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // Loading states
  if (usersQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách tài chính thu..." />;
  }

  if (usersQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách tài chính thu. Vui lòng thử lại sau."
        onRetry={() => usersQuery.refetch()}
      />
    );
  }

  if (isReady && !dongHoId) {
    return <NoFamilyTreeState />;
  }

  // Column configuration
  const columns: ColumnConfig<IContributionUp>[] = [
    {
      key: "hoTenNguoiDong",
      label: "Người đóng góp",
      clickable: false, // Bỏ clickable vì đã có nút Eye
    },
    {
      key: "soTien",
      label: "Số tiền",
      render: (value) => new Intl.NumberFormat('vi-VN', { 
        style: 'currency', 
        currency: 'VND' 
      }).format(value || 0),
      align: "right",
    },
    {
      key: "ngayDong",
      label: "Ngày đóng",
      render: (value) => value ? new Date(value).toLocaleDateString("vi-VN") : "-",
    },
    {
      key: "phuongThucThanhToan",
      label: "Phương thức",
      render: (value) => {
        const methods: Record<string, string> = {
          "tien_mat": "Tiền mặt",
          "chuyen_khoan": "Chuyển khoản",
          "khac": "Khác"
        };
        return methods[value] || value || "-";
      },
    },
    {
      key: "noiDung",
      label: "Nội dung",
      render: (value) => value || "-",
    },
  ];

  // Action configuration
  const customActions: ActionConfig<IContributionUp>[] = [
    {
      icon: Eye,
      label: "Xem chi tiết",
      onClick: handleViewDetail,
      color: "green",
    },
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

  // Page actions
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
      label: "Tải file mẫu",
      onClick: handleDownloadTemplateWithSample,
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
      variant: "primary" as const,
    },
    {
      icon: Plus,
      label: "Thêm Mới",
      onClick: handleAdd,
      variant: "primary" as const,
    },
  ];

  // Detail modal sections
  const getDetailSections = (contribution: IContributionUp): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: User,
          label: "Người đóng góp",
          value: contribution.hoTenNguoiDong,
        } as DetailField,
        {
          icon: DollarSign,
          label: "Số tiền",
          value: contribution.soTien,
          render: (value) => new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
          }).format(value || 0),
          colorClass: "text-green-600 font-bold",
        } as DetailField,
        {
          icon: Calendar,
          label: "Ngày đóng",
          value: contribution.ngayDong,
          render: (value) => value ? new Date(value).toLocaleDateString("vi-VN") : "-",
        } as DetailField,
      ],
    },
    {
      title: "Chi tiết thanh toán",
      fields: [
        {
          icon: CreditCard,
          label: "Phương thức thanh toán",
          value: contribution.phuongThucThanhToan,
          render: (value) => {
            const methods: Record<string, string> = {
              "tien_mat": "Tiền mặt",
              "chuyen_khoan": "Chuyển khoản", 
              "khac": "Khác"
            };
            return methods[value] || value || "-";
          },
        } as DetailField,
        {
          icon: FileText,
          label: "Nội dung",
          value: contribution.noiDung || "Không có",
        } as DetailField,
        {
          icon: Phone,
          label: "SĐT người nhập",
          value: contribution.soDienThoaiNguoiNhap || "Không có",
        } as DetailField,
        {
          icon: MessageSquare,
          label: "Ghi chú",
          value: contribution.ghiChu || "Không có",
        } as DetailField,
      ],
    },
  ];

  return (
    <PageLayout
      title="Quản Lý Tài Chính Thu"
      subtitle="Danh sách các khoản thu tài chính"
      icon={DollarSign}
      actions={pageActions}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx, .xls"
        onChange={handleImportExcel}
        className="hidden"
      />

      {/* Table */}
      <DataTable
        data={userData}
        columns={columns}
        keyField="thuId"
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
        onViewDetail={undefined} // Bỏ onViewDetail vì đã có nút Eye
        customActions={customActions}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo tên người đóng góp..."
        emptyMessage="Chưa có khoản thu nào được tạo"
      />

      {/* Form Modal */}
      <ContributionUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveUser}
        initialData={editingUser}
        isLoading={isSaving}
      />

      {/* Detail Modal */}
      {selectedContributionForDetail && (
        <DetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          title={selectedContributionForDetail.hoTenNguoiDong}
          subtitle={`Khoản thu ngày ${
            selectedContributionForDetail.ngayDong
              ? new Date(
                  selectedContributionForDetail.ngayDong
                ).toLocaleDateString("vi-VN")
              : "N/A"
          }`}
          badge={new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(selectedContributionForDetail.soTien || 0)}
          gradient="red-yellow"
          sections={getDetailSections(selectedContributionForDetail)}
          notes={selectedContributionForDetail.ghiChu}
        />
      )}

      {/* Delete Modal */}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        items={itemsToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemsToDelete([]);
        }}
        onConfirm={handleConfirmDelete}
        isLoading={isDeleting}
        itemDisplayField="hoTenNguoiDong"
        title={
          itemsToDelete.length === 1
            ? "Xác nhận xóa khoản thu"
            : `Xác nhận xóa ${itemsToDelete.length} khoản thu`
        }
        message={
          itemsToDelete.length === 1
            ? "Bạn có chắc chắn muốn xóa khoản thu này? Hành động này không thể hoàn tác."
            : `Bạn có chắc chắn muốn xóa ${itemsToDelete.length} khoản thu đã chọn? Hành động này không thể hoàn tác.`
        }
      />

      {/* Validation Error Modal */}
      <ValidationErrorModal
        isOpen={isValidationErrorModalOpen}
        onClose={() => setIsValidationErrorModalOpen(false)}
        title="Lỗi Import File Excel"
        errors={validationErrors}
        warnings={validationWarnings}
        validCount={validationSummary.validCount}
        totalCount={validationSummary.totalCount}
      />
    </PageLayout>
  );
}