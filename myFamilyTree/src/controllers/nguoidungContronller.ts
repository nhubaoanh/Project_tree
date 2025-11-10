import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { nguoiDungService } from "../services/nguoidungService";
import { nguoiDung } from "../models/nguoidung";
import { generateToken } from "../config/jwt";
import { callbackify } from "util";

@injectable()
export class nguoiDungController {
    constructor(private nguoiDungService: nguoiDungService) {}

    async createNguoiDung(req: Request, res: Response) : Promise<void> {
        try{
            const nguoiDung = req.body as nguoiDung;
            const results = await this.nguoiDungService.createNguoiDung(nguoiDung);
            res.json({message : "Dang ky thanh cong.", succes: true, data: results});
        }catch(error : any){
            throw new Error(error)
        }
    }
}