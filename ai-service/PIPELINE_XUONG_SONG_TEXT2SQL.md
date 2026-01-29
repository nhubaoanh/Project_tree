# Pipeline “Xương sống” cho Text-to-SQL (HuggingFace → Fine-tune → Cache “trí nhớ” → API)

Tài liệu này mô tả **luồng chuẩn hoá** để bạn có thể áp dụng lại cho dự án khác:

- Mục tiêu: Câu hỏi (VN) → SQL (an toàn) → (tuỳ chọn) execute DB → trả kết quả
- Tối ưu: **nhanh** (cache), **đúng** (fine-tune + rules), **dễ bảo trì** (logging + export dataset + retrain)

---

## 1) Tổng quan kiến trúc (đúng “xương sống”)

**Luồng request** (runtime):

1. API nhận câu hỏi
2. Bộ sinh SQL (`SQLGenerator`) xử lý:
   - Memory cache (RAM) → nếu hit, trả ngay
   - Knowledge cache (file JSON) → nếu hit, trả ngay
   - Nếu miss: gọi model để generate SQL
   - Validate SQL (chỉ SELECT/CALL, rules bắt buộc)
   - Lưu lại vào cache
3. (Tuỳ chọn) executor chạy SQL trên DB và trả dữ liệu
4. Logging kết quả để về sau export dataset → retrain

**Các “khối” chính trong code hiện tại**:

- `main.py`
  - FastAPI endpoints: `/ask`, `/query`, `/test`, `/health`, logs APIs, dataset export
  - Startup hook: load model + load knowledge cache
  - Logging: `logs/questions.txt`, `logs/query_results.jsonl`
- `model_loader_finetuned.py`
  - Load base model từ HuggingFace + gắn LoRA adapters từ `./finetuned_model`
  - `generate(prompt)` trả output text
- `sql_generator.py`
  - Triển khai 3 bước: memory cache → knowledge cache → generate
  - Extract + validate SQL, tính confidence, auto-add cache
- `knowledge_cache.py`
  - Persistent cache: `knowledge/cache.json`
  - Index theo `question_normalized` để lookup O(1)
- `prompt_builder.py`
  - Prompt template: schema + rules + few-shot examples
- `query_executor.py`
  - Kết nối MySQL, convert placeholder `?` → `%s`, chạy query có params
- `config.py`
  - Env config + schema + few-shot examples

---

## 2) Step-by-step: từ kéo model HuggingFace đến chạy API

### 2.1. Chọn base model trên HuggingFace

Tiêu chí chọn:

- Model dạng instruct/coder phù hợp sinh SQL
- Hỗ trợ tiếng Việt càng tốt
- Kích thước phù hợp tài nguyên (CPU/RAM) nếu self-host

Trong dự án này:

- Base: `Qwen/Qwen2.5-Coder-1.5B-Instruct`

### 2.2. Chuẩn bị dataset (cặp Question → SQL)

Định dạng tối thiểu (như `dataset/member.json`):

```json
[
  {"question": "Có bao nhiêu người trong gia phả?", "sql": "SELECT COUNT(*) ..."}
]
```

Khuyến nghị chuẩn hoá dataset:

- SQL **phải có** các rule bắt buộc (ví dụ `dongHoId = ?`, `active_flag = 1`)
- Cover các dạng câu hỏi phổ biến (COUNT, list, join, relationship…)
- Có thể thêm field `notes`, `verified`, `category` nếu muốn quản trị tốt hơn

### 2.3. Fine-tune bằng LoRA (khuyến nghị cho dự án vừa/nhỏ)

Tư duy:

- Không train lại toàn bộ model (rất nặng)
- Chỉ train “adapter” (LoRA) để model học style và pattern SQL của bạn

Trong repo này, script tham khảo:

- `train_colab_FINAL.py`
  - Load base model từ HF
  - `get_peft_model()` với LoRA config
  - Train với text dạng:
    - `Question: ...\nSQL: ...`
  - Save ra folder `./finetuned_model`

Kết quả sau train:

- `finetuned_model/adapter_model.safetensors` (LoRA weights)
- tokenizer files
- `adapter_config.json` mô tả LoRA config + base model

### 2.4. Đóng gói “deployable artifact”

Một gói deploy tối thiểu nên gồm:

