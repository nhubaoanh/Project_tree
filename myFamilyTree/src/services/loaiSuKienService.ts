import { loaiSuKienRespository } from "../repositories/loaiSuKienRepository";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class loaiSuKienService {
  constructor(private loaiSuKienRespository: loaiSuKienRespository) {}
  async searchLoaiSuKien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
  ): Promise<any> {
    return await this.loaiSuKienRespository.searchLoaiSuKien(
      pageIndex,
      pageSize,
      search_content,
    );
  }
}