# 🔗 HƯỚNG DẪN TÍCH HỢP AI SERVICE VÀO HỆ THỐNG

## 📋 TỔNG QUAN

Tích hợp AI Text-to-SQL vào hệ thống Family Tree với:
- ✅ Backend đã có sẵn integration
- ✅ AI Service đã cập nhật thu thập câu hỏi
- ✅ Frontend cần cập nhật để sử dụng

---

## 🏗️ KIẾN TRÚC

```
Frontend (Next.js)
    ↓ HTTP Request
Backend (Express/TypeScript)
    ↓ HTTP Request
AI Service (FastAPI/Python)
    ↓ SQL Query
Database (MySQL)
```

---

## ✅ ĐÃ HOÀN THÀNH

### 1. Backend Integration
**File:** `myFamilyTree/src/services/aiQueryService.ts`
- ✅ Đã có service gọi AI
- ✅ Đã có error handling
- ✅ Đã có logging

**File:** `myFamilyTree/src/controllers/aiQueryController.ts`
- ✅ Đã có controller
- ✅ Đã có 3 endpoints:
  - POST `/api-core/ai/ask` - Hỏi câu hỏi
  - POST `/api-core/ai/test` - Test SQL
  - GET `/api-core/ai/health` - Check health

### 2. AI Service Updates
**File:** `ai-service/main.py`
- ✅ Thêm logging functions
- ✅ Thu thập câu hỏi tự động
- ✅ Thu thập kết quả query
- ✅ Thêm 3 endpoints mới:
  - GET `/logs/questions` - Xem câu hỏi đã thu thập
  - GET `/logs/results` - Xem kết quả queries
  - POST `/dataset/export` - Export dataset

---

## 🚀 BƯỚC TRIỂN KHAI

### BƯỚC 1: Khởi động AI Service

```bash
# Terminal 1: AI Service
cd ai-service

# Cài đặt dependencies (nếu chưa)
pip install -r requirements.txt

# Chạy server
python main.py
# hoặc
uvicorn main:app --host 0.0.0.0 --port 7000

# Kiểm tra
# → Server running on http://0.0.0.0:7000
```

### BƯỚC 2: Cấu hình Backend

**File:** `myFamilyTree/.env`

```env
# Thêm dòng này
AI_SERVICE_URL=http://localhost:7000
```

### BƯỚC 3: Khởi động Backend

```bash
# Terminal 2: Backend
cd myFamilyTree

# Cài đặt dependencies (nếu chưa)
npm install

# Chạy server
npm run dev

# Kiểm tra
# → Server running on http://localhost:3001
```

### BƯỚC 4: Test Integration

```bash
# Terminal 3: Test
curl -X POST http://localhost:3001/api-core/ai/ask \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "question": "Có bao nhiêu người trong gia phả?",
    "dongHoId": "025721a4-bd0d-4447-9b9b-505d174de937"
  }'
```

**Kết quả mong đợi:**
```json
{
  "success": true,
  "message": "Truy vấn thành công",
  "data": {
    "question": "Có bao nhiêu người trong gia phả?",
    "sql": "SELECT COUNT(*) as tong_so FROM thanhvien WHERE dongHoId = ? AND active_flag = 1",
    "confidence": "100.0%",
    "results": [{"tong_so": 319}],
    "row_count": 1
  }
}
```

---

## 🎨 FRONTEND INTEGRATION

### Tạo Service File

**File:** `FE/tree/service/aiQuery.service.ts`

```typescript
import { apiClient } from '@/lib/api';
import { parseApiError } from '@/lib/apiError';

const prefix = `${process.env.NEXT_PUBLIC_API_CORE}/ai`;

export interface AIQueryRequest {
  question: string;
  dongHoId: string;
}

export interface AIQueryResponse {
  success: boolean;
  message: string;
  data: {
    question: string;
    sql: string;
    confidence: string;
    results: any[];
    row_count: number;
    error?: string;
  };
}

/**
 * Hỏi câu hỏi bằng tiếng Việt
 */
export const askAIQuestion = async (data: AIQueryRequest): Promise<AIQueryResponse> => {
  try {
    const res = await apiClient.post(`${prefix}/ask`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[askAIQuestion] ${err.message}`);
    throw new Error(err.message);
  }
};

/**
 * Test SQL generation (không execute)
 */
