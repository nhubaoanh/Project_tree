# 🚀 BẮT ĐẦU TẠI ĐÂY - RAM 8GB

## ✅ Bạn có RAM 8GB - Hoàn hảo cho model 3B!

---

## 📋 CHECKLIST - LÀM THEO THỨ TỰ

### ☑️ Bước 1: Kiểm tra Virtual Memory (5 phút)

```bash
python check_virtual_memory.py
```

**Nếu Virtual Memory < 12GB:**

1. Nhấn `Windows + R`
2. Gõ: `sysdm.cpl` → Enter
3. Tab **Advanced** → **Settings** (Performance)
4. Tab **Advanced** → **Change** (Virtual Memory)
5. Bỏ tick "Automatically manage"
6. Chọn ổ C:
7. Chọn **Custom size**:
   ```
   Initial size: 12288
   Maximum size: 16384
   ```
8. Click **Set** → **OK**
9. **RESTART MÁY** ← Quan trọng!

---

### ☑️ Bước 2: Kiểm tra hệ thống (1 phút)

```bash
python check_system.py
```

Script này sẽ hiển thị:
- RAM hiện tại
- CPU info
- GPU (nếu có)
- Khuyến nghị model

---

### ☑️ Bước 3: Cài đặt dependencies (5-10 phút)

```bash
pip install -r requirements.txt
```

**Hoặc dùng script tự động:**

```bash
start.bat
```

---

### ☑️ Bước 4: Chạy AI Service

```bash
python main.py
```

**Lần đầu:**
- Download model 3B (~6GB)
- Mất 5-10 phút
- Cần internet tốt

**Các lần sau:**
- Load từ cache
- Mất 30-60 giây

---

## 🎯 Khi service đã chạy

### Test API:

**Browser:** http://localhost:7000/docs

**Hoặc curl:**
```bash
curl -X POST http://localhost:7000/query ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"Có bao nhiêu người?\",\"dongHoId\":\"DH001\",\"execute\":false}"
```

---

## ❌ Nếu gặp lỗi

### Lỗi: "Paging file too small"

**Nguyên nhân:** Chưa tăng Virtual Memory hoặc chưa restart

**Giải pháp:**
1. Tăng Virtual Memory (xem Bước 1)
2. **RESTART MÁY**
3. Chạy lại

**Hoặc dùng model nhỏ hơn:**
```bash
python switch_model.py
# Chọn option 1 (1.5B)
```

---

### Lỗi: "Out of memory"

**Giải pháp:**
1. Đóng Chrome/Edge
2. Đóng IDE khác
3. Đóng game, video player
4. Chạy lại

**Hoặc:**
```bash
python switch_model.py
# Chọn option 1 (1.5B)
```

---

### Model load chậm

**Bình thường!**
- Lần đầu: 5-10 phút (download)
- Lần sau: 30-60 giây (load)

Kiểm tra internet nếu quá lâu.

---

## 📊 Hiệu suất mong đợi

Với RAM 8GB + Model 3B:

| Metric | Value |
|--------|-------|
| RAM usage | ~6-7GB |
| Load time | 30-60s |
| Query time | 5-7s |
| Accuracy | 80-85% |

---

## 🔄 Đổi model

```bash
python switch_model.py
```

**Options:**
1. **1.5B** - Nhanh (2-3s), RAM 4GB
2. **3B** - Cân bằng (5-7s), RAM 6-8GB ← Đang dùng
3. **7B** - Chính xác (10-15s), RAM 14GB ← Không đủ RAM

---

## 📖 Tài liệu chi tiết

- `SETUP_8GB_RAM.md` - Hướng dẫn chi tiết cho 8GB RAM
- `FIX_MEMORY_ERROR.md` - Fix lỗi memory
- `README.md` - Tài liệu đầy đủ
- `QUICK_FIX.md` - Fix nhanh

---

## 🎓 Học AI

Xem file `AI_LEARNING_ROADMAP.md` ở thư mục gốc để học AI từ cơ bản đến nâng cao trong 3 tháng!

---

## ✅ TÓM TẮT

1. ✅ Tăng Virtual Memory → 12-16GB
2. ✅ Restart máy
3. ✅ `pip install -r requirements.txt`
4. ✅ `python main.py`
5. ✅ Test: http://localhost:7000/docs

**Chúc bạn thành công! 🚀**

