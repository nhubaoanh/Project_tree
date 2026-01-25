# ✅ HOÀN THÀNH TÍCH HỢP AI VÀO HỆ THỐNG

## 📋 Tổng Quan

Đã tích hợp thành công **AI Service (Text-to-SQL)** vào hệ thống Family Tree:
- ✅ Backend: Express/TypeScript
- ✅ AI Service: Python + Qwen 1.5B Model
- ✅ Frontend: Next.js + React
- ✅ Thu thập câu hỏi tự động
- ✅ Export dataset để fine-tune

---

## 🏗️ Kiến Trúc Hệ Thống

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend    │─────▶│ AI Service  │
│  (Next.js)  │      │  (Express)   │      │  (Python)   │
└─────────────┘      └──────────────┘      └─────────────┘
      │                      │                      │
      │                      │                      ▼
      │                      │              ┌─────────────┐
      │                      │              │   Model     │
      │                      │              │ Qwen 1.5B   │
      │                      │              └─────────────┘
      │                      ▼                      │
      │              ┌──────────────┐              │
      │              │   Database   │◀─────────────┘
      │              │    MySQL     │
      │              └──────────────┘
      │
      ▼
┌─────────────────────────────────────────┐
│  Logs (Thu thập câu hỏi)                │
│  - questions.txt                        │
│  - query_results.jsonl                  │
└─────────────────────────────────────────┘
```

---

## 📁 Files Đã Tạo/Cập Nhật

### 1. Backend (myFamilyTree)
- ✅ `src/controllers/aiQueryController.ts` - Controller xử lý AI requests
- ✅ `src/services/aiQueryService.ts` - Service gọi AI Service
- ✅ `src/routes/aiQueryRoutes.ts` - Routes cho AI endpoints

### 2. AI Service (ai-service)
- ✅ `main.py` - FastAPI server với logging
- ✅ `sql_generator_optimized.py` - Model tối ưu (1.5B)
- ✅ `logs/questions.txt` - Thu thập câu hỏi
- ✅ `logs/query_results.jsonl` - Thu thập kết quả

### 3. Frontend (FE/tree)
- ✅ `service/aiQuery.service.ts` - Service gọi backend
- ✅ `app/(full-page)/genAI/page.tsx` - UI chat với AI

### 4. Documentation
- ✅ `INTEGRATION_GUIDE.md` - Hướng dẫn tích hợp
- ✅ `AI_INTEGRATION_COMPLETE.md` - Tài liệu này

---

## 🚀 Cách Sử Dụng

### Bước 1: Khởi động AI Service

```bash
cd ai-service
python main.py
```

**Output:**
```
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:5001
Model loaded successfully!
```

### Bước 2: Khởi động Backend

```bash
cd myFamilyTree
npm run dev
```

**Output:**
```
Server running on port 3001
Connected to MySQL database
```

### Bước 3: Khởi động Frontend

```bash
cd FE/tree
npm run dev
```

**Output:**
```
- ready started server on 0.0.0.0:3000
```

### Bước 4: Truy cập AI Chat

1. Mở trình duyệt: `http://localhost:3000`
2. Đăng nhập vào hệ thống
3. Click vào nút **"Hỏi đáp AI"** (floating button góc phải)
4. Hoặc truy cập trực tiếp: `http://localhost:3000/genAI`

---

## 💬 Ví Dụ Sử Dụng

### Câu hỏi mẫu:

1. **Thống kê:**
   - "Có bao nhiêu người trong gia phả?"
   - "Có bao nhiêu người sinh năm 1990?"
   - "Có bao nhiêu người nam?"

2. **Tìm kiếm:**
   - "Tìm người tên Nguyễn Văn A"
   - "Liệt kê tất cả thành viên"
   - "Ai sinh năm 1985?"

3. **Phức tạp:**
   - "Có bao nhiêu người sinh từ 1980 đến 1990?"
   - "Liệt kê 10 người mới nhất"
   - "Tìm người có tên chứa 'Nguyễn'"

### Kết quả trả về:

```
✅ Câu trả lời:

📊 319

📈 Tổng: 1 kết quả

🔍 SQL: `SELECT COUNT(*) AS tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1`
💯 Độ tin cậy: 100.0%
```

