import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/tailieu`;

export interface ITaiLieu {
  taiLieuId?: string;
  dongHoId: string;
  tenTaiLieu: string;
  duongDan?: string;
  moTa?: string;
  loaiTaiLieu?: string;
  namSangTac?: number;
  tacGia?: string;
  nguonGoc?: string;
  ghiChu?: string;
  ngayTaiLen?: string;
  tenDongHo?: string;
}

export interface ISearchTaiLieu {
  pageIndex: number;
  pageSize: number;
  search_content?: string;
  dongHoId: string;
  loaiTaiLieu?: string;
}

export const LOAI_TAI_LIEU = [
  "Gia phả",
  "Sắc phong",
  "Hình ảnh",
  "Văn bản cổ",
  "Tài liệu khác",
];

export const searchTaiLieu = async (data: ISearchTaiLieu): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[searchTaiLieu] ${err.message}`);
    return { success: false, data: [], message: err.message, totalItems: 0, pageCount: 0 };
  }
};

export const getTaiLieuById = async (id: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/${id}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getTaiLieuById] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

export const createTaiLieu = async (data: ITaiLieu): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[createTaiLieu] ${err.message}`);
    throw new Error(err.message);
  }
};

export const updateTaiLieu = async (id: string, data: ITaiLieu): Promise<any> => {
  try {
    const res = await apiClient.put(`${prefix}/${id}`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateTaiLieu] ${err.message}`);
    throw new Error(err.message);
  }
};

export const deleteTaiLieu = async (listJson: { taiLieuId: string }[], luUserId: string): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/delete`, {
      list_json: listJson,
      lu_user_id: luUserId,
    });
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[deleteTaiLieu] ${err.message}`);
    throw new Error(err.message);
  }
};
