-- ============================================================================
-- STORED PROCEDURES FOR RELATIONSHIP SYNCHRONIZATION
-- Tự động tạo quan hệ trong bảng quanhe từ dữ liệu bảng thanhvien
-- ============================================================================

-- Bước 1: Populate bảng loaiquanhe
-- ============================================================================

DELETE FROM loaiquanhe;

INSERT INTO loaiquanhe (loaiQuanHeId, tenLoaiQuanHe, moTa, active_flag, nguoiTaoId, lu_updated, lu_user_id) VALUES
-- Quan hệ trực tiếp
('LQH_CHA_CON', 'Cha - Con', 'Quan hệ cha con trực tiếp', 1, 'system', NOW(), 'system'),
('LQH_ME_CON', 'Mẹ - Con', 'Quan hệ mẹ con trực tiếp', 1, 'system', NOW(), 'system'),
('LQH_VO_CHONG', 'Vợ - Chồng', 'Quan hệ vợ chồng', 1, 'system', NOW(), 'system'),

-- Quan hệ anh chị em
('LQH_ANH_EM', 'Anh - Em', 'Anh em ruột (cùng cha mẹ)', 1, 'system', NOW(), 'system'),
('LQH_CHI_EM', 'Chị - Em', 'Chị em ruột (cùng cha mẹ)', 1, 'system', NOW(), 'system'),

-- Quan hệ ông bà
('LQH_ONG_CHAU', 'Ông - Cháu', 'Ông nội/ngoại - Cháu', 1, 'system', NOW(), 'system'),
('LQH_BA_CHAU', 'Bà - Cháu', 'Bà nội/ngoại - Cháu', 1, 'system', NOW(), 'system'),

-- Quan hệ chú bác cô dì cậu
('LQH_CHU_CHAU', 'Chú - Cháu', 'Chú (em trai của cha) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_BAC_CHAU', 'Bác - Cháu', 'Bác (anh trai của cha) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_CO_CHAU', 'Cô - Cháu', 'Cô (chị em gái của cha) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_DI_CHAU', 'Dì - Cháu', 'Dì (chị em gái của mẹ) - Cháu', 1, 'system', NOW(), 'system'),
('LQH_CAU_CHAU', 'Cậu - Cháu', 'Cậu (anh em trai của mẹ) - Cháu', 1, 'system', NOW(), 'system');


-- ============================================================================
-- Procedure 1: Xóa tất cả quan hệ của một dòng họ
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_clear_relationships;

DELIMITER $$

CREATE PROCEDURE sp_clear_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    DELETE FROM quanhe WHERE dongHoId1 = p_dongHoId;
    
    SELECT ROW_COUNT() as deleted_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 2: Tạo quan hệ CHA - CON
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_create_parent_child_relationships;

DELIMITER $$

CREATE PROCEDURE sp_create_parent_child_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ CHA - CON
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.chaId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_CHA_CON' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.chaId IS NOT NULL
        AND tv.active_flag = 1;
    
    -- Tạo quan hệ MẸ - CON
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.meId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_ME_CON' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.meId IS NOT NULL
        AND tv.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 3: Tạo quan hệ VỢ - CHỒNG
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_create_spouse_relationships;

DELIMITER $$

