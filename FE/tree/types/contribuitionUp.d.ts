export interface taiChinhThu {
  thuId: number;

  dongHoId: string;
  danhMucId: number;
  tenDanhMuc?: string;

  hoTenNguoiDong: string;
  ngayDong: Date;
  soTien: number;

  phuongThucThanhToan: string;
  noiDung: string;
  ghiChu: string;

  nguoiNhapId: string;
  hoTenNguoiNhap?: string;
  soDienThoaiNguoiNhap?: string;

  ngayTao: Date;
  active_flag: number;
  lu_updated: Date;
  lu_user_id: string;
}
