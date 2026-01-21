import { thanhVien } from "../models/thanhvien";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { RelationshipSyncService } from "./relationshipSyncService";
import { injectable } from "tsyringe";
import { 
  validateMemberImport, 
  formatValidationErrors,
  MemberImportData 
} from "../ultis/memberValidation";

@injectable()
export class thanhVienService {
  constructor(
    private thanhvienRespository: thanhVienRespository,
    private relationshipSyncService: RelationshipSyncService
  ) {}

  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    return await this.thanhvienRespository.createThanhVien(thanhvien);
  }

  // Lấy thành viên theo Composite Key
  async getThanhVienById(dongHoId: string, thanhVienId: number): Promise<any> {
    return await this.thanhvienRespository.getThanhVienById(dongHoId, thanhVienId);
  }

  async updateThanhVien(thanhvien: thanhVien): Promise<any> {
    return await this.thanhvienRespository.updateMultipleThanhVien(thanhvien);
  }

  // Xóa thành viên theo Composite Key
  async deleteThanhVien(dongHoId: string, thanhVienId: number): Promise<any> {
    return await this.thanhvienRespository.deleteThanhVien(dongHoId, thanhVienId);
  }

  // Xóa nhiều thành viên
  async deleteMultipleThanhVien(listJson: any[], luUserId: string): Promise<any> {
    return await this.thanhvienRespository.deleteMultipleThanhVien(listJson, luUserId);
  }

  async getAllThanhVien(): Promise<any> {
    return await this.thanhvienRespository.getAllThanhVien();
  }

  // Lấy tất cả thành viên theo dongHoId (không phân trang - dùng cho render cây)
  async getAllByDongHo(dongHoId: string): Promise<any> {
    return await this.thanhvienRespository.getAllByDongHo(dongHoId);
  }

  // Search thành viên theo dòng họ cụ thể
  async searchThanhVienByDongHo(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any> {
    return await this.thanhvienRespository.searchThanhVienByDongHo(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }

  // Import từ JSON (FE đã parse Excel, gửi JSON xuống)
  async importFromJson(
    members: MemberImportData[], 
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    // 1. Validate dữ liệu trước khi import
    const validation = validateMemberImport(members);
    
    if (!validation.isValid) {
      const errorMessage = formatValidationErrors(validation);
      console.error("❌ Validation failed:", errorMessage);
      throw new Error(errorMessage);
    }

    // Log warnings nếu có
    if (validation.warnings.length > 0) {
      console.warn("⚠️ Validation warnings:", formatValidationErrors(validation));
    }

    // 2. Import dữ liệu hợp lệ
    const result = await this.thanhvienRespository.importFromJson(
      validation.validMembers,
      dongHoId,
      nguoiTaoId
    );

    // 3. Tự động đồng bộ quan hệ sau khi import thành công
    try {
      console.log(`🔄 Auto-syncing relationships for dongHoId: ${dongHoId}`);
      const syncResult = await this.relationshipSyncService.syncAllRelationships(dongHoId);
      console.log(`✅ Auto-sync completed: ${syncResult.total_relationships_created} relationships created`);
      
      return {
        ...result,
        relationshipSync: {
          success: true,
          totalRelationships: syncResult.total_relationships_created,
          syncedAt: syncResult.synced_at
        },
        warnings: validation.warnings.length > 0 
          ? validation.warnings.map(w => `Dòng ${w.row}: ${w.message}`)
          : []
      };
    } catch (syncError: any) {
      // Nếu sync quan hệ thất bại, vẫn trả về kết quả import thành công
      // nhưng thông báo lỗi sync
      console.error("❌ Auto-sync failed:", syncError.message);
      return {
        ...result,
        relationshipSync: {
          success: false,
          error: syncError.message,
          message: "Import thành công nhưng đồng bộ quan hệ thất bại. Vui lòng đồng bộ thủ công."
        },
        warnings: validation.warnings.length > 0 
          ? validation.warnings.map(w => `Dòng ${w.row}: ${w.message}`)
          : []
      };
    }
  }
}
