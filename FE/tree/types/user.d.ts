import { IBaseData } from "./base";

export interface IUser extends IBaseData {
  nguoiDungId: string;
  dongHoId: string;
  tenDangNhap: string;
  matKhau: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  roleId: string;
  anhDaiDien: string;
  ngayTao: Date | null;
  nguoiTaoId: string;
}

export interface IUserSearch{
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId? :string;
}

export interface IUserResetPassword{
  tenDangNhap: string;
}