---
title: "WordPress官方浏览器插件｜一键隐藏前台管理工具栏（2026最新）"
date: '2026-08-30T13:24:08+08:00'
updated: '2026-08-30T13:24:08+08:00'
slug: wordpress-official-browser-extension-hide-admin-bar
categories:
- "免费软件"
description: "WordPress 基金会在 2026 年 8 月发布官方免费开源浏览器扩展（239KB），可隐藏前台黑色管理栏，并将编辑、进后台、登录等高频操作迁移至浏览器工具栏图标，实现前台页面干净且功能完整保留。当前支持 Chrome 与 Safari，无用户追踪，数据全部本地存储，同时内置区块边框、移动端预"
---

<p style="color:#64748b;font-size:15px;line-height:1.9">WordPress 基金会在 2026 年 8 月推出了一款免费浏览器扩展：<strong>WordPress Browser Extension</strong>。它能把网站前台那条黑色 Admin Bar 管理栏隐藏掉，同时把「编辑文章、进后台、登录登出」这些高频操作收进浏览器工具栏图标里。当前 <strong>1.0.2 版本体积仅 239KB</strong>，适配 Chrome 与 Safari，项目开源且不做任何用户追踪。</p>

<div style="display:flex;gap:12px;flex-wrap:wrap;margin:18px 0">
  <div style="flex:1;min-width:160px;background:#eaf2ff;padding:14px 16px;border-radius:6px;text-align:center">
    <div style="font-weight:700;color:#1d4ed8;font-size:20px">1.0.2</div>
    <div style="color:#64748b;font-size:13px;margin-top:4px">当前版本（2026-08）</div>
  </div>
  <div style="flex:1;min-width:160px;background:#eafaf0;padding:14px 16px;border-radius:6px;text-align:center">
    <div style="font-weight:700;color:#16a34a;font-size:20px">239 KB</div>
    <div style="color:#64748b;font-size:13px;margin-top:4px">安装包体积</div>
  </div>
  <div style="flex:1;min-width:160px;background:#f5f3ff;padding:14px 16px;border-radius:6px;text-align:center">
    <div style="font-weight:700;color:#7c3aed;font-size:20px">Chrome / Safari</div>
    <div style="color:#64748b;font-size:13px;margin-top:4px">官方适配浏览器</div>
  </div>
  <div style="flex:1;min-width:160px;background:#f8fafc;padding:14px 16px;border-radius:6px;text-align:center">
    <div style="font-weight:700;color:#0f172a;font-size:20px">MIT 开源</div>
    <div style="color:#64748b;font-size:13px;margin-top:4px">免费 · 无追踪</div>
  </div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">一、它到底解决什么问题</h2>

<p style="color:#64748b;font-size:15px;line-height:1.9">只要运营过 WordPress 站点，对页面顶部那条黑色管理工具栏一定不陌生。登录状态下它固定显示在最上方，虽然能快速跳后台、编辑当前文章，但问题也很明显。</p>

<div style="display:flex;gap:12px;flex-wrap:wrap;margin:18px 0">
  <div style="flex:1;min-width:240px;background:#fef2f2;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px">
    <div style="font-weight:700;color:#dc2626;margin-bottom:8px;font-size:15px">✕ 管理栏本身的麻烦</div>
    <ul style="color:#64748b;font-size:14px;line-height:1.8;padding-left:20px;margin:0">
      <li>大量插件往管理栏塞菜单，界面越来越拥挤</li>
      <li>固定在顶部，<strong>遮挡网页顶部布局</strong></li>
      <li>想完整预览主题真实效果，<strong>只能手动退出账号</strong></li>
    </ul>
  </div>
  <div style="flex:1;min-width:240px;background:#fff7ed;border-left:4px solid #f97316;padding:14px 16px;border-radius:6px">
    <div style="font-weight:700;color:#f97316;margin-bottom:8px;font-size:15px">⚠️ 传统关闭方式的代价</div>
    <ul style="color:#64748b;font-size:14px;line-height:1.8;padding-left:20px;margin:0">
      <li>在个人资料里关掉工具栏，<strong>快捷入口也一起消失</strong></li>
      <li>想进后台只能<strong>手动输入网址</strong></li>
      <li>用主题代码或插件关，<strong>每个站点都要单独配置</strong></li>
    </ul>
  </div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">二、三种隐藏方式核心对比</h2>

