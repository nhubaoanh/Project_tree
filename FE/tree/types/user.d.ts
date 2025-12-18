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
  roleCode: string;
  anhDaiDien: string;
  tenDongHo: string;
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




// ================= Additional Types ================= //


export interface IUserss {
  nguoiDungId: string;
  dongHoId?: string;
  tenDangNhap: string;
  matKhau?: string;
  hoTen: string;
  email: string;
  soDienThoai: string;
  roleId: number;
  anhDaiDien?: string;
  ngayTao?: string | null;
  nguoiTaoId?: string;
  parentId?: string | null; // ID của cha/mẹ để xác định huyết thống
  doiThu?: number; // Đời thứ mấy trong dòng họ
}

export interface INotification {
  thongBaoId: string;
  tieuDe: string;
  noiDung: string;
  loaiThongBao: "TIN_CHUNG" | "SU_KIEN" | "TIN_BUON" | "TIN_VUI";
  ngayTao: string;
  nguoiTao: string;
  uuTien: boolean;
}

export interface ITransaction {
  giaoDichId: string;
  loaiGiaoDich: "THU" | "CHI";
  soTien: number;
  moTa: string;
  ngayGiaoDich: string;
  nguoiThucHien: string;
  hangMuc: string;
}

export interface IComment {
  binhLuanId: string;
  doiTuongId: string; // ID của Thông báo hoặc Giao dịch
  nguoiBinhLuan: string;
  noiDung: string;
  ngayTao: string;
}

export interface IMessage {
  tinNhanId: string;
  nguoiGui: string;
  nguoiGuiId: string;
  noiDung: string;
  ngayGui: string;
}

export interface IUserSearch {
  search_content?: string;
  pageIndex: number;
  pageSize: number;
  dongHoId?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalRecords: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiResult<T> {
  code: number;
  message: string;
  data: T;
}
