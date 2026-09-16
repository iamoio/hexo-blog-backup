---
title: "uBlock Origin 满血复活：完整功能 MV3 移植版来了，就是装起来有点折腾"
date: '2026-09-05T11:51:16+08:00'
updated: '2026-09-05T11:51:16+08:00'
slug: ublock-origin-mv3-full-revive
categories:
- "数码生活"
description: "uBlock-mv3 是 uBlock Origin 的 MV3 移植版，通过 Chrome 策略白名单与启动参数绕过限制，完整保留 webRequestBlocking 实时过滤引擎。安装需手动配置，适合重度用户；轻度用户推荐官方 uBO Lite。项目非官方维护，更新依赖开发者跟进。"
cover: "/wp-content/uploads/2026/09/xqh-d9767cfc0e.jpg"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/09/xqh-d9767cfc0e.jpg" alt="uBlock Origin MV3 移植版" /></p>

<p>uBlock Origin 的非官方 Manifest V3 移植版 <strong>uBlock-mv3</strong> 由开发者 r58Playz 维护，已在 GitHub 收获 400+ star（GPLv3 开源），当前基于原版 uBlock Origin 1.74.0 构建。它没有阉割任何能力——原版的实时过滤引擎被完整塞回了 Chrome 的 MV3 体系，代价是安装流程比应用商店一键安装麻烦不少。</p>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:24px 0">
<div style="flex:1;min-width:260px;background:#eaf2ff;border:1px solid #2563eb;border-radius:8px;padding:16px 20px">
<p style="margin:0 0 8px;color:#1d4ed8;font-weight:700">它是什么</p>
<p style="margin:0;color:#334155">原版 uBlock Origin 的完整 MV3 移植：webRequestBlocking 实时过滤引擎原样保留，自定义规则、用户脚本、动态过滤全部可用</p>
</div>
<div style="flex:1;min-width:260px;background:#eafaf0;border:1px solid #16a34a;border-radius:8px;padding:16px 20px">
<p style="margin:0 0 8px;color:#15803d;font-weight:700">适合谁</p>
<p style="margin:0;color:#334155">受够了 uBO Lite 规则阉割、依赖自定义过滤规则和脚本、愿意花十分钟折腾的重度用户</p>
</div>
</div>

<h2>一、MV3 是怎么"判死刑"的</h2>

<p>Chrome 和 Edge 相继淘汰 Manifest V2 后，靠 <code>webRequestBlocking</code> 实时审查网络请求的 uBlock Origin 首当其冲：MV3 只给普通扩展留了 <code>declarativeNetRequest</code>——过滤规则提前交给浏览器托管，扩展自己无权实时干预请求。官方推出的 uBlock Origin Lite 走的就是这条路，能力天然受限。原作者不愿做妥协版移植，社区只能干等，直到 r58Playz 出手。</p>

<div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px 20px;margin:20px 0">
<p style="margin:0 0 12px;color:#475569">这个移植版钻的是 Chrome 给企业用户留的口子——通过 Policy 安装的 MV3 扩展依然能拿到 webRequestBlocking 权限：</p>
<div style="font-family:monospace;background:#0f172a;color:#e2e8f0;padding:14px 18px;border-radius:6px;margin:0;line-height:2">
企业 Policy 通道<br>↓<br>原版过滤引擎跑进 MV3 Service Worker<br>↓<br>--allowlisted-extension-id 启动参数绕过权限检查<br>↓<br>完整功能的 uBlock Origin 复活
</div>
<p style="margin:12px 0 0;color:#475569">普通用户没有企业环境，靠的是给 Chrome 快捷方式追加启动参数，让 Chromium 对这个扩展 ID 单独放行 webRequestBlocking。</p>
</div>

<div style="background:#fff5e8;border-left:4px solid #ea7317;padding:14px 18px;margin:20px 0;border-radius:0 6px 6px 0">
<p style="margin:0;color:#b45309">和真正的企业 Policy 安装相比，启动参数方案有个小缺陷：Policy 安装允许扩展在启动瞬间用 Promise 把网络请求"扣住"，等过滤引擎就绪再处理；启动参数版做不到。于是 uBO 刚启动的几秒里，它会临时取消部分子资源请求，引擎就绪后再自动重载受影响的标签页。日常使用中，差异基本只出现在 Chrome 冷启动那几秒。</p>
</div>

<h2>二、安装步骤详解（白话版）</h2>

<p>先把丑话说在前面：这套流程一共六步，一步都不能省，顺序也最好别乱。全程大概十分钟，不需要懂任何原理，照着做就行。</p>

<p>开始前确认一件事：Chrome 版本至少 <strong>138</strong>。查看方法：点浏览器右上角「⋮」→ 帮助 → 关于 Google Chrome，不够就先升级，老版本带不动这个移植版。</p>

