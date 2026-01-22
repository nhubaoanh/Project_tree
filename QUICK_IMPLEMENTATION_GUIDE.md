# HƯỚNG DẪN TRIỂN KHAI NHANH HỆ THỐNG PHÂN QUYỀN

## 🎯 MỤC TIÊU
Áp dụng hệ thống phân quyền đã có sẵn vào code để giải quyết lỗi:
```
[searchTaiLieu] Bạn không có quyền thực hiện thao tác này
```

## 🔧 BƯỚC 1: Cập nhật JWT Service (15 phút)

### File: `myFamilyTree/src/config/jwt.ts`

Thêm function lấy permissions từ database:

```typescript
import { pool } from './database';

/**
 * Lấy danh sách quyền của user từ database
 */
export async function getUserPermissions(roleId: string): Promise<Record<string, string[]>> {
  const query = `
    SELECT 
      cn.chucNangCode,
      GROUP_CONCAT(tt.thaoTacCode) as actions
    FROM role_chucnang rc
    JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
    JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
    WHERE rc.roleId = ? AND rc.active_flag = 1
    GROUP BY cn.chucNangCode
  `;
  
  try {
    const [results] = await pool.query(query, [roleId]);
    
    const permissions: Record<string, string[]> = {};
    for (const row of results as any[]) {
      permissions[row.chucNangCode] = row.actions.split(',');
    }
    
    return permissions;
  } catch (error) {
    console.error('Error getting user permissions:', error);
    return {};
  }
}
```

Cập nhật hàm `generateToken` để thêm permissions:

```typescript
export async function generateToken(user: any): Promise<string> {
  // Lấy permissions từ database
  const permissions = await getUserPermissions(user.roleId);
  
  const payload = {
    nguoiDungId: user.nguoiDungId,
    dongHoId: user.dongHoId,
    roleId: user.roleId,
    roleCode: user.roleCode,
    full_name: user.full_name,
    permissions: permissions  // ✅ Thêm permissions vào token
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
```

## 🔧 BƯỚC 2: Áp dụng Middleware cho Routes (30 phút)

### File: `myFamilyTree/src/routes/taiLieuRouter.ts`

```typescript
import { Router } from "express";
import { container } from "tsyringe";
import { TaiLieuController } from "../controllers/taiLieuController";
import { authenticate, authorize, checkDongHoAccess } from "../middlewares";

const taiLieuRouter = Router();
const taiLieuController = container.resolve(TaiLieuController);

// ✅ Thêm authorize và checkDongHoAccess
taiLieuRouter.post(
  "/search", 
  authenticate, 
  authorize("TAILIEU", "VIEW"),
  checkDongHoAccess,
  taiLieuController.search.bind(taiLieuController)
);

taiLieuRouter.post(
  "/delete", 
  authenticate, 
  authorize("TAILIEU", "DELETE"),
  checkDongHoAccess,
  taiLieuController.deleteMultiple.bind(taiLieuController)
);

taiLieuRouter.post(
  "/", 
  authenticate, 
  authorize("TAILIEU", "CREATE"),
  checkDongHoAccess,
  taiLieuController.create.bind(taiLieuController)
);

taiLieuRouter.get(
  "/:id", 
  authenticate, 
  authorize("TAILIEU", "VIEW"),
  checkDongHoAccess,
  taiLieuController.getById.bind(taiLieuController)
);

taiLieuRouter.put(
  "/:id", 
  authenticate, 
  authorize("TAILIEU", "UPDATE"),
  checkDongHoAccess,
  taiLieuController.update.bind(taiLieuController)
);

taiLieuRouter.delete(
  "/:id", 
  authenticate, 
  authorize("TAILIEU", "DELETE"),
  checkDongHoAccess,
  taiLieuController.delete.bind(taiLieuController)
);

export default taiLieuRouter;
```

### Áp dụng tương tự cho các routes khác:

