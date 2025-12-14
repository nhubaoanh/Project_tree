import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { IUserResetPassword, IUserSearch } from "@/types/user";
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
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getUsers] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

export const createUser = async (data: IUserSearch): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/insert-user`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[createUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const updateUser = async (id: string, data: IUserSearch): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update-user`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateUser] ${err.message}`);
    throw new Error(err.message);
  }
};

export const deleteUser = async (data: string): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/delete`, { data });
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
