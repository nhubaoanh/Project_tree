-- =============================================
-- MIGRATION: Chuyển thanhvien sang Composite Primary Key
-- Chạy từng bước một, backup trước khi chạy!
-- =============================================

-- BƯỚC 0: BACKUP DỮ LIỆU TRƯỚC
-- mysqldump -u root -p treefamily thanhvien > backup_thanhvien.sql

-- =============================================
-- BƯỚC 1: Xóa các Foreign Key constraints cũ
-- =============================================
ALTER TABLE thanhvien DROP FOREIGN KEY thanhvien_ibfk_3; -- chaId
ALTER TABLE thanhvien DROP FOREIGN KEY thanhvien_ibfk_4; -- meId
ALTER TABLE thanhvien DROP FOREIGN KEY thanhvien_ibfk_5; -- voId
ALTER TABLE thanhvien DROP FOREIGN KEY thanhvien_ibfk_6; -- chongId

-- Xóa FK từ các bảng khác tham chiếu đến thanhvien (nếu có)
-- ALTER TABLE quanhe DROP FOREIGN KEY quanhe_ibfk_2;
-- ALTER TABLE tailieu DROP FOREIGN KEY tailieu_ibfk_1;

-- =============================================
-- BƯỚC 2: Xóa Primary Key cũ
-- =============================================
ALTER TABLE thanhvien DROP PRIMARY KEY;

-- =============================================
-- BƯỚC 3: Đảm bảo dongHoId NOT NULL
-- =============================================
UPDATE thanhvien SET dongHoId = 'e9022e64-cbae-11f0-8020-a8934a9bae74' WHERE dongHoId IS NULL;
ALTER TABLE thanhvien MODIFY COLUMN dongHoId VARCHAR(50) NOT NULL;

-- =============================================
-- BƯỚC 4: Tạo Composite Primary Key mới
-- =============================================
ALTER TABLE thanhvien ADD PRIMARY KEY (dongHoId, thanhVienId);

-- =============================================
-- BƯỚC 5: Tạo lại Foreign Key cho quan hệ gia đình
-- Lưu ý: FK giờ phải tham chiếu cả (dongHoId, thanhVienId)
-- =============================================

-- Thêm cột dongHoId cho các FK (cha, mẹ, vợ, chồng cùng dòng họ)
-- Không cần thêm cột mới vì cha/mẹ/vợ/chồng luôn cùng dongHoId

-- Tạo FK mới (tham chiếu composite key)
ALTER TABLE thanhvien 
ADD CONSTRAINT fk_thanhvien_cha 
FOREIGN KEY (dongHoId, chaId) REFERENCES thanhvien(dongHoId, thanhVienId) ON DELETE SET NULL;

ALTER TABLE thanhvien 
ADD CONSTRAINT fk_thanhvien_me 
FOREIGN KEY (dongHoId, meId) REFERENCES thanhvien(dongHoId, thanhVienId) ON DELETE SET NULL;

ALTER TABLE thanhvien 
ADD CONSTRAINT fk_thanhvien_vo 
FOREIGN KEY (dongHoId, voId) REFERENCES thanhvien(dongHoId, thanhVienId) ON DELETE SET NULL;

ALTER TABLE thanhvien 
ADD CONSTRAINT fk_thanhvien_chong 
FOREIGN KEY (dongHoId, chongId) REFERENCES thanhvien(dongHoId, thanhVienId) ON DELETE SET NULL;

-- =============================================
-- BƯỚC 6: Tạo Index để tối ưu query
-- =============================================
CREATE INDEX idx_thanhvien_dongho ON thanhvien(dongHoId);
CREATE INDEX idx_thanhvien_hoten ON thanhvien(dongHoId, hoTen);
CREATE INDEX idx_thanhvien_doithuoc ON thanhvien(dongHoId, doiThuoc);


-- =============================================
-- BƯỚC 7: Cập nhật các bảng liên quan (nếu có)
-- =============================================

-- Bảng quanhe (nếu có tham chiếu thanhVienId)
-- ALTER TABLE quanhe ADD COLUMN dongHoId1 VARCHAR(50);
-- ALTER TABLE quanhe ADD COLUMN dongHoId2 VARCHAR(50);
-- UPDATE quanhe q SET dongHoId1 = (SELECT dongHoId FROM thanhvien WHERE thanhVienId = q.thanhVien1Id LIMIT 1);
-- ALTER TABLE quanhe ADD CONSTRAINT fk_quanhe_tv1 FOREIGN KEY (dongHoId1, thanhVien1Id) REFERENCES thanhvien(dongHoId, thanhVienId);

-- Bảng tailieu (nếu có tham chiếu thanhVienId)
-- Tương tự như trên

-- =============================================
-- STORED PROCEDURE: Tự động tăng thanhVienId theo dòng họ
-- =============================================
DELIMITER $$

DROP PROCEDURE IF EXISTS `GetNextThanhVienId`$$
CREATE PROCEDURE `GetNextThanhVienId`(
    IN p_dongHoId VARCHAR(50),
    OUT p_nextId INT
)
BEGIN
    SELECT COALESCE(MAX(thanhVienId), 0) + 1 INTO p_nextId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId;
END$$

