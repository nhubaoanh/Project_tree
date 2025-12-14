DELIMITER $$

DROP PROCEDURE IF EXISTS `ImportThanhVienFromJson`$$

CREATE PROCEDURE `ImportThanhVienFromJson`(
    IN p_json_data JSON,
    IN p_dong_ho_id VARCHAR(36),
    IN p_nguoi_tao_id VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_err_code = RETURNED_SQLSTATE, 
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_err_code = 0;
    SET p_err_msg = '';

    START TRANSACTION;

    -- 1. Tạo bảng tạm chứa dữ liệu từ JSON
    DROP TEMPORARY TABLE IF EXISTS TempThanhVien;
    CREATE TEMPORARY TABLE TempThanhVien (
        stt INT,
        hoTen VARCHAR(255),
        gioiTinh TINYINT,
        ngaySinh DATE,
        ngayMat DATE,
        noiSinh VARCHAR(255),
        noiMat VARCHAR(255),
        ngheNghiep VARCHAR(255),
        trinhDoHocVan VARCHAR(255),
        diaChiHienTai VARCHAR(500),
        tieuSu TEXT,
        doiThuoc INT,
        chaId INT,
        meId INT,
        voId INT,
        chongId INT,
        real_id INT DEFAULT NULL
    );

    -- 2. Parse JSON vào bảng tạm
    INSERT INTO TempThanhVien (stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat, 
                               ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc,
                               chaId, meId, voId, chongId)
    SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.stt')) + 0,
        JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.hoTen')),
        JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.gioiTinh')) + 0,
        CASE 
            WHEN JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.ngaySinh')) IN ('null', '', 'undefined') THEN NULL
            ELSE JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.ngaySinh'))
        END,
        CASE 
            WHEN JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.ngayMat')) IN ('null', '', 'undefined') THEN NULL
            ELSE JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.ngayMat'))
        END,
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.noiSinh')), ''),
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.noiMat')), ''),
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.ngheNghiep')), ''),
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.trinhDoHocVan')), ''),
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.diaChiHienTai')), ''),
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.tieuSu')), ''),
        IFNULL(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.doiThuoc')) + 0, 1),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.chaId')) + 0, 0),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.meId')) + 0, 0),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.voId')) + 0, 0),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.doc, '$.chongId')) + 0, 0)
    FROM JSON_TABLE(p_json_data, '$[*]' COLUMNS (doc JSON PATH '$')) AS j;

    -- 3. Insert thành viên (FK = NULL trước)
    INSERT INTO thanhvien (
        dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat, 
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, 
        diaChiHienTai, tieuSu, doiThuoc,
        chaId, meId, voId, chongId,
        nguoiTaoId, ngayTao, active_flag
    )
    SELECT 
        p_dong_ho_id,
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
        NULL, NULL, NULL, NULL,
        p_nguoi_tao_id,
        NOW(),
        1
    FROM TempThanhVien t
    ORDER BY t.doiThuoc ASC, t.stt ASC;

    -- 4. Map STT -> real_id (dựa trên hoTen vừa insert)
    UPDATE TempThanhVien t
    INNER JOIN thanhvien tv ON tv.hoTen = t.hoTen 
        AND tv.dongHoId = p_dong_ho_id 
        AND tv.doiThuoc = t.doiThuoc
    SET t.real_id = tv.thanhVienId;

    -- 5. Update quan hệ cha/mẹ/vợ/chồng
    UPDATE thanhvien tv
    INNER JOIN TempThanhVien t ON tv.thanhVienId = t.real_id
    LEFT JOIN TempThanhVien t_cha ON t.chaId = t_cha.stt
    LEFT JOIN TempThanhVien t_me ON t.meId = t_me.stt
    LEFT JOIN TempThanhVien t_vo ON t.voId = t_vo.stt
    LEFT JOIN TempThanhVien t_chong ON t.chongId = t_chong.stt
    SET 
        tv.chaId = t_cha.real_id,
        tv.meId = t_me.real_id,
        tv.voId = CASE WHEN t.gioiTinh = 1 THEN t_vo.real_id ELSE NULL END,
        tv.chongId = CASE WHEN t.gioiTinh = 0 THEN t_chong.real_id ELSE NULL END
    WHERE tv.dongHoId = p_dong_ho_id;

    -- 6. Đếm số bản ghi
    SELECT COUNT(*) INTO v_count FROM TempThanhVien;

    DROP TEMPORARY TABLE IF EXISTS TempThanhVien;

    COMMIT;

    SET p_err_msg = CONCAT('Import thanh cong ', v_count, ' thanh vien');
END$$

DELIMITER ;
