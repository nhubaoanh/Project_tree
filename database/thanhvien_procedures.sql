-- =============================================
-- STORED PROCEDURES CHO THÀNH VIÊN
-- =============================================

-- =============================================
-- GetAllMemberByDongHo - Lấy tất cả thành viên theo dòng họ
-- =============================================
DROP PROCEDURE IF EXISTS `GetAllMemberByDongHo`;
DELIMITER //
CREATE PROCEDURE `GetAllMemberByDongHo`(
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
END //
DELIMITER ;

-- =============================================
-- GetMemberById - Lấy thành viên theo Composite Key
-- =============================================
DROP PROCEDURE IF EXISTS `GetMemberById`;
DELIMITER //
CREATE PROCEDURE `GetMemberById`(
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
END //
DELIMITER ;

-- =============================================
-- UpdateMemberComposite - Cập nhật thành viên với Composite Key
-- =============================================
DROP PROCEDURE IF EXISTS `UpdateMemberComposite`;
DELIMITER //
CREATE PROCEDURE `UpdateMemberComposite`(
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
END //
DELIMITER ;

-- =============================================
-- DeleteMemberComposite - Xóa mềm thành viên với Composite Key
-- =============================================
DROP PROCEDURE IF EXISTS `DeleteMemberComposite`;
DELIMITER //
CREATE PROCEDURE `DeleteMemberComposite`(
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
END //
DELIMITER ;
