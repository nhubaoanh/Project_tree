import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { dongHo } from "../models/dongho";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class dongHoResponsitory {
    constructor(private db: Database) {}

    async searchDongHo(
        pageIndex: number,
        pageSize: number,
        search_content: string
    ): Promise<any[]> {
        try {
            const sql = 'CALL SearchDongHo(?, ?, ?, @err_code, @err_msg)';
            const [result] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content || null,
            ]);
            return result;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getAllDongHo(): Promise<any> {
        try {
            const sql = 'CALL getAllDongHo(@err_code, @err_msg)';
            const result = await this.db.query(sql, []);
            console.log(result)
            return result;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async createDongHo(data: Partial<dongHo>, nguoiTaoId: string): Promise<any> {
        try {
            const dongHoId = uuidv4();
            const sql = 'CALL InsertDongHo(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                dongHoId,
                data.tenDongHo || null,
                data.queQuanGoc || null,
                data.ngayThanhLap || null,
                data.nguoiQuanLy || null,
                data.ghiChu || null,
                nguoiTaoId,
            ]);
            return { dongHoId, ...data };
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async getDongHoById(dongHoId: string): Promise<any> {
        try {
            const sql = 'CALL GetDongHoById(?, @err_code, @err_msg)';
            const [result] = await this.db.query(sql, [dongHoId]);
            return result && result.length > 0 ? result[0] : null;
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async updateDongHo(dongHoId: string, data: Partial<dongHo>, luUserId: string): Promise<any> {
        try {
            const sql = 'CALL UpdateDongHo(?, ?, ?, ?, ?, ?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [
                dongHoId,
                data.tenDongHo || null,
                data.queQuanGoc || null,
                data.ngayThanhLap || null,
                data.nguoiQuanLy || null,
                data.ghiChu || null,
                luUserId,
            ]);
            return { dongHoId, ...data };
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }

    async deleteDongHo(dongHoId: string, luUserId: string): Promise<any> {
        try {
            const sql = 'CALL DeleteDongHo(?, ?, @err_code, @err_msg)';
            await this.db.query(sql, [dongHoId, luUserId]);
            return { success: true };
        } catch (error: any) {
            console.log(error);
            throw new Error(error);
        }
    }
}