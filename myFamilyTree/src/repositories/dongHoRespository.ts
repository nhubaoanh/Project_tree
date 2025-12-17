import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { dongHo } from "../models/dongho";

@injectable()
export class dongHoResponsitory {
    constructor(private db: Database) {}

    async searchDongHo (
        pageIndex: number,
        pageSize: number,
        search_content: string
    ): Promise<any[]> {
        try{
            const sql = 'CALL SearchDongHo(?,?,? , @err_code, @err_msg)';
            const [result] = await this.db.query(sql, [
                pageIndex,
                pageSize,
                search_content || null,
            ]);

            console.log(result);

            return result;
        }catch(error: any) {
            console.log(error)
            throw new Error(error);
        }
    }


    async getAllDongHo () :Promise<any> {
        try{
            const sql = 'CALL getAllDongHo(@err_code, @err_msg)';
            const result = await this.db.query(sql, []);
            return result;
        }catch(error: any) {
            console.log(error)
            throw new Error(error);
        }
    }
}