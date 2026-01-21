# 🧪 Test AI Integration

## 📋 Checklist

### 1. Start AI Service
```bash
cd ai-service
pip install -r requirements.txt
cp .env.example .env
# Sửa .env với DB credentials
python main.py
```

**Expected output:**
```
INFO:     Starting AI Text-to-SQL Service...
INFO:     Loading model: Qwen/Qwen2.5-Coder-7B-Instruct
INFO:     Device: cuda
INFO:     Loading tokenizer...
INFO:     Loading model on GPU...
INFO:     Model loaded successfully!
INFO:     Started server process
INFO:     Uvicorn running on http://0.0.0.0:7000
```

### 2. Start Backend
```bash
cd myFamilyTree
npm run dev
```

**Expected output:**
```
🤖 AI Service URL: http://localhost:7000
Server running on port 6001
```

### 3. Start Frontend
```bash
cd FE/tree
npm run dev
```

### 4. Test với cURL

#### Test 1: Health Check
```bash
curl http://localhost:8080/api-core/ai/health
```

**Expected:**
```json
{
  "success": true,
  "healthy": true,
  "message": "AI Service đang hoạt động"
}
```

#### Test 2: Ask Question
```bash
curl -X POST http://localhost:8080/api-core/ai/ask \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Có bao nhiêu người trong gia phả?",
    "dongHoId": "e9022e64-cbae-11f0-8020-a8934a9bae74"
  }'
```

**Expected:**
```json
{
  "success": true,
  "message": "Truy vấn thành công",
  "data": {
    "question": "Có bao nhiêu người trong gia phả?",
    "sql": "SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
    "confidence": 0.9,
    "results": [{"tong_so": 50}],
    "columns": ["tong_so"],
    "row_count": 1
  }
}
```

### 5. Test trên Frontend

1. Mở browser: `http://localhost:3000/ai-chat`
2. Login nếu chưa login
3. Thử các câu hỏi mẫu:
   - "Có bao nhiêu người trong gia phả?"
   - "Ai là người lớn tuổi nhất?"
   - "Có bao nhiêu người làm nông dân?"

### 6. Check Logs

#### Backend logs (Terminal 2):
```
============================================================
🤖 [AI Query] Question: Có bao nhiêu người trong gia phả?
📁 [AI Query] DongHoId: e9022e64-cbae-11f0-8020-a8934a9bae74
============================================================

✅ [AI Query] Response received in 1234ms
📝 [AI Query] Generated SQL:
   SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1
📊 [AI Query] Confidence: 90.0%
📦 [AI Query] Results: 1 rows
📋 [AI Query] Columns: tong_so
💾 [AI Query] Data:
[
  {
    "tong_so": 50
  }
]
============================================================
```

#### AI Service logs (Terminal 1):
```
INFO:     Generating SQL for: Có bao nhiêu người trong gia phả?
INFO:     Generated SQL: SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1
INFO:     Executing: SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = %s AND active_flag = 1
INFO:     Query executed successfully. Rows: 1
INFO:     127.0.0.1:52341 - "POST /query HTTP/1.1" 200 OK
```

#### Frontend logs (Browser Console):
```
============================================================
🤖 [Frontend] Asking AI: Có bao nhiêu người trong gia phả?
📁 [Frontend] DongHoId: e9022e64-cbae-11f0-8020-a8934a9bae74
============================================================

✅ [Frontend] Response received in 1500ms
📝 [Frontend] SQL: SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1
📊 [Frontend] Confidence: 90.0%
📦 [Frontend] Results: 1 rows
💾 [Frontend] Data: [{tong_so: 50}]
============================================================
```

## 🎯 Test Cases

### Basic Queries
- ✅ "Có bao nhiêu người trong gia phả?"
- ✅ "Ai là người lớn tuổi nhất?"
- ✅ "Có bao nhiêu người làm nông dân?"

### Personal Info
- ✅ "Nghề nghiệp của Nguyễn Văn A là gì?"
- ✅ "Nguyễn Văn A sinh năm nào?"
- ✅ "Nguyễn Văn A sống ở đâu?"

### Relationships
- ✅ "Nguyễn Văn A là con của ai?"
- ✅ "Nguyễn Văn A có mấy con?"
- ✅ "Con của Nguyễn Văn A tên gì?"
- ✅ "Vợ của Nguyễn Văn A tên gì?"

### Filtering
- ✅ "Ai là con trai của Nguyễn Văn A?"
- ✅ "Ai là con gái của Nguyễn Văn A?"

### Complex
- ✅ "Ông nội của Nguyễn Văn C tên gì?"

## 🐛 Troubleshooting

### AI Service không start
```bash
# Check Python version
python --version  # Should be 3.10+

# Check CUDA (if using GPU)
python -c "import torch; print(torch.cuda.is_available())"

# If no GPU, use CPU
# Edit ai-service/.env: DEVICE=cpu
```

### Backend không kết nối được AI Service
```bash
# Check AI Service is running
curl http://localhost:7000/health

# Check .env
cat myFamilyTree/.env | grep AI_SERVICE_URL
# Should be: AI_SERVICE_URL=http://localhost:7000
```

### Frontend không gọi được API
```bash
# Check backend is running
curl http://localhost:8080/api-core/ai/health

# Check authentication
# Make sure you're logged in and have valid token
```

## ✅ Success Criteria

- [ ] AI Service starts successfully
- [ ] Backend connects to AI Service
- [ ] Frontend can ask questions
- [ ] Logs show full flow (Frontend → Backend → AI Service → Database)
- [ ] Results display correctly in UI
- [ ] Confidence score is reasonable (> 70%)
- [ ] SQL queries are correct

## 📊 Performance Metrics

- **First query**: ~30-60s (model loading)
- **Subsequent queries**: ~1-3s
- **Confidence**: Should be > 70% for most queries
- **Accuracy**: Should be > 80% for basic queries

---

**Ready to test!** 🚀
