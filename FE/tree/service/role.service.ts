import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";

const prefix = `${API_CORE}/role`;


export const getAllRole = async() :Promise<any> => {
    try {
        const res = await apiClient.get(`${prefix}/getAllRole`);
        return res?.data;
    } catch (err) {
        console.error("Lỗi khi lấy dữ liệu quyen:", err);
        return null;
    }
}