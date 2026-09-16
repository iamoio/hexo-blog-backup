#!/usr/bin/env node
/**
 * hexo 博客自动备份脚本
 * 功能：
 * 1. 本地 ZIP 备份到 Claw 目录
 * 2. GitHub 推送（需可访问 GitHub 时自动尝试）
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const hexoBase = path.resolve(__dirname);
const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const backupDir = path.resolve(hexoBase, '..', `_hexo_backup_${date}`);
const zipPath = path.resolve(hexoBase, '..', `_hexo_backup_${date}.zip`);

// GitHub backup config (from _config.yml)
const githubRemote = 'https://[REDACTED_GITHUB_TOKEN]@github.com/iamoio/hexo-blog-backup.git';

async function run() {
  console.log(`\n${'='.repeat(50)}`);
  console.log(`Hexo Blog Backup - ${new Date().toLocaleString('zh-CN')}`);
  console.log(`${'='.repeat(50)}\n`);

  // Step 1: Create local backup directory
  console.log('📦 Step 1: Creating local backup...');
  fs.mkdirSync(backupDir, { recursive: true });

  // Copy essential files
  const filesToBackup = [
    '_config.yml',
    'gen.js',
    'deploy.js',
    'deploy_aikeji.js',
    '.gitignore',
    'package.json',
    'package-lock.json',
    'source/',
    'themes/'
  ];

  let copied = 0;
  for (const src of filesToBackup) {
    const srcPath = path.join(hexoBase, src);
    const destPath = path.join(backupDir, path.basename(src));

    if (fs.existsSync(srcPath)) {
      if (fs.statSync(srcPath).isDirectory()) {
        // Copy directory
        await copyDir(srcPath, destPath);
        copied++;
      } else {
        // Copy file
        fs.copyFileSync(srcPath, destPath);
        copied++;
      }
    }
  }
  console.log(`✓ Copied ${copied} items to ${backupDir}\n`);

  // Step 2: Create ZIP archive
  console.log('📦 Step 2: Creating ZIP archive...');
  await createZip(backupDir, zipPath);
  const zipSize = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(1);
  console.log(`✓ Archive created: ${zipPath} (${zipSize} MB)\n`);

  // Step 3: Try GitHub push (best-effort)
  console.log('🌐 Step 3: Attempting GitHub push...');
  try {
    process.chdir(hexoBase);

    // Configure git
    execSync('git config user.email "admin@oaoaoaaa.com"', { stdio: 'inherit' });
    execSync('git config user.name "爱科技博主"', { stdio: 'inherit' });
    execSync('git config http.postBuffer 524288000', { stdio: 'inherit' });

    // Add remote if not exists
    try {
      execSync('git remote get-url backup', { stdio: 'pipe' });
    } catch {
      execSync(`git remote add backup ${githubRemote}`, { stdio: 'inherit' });
    }

    // Commit and push
    execSync('git add -A', { stdio: 'inherit' });
    const commitMsg = `Auto backup - ${date}`;
    execSync(`git commit -m "${commitMsg}"`, { stdio: 'inherit' });
    execSync('git push -u backup main 2>&1', { stdio: 'inherit', timeout: 120000 });

    console.log('✓ GitHub push successful!\n');
  } catch (err) {
    console.log('⚠ GitHub push failed (likely GFW or network issue)\n');
    console.log(`Backup saved locally at: ${zipPath}\n`);
  }

  // Summary
  console.log(`${'='.repeat(50)}`);
  console.log('Backup Summary:');
  console.log(`  📁 Local backup: ${backupDir}`);
  console.log(`  📦 ZIP archive: ${zipPath} (${zipSize} MB)`);
  console.log(`  🔗 GitHub: https://github.com/iamoio/hexo-blog-backup`);
  console.log(`${'='.repeat(50)}\n`);
}

async function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Skip non-essential directories
      if (entry.name === 'node_modules' || entry.name === 'public' || entry.name === '.git') {
        continue;
      }
      await copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function createZip(srcDir, zipPath) {
  // Use Node's archiver or simple tar
  const { execSync } = require('child_process');

  // Try tar if available (Git Bash has it)
  try {
    const tarPath = zipPath.replace('.zip', '.tar.gz');
    execSync(`tar -czf "${tarPath}" -C "${path.dirname(srcDir)}" "$(basename ${srcDir})"`, { timeout: 60000 });
    console.log(`  TAR created: ${tarPath}`);
  } catch {
    // Fall back to zip via 7z or Python
    console.log('  Using Python zipfile as fallback...');
  }

  // Use Python for reliable ZIP creation
  const pyCode = `
import zipfile, os
src = r"${srcDir.replace(/\\/g, '\\\\')}"
dst = r"${zipPath.replace(/\\/g, '\\\\')}"
with zipfile.ZipFile(dst, 'w', zipfile.ZIP_DEFLATED) as zf:
    for root, dirs, files in os.walk(src):
        dirs[:] = [d for d in dirs if d not in ['node_modules', 'public', '.git']]
        for f in files:
            fp = os.path.join(root, f)
            arc = os.path.relpath(fp, src)
            zf.write(fp, arc)
print(f"ZIP created: {dst}")
`;
  require('fs').writeFileSync(path.join(hexoBase, '_zip_tmp.py'), pyCode);
  try {
    execSync(`"${process.env.HOME}/.workbuddy/binaries/python/versions/3.13.12/python.exe" "${path.join(hexoBase, '_zip_tmp.py')}"`, { stdio: 'inherit' });
  } finally {
    try { fs.unlinkSync(path.join(hexoBase, '_zip_tmp.py')); } catch {}
  }
}

run().catch(err => {
  console.error('Backup failed:', err.message);
  process.exit(1);
});
