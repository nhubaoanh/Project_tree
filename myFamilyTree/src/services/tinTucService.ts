import { injectable } from "tsyringe";
import { TinTuc } from "../models/tintuc";
import { TinTucRepository } from "../repositories/tinTucRepository";

@injectable()
export class TinTucService {
  constructor(private tinTucRepository: TinTucRepository) {}

  async search(
    pageIndex: number,
    pageSize: number,
    searchContent: string,
    dongHoId: string
  ): Promise<TinTuc[]> {
    return await this.tinTucRepository.search(pageIndex, pageSize, searchContent, dongHoId);
  }

  async create(tinTuc: TinTuc): Promise<any> {
    if (!tinTuc.dongHoId) {
      throw new Error("dongHoId là bắt buộc");
    }
    if (!tinTuc.tieuDe) {
      throw new Error("Tiêu đề là bắt buộc");
    }
    return await this.tinTucRepository.create(tinTuc);
  }

  async update(tinTuc: TinTuc): Promise<any> {
    if (!tinTuc.tinTucId) {
      throw new Error("tinTucId là bắt buộc");
    }
    if (!tinTuc.dongHoId) {
      throw new Error("dongHoId là bắt buộc");
    }
    return await this.tinTucRepository.update(tinTuc);
  }

  async delete(tinTucId: string, luUserId: string): Promise<any> {
    return await this.tinTucRepository.delete(tinTucId, luUserId);
  }

  async getById(tinTucId: string): Promise<TinTuc | null> {
    // Procedure GetTinTucById đã tự động tăng lượt xem
    return await this.tinTucRepository.getById(tinTucId);
  }
}
