# ĐỀ XUẤT CẢI TIẾN HỆ THỐNG PHÂN QUYỀN

## 📋 PHÂN TÍCH HIỆN TRẠNG

### ✅ Những gì đã có (Infrastructure hoàn chỉnh)

#### 1. **Database Schema - Đầy đủ và chuẩn**
```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   role      │──────│ role_chucnang│──────│  chucnang   │
│  (3 roles)  │      │  (38 records)│      │ (13 modules)│
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            │
                     ┌──────────────┐
                     │   thaotac    │
                     │ (4 actions)  │
                     └──────────────┘
```

**Các bảng:**
- ✅ `chucnang` - 13 chức năng (THANHVIEN, SUKIEN, TAILIEU, TINTUC...)
- ✅ `thaotac` - 4 thao tác (VIEW, CREATE, UPDATE, DELETE)
- ✅ `role` - 3 roles (sa, thudo, thanhvien)
- ✅ `role_chucnang` - 38 quyền đã được cấu hình
- ✅ `dongho` - Hỗ trợ multi-tenancy

**Stored Procedure:**
- ✅ `CheckPermission()` - Logic kiểm tra quyền hoàn chỉnh

#### 2. **Backend Middleware - Đã có nhưng chưa dùng**
```typescript
// File: myFamilyTree/src/middlewares/authMiddleware.ts

✅ authenticate()           // Xác thực JWT
✅ authorize()              // Kiểm tra quyền (CHƯA DÙNG)
✅ checkDongHoAccess()      // Kiểm tra dòng họ (CHƯA DÙNG)
✅ adminOnly()              // Chỉ admin (CHƯA DÙNG)
✅ adminOrThuDo()           // Admin hoặc thủ đồ (CHƯA DÙNG)
```

### ❌ Vấn đề hiện tại

#### 1. **Routes không áp dụng middleware phân quyền**
```typescript
// ❌ HIỆN TẠI - Chỉ có authenticate
taiLieuRouter.post("/search", authenticate, controller.search);
taiLieuRouter.post("/", authenticate, controller.create);
taiLieuRouter.put("/:id", authenticate, controller.update);
taiLieuRouter.delete("/:id", authenticate, controller.delete);

// ✅ NÊN LÀ - Có cả authorize
taiLieuRouter.post("/search", authenticate, authorize("TAILIEU", "VIEW"), controller.search);
taiLieuRouter.post("/", authenticate, authorize("TAILIEU", "CREATE"), controller.create);
taiLieuRouter.put("/:id", authenticate, authorize("TAILIEU", "UPDATE"), controller.update);
taiLieuRouter.delete("/:id", authenticate, authorize("TAILIEU", "DELETE"), controller.delete);
```

#### 2. **JWT Token không chứa permissions**
```typescript
// ❌ HIỆN TẠI - Token thiếu permissions
const token = {
  nguoiDungId: user.nguoiDungId,
  dongHoId: user.dongHoId,
  roleId: user.roleId,
  roleCode: user.roleCode,
  full_name: user.full_name
  // ❌ Thiếu: permissions
};

// ✅ NÊN LÀ - Token có permissions
const token = {
  nguoiDungId: user.nguoiDungId,
  dongHoId: user.dongHoId,
  roleId: user.roleId,
  roleCode: user.roleCode,
  full_name: user.full_name,
  permissions: {
    "TAILIEU": ["VIEW", "CREATE", "UPDATE", "DELETE"],
    "SUKIEN": ["VIEW", "CREATE"],
    "THANHVIEN": ["VIEW"]
  }
};
```

#### 3. **Frontend không kiểm tra quyền**
```typescript
// ❌ HIỆN TẠI - Không kiểm tra quyền
export const searchTaiLieu = async (data: ISearchTaiLieu) => {
  const res = await apiClient.post(`${prefix}/search`, data);
  return res?.data;
};

// ✅ NÊN LÀ - Kiểm tra quyền trước khi gọi API
export const searchTaiLieu = async (data: ISearchTaiLieu) => {
  if (!hasPermission("TAILIEU", "VIEW")) {
    throw new Error("Bạn không có quyền xem tài liệu");
  }
  const res = await apiClient.post(`${prefix}/search`, data);
  return res?.data;
};
```

---

## 🎯 ĐỀ XUẤT CẢI TIẾN

