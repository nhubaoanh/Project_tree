"use client";
import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Upload, X, Loader2, Download, GitBranch, Filter } from "lucide-react";
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

export default function MembersPage() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Lấy dongHoId từ storage
    const user = storage.getUser();
    const dongHoId = user?.dongHoId;

    // Redirect nếu không có dongHoId
    useEffect(() => {
        if (!dongHoId) {
            console.warn("⚠️ [Members] No dongHoId found, redirecting to dashboard");
            router.push("/dashboard");
        }
    }, [dongHoId, router]);

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [selectedGeneration, setSelectedGeneration] = useState<number | null>(null);
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
        queryFn: () => getDongHoById(dongHoId!),
        enabled: !!dongHoId,
    });
    const dongHoInfo: IDongHo | null = dongHoQuery.data?.data || null;

    // Fetch TẤT CẢ members theo dongHoId (KHÔNG search) - dùng cho relationships
    const allMembersParams: IMemberSearch = { 
        pageIndex: 1, 
        pageSize: 0, // 0 = lấy tất cả
        search_content: "", // KHÔNG search
        dongHoId: dongHoId! 
    };
    const allMembersQuery = useQuery({
        queryKey: ["allMembers", dongHoId],
        queryFn: () => searchMemberByDongHo(allMembersParams),
        enabled: !!dongHoId,
    });

    // Fetch members có search - dùng cho hiển thị
    const searchParams: IMemberSearch = { 
        pageIndex: 1, 
        pageSize: 0,
        search_content: debouncedSearch,
        dongHoId: dongHoId! 
    };
    const searchMembersQuery = useQuery({
        queryKey: ["searchMembers", dongHoId, debouncedSearch],
        queryFn: () => searchMemberByDongHo(searchParams),
        enabled: !!dongHoId,
    });

    // TẤT CẢ members (không search) - dùng cho tìm relationships
    const rawAllMembers = (allMembersQuery.data?.data || []) as IMember[];
    const allMembers: IMember[] = Array.from(
        new Map(rawAllMembers.map((m: IMember) => [m.thanhVienId, m])).values()
    );

    // Members sau khi search - dùng cho hiển thị table
    const rawSearchMembers = (searchMembersQuery.data?.data || []) as IMember[];
    const searchedMembers: IMember[] = Array.from(
        new Map(rawSearchMembers.map((m: IMember) => [m.thanhVienId, m])).values()
    );

    // Filter theo đời (client-side) trên kết quả search
    const filteredMembers = selectedGeneration 
        ? searchedMembers.filter((m: IMember) => m.doiThuoc === selectedGeneration)
        : searchedMembers;

    // Lấy danh sách các đời từ TẤT CẢ members (không phải search results)
    const generations = Array.from(
        new Set(allMembers.map((m: IMember) => m.doiThuoc).filter(Boolean))
    ).sort((a, b) => (a as number) - (b as number)) as number[];

    // Phân trang ở client-side sau khi filter
    const totalRecords = filteredMembers.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIndex = (pageIndex - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const memberData = filteredMembers.slice(startIndex, endIndex);
    
    const isLoading = allMembersQuery.isLoading || searchMembersQuery.isLoading;

    // Mutations
    const createMutation = useMutation({
        mutationFn: (data: Partial<IMember>) => createMemberWithDongHo(data, dongHoId!),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
            queryClient.invalidateQueries({ queryKey: ["searchMembers", dongHoId] });
            showSuccess("Thêm thành viên thành công!"); 
            setIsModalOpen(false);
            setEditingMember(null); // Reset editing state
        },
        onError: (error: any) => { showError(error.message || "Có lỗi xảy ra khi thêm thành viên."); },
    });

    const updateMutation = useMutation({
        mutationFn: (vars: { id: number; data: Partial<IMember> }) => updateMember(vars.id, vars.data),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
            queryClient.invalidateQueries({ queryKey: ["searchMembers", dongHoId] });
            showSuccess("Cập nhật thành công!"); 
            setIsModalOpen(false);
            setEditingMember(null); // Reset editing state
        },
        onError: (error: any) => { showError(error.message || "Có lỗi xảy ra khi cập nhật."); },
    });

    const deleteMutation = useMutation({
        mutationFn: (thanhVienId: number) => deleteMember([{ thanhVienId }], dongHoId!),
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
            queryClient.invalidateQueries({ queryKey: ["searchMembers", dongHoId] });
            showSuccess("Đã xóa thành viên."); 
            setIsDeleteModalOpen(false); 
            setMemberToDelete(null); 
        },
        onError: (error: any) => { showError(error.message || "Không thể xóa thành viên này."); },
    });

    // Handlers
    const handleEdit = (member: IMember) => { setEditingMember(member); setIsModalOpen(true); };
    const handleDeleteClick = (member: IMember) => { setMemberToDelete(member); setIsDeleteModalOpen(true); };
    const handleConfirmDelete = () => { if (memberToDelete) deleteMutation.mutate(memberToDelete.thanhVienId); };
    const handleSaveMember = (member: Partial<IMember>) => {
        if (editingMember) updateMutation.mutate({ id: editingMember.thanhVienId, data: member });
        else createMutation.mutate(member);
    };
    const handleViewDetail = (member: IMember) => { setDetailMember(member); setIsDetailModalOpen(true); };

    // Loading hoặc không có dongHoId
    if (!dongHoId) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" /></div>;
    }

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

    // Import Excel
    const handleImportExcel = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!dongHoId) return;
        const file = event.target.files?.[0];
        if (!file) return;
        try {
            if (!file.name.match(/\.(xlsx|xls)$/)) { showError("Vui lòng chọn file Excel"); return; }
            const members = await parseExcelToJson(file);
            if (members.length === 0) { showError("File Excel không có dữ liệu"); return; }
            await importMembersJson(members, dongHoId);
            showSuccess(`Nhập thành công ${members.length} thành viên!`);
            queryClient.invalidateQueries({ queryKey: ["allMembers", dongHoId] });
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

    if (allMembersQuery.isLoading || searchMembersQuery.isLoading || dongHoQuery.isLoading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-12 w-12 text-[#d4af37]" /></div>;
    }

    return (
        <div className="max-w-6xl mx-auto font-dancing text-[#4a4a4a] pb-20 animate-fadeIn">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4 border-b border-[#d4af37] pb-4">
                <div>
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
                    <button
                        onClick={() => {
                            setEditingMember(null);
                            setIsModalOpen(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#b91c1c] text-white rounded shadow hover:bg-[#991b1b] text-sm font-bold"
                    >
                        <Upload size={16} /><span className="hidden sm:inline">Thêm thành viên</span>
                    </button>
                </div>
            </div>

            {/* Search và Filter */}
            <div className="mb-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    {/* Search box */}
                    <div className="flex items-center bg-white border border-[#d4af37] rounded-lg p-1 shadow-sm flex-1 max-w-[650px]">
                        <div className="p-2 text-stone-400">{isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}</div>
                        <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Tìm kiếm theo họ tên..." className="w-full p-2 outline-none bg-transparent text-[#5d4037] placeholder-stone-400" />
                        {searchTerm && <button onClick={() => setSearchTerm("")} className="p-2 text-stone-400 hover:text-[#b91c1c]"><X size={16} /></button>}
                    </div>

                    {/* Filter theo đời */}
                    <div className="flex items-center gap-2">
                        <Filter size={16} className="text-[#8b5e3c]" />
                        <select
                            value={selectedGeneration === null ? "" : selectedGeneration}
                            onChange={(e) => {
                                setSelectedGeneration(e.target.value === "" ? null : Number(e.target.value));
                                setPageIndex(1); // Reset về trang 1 khi đổi filter
                            }}
                            className="px-4 py-2 border border-[#d4af37] rounded-lg text-[#5d4037] bg-white hover:bg-[#fdf6e3] focus:outline-none focus:ring-2 focus:ring-[#d4af37] transition-colors text-sm font-medium min-w-[150px]"
                        >
                            <option value="">Tất cả các đời</option>
                            {generations.map(gen => (
                                <option key={gen} value={gen}>
                                    Đời {gen}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Nút Xem cây gia phả */}
                    <button
                        onClick={() => window.open(`/genealogy?dongHoId=${dongHoId}`, '_blank')}
                        className="flex items-center gap-2 px-4 py-2 bg-[#d4af37] text-white rounded shadow hover:bg-[#b8962a] transition-all text-sm font-bold whitespace-nowrap"
                    >
                        <GitBranch size={16} />
                        <span>Xem cây gia phả</span>
                    </button>
                </div>
            </div>

            {/* Table */}
            <MemberTable 
                data={memberData} 
                isLoading={isLoading} 
                pageIndex={pageIndex} 
                pageSize={pageSize} 
                totalRecords={totalRecords} 
                totalPages={totalPages} 
                onPageChange={setPageIndex} 
                onPageSizeChange={(size: number) => { setPageSize(size); setPageIndex(1); }} 
                onEdit={handleEdit} 
                onDelete={handleDeleteClick} 
                onViewDetail={handleViewDetail} 
            />

            {/* Modal */}
            <MemberModal 
                isOpen={isModalOpen} 
                onClose={() => { setIsModalOpen(false); setEditingMember(null); }} 
                onSave={handleSaveMember} 
                member={editingMember} 
                isLoading={createMutation.isPending || updateMutation.isPending} 
                dongHoId={dongHoId!}
                allMembers={allMembers}
            />

            {/* Detail Modal - Truyền allMembers để có thể navigate */}
            <MemberDetailModal 
                isOpen={isDetailModalOpen} 
                onClose={() => { setIsDetailModalOpen(false); setDetailMember(null); }} 
                member={detailMember}
                allMembers={allMembers}
                onNavigate={(member: IMember) => setDetailMember(member)}
            />

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
