import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IMember, IMemberSearch } from "@/types/member";

const prefix = `${API_CORE}/member`;

export const getMembers = async (): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/getAllMember`);

        return res?.data;
    } catch (error: any) {
        throw error;
    }
}

export const searchMember = async (data: IMemberSearch): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/search`, data);

        return res?.data;
    } catch (error: any) {
        throw error;
    }
}

export const dowExcelTemple = async (): Promise<Blob> => {
    try {
        const res = await apiClient.get(`${prefix}/export-template`, {
            responseType: 'blob'
        });
        console.log(res)
        return res?.data;
    } catch (error: any) {
        console.error('Lỗi khi tải file mẫu:', error);
        throw error;
    }
}

export const importExcel = async(file: File): Promise<any>=> {
    try{
        const formData = new FormData();
        formData.append('file', file);
        const res = await apiClient.post(`${prefix}/import-excel`, formData);
        return res?.data;
    }catch(err: any){
        throw err;
    }
}