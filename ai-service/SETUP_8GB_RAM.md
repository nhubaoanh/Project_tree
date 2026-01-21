# 🎯 SETUP CHO HỆ THỐNG 8GB RAM

## ✅ Cấu hình đã tối ưu cho bạn

File `.env` đã được set model **3B** - phù hợp nhất với RAM 8GB.

---

## 🚀 BƯỚC 1: Tăng Virtual Memory (BẮT BUỘC)

Với RAM 8GB, bạn **PHẢI** tăng Virtual Memory để load model 3B.

### Windows:

1. **Mở System Properties**
   - Nhấn `Windows + R`
   - Gõ: `sysdm.cpl`
   - Enter

2. **Vào Performance Settings**
   - Tab **Advanced**
   - Click **Settings** (trong phần Performance)

3. **Tăng Virtual Memory**
   - Tab **Advanced**
   - Click **Change** (trong phần Virtual Memory)
   - **Bỏ tick** "Automatically manage paging file size for all drives"
   - Chọn ổ C: (hoặc ổ có nhiều dung lượng nhất)
   - Chọn **Custom size**
   - Nhập:
     ```
     Initial size (MB): 12288  (12GB)
     Maximum size (MB): 16384  (16GB)
     ```
   - Click **Set**
   - Click **OK** tất cả các cửa sổ
   - **RESTART MÁY** (quan trọng!)

---

## 🚀 BƯỚC 2: Cài đặt Dependencies

```bash
cd ai-service
pip install -r requirements.txt
```

Quá trình này mất 5-10 phút.

---

## 🚀 BƯỚC 3: Chạy AI Service

```bash
python main.py
```

### Lần đầu chạy:
- Model sẽ download (~6GB)
- Mất 5-10 phút
- Chỉ download 1 lần duy nhất

### Các lần sau:
- Load từ cache
- Mất 30-60 giây

---

## 📊 Hiệu suất với RAM 8GB

### Model 3B (Đang dùng):
- ✅ **RAM usage**: ~6-7GB
- ✅ **Speed**: 5-7 giây/query
- ✅ **Accuracy**: Tốt (80-85%)
- ✅ **Recommended**: Cân bằng tốt

### So sánh với các options khác:

| Model | RAM | Speed | Accuracy | Phù hợp? |
|-------|-----|-------|----------|----------|
| 1.5B  | ~4GB | 2-3s  | 70-75%   | ✅ Nếu muốn nhanh |
| 3B    | ~6-7GB | 5-7s | 80-85%   | ✅✅ BEST cho 8GB RAM |
| 7B    | ~14GB | 10-15s | 90-95%  | ❌ Không đủ RAM |

---

## 💡 TIPS TỐI ƯU

### 1. Đóng các app không cần thiết
Trước khi chạy AI service:
- Đóng Chrome/Edge (nếu có nhiều tabs)
- Đóng IDE khác
- Đóng game, video player

### 2. Kiểm tra RAM usage
```bash
# Windows PowerShell
Get-Process | Sort-Object -Property WS -Descending | Select-Object -First 10
```

### 3. Nếu vẫn bị lỗi memory
Đổi sang model 1.5B:
```bash
python switch_model.py
# Chọn option 1
```

---

## ⚡ QUICK TEST

Sau khi service chạy, test ngay:

```bash
# Terminal mới
curl -X POST http://localhost:7000/query \
  -H "Content-Type: application/json" \
  -d "{\"question\":\"Có bao nhiêu người?\",\"dongHoId\":\"DH001\",\"execute\":false}"
```

Hoặc mở browser: http://localhost:7000/docs

---

## 🔍 Troubleshooting

### Lỗi: "Paging file too small"
→ Chưa restart máy sau khi tăng Virtual Memory
→ **RESTART MÁY** và thử lại

### Lỗi: "Out of memory"
→ Đóng các app khác
→ Hoặc đổi sang model 1.5B

### Model load chậm
→ Bình thường, lần đầu mất 5-10 phút
→ Kiểm tra internet (đang download model)

### Service crash khi generate
→ Giảm `MAX_LENGTH` trong `.env`:
```env
MAX_LENGTH=1024  # Thay vì 2048
```

---

## 📈 Monitoring RAM

Trong khi service chạy, mở Task Manager:
- Nhấn `Ctrl + Shift + Esc`
- Tab **Performance** → **Memory**
- Xem RAM usage

**Bình thường:**
- Idle: ~1-2GB
- Loading model: ~6-7GB
- Generating: ~7-8GB

**Nếu > 90% RAM:**
- Đóng app khác
- Hoặc dùng model 1.5B

---

## ✅ Checklist

- [ ] Tăng Virtual Memory (12-16GB)
- [ ] Restart máy
- [ ] Cài dependencies: `pip install -r requirements.txt`
- [ ] File `.env` đã set model 3B
- [ ] Đóng các app không cần thiết
- [ ] Chạy: `python main.py`
- [ ] Test: http://localhost:7000/docs

---

## 🎯 Kết luận

Với RAM 8GB + Virtual Memory 16GB:
- ✅ Model 3B sẽ chạy tốt
- ✅ Accuracy đủ cho production
- ✅ Speed chấp nhận được (5-7s/query)

**Nếu muốn nhanh hơn**: Dùng model 1.5B (2-3s/query)
**Nếu muốn chính xác hơn**: Cần upgrade RAM lên 16GB để dùng model 7B

---

**Good luck! 🚀**

