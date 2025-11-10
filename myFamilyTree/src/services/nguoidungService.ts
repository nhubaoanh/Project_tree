import { injectable } from "tsyringe";
import { nguoiDungReponsitory } from "../repositories/nguoidungResponsitory";
import { nguoiDung } from "../models/nguoidung";
import { v4 as uuidv4 } from "uuid";

var md5 = require("md5");

@injectable()
export class nguoiDungService {
    constructor(
        private nguoidungResponsitory: nguoiDungReponsitory 
    ){}

    async createNguoiDung (nguoiDung: nguoiDung) : Promise<any>{
        nguoiDung.nguoiDungId = uuidv4();
        nguoiDung.tenDangNhap = nguoiDung.tenDangNhap.toLowerCase();
        nguoiDung.matKhau = md5(nguoiDung.matKhau);
        return this.nguoidungResponsitory.logUpUser(nguoiDung);
    }
}