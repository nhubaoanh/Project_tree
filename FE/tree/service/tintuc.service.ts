import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/tintuc`;

export interface ITinTuc {
  tinTucId?: string;
  dongHoId: string;
  tieuDe: string;
  noiDung?: string;
  tomTat?: string;
  anhDaiDien?: string;
  tacGia?: string;
  ngayDang?: string;
  luotXem?: number;
  ghim?: number;
  tenDongHo?: string;
}

export interface ISearchTinTuc {
  pageIndex: number;
  pageSize: number;
  search_content?: string;
  dongHoId: string;
}

export const searchTinTuc = async (data: ISearchTinTuc): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[searchTinTuc] ${err.message}`);
    return { success: false, data: [], message: err.message, totalItems: 0, pageCount: 0 };
  }
};

export const getTinTucById = async (id: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/${id}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getTinTucById] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

export const createTinTuc = async (data: ITinTuc): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[createTinTuc] ${err.message}`);
    throw new Error(err.message);
  }
};

export const updateTinTuc = async (id: string, data: ITinTuc): Promise<any> => {
  try {
    const res = await apiClient.put(`${prefix}/${id}`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[updateTinTuc] ${err.message}`);
    throw new Error(err.message);
  }
};

export const deleteTinTuc = async (listJson: { tinTucId: string }[], luUserId: string): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/delete`, {
      list_json: listJson,
      lu_user_id: luUserId,
    });
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[deleteTinTuc] ${err.message}`);
    throw new Error(err.message);
  }
};
