export interface IContributionDown {
  chiId: number;

  dongHoId: string;
  // danhMucId: number;  // ❌ REMOVED - không cần danh mục nữa
  // tenDanhMuc?: string;  // ❌ REMOVED

  ngayChi: Date;
  soTien: number;

  phuongThucThanhToan: string;
  noiDung: string;  // Dùng noiDung thay cho danh mục
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