<p>另外准备个记事本，把这串扩展 ID 复制进去备用——它相当于扩展的"身份证号"，后面注册表和启动参数里填的都是它：</p>

<p style="font-family:monospace;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px">blockddmmcjpfkbhanlgegpmjpfpfjka</p>

<p><strong>第一步：下载安装包</strong></p>

<p>打开项目官网 ublock.r58playz.dev，下载 <code>uBlock0_1.74.0.crx</code>。CRX 就是 Chrome 扩展的安装包，相当于 Windows 里的 exe。下载完放桌面，等会儿要用鼠标拖它，放太深的文件夹不好找。</p>

<p><strong>第二步：把扩展 ID 登记进白名单（Windows）</strong></p>

<p>这步最劝退，但说白了就是去注册表"登记备案"。为什么必须做？因为正式版 Chrome 有个死规矩：不是从官方商店装的扩展，重启浏览器后会被自动禁用。把 ID 填进白名单，等于提前跟 Chrome 打好招呼："这个是我主动装的，别给我删了。"</p>

<p>具体操作：按 <code>Win + R</code> 组合键，输入 <code>regedit</code> 回车，打开注册表编辑器。在顶部地址栏里粘贴下面这串路径，回车直达：</p>

<p style="font-family:monospace;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px;word-break:break-all">HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome\ExtensionInstallAllowlist</p>

<p>如果提示路径不存在，多半是最后一级 <code>ExtensionInstallAllowlist</code> 文件夹还没有——在上一级 <code>Chrome</code> 上右键 → 新建 → 项，手动建一个，名字一字不差。进去之后在空白处右键 → 新建 → 字符串值，名字填 <code>1</code>；双击它，"数值数据"里粘贴那串扩展 ID，确定，关掉注册表，这步就成了。</p>

<p>两个细节别踩坑：一是认准 <code>Allowlist</code>（允许列表），不是 <code>Forcelist</code>（强制列表），后者是另一套机制，填了不生效；二是以后想装第二个这类扩展，就再建一个名为 <code>2</code> 的字符串值，以此类推。</p>

<p><strong>macOS 用户</strong>这边没有注册表，改用配置文件：编辑 <code>/Library/Managed Preferences/com.google.Chrome.plist</code>，在 <code>ExtensionInstallAllowlist</code> 数组里加上扩展 ID。没碰过 plist 的话，用 Xcode 打开改，或者用 plutil 命令行都行。</p>

<p><strong>第三步：给 Chrome 加启动参数（最关键的一步）</strong></p>

<p>白名单只是让 Chrome"不删它"，但 Chrome 心里还是不认它——所以还得加个启动参数，让 Chrome 每次启动时明确放行这个 ID。</p>

<p>操作：找到桌面上的 Chrome 快捷方式，右键 → 属性。在"目标"一栏你会看到一串以 chrome.exe 结尾的路径。把光标点到这串文字的<strong>最末尾</strong>，先敲一个空格，再粘贴下面这段：</p>

<p style="font-family:monospace;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:10px 14px;word-break:break-all">--allowlisted-extension-id=blockddmmcjpfkbhanlgegpmjpfpfjka</p>

<p>点确定保存。从现在起有个重要习惯：<strong>必须从这个改过的快捷方式启动 Chrome</strong>。从开始菜单、任务栏旧图标点开的都不带参数，等于白改。建议把这个快捷方式固定到任务栏，把旧的入口挪走，免得手滑点错。</p>

<p>改完第一次启动，Chrome 顶部会弹一条黄色提示："您正在使用不受支持的命令行参数"。别慌，这是正常现象，每次启动都会出现，不影响任何功能，无视即可。网上有教程教你再加个 <code>--test-type</code> 参数把提示藏起来——<strong>千万别加</strong>，它会连带改变 Chrome 的其他行为，为了眼不见心不烦引入新问题，不划算。</p>

<p>macOS 没有快捷方式这回事，测试时在终端跑 <code>open -a "Google Chrome" --args --allowlisted-extension-id=…</code>；要长期用，就写个带参数的启动脚本（.command 文件）放桌面，以后点脚本启动。</p>

<p><strong>第四步：拖进去安装</strong></p>

<p>打开 Chrome，地址栏输入 <code>chrome://extensions</code> 回车，进扩展管理页。先把右上角的"开发者模式"开关打开，然后把第一步下载的 CRX 文件直接拖进这个页面，弹出确认框点"添加扩展程序"。</p>

<p>如果拖进去没反应或者报错，九成是第二步、第三步出了岔子——回去检查注册表路径有没有敲对、启动参数有没有粘全。</p>

<p><strong>第五步：打开 Allow User Scripts 开关</strong></p>

