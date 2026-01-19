# Giải Thích Stored Procedures - Import Data với Xử Lý Duplicate Key

## Tổng Quan

File `fix_duplicate_taichinhthu.sql` chứa 3 stored procedures được thiết kế để xử lý vấn đề duplicate key khi import dữ liệu:

1. **ImportTaiChinhThuFromJson** - Import dữ liệu thu
2. **ImportTaiChinhChiFromJson** - Import dữ liệu chi  
3. **ImportThanhVienFromJsonComposite** - Import dữ liệu thành viên

## Vấn Đề Cần Giải Quyết

### Vấn đề gốc:
- Khi "xóa" record, hệ thống chỉ set `active_flag = 0` (soft delete)
- Record vẫn tồn tại trong database với primary key
- Import lại cùng ID sẽ bị lỗi **Duplicate entry for key 'PRIMARY'**

### Giải pháp:
Kiểm tra trạng thái record và xử lý 3 trường hợp:
1. **Record chưa tồn tại** → INSERT mới
2. **Record tồn tại nhưng active_flag = 0** → UPDATE và reactivate (set active_flag = 1)
3. **Record tồn tại và active_flag = 1** → UPDATE thông tin

## Chi Tiết Từng Procedure

### 1. ImportTaiChinhThuFromJson

**Mục đích:** Import dữ liệu tài chính thu từ JSON array

**Tham số:**
- `p_json_data` (JSON): Dữ liệu JSON array chứa thông tin thu
- `p_dongHoId` (VARCHAR): ID dòng họ
- `p_nguoiTaoId` (VARCHAR): ID người tạo
- `p_err_code` (OUT INT): Mã lỗi trả về
- `p_err_msg` (OUT VARCHAR): Thông báo kết quả

**Cấu trúc JSON mong đợi:**
```json
[
  {
    "stt": 1,
    "ho_ten_nguoi_dong": "Nguyễn Văn A",
    "ngay_dong": "01/01/2025",
    "so_tien": 100000,
    "phuong_thuc_thanh_toan": "Tiền mặt",
    "noi_dung": "Đóng góp tết",
    "ghi_chu": "Ghi chú"
  }
]
```

**Logic xử lý:**
1. Validate input (JSON không rỗng, dongHoId hợp lệ)
2. Duyệt từng phần tử trong JSON array
3. Với mỗi record:
   - Kiểm tra tồn tại: `SELECT COUNT(*), MAX(active_flag) FROM taichinhthu WHERE thuId = ? AND dongHoId = ?`
   - Xử lý theo 3 case như trên
4. Trả về thống kê: số record mới, cập nhật, khôi phục

### 2. ImportTaiChinhChiFromJson

**Mục đích:** Import dữ liệu tài chính chi từ JSON array

**Tương tự ImportTaiChinhThuFromJson** nhưng cho bảng `taichinhchi`

**Cấu trúc JSON mong đợi:**
```json
[
  {
    "stt": 1,
    "ngay_chi": "01/01/2025",
    "so_tien": 50000,
    "phuong_thuc_thanh_toan": "Tiền mặt",
    "noi_dung": "Chi phí tổ chức",
    "nguoi_nhan": "Nhà hàng ABC",
    "ghi_chu": "Đã thanh toán"
  }
]
```

### 3. ImportThanhVienFromJsonComposite

**Mục đích:** Import dữ liệu thành viên từ JSON array

**Đặc biệt:** Xử lý quan hệ gia đình (cha, mẹ, vợ, chồng)

**Cấu trúc JSON mong đợi:**
```json
[
  {
    "stt": 1,
    "hoTen": "Nguyễn Văn A",
    "gioiTinh": 1,
    "ngaySinh": "01/01/1980",
    "ngayMat": null,
    "noiSinh": "Hà Nội",
    "noiMat": "",
    "ngheNghiep": "Kỹ sư",
    "trinhDoHocVan": "Đại học",
    "diaChiHienTai": "123 ABC Street",
    "tieuSu": "Tiểu sử",
    "doiThuoc": 1,
    "chaId": 2,
    "meId": 3,
    "voId": 4,
    "chongId": null
  }
]
```

## Tính Năng Chung

