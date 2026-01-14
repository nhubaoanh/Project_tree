# 🔧 KẾ HOẠCH REFACTOR BACKEND - myFamilyTree

## 📊 TỔNG QUAN

**Đánh giá hiện tại**: B- (Good foundation, needs refactoring)
**Mục tiêu**: A (Production-ready, maintainable, secure)

---

## 🎯 PHASE 1: CRITICAL FIXES (Tuần 1-2) - BẮT BUỘC

### 1.1 Security Critical Issues

#### ❌ **Issue #1: MD5 Password Hashing**
**Vấn đề**: MD5 không an toàn, dễ bị rainbow table attack
**File**: `myFamilyTree/src/services/nguoidungService.ts`

**Giải pháp**:
```typescript
// Thay thế md5 bằng bcrypt
import bcrypt from 'bcrypt';

// Old (KHÔNG AN TOÀN)
const hashedPassword = md5(password);

// New (AN TOÀN)
const saltRounds = 10;
const hashedPassword = await bcrypt.hash(password, saltRounds);

// Verify
const isMatch = await bcrypt.compare(password, hashedPassword);
```

**Action Items**:
- [ ] Install: `npm install bcrypt @types/bcrypt`
- [ ] Tạo `src/ultis/passwordHelper.ts`
- [ ] Update `nguoidungService.ts`
- [ ] Migration script để hash lại passwords cũ
- [ ] Remove `md5` package

---

#### ⚠️ **Issue #2: Hardcoded Secrets**
**Vấn đề**: JWT secret, DB credentials hardcoded

**Giải pháp**:
```typescript
// myFamilyTree/src/config/config.ts
export const config = {
  jwt: {
    secret: env('JWT_SECRET'), // KHÔNG có default value
    expiresIn: env('JWT_EXPIRES_IN', '24h')
  },
  db: {
    password: env('DB_PASSWORD'), // KHÔNG có default value
  }
};
```

**Action Items**:
- [ ] Update `.env.example` với tất cả required variables
- [ ] Remove hardcoded defaults từ `config.ts`
- [ ] Add validation: throw error nếu thiếu required env vars
- [ ] Update deployment docs

---

#### ⚠️ **Issue #3: Incomplete Authorization**
**Vấn đề**: TODO comment trong `authMiddleware.ts`, không check database

**Giải pháp**:
```typescript
// Tạo service mới: rolePermissionService.ts
async checkPermission(userId: string, chucNangCode: string): Promise<boolean> {
  const sql = `
    SELECT COUNT(*) as count
    FROM role_chucnang rc
    JOIN nguoidung nd ON nd.roleId = rc.roleId
    WHERE nd.nguoiDungId = ? AND rc.chucNangCode = ? AND rc.active_flag = 1
  `;
  const [result] = await this.db.query(sql, [userId, chucNangCode]);
  return result[0].count > 0;
}
```

**Action Items**:
- [ ] Tạo `rolePermissionService.ts`
- [ ] Update `authMiddleware.ts` để check database
- [ ] Remove TODO comment
- [ ] Add caching cho permissions (Redis hoặc in-memory)

---

#### ⚠️ **Issue #4: CSRF Protection**
**Vấn đề**: Không có CSRF token validation

**Giải pháp**:
```typescript
import csrf from 'csurf';

// app.ts
const csrfProtection = csrf({ cookie: true });
app.use(csrfProtection);

// Middleware để gửi token
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
```

**Action Items**:
- [ ] Install: `npm install csurf @types/csurf`
- [ ] Add CSRF middleware
- [ ] Update frontend để gửi CSRF token
- [ ] Exclude public endpoints (login, register)

---

### 1.2 Code Quality Critical Issues

#### ❌ **Issue #5: Repository Naming Typo**
**Vấn đề**: `Respository` thay vì `Repository`

**Files cần rename**:
- `thanhVienRespository.ts` → `thanhVienRepository.ts`
- `taiChinhChiRespository.ts` → `taiChinhChiRepository.ts`
- `dongHoRespository.ts` → `dongHoRepository.ts`
- `loaiSuKienRespository.ts` → `loaiSuKienRepository.ts`
- `nguoidungResponsitory.ts` → `nguoidungRepository.ts`
- `roleRespository.ts` → `roleRepository.ts`
- `suKienRespository.ts` → `suKienRepository.ts`
- `taiChinhThuRespository.ts` → `taiChinhThuRepository.ts`
- `thongKeRespository.ts` → `thongKeRepository.ts`

