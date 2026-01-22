# 🚀 FASTAPI - GIẢI THÍCH TỪ CƠ BẢN ĐẾN NÂNG CAO

## 📖 FastAPI là gì?

**FastAPI** = Express.js của Python
- Framework để tạo REST API
- Nhanh, dễ dùng, tự động generate docs
- Giống Express nhưng có type checking

---

## 🔄 SO SÁNH VỚI EXPRESS.JS

### Express.js (Node.js)
```javascript
const express = require('express');
const app = express();

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello World' });
});

app.listen(3000);
```

### FastAPI (Python)
```python
from fastapi import FastAPI
app = FastAPI()

@app.get("/hello")
def hello():
    return {"message": "Hello World"}

# Chạy: uvicorn main:app --port 3000
```

**Giống nhau**:
- Cả 2 đều tạo REST API
- Cả 2 đều có routing
- Cả 2 đều return JSON

**Khác nhau**:
- FastAPI dùng decorator `@app.get()`
- FastAPI tự động validate data
- FastAPI tự động generate docs (Swagger)

---

## 📝 CÚ PHÁP CƠ BẢN

### 1. Tạo app

```python
from fastapi import FastAPI

app = FastAPI(
    title="My API",           # Tên API
    version="1.0.0",          # Version
    description="My API docs" # Mô tả
)
```

**Giống**: `const app = express()`

---

### 2. Định nghĩa routes

#### GET Request
```python
@app.get("/users")
def get_users():
    return {"users": ["Alice", "Bob"]}
```

**Giống Express**:
```javascript
app.get('/users', (req, res) => {
  res.json({ users: ['Alice', 'Bob'] });
});
```

#### POST Request
```python
@app.post("/users")
def create_user(name: str, age: int):
    return {"name": name, "age": age}
```

**Giống Express**:
```javascript
app.post('/users', (req, res) => {
  const { name, age } = req.body;
  res.json({ name, age });
});
```

---

### 3. Path Parameters (URL params)

```python
@app.get("/users/{user_id}")
def get_user(user_id: int):
    return {"user_id": user_id}
```

**Giống Express**:
```javascript
app.get('/users/:user_id', (req, res) => {
  res.json({ user_id: req.params.user_id });
});
```

**Test**: `GET /users/123` → `{"user_id": 123}`

---

### 4. Query Parameters (?key=value)

```python
@app.get("/search")
def search(q: str, limit: int = 10):
    return {"query": q, "limit": limit}
```

**Giống Express**:
```javascript
app.get('/search', (req, res) => {
  const { q, limit = 10 } = req.query;
  res.json({ query: q, limit });
});
```

**Test**: `GET /search?q=hello&limit=5` → `{"query": "hello", "limit": 5}`

---

### 5. Request Body (JSON)

```python
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    email: str

@app.post("/users")
def create_user(user: User):
    return {"message": f"Created user {user.name}"}
```

**Giống Express**:
```javascript
app.post('/users', (req, res) => {
  const { name, age, email } = req.body;
  res.json({ message: `Created user ${name}` });
});
```

**Request**:
```json
POST /users
{
  "name": "Alice",
  "age": 25,
  "email": "alice@example.com"
}
```

---

## 🎯 TRONG DỰ ÁN AI SERVICE

### File: `ai-service/main.py`

```python
from fastapi import FastAPI
from pydantic import BaseModel

# 1. Tạo app
app = FastAPI(title="AI Text-to-SQL Service")

# 2. Định nghĩa request body schema
class QueryRequest(BaseModel):
    question: str      # Câu hỏi (bắt buộc)
    dongHoId: str      # ID dòng họ (bắt buộc)
    execute: bool = False  # Execute SQL? (optional, default False)

# 3. Định nghĩa endpoint
@app.post("/query")
async def process_query(request: QueryRequest):
    # request.question → "Có bao nhiêu người?"
    # request.dongHoId → "DH001"
    # request.execute → True/False
    
    # Generate SQL
    result = sql_generator.generate_sql(request.question)
    
    # Return response
    return {
        "success": True,
        "sql": result["sql"],
        "confidence": result["confidence"]
    }
```

