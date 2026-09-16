---
title: "Telegram Drive：把 Telegram 收藏夹变成 4.9k star 的桌面网盘，但严格说不是开源"
date: '2026-09-02T04:34:20+08:00'
updated: '2026-09-02T04:34:20+08:00'
slug: telegram-drive-cloud-workspace
categories:
- "数码生活"
- "软件与开发"
description: "Telegram Drive 是一款将 Telegram「已保存消息」和频道作为个人云盘的第三方桌面客户端，支持文件管理、视频流式播放、Folder Sync 和 WebDAV 挂载，覆盖 Windows、macOS、Linux 和 Android。需用户自行申请 api_id / api_hash"
cover: "/wp-content/uploads/2026/09/td-cover-7c9c7b.png"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/09/td-cover-7c9c7b.png" alt="Telegram Drive：把 Telegram 收藏夹变成桌面网盘工作区" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p><strong>Telegram Drive</strong>（GitHub：<code>caamer20/Telegram-Drive</code>，作者 caamer20，2026-09-02 实测 4,987 star）做的事一句话能讲完：<strong>把 Telegram 自己的「已保存消息」和频道当云盘用，再给套一个桌面工作区</strong>——整理、预览、播放、远程 URL 拉取、Folder Sync、WebDAV 挂载这些桌面网盘常见操作都能干，覆盖 Windows、macOS（Intel 与 Apple Silicon）、Linux、Android、Google TV。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:0 0 22px;border-radius:6px;">
<p style="margin:0;color:#1d4ed8;font-size:15px;line-height:1.8;"><strong>一句话定位：</strong>Telegram Drive 是一款用 <strong>Tauri 2 + Rust + React 19</strong> 写的桌面端，<strong>直接连你自己的 Telegram 账号（MTProto）</strong>，把「已保存消息」当个人主页、把你建好的 Telegram 频道当文件夹，并提供网盘式桌面体验。<strong>不经过第三方文件中转服务器</strong>，但需自己去 <code>my.telegram.org</code> 申请 <code>api_id</code> / <code>api_hash</code>。</p>
</div>

<h2>一、Telegram Drive 是什么</h2>
<p>GitHub 描述一句话总结：「<strong>Turn your Telegram account into an unlimited, secure cloud storage drive. an Open-source desktop app built with Tauri, Rust, and React.</strong>」它和 Telegram 官方客户端是<strong>平行存在的第三方客户端</strong>，走的也是 Telegram 官方 MTProto API（用 <code>grammers</code> 这个 Rust 库）。</p>
<p>几个<strong>关键事实</strong>（全部实测自仓库 README + Telegram 官方 FAQ + 抓取的 30KB 状态页）：</p>
<ul>
<li><strong>作者：</strong>caamer20（个人开发者，仓库自述"Telegram Drive is an independent project and is not affiliated with Telegram FZ-LLC"）。</li>
<li><strong>最新版：</strong><code>v3.8.5</code>（2026-08-31 发布，距发文不到 48 小时）。</li>
<li><strong>Star 数：</strong>4,987（2026-09-02 实测）。</li>
<li><strong>协议：</strong>GitHub 标记为 <code>License: Other (NOASSERTION)</code>，<strong>未提供 OSI 认证的开源许可证</strong>。</li>
<li><strong>技术栈：</strong>Tauri 2 + Rust + React 19 + TypeScript + Tailwind CSS 4 + TanStack Query/Virtual + SQLite + Tokio + Actix Web + grammers（MTProto 客户端）+ PDF.js + HLS.js + MP4Box。</li>
<li><strong>官网：</strong><a href="https://caamer20.github.io/Telegram-Drive/" target="_blank" rel="nofollow noopener" title="https://caamer20.github.io/Telegram-Drive/">caamer20.github.io/Telegram-Drive/</a>。</li>
</ul>
<p>它不是 Telegram 自家出的工具，也不是「Telegram 网盘」的官方方案——<strong>是个第三方桌面客户端，附带一套文件管理 UI</strong>。这条边界对后面判断「能不能用」「要不要用」很关键。</p>

