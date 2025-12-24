import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/thongke`;

// Interfaces
export interface IThongKeTongQuan {
  tongThanhVien: number;
  soNam: number;
  soNu: number;
  daMat: number;
  conSong: number;
  soDoi: number;
  soChi: number;
}

export interface IThongKeTheoDoi {
  doi: number;
  soThanhVien: number;
  soNam: number;
  soNu: number;
  daMat: number;
}

export interface IThongKeTheoChi {
  chiGocId: number;
  tenChi: string;
  soThanhVien: number;
  soDoi: number;
}

export interface IDashboardStats {
  tongDongHo: number;
  tongThanhVien: number;
  tongNam: number;
  tongNu: number;
  doiCaoNhat: number;
  conSong: number;
  daMat: number;
}

export interface IThanhVienMoiNhat {
  thanhVienId: number;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: string;
  doiThuoc: number;
  ngayTao: string;
  tenDongHo: string;
}

// API Functions
export const getDashboardStats = async (dongHoId?: string): Promise<any> => {
  try {
    const url = dongHoId ? `${prefix}/dashboard?dongHoId=${dongHoId}` : `${prefix}/dashboard`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getDashboardStats] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

export const getThanhVienMoiNhat = async (dongHoId?: string, limit: number = 10): Promise<any> => {
  try {
    let url = `${prefix}/moinhat?limit=${limit}`;
    if (dongHoId) url += `&dongHoId=${dongHoId}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThanhVienMoiNhat] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

export const getThongKeTongQuan = async (dongHoId: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/tongquan/${dongHoId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThongKeTongQuan] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

export const getThongKeTheoDoi = async (dongHoId: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/theodoi/${dongHoId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThongKeTheoDoi] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

export const getThongKeTheoChi = async (dongHoId: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/theochi/${dongHoId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThongKeTheoChi] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

export const getFullStats = async (dongHoId: string): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/full/${dongHoId}`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getFullStats] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

// ========== TÀI CHÍNH ==========

export interface IThongKeThuChi {
  tongThu: number;
  tongChi: number;
  soLanThu: number;
  soLanChi: number;
}

export interface IThongKeThuChiTheoThang {
  thang: number;
  tongThu: number;
  tongChi: number;
}

export interface IThuGanDay {
  thuId: number;
  hoTenNguoiDong: string;
  ngayDong: string;
  soTien: number;
  noiDung: string;
  phuongThucThanhToan: string;
  tenDongHo: string;
}

export interface IChiGanDay {
  chiId: number;
  nguoiNhan: string;
  ngayChi: string;
  soTien: number;
  noiDung: string;
  phuongThucThanhToan: string;
  tenDongHo: string;
}

export const getThongKeThuChi = async (dongHoId: string, nam?: number): Promise<any> => {
  try {
    let url = `${prefix}/thuChi/${dongHoId}`;
    if (nam) url += `?nam=${nam}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThongKeThuChi] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

export const getThongKeThuChiTheoThang = async (dongHoId: string, nam?: number): Promise<any> => {
  try {
    let url = `${prefix}/thuChiTheoThang/${dongHoId}`;
    if (nam) url += `?nam=${nam}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThongKeThuChiTheoThang] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

export const getThuGanDay = async (dongHoId?: string, limit: number = 5): Promise<any> => {
  try {
    let url = `${prefix}/thuGanDay?limit=${limit}`;
    if (dongHoId) url += `&dongHoId=${dongHoId}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThuGanDay] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

export const getChiGanDay = async (dongHoId?: string, limit: number = 5): Promise<any> => {
  try {
    let url = `${prefix}/chiGanDay?limit=${limit}`;
    if (dongHoId) url += `&dongHoId=${dongHoId}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getChiGanDay] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};

// ========== SỰ KIỆN ==========

export interface IThongKeSuKien {
  tongSuKien: number;
  daQua: number;
  sapToi: number;
  suKienGio: number;
  suKienCuoi: number;
  suKienTang: number;
  suKienKhac: number;
}

export interface ISuKienSapToi {
  suKienId: number;
  tenSuKien: string;
  ngayDienRa: string;
  gioDienRa: string;
  diaDiem: string;
  moTa: string;
  loaiSuKien: string;
  uuTien: number;
  tenDongHo: string;
}

export const getThongKeSuKien = async (dongHoId: string, nam?: number): Promise<any> => {
  try {
    let url = `${prefix}/suKien/${dongHoId}`;
    if (nam) url += `?nam=${nam}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getThongKeSuKien] ${err.message}`);
    return { success: false, data: null, message: err.message };
  }
};

export const getSuKienSapToi = async (dongHoId?: string, limit: number = 5): Promise<any> => {
  try {
    let url = `${prefix}/suKienSapToi?limit=${limit}`;
    if (dongHoId) url += `&dongHoId=${dongHoId}`;
    const res = await apiClient.get(url);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getSuKienSapToi] ${err.message}`);
    return { success: false, data: [], message: err.message };
  }
};
