import axios from 'axios';
import { injectable } from 'tsyringe';

interface AIQueryRequest {
  question: string;
  dongHoId: string;
  execute: boolean;
}

// Response từ AI Service
interface AIServiceResponse {
  success: boolean;
  question: string;
  sql: string;
  confidence: string; // AI Service trả về string "95.5%"
  results?: any[];
  total_rows?: number;
  error?: string;
  message?: string;
}

// Response trả về cho Controller
interface AIQueryResponse {
  success: boolean;
  sql: string;
  confidence: number;
  data?: any[];
  columns?: string[];
  row_count?: number;
  error?: string;
}

@injectable()
export class AIQueryService {
  private aiServiceUrl: string;

  constructor() {
    this.aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:7000';
    console.log(`🤖 AI Service URL: ${this.aiServiceUrl}`);
  }

  /**
   * Hỏi câu hỏi bằng tiếng Việt và nhận kết quả
   */
  async askQuestion(question: string, dongHoId: string): Promise<AIQueryResponse> {
    try {
      console.log(`\n${'='.repeat(60)}`);
      console.log(`🤖 [AI Query] Question: ${question}`);
      console.log(`📁 [AI Query] DongHoId: ${dongHoId}`);
      console.log(`${'='.repeat(60)}`);

      const request: AIQueryRequest = {
        question,
        dongHoId,
        execute: true
      };

      const startTime = Date.now();
      const response = await axios.post<AIServiceResponse>(
        `${this.aiServiceUrl}/ask`,
        request,
        {
          timeout: 3000000, // 2 phút (thay vì 30 giây)
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const duration = Date.now() - startTime;

      const result = response.data;

      console.log(`\n✅ [AI Query] Response received in ${duration}ms`);
      console.log(`📝 [AI Query] Generated SQL:`);
      console.log(`   ${result.sql}`);
      console.log(`📊 [AI Query] Confidence: ${result.confidence}`);
      
      if (result.success && result.results) {
        console.log(`📦 [AI Query] Results: ${result.total_rows} rows`);
        console.log(`💾 [AI Query] Data:`);
        console.log(JSON.stringify(result.results, null, 2));
      } else if (result.error) {
        console.log(`❌ [AI Query] Error: ${result.error}`);
      }
      
      console.log(`${'='.repeat(60)}\n`);

      // Map response to match interface
      return {
        success: result.success,
        sql: result.sql,
        confidence: parseFloat(result.confidence) || 0,
        data: result.results, // Map 'results' to 'data'
        row_count: result.total_rows,
        error: result.error
      };

    } catch (error: any) {
      console.error(`\n❌ [AI Query] Error calling AI service:`);
      
      if (error.code === 'ECONNREFUSED') {
        console.error(`   AI Service is not running at ${this.aiServiceUrl}`);
        console.error(`   Please start AI service: cd ai-service && python main.py`);
        throw new Error('AI Service không khả dụng. Vui lòng khởi động AI Service.');
      } else if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Message: ${error.response.data?.detail || error.message}`);
        throw new Error(`AI Service error: ${error.response.data?.detail || error.message}`);
      } else {
        console.error(`   ${error.message}`);
        throw new Error(`Không thể kết nối AI Service: ${error.message}`);
      }
    }
  }

  /**
   * Test SQL generation (không execute)
   */
  async testQuestion(question: string, dongHoId: string): Promise<AIQueryResponse> {
    try {
      console.log(`\n🧪 [AI Test] Testing question: ${question}`);

      const response = await axios.post<AIQueryResponse>(
        `${this.aiServiceUrl}/test`,
        { question, dongHoId },
        { timeout: 3000000 }
      );

      const result = response.data;
      console.log(`✅ [AI Test] Generated SQL: ${result.sql}`);
      console.log(`📊 [AI Test] Confidence: ${(result.confidence * 100).toFixed(1)}%\n`);

      return result;

    } catch (error: any) {
      console.error(`❌ [AI Test] Error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Check AI service health
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.aiServiceUrl}/health`, {
        timeout: 5000
      });
      
      const health = response.data;
      console.log(`\n🏥 [AI Health Check]`);
      console.log(`   Status: ${health.status}`);
      console.log(`   Model Loaded: ${health.model_loaded ? '✅' : '❌'}`);
      console.log(`   DB Connected: ${health.db_connected ? '✅' : '❌'}\n`);

      return health.status === 'ok';
    } catch (error) {
      console.error(`❌ [AI Health Check] AI Service is not available`);
      return false;
    }
  }
}
