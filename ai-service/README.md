# 🤖 AI Text-to-SQL Service

FastAPI service that converts Vietnamese questions to SQL queries using Qwen models.

## 🚀 Quick Start

### 1. Check System Requirements

```bash
python check_system.py
```

This will show your RAM, CPU, GPU and recommend the best model.

### 2. Choose Model

```bash
python switch_model.py
```

**Available models:**
- **1.5B**: Fast, ~4GB RAM (recommended for low-end systems)
- **3B**: Balanced, ~8GB RAM (recommended for most users)
- **7B**: Best accuracy, ~14GB RAM (recommended if you have enough RAM)

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment

Edit `.env` file:
```env
MODEL_NAME=Qwen/Qwen2.5-Coder-1.5B-Instruct
DEVICE=cpu
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
```

### 5. Run Service

```bash
python main.py
```

Service will start on `http://localhost:7000`

---

## ❌ Troubleshooting

### Error: "Paging file is too small"

**Solution 1: Increase Virtual Memory (Recommended)**
1. Press `Windows + R`
2. Type `sysdm.cpl` and Enter
3. Advanced → Performance Settings → Advanced → Virtual Memory
4. Uncheck "Automatically manage"
5. Set Custom size:
   - Initial: 16384 MB
   - Maximum: 32768 MB
6. Restart computer

**Solution 2: Use Smaller Model**
```bash
python switch_model.py
# Choose option 1 (1.5B model)
```

See `FIX_MEMORY_ERROR.md` for detailed solutions.

### Error: "CUDA out of memory"

```env
# In .env, change to CPU
DEVICE=cpu
```

Or use smaller model.

### Model loading is slow

- First time: 2-5 minutes (downloading model)
- Subsequent times: 30-60 seconds (loading from cache)
- This is normal for large models

---

## 📡 API Endpoints

### POST /query
Convert question to SQL and execute

**Request:**
```json
{
  "question": "Có bao nhiêu người trong gia phả?",
  "dongHoId": "DH001",
  "execute": true
}
```

**Response:**
```json
{
  "success": true,
  "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
  "confidence": 0.9,
  "data": [{"COUNT(*)": 150}],
  "columns": ["COUNT(*)"],
  "row_count": 1
}
```

### POST /test
Test SQL generation without execution

**Request:**
```json
{
  "question": "Ai là con của Nguyễn Văn A?",
  "dongHoId": "DH001"
}
```

**Response:**
```json
{
  "success": true,
  "sql": "SELECT hoTen FROM thanhvien WHERE chaId = ...",
  "confidence": 0.85,
  "raw_output": "..."
}
```

### GET /health
Check service health

**Response:**
```json
{
  "status": "ok",
  "model_loaded": true,
  "db_connected": true
}
```

---

## 🔧 Configuration

### Model Selection

Edit `.env`:
```env
# Lightest (4GB RAM)
MODEL_NAME=Qwen/Qwen2.5-Coder-1.5B-Instruct

# Medium (8GB RAM)
MODEL_NAME=Qwen/Qwen2.5-Coder-3B-Instruct

# Best (14GB RAM)
MODEL_NAME=Qwen/Qwen2.5-Coder-7B-Instruct
```

### Generation Parameters

```env
TEMPERATURE=0.1    # Lower = more deterministic (0.0-1.0)
TOP_P=0.9         # Nucleus sampling (0.0-1.0)
MAX_LENGTH=2048   # Max tokens
```

### Device

```env
DEVICE=cpu    # Use CPU
DEVICE=cuda   # Use GPU (requires CUDA)
```

---

## 📊 Performance

| Model | RAM | Speed | Accuracy | Use Case |
|-------|-----|-------|----------|----------|
| 1.5B  | 4GB | Fast  | Good     | Low-end systems, testing |
| 3B    | 8GB | Medium| Better   | Most users, production |
| 7B    | 14GB| Slow  | Best     | High accuracy needed |

**Benchmarks (on CPU):**
- 1.5B: ~2-3 seconds per query
- 3B: ~5-7 seconds per query
- 7B: ~10-15 seconds per query

**With GPU:**
- 3-5x faster

---

## 🏗️ Architecture

```
FastAPI Server (main.py)
    ↓
SQL Generator (sql_generator.py)
    ↓
Model Loader (model_loader.py) → Qwen Model
    ↓
Prompt Builder (prompt_builder.py) → Few-shot Examples
    ↓
Query Executor (query_executor.py) → MySQL Database
```

---

## 📚 Files

- `main.py` - FastAPI server
- `config.py` - Configuration and few-shot examples
- `model_loader.py` - Load Hugging Face model
- `prompt_builder.py` - Build prompts
- `sql_generator.py` - Generate SQL
- `query_executor.py` - Execute SQL safely
- `check_system.py` - Check system resources
- `switch_model.py` - Switch between models
- `FIX_MEMORY_ERROR.md` - Troubleshooting guide

---

## 🔐 Security

- SQL injection prevention with parameterized queries
- Only SELECT and CALL statements allowed
- Database credentials in `.env` (not committed)

---

## 📝 Adding Examples

Edit `config.py`:

```python
FEW_SHOT_EXAMPLES = [
    {
        "question": "Your Vietnamese question",
        "sql": "Your SQL query"
    },
    # Add more...
]
```

More examples = better accuracy (10-20 examples recommended)

---

## 🚀 Deployment

### Docker

```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "main.py"]
```

```bash
docker build -t ai-service .
docker run -p 7000:7000 ai-service
```

### Production Tips

1. Use GPU for better performance
2. Use model 3B or 7B for accuracy
3. Add caching (Redis)
4. Monitor with Prometheus
5. Load balancing for multiple instances

---

## 📖 Learn More

See `AI_LEARNING_ROADMAP.md` for comprehensive AI learning guide.

