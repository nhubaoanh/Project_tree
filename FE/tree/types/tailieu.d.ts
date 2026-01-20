export interface ITaiLieu {
  taiLieuId: number;
  dongHoId: string;
  tenTaiLieu: string;
  loaiTaiLieu: string;
  duongDanFile?: string;
  kichThuoc?: number;
  moTa?: string;
  ngayTao: Date;
  nguoiTao?: string;
  nguoiTaoId?: string;
  trangThai: number;
  active_flag: number;
  lu_updated: Date;
  lu_user_id: string;
}

export interface IsearchTaiLieu {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId?: string;
}
