# 🤖 AI Service - Text-to-SQL

Chuyển câu hỏi tiếng Việt → SQL query

**🆕 MỚI: Train với 50 câu hỏi có sẵn!**

---

## 🚀 TRAIN NGAY (6 bước - 7 phút)

**Đọc:** `TRAIN_NGAY.md` ⭐⭐⭐⭐⭐

**Tóm tắt:**
```
1. Mở Colab: https://colab.research.google.com
2. Chọn GPU: T4 GPU
3. Copy script: train_colab_simple.py → Paste → Run
4. Upload: dataset/member.json (50 câu có sẵn)
5. Chờ 7 phút → Download model
6. Extract → Copy vào ai-service/
```

**Kết quả:** Model train với 50 câu, loss 0.7 → 0.1 ✅

---

## 📚 Files quan trọng

### 🔥 Train model
- **`TRAIN_NGAY.md`** - Hướng dẫn 6 bước ⭐
- **`train_colab_simple.py`** - Script copy vào Colab
- **`dataset/member.json`** - 50 câu hỏi + SQL

### 📖 Tài liệu
- **`START_HERE.md`** - Bắt đầu từ đây
- **`GUIDE.md`** - Hướng dẫn đầy đủ
- **`SUMMARY.md`** - Tóm tắt

---

```bash
# 1. Cài đặt
pip install -r requirements.txt

# 2. Cấu hình .env
# Sửa DB_PASSWORD

# 3. Chạy
python main.py
```

Server: `http://localhost:7000`

---

## 📡 API

### Health Check
```bash
curl http://localhost:7000/health
```

### Hỏi Câu Hỏi
```bash
curl -X POST http://localhost:7000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Có bao nhiêu người trong gia phả?",
    "dongHoId": "xxx",
    "execute": true
  }'
```

---

## 📚 Tài Liệu

Đọc **[GUIDE.md](GUIDE.md)** để biết:
- Cách sử dụng API
- Cách train model
- Troubleshooting
- Tips & tricks

---

**Enjoy! 🚀**
