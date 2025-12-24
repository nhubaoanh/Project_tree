-- =============================================
-- STORED PROCEDURES CHO BẢNG DONGHO
-- =============================================

DELIMITER $$

-- =============================================
-- 1. INSERT DONG HO
-- =============================================
DROP PROCEDURE IF EXISTS `InsertDongHo`$$
CREATE PROCEDURE `InsertDongHo`(
    IN p_dongHoId VARCHAR(50),
    IN p_tenDongHo VARCHAR(255),
    IN p_queQuanGoc VARCHAR(255),
    IN p_ngayThanhLap DATE,
    IN p_nguoiQuanLy VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    INSERT INTO dongho (
        dongHoId,
        tenDongHo,
        queQuanGoc,
        ngayThanhLap,
        nguoiQuanLy,
        ghiChu,
        active_flag,
        nguoiTaoId,
        ngayTao,
        lu_updated,
        lu_user_id
    ) VALUES (
        p_dongHoId,
        p_tenDongHo,
        p_queQuanGoc,
        p_ngayThanhLap,
        p_nguoiQuanLy,
        p_ghiChu,
        1,
        p_nguoiTaoId,
        NOW(),
        NOW(),
        p_nguoiTaoId
    );

    COMMIT;
END$$

-- =============================================
-- 2. UPDATE DONG HO
-- =============================================
DROP PROCEDURE IF EXISTS `UpdateDongHo`$$
CREATE PROCEDURE `UpdateDongHo`(
    IN p_dongHoId VARCHAR(50),
    IN p_tenDongHo VARCHAR(255),
    IN p_queQuanGoc VARCHAR(255),
    IN p_ngayThanhLap DATE,
    IN p_nguoiQuanLy VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    UPDATE dongho 
    SET 
        tenDongHo = COALESCE(p_tenDongHo, tenDongHo),
        queQuanGoc = COALESCE(p_queQuanGoc, queQuanGoc),
        ngayThanhLap = COALESCE(p_ngayThanhLap, ngayThanhLap),
        nguoiQuanLy = COALESCE(p_nguoiQuanLy, nguoiQuanLy),
        ghiChu = COALESCE(p_ghiChu, ghiChu),
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE dongHoId = p_dongHoId AND active_flag = 1;

    COMMIT;
END$$

-- =============================================
-- 3. DELETE DONG HO (Soft Delete)
-- =============================================
DROP PROCEDURE IF EXISTS `DeleteDongHo`$$
CREATE PROCEDURE `DeleteDongHo`(
    IN p_dongHoId VARCHAR(50),
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    UPDATE dongho 
    SET 
        active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE dongHoId = p_dongHoId;

    COMMIT;
END$$

-- =============================================
-- 4. GET DONG HO BY ID
-- =============================================
DROP PROCEDURE IF EXISTS `GetDongHoById`$$
CREATE PROCEDURE `GetDongHoById`(
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
        dongHoId,
        tenDongHo,
        queQuanGoc,
        ngayThanhLap,
        nguoiQuanLy,
        ghiChu,
        active_flag,
        nguoiTaoId,
        ngayTao,
        lu_updated,
        lu_user_id
    FROM dongho 
    WHERE dongHoId = p_dongHoId AND active_flag = 1;
END$$

-- =============================================
-- 5. GET ALL DONG HO (đã có sẵn, thêm lại cho đầy đủ)
-- =============================================
DROP PROCEDURE IF EXISTS `getAllDongHo`$$
CREATE PROCEDURE `getAllDongHo`(
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
        dongHoId,
        tenDongHo,
        queQuanGoc,
        ngayThanhLap,
        nguoiQuanLy,
        ghiChu,
        active_flag,
        nguoiTaoId,
        ngayTao,
        lu_updated,
        lu_user_id
    FROM dongho 
    WHERE active_flag = 1
    ORDER BY ngayTao DESC;
END$$

DELIMITER ;


-- =============================================
-- 6. SEARCH THANH VIEN BY DONG HO ID
-- Tìm kiếm thành viên theo dòng họ cụ thể
-- =============================================
DELIMITER $$

DROP PROCEDURE IF EXISTS `SearchThanhVienByDongHo`$$
CREATE PROCEDURE `SearchThanhVienByDongHo`(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_offset INT;
    DECLARE v_total INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Tính offset
    SET v_offset = (p_pageIndex - 1) * p_pageSize;

    -- Đếm tổng số bản ghi
    SELECT COUNT(*) INTO v_total
    FROM thanhvien
    WHERE active_flag = 1
      AND dongHoId = p_dongHoId
      AND (
          p_search_content IS NULL 
          OR p_search_content = ''
          OR hoTen LIKE CONCAT('%', p_search_content, '%')
          OR ngheNghiep LIKE CONCAT('%', p_search_content, '%')
          OR diaChiHienTai LIKE CONCAT('%', p_search_content, '%')
      );

    -- Lấy dữ liệu có phân trang
    SELECT 
        tv.thanhVienId,
        tv.dongHoId,
        tv.hoTen,
        tv.gioiTinh,
        tv.ngaySinh,
        tv.ngayMat,
        tv.noiSinh,
        tv.noiMat,
        tv.ngheNghiep,
        tv.trinhDoHocVan,
        tv.diaChiHienTai,
        tv.tieuSu,
        tv.anhChanDung,
        tv.doiThuoc,
        tv.chaId,
        tv.meId,
        tv.voId,
        tv.chongId,
        tv.ngayTao,
        tv.active_flag,
        tv.nguoiTaoId,
        tv.lu_updated,
        tv.lu_user_id,
        cha.hoTen AS tenCha,
        me.hoTen AS tenMe,
        vo.hoTen AS tenVo,
        chong.hoTen AS tenChong,
        v_total AS RecordCount
    FROM thanhvien tv
    LEFT JOIN thanhvien cha ON tv.chaId = cha.thanhVienId
    LEFT JOIN thanhvien me ON tv.meId = me.thanhVienId
    LEFT JOIN thanhvien vo ON tv.voId = vo.thanhVienId
    LEFT JOIN thanhvien chong ON tv.chongId = chong.thanhVienId
    WHERE tv.active_flag = 1
      AND tv.dongHoId = p_dongHoId
      AND (
          p_search_content IS NULL 
          OR p_search_content = ''
          OR tv.hoTen LIKE CONCAT('%', p_search_content, '%')
          OR tv.ngheNghiep LIKE CONCAT('%', p_search_content, '%')
          OR tv.diaChiHienTai LIKE CONCAT('%', p_search_content, '%')
      )
    ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC
    LIMIT p_pageSize OFFSET v_offset;
END$$

DELIMITER ;
