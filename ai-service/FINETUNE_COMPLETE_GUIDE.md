# 🎓 HƯỚNG DẪN FINE-TUNE MODEL - CHI TIẾT TỪ A-Z

## 📚 MỤC LỤC

1. [Fine-tune là gì?](#fine-tune-là-gì)
2. [Tại sao cần fine-tune?](#tại-sao-cần-fine-tune)
3. [Cách hoạt động](#cách-hoạt-động)
4. [Chuẩn bị dataset](#chuẩn-bị-dataset)
5. [Fine-tune step by step](#fine-tune-step-by-step)
6. [Đánh giá model](#đánh-giá-model)
7. [Deploy model mới](#deploy-model-mới)

---

## 🤔 FINE-TUNE LÀ GÌ?

### Định nghĩa đơn giản:

```
Pre-trained Model (Model gốc)
    ↓
+ Your Data (Data của bạn)
    ↓
= Fine-tuned Model (Model đã học thêm)
```

### Ví dụ dễ hiểu:

```
Giống như học sinh:

Pre-trained: Học sinh đã học toán cơ bản (1+1=2, 2+2=4)
Fine-tune: Học thêm toán nâng cao (phương trình, đạo hàm)
Result: Học sinh giỏi toán hơn

Model cũng vậy:

Pre-trained: Model đã biết SQL cơ bản
Fine-tune: Học thêm SQL của dòng họ bạn
Result: Model hiểu câu hỏi của bạn tốt hơn
```

---

## 🎯 TẠI SAO CẦN FINE-TUNE?

### So sánh Pre-trained vs Fine-tuned:

| Tiêu chí | Pre-trained | Fine-tuned |
|----------|-------------|------------|
| **Accuracy** | 70-75% | 85-95% |
| **Hiểu thuật ngữ riêng** | ❌ Không | ✅ Có |
| **Xử lý câu phức tạp** | ⚠️ Trung bình | ✅ Tốt |
| **Setup time** | 5 phút | 2-3 giờ |
| **Cần dataset** | Không | 100-500 examples |

### Ví dụ cụ thể:

```python
# Pre-trained model
Question: "Có bao nhiêu người trong gia phả?"
SQL: "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ?"
Accuracy: 75% ✅

Question: "Ai là cháu nội của Nguyễn Văn A?"
SQL: "SELECT hoTen FROM thanhvien WHERE chaId = ..."  ❌ SAI!
# Model không hiểu "cháu nội" = con của con trai

# Fine-tuned model (đã học thêm)
Question: "Ai là cháu nội của Nguyễn Văn A?"
SQL: "SELECT c.hoTen FROM thanhvien c 
      JOIN thanhvien p ON c.chaId = p.thanhVienId 
      WHERE p.chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A')
      AND p.gioiTinh = 1"  ✅ ĐÚNG!
# Model đã học: cháu nội = con của con trai (gioiTinh = 1)
```

---

## 🔍 CÁCH HOẠT ĐỘNG

### Sơ đồ tổng quan:

```
1. Pre-trained Model (Qwen 1.5B)
   Đã học từ internet (code, text, SQL...)
   Weights: 3.5GB
   ↓
2. Your Dataset
   100-500 câu hỏi + SQL của dòng họ bạn
   ↓
3. Fine-tuning Process
   Model học thêm từ dataset của bạn
   Update weights (chỉ 1 phần nhỏ)
   ↓
4. Fine-tuned Model
   Weights: 3.5GB + 50-200MB (LoRA adapter)
   Hiểu câu hỏi của bạn tốt hơn
```

### Chi tiết kỹ thuật:

#### 1. Pre-trained Model

```python
# Model gốc có 1.5 tỷ parameters
model = {
    "layer_1": {
        "weights": [...],  # 100M parameters
        "bias": [...]
    },
    "layer_2": {...},
    ...
    "layer_32": {...}
}

# Mỗi parameter là 1 số (weight)
# Ví dụ: weight[0][0] = 0.5234
```

**Tại sao có 1.5 tỷ parameters?**
```
Model càng lớn → càng thông minh
Nhưng cũng → càng chậm, càng tốn RAM

1.5B: Vừa đủ thông minh, vừa chạy được trên CPU
7B: Thông minh hơn, nhưng cần GPU
```

#### 2. Fine-tuning (Full vs LoRA)

**Full Fine-tuning (Không khuyến nghị):**
```python
# Update TẤT CẢ 1.5 tỷ parameters
for param in model.parameters():
    param.requires_grad = True  # Cho phép update

# Train
for epoch in range(3):
    for batch in dataset:
        loss = model(batch)
        loss.backward()  # Tính gradient
        optimizer.step()  # Update weights

# Kết quả:
# - Tốn RAM: 14GB (model) + 14GB (gradients) = 28GB
# - Tốn thời gian: 2-3 giờ
# - File output: 3.5GB (toàn bộ model mới)
```

**LoRA Fine-tuning (Khuyến nghị):**
```python
# Chỉ update 1 phần nhỏ (0.1% parameters)
# Thêm "adapter" layers

model_original = load_pretrained_model()  # 1.5B params
adapter = LoRAAdapter(rank=16)            # 1.5M params (0.1%)

# Train chỉ adapter
for param in model_original.parameters():
    param.requires_grad = False  # Freeze

for param in adapter.parameters():
    param.requires_grad = True   # Train

# Kết quả:
# - Tốn RAM: 4GB (model) + 500MB (adapter) = 4.5GB
# - Tốn thời gian: 30-60 phút
# - File output: 50-200MB (chỉ adapter)
```

**Tại sao LoRA tốt hơn?**
```
Full Fine-tuning:
✅ Accuracy cao nhất
❌ Tốn RAM (28GB)
❌ Tốn thời gian (2-3 giờ)
❌ File lớn (3.5GB)

LoRA:
✅ Accuracy gần bằng (chỉ kém 1-2%)
✅ Ít RAM (4.5GB)
✅ Nhanh (30-60 phút)
✅ File nhỏ (50-200MB)
```

#### 3. Cách LoRA hoạt động

```python
# Model gốc
output = W * input  # W: weight matrix (1000x1000)

# LoRA thêm 2 ma trận nhỏ
output = W * input + (A * B) * input
# A: 1000x16 (rank=16)
# B: 16x1000
# A*B ≈ W_update (xấp xỉ update của W)

# Khi inference:
W_new = W + A * B  # Merge adapter vào model
output = W_new * input
```

**Tại sao rank=16?**
```
rank=4: Nhanh nhất, accuracy thấp nhất
rank=8: Cân bằng
rank=16: Khuyến nghị (accuracy tốt, vẫn nhanh)
rank=32: Accuracy cao nhất, chậm hơn
```

---

## 📊 CHUẨN BỊ DATASET

### Bước 1: Thu thập câu hỏi thực tế

**Nguồn:**
- User thực tế hỏi gì?
- Các câu hỏi phổ biến?
- Các câu hỏi khó?

**Cách thu thập:**

```python
# Thêm logging vào main.py
@app.post("/ask")
async def ask(request: QueryRequest):
    # Log câu hỏi
    with open('logs/questions.txt', 'a', encoding='utf-8') as f:
        timestamp = datetime.now().isoformat()
        f.write(f"{timestamp}|{request.question}\n")
    
    # ... existing code
```

**Sau 1-2 tuần:**
```
logs/questions.txt:
2026-01-25T10:30:00|Có bao nhiêu người trong gia phả?
2026-01-25T10:35:00|Nguyễn Văn A sinh năm nào?
2026-01-25T10:40:00|Ai là con của Trần Thị B?
...
(100-500 câu hỏi)
```

### Bước 2: Tạo SQL cho mỗi câu hỏi

**File:** `ai-service/dataset/questions.json`

```json
[
  {
    "id": 1,
    "question": "Có bao nhiêu người trong gia phả?",
    "sql": "SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
    "category": "easy",
    "verified": true,
    "notes": "Câu hỏi cơ bản, COUNT"
  },
  {
    "id": 2,
    "question": "Nguyễn Văn A sinh năm nào?",
    "sql": "SELECT YEAR(ngaySinh) as nam_sinh FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1",
    "category": "easy",
    "verified": true,
    "notes": "Truy vấn thông tin cơ bản"
  },
  {
    "id": 3,
    "question": "Ai là con của Nguyễn Văn A?",
    "sql": "SELECT hoTen FROM thanhvien WHERE (chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1) OR meId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1)) AND dongHoId = ? AND active_flag = 1",
    "category": "medium",
    "verified": true,
    "notes": "Quan hệ cha-con, cần subquery"
  },
  {
    "id": 4,
    "question": "Ai là cháu nội của Nguyễn Văn A?",
    "sql": "SELECT c.hoTen FROM thanhvien c JOIN thanhvien p ON c.chaId = p.thanhVienId WHERE p.chaId = (SELECT thanhVienId FROM thanhvien WHERE hoTen = 'Nguyễn Văn A' AND dongHoId = ? AND active_flag = 1) AND p.gioiTinh = 1 AND c.dongHoId = ? AND c.active_flag = 1",
    "category": "hard",
    "verified": true,
    "notes": "Quan hệ 2 bậc, cần JOIN + điều kiện giới tính"
  }
  // ... 100-500 examples
]
```

**Tips:**
- Bắt đầu với 50 examples
- Test accuracy
- Thêm dần lên 100, 200, 500
- Đa dạng hóa: easy, medium, hard

### Bước 3: Phân loại và validate

```python
# File: validate_dataset.py

import json

def validate_dataset():
    with open('dataset/questions.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    stats = {
        "total": len(data),
        "easy": 0,
        "medium": 0,
        "hard": 0,
        "verified": 0,
        "unverified": 0
    }
    
    for item in data:
        # Count by category
        stats[item['category']] += 1
        
        # Count verified
        if item.get('verified', False):
            stats['verified'] += 1
        else:
            stats['unverified'] += 1
        
        # Validate SQL
        if not item['sql'].strip():
            print(f"❌ Empty SQL: {item['id']}")
        
        if '?' not in item['sql']:
            print(f"⚠️  No parameter: {item['id']}")
    
    print("=" * 60)
    print("📊 DATASET STATISTICS")
    print("=" * 60)
    print(f"Total: {stats['total']}")
    print(f"Easy: {stats['easy']} ({stats['easy']/stats['total']*100:.1f}%)")
    print(f"Medium: {stats['medium']} ({stats['medium']/stats['total']*100:.1f}%)")
    print(f"Hard: {stats['hard']} ({stats['hard']/stats['total']*100:.1f}%)")
    print(f"Verified: {stats['verified']} ({stats['verified']/stats['total']*100:.1f}%)")
    print("=" * 60)

if __name__ == "__main__":
    validate_dataset()
```

**Chạy:**
```bash
python validate_dataset.py
```

---

## 🚀 FINE-TUNE STEP BY STEP

### Bước 1: Cài đặt thư viện

```bash
pip install transformers datasets peft accelerate bitsandbytes
```

**Giải thích:**
- `transformers`: Hugging Face library (load model, train)
- `datasets`: Xử lý dataset
- `peft`: LoRA implementation
- `accelerate`: Tăng tốc training
- `bitsandbytes`: Quantization (optional)

### Bước 2: Chuẩn bị dataset

**File:** `ai-service/prepare_dataset.py`


```python
import json
from datasets import Dataset
from config import DATABASE_SCHEMA

def prepare_dataset():
    print("=" * 60)
    print("📊 PREPARING DATASET")
    print("=" * 60)
    
    # 1. Load questions
    print("\n1. Loading questions...")
    with open('dataset/questions.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    print(f"✅ Loaded {len(data)} examples")
    
    # 2. Format for training
    print("\n2. Formatting data...")
    formatted_data = []
    
    for item in data:
        # Tạo prompt giống production
        prompt = f"""You are a SQL expert. Convert Vietnamese question to SQL query.

Database Schema:
{DATABASE_SCHEMA}

Question: {item['question']}
SQL:"""
        
        formatted_data.append({
            "input": prompt,
            "output": item['sql'],
            "category": item.get('category', 'unknown'),
            "id": item.get('id', 0)
        })
    
    print(f"✅ Formatted {len(formatted_data)} examples")
    
    # 3. Create dataset
    print("\n3. Creating dataset...")
    dataset = Dataset.from_list(formatted_data)
    print(f"✅ Dataset created: {len(dataset)} examples")
    
    # 4. Split train/validation/test (80/10/10)
    print("\n4. Splitting dataset...")
    train_test = dataset.train_test_split(test_size=0.2, seed=42)
    test_val = train_test['test'].train_test_split(test_size=0.5, seed=42)
    
    final_dataset = {
        'train': train_test['train'],
        'validation': test_val['train'],
        'test': test_val['test']
    }
    
    print(f"✅ Train: {len(final_dataset['train'])} examples")
    print(f"✅ Validation: {len(final_dataset['validation'])} examples")
    print(f"✅ Test: {len(final_dataset['test'])} examples")
    
    # 5. Save
    print("\n5. Saving dataset...")
    for split, data in final_dataset.items():
        data.save_to_disk(f'dataset/processed/{split}')
        print(f"✅ Saved {split}")
    
    print("\n" + "=" * 60)
    print("✅ DATASET PREPARED!")
    print("=" * 60)
    print("\nNext step: python finetune.py")

if __name__ == "__main__":
    prepare_dataset()
```

**Chạy:**
```bash
python prepare_dataset.py
```

**Output:**
```
📊 PREPARING DATASET
1. Loading questions...
✅ Loaded 100 examples
2. Formatting data...
✅ Formatted 100 examples
3. Creating dataset...
✅ Dataset created: 100 examples
4. Splitting dataset...
✅ Train: 80 examples
✅ Validation: 10 examples
✅ Test: 10 examples
5. Saving dataset...
✅ Saved train
✅ Saved validation
✅ Saved test
✅ DATASET PREPARED!
```

### Bước 3: Fine-tune với LoRA

**File:** `ai-service/finetune.py`

```python
import torch
from transformers import (
    AutoModelForCausalLM,
    AutoTokenizer,
    TrainingArguments,
    Trainer,
    DataCollatorForLanguageModeling
)
from datasets import load_from_disk
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
import os

# ============================================
# CONFIGURATION
# ============================================
BASE_MODEL = "Qwen/Qwen2.5-Coder-1.5B-Instruct"
OUTPUT_DIR = "./models/finetuned-sql-generator"
DATASET_DIR = "./dataset/processed"

# LoRA config
LORA_R = 16              # Rank (4, 8, 16, 32)
LORA_ALPHA = 32          # Alpha (thường = 2 * rank)
LORA_DROPOUT = 0.05      # Dropout
TARGET_MODULES = ["q_proj", "v_proj"]  # Layers to train

# Training config
NUM_EPOCHS = 3           # Số epochs
BATCH_SIZE = 4           # Batch size (giảm nếu OOM)
LEARNING_RATE = 2e-4     # Learning rate
WARMUP_STEPS = 100       # Warmup steps

def finetune():
    print("=" * 60)
    print("🎓 FINE-TUNING MODEL")
    print("=" * 60)
    
    # ============================================
    # 1. LOAD BASE MODEL
    # ============================================
    print("\n📥 Step 1: Loading base model...")
    print(f"Model: {BASE_MODEL}")
    
    tokenizer = AutoTokenizer.from_pretrained(
        BASE_MODEL,
        trust_remote_code=True
    )
    
    model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float16,
        device_map="auto",
        trust_remote_code=True
    )
    
    print(f"✅ Model loaded")
    print(f"   Parameters: {sum(p.numel() for p in model.parameters()) / 1e9:.2f}B")
    
    # ============================================
    # 2. CONFIGURE LORA
    # ============================================
    print("\n⚙️  Step 2: Configuring LoRA...")
    print(f"   Rank: {LORA_R}")
    print(f"   Alpha: {LORA_ALPHA}")
    print(f"   Target modules: {TARGET_MODULES}")
    
    lora_config = LoraConfig(
        r=LORA_R,
        lora_alpha=LORA_ALPHA,
        target_modules=TARGET_MODULES,
        lora_dropout=LORA_DROPOUT,
        bias="none",
        task_type="CAUSAL_LM"
    )
    
    # Prepare model for training
    model = prepare_model_for_kbit_training(model)
    model = get_peft_model(model, lora_config)
    
    # Print trainable parameters
    trainable_params = sum(p.numel() for p in model.parameters() if p.requires_grad)
    total_params = sum(p.numel() for p in model.parameters())
    
    print(f"✅ LoRA configured")
    print(f"   Trainable params: {trainable_params / 1e6:.2f}M ({trainable_params / total_params * 100:.2f}%)")
    print(f"   Total params: {total_params / 1e9:.2f}B")
    
    # ============================================
    # 3. LOAD DATASET
    # ============================================
    print("\n📊 Step 3: Loading dataset...")
    
    train_dataset = load_from_disk(f'{DATASET_DIR}/train')
    val_dataset = load_from_disk(f'{DATASET_DIR}/validation')
    
    print(f"✅ Dataset loaded")
    print(f"   Train: {len(train_dataset)} examples")
    print(f"   Validation: {len(val_dataset)} examples")
    
    # Tokenize function
    def tokenize_function(examples):
        # Combine input and output
        texts = [f"{inp}\n{out}" for inp, out in zip(examples['input'], examples['output'])]
        
        # Tokenize
        result = tokenizer(
            texts,
            truncation=True,
            max_length=512,
            padding=False
        )
        
        return result
    
    # Tokenize datasets
    print("\n🔄 Tokenizing datasets...")
    train_dataset = train_dataset.map(
        tokenize_function,
        batched=True,
        remove_columns=train_dataset.column_names
    )
    val_dataset = val_dataset.map(
        tokenize_function,
        batched=True,
        remove_columns=val_dataset.column_names
    )
    print("✅ Tokenization complete")
    
    # ============================================
    # 4. TRAINING ARGUMENTS
    # ============================================
    print("\n🏋️  Step 4: Setting up training...")
    
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        num_train_epochs=NUM_EPOCHS,
        per_device_train_batch_size=BATCH_SIZE,
        per_device_eval_batch_size=BATCH_SIZE,
        gradient_accumulation_steps=4,  # Effective batch = 4*4=16
        learning_rate=LEARNING_RATE,
        warmup_steps=WARMUP_STEPS,
        logging_steps=10,
        save_steps=100,
        eval_steps=100,
        evaluation_strategy="steps",
        save_total_limit=3,
        fp16=True,
        report_to="none",
        load_best_model_at_end=True
    )
    
    print(f"✅ Training configured")
    print(f"   Epochs: {NUM_EPOCHS}")
    print(f"   Batch size: {BATCH_SIZE}")
    print(f"   Learning rate: {LEARNING_RATE}")
    
    # ============================================
    # 5. DATA COLLATOR
    # ============================================
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False  # Causal LM, not masked LM
    )
    
    # ============================================
    # 6. TRAINER
    # ============================================
    print("\n🚀 Step 5: Creating trainer...")
    
    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        data_collator=data_collator
    )
    
    print("✅ Trainer created")
    
    # ============================================
    # 7. TRAIN!
    # ============================================
    print("\n" + "=" * 60)
    print("🚀 STARTING TRAINING")
    print("=" * 60)
    print("\n⏰ This will take 30-60 minutes on CPU, 5-10 minutes on GPU")
    print("📊 Watch the loss decrease over time")
    print("\n")
    
    trainer.train()
    
    # ============================================
    # 8. SAVE MODEL
    # ============================================
    print("\n💾 Step 6: Saving fine-tuned model...")
    
    trainer.save_model(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)
    
    print(f"✅ Model saved to: {OUTPUT_DIR}")
    
    # ============================================
    # 9. SUMMARY
    # ============================================
    print("\n" + "=" * 60)
    print("✅ FINE-TUNING COMPLETED!")
    print("=" * 60)
    print(f"\n📁 Model location: {OUTPUT_DIR}")
    print(f"📊 Files:")
    print(f"   - adapter_config.json (LoRA config)")
    print(f"   - adapter_model.safetensors (Trained weights)")
    print(f"   - tokenizer files")
    
    print(f"\n🎯 Next steps:")
    print(f"   1. Evaluate model: python evaluate.py")
    print(f"   2. Update config.py: MODEL_NAME = '{OUTPUT_DIR}'")
    print(f"   3. Restart service: python main.py")
    print(f"   4. Test accuracy improvement")
    
    print("\n" + "=" * 60)

if __name__ == "__main__":
    finetune()
```

**Chạy:**
```bash
python finetune.py
```

**Output (ví dụ):**
```
🎓 FINE-TUNING MODEL
📥 Step 1: Loading base model...
✅ Model loaded
   Parameters: 1.54B

⚙️  Step 2: Configuring LoRA...
✅ LoRA configured
   Trainable params: 1.57M (0.10%)
   Total params: 1.54B

📊 Step 3: Loading dataset...
✅ Dataset loaded
   Train: 80 examples
   Validation: 10 examples

🚀 STARTING TRAINING
Epoch 1/3: [████████████████████] 100%
  Loss: 2.345 → 1.234
Epoch 2/3: [████████████████████] 100%
  Loss: 1.234 → 0.876
Epoch 3/3: [████████████████████] 100%
  Loss: 0.876 → 0.654

✅ FINE-TUNING COMPLETED!
📁 Model location: ./models/finetuned-sql-generator
```

**Giải thích output:**
- **Loss giảm**: 2.345 → 0.654 (model đang học!)
- **Loss càng thấp**: Model càng chính xác
- **Nếu loss không giảm**: Dataset có vấn đề hoặc learning rate sai

---

## 📊 ĐÁNH GIÁ MODEL

### File: `ai-service/evaluate.py`

```python
from datasets import load_from_disk
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch
import json

MODEL_PATH = "./models/finetuned-sql-generator"
BASE_MODEL = "Qwen/Qwen2.5-Coder-1.5B-Instruct"

def evaluate():
    print("=" * 60)
    print("📊 EVALUATING MODEL")
    print("=" * 60)
    
    # 1. Load model
    print("\n1. Loading model...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
    base_model = AutoModelForCausalLM.from_pretrained(
        BASE_MODEL,
        torch_dtype=torch.float16,
        device_map="auto"
    )
    model = PeftModel.from_pretrained(base_model, MODEL_PATH)
    print("✅ Model loaded")
    
    # 2. Load test dataset
    print("\n2. Loading test dataset...")
    test_dataset = load_from_disk('dataset/processed/test')
    print(f"✅ Test dataset: {len(test_dataset)} examples")
    
    # 3. Evaluate
    print("\n3. Evaluating...")
    results = {
        "total": len(test_dataset),
        "correct": 0,
        "errors": []
    }
    
    for i, example in enumerate(test_dataset):
        # Extract question and expected SQL
        input_text = example['input']
        question = input_text.split('Question: ')[1].split('\nSQL:')[0]
        expected_sql = example['output']
        
        # Generate SQL
        inputs = tokenizer(input_text, return_tensors="pt").to(model.device)
        
        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=128,
                temperature=0.0,
                do_sample=False
            )
        
        generated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        generated_sql = generated_text.split('SQL:')[-1].strip()
        
        # Compare
        if generated_sql.strip() == expected_sql.strip():
            results['correct'] += 1
        else:
            results['errors'].append({
                "question": question,
                "expected": expected_sql,
                "generated": generated_sql
            })
        
        if (i + 1) % 5 == 0:
            print(f"   Processed {i + 1}/{results['total']}")
    
    # 4. Calculate metrics
    accuracy = results['correct'] / results['total'] * 100
    
    print("\n" + "=" * 60)
    print("📊 EVALUATION RESULTS")
    print("=" * 60)
    print(f"Total: {results['total']}")
    print(f"Correct: {results['correct']}")
    print(f"Accuracy: {accuracy:.2f}%")
    print("=" * 60)
    
    # 5. Save errors
    if results['errors']:
        with open('evaluation_errors.json', 'w', encoding='utf-8') as f:
            json.dump(results['errors'], f, ensure_ascii=False, indent=2)
        print(f"\n❌ {len(results['errors'])} errors saved to: evaluation_errors.json")
    else:
        print("\n✅ No errors! Perfect accuracy!")
    
    return accuracy

if __name__ == "__main__":
    evaluate()
```

**Chạy:**
```bash
python evaluate.py
```

---

## 🚀 DEPLOY MODEL MỚI

### Bước 1: Cập nhật config.py

```python
# File: config.py

# Thay đổi từ:
MODEL_NAME = "Qwen/Qwen2.5-Coder-1.5B-Instruct"

# Thành:
MODEL_NAME = "./models/finetuned-sql-generator"
```

### Bước 2: Cập nhật model_loader.py

```python
# File: model_loader.py

from peft import PeftModel

def load_model(self):
    # Check if fine-tuned model
    is_finetuned = os.path.exists(os.path.join(MODEL_NAME, "adapter_config.json"))
    
    if is_finetuned:
        logger.info("🎓 Loading FINE-TUNED model")
        
        # Load base model
        base_model_name = "Qwen/Qwen2.5-Coder-1.5B-Instruct"
        base_model = AutoModelForCausalLM.from_pretrained(
            base_model_name,
            torch_dtype=torch.float16,
            device_map="auto"
        )
        
        # Load LoRA adapter
        self._model = PeftModel.from_pretrained(base_model, MODEL_NAME)
        self._tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        
        logger.info("✅ Fine-tuned model loaded!")
    else:
        # Load pre-trained model (existing code)
        ...
```

### Bước 3: Restart service

```bash
python main.py
```

### Bước 4: Test

```bash
curl -X POST http://localhost:7000/ask \
  -H "Content-Type: application/json" \
  -d '{"question":"Ai là cháu nội của Nguyễn Văn A?","dongHoId":"DH001","execute":true}'
```

---

## 📊 SO SÁNH KẾT QUẢ

| Metric | Pre-trained | Fine-tuned | Cải thiện |
|--------|-------------|------------|-----------|
| Accuracy | 70-75% | 85-95% | +15-20% |
| Easy questions | 90% | 95% | +5% |
| Medium questions | 70% | 90% | +20% |
| Hard questions | 50% | 80% | +30% |
| Hiểu thuật ngữ riêng | ❌ | ✅ | ✅ |

---

## 💡 TIPS

### 1. Bắt đầu nhỏ
- 50 examples → Test
- 100 examples → Test
- 500 examples → Deploy

### 2. Quality > Quantity
- 100 examples chất lượng cao > 500 examples kém

### 3. Đa dạng hóa
- Nhiều loại câu hỏi
- Nhiều cách hỏi khác nhau
- Nhiều độ khó

### 4. Monitor training
- Loss phải giảm
- Nếu loss tăng → learning rate quá cao
- Nếu loss không đổi → dataset có vấn đề

---

## 🎯 TÓM TẮT

Fine-tune là quá trình train thêm model trên data của bạn để tăng accuracy. Với LoRA, bạn chỉ cần:
- 100-500 examples
- 30-60 phút training
- 4-8GB RAM
- Accuracy tăng 15-20%

Đây là cách tốt nhất để model hiểu câu hỏi của dòng họ bạn!
