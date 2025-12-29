-- =============================================
-- TIN TỨC & TÀI LIỆU (PHẢ KÝ) - STORED PROCEDURES
-- =============================================

-- =============================================
-- BẢNG TIN TỨC (NEWS)
-- =============================================
DROP TABLE IF EXISTS `tintuc`;
CREATE TABLE `tintuc` (
  `tinTucId` varchar(50) NOT NULL,
  `dongHoId` varchar(50) NOT NULL,
  `tieuDe` varchar(255) NOT NULL,
  `noiDung` text,
  `tomTat` varchar(500) DEFAULT NULL,
  `anhDaiDien` varchar(255) DEFAULT NULL,
  `tacGia` varchar(255) DEFAULT NULL,
  `ngayDang` datetime DEFAULT CURRENT_TIMESTAMP,
  `luotXem` int DEFAULT 0,
  `ghim` tinyint DEFAULT 0,
  `active_flag` tinyint DEFAULT 1,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`tinTucId`),
  KEY `idx_tintuc_dongho` (`dongHoId`),
  KEY `idx_tintuc_ngaydang` (`ngayDang`),
  CONSTRAINT `fk_tintuc_dongho` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =============================================
-- CẬP NHẬT BẢNG TÀI LIỆU - THÊM dongHoId
-- =============================================
ALTER TABLE `tailieu` ADD COLUMN `dongHoId` varchar(50) DEFAULT NULL AFTER `taiLieuId`;
ALTER TABLE `tailieu` ADD COLUMN `loaiTaiLieu` varchar(100) DEFAULT NULL AFTER `moTa`;
ALTER TABLE `tailieu` ADD COLUMN `namSangTac` int DEFAULT NULL AFTER `loaiTaiLieu`;
ALTER TABLE `tailieu` ADD COLUMN `tacGia` varchar(255) DEFAULT NULL AFTER `namSangTac`;
ALTER TABLE `tailieu` ADD COLUMN `nguonGoc` varchar(255) DEFAULT NULL AFTER `tacGia`;
ALTER TABLE `tailieu` ADD COLUMN `ghiChu` text AFTER `nguonGoc`;
ALTER TABLE `tailieu` ADD KEY `idx_tailieu_dongho` (`dongHoId`);
ALTER TABLE `tailieu` ADD CONSTRAINT `fk_tailieu_dongho` FOREIGN KEY (`dongHoId`) REFERENCES `dongho` (`dongHoId`) ON DELETE SET NULL;

-- =============================================
-- STORED PROCEDURES - TIN TỨC
-- =============================================

-- Search Tin Tuc
DROP PROCEDURE IF EXISTS `SearchTinTuc`;
DELIMITER //
CREATE PROCEDURE `SearchTinTuc`(
  IN p_pageIndex INT,
  IN p_pageSize INT,
  IN p_search_content VARCHAR(255),
  IN p_dongHoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  DECLARE v_offset INT;
  SET v_offset = (p_pageIndex - 1) * p_pageSize;
  
  SELECT 
    t.tinTucId,
    t.dongHoId,
    t.tieuDe,
    t.noiDung,
    t.tomTat,
    t.anhDaiDien,
    t.tacGia,
    t.ngayDang,
    t.luotXem,
    t.ghim,
    t.active_flag,
    t.nguoiTaoId,
    t.lu_updated,
    d.tenDongHo,
    (SELECT COUNT(*) FROM tintuc 
     WHERE active_flag = 1 
     AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
     AND (p_search_content IS NULL OR p_search_content = '' OR tieuDe LIKE CONCAT('%', p_search_content, '%'))
    ) AS RecordCount
  FROM tintuc t
  LEFT JOIN dongho d ON t.dongHoId = d.dongHoId
  WHERE t.active_flag = 1
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR t.dongHoId = p_dongHoId)
    AND (p_search_content IS NULL OR p_search_content = '' OR t.tieuDe LIKE CONCAT('%', p_search_content, '%'))
  ORDER BY t.ghim DESC, t.ngayDang DESC
  LIMIT v_offset, p_pageSize;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- Insert Tin Tuc
