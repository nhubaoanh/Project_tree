# 🔴 Security Test Suite

Bộ công cụ test bảo mật cho API.

## 📁 Cấu trúc

```
security-test/
├── attack-simulator.ts   ← Test đầy đủ bằng TypeScript
├── quick-test.ps1        ← Test nhanh cho Windows (PowerShell)
├── quick-test.sh         ← Test nhanh cho Linux/Mac (Bash)
└── README.md             ← File này
```

## 🚀 Cách chạy

### 1. Đảm bảo server đang chạy
```bash
cd myFamilyTree
npm run dev
```

### 2. Chạy test

**Windows (PowerShell):**
```powershell
cd security-test
.\quick-test.ps1
```

**Linux/Mac (Bash):**
```bash
cd security-test
chmod +x quick-test.sh
./quick-test.sh
```

**TypeScript (đầy đủ):**
```bash
cd myFamilyTree
npx ts-node security-test/attack-simulator.ts
```

## 📊 Các test bao gồm

| # | Test | Mô tả |
|---|------|-------|
| 1 | SQL Injection | `' OR '1'='1`, `DROP TABLE`, `UNION SELECT` |
| 2 | XSS Attack | `<script>`, `onerror=`, `javascript:` |
| 3 | Brute Force | 6 requests liên tục để test rate limiting |
| 4 | Input Validation | Empty fields, short password, invalid format |
| 5 | Security Headers | X-Frame-Options, X-Content-Type-Options |
| 6 | Large Payload | 15KB payload (vượt giới hạn 10KB) |
| 7 | NoSQL Injection | `$ne`, `$gt`, `$regex` operators |
| 8 | HTTP Parameter Pollution | `?id=1&id=2&id=admin` |
| 9 | ThanhVien Validation | Test validation cho thành viên |

## ✅ Kết quả mong đợi

- **SQL Injection**: Status 400, bị block
- **XSS**: Payload bị loại bỏ/escape
- **Rate Limiting**: Status 429 sau 5-6 requests
- **Validation**: Status 400 với message lỗi rõ ràng
- **Security Headers**: Có đủ các headers bảo mật
- **Large Payload**: Status 413 hoặc 400

## ⚠️ Lưu ý

- Chạy test trên môi trường development, KHÔNG chạy trên production
- Rate limiting test sẽ block IP trong 15 phút, restart server để reset
- Một số test có thể fail nếu chưa cấu hình đầy đủ middleware
