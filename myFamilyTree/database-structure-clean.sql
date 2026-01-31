-- ============================================================================
-- DATABASE: treefamily
-- Cấu trúc database quản lý gia phả
-- ============================================================================

-- Bảng chức năng
CREATE TABLE `chucnang` (
  `chucNangId` varchar(50) NOT NULL,
  `chucNangCode` varchar(50) NOT NULL COMMENT 'Mã chức năng: SUKIEN, TAICHINH, TAILIEU...',
  `tenChucNang` varchar(100) NOT NULL COMMENT 'Tên hiển thị: Quản lý sự kiện',
  `moTa` varchar(255) DEFAULT NULL,
  `parentId` varchar(50) DEFAULT NULL COMMENT 'Chức năng cha (nếu có)',
  `icon` varchar(50) DEFAULT NULL COMMENT 'Icon hiển thị',
  `duongDan` varchar(100) DEFAULT NULL COMMENT 'URL path: /admin/events',
  `thuTu` int DEFAULT '0' COMMENT 'Thứ tự hiển thị',
  `active_flag` tinyint DEFAULT '1',
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`chucNangId`),
  UNIQUE KEY `uk_chucnang_code` (`chucNangCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng dòng họ
CREATE TABLE `dongho` (
  `dongHoId` varchar(50) NOT NULL,
  `tenDongHo` varchar(255) DEFAULT NULL,
  `queQuanGoc` varchar(255) DEFAULT NULL,
  `ngayThanhLap` date DEFAULT NULL,
  `nguoiQuanLy` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  PRIMARY KEY (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng loại quan hệ
CREATE TABLE `loaiquanhe` (
  `loaiQuanHeId` varchar(50) NOT NULL,
  `tenLoaiQuanHe` varchar(100) DEFAULT NULL,
  `moTa` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`loaiQuanHeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng loại sự kiện
CREATE TABLE `loaisukien` (
  `loaiSuKien` int NOT NULL,
  `tenLoaiSuKien` varchar(200) DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `active_flag` int DEFAULT NULL,
  PRIMARY KEY (`loaiSuKien`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng role
CREATE TABLE `role` (
  `roleId` varchar(50) NOT NULL,
  `roleCode` varchar(50) DEFAULT NULL,
  `roleName` varchar(100) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `createDate` varchar(50) DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng người dùng
CREATE TABLE `nguoidung` (
  `nguoiDungId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `roleId` varchar(50) DEFAULT NULL,
  `tenDangNhap` varchar(100) NOT NULL,
  `matKhau` varchar(255) DEFAULT NULL,
  `ngayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `online_flag` tinyint DEFAULT '0',
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`nguoiDungId`),
  UNIQUE KEY `tenDangNhap` (`tenDangNhap`),
  KEY `roleId` (`roleId`),
  KEY `dongHoId` (`dongHoId`),
  CONSTRAINT `nguoidung_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE SET NULL,
  CONSTRAINT `nguoidung_ibfk_2` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng thành viên
CREATE TABLE `thanhvien` (
  `thanhVienId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `hoTen` varchar(255) DEFAULT NULL,
  `gioiTinh` tinyint DEFAULT '0',
  `ngaySinh` date DEFAULT NULL,
  `ngayMat` date DEFAULT NULL,
  `noiSinh` varchar(255) DEFAULT NULL,
  `noiMat` varchar(255) DEFAULT NULL,
  `ngheNghiep` varchar(255) DEFAULT NULL,
  `trinhDoHocVan` varchar(255) DEFAULT NULL,
  `soDienThoai` varchar(11) DEFAULT NULL,
  `diaChiHienTai` varchar(255) DEFAULT NULL,
  `tieuSu` text,
  `anhChanDung` varchar(255) DEFAULT NULL,
  `doiThuoc` int DEFAULT NULL,
  `chaId` int DEFAULT NULL,
  `meId` int DEFAULT NULL,
  `voId` int DEFAULT NULL,
  `chongId` int DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`dongHoId`,`thanhVienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `chaId` (`chaId`),
  KEY `meId` (`meId`),
  KEY `voId` (`voId`),
  KEY `chongId` (`chongId`),
  KEY `fk_thanhvien_cha` (`dongHoId`,`chaId`),
  KEY `fk_thanhvien_me` (`dongHoId`,`meId`),
  KEY `idx_thanhvien_dongho` (`dongHoId`),
  KEY `idx_thanhvien_hoten` (`dongHoId`,`hoTen`),
  KEY `idx_thanhvien_doithuoc` (`dongHoId`,`doiThuoc`),
  CONSTRAINT `fk_thanhvien_cha` FOREIGN KEY (`dongHoId`, `chaId`) REFERENCES `thanhvien` (`dongHoId`, `thanhVienId`) ON DELETE RESTRICT,
  CONSTRAINT `fk_thanhvien_me` FOREIGN KEY (`dongHoId`, `meId`) REFERENCES `thanhvien` (`dongHoId`, `thanhVienId`) ON DELETE RESTRICT,
  CONSTRAINT `thanhvien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng quan hệ
CREATE TABLE `quanhe` (
  `quanHeId` varchar(50) NOT NULL,
  `thanhVien1Id` int DEFAULT NULL,
  `thanhVien2Id` int DEFAULT NULL,
  `loaiQuanHeId` varchar(50) DEFAULT NULL,
  `ngayBatDau` date DEFAULT NULL,
  `ngayKetThuc` date DEFAULT NULL,
  `ghiChu` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `dongHoId1` varchar(50) DEFAULT NULL,
  `dongHoId2` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`quanHeId`),
  KEY `thanhVien1Id` (`thanhVien1Id`),
  KEY `thanhVien2Id` (`thanhVien2Id`),
  KEY `loaiQuanHeId` (`loaiQuanHeId`),
  CONSTRAINT `quanhe_ibfk_3` FOREIGN KEY (`loaiQuanHeId`) REFERENCES `loaiquanhe` (`loaiQuanHeId`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng thao tác
CREATE TABLE `thaotac` (
  `thaoTacId` varchar(50) NOT NULL,
  `thaoTacCode` varchar(50) NOT NULL COMMENT 'Mã thao tác: VIEW, CREATE, UPDATE, DELETE',
  `tenThaoTac` varchar(100) NOT NULL COMMENT 'Tên: Xem, Thêm, Sửa, Xóa',
  `moTa` varchar(255) DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  PRIMARY KEY (`thaoTacId`),
  UNIQUE KEY `uk_thaotac_code` (`thaoTacCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng role_chucnang
CREATE TABLE `role_chucnang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` varchar(50) NOT NULL,
  `chucNangId` varchar(50) NOT NULL,
  `thaoTacId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL COMMENT 'NULL = tất cả dòng họ, có giá trị = chỉ dòng họ đó',
  `active_flag` tinyint DEFAULT '1',
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_chucnang` (`roleId`,`chucNangId`,`thaoTacId`,`dongHoId`),
  KEY `fk_rc_role` (`roleId`),
  KEY `fk_rc_chucnang` (`chucNangId`),
  KEY `fk_rc_thaotac` (`thaoTacId`),
  CONSTRAINT `fk_rc_chucnang` FOREIGN KEY (`chucNangId`) REFERENCES `chucnang` (`chucNangId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_thaotac` FOREIGN KEY (`thaoTacId`) REFERENCES `thaotac` (`thaoTacId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng sự kiện
CREATE TABLE `sukien` (
  `suKienId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `tenSuKien` varchar(255) DEFAULT NULL,
  `ngayDienRa` date DEFAULT NULL,
  `gioDienRa` time DEFAULT NULL,
  `diaDiem` varchar(255) DEFAULT NULL,
  `moTa` text,
  `lapLai` tinyint DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `loaiSuKien` int DEFAULT NULL,
  `uuTien` int DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`suKienId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `nguoiTaoId` (`nguoiTaoId`),
  KEY `fk_sukien_loaisukien` (`loaiSuKien`),
  CONSTRAINT `fk_sukien_loaisukien` FOREIGN KEY (`loaiSuKien`) REFERENCES `loaisukien` (`loaiSuKien`),
  CONSTRAINT `sukien_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE,
  CONSTRAINT `sukien_ibfk_3` FOREIGN KEY (`nguoiTaoId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng tài chính chi
CREATE TABLE `taichinhchi` (
  `chiId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `ngayChi` date DEFAULT NULL,
  `soTien` decimal(18,2) DEFAULT NULL,
  `phuongThucThanhToan` varchar(100) DEFAULT NULL,
  `noiDung` text,
  `nguoiNhan` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `ngayTao` datetime DEFAULT NULL,
  `nguoiNhapId` varchar(50) DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`chiId`,`dongHoId`),
  KEY `dongHoId` (`dongHoId`),
  KEY `nguoiNhapId` (`nguoiNhapId`),
  CONSTRAINT `taichinhchi_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`),
  CONSTRAINT `taichinhchi_ibfk_3` FOREIGN KEY (`nguoiNhapId`) REFERENCES `nguoidung` (`nguoiDungId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng tài chính thu
CREATE TABLE `taichinhthu` (
  `thuId` int NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `hoTenNguoiDong` varchar(255) DEFAULT NULL,
  `ngayDong` date DEFAULT NULL,
  `soTien` decimal(18,2) DEFAULT NULL,
  `phuongThucThanhToan` varchar(100) DEFAULT NULL,
  `noiDung` text,
  `ghiChu` text,
  `nguoiNhapId` varchar(50) DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`thuId`,`dongHoId`),
  KEY `nguoiNhapId` (`nguoiNhapId`),
  KEY `taichinhthu_ibfk_1` (`dongHoId`),
  CONSTRAINT `taichinhthu_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`),
  CONSTRAINT `taichinhthu_ibfk_3` FOREIGN KEY (`nguoiNhapId`) REFERENCES `nguoidung` (`nguoiDungId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng tài liệu
CREATE TABLE `tailieu` (
  `taiLieuId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `tenTaiLieu` varchar(255) NOT NULL,
  `duongDan` varchar(255) DEFAULT NULL,
  `moTa` text,
  `loaiTaiLieu` varchar(100) DEFAULT NULL,
  `namSangTac` int DEFAULT NULL,
  `tacGia` varchar(255) DEFAULT NULL,
  `nguonGoc` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `ngayTaiLen` date DEFAULT NULL,
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`taiLieuId`),
  KEY `idx_tailieu_dongho` (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng thế hệ
CREATE TABLE `thehe` (
  `theHeId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL,
  `soDoi` int DEFAULT NULL,
  `moTa` text,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`theHeId`),
  KEY `dongHoId` (`dongHoId`),
  CONSTRAINT `thehe_ibfk_1` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng thông báo
CREATE TABLE `thongbao` (
  `thongBaoId` varchar(50) NOT NULL,
  `nguoiNhanId` varchar(50) DEFAULT NULL,
  `suKienId` varchar(50) DEFAULT NULL,
  `tieuDe` varchar(255) DEFAULT NULL,
  `noiDung` text,
  `loaiThongBao` tinyint DEFAULT '0',
  `daDoc` tinyint(1) DEFAULT '0',
  `ngayGui` datetime DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`thongBaoId`),
  KEY `nguoiNhanId` (`nguoiNhanId`),
  KEY `suKienId` (`suKienId`),
  CONSTRAINT `thongbao_ibfk_1` FOREIGN KEY (`nguoiNhanId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE CASCADE,
  CONSTRAINT `thongbao_ibfk_2` FOREIGN KEY (`suKienId`) REFERENCES `sukien` (`suKienId`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng tin tức
CREATE TABLE `tintuc` (
  `tinTucId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `noiDung` text,
  `tomTat` varchar(500) DEFAULT NULL,
  `anhDaiDien` varchar(255) DEFAULT NULL,
  `tacGia` varchar(255) DEFAULT NULL,
  `ngayDang` datetime DEFAULT CURRENT_TIMESTAMP,
  `luotXem` int DEFAULT '0',
  `ghim` tinyint DEFAULT '0',
  `active_flag` tinyint DEFAULT '1',
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tinTucId`),
  KEY `idx_tintuc_dongho` (`dongHoId`),
  KEY `idx_tintuc_ngaydang` (`ngayDang`),
  CONSTRAINT `fk_tintuc_dongho` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Bảng user profile
CREATE TABLE `user_profile` (
  `userId` char(36) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `middle_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `full_name` varchar(150) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL COMMENT '0: Nữ, 1: Nam, 2: Khác',
  `date_of_birthday` date DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `active_flag` tinyint DEFAULT NULL,
  `created_by_user_id` varchar(50) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  CONSTRAINT `fk_profile_system_user` FOREIGN KEY (`userId`) REFERENCES `nguoidung` (`nguoiDungId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