<h2>二、它能干什么：6 类桌面网盘常见操作</h2>
<p>桌面端主界面是经典的双栏 + 网格视图，<strong>左侧</strong>是「Saved Messages」+ 多个 channel 化成的文件夹，<strong>右侧</strong>是文件网格，<strong>左上</strong>是上传按钮、搜索框，<strong>左下</strong>是已同步状态 + 用量条。整张布局和 OneDrive / Dropbox / 坚果云桌面客户端基本同构。</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/td-folders-3d194c.png" alt="Telegram Drive 桌面端文件夹管理界面" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：Telegram Drive 桌面端文件夹管理。左侧列出 Saved Messages 与作为"文件夹"的 Telegram 频道，右侧是文件网格，缩略图懒加载、可调缩放（50%~200%），底部显示「Used Today 26 MB / 250 GB」配额。来源：<a href="https://github.com/caamer20/Telegram-Drive" target="_blank" rel="nofollow noopener">caamer20/Telegram-Drive</a> README 官方截图。</p>

<ul>
<li><strong>文件管理：</strong>网格/列表两种视图、文件名搜索、排序、多选/范围选择、批量操作（上传/下载/重命名/复制/移动/删除）、拖拽上传/拖拽整理、文件夹建/改/删/可见性控制、<strong>整文件夹上传（可选先打 ZIP）</strong>、远程 URL 上传（带进度/取消/重试/限速/断点续传）。</li>
<li><strong>传输可靠性：</strong>持久化的上传/下载队列（<strong>关窗/重启不会丢</strong>）、独立的上传/下载并发控制、带宽限制、暂停/恢复/重试/取消、flood-wait 自动处理、Telegram 限速自动退避、下载走临时文件 + 原子重命名。</li>
<li><strong>预览与播放：</strong>图片查看器（缩放/平移/适合窗口/键盘导航）、<strong>内置 PDF 阅读器</strong>、音频播放器、<strong>视频流式播放</strong>（HLS/fMP4 streaming，remuxing/transcoding 兜底）。</li>
<li><strong>压缩包：</strong>支持 ZIP / RAR / 7z 浏览与解压（解压回 Telegram Drive 取决于平台）。</li>
<li><strong>Folder Sync（桌面端）：</strong>本地目录与某个 Telegram 频道之间的双向同步，对比三态（本地 / 远程 / 上次成功）后才动任一边。<strong>冲突有显式选项</strong>（Keep Local / Keep Remote / Keep Both），<strong>有 &gt; 50% 文件被删的防护</strong>（防止配置错导致整盘清空），单频道上限 50,000 个文件。</li>
<li><strong>本地集成：</strong>密码保护 + 可过期的本地下载链接、原生 Telegram 消息链接（公开频道用）、<strong>本地 REST API</strong>（<code>http://127.0.0.1:8550/api/v1</code>，默认关闭，只绑 127.0.0.1）、<strong>本地 WebDAV</strong>（<code>http://127.0.0.1:8551/dav/&lt;token&gt;</code>，默认只读），可挂到 macOS Finder / Windows 资源管理器 / Linux 文件管理器。</li>
</ul>

<h2>三、视频流式播放与多端覆盖</h2>
<p>视频是这个工具最值得讲的「桌面网盘」特征之一——很多云盘只能「下载下来看」，它直接给一个<strong>支持 HLS/fMP4 流的播放器</strong>，打开 .mp4 / .mkv 之类直接边下边播，remuxing/transcoding 兜底处理兼容性。</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/td-video-27aa84.png" alt="Telegram Drive 视频播放器：流式播放、拖动进度、转码兜底" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：Telegram Drive 桌面端视频播放器界面。内置 HLS / fMP4 流式播放、断点续播、字幕/音轨切换、remuxing / transcoding 兜底，部分格式依赖系统解码器或 FFmpeg。来源：<a href="https://github.com/caamer20/Telegram-Drive" target="_blank" rel="nofollow noopener">caamer20/Telegram-Drive</a> README 官方截图。</p>