CREATE PROCEDURE sp_create_spouse_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ VỢ - CHỒNG (từ nam có vợ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.thanhVienId as thanhVien1Id,
        tv.voId as thanhVien2Id,
        'LQH_VO_CHONG' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.gioiTinh = 1
        AND tv.voId IS NOT NULL
        AND tv.active_flag = 1;
    
    -- Tạo quan hệ VỢ - CHỒNG (từ nữ có chồng)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        tv.chongId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_VO_CHONG' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    WHERE tv.dongHoId = p_dongHoId 
        AND tv.gioiTinh = 0
        AND tv.chongId IS NOT NULL
        AND tv.active_flag = 1
        -- Tránh duplicate nếu đã tạo từ phía nam
        AND NOT EXISTS (
            SELECT 1 FROM quanhe 
            WHERE thanhVien1Id = tv.chongId 
                AND thanhVien2Id = tv.thanhVienId
                AND loaiQuanHeId = 'LQH_VO_CHONG'
                AND dongHoId1 = p_dongHoId
        );
    
    SELECT ROW_COUNT() as created_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 4: Tạo quan hệ ANH CHỊ EM
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_create_sibling_relationships;

DELIMITER $$

CREATE PROCEDURE sp_create_sibling_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ ANH - EM (nam với anh em ruột)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT DISTINCT
        UUID() as quanHeId,
        tv1.thanhVienId as thanhVien1Id,
        tv2.thanhVienId as thanhVien2Id,
        'LQH_ANH_EM' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv1
    JOIN thanhvien tv2 ON tv2.dongHoId = tv1.dongHoId
        AND tv2.chaId = tv1.chaId
        AND tv2.meId = tv1.meId
        AND tv2.thanhVienId > tv1.thanhVienId  -- Tránh duplicate
    WHERE tv1.dongHoId = p_dongHoId
        AND tv1.gioiTinh = 1
        AND tv1.chaId IS NOT NULL
        AND tv1.meId IS NOT NULL
        AND tv1.active_flag = 1
        AND tv2.active_flag = 1;
    
    -- Tạo quan hệ CHỊ - EM (nữ với anh em ruột)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT DISTINCT
        UUID() as quanHeId,
        tv1.thanhVienId as thanhVien1Id,
        tv2.thanhVienId as thanhVien2Id,
        'LQH_CHI_EM' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv1
    JOIN thanhvien tv2 ON tv2.dongHoId = tv1.dongHoId
        AND tv2.chaId = tv1.chaId
        AND tv2.meId = tv1.meId
        AND tv2.thanhVienId > tv1.thanhVienId  -- Tránh duplicate
    WHERE tv1.dongHoId = p_dongHoId
        AND tv1.gioiTinh = 0
        AND tv1.chaId IS NOT NULL
        AND tv1.meId IS NOT NULL
        AND tv1.active_flag = 1
        AND tv2.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 5: Tạo quan hệ ÔNG BÀ - CHÁU
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_create_grandparent_relationships;

DELIMITER $$

CREATE PROCEDURE sp_create_grandparent_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ ÔNG NỘI/NGOẠI - CHÁU (qua cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        cha.chaId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_ONG_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND cha.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1;
    
    -- Tạo quan hệ BÀ NỘI/NGOẠI - CHÁU (qua cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        cha.meId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_BA_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND cha.meId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1;
    
    -- Tạo quan hệ ÔNG NGOẠI - CHÁU (qua mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        me.chaId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_ONG_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND me.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1;
    
    -- Tạo quan hệ BÀ NGOẠI - CHÁU (qua mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        me.meId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_BA_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND me.meId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 6: Tạo quan hệ CHÚ BÁC CÔ (anh chị em của cha)
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_create_paternal_uncle_aunt_relationships;

DELIMITER $$

CREATE PROCEDURE sp_create_paternal_uncle_aunt_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ CHÚ/BÁC - CHÁU (anh em trai của cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        chu_bac.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        CASE 
            WHEN chu_bac.thanhVienId < cha.thanhVienId THEN 'LQH_BAC_CHAU'  -- Anh của cha = Bác
            ELSE 'LQH_CHU_CHAU'  -- Em của cha = Chú
        END as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    JOIN thanhvien chu_bac ON chu_bac.dongHoId = cha.dongHoId
        AND chu_bac.chaId = cha.chaId
        AND chu_bac.meId = cha.meId
        AND chu_bac.thanhVienId != cha.thanhVienId
        AND chu_bac.gioiTinh = 1  -- Nam
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1
        AND chu_bac.active_flag = 1;
    
    -- Tạo quan hệ CÔ - CHÁU (chị em gái của cha)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        co.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_CO_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien cha ON cha.dongHoId = tv.dongHoId AND cha.thanhVienId = tv.chaId
    JOIN thanhvien co ON co.dongHoId = cha.dongHoId
        AND co.chaId = cha.chaId
        AND co.meId = cha.meId
        AND co.thanhVienId != cha.thanhVienId
        AND co.gioiTinh = 0  -- Nữ
    WHERE tv.dongHoId = p_dongHoId
        AND tv.chaId IS NOT NULL
        AND tv.active_flag = 1
        AND cha.active_flag = 1
        AND co.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 7: Tạo quan hệ DÌ CẬU (anh chị em của mẹ)
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_create_maternal_uncle_aunt_relationships;

DELIMITER $$

CREATE PROCEDURE sp_create_maternal_uncle_aunt_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    -- Tạo quan hệ CẬU - CHÁU (anh em trai của mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        cau.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_CAU_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    JOIN thanhvien cau ON cau.dongHoId = me.dongHoId
        AND cau.chaId = me.chaId
        AND cau.meId = me.meId
        AND cau.thanhVienId != me.thanhVienId
        AND cau.gioiTinh = 1  -- Nam
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1
        AND cau.active_flag = 1;
    
    -- Tạo quan hệ DÌ - CHÁU (chị em gái của mẹ)
    INSERT INTO quanhe (quanHeId, thanhVien1Id, thanhVien2Id, loaiQuanHeId, dongHoId1, dongHoId2, active_flag, nguoiTaoId)
    SELECT 
        UUID() as quanHeId,
        di.thanhVienId as thanhVien1Id,
        tv.thanhVienId as thanhVien2Id,
        'LQH_DI_CHAU' as loaiQuanHeId,
        p_dongHoId as dongHoId1,
        p_dongHoId as dongHoId2,
        1 as active_flag,
        'system' as nguoiTaoId
    FROM thanhvien tv
    JOIN thanhvien me ON me.dongHoId = tv.dongHoId AND me.thanhVienId = tv.meId
    JOIN thanhvien di ON di.dongHoId = me.dongHoId
        AND di.chaId = me.chaId
        AND di.meId = me.meId
        AND di.thanhVienId != me.thanhVienId
        AND di.gioiTinh = 0  -- Nữ
    WHERE tv.dongHoId = p_dongHoId
        AND tv.meId IS NOT NULL
        AND tv.active_flag = 1
        AND me.active_flag = 1
        AND di.active_flag = 1;
    
    SELECT ROW_COUNT() as created_count;
END$$

DELIMITER ;


-- ============================================================================
-- Procedure 8: MASTER - Đồng bộ tất cả quan hệ
-- ============================================================================

DROP PROCEDURE IF EXISTS sp_sync_all_relationships;

DELIMITER $$

CREATE PROCEDURE sp_sync_all_relationships(
    IN p_dongHoId VARCHAR(50),
    OUT p_total_created INT
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_total INT DEFAULT 0;
    
    -- Bắt đầu transaction
    START TRANSACTION;
    
    -- 1. Xóa tất cả quan hệ cũ
    CALL sp_clear_relationships(p_dongHoId);
    
    -- 2. Tạo quan hệ CHA MẸ - CON
    CALL sp_create_parent_child_relationships(p_dongHoId);
    
    -- 3. Tạo quan hệ VỢ - CHỒNG
    CALL sp_create_spouse_relationships(p_dongHoId);
    
    -- 4. Tạo quan hệ ANH CHỊ EM
    CALL sp_create_sibling_relationships(p_dongHoId);
    
    -- 5. Tạo quan hệ ÔNG BÀ - CHÁU
    CALL sp_create_grandparent_relationships(p_dongHoId);
    
    -- 6. Tạo quan hệ CHÚ BÁC CÔ
    CALL sp_create_paternal_uncle_aunt_relationships(p_dongHoId);
    
    -- 7. Tạo quan hệ DÌ CẬU
    CALL sp_create_maternal_uncle_aunt_relationships(p_dongHoId);
    
    -- Đếm tổng số quan hệ đã tạo
    SELECT COUNT(*) INTO v_total FROM quanhe WHERE dongHoId1 = p_dongHoId;
    SET p_total_created = v_total;
    
    -- Commit transaction
    COMMIT;
    
    -- Trả về kết quả
    SELECT 
        p_dongHoId as dongHoId,
        v_total as total_relationships_created,
        'SUCCESS' as status,
        NOW() as synced_at;
        
END$$

DELIMITER ;


-- ============================================================================
-- TEST: Chạy thử với một dòng họ
-- ============================================================================

-- Uncomment để test:
-- CALL sp_sync_all_relationships('e9022e64-cbae-11f0-8020-a8934a9bae74', @total);
-- SELECT @total as total_created;

-- Xem kết quả:
-- SELECT * FROM quanhe WHERE dongHoId1 = 'e9022e64-cbae-11f0-8020-a8934a9bae74' LIMIT 20;
