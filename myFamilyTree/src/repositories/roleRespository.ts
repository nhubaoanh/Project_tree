import { injectable } from "tsyringe";
import { Database } from "../config/database";
import { Role } from "../models/role";

@injectable()
export class roleRespository {
    constructor(private db: Database){}

    async getAllRole () : Promise<any> {
        try{
           const sql = 'CALL getAllRole(@err_code, @err_mgs)';
           const result = await this.db.query(sql, []);
            return result
        }catch(err: any){
            throw new Error(err);
        }
    }
}