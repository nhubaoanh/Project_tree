# AI Engineering Pipeline Template (HuggingFace → Fine-tune → “Trí nhớ” Cache → API)

Tài liệu này là **khuôn mẫu chung** (model-agnostic) để bạn copy sang dự án khác và làm theo từng bước. Mục tiêu: **kéo model từ HuggingFace**, **fine-tune (LoRA/QLoRA)**, triển khai **API production**, có **cache trí nhớ** (exact + semantic), có **logging/eval** để **retrain** và bảo trì lâu dài.

> Nếu bạn chỉ muốn “kéo và chạy luôn” (không fine-tune), bạn vẫn dùng toàn bộ pipeline, chỉ bỏ bước training và trỏ `MODEL_ID` vào model gốc.

---

## 0) Bạn sẽ xây cái gì?

**Một “LLM Service” tiêu chuẩn** gồm:

- **Model layer**: tải model(s) từ HF, inference, warmup, multi-model routing
- **Prompt/Task layer**: prompt template + guardrails (validate output)
- **Cache layer**:
  - RAM cache (siêu nhanh)
  - Disk cache (bền, nhớ qua restart)
  - Semantic cache (câu hỏi *gần giống*)
- **API layer**: FastAPI endpoints
- **Ops layer**: logging, dataset export, evaluation, retrain loop

---

## 1) Cấu trúc thư mục chuẩn (khuyến nghị)

Bạn có thể dùng cấu trúc này cho **Text-to-SQL**, **RAG**, **Q&A**, **classification**, … chỉ thay `tasks/`.

```text
ai-service/
  app/
    main.py
    schemas.py
    deps.py
  core/
    config.py
    logging.py
    model_registry.py
    model_loader.py
    prompt.py
    guardrails.py
    pipeline.py
  cache/
    memory_cache.py
    disk_cache.py
    semantic_cache.py
    cache_store.json
  tasks/
    text2sql.py
    rag_qa.py
  data/
    raw/
    processed/
    train.jsonl
    eval.jsonl
  models/
    base/                # HF download cache (tuỳ)
    adapters/            # LoRA adapters
  logs/
    requests.jsonl
    generations.jsonl
    errors.jsonl
  scripts/
    download_model.py
    prepare_dataset.py
    train_lora.py
    build_cache.py
    eval.py
  requirements.txt
  .env.example
  README.md
```

**Nguyên tắc:**

