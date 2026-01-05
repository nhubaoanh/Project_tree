-- =====================================================
-- CẬP NHẬT CÁC STORED PROCEDURES DELETE NHIỀU
-- Chạy file này trong MySQL Workbench
-- =====================================================

-- 1. DELETE SỰ KIỆN (sukien)
DROP PROCEDURE IF EXISTS DeleteSuKien;
DELIMITER $$
CREATE PROCEDURE DeleteSuKien(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.suKienId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE sukien
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE suKienId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END$$
DELIMITER ;

-- 2. DELETE TIN TỨC (tintuc)
DROP PROCEDURE IF EXISTS DeleteTinTuc;
DELIMITER $$
CREATE PROCEDURE DeleteTinTuc(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.tinTucId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE tintuc
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE tinTucId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END$$
DELIMITER ;

-- 3. DELETE THU TÀI CHÍNH (taichinhthu)
DROP PROCEDURE IF EXISTS DeleteTaiChinhThu;
DELIMITER $$
CREATE PROCEDURE DeleteTaiChinhThu(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.thuId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE taichinhthu
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE thuId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END$$
DELIMITER ;

-- 4. DELETE CHI TÀI CHÍNH (taichinhchi)
DROP PROCEDURE IF EXISTS DeleteTaiChinhChi;
DELIMITER $$
CREATE PROCEDURE DeleteTaiChinhChi(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.chiId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE taichinhchi
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE chiId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END$$
DELIMITER ;

-- 5. DELETE THÀNH VIÊN (thanhvien) - Xóa nhiều
DROP PROCEDURE IF EXISTS DeleteThanhVienMultiple;
DELIMITER $$
CREATE PROCEDURE DeleteThanhVienMultiple(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT CAST(JSON_VALUE(p.value, '$.thanhVienId') AS SIGNED) AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE thanhvien
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE thanhVienId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END$$
DELIMITER ;

-- 6. DELETE TÀI LIỆU (tailieu)
DROP PROCEDURE IF EXISTS DeleteTaiLieu;
DELIMITER $$
CREATE PROCEDURE DeleteTaiLieu(
    IN p_json_list JSON,
    IN p_lu_user_id CHAR(36),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
    CREATE TEMPORARY TABLE TempDeleteIds AS
    SELECT JSON_VALUE(p.value, '$.taiLieuId') AS id
    FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (value JSON PATH '$')) AS p;

    UPDATE tailieu
    SET active_flag = 0,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE taiLieuId IN (SELECT id FROM TempDeleteIds);

    DROP TEMPORARY TABLE IF EXISTS TempDeleteIds;
END$$
DELIMITER ;

-- =====================================================
-- HOÀN TẤT - Chạy SELECT để kiểm tra
-- =====================================================
SELECT 'Đã cập nhật tất cả stored procedures delete!' AS Result;
