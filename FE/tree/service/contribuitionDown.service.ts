import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IContributionDown, IsearchContributionDown } from "@/types/contribuitionDown";

const prefix = `${API_CORE}/contributionDown`;


export const searchContributionDown = async (data: IsearchContributionDown): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const createContributionDown = async (
  data: IContributionDown
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/create`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateContributionDown = async (id: number, data: any): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteContributionDown = async (id: string): Promise<any> => {
  try {
    const res = await apiClient.delete(`${prefix}/${id}`);
    return res?.data;
  } catch (error: any) {
    throw error;
  }
};