**Action Items**:
- [ ] Rename tất cả files
- [ ] Update imports trong services
- [ ] Update imports trong controllers
- [ ] Test lại toàn bộ endpoints

---

#### ❌ **Issue #6: Unused Dependencies**
**Vấn đề**: `recoil` (React state management) không dùng

**Action Items**:
- [ ] Remove: `npm uninstall recoil`
- [ ] Scan unused imports: `npx depcheck`
- [ ] Remove unused packages

---

## 🎯 PHASE 2: HIGH PRIORITY REFACTORING (Tuần 3-4)

### 2.1 Reduce Code Duplication

#### ❌ **Issue #7: Generic Service Base Class**
**Vấn đề**: 13 services có cùng CRUD pattern

**Giải pháp**: Tạo Generic Base Service

```typescript
// src/core/BaseService.ts
export abstract class BaseService<T, TRepository> {
  constructor(protected repository: TRepository) {}

  async create(data: T): Promise<any> {
    return await this.repository.create(data);
  }

  async update(data: T): Promise<any> {
    return await this.repository.update(data);
  }

  async delete(id: string): Promise<any> {
    return await this.repository.delete(id);
  }

  async getById(id: string): Promise<T | null> {
    return await this.repository.getById(id);
  }
}

// Usage
export class TaiLieuService extends BaseService<TaiLieu, TaiLieuRepository> {
  constructor(repository: TaiLieuRepository) {
    super(repository);
  }

  // Chỉ implement custom methods
  async searchWithFilters(filters: any): Promise<TaiLieu[]> {
    // Custom logic
  }
}
```

**Action Items**:
- [ ] Tạo `src/core/BaseService.ts`
- [ ] Tạo `src/core/BaseRepository.ts`
- [ ] Refactor 13 services để extend BaseService
- [ ] Refactor 11 repositories để extend BaseRepository
- [ ] Test lại toàn bộ

---

### 2.2 Standardize Response Format

#### ⚠️ **Issue #8: Inconsistent Response**
**Vấn đề**: Mỗi endpoint trả về format khác nhau

**Giải pháp**: Tạo Response Wrapper

```typescript
// src/ultis/responseWrapper.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    pageSize?: number;
    totalItems?: number;
    totalPages?: number;
  };
}

export class ResponseWrapper {
  static success<T>(data: T, message?: string): ApiResponse<T> {
    return { success: true, data, message };
  }

  static error(code: string, message: string, details?: any): ApiResponse {
    return { success: false, error: { code, message, details } };
  }

  static paginated<T>(
    data: T[],
    page: number,
    pageSize: number,
    totalItems: number
  ): ApiResponse<T[]> {
    return {
      success: true,
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages: Math.ceil(totalItems / pageSize),
      },
    };
  }
}
```

**Action Items**:
- [ ] Tạo `responseWrapper.ts`
- [ ] Update tất cả controllers để dùng ResponseWrapper
- [ ] Update frontend để parse new format
- [ ] Add response interceptor

---

### 2.3 Custom Error Classes

#### ⚠️ **Issue #9: Generic Error Handling**
**Vấn đề**: Throw generic Error, không có error types

**Giải pháp**: Tạo Custom Error Classes

```typescript
// src/errors/AppError.ts
export class AppError extends Error {
  constructor(
    public statusCode: number,
    public code: string,
    message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: any) {
    super(400, 'VALIDATION_ERROR', message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(404, 'NOT_FOUND', `${resource} not found`);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, 'UNAUTHORIZED', message);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, 'FORBIDDEN', message);
  }
}
```

**Action Items**:
- [ ] Tạo custom error classes
- [ ] Update error handler để handle custom errors
- [ ] Replace tất cả `throw new Error()` bằng custom errors
- [ ] Add error code constants

---

### 2.4 Logging Framework

#### ⚠️ **Issue #10: No Logging Framework**
**Vấn đề**: Chỉ dùng console.log/error

**Giải pháp**: Implement Winston Logger