---

## 📊 Thu Thập Câu Hỏi

### Tự động thu thập

Mỗi khi user hỏi, hệ thống tự động lưu:

**File: `ai-service/logs/questions.txt`**
```
2026-01-25T10:30:45|Có bao nhiêu người trong gia phả?
2026-01-25T10:31:12|Tìm người tên Nguyễn Văn A
2026-01-25T10:32:05|Có bao nhiêu người sinh năm 1990?
```

**File: `ai-service/logs/query_results.jsonl`**
```json
{"timestamp": "2026-01-25T10:30:45", "question": "Có bao nhiêu người trong gia phả?", "sql": "SELECT COUNT(*) ...", "confidence": "100.0%", "success": true, "results": [{"tong_so": 319}]}
```

### Xem số câu hỏi đã thu thập

Trên UI, góc trên bên phải sẽ hiển thị:
```
[Download] Export (25)
```

Số `25` là số câu hỏi đã thu thập.

### Export dataset

Khi đủ 10+ câu hỏi, click nút **"Export"**:

```
✅ Export thành công!

📊 Tổng: 25 câu hỏi
📁 File: ai-service/dataset/training_data_20260125_103045.json

💡 Bạn có thể dùng file này để fine-tune model!
```

---

## 🎯 Lộ Trình Thu Thập & Fine-tune

### Phase 1: Thu thập (1-2 tuần)
- ✅ Tích hợp AI vào hệ thống
- ✅ User sử dụng tự nhiên
- ✅ Hệ thống tự động log câu hỏi
- 🎯 Mục tiêu: **100-500 câu hỏi**

### Phase 2: Phân tích (1 ngày)
- Xem file `questions.txt`
- Phân loại câu hỏi:
  - Thống kê (COUNT, SUM, AVG)
  - Tìm kiếm (WHERE, LIKE)
  - Liệt kê (SELECT *)
  - Phức tạp (JOIN, GROUP BY)
- Xác định câu hỏi nào model trả lời tốt/kém

### Phase 3: Chuẩn bị dataset (2-3 ngày)
- Export dataset: Click nút "Export" trên UI
- Kiểm tra file JSON
- Thêm câu hỏi mẫu nếu thiếu
- Format theo chuẩn fine-tuning

### Phase 4: Fine-tune (1 ngày)
```bash
cd ai-service
python finetune.py
```

### Phase 5: Đánh giá & Deploy (1 ngày)
- Test model mới
- So sánh với model cũ
- Deploy nếu tốt hơn

---

## 🔧 API Endpoints

### Backend (Port 3001)

#### 1. Hỏi AI
```http
POST /api/ai-query/ask
Content-Type: application/json

{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001"
}
```

**Response:**
```json
{
  "success": true,
  "question": "Có bao nhiêu người trong gia phả?",
  "sql": "SELECT COUNT(*) AS tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
  "confidence": "100.0%",
  "results": [{"tong_so": 319}],
  "total_rows": 1,
  "message": "Tìm thấy 1 kết quả"
}
```

#### 2. Xem câu hỏi đã thu thập
```http
GET /api/ai-query/logs/questions
```

**Response:**
```json
{
  "success": true,
  "questions": [
    {
      "timestamp": "2026-01-25T10:30:45",
      "question": "Có bao nhiêu người trong gia phả?"
    }
  ],
  "total": 25
}
```

#### 3. Export dataset
```http
POST /api/ai-query/dataset/export
```

**Response:**
```json
{
  "success": true,
  "dataset_path": "ai-service/dataset/training_data_20260125_103045.json",
  "total_samples": 25,
  "message": "Dataset exported successfully"
}
```

### AI Service (Port 5001)

#### 1. Generate SQL
```http
POST http://localhost:5001/ask
Content-Type: application/json

{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001"
}
```

#### 2. Health Check
```http
GET http://localhost:5001/health
```

---

## 🐛 Troubleshooting

### Lỗi: AI Service không chạy

**Triệu chứng:**
```
❌ Lỗi: Failed to connect to AI Service
```

