import { taiChinhChi } from "../models/TaiChinhChi";
import { taiChinhChiRespository } from "../repositories/taiChinhChiRespository";
import { injectable } from "tsyringe";

@injectable()
export class taiChinhChiService {
  constructor(private taiChinhChiRespository: taiChinhChiRespository) {}
  async searchTaiChinhChi(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any> {
    return await this.taiChinhChiRespository.searchTaiChinhChi(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }

  async createTaiChinhChi(taiChinhChi: taiChinhChi): Promise<any> {
    return await this.taiChinhChiRespository.createTaiChinhChi(taiChinhChi);
  }

  async updateTaiChinhChi(taiChinhChi: taiChinhChi): Promise<any> {
    return await this.taiChinhChiRespository.UpdateTaiChinhChi(taiChinhChi);
  }

  async deleteTaiChinhChi(listJson: any[], luUserId: string): Promise<any> {
    return await this.taiChinhChiRespository.deleteTaiChinhChi(listJson, luUserId);
  }
}
