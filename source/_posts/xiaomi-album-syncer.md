---
title: "把小米云相册搬回自己家：XiaomiAlbumSyncer 一键备份照片视频（小白也能懂）"
date: '2026-09-03T07:26:53+08:00'
updated: '2026-09-03T07:26:53+08:00'
slug: xiaomi-album-syncer
categories:
- "数码生活"
description: "XiaomiAlbumSyncer是一款免费开源的小米云相册自动备份工具，可将照片、视频、录音增量下载至本地或NAS。支持定时任务、自动续期登录凭据，按相册分目录并保留拍摄时间。通过Docker或原生程序部署，首次需配置小米云登录凭证，适合希望将云相册备份到本地的小米用户。"
cover: "/wp-content/uploads/2026/09/xas-4ef604-xas-hero-v7.png"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/09/xas-4ef604-xas-hero-v7.png" alt="XiaomiAlbumSyncer 把小米云相册备份到本机/NAS 示意"></p>

<p>XiaomiAlbumSyncer（GitHub：Coooolfan/XiaomiAlbumSyncer，作者 Coooolfan，2026-09-03 实测 397 star）做的事一句话能讲完：把你的小米云相册——照片、视频、录音——自动下载到自家电脑、硬盘或 NAS 里。它支持全量、增量和定时跑，完全免费、开源，登录一次之后基本不用再管。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:8px;margin:16px 0;color:#1d4ed8;font-weight:600">一句话定位：它就是你小米云相册的「自动备份下载器」——登录一次，照片视频自己乖乖跑到你硬盘上，再也不怕云空间满了、也不怕哪天登不上小米云。</div>

<h2>一、它到底是啥</h2>

<p>先说个大白话类比。你拍的照片在小米云上（就是 <code>i.mi.com</code> 那个小米云服务），相当于存在别人家的仓库里。小米官方只给你「在网页/App 里看」，想一次性把全部照片搬回自己硬盘，并没有很顺手的官方按钮。</p>

<p>XiaomiAlbumSyncer 就是一个「搬运工」：它用你的小米账号登录小米云，把相册里的照片、视频、录音按文件夹下载到你指定的本地目录（或者直接挂到 NAS 的目录里）。它不是小米官方出的，是个人开源项目，但能用、还挺活跃（Docker 拉取量 6 万+）。</p>

<p style="text-align:center"><img src="/wp-content/uploads/2026/09/xas-854518-xas-concept-v7.png" alt="手机云相册自动备份到本机/NAS 示意"><br><span style="color:#475569;font-size:13px">图：XiaomiAlbumSyncer 备份示意（手机云相册 → 本机/NAS）</span></p>

<h2>二、能做什么</h2>

<p>功能挺全，挑重点说：</p>

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:14px 0">
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">📸 下载相册</p>
<p style="margin:0;color:#475569;font-size:14px">指定某个相册，把里面的照片/视频全部拉下来；录音也支持。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">⏭️ 增量下载</p>
<p style="margin:0;color:#475569;font-size:14px">已经下过的会自动跳过，第二次跑只补新照片，速度飞快。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">⏰ 定时任务</p>
<p style="margin:0;color:#475569;font-size:14px">设个时间（比如每天 23 点），它自己按时去抓，不用你手动点。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">🔄 自动续期</p>
<p style="margin:0;color:#475569;font-size:14px">登录凭据（Cookie）会自动刷新，不用隔三差五重新登录。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">🗂️ 按相册分目录</p>
<p style="margin:0;color:#475569;font-size:14px">每个相册存一个文件夹，找起来跟手机里一模一样。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">📅 补时间信息</p>
<p style="margin:0;color:#475569;font-size:14px">自动把拍摄时间写进照片/视频的 Exif 和文件时间，排序不乱。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">👥 多账号</p>
<p style="margin:0;color:#475569;font-size:14px">家里几台小米手机，可以都加进来一起备份。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:600;color:#2563eb">🌍 网页后台</p>
<p style="margin:0;color:#475569;font-size:14px">自带一个挺好看的网页管理界面，点点鼠标就能操作。</p>
</div>
</div>

<h2>三、背后跑了些啥（看图说话）</h2>

<p>技术细节你不用懂，知道个大概就够了，都是大白话：</p>

<p style="text-align:center"><img src="/wp-content/uploads/2026/09/xas-4c3239-xas-webui-v7.png" alt="XiaomiAlbumSyncer 网页后台示意"><br><span style="color:#475569;font-size:13px">图：XiaomiAlbumSyncer 网页后台示意（相册列表 + 定时任务）</span></p>

<ul>
<li><strong>网页后台</strong>：就是你在浏览器里点的那个界面，相当于「遥控器」。</li>
<li><strong>干活的后台程序</strong>：真正去小米云取数据、往硬盘写文件的，是它背后跑的服务（用 Kotlin 写的）。</li>
<li><strong>一个小账本（SQLite）</strong>：记着「哪些照片已经下过了」，下次跑就只补新的——这就是增量快的原因。</li>
<li><strong>部署方式</strong>：最省事的是 Docker（一行命令起一个容器），也能直接下载一个可执行文件双击运行，或者跑 Java 版。</li>
</ul>

