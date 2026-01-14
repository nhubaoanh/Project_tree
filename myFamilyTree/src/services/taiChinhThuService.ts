import { taiChinhThu } from "../models/TaiChinhThu";
import { taiChinhThuRespository } from "../repositories/taiChinhThuRespository";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";
import { 
  validateFinanceThuImport, 
  formatValidationErrors,
  FinanceThuImportData,
  createValidationResponse
} from "../ultis/financeValidation";

// Interface cho import THU
export interface ITaiChinhThuImport {
  stt: number;
  ho_ten_nguoi_dong: string;
  ngay_dong: string; // DD/MM/YYYY
  so_tien: number;
  phuong_thuc_thanh_toan?: string;
  noi_dung?: string;
  ghi_chu?: string;
}

@injectable()
export class taiChinhThuService {
  constructor(private taiChinhThuRespository: taiChinhThuRespository) {}
  
  async searchTaiChinhThu(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any> {
    return await this.taiChinhThuRespository.searchTaiChinhThu(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }

  async createTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
    return await this.taiChinhThuRespository.createTaiChinhThu(taiChinhThu);
  }

  async updateTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
    return await this.taiChinhThuRespository.UpdateTaiChinhThu(taiChinhThu);
  }

  async deleteTaiChinhThu(listJson: any[], luUserId: string): Promise<any> {
    return await this.taiChinhThuRespository.deleteTaiChinhThu(listJson, luUserId);
  }

  // Import THU từ JSON (theo pattern thành viên với validation)
  async importFromJson(
    data: FinanceThuImportData[],
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    // 1. Validate dữ liệu trước khi import
    const validation = validateFinanceThuImport(data);
    
    if (!validation.isValid) {
      const errorResponse = createValidationResponse(validation);
      console.error("❌ Validation failed:", formatValidationErrors(validation));
      throw new Error(JSON.stringify(errorResponse));
    }

    // Log warnings nếu có
    if (validation.warnings.length > 0) {
      console.warn("⚠️ Validation warnings:", formatValidationErrors(validation));
    }

    // 2. Convert và import dữ liệu hợp lệ
    const convertedData = validation.validData.map(item => ({
      stt: item.stt || 0,
      ho_ten_nguoi_dong: item.ho_ten_nguoi_dong,
      ngay_dong: item.ngay_dong,
      so_tien: item.so_tien,
      phuong_thuc_thanh_toan: item.phuong_thuc_thanh_toan,
      noi_dung: item.noi_dung,
      ghi_chu: item.ghi_chu
    }));

    const result = await this.taiChinhThuRespository.importFromJson(
      convertedData,
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
