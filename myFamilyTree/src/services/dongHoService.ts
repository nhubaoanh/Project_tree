import { injectable } from "tsyringe";
import { dongHoResponsitory } from "../repositories/dongHoRespository";
import { dongHo } from "../models/dongho";

@injectable()
export class dongHoService {
    constructor(private donghoRespository : dongHoResponsitory) {}

    async searchDongHo(
        pageIndex: number,
        pageSize: number,
        search_content: string
    ): Promise<any[]> {
        console.log(pageIndex, pageSize, search_content);
        return this.donghoRespository.searchDongHo(pageIndex, pageSize, search_content);
    }

    async getAllDongHo():Promise<any> {
        return this.donghoRespository.getAllDongHo();
    }

    async createDongHo(data: Partial<dongHo>, nguoiTaoId: string): Promise<any> {
        return this.donghoRespository.createDongHo(data, nguoiTaoId);
    }

    async getDongHoById(dongHoId: string): Promise<any> {
        return this.donghoRespository.getDongHoById(dongHoId);
    }

    async updateDongHo(dongHoId: string, data: Partial<dongHo>, luUserId: string): Promise<any> {
        return this.donghoRespository.updateDongHo(dongHoId, data, luUserId);
    }

    async deleteDongHo(dongHoId: string, luUserId: string): Promise<any> {
        return this.donghoRespository.deleteDongHo(dongHoId, luUserId);
    }
}