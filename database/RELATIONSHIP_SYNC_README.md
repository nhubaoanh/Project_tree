# Hệ thống Đồng bộ Quan hệ Tự động

## Tổng quan

Hệ thống tự động tạo và đồng bộ quan hệ trong bảng `quanhe` từ dữ liệu bảng `thanhvien`. Khi import thành viên, hệ thống sẽ tự động phân tích các mối quan hệ (cha-con, vợ-chồng, anh-em, ông-cháu, chú-bác-cô-dì-cậu) và lưu vào bảng `quanhe`.

## Cài đặt

### Bước 1: Chạy SQL Script

```bash
# Kết nối MySQL và chạy script
mysql -u root -p your_database < database/relationship_sync_procedures.sql
```

Script này sẽ:
- Populate bảng `loaiquanhe` với 12 loại quan hệ
- Tạo 8 stored procedures để đồng bộ quan hệ

### Bước 2: Kiểm tra Stored Procedures

```sql
-- Xem danh sách procedures
SHOW PROCEDURE STATUS WHERE Db = 'your_database';

-- Xem chi tiết một procedure
SHOW CREATE PROCEDURE sp_sync_all_relationships;
```

## Các Loại Quan hệ

Hệ thống hỗ trợ 12 loại quan hệ:

| ID | Tên | Mô tả |
|---|---|---|
| LQH_CHA_CON | Cha - Con | Quan hệ cha con trực tiếp |
| LQH_ME_CON | Mẹ - Con | Quan hệ mẹ con trực tiếp |
| LQH_VO_CHONG | Vợ - Chồng | Quan hệ vợ chồng |
| LQH_ANH_EM | Anh - Em | Anh em ruột (cùng cha mẹ) |
| LQH_CHI_EM | Chị - Em | Chị em ruột (cùng cha mẹ) |
| LQH_ONG_CHAU | Ông - Cháu | Ông nội/ngoại - Cháu |
| LQH_BA_CHAU | Bà - Cháu | Bà nội/ngoại - Cháu |
| LQH_CHU_CHAU | Chú - Cháu | Chú (em trai của cha) - Cháu |
| LQH_BAC_CHAU | Bác - Cháu | Bác (anh trai của cha) - Cháu |
| LQH_CO_CHAU | Cô - Cháu | Cô (chị em gái của cha) - Cháu |
| LQH_DI_CHAU | Dì - Cháu | Dì (chị em gái của mẹ) - Cháu |
| LQH_CAU_CHAU | Cậu - Cháu | Cậu (anh em trai của mẹ) - Cháu |

## Stored Procedures

### 1. sp_clear_relationships
Xóa tất cả quan hệ của một dòng họ.

```sql
CALL sp_clear_relationships('dongHoId');
```

### 2. sp_create_parent_child_relationships
Tạo quan hệ cha-mẹ-con.

```sql
CALL sp_create_parent_child_relationships('dongHoId');
```

### 3. sp_create_spouse_relationships
Tạo quan hệ vợ-chồng.

```sql
CALL sp_create_spouse_relationships('dongHoId');
```

### 4. sp_create_sibling_relationships
Tạo quan hệ anh-chị-em.

```sql
CALL sp_create_sibling_relationships('dongHoId');
```

### 5. sp_create_grandparent_relationships
Tạo quan hệ ông-bà-cháu.

```sql
CALL sp_create_grandparent_relationships('dongHoId');
```

### 6. sp_create_paternal_uncle_aunt_relationships
Tạo quan hệ chú-bác-cô (anh chị em của cha).

```sql
CALL sp_create_paternal_uncle_aunt_relationships('dongHoId');
```

### 7. sp_create_maternal_uncle_aunt_relationships
Tạo quan hệ dì-cậu (anh chị em của mẹ).

```sql
CALL sp_create_maternal_uncle_aunt_relationships('dongHoId');
```

### 8. sp_sync_all_relationships (MASTER)
Đồng bộ tất cả quan hệ (gọi tất cả procedures trên).

```sql
CALL sp_sync_all_relationships('dongHoId', @total);
SELECT @total as total_created;
```

## API Endpoints

### 1. Đồng bộ tất cả quan hệ
```http
POST /api-core/relationships/sync/:dongHoId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Đồng bộ quan hệ thành công",
  "data": {
    "dongHoId": "xxx",
    "total_relationships_created": 150,
    "status": "SUCCESS",
    "synced_at": "2026-01-21T10:30:00.000Z"
  }
}
```

### 2. Đồng bộ một loại quan hệ cụ thể
```http
POST /api-core/relationships/sync-partial/:dongHoId
Authorization: Bearer <token>
Content-Type: application/json

{
  "type": "parent_child"
}
```

**Types:** `parent_child`, `spouse`, `sibling`, `grandparent`, `paternal_uncle_aunt`, `maternal_uncle_aunt`

### 3. Xóa tất cả quan hệ
```http
DELETE /api-core/relationships/clear/:dongHoId
Authorization: Bearer <token>
```