<p style="color:#64748b;font-size:15px">WordPress 本身就带关闭前台工具栏的选项，但不同实现方式，<strong>保留下来的能力差别很大</strong>。</p>

<div style="overflow-x:auto;margin:16px 0">
<table style="width:100%;min-width:660px;border-collapse:collapse;font-size:14px;line-height:1.7">
  <thead>
    <tr>
      <th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">实现方式</th>
      <th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">前台管理栏</th>
      <th style="background:#7c3aed;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">快捷入口保留情况</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">个人资料取消勾选「查看网站前端时显示工具栏」</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#16a34a;font-weight:700">隐藏</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#dc2626">编辑、后台链接<strong>全部消失</strong>，需手动输入网址访问后台</td>
    </tr>
    <tr style="background:#f8fafc">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">主题代码 / 第三方插件关闭工具栏</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#16a34a;font-weight:700">隐藏</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#dc2626">快捷按钮同样消失，且<strong>每个站点都要单独配置</strong></td>
    </tr>
    <tr style="background:#eafaf0">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#16a34a">WordPress Browser Extension 扩展</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#16a34a;font-weight:700">隐藏</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#0f172a"><strong>功能迁移至浏览器图标</strong>，一键编辑、进后台完全不受影响</td>
    </tr>
  </tbody>
</table>
</div>

<div style="background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="color:#0f172a;font-size:15px;line-height:1.8"><strong>核心差异只有一句</strong>：前两种方式都是「要么留着碍事，要么关了就没入口」；扩展是<strong>把入口换个地方放</strong>——前台干净了，功能一个没少。</div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">三、它是什么，以及从哪来的</h2>

<p style="color:#64748b;font-size:15px;line-height:1.9">这款扩展由 <strong>WordPress 基金会</strong>在 2026 年 8 月正式发布，完全免费开源。它把前台管理栏隐藏，将编辑页面、后台控制台、登录登出等高频操作全部收进浏览器工具栏图标——需要时点一下图标就能调用，<strong>前台页面保持干净，操作效率也不打折</strong>。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="font-weight:700;color:#1d4ed8;margin-bottom:6px;font-size:15px">🔒 隐私方面</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">不存在用户行为追踪与统计上报，<strong>配置和站点列表全部保存在本地浏览器</strong>，不用担心隐私泄露。</div>
</div>

<h3 style="font-size:17px;font-weight:700;color:#7c3aed;margin:24px 0 10px">项目来历：从个人项目到官方维护</h3>

<ol style="color:#64748b;font-size:15px;line-height:1.9;padding-left:22px;margin:12px 0">
  <li style="margin-bottom:8px">最早是开发者 <strong>Jake Goldman</strong>（10up 创始人、Fueled 合伙人）放在 GitHub 的个人项目，最初叫 <strong>WP Detective</strong></li>
  <li style="margin-bottom:8px">2026 上半年 Automattic 开展性能优化项目时，被 WordPress 创始人 <strong>Matt Mullenweg</strong> 发现</li>
  <li style="margin-bottom:8px">此后正式纳入官方项目维护，<strong>历经三个月社区测试</strong>才对外发布</li>
</ol>

<div style="background:#f5f3ff;border-left:4px solid #7c3aed;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="font-weight:700;color:#7c3aed;margin-bottom:6px;font-size:15px">💡 一个有意思的细节</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">该项目<strong>绝大多数代码并非人工手写</strong>，主要依靠 <strong>Claude Code、OpenAI Codex</strong> 配合 WordPress 专属提示指令生成。</div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">四、浏览器兼容情况 &amp; 界面语言</h2>