<h2>四、免费够不够</h2>

<p>先给结论：<strong>这工具本身完全免费、开源（GPL v3 协议），没有任何收费版、也没有功能阉割。</strong>你不用为了用它去开小米云会员。</p>

<p>它唯一的「成本」是你自己的存储和一台能跑程序的设备：</p>

<table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:14px">
<thead><tr style="background:#2563eb;color:#fff"><th style="padding:8px 10px;text-align:left;border:1px solid #e2e8f0">项目</th><th style="padding:8px 10px;text-align:left;border:1px solid #e2e8f0">要不要花钱</th><th style="padding:8px 10px;text-align:left;border:1px solid #e2e8f0">说明</th></tr></thead>
<tbody>
<tr style="background:#f8fafc"><td style="padding:8px 10px;border:1px solid #e2e8f0">XiaomiAlbumSyncer 软件</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#16a34a;font-weight:600">免费</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">开源，GitHub 随便下</td></tr>
<tr><td style="padding:8px 10px;border:1px solid #e2e8f0">存储（硬盘/NAS）</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#ea7317;font-weight:600">看你自家</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">照片存哪儿都行，NAS/旧电脑/U 盘都成</td></tr>
<tr style="background:#f8fafc"><td style="padding:8px 10px;border:1px solid #e2e8f0">运行设备</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#ea7317;font-weight:600">看你自家</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">家里旧电脑、NAS、或一台便宜云服务器</td></tr>
<tr><td style="padding:8px 10px;border:1px solid #e2e8f0">小米云会员</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#16a34a;font-weight:600">不需要</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">它不依赖会员，只是借用你的账号去取数据</td></tr>
</tbody>
</table>

<h2>五、怎么装（最省事：Docker 三步）</h2>

<p>给不想折腾的小白一条最稳的路：用 Docker Compose。三步搞定。</p>

<p style="text-align:center"><img src="/wp-content/uploads/2026/09/xas-1cef58-xas-install-v7.png" alt="Docker 三步部署示意"><br><span style="color:#475569;font-size:13px">图：Docker 三步部署示意（下载配置 → 启动 → 开浏览器）</span></p>

<p><strong>第 1 步：准备一个文件夹，把配置文件下载下来</strong></p>

```bash
mkdir -p ~/xiaomi-album-syncer
cd ~/xiaomi-album-syncer
curl -O https://raw.githubusercontent.com/Coooolfan/XiaomiAlbumSyncer/main/docker/docker-compose.yml
```

<p><strong>第 2 步：一条命令启动</strong></p>

```bash
docker compose up -d
```

<p><strong>第 3 步：打开浏览器</strong></p>
<p>访问 <code>http://localhost:8232</code>（如果装在别的机器上，把 localhost 换成那台机器的 IP）。第一次打开会让你设一个密码（这个密码只管登录这个工具本身，跟小米没关系），设完就能用了。</p>

<p>如果你<strong>连 Docker 都不想碰</strong>，还有更偷懒的办法：去项目的 Releases 页面，下载对应系统的「原生可执行文件」，Windows 直接双击 <code>.exe</code> 就跑，然后同样打开 <code>http://localhost:8080</code> 即可。官方镜像也提供 JVM 版和 Native 版，普通家用 Docker 用默认的 <code>latest</code> 就行。</p>

<h2>六、要配的一个关键点：找到你的「钥匙」</h2>

<p>工具装好了，但它还得知道「去哪搬、搬谁的」。核心就一样东西：从浏览器里取出小米云的 <strong>passToken</strong> 和 <strong>userId</strong> 这两个值（相当于开门的钥匙）。步骤很简单：</p>

<ol>
<li>用电脑浏览器登录 <a href="https://i.mi.com/" target="_blank" rel="nofollow">小米云服务 i.mi.com</a>；</li>
<li>点开一次「相册」页面（这步不能省，不然取不到数据）；</li>
<li>如果弹出手机验证，勾选「信任此设备」；</li>
<li>按 <code>F12</code> 打开开发者工具，切到「应用程序 / Application」那一栏；</li>
<li>找到 <code>passToken</code> 和 <code>userId</code> 两个字段，把值复制出来；</li>
<li>回到工具的网页后台（设置页），把这两个值填进去保存。</li>
</ol>

<p>之后它会自动帮你续期，正常情况下不用再手动弄。</p>

<h2>七、要花多少钱（成本清单）</h2>

<p>再强调一遍，这工具不收钱。你实际要出的只有「电费 + 硬盘」级别的成本，列个清单心里有数：</p>

