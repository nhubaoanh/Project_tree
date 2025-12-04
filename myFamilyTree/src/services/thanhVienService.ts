import { thanhVien } from "../models/thanhvien";
import { thanhVienRespository } from "../repositories/thanhVienRespository";
import { injectable } from "tsyringe";

@injectable()
export class thanhVienService {
  constructor(private thanhvienRespository: thanhVienRespository) {}

  async createThanhVien(thanhvien: thanhVien): Promise<any> {
    return await this.thanhvienRespository.createThanhVien(thanhvien);
  }

  // Tạo nhiều thành viên cùng lúc
  async createMultipleThanhVien(thanhViens: thanhVien[]): Promise<any> {
    return await this.thanhvienRespository.createMultipleThanhVien(thanhViens);
  }

  async getAllThanhVien(): Promise<any> {
    return await this.thanhvienRespository.getAllThanhVien();
  }
}