import { taiChinhChi } from "../models/TaiChinhChi";
import { taiChinhChiRespository } from "../repositories/taiChinhChiRespository";
import { injectable } from "tsyringe";
import { 
  validateFinanceChiImport, 
  formatValidationErrors,
  FinanceChiImportData,
  createValidationResponse
} from "../ultis/financeValidation";

// Interface cho import CHI
export interface ITaiChinhChiImport {
  stt: number;
  ngay_chi: string; // DD/MM/YYYY
  danh_muc: string;
  so_tien: number;
  phuong_thuc_thanh_toan?: string;
  noi_dung?: string;
  nguoi_nhan?: string;
  ghi_chu?: string;
}

@injectable()
export class taiChinhChiService {
  constructor(private taiChinhChiRespository: taiChinhChiRespository) {}
  
  async searchTaiChinhChi(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any> {
    return await this.taiChinhChiRespository.searchTaiChinhChi(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }

  async createTaiChinhChi(taiChinhChi: taiChinhChi): Promise<any> {
    return await this.taiChinhChiRespository.createTaiChinhChi(taiChinhChi);
  }

  async updateTaiChinhChi(taiChinhChi: taiChinhChi): Promise<any> {
    return await this.taiChinhChiRespository.UpdateTaiChinhChi(taiChinhChi);
  }

  async deleteTaiChinhChi(listJson: any[], luUserId: string): Promise<any> {
    return await this.taiChinhChiRespository.deleteTaiChinhChi(listJson, luUserId);
  }

  // Import CHI từ JSON (theo pattern thành viên với validation)
  async importFromJson(
    data: FinanceChiImportData[],
    dongHoId: string,
    nguoiTaoId: string
  ): Promise<any> {
    // 1. Validate dữ liệu trước khi import
    const validation = validateFinanceChiImport(data);
    
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
      ngay_chi: item.ngay_chi,
      danh_muc: item.danh_muc,
      so_tien: item.so_tien,
      phuong_thuc_thanh_toan: item.phuong_thuc_thanh_toan,
      noi_dung: item.noi_dung,
      nguoi_nhan: item.nguoi_nhan,
      ghi_chu: item.ghi_chu
    }));

    const result = await this.taiChinhChiRespository.importFromJson(
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
