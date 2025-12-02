import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ILineage, ILineageSearch } from "@/types/lineage";

const prefix = `${API_CORE}/lineage`;

export const searchLineage = async(
    data: ILineageSearch
) : Promise<any> => {
    try {
        const res = await apiClient.post(`${prefix}/search`, data);
        return res?.data;
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
        return null;
    }
}

export const getAllDongHo = async() :Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/getAll`);
        return res?.data;
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", err);
        return null;
    }
}