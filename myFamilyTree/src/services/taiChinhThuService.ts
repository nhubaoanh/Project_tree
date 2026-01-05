import { taiChinhThu } from "../models/TaiChinhThu";
import { taiChinhThuRespository } from "../repositories/taiChinhThuRespository";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class taiChinhThuService {
  constructor(private taiChinhThuRespository: taiChinhThuRespository) {}
  async searchTaiChinhThu(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string
  ): Promise<any> {
    return await this.taiChinhThuRespository.searchTaiChinhThu(
      pageIndex,
      pageSize,
      search_content,
      dongHoId
    );
  }

  async createTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
      return await this.taiChinhThuRespository.createTaiChinhThu(taiChinhThu);
    }

    async updateTaiChinhThu(taiChinhThu: taiChinhThu): Promise<any> {
      return await this.taiChinhThuRespository.UpdateTaiChinhThu(taiChinhThu);
    }

    async deleteTaiChinhThu(listJson: any[], luUserId: string): Promise<any> {
      return await this.taiChinhThuRespository.deleteTaiChinhThu(listJson, luUserId);
    }
}
