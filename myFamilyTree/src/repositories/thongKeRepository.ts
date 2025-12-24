import { injectable } from "tsyringe";
import { Database } from "../config/database";

@injectable()
export class ThongKeRepository {
  constructor(private db: Database) {}

  // Thống kê tổng quan theo dòng họ
  async getThongKeTongQuan(dongHoId: string): Promise<any> {
    try {
      const sql = "CALL GetThongKeTongQuan(?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId]);
      if (Array.isArray(result) && Array.isArray(result[0]) && result[0][0]) {
        return result[0][0];
      }
      return null;
    } catch (error: any) {
      console.error("❌ getThongKeTongQuan error:", error);
      throw new Error(error?.message || "Lỗi thống kê tổng quan");
    }
  }

  // Thống kê theo đời
  async getThongKeoTheoDoi(dongHoId: string): Promise<any[]> {
    try {
      const sql = "CALL GetThongKeoTheoDoi(?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getThongKeoTheoDoi error:", error);
      throw new Error(error?.message || "Lỗi thống kê theo đời");
    }
  }

  // Thống kê theo chi
  async getThongKeoTheoChi(dongHoId: string): Promise<any[]> {
    try {
      const sql = "CALL GetThongKeoTheoChi(?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getThongKeoTheoChi error:", error);
      throw new Error(error?.message || "Lỗi thống kê theo chi");
    }
  }

  // Dashboard stats
  async getDashboardStats(dongHoId?: string): Promise<any> {
    try {
      const sql = "CALL GetDashboardStats(?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId || null]);
      if (Array.isArray(result) && Array.isArray(result[0]) && result[0][0]) {
        return result[0][0];
      }
      return null;
    } catch (error: any) {
      console.error("❌ getDashboardStats error:", error);
      throw new Error(error?.message || "Lỗi lấy dashboard stats");
    }
  }

  // Thành viên mới nhất
  async getThanhVienMoiNhat(dongHoId?: string, limit: number = 10): Promise<any[]> {
    try {
      const sql = "CALL GetThanhVienMoiNhat(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId || null, limit]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getThanhVienMoiNhat error:", error);
      throw new Error(error?.message || "Lỗi lấy thành viên mới nhất");
    }
  }

  // ========== THỐNG KÊ TÀI CHÍNH ==========

  // Thống kê thu chi tổng quan
  async getThongKeThuChi(dongHoId: string, nam?: number): Promise<any> {
    try {
      const sql = "CALL GetThongKeThuChi(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId, nam || null]);
      if (Array.isArray(result) && Array.isArray(result[0]) && result[0][0]) {
        return result[0][0];
      }
      return null;
    } catch (error: any) {
      console.error("❌ getThongKeThuChi error:", error);
      throw new Error(error?.message || "Lỗi thống kê thu chi");
    }
  }

  // Thống kê thu chi theo tháng
  async getThongKeThuChiTheoThang(dongHoId: string, nam?: number): Promise<any[]> {
    try {
      const sql = "CALL GetThongKeThuChiTheoThang(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId, nam || null]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getThongKeThuChiTheoThang error:", error);
      throw new Error(error?.message || "Lỗi thống kê thu chi theo tháng");
    }
  }

  // Lấy các khoản thu gần đây
  async getThuGanDay(dongHoId?: string, limit: number = 5): Promise<any[]> {
    try {
      const sql = "CALL GetThuGanDay(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId || null, limit]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getThuGanDay error:", error);
      throw new Error(error?.message || "Lỗi lấy khoản thu gần đây");
    }
  }

  // Lấy các khoản chi gần đây
  async getChiGanDay(dongHoId?: string, limit: number = 5): Promise<any[]> {
    try {
      const sql = "CALL GetChiGanDay(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId || null, limit]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getChiGanDay error:", error);
      throw new Error(error?.message || "Lỗi lấy khoản chi gần đây");
    }
  }

  // ========== THỐNG KÊ SỰ KIỆN ==========

  // Thống kê sự kiện tổng quan
  async getThongKeSuKien(dongHoId: string, nam?: number): Promise<any> {
    try {
      const sql = "CALL GetThongKeSuKien(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId, nam || null]);
      if (Array.isArray(result) && Array.isArray(result[0]) && result[0][0]) {
        return result[0][0];
      }
      return null;
    } catch (error: any) {
      console.error("❌ getThongKeSuKien error:", error);
      throw new Error(error?.message || "Lỗi thống kê sự kiện");
    }
  }

  // Lấy sự kiện sắp tới
  async getSuKienSapToi(dongHoId?: string, limit: number = 5): Promise<any[]> {
    try {
      const sql = "CALL GetSuKienSapToi(?, ?, @err_code, @err_msg)";
      const result = await this.db.query(sql, [dongHoId || null, limit]);
      if (Array.isArray(result) && Array.isArray(result[0])) {
        return result[0];
      }
      return [];
    } catch (error: any) {
      console.error("❌ getSuKienSapToi error:", error);
      throw new Error(error?.message || "Lỗi lấy sự kiện sắp tới");
    }
  }
}
