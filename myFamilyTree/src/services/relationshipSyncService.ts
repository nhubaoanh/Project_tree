import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { RowDataPacket } from "mysql2";

interface SyncResult {
  dongHoId: string;
  total_relationships_created: number;
  status: string;
  synced_at: Date;
}

@injectable()
export class RelationshipSyncService {
  constructor(private db: Database) {}
  
  /**
   * Đồng bộ tất cả quan hệ cho một dòng họ
   * Gọi stored procedure sp_sync_all_relationships
   */
  async syncAllRelationships(dongHoId: string): Promise<SyncResult> {
    const connection = await this.db.getRawConnection();
    try {
      console.log(`🔄 Starting relationship sync for dongHoId: ${dongHoId}`);
      
      // Gọi stored procedure
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_sync_all_relationships(?, @total)',
        [dongHoId]
      );
      
      // Lấy kết quả từ procedure
      const syncResult = results[0] as SyncResult[];
      
      if (syncResult && syncResult.length > 0) {
        const result = syncResult[0];
        console.log(`✅ Sync completed: ${result.total_relationships_created} relationships created`);
        return result;
      }
      
      throw new Error('No result returned from stored procedure');
      
    } catch (error: any) {
      console.error('❌ Error syncing relationships:', error);
      throw new Error(`Failed to sync relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Xóa tất cả quan hệ của một dòng họ
   * Gọi stored procedure sp_clear_relationships
   */
  async clearRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      console.log(`🗑️  Clearing relationships for dongHoId: ${dongHoId}`);
      
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_clear_relationships(?)',
        [dongHoId]
      );
      
      const deletedCount = results[0][0]?.deleted_count || 0;
      console.log(`✅ Cleared ${deletedCount} relationships`);
      
      return deletedCount;
      
    } catch (error: any) {
      console.error('❌ Error clearing relationships:', error);
      throw new Error(`Failed to clear relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Tạo chỉ quan hệ cha mẹ - con
   * Gọi stored procedure sp_create_parent_child_relationships
   */
  async createParentChildRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_create_parent_child_relationships(?)',
        [dongHoId]
      );
      
      const createdCount = results[0][0]?.created_count || 0;
      console.log(`✅ Created ${createdCount} parent-child relationships`);
      
      return createdCount;
      
    } catch (error: any) {
      console.error('❌ Error creating parent-child relationships:', error);
      throw new Error(`Failed to create parent-child relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Tạo chỉ quan hệ vợ - chồng
   * Gọi stored procedure sp_create_spouse_relationships
   */
  async createSpouseRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_create_spouse_relationships(?)',
        [dongHoId]
      );
      
      const createdCount = results[0][0]?.created_count || 0;
      console.log(`✅ Created ${createdCount} spouse relationships`);
      
      return createdCount;
      
    } catch (error: any) {
      console.error('❌ Error creating spouse relationships:', error);
      throw new Error(`Failed to create spouse relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Tạo chỉ quan hệ anh chị em
   * Gọi stored procedure sp_create_sibling_relationships
   */
  async createSiblingRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_create_sibling_relationships(?)',
        [dongHoId]
      );
      
      const createdCount = results[0][0]?.created_count || 0;
      console.log(`✅ Created ${createdCount} sibling relationships`);
      
      return createdCount;
      
    } catch (error: any) {
      console.error('❌ Error creating sibling relationships:', error);
      throw new Error(`Failed to create sibling relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Tạo chỉ quan hệ ông bà - cháu
   * Gọi stored procedure sp_create_grandparent_relationships
   */
  async createGrandparentRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_create_grandparent_relationships(?)',
        [dongHoId]
      );
      
      const createdCount = results[0][0]?.created_count || 0;
      console.log(`✅ Created ${createdCount} grandparent relationships`);
      
      return createdCount;
      
    } catch (error: any) {
      console.error('❌ Error creating grandparent relationships:', error);
      throw new Error(`Failed to create grandparent relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Tạo chỉ quan hệ chú bác cô (anh chị em của cha)
   * Gọi stored procedure sp_create_paternal_uncle_aunt_relationships
   */
  async createPaternalUncleAuntRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_create_paternal_uncle_aunt_relationships(?)',
        [dongHoId]
      );
      
      const createdCount = results[0][0]?.created_count || 0;
      console.log(`✅ Created ${createdCount} paternal uncle/aunt relationships`);
      
      return createdCount;
      
    } catch (error: any) {
      console.error('❌ Error creating paternal uncle/aunt relationships:', error);
      throw new Error(`Failed to create paternal uncle/aunt relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Tạo chỉ quan hệ dì cậu (anh chị em của mẹ)
   * Gọi stored procedure sp_create_maternal_uncle_aunt_relationships
   */
  async createMaternalUncleAuntRelationships(dongHoId: string): Promise<number> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        'CALL sp_create_maternal_uncle_aunt_relationships(?)',
        [dongHoId]
      );
      
      const createdCount = results[0][0]?.created_count || 0;
      console.log(`✅ Created ${createdCount} maternal uncle/aunt relationships`);
      
      return createdCount;
      
    } catch (error: any) {
      console.error('❌ Error creating maternal uncle/aunt relationships:', error);
      throw new Error(`Failed to create maternal uncle/aunt relationships: ${error.message}`);
    } finally {
      connection.release();
    }
  }
  
  /**
   * Lấy thống kê quan hệ của một dòng họ
   */
  async getRelationshipStats(dongHoId: string): Promise<any> {
    const connection = await this.db.getRawConnection();
    try {
      const [results] = await connection.execute<RowDataPacket[]>(
        `SELECT 
          loaiQuanHeId,
          lqh.tenLoaiQuanHe,
          COUNT(*) as count
        FROM quanhe qh
        JOIN loaiquanhe lqh ON qh.loaiQuanHeId = lqh.loaiQuanHeId
        WHERE qh.dongHoId1 = ?
        GROUP BY loaiQuanHeId, lqh.tenLoaiQuanHe
        ORDER BY count DESC`,
        [dongHoId]
      );
      
      const total = results.reduce((sum: number, row: any) => sum + row.count, 0);
      
      return {
        dongHoId,
        total_relationships: total,
        breakdown: results,
        generated_at: new Date()
      };
      
    } catch (error: any) {
      console.error('❌ Error getting relationship stats:', error);
      throw new Error(`Failed to get relationship stats: ${error.message}`);
    } finally {
      connection.release();
    }
  }
}
