import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ILineageSearch } from "@/types/lineage";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/lineage`;

export const searchLineage = async(data: ILineageSearch): Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/search`, data);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[searchLineage] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
}

export const getAllDongHo = async(): Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/getAll`);
        return res?.data;
    } catch (error: any) {
        const err = parseApiError(error);
        console.error(`[getAllDongHo] ${err.message}`);
        return { success: false, data: [], message: err.message };
    }
}