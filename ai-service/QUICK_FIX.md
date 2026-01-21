# ⚡ QUICK FIX - Paging File Error

## ❌ Lỗi bạn đang gặp:
```
OSError: The paging file is too small for this operation to complete.
```

## ✅ GIẢI PHÁP NHANH (5 phút)

### Bước 1: Dùng model nhỏ hơn

```bash
# Mở file .env
# Thay đổi dòng này:
MODEL_NAME=Qwen/Qwen2.5-Coder-1.5B-Instruct
```

Hoặc chạy:
```bash
python switch_model.py
# Chọn option 1
```

### Bước 2: Chạy lại

```bash
python main.py
```

**Done!** Model 1.5B chỉ cần ~4GB RAM, sẽ load được.

---

## 🔧 GIẢI PHÁP DÀI HẠN (Nếu muốn dùng model 7B)

### 1. Tăng Virtual Memory

**Windows:**
1. `Windows + R` → gõ `sysdm.cpl` → Enter
2. Tab **Advanced** → **Settings** (Performance)
3. Tab **Advanced** → **Change** (Virtual Memory)
4. Bỏ tick "Automatically manage"
5. Chọn ổ C:
6. Chọn **Custom size**:
   - Initial: `16384` (16GB)
   - Maximum: `32768` (32GB)
7. Click **Set** → **OK**
8. **Restart máy**

### 2. Đổi lại model 7B

```bash
# Trong .env
MODEL_NAME=Qwen/Qwen2.5-Coder-7B-Instruct
```

### 3. Chạy lại

```bash
python main.py
```

---

## 📊 So sánh Models

| Model | RAM cần | Tốc độ | Độ chính xác |
|-------|---------|--------|--------------|
| 1.5B  | ~4GB    | Nhanh  | Tốt          |
| 3B    | ~8GB    | Trung bình | Tốt hơn  |
| 7B    | ~14GB   | Chậm   | Tốt nhất     |

**Khuyến nghị:**
- RAM < 8GB → Dùng 1.5B
- RAM 8-16GB → Dùng 3B
- RAM > 16GB → Dùng 7B

---

## 🎯 Kiểm tra hệ thống

```bash
python check_system.py
```

Script này sẽ:
- Hiển thị RAM hiện tại
- Kiểm tra GPU
- Khuyến nghị model phù hợp

---

## ❓ Vẫn lỗi?

1. **Đảm bảo đã restart máy** sau khi tăng Virtual Memory
2. **Đóng các app khác** đang chạy
3. **Kiểm tra ổ đĩa** còn ít nhất 32GB free
4. **Dùng model 1.5B** - chắc chắn sẽ chạy được

---

## 📞 Cần trợ giúp?

Xem file `FIX_MEMORY_ERROR.md` để biết thêm chi tiết.

