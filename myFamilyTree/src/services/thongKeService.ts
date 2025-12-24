import { injectable } from "tsyringe";
import { ThongKeRepository } from "../repositories/thongKeRepository";

@injectable()
export class ThongKeService {
  constructor(private thongKeRepository: ThongKeRepository) {}

  async getThongKeTongQuan(dongHoId: string) {
    return await this.thongKeRepository.getThongKeTongQuan(dongHoId);
  }

  async getThongKeoTheoDoi(dongHoId: string) {
    return await this.thongKeRepository.getThongKeoTheoDoi(dongHoId);
  }

  async getThongKeoTheoChi(dongHoId: string) {
    return await this.thongKeRepository.getThongKeoTheoChi(dongHoId);
  }

  async getDashboardStats(dongHoId?: string) {
    return await this.thongKeRepository.getDashboardStats(dongHoId);
  }

  async getThanhVienMoiNhat(dongHoId?: string, limit?: number) {
    return await this.thongKeRepository.getThanhVienMoiNhat(dongHoId, limit);
  }

  // Lấy tất cả thống kê cho một dòng họ
  async getFullStats(dongHoId: string) {
    const [tongQuan, theoDoi, theoChi] = await Promise.all([
      this.getThongKeTongQuan(dongHoId),
      this.getThongKeoTheoDoi(dongHoId),
      this.getThongKeoTheoChi(dongHoId),
    ]);
    return { tongQuan, theoDoi, theoChi };
  }

  // ========== TÀI CHÍNH ==========
  async getThongKeThuChi(dongHoId: string, nam?: number) {
    return await this.thongKeRepository.getThongKeThuChi(dongHoId, nam);
  }

  async getThongKeThuChiTheoThang(dongHoId: string, nam?: number) {
    return await this.thongKeRepository.getThongKeThuChiTheoThang(dongHoId, nam);
  }

  async getThuGanDay(dongHoId?: string, limit?: number) {
    return await this.thongKeRepository.getThuGanDay(dongHoId, limit);
  }

  async getChiGanDay(dongHoId?: string, limit?: number) {
    return await this.thongKeRepository.getChiGanDay(dongHoId, limit);
  }

  // ========== SỰ KIỆN ==========
  async getThongKeSuKien(dongHoId: string, nam?: number) {
    return await this.thongKeRepository.getThongKeSuKien(dongHoId, nam);
  }

  async getSuKienSapToi(dongHoId?: string, limit?: number) {
    return await this.thongKeRepository.getSuKienSapToi(dongHoId, limit);
  }
}
