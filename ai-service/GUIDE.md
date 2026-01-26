# 🤖 AI SERVICE - HƯỚNG DẪN SỬ DỤNG

## 🎯 AI Service Là Gì?

Chuyển câu hỏi tiếng Việt → SQL query

**Ví dụ:**
```
Input:  "Có bao nhiêu người trong gia phả?"
Output: "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ?"
```

---

## ⚡ CHẠY NHANH (5 PHÚT)

### 1. Cài đặt
```bash
cd ai-service
pip install -r requirements.txt
```

### 2. Cấu hình `.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=treefamily
API_PORT=7000
```

### 3. Chạy
```bash
python main.py
```

**Server chạy tại:** `http://localhost:7000`

---

## 📡 API ENDPOINTS

### 1. Health Check
```bash
curl http://localhost:7000/health
```

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "db_connected": true
}
```

### 2. Hỏi Câu Hỏi
```bash
curl -X POST http://localhost:7000/ask \
  -H "Content-Type: application/json" \
  -d '{
    "question": "Có bao nhiêu người trong gia phả?",
    "dongHoId": "xxx",
    "execute": true
  }'
```

**Response:**
```json
{
  "success": true,
  "question": "Có bao nhiêu người trong gia phả?",
  "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ?",
  "confidence": "95.0%",
  "results": [{"COUNT(*)": 150}],
  "total_rows": 1,
  "message": "Tìm thấy 1 kết quả"
}
```

### 3. Xem Câu Hỏi Đã Thu Thập
```bash
curl http://localhost:7000/logs/questions
```

### 4. Xem Kết Quả Query
```bash
curl http://localhost:7000/logs/results
```

---

## 📁 CẤU TRÚC FILES

```
ai-service/
├── main.py                      ← API Server (chạy file này)
├── model_loader_finetuned.py    ← Load model đã train
├── sql_generator.py             ← Generate SQL
├── query_executor.py            ← Execute SQL
├── prompt_builder.py            ← Build prompt
├── config.py                    ← Config
├── .env                         ← Biến môi trường
├── requirements.txt             ← Dependencies
│
├── models/                      ← Base model (3GB - auto download)
├── finetuned_model/             ← Model đã train (16.7MB)
├── dataset/                     ← Training data
└── logs/                        ← User questions
```

---

## 🎓 TRAINING MODEL

### Tại Sao Phải Train?

**Trước train:**
- Model không biết tên table
- SQL sai hoặc không chạy
- Độ chính xác: 60-70%

**Sau train:**
- Model nhớ schema database
- SQL chính xác
- Độ chính xác: 90-95% ✅

### Cách Train (Colab)

#### 1. Chuẩn bị dataset
File `dataset/member.json`:
```json
[
  {
    "question": "Có bao nhiêu người?",
    "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ?"
  }
]
```

#### 2. Upload lên Colab
```python
from google.colab import files
uploaded = files.upload()  # Chọn member.json
```

#### 3. Chạy training script
```python
# Install
!pip install transformers peft datasets torch

# Load model
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("Qwen/Qwen2.5-Coder-1.5B-Instruct")
tokenizer = AutoTokenizer.from_pretrained("Qwen/Qwen2.5-Coder-1.5B-Instruct")

# Apply LoRA
from peft import LoraConfig, get_peft_model
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
    lora_dropout=0.05
)
model = get_peft_model(model, lora_config)

# Train
from transformers import Trainer, TrainingArguments
trainer = Trainer(
    model=model,
    args=TrainingArguments(
        output_dir="./finetuned_model",
        num_train_epochs=10,  # Tăng nếu loss vẫn cao
        per_device_train_batch_size=1,
        learning_rate=2e-4
    ),
    train_dataset=dataset
)
trainer.train()

