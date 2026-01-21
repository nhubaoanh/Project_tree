# Quick Start Guide - Relationship Sync System

## Bước 1: Cài đặt Database

### 1.1. Chạy SQL Script

```bash
# Kết nối MySQL
mysql -u root -p

# Chọn database
USE your_database_name;

# Chạy script
source database/relationship_sync_procedures.sql;
```

Hoặc copy-paste nội dung file `relationship_sync_procedures.sql` vào MySQL Workbench và chạy.

### 1.2. Kiểm tra cài đặt

```sql
-- Kiểm tra bảng loaiquanhe đã có dữ liệu
SELECT * FROM loaiquanhe;
-- Kết quả: 12 rows

-- Kiểm tra stored procedures đã được tạo
SHOW PROCEDURE STATUS WHERE Db = 'your_database_name';
-- Kết quả: 8 procedures
```

## Bước 2: Khởi động Backend

```bash
cd myFamilyTree
npm install
npm run dev
```

Backend sẽ chạy ở `http://localhost:6001`

## Bước 3: Test API

### 3.1. Login để lấy token

**Request:**
```http
POST http://localhost:8080/api-core/users/login
Content-Type: application/json

{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "userId": "1",
      "dongHoId": "e9022e64-cbae-11f0-8020-a8934a9bae74",
      "role": "thudo"
    }
  }
}
```

Lưu `accessToken` để dùng cho các request tiếp theo.

### 3.2. Import thành viên (tự động sync quan hệ)

**Request:**
```http
POST http://localhost:8080/api-core/member/import-json
Authorization: Bearer <accessToken>
Content-Type: application/json

{
  "dongHoId": "e9022e64-cbae-11f0-8020-a8934a9bae74",
  "members": [
    {
      "stt": 1,
      "hoTen": "Nguyễn Văn A",
      "gioiTinh": 1,
      "ngaySinh": "1950",
      "doiThuoc": 1
    },
    {
      "stt": 2,
      "hoTen": "Trần Thị B",
      "gioiTinh": 0,
      "ngaySinh": "1955",
      "doiThuoc": 1,
      "chongId": 1
    },
    {
      "stt": 3,
      "hoTen": "Nguyễn Văn C",
      "gioiTinh": 1,
      "ngaySinh": "1975",
      "doiThuoc": 2,
      "chaId": 1,
      "meId": 2
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Nhập thành công 3 thành viên",
  "data": {
    "success": true,
    "count": 3,
    "relationshipSync": {
      "success": true,
      "totalRelationships": 5,
      "syncedAt": "2026-01-21T10:30:00.000Z"
    },
    "warnings": []
  }
}
```

✅ Quan hệ đã được tự động đồng bộ!

### 3.3. Xem thống kê quan hệ

**Request:**
```http
GET http://localhost:8080/api-core/relationships/stats/e9022e64-cbae-11f0-8020-a8934a9bae74
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dongHoId": "e9022e64-cbae-11f0-8020-a8934a9bae74",
    "total_relationships": 5,
    "breakdown": [
      { "loaiQuanHeId": "LQH_CHA_CON", "tenLoaiQuanHe": "Cha - Con", "count": 1 },
      { "loaiQuanHeId": "LQH_ME_CON", "tenLoaiQuanHe": "Mẹ - Con", "count": 1 },
      { "loaiQuanHeId": "LQH_VO_CHONG", "tenLoaiQuanHe": "Vợ - Chồng", "count": 1 }
    ],
    "generated_at": "2026-01-21T10:30:00.000Z"
  }
}
```

### 3.4. Đồng bộ thủ công (nếu cần)

**Request:**
```http
POST http://localhost:8080/api-core/relationships/sync/e9022e64-cbae-11f0-8020-a8934a9bae74
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "message": "Đồng bộ quan hệ thành công",
  "data": {
    "dongHoId": "e9022e64-cbae-11f0-8020-a8934a9bae74",
    "total_relationships_created": 5,
    "status": "SUCCESS",
    "synced_at": "2026-01-21T10:30:00.000Z"
  }
}
```

