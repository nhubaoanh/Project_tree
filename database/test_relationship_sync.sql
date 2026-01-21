-- ============================================================================
-- TEST SCRIPT FOR RELATIONSHIP SYNC SYSTEM
-- Run this after installing relationship_sync_procedures.sql
-- ============================================================================

-- Step 1: Verify loaiquanhe table
-- ============================================================================
SELECT '=== Step 1: Verify loaiquanhe table ===' as test_step;
SELECT COUNT(*) as total_relationship_types FROM loaiquanhe;
-- Expected: 12

SELECT * FROM loaiquanhe ORDER BY loaiQuanHeId;


-- Step 2: Verify stored procedures exist
-- ============================================================================
SELECT '=== Step 2: Verify stored procedures ===' as test_step;
SHOW PROCEDURE STATUS WHERE Db = DATABASE();
-- Expected: 8 procedures


-- Step 3: Test with sample data (if you have data)
-- ============================================================================
-- Replace 'YOUR_DONG_HO_ID' with actual dongHoId from your database
SET @test_dongHoId = 'e9022e64-cbae-11f0-8020-a8934a9bae74';

SELECT '=== Step 3: Check existing members ===' as test_step;
SELECT COUNT(*) as total_members 
FROM thanhvien 
WHERE dongHoId = @test_dongHoId AND active_flag = 1;


-- Step 4: Check existing relationships (before sync)
-- ============================================================================
SELECT '=== Step 4: Relationships before sync ===' as test_step;
SELECT COUNT(*) as total_relationships_before 
FROM quanhe 
WHERE dongHoId1 = @test_dongHoId;


-- Step 5: Run sync
-- ============================================================================
SELECT '=== Step 5: Running sync... ===' as test_step;
CALL sp_sync_all_relationships(@test_dongHoId, @total);
SELECT @total as total_relationships_created;


-- Step 6: Check relationships after sync
-- ============================================================================
SELECT '=== Step 6: Relationships after sync ===' as test_step;
SELECT COUNT(*) as total_relationships_after 
FROM quanhe 
WHERE dongHoId1 = @test_dongHoId;


-- Step 7: View relationship breakdown
-- ============================================================================
SELECT '=== Step 7: Relationship breakdown ===' as test_step;
SELECT 
  lqh.tenLoaiQuanHe,
  COUNT(*) as count
FROM quanhe qh
JOIN loaiquanhe lqh ON qh.loaiQuanHeId = lqh.loaiQuanHeId
WHERE qh.dongHoId1 = @test_dongHoId
GROUP BY lqh.tenLoaiQuanHe
ORDER BY count DESC;


-- Step 8: View sample relationships
-- ============================================================================
SELECT '=== Step 8: Sample relationships (first 10) ===' as test_step;
SELECT 
  lqh.tenLoaiQuanHe,
  tv1.hoTen as nguoi1,
  tv2.hoTen as nguoi2
FROM quanhe qh
JOIN loaiquanhe lqh ON qh.loaiQuanHeId = lqh.loaiQuanHeId
JOIN thanhvien tv1 ON qh.thanhVien1Id = tv1.thanhVienId AND qh.dongHoId1 = tv1.dongHoId
JOIN thanhvien tv2 ON qh.thanhVien2Id = tv2.thanhVienId AND qh.dongHoId2 = tv2.dongHoId
WHERE qh.dongHoId1 = @test_dongHoId
LIMIT 10;


-- Step 9: Test clear relationships
-- ============================================================================
SELECT '=== Step 9: Test clear relationships ===' as test_step;
CALL sp_clear_relationships(@test_dongHoId);

SELECT COUNT(*) as total_relationships_after_clear 
FROM quanhe 
WHERE dongHoId1 = @test_dongHoId;
-- Expected: 0


-- Step 10: Re-sync to restore
-- ============================================================================
SELECT '=== Step 10: Re-sync to restore ===' as test_step;
CALL sp_sync_all_relationships(@test_dongHoId, @total);
SELECT @total as total_relationships_restored;


-- ============================================================================
-- SUMMARY
-- ============================================================================
SELECT '=== SUMMARY ===' as test_step;
SELECT 
  (SELECT COUNT(*) FROM loaiquanhe) as total_relationship_types,
  (SELECT COUNT(*) FROM thanhvien WHERE dongHoId = @test_dongHoId AND active_flag = 1) as total_members,
  (SELECT COUNT(*) FROM quanhe WHERE dongHoId1 = @test_dongHoId) as total_relationships;


-- ============================================================================
-- EXPECTED RESULTS
-- ============================================================================
/*
Step 1: 12 relationship types
Step 2: 8 stored procedures
Step 3: Number of members in your family tree
Step 4: 0 (if first time) or existing count
Step 5: Number of relationships created
Step 6: Same as Step 5
Step 7: Breakdown by relationship type
Step 8: Sample relationships with names
Step 9: 0 (all cleared)
Step 10: Same as Step 5 (restored)

If all steps pass, the system is working correctly! ✅
*/
