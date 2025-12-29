-- =====================================================
-- DATABASE SCHEMA - HỆ THỐNG GIA PHẢ v13
-- Bao gồm: Cấu trúc bảng + Hệ thống phân quyền
-- Ngày tạo: 2025-12-29
-- =====================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =====================================================
-- PHẦN 1: CÁC BẢNG CƠ BẢN
-- =====================================================

-- 1.1 BẢNG ROLE (Vai trò)
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleId` varchar(50) NOT NULL,
  `roleCode` varchar(50) NOT NULL COMMENT 'Mã role: sa, thudo, thanhvien',
  `roleName` varchar(100) DEFAULT NULL COMMENT 'Tên hiển thị',
  `description` varchar(255) DEFAULT NULL,
  `active_flag` tinyint DEFAULT 1,
  `createDate` varchar(50) DEFAULT NULL,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`roleId`),
  UNIQUE KEY `uk_role_code` (`roleCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dữ liệu role mặc định
INSERT INTO `role` (`roleId`, `roleCode`, `roleName`, `description`, `active_flag`, `createDate`, `nguoiTaoId`) VALUES
('c2ed095e-c905-11f0-8020-a8934a9bae74', 'sa', 'Quản trị hệ thống', 'Super Admin - Có tất cả quyền trên tất cả dòng họ', 1, NOW(), 'system'),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'thudo', 'Thư đồ', 'Admin dòng họ - Quản lý dòng họ của mình', 1, NOW(), 'system'),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'thanhvien', 'Thành viên', 'Thành viên - Chỉ có quyền xem', 1, NOW(), 'system');

