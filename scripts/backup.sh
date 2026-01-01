#!/bin/bash
# ============================================
# BACKUP SCRIPT - Chạy hàng ngày qua cron
# ============================================

set -e

# Configuration
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)
MYSQL_CONTAINER="familytree-mysql"
RETENTION_DAYS=7

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "=========================================="
echo "Starting backup at $(date)"
echo "=========================================="

# Create backup directory
mkdir -p $BACKUP_DIR

# ========== Backup MySQL ==========
echo -e "${GREEN}[1/3] Backing up MySQL database...${NC}"
docker exec $MYSQL_CONTAINER mysqldump \
    -u root \
    -p$MYSQL_ROOT_PASSWORD \
    --single-transaction \
    --routines \
    --triggers \
    familytree > $BACKUP_DIR/db_$DATE.sql

if [ $? -eq 0 ]; then
    gzip $BACKUP_DIR/db_$DATE.sql
    echo "✅ Database backup: db_$DATE.sql.gz"
else
    echo -e "${RED}❌ Database backup failed!${NC}"
    exit 1
fi

# ========== Backup Uploads ==========
echo -e "${GREEN}[2/3] Backing up uploads...${NC}"
UPLOADS_PATH=$(docker volume inspect familytree_uploads_data --format '{{ .Mountpoint }}')

if [ -d "$UPLOADS_PATH" ]; then
    tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz -C $UPLOADS_PATH .
    echo "✅ Uploads backup: uploads_$DATE.tar.gz"
else
    echo "⚠️ Uploads directory not found, skipping..."
fi

# ========== Cleanup old backups ==========
echo -e "${GREEN}[3/3] Cleaning up old backups...${NC}"
find $BACKUP_DIR -type f -mtime +$RETENTION_DAYS -delete
echo "✅ Removed backups older than $RETENTION_DAYS days"

# ========== Summary ==========
echo ""
echo "=========================================="
echo "Backup completed at $(date)"
echo "=========================================="
echo "Backup files:"
ls -lh $BACKUP_DIR | grep $DATE
echo ""
echo "Total backup size:"
du -sh $BACKUP_DIR
