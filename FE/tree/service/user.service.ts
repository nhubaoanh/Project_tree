import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { IUser, IUserProfile, IUserResetPassword, IUserSearch, IUserss } from "@/types/user";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/users`;

interface LoginProps {
  tenDangNhap: string;
  matKhau: string;
}

export const loginService = async (data: LoginProps): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/login`, data);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[loginService] ${err.message}`);
    throw new Error(err.message);
  }
};

export const autherization = async (token: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/authorize/${token}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[autherization] ${err.message}`);
    throw new Error(err.message);
  }
};

export const getUsers = async (data: IUserSearch): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);
    // Nếu không có kết quả, trả về mảng rỗng thay vì throw error
    if (res?.data?.success === false || !res?.data?.data) {
      return { success: true, data: [], totalItems: 0, pageCount: 0 };
    }
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    // Không log error cho trường hợp không có kết quả tìm kiếm (đây là bình thường)
    const isEmptyResult = err.message?.includes("Không tồn tại kết quả") || 
                          err.message?.includes("không tìm thấy");
    if (!isEmptyResult) {
      console.error(`[getUsers] ${err.message}`);
    }
    return { success: true, data: [], totalItems: 0, pageCount: 0 };
  }
};

export const createUser = async (data: Partial<IUser>): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/insert-user`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[createUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const updateUser = async (data: Partial<IUser>): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update-user`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const UpdateMyProfile = async (data: IUserProfile): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update-user-profile`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const deleteUser = async (userIds: string[], updatedById?: string): Promise<any> => {
  try {
    // Backend expects: { list_json: [{nguoiDungId: "..."}], updated_by_id: "..." }
    const list_json = userIds.map(id => ({ nguoiDungId: id }));
    const res = await apiClient.post(`${prefix}/delete`, { 
      list_json, 
      updated_by_id: updatedById || "system" 
    });
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[deleteUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const sighInService = async (data: LoginProps): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/signup`, data);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[sighInService] ${err.message}`);
    throw new Error(err.message);
  }
};

export const resetPasswordUser = async (data: IUserResetPassword): Promise<any> => {
  try {
    const res = await apiClient?.post(`${prefix}/reset-password`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[resetPasswordUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const checkUsernameExist = async (value: string): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/checkuser`, { userName: value });
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[checkUsernameExist] ${err.message}`);
    return { success: false, exists: false, message: err.message };
  }
};



const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock Data with Relationship Structure (Tree)
// Đời 1: Cụ Tổ (User 1)
// Đời 2: User 2, 3 (Con User 1)
// Đời 3: User 4, 5 (Con User 2) ...
let MOCK_USERS: IUserss[] = Array.from({ length: 25 }).map((_, i) => {
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
    roleId: i % 3,
    ngayTao: new Date().toISOString(),
    parentId: parentId,
    doiThu: doiThu,
  };
});
//mẫu 
// Hàm lấy toàn bộ dữ liệu để nạp context cho AI
export const getAllUsersForAI = async (): Promise<IUserss[]> => {
  await delay(100);
  return MOCK_USERS;
};
