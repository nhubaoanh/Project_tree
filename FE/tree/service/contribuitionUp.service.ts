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

export const updateContributionUp = async (id: number, data: any): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteContributionUp = async (id: IContributionUp): Promise<any> => {
  try {
    const res = await apiClient.delete(`${prefix}/${id}`);
    return res?.data;
  } catch (error: any) {
    throw error;
  }
};