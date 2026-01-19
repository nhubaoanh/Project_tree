export interface IMember {
  thanhVienId: number;
  dongHoId: string;
  hoTen: string;
  gioiTinh: number;
  ngaySinh: Date;
  ngayMat: Date;
  noiSinh: string;
  noiMat: string;
  ngheNghiep: string;
  trinhDoHocVan: string;
  soDienThoai: string;
  diaChiHienTai: string;
  tieuSu: string;
  anhChanDung: string;
  doiThuoc: number;
  chaId: number;
  meId: number;
  voId: number;
  chongId: number;
  ngayTao: Date;
  trangthai: number;
  active_flag: number;
  lu_user_id: string;
}

export interface IMemberSearch {
  pageIndex?: number;
  pageSize?: number;
  search_content?: string;
  dongHoId?: string;
  thanhVienId?: number;
}

// Interface for Excel import - extends IMember but with string dates for parsing
export interface IMemberImport extends Omit<IMember, 'ngaySinh' | 'ngayMat' | 'ngayTao' | 'thanhVienId'> {
  stt: number | null; // STT from Excel, will be mapped to thanhVienId
  ngaySinh: string | null; // String for Excel parsing
  ngayMat: string | null; // String for Excel parsing
  chaId: number | null; // Allow null for IDs
  meId: number | null; // Allow null for IDs
  voId: number | null; // Allow null for IDs
  chongId: number | null; // Allow null for IDs
}
