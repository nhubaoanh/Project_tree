/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║                         TEXT-TO-SQL SERVICE (FRONTEND)                        ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Service gọi API Text-to-SQL từ Frontend                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

import {apiClient} from "@/lib/api";

export interface Text2SQLQueryRequest {
  question: string;
  dongHoId: string;
}

export interface Text2SQLQueryResponse {
  success: boolean;
  message: string;
  data: {
    question: string;
    sql: string;
    result: {
      type: "count" | "list" | "empty";
      count?: number;
      value?: number;
      data?: any[];
      message: string;
    };
    timestamp: string;
  };
}

export interface Text2SQLExample {
  question: string;
  sql: string;
}

export interface Text2SQLExamplesResponse {
  success: boolean;
  message: string;
  data: {
    total: number;
    examples: string[];
    fullExamples: Text2SQLExample[];
  };
}

export interface Text2SQLHealthResponse {
  success: boolean;
  message: string;
  data: {
    status: string;
    geminiApiKey: string;
    examplesLoaded: number;
    timestamp: string;
  };
}

/**
 * Gửi câu hỏi và nhận kết quả SQL
 */
export const queryText2SQL = async (
  question: string,
  dongHoId: string
): Promise<Text2SQLQueryResponse> => {
  const response = await apiClient.post<Text2SQLQueryResponse>("/api-core/text2sql/query", {
    question,
    dongHoId,
  });
  return response.data;
};

/**
 * Lấy danh sách câu hỏi mẫu
 */
export const getExamples = async (): Promise<Text2SQLExamplesResponse> => {
  const response = await apiClient.get<Text2SQLExamplesResponse>("/api-core/text2sql/examples");
  return response.data;
};

/**
 * Reload examples từ dataset
 */
export const reloadExamples = async (): Promise<any> => {
  const response = await apiClient.post("/api-core/text2sql/reload-examples");
  return response.data;
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<Text2SQLHealthResponse> => {
  const response = await apiClient.get<Text2SQLHealthResponse>("/api-core/text2sql/health");
  return response.data;
};
