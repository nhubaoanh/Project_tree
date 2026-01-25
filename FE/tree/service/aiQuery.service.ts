import { API_CORE } from "../constant/config";
import { apiClient } from "@/lib/api";
import { parseApiError } from "@/lib/apiError";

const prefix = `${API_CORE}/ai`;

// ==================== TYPES ====================
export interface AIQueryRequest {
  question: string;
  dongHoId: string;
}

export interface AIQueryResponse {
  success: boolean;
  question?: string;
  sql?: string;
  confidence?: string;
  results?: any[];
  total_rows?: number;
  message?: string;
  error?: string;
}

export interface QuestionLog {
  timestamp: string;
  question: string;
}

export interface QueryResultLog {
  timestamp: string;
  question: string;
  sql: string;
  confidence: string;
  success: boolean;
  results?: any[];
  error?: string;
}

export interface DatasetExportResponse {
  success: boolean;
  dataset_path?: string;
  total_samples?: number;
  message?: string;
}

// ==================== API FUNCTIONS ====================

/**
 * Gửi câu hỏi tự nhiên và nhận SQL + kết quả
 * Ví dụ: "Có bao nhiêu người trong gia phả?"
 */
export const askQuestion = async (
  question: string,
  dongHoId: string
): Promise<AIQueryResponse> => {
  try {
    const res = await apiClient.post(`${prefix}/ask`, {
      question,
      dongHoId,
    });
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[askQuestion] ${err.message}`);
    return {
      success: false,
      message: err.message,
      error: err.message,
    };
  }
};

/**
 * Lấy danh sách câu hỏi đã thu thập
 * Dùng để xem user đã hỏi những gì
 */
export const getCollectedQuestions = async (): Promise<{
  success: boolean;
  questions?: QuestionLog[];
  total?: number;
  message?: string;
}> => {
  try {
    const res = await apiClient.get(`${prefix}/logs/questions`);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getCollectedQuestions] ${err.message}`);
    return {
      success: false,
      message: err.message,
    };
  }
};

/**
 * Lấy danh sách kết quả queries đã thực thi
 * Dùng để xem SQL nào đã chạy, kết quả ra sao
 */
export const getQueryResults = async (): Promise<{
  success: boolean;
  results?: QueryResultLog[];
  total?: number;
  message?: string;
}> => {
  try {
    const res = await apiClient.get(`${prefix}/logs/results`);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[getQueryResults] ${err.message}`);
    return {
      success: false,
      message: err.message,
    };
  }
};

/**
 * Export dataset để fine-tune model
 * Sau khi thu thập đủ câu hỏi (100-500), gọi API này
 */
export const exportDataset = async (): Promise<DatasetExportResponse> => {
  try {
    const res = await apiClient.post(`${prefix}/dataset/export`);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[exportDataset] ${err.message}`);
    return {
      success: false,
      message: err.message,
    };
  }
};

/**
 * Kiểm tra health của AI Service
 */
export const checkAIHealth = async (): Promise<{
  success: boolean;
  status?: string;
  message?: string;
}> => {
  try {
    const res = await apiClient.get(`${prefix}/health`);
    return res.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[checkAIHealth] ${err.message}`);
    return {
      success: false,
      message: err.message,
    };
  }
};
