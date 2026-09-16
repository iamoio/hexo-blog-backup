---
title: "HQ ICON：从 App Store 直接取 1024px 高清应用图标，开源可自建"
date: '2026-09-11T10:00:07+08:00'
updated: '2026-09-11T10:00:07+08:00'
slug: hq-icon-app-store-hd-icon-downloader
categories:
- "免费软件"
description: "HQ ICON是一款MIT开源的网页工具，直接从App Store官方接口获取应用图标原图。支持256/512/1024三档分辨率和PNG/JPEG/WebP三种格式，覆盖24个国家和地区，含iOS、iPadOS、macOS应用。操作简单，输入应用名即可下载高清原图。源码基于React+Vite，可"
cover: "/wp-content/uploads/2026/09/hqicon-cover-260128.png"

---

<p style="text-align:center;margin:0 0 20px;"><img src="/wp-content/uploads/2026/09/hqicon-cover-260128.png" alt="HQ ICON 项目封面" /></p>

<p>HQ ICON（GitHub：YuKongA/HQ-ICON，作者 YuKongA，2026-09 实测 670 star）做的事一句话能讲完：从 App Store 的官方搜索接口直接取应用图标原图——256 / 512 / 1024 三档分辨率、PNG / JPEG / WebP 三种格式、24 个国家和地区的商店任选，搜到哪一个，点一下就把图标存到本地。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:0 0 22px;border-radius:6px;">
<p style="margin:0;color:#1d4ed8;font-size:15px;line-height:1.8;"><strong>一句话定位：</strong>一个打开就能用的网页，输入应用名，把 App Store 里那张高清图标原图拿下来——不装软件、不注册、不用去图标素材站翻。</p>
</div>

<h2>一、HQ ICON 是什么？</h2>

<p>它其实只做一件事：把 Apple 自己那张图标的存放地址拼出来，再按你要的尺寸和格式交给浏览器下载。</p>

<p>关键在于图的来源——不是截图、不是第三方素材站转存、也不是被压过一轮的缩略图，而是开发者提交应用时上传到 Apple 服务器的那张原图。所以清晰度上限就是 App Store 自己的上限。</p>

<p>查应用走的是 Apple 公开的搜索接口，数据跟 App Store 同步：应用换了图标、改了名字，在这里搜到的就是最新的那版。界面本身支持中英双语，深浅色跟随系统，手机浏览器打开也能正常用。</p>

<div style="background:#eafaf0;border-left:4px solid #16a34a;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#15803d;"><strong>顺带一提：</strong>整个项目是 MIT 开源，源码就几个文件，React 19 + Vite 8 的标准工程，想改界面还是想自己搭一个都行。</p>
</div>

<h2>二、能下到什么样的图标？</h2>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">分辨率与格式</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">256px / 512px / 1024px 三档；PNG、JPEG、WebP 三种格式随便切。</p>
</div>
<div style="flex:1;min-width:260px;background:#f2eeff;border-left:4px solid #6d4aff;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#5b21b6;">平台与地区</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">iOS、iPadOS、macOS 三类应用；24 个地区商店（CN、US、JP、KR、TW、HK、SG、GB、FR、DE 等）可切换。</p>
</div>
</div>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#fff5e8;border-left:4px solid #ea7317;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#b45309;">一次查多少个</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">结果数量可选 6 / 18 / 30 / 48，做图标收集时直接拉满。</p>
</div>
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">下载文件名</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">自动命名成「应用名-平台-分辨率x分辨率.格式」，一堆图丢文件夹里也不会乱。</p>
</div>
</div>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#1d4ed8;"><strong>默认值就够用：</strong>默认给的是 512px 的官方圆角 PNG，做文档、做 PPT 绰绰有余；要打印或做壁纸再上 1024。</p>
</div>

<h2>三、怎么用？</h2>

<p>三步，十秒钟的事：</p>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">1. 打开网站</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">作者的站点 <a href="https://icon.yukonga.top/" target="_blank" rel="nofollow">icon.yukonga.top</a>，或 GitHub Pages 版 <a href="https://yukonga.github.io/HQ-ICON/" target="_blank" rel="nofollow">yukonga.github.io/HQ-ICON</a>。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">2. 搜应用名</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">搜索框里输名字回车，比如「微信」「Notion」。</p>
</div>
<div style="flex:1;min-width:220px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px 16px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">3. 点图标下载</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">结果卡片点一下就存到本地，卡片上还标了平台和分类。</p>
</div>
</div>

<div style="background:#eafaf0;border-left:4px solid #16a34a;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#15803d;"><strong>小提示：</strong>结果列表除了滚轮，还能按住鼠标左右拖动；手机上直接滑动。</p>
</div>

<h2>四、想固定一套参数？写进网址就行</h2>

<p>页面上所有筛选条件都能写成网址参数，把这个链接存进收藏夹，等于存了一套专属配置。</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">参数</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">作用</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">默认值</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">name</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">应用名称</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">无</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">country</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">国家 / 地区（cn、us、jp、kr 等）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">cn</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">entity</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">搜索对象：software / iPadSoftware / desktopSoftware</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">software</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">limit</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">搜索结果数量</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">18</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">cut</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">裁切方式（0 / 1 / 2，见下一节）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">resolution</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">分辨率：256 / 512 / 1024</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">512</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">format</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">图片格式：jpeg / png / webp</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">png</td>
</tr>
</tbody>
</table>