export const testAIQuestion = async (data: AIQueryRequest): Promise<any> => {
  try {
    const res = await apiClient.post(`${prefix}/test`, data);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[testAIQuestion] ${err.message}`);
    throw new Error(err.message);
  }
};

/**
 * Check AI service health
 */
export const checkAIHealth = async (): Promise<any> => {
  try {
    const res = await apiClient.get(`${prefix}/health`);
    return res?.data;
  } catch (error: any) {
    const err = parseApiError(error);
    console.error(`[checkAIHealth] ${err.message}`);
    return { success: false, healthy: false };
  }
};
```

### Tạo Component AI Chat

**File:** `FE/tree/app/(full-page)/ai-chat/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { askAIQuestion } from '@/service/aiQuery.service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

export default function AIChatPage() {
  const { user } = useAuth();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Vui lòng nhập câu hỏi');
      return;
    }

    if (!user?.dongHoId) {
      setError('Không tìm thấy thông tin dòng họ');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await askAIQuestion({
        question: question.trim(),
        dongHoId: user.dongHoId
      });

      if (response.success) {
        setResult(response.data);
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (err: any) {
      setError(err.message || 'Không thể kết nối AI Service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🤖 Hỏi đáp AI</h1>

      {/* Input */}
      <Card className="p-6 mb-6">
        <div className="flex gap-4">
          <Input
            placeholder="Ví dụ: Có bao nhiêu người trong gia phả?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAsk()}
            disabled={loading}
            className="flex-1"
          />
          <Button onClick={handleAsk} disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Hỏi'}
          </Button>
        </div>
      </Card>

      {/* Error */}
      {error && (
        <Card className="p-4 mb-6 bg-red-50 border-red-200">
          <p className="text-red-600">❌ {error}</p>
        </Card>
      )}

      {/* Result */}
      {result && (
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Kết quả</h2>
          
          {/* Question */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">Câu hỏi:</p>
            <p className="font-medium">{result.question}</p>
          </div>

          {/* SQL */}
          <div className="mb-4">
            <p className="text-sm text-gray-500">SQL Generated:</p>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
              {result.sql}
            </pre>
            <p className="text-sm text-gray-500 mt-1">
              Confidence: {result.confidence}
            </p>
          </div>

          {/* Results */}
          {result.results && result.results.length > 0 && (
            <div>
              <p className="text-sm text-gray-500 mb-2">
                Kết quả ({result.row_count} dòng):
              </p>
              <div className="bg-gray-50 p-4 rounded">
                <pre className="text-sm">
                  {JSON.stringify(result.results, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {/* Error */}
          {result.error && (
            <div className="mt-4 p-4 bg-red-50 rounded">
              <p className="text-red-600">Lỗi: {result.error}</p>
            </div>
          )}
        </Card>
      )}

      {/* Examples */}
      <Card className="p-6 mt-6">
        <h3 className="font-bold mb-3">💡 Câu hỏi mẫu:</h3>
        <div className="space-y-2">
          {[
            'Có bao nhiêu người trong gia phả?',
            'Nguyễn Văn A sinh năm nào?',
            'Ai là con của Trần Thị B?',
            'Có bao nhiêu người làm nông dân?',
            'Ai là người già nhất?'
          ].map((example, index) => (
            <button
              key={index}
              onClick={() => setQuestion(example)}
              className="block w-full text-left p-2 hover:bg-gray-100 rounded"
            >
              {example}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}
```

---

## 📊 THU THẬP VÀ EXPORT DATASET

### Xem câu hỏi đã thu thập

```bash
curl http://localhost:7000/logs/questions
```

**Response:**
```json
{
  "success": true,
  "total": 150,
  "questions": [
    {
      "timestamp": "2026-01-25T10:30:00",
      "dongHoId": "DH001",
      "question": "Có bao nhiêu người trong gia phả?"
    }
  ],
  "message": "Đã thu thập 150 câu hỏi"
}
```

### Xem kết quả queries

```bash
curl http://localhost:7000/logs/results
```

**Response:**
```json
{
  "success": true,
  "total": 150,
  "success_count": 120,
  "error_count": 30,
  "accuracy": "80.0%",
  "results": [...]
}
```

### Export dataset để fine-tune

```bash
curl -X POST http://localhost:7000/dataset/export
```

**Response:**
```json
{
  "success": true,
  "total": 120,
  "file": "dataset/collected_questions_20260125_103000.json",
  "message": "Đã export 120 câu hỏi"
}
```

---

## 🎯 WORKFLOW HOÀN CHỈNH

```
1. User hỏi câu hỏi trên Frontend
   ↓
2. Frontend gọi Backend API
   ↓
3. Backend gọi AI Service
   ↓
4. AI Service:
   - Generate SQL
   - Execute SQL
   - ✅ Log câu hỏi vào logs/questions.txt
   - ✅ Log kết quả vào logs/query_results.jsonl
   ↓
5. Trả kết quả về Frontend
   ↓
6. Sau 1-2 tuần:
   - Export dataset: POST /dataset/export
   - Review và verify SQL
   - Fine-tune model
   - Deploy model mới
   ↓
7. Accuracy tăng từ 70% → 90%!
```

---

## 📝 CHECKLIST

### Setup
- [ ] AI Service chạy trên port 7000
- [ ] Backend chạy trên port 3001
- [ ] Frontend chạy trên port 3000
- [ ] Cấu hình AI_SERVICE_URL trong .env

### Testing
- [ ] Test health check
- [ ] Test ask question
- [ ] Test với nhiều câu hỏi khác nhau
- [ ] Kiểm tra logs/questions.txt
- [ ] Kiểm tra logs/query_results.jsonl

### Frontend
- [ ] Tạo service file
- [ ] Tạo AI chat page
- [ ] Test UI
- [ ] Thêm vào menu

### Data Collection
- [ ] Chạy 1-2 tuần
- [ ] Thu thập 100-500 câu hỏi
- [ ] Export dataset
- [ ] Review và verify
- [ ] Fine-tune model

---

## 🐛 TROUBLESHOOTING

### Lỗi: "AI Service không khả dụng"
```bash
# Kiểm tra AI Service có chạy không
curl http://localhost:7000/health

# Nếu không chạy, start lại
cd ai-service
python main.py
```

### Lỗi: "ECONNREFUSED"
```bash
# Kiểm tra port
netstat -ano | findstr :7000

# Kiểm tra firewall
# Cho phép port 7000
```

### Lỗi: "Model loading chậm"
```bash
# Xem hướng dẫn tối ưu
cat ai-service/MODEL_LOADING_OPTIMIZATION.md
```

---

Hoàn thành! Hệ thống đã sẵn sàng thu thập câu hỏi và fine-tune! 🚀
