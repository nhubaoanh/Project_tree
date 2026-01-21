import { apiClient } from "@/lib/api";

export interface AIQueryRequest {
  question: string;
  dongHoId: string;
}

export interface AIQueryResponse {
  success: boolean;
  message: string;
  data: {
    question: string;
    sql: string;
    confidence: number;
    results: any[];
    columns: string[];
    row_count: number;
    error?: string;
  };
}

export interface AIHealthResponse {
  success: boolean;
  healthy: boolean;
  message: string;
}

/**
 * Hỏi câu hỏi bằng tiếng Việt và nhận kết quả
 */
export const askAIQuestion = async (
  question: string,
  dongHoId: string
): Promise<AIQueryResponse> => {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🤖 [Frontend] Asking AI: ${question}`);
  console.log(`📁 [Frontend] DongHoId: ${dongHoId}`);
  console.log(`${'='.repeat(60)}`);

  const startTime = Date.now();
  
  const response = await apiClient.post<AIQueryResponse>("/ai/ask", {
    question,
    dongHoId,
  });

  const duration = Date.now() - startTime;

  console.log(`\n✅ [Frontend] Response received in ${duration}ms`);
  console.log(`📝 [Frontend] SQL: ${response.data.data.sql}`);
  console.log(`📊 [Frontend] Confidence: ${(response.data.data.confidence * 100).toFixed(1)}%`);
  console.log(`📦 [Frontend] Results: ${response.data.data.row_count} rows`);
  console.log(`💾 [Frontend] Data:`, response.data.data.results);
  console.log(`${'='.repeat(60)}\n`);

  return response.data;
};

/**
 * Test SQL generation (không execute)
 */
export const testAIQuestion = async (
  question: string,
  dongHoId: string
): Promise<any> => {
  console.log(`🧪 [Frontend] Testing: ${question}`);
  
  const response = await apiClient.post("/ai/test", {
    question,
    dongHoId,
  });

  console.log(`✅ [Frontend] Generated SQL: ${response.data.data.sql}`);
  console.log(`📊 [Frontend] Confidence: ${(response.data.data.confidence * 100).toFixed(1)}%\n`);

  return response.data;
};

/**
 * Check AI service health
 */
export const checkAIHealth = async (): Promise<AIHealthResponse> => {
  const response = await apiClient.get<AIHealthResponse>("/ai/health");
  
  console.log(`\n🏥 [Frontend] AI Health Check`);
  console.log(`   Status: ${response.data.healthy ? '✅ Healthy' : '❌ Unhealthy'}`);
  console.log(`   Message: ${response.data.message}\n`);

  return response.data;
};
