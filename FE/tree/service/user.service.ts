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
    console.log("loginService response:", res);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    // console.error(`[loginService] ${err.message}`);
    console.log("loginService error response:", error.response);
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
    // Không log error cho trường hợp không có kết quả tìm kiếm hoặc 403
    const isEmptyResult = err.message?.includes("Không tồn tại kết quả") || 
                          err.message?.includes("không tìm thấy");
    const is403 = error?.response?.status === 403;
    if (!isEmptyResult && !is403) {
      console.error(`[getUsers] ${err.message}`);
    }
    return { success: true, data: [], totalItems: 0, pageCount: 0, is403 };
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

export const UpdateMyProfile = async (data: Partial<IUserProfile>): Promise<any> => {
  try {
    // Loại bỏ các trường có giá trị null, undefined hoặc empty string
    const cleanData = Object.fromEntries(
      Object.entries(data).filter(([key, value]) => {
        // Đặc biệt xử lý mật khẩu: chỉ gửi nếu có giá trị thực sự
        if (key === 'matKhau') {
          return value && typeof value === 'string' && value.trim() !== '';
        }
        // Các trường khác: loại bỏ null, undefined, empty string
        return value !== null && value !== undefined && value !== '';
      })
    );    
    const res = await apiClient.post(`${prefix}/update-user-profile`, cleanData);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[UpdateMyProfile] ${err.message}`);
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

