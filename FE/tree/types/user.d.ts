import { IBaseData } from "./base";

export interface IUser extends IBaseData {
  nguoiDungId: string;
  dongHoId: string;
  tenDangNhap: string;
  matKhau: string;
  full_name: string;
  email: string;
  phone: string;
  roleId: string;
  roleCode: string;
  tenDongHo: string;
  ngayTao: Date | null;
  avatar:string;
  nguoiTaoId: string;
  gender?: number; // 0: Nữ, 1: Nam
  online_flag?: number; // 0: Offline, 1: Online
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


export interface IUserProfile {
  userId: string; // Khóa chính, nối với nguoiDungId
  first_name: string;
  middle_name: string;
  last_name: string;
  tenDangNhap: string;
  matKhau: string;
  full_name: string; // Tên đầy đủ (thường dùng để hiển thị)
  avatar: string; // Đường dẫn ảnh đại diện
  gender: number; // 0: Nữ, 1: Nam, 2: Khác
  date_of_birthday: Date | string;
  email: string;
  phone: string;
  active_flag: number; // 1: Hoạt động, 0: Đã xóa/Khóa
  created_by_user_id: string;
  create_date: Date;
  lu_updated: Date;
  lu_user_id: string;
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
