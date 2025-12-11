import { suKien } from "../models/sukien";
import { suKienRespository } from "../repositories/suKienRespository";
import { injectable } from "tsyringe";

@injectable()
export class suKienService {
  constructor(private suKienRespository: suKienRespository) {}
  async searchSuKien(
    pageIndex: number,
    pageSize: number,
    search_content: string,
    dongHoId: string,
  ): Promise<any> {
    return await this.suKienRespository.searchSuKien(
      pageIndex,
      pageSize,
      search_content,
      dongHoId,
    );
  }
}