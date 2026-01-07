"use client";
import React, { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, Plus, Upload, X, Loader2, ArrowLeft, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { IMember, IMemberSearch } from "@/types/member";
import { useToast } from "@/service/useToas";
import { MemberTable } from "./components/MemberTable";
import { MemberModal } from "./components/MemberModal";
import { MemberDetailModal } from "./components/MemberDetailModal";
import { ExcelTemplateButton } from "./components/ExcelTemplateButton";
import { searchMemberByDongHo, importMembersJson, IMemberImport, createMemberWithDongHo, updateMember, deleteMember, exportMembersExcel } from "@/service/member.service";
import { getDongHoById, IDongHo } from "@/service/dongho.service";
import storage from "@/utils/storage";

export default function MembersByDongHoPage() {
    const params = useParams();
    const router = useRouter();
    const dongHoId = params.dongHoId as string;
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Kiểm tra quyền truy cập
    const [hasAccess, setHasAccess] = useState(true);
    const user = storage.getUser();
    const isAdmin = user?.roleCode === "sa";

    useEffect(() => {
        // Nếu không phải Admin và dongHoId không khớp với dòng họ của user
        if (user && user.roleCode !== "sa" && user.dongHoId && user.dongHoId !== dongHoId) {
            setHasAccess(false);
            router.push("/dashboard");
        }
    }, [dongHoId, user, router]);

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState<IMember | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<IMember | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [detailMember, setDetailMember] = useState<IMember | null>(null);

    const { showSuccess, showError } = useToast();

    // Debounce search
    React.useEffect(() => {
        const timer = setTimeout(() => { setDebouncedSearch(searchTerm); setPageIndex(1); }, 500);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Fetch thông tin dòng họ
    const dongHoQuery = useQuery({
        queryKey: ["dongho", dongHoId],
        queryFn: () => getDongHoById(dongHoId),
        enabled: !!dongHoId,
    });
    const dongHoInfo: IDongHo | null = dongHoQuery.data?.data || null;

    console.log("dong: ", dongHoInfo);

    // Fetch members theo dongHoId
    const searchParams: IMemberSearch = { pageIndex, pageSize, search_content: debouncedSearch, dongHoId };
    const memberQuery = useQuery({
        queryKey: ["member", dongHoId, searchParams],
        queryFn: () => searchMemberByDongHo(searchParams),
        placeholderData: keepPreviousData,
        enabled: !!dongHoId,
    });

    const memberData = memberQuery.data?.data || [];

    console.log("member", memberQuery);
    const totalRecords = memberQuery.data?.totalItems || 0;
    const totalPages = memberQuery.data?.pageCount || 0;
    const isLoading = memberQuery.isLoading;

    // Mutations
    const createMutation = useMutation({
        mutationFn: (data: Partial<IMember>) => createMemberWithDongHo(data, dongHoId),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["member", dongHoId] }); showSuccess("Thêm thành viên thành công!"); setIsModalOpen(false); },
        onError: (error: any) => { showError(error.message || "Có lỗi xảy ra khi thêm thành viên."); },
    });

    const updateMutation = useMutation({
        mutationFn: (vars: { id: number; data: Partial<IMember> }) => updateMember(vars.id, vars.data),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["member", dongHoId] }); showSuccess("Cập nhật thành công!"); setIsModalOpen(false); },
        onError: (error: any) => { showError(error.message || "Có lỗi xảy ra khi cập nhật."); },
    });

    const deleteMutation = useMutation({
        mutationFn: (thanhVienId: number) => deleteMember([{ thanhVienId }], dongHoId),
        onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["member", dongHoId] }); showSuccess("Đã xóa thành viên."); setIsDeleteModalOpen(false); setMemberToDelete(null); },
        onError: (error: any) => { showError(error.message || "Không thể xóa thành viên này."); },
    });

    // Handlers
    const handleAdd = () => { setEditingMember(null); setIsModalOpen(true); };
    const handleEdit = (member: IMember) => { setEditingMember(member); setIsModalOpen(true); };
    const handleDeleteClick = (member: IMember) => { setMemberToDelete(member); setIsDeleteModalOpen(true); };
    const handleConfirmDelete = () => { if (memberToDelete) deleteMutation.mutate(memberToDelete.thanhVienId); };
    const handleSaveMember = (member: Partial<IMember>) => {
        if (editingMember) updateMutation.mutate({ id: editingMember.thanhVienId, data: member });
        else createMutation.mutate(member);
    };
    const handleBack = () => router.push("/family-trees");
    const handleViewDetail = (member: IMember) => { setDetailMember(member); setIsDetailModalOpen(true); };

    // Nếu không có quyền truy cập
    if (!hasAccess) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" /></div>;
    }

    // Export Excel
    const handleExportExcel = async () => {
        try {
            await exportMembersExcel(dongHoId);
            showSuccess("Xuất Excel thành công!");
        } catch (error: any) {
            showError(error.message || "Có lỗi khi xuất Excel");
        }
    };

    // Import Excel với dongHoId từ URL
    const handleImportExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            if (!file.name.match(/\.(xlsx|xls)$/)) { showError("Vui lòng chọn file Excel"); return; }
            const members = await parseExcelToJson(file);
            if (members.length === 0) { showError("File Excel không có dữ liệu"); return; }
            // Import với dongHoId từ URL params
            await importMembersJson(members, dongHoId);
            showSuccess(`Nhập thành công ${members.length} thành viên!`);
            queryClient.invalidateQueries({ queryKey: ["member", dongHoId] });
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error: any) {
            showError(error?.message || "Có lỗi xảy ra khi nhập dữ liệu");
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
                        .filter((row: any) => { const stt = row["STT"]; if (stt === undefined || stt === null) return false; if (typeof stt === "string" && isNaN(Number(stt))) return false; return true; })
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
                } catch (err) { reject(err); }
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
    const parseGioiTinh = (v: any): number => { if (typeof v === "number") return v === 1 ? 1 : 0; const str = String(v || "").toLowerCase().trim(); return (str === "nam" || str === "1") ? 1 : 0; };
    const parseExcelDate = (excelDate: any): string | null => {
        if (!excelDate && excelDate !== 0) return null;
        if (typeof excelDate === "number") { if (excelDate >= 1800 && excelDate <= 2100) return `${excelDate}-01-01`; const date = new Date((excelDate - 25569) * 86400 * 1000); return date.toISOString().split("T")[0]; }
        const str = String(excelDate).trim(); if (!str) return null;
        if (/^\d{4}$/.test(str)) return `${str}-01-01`;
        const monthYearMatch = str.match(/^(\d{1,2})\/(\d{4})$/); if (monthYearMatch) return `${monthYearMatch[2]}-${monthYearMatch[1].padStart(2, "0")}-01`;
        const dmyMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/); if (dmyMatch) return `${dmyMatch[3]}-${dmyMatch[2].padStart(2, "0")}-${dmyMatch[1].padStart(2, "0")}`;
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
        return str;
    };

    if (memberQuery.isLoading || dongHoQuery.isLoading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" /></div>;
    }

    return (
        <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
                <div>
                    {/* Chỉ Admin mới thấy nút quay lại */}
                    {isAdmin && (
                        <button onClick={handleBack} className="flex items-center gap-1 text-[#8b5e3c] hover:text-[#b91c1c] mb-2 transition-colors">
                            <ArrowLeft size={16} /><span className="text-sm">Quay lại danh sách</span>
                        </button>
                    )}
                    <h2 className="text-3xl font-display font-bold text-[#b91c1c] uppercase drop-shadow-sm">
                        {dongHoInfo?.tenDongHo || "Quản Lý Thành Viên"}
                    </h2>
                    <p className="text-[#8b5e3c] italic text-sm">{dongHoInfo?.queQuanGoc && `Quê quán: ${dongHoInfo.queQuanGoc}`}</p>
                </div>
                <div className="flex gap-2 flex-wrap justify-end">
                    <ExcelTemplateButton />
                    <button onClick={handleExportExcel} className="flex items-center gap-2 px-4 py-2 bg-[#38a169] text-white rounded shadow hover:bg-[#2f855a] text-sm font-bold">
                        <Download size={16} /><span className="hidden sm:inline">Xuất Excel</span>
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 bg-[#2c5282] text-white rounded shadow hover:bg-[#2a4365] text-sm font-bold">
                        <Upload size={16} /><span className="hidden sm:inline">Nhập Excel</span>
                        <input ref={fileInputRef} type="file" accept=".xlsx, .xls" onChange={handleImportExcel} className="hidden" />
                    </button>
                    <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] text-sm font-bold">
                        <Plus size={16} /><span className="hidden sm:inline">Thêm Mới</span>
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6 flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm w-full md:w-1/2">
                <div className="p-2 text-stone-400">{isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}</div>
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm theo họ tên..." className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400" />
                {searchTerm && <button onClick={() => setSearchTerm("")} className="p-2 text-stone-400 hover:text-[#b91c1c]"><X size={16} /></button>}
            </div>

            {/* Table */}
            <MemberTable data={memberData} isLoading={isLoading} pageIndex={pageIndex} pageSize={pageSize} totalRecords={totalRecords} totalPages={totalPages} onPageChange={setPageIndex} onPageSizeChange={(size) => { setPageSize(size); setPageIndex(1); }} onEdit={handleEdit} onDelete={handleDeleteClick} onViewDetail={handleViewDetail} />

            {/* Modal - truyền dongHoId */}
            <MemberModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveMember} member={editingMember} isLoading={createMutation.isPending || updateMutation.isPending} dongHoId={dongHoId} />

            {/* Detail Modal */}
            <MemberDetailModal isOpen={isDetailModalOpen} onClose={() => { setIsDetailModalOpen(false); setDetailMember(null); }} member={detailMember} />

            {/* Delete Modal */}
            {isDeleteModalOpen && memberToDelete && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-6 max-w-md w-full">
                        <h3 className="text-lg font-bold text-[#5d4037] mb-4">Xác nhận xóa</h3>
                        <p className="text-gray-600 mb-6">Bạn có chắc chắn muốn xóa thành viên <strong>{memberToDelete.hoTen}</strong>?</p>
                        <div className="flex justify-end gap-2">
                            <button onClick={() => { setIsDeleteModalOpen(false); setMemberToDelete(null); }} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">Hủy</button>
                            <button onClick={handleConfirmDelete} disabled={deleteMutation.isPending} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50">{deleteMutation.isPending ? "Đang xóa..." : "Xóa"}</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
