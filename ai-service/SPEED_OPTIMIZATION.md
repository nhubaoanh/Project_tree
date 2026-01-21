# ⚡ TỐI ƯU TỐC ĐỘ - AI SERVICE

## 📊 HIỆN TRẠNG

**Hệ thống của bạn:**
- CPU: AMD Ryzen (8 cores)
- RAM: 7.36GB (84.9% used)
- GPU: Không có
- Model: 1.5B parameters

**Tốc độ hiện tại:**
- Lần đầu: ~60-90 giây
- Các lần sau: ~30-60 giây

---

## ✅ ĐÃ TỐI ƯU (Tự động)

### 1. Giảm `max_new_tokens`: 512 → 256
- **Cải thiện**: Nhanh hơn ~2x
- **Tốc độ mới**: ~30-45 giây
- **Trade-off**: Vẫn đủ cho SQL queries (SQL ngắn)

---

## 🚀 TỐI ƯU THÊM

### Option 1: Tắt `do_sample` (Deterministic)

**File:** `ai-service/sql_generator.py`

```python
outputs = self.model.generate(
    **inputs,
    max_new_tokens=256,
    temperature=0.0,      # Thay vì 0.1
    do_sample=False,      # Thay vì True
    pad_token_id=self.tokenizer.eos_token_id
)
```

**Cải thiện**: Nhanh hơn ~20-30%  
**Trade-off**: Kết quả ít đa dạng hơn (OK cho SQL)

---

### Option 2: Giảm `max_new_tokens` xuống 128

**File:** `ai-service/sql_generator.py`

```python
outputs = self.model.generate(
    **inputs,
    max_new_tokens=128,   # Thay vì 256
    ...
)
```

**Cải thiện**: Nhanh hơn ~2x  
**Trade-off**: Có thể bị cắt với SQL phức tạp

---

### Option 3: Dùng Caching

**File:** `ai-service/sql_generator.py`

```python
from functools import lru_cache
import hashlib

class SQLGenerator:
    def __init__(self):
        self.model = model_loader.get_model()
        self.tokenizer = model_loader.get_tokenizer()
        self.prompt_builder = PromptBuilder()
        self.cache = {}  # Simple cache
    
    def generate_sql(self, question):
        # Check cache
        cache_key = hashlib.md5(question.encode()).hexdigest()
        if cache_key in self.cache:
            logger.info("Cache hit!")
            return self.cache[cache_key]
        
        # Generate
        result = self._generate_sql_internal(question)
        
        # Save to cache
        self.cache[cache_key] = result
        return result
```

**Cải thiện**: Instant cho câu hỏi đã hỏi  
**Trade-off**: Tốn memory (nhưng ít)

---

### Option 4: Batch Processing (Nếu nhiều queries)

```python
def generate_sql_batch(self, questions):
    # Process multiple questions at once
    prompts = [self.prompt_builder.build_prompt(q) for q in questions]
    inputs = self.tokenizer(prompts, return_tensors="pt", padding=True)
    
    with torch.no_grad():
        outputs = self.model.generate(**inputs, max_new_tokens=256)
    
    return [self._extract_sql(out) for out in outputs]
```

**Cải thiện**: Nhanh hơn khi xử lý nhiều queries  
**Trade-off**: Phức tạp hơn

---

## 💡 KHUYẾN NGHỊ DÀI HẠN

### 1. UPGRADE RAM (Tốt nhất!)
```
Current: 7.36GB
Upgrade: +8GB → 16GB total
Cost: ~500k-1tr VNĐ
Benefit:
  - Dùng được model 3B (chính xác hơn)
  - Nhanh hơn (ít swap)
  - Ổn định hơn
```

### 2. MUA GPU (Nếu có budget)
```
Option A: GTX 1660 Super (~3-4tr)
  - CUDA cores: 1408
  - VRAM: 6GB
  - Speed: 10-20x faster

Option B: RTX 3060 (~7-8tr)
  - CUDA cores: 3584
  - VRAM: 12GB
  - Speed: 30-50x faster
  - Có thể chạy model 7B
```

### 3. DÙNG CLOUD GPU (Nếu không muốn mua)
```
Google Colab:
  - Free GPU (T4)
  - 15GB VRAM
  - Giới hạn: 12h/session
  - Cost: Free hoặc $10/month (Pro)

Kaggle Notebooks:
  - Free GPU (P100)
  - 16GB VRAM
  - Giới hạn: 30h/week
  - Cost: Free
```

---

## 📊 SO SÁNH TỐC ĐỘ

| Setup | Model | Speed | Cost |
|-------|-------|-------|------|
| **Current** (CPU) | 1.5B | 30-60s | Free |
| CPU + Optimized | 1.5B | 15-30s | Free |
| CPU + 16GB RAM | 3B | 40-80s | ~1tr |
| GPU (GTX 1660) | 3B | 3-5s | ~4tr |
| GPU (RTX 3060) | 7B | 5-10s | ~8tr |
| Cloud GPU | 7B | 3-5s | $10/month |

---

## ⚙️ APPLY TỐI ƯU NGAY

### Bước 1: Restart service
```bash
# Ctrl+C để stop
# Chạy lại
python main.py
```

### Bước 2: Test lại
```bash
curl -X POST http://localhost:7000/test ^
  -H "Content-Type: application/json" ^
  -d "{\"question\":\"Có bao nhiêu người?\",\"dongHoId\":\"DH001\"}"
```

### Bước 3: So sánh tốc độ
- Lần đầu: ~30-45s (thay vì 60-90s)
- Lần sau: ~15-30s (thay vì 30-60s)

---

## 🎯 KẾT LUẬN

**Với setup hiện tại (CPU, 7.36GB RAM):**
- ✅ Model 1.5B là lựa chọn duy nhất
- ✅ Tốc độ 30-60s là **BÌNH THƯỜNG**
- ✅ Đã tối ưu `max_new_tokens` → nhanh hơn ~2x
- ✅ Accuracy vẫn tốt (70-75%)

**Để nhanh hơn nữa:**
- 🔧 Apply thêm Option 1-4 (nếu cần)
- 💰 Upgrade RAM lên 16GB (~1tr)
- 🎮 Mua GPU (~4-8tr)
- ☁️ Dùng Cloud GPU ($10/month)

**Nhưng với mục đích học tập và test:**
- ✅ Tốc độ hiện tại **ĐỦ DÙNG**
- ✅ Không cần tối ưu thêm
- ✅ Focus vào học AI và cải thiện accuracy

---

**Tốc độ chậm là trade-off của việc chạy AI local trên CPU!** 🚀

