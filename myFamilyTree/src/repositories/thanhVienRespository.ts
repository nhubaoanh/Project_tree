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

  async getAllThanhVien() : Promise<any>{
    try{
      const sql = "CALL getAllMember(@err_code, @err_msg)";
      const result = await this.db.query(sql, []);
      return result;
    }catch(error : any){
      throw new Error(error.message);
    }
  }
}