### Phase 1: Backend - Áp dụng middleware phân quyền (Ưu tiên cao)

#### 1.1. Cập nhật JWT Service - Thêm permissions vào token
**File:** `myFamilyTree/src/config/jwt.ts`

```typescript
// Thêm function lấy permissions từ DB
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
  
  const results = await db.query(query, [roleId]);
  
  const permissions: Record<string, string[]> = {};
  for (const row of results) {
    permissions[row.chucNangCode] = row.actions.split(',');
  }
  
  return permissions;
}

// Cập nhật generateToken
export async function generateToken(user: any): Promise<string> {
  const permissions = await getUserPermissions(user.roleId);
  
  const payload = {
    nguoiDungId: user.nguoiDungId,
    dongHoId: user.dongHoId,
    roleId: user.roleId,
    roleCode: user.roleCode,
    full_name: user.full_name,
    permissions: permissions  // ✅ Thêm permissions
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
}
```

#### 1.2. Áp dụng middleware cho tất cả routes

**File:** `myFamilyTree/src/routes/taiLieuRouter.ts`
```typescript
import { authenticate, authorize, checkDongHoAccess } from "../middlewares";

// ✅ Thêm authorize và checkDongHoAccess
taiLieuRouter.post("/search", 
  authenticate, 
  authorize("TAILIEU", "VIEW"),
  checkDongHoAccess,
  taiLieuController.search.bind(taiLieuController)
);

taiLieuRouter.post("/", 
  authenticate, 
  authorize("TAILIEU", "CREATE"),
  checkDongHoAccess,
  taiLieuController.create.bind(taiLieuController)
);

taiLieuRouter.put("/:id", 
  authenticate, 
  authorize("TAILIEU", "UPDATE"),
  checkDongHoAccess,
  taiLieuController.update.bind(taiLieuController)
);

taiLieuRouter.delete("/:id", 
  authenticate, 
  authorize("TAILIEU", "DELETE"),
  checkDongHoAccess,
  taiLieuController.delete.bind(taiLieuController)
);
```

**Áp dụng tương tự cho:**
- ✅ `thanhVienRouter.ts` - Chức năng THANHVIEN
- ✅ `suKienRouter.ts` - Chức năng SUKIEN
- ✅ `tinTucRouter.ts` - Chức năng TINTUC
- ✅ `taiChinhThuRouter.ts` - Chức năng TAICHINH
- ✅ `taiChinhChiRouter.ts` - Chức năng CHICHI
- ✅ `dongHoRouter.ts` - Chức năng DONGHO
- ✅ `nguoidungRouter.ts` - Chức năng NGUOIDUNG
- ✅ `roleRouter.ts` - Chức năng PHANQUYEN

#### 1.3. Mapping chức năng với routes

| Route | Chức năng Code | Thao tác |
|-------|---------------|----------|
| `POST /tailieu/search` | TAILIEU | VIEW |
| `POST /tailieu` | TAILIEU | CREATE |
| `PUT /tailieu/:id` | TAILIEU | UPDATE |
| `DELETE /tailieu/:id` | TAILIEU | DELETE |
| `POST /thanhvien/search` | THANHVIEN | VIEW |
| `POST /thanhvien` | THANHVIEN | CREATE |
| `PUT /thanhvien/:id` | THANHVIEN | UPDATE |
| `DELETE /thanhvien/:id` | THANHVIEN | DELETE |
| `POST /sukien/search` | SUKIEN | VIEW |
| `POST /sukien` | SUKIEN | CREATE |
| `PUT /sukien/:id` | SUKIEN | UPDATE |
| `DELETE /sukien/:id` | SUKIEN | DELETE |

---

### Phase 2: Frontend - Kiểm tra quyền UI (Ưu tiên trung bình)

#### 2.1. Tạo Permission Context
**File:** `FE/tree/context/PermissionContext.tsx`