### 1. Transaction Safety
```sql
START TRANSACTION;
-- Xử lý dữ liệu
COMMIT;

-- Nếu có lỗi:
DECLARE CONTINUE HANDLER FOR SQLEXCEPTION 
BEGIN
    ROLLBACK;
END;
```

### 2. Error Handling
- Validate input trước khi xử lý
- Bắt lỗi SQL và rollback transaction
- Trả về mã lỗi và thông báo chi tiết

### 3. Detailed Reporting
```sql
SET p_err_msg = CONCAT(
    'Import thành công: ', v_success_count, '/', v_count, ' records. ',
    'Chi tiết: ', v_inserted_count, ' mới, ', 
    v_updated_count, ' cập nhật, ', 
    v_reactivated_count, ' khôi phục'
);
```

### 4. Label Syntax (MySQL)
```sql
CREATE PROCEDURE ProcName(...)
proc_exit: BEGIN
    -- Logic here
    
    IF error_condition THEN
        LEAVE proc_exit;  -- Thoát procedure
    END IF;
    
    -- Continue processing
END$
```

## Cách Sử Dụng

### 1. Chạy Script Tạo Procedures
```sql
SOURCE myFamilyTree/database/fix_duplicate_taichinhthu.sql;
```

### 2. Gọi Procedure từ Backend
```javascript
// Ví dụ trong Node.js
const [result] = await connection.query(
    'CALL ImportTaiChinhThuFromJson(?, ?, ?, @err_code, @err_msg)',
    [jsonData, dongHoId, nguoiTaoId]
);

const [status] = await connection.query(
    'SELECT @err_code as error_code, @err_msg as error_message'
);
```

### 3. Test Procedures
```sql
-- Test case: Import mới
CALL ImportTaiChinhThuFromJson(
    '[{"stt": 999, "ho_ten_nguoi_dong": "Test User", "ngay_dong": "01/01/2025", "so_tien": 100000}]',
    'dong-ho-id',
    'user-id',
    @err_code,
    @err_msg
);
SELECT @err_code, @err_msg;

-- Test case: "Xóa" record
UPDATE taichinhthu SET active_flag = 0 WHERE thuId = 999;

-- Test case: Import lại (should reactivate)
CALL ImportTaiChinhThuFromJson(
    '[{"stt": 999, "ho_ten_nguoi_dong": "Test User Updated", "ngay_dong": "02/01/2025", "so_tien": 200000}]',
    'dong-ho-id',
    'user-id',
    @err_code,
    @err_msg
);
SELECT @err_code, @err_msg;
```

## Lợi Ích

1. **Giải quyết duplicate key error** khi import lại dữ liệu đã "xóa"
2. **Transaction safety** - rollback nếu có lỗi
3. **Detailed reporting** - biết chính xác số record được xử lý
4. **Flexible handling** - xử lý cả insert mới và update existing
5. **Consistent logic** - cùng pattern cho tất cả các bảng

## Lưu Ý

1. **Primary Key Structure:**
   - `taichinhthu`: (thuId, dongHoId)
   - `taichinhchi`: (chiId, dongHoId)  
   - `thanhvien`: (thanhVienId, dongHoId)

2. **JSON Format:** Đảm bảo JSON đúng format và có đủ field bắt buộc

3. **Date Format:** Sử dụng format 'dd/mm/yyyy' cho ngày tháng

4. **NULL Handling:** Sử dụng COALESCE và NULLIF để xử lý giá trị null

5. **Performance:** Procedures sử dụng WHILE loop thay vì cursor để tối ưu performance


# Cursor Pointer Fixes - Tổng Hợp Sửa Lỗi Con Trỏ Chuột

## Vấn Đề
Nhiều nút bấm và phần tử tương tác trên giao diện không có `cursor: pointer`, khiến người dùng không biết được phần tử đó có thể click được.

## Giải Pháp Đã Áp Dụng

### 1. Global CSS Fixes (globals.css)
Đã thêm các rule CSS toàn cục để tự động áp dụng `cursor: pointer` cho:

#### Buttons
```css
button:not([disabled]) {
  cursor: pointer;
}
```

