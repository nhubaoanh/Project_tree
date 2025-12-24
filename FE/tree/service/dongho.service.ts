import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/lineage`;

export interface IDongHo {
    dongHoId: string;
    tenDongHo: string;
    queQuanGoc: string;
    ngayThanhLap: string | Date;
    nguoiQuanLy: string;
    ghiChu: string;
    active_flag: number;
    nguoiTaoId: string;
    ngayTao: string | Date;
}

export interface IDongHoCreate {
    tenDongHo: string;
    queQuanGoc?: string;
    ngayThanhLap?: string;
    nguoiQuanLy?: string;
    ghiChu?: string;
}

export interface IDongHoSearch {
    pageIndex: number;
    pageSize: number;
    search_content?: string;
}

// Lấy tất cả dòng họ
export const getAllDongHo = async (): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/getAll`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getAllDongHo] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
};

// Tìm kiếm dòng họ có phân trang
export const searchDongHo = async (data: IDongHoSearch): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/search`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[searchDongHo] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
};

// Lấy dòng họ theo ID
export const getDongHoById = async (id: string): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/${id}`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getDongHoById] ${err.message}`);
        return { success: false, data: null, message: err.message };
    }
};

// Tạo dòng họ mới
export const createDongHo = async (data: IDongHoCreate): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[createDongHo] ${err.message}`);
        throw new Error(err.message);
    }
};

// Cập nhật dòng họ
export const updateDongHo = async (id: string, data: Partial<IDongHoCreate>): Promise<any> => {
    try {
        const res = await apiClient.put(`${prefix}/${id}`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[updateDongHo] ${err.message}`);
        throw new Error(err.message);
    }
};

// Xóa dòng họ
export const deleteDongHo = async (id: string): Promise<any> => {
    try {
        const res = await apiClient.delete(`${prefix}/${id}`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[deleteDongHo] ${err.message}`);
        throw new Error(err.message);
    }
};

// Lấy dòng họ của user hiện tại
export const getMyDongHo = async (): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/my-families`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getMyDongHo] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
};
