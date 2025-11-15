import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { IUser, IUserSearch } from "@/types/user";

const prefix = `${API_CORE}/users`;

interface Props {
    tenDangNhap: string;
    matKhau: string;
}

export const loginService = async (data: Props): Promise<any> => {
    const res = await apiClient.post(`${prefix}/login`, data);

    return res.data;
}

export const autherization = async() : Promise<any> => {
    const res =  await apiClient.get(`${prefix}/me`);

    return res?.data;
}