import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEvent, IsearchEvent } from "@/types/event";
import { IMember, IMemberSearch } from "@/types/member";

const prefix = `${API_CORE}/contributionUp`;


export const searchContributionUp = async (data: IsearchEvent): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const createEvent = async (data: IEvent): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/create`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateEvent = async (data: IEvent): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/update`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};

export const deleteEvent = async (id: string): Promise<any> => {
  try {
    const res = await apiClient.delete(`${prefix}/${id}`);
    return res?.data;
  } catch (error: any) {
    throw error;
  }
};