DELIMITER $$
CREATE PROCEDURE CheckPermission(
   IN p_nguoiDungId VARCHAR(50),
   IN p_chucNangCode VARCHAR(50),
   IN p_thaoTacCode VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   OUT p_hasPermission TINYINT,
   OUT p_error_code INT,
   OUT p_error_message VARCHAR(500)
)
proc: BEGIN
   DECLARE v_roleId VARCHAR(50);
   DECLARE v_userDongHoId VARCHAR(50);
   DECLARE v_roleCode VARCHAR(50);
   DECLARE v_count INT DEFAULT 0;

   SET p_error_code = 0;
   SET p_error_message = '';
   SET p_hasPermission = 0;

   -- Lấy thông tin user
   SELECT roleId, dongHoId
   INTO v_roleId, v_userDongHoId
   FROM nguoidung
   WHERE nguoiDungId = p_nguoiDungId
     AND active_flag = 1
   LIMIT 1;

   IF v_roleId IS NULL THEN
     SET p_error_code = 1;
     SET p_error_message = 'Người dùng không tồn tại hoặc đã bị khóa';
     LEAVE proc;
   END IF;

   -- Lấy roleCode
   SELECT roleCode
   INTO v_roleCode
   FROM role
   WHERE roleId = v_roleId
   LIMIT 1;

   -- Super Admin
   IF v_roleCode = 'sa' THEN
     SET p_hasPermission = 1;
     LEAVE proc;
   END IF;

   -- Kiểm tra quyền
   SELECT COUNT(*) INTO v_count
   FROM role_chucnang rc
   JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
   JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
   WHERE rc.roleId = v_roleId
     AND cn.chucNangCode = p_chucNangCode
     AND tt.thaoTacCode = p_thaoTacCode
     AND rc.active_flag = 1
     AND (rc.dongHoId IS NULL OR rc.dongHoId = v_userDongHoId);

   IF v_count > 0 THEN
     IF p_dongHoId IS NOT NULL
        AND p_dongHoId <> v_userDongHoId THEN
       SET p_error_code = 2;
       SET p_error_message = 'Bạn không có quyền thao tác trên dòng họ này';
     ELSE
       SET p_hasPermission = 1;
     END IF;
   ELSE
     SET p_error_code = 3;
     SET p_error_message = 'Bạn không có quyền thực hiện thao tác này';
   END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE checkUsernameExist(
    IN  p_value VARCHAR(255),
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

    SELECT COUNT(*) AS exist
    FROM nguoidung
    WHERE tenDangNhap = p_value;
    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE CreateRole(
    IN p_roleId VARCHAR(36),
    IN p_roleCode VARCHAR(50),
    IN p_roleName NVARCHAR(100),
    IN p_description NVARCHAR(255),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Kiểm tra roleCode đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM role WHERE roleCode = p_roleCode AND active_flag = 1) THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Mã quyền đã tồn tại';
        ROLLBACK;
    ELSE
        INSERT INTO role (roleId, roleCode, roleName, description, active_flag, lu_updated)
        VALUES (p_roleId, p_roleCode, p_roleName, p_description, 1, NOW());
        
        SET p_err_code = 0;
        SET p_err_msg = 'Tạo nhóm quyền thành công';
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DeleteDongHo(
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
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DeleteMemberComposite(
  IN p_dongHoId VARCHAR(50),
  IN p_thanhVienId INT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE thanhvien SET 
    active_flag = 0,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DeleteRole(
    IN p_roleId VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Không cho xóa role admin (sa)
    IF EXISTS (SELECT 1 FROM role WHERE roleId = p_roleId AND roleCode = 'sa') THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Không thể xóa nhóm quyền Admin';
        ROLLBACK;
    ELSE
        -- Xóa quyền của role trước
        DELETE FROM role_chucnang WHERE roleId = p_roleId;
        
        -- Soft delete role
        UPDATE role SET active_flag = 0, lu_updated = NOW() WHERE roleId = p_roleId;
        
        SET p_err_code = 0;
        SET p_err_msg = 'Xóa thành công';
        COMMIT;
    END IF;
END$$
DELIMITER ;

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

DELIMITER $$
CREATE PROCEDURE DeleteTaiChinhChi(
    IN p_list_json JSON,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
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
    
    -- Soft delete
    UPDATE taichinhchi t
    INNER JOIN JSON_TABLE(
        p_list_json,
        '$[*]' COLUMNS(
            chiId INT PATH '$.chiId',
            dongHoId VARCHAR(50) PATH '$.dongHoId'
        )
    ) AS j ON t.chiId = j.chiId AND t.dongHoId = j.dongHoId
    SET 
        t.active_flag = 0,
        t.lu_updated = NOW(),
        t.lu_user_id = p_lu_user_id;
    
    SET v_count = ROW_COUNT();
    
    IF v_count = 0 THEN
        SET p_error_message = 'Không tìm thấy khoản chi để xóa';
    ELSE
        SET p_error_message = CONCAT('Đã xóa ', v_count, ' khoản chi');
    END IF;
    
    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE DeleteTaiChinhThu(
    IN p_list_json JSON,
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    
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
    
    -- Soft delete
    UPDATE taichinhthu t
    INNER JOIN JSON_TABLE(
        p_list_json,
        '$[*]' COLUMNS(
            thuId INT PATH '$.thuId',
            dongHoId VARCHAR(50) PATH '$.dongHoId'
        )
    ) AS j ON t.thuId = j.thuId AND t.dongHoId = j.dongHoId
    SET 
        t.active_flag = 0,
        t.lu_updated = NOW(),
        t.lu_user_id = p_lu_user_id;
    
    SET v_count = ROW_COUNT();
    
    IF v_count = 0 THEN
        SET p_error_message = 'Không tìm thấy khoản thu để xóa';
    ELSE
        SET p_error_message = CONCAT('Đã xóa ', v_count, ' khoản thu');
    END IF;
    
    COMMIT;
END$$
DELIMITER ;

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

DELIMITER $$
CREATE PROCEDURE DeleteThanhVien(
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

DELIMITER $$
CREATE PROCEDURE DeleteThanhVienMultiple(
    IN p_json_list JSON,
    IN p_lu_user_id VARCHAR(255),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_dongHoId VARCHAR(255);
    DECLARE v_thanhVienId INT;
    DECLARE v_index INT DEFAULT 0;
    DECLARE v_json_length INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_code = RETURNED_SQLSTATE, 
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    SET p_error_code = 0;
    SET p_error_message = 'Xóa thành công';
    
    -- Lấy số lượng phần tử trong JSON array
    SET v_json_length = JSON_LENGTH(p_json_list);
    
    -- Kiểm tra JSON có hợp lệ không
    IF v_json_length IS NULL OR v_json_length = 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Danh sách xóa trống hoặc không hợp lệ';
        ROLLBACK;
    ELSE
        -- Lặp qua từng phần tử trong JSON array
        WHILE v_index < v_json_length DO
            -- Lấy dongHoId và thanhVienId từ JSON
            SET v_dongHoId = JSON_UNQUOTE(JSON_EXTRACT(p_json_list, CONCAT('$[', v_index, '].dongHoId')));
            SET v_thanhVienId = JSON_EXTRACT(p_json_list, CONCAT('$[', v_index, '].thanhVienId'));
            
            -- Kiểm tra dữ liệu hợp lệ
            IF v_dongHoId IS NOT NULL AND v_thanhVienId IS NOT NULL THEN
                -- Soft delete: set active_flag = 0
                UPDATE thanhvien 
                SET active_flag = 0,
                    lu_updated = NOW(),
                    lu_user_id = p_lu_user_id
                WHERE dongHoId = v_dongHoId 
                  AND thanhVienId = v_thanhVienId 
                  AND active_flag = 1;
                
                -- Đếm số bản ghi đã cập nhật
                SET v_count = v_count + ROW_COUNT();
            END IF;
            
            SET v_index = v_index + 1;
        END WHILE;
        
        -- Kiểm tra kết quả
        IF v_count = 0 THEN
            SET p_error_code = 2;
            SET p_error_message = 'Không tìm thấy thành viên nào để xóa';
            ROLLBACK;
        ELSE
            SET p_error_message = CONCAT('Đã xóa ', v_count, ' thành viên');
            COMMIT;
        END IF;
    END IF;
    
END$$
DELIMITER ;

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

DELIMITER $$
CREATE PROCEDURE DeleteUser(
	IN p_json_list json,
	IN p_lu_user_id char(36),
	OUT p_error_code int, OUT p_error_message varchar(500)
)
BEGIN
    DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END;

    SET p_error_code = 0;
	SET p_error_message = '';

	CREATE TEMPORARY TABLE Results AS
	SELECT JSON_VALUE(p.value, '$.nguoiDungId') AS nguoiDungId
		FROM JSON_TABLE(p_json_list, '$[*]' COLUMNS (
			value JSON PATH '$'
		)) AS p;

    UPDATE NguoiDung
    SET active_flag = 0,
		lu_updated = now(),
        lu_user_id = p_lu_user_id
    WHERE nguoiDungId in  (
    	select f2.nguoiDungId
    	from Results f2
    );
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetActionByUserId(
    IN p_nguoiDungId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(255)
)
BEGIN
    SET p_err_code = 0;
    SET p_err_msg = 'Success';
    
    SELECT 
        function_id,
        function_code,
        function_name,
        action_api_url,
        action_id,
        action_code,
        action_name,
        sort_order
    FROM (
        SELECT DISTINCT
            cn.chucNangId AS function_id,
            cn.chucNangCode AS function_code,
            cn.tenChucNang AS function_name,
            cn.duongDan AS action_api_url,
            tt.thaoTacId AS action_id,
            tt.thaoTacCode AS action_code,
            tt.tenThaoTac AS action_name,
            cn.thuTu AS sort_order
        FROM nguoidung nd
        INNER JOIN role r ON nd.roleId = r.roleId
        INNER JOIN role_chucnang rc ON r.roleId = rc.roleId
        INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
        INNER JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
        WHERE nd.nguoiDungId = p_nguoiDungId
          AND nd.active_flag = 1
          AND r.active_flag = 1
          AND rc.active_flag = 1
          AND cn.active_flag = 1
          AND tt.active_flag = 1
    ) AS actions_list
    ORDER BY sort_order;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetAllChucNang(
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT 
        chucNangId,
        chucNangCode,
        tenChucNang,
        moTa,
        parentId,
        icon,
        duongDan,
        thuTu
    FROM chucnang
    WHERE active_flag = 1
    ORDER BY thuTu ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE getAllDongHo(
	OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
	SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    SELECT dongHoId, tenDongHo, queQuanGoc, ngayThanhLap, nguoiQuanLy, ghiChu from DongHo;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE getAllMember(
	OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
	SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    
    SELECT thanhVienId ,
		dongHoId ,
		hoTen  ,
		gioiTinh  ,
		ngaySinh,
		ngayMat ,
		noiSinh  ,
		noiMat  ,
		ngheNghiep  ,
		trinhDoHocVan ,
        soDienThoai,
		diaChiHienTai ,
		tieuSu  ,
		anhChanDung ,
		doiThuoc  ,
		chaId  ,
		meId  ,
		voId  ,
		chongId  from ThanhVien;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetAllMemberByDongHo(
  IN p_dongHoId VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  SELECT * FROM thanhvien 
  WHERE dongHoId = p_dongHoId AND active_flag = 1
  ORDER BY doiThuoc ASC, thanhVienId ASC;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE getAllRole(
	OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
	SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    SELECT roleId, roleCode, roleName, createDate, nguoiTaoId, lu_updated, lu_user_id from Role;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetAllThaoTac(
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT 
        thaoTacId,
        thaoTacCode,
        tenThaoTac,
        moTa
    FROM thaotac
    WHERE active_flag = 1;
END$$
DELIMITER ;

DELIMITER $$
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
END$$
DELIMITER ;

DELIMITER $$
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
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetDongHoById(
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
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetFunctionsByUserId(
    IN p_nguoiDungId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(255)
)
BEGIN
    SET p_err_code = 0;
    SET p_err_msg = 'Success';
    
    -- Lấy tất cả chức năng mà user có quyền (bao gồm cả menu cha)
    SELECT 
        function_id,
        function_code,
        function_name,
        url,
        icon,
        sort_order,
        parent_id,
        level
    FROM (
        SELECT DISTINCT
            cn.chucNangId AS function_id,
            cn.chucNangCode AS function_code,
            cn.tenChucNang AS function_name,
            cn.duongDan AS url,
            cn.icon,
            cn.thuTu AS sort_order,
            cn.parentId AS parent_id,
            CASE WHEN cn.parentId IS NULL THEN 1 ELSE 2 END AS level
        FROM nguoidung nd
        INNER JOIN role r ON nd.roleId = r.roleId
        INNER JOIN role_chucnang rc ON r.roleId = rc.roleId
        INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
        WHERE nd.nguoiDungId = p_nguoiDungId
          AND nd.active_flag = 1
          AND r.active_flag = 1
          AND rc.active_flag = 1
          AND cn.active_flag = 1
        
        UNION
        
        -- Lấy thêm menu cha nếu có menu con
        SELECT DISTINCT
            parent.chucNangId AS function_id,
            parent.chucNangCode AS function_code,
            parent.tenChucNang AS function_name,
            parent.duongDan AS url,
            parent.icon,
            parent.thuTu AS sort_order,
            parent.parentId AS parent_id,
            1 AS level
        FROM nguoidung nd
        INNER JOIN role r ON nd.roleId = r.roleId
        INNER JOIN role_chucnang rc ON r.roleId = rc.roleId
        INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
        INNER JOIN chucnang parent ON cn.parentId = parent.chucNangId
        WHERE nd.nguoiDungId = p_nguoiDungId
          AND nd.active_flag = 1
          AND r.active_flag = 1
          AND rc.active_flag = 1
          AND cn.active_flag = 1
          AND parent.active_flag = 1
    ) AS combined
    ORDER BY level, sort_order;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetMemberById(
  IN p_dongHoId VARCHAR(50),
  IN p_thanhVienId INT,
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  SELECT tv.*, 
    cha.hoTen AS tenCha, me.hoTen AS tenMe, 
    vo.hoTen AS tenVo, chong.hoTen AS tenChong
  FROM thanhvien tv
  LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
  LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
  LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
  LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
  WHERE tv.dongHoId = p_dongHoId AND tv.thanhVienId = p_thanhVienId AND tv.active_flag = 1;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetMenuByRole(
    IN p_roleId VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT DISTINCT
        cn.chucNangId,
        cn.chucNangCode AS code,
        cn.tenChucNang AS name,
        cn.duongDan AS href,
        cn.icon,
        cn.thuTu AS sortOrder,
        cn.parentId,
        GROUP_CONCAT(DISTINCT tt.thaoTacCode) AS actions
    FROM role_chucnang rc
    INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
    INNER JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
    WHERE rc.roleId = p_roleId
      AND rc.active_flag = 1
      AND cn.active_flag = 1
      AND tt.active_flag = 1
    GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
    ORDER BY cn.thuTu ASC;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetMenuByRoleId(
  IN p_roleId VARCHAR(50)
)
BEGIN
  DECLARE v_roleCode VARCHAR(50);
  
  -- Set default
  SET @err_code = 0;
  SET @err_msg = '';
  
  -- Lấy roleCode
  SELECT roleCode INTO v_roleCode FROM role WHERE roleId = p_roleId AND active_flag = 1;
  
  IF v_roleCode IS NULL THEN
    SET @err_code = 1;
    SET @err_msg = 'Role không tồn tại';
  END IF;
  
  -- Trả về danh sách menu + quyền
  SELECT 
    cn.chucNangId,
    cn.chucNangCode as code,
    cn.tenChucNang as name,
    cn.duongDan as href,
    cn.icon,
    cn.thuTu as sortOrder,
    cn.parentId,
    GROUP_CONCAT(DISTINCT tt.thaoTacCode ORDER BY tt.thaoTacCode) as actions,
    v_roleCode as roleCode,
    CASE WHEN v_roleCode = 'sa' THEN 1 ELSE 0 END as canSelectAllDongHo
  FROM role_chucnang rc
  JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
  JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
  WHERE rc.roleId = p_roleId
    AND rc.active_flag = 1
    AND cn.active_flag = 1
  GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
  ORDER BY cn.thuTu;
  
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetNextThanhVienId(
    IN p_dongHoId VARCHAR(50),
    OUT p_nextId INT
)
BEGIN
    SELECT COALESCE(MAX(thanhVienId), 0) + 1 INTO p_nextId
    FROM thanhvien
    WHERE dongHoId = p_dongHoId;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetRolePermissions(
    IN p_roleId VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    SELECT 
        rc.id,
        rc.roleId,
        rc.chucNangId,
        cn.chucNangCode,
        cn.tenChucNang,
        rc.thaoTacId,
        tt.thaoTacCode,
        tt.tenThaoTac,
        rc.dongHoId,
        rc.active_flag
    FROM role_chucnang rc
    INNER JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
    INNER JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
    WHERE rc.roleId = p_roleId
    ORDER BY cn.thuTu, tt.thaoTacId;
END$$
DELIMITER ;

DELIMITER $$
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetTaiLieuById(
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
END$$
DELIMITER ;

DELIMITER $$
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

DELIMITER $$
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
DELIMITER ;

DELIMITER $$
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
DELIMITER ;

DELIMITER $$
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
END$$
DELIMITER ;

DELIMITER $$
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
END$$
DELIMITER ;

DELIMITER $$
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
END$$
DELIMITER ;

DELIMITER $$
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
DELIMITER ;

DELIMITER $$
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetTinTucById(
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE GetUserById(
    IN p_nguoiDungId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    -- Tất cả DECLARE phải ở đầu
    DECLARE v_count INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    -- Khởi tạo giá trị mặc định
    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    -- Kiểm tra input parameters
    IF p_nguoiDungId IS NULL OR p_nguoiDungId = '' THEN
        SET p_error_code = 1001;
        SET p_error_message = 'Thiếu thông tin nguoiDungId';
        ROLLBACK;
    ELSE
        -- Kiểm tra user có tồn tại và active không
        SELECT COUNT(*) INTO v_count
        FROM nguoidung 
        WHERE nguoiDungId = p_nguoiDungId AND active_flag = 1;
        
        IF v_count = 0 THEN
            SET p_error_code = 1002;
            SET p_error_message = 'Không tìm thấy user hoặc user đã bị vô hiệu hóa';
            ROLLBACK;
        ELSE
            -- Lấy thông tin user với dongho và role
            SELECT 
                nd.nguoiDungId,
                nd.first_name,
                nd.middle_name, 
                nd.last_name,
                nd.full_name,
                nd.gender,
                nd.date_of_birthday,
                nd.avatar,
                nd.email,
                nd.phone,
                nd.dongHoId,
                nd.roleId,
                nd.online_flag,
                nd.active_flag,
                nd.created_at,
                nd.updated_at,
                -- Thông tin dòng họ
                COALESCE(dh.tenDongHo, '') as tenDongHo,
                -- Thông tin role
                COALESCE(r.roleCode, '') as roleCode,
                COALESCE(r.roleName, '') as roleName
            FROM nguoidung nd
            LEFT JOIN dongho dh ON nd.dongHoId = dh.dongHoId
            LEFT JOIN role r ON nd.roleId = r.roleId
            WHERE nd.nguoiDungId = p_nguoiDungId 
              AND nd.active_flag = 1;
            
            SET p_error_code = 0;
            SET p_error_message = 'Lấy thông tin user thành công';
        END IF;
    END IF;

    COMMIT;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE ImportTaiChinhChiFromJson(
    IN p_json_data JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
proc_exit: BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_success_count INT DEFAULT 0;
    DECLARE v_error_count INT DEFAULT 0;
    DECLARE v_updated_count INT DEFAULT 0;
    DECLARE v_inserted_count INT DEFAULT 0;
    DECLARE v_reactivated_count INT DEFAULT 0;
    DECLARE v_json_length INT DEFAULT 0;
    DECLARE v_index INT DEFAULT 0;
    
    DECLARE v_chiId INT;
    DECLARE v_ngay_chi DATE;
    DECLARE v_so_tien DECIMAL(18,2);
    DECLARE v_phuong_thuc_thanh_toan VARCHAR(100);
    DECLARE v_noi_dung TEXT;
    DECLARE v_nguoi_nhan VARCHAR(255);
    DECLARE v_ghi_chu TEXT;
    
    DECLARE v_existing_active_flag TINYINT;
    DECLARE v_record_exists INT DEFAULT 0;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_err_code = MYSQL_ERRNO,
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Khởi tạo
    SET p_err_code = 0;
    SET p_err_msg = '';
    
    -- Validate input
    IF p_json_data IS NULL OR JSON_LENGTH(p_json_data) = 0 THEN
        SET p_err_code = 1001;
        SET p_err_msg = 'Dữ liệu JSON trống hoặc không hợp lệ';
        LEAVE proc_exit;
    END IF;
    
    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SET p_err_code = 1002;
        SET p_err_msg = 'dongHoId không được để trống';
        LEAVE proc_exit;
    END IF;

    -- Bắt đầu transaction
    START TRANSACTION;
    
    -- Lấy số lượng phần tử trong JSON array
    SET v_json_length = JSON_LENGTH(p_json_data);
    SET v_index = 0;
    
    -- Vòng lặp xử lý từng phần tử
    WHILE v_index < v_json_length DO
        -- Lấy dữ liệu từ JSON array
        SET v_chiId = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].stt')));
        SET v_ngay_chi = STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ngay_chi'))), '%d/%m/%Y');
        SET v_so_tien = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].so_tien'))) AS DECIMAL(18,2));
        SET v_phuong_thuc_thanh_toan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].phuong_thuc_thanh_toan'))), 'Tiền mặt');
        SET v_noi_dung = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].noi_dung'))), '');
        SET v_nguoi_nhan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].nguoi_nhan'))), '');
        SET v_ghi_chu = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ghi_chu'))), '');
        
        SET v_count = v_count + 1;
        
        -- Validate dữ liệu cơ bản
        IF v_chiId IS NULL OR v_chiId <= 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSEIF v_so_tien IS NULL OR v_so_tien < 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSE
            -- Kiểm tra record đã tồn tại chưa
            SET v_record_exists = 0;
            SET v_existing_active_flag = NULL;
            
            SELECT COUNT(*), MAX(active_flag) 
            INTO v_record_exists, v_existing_active_flag
            FROM taichinhchi 
            WHERE chiId = v_chiId AND dongHoId = p_dongHoId;
            
            -- Xử lý theo từng trường hợp
            IF v_record_exists = 0 THEN
                -- Case 1: Record chưa tồn tại → INSERT mới
                INSERT INTO taichinhchi (
                    chiId, dongHoId, ngayChi, soTien, phuongThucThanhToan,
                    noiDung, nguoiNhan, ghiChu, nguoiNhapId,
                    ngayTao, active_flag, lu_updated, lu_user_id
                ) VALUES (
                    v_chiId, p_dongHoId, v_ngay_chi, v_so_tien, v_phuong_thuc_thanh_toan,
                    v_noi_dung, v_nguoi_nhan, v_ghi_chu, p_nguoiTaoId,
                    NOW(), 1, NOW(), p_nguoiTaoId
                );
                
                SET v_inserted_count = v_inserted_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSEIF v_existing_active_flag = 0 THEN
                -- Case 2: Record tồn tại nhưng đã bị "xóa" (active_flag = 0) → Reactivate và update
                UPDATE taichinhchi SET
                    ngayChi = v_ngay_chi,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    nguoiNhan = v_nguoi_nhan,
                    ghiChu = v_ghi_chu,
                    active_flag = 1,  -- Reactivate
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE chiId = v_chiId AND dongHoId = p_dongHoId;
                
                SET v_reactivated_count = v_reactivated_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSE
                -- Case 3: Record tồn tại và đang active (active_flag = 1) → Update thông tin
                UPDATE taichinhchi SET
                    ngayChi = v_ngay_chi,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    nguoiNhan = v_nguoi_nhan,
                    ghiChu = v_ghi_chu,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE chiId = v_chiId AND dongHoId = p_dongHoId;
                
                SET v_updated_count = v_updated_count + 1;
                SET v_success_count = v_success_count + 1;
            END IF;
        END IF;
        
        SET v_index = v_index + 1;
    END WHILE;
    
    -- Commit transaction
    COMMIT;
    
    -- Tạo message kết quả
    SET p_err_code = 0;
    SET p_err_msg = CONCAT(
        'Import thành công: ', v_success_count, '/', v_count, ' records. ',
        'Chi tiết: ', v_inserted_count, ' mới, ', 
        v_updated_count, ' cập nhật, ', 
        v_reactivated_count, ' khôi phục'
    );
    
    -- Nếu có lỗi một phần
    IF v_error_count > 0 THEN
        SET p_err_code = 1001; -- Partial success
        SET p_err_msg = CONCAT(p_err_msg, '. Có ', v_error_count, ' lỗi bị bỏ qua');
    END IF;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE ImportTaiChinhThuFromJson(
    IN p_json_data JSON,
    IN p_dongHoId VARCHAR(50),
    IN p_nguoiTaoId VARCHAR(50),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
proc_exit: BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_success_count INT DEFAULT 0;
    DECLARE v_error_count INT DEFAULT 0;
    DECLARE v_updated_count INT DEFAULT 0;
    DECLARE v_inserted_count INT DEFAULT 0;
    DECLARE v_reactivated_count INT DEFAULT 0;
    DECLARE v_json_length INT DEFAULT 0;
    DECLARE v_index INT DEFAULT 0;
    
    DECLARE v_thuId INT;
    DECLARE v_ho_ten_nguoi_dong VARCHAR(255);
    DECLARE v_ngay_dong DATE;
    DECLARE v_so_tien DECIMAL(18,2);
    DECLARE v_phuong_thuc_thanh_toan VARCHAR(100);
    DECLARE v_noi_dung TEXT;
    DECLARE v_ghi_chu TEXT;
    
    DECLARE v_existing_active_flag TINYINT;
    DECLARE v_record_exists INT DEFAULT 0;
    
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_err_code = MYSQL_ERRNO,
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Khởi tạo
    SET p_err_code = 0;
    SET p_err_msg = '';
    
    -- Validate input
    IF p_json_data IS NULL OR JSON_LENGTH(p_json_data) = 0 THEN
        SET p_err_code = 1001;
        SET p_err_msg = 'Dữ liệu JSON trống hoặc không hợp lệ';
        LEAVE proc_exit;
    END IF;
    
    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SET p_err_code = 1002;
        SET p_err_msg = 'dongHoId không được để trống';
        LEAVE proc_exit;
    END IF;

    -- Bắt đầu transaction
    START TRANSACTION;
    
    -- Lấy số lượng phần tử trong JSON array
    SET v_json_length = JSON_LENGTH(p_json_data);
    SET v_index = 0;
    
    -- Vòng lặp xử lý từng phần tử
    WHILE v_index < v_json_length DO
        -- Lấy dữ liệu từ JSON array
        SET v_thuId = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].stt')));
        SET v_ho_ten_nguoi_dong = JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ho_ten_nguoi_dong')));
        SET v_ngay_dong = STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ngay_dong'))), '%d/%m/%Y');
        SET v_so_tien = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].so_tien'))) AS DECIMAL(18,2));
        SET v_phuong_thuc_thanh_toan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].phuong_thuc_thanh_toan'))), 'Tiền mặt');
        SET v_noi_dung = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].noi_dung'))), '');
        SET v_ghi_chu = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_json_data, CONCAT('$[', v_index, '].ghi_chu'))), '');
        
        SET v_count = v_count + 1;
        
        -- Validate dữ liệu cơ bản
        IF v_thuId IS NULL OR v_thuId <= 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSEIF v_ho_ten_nguoi_dong IS NULL OR TRIM(v_ho_ten_nguoi_dong) = '' THEN
            SET v_error_count = v_error_count + 1;
        ELSEIF v_so_tien IS NULL OR v_so_tien < 0 THEN
            SET v_error_count = v_error_count + 1;
        ELSE
            -- Kiểm tra record đã tồn tại chưa
            SET v_record_exists = 0;
            SET v_existing_active_flag = NULL;
            
            SELECT COUNT(*), MAX(active_flag) 
            INTO v_record_exists, v_existing_active_flag
            FROM taichinhthu 
            WHERE thuId = v_thuId AND dongHoId = p_dongHoId;
            
            -- Xử lý theo từng trường hợp
            IF v_record_exists = 0 THEN
                -- Case 1: Record chưa tồn tại → INSERT mới
                INSERT INTO taichinhthu (
                    thuId, dongHoId, hoTenNguoiDong, ngayDong, soTien,
                    phuongThucThanhToan, noiDung, ghiChu, nguoiNhapId,
                    ngayTao, active_flag, lu_updated, lu_user_id
                ) VALUES (
                    v_thuId, p_dongHoId, v_ho_ten_nguoi_dong, v_ngay_dong, v_so_tien,
                    v_phuong_thuc_thanh_toan, v_noi_dung, v_ghi_chu, p_nguoiTaoId,
                    NOW(), 1, NOW(), p_nguoiTaoId
                );
                
                SET v_inserted_count = v_inserted_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSEIF v_existing_active_flag = 0 THEN
                -- Case 2: Record tồn tại nhưng đã bị "xóa" (active_flag = 0) → Reactivate và update
                UPDATE taichinhthu SET
                    hoTenNguoiDong = v_ho_ten_nguoi_dong,
                    ngayDong = v_ngay_dong,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    ghiChu = v_ghi_chu,
                    active_flag = 1,  -- Reactivate
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thuId = v_thuId AND dongHoId = p_dongHoId;
                
                SET v_reactivated_count = v_reactivated_count + 1;
                SET v_success_count = v_success_count + 1;
                
            ELSE
                -- Case 3: Record tồn tại và đang active (active_flag = 1) → Update thông tin
                UPDATE taichinhthu SET
                    hoTenNguoiDong = v_ho_ten_nguoi_dong,
                    ngayDong = v_ngay_dong,
                    soTien = v_so_tien,
                    phuongThucThanhToan = v_phuong_thuc_thanh_toan,
                    noiDung = v_noi_dung,
                    ghiChu = v_ghi_chu,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thuId = v_thuId AND dongHoId = p_dongHoId;
                
                SET v_updated_count = v_updated_count + 1;
                SET v_success_count = v_success_count + 1;
            END IF;
        END IF;
        
        SET v_index = v_index + 1;
    END WHILE;
    
    -- Commit transaction
    COMMIT;
    
    -- Tạo message kết quả
    SET p_err_code = 0;
    SET p_err_msg = CONCAT(
        'Import thành công: ', v_success_count, '/', v_count, ' records. ',
        'Chi tiết: ', v_inserted_count, ' mới, ', 
        v_updated_count, ' cập nhật, ', 
        v_reactivated_count, ' khôi phục'
    );
    
    -- Nếu có lỗi một phần
    IF v_error_count > 0 THEN
        SET p_err_code = 1001; -- Partial success
        SET p_err_msg = CONCAT(p_err_msg, '. Có ', v_error_count, ' lỗi bị bỏ qua');
    END IF;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE ImportThanhVienFromJson(
    IN p_json_data JSON,
    IN p_dong_ho_id VARCHAR(36),
    IN p_nguoi_tao_id VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg VARCHAR(500)
)
BEGIN
    DECLARE v_count INT DEFAULT 0;
    DECLARE v_insert_count INT DEFAULT 0;
    DECLARE v_update_count INT DEFAULT 0;
    
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
        is_existing TINYINT DEFAULT 0,
        INDEX idx_stt (stt)
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

    -- Đếm tổng số record
    SELECT COUNT(*) INTO v_count FROM TempThanhVien;

    -- 3. Đánh dấu record đã tồn tại trong DB
    UPDATE TempThanhVien t
    INNER JOIN thanhvien tv ON tv.thanhVienId = t.stt AND tv.dongHoId = p_dong_ho_id
    SET t.is_existing = 1;

    -- 4. INSERT các record mới (chưa tồn tại) - FK = NULL trước
    INSERT INTO thanhvien (
        thanhVienId,
        dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat, 
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, 
        diaChiHienTai, tieuSu, doiThuoc,
        chaId, meId, voId, chongId,
        nguoiTaoId, ngayTao, active_flag
    )
    SELECT 
        t.stt,
        p_dong_ho_id,
        t.hoTen,
        t.gioiTinh,
        NULLIF(t.ngaySinh, 'null'),
        NULLIF(t.ngayMat, 'null'),
        t.noiSinh,
        t.noiMat,
        t.ngheNghiep,
        t.trinhDoHocVan,
        t.diaChiHienTai,
        t.tieuSu,
        IFNULL(t.doiThuoc, 1),
        NULL, NULL, NULL, NULL,
        p_nguoi_tao_id,
        NOW(),
        1
    FROM TempThanhVien t
    WHERE t.is_existing = 0
    ORDER BY t.doiThuoc ASC, t.stt ASC;

    SET v_insert_count = ROW_COUNT();

    -- 5. UPDATE các record đã tồn tại (thông tin cơ bản, FK = NULL trước)
    UPDATE thanhvien tv
    INNER JOIN TempThanhVien t ON tv.thanhVienId = t.stt AND tv.dongHoId = p_dong_ho_id
    SET 
        tv.hoTen = t.hoTen,
        tv.gioiTinh = t.gioiTinh,
        tv.ngaySinh = NULLIF(t.ngaySinh, 'null'),
        tv.ngayMat = NULLIF(t.ngayMat, 'null'),
        tv.noiSinh = t.noiSinh,
        tv.noiMat = t.noiMat,
        tv.ngheNghiep = t.ngheNghiep,
        tv.trinhDoHocVan = t.trinhDoHocVan,
        tv.diaChiHienTai = t.diaChiHienTai,
        tv.tieuSu = t.tieuSu,
        tv.doiThuoc = IFNULL(t.doiThuoc, 1),
        tv.chaId = NULL,
        tv.meId = NULL,
        tv.voId = NULL,
        tv.chongId = NULL
    WHERE t.is_existing = 1;

    SET v_update_count = ROW_COUNT();

    -- 6. UPDATE quan hệ cha/mẹ/vợ/chồng cho TẤT CẢ record
    UPDATE thanhvien tv
    INNER JOIN TempThanhVien t ON tv.thanhVienId = t.stt
    SET 
        tv.chaId = t.chaId,
        tv.meId = t.meId,
        tv.voId = CASE WHEN t.gioiTinh = 1 THEN t.voId ELSE NULL END,
        tv.chongId = CASE WHEN t.gioiTinh = 0 THEN t.chongId ELSE NULL END
    WHERE tv.dongHoId = p_dong_ho_id;

    -- Cleanup
    DROP TEMPORARY TABLE IF EXISTS TempThanhVien;

    COMMIT;

    SET p_err_msg = CONCAT('Import thanh cong: ', v_insert_count, ' moi, ', v_update_count, ' cap nhat. Tong: ', v_count);
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE ImportThanhVienFromJsonComposite(
    IN  p_jsonData JSON,
    IN  p_dongHoId VARCHAR(50),
    IN  p_nguoiTaoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
proc_exit: BEGIN
    DECLARE v_inserted INT DEFAULT 0;
    DECLARE v_updated INT DEFAULT 0;
    DECLARE v_reactivated INT DEFAULT 0;
    DECLARE v_total INT DEFAULT 0;
    DECLARE v_error_count INT DEFAULT 0;
    DECLARE v_json_length INT DEFAULT 0;
    DECLARE v_index INT DEFAULT 0;

    DECLARE v_thanhVienId INT;
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
    DECLARE v_chaId INT;
    DECLARE v_meId INT;
    DECLARE v_voId INT;
    DECLARE v_chongId INT;

    DECLARE v_existing_active_flag TINYINT;
    DECLARE v_record_exists INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Init
    SET p_error_code = 0;
    SET p_error_message = '';

    -- Validate input
    IF p_jsonData IS NULL OR JSON_LENGTH(p_jsonData) = 0 THEN
        SET p_error_code = 1001;
        SET p_error_message = 'Dữ liệu JSON trống hoặc không hợp lệ';
        LEAVE proc_exit;
    END IF;

    IF p_dongHoId IS NULL OR p_dongHoId = '' THEN
        SET p_error_code = 1002;
        SET p_error_message = 'dongHoId không được để trống';
        LEAVE proc_exit;
    END IF;

    START TRANSACTION;

    SET v_json_length = JSON_LENGTH(p_jsonData);
    SET v_index = 0;

    WHILE v_index < v_json_length DO

        SET v_thanhVienId = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].stt'))) AS UNSIGNED);
        SET v_hoTen = JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].hoTen')));
        SET v_gioiTinh = CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].gioiTinh'))) AS UNSIGNED);
        SET v_ngaySinh = JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].ngaySinh')));
        SET v_ngayMat = JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].ngayMat')));
        SET v_noiSinh = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].noiSinh'))), '');
        SET v_noiMat = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].noiMat'))), '');
        SET v_ngheNghiep = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].ngheNghiep'))), '');
        SET v_trinhDoHocVan = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].trinhDoHocVan'))), '');
        SET v_diaChiHienTai = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].diaChiHienTai'))), '');
        SET v_tieuSu = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].tieuSu'))), '');
        SET v_doiThuoc = COALESCE(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].doiThuoc'))) AS UNSIGNED), 1);

        SET v_chaId = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].chaId'))) AS UNSIGNED), 0);
        SET v_meId  = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].meId'))) AS UNSIGNED), 0);
        SET v_voId  = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].voId'))) AS UNSIGNED), 0);
        SET v_chongId = NULLIF(CAST(JSON_UNQUOTE(JSON_EXTRACT(p_jsonData, CONCAT('$[', v_index, '].chongId'))) AS UNSIGNED), 0);

        SET v_total = v_total + 1;

        IF v_thanhVienId IS NULL OR v_thanhVienId <= 0 OR v_hoTen IS NULL OR TRIM(v_hoTen) = '' THEN
            SET v_error_count = v_error_count + 1;
        ELSE
            SELECT COUNT(*), MAX(active_flag)
            INTO v_record_exists, v_existing_active_flag
            FROM thanhvien
            WHERE thanhVienId = v_thanhVienId
              AND dongHoId = p_dongHoId;

            IF v_record_exists = 0 THEN
                INSERT INTO thanhvien (
                    thanhVienId, dongHoId, hoTen, gioiTinh, ngaySinh, ngayMat,
                    noiSinh, noiMat, ngheNghiep, trinhDoHocVan, diaChiHienTai,
                    tieuSu, doiThuoc, chaId, meId, voId, chongId,
                    nguoiTaoId, ngayTao, active_flag, lu_updated, lu_user_id
                ) VALUES (
                    v_thanhVienId, p_dongHoId, v_hoTen, v_gioiTinh,
                    NULLIF(v_ngaySinh, 'null'),
                    NULLIF(v_ngayMat, 'null'),
                    v_noiSinh, v_noiMat, v_ngheNghiep, v_trinhDoHocVan,
                    v_diaChiHienTai, v_tieuSu, v_doiThuoc,
                    v_chaId, v_meId, v_voId, v_chongId,
                    p_nguoiTaoId, NOW(), 1, NOW(), p_nguoiTaoId
                );
                SET v_inserted = v_inserted + 1;

            ELSEIF v_existing_active_flag = 0 THEN
                UPDATE thanhvien SET
                    hoTen = v_hoTen,
                    gioiTinh = v_gioiTinh,
                    ngaySinh = NULLIF(v_ngaySinh, 'null'),
                    ngayMat = NULLIF(v_ngayMat, 'null'),
                    noiSinh = v_noiSinh,
                    noiMat = v_noiMat,
                    ngheNghiep = v_ngheNghiep,
                    trinhDoHocVan = v_trinhDoHocVan,
                    diaChiHienTai = v_diaChiHienTai,
                    tieuSu = v_tieuSu,
                    doiThuoc = v_doiThuoc,
                    chaId = v_chaId,
                    meId = v_meId,
                    voId = v_voId,
                    chongId = v_chongId,
                    active_flag = 1,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thanhVienId = v_thanhVienId
                  AND dongHoId = p_dongHoId;

                SET v_reactivated = v_reactivated + 1;
            ELSE
                UPDATE thanhvien SET
                    hoTen = v_hoTen,
                    gioiTinh = v_gioiTinh,
                    ngaySinh = NULLIF(v_ngaySinh, 'null'),
                    ngayMat = NULLIF(v_ngayMat, 'null'),
                    noiSinh = v_noiSinh,
                    noiMat = v_noiMat,
                    ngheNghiep = v_ngheNghiep,
                    trinhDoHocVan = v_trinhDoHocVan,
                    diaChiHienTai = v_diaChiHienTai,
                    tieuSu = v_tieuSu,
                    doiThuoc = v_doiThuoc,
                    chaId = v_chaId,
                    meId = v_meId,
                    voId = v_voId,
                    chongId = v_chongId,
                    lu_updated = NOW(),
                    lu_user_id = p_nguoiTaoId
                WHERE thanhVienId = v_thanhVienId
                  AND dongHoId = p_dongHoId;

                SET v_updated = v_updated + 1;
            END IF;
        END IF;

        SET v_index = v_index + 1;
    END WHILE;

    COMMIT;

    SET p_error_code = IF(v_error_count > 0, 1001, 0);
    SET p_error_message = CONCAT(
        'Import thành công ',
        (v_inserted + v_updated + v_reactivated), '/', v_total,
        ' (', v_inserted, ' mới, ',
        v_updated, ' cập nhật, ',
        v_reactivated, ' khôi phục)',
        IF(v_error_count > 0, CONCAT('. Bỏ qua ', v_error_count, ' lỗi'), '')
    );

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertDongHo(
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
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertEvent(
   IN p_suKienId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_tenSuKien VARCHAR(50),
   IN p_ngayDienRa date,
   IN p_gioDienRa time,
   IN p_diaDiem VARCHAR(255),
   IN p_moTa VARCHAR(1000),
   IN p_lapLai INT,
   IN p_nguoiTaoId VARCHAR(50),
   IN p_loaiSuKien INT,
   IN p_uuTien INT,
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        INSERT INTO SuKien(
            suKienId,
            dongHoId,
            tenSuKien,
            ngayDienRa,
            gioDienRa,
            diaDiem,
            moTa,
            lapLai,
            active_flag,
            nguoiTaoId,
            lu_updated,
            loaiSuKien,
            uuTien
        )
        VALUES (
            p_suKienId,
            p_dongHoId,
            p_tenSuKien,
            p_ngayDienRa,
            p_gioDienRa,
            p_diaDiem,
            p_moTa,
            p_lapLai,
            1,
            p_nguoiTaoId,
            now(),
            p_loaiSuKien,
            p_uuTien
        );

        COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertMemberComposite(
    IN p_dongHoId VARCHAR(50),
    IN p_hoTen VARCHAR(255),
    IN p_gioiTinh TINYINT,
    IN p_ngaySinh DATE,
    IN p_ngayMat DATE,
    IN p_noiSinh VARCHAR(255),
    IN p_noiMat VARCHAR(255),
    IN p_ngheNghiep VARCHAR(255),
    IN p_trinhDoHocVan VARCHAR(255),
    IN p_soDienThoai VARCHAR(11),
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
        noiSinh, noiMat, ngheNghiep, trinhDoHocVan, soDienThoai, diaChiHienTai,
        tieuSu, anhChanDung, doiThuoc, chaId, meId, voId, chongId,
        ngayTao, active_flag, nguoiTaoId, lu_updated, lu_user_id
    ) VALUES (
        v_nextId, p_dongHoId, p_hoTen, p_gioiTinh, p_ngaySinh, p_ngayMat,
        p_noiSinh, p_noiMat, p_ngheNghiep, p_trinhDoHocVan, p_soDienThoai, p_diaChiHienTai,
        p_tieuSu, p_anhChanDung, p_doiThuoc, p_chaId, p_meId, p_voId, p_chongId,
        NOW(), 1, p_nguoiTaoId, NOW(), p_nguoiTaoId
    );

    SET p_newThanhVienId = v_nextId;

    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertTaiChinhChi(
    IN p_dongHoId VARCHAR(50),
    IN p_ngayChi DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_nguoiNhan VARCHAR(255),
    IN p_ghiChu TEXT,
    IN p_nguoiNhapId VARCHAR(50),
    OUT p_chiId INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_max_id INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    SET p_chiId = 0;
    
    START TRANSACTION;
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSE
        -- Lấy max chiId hiện tại của dòng họ
        SELECT COALESCE(MAX(chiId), 0) INTO v_max_id
        FROM taichinhchi
        WHERE dongHoId = p_dongHoId
        FOR UPDATE;
        
        -- Tính chiId mới
        SET p_chiId = v_max_id + 1;
        
        -- Insert với chiId tự động tăng
        INSERT INTO taichinhchi (
            chiId, dongHoId, ngayChi, soTien, phuongThucThanhToan,
            noiDung, nguoiNhan, ghiChu, nguoiNhapId, ngayTao, active_flag
        ) VALUES (
            p_chiId,
            p_dongHoId,
            p_ngayChi,
            p_soTien,
            p_phuongThucThanhToan,
            p_noiDung,
            p_nguoiNhan,
            p_ghiChu,
            p_nguoiNhapId,
            NOW(),
            1
        );
        
        SET p_error_message = 'Tạo khoản chi thành công';
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertTaiChinhThu(
    IN p_dongHoId VARCHAR(50),
    IN p_hoTenNguoiDong VARCHAR(255),
    IN p_ngayDong DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_ghiChu TEXT,
    IN p_nguoiNhapId VARCHAR(50),
    OUT p_thuId INT,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_max_id INT DEFAULT 0;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    SET p_thuId = 0;
    
    START TRANSACTION;
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSEIF p_hoTenNguoiDong IS NULL OR p_hoTenNguoiDong = '' THEN
        SET p_error_code = 1;
        SET p_error_message = 'Họ tên người đóng không được để trống';
        ROLLBACK;
    ELSE
        -- Lấy max thuId hiện tại của dòng họ
        SELECT COALESCE(MAX(thuId), 0) INTO v_max_id
        FROM taichinhthu
        WHERE dongHoId = p_dongHoId
        FOR UPDATE;
        
        -- Tính thuId mới
        SET p_thuId = v_max_id + 1;
        
        -- Insert với thuId tự động tăng
        INSERT INTO taichinhthu (
            thuId, dongHoId, hoTenNguoiDong, ngayDong, soTien,
            phuongThucThanhToan, noiDung, ghiChu, nguoiNhapId, ngayTao, active_flag
        ) VALUES (
            p_thuId,
            p_dongHoId,
            p_hoTenNguoiDong,
            p_ngayDong,
            p_soTien,
            p_phuongThucThanhToan,
            p_noiDung,
            p_ghiChu,
            p_nguoiNhapId,
            NOW(),
            1
        );
        
        SET p_error_message = 'Tạo khoản thu thành công';
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertTaiLieu(
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertTinTuc(
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE InsertUser(
   IN p_nguoiDungId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_roleId VARCHAR(50),
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   IN p_hoTen VARCHAR(255),
   IN p_soDienThoai VARCHAR(20),
   IN p_gender TINYINT,
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

    IF EXISTS (SELECT 1 FROM NguoiDung WHERE tenDangNhap = p_tenDangNhap) THEN
        SET p_error_message = 'Tài khoản người dùng này đã tồn tại!';
        SET p_error_code = -1;
        ROLLBACK;
    ELSE
        INSERT INTO NguoiDung(
            nguoiDungId, dongHoId, roleId, tenDangNhap, matKhau,
            ngayTao, online_flag, active_flag, nguoiTaoId, lu_updated, lu_user_id
        )
        VALUES (
            p_nguoiDungId, p_dongHoId, p_roleId, p_tenDangNhap, p_matKhau,
            NOW(), 0, 1, p_nguoiTaoId, NOW(), p_nguoiTaoId
        );

        INSERT INTO user_profile (
            userId, full_name, phone, email, gender, active_flag,
            created_by_user_id, create_date, lu_updated, lu_user_id
        )
        VALUES (
            p_nguoiDungId, p_hoTen, p_soDienThoai, p_tenDangNhap,
            COALESCE(p_gender, 1), 1, p_nguoiTaoId, NOW(), NOW(), p_nguoiTaoId
        );

        COMMIT;
    END IF;
END$$
DELIMITER ;



DELIMITER $$
CREATE PROCEDURE ResetPassWord(
    IN p_tenDangNhap VARCHAR(50),
    IN p_new_pass VARCHAR(50),
    OUT p_error_code int,       -- Thay đổi sang VARCHAR(5) để lưu RETURNED_SQLSTATE
    OUT p_error_message VARCHAR(500)
)
BEGIN
    -- Khai báo biến: Đặt giá trị mặc định là NULL
    DECLARE p_user_id VARCHAR(50) ;

    -- Xử lý lỗi SQL hệ thống
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Gán mã lỗi SQLSTATE (ví dụ: '42000') và thông điệp lỗi thực tế của MySQL
        GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
        ROLLBACK;
    END;

    -- Khởi tạo thông báo và mã lỗi. 
    -- Trong trường hợp thành công (0) hoặc lỗi nghiệp vụ (ví dụ: -1), chúng ta gán giá trị riêng.
    SET p_error_code = 0; -- '00000' là SQLSTATE cho thành công
    SET p_error_message = '';

    START TRANSACTION;

    -- Lấy user theo tên đăng nhập
    SELECT nguoiDungId
    INTO p_user_id
    FROM nguoidung
    WHERE tenDangNhap = p_tenDangNhap
    LIMIT 1;

    -- Kiểm tra tồn tại (Lỗi nghiệp vụ)
    IF p_user_id IS NULL THEN
        -- Gán mã lỗi nghiệp vụ tùy chỉnh, ví dụ: 'P0001' (Dựa trên lỗi Postgres, bạn có thể chọn mã riêng)
        SET p_error_code = '-1';
        SET p_error_message = 'Tên đăng nhập không tồn tại!';
    ELSE
        -- Cập nhật mật khẩu
        UPDATE nguoidung
        SET matKhau = p_new_pass,
            lu_user_id = 'system'
        WHERE nguoiDungId = p_user_id;
    END IF;

    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchDanhMucTaiChinh(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            dm.danhMucId,
            dm.tenDanhMuc,
            dm.moTa,
            dm.active_flag,
            dm.lu_updated,
            dm.lu_user_id
        FROM danhmuctaichinh dm
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE dm.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(dm.tenDanhMuc, ''),
                    COALESCE(dm.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY dm.tenDanhMuc ASC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                             AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    ELSE

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            dm.danhMucId,
            dm.tenDanhMuc,
            dm.moTa,
            dm.active_flag,
            dm.lu_updated,
            dm.lu_user_id
        FROM danhmuctaichinh dm
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE dm.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(dm.tenDanhMuc, ''),
                    COALESCE(dm.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY dm.tenDanhMuc ASC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results;

        DROP TEMPORARY TABLE Results;

    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchDongHo(
    IN p_pageIndex INT,              -- Trang hiện tại
    IN p_pageSize INT,               -- Số bản ghi mỗi trang
    IN p_search_content VARCHAR(500),-- Từ khóa tìm kiếm (họ tên, sđt, email, tên đăng nhập)
    OUT p_error_code INT,            -- Mã lỗi (0 = không lỗi)
    OUT p_error_message VARCHAR(500) -- Thông điệp lỗi
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;

    -- Bắt lỗi SQL
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_error_code = 1;
        SET p_error_message = 'Lỗi khi truy vấn dữ liệu dong họ.';
        ROLLBACK;
    END;

    -- Mặc định không lỗi
    SET p_error_code = 0;
    SET p_error_message = '';

    -- Gán biến tạm row number
    SET @row_number := 0;

    -- Truy vấn kết quả chính
    CREATE TEMPORARY TABLE IF NOT EXISTS Results AS
    SELECT 
        (@row_number := @row_number + 1) AS RowNumber,
        dh.dongHoId,
        dh.tenDongHo,
        dh.queQuanGoc,
        dh.ngayThanhLap,
        dh.nguoiQuanLy,
        dh.ghiChu,
        dh.nguoiTaoId,
        dh.lu_user_id
        from DongHo dh
    WHERE dh.active_flag = 1
      AND (
            p_search_content IS NULL
            OR p_search_content = ''
            OR LOWER(CONCAT(
                COALESCE(dh.tenDongHo, ''),
                COALESCE(dh.queQuanGoc, ''),
                COALESCE(dh.nguoiQuanLy, '')
            )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
      );

    -- Lấy tổng số dòng
    SELECT COUNT(*) INTO p_total_row FROM Results;

    -- Trả kết quả phân trang
    SELECT 
        *,
        p_total_row AS RecordCount
    FROM Results
    WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                         AND (p_pageIndex * p_pageSize)
    ORDER BY dongHoId DESC;

    -- ✅ Di chuyển dòng xóa bảng tạm xuống **sau khi client đã nhận kết quả**
    -- nhưng vẫn đảm bảo MySQL không lỗi khi return
    DROP TEMPORARY TABLE IF EXISTS Results;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchEvent(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Có phân trang
    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            sk.suKienId,
            sk.dongHoId,
            sk.tenSuKien,
            sk.ngayDienRa,
            sk.gioDienRa,
            sk.diaDiem,
            sk.moTa,
            sk.lapLai,
            sk.nguoiTaoId,
            up.full_name,
            sk.loaiSuKien,
            sk.lu_user_id,
            lsk.tenLoaiSuKien,
            sk.uuTien
        FROM sukien sk
        LEFT JOIN loaisukien lsk ON sk.loaiSuKien = lsk.loaiSuKien
        LEFT JOIN user_profile up ON sk.nguoiTaoId  = up.userId
		LEFT JOIN nguoidung nd ON sk.nguoiTaoId = nd.nguoiDungId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE sk.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR sk.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(sk.tenSuKien, ''),
                    COALESCE(sk.ngayDienRa, ''),
                    COALESCE(lsk.tenLoaiSuKien, ''),
                    COALESCE(sk.gioDienRa, ''),
                    COALESCE(sk.diaDiem, ''),
                    COALESCE(sk.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY sk.ngayDienRa DESC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT 
            *,
            p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                             AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    -- Không phân trang (lấy hết)
    ELSE

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            sk.suKienId,
            sk.dongHoId,
            sk.tenSuKien,
            sk.ngayDienRa,
            sk.gioDienRa,
            sk.diaDiem,
            sk.moTa,
            sk.lapLai,
            sk.nguoiTaoId,
            nd.hoTen,
            sk.loaiSuKien,
            sk.lu_user_id,
            lsk.tenLoaiSuKien,
            sk.uuTien
        FROM sukien sk
        INNER JOIN loaisukien lsk ON sk.loaiSuKien = lsk.loaiSuKien
        INNER JOIN nguoidung nd ON sk.nguoiTaoId = nd.nguoiDungId
        CROSS JOIN (SELECT @row_number := 0) r
        WHERE sk.active_flag = 1
          AND (p_dongHoId IS NULL OR p_dongHoId = '' OR sk.dongHoId = p_dongHoId)
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(sk.tenSuKien, ''),
                    COALESCE(sk.ngayDienRa, ''),
                    COALESCE(lsk.tenLoaiSuKien, ''),
                    COALESCE(sk.gioDienRa, ''),
                    COALESCE(sk.diaDiem, ''),
                    COALESCE(sk.moTa, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY sk.ngayDienRa DESC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT 
            *,
            p_total_row AS RecordCount
        FROM Results;

        DROP TEMPORARY TABLE Results;

    END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchLoaiSuKien(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(200),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@rownum := @rownum + 1) AS RowNumber,
            lsk.loaiSuKien,
            lsk.tenLoaiSuKien,
            lsk.active_flag
        FROM loaisukien lsk
        CROSS JOIN (SELECT @rownum := 0) r
        WHERE lsk.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(lsk.loaiSuKien,''),
                    COALESCE(lsk.tenLoaiSuKien,'')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY lsk.loaiSuKien ASC;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT 
            *,
            p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize + 1)
                            AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    ELSE

        SELECT 
            lsk.loaiSuKien,
            lsk.tenLoaiSuKien,
            lsk.active_flag
        FROM loaisukien lsk
        WHERE lsk.active_flag = 1
          AND (
                p_search_content IS NULL
                OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(lsk.loaiSuKien,''),
                    COALESCE(lsk.tenLoaiSuKien,'')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
          )
        ORDER BY lsk.loaiSuKien ASC;

    END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchNguoiDung(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';

    IF p_pageSize <> 0 THEN
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                nd.nguoiDungId, nd.tenDangNhap, nd.matKhau,
                up.first_name, up.middle_name, up.last_name, up.full_name,
                up.gender, up.date_of_birthday, up.email, up.phone,
                nd.roleId, nd.dongHoId, dh.tenDongHo,
                rl.roleCode, rl.roleName, nd.ngayTao, up.avatar,
                COALESCE(nd.online_flag, 0) AS online_flag,
                nd.active_flag, nd.lu_updated, nd.lu_user_id
            FROM NguoiDung nd
            LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
            LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
            LEFT JOIN role rl ON nd.roleId = rl.roleId
            WHERE nd.active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR nd.dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(nd.tenDangNhap, ''),
                        COALESCE(up.full_name, ''),
                        COALESCE(up.email, ''),
                        COALESCE(up.phone, ''),
                        COALESCE(dh.tenDongHo, '')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
              )
            ORDER BY nd.ngayTao DESC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 
                            AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;
        
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                nd.nguoiDungId, nd.tenDangNhap, nd.matKhau,
                up.first_name, up.middle_name, up.last_name, up.full_name,
                up.gender, up.date_of_birthday, up.email, up.phone,
                nd.roleId, nd.dongHoId, dh.tenDongHo,
                rl.roleCode, rl.roleName, nd.ngayTao,
                COALESCE(nd.online_flag, 0) AS online_flag,
                nd.active_flag, nd.lu_updated, nd.lu_user_id
            FROM NguoiDung nd
            LEFT JOIN user_profile up ON nd.nguoiDungId = up.userId
            LEFT JOIN DongHo dh ON nd.dongHoId = dh.dongHoId
            LEFT JOIN role rl ON nd.roleId = rl.roleId
            WHERE nd.active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR nd.dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(nd.tenDangNhap, ''),
                        COALESCE(up.full_name, ''),
                        COALESCE(up.email, ''),
                        COALESCE(up.phone, ''),
                        COALESCE(dh.tenDongHo, '')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
              )
            ORDER BY nd.ngayTao DESC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount FROM Results;

        DROP TEMPORARY TABLE Results;
        
    END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchTaiChinhChi(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    IF p_pageSize <> 0 THEN
        DROP TEMPORARY TABLE IF EXISTS Results;
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                chiId,
                dongHoId,
                ngayChi,
                soTien,
                phuongThucThanhToan,
                noiDung,
                nguoiNhan,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhchi
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (p_search_content IS NULL OR p_search_content = '' 
                   OR LOWER(CONCAT(
                       COALESCE(nguoiNhan, ''),
                       COALESCE(noiDung, '')
                   )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
            ORDER BY chiId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 
                            AND (p_pageIndex * p_pageSize);
        
        DROP TEMPORARY TABLE Results;
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        CREATE TEMPORARY TABLE Results AS
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT 
                chiId,
                dongHoId,
                ngayChi,
                soTien,
                phuongThucThanhToan,
                noiDung,
                nguoiNhan,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhchi
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (p_search_content IS NULL OR p_search_content = '' 
                   OR LOWER(CONCAT(
                       COALESCE(nguoiNhan, ''),
                       COALESCE(noiDung, '')
                   )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
            ORDER BY chiId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        SELECT *, p_total_row AS RecordCount FROM Results;
        
        DROP TEMPORARY TABLE Results;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchTaiChinhThu(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- CÓ PHÂN TRANG
    IF p_pageSize <> 0 THEN

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT
                thuId,
                dongHoId,
                hoTenNguoiDong,
                ngayDong,
                soTien,
                phuongThucThanhToan,
                noiDung,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhthu
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(hoTenNguoiDong,''),
                        COALESCE(noiDung,'')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
                  )
            ORDER BY thuId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount
        FROM Results
        WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                             AND (p_pageIndex * p_pageSize);

        DROP TEMPORARY TABLE Results;

    -- KHÔNG PHÂN TRANG
    ELSE

        DROP TEMPORARY TABLE IF EXISTS Results;

        CREATE TEMPORARY TABLE Results AS
        SELECT
            (@row_number := @row_number + 1) AS RowNumber,
            t.*
        FROM (
            SELECT
                thuId,
                dongHoId,
                hoTenNguoiDong,
                ngayDong,
                soTien,
                phuongThucThanhToan,
                noiDung,
                ghiChu,
                nguoiNhapId,
                ngayTao,
                active_flag,
                lu_updated,
                lu_user_id
            FROM taichinhthu
            WHERE active_flag = 1
              AND (p_dongHoId IS NULL OR p_dongHoId = '' OR dongHoId = p_dongHoId)
              AND (
                    p_search_content IS NULL OR p_search_content = ''
                    OR LOWER(CONCAT(
                        COALESCE(hoTenNguoiDong,''),
                        COALESCE(noiDung,'')
                    )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
                  )
            ORDER BY thuId ASC
        ) t
        CROSS JOIN (SELECT @row_number := 0) r;

        SELECT COUNT(*) INTO p_total_row FROM Results;

        SELECT *, p_total_row AS RecordCount FROM Results;

        DROP TEMPORARY TABLE Results;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchTaiLieu(
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchThanhVien(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(500),
    IN p_thanhVienId INT,           -- ĐỔI: VARCHAR -> INT
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT DEFAULT 0;
    DECLARE v_sql_error VARCHAR(500);
    
    -- Bắt lỗi SQL với thông tin chi tiết
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = MYSQL_ERRNO,
            v_sql_error = MESSAGE_TEXT;
        SET p_error_message = CONCAT('Lỗi SQL: ', v_sql_error);
    END;
    
    -- Reset lỗi
    SET p_error_code = 0;
    SET p_error_message = '';
    
    -- Xóa bảng tạm cũ
    DROP TEMPORARY TABLE IF EXISTS Results;
    
    -- Reset biến row
    SET @row := 0;
    
    -- Tạo bảng kết quả tạm
    CREATE TEMPORARY TABLE Results AS
    SELECT 
        (@row := @row + 1) AS RowNumber,
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
        tv.nguoiTaoId,
        tv.lu_user_id
    FROM thanhvien tv
    WHERE tv.active_flag = 1
        AND (p_thanhVienId IS NULL OR tv.thanhVienId = p_thanhVienId)  -- BỎ check ''
        AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
        AND (
            p_search_content IS NULL
            OR p_search_content = ''
            OR LOWER(CONCAT(
                COALESCE(tv.hoTen, ''),
                COALESCE(tv.noiSinh, ''),
                COALESCE(tv.noiMat, ''),
                COALESCE(tv.ngheNghiep, ''),
                COALESCE(tv.trinhDoHocVan, ''),
                COALESCE(tv.diaChiHienTai, ''),
                COALESCE(tv.tieuSu, '')
            )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%')
        )
    ORDER BY tv.ngayTao DESC;
    
    -- Tổng số dòng
    SELECT COUNT(*) INTO p_total_row FROM Results;
    
    -- Trả kết quả phân trang
    SELECT 
        *,
        p_total_row AS RecordCount
    FROM Results
    WHERE RowNumber BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1
                         AND (p_pageIndex * p_pageSize)
    ORDER BY ngayTao DESC;
    
    -- Xóa bảng tạm
    DROP TEMPORARY TABLE IF EXISTS Results;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchThanhVienByDongHo(
    IN p_pageIndex INT,
    IN p_pageSize INT,
    IN p_search_content VARCHAR(255),
    IN p_dongHoId VARCHAR(50),
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE p_total_row INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            p_error_code = RETURNED_SQLSTATE,
            p_error_message = MESSAGE_TEXT;
    END;
    
    SET p_error_code = 0;
    SET p_error_message = '';
    
    -- CÓ PHÂN TRANG
    IF p_pageSize <> 0 THEN
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT DISTINCT
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
            tv.soDienThoai,
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
            chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        WHERE tv.active_flag = 1
            AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
            AND (p_search_content IS NULL OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tv.hoTen, ''),
                    COALESCE(tv.ngheNghiep, ''),
                    COALESCE(tv.trinhDoHocVan, ''),
                    COALESCE(tv.diaChiHienTai, ''),
                    COALESCE(tv.soDienThoai, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
        ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        -- Add row numbers
        SET @row_number = 0;
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            r.*,
            p_total_row AS RecordCount
        FROM Results r
        WHERE (@row_number + 1) BETWEEN ((p_pageIndex - 1) * p_pageSize) + 1 AND (p_pageIndex * p_pageSize);
        
        DROP TEMPORARY TABLE Results;
        
    -- KHÔNG PHÂN TRANG
    ELSE
        DROP TEMPORARY TABLE IF EXISTS Results;
        
        CREATE TEMPORARY TABLE Results AS
        SELECT DISTINCT
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
            tv.soDienThoai,
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
            chong.hoTen AS tenChong
        FROM thanhvien tv
        LEFT JOIN thanhvien cha ON tv.dongHoId = cha.dongHoId AND tv.chaId = cha.thanhVienId
        LEFT JOIN thanhvien me ON tv.dongHoId = me.dongHoId AND tv.meId = me.thanhVienId
        LEFT JOIN thanhvien vo ON tv.dongHoId = vo.dongHoId AND tv.voId = vo.thanhVienId
        LEFT JOIN thanhvien chong ON tv.dongHoId = chong.dongHoId AND tv.chongId = chong.thanhVienId
        WHERE tv.active_flag = 1
            AND (p_dongHoId IS NULL OR p_dongHoId = '' OR tv.dongHoId = p_dongHoId)
            AND (p_search_content IS NULL OR p_search_content = ''
                OR LOWER(CONCAT(
                    COALESCE(tv.hoTen, ''),
                    COALESCE(tv.ngheNghiep, ''),
                    COALESCE(tv.trinhDoHocVan, ''),
                    COALESCE(tv.diaChiHienTai, ''),
                    COALESCE(tv.soDienThoai, '')
                )) LIKE CONCAT('%', LOWER(TRIM(p_search_content)), '%'))
        ORDER BY tv.doiThuoc ASC, tv.thanhVienId ASC;
        
        SELECT COUNT(*) INTO p_total_row FROM Results;
        
        -- Add row numbers
        SET @row_number = 0;
        SELECT 
            (@row_number := @row_number + 1) AS RowNumber,
            r.*,
            p_total_row AS RecordCount
        FROM Results r;
        
        DROP TEMPORARY TABLE Results;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SearchTinTuc(
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE SignUp(
    IN p_userId VARCHAR(40),
    IN p_tendangnhap VARCHAR(200),
    IN p_matkhau VARCHAR(200),
    IN p_tenDongHo VARCHAR(255),
    IN p_queQuanGoc VARCHAR(255),
    IN p_ngayThanhLap DATE,
    OUT p_error_code INT,
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE v_roleId VARCHAR(50);
    DECLARE v_dongHoId VARCHAR(50);
    DECLARE v_error_detail VARCHAR(500);

    -- Handler lỗi SQL với chi tiết
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        GET DIAGNOSTICS CONDITION 1
            v_error_detail = MESSAGE_TEXT;
        ROLLBACK;
        SET p_error_code = -1;
        SET p_error_message = CONCAT('Lỗi SQL: ', v_error_detail);
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;

    -- Kiểm tra tên đăng nhập đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM NguoiDung WHERE tenDangNhap = p_tendangnhap) THEN
        SET p_error_code = -1;
        SET p_error_message = 'Tài khoản người dùng đã tồn tại!';
        ROLLBACK;

    ELSE
        -- ⭐ BƯỚC 1: Lấy roleId có roleCode = 'thudo'
        SELECT roleId INTO v_roleId
        FROM Role
        WHERE roleCode = 'thudo'
        LIMIT 1;

        -- Nếu không tìm thấy role → báo lỗi
        IF v_roleId IS NULL THEN
            SET p_error_code = -1;
            SET p_error_message = 'Không tìm thấy role mặc định "thanhvien".';
            ROLLBACK;
        ELSE
            -- ⭐ BƯỚC 2: Tạo dòng họ mới
            SET v_dongHoId = UUID();
            
            INSERT INTO DongHo
                (dongHoId, tenDongHo, queQuanGoc, ngayThanhLap, 
                 nguoiQuanLy, active_flag, nguoiTaoId, ngayTao, lu_updated, lu_user_id)
            VALUES
                (v_dongHoId, p_tenDongHo, p_queQuanGoc, p_ngayThanhLap,
                 p_tendangnhap, 1, p_userId, NOW(), NOW(), p_userId);

            -- ⭐ BƯỚC 3: Thêm người dùng với roleId và dongHoId vừa tạo
            INSERT INTO NguoiDung
                (nguoiDungId, dongHoId, roleId, tenDangNhap, matKhau,
                 ngayTao, online_flag, active_flag,
                 lu_updated, lu_user_id)
            VALUES
                (p_userId, v_dongHoId, v_roleId, p_tendangnhap, p_matkhau,
                 NOW(), 0, 1,
                 NOW(), p_userId);

            -- ⭐ BƯỚC 4: Tạo user_profile với userId = nguoiDungId (chỉ các trường tối thiểu)
            INSERT INTO user_profile
                (userId, email, active_flag, created_by_user_id, create_date)
            VALUES
                (p_userId, p_tendangnhap, 1, p_userId, NOW());

            COMMIT;
            SET p_error_message = 'Đăng ký thành công!';
        END IF;

    END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE sp_clear_relationships(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    DELETE FROM quanhe WHERE dongHoId1 = p_dongHoId;
    
    SELECT ROW_COUNT() as deleted_count;
END$$
DELIMITER ;

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

DELIMITER $$
CREATE PROCEDURE TestImportComplete(
    IN p_dongHoId VARCHAR(50)
)
BEGIN
    DECLARE v_json_update JSON;
    DECLARE v_json_insert JSON;
    
    -- ========================================================================
    -- PHẦN 1: XEM DỮ LIỆU HIỆN TẠI
    -- ========================================================================
    SELECT '========== BƯỚC 1: DỮ LIỆU HIỆN TẠI ==========' AS info;
    SELECT thuId, hoTenNguoiDong, soTien, noiDung
    FROM taichinhthu
    WHERE dongHoId = p_dongHoId
    ORDER BY thuId;
    
    -- ========================================================================
    -- PHẦN 2: TEST UPDATE VỚI thuId = 1
    -- ========================================================================
    SET v_json_update = '[
        {
            "thu_id": 1,
            "stt": 1,
            "ho_ten_nguoi_dong": "UPDATED - Test",
            "ngay_dong": "15/01/2026",
            "so_tien": 999999,
            "phuong_thuc_thanh_toan": "Chuyển khoản",
            "noi_dung": "Đã cập nhật",
            "ghi_chu": "Test UPDATE"
        }
    ]';
    
    SELECT '========== BƯỚC 2: TEST UPDATE (thuId=1) ==========' AS info;
    
    -- Tạo temp table
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    CREATE TEMPORARY TABLE tmp_test (
        row_id INT AUTO_INCREMENT PRIMARY KEY,
        thu_id INT,
        stt INT,
        ho_ten_nguoi_dong VARCHAR(255),
        ngay_dong DATE,
        so_tien DECIMAL(18,2),
        phuong_thuc_thanh_toan VARCHAR(100),
        noi_dung TEXT,
        ghi_chu TEXT,
        is_existing TINYINT DEFAULT 0,
        KEY idx_thu_id (thu_id)
    );
    
    -- Parse JSON
    INSERT INTO tmp_test (thu_id, stt, ho_ten_nguoi_dong, ngay_dong, so_tien, phuong_thuc_thanh_toan, noi_dung, ghi_chu)
    SELECT 
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.thu_id')),'0') AS UNSIGNED),
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.stt')),'0') AS UNSIGNED),
        JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ho_ten_nguoi_dong')),
        STR_TO_DATE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ngay_dong')),'%d/%m/%Y'),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.so_tien')) AS DECIMAL(18,2)),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.phuong_thuc_thanh_toan')),'Tiền mặt'),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.noi_dung')),''),
        COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ghi_chu')),'')
    FROM JSON_TABLE(v_json_update,'$[*]' COLUMNS(value JSON PATH '$')) j;
    
    SELECT '2.1 - Sau khi parse JSON:' AS step;
    SELECT * FROM tmp_test;
    
    -- Đánh dấu existing
    UPDATE tmp_test t
    SET t.is_existing = 1
    WHERE t.thu_id > 0
      AND EXISTS (
          SELECT 1 FROM taichinhthu tt
          WHERE tt.dongHoId = p_dongHoId
            AND tt.thuId = t.thu_id
            AND tt.active_flag = 1
      );
    
    SELECT '2.2 - Sau khi đánh dấu existing:' AS step;
    SELECT thu_id, ho_ten_nguoi_dong, so_tien, is_existing,
           CASE WHEN is_existing = 1 THEN 'UPDATE' ELSE 'INSERT' END AS action
    FROM tmp_test;
    
    -- Kiểm tra: is_existing phải = 1
    IF (SELECT is_existing FROM tmp_test LIMIT 1) = 0 THEN
        SELECT '❌ LỖI: is_existing = 0 (lẽ ra phải = 1)' AS error;
        SELECT 'Kiểm tra: thuId có tồn tại trong DB không?' AS hint;
    ELSE
        SELECT '✅ OK: is_existing = 1' AS success;
    END IF;
    
    SELECT '2.3 - Trước khi UPDATE:' AS step;
    SELECT thuId, hoTenNguoiDong, soTien, noiDung
    FROM taichinhthu
    WHERE dongHoId = p_dongHoId AND thuId = 1;
    
    -- Thực hiện UPDATE
    UPDATE taichinhthu tt
    INNER JOIN tmp_test t 
      ON tt.thuId = t.thu_id 
      AND tt.dongHoId = p_dongHoId
      AND tt.active_flag = 1
    SET 
        tt.hoTenNguoiDong = t.ho_ten_nguoi_dong,
        tt.ngayDong = t.ngay_dong,
        tt.soTien = t.so_tien,
        tt.phuongThucThanhToan = t.phuong_thuc_thanh_toan,
        tt.noiDung = t.noi_dung,
        tt.ghiChu = t.ghi_chu,
        tt.lu_updated = NOW(),
        tt.lu_user_id = 'test-user'
    WHERE t.is_existing = 1;
    
    SELECT CONCAT('Số dòng đã UPDATE: ', ROW_COUNT()) AS result;
    
    SELECT '2.4 - Sau khi UPDATE:' AS step;
    SELECT thuId, hoTenNguoiDong, soTien, noiDung
    FROM taichinhthu
    WHERE dongHoId = p_dongHoId AND thuId = 1;
    
    -- Kiểm tra kết quả
    IF (SELECT soTien FROM taichinhthu WHERE dongHoId = p_dongHoId AND thuId = 1) = 999999 THEN
        SELECT '✅ UPDATE THÀNH CÔNG: Số tiền = 999999' AS success;
    ELSE
        SELECT '❌ UPDATE THẤT BẠI: Số tiền không thay đổi' AS error;
    END IF;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    
    -- ========================================================================
    -- PHẦN 3: TEST INSERT VỚI thu_id = 0
    -- ========================================================================
    SET v_json_insert = '[
        {
            "thu_id": 0,
            "stt": 1,
            "ho_ten_nguoi_dong": "Test INSERT NEW",
            "ngay_dong": "15/01/2026",
            "so_tien": 123456,
            "phuong_thuc_thanh_toan": "Tiền mặt",
            "noi_dung": "Test thêm mới",
            "ghi_chu": ""
        }
    ]';
    
    SELECT '========== BƯỚC 3: TEST INSERT (thu_id=0) ==========' AS info;
    
    -- Tạo temp table
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    CREATE TEMPORARY TABLE tmp_test (
        row_id INT AUTO_INCREMENT PRIMARY KEY,
        thu_id INT,
        stt INT,
        ho_ten_nguoi_dong VARCHAR(255),
        so_tien DECIMAL(18,2),
        is_existing TINYINT DEFAULT 0,
        KEY idx_thu_id (thu_id)
    );
    
    -- Parse JSON
    INSERT INTO tmp_test (thu_id, stt, ho_ten_nguoi_dong, so_tien)
    SELECT 
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.thu_id')),'0') AS UNSIGNED),
        CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.stt')),'0') AS UNSIGNED),
        JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.ho_ten_nguoi_dong')),
        CAST(JSON_UNQUOTE(JSON_EXTRACT(j.value,'$.so_tien')) AS DECIMAL(18,2))
    FROM JSON_TABLE(v_json_insert,'$[*]' COLUMNS(value JSON PATH '$')) j;
    
    SELECT '3.1 - Sau khi parse JSON:' AS step;
    SELECT * FROM tmp_test;
    
    -- Lấy max ID
    SET @v_max_id = (SELECT COALESCE(MAX(thuId), 0) FROM taichinhthu WHERE dongHoId = p_dongHoId);
    SELECT CONCAT('Max thuId hiện tại: ', @v_max_id) AS info;
    
    -- Gán ID mới
    SET @row_num = 0;
    UPDATE tmp_test t
    SET t.thu_id = @v_max_id + (@row_num := @row_num + 1)
    WHERE t.is_existing = 0 
      AND t.thu_id = 0
      AND row_id > 0
    ORDER BY t.stt;
    
    SELECT '3.2 - Sau khi gán ID mới:' AS step;
    SELECT thu_id, ho_ten_nguoi_dong, so_tien FROM tmp_test;
    
    SELECT CONCAT('ID mới sẽ là: ', @v_max_id + 1) AS expected;
    
    DROP TEMPORARY TABLE IF EXISTS tmp_test;
    
    -- ========================================================================
    -- PHẦN 4: TỔNG KẾT
    -- ========================================================================
    SELECT '========== TỔNG KẾT ==========' AS info;
    SELECT 
        'Nếu UPDATE thành công → is_existing = 1 và số tiền = 999999' AS test_update,
        'Nếu INSERT đúng → ID mới = max_id + 1' AS test_insert;
    
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateDongHo(
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
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateEvent(
   IN p_suKienId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_tenSuKien VARCHAR(50),
   IN p_ngayDienRa date,
   IN p_gioDienRa time,
   IN p_diaDiem VARCHAR(255),
   IN p_moTa VARCHAR(20),
   IN p_lapLai INT,
   IN p_loaiSuKien INT,
   IN p_uuTien INT,
   IN p_lu_user_id VARCHAR(100),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        UPDATE SuKien
        SET
			  dongHoId = p_dongHoId,
			  tenSuKien = p_tenSuKien,
			  ngayDienRa = p_ngayDienRa,
			  gioDienRa = p_gioDienRa,
			  diaDiem = p_diaDiem,
			  moTa = p_moTa,
			  lapLai = p_lapLai,
              lu_updated = now(),
			  loaiSuKien = p_loaiSuKien,
              uuTien = p_uuTien,
              lu_user_id = p_lu_user_id
		WHERE suKienId = p_suKienId;
		COMMIT;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateMember(
	p_thanhVienId INT,
    p_dongHoId VARCHAR(50) ,
    p_hoTen VARCHAR(255) ,
    p_gioiTinh TINYINT ,
    p_ngaySinh DATE ,
    p_ngayMat DATE ,
    p_noiSinh VARCHAR(255) ,
    p_noiMat VARCHAR(255) ,
    p_ngheNghiep VARCHAR(255) ,
    p_trinhDoHocVan VARCHAR(255) ,
    p_diaChiHienTai VARCHAR(255) ,
    p_tieuSu TEXT,
    p_anhChanDung VARCHAR(255) ,
    p_doiThuoc INT ,
    p_chaId INT ,
    p_meId INT ,
    p_voId INT,
    p_chongId INT ,
    p_lu_user_id VARCHAR(50),
    OUT p_error_code INT, 
	OUT p_error_message VARCHAR(500)
)
BEGIN 	
	DECLARE active_flag INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
	END;
    SET p_error_code = 0;
    SET p_error_message = '';
    START TRANSACTION;
    UPDATE ThanhVien
	SET	
		dongHoId = p_dongHoId,
		hoTen = p_hoTen ,
		gioiTinh = p_gioiTinh ,
		ngaySinh =  p_ngaySinh,
		ngayMat = p_ngayMat,
		noiSinh = p_noiSinh ,
		noiMat = p_noiMat ,
		ngheNghiep = p_ngheNghiep ,
		trinhDoHocVan = p_trinhDoHocVan,
		diaChiHienTai = p_diaChiHienTai,
		tieuSu = p_tieuSu ,
		anhChanDung = p_anhChanDung,
		doiThuoc = p_doiThuoc ,
		chaId = p_chaId ,
		meId = p_meId ,
		voId = p_voId ,
		chongId = p_chongId,
        lu_updated = now(),
		lu_user_id = p_lu_user_id
        where thanhVienId = p_thanhVienId;
        commit;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateMemberComposite(
  IN p_dongHoId VARCHAR(50),
  IN p_thanhVienId INT,
  IN p_hoTen VARCHAR(255),
  IN p_gioiTinh INT,
  IN p_ngaySinh DATE,
  IN p_ngayMat DATE,
  IN p_noiSinh VARCHAR(255),
  IN p_noiMat VARCHAR(255),
  IN p_ngheNghiep VARCHAR(255),
  IN p_trinhDoHocVan VARCHAR(255),
  IN p_diaChiHienTai VARCHAR(500),
  IN p_tieuSu TEXT,
  IN p_anhChanDung VARCHAR(255),
  IN p_doiThuoc INT,
  IN p_chaId INT,
  IN p_meId INT,
  IN p_voId INT,
  IN p_chongId INT,
  IN p_lu_user_id VARCHAR(50),
  OUT p_err_code INT,
  OUT p_err_msg VARCHAR(255)
)
BEGIN
  UPDATE thanhvien SET
    hoTen = p_hoTen,
    gioiTinh = p_gioiTinh,
    ngaySinh = p_ngaySinh,
    ngayMat = p_ngayMat,
    noiSinh = p_noiSinh,
    noiMat = p_noiMat,
    ngheNghiep = p_ngheNghiep,
    trinhDoHocVan = p_trinhDoHocVan,
    diaChiHienTai = p_diaChiHienTai,
    tieuSu = p_tieuSu,
    anhChanDung = p_anhChanDung,
    doiThuoc = p_doiThuoc,
    chaId = p_chaId,
    meId = p_meId,
    voId = p_voId,
    chongId = p_chongId,
    lu_updated = NOW(),
    lu_user_id = p_lu_user_id
  WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId;
  
  SET p_err_code = 0;
  SET p_err_msg = 'Success';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateMyAccountAndProfile(
    IN p_userId CHAR(36),
    IN p_tenDangNhap VARCHAR(100),
    IN p_matKhau VARCHAR(255),
    IN p_first_name VARCHAR(50),
    IN p_middle_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_gender TINYINT,
    IN p_date_of_birthday DATE,
    IN p_avatar VARCHAR(255),
    IN p_email VARCHAR(100),
    IN p_phone VARCHAR(20),
    IN p_lu_user_id VARCHAR(50),
    OUT p_error_code INT, 
    OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_error_message = MESSAGE_TEXT;
        SET p_error_code = 9999;
        ROLLBACK;
    END;

    SET p_error_code = 0;
    SET p_error_message = '';

    -- Kiểm tra user tồn tại
    IF NOT EXISTS (SELECT 1 FROM nguoidung WHERE nguoiDungId = p_userId) THEN
        SET p_error_code = 1001;
        SET p_error_message = 'Người dùng không tồn tại';
    ELSE
        START TRANSACTION;

        -- Update NguoiDung
        UPDATE nguoidung
        SET
            tenDangNhap = COALESCE(NULLIF(p_tenDangNhap, ''), tenDangNhap),
            matKhau = CASE 
                WHEN p_matKhau IS NOT NULL AND TRIM(p_matKhau) != '' 
                THEN p_matKhau 
                ELSE matKhau 
            END,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_userId;

        -- Insert / Update user_profile
        IF NOT EXISTS (SELECT 1 FROM user_profile WHERE userId = p_userId) THEN
            INSERT INTO user_profile (
                userId, first_name, middle_name, last_name, full_name,
                gender, date_of_birthday, avatar, email, phone,
                active_flag, created_by_user_id, create_date,
                lu_updated, lu_user_id
            ) VALUES (
                p_userId,
                p_first_name,
                p_middle_name,
                p_last_name,
                TRIM(CONCAT(
                    COALESCE(p_last_name, ''), ' ',
                    COALESCE(p_middle_name, ''), ' ',
                    COALESCE(p_first_name, '')
                )),
                COALESCE(p_gender, 1),
                p_date_of_birthday,
                p_avatar,
                p_email,
                p_phone,
                1,
                p_lu_user_id,
                NOW(),
                NOW(),
                p_lu_user_id
            );
        ELSE
            UPDATE user_profile
            SET
                first_name = COALESCE(p_first_name, first_name),
                middle_name = COALESCE(p_middle_name, middle_name),
                last_name = COALESCE(p_last_name, last_name),
                full_name = TRIM(CONCAT(
                    COALESCE(p_last_name, last_name), ' ',
                    COALESCE(p_middle_name, middle_name), ' ',
                    COALESCE(p_first_name, first_name)
                )),
                gender = COALESCE(p_gender, gender),
                date_of_birthday = COALESCE(p_date_of_birthday, date_of_birthday),
                avatar = COALESCE(NULLIF(p_avatar, ''), avatar),
                email = COALESCE(NULLIF(p_email, ''), email),
                phone = COALESCE(NULLIF(p_phone, ''), phone),
                lu_updated = NOW(),
                lu_user_id = p_lu_user_id
            WHERE userId = p_userId;
        END IF;

        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 1002;
            SET p_error_message = 'Không có dữ liệu nào được cập nhật';
            ROLLBACK;
        ELSE
            COMMIT;
            SET p_error_message = 'Cập nhật thông tin thành công';
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateRole(
    IN p_roleId VARCHAR(36),
    IN p_roleName NVARCHAR(100),
    IN p_description NVARCHAR(255),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Kiểm tra role tồn tại
    IF NOT EXISTS (SELECT 1 FROM role WHERE roleId = p_roleId AND active_flag = 1) THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Nhóm quyền không tồn tại';
        ROLLBACK;
    ELSE
        UPDATE role 
        SET roleName = p_roleName, 
            description = p_description, 
            lu_updated = NOW()
        WHERE roleId = p_roleId;
        
        SET p_err_code = 0;
        SET p_err_msg = 'Cập nhật thành công';
        COMMIT;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateRolePermissions(
    IN p_roleId VARCHAR(36),
    IN p_permissions JSON,
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE i INT DEFAULT 0;
    DECLARE total INT;
    DECLARE v_chucNangId VARCHAR(36);
    DECLARE v_thaoTacId VARCHAR(36);
    DECLARE v_active TINYINT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Xóa quyền cũ
    DELETE FROM role_chucnang WHERE roleId = p_roleId;
    
    -- Thêm quyền mới từ JSON array
    SET total = JSON_LENGTH(p_permissions);
    
    WHILE i < total DO
        SET v_chucNangId = JSON_UNQUOTE(JSON_EXTRACT(p_permissions, CONCAT('$[', i, '].chucNangId')));
        SET v_thaoTacId = JSON_UNQUOTE(JSON_EXTRACT(p_permissions, CONCAT('$[', i, '].thaoTacId')));
        SET v_active = JSON_EXTRACT(p_permissions, CONCAT('$[', i, '].active'));
        
        IF v_active = 1 OR v_active = TRUE THEN
            INSERT INTO role_chucnang (roleId, chucNangId, thaoTacId, active_flag, lu_updated)
            VALUES (p_roleId, v_chucNangId, v_thaoTacId, 1, NOW());
        END IF;
        
        SET i = i + 1;
    END WHILE;
    
    SET p_err_code = 0;
    SET p_err_msg = 'Cập nhật quyền thành công';
    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateTaiChinhChi(
    IN p_chiId INT,
    IN p_dongHoId VARCHAR(50),
    IN p_ngayChi DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
    IN p_nguoiNhan VARCHAR(255),
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
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSE
        UPDATE taichinhchi
        SET 
            ngayChi = p_ngayChi,
            soTien = p_soTien,
            phuongThucThanhToan = p_phuongThucThanhToan,
            noiDung = p_noiDung,
            nguoiNhan = p_nguoiNhan,
            ghiChu = p_ghiChu,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE chiId = p_chiId AND dongHoId = p_dongHoId;
        
        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 1;
            SET p_error_message = 'Không tìm thấy khoản chi để cập nhật';
            ROLLBACK;
        ELSE
            SET p_error_message = 'Cập nhật khoản chi thành công';
            COMMIT;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateTaiChinhThu(
    IN p_thuId INT,
    IN p_dongHoId VARCHAR(50),
    IN p_hoTenNguoiDong VARCHAR(255),
    IN p_ngayDong DATE,
    IN p_soTien DECIMAL(18,2),
    IN p_phuongThucThanhToan VARCHAR(100),
    IN p_noiDung TEXT,
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
    
    -- Validate
    IF p_soTien <= 0 THEN
        SET p_error_code = 1;
        SET p_error_message = 'Số tiền phải lớn hơn 0';
        ROLLBACK;
    ELSEIF p_hoTenNguoiDong IS NULL OR p_hoTenNguoiDong = '' THEN
        SET p_error_code = 1;
        SET p_error_message = 'Họ tên người đóng không được để trống';
        ROLLBACK;
    ELSE
        UPDATE taichinhthu
        SET 
            hoTenNguoiDong = p_hoTenNguoiDong,
            ngayDong = p_ngayDong,
            soTien = p_soTien,
            phuongThucThanhToan = p_phuongThucThanhToan,
            noiDung = p_noiDung,
            ghiChu = p_ghiChu,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE thuId = p_thuId AND dongHoId = p_dongHoId;
        
        IF ROW_COUNT() = 0 THEN
            SET p_error_code = 1;
            SET p_error_message = 'Không tìm thấy khoản thu để cập nhật';
            ROLLBACK;
        ELSE
            SET p_error_message = 'Cập nhật khoản thu thành công';
            COMMIT;
        END IF;
    END IF;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateTaiLieu(
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
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 
            p_err_code = RETURNED_SQLSTATE, 
            p_err_msg = MESSAGE_TEXT;
        ROLLBACK;
    END;

    SET p_err_code = 0;
    SET p_err_msg = 'Success';

    -- Cập nhật tài liệu
    -- Lưu ý: Không dùng IFNULL cho duongDan để có thể cập nhật file mới
    UPDATE tailieu 
    SET
        dongHoId = p_dongHoId,
        tenTaiLieu = p_tenTaiLieu,
        duongDan = p_duongDan,  -- Cập nhật trực tiếp, không dùng IFNULL
        moTa = p_moTa,
        loaiTaiLieu = p_loaiTaiLieu,
        namSangTac = p_namSangTac,
        tacGia = p_tacGia,
        nguonGoc = p_nguonGoc,
        ghiChu = p_ghiChu,
        lu_updated = NOW(),
        lu_user_id = p_lu_user_id
    WHERE taiLieuId = p_taiLieuId
      AND active_flag = 1;

    -- Kiểm tra có cập nhật được không
    IF ROW_COUNT() = 0 THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Không tìm thấy tài liệu hoặc tài liệu đã bị xóa';
    END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateThanhVien(
    IN p_dongHoId VARCHAR(36),
    IN p_thanhVienId INT,
    IN p_hoTen NVARCHAR(100),
    IN p_gioiTinh TINYINT,
    IN p_ngaySinh DATE,
    IN p_ngayMat DATE,
    IN p_noiSinh NVARCHAR(255),
    IN p_noiMat NVARCHAR(255),
    IN p_ngheNghiep NVARCHAR(100),
    IN p_trinhDoHocVan NVARCHAR(100),
    IN p_soDienThoai VARCHAR(20),
    IN p_diaChiHienTai NVARCHAR(255),
    IN p_tieuSu TEXT,
    IN p_anhChanDung VARCHAR(255),
    IN p_doiThuoc INT,
    IN p_chaId INT,
    IN p_meId INT,
    IN p_voId INT,
    IN p_chongId INT,
    IN p_lu_user_id VARCHAR(36),
    OUT p_err_code INT,
    OUT p_err_msg NVARCHAR(255)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        GET DIAGNOSTICS CONDITION 1 @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
        SET p_err_code = @errno;
        SET p_err_msg = @text;
        ROLLBACK;
    END;

    START TRANSACTION;
    
    -- Kiểm tra thành viên tồn tại
    IF NOT EXISTS (SELECT 1 FROM thanhvien WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId AND active_flag = 1) THEN
        SET p_err_code = 1;
        SET p_err_msg = 'Thành viên không tồn tại';
        ROLLBACK;
    ELSE
        UPDATE thanhvien SET
            hoTen = p_hoTen,
            gioiTinh = p_gioiTinh,
            ngaySinh = p_ngaySinh,
            ngayMat = p_ngayMat,
            noiSinh = p_noiSinh,
            noiMat = p_noiMat,
            ngheNghiep = p_ngheNghiep,
            trinhDoHocVan = p_trinhDoHocVan,
            soDienThoai = p_soDienThoai,
            diaChiHienTai = p_diaChiHienTai,
            tieuSu = p_tieuSu,
            anhChanDung = p_anhChanDung,
            doiThuoc = p_doiThuoc,
            chaId = p_chaId,
            meId = p_meId,
            voId = p_voId,
            chongId = p_chongId,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE dongHoId = p_dongHoId AND thanhVienId = p_thanhVienId;
        
        SET p_err_code = 0;
        SET p_err_msg = 'Cập nhật thành công';
        COMMIT;
    END IF;

END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateTinTuc(
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
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateUser(
   IN p_nguoiDungId VARCHAR(50),
   IN p_dongHoId VARCHAR(50),
   IN p_roleId VARCHAR(50),
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   IN p_hoTen VARCHAR(255),
   IN p_soDienThoai VARCHAR(20),
   IN p_email VARCHAR(100),
   IN p_gender TINYINT,
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
        UPDATE NguoiDung
        SET
            dongHoId = p_dongHoId,
            roleId = p_roleId,
            tenDangNhap = p_tenDangNhap,
            matKhau = CASE 
                WHEN p_matKhau IS NULL THEN matKhau 
                ELSE p_matKhau 
            END,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_nguoiDungId;

        UPDATE user_profile
        SET
            full_name = p_hoTen,
            phone = p_soDienThoai,
            email = COALESCE(p_email, p_tenDangNhap),
            gender = p_gender,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE userId = p_nguoiDungId;

    COMMIT;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE UpdateUserFull(
   IN p_userId CHAR(36),
   -- Thông tin tài khoản (NguoiDung)
   IN p_tenDangNhap VARCHAR(100),
   IN p_matKhau VARCHAR(255),
   -- Thông tin cá nhân (user_profile)
   IN p_first_name VARCHAR(50),
   IN p_middle_name VARCHAR(50),
   IN p_last_name VARCHAR(50),
   IN p_gender TINYINT,
   IN p_date_of_birthday DATE,
   IN p_avatar VARCHAR(255),
   IN p_email VARCHAR(100),
   IN p_phone VARCHAR(20),
   -- Thông tin quản lý
   IN p_lu_user_id VARCHAR(50),
   OUT p_error_code INT, 
   OUT p_error_message VARCHAR(500)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
         GET DIAGNOSTICS CONDITION 1 p_error_code = RETURNED_SQLSTATE, p_error_message = MESSAGE_TEXT;
         ROLLBACK;
    END; 

    SET p_error_code = 0;
    SET p_error_message = '';

    START TRANSACTION;
        
        -- 1. Cập nhật bảng NguoiDung (Username & Password)
        UPDATE NguoiDung
        SET
            tenDangNhap = p_tenDangNhap,
            matKhau = p_matKhau,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE nguoiDungId = p_userId;

        -- 2. Cập nhật bảng user_profile (Tất cả thông tin chi tiết)
        UPDATE user_profile
        SET
            first_name = p_first_name,
            middle_name = p_middle_name,
            last_name = p_last_name,
            full_name = TRIM(CONCAT(COALESCE(p_last_name,''), ' ', COALESCE(p_middle_name,''), ' ', COALESCE(p_first_name,''))),
            gender = p_gender,
            date_of_birthday = p_date_of_birthday,
            avatar = p_avatar,
            email = p_email,
            phone = p_phone,
            lu_updated = NOW(),
            lu_user_id = p_lu_user_id
        WHERE userId = p_userId;
    COMMIT;
END$$
DELIMITER ;
