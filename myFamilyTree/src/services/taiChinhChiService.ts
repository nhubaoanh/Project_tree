import { taiChinhChi } from "../models/TaiChinhChi";
import { taiChinhChiRespository } from "../repositories/taiChinhChiRespository";
import { injectable } from "tsyringe";
import { v4 as uuidv4 } from "uuid";

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
}
