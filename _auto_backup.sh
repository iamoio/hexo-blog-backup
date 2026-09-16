#!/bin/bash
# Hexo Blog 自动备份脚本
# 用法: bash _auto_backup.sh
# 添加到 crontab: 0 2 * * * cd /path/to/Claw/hexo-blog && bash _auto_backup.sh

set -e

HEXO_BASE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DATE=$(date +%Y%m%d)
BACKUP_DIR="$HEXO_BASE/../_hexo_backup_$DATE"
ZIP_PATH="$HEXO_BASE/../_hexo_backup_$DATE.zip"

echo "=== Hexo Blog Auto Backup ==="
echo "Date: $DATE"
echo "Hexo base: $HEXO_BASE"

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Copy essential files
echo "Copying source files..."
cp -r "$HEXO_BASE/source" "$BACKUP_DIR/" 2>/dev/null || true
cp -r "$HEXO_BASE/themes" "$BACKUP_DIR/" 2>/dev/null || true
cp "$HEXO_BASE/_config.yml" "$BACKUP_DIR/" 2>/dev/null || true
cp "$HEXO_BASE/gen.js" "$BACKUP_DIR/" 2>/dev/null || true
cp "$HEXO_BASE/deploy.js" "$BACKUP_DIR/" 2>/dev/null || true

# Create ZIP
echo "Creating ZIP archive..."
cd "$(dirname "$BACKUP_DIR")"
zip -rq "$ZIP_PATH" "$(basename "$BACKUP_DIR")" -x "*/node_modules/*"

# Cleanup backup dir (keep only ZIP)
rm -rf "$BACKUP_DIR"

# Show result
SIZE=$(du -h "$ZIP_PATH" | cut -f1)
echo "✓ Backup created: $ZIP_PATH ($SIZE)"
echo ""
echo "GitHub repo: https://github.com/iamoio/hexo-blog-backup"
echo "Note: GitHub push requires network access (blocked by GFW)"
