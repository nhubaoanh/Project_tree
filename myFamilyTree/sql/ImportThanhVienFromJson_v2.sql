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
        ngaySinh VARCHAR(50),
        ngayMat VARCHAR(50),
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
        real_id INT DEFAULT NULL,
        INDEX idx_stt (stt),
        INDEX idx_real_id (real_id)
    );

    -- 2. Parse JSON vào bảng tạm
    INSERT INTO TempThanhVien (stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat, 
                               ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc,
                               chaId, meId, voId, chongId)
    SELECT 
        CAST(JSON_VALUE(item.value, '$.stt') AS UNSIGNED),
        JSON_VALUE(item.value, '$.hoTen'),
        CAST(JSON_VALUE(item.value, '$.gioiTinh') AS UNSIGNED),
        JSON_VALUE(item.value, '$.ngaySinh'),
        JSON_VALUE(item.value, '$.ngayMat'),
        JSON_VALUE(item.value, '$.noiSinh'),
        JSON_VALUE(item.value, '$.noiMat'),
        JSON_VALUE(item.value, '$.ngheNghiep'),
        JSON_VALUE(item.value, '$.trinhDoHocVan'),
        JSON_VALUE(item.value, '$.diaChiHienTai'),
        JSON_VALUE(item.value, '$.tieuSu'),
        IFNULL(CAST(JSON_VALUE(item.value, '$.doiThuoc') AS UNSIGNED), 1),
        NULLIF(CAST(JSON_VALUE(item.value, '$.chaId') AS UNSIGNED), 0),
        NULLIF(CAST(JSON_VALUE(item.value, '$.meId') AS UNSIGNED), 0),
        NULLIF(CAST(JSON_VALUE(item.value, '$.voId') AS UNSIGNED), 0),
        NULLIF(CAST(JSON_VALUE(item.value, '$.chongId') AS UNSIGNED), 0)
    FROM JSON_TABLE(p_json_data, '$[*]' COLUMNS (value JSON PATH '$')) AS item;

    -- Đếm số record
    SELECT COUNT(*) INTO v_count FROM TempThanhVien;

    -- 3. Insert từng thành viên và lưu lại real_id
    -- Dùng cursor hoặc loop để lấy LAST_INSERT_ID()
    BEGIN
        DECLARE done INT DEFAULT FALSE;
        DECLARE v_stt INT;
        DECLARE v_hoTen VARCHAR(255);
        DECLARE v_gioiTinh TINYINT;
        DECLARE v_ngaySinh VARCHAR(50);
        DECLARE v_ngayMat VARCHAR(50);
        DECLARE v_noiSinh VARCHAR(255);
        DECLARE v_noiMat VARCHAR(255);
        DECLARE v_ngheNghiep VARCHAR(255);
        DECLARE v_trinhDoHocVan VARCHAR(255);
        DECLARE v_diaChiHienTai VARCHAR(500);
        DECLARE v_tieuSu TEXT;
        DECLARE v_doiThuoc INT;
        DECLARE v_new_id INT;

        DECLARE cur CURSOR FOR 
            SELECT stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat,
                   ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc
            FROM TempThanhVien 
            ORDER BY doiThuoc ASC, stt ASC;
        
        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

        OPEN cur;

        read_loop: LOOP
            FETCH cur INTO v_stt, v_hoTen, v_gioiTinh, v_ngaySinh, v_ngayMat, 
                          v_noiSinh, v_noiMat, v_ngheNghiep, v_trinhDoHocVan, 
                          v_diaChiHienTai, v_tieuSu, v_doiThuoc;
            
            IF done THEN
                LEAVE read_loop;
            END IF;

            -- Insert thành viên (FK = NULL)
            INSERT INTO thanhvien (
                dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat, 
                noiSinh, noiMat, ngheNghiep, trinhDoHocVan, 
                diaChiHienTai, tieuSu, doiThuoc,
                chaId, meId, voId, chongId,
                nguoiTaoId, ngayTao, active_flag
            ) VALUES (
                p_dong_ho_id,
                v_hoTen,
                v_gioiTinh,
                NULLIF(v_ngaySinh, 'null'),
                NULLIF(v_ngayMat, 'null'),
                v_noiSinh,
                v_noiMat,
                v_ngheNghiep,
                v_trinhDoHocVan,
                v_diaChiHienTai,
                v_tieuSu,
                IFNULL(v_doiThuoc, 1),
                NULL, NULL, NULL, NULL,
                p_nguoi_tao_id,
                NOW(),
                1
            );

            -- Lấy ID vừa insert
            SET v_new_id = LAST_INSERT_ID();

            -- Cập nhật real_id vào bảng tạm
            UPDATE TempThanhVien SET real_id = v_new_id WHERE stt = v_stt;

        END LOOP;

        CLOSE cur;
    END;

    -- 4. Update quan hệ cha/mẹ/vợ/chồng
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
    WHERE tv.dongHoId = p_dong_ho_id 
      AND t.real_id IS NOT NULL;

    -- Cleanup
    DROP TEMPORARY TABLE IF EXISTS TempThanhVien;

    COMMIT;

    SET p_err_msg = CONCAT('Import thanh cong ', v_count, ' thanh vien');
END$$

DELIMITER ;
