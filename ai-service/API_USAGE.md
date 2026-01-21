# 🚀 AI SERVICE - HƯỚNG DẪN SỬ DỤNG API

## ✅ Service đã chạy thành công!

```
INFO: Uvicorn running on http://0.0.0.0:7000
INFO: Model loaded!
```

---

## 🌐 TRUY CẬP API

### 1. **Swagger UI (Khuyên dùng!)** 

Mở browser:
```
http://localhost:7000/docs
```

Giao diện này cho phép:
- ✅ Xem tất cả endpoints
- ✅ Test API trực tiếp
- ✅ Xem request/response schema
- ✅ Không cần curl hay Postman

### 2. **ReDoc (Alternative Documentation)**

```
http://localhost:7000/redoc
```

### 3. **Root Path**

```
http://localhost:7000/
```

Tự động redirect về `/docs`

---

## 📡 API ENDPOINTS

### 1. Health Check

**GET** `/health`

Kiểm tra service có hoạt động không.

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "db_connected": true
}
```

**Test với curl:**
```bash
curl http://localhost:7000/health
```

---

### 2. Query (Generate SQL + Execute)

**POST** `/query`

Chuyển câu hỏi tiếng Việt thành SQL và thực thi.

**Request:**
```json
{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001",
  "execute": true
}
```

**Response:**
```json
{
  "success": true,
  "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
  "confidence": 0.9,
  "data": [
    {
      "COUNT(*)": 150
    }
  ],
  "columns": ["COUNT(*)"],
  "row_count": 1
}
```

**Test với curl:**
```bash
curl -X POST http://localhost:7000/query ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"Có bao nhiêu người trong gia phả?\",\"dongHoId\":\"DH001\",\"execute\":true}"
```

**Các câu hỏi mẫu:**
```json
{"question": "Có bao nhiêu người trong gia phả?", "dongHoId": "DH001", "execute": true}
{"question": "Ai là người lớn tuổi nhất?", "dongHoId": "DH001", "execute": true}
{"question": "Có bao nhiêu người làm nông dân?", "dongHoId": "DH001", "execute": true}
{"question": "Nguyễn Văn A sinh năm nào?", "dongHoId": "DH001", "execute": true}
{"question": "Nguyễn Văn A là con của ai?", "dongHoId": "DH001", "execute": true}
```

---

### 3. Test (Generate SQL only, no execution)

**POST** `/test`

Chỉ generate SQL, không thực thi (để test model).

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
  "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
  "confidence": 0.9,
  "raw_output": "..."
}
```

**Test với curl:**
```bash
curl -X POST http://localhost:7000/test ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"Có bao nhiêu người?\",\"dongHoId\":\"DH001\"}"
```

---

## 🎯 TEST TRÊN SWAGGER UI

### Bước 1: Mở Swagger UI
```
http://localhost:7000/docs
```

### Bước 2: Chọn endpoint `/query`
Click vào **POST /query** → Click **Try it out**

### Bước 3: Nhập request body
```json
{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001",
  "execute": true
}
```

### Bước 4: Click **Execute**

### Bước 5: Xem kết quả
Scroll xuống phần **Response body**

---

## 🔗 TÍCH HỢP VỚI BACKEND

Backend Node.js đã có sẵn service:

**File:** `myFamilyTree/src/services/aiQueryService.ts`

```typescript
async askQuestion(question: string, dongHoId: string) {
  const response = await axios.post(`${AI_SERVICE_URL}/query`, {
    question,
    dongHoId,
    execute: true
  });
  return response.data;
}
```

**Sử dụng:**
```typescript
const result = await aiQueryService.askQuestion(
  "Có bao nhiêu người?",
  "DH001"
);
console.log(result.sql);
console.log(result.data);
```

---

## 🔗 TÍCH HỢP VỚI FRONTEND

Frontend Next.js đã có sẵn service:

**File:** `FE/tree/service/aiQuery.service.ts`

```typescript
export const askAIQuestion = async (question: string, dongHoId: string) => {
  const response = await api.post('/ai/query', {
    question,
    dongHoId
  });
  return response;
};
```

**UI:** `FE/tree/app/(full-page)/ai-chat/page.tsx`

Truy cập: `http://localhost:3000/ai-chat`

---

## 📊 RESPONSE FIELDS

| Field | Type | Description |
|-------|------|-------------|
| success | boolean | Thành công hay không |
| sql | string | SQL query đã generate |
| confidence | float | Độ tin cậy (0.0-1.0) |
| data | array | Kết quả query (nếu execute=true) |
| columns | array | Tên các columns |
| row_count | int | Số dòng kết quả |
| error | string | Lỗi (nếu có) |

---

## ⚡ PERFORMANCE

Với model 1.5B trên CPU:
- **Load time**: 20-30 giây (lần đầu)
- **Query time**: 2-3 giây
- **Accuracy**: 70-75%

---

## ❌ ERROR HANDLING

### Error: Connection refused
```
→ Service chưa chạy
→ Chạy: python main.py
```

### Error: 404 Not Found
```
→ Sai endpoint
→ Dùng /query hoặc /test, không phải /
```

### Error: 500 Internal Server Error
```
→ Xem logs trong terminal
→ Có thể do SQL syntax error hoặc DB connection
```

---

## 🔍 LOGS

Service sẽ log chi tiết:

```
🤖 [AI Query] Question: Có bao nhiêu người?
📁 [AI Query] DongHoId: DH001
📝 [AI Query] Generated SQL: SELECT COUNT(*) ...
📊 [AI Query] Confidence: 90.0%
📦 [AI Query] Results: 1 rows
```

---

## 🎓 NEXT STEPS

1. ✅ Test API trên Swagger UI
2. ✅ Test integration với Backend
3. ✅ Test UI trên Frontend
4. ✅ Thêm examples vào `config.py` để cải thiện accuracy
5. ✅ Monitor logs để debug

---

## 📖 TÀI LIỆU THÊM

- FastAPI Docs: https://fastapi.tiangolo.com/
- Swagger UI Guide: https://swagger.io/tools/swagger-ui/

---

**Chúc mừng! Service đã sẵn sàng! 🎉**

