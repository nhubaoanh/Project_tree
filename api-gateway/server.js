require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8080;
const URL_CORE = process.env.URL_CORE || 'http://localhost:6001';
const URL_FIREWORK = process.env.URL_FIREWORK || 'http://localhost:6002';
const JWT_SECRET = 'thong tin cua gia dinh toi nhe 21';

// ============================================================================
// CORS
// ============================================================================
app.use(cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  credentials: true
}));

// ============================================================================
// LOGGING
// ============================================================================
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ============================================================================
// PUBLIC PATHS
// ============================================================================
const publicPaths = [
  '/api-core/users/login',
  '/api-core/users/reset-password',
  '/api-core/users/signup',
  '/api-core/users/authorize',
  '/api-core/users/checkuser',
  '/api-firework/dongho/get-all'
];

const isPublicPath = (url) => {
  return publicPaths.some(path => url.startsWith(path));
};

// ============================================================================
// AUTH MIDDLEWARE
// ============================================================================
const verifyToken = (req, res, next) => {
  if (isPublicPath(req.originalUrl)) {
    return next();
  }
  
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(403).json({ message: 'Bạn không có quyền truy cập!', success: false });
  }
  
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token không hợp lệ!', success: false });
    }
    req.account = decoded;
    next();
  });
};

// ============================================================================
// HEALTH CHECK
// ============================================================================
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'API Gateway is running' });
});

// ============================================================================
// PROXY - Dùng filter thay vì path prefix
// ============================================================================
const coreProxy = createProxyMiddleware({
  target: URL_CORE,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req) => {
      console.log(`[PROXY CORE] -> ${URL_CORE}${req.originalUrl}`);
    },
    error: (err, req, res) => {
      console.error('[PROXY ERROR]', err.message);
      if (!res.headersSent) {
        res.status(502).json({ message: 'Lỗi kết nối server', success: false });
      }
    }
  }
});

const fireworkProxy = createProxyMiddleware({
  target: URL_FIREWORK,
  changeOrigin: true,
  on: {
    proxyReq: (proxyReq, req) => {
      console.log(`[PROXY FIREWORK] -> ${URL_FIREWORK}${req.originalUrl}`);
    },
    error: (err, req, res) => {
      console.error('[PROXY ERROR]', err.message);
      if (!res.headersSent) {
        res.status(502).json({ message: 'Lỗi kết nối server', success: false });
      }
    }
  }
});

// Route handler - giữ nguyên path
app.all('/api-core/*', verifyToken, (req, res, next) => {
  coreProxy(req, res, next);
});

app.all('/api-firework/*', verifyToken, (req, res, next) => {
  fireworkProxy(req, res, next);
});

// ============================================================================
// 404
// ============================================================================
app.use((req, res) => {
  res.status(404).json({ message: 'Gateway: Route not found', path: req.originalUrl });
});

// ============================================================================
// START
// ============================================================================
app.listen(PORT, () => {
  console.log(`[Gateway] Running on port ${PORT}`);
  console.log(`[Gateway] Core: ${URL_CORE}`);
  console.log(`[Gateway] Firework: ${URL_FIREWORK}`);
});
