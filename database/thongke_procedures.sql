-- =============================================
-- STORED PROCEDURES THỐNG KÊ GIA PHẢ
-- =============================================

DELIMITER $$

-- 1. Thống kê tổng quan theo dòng họ
DROP PROCEDURE IF EXISTS GetThongKeTongQuan$$
CREATE PROCEDURE GetThongKeTongQuan(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        COUNT(*) AS tongThanhVien,
        COUNT(CASE WHEN gioiTinh = 1 THEN 1 END) AS soNam,
        COUNT(CASE WHEN gioiTinh = 0 THEN 1 END) AS soNu,
        COUNT(CASE WHEN ngayMat IS NOT NULL THEN 1 END) AS daMat,
        COUNT(CASE WHEN ngayMat IS NULL THEN 1 END) AS conSong,
        MAX(doiThuoc) AS soDoi,
        COUNT(DISTINCT chaId) AS soChi
    FROM thanhvien
    WHERE dongHoId = p_dongHoId AND active_flag = 1;
END$$

-- 2. Thống kê số thành viên theo từng đời
DROP PROCEDURE IF EXISTS GetThongKeoTheoDoi$$
CREATE PROCEDURE GetThongKeoTheoDoi(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        doiThuoc AS doi,
        COUNT(*) AS soThanhVien,
        COUNT(CASE WHEN gioiTinh = 1 THEN 1 END) AS soNam,
        COUNT(CASE WHEN gioiTinh = 0 THEN 1 END) AS soNu,
        COUNT(CASE WHEN ngayMat IS NOT NULL THEN 1 END) AS daMat
    FROM thanhvien
    WHERE dongHoId = p_dongHoId AND active_flag = 1
    GROUP BY doiThuoc
    ORDER BY doiThuoc ASC;
END$$

-- 3. Thống kê theo chi (theo cha đời 1)
DROP PROCEDURE IF EXISTS GetThongKeoTheoChi$$
CREATE PROCEDURE GetThongKeoTheoChi(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Lấy các thành viên đời 1 (tổ tiên) làm gốc chi
    WITH RECURSIVE ChiTree AS (
        -- Đời 1: Các tổ tiên (không có cha hoặc cha không trong hệ thống)
        SELECT 
            thanhVienId,
            hoTen,
            thanhVienId AS chiGocId,
            hoTen AS tenChi,
            1 AS level
        FROM thanhvien
        WHERE dongHoId = p_dongHoId 
            AND active_flag = 1 
            AND doiThuoc = 1
            AND gioiTinh = 1  -- Chỉ lấy nam làm gốc chi
        
        UNION ALL
        
        -- Các đời sau: con cháu
        SELECT 
            tv.thanhVienId,
            tv.hoTen,
            ct.chiGocId,
            ct.tenChi,
            ct.level + 1
        FROM thanhvien tv
        INNER JOIN ChiTree ct ON tv.chaId = ct.thanhVienId
        WHERE tv.dongHoId = p_dongHoId AND tv.active_flag = 1
    )
    SELECT 
        ct.chiGocId,
        ct.tenChi AS tenChi,
        COUNT(*) AS soThanhVien,
        MAX(ct.level) AS soDoi
    FROM ChiTree ct
    GROUP BY ct.chiGocId, ct.tenChi
    ORDER BY ct.chiGocId;
END$$

-- 4. Thống kê dashboard tổng hợp
DROP PROCEDURE IF EXISTS GetDashboardStats$$
CREATE PROCEDURE GetDashboardStats(
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Nếu không truyền dongHoId, lấy tất cả
    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SELECT 
            (SELECT COUNT(*) FROM dongho WHERE active_flag = 1) AS tongDongHo,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1) AS tongThanhVien,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND gioiTinh = 1) AS tongNam,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND gioiTinh = 0) AS tongNu,
            (SELECT MAX(doiThuoc) FROM thanhvien WHERE active_flag = 1) AS doiCaoNhat,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND ngayMat IS NULL) AS conSong,
            (SELECT COUNT(*) FROM thanhvien WHERE active_flag = 1 AND ngayMat IS NOT NULL) AS daMat;
    ELSE
        SELECT 
            1 AS tongDongHo,
            COUNT(*) AS tongThanhVien,
            COUNT(CASE WHEN gioiTinh = 1 THEN 1 END) AS tongNam,
            COUNT(CASE WHEN gioiTinh = 0 THEN 1 END) AS tongNu,
            MAX(doiThuoc) AS doiCaoNhat,
            COUNT(CASE WHEN ngayMat IS NULL THEN 1 END) AS conSong,
            COUNT(CASE WHEN ngayMat IS NOT NULL THEN 1 END) AS daMat
        FROM thanhvien
        WHERE dongHoId = p_dongHoId AND active_flag = 1;
    END IF;
