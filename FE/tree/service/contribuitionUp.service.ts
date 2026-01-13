import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IContributionUp, IsearchContributionUp } from "@/types/contribuitionUp";

const prefix = `${API_CORE}/contributionUp`;


export const searchContributionUp = async (data: IsearchContributionUp): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const createContributionUp = async (data: IContributionUp): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/create`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateContributionUp = async (data: IContributionUp): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteContributionUp = async (listJson: { thuId: number }[], luUserId: string): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/delete`, {
      list_json: listJson,
      lu_user_id: luUserId,
    });
    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

// ============================================================================
// IMPORT/EXPORT FUNCTIONS
// ============================================================================

/**
 * Tải template Excel mẫu cho import THU
 */
export const downloadTemplate = async (): Promise<Blob> => {
  try {
    const res = await apiClient.get(`${prefix}/export-template`, {
      responseType: 'blob',
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Tải template Excel có dữ liệu mẫu cho import THU
 */
export const downloadTemplateWithSample = async (): Promise<Blob> => {
  try {
    const res = await apiClient.get(`${prefix}/export-template-with-sample`, {
      responseType: 'blob',
    });
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Import dữ liệu THU từ file Excel
 */
export const importFromExcel = async (file: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const res = await apiClient.post(`${prefix}/import-excel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Import dữ liệu THU từ JSON
 */
export const importFromJson = async (data: any[], dongHoId?: string): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/import-json`, {
      data,
      dongHoId,
    });

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};