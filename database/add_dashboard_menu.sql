-- =====================================================
-- FIX ĐƯỜNG DẪN TRONG BẢNG CHUCNANG
-- Next.js route group (admin) không tạo URL segment
-- Nên URL là /dashboard, /users, /contributions... (không có /admin)
-- =====================================================

-- Kiểm tra đường dẫn hiện tại
SELECT chucNangCode, tenChucNang, duongDan FROM chucnang;

-- Update đường dẫn cho đúng với cấu trúc Next.js
UPDATE chucnang SET duongDan = '/dashboard' WHERE chucNangCode = 'DASHBOARD';
UPDATE chucnang SET duongDan = '/family-trees' WHERE chucNangCode = 'THANHVIEN';
UPDATE chucnang SET duongDan = '/manageEvents' WHERE chucNangCode = 'SUKIEN';
UPDATE chucnang SET duongDan = '/contributions' WHERE chucNangCode = 'TAICHINH';
UPDATE chucnang SET duongDan = '/documents' WHERE chucNangCode = 'TAILIEU';
UPDATE chucnang SET duongDan = '/manage-news' WHERE chucNangCode = 'TINTUC';
UPDATE chucnang SET duongDan = '/users' WHERE chucNangCode = 'NGUOIDUNG';
UPDATE chucnang SET duongDan = '/lineage' WHERE chucNangCode = 'DONGHO';
UPDATE chucnang SET duongDan = '/roles' WHERE chucNangCode = 'PHANQUYEN';

-- Thêm contributionsDown nếu chưa có
INSERT INTO chucnang (chucNangId, chucNangCode, tenChucNang, moTa, duongDan, thuTu, active_flag)
SELECT UUID(), 'CHICHI', 'Quản lý chi tiêu', 'Quản lý chi tiêu dòng họ', '/contributionsDown', 5, 1
WHERE NOT EXISTS (SELECT 1 FROM chucnang WHERE chucNangCode = 'CHICHI');

-- Kiểm tra lại
SELECT chucNangCode, tenChucNang, duongDan, thuTu FROM chucnang ORDER BY thuTu;

-- Kiểm tra quyền của role SA
SELECT rc.id, r.roleCode, cn.chucNangCode, cn.duongDan, tt.thaoTacCode 
FROM role_chucnang rc
JOIN role r ON rc.roleId = r.roleId
JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
WHERE r.roleCode = 'sa'
ORDER BY cn.thuTu;

-- Test stored procedure
CALL GetMenuByRoleId('c2ed095e-c905-11f0-8020-a8934a9bae74');
SELECT @err_code, @err_msg;
