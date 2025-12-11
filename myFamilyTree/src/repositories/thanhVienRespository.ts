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

  async updateMultipleThanhVien(thanhVien: thanhVien): Promise<any> {
    try {
      const sql =
        "CALL updateMember(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, @err_code, @err_msg)";
      await this.db.query(sql, [
        thanhVien.thanhVienId,
        thanhVien.dongHoId,
        thanhVien.hoTen,
        thanhVien.gioiTinh,
        thanhVien.ngaySinh,
        thanhVien.ngayMat,
        thanhVien.noiSinh,
        thanhVien.noiMat,
        thanhVien.ngheNghiep,
        thanhVien.trinhDoHocVan,
        thanhVien.diaChiHienTai,
        thanhVien.tieuSu,
        thanhVien.anhChanDung,
        thanhVien.doiThuoc,
        thanhVien.chaId,
        thanhVien.meId,
        thanhVien.voId,
        thanhVien.chongId,
        thanhVien.lu_user_id,
      ]);
      return true;
    } catch (error: any) {
      console.log("error database => ", error);
      throw new Error(error.message);
    }
  }

  async getThanhVienById(thanhVienId: number): Promise<any> {
    try {
      const sql = "CALL GetThanhVienById(?, @err_code, @err_msg)";
      const [result] = await this.db.query(sql, [thanhVienId]);
      return result[0];
    } catch (error: any) {
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

  // async updateRelations(
  //   thanhVienId: number,
  //   chaId: number | null,
  //   meId: number | null,
  //   voId: number | null,
  //   chongId: number | null
  // ): Promise<any> {
  //   try {
  //     // Sử dụng câu lệnh UPDATE SQL trực tiếp
  //     const sql = `
  //               UPDATE ThanhVien
  //               SET 
  //                   chaId = ?,
  //                   meId = ?,
  //                   voId = ?,
  //                   chongId = ?,
  //                   lu_updated = NOW()
  //               WHERE thanhVienId = ?;
  //           `;

  //     await this.db.query(sql, [chaId, meId, voId, chongId, thanhVienId]);

  //     return true;
  //   } catch (error: any) {
  //     console.error("Lỗi cập nhật quan hệ (Pass 2) => ", error);
  //     // Quan trọng: Ném lỗi để có thể Rollback Transaction nếu bạn dùng Transaction
  //     throw new Error(
  //       `Lỗi cập nhật quan hệ cho ID ${thanhVienId}: ${error.message}`
  //     );
  //   }
  // }

  async importFromExcel(thanhViens: any[]): Promise<number> {
    const temporaryIdMap = new Map<number, number>(); // STT → real ID
    const membersToProcess = [...thanhViens];
    let successCount = 0;

    // 🎯 Sort theo đời để cha/mẹ insert trước
    membersToProcess.sort((a, b) => (a.doiThuoc || 0) - (b.doiThuoc || 0));

    // ================================
    // 🔥 PASS 1 — INSERT hoặc UPDATE
    // ================================
    for (const tv of membersToProcess) {
      try {
        const tempExcelId = tv.thanhVienId;

        // Bỏ sạch FK khi insert/update
        const memberDataPass1 = {
          ...tv,
          chaId: null,
          meId: null,
          voId: null,
          chongId: null,
        };

        let existing = null;

        // Nếu Excel có ID → check xem DB có không
        if (tv.thanhVienId) {
          existing = await this.getThanhVienById(tv.thanhVienId);
          console.log("existing", existing);
        }

        // ==========================
        // CASE 1: Tồn tại → UPDATE
        // ==========================
        if (existing) {
          await this.updateMultipleThanhVien(memberDataPass1);
          successCount++;
        }

        // ==========================
        // CASE 2: Không tồn tại → INSERT
        // ==========================
        else {
          const newId = await this.createThanhVien(memberDataPass1);

          if (!newId) throw new Error(`Không tạo được ID mới cho ${tv.hoTen}`);

          tv.thanhVienId = newId; // Lưu lại ID thực

          // Nếu Excel có ID tạm (STT)
          if (tempExcelId !== null) {
            temporaryIdMap.set(tempExcelId, newId);
          }

          successCount++;
        }
      } catch (err) {
        console.error(`❌ Lỗi Pass 1 cho ${tv.hoTen}:`, err);
      }
    }

    // ================================
    // 🔥 PASS 2 — DỰNG QUAN HỆ CUỐI
    // ================================
    const finalRelations = membersToProcess
      .filter((tv) => tv.thanhVienId != null)
      .map((tv) => {
        const mapId = (id: any) => (id ? temporaryIdMap.get(id) || id : null);

        return {
          thanhVienId: tv.thanhVienId,
          chaId: mapId(tv.chaId),
          meId: mapId(tv.meId),
          voId: mapId(tv.voId),
          chongId: mapId(tv.chongId),
        };
      });

    // console.log("Pass 2 (Quan hệ cuối):", finalRelations);

    // ================================
    // 🔥 PASS 3 — BULK UPDATE RELATIONS
    // ================================
    try {
      if (finalRelations.length > 0) {
        await this.bulkUpdateRelationsInMySQL(finalRelations);
      }
    } catch (error) {
      console.error("❌ Lỗi Pass 3 Bulk Update:", error);
    }

    return successCount;
  }

  async bulkUpdateRelationsInMySQL(members: any[]): Promise<any> {
    if (members.length === 0) return 0;

    const connection = await this.db.getRawConnection();

    try {
      await connection.beginTransaction();

      const jsonData = JSON.stringify(members);

      const result = await connection.query(
        `CALL BulkUpdateMemberRelations(?)`,
        [jsonData]
      );
      await connection.commit();
      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
