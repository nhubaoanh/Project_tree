import { injectable } from "tsyringe";
import { cayGiaPha } from "../models/caygiapha";
import { Database } from "../config/database";  

@injectable()
export class cayGiaPhaRepository{
    constructor(private db : Database) {}

    async createCayGiaPha(cayGiaPha : cayGiaPha) : Promise<any> {
        try{
            const sql = 'CALL insertCayGiaPha'
        }catch(error : any){
            throw new Error(error)
        }
    }
}