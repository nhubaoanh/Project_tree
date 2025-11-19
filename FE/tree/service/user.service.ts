import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { IUser, IUserSearch } from "@/types/user";

const prefix = `${API_CORE}/users`;
type ToastCallback = () => void;

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

export const getUsers = async (
  data: IUserSearch,
  onFetchError?: ToastCallback
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);
    return res?.data;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);

    // 3. Kiểm tra và gọi hàm callback nếu nó được truyền vào
    if (onFetchError) {
      onFetchError();
    }

    // Luôn trả về giá trị an toàn (null) để component không bị crash
    return null;
  }
};

export const sighInService = async (data: Props) : Promise<any> => {
    const res = await apiClient.post(`${prefix}/signup`, data);

    return res.data;
}