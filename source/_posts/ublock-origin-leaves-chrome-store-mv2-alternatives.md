---
title: "uBlock Origin 退出 Chrome 应用商店：MV2 时代落幕，广告拦截还有哪些选择"
date: '2026-08-31T02:47:15+08:00'
updated: '2026-08-31T02:47:44+08:00'
slug: ublock-origin-leaves-chrome-store-mv2-alternatives
categories:
- "软件与开发"
description: "uBlock Origin 发布最后一款 Chrome 稳定版，随着 8 月 31 日 Chrome 移除 MV2 扩展，官方商店版本将无法更新。但项目并未停止，作者 gorhill 强调其“用户自主决定内容”的理念不变。Chrome 用户可改用 uBlock Origin Lite，或通过 Git"
cover: "/wp-content/uploads/2026/08/ubo-cover-c76da5e6.png"

---

<p class="wx-cover" style="text-align:center;margin:0 auto 18px"><img src="/wp-content/uploads/2026/08/ubo-cover-c76da5e6.png" alt="uBlock Origin" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

<p style="font-size:16px;line-height:1.75;color:#0f172a;margin:16px 0">8 月 25 日，uBlock Origin 放出了 1.74.0 正式版。团队在更新说明里写得很直白：这将是最后一个提交到 Chrome 网上应用店的稳定版本。再过几天——8 月 31 日，谷歌会把商店里剩下的 MV2 扩展一并清掉。</p>

<p style="font-size:16px;line-height:1.75;color:#0f172a;margin:16px 0">消息传开，不少人已经在心里给它点了蜡烛。但如果你真这么想，那就误会大了。</p>

<div style="border-left:4px solid #c0392b;background:#fdf2f2;padding:16px 18px;border-radius:8px;margin:18px 0;color:#0f172a"><strong>先把结论摆前面</strong>：uBlock Origin 没有停摆，项目维护一直在线；8 月 31 日真正画上句号的，只是它在 Chrome 商店里的上架身份——之后无法再从商店安装，也拿不到更新，仅此而已。</div>

<h2 style="font-size:22px;color:#0f172a;margin:28px 0 14px">一、两个关键日期，别搞混了</h2>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">很多人把「商店下架」和「插件失效」画了等号，其实这是两码事。早在 2025 年 7 月，Chrome 138 就已经彻底关掉了 MV2 扩展的运行开关。这个月底那一步，更像是商场把早就停业的柜台拆走——以后不能再更新，也不能从商店重装。</p>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">换句话说，<strong>8 月 31 日不是 Chrome 用户突然用不了它的日子</strong>，而是商店里再也找不到它的日子。</p>

<h2 style="font-size:22px;color:#0f172a;margin:28px 0 14px">二、1.74.0 都改了什么</h2>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">作为「最后一个商店版」，1.74.0 并不是应付了事的版本。它修了 scriptlet 注入、过滤列表和剪贴板防护，还新增了 Brave 浏览器环境检测。项目本身活得挺好。</p>

<h2 style="font-size:22px;color:#0f172a;margin:28px 0 14px">三、12 年简史：Origin 这两个字不是白叫的</h2>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">uBlock Origin 的故事得从 2013 年说起。那会儿 Raymond Hill（也就是现在 GitHub 上的 gorhill）做的是 <strong>HTTP Switchboard</strong>——一个浏览器请求防火墙。网页想拉脚本、图片、Cookie、第三方请求，统统得过它这一关。</p>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">2014 年，他把这套东西简化成 μBlock。后来因为希腊字母实在不照顾普通人的输入法，又改成了 uBlock。</p>

<div style="border:1px solid #e2e8f0;border-radius:8px;padding:16px 18px;background:#f8fafc;margin:18px 0">
<p style="margin:0 0 8px;color:#0f172a"><strong>它最早出圈靠的是「省」</strong></p>
<p style="margin:0;color:#334155;line-height:1.7">Hill 当年做过一组对比测试：同样是请求 100 个网址的页面，Adblock Plus 平均要过 10700 条规则，HTTP Switchboard 只过 800 条。活儿一样，开销差了一个数量级。</p>
</div>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">真正让它长出性格，是 2015 年。那一年 Hill 因为私人原因，一度把维护权交了出去，之后自己又 Fork 出一条分支，名字后面多了 Origin。</p>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">分歧就出在这儿：另一支 uBlock 开始公开募捐，后来被商业公司收编，还加入了 <strong>Acceptable Ads</strong>——只要广告符合它那套标准、进入它那套商业体系，就可以放行。</p>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:18px 0">
<div style="flex:1;min-width:260px;border:1px solid #16a34a;border-radius:8px;padding:16px;background:#eafaf0">
<h3 style="margin:0 0 10px;color:#15803d;font-size:17px">gorhill 这一支</h3>
<ul style="margin:0;padding-left:20px;color:#14532d;line-height:1.7">
<li>不接受任何捐赠</li>
<li>拒绝与广告商做任何交易</li>
<li>项目宣言核心：什么内容能进你的浏览器，由你说了算</li>
</ul>
</div>
<div style="flex:1;min-width:260px;border:1px solid #dc2626;border-radius:8px;padding:16px;background:#fef2f2">
<h3 style="margin:0 0 10px;color:#b91c1c;font-size:17px">另一支 uBlock</h3>
<ul style="margin:0;padding-left:20px;color:#7f1d1d;line-height:1.7">
<li>公开募捐、后被商业公司收购</li>
<li>加入 Acceptable Ads 白名单机制</li>
<li>符合其规范的广告会被默认放行</li>
</ul>
</div>
</div>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">所以 Origin 从来不是装饰。它像是一个写进名字里的存档点，提醒所有人：这一支还守着最初那套规矩。</p>

