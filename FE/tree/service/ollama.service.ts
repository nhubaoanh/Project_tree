/**
 * Ollama Service - Frontend
 * Kết nối với DeepSeek-Coder local AI
 */

import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/ollama`;

/**
 * Chat với DeepSeek-Coder về gia phả
 */
export const chatWithOllama = async (
  message: string,
  dongHoId: string
): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/chat`, {
      message,
      dongHoId,
    });
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[chatWithOllama] ${err.message}`);
    throw new Error(err.message);
  }
};

/**
 * Kiểm tra Ollama có đang chạy không
 */
export const checkOllamaHealth = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/health`);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[checkOllamaHealth] ${err.message}`);
    return {
      success: false,
      message: err.message,
    };
  }
};

/**
 * Lấy danh sách models
 */
export const getOllamaModels = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/models`);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getOllamaModels] ${err.message}`);
    return {
      success: false,
      data: [],
    };
  }
};