<p>移动端这边覆盖 <strong>Android 7.0+ 与 Google TV</strong>，一份签名 APK 通吃手机、平板、Android TV、Google TV。</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/td-android-1b0cf3.png" alt="Telegram Drive 安卓端文件列表" style="max-width:480px;height:auto;border-radius:6px;display:block;margin:0 auto;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：Telegram Drive Android 版文件列表，UI 与桌面端是同一套设计语言，支持系统媒体控制、画中画、字幕/音轨选择、后台传输。来源：<a href="https://github.com/caamer20/Telegram-Drive" target="_blank" rel="nofollow noopener">caamer20/Telegram-Drive</a> README 官方截图。</p>

<p>24 种语言（含简中、繁中、日韩、阿拉伯、波斯、乌尔都等），系统语言自动匹配。<strong>没有 iOS 版</strong>（Telegram iOS 客户端有审核限制 + Apple 政策对第三方 MTProto 客户端不友好，README 也没提 iOS 计划）。</p>

<h2>四、上手门槛：必须自己申请 api_id / api_hash</h2>
<p>这是推文没提、但<strong>最大的一道劝退门槛</strong>。</p>
<p>由于 Telegram 要求第三方客户端使用 Application API ID + API Hash（<strong>官方不提供公共凭据</strong>），Telegram Drive 也不会替你申请——第一次打开会要求你去 <a href="https://my.telegram.org" target="_blank" rel="nofollow noopener" title="https://my.telegram.org">my.telegram.org</a> 注册一个 Telegram app、拿到 <code>api_id</code> 和 <code>api_hash</code> 粘贴进应用里。流程大约 3 分钟：</p>
<ol>
<li>登录 <code>my.telegram.org</code>（用你<strong>打算给 Telegram Drive 用的那个 Telegram 号</strong>）。</li>
<li>点「API development tools」→ 填应用名（随便填，比如 "Telegram Drive"）→ 选 platform（<code>Desktop</code> 或 <code>Android</code> 即可）。</li>
<li>复制返回的 <code>api_id</code>（一串数字）和 <code>api_hash</code>（32 位 hex），粘贴到 Telegram Drive。</li>
<li>再用手机号 + 登录码（<strong>不要选 2FA 之外的临时码</strong>）登录。开启「两步验证」的话再走一步云密码。</li>
</ol>
<p>api_id / api_hash 是<strong>这个 Telegram Drive 安装的本地凭据</strong>，不进任何第三方服务器。但 README 也明确警告：<strong>当作密钥对待</strong>——不要贴到 issue、log、截图里。</p>
<div style="background:#fff7ed;border-left:4px solid #ea7317;padding:14px 18px;margin:14px 0;border-radius:6px;">
<p style="margin:0;font-size:14px;line-height:1.8;color:#7c2d12;"><strong>注意：「用你自己的 Telegram 账号，不经过第三方服务器」是真，但只是故事的一半。</strong>应用本身确实<strong>不跑自己的文件中转</strong>（README 写明 "The project does not operate a separate file-relay service"），但 Telegram 自己的服务端是必经的——<strong>所有上传下载都要走 Telegram 的 MTProto</strong>。也就是说，你的文件仍受 Telegram 账号/服务端/单文件 2GB 限制约束，并不是字面意义上的「无限网盘」。</p>
</div>

<h2>五、单文件 2GB 上限、$5 去广告、还有几道坑</h2>

<h3>5.1 单文件上限 = 2,000,000,000 字节</h3>
<p>README 写得很清楚：<code>The application caps a Telegram object at exactly 2,000,000,000 bytes</code>。这不是 app 自己限的 2GB，而是<strong>免费 Telegram 账号的官方上限</strong>（Telegram FAQ 原文："Send and receive files of any type, up to 2 GB in size each"）。</p>
<p>注意 Telegram Premium 把上限提到了 <strong>4 GB</strong>（FAQ 原文："or 4 GB with Premium"），但 Telegram Drive 的代码里写死了 2e9 字节，<strong>就算你开 Premium 也不会自动跳到 4GB</strong>。这是个被忽略的细节——如果你专门为了大文件上 Premium，记得确认这个工具后续版本是否调整。</p>
<p>加密文件 (TDENC2, alpha 阶段) 由于 envelope 占用，单文件明文上限会再低一些。</p>