---

## 🔍 GIẢI THÍCH CHI TIẾT

### 1. `@app.post("/query")`

**Nghĩa**: Tạo endpoint POST tại đường dẫn `/query`

**Tương đương Express**:
```javascript
app.post('/query', async (req, res) => { ... });
```

---

### 2. `async def process_query(request: QueryRequest)`

**Phân tích**:
- `async`: Function bất đồng bộ (giống `async` trong JS)
- `def process_query`: Tên function
- `request: QueryRequest`: Parameter với type `QueryRequest`

**Tương đương Express**:
```javascript
async function processQuery(req, res) {
  const { question, dongHoId, execute } = req.body;
  ...
}
```

---

### 3. `class QueryRequest(BaseModel)`

**Nghĩa**: Định nghĩa schema cho request body

```python
class QueryRequest(BaseModel):
    question: str      # String, bắt buộc
    dongHoId: str      # String, bắt buộc
    execute: bool = False  # Boolean, optional (default False)
```

**Tương đương Express + Joi**:
```javascript
const schema = Joi.object({
  question: Joi.string().required(),
  dongHoId: Joi.string().required(),
  execute: Joi.boolean().default(false)
});
```

**Lợi ích**:
- ✅ Tự động validate
- ✅ Tự động generate docs
- ✅ Type checking
- ✅ Nếu sai format → tự động trả 422 error

---

### 4. `return { "success": True, ... }`

**Nghĩa**: Return JSON response

**Tương đương Express**:
```javascript
res.json({ success: true, ... });
```

FastAPI tự động convert dict → JSON!

---

## 🌐 SWAGGER UI - TỰ ĐỘNG GENERATE DOCS

Khi chạy FastAPI, tự động có:

### 1. Swagger UI
```
http://localhost:7000/docs
```

**Tính năng**:
- ✅ Xem tất cả endpoints
- ✅ Xem request/response schema
- ✅ Test API trực tiếp (không cần Postman)
- ✅ Tự động generate từ code

### 2. ReDoc
```
http://localhost:7000/redoc
```

**Tính năng**:
- ✅ Documentation đẹp hơn
- ✅ Dễ đọc hơn

### 3. OpenAPI JSON
```
http://localhost:7000/openapi.json
```

**Tính năng**:
- ✅ Schema JSON của API
- ✅ Dùng để generate client code

---

## 🔧 CÁC TÍNH NĂNG NÂNG CAO

### 1. Dependency Injection

```python
from fastapi import Depends

def get_db():
    db = Database()
    try:
        yield db
    finally:
        db.close()

@app.get("/users")
def get_users(db = Depends(get_db)):
    return db.query("SELECT * FROM users")
```

**Giống**: Middleware trong Express

---

### 2. Background Tasks

```python
from fastapi import BackgroundTasks

def send_email(email: str):
    print(f"Sending email to {email}")

@app.post("/register")
def register(email: str, background_tasks: BackgroundTasks):
    background_tasks.add_task(send_email, email)
    return {"message": "User registered"}
```

**Giống**: Queue jobs trong Node.js

---

### 3. Middleware

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)
```

**Giống Express**:
```javascript
app.use(cors());
```

---

### 4. Exception Handling

```python
from fastapi import HTTPException

@app.get("/users/{user_id}")
def get_user(user_id: int):
    if user_id not in users:
        raise HTTPException(status_code=404, detail="User not found")
    return users[user_id]
```

**Giống Express**:
```javascript
app.get('/users/:user_id', (req, res) => {
  if (!users[user_id]) {
    return res.status(404).json({ detail: 'User not found' });
  }
  res.json(users[user_id]);
});
```

---

### 5. Lifespan Events (Startup/Shutdown)

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up...")
    load_model()
    yield
    # Shutdown
    print("Shutting down...")
    cleanup()

app = FastAPI(lifespan=lifespan)
```