<p style="color:#64748b;font-size:15px">官方目前正式发布 Chrome 与 Safari 版本，其余浏览器适配情况如下：</p>

<div style="overflow-x:auto;margin:16px 0">
<table style="width:100%;min-width:640px;border-collapse:collapse;font-size:14px;line-height:1.7">
  <thead>
    <tr>
      <th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">浏览器</th>
      <th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">获取渠道</th>
      <th style="background:#7c3aed;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">补充说明</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">Chrome</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">Chrome 网上应用店</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#16a34a;font-weight:700">官方主力维护版本</td>
    </tr>
    <tr style="background:#f8fafc">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">Edge / Brave / Vivaldi<br><span style="font-weight:400;font-size:13px;color:#64748b">（Chromium 内核）</span></td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">Chrome 网上应用店</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">可直接安装，但没有上架对应浏览器的自有应用商店</td>
    </tr>
    <tr style="background:#ffffff">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">macOS 版 Safari</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">Mac App Store</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#f97316">免费下载，装完需到<strong>Safari 设置 → 扩展</strong>手动开启</td>
    </tr>
    <tr style="background:#f8fafc">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">Firefox</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#dc2626">暂无安装包</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">官方计划 1.0 版本更新后再做适配</td>
    </tr>
  </tbody>
</table>
</div>

<div style="background:#fff7ed;border-left:4px solid #f97316;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="font-weight:700;color:#f97316;margin-bottom:6px;font-size:15px">🌐 界面语言</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">当前版本仅支持<strong>英文、保加利亚语、日语</strong>，暂无繁体中文。不过菜单文字不多，大多是 Dashboard、Edit Page 这类简单英文词汇，上手门槛不高。</div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">五、工具下载地址</h2>

<div style="display:flex;gap:12px;flex-wrap:wrap;margin:18px 0">
  <div style="flex:1;min-width:260px;background:#f8fafc;border:1px solid #e2e8f0;padding:16px 18px;border-radius:6px">
    <div style="font-weight:700;color:#0f172a;font-size:16px;margin-bottom:6px">WordPress Browser Extension</div>
    <div style="color:#64748b;font-size:14px;line-height:1.8">Chrome / Edge / Brave / Vivaldi → <strong>Chrome 网上应用商店</strong><br>macOS Safari 版 → <strong>Mac App Store</strong></div>
  </div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">六、使用教程</h2>

<h3 style="font-size:17px;font-weight:700;color:#2563eb;margin:24px 0 10px">Step 1 · 安装扩展程序</h3>
<ul style="color:#64748b;font-size:15px;line-height:1.9;padding-left:22px;margin:12px 0">
  <li style="margin-bottom:8px"><strong>Chrome 系</strong>：打开 Chrome 网上应用商店对应页面，点击安装即可。2026 年 8 月最新版为 <strong>1.0.2</strong>，安装包 <strong>239KB</strong>；Edge、Brave、Vivaldi 这类 Chromium 内核浏览器都能直接装</li>
  <li style="margin-bottom:8px"><strong>macOS Safari</strong>：前往 Mac App Store 下载 Safari 专属版本，同样免费。装完进入<strong>Safari 设置 → 扩展标签页</strong>，勾选启用即可正常使用全部功能</li>
</ul>

<h3 style="font-size:17px;font-weight:700;color:#2563eb;margin:24px 0 10px">Step 2 · 识别 WordPress 站点，隐藏工具栏</h3>
<p style="color:#64748b;font-size:15px;line-height:1.9">安装完成后浏览任意网页，浏览器工具栏上的 WordPress 图标会根据识别状态显示不同标记：<strong>如果站点已处于登录状态，图标角落会出现绿色小圆点</strong>，代表扩展对当前网站生效。</p>