END$$

-- 5. Lấy danh sách thành viên mới nhất
DROP PROCEDURE IF EXISTS GetThanhVienMoiNhat$$
CREATE PROCEDURE GetThanhVienMoiNhat(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 10;
    END IF;

    SELECT 
        tv.thanhVienId,
        tv.hoTen,
        tv.gioiTinh,
        tv.ngaySinh,
        tv.doiThuoc,
        tv.ngayTao,
        dh.tenDongHo
    FROM thanhvien tv
    LEFT JOIN dongho dh ON tv.dongHoId = dh.dongHoId
    WHERE tv.active_flag = 1
        AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
    ORDER BY tv.ngayTao DESC
    LIMIT p_limit;
END$$

DELIMITER ;


-- =============================================
-- STORED PROCEDURES THỐNG KÊ TÀI CHÍNH & SỰ KIỆN
-- =============================================

DELIMITER $

-- 6. Thống kê thu chi tổng quan
DROP PROCEDURE IF EXISTS GetThongKeThuChi$
CREATE PROCEDURE GetThongKeThuChi(
    IN p_dongHoId VARCHAR(50),
    IN p_nam INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        COALESCE((SELECT SUM(soTien) FROM taichinhthu 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayDong) = p_nam)), 0) AS tongThu,
        COALESCE((SELECT SUM(soTien) FROM taichinhchi 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayChi) = p_nam)), 0) AS tongChi,
        COALESCE((SELECT COUNT(*) FROM taichinhthu 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayDong) = p_nam)), 0) AS soLanThu,
        COALESCE((SELECT COUNT(*) FROM taichinhchi 
                  WHERE dongHoId = p_dongHoId 
                  AND (p_nam IS NULL OR YEAR(ngayChi) = p_nam)), 0) AS soLanChi;
END$