#### `myFamilyTree/src/routes/thanhVienRouter.ts`
```typescript
import { authenticate, authorize, checkDongHoAccess } from "../middlewares";

thanhVienRouter.post("/search", authenticate, authorize("THANHVIEN", "VIEW"), checkDongHoAccess, ...);
thanhVienRouter.post("/", authenticate, authorize("THANHVIEN", "CREATE"), checkDongHoAccess, ...);
thanhVienRouter.put("/:id", authenticate, authorize("THANHVIEN", "UPDATE"), checkDongHoAccess, ...);
thanhVienRouter.delete("/:id", authenticate, authorize("THANHVIEN", "DELETE"), checkDongHoAccess, ...);
```

#### `myFamilyTree/src/routes/suKienRouter.ts`
```typescript
import { authenticate, authorize, checkDongHoAccess } from "../middlewares";

suKienRouter.post("/search", authenticate, authorize("SUKIEN", "VIEW"), checkDongHoAccess, ...);
suKienRouter.post("/", authenticate, authorize("SUKIEN", "CREATE"), checkDongHoAccess, ...);
suKienRouter.put("/:id", authenticate, authorize("SUKIEN", "UPDATE"), checkDongHoAccess, ...);
suKienRouter.delete("/:id", authenticate, authorize("SUKIEN", "DELETE"), checkDongHoAccess, ...);
```

#### `myFamilyTree/src/routes/tinTucRouter.ts`
```typescript
import { authenticate, authorize, checkDongHoAccess } from "../middlewares";

tinTucRouter.post("/search", authenticate, authorize("TINTUC", "VIEW"), checkDongHoAccess, ...);
tinTucRouter.post("/", authenticate, authorize("TINTUC", "CREATE"), checkDongHoAccess, ...);
tinTucRouter.put("/:id", authenticate, authorize("TINTUC", "UPDATE"), checkDongHoAccess, ...);
tinTucRouter.delete("/:id", authenticate, authorize("TINTUC", "DELETE"), checkDongHoAccess, ...);
```

## 🔧 BƯỚC 3: Cấu hình quyền trong Database (10 phút)

### Kiểm tra quyền hiện tại:

```sql
-- Xem quyền của role "thudo"
SELECT 
  r.roleName,
  cn.chucNangCode,
  cn.tenChucNang,
  tt.thaoTacCode,
  tt.tenThaoTac
FROM role_chucnang rc
JOIN role r ON rc.roleId = r.roleId
JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
WHERE r.roleCode = 'thudo'
  AND rc.active_flag = 1
ORDER BY cn.chucNangCode, tt.thaoTacCode;
```

### Thêm quyền cho role "thudo" nếu thiếu:

```sql
-- Thêm quyền VIEW cho TAILIEU
INSERT INTO role_chucnang (roleId, chucNangId, thaoTacId, active_flag)
SELECT 
  r.roleId,
  cn.chucNangId,
  tt.thaoTacId,
  1
FROM role r
CROSS JOIN chucnang cn
CROSS JOIN thaotac tt
WHERE r.roleCode = 'thudo'
  AND cn.chucNangCode = 'TAILIEU'
  AND tt.thaoTacCode = 'VIEW'
  AND NOT EXISTS (
    SELECT 1 FROM role_chucnang rc2
    WHERE rc2.roleId = r.roleId
      AND rc2.chucNangId = cn.chucNangId
      AND rc2.thaoTacId = tt.thaoTacId
  );

-- Thêm quyền CREATE, UPDATE, DELETE tương tự
-- Thay 'VIEW' bằng 'CREATE', 'UPDATE', 'DELETE'
```

### Script thêm tất cả quyền cho role "thudo":

