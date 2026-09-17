#!/usr/bin/env node
/**
 * 即刻短文后台管理 API 服务器
 * 
 * 使用方法：
 *   node admin/server.js [--port 3000]
 * 
 * 功能：
 *   - GET  /admin         后台管理页面
 *   - GET  /admin/api/data 获取短文数据
 *   - POST /admin/api/save 保存短文数据
 *   - GET  /essay         预览短文页面
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const ROOT_DIR = process.cwd();
const DATA_FILE = path.join(ROOT_DIR, 'source', '_data', 'brevity.json');

let PORT = 3000;

// 解析命令行参数
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--port' && args[i + 1]) {
        PORT = parseInt(args[i + 1], 10);
        i++;
    }
}

// MIME 类型映射
const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// 读取 JSON 文件
function readJSON(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(content);
    } catch (e) {
        return null;
    }
}

// 写入 JSON 文件
function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        console.error('Write error:', e.message);
        return false;
    }
}

// 处理请求
function handleRequest(req, res) {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = url.pathname;

    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    // API 路由
    if (pathname === '/admin/api/data' && req.method === 'GET') {
        const data = readJSON(DATA_FILE);
        if (data) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: '数据文件不存在' }));
        }
        return;
    }

    if (pathname === '/admin/api/save' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                const { data } = JSON.parse(body);
                if (!Array.isArray(data) || data.length === 0) {
                    throw new Error('数据格式错误');
                }
                
                // 按时间倒序排列
                data.sort((a, b) => new Date(b.time) - new Date(a.time));
                
                if (writeJSON(DATA_FILE, data)) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true, count: data.length }));
                } else {
                    throw new Error('写入失败');
                }
            } catch (e) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: e.message }));
            }
        });
        return;
    }

    // 静态文件服务
    let filePath;
    if (pathname === '/admin' || pathname === '/admin/') {
        filePath = path.join(ROOT_DIR, 'admin', 'index.html');
    } else if (pathname.startsWith('/admin/')) {
        filePath = path.join(ROOT_DIR, 'admin', pathname.replace('/admin', ''));
    } else {
        filePath = path.join(ROOT_DIR, 'public', pathname === '/' ? 'index.html' : pathname);
    }
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath);
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        
        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filePath).pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
}

// 创建服务器
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
    console.log(`🚀 即刻短文后台管理已启动`);
    console.log(`📍 访问地址: http://localhost:${PORT}/admin`);
    console.log(`📊 数据文件: ${DATA_FILE}`);
    console.log(`\n快捷键:`);
    console.log(`  Ctrl+C  - 停止服务器`);
    console.log(`  http://localhost:${PORT}/admin  - 管理后台`);
    console.log(`  http://localhost:${PORT}/essay  - 预览页面`);
});

// 优雅退出
process.on('SIGINT', () => {
    console.log('\n👋 服务器已停止');
    process.exit(0);
});
