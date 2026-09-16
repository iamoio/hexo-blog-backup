---
title: "CyDrive：把 Telegram 变成 Windows 硬盘，零本地占用"
date: '2026-09-12T07:30:27+08:00'
updated: '2026-09-12T07:30:27+08:00'
slug: cydrive-telegram-virtual-hard-drive
categories:
- "免费软件"
description: "CyDrive 是将 Telegram 云存储转为 Windows 虚拟硬盘（Y: 盘）的开源项目。它通过 WebDAV 挂载实现零本地占用，文件直传 Telegram 服务器，支持网页在线播放与 AES-256 加密。适合拥有 Telegram 账号、希望无限扩容且不愿购买云盘订阅的用户，需具备基"
---

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:16px 18px;margin:0 0 22px;border-radius:6px">
<p style="margin:0;font-size:15px;line-height:1.8;color:#1d4ed8"><strong>一句话：</strong>CyDrive 是一个开源的 Python 程序，它把你的 Telegram 账号变成一块 Windows 虚拟硬盘（Y: 盘）。文件传上去后本地自动删掉，打开时从云端流式读取——整块盘不占你一分钱硬盘空间。</p>
</div>
<h2>它到底是什么</h2>
<p>普通云盘（OneDrive、Dropbox、WebDAV 客户端）都有个共同毛病：本地必须留一份完整副本，几百 G 素材库直接撑爆硬盘。CyDrive 反过来——Telegram 机器人就是存储引擎，你只需要装个 Python 脚本跑起来，Y: 盘里看到的一切其实都是在线消息，本地磁盘占用趋近于零。</p>
<p>它由伊朗安全团队 Cynet Security 开发，MIT 协议开源，支持 Windows 10/11，底层是 WebDAV 协议 + SQLite 记录文件夹结构。</p>
<h2>四个实际好处</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:0 0 22px">
<div style="flex:1;min-width:260px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0f172a">文件夹树</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155">Telegram 本身没有目录树，「收藏夹」就是一堆线性消息。CyDrive 用 SQLite 记录整棵文件夹结构，你在 Y: 盘里建目录、移动文件都行。</p>
</div>
<div style="flex:1;min-width:260px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0f172a">不占本地硬盘</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155">文件传上云就从本地删掉，打开时走在线流式读取。老式云盘客户端都是双向同步，本地永远留一份副本，几百 G 的素材库直接撑爆硬盘。</p>
</div>
<div style="flex:1;min-width:260px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0f172a">网页直接看</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155">自带一个暗色网页面板（默认 127.0.0.1:8088），MP4 电影、FLAC 音乐、图片都能在线播，不用先下载完整文件。手机上也直接访问同一个面板。</p>
</div>
<div style="flex:1;min-width:260px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:16px 18px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#0f172a">手机互传</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155">在外面用手机给机器人发张照片，回家打开电脑 Y: 盘里就有了。不用数据线，不用微信传文件。</p>
</div>
</div>
<h2>怎么用：从零到挂载成功</h2>
<p>整个过程就是「建机器人 → 拿两个 ID → 跑一个 Python 程序」，官方文档说 5 分钟够。</p>
<p><strong>第一步：建一个自己的 Telegram 机器人。</strong>在 Telegram 里找 <strong>@BotFather</strong>，发 <code>/newbot</code>，起个名字，它会给你一段 token（形如 <code>123456:ABC-xyz...</code>）。这是后面程序连 Telegram 用的钥匙。</p>
<p><strong>第二步：拿到你的 Chat ID。</strong>找 <strong>@userinfobot</strong>，它会把你账号的数字 ID 发给你。这是「数据存到你名下」的标识。</p>
<div style="background:#eafaf0;border-left:4px solid #16a34a;padding:14px 18px;margin:18px 0;border-radius:6px">
<p style="margin:0;font-size:15px;line-height:1.8;color:#14532d"><strong>提示：</strong>机器人只建一次，之后都不用管。CyDrive 通过机器人把你的文件存进<strong>你自己的 Telegram 账号</strong>（机器人和账号是同一体系下的消息通道），不是存到一个公开的机器人群里，所以不存在「数据给陌生人看」的问题。</p>
</div>
<p><strong>第三步：装环境跑起来。</strong>需要 Python 3.8+：</p>

```bash
git clone https://github.com/thecynetx/CyDrive.git
cd CyDrive
pip install -r requirements.txt
python main.py
```