- `finetuned_model/` (LoRA adapter + tokenizer)
- `knowledge/cache.json` (cache pre-generated từ dataset – nếu có)
- Source code service

Trong `train_colab_FINAL.py`, có đoạn **pre-generate cache** và zip:

- Generate `knowledge/cache.json` từ `member.json`
- Zip `finetuned_model/` + `knowledge/`

### 2.5. Chạy service

- Cài dependencies: `pip install -r requirements.txt`
- Cấu hình DB (thường qua `.env`, load bằng `python-dotenv` trong `config.py`)
- Chạy: `python main.py`

---

## 3) Vì sao nó “nhớ được”? (2 loại trí nhớ)

### 3.1. “Trí nhớ” loại 1: Fine-tuned weights (LoRA)

- Đây là **trí nhớ dạng tham số** (weights) của neural network.
- Khi fine-tune, model học:
  - schema/tên cột hay dùng
  - pattern câu hỏi → template SQL
  - style output (chỉ trả SQL)

=> Không phải cache theo câu hỏi, mà là model “hiểu” và sinh ra SQL tốt hơn.

### 3.2. “Trí nhớ” loại 2: Cache runtime (exact match)

Trong `sql_generator.py`:

- **Memory cache (RAM)**: `self.memory_cache`
  - Key: `md5(question)`
  - Mất khi restart
  - Nhanh nhất

- **Knowledge cache (file JSON)**: `knowledge/cache.json`
  - Load khi startup: `sql_generator.load_knowledge_cache()`
  - Lookup theo `question_normalized` để O(1)
  - Giữ được qua restart

Khi gặp câu hỏi mới:

1. RAM miss
2. File cache miss
3. Generate SQL bằng model
4. Auto add vào file cache (`knowledge_cache.add()` sẽ `save()`)

=> Vì vậy, **càng hỏi nhiều, cache càng phình ra và hit nhiều hơn**.

---

## 4) Điểm móc (hook) quan trọng trong kiến trúc: “load model” và “load cache”

Trong `main.py` startup (lifespan):

- `model_loader.load_model()`
- `sql_generator.load_knowledge_cache()`

Lý do làm ở startup:

- Tránh request đầu tiên phải chịu latency load model/caches
- Đảm bảo service sẵn sàng và predict ổn định

Trade-off:

- Startup lâu hơn, nhưng runtime nhanh và ít lỗi hơn

---

## 5) Vì sao code viết như vậy? (quy tắc thiết kế)

- **Tách concerns**:
  - loader chỉ lo model
  - generator chỉ lo prompt + cache + validate
  - executor chỉ lo DB
  - config tập trung schema/rules
- **Cache layered**:
  - RAM cho tốc độ
  - file cache cho “trí nhớ” bền
  - model cho câu hỏi thật sự mới
- **Logging bắt buộc**:
  - để bạn “lấy dữ liệu thật” từ người dùng
  - export làm dataset → retrain

---

## 6) Pipeline vận hành/bảo trì (Production loop)

### 6.1. Logging & thu thập dữ liệu

Trong `main.py`:

- Log câu hỏi: `logs/questions.txt`
- Log kết quả query: `logs/query_results.jsonl` (success/fail)

Mục tiêu:

- Biết câu nào user hỏi nhiều
- Biết SQL nào hay fail
- Tạo dataset “thực chiến” để fine-tune tiếp

### 6.2. Export dataset để retrain

Endpoint: `/dataset/export`

- Lọc success entries có `sql`
- Ghi ra `dataset/collected_questions_*.json`

### 6.3. Retrain định kỳ

Chu kỳ gợi ý:

- Tuỳ traffic: 1-2 tuần / 1 tháng
- Trước khi retrain:
  - review các câu fail
  - gán nhãn/verify
- Retrain xong:
  - replace `finetuned_model/`
  - restart service

---

## 7) Tối ưu quan trọng bạn đang thiếu: “câu hỏi hơi giống nhau”

Hiện tại cache là **exact match** (normalize lower/strip). Với câu hơi khác chữ, sẽ miss.

### 7.1. Tối ưu đề xuất (semantic cache)

Ý tưởng (đúng kiểu ChatGPT):

- Dùng embedding model (ví dụ `sentence-transformers` multilingual)
- Lưu vector cho mỗi câu cached
- Khi câu mới tới:
  - encode vector
  - tìm câu gần nhất (cosine similarity)
  - nếu similarity > threshold (vd 0.9): trả SQL cached