```typescript
// src/ultis/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

**Action Items**:
- [ ] Install: `npm install winston`
- [ ] Tạo logger utility
- [ ] Replace tất cả console.log/error
- [ ] Add request logging middleware
- [ ] Add log rotation (winston-daily-rotate-file)

---

## 🎯 PHASE 3: MEDIUM PRIORITY (Tuần 5-6)

### 3.1 API Documentation

#### ⚠️ **Issue #11: No API Documentation**

**Giải pháp**: Add Swagger/OpenAPI

```typescript
// Install
npm install swagger-jsdoc swagger-ui-express @types/swagger-jsdoc @types/swagger-ui-express

// src/config/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Family Tree API',
      version: '1.0.0',
      description: 'API documentation for Family Tree Management System',
    },
    servers: [
      { url: 'http://localhost:6001', description: 'Development' },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
```

**Action Items**:
- [ ] Install Swagger packages
- [ ] Add Swagger config
- [ ] Add JSDoc comments cho tất cả endpoints
- [ ] Mount Swagger UI: `/api-docs`
- [ ] Add authentication to Swagger

---

### 3.2 Database Optimization

#### ⚠️ **Issue #12: No Indexes**

**Giải pháp**: Add Database Indexes

```sql
-- Indexes cho frequently queried columns
CREATE INDEX idx_thanhvien_dongho ON thanhvien(dongHoId);
CREATE INDEX idx_thanhvien_hoten ON thanhvien(hoTen);
CREATE INDEX idx_nguoidung_email ON nguoidung(email);
CREATE INDEX idx_sukien_dongho_date ON sukien(dongHoId, ngayDienRa);
CREATE INDEX idx_tailieu_dongho_loai ON tailieu(dongHoId, loaiTaiLieu);

-- Composite indexes
CREATE INDEX idx_thanhvien_composite ON thanhvien(dongHoId, thanhVienId);
```

**Action Items**:
- [ ] Analyze slow queries
- [ ] Create index migration script
- [ ] Add indexes
- [ ] Test query performance
- [ ] Monitor index usage

---

### 3.3 Caching Layer

#### ⚠️ **Issue #13: No Caching**

**Giải pháp**: Implement Redis Caching

```typescript
// src/config/redis.ts
import Redis from 'ioredis';

export const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
});

