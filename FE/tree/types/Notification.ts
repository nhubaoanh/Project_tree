export interface INotification {
  thongBaoId: string;
  tieuDe: string;
  noiDung: string;
  loaiThongBao: "TIN_CHUNG" | "SU_KIEN" | "TIN_BUON" | "TIN_VUI";
  ngayTao: string;
  nguoiTao: string;
  uuTien: boolean;
}

export interface IComment {
  binhLuanId: string;
  doiTuongId: string; // ID của Thông báo hoặc Giao dịch
  nguoiBinhLuan: string;
  noiDung: string;
  ngayTao: string;
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

export interface ITransaction {
  giaoDichId: string;
  loaiGiaoDich: "THU" | "CHI";
  soTien: number;
  moTa: string;
  ngayGiaoDich: string;
  nguoiThucHien: string;
  hangMuc: string;
}
export interface IMessage {
  tinNhanId: string;
  nguoiGui: string;
  nguoiGuiId: string;
  noiDung: string;
  ngayGui: string;
}