Điểm cần quyết định trước khi triển khai:

- **Ngưỡng similarity** (0.85–0.95)
- **Kiểm soát rủi ro**: similarity cao nhưng câu khác ý → SQL sai
  - giải pháp: thêm rule/guardrail + evaluation

### 7.2. Tối ưu đề xuất (template cache)

Ví dụ normalize entity:

- “Nghề nghiệp của Nguyễn Văn A” và “Nghề nghiệp của Trần Thị B”

Có thể parse tên người → thay bằng placeholder `{name}`:

- Cache theo template: “Nghề nghiệp của {name} là gì?”
- SQL template: `... WHERE hoTen = '{name}' ...`

Cách này nhẹ hơn semantic embedding nhưng cần regex/NLP.

---

## 8) Checklist triển khai nhanh cho dự án mới (copy-paste workflow)

### 8.1. Thiết kế đầu vào/đầu ra

- Input: `question`, `tenant_id` (ở repo này là `dongHoId`), `execute`
- Output: `sql`, `confidence`, `source`, (optional) `data`, `error`

### 8.2. Chuẩn hoá schema + rules

- Đặt rules cứng trong prompt:
  - luôn filter theo tenant (`dongHoId = ?`)
  - filter active (`active_flag = 1`)
  - chỉ trả SQL

### 8.3. Build prompt builder

- Schema
- Rules
- Few-shot examples
- “Your Task” cuối prompt

### 8.4. Implement `SQLGenerator` theo 3 bước

- memory cache
- knowledge cache
- generate → extract → validate → cache

### 8.5. DB Executor

- Bắt buộc parameterized query
- Map placeholder `?` → `%s` (MySQL) / `$1` (Postgres) tuỳ DB

### 8.6. Logging + export dataset

- log question
- log exec result (success/fail)
- export dataset json

### 8.7. Fine-tune loop

- baseline dataset seed
- collect runtime
- retrain
- redeploy

---

## 9) Debug & sửa lỗi nhanh (playbook)

### 9.1. Khi SQL sai cú pháp / sai schema

- Xem `raw_output` từ `/test`
- Check `_extract_sql()` có cắt sai không
- Tăng/giảm `max_new_tokens`
- Bổ sung few-shot example cho pattern đó

### 9.2. Khi SQL thiếu `dongHoId` hoặc `active_flag`

- Hiện tại confidence sẽ giảm (heuristic)
- Khuyến nghị:
  - validate mạnh hơn: nếu thiếu rule bắt buộc → reject, regenerate (hoặc sửa SQL tự động)

### 9.3. Khi query chạy chậm

- Check indexes DB
- Check SQL pattern (LIKE leading wildcard, join thiếu condition)
- Thêm guardrails: LIMIT cho list queries

### 9.4. Khi model load chậm/không đủ RAM

- Giảm base model size
- Dùng quantization (nếu phù hợp môi trường)
- Tách process model khỏi API (service riêng) nếu cần scale

---

## 10) Đề xuất cải tiến cho dự án hiện tại (ưu tiên theo tác động)

1. Semantic cache (giải quyết “hơi giống”)
2. Strong validation + auto-repair (bắt buộc tenant filter)
3. Bổ sung cơ chế feedback “đúng/sai” để tăng `correct_count/incorrect_count`
4. Cache eviction / versioning (khi schema đổi)
5. Test suite cho top N câu hỏi + regression check trước deploy

---

## 11) Nơi cần sửa khi bạn port sang dự án khác

- `config.py`
  - `DATABASE_SCHEMA`
  - `FEW_SHOT_EXAMPLES`
  - DB config env keys
- `prompt_builder.py`
  - rules đặc thù
- `query_executor.py`
  - driver DB + placeholder mapping
- `knowledge/cache.json`
  - seed cache theo dataset mới
- `model_loader_finetuned.py`
  - base model name
  - finetuned path

---

## 12) “Minimum Viable” pipeline (đơn giản nhất nhưng hiệu quả)

- Base model từ HF
- 30–100 examples (seed)
- Fine-tune LoRA
- Knowledge cache exact match
- Logging + export dataset

Khi ổn rồi mới thêm:

- semantic cache
- template cache
- evaluation/CI

