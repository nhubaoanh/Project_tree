import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { nguoiDungService } from "../services/nguoidungService";
import { nguoiDung } from "../models/nguoidung";
import { generateToken } from "../config/jwt";
import { callbackify } from "util";

@injectable()
export class NguoiDungController {
  constructor(private nguoiDungService: nguoiDungService) {}

  async loginUser(req: Request, res: Response): Promise<void> {
    try{
      const { tenDangNhap, matKhau } = req.body;
      console.log("Login request received:", { tenDangNhap, matKhau });
      const user = await this.nguoiDungService.loginUser(tenDangNhap, matKhau);

      console.log("User in controller after service call:", user);
      if(user.success){

        let obj: any = {};
        obj.user_id = user.nguoiDungId,
        obj.full_name = user.hoTen,
        obj.user_name = user.tenDangNhap,
        obj.role = user.vaiTro,
        obj.dongHoId = user.dongHoId
        const token = generateToken(obj);

        console.log("acđ", token)
        user.token = token;
        console.log("Generated token:",user.token);
        res.json({...user, token: token, message: "Đăng nhập thành công!", success: true});
      }else{
        res.status(401).json({message: user.message, success: false});
      }
    }catch(error:any){
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({message: "Đăng nhập thất bại.", success: false});
    }
  }


  async createNguoiDung(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      const results = await this.nguoiDungService.createNguoiDung(nguoiDung);
      res.json({ message: "Dang ky thanh cong.", success: true, data: results });
      console.log(results);
    } catch (error: any) {
      // res.json({ message: error.message, success: false });
      console.error("Lỗi đăng ký:", error); // ← Log để debug
      res.status(500).json({
        message: error.message || "Đăng ký thất bại.",
        success: false,
      });
    }
  }


  async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex:number,
        pageSize:number,
        search_content: string,
        dongHoId: string
      };

      const data: any = await this.nguoiDungService.searchUser(
        object.pageIndex,
        object.pageSize,
        object.search_content,
        object.dongHoId
      );
      if (data) {
        res.json({
          totalItems: Math.ceil(
            data && data.length > 0 ? data[0].RecordCount : 0
          ),
          page: object.pageIndex,
          pageSize: object.pageSize,
          data: data,
          pageCount: Math.ceil(
            (data && data.length > 0 ? data[0].RecordCount : 0) /
              (object.pageSize ? object.pageSize : 1)
          ),
        });
      } else {
        res.json({ message: "Không tồn tại kết quả tìm kiếm.", success: true });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Không tồn tại kết quả tìm kiếm.", success: false });
    }
  }
}