### 4. Xem thống kê quan hệ
```http
GET /api-core/relationships/stats/:dongHoId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dongHoId": "xxx",
    "total_relationships": 150,
    "breakdown": [
      { "loaiQuanHeId": "LQH_CHA_CON", "tenLoaiQuanHe": "Cha - Con", "count": 45 },
      { "loaiQuanHeId": "LQH_ME_CON", "tenLoaiQuanHe": "Mẹ - Con", "count": 45 },
      { "loaiQuanHeId": "LQH_VO_CHONG", "tenLoaiQuanHe": "Vợ - Chồng", "count": 20 }
    ],
    "generated_at": "2026-01-21T10:30:00.000Z"
  }
}
```

## Tự động Đồng bộ khi Import

Khi import thành viên qua API `/api-core/member/import-json`, hệ thống sẽ **tự động** đồng bộ quan hệ sau khi import thành công.

**Response khi import:**
```json
{
  "success": true,
  "message": "Nhập thành công 50 thành viên",
  "data": {
    "success": true,
    "count": 50,
    "relationshipSync": {
      "success": true,
      "totalRelationships": 150,
      "syncedAt": "2026-01-21T10:30:00.000Z"
    },
    "warnings": []
  }
}
```

## Quyền truy cập

- **Admin & Thủ đồ**: Có thể đồng bộ và xóa quan hệ
- **Thành viên**: Chỉ có thể xem thống kê quan hệ
- **Rate Limit**: 
  - Sync: Không giới hạn
  - Clear: 5 lần/giờ (thao tác nhạy cảm)

## Testing

### Test với SQL
```sql
-- Test đồng bộ tất cả quan hệ
CALL sp_sync_all_relationships('e9022e64-cbae-11f0-8020-a8934a9bae74', @total);
SELECT @total as total_created;

-- Xem kết quả
SELECT 
  qh.*,
  lqh.tenLoaiQuanHe,
  tv1.hoTen as nguoi1,
  tv2.hoTen as nguoi2
FROM quanhe qh
JOIN loaiquanhe lqh ON qh.loaiQuanHeId = lqh.loaiQuanHeId
JOIN thanhvien tv1 ON qh.thanhVien1Id = tv1.thanhVienId AND qh.dongHoId1 = tv1.dongHoId
JOIN thanhvien tv2 ON qh.thanhVien2Id = tv2.thanhVienId AND qh.dongHoId2 = tv2.dongHoId
WHERE qh.dongHoId1 = 'e9022e64-cbae-11f0-8020-a8934a9bae74'
LIMIT 20;
```

### Test với API (Postman/cURL)
```bash
# 1. Login để lấy token
curl -X POST http://localhost:8080/api-core/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"password"}'

# 2. Đồng bộ quan hệ
curl -X POST http://localhost:8080/api-core/relationships/sync/e9022e64-cbae-11f0-8020-a8934a9bae74 \
  -H "Authorization: Bearer <token>"

# 3. Xem thống kê
curl -X GET http://localhost:8080/api-core/relationships/stats/e9022e64-cbae-11f0-8020-a8934a9bae74 \
  -H "Authorization: Bearer <token>"
```

## Troubleshooting

### Lỗi: Procedure không tồn tại
```
Error: PROCEDURE sp_sync_all_relationships does not exist
```

**Giải pháp:** Chạy lại script `relationship_sync_procedures.sql`

### Lỗi: Không tạo được quan hệ
```
Error: No relationships created
```

**Nguyên nhân:**
- Dữ liệu thành viên chưa có `chaId`, `meId`, `voId`, `chongId`
- `active_flag = 0` (thành viên đã bị xóa)

**Giải pháp:** Kiểm tra dữ liệu thành viên:
```sql
SELECT * FROM thanhvien 
WHERE dongHoId = 'xxx' 
  AND (chaId IS NULL OR meId IS NULL)
  AND active_flag = 1;
```

### Lỗi: Duplicate relationships
```
Error: Duplicate entry for key 'PRIMARY'
```

**Giải pháp:** Xóa quan hệ cũ trước khi sync:
```sql
CALL sp_clear_relationships('dongHoId');
```

## Performance

- **Import 100 thành viên**: ~2-3 giây (bao gồm sync quan hệ)
- **Sync quan hệ cho 100 thành viên**: ~1-2 giây
- **Tạo ~300-500 quan hệ**: ~1 giây

## Lưu ý

1. **Transaction Safety**: Tất cả procedures đều chạy trong transaction, nếu có lỗi sẽ rollback
2. **Duplicate Prevention**: Hệ thống tự động tránh tạo quan hệ trùng lặp
3. **Active Flag**: Chỉ tạo quan hệ cho thành viên có `active_flag = 1`
4. **Auto-sync**: Khi import thành viên, quan hệ sẽ tự động được đồng bộ

## Roadmap

- [ ] Thêm quan hệ cháu-cô/dì/chú/bác (ngược lại)
- [ ] Thêm quan hệ anh/chị/em dâu/rể
- [ ] Thêm quan hệ con dâu/con rể
- [ ] Hỗ trợ quan hệ phức tạp hơn (họ hàng xa)
- [ ] Tích hợp AI để trả lời câu hỏi về quan hệ
