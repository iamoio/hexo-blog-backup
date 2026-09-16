---
title: "下载视频不用再到处找网站：8 个工具覆盖 X、抖音、TikTok、B站、YouTube"
date: '2026-09-01T12:01:35+08:00'
updated: '2026-09-01T12:01:35+08:00'
slug: video-download-tools-8-picks-x-douyin-bilibili
categories:
- "免费软件"
description: "实测了8个主流平台视频下载工具的可用性、开源情况及真实能力。cobalt.tools为跨平台首选，开源可自托管；B站推荐Bili23-Downloader，YouTube可选YoutubeDownloader或4K Video Downloader Plus。需分清在线网页与桌面客户端两类路线，并注"
cover: "/wp-content/uploads/2026/09/dlt-cobalt-github-3b3d0af59f.png"

---

<div style="background:#f1f5f9;border-left:4px solid #475569;padding:14px 18px;margin:0 0 24px;border-radius:6px;color:#334155;font-size:15px;line-height:1.85">

<strong style="color:#0f172a">导语：</strong>这份清单覆盖 X、抖音、TikTok、Instagram、Facebook、YouTube、B站，连字幕和批量下载都有对应工具，主流平台基本包圆了。我把这 8 个工具逐个打开实测了一遍，补上了每个工具的开源情况、star 数、费用档位和真实能力边界，下面是完整版。

</div>

<h2>先给结论：8 个工具速览</h2>

<table style="width:100%;border-collapse:collapse;margin:0 0 26px;font-size:14px">

<thead><tr>

<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0" width="15%">工具</th>

<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0" width="18%">主要平台</th>

<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0" width="12%">形态</th>

<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0" width="14%">费用 / 开源</th>

<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">一句话</th>

</tr></thead>

<tbody>

<tr style="background:#f8fafc"><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>cobalt.tools</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">X / YouTube / B站等</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">网页 + API</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · AGPL-3.0<br>42.5k star</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">唯一明确承诺「无广告、无追踪、无付费墙、不缓存」，还能自托管</td></tr>

<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>ssstik.io</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">TikTok</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">网页</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · 闭源</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">去水印老牌站，MP4 / MP3 都行，有 App</td></tr>

<tr style="background:#f8fafc"><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>douyin.wtf</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">抖音 / TikTok</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong style="color:#dc2626">API 服务</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · 开源</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><span style="color:#dc2626">不是点一下就下载的网页工具，是给开发者调的 API</span></td></tr>

<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>SnapInsta</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">Instagram</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">网页</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · 闭源</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><span style="color:#dc2626">同名站点泛滥，需认准域名；多数镜像只支持 Instagram</span></td></tr>

<tr style="background:#f8fafc"><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>YoutubeDownloader</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">YouTube</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">桌面客户端</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · MIT<br>16.1k star</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">开源跨平台，视频 / 播放列表 / 整个频道通吃</td></tr>

<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>Bili23-Downloader</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">B站</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">桌面客户端</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · GPLv3<br>7.0k star</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">B站下载最强解，番剧课程收藏夹都能下</td></tr>

<tr style="background:#f8fafc"><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>downsub.com</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">YouTube / Viki / 等</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">网页（字幕）</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">免费 · 闭源</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">只下字幕不下视频，学外语、做剪辑素材专用</td></tr>

<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>4K Video Downloader Plus</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">YouTube / 多平台</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">桌面客户端</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong style="color:#dc2626">商业软件</strong><br>有免费档</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">图形化最省心，批量最强，但完整功能要付费</td></tr>

</tbody></table>

<h2>两类路线：在线网页派 vs 桌面客户端派</h2>

<p>这 8 个工具其实分成截然不同的两派，选错类型会浪费很多时间。</p>

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:0 0 24px">

<div style="flex:1;min-width:260px;background:#eaf2ff;border-left:4px solid #2563eb;padding:16px 18px;border-radius:6px">

<div style="font-weight:700;color:#1d4ed8;margin-bottom:8px;font-size:16px">在线网页派（5 个）</div>

<div style="color:#334155;font-size:14px;line-height:1.8">

<div><strong>包含：</strong>cobalt、ssstik、douyin.wtf、SnapInsta、downsub</div>