-- 7. Thống kê thu chi theo tháng
DROP PROCEDURE IF EXISTS GetThongKeThuChiTheoThang$
CREATE PROCEDURE GetThongKeThuChiTheoThang(
    IN p_dongHoId VARCHAR(50),
    IN p_nam INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Nếu không truyền năm, lấy năm hiện tại
    IF p_nam IS NULL THEN
        SET p_nam = YEAR(CURDATE());
    END IF;

    SELECT 
        m.thang,
        COALESCE(t.tongThu, 0) AS tongThu,
        COALESCE(c.tongChi, 0) AS tongChi
    FROM (
        SELECT 1 AS thang UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 
        UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
    ) m
    LEFT JOIN (
        SELECT MONTH(ngayDong) AS thang, SUM(soTien) AS tongThu
        FROM taichinhthu
        WHERE dongHoId = p_dongHoId AND YEAR(ngayDong) = p_nam
        GROUP BY MONTH(ngayDong)
    ) t ON m.thang = t.thang
    LEFT JOIN (
        SELECT MONTH(ngayChi) AS thang, SUM(soTien) AS tongChi
        FROM taichinhchi
        WHERE dongHoId = p_dongHoId AND YEAR(ngayChi) = p_nam
        GROUP BY MONTH(ngayChi)
    ) c ON m.thang = c.thang
    ORDER BY m.thang;
END$

-- 8. Thống kê sự kiện tổng quan
DROP PROCEDURE IF EXISTS GetThongKeSuKien$
CREATE PROCEDURE GetThongKeSuKien(
    IN p_dongHoId VARCHAR(50),
    IN p_nam INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    SELECT 
        COUNT(*) AS tongSuKien,
        COUNT(CASE WHEN ngayDienRa < CURDATE() THEN 1 END) AS daQua,
        COUNT(CASE WHEN ngayDienRa >= CURDATE() THEN 1 END) AS sapToi,
        COUNT(CASE WHEN loaiSuKien = 'gio' THEN 1 END) AS suKienGio,
        COUNT(CASE WHEN loaiSuKien = 'cuoi' THEN 1 END) AS suKienCuoi,
        COUNT(CASE WHEN loaiSuKien = 'tang' THEN 1 END) AS suKienTang,
        COUNT(CASE WHEN loaiSuKien = 'khac' OR loaiSuKien IS NULL THEN 1 END) AS suKienKhac
    FROM sukien
    WHERE dongHoId = p_dongHoId
        AND (p_nam IS NULL OR YEAR(ngayDienRa) = p_nam);
END$

-- 9. Lấy danh sách sự kiện sắp tới
DROP PROCEDURE IF EXISTS GetSuKienSapToi$
CREATE PROCEDURE GetSuKienSapToi(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 5;
    END IF;

    SELECT 
        sk.suKienId,
        sk.tenSuKien,
        sk.ngayDienRa,
        sk.gioDienRa,
        sk.diaDiem,
        sk.moTa,
        sk.loaiSuKien,
        sk.uuTien,
        dh.tenDongHo
    FROM sukien sk
    LEFT JOIN dongho dh ON sk.dongHoId = dh.dongHoId
    WHERE sk.ngayDienRa >= CURDATE()
        AND (p_dongHoId IS NULL OR p_dongHoId = '' OR sk.dongHoId = p_dongHoId)
    ORDER BY sk.ngayDienRa ASC, sk.gioDienRa ASC
    LIMIT p_limit;
END$

-- 10. Lấy các khoản thu gần đây
DROP PROCEDURE IF EXISTS GetThuGanDay$
CREATE PROCEDURE GetThuGanDay(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 5;
    END IF;

    SELECT 
        t.thuId,
        t.hoTenNguoiDong,
        t.ngayDong,
        t.soTien,
        t.noiDung,
        t.phuongThucThanhToan,
        dh.tenDongHo
    FROM taichinhthu t
    LEFT JOIN dongho dh ON t.dongHoId = dh.dongHoId
    WHERE (p_dongHoId IS NULL OR p_dongHoId = '' OR t.dongHoId = p_dongHoId)
    ORDER BY t.ngayDong DESC
    LIMIT p_limit;
END$

-- 11. Lấy các khoản chi gần đây
DROP PROCEDURE IF EXISTS GetChiGanDay$
CREATE PROCEDURE GetChiGanDay(
    IN p_dongHoId VARCHAR(50),
    IN p_limit INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_limit IS NULL OR p_limit <= 0 THEN
        SET p_limit = 5;
    END IF;

    SELECT 
        c.chiId,
        c.nguoiNhan,
        c.ngayChi,
        c.soTien,
        c.noiDung,
        c.phuongThucThanhToan,
        dh.tenDongHo
    FROM taichinhchi c
    LEFT JOIN dongho dh ON c.dongHoId = dh.dongHoId
    WHERE (p_dongHoId IS NULL OR p_dongHoId = '' OR c.dongHoId = p_dongHoId)
    ORDER BY c.ngayChi DESC
    LIMIT p_limit;
END$

DELIMITER ;