<table style="width:100%;border-collapse:collapse;margin:14px 0;font-size:14px">
<thead><tr style="background:#16a34a;color:#fff"><th style="padding:8px 10px;text-align:left;border:1px solid #e2e8f0">你要准备的</th><th style="padding:8px 10px;text-align:left;border:1px solid #e2e8f0">大概成本</th><th style="padding:8px 10px;text-align:left;border:1px solid #e2e8f0">备注</th></tr></thead>
<tbody>
<tr style="background:#f8fafc"><td style="padding:8px 10px;border:1px solid #e2e8f0">一台常开的设备</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">几乎为零</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">旧笔记本/NAS/树莓派都行，电费忽略</td></tr>
<tr><td style="padding:8px 10px;border:1px solid #e2e8f0">存储空间</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">看你照片量</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">几千张照片几个 G，随便一个硬盘够用</td></tr>
<tr style="background:#f8fafc"><td style="padding:8px 10px;border:1px solid #e2e8f0">软件本身</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#16a34a;font-weight:600">0 元</td><td style="padding:8px 10px;border:1px solid #e2e8f0;color:#475569">开源免费，随便用</td></tr>
</tbody>
</table>

<h2>八、新手常踩的坑</h2>

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:14px 0">
<div style="flex:1;min-width:240px;background:#fff5e8;border-left:4px solid #ea7317;border-radius:8px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:700;color:#b45309">坑 1：钥匙取错</p>
<p style="margin:0;color:#475569;font-size:14px">passToken/userId 没登录相册页就取，或者取错了位置，结果后台「获取相册」一直失败。先正常打开一次相册页再取。</p>
</div>
<div style="flex:1;min-width:240px;background:#fff5e8;border-left:4px solid #ea7317;border-radius:8px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:700;color:#b45309">坑 2：Windows 中文用户名</p>
<p style="margin:0;color:#475569;font-size:14px">用原生 exe 时若 Windows 用户名是中文，可能报 SQLite 库加载失败。加个参数 <code>-Dorg.sqlite.tmpdir=C:sqlite_tmp</code> 就好。</p>
</div>
<div style="flex:1;min-width:240px;background:#fff5e8;border-left:4px solid #ea7317;border-radius:8px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:700;color:#b45309">坑 3：Docker 没挂卷</p>
<p style="margin:0;color:#475569;font-size:14px">忘了挂 <code>download</code> 和 <code>db</code> 两个目录，容器一删照片和记录全没。按上面的命令挂上就稳了。</p>
</div>
<div style="flex:1;min-width:240px;background:#fff5e8;border-left:4px solid #ea7317;border-radius:8px;padding:12px 14px">
<p style="margin:0 0 6px;font-weight:700;color:#b45309">坑 4：版本大改</p>
<p style="margin:0;color:#475569;font-size:14px">0.3.0 之后只剩网页版，老命令行工具停在 0.2.1。升级别用第三方「自动升级」脚本，跨版本先看 Release 说明。</p>
</div>
</div>

<h2>九、适合谁 / 不适合谁</h2>

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:14px 0">
<div style="flex:1;min-width:240px;background:#eafaf0;border-left:4px solid #16a34a;border-radius:8px;padding:14px">
<p style="margin:0 0 8px;font-weight:700;color:#15803d">✅ 适合你，如果……</p>
<ul style="margin:0;padding-left:18px;color:#475569;font-size:14px">
<li>用的是小米/红米手机，相册都在小米云；</li>
<li>想给云相册做个「本地备份」，防丢、防云满；</li>
<li>家里有 NAS、旧电脑或一台小服务器能常开；</li>
<li>不在乎稍微折腾一下登录凭证。</li>
</ul>
</div>
<div style="flex:1;min-width:240px;background:#fef2f2;border-left:4px solid #dc2626;border-radius:8px;padding:14px">
<p style="margin:0 0 8px;font-weight:700;color:#b91c1c">❌ 可能不适合，如果……</p>
<ul style="margin:0;padding-left:18px;color:#475569;font-size:14px">
<li>你不是小米生态，照片在 iCloud/Google 相册；</li>
<li>纯手机党，家里没有任何能常开的设备；</li>
<li>非常排斥在浏览器里「取登录凭证」这类操作；</li>
<li>希望点一下就全自动、零配置。</li>
</ul>
</div>
</div>

<div style="background:#0f172a;color:#fff;padding:16px 18px;border-radius:10px;margin:18px 0;font-size:15px;line-height:1.7">一句话结论：想把小米云相册安安心心搬回自己硬盘的人，XiaomiAlbumSyncer 是目前最省心的一个开源方案——免费、增量、能定时，装好基本不用管。代价就是第一次要花十分钟取一下登录钥匙，以及得有一台常开的小设备。</div>

<h2>项目地址</h2>
<p>
<a href="https://github.com/Coooolfan/XiaomiAlbumSyncer" target="_blank" rel="nofollow">📦 GitHub 仓库（源码 / 说明 / Releases）</a><br>
<a href="https://hub.docker.com/r/coolfan1024/xiaomi-album-syncer" target="_blank" rel="nofollow">🐳 Docker Hub 镜像（coolfan1024/xiaomi-album-syncer）</a>
</p>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">XiaomiAlbumSyncer</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">GPL-3.0</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">一键把小米云相册的照片与视频备份到本机 / NAS，小白也能上手。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 397</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 31</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">GPL-3.0</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">小米云</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">相册备份</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">NAS</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/Coooolfan/XiaomiAlbumSyncer" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/Coooolfan/XiaomiAlbumSyncer</a></p></div></div>
