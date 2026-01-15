/**
 * Ollama Controller - API endpoints cho DeepSeek-Coder
 */

import { Request, Response } from 'express';
import { injectable } from 'tsyringe';
import { OllamaService } from '../services/ollamaService';
import { thanhVienRespository } from '../repositories/thanhVienRespository';

@injectable()
export class OllamaController {
  private ollamaService: OllamaService;

  constructor(private thanhVienRepo: thanhVienRespository) {
    this.ollamaService = new OllamaService();
  }

  /**
   * POST /api/ollama/chat
   * Chat với DeepSeek-Coder về gia phả (Text-to-SQL)
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

      // BƯỚC 1: Dùng DeepSeek-Coder để tạo SQL từ câu hỏi tiếng Việt
      await this.ollamaService.textToSQL(message, dongHoId);

      // BƯỚC 2: Thực thi SQL query
      const members = await this.thanhVienRepo.getAllByDongHo(dongHoId);
      
      if (!members || members.length === 0) {
        res.json({
          success: true,
          data: `Không tìm thấy thành viên nào trong dòng họ này.`,
        });
        return;
      }

      // BƯỚC 3: Format kết quả thành tiếng Việt
      let vietnameseResponse = '';

      // Phân tích câu hỏi để format phù hợp
      const lowerMsg = message.toLowerCase();
      
      if (lowerMsg.includes('tổ tiên') || lowerMsg.includes('đời 1')) {
        const ancestors = members.filter((m: any) => m.doiThuoc === 1 || m.doiThu === 1);
        if (ancestors.length > 0) {
          vietnameseResponse = `Tổ tiên (Đời 1):\n${ancestors.map((m: any) => 
            `- ${m.hoTen} (${m.gioiTinh === 1 ? 'Nam' : 'Nữ'})`
          ).join('\n')}`;
        } else {
          vietnameseResponse = 'Không tìm thấy thông tin tổ tiên.';
        }
      } else if (lowerMsg.includes('đời')) {
        const genMatch = lowerMsg.match(/đời\s*(\d+)/);
        if (genMatch) {
          const gen = parseInt(genMatch[1]);
          const genMembers = members.filter((m: any) => 
            (m.doiThuoc === gen || m.doiThu === gen)
          );
          if (genMembers.length > 0) {
            vietnameseResponse = `Thành viên đời ${gen} (${genMembers.length} người):\n${genMembers.map((m: any) => 
              `- ${m.hoTen} (${m.gioiTinh === 1 ? 'Nam' : 'Nữ'}${m.ngaySinh ? ', sinh ' + new Date(m.ngaySinh).getFullYear() : ''})`
            ).join('\n')}`;
          } else {
            vietnameseResponse = `Không tìm thấy thành viên đời ${gen}.`;
          }
        }
      } else if (lowerMsg.includes('liệt kê') || lowerMsg.includes('danh sách')) {
        vietnameseResponse = `Tổng số thành viên: ${members.length} người\n\n`;
        const byGeneration: any = {};
        members.forEach((m: any) => {
          const gen = m.doiThuoc || m.doiThu || 0;
          if (!byGeneration[gen]) byGeneration[gen] = [];
          byGeneration[gen].push(m);    
        });
        
        Object.keys(byGeneration).sort((a, b) => parseInt(a) - parseInt(b)).forEach(gen => {
          vietnameseResponse += `Đời ${gen} (${byGeneration[gen].length} người):\n`;
          byGeneration[gen].forEach((m: any) => {
            vietnameseResponse += `  - ${m.hoTen} (${m.gioiTinh === 1 ? 'Nam' : 'Nữ'})\n`;
          });
          vietnameseResponse += '\n';
        });
      } else {
        // Câu hỏi phức tạp khác - trả về tổng quan
        vietnameseResponse = `Tìm thấy ${members.length} thành viên trong dòng họ.\n\n`;
        vietnameseResponse += `Một số thành viên:\n${members.slice(0, 10).map((m: any) => 
          `- ${m.hoTen} (Đời ${m.doiThuoc || m.doiThu || '?'})`
        ).join('\n')}`;
        if (members.length > 10) {
          vietnameseResponse += `\n... và ${members.length - 10} người khác.`;
        }
      }
      res.json({
        success: true,
        data: vietnameseResponse,
        message: 'Chat thành công',
      });
    } catch (error: any) {
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
