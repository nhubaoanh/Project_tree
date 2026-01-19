export interface thanhVien {
  thanhVienId: number;
  dongHoId: string;
  hoTen: string;
  gioiTinh: string;
  ngaySinh: Date;
  ngayMat: Date;
  noiSinh: string;
  noiMat: string;
  ngheNghiep: string;
  trinhDoHocVan: string;
  diaChiHienTai: string;
  soDienThoai: string;
  tieuSu: string;
  anhChanDung: string;
  doiThuoc: number;
  chaId: number | null; // sửa lại
  meId: number | null; // sửa lại
  voId: number | null; // sửa lại
  chongId: number | null;
  nguoiTaoId: string;
  ngayTao: Date;
  trangthai: number;
  active_flag: number;
  lu_user_id: string;
}