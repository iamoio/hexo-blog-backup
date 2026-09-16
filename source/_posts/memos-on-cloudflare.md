---
title: "把 Memos 搬上 Cloudflare：零服务器跑一个属于自己的碎片笔记站"
date: '2026-09-09T12:03:33+08:00'
updated: '2026-09-09T12:03:33+08:00'
slug: memos-on-cloudflare
categories:
- "Cloudflare"
description: "Memos on Cloudflare 将开源笔记应用 Memos 迁移至 Cloudflare 平台，用 Workers + D1 + R2 替代原有服务器架构，实现零成本、零运维的自托管笔记服务。免费额度满足个人需求，部署仅需几步命令，适合希望拥有独立笔记站但不愿折腾服务器的用户。"
---

<p>Memos on Cloudflare（GitHub：jkjoy/memos-on-cloudflare，作者 jkjoy，2026-09-09 实测 31 star，MIT 协议）做的事一句话能讲完：把开源笔记应用 Memos 整套搬到 Cloudflare 边缘平台——用 Workers + D1 + R2 顶替原来的 Go 服务器和本地数据库，让你不用买 VPS、不用装 Docker，也能跑一个完全属于自己的碎片笔记站。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:0 0 22px;border-radius:6px;">
<p style="margin:0;color:#1d4ed8;font-size:15px;line-height:1.8;"><strong>一句话定位：</strong>把 Memos 装到 Cloudflare 上，零服务器、零运维，你的笔记存在离用户最近的边缘节点，免费额度个人用根本花不完。</p>
</div>

<h2>一、它到底是啥</h2>
<p>如果你用过 Memos（一个开源的「碎片化笔记 + 微微博客」工具），应该知道它原本要跑在一台服务器上：后端是 Go、数据库是本地 SQLite、附件放本地硬盘。Memos on Cloudflare 干的事，就是把这套架构整体平移到 Cloudflare 上——</p>
<ul>
<li>原来跑在你服务器的 Go 后端 → 换成 Cloudflare Workers（一段跑在边缘节点的代码）；</li>
<li>原来的本地 SQLite → 换成 Cloudflare D1（托管版 SQLite）；</li>
<li>原来的本地附件目录 → 换成 Cloudflare R2（对象存储）；</li>
<li>原来要自己维护的服务器 → 直接没了。</li>
</ul>
<p>结果就是：你不用再为「笔记存哪儿、服务器别宕机、磁盘别写满」操心，把项目往 Cloudflare 一推，它就在全球边缘节点上跑起来了。</p>

<h2>二、能做什么</h2>
<p>它复刻了 Memos v0.28 的大部分能力，日常记笔记完全够用。挑重点看：</p>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">记笔记</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">支持 Markdown、标签、代码块、任务清单，还能画 Mermaid 图表；一条笔记就是一段碎片想法。</p>
</div>
<div style="flex:1;min-width:260px;background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">看得见 / 藏得住</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">每条笔记可设私有、工作区可见、或公开；还能生成带过期时间的分享链接。</p>
</div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#f2eeff;border-left:4px solid #6d4aff;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#5b21b6;">语音也能记</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">内置录音 + Workers AI 转写，对着手机说一段话就能变成文字笔记。</p>
</div>
<div style="flex:1;min-width:260px;background:#fff5e8;border-left:4px solid #ea7317;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#b45309;">协作与集成</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">支持评论、表情反应、Webhook 通知、SSO 单点登录，以及 30+ 语言界面。</p>
</div>
</div>
<p>附件上传上限是 <strong>100MB</strong>，图片、音频、文档都能塞。对一个人或一个小团队来说，这套配置已经很能打。</p>

