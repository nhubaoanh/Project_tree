"use client";
import React, { useState, useRef, useEffect } from "react";
import { TrendingDown, Plus, Download, Upload, Trash2, Eye, Edit } from "lucide-react";
import * as XLSX from "xlsx";
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ContributionUpModal } from "./components/contribuitionDownModal";
import { createContributionDown, deleteContributionDown, searchContributionDown, updateContributionDown } from "@/service/contribuitionDown.service";
import { IContributionDown, IsearchContributionDown } from "@/types/contribuitionDown";
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
  ColumnConfig,
  ActionConfig,
  DetailSection,
  DetailField
} from "@/components/shared";
import { User, Calendar, CreditCard, FileText, MessageSquare, DollarSign } from "lucide-react";

export default function QuanLyTaiChinhChiPage() {
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
  const [editingUser, setEditingUser] = useState<IContributionDown | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemsToDelete, setItemsToDelete] = useState<IContributionDown[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContributionForDetail, setSelectedContributionForDetail] = useState<IContributionDown | null>(null);

  const { showSuccess, showError } = useToast();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPageIndex(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const searchParams: IsearchContributionDown = {
    pageIndex,
    pageSize,
    search_content: debouncedSearch,
    dongHoId: dongHoId || undefined,
  };

  const usersQuery = useQuery({
    queryKey: ["contribuitionDown", searchParams],
    queryFn: () => searchContributionDown(searchParams),
    placeholderData: keepPreviousData,
    enabled: isReady && !!dongHoId,
  });

  const userData = usersQuery.data?.data || [];
  const totalRecords = usersQuery.data?.totalItems || 0;
  const totalPages = usersQuery.data?.pageCount || 0;
  const isLoading = usersQuery.isLoading;

  const createMutation = useMutation({
    mutationFn: createContributionDown,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionDown"] });
      showSuccess("Thêm khoản chi thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi thêm.");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (vars: { id: number; data: Partial<IContributionDown> }) =>
      updateContributionDown(vars.id, vars.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionDown"] });
      showSuccess("Cập nhật thông tin thành công!");
      setIsModalOpen(false);
    },
    onError: () => {
      showError("Có lỗi xảy ra khi cập nhật.");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (listJson: { chiId: number }[]) => deleteContributionDown(listJson, user?.nguoiDungId || ""),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contribuitionDown"] });
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
      setSelectedIds(userData.map((e: IContributionDown) => e.chiId));
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

  const handleEdit = (item: IContributionDown) => {
    setEditingUser(item);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (item: IContributionDown) => {
    if (selectedIds.length > 1 && selectedIds.includes(item.chiId)) {
      const selected = userData.filter((e: IContributionDown) => selectedIds.includes(e.chiId));
      setItemsToDelete(selected);
    } else {
      setItemsToDelete([item]);
    }
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSelected = () => {
    const selected = userData.filter((e: IContributionDown) => selectedIds.includes(e.chiId));
    setItemsToDelete(selected);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    const listJson = itemsToDelete.map((item) => ({ chiId: item.chiId }));
    deleteMutation.mutate(listJson);
  };

  const handleSaveUser = (data: Partial<IContributionDown>) => {
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.chiId, data });
    } else {
      createMutation.mutate(data as IContributionDown);
    }
  };

  const handleViewDetail = (item: IContributionDown) => {
    setSelectedContributionForDetail(item);
    setIsDetailModalOpen(true);
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPageIndex(1);
  };

  const handleExportExcel = () => {
    if (userData.length === 0) {
      toast("Không có dữ liệu để xuất");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "TaiChinhChi");
    XLSX.writeFile(workbook, `TaiChinhChi_Trang${pageIndex}.xlsx`);
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isDeleting = deleteMutation.isPending;

  // Loading states
  if (usersQuery.isLoading) {
    return <PageLoading message="Đang tải danh sách tài chính chi..." />;
  }

  if (usersQuery.isError) {
    return (
      <ErrorState
        title="Lỗi tải dữ liệu"
        message="Không thể tải danh sách tài chính chi. Vui lòng thử lại sau."
        onRetry={() => usersQuery.refetch()}
      />
    );
  }

  if (isReady && !dongHoId) {
    return <NoFamilyTreeState />;
  }

  // Column configuration
  const columns: ColumnConfig<IContributionDown>[] = [
    {
      key: "nguoiNhan",
      label: "Người nhận",
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
      key: "noiDung",
      label: "Nội dung",
      render: (value) => value || "-",
    },
  ];

  // Action configuration
  const customActions: ActionConfig<IContributionDown>[] = [
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
      label: "Xuất Excel",
      onClick: handleExportExcel,
      variant: "secondary" as const,
    },
    {
      icon: Plus,
      label: "Thêm Mới",
      onClick: handleAdd,
      variant: "primary" as const,
    },
  ];

  // Detail modal sections
  const getDetailSections = (contribution: IContributionDown): DetailSection[] => [
    {
      title: "Thông tin cơ bản",
      fields: [
        {
          icon: User,
          label: "Người nhận",
          value: contribution.nguoiNhan,
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
          icon: FileText,
          label: "Nội dung",
          value: contribution.noiDung || "Không có",
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
      title="Quản Lý Tài Chính Chi"
      subtitle="Danh sách các khoản chi tài chính"
      icon={TrendingDown}
      actions={pageActions}
    >
      {/* Table */}
      <DataTable
        data={userData}
        columns={columns}
        keyField="chiId"
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
        onViewDetail={handleViewDetail}
        customActions={customActions}
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm kiếm theo người nhận..."
        emptyMessage="Chưa có khoản chi nào được tạo"
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
          title={selectedContributionForDetail.nguoiNhan}
          subtitle={`Khoản chi ngày ${selectedContributionForDetail.ngayChi ? new Date(selectedContributionForDetail.ngayChi).toLocaleDateString("vi-VN") : "N/A"}`}
          badge={new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
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
        itemDisplayField="nguoiNhan"
        title={itemsToDelete.length === 1 ? "Xác nhận xóa khoản chi" : `Xác nhận xóa ${itemsToDelete.length} khoản chi`}
        message={itemsToDelete.length === 1 ? 
          "Bạn có chắc chắn muốn xóa khoản chi này? Hành động này không thể hoàn tác." :
          `Bạn có chắc chắn muốn xóa ${itemsToDelete.length} khoản chi đã chọn? Hành động này không thể hoàn tác.`
        }
      />
    </PageLayout>
  );
}