<p>装完先别急着冲网页测。在扩展管理页点 uBlock0 卡片上的"详情"，往下翻找到"Allow User Scripts"（允许用户脚本），手动打开。</p>

<p>为什么必须开？原版 uBO 有个看家本领：往网页里注入自定义脚本，很多去广告规则和油猴类脚本全靠它干活。Chrome 的 MV3 把这扇门锁了，移植版用 <code>chrome.userScripts</code> API 重新把门开了，但按 Chrome 的规矩，这个 API 必须用户亲手授权。不开这个开关，扩展照样能装、能拦普通广告，但所有依赖脚本注入的高级功能全是哑的。</p>

<p><strong>第六步：等它热身完</strong></p>

<p>第一次启动时，工具栏上的 uBO 图标会带个感叹号「!」，意思是过滤引擎正在加载规则库，跟运动员赛前热身一个道理。等感叹号消失，就说明规则加载完毕，可以正常干活了。要是等了一两分钟它还在，去 <code>chrome://extensions</code> 把 uBlock0 的开关关掉再打开（相当于手动重启一次），基本都能解决。</p>

<p>到这里整个安装就结束了。回头看一眼：第二步管"不被删"，第三步管"被放行"，第四步管"装进去"，第五步管"高级功能解锁"，第六步管"确认热身完毕"——每一步各管一摊，缺哪个环节都会卡住。</p>

<h2>三、三个版本怎么选</h2>

<table style="width:100%;border-collapse:collapse;margin:20px 0">
<thead>
<tr style="background:#0f172a;color:#fff">
<th style="padding:10px 14px;text-align:left;border:1px solid #e2e8f0">版本</th>
<th style="padding:10px 14px;text-align:left;border:1px solid #e2e8f0">过滤引擎</th>
<th style="padding:10px 14px;text-align:left;border:1px solid #e2e8f0">安装难度</th>
<th style="padding:10px 14px;text-align:left;border:1px solid #e2e8f0">适合人群</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc">
<td style="padding:10px 14px;border:1px solid #e2e8f0">uBlock Origin（原版 MV2）</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">webRequestBlocking 实时过滤</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">已无法在 Chrome/Edge 安装</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">Firefox 用户</td>
</tr>
<tr>
<td style="padding:10px 14px;border:1px solid #e2e8f0">uBlock Origin Lite</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">declarativeNetRequest 规则托管</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">应用商店一键装</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">轻度用户，够用就行</td>
</tr>
<tr style="background:#f8fafc">
<td style="padding:10px 14px;border:1px solid #e2e8f0"><strong>uBlock-mv3（移植版）</strong></td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">webRequestBlocking 完整保留</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">白名单 + 启动参数 + 手动 CRX</td>
<td style="padding:10px 14px;border:1px solid #e2e8f0">重度用户、规则/脚本依赖者</td>
</tr>
</tbody>
</table>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:24px 0">
<div style="flex:1;min-width:260px;background:#eafaf0;border:1px solid #16a34a;border-radius:8px;padding:16px 20px">
<p style="margin:0 0 8px;color:#15803d;font-weight:700">值得装</p>
<p style="margin:0;color:#334155">自定义过滤规则多、依赖用户脚本、对 Lite 的规则阉割忍无可忍——这十分钟折腾能换回完整的 uBO 体验</p>
</div>
<div style="flex:1;min-width:260px;background:#fef2f2;border:1px solid #dc2626;border-radius:8px;padding:16px 20px">
<p style="margin:0 0 8px;color:#dc2626;font-weight:700">别折腾</p>
<p style="margin:0;color:#334155">只是想拦个广告、Lite 用着没感觉哪里不够——真没必要，官方 Lite 版对轻度场景完全够用</p>
</div>
</div>

<h2>结语</h2>

<p>uBlock-mv3 证明了一件事：只要 Chromium 还给企业策略留口子，社区就有办法把被"判死刑"的扩展救回来。它不是官方出品，更新依赖开发者跟进（当前跟进到 1.74.0），追求省心的用户还是 Lite 更合适。但对把 uBO 当生产力工具的人来说，这就是目前 Chrome 上唯一满血的选择。</p>

<p style="font-size:13px;color:#64748b">项目地址：GitHub r58Playz/uBlock-mv3（GPLv3，406+ star）· 官网 ublock.r58playz.dev</p>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">uBlock Origin MV3 版</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">GPL-3.0</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">uBlock Origin 的非官方 Manifest V3 完整移植版，广告拦截满血复活。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 479</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 20</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">GPL-3.0</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">广告拦截</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">MV3</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">浏览器扩展</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/r58Playz/uBlock-mv3" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/r58Playz/uBlock-mv3</a></p></div></div>
