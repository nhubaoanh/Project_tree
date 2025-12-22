import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { ITypeEvent, IsearchTypeEvent } from "@/types/typeEvent";
import { IMember, IMemberSearch } from "@/types/member";

const prefix = `${API_CORE}/typeevent`;


export const searchTypeEvent = async (data: IsearchTypeEvent): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/search`, data);

    return res?.data;
  } catch (error: any) {
    throw error;
  }
};