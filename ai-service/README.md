# 🤖 AI Service - Text-to-SQL

Chuyển câu hỏi tiếng Việt → SQL query

---

## ⚡ Quick Start

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
