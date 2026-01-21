# 🚨 URGENT FIX - RAM 7.36GB (84.9% Used)

## ⚠️ TÌNH TRẠNG HIỆN TẠI

```
Total RAM: 7.36 GB
Used: 6.26 GB (84.9%)
Available: 1.11 GB ← Quá thấp!
```

**Vấn đề**: RAM gần hết, không thể load model 3B (cần ~6-8GB)

---

## ✅ GIẢI PHÁP NGAY LẬP TỨC

### Bước 1: ĐÓNG CÁC ỨNG DỤNG ĐANG CHẠY

Mở Task Manager (`Ctrl + Shift + Esc`) và đóng:

- ❌ Chrome/Edge (nếu có nhiều tabs)
- ❌ Visual Studio Code (nếu mở nhiều projects)
- ❌ Docker Desktop
- ❌ Game clients (Steam, Epic, etc.)
- ❌ Video players
- ❌ Spotify/Music apps
- ❌ Các app không cần thiết

**Mục tiêu**: Giải phóng ít nhất 2-3GB RAM

---

### Bước 2: TĂNG VIRTUAL MEMORY (BẮT BUỘC!)

1. `Windows + R` → gõ `sysdm.cpl` → Enter
2. Tab **Advanced** → **Settings** (Performance)
3. Tab **Advanced** → **Change** (Virtual Memory)
4. **Bỏ tick** "Automatically manage paging file size for all drives"
5. Chọn ổ C: (hoặc ổ có nhiều dung lượng)
6. Chọn **Custom size**:
   ```
   Initial size (MB): 16384  (16GB)
   Maximum size (MB): 24576  (24GB)
   ```
7. Click **Set** → **OK**
8. **RESTART MÁY** ← Rất quan trọng!

---

### Bước 3: SỬ DỤNG MODEL 1.5B

File `.env` đã được cập nhật sang model 1.5B (nhẹ nhất).

**Model 1.5B:**
- RAM cần: ~3-4GB
- Tốc độ: Nhanh (2-3s/query)
- Độ chính xác: Tốt (70-75%)
- ✅ Phù hợp với RAM 7.36GB

---

### Bước 4: CHẠY AI SERVICE

```bash
cd ai-service
python main.py
```

**Lần đầu:**
- Download model 1.5B (~3GB)
- Mất 3-5 phút
- Nhẹ hơn model 3B nhiều

---

## 📊 SO SÁNH VỚI HỆ THỐNG CỦA BẠN

| Model | RAM cần | RAM còn lại | Có chạy được? |
|-------|---------|-------------|---------------|
| 1.5B  | ~4GB    | ~3GB        | ✅ CÓ         |
| 3B    | ~6-8GB  | ~0GB        | ❌ KHÔNG      |
| 7B    | ~14GB   | Âm          | ❌ KHÔNG      |

**Kết luận**: Chỉ có model 1.5B mới chạy được!

---

## 🔍 KIỂM TRA LẠI RAM

Sau khi đóng các app, chạy lại:

```bash
python check_system.py
```

**Mục tiêu**: Available RAM > 3GB

---

## 💡 TỐI ƯU DÀI HẠN

### Option 1: Upgrade RAM (Khuyên dùng!)
- Mua thêm 8GB RAM → Tổng 16GB
- Chi phí: ~500k-1tr VNĐ
- Có thể dùng model 3B hoặc 7B

### Option 2: Tối ưu Windows
```bash
# Disable startup apps
1. Task Manager → Startup
2. Disable các app không cần thiết

# Clean up
1. Disk Cleanup
2. Uninstall unused apps
3. Disable Windows Search indexing (nếu không dùng)
```

### Option 3: Dùng Cloud GPU (Nếu cần model tốt hơn)
- Google Colab (Free GPU)
- Kaggle Notebooks (Free GPU)
- AWS/Azure (Paid)

---

## ⚡ QUICK CHECKLIST

Trước khi chạy AI service:

- [ ] Đóng Chrome/Edge
- [ ] Đóng IDE khác
- [ ] Đóng Docker
- [ ] Đóng game clients
- [ ] Tăng Virtual Memory → 16-24GB
- [ ] Restart máy
- [ ] File `.env` đã set model 1.5B
- [ ] Available RAM > 3GB

---

## 🎯 KẾT QUẢ MONG ĐỢI

Sau khi làm theo:

```
Before:
RAM: 7.36 GB
Used: 6.26 GB (84.9%)
Available: 1.11 GB ← Quá thấp

After (đóng apps):
RAM: 7.36 GB
Used: 3-4 GB (40-50%)
Available: 3-4 GB ← OK!

After (load model 1.5B):
RAM: 7.36 GB
Used: 6-7 GB (80-90%)
Available: 0.5-1 GB ← Vẫn chạy được
```

---

## ❌ NẾU VẪN LỖI

### Lỗi: "Paging file too small"
→ Chưa restart máy sau khi tăng Virtual Memory
→ **RESTART MÁY** và thử lại

### Lỗi: "Out of memory"
→ Đóng thêm app khác
→ Kiểm tra Task Manager xem app nào ăn RAM nhiều

### Model vẫn không load được
→ Kiểm tra Virtual Memory đã tăng chưa:
```bash
python check_virtual_memory.py
```

---

## 📞 SUPPORT

Nếu vẫn gặp vấn đề, cung cấp thông tin:
1. Screenshot Task Manager (Performance → Memory)
2. Output của `python check_virtual_memory.py`
3. Error message đầy đủ

---

**TÓM TẮT**: 
1. Đóng app → Giải phóng RAM
2. Tăng Virtual Memory → 16-24GB
3. Restart máy
4. Dùng model 1.5B (đã set sẵn)
5. Chạy `python main.py`

**Good luck! 🚀**