<div style="margin-top:8px"><strong style="color:#15803d">优点</strong>：不用装软件，手机电脑都能用，偶尔存一个视频最省事</div>

<div style="margin-top:6px"><strong style="color:#dc2626">短板</strong>：你的链接要过第三方服务器；批量慢；平台一改接口就容易失效</div>

</div>

</div>

<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:16px 18px;border-radius:6px">

<div style="font-weight:700;color:#15803d;margin-bottom:8px;font-size:16px">桌面客户端派（3 个）</div>

<div style="color:#334155;font-size:14px;line-height:1.8">

<div><strong>包含：</strong>YoutubeDownloader、Bili23-Downloader、4K Video Downloader Plus</div>

<div style="margin-top:8px"><strong style="color:#15803d">优点</strong>：多线程、断点续传、整个播放列表/频道批量拉，链接不出本机</div>

<div style="margin-top:6px"><strong style="color:#dc2626">短板</strong>：要下载安装；4K Video Downloader 是商业软件</div>

</div>

</div>

</div>

<h2>一、cobalt.tools：跨平台首选，也是唯一敢承诺「不惹毛你」的</h2>
<p style="margin:22px 0 0;text-align:center"><img src="/wp-content/uploads/2026/09/dlt-cobalt-github-3b3d0af59f.png" alt="cobalt.tools 的 GitHub 仓库卡片：AGPL-3.0 开源，42,533 star，可自托管" style="max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0" /></p>
<p style="margin:8px 0 24px;text-align:center;font-size:13px;color:#64748b;line-height:1.7">cobalt.tools 的 GitHub 仓库卡片：AGPL-3.0 开源，42,533 star，可自托管</p>

<p>官网的自我描述很直白——<strong>一个不会惹毛你的媒体下载器</strong>：友好、高效，<strong>没有广告、没有追踪器、没有付费墙</strong>。粘贴链接，拿到文件，走人。</p>

<ul style="margin:0 0 22px;padding-left:22px;line-height:1.9">

<li><strong>开源</strong>：GitHub <code>imputnet/cobalt</code>，<strong>42,533 star</strong>，AGPL-3.0 许可</li>

<li><strong>不缓存内容</strong>：官方说明它运作起来「像一个高级代理」，服务端不留存任何下载内容</li>

<li><strong>可自托管</strong>：仓库 <code>docs</code> 目录里有跑实例、保护实例、API 文档，介意第三方的话可以自己架一个</li>

<li><strong>能力边界</strong>：官方明确写了它<strong>只能下载免费且公开可访问的内容</strong>，不是盗版工具，同样的内容你用浏览器开发者工具也能拿到</li>

</ul>

<p>如果你只想留一个通用工具，选它。开源、可自托管、不缓存，这三点在同类在线工具里几乎是独一份。</p>

<h2>二、ssstik.io：TikTok 去水印的老牌选择</h2>
<p style="margin:22px 0 0;text-align:center"><img src="/wp-content/uploads/2026/09/dlt-ssstik-og-f53a6be80b.png" alt="ssstik.io 官方分享图：免费、不限次数，支持 MP4 与 MP3" style="max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0" /></p>
<p style="margin:8px 0 24px;text-align:center;font-size:13px;color:#64748b;line-height:1.7">ssstik.io 官方分享图：免费、不限次数，支持 MP4 与 MP3</p>

<p>官网原话：最快的 TikTok 下载器，两步保存 HD 视频，带不带水印都行。</p>

<ul style="margin:0 0 22px;padding-left:22px;line-height:1.9">

<li>免费、<strong>不限次数</strong>（官方页面标着 Unlimited）</li>

<li>支持 <strong>MP4 和 MP3</strong>，可只抽音频</li>

<li>支持下载 TikTok Stories</li>

<li>提供 APK / App，手机端更顺手</li>

</ul>

<p>需要提醒的是：它依然是<strong>第三方闭源服务</strong>。你粘贴的每一个链接都会经过它的服务器，隐私敏感的内容不建议走这类站点。</p>

