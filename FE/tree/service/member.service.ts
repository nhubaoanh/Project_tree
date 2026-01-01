import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IMemberSearch } from "@/types/member";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/member`;

export const getMembers = async (): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/getAllMember`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getMembers] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
}

// Lấy tất cả thành viên theo dongHoId (không phân trang - dùng cho render cây)
export const getMembersByDongHo = async (dongHoId: string): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/dongho/${dongHoId}/all`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getMembersByDongHo] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
}

export const getMemberById = async (dongHoId: string, id: number): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/${id}?dongHoId=${dongHoId}`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getMemberById] ${err.message}`);
        return { success: false, data: null, message: err.message };
    }
}

export const createMember = async (data: any): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[createMember] ${err.message}`);
        throw new Error(err.message);
    }
}

export const updateMember = async (id: number, data: any): Promise<any> => {
    try {
        const res = await apiClient.put(`${prefix}/${id}`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[updateMember] ${err.message}`);
        throw new Error(err.message);
    }
}

export const deleteMember = async (id: number, dongHoId?: string): Promise<any> => {
    try {
        const res = await apiClient.delete(`${prefix}/${id}`, {
            data: { dongHoId }
        });
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[deleteMember] ${err.message}`);
        throw new Error(err.message);
    }
}

export const searchMember = async (data: IMemberSearch): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/search`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[searchMember] ${err.message}`);
        return { success: false, data: [], message: err.message, totalItems: 0, pageCount: 0 };
    }
}

// Search member theo dongHoId cụ thể
export const searchMemberByDongHo = async (data: IMemberSearch): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/search-by-dongho`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[searchMemberByDongHo] ${err.message}`);
        return { success: false, data: [], message: err.message, totalItems: 0, pageCount: 0 };
    }
}

// Tạo member với dongHoId
export const createMemberWithDongHo = async (data: any, dongHoId: string): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}`, { ...data, dongHoId });
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[createMemberWithDongHo] ${err.message}`);
        throw new Error(err.message);
    }
}

export const dowExcelTemple = async (): Promise<Blob | null> => {
    try {
        const res = await apiClient.get(`${prefix}/export-template`, {
            responseType: 'blob'
        });
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[dowExcelTemple] ${err.message}`);
        return null;
    }
}

// Export danh sách thành viên ra Excel (cùng format với template import)
export const exportMembersExcel = async (dongHoId: string): Promise<void> => {
    try {
        const res = await apiClient.get(`${prefix}/export/${dongHoId}`, {
            responseType: 'blob'
        });
        
        // Tạo link download
        const blob = new Blob([res.data], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `DanhSach_ThanhVien_${dongHoId}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[exportMembersExcel] ${err.message}`);
        throw new Error(err.message);
    }
}

export const importExcel = async(file: File): Promise<any> => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await apiClient.post(`${prefix}/import-excel`, formData);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[importExcel] ${err.message}`);
        // Throw với message đẹp để UI hiển thị
        throw new Error(err.message);
    }
}

// Import từ JSON (giải pháp mới - xử lý quan hệ cha/mẹ/vợ/chồng trong 1 transaction)
export const importMembersJson = async (
    members: IMemberImport[], 
    dongHoId?: string
): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/import-json`, { 
            members,
            dongHoId
        });
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[importMembersJson] ${err.message}`);
        // Throw với message đẹp để UI hiển thị
        throw new Error(err.message);
    }
}

// Interface cho import
export interface IMemberImport {
    stt: number | null;
    hoTen: string;
    gioiTinh: number;
    ngaySinh: string | null;
    ngayMat: string | null;
    noiSinh: string;
    noiMat: string;
    ngheNghiep: string;
    trinhDoHocVan: string;
    diaChiHienTai: string;
    tieuSu: string;
    doiThuoc: number;
    chaId: number | null;
    meId: number | null;
    voId: number | null;
    chongId: number | null;
}