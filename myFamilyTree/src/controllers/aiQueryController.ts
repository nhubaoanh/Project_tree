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

      // Return response
      res.status(200).json({
        success: result.success,
        message: result.success ? 'Truy vấn thành công' : 'Truy vấn thất bại',
        data: {
          question,
          sql: result.sql,
          confidence: result.confidence,
          results: result.data,
          columns: result.columns,
          row_count: result.row_count,
          error: result.error
        }
      });

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
}
