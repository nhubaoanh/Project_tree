"use client";
import React, { useRef } from "react";
import { DollarSign, Plus, Download, Upload, Trash2, Edit, User, Calendar, CreditCard, FileText, Phone, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";
import { IContributionDown, IsearchContributionDown } from "@/types/contribuitionDown";
import { createContributionDown, deleteContributionDown, searchContributionDown, updateContributionDown, downloadTemplateWithSample, exportExcel, importFromExcel } from "@/service/contribuitionDown.service";
import {  ContributionDownModal } from "./components/contribuitionDownModal";
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

export default function QuanLyTaiChinhChiPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get user info
  const user = storage.getUser();
  const dongHoId = user?.dongHoId;

  // Use generic CRUD hook
  const crud = useCrudPage<IContributionDown>({
    queryKey: ["contribuitionDown", dongHoId || ""],
    operations: {
      search: (params) => {
        const searchParams: IsearchContributionDown = {
          pageIndex: params.pageIndex,
          pageSize: params.pageSize,
          search_content: params.search_content,
          dongHoId: dongHoId || "",
        };
        return searchContributionDown(searchParams);
      },
      create: (data) => createContributionDown(data as IContributionDown),
      update: (data) => updateContributionDown((data as IContributionDown).chiId, data),
      delete: (params) => {
        const listJson = params.items.map((item: IContributionDown) => ({ 
          chiId: item.chiId,
          dongHoId: item.dongHoId 
        }));
        return deleteContributionDown(listJson, params.userId || user?.nguoiDungId || "");
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
      createSuccess: "Thêm khoản chi thành công!",
      updateSuccess: "Cập nhật khoản chi thành công!",
      deleteSuccess: "Đã xóa khoản chi thành công.",
      createError: "Có lỗi xảy ra khi thêm khoản chi.",
      updateError: "Có lỗi xảy ra khi cập nhật khoản chi.",
      deleteError: "Không thể xóa khoản chi này."
    }
  });

  // Custom handlers
  const handleDeleteClick = (item: IContributionDown) => {
    if (crud.selectedIds.length > 1 && crud.selectedIds.includes(item.chiId)) {
      const selected = crud.data.filter((e: IContributionDown) => crud.selectedIds.includes(e.chiId));
      crud.handleDelete(selected);
    } else {
      crud.handleDelete([item]);
    }
  };

  const handleDeleteSelected = () => {
    const selected = crud.data.filter((e: IContributionDown) => crud.selectedIds.includes(e.chiId));
    crud.handleDelete(selected);
  };

  // Download template handler
  const handleDownloadTemplateWithSample = async () => {
    try {
      const blob = await downloadTemplateWithSample();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'MauNhap_TaiChinhChi.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download template error:", error);
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

    // Sử dụng crud.handleImport - sẽ tự động hiển thị DetailModal khi có lỗi
    if (crud.handleImport) {
      await crud.handleImport(file);
    }
    
    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Page actions
  const pageActions = React.useMemo(() => [
    // Bulk actions
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
    return <PageLoading message="Đang tải danh sách tài chính chi..." />;
  }

  // Error state
  if (crud.error) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách tài chính chi. Vui lòng thử lại sau."
        onRetry={() => window.location.reload()}
      />
    );
  }

  // No family tree state
  if (!dongHoId) {
    return <NoFamilyTreeState />;
  }

  // Column configuration
  const columns: ColumnConfig<IContributionDown>[] = [
    {
      key: "noiDung",
      label: "Nội dung chi",
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
      key: "ngayChi",
      label: "Ngày chi",
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
      key: "nguoiNhan",
      label: "Người nhận",
      render: (value) => value || "-",
    },
  ];

  // Action configuration
  const customActions: ActionConfig<IContributionDown>[] = [
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
  const getDetailSections = (contribution: IContributionDown): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: FileText,
          label: "Nội dung chi",
          value: contribution.noiDung,
        } as DetailField,
        {
          icon: DollarSign,
          label: "Số tiền",
          value: contribution.soTien,
          render: (value) => new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
          }).format(value || 0),
          colorClass: "text-red-600 font-bold",
        } as DetailField,
        {
          icon: Calendar,
          label: "Ngày chi",
          value: contribution.ngayChi,
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
          icon: User,
          label: "Người nhận",
          value: contribution.nguoiNhan || "Không có",
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
      title="QUẢN LÝ TÀI CHÍNH CHI"
      subtitle="Danh sách các khoản chi tài chính"
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
        keyField="chiId"
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
        searchPlaceholder="Tìm kiếm theo nội dung chi, người nhận..."
        emptyMessage="Chưa có khoản chi nào được tạo"
      />

      {/* Modals */}
      {crud.isFormOpen && (
        <ContributionDownModal
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
          title={crud.selectedItemForDetail.noiDung}
          subtitle={`Khoản chi ngày ${
            crud.selectedItemForDetail.ngayChi
              ? new Date(crud.selectedItemForDetail.ngayChi).toLocaleDateString("vi-VN")
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
          title={crud.itemsToDelete.length === 1 ? "Xác nhận xóa khoản chi" : `Xác nhận xóa ${crud.itemsToDelete.length} khoản chi`}
          message={crud.itemsToDelete.length === 1 ? 
            "Bạn có chắc chắn muốn xóa khoản chi này? Hành động này không thể hoàn tác." :
            `Bạn có chắc chắn muốn xóa ${crud.itemsToDelete.length} khoản chi đã chọn? Hành động này không thể hoàn tác.`
          }
          items={crud.itemsToDelete}
        />
      )}
    </PageLayout>
  );
}