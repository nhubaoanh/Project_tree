#!/bin/bash
# ============================================
# RESTORE SCRIPT - Khôi phục từ backup
# ============================================

set -e

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

BACKUP_DIR="/opt/backups"
MYSQL_CONTAINER="familytree-mysql"

# Check arguments
if [ -z "$1" ]; then
    echo -e "${YELLOW}Usage: ./restore.sh <backup_date>${NC}"
    echo "Example: ./restore.sh 20240115_020000"
    echo ""
    echo "Available backups:"
    ls -la $BACKUP_DIR/*.sql.gz 2>/dev/null | awk '{print $NF}' | xargs -I {} basename {} .sql.gz | sed 's/db_//'
    exit 1
fi

DATE=$1
DB_BACKUP="$BACKUP_DIR/db_$DATE.sql.gz"
UPLOADS_BACKUP="$BACKUP_DIR/uploads_$DATE.tar.gz"

echo "=========================================="
echo "Starting restore from backup: $DATE"
echo "=========================================="

# ========== Confirm ==========
echo -e "${RED}⚠️  WARNING: This will overwrite current data!${NC}"
read -p "Are you sure you want to continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

# ========== Restore Database ==========
if [ -f "$DB_BACKUP" ]; then
    echo -e "${GREEN}[1/2] Restoring database...${NC}"
    
    # Decompress
    gunzip -k $DB_BACKUP
    
    # Restore
    docker exec -i $MYSQL_CONTAINER mysql \
        -u root \
        -p$MYSQL_ROOT_PASSWORD \
        familytree < $BACKUP_DIR/db_$DATE.sql
    
    # Cleanup
    rm $BACKUP_DIR/db_$DATE.sql
    
    echo "✅ Database restored successfully"
else
    echo -e "${RED}❌ Database backup not found: $DB_BACKUP${NC}"
    exit 1
fi

# ========== Restore Uploads ==========
if [ -f "$UPLOADS_BACKUP" ]; then
    echo -e "${GREEN}[2/2] Restoring uploads...${NC}"
    
    UPLOADS_PATH=$(docker volume inspect familytree_uploads_data --format '{{ .Mountpoint }}')
    
    # Clear existing uploads
    rm -rf $UPLOADS_PATH/*
    
    # Extract backup
    tar -xzf $UPLOADS_BACKUP -C $UPLOADS_PATH
    
    echo "✅ Uploads restored successfully"
else
    echo -e "${YELLOW}⚠️ Uploads backup not found, skipping...${NC}"
fi

echo ""
echo "=========================================="
echo "Restore completed at $(date)"
echo "=========================================="