- **core/** không phụ thuộc task cụ thể (tái dùng giữa dự án)
- **tasks/** chứa logic task (Text-to-SQL, RAG, …)
- **cache/** quản lý “trí nhớ” runtime
- **scripts/** phục vụ lifecycle (download/train/eval)

---

## 2) Requirements để “kéo và chạy được luôn”

### 2.1 `requirements.txt` (gợi ý)

Tối thiểu để chạy API + inference:

```txt
fastapi
uvicorn
pydantic
python-dotenv
transformers
accelerate
torch
safetensors

# Fine-tune LoRA (tuỳ)
peft
bitsandbytes

datasets

# Semantic cache (tuỳ)
sentence-transformers
numpy

# (Tuỳ chọn) FAISS để search nhanh nếu cache lớn
faiss-cpu
```

> Nếu chạy CPU: cài `torch` bản CPU phù hợp. Nếu GPU: cài `torch` CUDA.

---

## 3) Step-by-step: Kéo model từ HuggingFace

### 3.1 Chọn model

**Tiêu chí chọn** (để inference ổn định):

- Instruct/coder model (đặc biệt nếu sinh SQL/code)
- Kích thước phù hợp (CPU: 0.5B–3B; GPU: 7B–14B+)
- License phù hợp sản phẩm

### 3.2 Download (2 cách)

**Cách A: huggingface-cli**

```bash
huggingface-cli login
huggingface-cli download <MODEL_ID> --local-dir models/base/<MODEL_ID> --local-dir-use-symlinks False
```

**Cách B: Python script** (`scripts/download_model.py`)

```python
from transformers import AutoTokenizer, AutoModelForCausalLM

MODEL_ID = "Qwen/Qwen2.5-Coder-1.5B-Instruct"

tok = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    trust_remote_code=True,
    device_map="auto",  # CPU/GPU tuỳ môi trường
)

print("Downloaded OK")
```

---

## 4) Chuẩn hoá dữ liệu train (dataset contract)

### 4.1 Dạng đơn giản (SFT text)

Phù hợp với Text-to-SQL hoặc mapping task.

`data/train.jsonl`:

```json
{"input": "Question: Có bao nhiêu người?\nSQL:", "output": "SELECT COUNT(*) FROM ..."}
```

### 4.2 Dạng chat (khuyến nghị cho instruct models)

`data/train.jsonl`:

```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant..."},
    {"role": "user", "content": "..."},
    {"role": "assistant", "content": "..."}
  ]
}
```

**Kinh nghiệm:**

- Đầu ra nên **deterministic** (ít giải thích, format cố định) để dễ cache
- Với Text-to-SQL: enforce rules trong prompt + validate mạnh

---

## 5) Fine-tune (LoRA/QLoRA) – cách làm chuẩn cho production

### 5.1 Tại sao LoRA?

- Train nhanh, nhẹ
- Dễ deploy: chỉ cần lưu adapter
- Dễ rollback/versioning

### 5.2 Script mẫu `scripts/train_lora.py` (rút gọn, chạy được)

```python
import json
from datasets import Dataset
from transformers import AutoTokenizer, AutoModelForCausalLM, Trainer, TrainingArguments, DataCollatorForLanguageModeling
from peft import LoraConfig, get_peft_model
import torch

MODEL_ID = "Qwen/Qwen2.5-Coder-1.5B-Instruct"
TRAIN_PATH = "data/train.jsonl"
OUT_DIR = "models/adapters/text2sql-lora"

rows = []
with open(TRAIN_PATH, "r", encoding="utf-8") as f:
    for line in f:
        obj = json.loads(line)
        rows.append({"text": obj["input"] + obj["output"]})

ds = Dataset.from_list(rows)

tok = AutoTokenizer.from_pretrained(MODEL_ID, trust_remote_code=True)
if tok.pad_token is None:
    tok.pad_token = tok.eos_token

model = AutoModelForCausalLM.from_pretrained(
    MODEL_ID,
    trust_remote_code=True,
    torch_dtype=torch.float16,
    device_map="auto",
)

lora = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.05,
    bias="none",
    task_type="CAUSAL_LM",
    target_modules=["q_proj", "k_proj", "v_proj", "o_proj"],
)
model = get_peft_model(model, lora)


def tokenize(batch):
    return tok(batch["text"], truncation=True, max_length=512, padding="max_length")

ds = ds.map(tokenize, batched=True, remove_columns=["text"])

args = TrainingArguments(
    output_dir=OUT_DIR,
    num_train_epochs=3,
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,
    learning_rate=2e-4,
    fp16=True,
    logging_steps=20,
    save_strategy="epoch",
    report_to="none",
)

collator = DataCollatorForLanguageModeling(tokenizer=tok, mlm=False)
trainer = Trainer(model=model, args=args, train_dataset=ds, data_collator=collator)
trainer.train()

model.save_pretrained(OUT_DIR)
tok.save_pretrained(OUT_DIR)
print("Saved adapters to", OUT_DIR)
```

### 5.3 Đóng gói version

Khuyến nghị:

- `models/adapters/<task>-lora/` kèm `metadata.json`:
  - base model
  - dataset version
  - metrics
  - schema/prompt version

---

## 6) Inference pipeline chuẩn (multi-model + cache + guardrails)

### 6.1 Model Registry (chạy nhiều model)

Ý tưởng:

- Bạn có thể chạy:
  - 1 model “nhanh” (nhỏ) cho câu phổ biến
  - 1 model “mạnh” cho câu khó
  - hoặc tách model theo task

`core/model_registry.py` (skeleton):

```python
from dataclasses import dataclass

@dataclass
class ModelSpec:
    name: str
    base_model_id: str
    adapter_path: str | None = None

MODEL_SPECS = {
    "fast": ModelSpec(
        name="fast",
        base_model_id="Qwen/Qwen2.5-Coder-1.5B-Instruct",
        adapter_path="models/adapters/text2sql-lora",
    ),
    "strong": ModelSpec(
        name="strong",
        base_model_id="Qwen/Qwen2.5-Coder-7B-Instruct",
        adapter_path=None,
    ),
}
```

### 6.2 Model Loader (base + optional adapter)

`core/model_loader.py` (skeleton):

```python
from transformers import AutoTokenizer, AutoModelForCausalLM
from peft import PeftModel
import torch

class ModelHandle:
    def __init__(self, model, tokenizer):
        self.model = model
        self.tokenizer = tokenizer

class ModelLoader:
    def load(self, base_model_id: str, adapter_path: str | None):
        tok = AutoTokenizer.from_pretrained(adapter_path or base_model_id, trust_remote_code=True)
        if tok.pad_token is None:
            tok.pad_token = tok.eos_token

        base = AutoModelForCausalLM.from_pretrained(
            base_model_id,
            trust_remote_code=True,
            torch_dtype=torch.float16,
            device_map="auto",
            low_cpu_mem_usage=True,
        )

        if adapter_path:
            model = PeftModel.from_pretrained(base, adapter_path, device_map="auto")
        else:
            model = base

        return ModelHandle(model=model, tokenizer=tok)

    def generate(self, handle: ModelHandle, prompt: str, max_new_tokens: int = 128, temperature: float = 0.1, top_p: float = 0.9):
        inputs = handle.tokenizer(prompt, return_tensors="pt")
        device = next(handle.model.parameters()).device
        inputs = {k: v.to(device) for k, v in inputs.items()}

        out = handle.model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            temperature=temperature,
            do_sample=True,
            top_p=top_p,
            num_beams=1,
            use_cache=True,
            pad_token_id=handle.tokenizer.eos_token_id,
        )

        text = handle.tokenizer.decode(out[0], skip_special_tokens=True)
        return text
```

### 6.3 Cache Layer (3 tầng)

**Tầng 1: Memory cache (RAM)**

- key = hash(normalized_input + model_name + prompt_version)

**Tầng 2: Disk cache**

- JSONL/JSON file hoặc SQLite
- có schema versioning

**Tầng 3: Semantic cache (near-duplicate)**

- Embedding + cosine similarity
- trả kết quả nếu similarity cao

`cache/disk_cache.py` (pseudo):

```python
# API chung:
#   get(key) -> value | None
#   set(key, value)
#   flush()
```

**Best practice:**

- Cache entry nên chứa:
  - input, normalized
  - output
  - model_name
  - prompt_version
  - created_at
  - hit_count
  - correctness stats

### 6.4 Guardrails (bắt buộc trong production)

`core/guardrails.py` (Text-to-SQL ví dụ):

- reject nếu output rỗng
- chỉ cho phép `SELECT`/`CALL`
- enforce tenant filter / policy

Pseudo:

```python
def validate_sql(sql: str):
    s = sql.strip().lower()
    if not s:
        raise ValueError("empty")
    if not (s.startswith("select") or s.startswith("call")):
        raise ValueError("only select/call")
    return sql.strip()
```

---

## 7) API Service tối thiểu (copy chạy được)

### 7.1 FastAPI app skeleton `app/main.py`

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

from core.model_loader import ModelLoader
from core.model_registry import MODEL_SPECS

app = FastAPI(title="LLM Service")

loader = ModelLoader()
handles = {}

class AskReq(BaseModel):
    question: str
    model: str = "fast"  # chọn model

@app.on_event("startup")
def startup():
    # Load tất cả model cần dùng
    for name, spec in MODEL_SPECS.items():
        handles[name] = loader.load(spec.base_model_id, spec.adapter_path)

@app.get("/health")
def health():
    return {"status": "ok", "models": list(handles.keys())}

@app.post("/ask")
def ask(req: AskReq):
    try:
        if req.model not in handles:
            raise HTTPException(400, "unknown model")

        prompt = f"Q: {req.question}\nA:"
        text = loader.generate(handles[req.model], prompt)
        return {"success": True, "model": req.model, "output": text}
    except Exception as e:
        raise HTTPException(500, str(e))
```

### 7.2 Chạy

```bash
uvicorn app.main:app --host 0.0.0.0 --port 7000
```

Test:

```bash
curl -X POST http://localhost:7000/ask -H "Content-Type: application/json" -d '{"question":"Hello","model":"fast"}'
```

---

## 8) Tối ưu hiệu năng (thứ tự ưu tiên giống production)

- **[Cache trước]**: RAM + disk cache → giảm 80–95% latency
- **[Deterministic generation]**: `temperature` thấp, `num_beams=1`, `max_new_tokens` nhỏ
- **[Warmup]**: startup generate 1 câu dummy để JIT/cache nội bộ
- **[Quantization]** (tuỳ): 4-bit/8-bit để giảm RAM
- **[Batching]**: gom request nếu traffic cao
- **[Prompt ngắn]**: bỏ format nặng/không cần thiết
- **[Semantic cache]**: giải quyết câu hỏi “hơi giống”

---

## 9) Logging, Eval, Retrain (để duy trì lâu dài)

### 9.1 Logging chuẩn

Ghi JSONL:

- request_id, timestamp
- input
- selected model
- prompt_version
- output
- latency
- error

### 9.2 Eval trước khi deploy

- Lấy `data/eval.jsonl` (golden set)
- Chạy batch inference
- Tính metrics:
  - exact match
  - execution success (nếu SQL)
  - latency p50/p95

### 9.3 Retrain loop

1. Thu thập logs
2. Lọc các case fail
3. Curate dataset (verified)
4. Fine-tune LoRA
5. Canary deploy
6. Rollback nếu regression

---

## 10) Checklist “đủ ngưỡng kéo & chạy luôn”

- Có `requirements.txt`
- Có `scripts/download_model.py`
- Có FastAPI `app/main.py`
- Có config model(s) trong `core/model_registry.py`
- Chạy `uvicorn` lên được

Sau đó mới nâng cấp dần:

- prompt builder bài bản
- guardrails mạnh
- cache 3 tầng
- logging/eval/retrain

---

## 11) Gợi ý chiến lược multi-model thực chiến

- **Router theo độ chắc chắn**:
  - chạy model nhỏ trước
  - nếu output fail guardrails / low confidence → fallback model mạnh

- **Router theo task**:
  - text2sql → coder model
  - Q&A → instruct model

- **A/B testing**:
  - 10% traffic sang model mới
  - log metrics

---

## Trạng thái

- **Hoàn thành**: Doc template chung nhất (model-agnostic) để bạn dùng cho nhiều dự án và nhiều model.