<h3>5.2 「花 5 刀能永久去掉赞助位」——有补充条款</h3>
<p>原文说「花 5 刀能永久去掉赞助位」属实，但漏了两个关键点：</p>
<ul>
<li><strong>是按设备授权，最多 3 台</strong>：<strong>最多 3 台</strong> Windows / macOS / Linux / Android 设备共享一个购买凭证（README 原句 "up to three supported Windows, macOS, Linux, or Android devices in total"）。</li>
<li><strong>必须保留恢复码</strong>：付款后会显示一个 recovery code，<strong>换机 / 重装恢复全靠它</strong>。README 写明「Payment alone does not bypass verification. Refunds are not automatic or guaranteed except where required by law.」</li>
<li><strong>争议 / 退款 / 拒付会吊销 ad-free</strong>，协议版本 2026-08-11 明确写了这点。</li>
</ul>
<p>5 刀 = 永久去广告（最多 3 设备），<strong>不存在订阅</strong>，但所有功能本身（包括普通使用）本来就不收费——这个付费实际买的只是「去广告」，没解锁任何功能 tier。</p>

<h3>5.3 「所有功能免费」是真，但免费版有 sponsor placements</h3>
<p>赞助位具体长什么样？README 没明说，但项目里有个 <code>sponsorLinks</code> 单元测试（<code>tests/unit/sponsorLinks.test.ts</code>），说明赞助位是文件列表里的<strong>可识别元素</strong>，不是强制弹窗广告。Supporter license 激活后会主动 hide 掉这些元素。</p>

<h3>5.4 「不经过第三方服务器」要加上安全前提</h3>
<p>前提是：①你信 caamer20 这个个人开发者的代码（<strong>未经独立安全审计</strong>，<code>APPLICATION_AUDIT_REPORT.md</code> 是项目<strong>自审</strong>）；②你信 Telegram Drive 的 release 签名（NSIS 安装包、APK 签名）；③你的 <code>api_id</code> / <code>api_hash</code> / 登录码 / 加密 vault 凭证在本地保存，不会被回传。</p>
<p>README 在 <code>SECURITY.md</code> 之外没说自己接受第三方安全审计，<strong>不建议把唯一重要数据 / 重要隐私文件只放在它上面</strong>。它官方也明说："<strong>Telegram Drive should not be treated as literally unlimited storage or as the only backup of important data.</strong>"</p>

<h2>六、项目现状：4.9k star，48 小时内连发 3 版</h2>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/td-card-1f7f0a.png" alt="caamer20/Telegram-Drive GitHub 仓库卡片" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：GitHub 仓库卡片。<code>caamer20/Telegram-Drive</code>，截至 2026-09-02 实测 4,987 star。GitHub 侧栏 license 字段：<code>Other (NOASSERTION)</code>，<strong>无标准开源许可证</strong>。</p>

<p>近 8 个 release（节选自 GitHub Releases atom feed）：</p>
<ul>
<li><strong>v3.8.5</strong>（2026-08-31，最新）</li>
<li>v3.8.0（2026-08-30）</li>
<li>v3.7.0（2026-08-28）</li>
<li>v3.6.0（2026-08-25）</li>
<li>v3.5.0（2026-08-25）</li>
<li>v3.0.0（2026-08-21）</li>
<li>v2.5.5（2026-08-20）</li>
<li>v2.5.4（2026-08-18）</li>
</ul>
<p>半个月内从 v2.5 → v3.8，<strong>迭代速度非常快</strong>，<strong>不建议拿作生产 / 重要数据唯一承载</strong>。当网盘的「临时中转 / 二次分发通道」用还合适。</p>

