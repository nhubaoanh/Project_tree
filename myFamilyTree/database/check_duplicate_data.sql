-- =====================================================
-- CHECK AND ANALYZE DUPLICATE DATA
-- =====================================================
-- Run this script to check current duplicate issues

-- Check duplicate records in taichinhthu
SELECT 
    'TAICHINHTHU DUPLICATES' as TableName,
    thuId,
    dongHoId,
    COUNT(*) as DuplicateCount,
    GROUP_CONCAT(active_flag ORDER BY active_flag) as ActiveFlags,
    GROUP_CONCAT(hoTenNguoiDong ORDER BY lu_updated DESC SEPARATOR ' | ') as Names,
    GROUP_CONCAT(DATE(lu_updated) ORDER BY lu_updated DESC SEPARATOR ' | ') as UpdateDates
FROM taichinhthu 
GROUP BY thuId, dongHoId 
HAVING COUNT(*) > 1
ORDER BY DuplicateCount DESC, thuId;

-- Check duplicate records in taichinhchi  
SELECT 
    'TAICHINHCHI DUPLICATES' as TableName,
    chiId,
    dongHoId,
    COUNT(*) as DuplicateCount,
    GROUP_CONCAT(active_flag ORDER BY active_flag) as ActiveFlags,
    GROUP_CONCAT(nguoiNhan ORDER BY lu_updated DESC SEPARATOR ' | ') as Recipients,
    GROUP_CONCAT(DATE(lu_updated) ORDER BY lu_updated DESC SEPARATOR ' | ') as UpdateDates
FROM taichinhchi 
GROUP BY chiId, dongHoId 
HAVING COUNT(*) > 1
ORDER BY DuplicateCount DESC, chiId;

-- Count records by active_flag status
SELECT 
    'TAICHINHTHU STATUS' as Info,
    active_flag,
    COUNT(*) as RecordCount,
    CONCAT(ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM taichinhthu), 2), '%') as Percentage
FROM taichinhthu 
GROUP BY active_flag
ORDER BY active_flag;

SELECT 
    'TAICHINHCHI STATUS' as Info,
    active_flag,
    COUNT(*) as RecordCount,
    CONCAT(ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM taichinhchi), 2), '%') as Percentage
FROM taichinhchi 
GROUP BY active_flag
ORDER BY active_flag;

-- Show recent records that might have been "deleted" (active_flag = 0)
SELECT 
    'RECENTLY DELETED TAICHINHTHU' as Info,
    thuId,
    dongHoId,
    hoTenNguoiDong,
    soTien,
    active_flag,
    lu_updated,
    lu_user_id
FROM taichinhthu 
WHERE active_flag = 0 
ORDER BY lu_updated DESC 
LIMIT 10;

SELECT 
    'RECENTLY DELETED TAICHINHCHI' as Info,
    chiId,
    dongHoId,
    nguoiNhan,
    soTien,
    active_flag,
    lu_updated,
    lu_user_id
FROM taichinhchi 
WHERE active_flag = 0 
ORDER BY lu_updated DESC 
LIMIT 10;

-- Summary
SELECT 
    'SUMMARY' as Info,
    'Total TAICHINHTHU records' as Description,
    COUNT(*) as Count
FROM taichinhthu
UNION ALL
SELECT 
    'SUMMARY' as Info,
    'Active TAICHINHTHU records' as Description,
    COUNT(*) as Count
FROM taichinhthu WHERE active_flag = 1
UNION ALL
SELECT 
    'SUMMARY' as Info,
    'Deleted TAICHINHTHU records' as Description,
    COUNT(*) as Count
FROM taichinhthu WHERE active_flag = 0
UNION ALL
SELECT 
    'SUMMARY' as Info,
    'Total TAICHINHCHI records' as Description,
    COUNT(*) as Count
FROM taichinhchi
UNION ALL
SELECT 
    'SUMMARY' as Info,
    'Active TAICHINHCHI records' as Description,
    COUNT(*) as Count
FROM taichinhchi WHERE active_flag = 1
UNION ALL
SELECT 
    'SUMMARY' as Info,
    'Deleted TAICHINHCHI records' as Description,
    COUNT(*) as Count
FROM taichinhchi WHERE active_flag = 0;