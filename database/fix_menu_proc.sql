-- Fix stored procedure để dùng @err_code, @err_msg như các proc khác

DROP PROCEDURE IF EXISTS `GetMenuByRoleId`;
DELIMITER //
CREATE PROCEDURE `GetMenuByRoleId`(
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
  
END //
DELIMITER ;

-- Test
CALL GetMenuByRoleId('c2ed095e-c905-11f0-8020-a8934a9bae74');
SELECT @err_code, @err_msg;
