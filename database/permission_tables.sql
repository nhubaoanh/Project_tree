-- =====================================================
-- BẢNG PHÂN QUYỀN CHO HỆ THỐNG GIA PHẢ
-- =====================================================

-- 1. BẢNG CHỨC NĂNG (Function/Menu)
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

-- 2. BẢNG QUYỀN THAO TÁC (Action)
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

-- 3. BẢNG PHÂN QUYỀN ROLE - CHỨC NĂNG - THAO TÁC
DROP TABLE IF EXISTS `role_chucnang`;
CREATE TABLE `role_chucnang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `roleId` varchar(50) NOT NULL,
  `chucNangId` varchar(50) NOT NULL,
  `thaoTacId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) DEFAULT NULL COMMENT 'NULL = tất cả dòng họ, có giá trị = chỉ dòng họ đó',
  `active_flag` tinyint DEFAULT 1,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`),
  KEY `fk_rc_role` (`roleId`),
  KEY `fk_rc_chucnang` (`chucNangId`),
  KEY `fk_rc_thaotac` (`thaoTacId`),
  CONSTRAINT `fk_rc_role` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_chucnang` FOREIGN KEY (`chucNangId`) REFERENCES `chucnang` (`chucNangId`) ON DELETE CASCADE,
  CONSTRAINT `fk_rc_thaotac` FOREIGN KEY (`thaoTacId`) REFERENCES `thaotac` (`thaoTacId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =====================================================
-- INSERT DỮ LIỆU MẪU
-- =====================================================

-- Thao tác cơ bản
INSERT INTO `thaotac` (`thaoTacId`, `thaoTacCode`, `tenThaoTac`, `moTa`) VALUES
('TT001', 'VIEW', 'Xem', 'Quyền xem dữ liệu'),
('TT002', 'CREATE', 'Thêm mới', 'Quyền thêm dữ liệu'),
('TT003', 'UPDATE', 'Cập nhật', 'Quyền sửa dữ liệu'),
('TT004', 'DELETE', 'Xóa', 'Quyền xóa dữ liệu'),
('TT005', 'EXPORT', 'Xuất file', 'Quyền xuất Excel/PDF'),
('TT006', 'IMPORT', 'Nhập file', 'Quyền nhập từ Excel');

-- Chức năng hệ thống
INSERT INTO `chucnang` (`chucNangId`, `chucNangCode`, `tenChucNang`, `moTa`, `duongDan`, `thuTu`) VALUES
('CN001', 'DASHBOARD', 'Trang chủ', 'Dashboard tổng quan', '/admin', 1),
('CN002', 'THANHVIEN', 'Quản lý thành viên', 'Quản lý thành viên dòng họ', '/admin/family-trees', 2),
('CN003', 'SUKIEN', 'Quản lý sự kiện', 'Quản lý sự kiện dòng họ', '/admin/manageEvents', 3),
('CN004', 'TAICHINH', 'Quản lý tài chính', 'Quản lý thu chi', '/admin/contributions', 4),
('CN005', 'TAILIEU', 'Quản lý tài liệu', 'Quản lý phả ký, tài liệu', '/admin/documents', 5),
('CN006', 'TINTUC', 'Quản lý tin tức', 'Quản lý tin tức, thông báo', '/admin/manage-news', 6),
('CN007', 'NGUOIDUNG', 'Quản lý người dùng', 'Quản lý tài khoản', '/admin/users', 7),
('CN008', 'DONGHO', 'Quản lý dòng họ', 'Quản lý thông tin dòng họ', '/admin/lineage', 8),
('CN009', 'PHANQUYEN', 'Phân quyền', 'Quản lý role và quyền', '/admin/roles', 9);

-- =====================================================
-- PHÂN QUYỀN CHO TỪNG ROLE
-- =====================================================

-- Role: sa (Quản trị hệ thống) - CÓ TẤT CẢ QUYỀN, TẤT CẢ DÒNG HỌ
INSERT INTO `role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`) 
SELECT 'c2ed095e-c905-11f0-8020-a8934a9bae74', cn.chucNangId, tt.thaoTacId, NULL
FROM `chucnang` cn
CROSS JOIN `thaotac` tt
WHERE cn.active_flag = 1 AND tt.active_flag = 1;

-- Role: thudo (Thư đồ - Admin dòng họ) - CÓ QUYỀN CRUD NHƯNG CHỈ DÒNG HỌ CỦA MÌNH
-- Lưu ý: dongHoId = NULL ở đây nghĩa là backend sẽ tự lấy dongHoId của user
INSERT INTO `role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`) VALUES
-- Dashboard
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN001', 'TT001', NULL),
-- Thành viên
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN002', 'TT004', NULL),
-- Sự kiện
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN003', 'TT004', NULL),
-- Tài chính
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN004', 'TT004', NULL),
-- Tài liệu
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN005', 'TT004', NULL),
-- Tin tức
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT001', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT002', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT003', NULL),
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN006', 'TT004', NULL),
-- Người dùng (chỉ xem)
('0437a931-cf5e-11f0-8020-a8934a9bae74', 'CN007', 'TT001', NULL);

-- Role: thanhvien (Thành viên) - CHỈ CÓ QUYỀN XEM
INSERT INTO `role_chucnang` (`roleId`, `chucNangId`, `thaoTacId`, `dongHoId`) VALUES
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN001', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN002', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN003', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN004', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN005', 'TT001', NULL),
('0aa1a174-c8ed-11f0-8020-a8934a9bae74', 'CN006', 'TT001', NULL);

-- =====================================================
-- STORED PROCEDURE KIỂM TRA QUYỀN
-- =====================================================

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
    RETURN;
  END IF;
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = v_roleId;
  
  -- Super Admin (sa) có tất cả quyền
  IF v_roleCode = 'sa' THEN
    SET p_hasPermission = 1;
    RETURN;
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
    -- Nếu không phải sa, chỉ được thao tác trên dòng họ của mình
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

-- =====================================================
-- STORED PROCEDURE LẤY DANH SÁCH QUYỀN CỦA USER
-- =====================================================

DROP PROCEDURE IF EXISTS `GetUserPermissions`;
DELIMITER //
CREATE PROCEDURE `GetUserPermissions`(
  IN p_nguoiDungId VARCHAR(50)
)
BEGIN
  DECLARE v_roleId VARCHAR(50);
  DECLARE v_roleCode VARCHAR(50);
  
  -- Lấy roleId của user
  SELECT roleId INTO v_roleId
  FROM nguoidung 
  WHERE nguoiDungId = p_nguoiDungId AND active_flag = 1;
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = v_roleId;
  
  -- Trả về danh sách quyền
  SELECT 
    cn.chucNangCode,
    cn.tenChucNang,
    cn.duongDan,
    cn.icon,
    GROUP_CONCAT(DISTINCT tt.thaoTacCode) as actions,
    v_roleCode as roleCode,
    CASE WHEN v_roleCode = 'sa' THEN 1 ELSE 0 END as canSelectAllDongHo
  FROM role_chucnang rc
  JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
  JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
  WHERE rc.roleId = v_roleId
    AND rc.active_flag = 1
    AND cn.active_flag = 1
  GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon
  ORDER BY cn.thuTu;
  
END //
DELIMITER ;