```typescript
import { createContext, useContext, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface PermissionContextType {
  hasPermission: (chucNang: string, thaoTac: string) => boolean;
  canView: (chucNang: string) => boolean;
  canCreate: (chucNang: string) => boolean;
  canUpdate: (chucNang: string) => boolean;
  canDelete: (chucNang: string) => boolean;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  
  const hasPermission = (chucNang: string, thaoTac: string): boolean => {
    if (!user) return false;
    if (user.roleCode === 'sa') return true; // Super admin
    
    const permissions = user.permissions || {};
    return permissions[chucNang]?.includes(thaoTac) || false;
  };
  
  const canView = (chucNang: string) => hasPermission(chucNang, 'VIEW');
  const canCreate = (chucNang: string) => hasPermission(chucNang, 'CREATE');
  const canUpdate = (chucNang: string) => hasPermission(chucNang, 'UPDATE');
  const canDelete = (chucNang: string) => hasPermission(chucNang, 'DELETE');
  
  return (
    <PermissionContext.Provider value={{ 
      hasPermission, 
      canView, 
      canCreate, 
      canUpdate, 
      canDelete 
    }}>
      {children}
    </PermissionContext.Provider>
  );
}

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error('usePermission must be used within PermissionProvider');
  }
  return context;
};
```

#### 2.2. Sử dụng trong components
**File:** `FE/tree/app/(admin)/documents/page.tsx`

```typescript
import { usePermission } from '@/context/PermissionContext';

export default function DocumentsPage() {
  const { canView, canCreate, canUpdate, canDelete } = usePermission();
  
  // Kiểm tra quyền xem
  if (!canView('TAILIEU')) {
    return <div>Bạn không có quyền xem tài liệu</div>;
  }
  
  return (
    <div>
      {/* Hiển thị nút thêm mới nếu có quyền */}
      {canCreate('TAILIEU') && (
        <button onClick={handleCreate}>Thêm tài liệu</button>
      )}
      
      {/* Hiển thị nút sửa nếu có quyền */}
      {canUpdate('TAILIEU') && (
        <button onClick={handleUpdate}>Sửa</button>
      )}
      
      {/* Hiển thị nút xóa nếu có quyền */}
      {canDelete('TAILIEU') && (
        <button onClick={handleDelete}>Xóa</button>
      )}
    </div>
  );
}
```

#### 2.3. Ẩn menu items không có quyền
**File:** `FE/tree/components/ui/Sidebar.tsx`

```typescript
import { usePermission } from '@/context/PermissionContext';

const menuItems = [
  { name: 'Thành viên', path: '/members', permission: 'THANHVIEN' },
  { name: 'Sự kiện', path: '/manageEvents', permission: 'SUKIEN' },
  { name: 'Tài liệu', path: '/documents', permission: 'TAILIEU' },
  { name: 'Tin tức', path: '/manage-news', permission: 'TINTUC' },
];

export function Sidebar() {
  const { canView } = usePermission();
  
  return (
    <nav>
      {menuItems.map(item => (
        canView(item.permission) && (
          <Link key={item.path} href={item.path}>
            {item.name}
          </Link>
        )
      ))}
    </nav>
  );
}
```

---

### Phase 3: Admin UI - Quản lý phân quyền (Ưu tiên thấp)

#### 3.1. Trang quản lý Role
**File:** `FE/tree/app/(admin)/roles/page.tsx`

```typescript
// Hiển thị danh sách roles
// Cho phép tạo/sửa/xóa role
// Gán quyền cho role (chọn chức năng + thao tác)
```

#### 3.2. API endpoints cần có
```typescript
GET    /api/roles                    // Danh sách roles
POST   /api/roles                    // Tạo role mới
PUT    /api/roles/:id                // Cập nhật role
DELETE /api/roles/:id                // Xóa role
GET    /api/roles/:id/permissions    // Lấy quyền của role
POST   /api/roles/:id/permissions    // Gán quyền cho role
```

---

## 📊 BẢNG MAPPING CHỨC NĂNG

| Chức năng Code | Tên hiển thị | Routes | Quyền mặc định |
|---------------|--------------|--------|----------------|
| DASHBOARD | Trang chủ | /dashboard | VIEW (all) |
| THANHVIEN | Quản lý thành viên | /members | thudo: ALL, thanhvien: VIEW |
| SUKIEN | Quản lý sự kiện | /manageEvents | thudo: ALL, thanhvien: VIEW |
| TAICHINH | Quản lý tài chính | /contributions | thudo: ALL |
| CHICHI | Quản lý chi tiêu | /contributionsDown | thudo: ALL |
| TAILIEU | Quản lý tài liệu | /documents | thudo: ALL, thanhvien: VIEW |
| TINTUC | Quản lý tin tức | /manage-news | thudo: ALL, thanhvien: VIEW |
| NGUOIDUNG | Quản lý người dùng | /users | sa: ALL, thudo: VIEW |
| DONGHO | Quản lý dòng họ | /lineage | sa: ALL, thudo: VIEW |
| PHANQUYEN | Phân quyền | /roles | sa: ALL |
| AI_CHAT | Hỏi đáp AI | /genAI | thudo: VIEW, thanhvien: VIEW |
| GENEALOGY | Xem cây phả đồ | /genealogy | all: VIEW |

