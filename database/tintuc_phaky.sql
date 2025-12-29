-- =============================================
-- TIN TỨC & TÀI LIỆU (PHẢ KÝ) - STORED PROCEDURES
-- Chạy file này trong MySQL để tạo bảng và procedures
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
  KEY `idx_tintuc_ngaydang` (`ngayDang`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- =============================================
-- BẢNG TÀI LIỆU (PHẢ KÝ)
-- =============================================
DROP TABLE IF EXISTS `tailieu`;
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
  `active_flag` tinyint DEFAULT 1,
  `nguoiTaoId` varchar(50) DEFAULT NULL,
  `lu_updated` datetime DEFAULT NULL,
  `lu_user_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`taiLieuId`),
  KEY `idx_tailieu_dongho` (`dongHoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  DECLARE v_total INT;
  
  SET v_offset = (p_pageIndex - 1) * p_pageSize;
  
  -- Đếm tổng số bản ghi
  SELECT COUNT(*) INTO v_total FROM tintuc 
  WHERE active_flag = 1 
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
    AND (p_search_content IS NULL OR p_search_content = '' OR tieuDe LIKE CONCAT('%', p_search_content, '%'));
  
  -- Lấy dữ liệu
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
    v_total AS RecordCount
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
    anhDaiDien = IFNULL(p_anhDaiDien, anhDaiDien),
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

-- Get Tin Tuc By Id
DROP PROCEDURE IF EXISTS `GetTinTucById`;
DELIMITER //
CREATE PROCEDURE `GetTinTucById`(
  IN p_tinTucId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  -- Tăng lượt xem
  UPDATE tintuc SET luotXem = luotXem + 1 WHERE tinTucId = p_tinTucId;
  
  -- Lấy dữ liệu
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
    d.tenDongHo
  FROM tintuc t
  LEFT JOIN dongho d ON t.dongHoId = d.dongHoId
  WHERE t.tinTucId = p_tinTucId AND t.active_flag = 1;
  
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
  DECLARE v_total INT;
  
  SET v_offset = (p_pageIndex - 1) * p_pageSize;
  
  -- Đếm tổng số bản ghi
  SELECT COUNT(*) INTO v_total FROM tailieu 
  WHERE active_flag = 1 
    AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
    AND (p_loaiTaiLieu IS NULL OR p_loaiTaiLieu = '' OR loaiTaiLieu = p_loaiTaiLieu)
    AND (p_search_content IS NULL OR p_search_content = '' OR tenTaiLieu LIKE CONCAT('%', p_search_content, '%'));
  
  -- Lấy dữ liệu
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
    v_total AS RecordCount
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

-- Get Tai Lieu By Id
DROP PROCEDURE IF EXISTS `GetTaiLieuById`;
DELIMITER //
CREATE PROCEDURE `GetTaiLieuById`(
  IN p_taiLieuId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
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
    d.tenDongHo
  FROM tailieu tl
  LEFT JOIN dongho d ON tl.dongHoId = d.dongHoId
  WHERE tl.taiLieuId = p_taiLieuId AND tl.active_flag = 1;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END //
DELIMITER ;

-- =============================================
-- DỮ LIỆU MẪU
-- Thay 'your-dongho-id' bằng dongHoId thực tế của bạn
-- =============================================

-- Tin tức mẫu
INSERT INTO tintuc (tinTucId, dongHoId, tieuDe, noiDung, tomTat, tacGia, ghim, ngayDang) VALUES
('TT001', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Thông báo họp họ cuối năm 2025', 
 'Kính mời toàn thể bà con trong dòng họ tham dự buổi họp họ cuối năm 2025. Thời gian: 10h ngày 28/12/2025. Địa điểm: Nhà thờ họ. Nội dung: Tổng kết hoạt động năm 2025, kế hoạch năm 2026, trao học bổng cho con cháu học giỏi.',
 'Thông báo họp họ cuối năm 2025 tại nhà thờ họ', 'Ban quản lý dòng họ', 1, NOW()),
 
('TT002', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Chúc mừng cháu Nguyễn Văn A đỗ đại học',
 'Dòng họ xin chúc mừng cháu Nguyễn Văn A đã xuất sắc đỗ vào trường Đại học Bách Khoa Hà Nội năm 2025 với số điểm cao. Đây là niềm tự hào của cả dòng họ.',
 'Chúc mừng thành viên đỗ đại học', 'Ban quản lý dòng họ', 0, DATE_SUB(NOW(), INTERVAL 5 DAY)),
 
('TT003', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Lễ giỗ tổ Hùng Vương năm 2025',
 'Thông báo lịch tổ chức lễ giỗ tổ Hùng Vương năm 2025. Thời gian: Mùng 10 tháng 3 âm lịch. Địa điểm: Đền thờ họ. Mong bà con sắp xếp thời gian tham dự.',
 'Lễ giỗ tổ Hùng Vương năm 2025', 'Ban tổ chức', 1, DATE_SUB(NOW(), INTERVAL 10 DAY)),
 
('TT004', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Kế hoạch tu bổ nhà thờ họ',
 'Ban quản lý dòng họ thông báo kế hoạch tu bổ, nâng cấp nhà thờ họ trong năm 2025. Dự kiến kinh phí: 500 triệu đồng. Kêu gọi bà con đóng góp.',
 'Kế hoạch tu bổ nhà thờ họ năm 2025', 'Ban quản lý', 0, DATE_SUB(NOW(), INTERVAL 15 DAY)),
 
('TT005', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Hỗ trợ học bổng cho con cháu',
 'Dòng họ triển khai chương trình học bổng hỗ trợ con cháu có hoàn cảnh khó khăn học giỏi. Mức hỗ trợ: 2-5 triệu đồng/năm học.',
 'Chương trình học bổng dòng họ', 'Ban khuyến học', 0, DATE_SUB(NOW(), INTERVAL 20 DAY));

-- Tài liệu mẫu (Phả ký)
INSERT INTO tailieu (taiLieuId, dongHoId, tenTaiLieu, moTa, loaiTaiLieu, namSangTac, tacGia, nguonGoc, ngayTaiLen, active_flag) VALUES
('TL001', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Gia phả dòng họ - Bản gốc',
 'Gia phả ghi chép từ đời thứ nhất đến đời thứ 5 của dòng họ. Bản viết tay bằng chữ Hán Nôm, được lưu giữ cẩn thận qua nhiều thế hệ.',
 'Gia phả', 1920, 'Cụ tổ đời thứ 5', 'Lưu trữ tại nhà thờ họ', CURDATE(), 1),
 
('TL002', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Sắc phong triều Nguyễn',
 'Sắc phong của vua Tự Đức ban cho cụ tổ năm 1865, ghi nhận công lao đóng góp cho triều đình.',
 'Sắc phong', 1865, 'Triều đình nhà Nguyễn', 'Lưu trữ tại bảo tàng tỉnh', CURDATE(), 1),
 
('TL003', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Hình ảnh nhà thờ họ xưa',
 'Bộ ảnh chụp nhà thờ họ từ năm 1950, ghi lại kiến trúc cổ trước khi được tu bổ.',
 'Hình ảnh', 1950, 'Không rõ', 'Sưu tầm từ gia đình', CURDATE(), 1),
 
('TL004', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Văn tế tổ tiên',
 'Bài văn tế được đọc trong các dịp giỗ tổ, lễ tết. Nội dung ca ngợi công đức tổ tiên.',
 'Văn bản cổ', 1900, 'Cụ tổ đời thứ 4', 'Truyền khẩu trong dòng họ', CURDATE(), 1),
 
('TL005', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Gia phả bổ sung - Đời 6 đến 10',
 'Phần bổ sung gia phả, ghi chép các đời từ thứ 6 đến thứ 10 của dòng họ.',
 'Gia phả', 1980, 'Ông Nguyễn Văn B', 'Biên soạn mới', CURDATE(), 1),
 
('TL006', 'e9022e64-cbae-11f0-8020-a8934a9bae74', 'Hình ảnh lễ giỗ tổ 2020',
 'Bộ ảnh ghi lại lễ giỗ tổ năm 2020 với sự tham gia của hơn 200 con cháu.',
 'Hình ảnh', 2020, 'Ban tổ chức', 'Chụp tại lễ giỗ tổ', CURDATE(), 1);