# Save
model.save_pretrained("./finetuned_model")
tokenizer.save_pretrained("./finetuned_model")
```

#### 4. Download
```python
!zip -r finetuned_model.zip finetuned_model/
from google.colab import files
files.download('finetuned_model.zip')
```

#### 5. Copy vào project
```bash
unzip finetuned_model.zip
cp -r finetuned_model/ ai-service/
```

### Kiểm Tra Training

**Training log tốt:**
```
Epoch 1: loss = 0.699
Epoch 5: loss = 0.187
Epoch 10: loss = 0.112  ← Tốt! (< 0.15)
```

**Training log xấu:**
```
Epoch 1: loss = 0.699
Epoch 3: loss = 0.650  ← Không giảm!
```

**Nếu loss không giảm:**
- Tăng epochs (10 → 20)
- Tăng learning_rate (2e-4 → 5e-4)
- Kiểm tra dataset có đúng không

---

## 🧠 CÁCH HOẠT ĐỘNG

### 1. Load Model
```
Base Model (3GB) + LoRA Adapter (16.7MB) = Model đã train
```

**LoRA là gì?**
- Chỉ train 0.1% parameters (tiết kiệm RAM)
- File nhỏ (16.7MB thay vì 3GB)
- Chạy được trên máy yếu

### 2. Generate SQL
```
User: "Có bao nhiêu người?"
  ↓
Prompt Builder: Tạo prompt với schema + examples
  ↓
Model: Generate SQL
  ↓
SQL: "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ?"
```

### 3. Execute SQL
```
SQL + Parameters → MySQL → Results
```

### 4. Log
```
Lưu câu hỏi vào logs/questions.txt
Lưu kết quả vào logs/query_results.jsonl
```

---

## 🔧 TROUBLESHOOTING

### Lỗi: Port 7000 đã dùng
```bash
# Windows
netstat -ano | findstr :7000
taskkill /PID <pid> /F

# Hoặc đổi port trong .env
API_PORT=7001
```

### Lỗi: Model không load
```bash
# Kiểm tra folder
ls finetuned_model/

# Phải có 10 files, trong đó:
# - adapter_model.safetensors (> 10 MB)
# - adapter_config.json
# - tokenizer.json
```

### Lỗi: RAM không đủ
**Giải pháp:**
1. Đóng các app khác
2. Tăng virtual memory (Windows)
3. Chạy trên Colab

### Lỗi: SQL sai
**Giải pháp:**
1. Thêm câu hỏi vào `dataset/member.json`
2. Train lại model
3. Test lại

---

## 💡 TIPS

### Cải Thiện Độ Chính Xác

1. **Thu thập câu hỏi thực tế**
   ```bash
   curl http://localhost:7000/logs/questions
   ```

2. **Thêm vào dataset**
   ```json
   {
     "question": "Câu hỏi từ user",
     "sql": "SQL đúng"
   }
   ```

3. **Train lại**
   - Upload lên Colab
   - Chạy training script
   - Download model mới

### Tăng Epochs Khi Nào?

**NÊN tăng khi:**
- Loss vẫn cao (> 0.3) sau 3 epochs
- Loss vẫn giảm đều
- Không có overfitting

**KHÔNG nên tăng khi:**
- Loss đã thấp (< 0.15)
- Loss không giảm nữa
- Loss tăng lại (overfitting)

---

## 📊 PERFORMANCE

### Load Time
- Lần đầu: 2-3 phút (download base model)
- Lần sau: 10-20 giây (từ cache)

### Query Time
- **Lần 1:** 2-4 giây (generate mới)
- **Lần 2+:** 0.01 giây (từ cache) ⚡
- Simple query: 1-2 giây
- Complex query: 2-4 giây

### Accuracy
- Simple questions: 95-100%
- Complex questions: 85-95%
- Overall: 90-95%

### Tối Ưu Đã Áp Dụng
- ✅ Tắt `sqlparse.format()` (nhanh 0.5-1s)
- ✅ Giảm `max_new_tokens` 512→128 (nhanh 2x)
- ✅ Optimize generate params (nhanh 0.5-1s)
- ✅ Cache câu hỏi (nhanh 200x lần 2+)

**Xem chi tiết:** [PERFORMANCE.md](PERFORMANCE.md)

---

## 🔄 MAINTENANCE

### Hàng Ngày
- Kiểm tra service health
- Monitor logs

### Hàng Tuần
- Backup logs
- Review câu hỏi phổ biến

### Hàng Tháng
- Export dataset
- Train lại nếu có nhiều câu hỏi mới
- Backup model

---

## 📚 TÀI LIỆU THAM KHẢO

- **Transformers:** https://huggingface.co/docs/transformers
- **PEFT (LoRA):** https://huggingface.co/docs/peft
- **Qwen Model:** https://huggingface.co/Qwen

---

**Enjoy! 🚀**
