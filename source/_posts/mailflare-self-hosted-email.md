---
title: "Mailflare 是什么？把私人网页邮箱搬进 Cloudflare（一篇看懂）"
date: '2026-09-02T07:16:03+08:00'
updated: '2026-09-02T07:16:03+08:00'
slug: mailflare-self-hosted-email
categories:
- "Cloudflare"
description: "Mailflare是基于Cloudflare生态构建的全功能Web邮箱应用，支持收信、发信、附件、搜索、规则、自动回复等完整邮件场景。项目采用Next.js+React 19，邮件数据存于用户自有的D1和R2，底层由Cloudflare Email Routing和Email Sending支撑。L"
cover: "/wp-content/uploads/2026/09/mf-hero-b8ed59-v10.png"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/09/mf-hero-b8ed59-v10.png?v=4" alt="Mailflare：把私人网页邮箱建在你自己的 Cloudflare 账户里" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p>Mailflare 是一个开源项目，能让你在自己的 Cloudflare 账户里搭一个完整的「网页邮箱」——就像 Gmail 那样，打开浏览器就能收信、发信、存邮件。不一样的地方是：你的邮件数据全部存在你自己的 Cloudflare 空间里，不在任何邮件厂商手上。项目作者是 hieunc229，目前在 GitHub 上有 2,374 个 star。它免费就能用，但想换掉界面上的 Mailflare 标志，得花 19 美元买个授权。</p>
<p>这篇文章用大白话讲清楚：它到底是个啥、能干什么、装在 Cloudflare 上麻不麻烦、免费够不够用、要花多少钱、新手容易踩哪些坑、以及到底适不适合你。</p>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:0 0 22px;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话定位：</strong>Mailflare 是一个跑在你<strong>自己 Cloudflare 账户</strong>里的网页邮箱。收信、发信、存邮件，全都走 Cloudflare 的免费服务，邮件数据完全归你。免费就能用，想去掉 Mailflare 的标志、换成自己的名字，买一份 19 美元的 Pro 授权就行。</p>
</div>

<h2>一、它到底是啥：自己搭个邮箱，不交给别人</h2>
<p>我们平时用的 Gmail、QQ 邮箱，邮件都存在厂商的服务器上。Mailflare 的思路是：不把邮件交给别人，而是借 Cloudflare（一家提供网站和云服务的大厂）的能力，自己搭一个邮箱系统。</p>
<p>好处很明显：邮件存在你自己的地盘，谁也扫不了你的内容；不用自己买服务器、装邮件软件、操心垃圾邮件信誉这些麻烦事——这些 Cloudflare 都帮你兜住了。你可以把它理解成「在 Cloudflare 上开了一个属于你自己的邮局」。</p>

<h2>二、能做什么：一个五脏俱全的邮箱后台</h2>
<p>Mailflare 不是只能收收发发的简陋页面，而是一整套邮箱管理后台。它大概有 50 多个界面，把邮箱相关的场景基本铺满了：</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/mf-ui-568bd4-v10.png?v=4" alt="Mailflare 后台主界面示意图" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：后台主界面示意——左边一列是所有功能入口（收件箱 / 已发送 / 草稿 / 垃圾箱 / 归档 / 星标 / 规则 / 文件夹 / 日历 / 通讯录等），中间是带彩色标签的邮件列表，右边是统计卡片。</p>

<p>常用的这些都有：</p>
<ul>
<li><strong>收信发信</strong>：和正常邮箱一样，支持附件、富文本、签名、自动回复。</li>
<li><strong>整理邮件</strong>：自定义文件夹、搜索、星标、稍后处理、归档、垃圾箱。</li>
<li><strong>规则</strong>：可以设「这封邮件存起来 / 转发走 / 直接拒收 / 归到某类」，类似 Gmail 的过滤器。</li>
<li><strong>多邮箱与共享</strong>：可以建多个邮箱，也能把某个邮箱的权限分给别人（团队共用一个地址）。</li>
<li><strong>其它</strong>：通讯录、日历、拦截发件人、导入导出、API 接口、操作日志、自动备份。</li>
</ul>
<p>附件上限：每封邮件最多 10 个附件，单个文件最大 10 MB，整封邮件最大 20 MB。</p>

<h2>三、背后用了 Cloudflare 哪些东西（不用懂技术也能看明白）</h2>
<p>Mailflare 的网页界面跑在 Cloudflare 的一个叫「Worker」的小程序上；你的邮件信息存在 Cloudflare 的数据库（D1）里，附件存在 Cloudflare 的网盘（R2）里；收信、发信则由 Cloudflare 自带的邮件服务处理。看图更直观：</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/mf-arch-a78622-v10.png?v=4" alt="Mailflare 架构图：网页跑在 Worker 上，数据存 D1 和 R2，收发走 Cloudflare 邮件服务" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：Mailflare 用到的 6 个 Cloudflare 服务——Worker（跑网页）、D1（存邮件信息）、R2（存附件）、Email Routing（收信）、Email Sending（发信），另外还有排队和实时推送两个辅助件。整套都在你的 Cloudflare 账户里，不连外网。</p>