<div style="background:#eaf2ff;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="font-weight:700;color:#1d4ed8;margin-bottom:8px;font-size:15px">它靠 4 个信号识别 WordPress 站点</div>
  <ul style="color:#64748b;font-size:14px;line-height:1.8;padding-left:20px;margin:0">
    <li>REST API 接口</li>
    <li>页面 generator 版本标记</li>
    <li>静态资源路径</li>
    <li>页面 body 类名</li>
  </ul>
</div>

<p style="color:#64748b;font-size:15px;line-height:1.9">点击浏览器右上角的扩展图标，弹窗上半部分会出现<strong>编辑页面、跳转 WP 后台</strong>等功能选项。<strong>Show Admin Bar</strong> 选项可以手动切换前台工具栏的显示与隐藏。</p>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="font-weight:700;color:#dc2626;margin-bottom:6px;font-size:15px">⚠️ 注意</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">如果你<strong>已经在个人资料或者主题代码层面禁用了管理栏</strong>，这个开关会变成<strong>不可点击状态</strong>——想用扩展来控制，先把那边恢复成显示。</div>
</div>

<h3 style="font-size:17px;font-weight:700;color:#2563eb;margin:24px 0 10px">Step 3 · 内置开发者工具箱</h3>
<p style="color:#64748b;font-size:15px;line-height:1.9">扩展下拉菜单底部，附带 4 个面向建站调试的实用工具：</p>

<div style="overflow-x:auto;margin:16px 0">
<table style="width:100%;min-width:600px;border-collapse:collapse;font-size:14px;line-height:1.7">
  <thead>
    <tr>
      <th style="background:#7c3aed;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">工具名称</th>
      <th style="background:#7c3aed;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0">功能说明</th>
    </tr>
  </thead>
  <tbody>
    <tr style="background:#ffffff">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">区块边框标记</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">给页面 Gutenberg 区块加上外框高亮，<strong>排查排版错位非常好用</strong></td>
    </tr>
    <tr style="background:#f8fafc">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">手机尺寸预览</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">弹出 iPhone 尺寸预览窗口，快速查看页面移动端展示效果</td>
    </tr>
    <tr style="background:#ffffff">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">绕过缓存重载页面</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">跳过浏览器缓存强制刷新，<strong>改完 CSS 不用手动清缓存</strong></td>
    </tr>
    <tr style="background:#f8fafc">
      <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:700;color:#0f172a">清除 Cookie 与站点数据</td>
      <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#64748b">一键清空当前域名的 Cookie 和本地存储数据</td>
    </tr>
  </tbody>
</table>
</div>

<h3 style="font-size:17px;font-weight:700;color:#2563eb;margin:24px 0 10px">Step 4 · 移动端预览 &amp; 站点信息</h3>
<ul style="color:#64748b;font-size:15px;line-height:1.9;padding-left:22px;margin:12px 0">
  <li style="margin-bottom:8px"><strong>Mobile Preview</strong> 会直接弹出模拟 iPhone 尺寸的窗口；需要更多设备分辨率同时对比，可搭配 <strong>everysize</strong> 这类工具</li>
  <li style="margin-bottom:8px">扩展选项面板提供若干全局参数：<strong>默认自动隐藏前台工具栏、弹窗展示站点信息、重置扩展本地数据</strong></li>
  <li style="margin-bottom:8px">开启站点信息后菜单多出 <strong>Site Information</strong> 栏目，可读取当前网站使用的<strong>主题、探测到的插件列表</strong>——结果仅供参考，不一定 100% 准确。批量查询站点主题插件可搭配 <strong>TasteWP、WordPress Theme Detector</strong></li>
</ul>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;margin:18px 0">
  <div style="font-weight:700;color:#1d4ed8;margin-bottom:6px;font-size:15px">🏢 托管服务商识别</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">支持识别 <strong>WP Engine、WordPress VIP、Pantheon、Kinsta、Flywheel、Cloudways、WordPress.com、Pressable</strong>，以及本地开发环境。识别到的服务商信息展示在站点网址下方，<strong>探测结果本地缓存 90 天</strong>，避免反复检测给网站带来额外压力。需要完整技术栈分析可搭配 <strong>Wappalyzer</strong> 扩展。</div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">七、常见疑问解答</h2>

