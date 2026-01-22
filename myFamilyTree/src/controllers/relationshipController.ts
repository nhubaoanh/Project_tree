import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { RelationshipSyncService } from "../services/relationshipSyncService";

@injectable()
export class RelationshipController {
  constructor(private relationshipSyncService: RelationshipSyncService) {}

  /**
   * POST /api/relationships/sync/:dongHoId
   * Đồng bộ tất cả quan hệ cho một dòng họ
   */
  async syncAllRelationships(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;

      if (!dongHoId) {
        res.status(400).json({
          success: false,
          message: "Thiếu dongHoId",
        });
        return;
      }

      console.log(`🔄 [Controller] Syncing relationships for dongHoId: ${dongHoId}`);

      const result = await this.relationshipSyncService.syncAllRelationships(dongHoId);

      res.status(200).json({
        success: true,
        message: "Đồng bộ quan hệ thành công",
        data: result,
      });
    } catch (error: any) {
      console.error("❌ [Controller] Sync error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi đồng bộ quan hệ",
      });
    }
  }

  /**
   * DELETE /api/relationships/clear/:dongHoId
   * Xóa tất cả quan hệ của một dòng họ
   */
  async clearRelationships(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;

      if (!dongHoId) {
        res.status(400).json({
          success: false,
          message: "Thiếu dongHoId",
        });
        return;
      }

      console.log(`🗑️  [Controller] Clearing relationships for dongHoId: ${dongHoId}`);

      const deletedCount = await this.relationshipSyncService.clearRelationships(dongHoId);

      res.status(200).json({
        success: true,
        message: `Đã xóa ${deletedCount} quan hệ`,
        data: { deletedCount },
      });
    } catch (error: any) {
      console.error("❌ [Controller] Clear error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi xóa quan hệ",
      });
    }
  }

  /**
   * GET /api/relationships/stats/:dongHoId
   * Lấy thống kê quan hệ của một dòng họ
   */
  async getRelationshipStats(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;

      if (!dongHoId) {
        res.status(400).json({
          success: false,
          message: "Thiếu dongHoId",
        });
        return;
      }

      const stats = await this.relationshipSyncService.getRelationshipStats(dongHoId);

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      console.error("❌ [Controller] Stats error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi lấy thống kê quan hệ",
      });
    }
  }

  /**
   * POST /api/relationships/sync-partial/:dongHoId
   * Đồng bộ một loại quan hệ cụ thể
   */
  async syncPartialRelationships(req: Request, res: Response): Promise<void> {
    try {
      const { dongHoId } = req.params;
      const { type } = req.body;

      if (!dongHoId) {
        res.status(400).json({
          success: false,
          message: "Thiếu dongHoId",
        });
        return;
      }

      if (!type) {
        res.status(400).json({
          success: false,
          message: "Thiếu type (parent_child, spouse, sibling, grandparent, paternal_uncle_aunt, maternal_uncle_aunt)",
        });
        return;
      }

      let createdCount = 0;
      let typeName = "";

      switch (type) {
        case "parent_child":
          createdCount = await this.relationshipSyncService.createParentChildRelationships(dongHoId);
          typeName = "cha mẹ - con";
          break;
        case "spouse":
          createdCount = await this.relationshipSyncService.createSpouseRelationships(dongHoId);
          typeName = "vợ - chồng";
          break;
        case "sibling":
          createdCount = await this.relationshipSyncService.createSiblingRelationships(dongHoId);
          typeName = "anh chị em";
          break;
        case "grandparent":
          createdCount = await this.relationshipSyncService.createGrandparentRelationships(dongHoId);
          typeName = "ông bà - cháu";
          break;
        case "paternal_uncle_aunt":
          createdCount = await this.relationshipSyncService.createPaternalUncleAuntRelationships(dongHoId);
          typeName = "chú bác cô";
          break;
        case "maternal_uncle_aunt":
          createdCount = await this.relationshipSyncService.createMaternalUncleAuntRelationships(dongHoId);
          typeName = "dì cậu";
          break;
        default:
          res.status(400).json({
            success: false,
            message: "Type không hợp lệ",
          });
          return;
      }

      res.status(200).json({
        success: true,
        message: `Đã tạo ${createdCount} quan hệ ${typeName}`,
        data: { type, createdCount },
      });
    } catch (error: any) {
      console.error("❌ [Controller] Partial sync error:", error.message);
      res.status(500).json({
        success: false,
        message: error.message || "Lỗi khi đồng bộ quan hệ",
      });
    }
  }
}