**Giống Express**:
```javascript
app.listen(3000, () => {
  console.log('Starting up...');
  loadModel();
});

process.on('SIGTERM', () => {
  console.log('Shutting down...');
  cleanup();
});
```

---

## 📊 LUỒNG XỬ LÝ REQUEST

### Ví dụ: POST /query

```
1. Client gửi request:
   POST /query
   {
     "question": "Có bao nhiêu người?",
     "dongHoId": "DH001",
     "execute": true
   }

2. FastAPI nhận request:
   - Validate request body theo QueryRequest schema
   - Nếu sai format → return 422 error
   - Nếu đúng → gọi function process_query()

3. Function process_query() chạy:
   - request.question = "Có bao nhiêu người?"
   - request.dongHoId = "DH001"
   - request.execute = True
   
   - Generate SQL
   - Execute SQL (nếu execute=True)
   - Return response

4. FastAPI trả response:
   - Convert dict → JSON
   - Set Content-Type: application/json
   - Return về client
```

---

## 🎯 SO SÁNH TOÀN BỘ

| Tính năng | Express.js | FastAPI |
|-----------|-----------|---------|
| Routing | `app.get()` | `@app.get()` |
| Request body | `req.body` | `request: Model` |
| Response | `res.json()` | `return {}` |
| Validation | Manual (Joi) | Tự động (Pydantic) |
| Docs | Manual (Swagger) | Tự động |
| Type checking | TypeScript | Python types |
| Async | `async/await` | `async/await` |
| Middleware | `app.use()` | `app.add_middleware()` |

---

## 💡 TẠI SAO DÙNG FASTAPI?

### Ưu điểm:
1. ✅ **Tự động validate** - Không cần viết validation code
2. ✅ **Tự động docs** - Swagger UI miễn phí
3. ✅ **Type safety** - Ít bug hơn
4. ✅ **Nhanh** - Performance cao
5. ✅ **Dễ học** - Nếu biết Express

### Nhược điểm:
1. ❌ Python chậm hơn Node.js (nhưng FastAPI đã tối ưu)
2. ❌ Ecosystem nhỏ hơn Express

---

## 🚀 CHẠY FASTAPI

### 1. Cài đặt
```bash
pip install fastapi uvicorn
```

### 2. Tạo file `main.py`
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Hello World"}
```

### 3. Chạy
```bash
uvicorn main:app --reload --port 8000
```

**Giải thích**:
- `main`: Tên file (main.py)
- `app`: Tên biến FastAPI
- `--reload`: Auto restart khi code thay đổi
- `--port 8000`: Port

### 4. Test
```
http://localhost:8000/
http://localhost:8000/docs  ← Swagger UI
```

---

## 📚 HỌC THÊM

### Official Docs
- https://fastapi.tiangolo.com/
- Tutorial rất chi tiết, dễ hiểu

### Video
- "FastAPI Tutorial" by freeCodeCamp (YouTube)
- "FastAPI Course" by Traversy Media

### So sánh
- Nếu biết Express → Học FastAPI trong 1-2 ngày
- Syntax khác nhưng concept giống nhau

---

## 🎓 BÀI TẬP

### Bài 1: Tạo API đơn giản
```python
# Tạo API với 3 endpoints:
# GET /users - Trả danh sách users
# GET /users/{id} - Trả user theo ID
# POST /users - Tạo user mới
```

### Bài 2: Thêm validation
```python
# Tạo schema User với:
# - name: string, bắt buộc, min 3 chars
# - age: int, bắt buộc, 0-120
# - email: string, bắt buộc, format email
```

### Bài 3: Kết nối database
```python
# Kết nối MySQL
# Tạo CRUD endpoints cho table users
```

---

**Tóm lại**: FastAPI = Express của Python, dễ học, mạnh mẽ, tự động docs! 🚀

