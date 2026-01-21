# Deployment Checklist - Relationship Sync System

## 📋 Pre-Deployment

### 1. Database Setup
- [ ] Backup current database
  ```bash
  mysqldump -u root -p your_database > backup_$(date +%Y%m%d).sql
  ```

- [ ] Run relationship sync procedures
  ```bash
  mysql -u root -p your_database < database/relationship_sync_procedures.sql
  ```

- [ ] Verify installation
  ```bash
  mysql -u root -p your_database < database/test_relationship_sync.sql
  ```

- [ ] Check results
  - [ ] 12 relationship types in `loaiquanhe`
  - [ ] 8 stored procedures created
  - [ ] Test sync works with sample data

### 2. Backend Setup
- [ ] Install dependencies (if needed)
  ```bash
  cd myFamilyTree
  npm install
  ```

- [ ] Check TypeScript compilation
  ```bash
  npm run build
  ```

- [ ] Run tests (if available)
  ```bash
  npm test
  ```

### 3. Environment Variables
- [ ] Verify `.env` file has correct settings
  ```
  DB_HOST=localhost
  DB_PORT=3306
  DB_USER=root
  DB_PASSWORD=your_password
  DB_NAME=your_database
  BASE_URL=http://localhost:8080
  ```

## 🚀 Deployment

### 1. Start Backend
- [ ] Development mode
  ```bash
  cd myFamilyTree
  npm run dev
  ```

- [ ] Production mode
  ```bash
  npm run build
  npm start
  ```

- [ ] Verify backend is running
  ```bash
  curl http://localhost:6001/health
  ```

### 2. Start API Gateway
- [ ] Start gateway
  ```bash
  cd api-gateway
  npm start
  ```

- [ ] Verify gateway is running
  ```bash
  curl http://localhost:8080/health
  ```

### 3. Start Frontend (if needed)
- [ ] Start frontend
  ```bash
  cd FE/tree
  npm run dev
  ```

- [ ] Verify frontend is running
  ```bash
  # Open browser: http://localhost:3000
  ```

## ✅ Post-Deployment Testing

### 1. API Testing

#### Test 1: Login
```bash
curl -X POST http://localhost:8080/api-core/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'
```
- [ ] Response: 200 OK
- [ ] Response contains `accessToken`
- [ ] Response contains `refreshToken`

#### Test 2: Import Members (Auto-sync)
```bash
curl -X POST http://localhost:8080/api-core/member/import-json \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "dongHoId": "xxx",
    "members": [
      {"stt":1,"hoTen":"Test A","gioiTinh":1,"ngaySinh":"1950","doiThuoc":1},
      {"stt":2,"hoTen":"Test B","gioiTinh":0,"ngaySinh":"1955","doiThuoc":1,"chongId":1}
    ]
  }'
```
- [ ] Response: 200 OK
- [ ] Response contains `relationshipSync.success: true`
- [ ] Response contains `relationshipSync.totalRelationships > 0`

#### Test 3: View Stats
```bash
curl -X GET http://localhost:8080/api-core/relationships/stats/xxx \
  -H "Authorization: Bearer <token>"
```
- [ ] Response: 200 OK
- [ ] Response contains `total_relationships`
- [ ] Response contains `breakdown` array

#### Test 4: Manual Sync
```bash
curl -X POST http://localhost:8080/api-core/relationships/sync/xxx \
  -H "Authorization: Bearer <token>"
```
- [ ] Response: 200 OK
- [ ] Response contains `total_relationships_created`

#### Test 5: Clear Relationships
```bash
curl -X DELETE http://localhost:8080/api-core/relationships/clear/xxx \
  -H "Authorization: Bearer <token>"
```
- [ ] Response: 200 OK
- [ ] Response contains `deletedCount`

### 2. Database Testing