### 3.5. Xóa tất cả quan hệ (nếu cần reset)

**Request:**
```http
DELETE http://localhost:8080/api-core/relationships/clear/e9022e64-cbae-11f0-8020-a8934a9bae74
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "success": true,
  "message": "Đã xóa 5 quan hệ",
  "data": {
    "deletedCount": 5
  }
}
```

## Bước 4: Kiểm tra Database

```sql
-- Xem tất cả quan hệ
SELECT 
  qh.quanHeId,
  lqh.tenLoaiQuanHe,
  tv1.hoTen as nguoi1,
  tv2.hoTen as nguoi2
FROM quanhe qh
JOIN loaiquanhe lqh ON qh.loaiQuanHeId = lqh.loaiQuanHeId
JOIN thanhvien tv1 ON qh.thanhVien1Id = tv1.thanhVienId AND qh.dongHoId1 = tv1.dongHoId
JOIN thanhvien tv2 ON qh.thanhVien2Id = tv2.thanhVienId AND qh.dongHoId2 = tv2.dongHoId
WHERE qh.dongHoId1 = 'e9022e64-cbae-11f0-8020-a8934a9bae74';
```

**Kết quả mong đợi:**
```
+----------+---------------+--------------+--------------+
| quanHeId | tenLoaiQuanHe | nguoi1       | nguoi2       |
+----------+---------------+--------------+--------------+
| xxx-xxx  | Cha - Con     | Nguyễn Văn A | Nguyễn Văn C |
| xxx-xxx  | Mẹ - Con      | Trần Thị B   | Nguyễn Văn C |
| xxx-xxx  | Vợ - Chồng    | Nguyễn Văn A | Trần Thị B   |
+----------+---------------+--------------+--------------+
```

## Bước 5: Test với Frontend

### 5.1. Import Excel

1. Mở trang Admin → Members
2. Click "Import Excel"
3. Chọn file Excel (hoặc download template)
4. Upload file
5. Hệ thống sẽ tự động:
   - Import thành viên
   - Đồng bộ quan hệ
   - Hiển thị thông báo thành công

### 5.2. Xem quan hệ

1. Mở trang Genealogy (Cây gia phả)
2. Click vào một thành viên
3. Xem thông tin quan hệ (cha, mẹ, vợ/chồng, con cái)

## Troubleshooting

### Lỗi: "Procedure does not exist"

**Nguyên nhân:** Chưa chạy SQL script

**Giải pháp:**
```bash
mysql -u root -p your_database < database/relationship_sync_procedures.sql
```

### Lỗi: "No relationships created"

**Nguyên nhân:** Dữ liệu thành viên chưa có `chaId`, `meId`, `voId`, `chongId`

**Giải pháp:** Kiểm tra dữ liệu:
```sql
SELECT * FROM thanhvien 
WHERE dongHoId = 'xxx' 
  AND chaId IS NULL 
  AND meId IS NULL;
```

### Lỗi: "Unauthorized"

**Nguyên nhân:** Token hết hạn hoặc không hợp lệ

**Giải pháp:** Login lại để lấy token mới

### Lỗi: "Rate limit exceeded"

**Nguyên nhân:** Gọi API quá nhiều lần (clear relationships: 5 lần/giờ)

**Giải pháp:** Đợi 1 giờ hoặc restart backend

## Next Steps

Sau khi hệ thống đồng bộ quan hệ hoạt động, bạn có thể:

1. ✅ Tích hợp AI Text-to-SQL để trả lời câu hỏi về quan hệ
2. ✅ Tạo API tìm kiếm quan hệ phức tạp
3. ✅ Hiển thị quan hệ trên frontend
4. ✅ Export quan hệ ra Excel/PDF

Xem thêm: `AI_SQL_GENERATION_PLAN.md` để tiếp tục với AI Text-to-SQL system.
