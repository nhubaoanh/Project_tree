import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { nguoiDungService } from "../services/nguoidungService";
import { nguoiDung } from "../models/nguoidung";
import { generateToken } from "../config/jwt";
import { callbackify } from "util";
import { Action } from "../models/Actions";

@injectable()
export class NguoiDungController {
  constructor(private nguoiDungService: nguoiDungService) {}

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { tenDangNhap, matKhau } = req.body;
      console.log("Login request received:", { tenDangNhap, matKhau });
      const user = await this.nguoiDungService.loginUser(tenDangNhap, matKhau);

      if (user) {
        let obj: any = {
          nguoiDungId: user.nguoiDungId, 
          hoTen: user.hoTen, 
          dongHoId: user.dongHoId,
          email: user.email, 
          soDienThoai: user.soDienThoai,
          roleId: user.roleId,
          roleCode: user.roleCode,
          anhDaiDien: user.anhDaiDien,
          ngayTao: user.ngayTao,
          online_flag: user.online_flag,
        };

        const token = generateToken(obj);
        user.token = token;
        res.json(user);
      } else {
        res.json({
          message: "Sai tài khoản hoặc mật khẩu.",
          success: false,
        });
      }
    } catch (error: any) {
      console.error("Lỗi đăng nhập:", error);
      res.status(500).json({ message: "Đăng nhập thất bại.", success: false });
    }
  }

  async createNguoiDung(req: Request, res: Response): Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      const results = await this.nguoiDungService.createNguoiDung(nguoiDung);
      res.json({
        message: "Dang ky thanh cong.",
        success: true,
        data: results,
      });
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

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      var userName = req.body.tenDangNhap;
      // console.log("userName123", userName);
      // var matKhaunew = req.body.matKhaunew;
      console.log("userName", userName);
      await this.nguoiDungService.resetPassword(userName);
      res.json({
        message: "Reset password thanh cong. Vui long check email.",
        success: true,
      });
    } catch (err: any) {
      res.json({ message: err.message, success: false });
    }
  }

  async searchUser(req: Request, res: Response): Promise<void> {
    try {
      const object = req.body as {
        pageIndex: number;
        pageSize: number;
        search_content: string;
        dongHoId: string;
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

  async authorize(req: Request, res: Response): Promise<void> {
    try {
      let token = req.params.token;
      let result = await this.nguoiDungService.authrize(token);
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "Bản ghi không tồn tại.", success: true });
      }
    } catch (error: any) {
      res.json({ message: error.message, success: false });
    }
  }

  async insertUser(req: Request, res: Response) : Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      const results = await this.nguoiDungService.insertUser(nguoiDung);
      res.json({
        message : 'Them nguoi dung thanh cong',
        success : true,
        data : results
      })
    }catch (error: any) {
      console.log("error",error);
      res.status(500).json({ message: "Them nguoi dung that bai", success: false });
    }
  }

  async updateUser(req: Request, res: Response) : Promise<void> {
    try {
      const nguoiDung = req.body as nguoiDung;
      const results = await this.nguoiDungService.updateUser(nguoiDung);
      res.json({
        message : 'Cap nhat nguoi dung thanh cong',
        success : true,
        data : results
      })
    }catch (error: any) {
      console.log("error",error);
      res.status(500).json({ message: "Cap nhat nguoi dung that bai", success: false });
    }
  }

  async checkUser(req: Request, res: Response) : Promise<void> {
    try{
      const userName = req.body.userName;

      console.log("uss", userName);

      if(!userName) {
            res.status(400).json({ message: "userName is required", success: false });
            return;
        }
      const results = await this.nguoiDungService.checkUser(userName);
      console.log("results", results);

      res.json({
        message : 'check nguoi dung thanh cong',
        success : true,
        exists : results
      })
    }catch(error: any){
      res.status(500).json({ message: "check nguoi dung that bai.", success: false });
    }
  }

  async deleteUser(req: Request, res: Response):Promise<void>{
    try{
      const object = req.body as {list_json: any; updated_by_id: string};
      const results = await this.nguoiDungService.deleteUser(object.list_json, object.updated_by_id);
      res.json({message: "Đã xóa thành công.", success: true});
    }catch(error: any){
      res.status(500).json({ message: "Xoa nguoi dung that bai.", success: false });
    }
  }

}
    