<p>简单记就行：<strong>网页在 Worker 上跑，邮件内容在 D1 里，附件在 R2 里，收发信靠 Cloudflare 的邮件服务</strong>。数据全程不离开你的账户。</p>

<h2>四、免费够不够用</h2>
<p>把邮箱建在 Cloudflare 上，大家最关心：免费层够个人或小团队用吗？查了 Cloudflare 2026 年的官方额度，关键几项如下：</p>

<table style="width:100%;border-collapse:collapse;margin:0 0 18px;font-size:14px;">
<thead>
<tr style="background:#f1f5f9;">
<th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left;">项目</th>
<th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left;">Cloudflare 免费层</th>
<th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left;">够 Mailflare 用吗</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">收信</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">无上限、免费</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">完全够</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">网页运行时（Worker）</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">每天 10 万次请求</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">个人够用</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">邮件信息库（D1）</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">5 GB 免费</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">存几年都够</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">附件网盘（R2）</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">10 GB 免费</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">附件多会超，要付费扩容</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">发信</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">免费层发不出去</td><td style="padding:8px 12px;border:1px solid #e2e8f0;"><strong>必须开 Workers Paid（$5/月起步）才能发信</strong></td></tr>
</tbody>
</table>

<p>一句话总结：<strong>收信、存邮件、跑网页都免费；唯一要花钱的是「发信」</strong>——免费层能收不能发，想发信得给 Cloudflare 付每月 5 美元起。</p>

<h2>五、怎么装：三步搞定</h2>
<p>Mailflare 的安装被刻意做得很简单，照着做三步就行：</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/mf-deploy-37b267-v10.png?v=4" alt="Mailflare 部署三步流程示意图" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：部署三步。①点 GitHub 上的「Deploy to Cloudflare」按钮，授权后 Cloudflare 自动帮你建好一切；②打开网址，按提示建管理员账号；③在后台绑上你的域名，填好邮件记录，发封测试信就看到收件箱了。</p>

<ol>
<li><strong>点按钮</strong>：在 GitHub 仓库点「Deploy to Cloudflare」，登录授权，Cloudflare 自动帮你建好 Worker、数据库，并部署上线。</li>
<li><strong>建账号</strong>：打开部署好的网址，按页面提示创建你的管理员账号，Mailflare 会自动检查 Cloudflare 端的配置。</li>
<li><strong>绑域名</strong>：在后台「Domains」里填上你托管在 Cloudflare 的域名，它会自动配好收信所需的邮件记录；发一封测试信，收件箱里就能看到。</li>
</ol>

<h2>六、要配的一个「密码」</h2>
<p>Mailflare 运行时要一个叫 <code>CF_TOKEN</code> 的密码（在 Cloudflare 后台生成，给 Mailflare 收发邮件的权限），填到 Worker 的密钥里。几个要点：</p>
<ul>
<li>只填密码本身，<strong>不要带「Bearer」前缀</strong>，也不要填密码的 ID。</li>
<li>这个密码只给「收发邮件」的权限就行，别给太大。</li>
<li>Worker 的名字必须叫 <code>mailflare</code>，<strong>不要改名</strong>，改了就收不到信。</li>
</ul>
<p>如果你是用 GitHub 一键部署的，部署用的密码和上面这个运行时密码是两回事，别混了。</p>

<h2>七、要花多少钱</h2>
<p>Mailflare 软件本身免费就能部署、随便改、自己用。但想换掉界面上的 Mailflare 标志（改名字、图标、颜色），或者给团队开多账户共享邮箱，就得买授权。授权是<strong>买断制</strong>（含一年内出的新功能），在 Paymug 上买：</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/mf-plans-a41e4a-v10.png?v=4" alt="Mailflare 三档授权对比图" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：三档授权对比。Community 免费（带 Mailflare 标志、单人）；Pro 现价 19 美元（原价 39，限时折扣），去掉标志、一年内更新免费；Team 249 美元，多账户 + 团队共享邮箱。</p>

<table style="width:100%;border-collapse:collapse;margin:0 0 18px;font-size:14px;">
<thead>
<tr style="background:#f1f5f9;">
<th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left;">档位</th>
<th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left;">价格</th>
<th style="padding:8px 12px;border:1px solid #e2e8f0;text-align:left;">能干什么</th>
</tr>
</thead>
<tbody>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">Community</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">免费</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">核心功能全有，带 Mailflare 标志，单人</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">Pro</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">19 美元（限时原价 39）</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">永久授权，去标志、改品牌，1 年更新免费</td></tr>
<tr><td style="padding:8px 12px;border:1px solid #e2e8f0;">Team</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">249 美元</td><td style="padding:8px 12px;border:1px solid #e2e8f0;">多账户 + 团队共享邮箱 + Pro 全部</td></tr>
</tbody>
</table>

<p>补充两点：激活授权时只保存一个密码的「指纹」，不存明文，安全性 OK，但丢了只能找 Paymug 重发；授权<strong>买的是功能，不是按人头收费</strong>——Team 买一次就能加任意多个账户。</p>