<h2>三、背后到底跑了些啥</h2>
<p>不用深究架构，一句话记住：<strong>这个项目的全部零件都在 Cloudflare 一家</strong>，你不用再拼七八个外部服务。</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">你看到的</th>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">它背后用的是</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;"><td style="padding:10px 12px;border:1px solid #e2e8f0;">打开的网页</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">Worker 跑后端 + 静态资源托管前端</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;">你的笔记内容</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">D1（托管版 SQLite）存结构化数据</td></tr>
<tr style="background:#f8fafc;"><td style="padding:10px 12px;border:1px solid #e2e8f0;">上传的图片 / 音频</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">R2 对象存储</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;">语音转文字</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">Workers AI 的 Whisper 模型</td></tr>
</tbody>
</table>
<p>对比原版 Memos 还要自己管 Go 进程、SQLite 文件、反向代理，这个项目把「运维」两个字基本抹平了。</p>

<h2>四、免费额度够不够</h2>
<p>这是大家最关心的。Cloudflare 免费档给的量，对个人完全够用：</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">资源</th>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">免费档额度</th>
<th style="background:#1d4ed8;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">个人够不够</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;"><td style="padding:10px 12px;border:1px solid #e2e8f0;">Workers 请求</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">每天 10 万次</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">✅ 远远够</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;">D1 存储</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">5 GB</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">✅ 几万条笔记无压力</td></tr>
<tr style="background:#f8fafc;"><td style="padding:10px 12px;border:1px solid #e2e8f0;">R2 存储</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">10 GB + 每月 1000 万次读</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">✅ 日常附件够用</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;">Workers AI 转写</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">按量计费，有免费额度</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">⚠️ 偶尔用用不心疼</td></tr>
</tbody>
</table>
<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#7f1d1d;"><strong>注意：</strong>免费档单次请求体上限是 100MB，附件上传被硬编码成 100MB 正是卡在这条线。如果你打算传超大文件，得上 Workers 付费档（付费后无此限制）。普通文字 + 普通图片用户完全不用管。</p>
</div>

<h2>五、怎么把它跑起来</h2>
<p>整体就三步，命令贴出来照抄即可。前提是你已有 Cloudflare 账号，并装好 Node.js 18+ 和 Wrangler CLI。</p>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:200px;background:#f8fafc;border:1px solid #e2e8f0;border-top:4px solid #2563eb;border-radius:8px;padding:16px;">
<div style="font-size:13px;font-weight:700;color:#2563eb;margin-bottom:6px;">STEP 1 · 拉代码</div>
<p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">克隆仓库，安装前端与后端依赖</p>
</div>
<div style="flex:1;min-width:200px;background:#f8fafc;border:1px solid #e2e8f0;border-top:4px solid #16a34a;border-radius:8px;padding:16px;">
<div style="font-size:13px;font-weight:700;color:#16a34a;margin-bottom:6px;">STEP 2 · 建资源</div>
<p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">用 Wrangler 创建 D1 数据库与 R2 存储桶</p>
</div>
<div style="flex:1;min-width:200px;background:#f8fafc;border:1px solid #e2e8f0;border-top:4px solid #ea7317;border-radius:8px;padding:16px;">
<div style="font-size:13px;font-weight:700;color:#ea7317;margin-bottom:6px;">STEP 3 · 部署</div>
<p style="margin:0;font-size:14px;color:#334155;line-height:1.6;">填 database_id，初始化表结构并一键部署</p>
</div>
</div>

```bash
# 1. 拉代码
git clone https://github.com/jkjoy/memos-on-cloudflare.git
cd memos-on-cloudflare
npm install && cd web && npm install && cd ..

# 2. 在 Cloudflare 建两个资源
wrangler d1 create cfmemos-db
wrangler r2 bucket create cfmemos

# 3. 把上一步拿到的 database_id 填进 wrangler.toml，再初始化并部署
npm run db:migrate:remote
npm run deploy
```

<p>部署完访问 Worker 分配的域名，第一次打开会进管理员注册页，设好账号就能用。想挂自己的域名，去 Cloudflare 后台给 Worker 加自定义域名即可。</p>

<h2>六、部署前必须记住的一件事</h2>
<p>这个项目只要配一个密钥就能跑起来：<strong>JWT_SECRET</strong>。它是用来给登录令牌签名的，务必用一段强随机字符串，别拿 123456 凑数——否则别人能伪造你的登录身份。设置命令就一句：</p>

