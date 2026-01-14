export interface IContributionUp {
  thuId: number;

  dongHoId: string;
  // danhMucId: number;  // ❌ REMOVED - không cần danh mục nữa
  // tenDanhMuc?: string;  // ❌ REMOVED

  hoTenNguoiDong: string;
  ngayDong?: Date;
  soTien: number;

  phuongThucThanhToan: string;
  noiDung: string;  // Dùng noiDung thay cho danh mục
  ghiChu: string;

  nguoiNhapId: string;
  full_name?: string;
  soDienThoaiNguoiNhap?: string;

  ngayTao: Date;
  active_flag: number;
  lu_updated: Date;
  lu_user_id: string;
}

export interface IsearchContributionUp {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId?: string;
}