```sql
-- Test 1: Check loaiquanhe
SELECT COUNT(*) FROM loaiquanhe;
-- Expected: 12

-- Test 2: Check procedures
SHOW PROCEDURE STATUS WHERE Db = 'your_database';
-- Expected: 8 procedures

-- Test 3: Check relationships
SELECT COUNT(*) FROM quanhe WHERE dongHoId1 = 'xxx';
-- Expected: > 0 (after import)

-- Test 4: View relationships
SELECT 
  lqh.tenLoaiQuanHe,
  tv1.hoTen,
  tv2.hoTen
FROM quanhe qh
JOIN loaiquanhe lqh ON qh.loaiQuanHeId = lqh.loaiQuanHeId
JOIN thanhvien tv1 ON qh.thanhVien1Id = tv1.thanhVienId
JOIN thanhvien tv2 ON qh.thanhVien2Id = tv2.thanhVienId
WHERE qh.dongHoId1 = 'xxx'
LIMIT 10;
-- Expected: Relationships with correct names
```

### 3. Frontend Testing (if applicable)

- [ ] Login as Admin/Thủ đồ
- [ ] Navigate to Members page
- [ ] Import Excel file
- [ ] Verify success message shows relationship sync
- [ ] Navigate to Genealogy page
- [ ] Click on a member
- [ ] Verify relationships are displayed

### 4. Performance Testing

- [ ] Import 100 members
  - Expected: < 5 seconds (including sync)
  
- [ ] Sync 100 members
  - Expected: < 3 seconds
  
- [ ] View stats
  - Expected: < 1 second

### 5. Security Testing

- [ ] Test without token
  - Expected: 401 Unauthorized
  
- [ ] Test with expired token
  - Expected: 401 Unauthorized
  
- [ ] Test as regular member (not Admin/Thủ đồ)
  - Expected: 403 Forbidden (for sync/clear)
  - Expected: 200 OK (for stats)
  
- [ ] Test rate limiting (clear 6 times in 1 hour)
  - Expected: 429 Too Many Requests (on 6th request)

## 🐛 Troubleshooting

### Issue: Procedures not found
**Solution:**
```bash
mysql -u root -p your_database < database/relationship_sync_procedures.sql
```

### Issue: No relationships created
**Check:**
```sql
SELECT * FROM thanhvien WHERE dongHoId = 'xxx' AND (chaId IS NOT NULL OR meId IS NOT NULL);
```
If no results, members don't have parent relationships.

### Issue: Duplicate relationships
**Solution:**
```sql
CALL sp_clear_relationships('xxx');
CALL sp_sync_all_relationships('xxx', @total);
```

### Issue: Backend not starting
**Check:**
- [ ] Port 6001 is available
- [ ] Database connection is correct
- [ ] All dependencies are installed

### Issue: API returns 500
**Check:**
- [ ] Backend logs: `tail -f myFamilyTree/logs/error.log`
- [ ] Database is running
- [ ] Stored procedures exist

## 📊 Monitoring

### Logs to Monitor
```bash
# Backend logs
tail -f myFamilyTree/logs/app.log

# Database logs
tail -f /var/log/mysql/error.log

# Nginx logs (if using)
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### Metrics to Track
- [ ] Import success rate
- [ ] Sync success rate
- [ ] Average sync time
- [ ] Number of relationships created
- [ ] API response times
- [ ] Error rates

## 🎉 Success Criteria

- [x] All stored procedures created
- [x] All API endpoints working
- [x] Auto-sync on import working
- [x] Manual sync working
- [x] Stats endpoint working
- [x] Clear endpoint working
- [x] Authentication working
- [x] Authorization working
- [x] Rate limiting working
- [x] No TypeScript errors
- [x] Documentation complete

## 📝 Next Steps

After successful deployment:

1. **Monitor for 24 hours**
   - Check logs for errors
   - Monitor performance
   - Verify data integrity

2. **User Acceptance Testing**
   - Have users test import functionality
   - Verify relationships are correct
   - Collect feedback

3. **Phase 2: AI Text-to-SQL**
   - See `AI_SQL_GENERATION_PLAN.md`
   - Implement NLU service
   - Train/fine-tune model
   - Test with Vietnamese questions

4. **Frontend Integration**
   - Display relationships in UI
   - Add relationship visualization
   - Add AI chat interface

---

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Status:** ⬜ Not Started | ⬜ In Progress | ⬜ Complete  
**Notes:** _____________
