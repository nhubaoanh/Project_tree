/**
 * Ollama Controller - BFS + Ollama Integration
 */

import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { OllamaService } from '../services/ollamaService';
import { RelationshipService } from '../services/relationshipService';

@injectable()
export class OllamaController {
  private ollamaService: OllamaService;

  constructor(private relationshipService: RelationshipService) {
    this.ollamaService = new OllamaService();
  }

  /**
   * POST /api/ollama/chat
   * Chat với Ollama - Sử dụng BFS để tìm quan hệ
   */
  async chat(req: Request, res: Response): Promise<void> {
    try {
      const { message, dongHoId } = req.body;
      
      if (!message) {
        res.status(400).json({
          success: false,
          message: 'Message là bắt buộc',
        });
        return;
      }

      if (!dongHoId) {
        res.status(400).json({
          success: false,
          message: 'dongHoId là bắt buộc',
        });
        return;
      }

      console.log(`[Ollama] Question: "${message}"`);

      // BƯỚC 1: Dùng BFS để tìm quan hệ
      const result = await this.relationshipService.analyzeQuestion(dongHoId, message);

      if (!result.success) {
        res.json({
          success: true,
          data: result.message || "Không thể trả lời câu hỏi này.",
        });
        return;
      }

      const { person, relatives, relationshipType } = result.data!;

      // BƯỚC 2: Nếu không có người thân
      if (relatives.length === 0) {
        res.json({
          success: true,
          data: `${person.hoTen} không có thông tin về ${relationshipType}.`,
        });
        return;
      }

      // BƯỚC 3: Dùng Ollama để diễn giải
      try {
        const explanation = await this.ollamaService.explainRelationship(
          person.hoTen,
          relatives,
          relationshipType
        );

        res.json({
          success: true,
          data: explanation,
          message: 'Chat thành công (BFS + Ollama)',
        });
      } catch (error) {
        // Fallback: Trả lời đơn giản
        const names = relatives.map(r => r.hoTen).join(", ");
        res.json({
          success: true,
          data: `${person.hoTen} có ${relatives.length} ${relationshipType}: ${names}`,
          message: 'Chat thành công (BFS only)',
        });
      }
    } catch (error: any) {
      console.error("[Ollama] Error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi chat với AI',
      });
    }
  }

  /**
   * GET /api/ollama/health
   * Kiểm tra Ollama có đang chạy không
   */
  async healthCheck(_req: Request, res: Response): Promise<void> {
    try {
      const isHealthy = await this.ollamaService.healthCheck();
      
      if (isHealthy) {
        const models = await this.ollamaService.listModels();
        res.json({
          success: true,
          message: 'Ollama đang chạy',
          data: {
            status: 'healthy',
            models,
          },
        });
      } else {
        res.status(503).json({
          success: false,
          message: 'Ollama không chạy. Vui lòng chạy: ollama serve',
        });
      }
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi kiểm tra Ollama',
      });
    }
  }

  /**
   * GET /api/ollama/models
   * Lấy danh sách models
   */
  async listModels(_req: Request, res: Response): Promise<void> {
    try {
      const models = await this.ollamaService.listModels();
      res.json({
        success: true,
        data: models,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Lỗi khi lấy danh sách models',
      });
    }
  }
}