DROP PROCEDURE IF EXISTS `InsertTinTuc`;
DELIMITER //
CREATE PROCEDURE `InsertTinTuc`(
  IN p_tinTucId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tieuDe VARCHAR(255),
  IN p_noiDung TEXT,
  IN p_tomTat VARCHAR(500),
  IN p_anhDaiDien VARCHAR(255),
  IN p_tacGia VARCHAR(255),
  IN p_ghim TINYINT,
  IN p_nguoiTaoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  INSERT INTO tintuc (
    tinTucId, dongHoId, tieuDe, noiDung, tomTat, anhDaiDien, 
    tacGia, ngayDang, ghim, nguoiTaoId, lu_updated, lu_user_id
  ) VALUES (
    p_tinTucId, p_dongHoId, p_tieuDe, p_noiDung, p_tomTat, p_anhDaiDien,
    p_tacGia, NOW(), IFNULL(p_ghim, 0), p_nguoiTaoId, NOW(), p_nguoiTaoId
  );
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- Update Tin Tuc
DROP PROCEDURE IF EXISTS `UpdateTinTuc`;
DELIMITER //
CREATE PROCEDURE `UpdateTinTuc`(
  IN p_tinTucId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tieuDe VARCHAR(255),
  IN p_noiDung TEXT,
  IN p_tomTat VARCHAR(500),
  IN p_anhDaiDien VARCHAR(255),
  IN p_tacGia VARCHAR(255),
  IN p_ghim TINYINT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tintuc SET
    dongHoId = p_dongHoId,
    tieuDe = p_tieuDe,
    noiDung = p_noiDung,
    tomTat = p_tomTat,
    anhDaiDien = p_anhDaiDien,
    tacGia = p_tacGia,
    ghim = IFNULL(p_ghim, 0),
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE tinTucId = p_tinTucId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- Delete Tin Tuc (Soft delete)
DROP PROCEDURE IF EXISTS `DeleteTinTuc`;
DELIMITER //
CREATE PROCEDURE `DeleteTinTuc`(
  IN p_tinTucId VARCHAR(50),
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tintuc SET
    active_flag = 0,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE tinTucId = p_tinTucId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- =============================================
-- STORED PROCEDURES - TÀI LIỆU (PHẢ KÝ)
-- =============================================

-- Search Tai Lieu
DROP PROCEDURE IF EXISTS `SearchTaiLieu`;
DELIMITER //
CREATE PROCEDURE `SearchTaiLieu`(
  IN p_pageIndex INT,
  IN p_pageSize INT,
  IN p_search_content VARCHAR(255),
  IN p_dongHoId VARCHAR(50),
  IN p_loaiTaiLieu VARCHAR(100),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  DECLARE v_offset INT;
  SET v_offset = (p_pageIndex - 1) * p_pageSize;
  
  SELECT 
    tl.taiLieuId,
    tl.dongHoId,
    tl.tenTaiLieu,
    tl.duongDan,
    tl.moTa,
    tl.loaiTaiLieu,
    tl.namSangTac,
    tl.tacGia,
    tl.nguonGoc,
    tl.ghiChu,
    tl.ngayTaiLen,
    tl.active_flag,
    tl.nguoiTaoId,
    tl.lu_updated,
    d.tenDongHo,
    (SELECT COUNT(*) FROM tailieu 
     WHERE active_flag = 1 
     AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
     AND (p_loaiTaiLieu IS NULL OR p_loaiTaiLieu = '' OR loaiTaiLieu = p_loaiTaiLieu)
     AND (p_search_content IS NULL OR p_search_content = '' OR tenTaiLieu LIKE CONCAT('%', p_search_content, '%'))
    ) AS RecordCount
  FROM tailieu tl
  LEFT JOIN dongho d ON tl.dongHoId = d.dongHoId
  WHERE tl.active_flag = 1
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tl.dongHoId = p_dongHoId)
    AND (p_loaiTaiLieu IS NULL OR p_loaiTaiLieu = '' OR tl.loaiTaiLieu = p_loaiTaiLieu)
    AND (p_search_content IS NULL OR p_search_content = '' OR tl.tenTaiLieu LIKE CONCAT('%', p_search_content, '%'))
  ORDER BY tl.ngayTaiLen DESC
  LIMIT v_offset, p_pageSize;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- Insert Tai Lieu
DROP PROCEDURE IF EXISTS `InsertTaiLieu`;
DELIMITER //
CREATE PROCEDURE `InsertTaiLieu`(
  IN p_taiLieuId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tenTaiLieu VARCHAR(255),
  IN p_duongDan VARCHAR(255),
  IN p_moTa TEXT,
  IN p_loaiTaiLieu VARCHAR(100),
  IN p_namSangTac INT,
  IN p_tacGia VARCHAR(255),
  IN p_nguonGoc VARCHAR(255),
  IN p_ghiChu TEXT,
  IN p_nguoiTaoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  INSERT INTO tailieu (
    taiLieuId, dongHoId, tenTaiLieu, duongDan, moTa, loaiTaiLieu,
    namSangTac, tacGia, nguonGoc, ghiChu, ngayTaiLen,
    active_flag, nguoiTaoId, lu_updated, lu_user_id
  ) VALUES (
    p_taiLieuId, p_dongHoId, p_tenTaiLieu, p_duongDan, p_moTa, p_loaiTaiLieu,
    p_namSangTac, p_tacGia, p_nguonGoc, p_ghiChu, CURDATE(),
    1, p_nguoiTaoId, NOW(), p_nguoiTaoId
  );
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- Update Tai Lieu
DROP PROCEDURE IF EXISTS `UpdateTaiLieu`;
DELIMITER //
CREATE PROCEDURE `UpdateTaiLieu`(
  IN p_taiLieuId VARCHAR(50),
  IN p_dongHoId VARCHAR(50),
  IN p_tenTaiLieu VARCHAR(255),
  IN p_duongDan VARCHAR(255),
  IN p_moTa TEXT,
  IN p_loaiTaiLieu VARCHAR(100),
  IN p_namSangTac INT,
  IN p_tacGia VARCHAR(255),
  IN p_nguonGoc VARCHAR(255),
  IN p_ghiChu TEXT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tailieu SET
    dongHoId = p_dongHoId,
    tenTaiLieu = p_tenTaiLieu,
    duongDan = IFNULL(p_duongDan, duongDan),
    moTa = p_moTa,
    loaiTaiLieu = p_loaiTaiLieu,
    namSangTac = p_namSangTac,
    tacGia = p_tacGia,
    nguonGoc = p_nguonGoc,
    ghiChu = p_ghiChu,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE taiLieuId = p_taiLieuId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- Delete Tai Lieu (Soft delete)
DROP PROCEDURE IF EXISTS `DeleteTaiLieu`;
DELIMITER //
CREATE PROCEDURE `DeleteTaiLieu`(
  IN p_taiLieuId VARCHAR(50),
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE tailieu SET
    active_flag = 0,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE taiLieuId = p_taiLieuId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- =============================================
-- DỮ LIỆU MẪU
-- =============================================

-- Tin tức mẫu
INSERT INTO tintuc (tinTucId, dongHoId, tieuDe, noiDung, tomTat, tacGia, ghim) VALUES
('TT001', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Thông báo họp họ cuối năm 2025', 
 'Kính mời toàn thể bà con trong dòng họ tham dự buổi họp họ cuối năm 2025. Thời gian: 10h ngày 28/12/2025. Địa điểm: Nhà thờ họ.',
 'Thông báo họp họ cuối năm 2025 tại nhà thờ họ', 'Ban quản lý dòng họ', 1),
('TT002', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Chúc mừng cháu Nguyễn Văn A đỗ đại học',
 'Dòng họ xin chúc mừng cháu Nguyễn Văn A đã xuất sắc đỗ vào trường Đại học Bách Khoa Hà Nội năm 2025.',
 'Chúc mừng thành viên đỗ đại học', 'Ban quản lý dòng họ', 0);

-- Tài liệu mẫu (Phả ký)
INSERT INTO tailieu (taiLieuId, dongHoId, tenTaiLieu, moTa, loaiTaiLieu, namSangTac, tacGia, nguonGoc, ngayTaiLen, active_flag) VALUES
('TL001', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Gia phả dòng họ Nhữ - Bản gốc',
 'Gia phả ghi chép từ đời thứ nhất đến đời thứ 5 của dòng họ Nhữ tại Hải Dương.',
 'Gia phả', 1920, 'Cụ Nhữ Văn Đức', 'Lưu trữ tại nhà thờ họ', CURDATE(), 1),
('TL002', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Sắc phong triều Nguyễn',
 'Sắc phong của vua Tự Đức ban cho cụ Nhữ Văn Minh năm 1865.',
 'Sắc phong', 1865, 'Triều đình nhà Nguyễn', 'Lưu trữ tại bảo tàng tỉnh', CURDATE(), 1),
('TL003', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Hình ảnh nhà thờ họ xưa',
 'Bộ ảnh chụp nhà thờ họ từ năm 1950.',
 'Hình ảnh', 1950, 'Không rõ', 'Sưu tầm từ gia đình', CURDATE(), 1);