<p>第一次运行会问你 Bot Token、Chat ID、盘符（Windows 默认 Y:），回答完它自动把服务全拉起来：WebDAV 服务器、网页面板、文件监听、Windows 驱动器挂载。</p>
<div style="background:#fff5e8;border-left:4px solid #ea7317;padding:14px 18px;margin:18px 0;border-radius:6px">
<p style="margin:0;font-size:15px;line-height:1.8;color:#b45309"><strong>注意：</strong>Telegram 机器人单条消息上限 50 MB，超过要自己分片；整个账号可存空间「理论无限」（官方说法），但实际受 Telegram 服务器限制，别指望它备份几个 T。</p>
</div>
<h2>Linux 用户怎么折腾</h2>
<p>Linux 上没有 Windows 的盘符概念，但有三条路：</p>
<p><strong>路线 A：只用网页面板。</strong>跑完 <code>python main.py</code> 后浏览器开 <code>http://127.0.0.1:8088</code>，把面板当 WebDAV 文件管理器用，能直接播视频、下文件，最省事。</p>
<p><strong>路线 B：davfs2 挂载。</strong><code>sudo apt install davfs2</code>，把 CyDrive 的 WebDAV 端点 mount 到本地目录，之后命令行、nautilus 都能当本地盘用。</p>
<p><strong>路线 C：Rclone 备份。</strong>把 Y: 盘里的内容定期同步到另一个对象存储（S3、MinIO），当作「云盘套云盘」的冷备，适合重要资料。</p>
<h2>常见问题</h2>
<p><strong>Y: 盘里显示 100 GB 是不是假的？</strong>是。那是「Telegram 理论容量」占位，实际能存多少看你的账号和服务器状态，官方文档原话是 "Infinite"。</p>
<p><strong>账号会被封吗？</strong>正常用量下风险很低，但用 bot 传大量文件理论上可能被 Telegram 风控，建议别拿它跑自动化爬虫。</p>
<p><strong>断网时 Y: 盘还能用吗？</strong>不能。断网时盘符还在但打开任何文件都会卡住，因为数据全在云端。</p>
<p><strong>2 GB 大文件怎么传？</strong>Telegram 机器人接口单文件上限 2 GB（普通账号），超过就要走分片方案，官方还没做自动分片。</p>
<h2>适合谁</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:0 0 22px">
<div style="flex:1;min-width:260px;background:#eafaf0;border:1px solid #16a34a;border-radius:10px;padding:16px 18px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#14532d">适合</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#14532d">• 硬盘快满、不想买新的<br>• 只存文档、照片、中等体积素材<br>• 经常手机和电脑互传文件<br>• 想折腾 WebDAV / Linux 挂载</p>
</div>
<div style="flex:1;min-width:260px;background:#fef2f2;border:1px solid #dc2626;border-radius:10px;padding:16px 18px">
<p style="margin:0 0 8px;font-size:15px;font-weight:700;color:#991b1b">不适合</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#991b1b">• 几个 T 的 4K 视频库<br>• 需要离线访问的场景<br>• 不想自己折腾环境的用户<br>• 对稳定性要求高的生产环境</p>
</div>
</div>
<div style="background:#0f172a;border-radius:14px;padding:20px 22px;margin:0 0 22px;color:#ffffff">
<p style="margin:0;font-size:14px;line-height:1.8;color:#e2e8f0"><strong>结论：</strong>CyDrive 是目前最干净的「Telegram 云盘化」方案，MIT 协议、单文件依赖少、上手 5 分钟。硬盘快满、素材库中等体积、经常跨设备互传的用户值得一试；但对几个 T 的冷备和离线访问场景它帮不上忙。</p>
</div>
<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12)">
<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
<span style="font-size:20px;font-weight:700;color:#ffffff">CyDrive</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px">开源</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px">MIT</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px">Python</span>
</div>
<p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1">把 Telegram 变成 Windows 虚拟硬盘的开源引擎：WebDAV 挂载、零本地占用、网页在线播放、AES-256 可选加密。</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px">
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center">
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff">★ 109</p>
<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">Star</p>
</div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center">
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff">⑂ 20</p>
<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">Fork</p>
</div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center">
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff">MIT</p>
<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">协议</p>
</div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px">WebDAV</span>
<span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px">零本地占用</span>
<span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px">AES-256 加密</span>
<span style="font-size:12px;background:#6d4aff;color:#ffffff;padding:4px 12px;border-radius:6px">网页面板</span>
</div>
<div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.18);text-align:center">
<p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500">项目地址：<a href="https://github.com/thecynetx/CyDrive" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px">github.com/thecynetx/CyDrive</a></p>
</div>
</div>