<p>比如想要「美区搜 Google、出 18 条、官方圆角、1024px、WebP」，网址就写成：</p>

<div style="font-family:monospace;background:#0f172a;color:#e2e8f0;padding:14px 16px;border-radius:8px;font-size:13px;line-height:1.8;word-break:break-all;margin:14px 0;">https://icon.yukonga.top/?name=Google&amp;country=us&amp;entity=software&amp;limit=18&amp;cut=2&amp;resolution=1024&amp;format=webp</div>

<h2>五、三种裁切方式有什么区别？</h2>

<p>这是唯一容易看懵的选项，其实很好分：</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#6d4aff;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">取值</th>
<th style="background:#6d4aff;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">界面上的名字</th>
<th style="background:#6d4aff;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">实际效果</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">cut=2</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">官方圆角</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">直接用 Apple 原图自带的那圈圆角，边缘最自然，默认就是它</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">cut=1</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">普通圆角</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">在浏览器里用圆角蒙版现裁一张，弧度和官方版略有差异</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">cut=0</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">原始图像</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">完全不裁，拿到方形原图</td>
</tr>
</tbody>
</table>

<div style="background:#fff5e8;border-left:4px solid #ea7317;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#b45309;"><strong>注意：</strong>查询类型选 macOS 时，裁切会自动变成「原始图像」——Mac 应用图标本来就是方角带阴影的，再裁圆角反而怪。</p>
</div>

<h2>六、想自己搭一个？</h2>

<p>仓库是标准的 React + Vite 工程，MIT 协议，fork 下来改完推到 GitHub Pages 就能用，仓库里已经自带了自动部署的工作流文件。</p>

```bash
git clone https://github.com/YuKongA/HQ-ICON.git
cd HQ-ICON
npm install
npm run dev
```

<div style="background:#f1f5f9;border-left:4px solid #475569;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#475569;">图标数据走的是 Apple 的公开接口，自己搭的站不需要申请任何密钥，也不用配后端。</p>
</div>

<h2>七、有几个地方要注意</h2>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0 0 10px;font-size:15px;line-height:1.8;color:#7f1d1d;"><strong>先说清楚边界：</strong></p>
<ul style="margin:0;padding-left:20px;font-size:15px;line-height:1.9;color:#7f1d1d;">
<li><strong>安卓手机可能被限制</strong>：Apple 有时会对安卓的浏览器标识做限制，查询只返回一个完全匹配的结果。作者在隔壁仓库做了 App 版（HQ-ICON_Compose）可以绕过。</li>
<li><strong>打不开先换网络</strong>：页面自带的提示是「如果开启了代理，请关闭后重试，反之亦然」，本质是查询接口在当前网络下没连通。</li>
<li><strong>只覆盖 App Store</strong>：没上架的、已下架的、企业签名的应用都查不到，安卓应用的图标也不在范围内。</li>
<li><strong>少数老应用没有 1024 那档</strong>：取图失败会显示占位图，降到 512 就能正常拿到。</li>
</ul>
</div>

<h2>八、适合谁，不适合谁</h2>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 8px;font-weight:bold;color:#15803d;">挺适合的</p>
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;color:#334155;">
<li>做 PPT、文档、视频需要配高清应用图标</li>
<li>收集图标做壁纸或图标包</li>
<li>写 App 评测、做应用推荐类内容</li>
<li>需要一次性拉一批图标当素材</li>
</ul>
</div>
<div style="flex:1;min-width:260px;background:#fef2f2;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 8px;font-weight:bold;color:#dc2626;">别抱期待的</p>
<ul style="margin:0;padding-left:20px;font-size:14px;line-height:1.8;color:#334155;">
<li>要矢量 SVG 图标——这里只有位图</li>
<li>要安卓应用的图标——这是 App Store 渠道</li>
<li>要改图标设计——它是取图工具，不是作图工具</li>
<li>要商用图标授权——图标版权仍归各自开发者</li>
</ul>
</div>
</div>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:26px 0;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>想要 App Store 里那张官方图标原图，HQ ICON 是目前最省事的一条路——开网页、搜名字、点一下，1024px 的 PNG 就到手了，源码还整个开源。</p>
</div>

<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);">
<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">HQ ICON</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">MIT</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">网页工具</span></div>
<p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">从 App Store 官方搜索接口直接获取高清应用图标，支持 256/512/1024 三档分辨率与 PNG/JPEG/WebP 三种格式，中英双语、深浅色主题，MIT 开源可自建。</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;">
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 670</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Star</div></div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 54</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">MIT</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">协议</div></div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:999px;">App Store</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:999px;">图标下载</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:999px;">React</span><span style="font-size:12px;background:#6d4aff;color:#ffffff;padding:4px 12px;border-radius:999px;">免安装</span></div>
<div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/YuKongA/HQ-ICON" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/YuKongA/HQ-ICON</a></p></div>
</div>
