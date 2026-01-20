-- =============================================
-- Stored Procedure: GetUserById
-- Description: Lấy thông tin user theo ID để refresh token
-- =============================================

DELIMITER $$

DROP PROCEDURE IF EXISTS GetUserById$$

CREATE PROCEDURE GetUserById(
    IN p_nguoiDungId VARCHAR(36)
)
BEGIN
    -- Lấy thông tin user
    SELECT 
        nguoiDungId,
        first_name,
        middle_name,
        last_name,
        full_name,
        gender,
        date_of_birthday,
        avatar,
        email,
        phone,
        dongHoId,
        roleId,
        roleCode,
        online_flag
    FROM nguoidung
    WHERE nguoiDungId = p_nguoiDungId
    AND active_flag = 1;
END$$

DELIMITER ;
