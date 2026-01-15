export interface nguoiDung {
  nguoiDungId: string;
  roleId: string;
  dongHoId: string;
  tenDangNhap: string;
  matKhau: string;
  full_name: string;
  email: string;
  phone: string;
  anhDaiDien: string;
  ngayTao: Date;
  nguoiTaoId: string;
  active_flag: number;
  lu_user_id: string;
  gender?: number; // 0: Nữ, 1: Nam, 2: Khác
  tenDongHo?: string; // Tên dòng họ (cho đăng ký)
  queQuanGoc?: string; // Quê quán gốc (cho đăng ký)
  ngayThanhLap?: string; // Ngày thành lập (cho đăng ký)
}

export interface UserProfile extends nguoiDung {
  userId: string; // Khóa chính, nối với nguoiDungId
  first_name: string;
  middle_name: string;
  last_name: string;
  tenDangNhap: string;
  matKhau: string;
  full_name: string; // Tên đầy đủ (thường dùng để hiển thị)
  avatar: string; // Đường dẫn ảnh đại diện
  gender: number; // 0: Nữ, 1: Nam, 2: Khác
  date_of_birthday: Date | string;
  email: string;
  phone: string;
  active_flag: number; // 1: Hoạt động, 0: Đã xóa/Khóa
  created_by_user_id: string;
  create_date: Date;
  lu_updated: Date;
  lu_user_id: string;
}