```sql
-- Thêm tất cả quyền cho thudo trên TAILIEU
INSERT INTO role_chucnang (roleId, chucNangId, thaoTacId, active_flag)
SELECT 
  r.roleId,
  cn.chucNangId,
  tt.thaoTacId,
  1
FROM role r
CROSS JOIN chucnang cn
CROSS JOIN thaotac tt
WHERE r.roleCode = 'thudo'
  AND cn.chucNangCode IN ('TAILIEU', 'THANHVIEN', 'SUKIEN', 'TINTUC', 'TAICHINH', 'CHICHI')
  AND NOT EXISTS (
    SELECT 1 FROM role_chucnang rc2
    WHERE rc2.roleId = r.roleId
      AND rc2.chucNangId = cn.chucNangId
      AND rc2.thaoTacId = tt.thaoTacId
  );
```

## 🧪 BƯỚC 4: Test (15 phút)

### 4.1. Test Backend API

```bash
# 1. Login để lấy token mới (có permissions)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "tenDangNhap": "nguyenvanbao123@gmail.com",
    "matKhau": "your_password"
  }'

# 2. Decode token để xem permissions
# Paste token vào https://jwt.io

# 3. Test API với token mới
curl -X POST http://localhost:3000/api/tailieu/search \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "pageIndex": 1,
    "pageSize": 10,
    "dongHoId": "025721a4-bd0d-4447-9b9b-505d174de937"
  }'
```

### 4.2. Test với các role khác nhau

```javascript
// Test 1: Super Admin (sa) - Có tất cả quyền
// Login với user có roleCode = 'sa'
// Kết quả mong đợi: Truy cập được tất cả API

// Test 2: Thủ đồ (thudo) - Có quyền theo cấu hình
// Login với user có roleCode = 'thudo'
// Kết quả mong đợi: Truy cập được các API đã cấu hình

// Test 3: Thành viên (thanhvien) - Chỉ có quyền VIEW
// Login với user có roleCode = 'thanhvien'
// Kết quả mong đợi: 
//   - GET/POST search: ✅ OK
//   - POST create: ❌ 403 Forbidden
//   - PUT update: ❌ 403 Forbidden
//   - DELETE: ❌ 403 Forbidden
```

### 4.3. Test Frontend

```typescript
// 1. Logout và login lại để lấy token mới
// 2. Mở DevTools > Application > Local Storage
// 3. Xem token có chứa permissions không
// 4. Test các chức năng:
//    - Xem danh sách tài liệu: ✅ OK
//    - Thêm tài liệu: Kiểm tra quyền CREATE
//    - Sửa tài liệu: Kiểm tra quyền UPDATE
//    - Xóa tài liệu: Kiểm tra quyền DELETE
```

## 📊 BẢNG MAPPING CHỨC NĂNG - ROUTES