---

## 🚀 KẾ HOẠCH TRIỂN KHAI

### Sprint 1 (1-2 ngày) - Backend Core
- [ ] Cập nhật JWT service thêm permissions
- [ ] Test JWT token có permissions
- [ ] Áp dụng middleware cho 3 routes quan trọng:
  - [ ] taiLieuRouter
  - [ ] thanhVienRouter  
  - [ ] suKienRouter
- [ ] Test API với các role khác nhau

### Sprint 2 (1-2 ngày) - Backend Complete
- [ ] Áp dụng middleware cho tất cả routes còn lại
- [ ] Cập nhật error messages rõ ràng hơn
- [ ] Viết unit tests cho middleware
- [ ] Cập nhật API documentation

### Sprint 3 (2-3 ngày) - Frontend Basic
- [ ] Tạo PermissionContext
- [ ] Tích hợp vào AuthContext
- [ ] Áp dụng cho 3 pages quan trọng:
  - [ ] Documents page
  - [ ] Members page
  - [ ] Events page
- [ ] Ẩn/hiện buttons theo quyền

### Sprint 4 (2-3 ngày) - Frontend Complete
- [ ] Áp dụng cho tất cả pages
- [ ] Ẩn menu items không có quyền
- [ ] Hiển thị thông báo khi không có quyền
- [ ] Test với các role khác nhau

### Sprint 5 (3-4 ngày) - Admin UI (Optional)
- [ ] Trang quản lý roles
- [ ] Trang gán quyền cho role
- [ ] UI chọn chức năng + thao tác
- [ ] Test end-to-end

---

## 🔍 TESTING CHECKLIST

### Backend Testing
- [ ] Super Admin (sa) có tất cả quyền
- [ ] Thủ đồ (thudo) có quyền theo cấu hình
- [ ] Thành viên (thanhvien) chỉ có quyền VIEW
- [ ] User không thể truy cập dòng họ khác
- [ ] Token hết hạn trả về 401
- [ ] Không có quyền trả về 403

### Frontend Testing
- [ ] Menu items ẩn/hiện đúng theo quyền
- [ ] Buttons ẩn/hiện đúng theo quyền
- [ ] Redirect khi không có quyền
- [ ] Thông báo lỗi rõ ràng
- [ ] UI responsive với các role

---

## 💡 LỢI ÍCH

### Bảo mật
- ✅ Kiểm soát chặt chẽ quyền truy cập
- ✅ Ngăn chặn truy cập trái phép
- ✅ Audit trail đầy đủ

### Quản lý
- ✅ Dễ dàng thêm/sửa quyền
- ✅ Phân quyền linh hoạt theo role
- ✅ Hỗ trợ multi-tenancy (dòng họ)

### Trải nghiệm người dùng
- ✅ UI sạch sẽ, chỉ hiện chức năng có quyền
- ✅ Thông báo lỗi rõ ràng
- ✅ Không bị lỗi 403 bất ngờ

---

## 📝 GHI CHÚ

1. **Không cần thay đổi database** - Schema hiện tại đã hoàn hảo
2. **Middleware đã có sẵn** - Chỉ cần áp dụng vào routes
3. **Stored procedure đã có** - Có thể dùng nếu cần kiểm tra phức tạp
4. **Ưu tiên Backend trước** - Frontend có thể làm sau
5. **Test kỹ với các role** - Đảm bảo không ảnh hưởng user hiện tại

---

## 🎓 TÀI LIỆU THAM KHẢO

- Database schema: `database/tree_v26.sql`
- Middleware: `myFamilyTree/src/middlewares/authMiddleware.ts`
- JWT config: `myFamilyTree/src/config/jwt.ts`
- Example route: `myFamilyTree/src/routes/taiLieuRouter.ts`