<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:14px 16px;border-radius:6px;margin:12px 0">
  <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:6px">Q：需要付费吗？</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">完全免费。由 WordPress 基金会发布，MIT 开源协议托管在 GitHub，<strong>不存在付费高级版本</strong>。</div>
</div>

<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:14px 16px;border-radius:6px;margin:12px 0">
  <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:6px">Q：会上传我的网站相关数据吗？</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">官方文档说明<strong>全部检测逻辑运行在浏览器本地</strong>，没有埋点追踪和统计上报。你的设置、站点清单全部保存在本机浏览器；服务商识别结果本地缓存周期 90 天。</div>
</div>

<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:14px 16px;border-radius:6px;margin:12px 0">
  <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:6px">Q：有没有繁体中文界面？</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">截至 2026 年 8 月版本，仅提供<strong>英文、保加利亚语、日语</strong>，还没有繁体中文翻译。</div>
</div>

<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:14px 16px;border-radius:6px;margin:12px 0">
  <div style="font-weight:700;color:#0f172a;font-size:15px;margin-bottom:6px">Q：Firefox 能不能装？</div>
  <div style="color:#64748b;font-size:14px;line-height:1.8">官方还没有推出 Firefox 适配版本，计划等 1.0 版本迭代之后再开发。<strong>Edge、Brave、Vivaldi 等 Chromium 内核浏览器可以直接安装 Chrome 商店版本</strong>。</div>
</div>

<h2 style="font-size:20px;font-weight:700;color:#0f172a;margin:32px 0 14px;padding-bottom:8px;border-bottom:2px solid #e2e8f0">八、适不适合你</h2>

<div style="display:flex;gap:12px;flex-wrap:wrap;margin:18px 0">
  <div style="flex:1;min-width:240px;background:#eafaf0;border:1px solid #e2e8f0;padding:14px 16px;border-radius:6px">
    <div style="font-weight:700;color:#16a34a;margin-bottom:8px;font-size:15px">✓ 特别适合</div>
    <ul style="color:#64748b;font-size:14px;line-height:1.8;padding-left:20px;margin:0">
      <li>经常需要<strong>在登录状态下预览前台</strong>的站长</li>
      <li>管理栏被插件塞得很乱、想清静一点</li>
      <li>同时维护多个站点，需要快速跳转后台</li>
      <li>常用区块边框、移动端预览等调试小工具</li>
    </ul>
  </div>
  <div style="flex:1;min-width:240px;background:#fef2f2;border:1px solid #e2e8f0;padding:14px 16px;border-radius:6px">
    <div style="font-weight:700;color:#dc2626;margin-bottom:8px;font-size:15px">✕ 暂时不适合</div>
    <ul style="color:#64748b;font-size:14px;line-height:1.8;padding-left:20px;margin:0">
      <li><strong>Firefox 用户</strong>：官方版本还没出</li>
      <li>需要<strong>中文界面</strong>：目前只有英/保加利亚/日语</li>
      <li>已在主题代码层面禁用了管理栏，且不想改动</li>
    </ul>
  </div>
</div>

<div style="background:#0f172a;padding:20px 22px;border-radius:8px;margin:24px 0">
  <div style="color:#ffffff;font-size:16px;font-weight:700;line-height:1.8">239KB、免费开源、不追踪，把碍事的管理栏藏起来的同时，把入口换个地方继续留着——如果你用 Chrome 或 Safari，这个扩展基本是装了不亏。</div>
  <div style="color:#cbd5e1;font-size:14px;line-height:1.8;margin-top:8px">唯一要做的一件事：安装前先确认自己没有在个人资料或主题代码里禁用过管理栏，否则 Show Admin Bar 开关会是灰的。</div>
</div>

<p style="color:#64748b;font-size:13px;line-height:1.8">信息核验更新时间：2026-08</p>