| Chức năng | Code | Routes | Middleware |
|-----------|------|--------|-----------|
| Tài liệu | TAILIEU | /api/tailieu/* | authorize("TAILIEU", action) |
| Thành viên | THANHVIEN | /api/thanhvien/* | authorize("THANHVIEN", action) |
| Sự kiện | SUKIEN | /api/sukien/* | authorize("SUKIEN", action) |
| Tin tức | TINTUC | /api/tintuc/* | authorize("TINTUC", action) |
| Thu | TAICHINH | /api/taichinh-thu/* | authorize("TAICHINH", action) |
| Chi | CHICHI | /api/taichinh-chi/* | authorize("CHICHI", action) |
| Dòng họ | DONGHO | /api/dongho/* | authorize("DONGHO", action) |
| Người dùng | NGUOIDUNG | /api/nguoidung/* | authorize("NGUOIDUNG", action) |
| Phân quyền | PHANQUYEN | /api/role/* | authorize("PHANQUYEN", action) |

## 🐛 TROUBLESHOOTING

### Lỗi: "Bạn không có quyền thực hiện thao tác này"

**Nguyên nhân:**
1. Token cũ không có permissions
2. Database chưa cấu hình quyền cho role
3. Middleware authorize() kiểm tra sai chucNangCode

**Giải pháp:**
```sql
-- 1. Kiểm tra quyền trong DB
SELECT * FROM role_chucnang rc
JOIN role r ON rc.roleId = r.roleId
JOIN chucnang cn ON rc.chucNangId = cn.chucNangId
JOIN thaotac tt ON rc.thaoTacId = tt.thaoTacId
WHERE r.roleCode = 'thudo'
  AND cn.chucNangCode = 'TAILIEU'
  AND tt.thaoTacCode = 'VIEW';

-- 2. Nếu không có kết quả, thêm quyền
INSERT INTO role_chucnang (roleId, chucNangId, thaoTacId, active_flag)
VALUES (
  (SELECT roleId FROM role WHERE roleCode = 'thudo'),
  (SELECT chucNangId FROM chucnang WHERE chucNangCode = 'TAILIEU'),
  (SELECT thaoTacId FROM thaotac WHERE thaoTacCode = 'VIEW'),
  1
);

-- 3. Logout và login lại để lấy token mới
```

### Lỗi: "Token không có permissions"

**Nguyên nhân:** Chưa cập nhật JWT service

**Giải pháp:**
1. Kiểm tra file `myFamilyTree/src/config/jwt.ts`
2. Đảm bảo có function `getUserPermissions()`
3. Đảm bảo `generateToken()` gọi `getUserPermissions()`
4. Restart server
5. Logout và login lại

### Lỗi: "Cannot read property 'permissions' of undefined"

**Nguyên nhân:** Middleware authorize() chạy trước authenticate()

**Giải pháp:**
```typescript
// ❌ SAI - authorize trước authenticate
router.post("/search", authorize("TAILIEU", "VIEW"), authenticate, ...);

// ✅ ĐÚNG - authenticate trước authorize
router.post("/search", authenticate, authorize("TAILIEU", "VIEW"), ...);
```

## 📝 CHECKLIST TRIỂN KHAI

### Backend
- [ ] Cập nhật `jwt.ts` thêm `getUserPermissions()`
- [ ] Cập nhật `generateToken()` thêm permissions vào token
- [ ] Import middleware vào routes: `import { authenticate, authorize, checkDongHoAccess } from "../middlewares"`
- [ ] Áp dụng middleware cho `taiLieuRouter.ts`
- [ ] Áp dụng middleware cho `thanhVienRouter.ts`
- [ ] Áp dụng middleware cho `suKienRouter.ts`
- [ ] Áp dụng middleware cho `tinTucRouter.ts`
- [ ] Áp dụng middleware cho các routes còn lại
- [ ] Restart server

### Database
- [ ] Kiểm tra quyền hiện tại của các roles
- [ ] Thêm quyền thiếu cho role "thudo"
- [ ] Thêm quyền thiếu cho role "thanhvien"
- [ ] Verify lại bằng query SELECT

### Testing
- [ ] Test login lấy token mới
- [ ] Decode token xem có permissions
- [ ] Test API với role "sa" (super admin)
- [ ] Test API với role "thudo"
- [ ] Test API với role "thanhvien"
- [ ] Test truy cập dòng họ khác (phải bị chặn)
- [ ] Test frontend logout/login lại
- [ ] Test frontend các chức năng CRUD

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi hoàn thành:

1. ✅ Token JWT chứa permissions
2. ✅ API kiểm tra quyền trước khi xử lý
3. ✅ User chỉ truy cập được chức năng có quyền
4. ✅ User chỉ truy cập được dòng họ của mình
5. ✅ Lỗi 403 rõ ràng khi không có quyền
6. ✅ Super admin (sa) có tất cả quyền
7. ✅ Thủ đồ (thudo) có quyền theo cấu hình
8. ✅ Thành viên (thanhvien) chỉ có quyền VIEW

## 📞 HỖ TRỢ

Nếu gặp vấn đề, kiểm tra:
1. Console log của server
2. Network tab trong DevTools
3. Token trong Local Storage
4. Database permissions
5. Middleware order trong routes