```bash
wrangler secret put JWT_SECRET
```

<p>其余像实例名称（INSTANCE_NAME，显示在页面标题上）都是可选的非敏感配置，写在 wrangler.toml 里就行。</p>

<h2>七、要花多少钱</h2>
<p>和另外两种常见方案摆一起看，这个项目的成本优势非常明显：</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">方案</th>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">服务器成本</th>
<th style="background:#1d4ed8;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">运维负担</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;"><td style="padding:10px 12px;border:1px solid #e2e8f0;">Memos on Cloudflare</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">免费档基本 0 元</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">✅ 几乎为零</td></tr>
<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;">原版 Memos（自托管）</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">一台 VPS 约几十元 / 月</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">⚠️ 要管进程、备份、升级</td></tr>
<tr style="background:#f8fafc;"><td style="padding:10px 12px;border:1px solid #e2e8f0;">商业笔记（如 Notion 等）</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">会员按月收费</td><td style="padding:10px 12px;border:1px solid #e2e8f0;">✅ 不用管，但数据在别人手里</td></tr>
</tbody>
</table>

<h2>八、新手最容易踩的坑</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#fff5e8;border-left:4px solid #ea7317;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#b45309;">① 部署后白屏</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">多半是前端没打包。先跑构建，确认 web/dist 目录存在，再 deploy。</p>
</div>
<div style="flex:1;min-width:260px;background:#fff5e8;border-left:4px solid #ea7317;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#b45309;">② 访问 /api 变 404</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">检查 wrangler.toml 的 assets 里有没有把 /api 等路径交给 Worker 优先处理，否则会被当成前端路由。</p>
</div>
<div style="flex:1;min-width:260px;background:#fff5e8;border-left:4px solid #ea7317;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#b45309;">③ 报 table not found</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">忘了初始化数据库。执行 npm run db:migrate:remote 把表结构建到远程 D1。</p>
</div>
</div>

<h2>九、适合谁，不适合谁</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">适合你，如果——</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">想有个自己的碎片笔记 / 微博客；手头有 Cloudflare 账号；不想为服务器付费和折腾；接受把数据存在 Cloudflare。</p>
</div>
<div style="flex:1;min-width:260px;background:#fef2f2;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#7f1d1d;">先想清楚，如果——</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">你对数据主权极度敏感、不想依赖任何大厂；或者需要 Memos 的全部高级功能（本项目只复刻到 v0.28 大部分）；或者完全不会用命令行部署。</p>
</div>
</div>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:26px 0;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>Memos on Cloudflare 把「自托管笔记」的门槛从「买服务器 + 管运维」降到了「会敲几行命令 + 有个 Cloudflare 账号」。免费额度个人用不完，适合想低调拥有自己小天地的人；代价是功能比原版 Memos 略少，且数据落在 Cloudflare 手里——这点喜不喜欢，看你自己的取舍。</p>
</div>

<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);">
<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
<span style="font-size:20px;font-weight:700;color:#ffffff;">Memos on Cloudflare</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">MIT</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">自托管笔记</span>
</div>
<p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">把开源笔记 Memos 整套搬到 Cloudflare 边缘：零服务器、零运维，笔记存在离你最近的节点，免费额度个人用不完。</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;">
<div style="font-size:18px;font-weight:700;color:#ffffff;">★ 31</div>
<div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div>
</div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;">
<div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 35</div>
<div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div>
</div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;">
<div style="font-size:18px;font-weight:700;color:#ffffff;">MIT</div>
<div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div>
</div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;">
<span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">Workers</span>
<span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">D1</span>
<span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">R2</span>
<span style="font-size:12px;background:#6d4aff;color:#ffffff;padding:4px 12px;border-radius:6px;">Workers AI</span>
</div>
<div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;">
<p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/jkjoy/memos-on-cloudflare" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/jkjoy/memos-on-cloudflare</a></p>
</div>
</div>
