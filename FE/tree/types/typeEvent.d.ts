export interface ITypeEvent {
  loaiSuKien: number;
  tenLoaiSuKien: string;
  lu_user_id: string;
  nguoiTaoId: string;
}

export interface IsearchTypeEvent {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
}
