import { injectable } from "tsyringe";
import { thanhVien } from "../models/thanhvien";
import { Database } from "../config/database";

@injectable()
export class thanhVienRespository {
  constructor(private db: Database) {}

  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    try {
      const sql =
        "CALL InsertMember(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        thanhvien.thanhVienId,
        thanhvien.dongHoId,
        thanhvien.hoTen,
        thanhvien.gioiTinh,
        thanhvien.ngaySinh,
        thanhvien.ngayMat,
        thanhvien.noiSinh,
        thanhvien.noiMat,
        thanhvien.ngheNghiep,
        thanhvien.trinhDoHocVan,
        thanhvien.diaChiHienTai,
        thanhvien.tieuSu,
        thanhvien.anhChanDung,
        thanhvien.doiThuoc,
        thanhvien.chaId,
        thanhvien.meId,
        thanhvien.voId,
        thanhvien.chongId,
        thanhvien.nguoiTaoId,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async createMultipleThanhVien(thanhViens: thanhVien[]): Promise<any> {
    try {
      // 1. Insert tất cả thành viên tạm thời voId/chongId = null
      for (const tv of thanhViens) {
        await this.createThanhVien({
          ...tv,
          voId: null,
          chongId: null,
        });
      }

      // 2. Cập nhật lại voId, chongId
      for (const tv of thanhViens) {
        if (tv.voId || tv.chongId) {
          await this.updateVoChong(tv.thanhVienId, tv.voId, tv.chongId);
        }
      }

      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  // Hàm update vợ/chồng
  async updateVoChong(
    thanhVienId: number,
    voId: number | null,
    chongId: number | null
  ) {
    const sql = "UPDATE thanhvien SET voId=?, chongId=? WHERE thanhVienId=?";
    await this.db.query(sql, [voId, chongId, thanhVienId]);
  }

  async getAllThanhVien(): Promise<any> {
    try {
      const sql = "CALL getAllMember(@err_code, @err_msg)";
      const result = await this.db.query(sql, []);
      return result;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async searchThanhVien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string,
    thanhVienId: number
  ): Promise<any[]> {
    try {
      const sql = "CALL SearchThanhVien(?,?,?,?,?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [
        pageIndex,
        pageSize,
        search_content || null,
        dongHoId || null,
        thanhVienId || null,
      ]);

      return result;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  // async importFromExcel(thanhViens: any[]): Promise<number> {
  //   try {
  //     // Sử dụng transaction để đảm bảo tính toàn vẹn dữ liệu
  //     // await this.db.beginTransaction();

  //     let successCount = 0;

  //     for (const tv of thanhViens) {
  //       try {
  //         await this.createThanhVien({
  //           ...tv,
  //           voId: null,  // Xử lý sau
  //           chongId: null // Xử lý sau
  //         });
  //         successCount++;
  //       } catch (error) {
  //         console.error(`Lỗi khi thêm thành viên ${tv.hoTen}:`, error);
  //         // Bỏ qua lỗi và tiếp tục với thành viên tiếp theo
  //       }
  //     }

  //     // await this.db.commit();
  //     return successCount;
  //   } catch (error) {
  //     // await this.db.rollback();
  //     throw error;
  //   }
  // }
  // Trong thanhVienRespository.ts:

  async importFromExcel(thanhViens: any[]): Promise<number> {
    const membersToUpdate = []; // Dùng để lưu voId/chongId
    let successCount = 0;

    // --- 1. THÊM TẤT CẢ THÀNH VIÊN (Kể cả cha mẹ) ---
    for (const tv of thanhViens) {
      try {
        const originalVoId = tv.voId;
        const originalChongId = tv.chongId;

        await this.createThanhVien({
          ...tv,
          // GIỮ NGUYÊN chaId và meId (đã được sắp xếp)
          voId: null, // BẮT BUỘC NULL cho Vợ/Chồng lần đầu
          chongId: null, // BẮT BUỘC NULL cho Vợ/Chồng lần đầu
        });

        // Lưu lại Vợ/Chồng để cập nhật sau
        membersToUpdate.push({
          thanhVienId: tv.thanhVienId,
          voId: originalVoId,
          chongId: originalChongId,
        });

        successCount++;
      } catch (error) {
        console.error(`Lỗi khi thêm thành viên ${tv.hoTen}:`, error);
        // Bỏ qua lỗi và tiếp tục
      }
    }

    // --- 2. CẬP NHẬT LẠI ID VỢ/CHỒNG ---
    for (const member of membersToUpdate) {
      if (member.voId || member.chongId) {
        try {
          await this.updateVoChong(
            member.thanhVienId,
            member.voId,
            member.chongId
          );
        } catch (error) {
          console.error(
            `Lỗi khi cập nhật quan hệ Vợ/Chồng cho ID ${member.thanhVienId}:`,
            error
          );
        }
      }
    }

    return successCount;
  }
}

