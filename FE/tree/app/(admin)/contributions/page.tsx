"use client";
import React, { useRef } from "react";
import { DollarSign, Plus, Download, Upload, Trash2, Edit, User, Calendar, CreditCard, FileText, Phone, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { IContributionUp, IsearchContributionUp } from "@/types/contribuitionUp";
import { createContributionUp, deleteContributionUp, searchContributionUp, updateContributionUp, downloadTemplateWithSample, exportExcel, importFromExcel } from "@/service/contribuitionUp.service";
import { ContributionUpModal } from "./components/contribuitionUpModal";
import { useCrudPage } from "@/hooks";
import storage from "@/utils/storage";
import {
  PageLayout, 
  DataTable, 
  DeleteModal, 
  DetailModal,
  PageLoading, 
  ErrorState,
  NoFamilyTreeState,
  ColumnConfig,
  ActionConfig,
  DetailSection,
  DetailField
} from "@/components/shared";
import { ErrorModal } from "@/components/shared/ErrorModal";

export default function QuanLyTaiChinhThuPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Use generic CRUD hook
  const crud = useCrudPage<IContributionUp>({
    queryKey: ["contribuitionUp", dongHoId || ""],
    operations: {
      search: (params) => {
        const searchParams: IsearchContributionUp = {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize,
          search_content: params.search_content,
          dongHoId: dongHoId || "",
        };
        return searchContributionUp(searchParams);
      },
      create: (data) => createContributionUp(data as IContributionUp),
      update: (data) => updateContributionUp(data as IContributionUp),
      delete: (params) => {
        const listJson = params.items.map((item: IContributionUp) => ({ 
          thuId: item.thuId,
          dongHoId: item.dongHoId 
        }));
        return deleteContributionUp(listJson, params.userId || user?.nguoiDungId || "");
      },
      export: () => exportExcel(),
      import: (file) => importFromExcel(file)
    },
    searchParams: { dongHoId: dongHoId || "" },
    tableConfig: {
      initialPageSize: 5,
      enableSelection: true,
      enableSearch: true
    },
    enableImportExport: true,
    messages: {
      createSuccess: "Thêm dữ liệu đóng góp thành công!",
      updateSuccess: "Cập nhật dữ liệu thành công!",
      deleteSuccess: "Đã xóa thành công.",
      createError: "Có lỗi xảy ra khi thêm khoản thu.",
      updateError: "Có lỗi xảy ra khi cập nhật khoản thu.",
      deleteError: "Không thể xóa khoản thu này."
    }
  });

  // Custom handlers để giữ logic đặc biệt
  const handleDeleteClick = (item: IContributionUp) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(item.thuId)) {
      const selected = crud.data.filter((e: IContributionUp) => crud.selectedIds.includes(e.thuId));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([item]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = crud.data.filter((e: IContributionUp) => crud.selectedIds.includes(e.thuId));
    crud.handleDelete(selected);
  };

  // Download template handler
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
    } catch (error) {
      console.error("Download template error:", error);
    }
  };

  // File input handler - sử dụng crud.handleImport
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

    // Sử dụng crud.handleImport - sẽ tự động hiển thị DetailModal khi có lỗi
    if (crud.handleImport) {
      await crud.handleImport(file);
    }
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Memoize actions để tránh re-render không cần thiết
  const pageActions = React.useMemo(() => [
    // Bulk actions - hiển thị khi có selection
    ...(crud.hasSelection ? [
      {
        id: "bulk-delete",
        icon: Trash2,
        label: `Xóa đã chọn (${crud.selectedIds.length})`,
        onClick: handleDeleteSelected,
        variant: "danger" as const,
      }
    ] : []),
    {
      id: "download-template",
      icon: Download,
      label: "Tải file mẫu",
      onClick: handleDownloadTemplateWithSample,
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
      label: "Thêm mới",
      onClick: crud.handleAdd,
      variant: "primary" as const,
    },
  ], [crud.hasSelection, crud.selectedIds.length, handleDeleteSelected, crud.handleAdd, crud.handleExport, handleDownloadTemplateWithSample]);

  // Loading state
  if (crud.isLoading) {
    return <PageLoading message="Đang tải danh sách tài chính thu..." />;
  }

  // Error state
  if (crud.error) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách tài chính thu. Vui lòng thử lại sau."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // No family tree state
  if (!dongHoId) {
    return <NoFamilyTreeState />;
  }

  // Column configuration
  const columns: ColumnConfig<IContributionUp>[] = [
    {
      key: "hoTenNguoiDong",
      label: "Người đóng góp",
      clickable: true,
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
      title="QUẢN LÝ TÀI CHÍNH THU"
      subtitle="Danh sách các khoản thu tài chính"
      icon={DollarSign}
      actions={pageActions}
    >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Data Table */}
        <DataTable
          data={crud.data}
          columns={columns}
          keyField="thuId"
          pageIndex={crud.pageIndex}
          pageSize={crud.pageSize}
          totalRecords={crud.totalRecords}
          totalPages={crud.totalPages}
          onPageChange={crud.handlePageChange}
          onPageSizeChange={crud.handlePageSizeChange}
          isLoading={crud.isLoading}
          enableSelection={true}
          selectedIds={crud.selectedIds as number[]}
          onSelectAll={crud.handleSelectAll}
          onSelectOne={crud.handleSelectOne}
          customActions={customActions}
          onViewDetail={crud.handleViewDetail}
          searchValue={crud.searchTerm}
          onSearchChange={crud.handleSearch}
          searchPlaceholder="Tìm kiếm theo tên người đóng góp..."
          emptyMessage="Chưa có khoản thu nào được tạo"
        />

        {/* Modals */}
        {crud.isFormOpen && (
          <ContributionUpModal
            isOpen={crud.isFormOpen}
            onClose={crud.handleCloseForm}
            onSubmit={crud.handleSave}
            initialData={crud.editingItem}
            isLoading={crud.isSaving}
          />
        )}

        {crud.isDetailOpen && crud.selectedItemForDetail && (
          <DetailModal
            isOpen={crud.isDetailOpen}
            onClose={crud.handleCloseDetail}
            title={crud.selectedItemForDetail.hoTenNguoiDong}
            subtitle={`Khoản thu ngày ${
              crud.selectedItemForDetail.ngayDong
                ? new Date(crud.selectedItemForDetail.ngayDong).toLocaleDateString("vi-VN")
                : "N/A"
            }`}
            badge={new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(crud.selectedItemForDetail.soTien || 0)}
            gradient="red-yellow"
            sections={getDetailSections(crud.selectedItemForDetail)}
            notes={crud.selectedItemForDetail.ghiChu}
          />
        )}

        {/* Error Modal - hiển thị lỗi import */}
        <ErrorModal
          isOpen={crud.isErrorModalOpen}
          onClose={crud.handleCloseErrorModal}
          title={crud.errorModalTitle}
          errors={crud.errorModalErrors}
          warnings={crud.errorModalWarnings}
          validCount={crud.errorModalValidCount}
          totalCount={crud.errorModalTotalCount}
        />

        {crud.isDeleteOpen && (
          <DeleteModal
            isOpen={crud.isDeleteOpen}
            onClose={crud.handleCloseDelete}
            onConfirm={crud.handleConfirmDelete}
            isLoading={crud.isDeleting}
            title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa khoản thu" : `Xác nhận xóa ${crud.itemsToDelete.length} khoản thu`}
            message={crud.itemsToDelete.length === 1 ? 
              "Bạn có chắc chắn muốn xóa khoản thu này? Hành động này không thể hoàn tác." :
              `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} khoản thu đã chọn? Hành động này không thể hoàn tác.`
            }
            items={crud.itemsToDelete}
          />
        )}
      </PageLayout>
    );
  }