#### Interactive Elements
```css
[onclick]:not([disabled]),
div[onclick]:not([disabled]),
span[onclick]:not([disabled]) {
  cursor: pointer;
}
```

#### Form Elements
```css
select:not([disabled]),
input[type="checkbox"]:not([disabled]),
input[type="radio"]:not([disabled]),
input[type="file"]:not([disabled]) {
  cursor: pointer;
}
```

#### Hover States
```css
.hover\:bg-gray-100:hover,
.hover\:bg-red-50:hover,
.hover\:opacity-80:hover,
.hover\:scale-110:hover,
.hover\:shadow-xl:hover,
.hover\:bg-amber-700:hover,
.hover\:text-red-700:hover,
.hover\:bg-white\/20:hover,
.hover\:bg-stone-100:hover,
.hover\:bg-red-700:hover,
.hover\:bg-red-800:hover,
.hover\:translate-x-2:hover {
  cursor: pointer;
}
```

#### Transition States
```css
.transition-colors:hover,
.transition-transform:hover,
.transition-all:hover,
.transition-opacity:hover {
  cursor: pointer;
}
```

#### Table Rows
```css
tr:hover,
.hover\:bg-muted\/50:hover {
  cursor: pointer;
}
```

#### Disabled & Loading States
```css
[disabled],
.disabled,
.opacity-50[disabled] {
  cursor: not-allowed !important;
}

.loading,
.animate-spin {
  cursor: wait !important;
}
```

### 2. Specific Component Fixes

#### Members Page (FE/tree/app/(admin)/members/page.tsx)
- **Search Clear Button**: Thêm `cursor-pointer`
- **View Family Tree Button**: Thêm `cursor-pointer`

## Các Phần Tử Được Tự Động Fix

### Buttons
- Tất cả `<button>` elements không bị disabled
- Modal close buttons (X buttons)
- Navigation buttons
- Action buttons (Edit, Delete, View, etc.)

### Interactive Elements
- Clickable divs và spans có `onClick`
- Upload areas
- File input triggers
- Toast notifications (clickable)

### Form Elements
- Select dropdowns
- Checkboxes
- Radio buttons
- File inputs

### Hover Effects
- Tất cả elements có hover effects như:
  - `hover:bg-*`
  - `hover:text-*`
  - `hover:opacity-*`
  - `hover:scale-*`
  - `hover:shadow-*`
  - `hover:translate-*`

### Transition Effects
- Elements có `transition-colors`
- Elements có `transition-transform`
- Elements có `transition-all`
- Elements có `transition-opacity`

### Table Interactions
- Table rows có hover effects
- Clickable table cells

## Các Component Được Bao Phủ

### Admin Pages
- ✅ Members page
- ✅ Contributions (Thu/Chi) pages
- ✅ Documents page
- ✅ News management page
- ✅ Events management page
- ✅ Users page
- ✅ Roles page

### UI Components
- ✅ Header components
- ✅ Sidebar components
- ✅ Modal components
- ✅ Button components
- ✅ Form components
- ✅ Tree components
- ✅ Toast components

### Specific Elements Fixed
- ✅ Search clear buttons (X buttons)
- ✅ Modal close buttons
- ✅ Navigation menu items
- ✅ Upload areas
- ✅ Context menu items
- ✅ Tree controls
- ✅ User dropdown menus
- ✅ Action buttons

## Trạng Thái Đặc Biệt

### Disabled Elements
- `cursor: not-allowed` cho elements bị disabled
- Áp dụng cho buttons, inputs, và interactive elements

### Loading States
- `cursor: wait` cho elements đang loading
- Áp dụng cho spinning icons và loading states

## Kết Quả
- ✅ Tất cả buttons giờ đã có cursor pointer
- ✅ Tất cả interactive elements có cursor phù hợp
- ✅ Disabled elements có cursor not-allowed
- ✅ Loading elements có cursor wait
- ✅ Hover effects tự động có cursor pointer
- ✅ Form elements có cursor pointer

## Lưu Ý
- CSS rules được áp dụng globally nên sẽ tự động fix cho tất cả components hiện tại và tương lai
- Không cần thêm `cursor-pointer` class manually cho hầu hết trường hợp
- Rules có `!important` cho disabled và loading states để đảm bảo override đúng