<h2>三、douyin.wtf：原推文说是「抖音解析」，实际是个 API</h2>
<p style="margin:22px 0 0;text-align:center"><img src="/wp-content/uploads/2026/09/dlt-douyin-api-48865be0d9.png" alt="douyin.wtf 背后是开源项目 Evil0ctal/Douyin_TikTok_Download_API，19,776 star" style="max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0" /></p>
<p style="margin:8px 0 24px;text-align:center;font-size:13px;color:#64748b;line-height:1.7">douyin.wtf 背后是开源项目 Evil0ctal/Douyin_TikTok_Download_API，19,776 star</p>

<div style="background:#fff5e8;border-left:4px solid #ea7317;padding:14px 18px;margin:0 0 22px;border-radius:6px;color:#7c2d12;font-size:15px;line-height:1.85">

<strong>和原推文描述不一致：</strong>打开 <code>douyin.wtf</code> 后，页面标题是 <strong>Douyin_TikTok_Download_API</strong>，自我定位是「一个免费开源的抖音 / TikTok 下载 API 服务」，基于 <strong>PyWebIO</strong> 搭建，为开发者提供简单快速的接口。<br><br>

也就是说，<strong>它不是给普通用户「粘贴链接点一下」的网页下载器</strong>。普通用户想要图形界面，得去找封装了这套 API 的客户端或第三方站点。

</div>

<p>对开发者的价值反而更大：开源、免费、有稳定 API，可以自己接进脚本里做批量或自动化。</p>

<h2>四、SnapInsta：能用，但域名是个坑</h2>

<p>这是清单里<strong>最需要提醒的一个</strong>，有两个坑：</p>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:14px 18px;margin:0 0 22px;border-radius:6px;color:#7f1d1d;font-size:15px;line-height:1.85">

<strong>问题一：同名站点泛滥。</strong>搜索 SnapInsta 会出来一长串域名——<code>snapinsta.cc</code>、<code>snapinta.app</code>、<code>snapinsta.ltd</code>、<code>thesnapinsta.app</code>、<code>snapinsta.ac</code> 等等，彼此内容雷同、真假难辨。这类站点鱼龙混杂，<strong>务必认准域名，任何要求你登录 Instagram 账号的都要立刻关掉</strong>。<br><br>

<strong>问题二：实际只支持 Instagram。</strong>多个同类镜像站自述<strong>只支持 Instagram，明确说不支持其他来源</strong>，别指望用它下 Facebook 的内容。

</div>

<p>功能层面（依据同类站点公开说明）：支持视频、图片、Reels、Stories、IGTV、轮播相册，无需登录，免费不限量，视频 MP4 / 图片 JPEG，<strong>只支持公开账号，私有账号下不了</strong>。</p>

<h2>五、YoutubeDownloader：YouTube 开源首选</h2>
<p style="margin:22px 0 0;text-align:center"><img src="/wp-content/uploads/2026/09/dlt-youtubedl-github-67e8acd096.png" alt="YoutubeDownloader 的 GitHub 仓库卡片：MIT 许可，16,061 star，支持整站频道下载" style="max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0" /></p>
<p style="margin:8px 0 24px;text-align:center;font-size:13px;color:#64748b;line-height:1.7">YoutubeDownloader 的 GitHub 仓库卡片：MIT 许可，16,061 star，支持整站频道下载</p>

<p>GitHub <code>Tyrrrz/YoutubeDownloader</code>，<strong>16,061 star</strong>，MIT 许可。由社区捐赠资助开发。</p>

<ul style="margin:0 0 22px;padding-left:22px;line-height:1.9">

<li>粘贴<strong>视频、播放列表或整个频道</strong>的链接，自选格式下载</li>

<li>支持<strong>关键词搜索</strong>，想快速找并下载某个视频时很方便</li>

<li>底层基于同作者的 <code>YoutubeExplode</code> 库</li>

<li><strong>跨平台</strong>：Windows / macOS / Linux。Windows 有 Scoop 包（<code>scoop install extras/youtubedownloader</code>），Linux 有 AUR 包</li>

</ul>

<p>macOS 用户第一次启动可能打不开（Gatekeeper 隔离），在终端跑一条命令解除即可：</p>

```bash
xattr -rd com.apple.quarantine YoutubeDownloader.app
```

