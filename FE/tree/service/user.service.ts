import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { IUser, IUserResetPassword, IUserSearch } from "@/types/user";

const prefix = `${API_CORE}/users`;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
interface Props {
  tenDangNhap: string;
  matKhau: string;
}

export const loginService = async (data: Props): Promise<any> => {
  const res = await apiClient.post(`${prefix}/login`, data);

  return res.data;
};

export const autherization = async (token: string): Promise<any> => {
  try{
    const res = await apiClient.get(`${prefix}/authorize/${token}`);

    return res?.data;
  }catch(error : any){
    console.error("Authorize service error:", error);
    throw error;
  }
};

export const getUsers = async (
  data: IUserSearch,
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);
    return res?.data;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);
    return null;
  }
};

// // Hàm lấy toàn bộ dữ liệu để nạp context cho AI
// export const getAllUsersForAI = async (): Promise<IUser[]> => {
//     await delay(100);
//     return MOCK_USERS;
// };
// not finish
export const createUser = async (
  data: IUserSearch,
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/insert-user`, data);
    return res?.data;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);
    return null;
  }
};

export const updateUser = async (
  id: string,
  data: IUserSearch,
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update-user`, data);
    return res?.data;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);
    return null;
  }
};

export const deleteUser = async (
  data: string,
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/delete`, {data});
    return res?.data;
  } catch (err) {
    console.error("Lỗi khi lấy dữ liệu người dùng:", err);
    return null;
  }
};

export const sighInService = async (data: Props): Promise<any> => {
  const res = await apiClient.post(`${prefix}/signup`, data);

  return res.data;
};

export const resetPasswordUser = async(
  data: IUserResetPassword,
): Promise<any> => {
  const res = await apiClient?.post(`${prefix}/reset-password`, data);
  return res?.data;
}

export const checkUsernameExist = async (value: string): Promise<any> => {
  const res = await apiClient.post(`${prefix}/checkuser`, {
    userName: value,
  });
  console.log("API RAW RESULT:", res);
  return res.data;
};
