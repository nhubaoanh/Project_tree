-- =====================================================
-- SUBSCRIPTION SYSTEM - DATABASE SCHEMA
-- Hệ thống phân quyền 3 cấp & Mô hình kinh doanh SaaS
-- =====================================================

-- 1. Bảng Gói Dịch Vụ
DROP TABLE IF EXISTS `goi_dich_vu`;
CREATE TABLE `goi_dich_vu` (
  `goiDichVuId` VARCHAR(50) PRIMARY KEY,
  `maGoi` VARCHAR(50) NOT NULL UNIQUE COMMENT 'FREE, BASIC, PREMIUM, ENTERPRISE',
  `tenGoi` VARCHAR(100) NOT NULL,
  `moTa` TEXT,
  `giaTien` DECIMAL(18,2) NOT NULL COMMENT 'Giá/tháng (VNĐ)',
  `giaTienNam` DECIMAL(18,2) COMMENT 'Giá/năm (VNĐ) - có giảm giá',
  `thoiGianDungThu` INT DEFAULT 0 COMMENT 'Số ngày dùng thử miễn phí',
  `thuTu` INT DEFAULT 0 COMMENT 'Thứ tự hiển thị',
  `active_flag` TINYINT DEFAULT 1,
  `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `lu_updated` DATETIME,
  `lu_user_id` VARCHAR(50),
  INDEX `idx_magoi` (`maGoi`),
  INDEX `idx_active` (`active_flag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Bảng Giới Hạn Gói
DROP TABLE IF EXISTS `gioi_han_goi`;
CREATE TABLE `gioi_han_goi` (
  `gioiHanId` VARCHAR(50) PRIMARY KEY,
  `goiDichVuId` VARCHAR(50) NOT NULL,
  `tenGioiHan` VARCHAR(100) NOT NULL COMMENT 'max_members, max_admins, storage_mb, etc.',
  `giaTriGioiHan` INT COMMENT 'Giá trị giới hạn, NULL = không giới hạn',
  `moTa` VARCHAR(255),
  `active_flag` TINYINT DEFAULT 1,
  `lu_updated` DATETIME,
  `lu_user_id` VARCHAR(50),
  FOREIGN KEY (`goiDichVuId`) REFERENCES `goi_dich_vu`(`goiDichVuId`) ON DELETE CASCADE,
  UNIQUE KEY `uk_goi_gioihan` (`goiDichVuId`, `tenGioiHan`),
  INDEX `idx_goi_ten` (`goiDichVuId`, `tenGioiHan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 3. Bảng Đăng Ký Gói
DROP TABLE IF EXISTS `dang_ky_goi`;
CREATE TABLE `dang_ky_goi` (
  `dangKyId` VARCHAR(50) PRIMARY KEY,
  `dongHoId` VARCHAR(50) NOT NULL,
  `goiDichVuId` VARCHAR(50) NOT NULL,
  `ngayBatDau` DATE NOT NULL,
  `ngayKetThuc` DATE NOT NULL,
  `trangThai` VARCHAR(50) NOT NULL COMMENT 'trial, active, expired, cancelled, suspended',
  `loaiThanhToan` VARCHAR(50) COMMENT 'monthly, yearly',
  `tuDongGiaHan` TINYINT DEFAULT 0 COMMENT 'Tự động gia hạn',
  `ngayGiaHanTiepTheo` DATE,
  `ghiChu` TEXT,
  `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `nguoiTaoId` VARCHAR(50),
  `active_flag` TINYINT DEFAULT 1,
  `lu_updated` DATETIME,
  `lu_user_id` VARCHAR(50),
  FOREIGN KEY (`dongHoId`) REFERENCES `dongho`(`dongHoId`) ON DELETE CASCADE,
  FOREIGN KEY (`goiDichVuId`) REFERENCES `goi_dich_vu`(`goiDichVuId`),
  FOREIGN KEY (`nguoiTaoId`) REFERENCES `nguoidung`(`nguoiDungId`),
  INDEX `idx_dongho_trangthai` (`dongHoId`, `trangThai`),
  INDEX `idx_ngayketthuc` (`ngayKetThuc`),
  INDEX `idx_trangthai` (`trangThai`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Thanh Toán
DROP TABLE IF EXISTS `thanh_toan`;
CREATE TABLE `thanh_toan` (
  `thanhToanId` VARCHAR(50) PRIMARY KEY,
  `dangKyId` VARCHAR(50) NOT NULL,
  `dongHoId` VARCHAR(50) NOT NULL,
  `soTien` DECIMAL(18,2) NOT NULL,
  `phuongThucThanhToan` VARCHAR(50) COMMENT 'bank_transfer, momo, vnpay, zalopay, credit_card',
  `trangThai` VARCHAR(50) NOT NULL COMMENT 'pending, completed, failed, refunded',
  `maGiaoDich` VARCHAR(100) COMMENT 'Mã giao dịch từ cổng thanh toán',
  `ngayThanhToan` DATETIME,
  `ngayXacNhan` DATETIME COMMENT 'Ngày Super Admin xác nhận',
  `nguoiXacNhanId` VARCHAR(50) COMMENT 'Super Admin xác nhận',
  `ghiChu` TEXT,
  `hoaDonUrl` VARCHAR(255) COMMENT 'Link hóa đơn PDF',
  `chungTuUrl` VARCHAR(255) COMMENT 'Link ảnh chứng từ chuyển khoản',
  `ngayTao` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `active_flag` TINYINT DEFAULT 1,
  `lu_updated` DATETIME,
  `lu_user_id` VARCHAR(50),
  FOREIGN KEY (`dangKyId`) REFERENCES `dang_ky_goi`(`dangKyId`),
  FOREIGN KEY (`dongHoId`) REFERENCES `dongho`(`dongHoId`),
  FOREIGN KEY (`nguoiXacNhanId`) REFERENCES `nguoidung`(`nguoiDungId`),
  INDEX `idx_dongho_trangthai` (`dongHoId`, `trangThai`),
  INDEX `idx_ngaythanhtoan` (`ngayThanhToan`),
  INDEX `idx_trangthai` (`trangThai`),
  INDEX `idx_magiaodich` (`maGiaoDich`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 5. Bảng Sử Dụng Tài Nguyên
DROP TABLE IF EXISTS `su_dung_tai_nguyen`;
CREATE TABLE `su_dung_tai_nguyen` (
  `suDungId` VARCHAR(50) PRIMARY KEY,
  `dongHoId` VARCHAR(50) NOT NULL,
  `loaiTaiNguyen` VARCHAR(50) NOT NULL COMMENT 'members, storage, events, documents, ai_chat',
  `giaTriHienTai` INT NOT NULL COMMENT 'Giá trị đang sử dụng',
  `gioiHanToiDa` INT COMMENT 'Giới hạn theo gói, NULL = không giới hạn',
  `thangNam` VARCHAR(7) NOT NULL COMMENT 'YYYY-MM để theo dõi theo tháng',
  `ngayCapNhat` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`dongHoId`) REFERENCES `dongho`(`dongHoId`) ON DELETE CASCADE,
  UNIQUE KEY `uk_dongho_loai_thang` (`dongHoId`, `loaiTaiNguyen`, `thangNam`),
  INDEX `idx_dongho_thang` (`dongHoId`, `thangNam`),
  INDEX `idx_loai` (`loaiTaiNguyen`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Cập nhật bảng dongho
ALTER TABLE `dongho` 
ADD COLUMN `goiDichVuHienTai` VARCHAR(50) COMMENT 'Gói đang sử dụng',
ADD COLUMN `trangThaiDangKy` VARCHAR(50) DEFAULT 'trial' COMMENT 'trial, active, expired',
ADD COLUMN `ngayHetHan` DATE COMMENT 'Ngày hết hạn gói hiện tại',
ADD FOREIGN KEY (`goiDichVuHienTai`) REFERENCES `goi_dich_vu`(`goiDichVuId`);

-- 7. Cập nhật bảng nguoidung để hỗ trợ Super Admin
-- Super Admin sẽ có dongHoId = NULL
ALTER TABLE `nguoidung` 
MODIFY COLUMN `dongHoId` VARCHAR(50) DEFAULT NULL COMMENT 'NULL cho Super Admin';


-- =====================================================
-- SEED DATA - Dữ liệu mẫu
-- =====================================================

-- Insert Gói Dịch Vụ
INSERT INTO `goi_dich_vu` VALUES
('GOI_FREE', 'FREE', 'Gói Miễn Phí', 
 'Gói miễn phí với các tính năng cơ bản để bắt đầu quản lý dòng họ', 
 0, 0, 0, 1, 1, NOW(), NULL, NULL),

('GOI_BASIC', 'BASIC', 'Gói Cơ Bản', 
 'Gói cơ bản với đầy đủ tính năng quản lý dòng họ và tài chính', 
 199000, 1990000, 14, 2, 1, NOW(), NULL, NULL),

('GOI_PREMIUM', 'PREMIUM', 'Gói Cao Cấp', 
 'Gói cao cấp với AI chat, báo cáo nâng cao và không giới hạn thành viên', 
 499000, 4990000, 14, 3, 1, NOW(), NULL, NULL),

('GOI_ENTERPRISE', 'ENTERPRISE', 'Gói Doanh Nghiệp', 
 'Gói doanh nghiệp với tất cả tính năng, hỗ trợ ưu tiên 24/7 và tùy chỉnh', 
 2000000, 20000000, 30, 4, 1, NOW(), NULL, NULL);

-- Insert Giới Hạn cho Gói FREE
INSERT INTO `gioi_han_goi` VALUES
('LIMIT_FREE_001', 'GOI_FREE', 'max_members', 50, 'Tối đa 50 thành viên', 1, NULL, NULL),
('LIMIT_FREE_002', 'GOI_FREE', 'max_admins', 1, 'Tối đa 1 Thư Đồ', 1, NULL, NULL),
('LIMIT_FREE_003', 'GOI_FREE', 'storage_mb', 100, 'Dung lượng lưu trữ 100 MB', 1, NULL, NULL),
('LIMIT_FREE_004', 'GOI_FREE', 'max_events_per_year', 10, 'Tối đa 10 sự kiện/năm', 1, NULL, NULL),
('LIMIT_FREE_005', 'GOI_FREE', 'max_documents', 10, 'Tối đa 10 tài liệu', 1, NULL, NULL),
('LIMIT_FREE_006', 'GOI_FREE', 'enable_finance', 0, 'Không hỗ trợ quản lý tài chính', 1, NULL, NULL),
('LIMIT_FREE_007', 'GOI_FREE', 'enable_ai_chat', 0, 'Không hỗ trợ AI chat', 1, NULL, NULL),
('LIMIT_FREE_008', 'GOI_FREE', 'enable_advanced_reports', 0, 'Không hỗ trợ báo cáo nâng cao', 1, NULL, NULL);

-- Insert Giới Hạn cho Gói BASIC
INSERT INTO `gioi_han_goi` VALUES
('LIMIT_BASIC_001', 'GOI_BASIC', 'max_members', 200, 'Tối đa 200 thành viên', 1, NULL, NULL),
('LIMIT_BASIC_002', 'GOI_BASIC', 'max_admins', 3, 'Tối đa 3 Thư Đồ', 1, NULL, NULL),
('LIMIT_BASIC_003', 'GOI_BASIC', 'storage_mb', 1024, 'Dung lượng lưu trữ 1 GB', 1, NULL, NULL),
('LIMIT_BASIC_004', 'GOI_BASIC', 'max_events_per_year', NULL, 'Không giới hạn sự kiện', 1, NULL, NULL),
('LIMIT_BASIC_005', 'GOI_BASIC', 'max_documents', NULL, 'Không giới hạn tài liệu', 1, NULL, NULL),
('LIMIT_BASIC_006', 'GOI_BASIC', 'enable_finance', 1, 'Hỗ trợ quản lý tài chính', 1, NULL, NULL),
('LIMIT_BASIC_007', 'GOI_BASIC', 'enable_ai_chat', 0, 'Không hỗ trợ AI chat', 1, NULL, NULL),
('LIMIT_BASIC_008', 'GOI_BASIC', 'enable_advanced_reports', 0, 'Không hỗ trợ báo cáo nâng cao', 1, NULL, NULL);


-- Insert Giới Hạn cho Gói PREMIUM
INSERT INTO `gioi_han_goi` VALUES
('LIMIT_PREMIUM_001', 'GOI_PREMIUM', 'max_members', NULL, 'Không giới hạn thành viên', 1, NULL, NULL),
('LIMIT_PREMIUM_002', 'GOI_PREMIUM', 'max_admins', NULL, 'Không giới hạn Thư Đồ', 1, NULL, NULL),
('LIMIT_PREMIUM_003', 'GOI_PREMIUM', 'storage_mb', 10240, 'Dung lượng lưu trữ 10 GB', 1, NULL, NULL),
('LIMIT_PREMIUM_004', 'GOI_PREMIUM', 'max_events_per_year', NULL, 'Không giới hạn sự kiện', 1, NULL, NULL),
('LIMIT_PREMIUM_005', 'GOI_PREMIUM', 'max_documents', NULL, 'Không giới hạn tài liệu', 1, NULL, NULL),
('LIMIT_PREMIUM_006', 'GOI_PREMIUM', 'enable_finance', 1, 'Hỗ trợ quản lý tài chính', 1, NULL, NULL),
('LIMIT_PREMIUM_007', 'GOI_PREMIUM', 'enable_ai_chat', 1, 'Hỗ trợ AI chat', 1, NULL, NULL),
('LIMIT_PREMIUM_008', 'GOI_PREMIUM', 'ai_chat_monthly', 100, 'Tối đa 100 câu hỏi AI/tháng', 1, NULL, NULL),
('LIMIT_PREMIUM_009', 'GOI_PREMIUM', 'enable_advanced_reports', 1, 'Hỗ trợ báo cáo nâng cao', 1, NULL, NULL),
('LIMIT_PREMIUM_010', 'GOI_PREMIUM', 'backup_frequency', 7, 'Backup tự động hàng tuần', 1, NULL, NULL);

-- Insert Giới Hạn cho Gói ENTERPRISE
INSERT INTO `gioi_han_goi` VALUES
('LIMIT_ENTERPRISE_001', 'GOI_ENTERPRISE', 'max_members', NULL, 'Không giới hạn thành viên', 1, NULL, NULL),
('LIMIT_ENTERPRISE_002', 'GOI_ENTERPRISE', 'max_admins', NULL, 'Không giới hạn Thư Đồ', 1, NULL, NULL),
('LIMIT_ENTERPRISE_003', 'GOI_ENTERPRISE', 'storage_mb', 51200, 'Dung lượng lưu trữ 50 GB', 1, NULL, NULL),
('LIMIT_ENTERPRISE_004', 'GOI_ENTERPRISE', 'max_events_per_year', NULL, 'Không giới hạn sự kiện', 1, NULL, NULL),
('LIMIT_ENTERPRISE_005', 'GOI_ENTERPRISE', 'max_documents', NULL, 'Không giới hạn tài liệu', 1, NULL, NULL),
('LIMIT_ENTERPRISE_006', 'GOI_ENTERPRISE', 'enable_finance', 1, 'Hỗ trợ quản lý tài chính', 1, NULL, NULL),
('LIMIT_ENTERPRISE_007', 'GOI_ENTERPRISE', 'enable_ai_chat', 1, 'Hỗ trợ AI chat', 1, NULL, NULL),
('LIMIT_ENTERPRISE_008', 'GOI_ENTERPRISE', 'ai_chat_monthly', NULL, 'Không giới hạn AI chat', 1, NULL, NULL),
('LIMIT_ENTERPRISE_009', 'GOI_ENTERPRISE', 'enable_advanced_reports', 1, 'Hỗ trợ báo cáo nâng cao', 1, NULL, NULL),
('LIMIT_ENTERPRISE_010', 'GOI_ENTERPRISE', 'enable_api_access', 1, 'Hỗ trợ API access', 1, NULL, NULL),
('LIMIT_ENTERPRISE_011', 'GOI_ENTERPRISE', 'backup_frequency', 1, 'Backup tự động hàng ngày', 1, NULL, NULL);

-- =====================================================
-- VIEWS - Các view hữu ích
-- =====================================================

-- View: Thông tin đăng ký gói hiện tại của dòng họ
CREATE OR REPLACE VIEW `v_dang_ky_hien_tai` AS
SELECT 
  dk.dongHoId,
  dh.tenDongHo,
  goi.tenGoi,
  goi.maGoi,
  dk.ngayBatDau,
  dk.ngayKetThuc,
  dk.trangThai,
  DATEDIFF(dk.ngayKetThuc, CURDATE()) AS soNgayConLai
FROM dang_ky_goi dk
JOIN dongho dh ON dk.dongHoId = dh.dongHoId
JOIN goi_dich_vu goi ON dk.goiDichVuId = goi.goiDichVuId
WHERE dk.trangThai IN ('trial', 'active')
  AND dk.active_flag = 1;


-- View: Mức sử dụng tài nguyên so với giới hạn
CREATE OR REPLACE VIEW `v_su_dung_tai_nguyen` AS
SELECT 
  sd.dongHoId,
  dh.tenDongHo,
  sd.loaiTaiNguyen,
  sd.giaTriHienTai,
  sd.gioiHanToiDa,
  CASE 
    WHEN sd.gioiHanToiDa IS NULL THEN 0
    ELSE ROUND((sd.giaTriHienTai / sd.gioiHanToiDa) * 100, 2)
  END AS phanTramSuDung,
  CASE 
    WHEN sd.gioiHanToiDa IS NULL THEN 'unlimited'
    WHEN sd.giaTriHienTai >= sd.gioiHanToiDa THEN 'exceeded'
    WHEN sd.giaTriHienTai >= sd.gioiHanToiDa * 0.8 THEN 'warning'
    ELSE 'normal'
  END AS trangThaiSuDung
FROM su_dung_tai_nguyen sd
JOIN dongho dh ON sd.dongHoId = dh.dongHoId
WHERE sd.thangNam = DATE_FORMAT(CURDATE(), '%Y-%m');

-- View: Doanh thu theo tháng
CREATE OR REPLACE VIEW `v_doanh_thu_thang` AS
SELECT 
  DATE_FORMAT(tt.ngayThanhToan, '%Y-%m') AS thangNam,
  COUNT(*) AS soLuongThanhToan,
  SUM(tt.soTien) AS tongDoanhThu,
  AVG(tt.soTien) AS doanhThuTrungBinh
FROM thanh_toan tt
WHERE tt.trangThai = 'completed'
  AND tt.active_flag = 1
GROUP BY DATE_FORMAT(tt.ngayThanhToan, '%Y-%m')
ORDER BY thangNam DESC;

-- View: Thống kê gói dịch vụ
CREATE OR REPLACE VIEW `v_thong_ke_goi` AS
SELECT 
  goi.tenGoi,
  goi.maGoi,
  COUNT(DISTINCT dk.dongHoId) AS soLuongDongHo,
  SUM(CASE WHEN dk.trangThai = 'active' THEN 1 ELSE 0 END) AS soLuongActive,
  SUM(CASE WHEN dk.trangThai = 'trial' THEN 1 ELSE 0 END) AS soLuongTrial,
  SUM(CASE WHEN dk.trangThai = 'expired' THEN 1 ELSE 0 END) AS soLuongExpired
FROM goi_dich_vu goi
LEFT JOIN dang_ky_goi dk ON goi.goiDichVuId = dk.goiDichVuId AND dk.active_flag = 1
WHERE goi.active_flag = 1
GROUP BY goi.goiDichVuId, goi.tenGoi, goi.maGoi;

-- =====================================================
-- STORED PROCEDURES - Các thủ tục hữu ích
-- =====================================================

-- Procedure: Kiểm tra giới hạn tài nguyên
DELIMITER //
CREATE PROCEDURE sp_check_resource_limit(
  IN p_dongHoId VARCHAR(50),
  IN p_loaiTaiNguyen VARCHAR(50),
  OUT p_canAdd BOOLEAN,
  OUT p_current INT,
  OUT p_limit INT
)
BEGIN
  DECLARE v_gioiHan INT;
  DECLARE v_suDung INT;
  
  -- Lấy giới hạn từ gói hiện tại
  SELECT gh.giaTriGioiHan INTO v_gioiHan
  FROM dongho dh
  JOIN goi_dich_vu goi ON dh.goiDichVuHienTai = goi.goiDichVuId
  JOIN gioi_han_goi gh ON goi.goiDichVuId = gh.goiDichVuId
  WHERE dh.dongHoId = p_dongHoId
    AND gh.tenGioiHan = p_loaiTaiNguyen
    AND gh.active_flag = 1;
  
  -- Lấy mức sử dụng hiện tại
  SELECT giaTriHienTai INTO v_suDung
  FROM su_dung_tai_nguyen
  WHERE dongHoId = p_dongHoId
    AND loaiTaiNguyen = p_loaiTaiNguyen
    AND thangNam = DATE_FORMAT(CURDATE(), '%Y-%m');
  
  -- Nếu không có record usage, tạo mới
  IF v_suDung IS NULL THEN
    SET v_suDung = 0;
  END IF;
  
  -- Kiểm tra
  SET p_current = v_suDung;
  SET p_limit = v_gioiHan;
  
  IF v_gioiHan IS NULL THEN
    SET p_canAdd = TRUE; -- Không giới hạn
  ELSEIF v_suDung < v_gioiHan THEN
    SET p_canAdd = TRUE;
  ELSE
    SET p_canAdd = FALSE;
  END IF;
END //
DELIMITER ;


-- Procedure: Cập nhật mức sử dụng tài nguyên
DELIMITER //
CREATE PROCEDURE sp_update_resource_usage(
  IN p_dongHoId VARCHAR(50),
  IN p_loaiTaiNguyen VARCHAR(50),
  IN p_increment INT
)
BEGIN
  DECLARE v_thangNam VARCHAR(7);
  DECLARE v_gioiHan INT;
  
  SET v_thangNam = DATE_FORMAT(CURDATE(), '%Y-%m');
  
  -- Lấy giới hạn
  SELECT gh.giaTriGioiHan INTO v_gioiHan
  FROM dongho dh
  JOIN goi_dich_vu goi ON dh.goiDichVuHienTai = goi.goiDichVuId
  JOIN gioi_han_goi gh ON goi.goiDichVuId = gh.goiDichVuId
  WHERE dh.dongHoId = p_dongHoId
    AND gh.tenGioiHan = p_loaiTaiNguyen;
  
  -- Insert hoặc update
  INSERT INTO su_dung_tai_nguyen (
    suDungId, dongHoId, loaiTaiNguyen, giaTriHienTai, gioiHanToiDa, thangNam
  ) VALUES (
    UUID(), p_dongHoId, p_loaiTaiNguyen, p_increment, v_gioiHan, v_thangNam
  )
  ON DUPLICATE KEY UPDATE
    giaTriHienTai = giaTriHienTai + p_increment,
    gioiHanToiDa = v_gioiHan,
    ngayCapNhat = NOW();
END //
DELIMITER ;

-- Procedure: Hạ cấp xuống gói FREE khi hết hạn
DELIMITER //
CREATE PROCEDURE sp_downgrade_to_free(
  IN p_dongHoId VARCHAR(50)
)
BEGIN
  DECLARE v_goiFreeId VARCHAR(50);
  
  -- Lấy ID gói FREE
  SELECT goiDichVuId INTO v_goiFreeId
  FROM goi_dich_vu
  WHERE maGoi = 'FREE' AND active_flag = 1
  LIMIT 1;
  
  -- Cập nhật đăng ký cũ thành expired
  UPDATE dang_ky_goi
  SET trangThai = 'expired',
      lu_updated = NOW()
  WHERE dongHoId = p_dongHoId
    AND trangThai IN ('active', 'trial');
  
  -- Tạo đăng ký mới với gói FREE
  INSERT INTO dang_ky_goi (
    dangKyId, dongHoId, goiDichVuId, ngayBatDau, ngayKetThuc,
    trangThai, loaiThanhToan, ngayTao
  ) VALUES (
    UUID(), p_dongHoId, v_goiFreeId, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 100 YEAR),
    'active', 'free', NOW()
  );
  
  -- Cập nhật bảng dongho
  UPDATE dongho
  SET goiDichVuHienTai = v_goiFreeId,
      trangThaiDangKy = 'active',
      ngayHetHan = DATE_ADD(CURDATE(), INTERVAL 100 YEAR),
      lu_updated = NOW()
  WHERE dongHoId = p_dongHoId;
  
  -- Reset usage về giới hạn FREE
  DELETE FROM su_dung_tai_nguyen WHERE dongHoId = p_dongHoId;
END //
DELIMITER ;

-- =====================================================
-- TRIGGERS - Tự động cập nhật
-- =====================================================

-- Trigger: Tự động cập nhật dongho khi có đăng ký mới
DELIMITER //
CREATE TRIGGER trg_after_insert_dang_ky_goi
AFTER INSERT ON dang_ky_goi
FOR EACH ROW
BEGIN
  IF NEW.trangThai IN ('active', 'trial') THEN
    UPDATE dongho
    SET goiDichVuHienTai = NEW.goiDichVuId,
        trangThaiDangKy = NEW.trangThai,
        ngayHetHan = NEW.ngayKetThuc,
        lu_updated = NOW()
    WHERE dongHoId = NEW.dongHoId;
  END IF;
END //
DELIMITER ;

-- =====================================================
-- INDEXES - Tối ưu performance
-- =====================================================

-- Đã có trong định nghĩa bảng, nhưng liệt kê lại để rõ ràng:
-- INDEX idx_dongho_trangthai ON dang_ky_goi (dongHoId, trangThai)
-- INDEX idx_ngayketthuc ON dang_ky_goi (ngayKetThuc)
-- INDEX idx_trangthai ON thanh_toan (trangThai)
-- INDEX idx_magiaodich ON thanh_toan (maGiaoDich)

-- =====================================================
-- KẾT THÚC SCRIPT
-- =====================================================
