import { injectable } from "tsyringe";
import { TaiLieu } from "../models/tailieu";
import { TaiLieuRepository } from "../repositories/taiLieuRepository";
import { deletePhysicalFile, deletePhysicalFiles } from "../ultis/fileHelper";

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

    // Lấy thông tin tài liệu cũ để xóa file cũ nếu có file mới
    if (taiLieu.duongDan) {
      const oldTaiLieu = await this.taiLieuRepository.getById(taiLieu.taiLieuId);
      if (oldTaiLieu && oldTaiLieu.duongDan && oldTaiLieu.duongDan !== taiLieu.duongDan) {
        // Xóa file cũ
        deletePhysicalFile(oldTaiLieu.duongDan);
        console.log(`🗑️  Deleted old file when updating: ${oldTaiLieu.duongDan}`);
      }
    }

    return await this.taiLieuRepository.update(taiLieu);
  }

  async delete(taiLieuId: string, luUserId: string): Promise<any> {
    // Lấy thông tin tài liệu trước khi xóa để lấy đường dẫn file
    const taiLieu = await this.taiLieuRepository.getById(taiLieuId);
    
    // Xóa trong database
    const result = await this.taiLieuRepository.delete(taiLieuId, luUserId);
    
    // Xóa file vật lý nếu có
    if (taiLieu && taiLieu.duongDan) {
      deletePhysicalFile(taiLieu.duongDan);
      console.log(`🗑️  Deleted physical file: ${taiLieu.duongDan}`);
    }
    
    return result;
  }

  async getById(taiLieuId: string): Promise<TaiLieu | null> {
    return await this.taiLieuRepository.getById(taiLieuId);
  }

  async deleteMultiple(listJson: any[], luUserId: string): Promise<any> {
    // Lấy thông tin tất cả tài liệu trước khi xóa
    const filesToDelete: string[] = [];
    
    for (const item of listJson) {
      const taiLieu = await this.taiLieuRepository.getById(item.taiLieuId);
      if (taiLieu && taiLieu.duongDan) {
        filesToDelete.push(taiLieu.duongDan);
      }
    }
    
    // Xóa trong database
    const result = await this.taiLieuRepository.deleteMultiple(listJson, luUserId);
    
    // Xóa file vật lý
    if (filesToDelete.length > 0) {
      const deletedCount = deletePhysicalFiles(filesToDelete);
      console.log(`🗑️  Deleted ${deletedCount}/${filesToDelete.length} physical files`);
    }
    
    return result;
  }
}
