import { API_CORE } from "@/constant/config";
import { apiClient } from "@/lib/api";
import { IEvent, IsearchEvent } from "@/types/event";

const prefix = `${API_CORE}/event`;


export const searchEvent = async (data: IsearchEvent): Promise<any> => {
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

export const deleteEvent = async (listJson: { suKienId: string }[], luUserId: string): Promise<any> => {
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