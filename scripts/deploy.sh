#!/bin/bash
# ============================================
# DEPLOY SCRIPT - Triển khai lên server
# Chạy trên server production
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

PROJECT_DIR="/opt/familytree"

echo "=========================================="
echo "🚀 Starting deployment at $(date)"
echo "=========================================="

cd $PROJECT_DIR

# ========== Pull latest code ==========
echo -e "${GREEN}[1/5] Pulling latest code...${NC}"
git fetch origin
git reset --hard origin/main
echo "✅ Code updated"

# ========== Backup before deploy ==========
echo -e "${GREEN}[2/5] Creating backup...${NC}"
./scripts/backup.sh
echo "✅ Backup created"

# ========== Build images ==========
echo -e "${GREEN}[3/5] Building Docker images...${NC}"
docker compose build --no-cache
echo "✅ Images built"

# ========== Deploy ==========
echo -e "${GREEN}[4/5] Deploying containers...${NC}"
docker compose up -d
echo "✅ Containers deployed"

# ========== Cleanup ==========
echo -e "${GREEN}[5/5] Cleaning up...${NC}"
docker image prune -f
echo "✅ Cleanup done"

# ========== Health check ==========
echo ""
echo "Waiting for services to start..."
sleep 10

echo ""
echo "=========================================="
echo "📊 Service Status:"
echo "=========================================="
docker compose ps

echo ""
echo "=========================================="
echo "✅ Deployment completed at $(date)"
echo "=========================================="
