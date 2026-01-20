export interface ITinTuc {
  tinTucId: number;
  dongHoId: string;
  tieuDe: string;
  tomTat: string;
  noiDung: string;
  anhDaiDien?: string;
  ngayTao: Date;
  nguoiTao?: string;
  nguoiTaoId?: string;
  trangThai: number;
  active_flag: number;
  lu_updated: Date;
  lu_user_id: string;
}

export interface IsearchTinTuc {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId?: string;
}