// src/ultis/cacheHelper.ts
export class CacheHelper {
  static async get<T>(key: string): Promise<T | null> {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  static async set(key: string, value: any, ttl = 300): Promise<void> {
    await redis.setex(key, ttl, JSON.stringify(value));
  }

  static async del(key: string): Promise<void> {
    await redis.del(key);
  }

  static async invalidatePattern(pattern: string): Promise<void> {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  }
}
```

**Action Items**:
- [ ] Install Redis: `npm install ioredis @types/ioredis`
- [ ] Setup Redis server
- [ ] Implement cache helper
- [ ] Add caching cho frequently accessed data
- [ ] Add cache invalidation logic

---

### 3.4 Transaction Support

#### ⚠️ **Issue #14: No Transactions**

**Giải pháp**: Implement Transaction Wrapper

```typescript
// src/ultis/transactionHelper.ts
export class TransactionHelper {
  static async execute<T>(
    db: Database,
    callback: (connection: any) => Promise<T>
  ): Promise<T> {
    const connection = await db.getRawConnection();
    await connection.beginTransaction();

    try {
      const result = await callback(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

// Usage
await TransactionHelper.execute(this.db, async (conn) => {
  await conn.query('INSERT INTO thanhvien ...', []);
  await conn.query('INSERT INTO quanhe ...', []);
  return { success: true };
});
```

**Action Items**:
- [ ] Tạo transaction helper
- [ ] Update import methods để dùng transactions
- [ ] Update delete methods (cascade deletes)
- [ ] Test rollback scenarios

---

## 🎯 PHASE 4: LOW PRIORITY (Tuần 7-8)

### 4.1 Testing

#### ❌ **Issue #15: No Tests**

**Giải pháp**: Add Unit & Integration Tests

```typescript
// Install
npm install --save-dev jest @types/jest ts-jest supertest @types/supertest

// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
};

// Example test
describe('TaiLieuService', () => {
  it('should create document', async () => {
    const service = new TaiLieuService(mockRepository);
    const result = await service.create(mockData);
    expect(result.success).toBe(true);
  });
});
```

**Action Items**:
- [ ] Setup Jest
- [ ] Write unit tests cho services (target: 80% coverage)
- [ ] Write integration tests cho APIs
- [ ] Add CI/CD pipeline (GitHub Actions)
- [ ] Add test coverage reporting

---

### 4.2 API Versioning

#### ⚠️ **Issue #16: No Versioning**

**Giải pháp**: Add API Versioning

```typescript
// src/routes/index.ts
import v1Router from './v1';
import v2Router from './v2';

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);

// Default to latest version
app.use('/api', v2Router);
```

**Action Items**:
- [ ] Create v1 folder với current routes
- [ ] Update all routes to `/api/v1`
- [ ] Update frontend API calls
- [ ] Add deprecation warnings
- [ ] Document versioning strategy

---

### 4.3 Performance Monitoring

#### ⚠️ **Issue #17: No Monitoring**

**Giải pháp**: Add APM (Application Performance Monitoring)

```typescript
// Option 1: New Relic
import newrelic from 'newrelic';

// Option 2: Prometheus + Grafana
import promClient from 'prom-client';

const httpRequestDuration = new promClient.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
});

// Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    httpRequestDuration.labels(req.method, req.route?.path, res.statusCode.toString()).observe(duration);
  });
  next();
});
```

**Action Items**:
- [ ] Choose APM solution (New Relic / Prometheus)
- [ ] Add performance metrics
- [ ] Setup dashboards
- [ ] Add alerting
- [ ] Monitor slow queries

---

## 📋 IMPLEMENTATION CHECKLIST

### Week 1-2: Critical Fixes
- [ ] Replace MD5 with bcrypt
- [ ] Remove hardcoded secrets
- [ ] Implement proper authorization
- [ ] Add CSRF protection
- [ ] Fix repository naming typo
- [ ] Remove unused dependencies

### Week 3-4: High Priority Refactoring
- [ ] Create Generic Base Service/Repository
- [ ] Standardize response format
- [ ] Add custom error classes
- [ ] Implement logging framework
- [ ] Add Swagger documentation
- [ ] Add database indexes

### Week 5-6: Medium Priority
- [ ] Implement Redis caching
- [ ] Add transaction support
- [ ] Optimize N+1 queries
- [ ] Add request validation middleware
- [ ] Implement soft delete middleware

### Week 7-8: Low Priority
- [ ] Add unit tests (80% coverage)
- [ ] Add integration tests
- [ ] Implement API versioning
- [ ] Add performance monitoring
- [ ] Setup CI/CD pipeline

---

## 🎯 SUCCESS METRICS

| Metric | Current | Target |
|--------|---------|--------|
| Code Duplication | High | Low |
| Test Coverage | 0% | 80% |
| Security Score | C | A |
| API Response Time | ? | <200ms |
| Error Rate | ? | <1% |
| Code Quality | B- | A |

---

## 🚀 DEPLOYMENT STRATEGY

### 1. Development
- Implement changes in feature branches
- Code review required
- Run tests before merge

### 2. Staging
- Deploy to staging environment
- Run integration tests
- Performance testing

### 3. Production
- Blue-green deployment
- Gradual rollout (10% → 50% → 100%)
- Monitor metrics
- Rollback plan ready

---

## 📚 DOCUMENTATION UPDATES

- [ ] Update README.md
- [ ] Add CONTRIBUTING.md
- [ ] Add ARCHITECTURE.md
- [ ] Add API_DOCUMENTATION.md
- [ ] Add DEPLOYMENT.md
- [ ] Add SECURITY.md

---

## 💡 NOTES

- **Backward Compatibility**: Maintain old endpoints during migration
- **Database Migrations**: Use migration scripts, không alter trực tiếp
- **Testing**: Test thoroughly trước khi deploy
- **Monitoring**: Monitor metrics sau mỗi deployment
- **Rollback**: Luôn có rollback plan

---

## 🤝 TEAM COORDINATION

- **Daily Standup**: Review progress
- **Code Review**: Tất cả PRs cần review
- **Documentation**: Update docs khi code changes
- **Communication**: Slack/Discord cho urgent issues

---

**Last Updated**: 2025-01-14
**Version**: 1.0
**Status**: Ready for Implementation
