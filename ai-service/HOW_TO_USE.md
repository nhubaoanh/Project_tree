# 🎯 CÁCH SỬ DỤNG AI SERVICE - ĐƠN GIẢN

## 🚀 3 ENDPOINTS - CHỌN THEO MỤC ĐÍCH

### 1. `/ask` - ĐƠN GIẢN NHẤT (Khuyên dùng!)

**Mục đích**: Hỏi câu hỏi và nhận kết quả dễ đọc

**Request:**
```json
{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001",
  "execute": true
}
```

**Response (Dễ đọc):**
```json
{
  "success": true,
  "question": "Có bao nhiêu người trong gia phả?",
  "sql": "SELECT COUNT(*) AS tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
  "confidence": "100.0%",
  "results": [
    {
      "tong_so": 150
    }
  ],
  "total_rows": 1,
  "message": "Tìm thấy 1 kết quả"
}
```

**Test trên Swagger:**
```
http://localhost:7000/docs
→ POST /ask
→ Try it out
→ Nhập request
→ Execute
```

**Test với curl:**
```bash
curl -X POST http://localhost:7000/ask ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"Có bao nhiêu người trong gia phả?\",\"dongHoId\":\"DH001\",\"execute\":true}"
```

---

### 2. `/query` - ĐẦY ĐỦ (Cho developer)

**Mục đích**: Response đầy đủ với columns, row_count, etc.

**Request:**
```json
{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001",
  "execute": true
}
```

**Response (Chi tiết):**
```json
{
  "success": true,
  "sql": "SELECT COUNT(*) AS tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
  "confidence": 1.0,
  "data": [
    {
      "tong_so": 150
    }
  ],
  "columns": ["tong_so"],
  "row_count": 1
}
```

---

### 3. `/test` - CHỈ TEST SQL (Không execute)

**Mục đích**: Kiểm tra AI generate SQL đúng không (không chạy query)

**Request:**
```json
{
  "question": "Có bao nhiêu người?",
  "dongHoId": "DH001"
}
```

**Response:**
```json
{
  "success": true,
  "sql": "SELECT COUNT(*) ...",
  "confidence": 1.0,
  "raw_output": "..." ← Đống text dài (debug info)
}
```

---

## 🎯 CHỌN ENDPOINT NÀO?

| Endpoint | Khi nào dùng | Có kết quả DB? | Dễ đọc? |
|----------|--------------|----------------|---------|
| `/ask`   | Hỏi câu hỏi thường | ✅ Có | ✅ Rất dễ |
| `/query` | Cần data chi tiết | ✅ Có | ⚠️ Technical |
| `/test`  | Test AI model | ❌ Không | ❌ Debug only |

**Khuyến nghị**: Dùng `/ask` cho hầu hết trường hợp!

---

## 📝 CÁC CÂU HỎI MẪU

### 1. Đếm số lượng
```json
{"question": "Có bao nhiêu người trong gia phả?", "dongHoId": "DH001", "execute": true}
{"question": "Có bao nhiêu người làm nông dân?", "dongHoId": "DH001", "execute": true}
```

### 2. Tìm người
```json
{"question": "Ai là người lớn tuổi nhất?", "dongHoId": "DH001", "execute": true}
{"question": "Ai là con của Nguyễn Văn A?", "dongHoId": "DH001", "execute": true}
```

### 3. Thông tin cá nhân
```json
{"question": "Nguyễn Văn A sinh năm nào?", "dongHoId": "DH001", "execute": true}
{"question": "Nghề nghiệp của Nguyễn Văn A là gì?", "dongHoId": "DH001", "execute": true}
```

### 4. Quan hệ gia đình
```json
{"question": "Nguyễn Văn A có mấy con?", "dongHoId": "DH001", "execute": true}
{"question": "Vợ của Nguyễn Văn A tên gì?", "dongHoId": "DH001", "execute": true}
```

---

## 🌐 TEST TRÊN SWAGGER UI

### Bước 1: Mở Swagger
```
http://localhost:7000/docs
```

### Bước 2: Chọn `/ask`
- Click **POST /ask**
- Click **Try it out**

### Bước 3: Nhập request
```json
{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001",
  "execute": true
}
```

### Bước 4: Click Execute

### Bước 5: Xem kết quả
Scroll xuống **Response body** - Dễ đọc!

---

## 💡 HIỂU KẾT QUẢ

### Ví dụ 1: Đếm số lượng
**Question**: "Có bao nhiêu người trong gia phả?"

**Response:**
```json
{
  "results": [
    {
      "tong_so": 150  ← Có 150 người
    }
  ],
  "message": "Tìm thấy 1 kết quả"
}
```

### Ví dụ 2: Danh sách người
**Question**: "Ai là con của Nguyễn Văn A?"

**Response:**
```json
{
  "results": [
    {"hoTen": "Nguyễn Văn B", "gioiTinh": 1},
    {"hoTen": "Nguyễn Thị C", "gioiTinh": 0},
    {"hoTen": "Nguyễn Văn D", "gioiTinh": 1}
  ],
  "total_rows": 3,
  "message": "Tìm thấy 3 kết quả"
}
```

### Ví dụ 3: Thông tin 1 người
**Question**: "Nguyễn Văn A sinh năm nào?"

**Response:**
```json
{
  "results": [
    {"nam_sinh": 1950}  ← Sinh năm 1950
  ],
  "message": "Tìm thấy 1 kết quả"
}
```

---

## 🔗 TÍCH HỢP VỚI CODE

### JavaScript/TypeScript
```typescript
const response = await fetch('http://localhost:7000/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    question: "Có bao nhiêu người?",
    dongHoId: "DH001",
    execute: true
  })
});

const data = await response.json();
console.log(data.results);  // Kết quả
console.log(data.message);  // "Tìm thấy X kết quả"
```

### Python
```python
import requests

response = requests.post('http://localhost:7000/ask', json={
    "question": "Có bao nhiêu người?",
    "dongHoId": "DH001",
    "execute": True
})

data = response.json()
print(data['results'])  # Kết quả
print(data['message'])  # "Tìm thấy X kết quả"
```

---

## ❌ XỬ LÝ LỖI

### Lỗi: "success": false
```json
{
  "success": false,
  "question": "...",
  "sql": "...",
  "error": "Table 'xxx' doesn't exist"
}
```
→ Kiểm tra database connection hoặc SQL syntax

### Lỗi: 500 Internal Server Error
→ Xem logs trong terminal AI service

### Lỗi: Connection refused
→ AI service chưa chạy, start lại: `python main.py`

---

## 🎓 TIPS

1. **Luôn set `execute: true`** nếu muốn thấy kết quả
2. **Dùng `/ask`** cho response dễ đọc
3. **Dùng `/query`** nếu cần columns, row_count
4. **Dùng `/test`** chỉ khi debug AI model
5. **Xem logs** trong terminal để debug

---

## 📖 TÀI LIỆU THÊM

- `API_USAGE.md` - Chi tiết tất cả endpoints
- Swagger UI: http://localhost:7000/docs
- ReDoc: http://localhost:7000/redoc

---

**Bây giờ hãy thử `/ask` endpoint trên Swagger UI! 🚀**