-- =============================================
-- STORED PROCEDURE: Insert thành viên mới (tự động tăng ID)
-- =============================================
DROP PROCEDURE IF EXISTS `InsertMemberComposite`$$
CREATE PROCEDURE `InsertMemberComposite`(
    IN p_dongHoId VARCHAR(50),
    IN p_hoTen VARCHAR(255),
    IN p_gioiTinh TINYINT,
    IN p_ngaySinh DATE,
    IN p_ngayMat DATE,
    IN p_noiSinh VARCHAR(255),
    IN p_noiMat VARCHAR(255),
    IN p_ngheNghiep VARCHAR(255),
    IN p_trinhDoHocVan VARCHAR(255),
    IN p_diaChiHienTai VARCHAR(255),
    IN p_tieuSu TEXT,
    IN p_anhChanDung VARCHAR(255),
    IN p_doiThuoc INT,
    IN p_chaId INT,
    IN p_meId INT,
    IN p_voId INT,
    IN p_chongId INT,
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_newThanhVienId INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_nextId INT;
    
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

    -- Lấy ID tiếp theo cho dòng họ này
    SELECT COALESCE(MAX(thanhVienId), 0) + 1 INTO v_nextId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId
    FOR UPDATE;

    -- Insert với ID mới
    INSERT INTO thanhvien (
        thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
        tieuSu, anhChanDung, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    ) VALUES (
        v_nextId, p_dongHoId, p_hoTen, p_gioiTinh, p_ngaySinh, p_ngayMat,
        p_noiSinh, p_noiMat, p_ngheNghiep, p_trinhDoHocVan, p_diaChiHienTai,
        p_tieuSu, p_anhChanDung, p_doiThuoc, p_chaId, p_meId, p_voId, p_chongId,
        NOW(), 1, p_nguoiTaoId, NOW(), p_nguoiTaoId
    );

    SET p_newThanhVienId = v_nextId;

    COMMIT;
END$$

DELIMITER ;


-- =============================================
-- STORED PROCEDURE: Search thành viên theo dòng họ (cập nhật)
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
    SET v_offset = (p_pageIndex - 1) * p_pageSize;

    -- Đếm tổng
    SELECT COUNT(*) INTO v_total
    FROM thanhvien
    WHERE active_flag = 1
      AND dongHoId = p_dongHoId
      AND (p_search_content IS NULL OR p_search_content = '' 
           OR hoTen LIKE CONCAT('%', p_search_content, '%')
           OR ngheNghiep LIKE CONCAT('%', p_search_content, '%'));

    -- Lấy dữ liệu
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
        cha.hoTen AS tenCha,
        me.hoTen AS tenMe,
        vo.hoTen AS tenVo,
        chong.hoTen AS tenChong,
        v_total AS RecordCount
    FROM thanhvien tv
    LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
    LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
    LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
    LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
    WHERE tv.active_flag = 1
      AND tv.dongHoId = p_dongHoId
      AND (p_search_content IS NULL OR p_search_content = ''
           OR tv.hoTen LIKE CONCAT('%', p_search_content, '%')
           OR tv.ngheNghiep LIKE CONCAT('%', p_search_content, '%'))
    ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC
    LIMIT p_pageSize OFFSET v_offset;
END$$

-- =============================================
-- STORED PROCEDURE: Import JSON (cập nhật cho composite key)
-- =============================================
DROP PROCEDURE IF EXISTS `ImportThanhVienFromJsonComposite`$$
CREATE PROCEDURE `ImportThanhVienFromJsonComposite`(
    IN p_jsonData JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
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
        chongId INT
    );

    -- Parse JSON vào bảng tạm
    INSERT INTO tmp_import (stt, hoTen, gioiTinh, ngaySinh, ngayMat, noiSinh, noiMat, 
                            ngheNghiep, trinhDoHocVan, diaChiHienTai, tieuSu, doiThuoc,
                            chaId, meId, voId, chongId)
    SELECT 
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.stt')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.hoTen')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.gioiTinh')),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngaySinh')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngayMat')), 'null'),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.noiSinh')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.noiMat')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.ngheNghiep')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.trinhDoHocVan')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.diaChiHienTai')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.tieuSu')),
        JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.doiThuoc')),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.chaId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.meId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.voId')), 'null'),
        NULLIF(JSON_UNQUOTE(JSON_EXTRACT(j.value, '$.chongId')), 'null')
    FROM JSON_TABLE(p_jsonData, '$[*]' COLUMNS (value JSON PATH '$')) AS j;

    -- Insert vào bảng chính
    -- thanhVienId = v_maxId + stt (để STT trong Excel = ID trong DB)
    INSERT INTO thanhvien (
        thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
        tieuSu, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    )
    SELECT 
        v_maxId + stt,  -- ID mới = max hiện tại + STT
        p_dongHoId,
        hoTen,
        gioiTinh,
        ngaySinh,
        ngayMat,
        noiSinh,
        noiMat,
        ngheNghiep,
        trinhDoHocVan,
        diaChiHienTai,
        tieuSu,
        doiThuoc,
        CASE WHEN chaId IS NOT NULL THEN v_maxId + chaId ELSE NULL END,  -- Chuyển đổi ID cha
        CASE WHEN meId IS NOT NULL THEN v_maxId + meId ELSE NULL END,    -- Chuyển đổi ID mẹ
        CASE WHEN voId IS NOT NULL THEN v_maxId + voId ELSE NULL END,    -- Chuyển đổi ID vợ
        CASE WHEN chongId IS NOT NULL THEN v_maxId + chongId ELSE NULL END, -- Chuyển đổi ID chồng
        NOW(),
        1,
        p_nguoiTaoId,
        NOW(),
        p_nguoiTaoId
    FROM tmp_import
    ORDER BY stt;

    SELECT COUNT(*) INTO v_count FROM tmp_import;
    SET p_error_message = CONCAT('Đã import ', v_count, ' thành viên');

    DROP TEMPORARY TABLE IF EXISTS tmp_import;

    COMMIT;
END$$

DELIMITER ;

-- =============================================
-- KIỂM TRA SAU KHI MIGRATE
-- =============================================
-- SELECT dongHoId, COUNT(*) as so_thanh_vien, MIN(thanhVienId) as min_id, MAX(thanhVienId) as max_id
-- FROM thanhvien
-- GROUP BY dongHoId;
