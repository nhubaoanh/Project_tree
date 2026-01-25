# 🚀 QUICK START - Chạy AI Chat

## 📋 Yêu Cầu
- Python 3.8+
- Node.js 16+
- MySQL đang chạy
- RAM 8GB (khuyến nghị)

---

## ⚡ Chạy Nhanh (3 Bước)

### 1️⃣ Khởi động AI Service
```bash
cd ai-service
python main.py
```
✅ Chờ thấy: `Model loaded successfully!`

### 2️⃣ Khởi động Backend
```bash
cd myFamilyTree
npm run dev
```
✅ Chờ thấy: `Server running on port 3001`

### 3️⃣ Khởi động Frontend
```bash
cd FE/tree
npm run dev
```
✅ Chờ thấy: `ready started server on 0.0.0.0:3000`

---

## 🎯 Truy Cập

1. Mở trình duyệt: **http://localhost:3000**
2. Đăng nhập vào hệ thống
3. Click nút **"Hỏi đáp AI"** (góc phải màn hình)
4. Hoặc truy cập: **http://localhost:3000/genAI**

---

## 💬 Thử Ngay

Hỏi AI:
- "Có bao nhiêu người trong gia phả?"
- "Liệt kê tất cả thành viên"
- "Tìm người tên Nguyễn Văn A"

---

## 🐛 Lỗi Thường Gặp

### AI Service không chạy?
```bash
# Kiểm tra port 5001 có bị chiếm không
netstat -ano | findstr :5001

# Nếu bị chiếm, kill process hoặc đổi port trong config.py
```

### Model quá chậm?
```bash
cd ai-service
python switch_model.py
# Chọn: 1 (Qwen 1.5B - nhanh hơn)
```

### Frontend không kết nối được Backend?
Kiểm tra file `FE/tree/constant/config.ts`:
```typescript
export const API_CORE = "http://localhost:3001/api";
```

---

## 📚 Tài Liệu Chi Tiết

- **AI_INTEGRATION_COMPLETE.md** - Hướng dẫn đầy đủ
- **INTEGRATION_GUIDE.md** - Chi tiết tích hợp
- **FINETUNE_COMPLETE_GUIDE.md** - Hướng dẫn fine-tune

---

## 🎉 Xong!

Bây giờ bạn có thể:
- ✅ Hỏi AI về gia phả
- ✅ Hệ thống tự động thu thập câu hỏi
- ✅ Sau 1-2 tuần, export dataset để fine-tune

**Happy coding! 🚀**
