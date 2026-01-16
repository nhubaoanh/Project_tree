export interface IEvent {
  suKienId: string;
  dongHoId: string;
  thanhVienId: number;
  tenSuKien: string;
  ngayDienRa: Date;
  gioDienRa: string;
  diaDiem: string;
  moTa: string;
  lapLai: number;
  trangThai: number;
  nguoiTaoId: string;
  active_flag: number;
  lu_user_id: string;
  tenLoaiSuKien: string;
  loaiSuKien: number;
  hoTen: string;
  uuTien: number;
  full_name: string;
}

export interface IsearchEvent {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId?: string;
}