<h2>六、Bili23-Downloader：B站下载的天花板</h2>
<p style="margin:22px 0 0;text-align:center"><img src="/wp-content/uploads/2026/09/dlt-bili23-github-66d19fcdee.png" alt="Bili23-Downloader 的 GitHub 仓库卡片：GPLv3 许可，6,991 star，支持多线程与断点续传" style="max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0" /></p>
<p style="margin:8px 0 24px;text-align:center;font-size:13px;color:#64748b;line-height:1.7">Bili23-Downloader 的 GitHub 仓库卡片：GPLv3 许可，6,991 star，支持多线程与断点续传</p>

<p>GitHub <code>ScottSloan/Bili23-Downloader</code>，<strong>6,991 star</strong>，GPLv3，开源免费跨平台。原推文把它归在「B站 / 多站点」，实际它<strong>专注 B站</strong>，但做得非常深。</p>

<ul style="margin:0 0 22px;padding-left:22px;line-height:1.9">

<li><strong>系统支持</strong>：Windows（含 Win 7）、Linux、macOS 三大桌面端</li>

<li><strong>下载能力</strong>：原生多线程并行、断点续传、网络异常自动重试，还能全局限速</li>

<li><strong>解析范围</strong>：投稿视频、番剧、电影、课程、互动视频、音乐（au / am）、UP 主空间、收藏夹、每周必看、订阅合集、追番追剧、稍后再看、历史记录</li>

<li><strong>批量</strong>：支持一次粘贴多条链接；官方描述里还有弹幕元数据获取、自定义命名与分类</li>

<li><strong>体验</strong>：Fluent Design 界面，浅色 / 深色主题，原生适配高分屏，记住窗口位置</li>

</ul>

<h2>七、downsub.com：只下字幕，不下视频</h2>

<p>清单里唯一的「非视频」工具，但很多场景离不了它。官网标题写得很清楚：从 <strong>YouTube、Viki、Viu、Kocowa、WeTV 以及更多站点下载字幕</strong>。</p>

<p>适合：学外语要对照字幕、做二创剪辑需要台词、给视频补字幕。注意它是纯前端应用，<strong>必须开启 JavaScript 才能正常工作</strong>。</p>

<h2>八、4K Video Downloader Plus：最省心，但要钱</h2>
<p style="margin:22px 0 0;text-align:center"><img src="/wp-content/uploads/2026/09/dlt-4k-downloader-6a3ff4b419.jpg" alt="4K Video Downloader 官方产品图：商业软件，免费版有下载次数限制" style="max-width:100%;height:auto;border-radius:10px;border:1px solid #e2e8f0" /></p>
<p style="margin:8px 0 24px;text-align:center;font-size:13px;color:#64748b;line-height:1.7">4K Video Downloader 官方产品图：商业软件，免费版有下载次数限制</p>

<p>清单里唯一的<strong>商业软件</strong>。跨平台桌面应用，支持 YouTube、Vimeo、TikTok、SoundCloud、Facebook、Twitch、Bilibili 等。官方页面称 6200 万+ 用户、10 年以上运营。</p>

<p>它的授权分四档（以下为官网对国内 IP 显示的人民币价格，<strong>实际价格随地区和汇率浮动，以官网为准</strong>）：</p>

<table style="width:100%;border-collapse:collapse;margin:0 0 24px;font-size:14px">

<thead><tr>

<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0" width="20%">版本</th><th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0" width="22%">价格</th><th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">说明</th>

</tr></thead>

<tbody>

<tr style="background:#f8fafc"><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong>Starter</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top"><strong style="color:#15803d">免费</strong></td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">永久使用基础功能，无试用期，无需填信用卡信息</td></tr>

<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">Lite</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">¥2000 / 年</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">个人使用，年度订阅，含主要功能</td></tr>

<tr style="background:#f8fafc"><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">Personal</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">¥3300 / 终身</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">个人使用，永久获得主要功能</td></tr>

<tr><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">Pro</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">¥5500 / 终身</td><td style="padding:10px 12px;border:1px solid #e2e8f0;vertical-align:top">专业用途，全部功能，<strong>含商业使用授权</strong></td></tr>

</tbody></table>

