# ========== STAGE 1: Build ==========
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files trước (tận dụng Docker cache)
COPY package*.json ./
COPY tsconfig.json ./

# Cài dependencies (bao gồm devDependencies để build)
RUN npm ci

# Copy source code
COPY src ./src

# Build TypeScript sang JavaScript
RUN npm run build

# ========== STAGE 2: Production ==========
FROM node:20-alpine AS production

WORKDIR /app

# Chỉ cài production dependencies
COPY package*.json ./
RUN npm ci --omit=dev

# Copy build output từ stage 1
COPY --from=builder /app/dist ./dist

# Tạo thư mục uploads
RUN mkdir -p uploads

# Tạo user non-root (bảo mật)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs

# Đổi ownership thư mục uploads
RUN chown -R nodejs:nodejs /app/uploads

USER nodejs

# Expose port
EXPOSE 6001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:6001/health || exit 1

# Start command
CMD ["node", "dist/index.js"]
