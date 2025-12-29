-- Test stored procedure GetMenuByRoleId
-- Chạy từng dòng để debug

-- 1. Kiểm tra bảng role_chucnang có dữ liệu không
SELECT COUNT(*) as total FROM role_chucnang;

-- 2. Kiểm tra roleId của sa
SELECT * FROM role WHERE roleCode = 'sa';

-- 3. Kiểm tra dữ liệu role_chucnang cho role sa
SELECT * FROM role_chucnang WHERE roleId = 'c2ed095e-c905-11f0-8020-a8934a9bae74' LIMIT 5;

-- 4. Kiểm tra bảng chucnang
SELECT * FROM chucnang;

-- 5. Kiểm tra bảng thaotac
SELECT * FROM thaotac;

-- 6. Test query trực tiếp (không qua proc)
SELECT 
    cn.chucNangId,
    cn.chucNangCode as code,
    cn.tenChucNang as name,
    cn.duongDan as href,
    cn.icon,
    cn.thuTu as sortOrder,
    cn.parentId,
    GROUP_CONCAT(DISTINCT tt.thaoTacCode ORDER BY tt.thaoTacCode) as actions,
    'sa' as roleCode,
    1 as canSelectAllDongHo
FROM role_chucnang rc
JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
WHERE rc.roleId = 'c2ed095e-c905-11f0-8020-a8934a9bae74'
    AND rc.active_flag = 1
    AND cn.active_flag = 1
GROUP BY cn.chucNangId, cn.chucNangCode, cn.tenChucNang, cn.duongDan, cn.icon, cn.thuTu, cn.parentId
ORDER BY cn.thuTu;

-- 7. Test gọi proc
CALL GetMenuByRoleId('c2ed095e-c905-11f0-8020-a8934a9bae74', @err_code, @err_msg);
SELECT @err_code, @err_msg;
