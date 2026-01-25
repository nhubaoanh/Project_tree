import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { AIQueryService } from '../services/aiQueryService';

@injectable()
export class AIQueryController {
  constructor(private aiQueryService: AIQueryService) {}

  /**
   * POST /api-core/ai/ask
   * Hỏi câu hỏi bằng tiếng Việt
   */
  async askQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { question, dongHoId } = req.body;

      // Validation
      if (!question || !dongHoId) {
        res.status(400).json({
          success: false,
          message: 'Thiếu question hoặc dongHoId'
        });
        return;
      }

      console.log(`\n🎯 [Controller] Received AI query request`);
      console.log(`   Question: ${question}`);
      console.log(`   DongHoId: ${dongHoId}`);
      console.log(`   User: ${(req as any).user?.userId || 'unknown'}`);

      // Call AI service
      const result = await this.aiQueryService.askQuestion(question, dongHoId);

      // Return response - Format giống AI Service
      if (result.success) {
        res.status(200).json({
          success: true,
          question,
          sql: result.sql,
          confidence: result.confidence,
          results: result.data,
          total_rows: result.row_count,
          message: `Tìm thấy ${result.row_count || 0} kết quả`
        });
      } else {
        res.status(200).json({
          success: false,
          question,
          sql: result.sql,
          error: result.error,
          message: result.error || 'Truy vấn thất bại'
        });
      }

    } catch (error: any) {
      console.error(`❌ [Controller] Error:`, error.message);
      res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi xử lý câu hỏi'
      });
    }
  }

  /**
   * POST /api-core/ai/test
   * Test SQL generation (không execute)
   */
  async testQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { question, dongHoId } = req.body;

      if (!question || !dongHoId) {
        res.status(400).json({
          success: false,
          message: 'Thiếu question hoặc dongHoId'
        });
        return;
      }

      const result = await this.aiQueryService.testQuestion(question, dongHoId);

      res.status(200).json({
        success: true,
        data: {
          question,
          sql: result.sql,
          confidence: result.confidence
        }
      });

    } catch (error: any) {
      console.error(`❌ [Controller] Test error:`, error.message);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * GET /api-core/ai/health
   * Check AI service health
   */
  async checkHealth(req: Request, res: Response): Promise<void> {
    try {
      const isHealthy = await this.aiQueryService.checkHealth();

      res.status(200).json({
        success: true,
        healthy: isHealthy,
        message: isHealthy ? 'AI Service đang hoạt động' : 'AI Service không khả dụng'
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        healthy: false,
        message: 'Không thể kiểm tra AI Service'
      });
    }
  }

  /**
   * GET /api-core/ai/logs/questions
   * Lấy danh sách câu hỏi đã thu thập
   */
  async getCollectedQuestions(req: Request, res: Response): Promise<void> {
    try {
      // Đọc file logs/questions.txt từ AI Service
      // Tạm thời return empty vì chưa implement
      res.status(200).json({
        success: true,
        questions: [],
        total: 0,
        message: 'Chức năng đang phát triển'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * GET /api-core/ai/logs/results
   * Lấy danh sách kết quả queries
   */
  async getQueryResults(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({
        success: true,
        results: [],
        total: 0,
        message: 'Chức năng đang phát triển'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  /**
   * POST /api-core/ai/dataset/export
   * Export dataset để fine-tune
   */
  async exportDataset(req: Request, res: Response): Promise<void> {
    try {
      res.status(200).json({
        success: true,
        dataset_path: 'ai-service/dataset/training_data.json',
        total_samples: 0,
        message: 'Chức năng đang phát triển'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}
