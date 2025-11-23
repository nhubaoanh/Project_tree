import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { IUser, IUserResetPassword, IUserSearch } from "@/types/user";

const prefix = `${API_CORE}/users`;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
interface Props {
  tenDangNhap: string;
  matKhau: string;
}


let MOCK_USERS: IUser[] = Array.from({ length: 25 }).map((_, i) => {
  let parentId = null;
  let doiThu = 1;

  if (i > 0) {
    // Giả lập quan hệ đơn giản: Người sau là con người trước (chia nhóm)
    // i=1,2 là con i=0. i=3,4 là con i=1...
    const parentIndex = Math.floor((i - 1) / 2);
    parentId = `USER_${parentIndex + 1}`;
    doiThu = Math.floor(Math.log2(i + 1)) + 1;
  }

  return {
    nguoiDungId: `USER_${i + 1}`,
    dongHoId: "DH_01",
    tenDangNhap: `user${i + 1}`,
    hoTen:
      i === 0
        ? "Nguyễn Văn Tổ (Cụ Tổ)"
        : `Nguyễn Văn ${String.fromCharCode(65 + (i % 26))} (Đời ${doiThu})`,
    email: `user${i + 1}@example.com`,
    soDienThoai: `09${Math.floor(Math.random() * 100000000)}`,
    roleId:`ROLE_${Math.floor(Math.random() * 1000)}`,
    ngayTao: new Date(),
    parentId: parentId,
    doiThu: doiThu,
    matKhau: "password", // Add this line to include the missing property
    anhDaiDien: "image.jpg", // Add this line to include the missing property
    nguoiTaoId: "user001", // Add this line to include the missing property
  };
});
export const loginService = async (data: Props): Promise<any> => {
  const res = await apiClient.post(`${prefix}/login`, data);

  return res.data;
};

export const autherization = async (): Promise<any> => {
  const res = await apiClient.get(`${prefix}/me`);

  return res?.data;
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

// Hàm lấy toàn bộ dữ liệu để nạp context cho AI
export const getAllUsersForAI = async (): Promise<IUser[]> => {
    await delay(100);
    return MOCK_USERS;
};
// not finish
export const createUser = async (
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

export const updateUser = async (
  id: string,
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

export const deleteUser = async (
  data: string,
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);
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