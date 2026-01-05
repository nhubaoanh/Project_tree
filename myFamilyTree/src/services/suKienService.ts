import { suKien } from "../models/sukien";
import { suKienRespository } from "../repositories/suKienRespository";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class suKienService {
  constructor(private suKienRespository: suKienRespository) {}
  async searchSuKien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any> {
    return await this.suKienRespository.searchSuKien(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }

  async createSuKien(sukien: suKien): Promise<any> {
    sukien.suKienId = uuidv4();
    return await this.suKienRespository.createSuKien(sukien);
  }

  async updateSuKien(sukien: suKien): Promise<any> {
    return await this.suKienRespository.updateSuKien(sukien);
  }

  async deleteSuKien(listJson: any[], luUserId: string): Promise<any> {
    return await this.suKienRespository.deleteSuKien(listJson, luUserId);
  }
}