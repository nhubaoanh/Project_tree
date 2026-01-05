import { injectable } from "tsyringe";
import { TaiLieu } from "../models/tailieu";
import { TaiLieuRepository } from "../repositories/taiLieuRepository";

@injectable()
export class TaiLieuService {
  constructor(private taiLieuRepository: TaiLieuRepository) {}

  async search(
    pageIndex: number,
    pageSize: number,
    searchContent: string,
    dongHoId: string,
    loaiTaiLieu: string
  ): Promise<TaiLieu[]> {
    return await this.taiLieuRepository.search(
      pageIndex,
      pageSize,
      searchContent,
      dongHoId,
      loaiTaiLieu
    );
  }

  async create(taiLieu: TaiLieu): Promise<any> {
    if (!taiLieu.dongHoId) {
      throw new Error("dongHoId là bắt buộc");
    }
    if (!taiLieu.tenTaiLieu) {
      throw new Error("Tên tài liệu là bắt buộc");
    }
    return await this.taiLieuRepository.create(taiLieu);
  }

  async update(taiLieu: TaiLieu): Promise<any> {
    if (!taiLieu.taiLieuId) {
      throw new Error("taiLieuId là bắt buộc");
    }
    if (!taiLieu.dongHoId) {
      throw new Error("dongHoId là bắt buộc");
    }
    return await this.taiLieuRepository.update(taiLieu);
  }

  async delete(taiLieuId: string, luUserId: string): Promise<any> {
    return await this.taiLieuRepository.delete(taiLieuId, luUserId);
  }

  async getById(taiLieuId: string): Promise<TaiLieu | null> {
    return await this.taiLieuRepository.getById(taiLieuId);
  }

  async deleteMultiple(listJson: any[], luUserId: string): Promise<any> {
    return await this.taiLieuRepository.deleteMultiple(listJson, luUserId);
  }
}