<h2>七、适合谁 / 不适合谁</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">适合</th>
<th style="background:#dc2626;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">不适合</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">想白嫖 Telegram 自带云存储做<strong>临时 / 二次分发</strong>的个人用户</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">把<strong>唯一重要数据</strong>（照片库、项目源码、账目）<strong>全量备份</strong>在它上面的人</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">需要「桌面 + Android」多端<strong>同步</strong>的轻量文件流（自己建 channel 当文件夹）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">需要<strong>审计 / 合规 / 权限分级</strong>的团队 / 企业（这工具没有用户概念、没有 ACL）</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">喜欢把 Telegram channel 当<strong>公开订阅源</strong>的人（公开 channel 用原生链接，外部无需安装）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">已经把 Telegram Premium 4GB 上限当作「卖点」来用的人（这里 2GB 写死）</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">想自己跑 REST API / WebDAV<strong>挂到本地资源管理器</strong>、写自动化脚本的用户</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">iOS-only 用户（<strong>没有 iOS 版</strong>）</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">能接受「source-available 但非 OSI 开源」、信得过个人开发者代码的用户</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">必须用 OSI 标准开源协议做<strong>二开 / 商业集成</strong>的开发者</td>
</tr>
</tbody>
</table>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:26px 0;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>Telegram Drive 解决的是「<strong>我已经有个 Telegram 账号、想把它的免费云存储加上桌面端网盘体验</strong>」这个特定场景——免服务器、免订阅、跨 Win/macOS/Linux/Android/Google TV，Folder Sync 和本地 WebDAV 都很实用。<strong>代价是：</strong>①没有 OSI 开源许可证（GitHub 显示 Other/NOASSERTION），二次分发与商业集成受限；②<strong>单文件 2GB 写死</strong>，Premium 4GB 不会自动放；③半个月连发 8 个版本，<strong>不建议当唯一备份</strong>；④iOS 没版；⑤个人开发者项目未经独立安全审计。当一个<strong>临时中转 / 个人云</strong>用用挺好，<strong>当生产存储 / 唯一备份</strong>就过头了。</p>
</div>

<h2>项目地址</h2>
<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:16px 20px;border-radius:6px;">
<p style="margin:0 0 8px;font-size:15px;line-height:1.8;"><strong><a href="https://github.com/caamer20/Telegram-Drive" target="_blank" rel="nofollow noopener" title="https://github.com/caamer20/Telegram-Drive">Telegram Drive — GitHub</a></strong> · <strong><a href="https://caamer20.github.io/Telegram-Drive/" target="_blank" rel="nofollow noopener" title="https://caamer20.github.io/Telegram-Drive/">官网</a></strong> · <strong><a href="https://github.com/caamer20/Telegram-Drive/releases/latest" target="_blank" rel="nofollow noopener" title="https://github.com/caamer20/Telegram-Drive/releases/latest">最新发布</a></strong></p>
<p style="margin:0;font-size:14px;line-height:1.8;color:#475569;">Telegram Drive 是 caamer20 个人项目，非 Telegram 官方。用 Tauri 2 + Rust + React 写桌面端，直连自己的 Telegram 账号（MTProto），<strong>不跑第三方文件中转</strong>。License: GitHub 显示 Other (NOASSERTION)，<strong>非 OSI 开源</strong>。v3.8.5（2026-08-31）、4,987 star。安装需自备 <code>my.telegram.org</code> 申请的 <code>api_id</code> / <code>api_hash</code>。</p>
</div>



<p style="margin:24px 0 8px;"><img src="/wp-content/uploads/2026/09/td-tweet-085b0a.png" alt="Telegram Drive 中文版 README 头部截图" style="max-width:480px;height:auto;border-radius:6px;display:block;margin:0 auto;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;text-align:center;">图：Telegram Drive 中文版 README 头部截图，副标题「一个以本地优先的文件工作区，由您自己的 Telegram 账户提供支持」。</p>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">Telegram Drive</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">把 Telegram 收藏夹变成桌面网盘工作区。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 5033</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 730</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">开源</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">网盘</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">Telegram</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">桌面</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/caamer20/Telegram-Drive" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/caamer20/Telegram-Drive</a></p></div></div>
