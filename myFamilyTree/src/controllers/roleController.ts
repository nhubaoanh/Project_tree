import { roleService } from "../services/roleService";
import { Request, Response } from "express";
import { injectable } from "tsyringe";

@injectable()
export class roleController{
    constructor(private role: roleService){}

    async getAllRole(req: Request, res: Response) : Promise<void> {
        try{
            const result = await this.role.getAllRole();

            res.status(200).json({
                message: 'get all role success',
                success: true,
                data: result[0],
            })
        }catch(err: any){
            res.status(500).json({message : 'server bi eror'});
        }
    }
}