<p>付费才有的关键能力是 <strong>Smart Mode</strong>：把画质、格式、路径等偏好一次性设好，之后粘贴链接就自动套用；另外还能通过<strong>应用内浏览器</strong>下载需要登录才能看的内容。免费档没有这些，但日常偶尔下几个视频够用。</p>

<h2>怎么选：按你的主要场景对号入座</h2>

<div style="display:flex;gap:14px;flex-wrap:wrap;margin:0 0 24px">

<div style="flex:1;min-width:250px;background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #2563eb;padding:16px 18px;border-radius:6px">

<div style="font-weight:700;color:#1d4ed8;margin-bottom:6px;font-size:16px">偶尔存一个，什么平台都有</div>

<div style="color:#334155;font-size:14px;line-height:1.8">

用 <strong>cobalt.tools</strong>。<br>

不用装软件，手机电脑通用，开源可自托管，还不缓存你的内容。

</div>

</div>

<div style="flex:1;min-width:250px;background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #16a34a;padding:16px 18px;border-radius:6px">

<div style="font-weight:700;color:#15803d;margin-bottom:6px;font-size:16px">主要下 B 站 / YouTube，量不小</div>

<div style="color:#334155;font-size:14px;line-height:1.8">

上客户端：<strong>Bili23-Downloader</strong> 管 B站，<strong>YoutubeDownloader</strong> 管 YouTube。<br>

两者都开源免费、多线程、支持断点续传和批量。

</div>

</div>

<div style="flex:1;min-width:250px;background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #ea7317;padding:16px 18px;border-radius:6px">

<div style="font-weight:700;color:#b45309;margin-bottom:6px;font-size:16px">要批量 + 图形化，不想折腾</div>

<div style="color:#334155;font-size:14px;line-height:1.8">

用 <strong>4K Video Downloader Plus</strong>。<br>

免费档先试，需要 Smart Mode 或登录态内容再考虑付费档。

</div>

</div>

</div>

<h2>必须说清楚的几件事（合规与风险）</h2>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:16px 20px;margin:0 0 22px;border-radius:6px;color:#7f1d1d;font-size:15px;line-height:1.9">

<strong>1. 下载不等于可以随便用。</strong>cobalt 官方明确声明：<strong>它对用户下载什么、怎么用、怎么传播承担零责任</strong>。这些内容版权仍归原作者，二次发布、商用前必须拿到授权。<br><br>

<strong>2. 只能下公开免费内容。</strong>这些工具的设计前提是「免费且公开可访问」，会员专属、付费内容绕不过 DRM，也不该绕。<br><br>

<strong>3. 在线工具会经手你的链接。</strong>第三方闭源站点能看到你请求了什么，隐私敏感内容尽量走开源客户端或自托管实例。<br><br>

<strong>4. 工具随时可能失效。</strong>抖音、B站、TikTok 这类平台反爬策略更新频繁，在线解析站尤其容易挂；收藏的链接过几个月打不开是常态。

</div>

<h3>几个常见坑</h3>

<ul style="margin:0 0 22px;padding-left:22px;line-height:1.9">

<li>短视频平台（抖音 / TikTok）的在线解析<strong>最不稳定</strong>，平台一改接口就集体失效</li>

<li>「去水印」类站点<strong>经常换域名</strong>，收藏夹里的地址可能几个月就作废</li>

<li><strong>批量下载别用在线站</strong>，速度慢、有次数限制，直接上桌面客户端</li>

<li>需要<strong>登录才能看的内容</strong>，在线站基本无解，只能用带应用内浏览器的客户端</li>

<li><strong>字幕和视频是分开的</strong>，downsub 只负责字幕，视频还得另下</li>

</ul>

<div style="background:#0f172a;color:#e2e8f0;padding:18px 22px;margin:0 0 24px;border-radius:6px;line-height:1.9">

<strong style="color:#ffffff">一句话结论：</strong>这份清单的价值在于<strong>把平台分工讲清楚了</strong>——通用跨平台用 cobalt，B站用 Bili23，YouTube 用 YoutubeDownloader，字幕用 downsub，TikTok 去水印用 ssstik。真要长期稳定地用，<strong style="color:#ffffff">优先选开源客户端</strong>：链接不出本机、不受站点关停影响、也不用赌第三方的人品。

</div>
