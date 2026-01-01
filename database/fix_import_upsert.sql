-- =====================================================
-- FIX IMPORT: UPSERT (INSERT OR UPDATE)
-- Nếu mã thành viên (stt) + dòng họ đã tồn tại → UPDATE
-- Nếu chưa tồn tại → INSERT mới
-- =====================================================

DROP PROCEDURE IF EXISTS `ImportThanhVienFromJsonComposite`;
DELIMITER //
CREATE PROCEDURE `ImportThanhVienFromJsonComposite`(
    IN p_jsonData JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_inserted INT DEFAULT 0;
    DECLARE v_updated INT DEFAULT 0;
    DECLARE v_maxId INT DEFAULT 0;
    
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

    -- Lấy max ID hiện tại của dòng họ
    SELECT COALESCE(MAX(thanhVienId), 0) INTO v_maxId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId
    FOR UPDATE;

    -- Tạo bảng tạm để xử lý JSON
    DROP TEMPORARY TABLE IF EXISTS tmp_import;
    CREATE TEMPORARY TABLE tmp_import (
        stt INT,
        hoTen VARCHAR(255),
        gioiTinh TINYINT,
        ngaySinh DATE,
        ngayMat DATE,
        noiSinh VARCHAR(255),
        noiMat VARCHAR(255),
        ngheNghiep VARCHAR(255),
        trinhDoHocVan VARCHAR(255),
        diaChiHienTai VARCHAR(255),
        tieuSu TEXT,
        doiThuoc INT,
        chaId INT,
        meId INT,
        voId INT,
        chongId INT,
        is_existing TINYINT DEFAULT 0
    );

    -- Parse JSON vào bảng tạm
    INSERT INTO tmp_import (stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat, 
                            ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc,
                            chaId, meId, voId, chongId)
    SELECT 
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.stt')) AS UNSIGNED),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.hoTen')),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.gioiTinh')) AS UNSIGNED),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngaySinh')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngayMat')), 'null'),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.noiSinh')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.noiMat')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngheNghiep')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.trinhDoHocVan')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.diaChiHienTai')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.tieuSu')),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.doiThuoc')) AS UNSIGNED),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.chaId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.meId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.voId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.chongId')), 'null')
    FROM JSON_TABLE(p_jsonData, '$[*]' COLUMNS (value JSON PATH '$')) AS j;

    -- Đánh dấu những record đã tồn tại trong DB
    UPDATE tmp_import t
    SET is_existing = 1
    WHERE EXISTS (
        SELECT 1 FROM thanhvien tv 
        WHERE tv.dongHoId = p_dongHoId 
        AND tv.thanhVienId = t.stt
        AND tv.active_flag = 1
    );

    -- UPDATE những thành viên đã tồn tại
    UPDATE thanhvien tv
    INNER JOIN tmp_import t ON tv.thanhVienId = t.stt AND tv.dongHoId = p_dongHoId
    SET 
        tv.hoTen = t.hoTen,
        tv.gioiTinh = t.gioiTinh,
        tv.ngaySinh = t.ngaySinh,
        tv.ngayMat = t.ngayMat,
        tv.noiSinh = t.noiSinh,
        tv.noiMat = t.noiMat,
        tv.ngheNghiep = t.ngheNghiep,
        tv.trinhDoHocVan = t.trinhDoHocVan,
        tv.diaChiHienTai = t.diaChiHienTai,
        tv.tieuSu = t.tieuSu,
        tv.doiThuoc = t.doiThuoc,
        tv.chaId = t.chaId,
        tv.meId = t.meId,
        tv.voId = t.voId,
        tv.chongId = t.chongId,
        tv.lu_updated = NOW(),
        tv.lu_user_id = p_nguoiTaoId
    WHERE t.is_existing = 1;
    
    SET v_updated = ROW_COUNT();

    -- INSERT những thành viên mới (chưa tồn tại)
    INSERT INTO thanhvien (
        thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
        tieuSu, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    )
    SELECT 
        t.stt,
        p_dongHoId,
        t.hoTen,
        t.gioiTinh,
        t.ngaySinh,
        t.ngayMat,
        t.noiSinh,
        t.noiMat,
        t.ngheNghiep,
        t.trinhDoHocVan,
        t.diaChiHienTai,
        t.tieuSu,
        t.doiThuoc,
        t.chaId,
        t.meId,
        t.voId,
        t.chongId,
        NOW(),
        1,
        p_nguoiTaoId,
        NOW(),
        p_nguoiTaoId
    FROM tmp_import t
    WHERE t.is_existing = 0
    ORDER BY t.stt;
    
    SET v_inserted = ROW_COUNT();

    SET p_error_message = CONCAT('Import thành công: ', v_inserted, ' thêm mới, ', v_updated, ' cập nhật');

    DROP TEMPORARY TABLE IF EXISTS tmp_import;

    COMMIT;
END //
DELIMITER ;

