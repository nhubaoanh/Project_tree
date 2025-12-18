export interface IContributionDown {
  chiId: number;

  dongHoId: string;
  danhMucId: number;
  tenDanhMuc?: string;

  ngayChi: Date;
  soTien: number;

  phuongThucThanhToan: string;
  noiDung: string;
  nguoiNhan: string;
  ghiChu: string;

  nguoiNhapId: string;
  hoTenNguoiNhap?: string;
  soDienThoaiNguoiNhap?: string;

  ngayTao: Date;
  active_flag: number;
  lu_updated: Date;
  lu_user_id: string;
}

export interface IsearchContributionDown {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId?: string;
}