<h2>八、新手常踩的 5 个坑</h2>
<ol>
<li><strong>密码填错</strong>：CF_TOKEN 带了「Bearer」前缀，结果收不到信。只填密码本身即可。</li>
<li><strong>权限没给全</strong>：建密码时漏了收信/发信的权限，Mailflare 配不了路由。重做一个权限全的密码。</li>
<li><strong>没先迁移数据库就激活授权</strong>：会报错说「先跑完数据库迁移再激活」。按提示先跑迁移。</li>
<li><strong>没完整部署</strong>：只在本地跑、没完整上线，备份功能就没有。必须走完整部署。</li>
<li><strong>Worker 名字改了</strong>：收信全断。名字必须保持 <code>mailflare</code>。</li>
</ol>
<p>还有两个容易忽略的：免费层<strong>发不了信</strong>，要开 Workers Paid（每月 5 美元起）；部署用的密码和运行时密码是两套，别弄混，否则有安全风险。</p>

<h2>九、适合谁 / 不适合谁</h2>
<p><strong>适合的人：</strong></p>
<ul>
<li>域名已经在 Cloudflare 上，不想再为收信单独接别的转发服务的人。</li>
<li>信得过 Cloudflare、愿意每月花几美元，想把邮件数据主权拿回来的人。</li>
<li>想给客户或项目单独挂个域名邮箱，又不想被 Gmail Workspace / Fastmail 年费锁住的人——域名在你手里，随时能迁走。</li>
<li>对隐私敏感、不放心邮件厂商扫描内容的人。</li>
<li>愿意花 19 美元把界面换成自己标志的人。</li>
</ul>
<p><strong>不适合的人：</strong></p>
<ul>
<li>只想「开箱即用」的普通用户——它还是要你点按钮、配密码、绑域名，直接注册个 Gmail 更快。</li>
<li>每天发几万封邮件的企业——Cloudflare 发信还是测试阶段，配额「保守起步、按信誉慢慢放开」，没有专业邮件服务那种固定大额度。</li>
<li>想拿它做邮箱 SaaS 卖给别人——它的协议明文禁止拿去公开提供托管服务。</li>
<li>域名不在 Cloudflare 的人——收信发信都要求域名托管在 Cloudflare，否则用不了。</li>
</ul>

<h2>结语</h2>
<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:0 0 22px;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>Mailflare 是目前 Cloudflare 上最完整的「自己搭网页邮箱」方案——免费能用、数据归你、界面也像样。但要记住三点：它不是完全开源（源码能看，但不能拿去做 SaaS）；发信得每月 5 美元起开 Workers Paid；想换掉标志得 19 美元买 Pro。适合「域名在 Cloudflare、想把邮件主权拿回来、能接受每月几美元」的人；不适合「只想找个 Gmail 平替」或「想做邮件生意」的人。</p>
</div>

<h2>项目地址</h2>
<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:16px 20px;border-radius:6px;">
<p style="margin:0 0 8px;font-size:15px;line-height:1.8;"><strong><a href="https://github.com/hieunc229/mailflare" target="_blank" rel="nofollow noopener" title="https://github.com/hieunc229/mailflare">Mailflare — GitHub</a></strong> · <strong><a href="https://deploy.workers.cloudflare.com/?url=https://github.com/hieunc229/mailflare" target="_blank" rel="nofollow noopener" title="https://deploy.workers.cloudflare.com/?url=https://github.com/hieunc229/mailflare">Deploy to Cloudflare</a></strong> · <strong><a href="https://app.paymug.co/buy/mailflare-pro" target="_blank" rel="nofollow noopener" title="https://app.paymug.co/buy/mailflare-pro">Pro 授权购买</a></strong></p>
<p style="margin:0;font-size:14px;line-height:1.8;color:#475569;">Mailflare（v0.2.0）是一个 Source-Available（源码可见）的开源项目，把网页邮箱完整跑在你自己的 Cloudflare 账户里——收信、发信、存邮件全走 Cloudflare。免费能用，Pro 19 美元 / Team 249 美元解锁去标志等能力；发信需开 Workers Paid（每月 5 美元起）。</p>
</div>

文章来源：<a href="https://github.com/hieunc229/mailflare" target="_blank" rel="nofollow" title="https://github.com/hieunc229/mailflare">github.com/hieunc229/mailflare</a>；Cloudflare 各项服务的免费额度来自 <a href="https://developers.cloudflare.com/workers/platform/pricing" target="_blank" rel="nofollow" title="https://developers.cloudflare.com/workers/platform/pricing">Cloudflare Developer Docs</a> 与 <a href="https://docs.cloudflare.com/email-routing/limits/" target="_blank" rel="nofollow" title="https://docs.cloudflare.com/email-routing/limits/">Email Routing Limits</a>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">Mailflare</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">AGPL-3.0</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">在 Cloudflare 上零成本搭建私人网页邮箱，完全自托管。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 2867</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 332</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">AGPL-3.0</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">邮箱</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">Cloudflare</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">自托管</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/hieunc229/mailflare" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/hieunc229/mailflare</a></p></div></div>
