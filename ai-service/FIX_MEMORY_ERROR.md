# 🔧 FIX: Paging File Too Small Error

## Lỗi
```
OSError: The paging file is too small for this operation to complete. (os error 1455)
```

## Nguyên nhân
Model Qwen2.5-Coder-7B-Instruct (7 billion parameters) cần ~14GB RAM để load, nhưng Windows paging file (virtual memory) quá nhỏ.

---

## ✅ GIẢI PHÁP 1: Tăng Virtual Memory (KHUYÊN DÙNG)

### Bước 1: Mở System Properties
1. Nhấn `Windows + R`
2. Gõ `sysdm.cpl` và Enter
3. Chọn tab **Advanced**
4. Click **Settings** trong phần Performance

### Bước 2: Tăng Virtual Memory
1. Chọn tab **Advanced**
2. Click **Change** trong phần Virtual Memory
3. **Bỏ tick** "Automatically manage paging file size for all drives"
4. Chọn ổ đĩa (thường là C:)
5. Chọn **Custom size**:
   - **Initial size**: 16384 MB (16GB)
   - **Maximum size**: 32768 MB (32GB)
6. Click **Set**
7. Click **OK**
8. **Restart máy tính**

### Bước 3: Chạy lại AI Service
```bash
cd ai-service
python main.py
```

---

## ✅ GIẢI PHÁP 2: Dùng Model Nhỏ Hơn

Nếu máy RAM thấp (<16GB), dùng model nhỏ hơn:

### Option A: Qwen2.5-Coder-1.5B (Nhẹ nhất)
```python
# ai-service/.env
MODEL_NAME=Qwen/Qwen2.5-Coder-1.5B-Instruct
```

### Option B: Qwen2.5-Coder-3B
```python
# ai-service/.env
MODEL_NAME=Qwen/Qwen2.5-Coder-3B-Instruct
```

### So sánh models:

| Model | Parameters | RAM cần | Tốc độ | Accuracy |
|-------|-----------|---------|--------|----------|
| 1.5B  | 1.5B      | ~4GB    | Nhanh  | Thấp     |
| 3B    | 3B        | ~8GB    | Trung bình | Trung bình |
| 7B    | 7B        | ~14GB   | Chậm   | Cao      |

---

## ✅ GIẢI PHÁP 3: Load Model với 8-bit Quantization

Giảm memory xuống 50%:

```python
# ai-service/model_loader.py
from transformers import AutoModelForCausalLM, BitsAndBytesConfig

quantization_config = BitsAndBytesConfig(
    load_in_8bit=True,
    llm_int8_threshold=6.0
)

self._model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    cache_dir=MODEL_CACHE_DIR,
    quantization_config=quantization_config,
    device_map="auto",
    trust_remote_code=True
)
```

**Cài đặt thêm:**
```bash
pip install bitsandbytes
```

---

## ✅ GIẢI PHÁP 4: Load Model từng phần (Device Map)

```python
# ai-service/model_loader.py
self._model = AutoModelForCausalLM.from_pretrained(
    MODEL_NAME,
    cache_dir=MODEL_CACHE_DIR,
    device_map="auto",  # Tự động phân bổ
    low_cpu_mem_usage=True,  # Giảm RAM usage
    torch_dtype=torch.float16,
    trust_remote_code=True
)
```

---

## 🎯 KHUYẾN NGHỊ

### Nếu RAM < 16GB:
1. **Tăng Virtual Memory** (Giải pháp 1)
2. **Dùng model 1.5B hoặc 3B** (Giải pháp 2)

### Nếu RAM >= 16GB:
1. **Tăng Virtual Memory** (Giải pháp 1)
2. Giữ nguyên model 7B

### Nếu có GPU:
1. Cài CUDA: https://developer.nvidia.com/cuda-downloads
2. Set `DEVICE=cuda` trong `.env`
3. Model sẽ load lên GPU (nhanh hơn nhiều)

---

## 📊 Kiểm tra RAM hiện tại

```bash
# Windows PowerShell
Get-WmiObject Win32_ComputerSystem | Select-Object TotalPhysicalMemory

# Hoặc
systeminfo | findstr /C:"Total Physical Memory"
```

---

## ❓ Troubleshooting

### Lỗi vẫn còn sau khi tăng Virtual Memory?
- Đảm bảo đã **restart máy**
- Kiểm tra ổ đĩa còn đủ dung lượng (cần ít nhất 32GB free)
- Đóng các ứng dụng khác đang chạy

### Model load chậm?
- Bình thường, lần đầu load model 7B mất 2-5 phút
- Các lần sau nhanh hơn (đã cache)

### Out of Memory khi generate?
- Giảm `max_new_tokens` trong config
- Dùng `torch.float16` thay vì `float32`
- Dùng 8-bit quantization