-- 1.2 BẢNG DÒNG HỌ
DROP TABLE IF EXISTS `dongho`;
CREATE TABLE `dongho` (
  `dongHoId` varchar(50) NOT NULL,
  `tenDongHo` varchar(255) DEFAULT NULL,
  `queQuanGoc` varchar(255) DEFAULT NULL,
  `ngayThanhLap` date DEFAULT NULL,
  `nguoiQuanLy` varchar(255) DEFAULT NULL,
  `ghiChu` text,
  `active_flag` tinyint DEFAULT 1,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  `ngayTao` datetime DEFAULT NULL,
  PRIMARY KEY (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 1.3 BẢNG NGƯỜI DÙNG
DROP TABLE IF EXISTS `nguoidung`;
CREATE TABLE `nguoidung` (
  `nguoiDungId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL COMMENT 'Dòng họ mà user thuộc về',
  `roleId` varchar(50) DEFAULT NULL,
  `tenDangNhap` varchar(100) NOT NULL,
  `matKhau` varchar(255) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` tinyint DEFAULT NULL,
  `date_of_birthday` date DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `ngayTao` datetime DEFAULT CURRENT_TIMESTAMP,
  `online_flag` tinyint DEFAULT 0,
  `active_flag` tinyint DEFAULT 1,
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

-- =====================================================
-- PHẦN 2: HỆ THỐNG PHÂN QUYỀN
-- =====================================================

-- 2.1 BẢNG CHỨC NĂNG (Function/Menu)
DROP TABLE IF EXISTS `chucnang`;
CREATE TABLE `chucnang` (
  `chucNangId` varchar(50) NOT NULL,
  `chucNangCode` varchar(50) NOT NULL COMMENT 'Mã chức năng: SUKIEN, TAICHINH, TAILIEU...',
  `tenChucNang` varchar(100) NOT NULL COMMENT 'Tên hiển thị: Quản lý sự kiện',
  `moTa` varchar(255) DEFAULT NULL,
  `parentId` varchar(50) DEFAULT NULL COMMENT 'Chức năng cha (nếu có)',
  `icon` varchar(50) DEFAULT NULL COMMENT 'Icon hiển thị',
  `duongDan` varchar(100) DEFAULT NULL COMMENT 'URL path: /admin/events',
  `thuTu` int DEFAULT 0 COMMENT 'Thứ tự hiển thị',
  `active_flag` tinyint DEFAULT 1,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`chucNangId`),
  UNIQUE KEY `uk_chucnang_code` (`chucNangCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 2.2 BẢNG THAO TÁC (Action)
DROP TABLE IF EXISTS `thaotac`;
CREATE TABLE `thaotac` (
  `thaoTacId` varchar(50) NOT NULL,
  `thaoTacCode` varchar(50) NOT NULL COMMENT 'Mã thao tác: VIEW, CREATE, UPDATE, DELETE',
  `tenThaoTac` varchar(100) NOT NULL COMMENT 'Tên: Xem, Thêm, Sửa, Xóa',
  `moTa` varchar(255) DEFAULT NULL,
  `active_flag` tinyint DEFAULT 1,
  PRIMARY KEY (`thaoTacId`),
  UNIQUE KEY `uk_thaotac_code` (`thaoTacCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 2.3 BẢNG PHÂN QUYỀN ROLE - CHỨC NĂNG - THAO TÁC
DROP TABLE IF EXISTS `role_chucnang`;
CREATE TABLE `role_chucnang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` varchar(50) NOT NULL,
  `chucNangId` varchar(50) NOT NULL,
  `thaoTacId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL COMMENT 'NULL = theo dongHoId của user, có giá trị = chỉ dòng họ đó',
  `active_flag` tinyint DEFAULT 1,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rc_role` (`roleId`),
  KEY `fk_rc_chucnang` (`chucNangId`),
  KEY `fk_rc_thaotac` (`thaoTacId`),
  CONSTRAINT `fk_rc_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_chucnang` FOREIGN KEY (`chucNangId`) REFERENCES `chucnang` (`chucNangId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_thaotac` FOREIGN KEY (`thaoTacId`) REFERENCES `thaotac` (`thaoTacId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =====================================================
-- PHẦN 3: DỮ LIỆU MẪU CHO PHÂN QUYỀN
-- =====================================================

-- 3.1 Thao tác cơ bản
INSERT INTO `thaotac` (`thaoTacId`, `thaoTacCode`, `tenThaoTac`, `moTa`) VALUES
('TT001', 'VIEW', 'Xem', 'Quyền xem dữ liệu'),
('TT002', 'CREATE', 'Thêm mới', 'Quyền thêm dữ liệu'),
('TT003', 'UPDATE', 'Cập nhật', 'Quyền sửa dữ liệu'),
('TT004', 'DELETE', 'Xóa', 'Quyền xóa dữ liệu'),
('TT005', 'EXPORT', 'Xuất file', 'Quyền xuất Excel/PDF'),
('TT006', 'IMPORT', 'Nhập file', 'Quyền nhập từ Excel');

-- 3.2 Chức năng hệ thống
INSERT INTO `chucnang` (`chucNangId`, `chucNangCode`, `tenChucNang`, `moTa`, `duongDan`, `thuTu`) VALUES
('CN001', 'DASHBOARD', 'Trang chủ', 'Dashboard tổng quan', '/dashboard', 1),
('CN002', 'THANHVIEN', 'Quản lý thành viên', 'Quản lý thành viên dòng họ', '/family-trees', 2),
('CN003', 'SUKIEN', 'Quản lý sự kiện', 'Quản lý sự kiện dòng họ', '/manageEvents', 3),
('CN004', 'TAICHINH', 'Quản lý tài chính', 'Quản lý thu chi', '/contributions', 4),
('CN005', 'TAILIEU', 'Quản lý tài liệu', 'Quản lý phả ký, tài liệu', '/documents', 5),
('CN006', 'TINTUC', 'Quản lý tin tức', 'Quản lý tin tức, thông báo', '/manage-news', 6),
('CN007', 'NGUOIDUNG', 'Quản lý người dùng', 'Quản lý tài khoản', '/users', 7),
('CN008', 'DONGHO', 'Quản lý dòng họ', 'Quản lý thông tin dòng họ', '/lineage', 8),
('CN009', 'PHANQUYEN', 'Phân quyền', 'Quản lý role và quyền', '/roles', 9);

-- =====================================================
-- PHẦN 4: PHÂN QUYỀN CHO TỪNG ROLE
-- =====================================================

-- 4.1 Role: sa (Quản trị hệ thống) - CÓ TẤT CẢ QUYỀN, TẤT CẢ DÒNG HỌ
INSERT INTO `role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`) 
SELECT 'c2ed095e-c905-11f0-8020-a8934a9bae74', cn.chucNangId, tt.thaoTacId, NULL
FROM `chucnang` cn
CROSS JOIN `thaotac` tt
WHERE cn.active_flag = 1 AND tt.active_flag = 1;

-- 4.2 Role: thudo (Thư đồ) - CRUD trên dòng họ của mình
INSERT INTO `role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`) VALUES
-- Dashboard (xem)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN001', 'TT001', NULL),
-- Thành viên (CRUD)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT004', NULL),
-- Sự kiện (CRUD)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT004', NULL),
-- Tài chính (CRUD)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT004', NULL),
-- Tài liệu (CRUD)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT004', NULL),
-- Tin tức (CRUD)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT004', NULL),
-- Người dùng (CRUD)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN007', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN007', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN007', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN007', 'TT004', NULL);

-- 4.3 Role: thanhvien (Thành viên) - CHỈ XEM
INSERT INTO `role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`) VALUES
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN001', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN002', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN003', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN005', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN006', 'TT001', NULL);

-- =====================================================
-- PHẦN 5: STORED PROCEDURES
-- =====================================================

-- 5.1 Kiểm tra quyền
DROP PROCEDURE IF EXISTS `CheckPermission`;
DELIMITER //
CREATE PROCEDURE `CheckPermission`(
  IN p_nguoiDungId VARCHAR(50),
  IN p_chucNangCode VARCHAR(50),
  IN p_thaoTacCode VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  OUT p_hasPermission TINYINT,
  OUT p_error_code INT,
  OUT p_error_message VARCHAR(500)
)
BEGIN
  DECLARE v_roleId VARCHAR(50);
  DECLARE v_userDongHoId VARCHAR(50);
  DECLARE v_roleCode VARCHAR(50);
  DECLARE v_count INT DEFAULT 0;
  
  SET p_error_code = 0;
  SET p_error_message = '';
  SET p_hasPermission = 0;
  
  -- Lấy thông tin user
  SELECT roleId, dongHoId INTO v_roleId, v_userDongHoId
  FROM nguoidung 
  WHERE nguoiDungId = p_nguoiDungId AND active_flag = 1;
  
  IF v_roleId IS NULL THEN
    SET p_error_code = 1;
    SET p_error_message = 'Người dùng không tồn tại hoặc đã bị khóa';
    LEAVE;
  END IF;
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = v_roleId;
  
  -- Super Admin (sa) có tất cả quyền
  IF v_roleCode = 'sa' THEN
    SET p_hasPermission = 1;
    LEAVE;
  END IF;
  
  -- Kiểm tra quyền trong bảng role_chucnang
  SELECT COUNT(*) INTO v_count
  FROM role_chucnang rc
  JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
  JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
  WHERE rc.roleId = v_roleId
    AND cn.chucNangCode = p_chucNangCode
    AND tt.thaoTacCode = p_thaoTacCode
    AND rc.active_flag = 1
    AND (rc.dongHoId IS NULL OR rc.dongHoId = v_userDongHoId);
  
  IF v_count > 0 THEN
    -- Có quyền, nhưng cần check dongHoId
    IF p_dongHoId IS NOT NULL AND p_dongHoId != v_userDongHoId THEN
      SET p_hasPermission = 0;
      SET p_error_code = 2;
      SET p_error_message = 'Bạn không có quyền thao tác trên dòng họ này';
    ELSE
      SET p_hasPermission = 1;
    END IF;
  ELSE
    SET p_error_code = 3;
    SET p_error_message = 'Bạn không có quyền thực hiện thao tác này';
  END IF;
  
END //
DELIMITER ;

-- 5.2 Lấy danh sách quyền của user (menu + actions)
DROP PROCEDURE IF EXISTS `GetUserPermissions`;
DELIMITER //
CREATE PROCEDURE `GetUserPermissions`(
  IN p_nguoiDungId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(500)
)
BEGIN
  DECLARE v_roleId VARCHAR(50);
  DECLARE v_roleCode VARCHAR(50);
  
  SET p_err_code = 0;
  SET p_err_msg = '';
  
  -- Lấy roleId của user
  SELECT roleId INTO v_roleId
  FROM nguoidung 
  WHERE nguoiDungId = p_nguoiDungId AND active_flag = 1;
  
  IF v_roleId IS NULL THEN
    SET p_err_code = 1;
    SET p_err_msg = 'Người dùng không tồn tại';
  END IF;
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = v_roleId;
  
  -- Trả về danh sách menu + quyền
  SELECT 
    cn.chucNangId,
    cn.chucNangCode as code,
    cn.tenChucNang as name,
    cn.duongDan as href,
    cn.icon,
    cn.thuTu as sortOrder,
    cn.parentId,
    GROUP_CONCAT(DISTINCT tt.thaoTacCode ORDER BY tt.thaoTacCode) as actions,
    v_roleCode as roleCode,
    CASE WHEN v_roleCode = 'sa' THEN 1 ELSE 0 END as canSelectAllDongHo
  FROM role_chucnang rc
  JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
  JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
  WHERE rc.roleId = v_roleId
    AND rc.active_flag = 1
    AND cn.active_flag = 1
  GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
  ORDER BY cn.thuTu;
  
END //
DELIMITER ;

-- 5.3 Lấy menu + quyền theo roleId (dùng cho authorize)
DROP PROCEDURE IF EXISTS `GetMenuByRoleId`;
DELIMITER //
CREATE PROCEDURE `GetMenuByRoleId`(
  IN p_roleId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(500)
)
BEGIN
  DECLARE v_roleCode VARCHAR(50);
  
  SET p_err_code = 0;
  SET p_err_msg = '';
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = p_roleId AND active_flag = 1;
  
  IF v_roleCode IS NULL THEN
    SET p_err_code = 1;
    SET p_err_msg = 'Role không tồn tại';
  END IF;
  
  -- Trả về danh sách menu + quyền
  SELECT 
    cn.chucNangId,
    cn.chucNangCode as code,
    cn.tenChucNang as name,
    cn.duongDan as href,
    cn.icon,
    cn.thuTu as sortOrder,
    cn.parentId,
    GROUP_CONCAT(DISTINCT tt.thaoTacCode ORDER BY tt.thaoTacCode) as actions,
    v_roleCode as roleCode,
    CASE WHEN v_roleCode = 'sa' THEN 1 ELSE 0 END as canSelectAllDongHo
  FROM role_chucnang rc
  JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
  JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
  WHERE rc.roleId = p_roleId
    AND rc.active_flag = 1
    AND cn.active_flag = 1
  GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
  ORDER BY cn.thuTu;
  
END //
DELIMITER ;

SET FOREIGN_KEY_CHECKS = 1;

-- =====================================================
-- BẢNG TÓM TẮT PHÂN QUYỀN
-- =====================================================
/*
+-------------+------------------+------------------------------------------+
| Role Code   | Role Name        | Quyền                                    |
+-------------+------------------+------------------------------------------+
| sa          | Quản trị hệ thống| - Tất cả quyền trên TẤT CẢ dòng họ      |
|             |                  | - Có dropdown chọn dòng họ               |
+-------------+------------------+------------------------------------------+
| thudo       | Thư đồ           | - CRUD trên dòng họ CỦA MÌNH            |
|             |                  | - Không có dropdown chọn dòng họ         |
|             |                  | - Quản lý: thành viên, sự kiện, tài chính|
|             |                  |   tài liệu, tin tức, người dùng          |
+-------------+------------------+------------------------------------------+
| thanhvien   | Thành viên       | - CHỈ XEM dữ liệu dòng họ của mình      |
|             |                  | - Không có quyền thêm/sửa/xóa            |
|             |                  | - Không xem được tài chính               |
+-------------+------------------+------------------------------------------+

CHỨC NĂNG VÀ QUYỀN:
+------------+------------------+------+-------+-------+
| Chức năng  | sa               | thudo| thanhvien     |
+------------+------------------+------+-------+-------+
| Dashboard  | VIEW             | VIEW | VIEW          |
| Thành viên | CRUD             | CRUD | VIEW          |
| Sự kiện    | CRUD             | CRUD | VIEW          |
| Tài chính  | CRUD             | CRUD | -             |
| Tài liệu   | CRUD             | CRUD | VIEW          |
| Tin tức    | CRUD             | CRUD | VIEW          |
| Người dùng | CRUD             | CRUD | -             |
| Dòng họ    | CRUD             | -    | -             |
| Phân quyền | CRUD             | -    | -             |
+------------+------------------+------+-------+-------+
*/
