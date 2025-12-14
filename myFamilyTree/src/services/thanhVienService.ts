import { thanhVien } from "../models/thanhvien";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { injectable } from "tsyringe";
import { 
  validateMemberImport, 
  formatValidationErrors,
  MemberImportData 
} from "../ultis/memberValidation";

@injectable()
export class thanhVienService {
  constructor(private thanhvienRespository: thanhVienRespository) {}

  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    return await this.thanhvienRespository.createThanhVien(thanhvien);
  }

  async getAllThanhVien(): Promise<any> {
    return await this.thanhvienRespository.getAllThanhVien();
  }

  async searchThanhVien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string,
    thanhVienId: number
  ): Promise<any> {
    return await this.thanhvienRespository.searchThanhVien(
      pageIndex,
      pageSize,
      search_content,
      dongHoId,
      thanhVienId
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

    return {
      ...result,
      warnings: validation.warnings.length > 0 
        ? validation.warnings.map(w => `Dòng ${w.row}: ${w.message}`)
        : []
    };
  }
}
