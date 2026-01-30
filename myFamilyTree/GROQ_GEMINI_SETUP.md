# 🤖 GROQ + Gemini AI Setup

## 🎯 Chiến lược

Hệ thống sử dụng **2 AI providers** với cơ chế fallback:

1. **GROQ** (Primary) - Nhanh, miễn phí, mạnh mẽ
2. **Gemini** (Fallback) - Backup khi GROQ lỗi

## 🔑 API Keys

### File `.env`
```env
# GROQ API (Primary)
GROQ_API_KEY=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

# Gemini API (Fallback)
GEMINI_API_KEY=AIzaSyDTxejxc9OvDU-ilO_sGrU8xeJBwlo1AlQ
```

## 🔄 Flow hoạt động

```
User gửi câu hỏi
    ↓
Build prompt
    ↓
Try GROQ API (llama-3.3-70b-versatile)
    ↓
    ├─ Success → Parse SQL → Execute
    │
    └─ Failed → Try Gemini API (gemini-1.5-flash)
              ↓
              ├─ Success → Parse SQL → Execute
              │
              └─ Failed → Return error
```

## 📊 So sánh

| Feature | GROQ | Gemini |
|---------|------|--------|
| **Model** | llama-3.3-70b-versatile | gemini-1.5-flash |
| **Speed** | ⚡ Rất nhanh (~1s) | 🐢 Trung bình (~2-3s) |
| **Cost** | 💰 Miễn phí | 💰 Miễn phí (có giới hạn) |
| **Quality** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Limit** | 30 req/min | 15 req/min |

## 🚀 Cách hoạt động

### 1. Khởi tạo
```typescript
constructor() {
  // Try GROQ first
  if (process.env.GROQ_API_KEY) {
    this.groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    console.log("✅ GROQ API initialized");
  }
  
  // Gemini as fallback
  if (process.env.GEMINI_API_KEY) {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.geminiModel = this.genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash" 
    });
    console.log("✅ Gemini API initialized");
  }
}
```

### 2. Gọi API với fallback
```typescript
try {
  // Try GROQ first
  if (this.groq) {
    console.log("🤖 Calling GROQ API...");
    generatedSQL = await this.callGroqAPI(prompt);
    usedAPI = "GROQ";
  }
} catch (groqError) {
  console.warn("⚠️ GROQ API failed:", groqError.message);
  
  // Fallback to Gemini
  if (this.geminiModel) {
    console.log("🔄 Falling back to Gemini API...");
    generatedSQL = await this.callGeminiAPI(prompt);
    usedAPI = "Gemini";
  }
}
```

### 3. Response
```json
{
  "success": true,
  "question": "Có bao nhiêu người trong gia phả?",
  "sql": "SELECT COUNT(*) FROM thanhvien WHERE dongHoId = '...' AND active_flag = 1",
  "result": {
    "type": "count",
    "value": 150,
    "message": "Kết quả: 150"
  },
  "usedAPI": "GROQ",  // Hoặc "Gemini"
  "timestamp": "2026-01-30T..."
}
```

## 📝 Logs

### GROQ thành công
```
📝 Prompt built for question: Có bao nhiêu người trong gia phả?
🤖 Calling GROQ API...
✅ GROQ response: SELECT COUNT(*) FROM thanhvien...
🔍 Parsed SQL: SELECT COUNT(*) FROM thanhvien...
💾 Executing SQL on database...
✅ Query executed successfully, 1 rows returned
```

### GROQ lỗi → Gemini thành công
```
📝 Prompt built for question: Có bao nhiêu người trong gia phả?
🤖 Calling GROQ API...
⚠️ GROQ API failed: Rate limit exceeded
🔄 Falling back to Gemini API...
✅ Gemini response: SELECT COUNT(*) FROM thanhvien...
🔍 Parsed SQL: SELECT COUNT(*) FROM thanhvien...
💾 Executing SQL on database...
✅ Query executed successfully, 1 rows returned
```

## 🔧 Configuration

### GROQ Settings
```typescript
{
  model: "llama-3.3-70b-versatile",  // Model mạnh nhất
  temperature: 0.1,                   // Ít sáng tạo, chính xác hơn
  max_tokens: 1024                    // Đủ cho SQL query
}
```

### Gemini Settings
```typescript
{
  model: "gemini-1.5-flash"  // Nhanh và miễn phí
}
```

## 🎯 Khi nào dùng gì?

### Chỉ GROQ
```env
GROQ_API_KEY=your_key
# GEMINI_API_KEY không cần
```
→ Nhanh nhất, nhưng không có backup

### Chỉ Gemini
```env
# GROQ_API_KEY không cần
GEMINI_API_KEY=your_key
```
→ Chậm hơn, nhưng ổn định

### Cả hai (Recommended)
```env
GROQ_API_KEY=your_key
GEMINI_API_KEY=your_key
```
→ Tốt nhất: Nhanh + Có backup

## 🐛 Troubleshooting

### Lỗi: "Neither GROQ_API_KEY nor GEMINI_API_KEY found"
**Giải pháp:** Thêm ít nhất 1 API key vào `.env`

### Lỗi: "GROQ API failed: Rate limit exceeded"
**Giải pháp:** Hệ thống tự động fallback sang Gemini

### Lỗi: "Both GROQ and Gemini APIs failed"
**Giải pháp:** 
- Kiểm tra API keys còn hoạt động
- Kiểm tra internet connection
- Kiểm tra rate limits

## 📊 Performance

### GROQ
- **Response time:** ~1 second
- **Rate limit:** 30 requests/minute
- **Best for:** Production, high traffic

### Gemini
- **Response time:** ~2-3 seconds
- **Rate limit:** 15 requests/minute
- **Best for:** Backup, low traffic

## 🔒 Security

- ✅ API keys trong `.env` (không commit)
- ✅ Validate SQL trước khi execute
- ✅ Chỉ cho phép SELECT queries
- ✅ Log errors nhưng không log API keys

## 📚 Models

### GROQ Models
- `llama-3.3-70b-versatile` ⭐ (Đang dùng)
- `llama-3.1-70b-versatile`
- `mixtral-8x7b-32768`

### Gemini Models
- `gemini-1.5-flash` ⭐ (Đang dùng)
- `gemini-1.5-pro` (Chậm hơn, thông minh hơn)
- `gemini-pro` (Deprecated)

## 🎉 Kết luận

Hệ thống dual-AI này đảm bảo:
- ⚡ Tốc độ cao với GROQ
- 🛡️ Độ tin cậy với Gemini fallback
- 💰 Chi phí thấp (cả 2 đều miễn phí)
- 📊 Tracking API usage

---

**Updated:** 2026-01-30  
**Status:** ✅ Production Ready
