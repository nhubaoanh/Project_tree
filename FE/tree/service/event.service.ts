import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEvent, IsearchEvent } from "@/types/event";
import { IMember, IMemberSearch } from "@/types/member";

const prefix = `${API_CORE}/event`;


export const searchEvent = async (data: IsearchEvent): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};