**Giải pháp:**
```bash
cd ai-service
python main.py
```

### Lỗi: Model quá chậm (>1 phút)

**Nguyên nhân:** Đang dùng model 7B (14GB) trên RAM 8GB

**Giải pháp:**
```bash
cd ai-service
python switch_model.py
# Chọn: 1 (Qwen 1.5B)
```

### Lỗi: Không thu thập được câu hỏi

**Kiểm tra:**
```bash
cd ai-service
dir logs
# Phải có: questions.txt, query_results.jsonl
```

**Nếu không có:**
```bash
mkdir logs
# Restart AI Service
python main.py
```

### Lỗi: Export dataset thất bại

**Kiểm tra:**
- Có ít nhất 1 câu hỏi trong `logs/questions.txt`
- Folder `dataset/` tồn tại
- Có quyền ghi file

**Tạo folder:**
```bash
cd ai-service
mkdir dataset
```

---

## 📈 Metrics & Monitoring

### Theo dõi hiệu suất

**File: `ai-service/logs/query_results.jsonl`**

Mỗi dòng là 1 query:
```json
{
  "timestamp": "2026-01-25T10:30:45",
  "question": "Có bao nhiêu người trong gia phả?",
  "sql": "SELECT COUNT(*) ...",
  "confidence": "100.0%",
  "success": true,
  "execution_time": 0.15,
  "results": [{"tong_so": 319}]
}
```

### Phân tích:
- **Success rate:** Bao nhiêu % câu hỏi trả lời đúng?
- **Confidence:** Độ tin cậy trung bình?
- **Execution time:** Thời gian xử lý?
- **Popular questions:** Câu hỏi nào được hỏi nhiều nhất?

---

## 🎓 Học Thêm

### Tài liệu đã tạo:

1. **COMPLETE_AI_SERVICE_GUIDE.md** - Tổng quan AI Service
2. **PART1_FILES_EXPLAINED.md** - Giải thích từng file
3. **PART2_HOW_IT_WORKS.md** - Cách hoạt động
4. **PART3_TRAINING_GUIDE.md** - Hướng dẫn train
5. **PART4_AI_LEARNING_ROADMAP.md** - Lộ trình học AI
6. **FINETUNE_COMPLETE_GUIDE.md** - Hướng dẫn fine-tune
7. **INTEGRATION_GUIDE.md** - Hướng dẫn tích hợp
8. **AI_INTEGRATION_COMPLETE.md** - Tài liệu này

### Đọc theo thứ tự:
1. COMPLETE_AI_SERVICE_GUIDE.md (Hiểu tổng quan)
2. INTEGRATION_GUIDE.md (Hiểu cách tích hợp)
3. AI_INTEGRATION_COMPLETE.md (Hướng dẫn sử dụng)
4. FINETUNE_COMPLETE_GUIDE.md (Khi cần fine-tune)

---

## ✅ Checklist Hoàn Thành

- [x] Backend có endpoints AI
- [x] AI Service chạy được
- [x] Frontend có UI chat
- [x] Thu thập câu hỏi tự động
- [x] Export dataset
- [x] Tài liệu đầy đủ
- [ ] Thu thập 100+ câu hỏi (đang chạy)
- [ ] Fine-tune model (sau khi có data)
- [ ] Deploy production

---

## 🎉 Kết Luận

Hệ thống AI đã sẵn sàng sử dụng! 

**Next steps:**
1. ✅ Chạy 3 services (AI, Backend, Frontend)
2. ✅ User bắt đầu hỏi câu hỏi
3. ⏳ Chờ 1-2 tuần thu thập 100-500 câu hỏi
4. 📊 Export dataset
5. 🎯 Fine-tune model
6. 🚀 Deploy model mới

**Thời gian ước tính:** 2-3 tuần để có model tốt hơn!

---

## 📞 Support

Nếu gặp vấn đề:
1. Kiểm tra logs: `ai-service/logs/`
2. Xem console: Backend & Frontend
3. Đọc lại tài liệu: `INTEGRATION_GUIDE.md`
4. Test API trực tiếp: Postman/Thunder Client

**Happy coding! 🚀**