<div style="border-left:4px solid #c0392b;background:#fdf2f2;padding:14px 16px;border-radius:8px;margin:18px 0;color:#7f1d1d">
一个免费开源扩展能坚持 12 年，不卖会员、不塞购物返利，连捐赠按钮都不放——放在今天，多少显得有点不合群。
</div>

<h2 style="font-size:22px;color:#0f172a;margin:28px 0 14px">四、MV2 与 MV3：原版为什么难搬过去</h2>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">谷歌这步棋，倒不是专门冲着 uBlock Origin 来的——真想干掉这类插件，直接不许上架就行，何必绕这么大圈。</p>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">问题在于 MV2 的权限模型：它允许扩展实时查看并拦截网络请求。能力是真强，可落到恶意扩展手里同样好使。谷歌想压掉远程代码、安全风险和常驻后台的开销，这些理由不算凭空捏造。</p>

<table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;font-size:15px;line-height:1.6">
<thead>
<tr style="background:#0f172a;color:#f8fafc">
<th style="padding:12px 14px;text-align:left;border:1px solid #334155">对比项</th>
<th style="padding:12px 14px;text-align:left;border:1px solid #334155">MV2（旧）</th>
<th style="padding:12px 14px;text-align:left;border:1px solid #334155">MV3（新）</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc"><td style="padding:11px 14px;border:1px solid #e2e8f0">工作方式</td><td style="padding:11px 14px;border:1px solid #e2e8f0">实时查看并拦截网络请求</td><td style="padding:11px 14px;border:1px solid #e2e8f0">提前提交规则，浏览器照单执行</td></tr>
<tr><td style="padding:11px 14px;border:1px solid #e2e8f0">普通广告拦截</td><td style="padding:11px 14px;border:1px solid #e2e8f0">支持</td><td style="padding:11px 14px;border:1px solid #e2e8f0">支持</td></tr>
<tr style="background:#f8fafc"><td style="padding:11px 14px;border:1px solid #e2e8f0">按站点动态过滤</td><td style="padding:11px 14px;border:1px solid #e2e8f0">可临场修改请求</td><td style="padding:11px 14px;border:1px solid #e2e8f0;color:#dc2626">很难原样搬过去</td></tr>
<tr><td style="padding:11px 14px;border:1px solid #e2e8f0">脚本精细注入</td><td style="padding:11px 14px;border:1px solid #e2e8f0">自由度高</td><td style="padding:11px 14px;border:1px solid #e2e8f0;color:#dc2626">受限</td></tr>
<tr style="background:#f8fafc"><td style="padding:11px 14px;border:1px solid #e2e8f0">资源占用</td><td style="padding:11px 14px;border:1px solid #e2e8f0">常驻后台，开销较高</td><td style="padding:11px 14px;border:1px solid #e2e8f0">更省资源</td></tr>
</tbody>
</table>

<p style="font-size:15px;line-height:1.8;color:#334155;margin:14px 0">这也解释了为什么 Hill 做了 <strong>uBlock Origin Lite</strong>，却始终不肯把它叫成原版替身。Lite 其实不差——它更省资源，2026 年还补回了远程列表和有限的自定义过滤。但如果你爱折腾动态规则，Lite 的操作空间确实小了一截。</p>

<h2 style="font-size:22px;color:#0f172a;margin:28px 0 14px">五、接下来怎么办：三条现实出路</h2>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:18px 0">
<div style="flex:1;min-width:260px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#ffffff">
<h3 style="margin:0 0 10px;color:#2563eb;font-size:17px">方案一：留在 Chrome，换 Lite</h3>
<p style="margin:0;color:#334155;line-height:1.7">改用 uBlock Origin Lite。对大多数人来说，日常广告依然拦得干干净净，代价是失去动态规则和精细脚本注入。</p>
</div>
<div style="flex:1;min-width:260px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#ffffff">
<h3 style="margin:0 0 10px;color:#ff7139;font-size:17px">方案二：换个浏览器</h3>
<p style="margin:0;color:#334155;line-height:1.7">Firefox 和此前介绍过的 Helium 仍然支持完整原版。Hill 本人也一直强调，uBO 在 Firefox 上的效果最好。</p>
</div>
<div style="flex:1;min-width:260px;border:1px solid #e2e8f0;border-radius:8px;padding:16px;background:#ffffff">
<h3 style="margin:0 0 10px;color:#0f172a;font-size:17px">方案三：绕开商店手动装</h3>
<p style="margin:0;color:#334155;line-height:1.7">真想继续用原版，也可以从 GitHub 下载插件安装包本地加载。项目的开发和维护都还在活跃状态。</p>
</div>
</div>

<h2 style="font-size:22px;color:#0f172a;margin:28px 0 14px">六、写在最后</h2>

<div style="background:#0f172a;color:#f8fafc;padding:18px 20px;border-radius:8px;line-height:1.7">
8 月 31 日一过，Chrome 商店里会少一个熟悉的红色图标。但 uBlock Origin 名字里的那个 Origin，还在提醒一件很小、又很重要的事——你的浏览器里，什么可以进来，最好还是由你自己决定。
</div>

<p style="margin-top:24px">文章来源：<a href="https://mp.weixin.qq.com/s/KGuoN4a_2nFlNvoGXfaCxw" target="_blank" rel="nofollow" title="https://mp.weixin.qq.com/s/KGuoN4a_2nFlNvoGXfaCxw">mp.weixin.qq.com</a></p>
