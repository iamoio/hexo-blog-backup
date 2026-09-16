#!/usr/bin/env python3
"""
Hexo Blog 图片分批部署脚本
解决 Cloudflare Pages 单次部署超时问题
"""

import os
import subprocess
import shutil
import sys

# 配置
HEXO_DIR = r"C:\Users\Administrator\WorkBuddy\Claw\hexo-blog"
SOURCE_IMG = os.path.join(HEXO_DIR, "source", "images", "wp", "wp", "2026")
PUBLIC_IMG = os.path.join(HEXO_DIR, "public", "img", "wp", "wp", "2026")
DEPLOY_BASE = os.path.join(HEXO_DIR, "deploy_staging")
WRANGLER = r"C:\Users\Administrator\AppData\Local\npm-cache\_npx\32026684e21afda6\node_modules\wrangler\bin\wrangler.js"
NODE_EXE = r"C:\Users\Administrator\.workbuddy\binaries\node\versions\22.22.2-3\node.exe"

# Cloudflare 凭据
ENV = os.environ.copy()
ENV["CLOUDFLARE_API_TOKEN"] = "[REDACTED_CLOUDFLARE_TOKEN]"
ENV["CLOUDFLARE_ACCOUNT_ID"] = "31a6aa87c8de088086194f7e2ca07cab"

def get_months():
    """获取所有月份目录"""
    months = []
    if os.path.exists(SOURCE_IMG):
        for d in sorted(os.listdir(SOURCE_IMG)):
            full = os.path.join(SOURCE_IMG, d)
            if os.path.isdir(full):
                # 计算大小
                size = sum(
                    os.path.getsize(os.path.join(root, f))
                    for root, _, files in os.walk(full)
                    for f in files
                )
                months.append((d, size))
    return months

def deploy_month(month, dry_run=False):
    """部署单个月份的图片"""
    month_dir = os.path.join(DEPLOY_BASE, "img", "wp", "wp", month)
    os.makedirs(month_dir, exist_ok=True)

    src_month = os.path.join(SOURCE_IMG, month)
    dst_month = os.path.join(month_dir, month)
    os.makedirs(dst_month, exist_ok=True)

    # 复制文件
    copied = 0
    for root, dirs, files in os.walk(src_month):
        for f in files:
            src_file = os.path.join(root, f)
            rel = os.path.relpath(src_file, src_month)
            dst_file = os.path.join(dst_month, rel)
            os.makedirs(os.path.dirname(dst_file), exist_ok=True)
            shutil.copy2(src_file, dst_file)
            copied += 1

    # 计算大小
    total_size = sum(
        os.path.getsize(os.path.join(root, f))
        for root, _, files in os.walk(DEPLOY_BASE)
        for f in files
    )

    print(f"\n{'[DRY RUN]' if dry_run else ''} 部署 {month}: {copied} 文件, {total_size/1024/1024:.1f} MB")

    if dry_run:
        # 清理
        shutil.rmtree(DEPLOY_BASE)
        os.makedirs(DEPLOY_BASE, exist_ok=True)
        return True

    # 部署
    cmd = [
        NODE_EXE, WRANGLER, "pages", "deploy", DEPLOY_BASE,
        "--project-name=oaoaoaaa-images"
    ]

    print(f"  执行: {' '.join(cmd)}")
    result = subprocess.run(cmd, env=ENV, capture_output=True, text=True, timeout=300)

    # 清理
    shutil.rmtree(DEPLOY_BASE)
    os.makedirs(DEPLOY_BASE, exist_ok=True)

    if result.returncode == 0:
        print(f"  ✅ 成功")
        return True
    else:
        print(f"  ❌ 失败: {result.stderr[-200:]}")
        return False

def main():
    """主函数"""
    print("=" * 60)
    print("Hexo Blog 图片分批部署工具")
    print("=" * 60)

    # 创建部署目录
    os.makedirs(DEPLOY_BASE, exist_ok=True)

    # 获取月份列表
    months = get_months()
    if not months:
        print("❌ 未找到图片目录")
        sys.exit(1)

    print(f"\n找到 {len(months)} 个月份:")
    for m, size in months:
        print(f"  {m}: {size/1024/1024:.1f} MB")

    # 询问是否 dry run
    dry_run = "--dry" in sys.argv
    if dry_run:
        print("\n[DRY RUN 模式] 仅模拟部署")

    # 逐个部署
    success = []
    failed = []
    for month, _ in months:
        if deploy_month(month, dry_run):
            success.append(month)
        else:
            failed.append(month)

    # 汇总
    print("\n" + "=" * 60)
    print("部署完成")
    print("=" * 60)
    print(f"✅ 成功: {len(success)} 个月份")
    if success:
        for m in success:
            print(f"  - {m}")
    if failed:
        print(f"❌ 失败: {len(failed)} 个月份")
        for m in failed:
            print(f"  - {m}")
    print(f"\n图片站点: https://oaoaoaaa-images.pages.dev/")

if __name__ == "__main__":
    main()
