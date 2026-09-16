---
title: "告别 YouTube Premium：开源替代品 Invidious 免费补齐核心体验"
date: '2026-08-31T14:15:30+08:00'
updated: '2026-08-31T14:15:30+08:00'
slug: invidious-open-source-youtube-premium-alternative
categories:
- "免费软件"
- "软件与开发"
description: "Invidious是一款开源免费的YouTube替代前端，可实现去广告、后台音频播放、免登录观看及隐私保护。但在2026年，因Google封锁导致公共实例大量失效，稳定性无保障，离线缓存和直播体验受限。建议使用者自行部署以获得可靠服务。"
---

<p>YouTube Premium 的账单每个月都准时到账，但你真正用上的可能只有两件事：<strong>没有广告</strong>和<strong>手机锁屏还能接着听</strong>。剩下的推荐算法、自动连播、观看记录被完整留存，反而未必是你想要的。</p>
<p>Invidious 就是冲着这两点来的：一个 <strong>100% 开源、0 成本</strong>的 YouTube 替代前端，由社区维护，不加载广告、不要求登录、不持续上报你的观看行为。它能不能真的替掉 Premium？哪些地方替不掉？2026 年它还活着吗？这篇文章把能查到的都摊开讲。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:0 0 22px;border-radius:6px;">
<p style="margin:0;color:#1d4ed8;font-size:15px;line-height:1.8;"><strong>一句话定位：</strong>Invidious 不是"破解版 YouTube"，而是一个<strong>开源的视频代理前端</strong>——它替你去 YouTube 取数据，再用一个更轻、更干净的界面呈现给你。你省下的是订阅费和被追踪的代价，换来的是"没有官方兜底"的不确定性。</p>
</div>

<h2>一、Invidious 是什么</h2>
<p>Invidious 是一个用 Crystal 编写、搭配 PostgreSQL 的 <strong>YouTube 替代前端（alternative front-end）</strong>，主打更快、更轻、更注重隐私。它以 <strong>AGPL-3.0</strong> 协议开源，源码托管在 GitHub 的 <code>iv-org/invidious</code> 仓库，任何人都可以查看、审计、自行部署。</p>
<p>截至 2026 年 8 月底，该仓库的 GitHub star 数约 <strong>23,000</strong>，是一个持续活跃了多年的老牌项目——这一点很关键：同类隐私前端（Nitter、Redlib 等）这几年被平台逐个收拾，Invidious 属于少数还在持续更新的。</p>
<p>它的工作方式是 <strong>服务端代理</strong>：由 Invidious 服务器向 YouTube 请求视频信息，再渲染成一个不含广告、不含跟踪脚本的页面给你。你不登录 Google 账号，也能搜索、观看、订阅。</p>

<h2>二、对照 Premium：哪些能免费补齐，哪些补不了</h2>
<p>先说结论：<strong>去广告、后台播放、免登录、免账号订阅这四件事，Invidious 确实能免费做到</strong>；而"官方承诺的稳定性"和"移动端离线体系"，它给不了。下面是逐项对照。</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">你的需求</th>
<th style="background:#475569;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">YouTube Premium</th>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">Invidious</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">观看无广告</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">会员权益</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>支持</strong>，前端不加载广告</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">手机后台音频播放</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">会员专属功能</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>支持</strong>，移动浏览器锁屏可继续播放</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">免登录观看</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">可看，但被记录</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>支持</strong>，无需 Google 账号</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">订阅频道 + 新视频通知</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">需登录账号</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>支持</strong>，免账号订阅</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">导入原有订阅</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">—</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>支持</strong>一键导入，迁移成本极低</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">减少被持续追踪</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">观看记录进入账号画像</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>支持</strong>，不上报观看行为、无跟踪像素</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">离线缓存</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">成熟的移动端离线体系</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><span style="color:#dc2626;">部分</span>：网页端通常提供下载入口，无移动端离线队列</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">稳定性与服务保障</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">官方服务，有明确权益</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><span style="color:#dc2626;">无保障</span>，受 YouTube 反制措施直接影响</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">成本</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">按月订阅付费</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>0 元</strong>（自托管需自备服务器）</td>
</tr>
</tbody>
</table>

<h2>三、能替代 Premium 的几项核心能力</h2>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">无广告</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">观看过程中不加载广告，视频页、搜索页都干净。这是大多数人续费 Premium 的第一理由，也是 Invidious 最稳的一项。</p>
</div>
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">手机后台音频播放</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">在手机浏览器里打开，锁屏或切到别的应用后音频继续走。听播客、访谈、长视频音乐，体验接近会员的后台播放。</p>
</div>
</div>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">免登录直接看</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">不需要 Google 账号就能搜索和播放，也不用在设备上登录任何账号，临时借别人设备看东西时尤其省事。</p>
</div>
<div style="flex:1;min-width:260px;background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">免账号订阅 + 新视频通知</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">不注册 Google 账号也能订阅频道、收到更新提醒，订阅列表保存在你用的实例或自建实例上。</p>
</div>
</div>

<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:14px 18px;border-radius:6px;margin:18px 0;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#334155;"><strong>一键导入全部订阅：</strong>支持把你原有的订阅列表整体导入，不用一个个重新关注，迁移成本几乎为零。这一点对"想跑但舍不得订阅列表"的人很关键。</p>
</div>

<h2>四、更轻、更隐私：省掉的不只是广告</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:220px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">无 Google 持续追踪</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">观看行为不会被持续上报给 Google，也就不会被喂进广告画像。</p>
</div>
<div style="flex:1;min-width:220px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">无跟踪像素</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">页面不加载第三方跟踪像素与分析脚本，减少被跨平台画像的可能。</p>
</div>
<div style="flex:1;min-width:220px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">轻量、加载更快</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">页面结构比官方站点简单得多，没有层层嵌套的推荐模块，弱网和老设备上差别明显。</p>
</div>
<div style="flex:1;min-width:220px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">不自动播放、不诱导沉迷</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#475569;">没有自动连播，也没有"再看一个"的推荐流，看完即停，节奏由你自己掌握。</p>
</div>
</div>

<h2>五、浏览器扩展：让切换变成无感的</h2>
<p>装一个重定向类扩展（社区里常见的是 Privacy Redirect、LibreRedirect 一类），可以把你点开的 YouTube 链接自动跳转到你指定的 Invidious 实例，日常使用几乎不需要改变习惯。想看原站时再手动关掉即可。</p>

<h2>六、自托管：想要稳定，最好自己跑一个</h2>
<p>公共实例时好时坏是 Invidious 目前最大的现实问题，所以官方文档给出的建议非常直白：<strong>能自托管就自托管</strong>。下面是官方安装文档里写明的门槛。</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">项目</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">官方要求</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">磁盘</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">至少 20GB；若打算开成公共实例，建议 60GB 以上</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">内存</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">运行需至少 2GB 可用内存（并需按官方建议定期重启）；<strong>编译</strong>阶段需 2.5GB 以上，建议整机 4GB，不足可加 SWAP</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">公共实例建议配置</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">60GB 磁盘、4GB 内存、2 vCPU、200Mbps 带宽、20TB 月流量（最好不限流量）</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">依赖</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">PostgreSQL + Crystal 运行环境；新版还需部署 <strong>Invidious companion</strong>（取代早期的 inv-sig-helper 等组件）</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">密钥</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">需要生成两个随机密钥：Invidious 的 HMAC_KEY 与 companion 的通信密钥</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">镜像来源</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">Docker 镜像只发布在 <strong>Quay</strong>（quay.io/invidious/invidious），项目方明确不用 Docker Hub</td>
</tr>
</tbody>
</table>

<p>最小化的 docker-compose 结构大致是这样（按官方文档示例精简，实际部署请照抄仓库里的完整配置）：</p>

```yaml
services:
  invidious:
    image: quay.io/invidious/invidious:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    environment:
      INVIDIOUS_CONFIG: |
        db:
          dbname: invidious
          user: kemal
          password: kemal
          host: invidious-db
        hmac_key: "<用 pwgen 16 1 生成的随机串>"
    depends_on:
      - invidious-db
  invidious-db:
    image: docker.io/library/postgres:14
    restart: unless-stopped
    volumes:
      - invidious-db:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: invidious
      POSTGRES_USER: kemal
      POSTGRES_PASSWORD: kemal
```

<div style="background:#f1f5f9;border-left:4px solid #475569;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:14px;line-height:1.8;color:#475569;"><strong>两个部署提醒：</strong>第一，官方文档明确<strong>不建议</strong>把 Invidious 架在 PaaS / SaaS 平台（如 Heroku、YunoHost 等）上——它本质是代理、带宽占用高，很容易被服务商判定为滥用而封号。第二，配置里的 <code>local</code> 选项决定视频流走不走你的服务器：设为 <code>true</code> 时流量经你的实例中转，隐私更好但吃带宽；设为 <code>false</code> 时浏览器直连取流，省带宽但隐私打折。家用宽带自托管建议先算清楚上行带宽。</p>
</div>

<h2>七、2026 年的现实：公共实例为什么只剩几个</h2>
<p>这一点必须诚实讲。Google 自 <strong>2024 年起开始在 IP 层面封锁 Invidious 的请求</strong>，公共实例普遍遭遇验证码、限速乃至直接拉黑。项目方也公开承认：数据中心机房的 IP 已经很难跑通，<strong>住宅 IP（比如家里自托管）仍然可用</strong>。</p>
<p>官方实例列表（instances.invidious.io）因此明写着：由于近期的 YouTube 封锁，公共实例数量很少，如果可以，请自己在家部署而不要用公共实例。截至 2026 年 8 月 31 日，官方 API 里在册的入口是这样的：</p>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">公共实例</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">地区</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">在跑版本</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">活跃情况</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">inv.nadeko.net</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">智利</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2026.08.29</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">累计注册约 4.17 万，近 30 天活跃约 3,900</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">invidious.nerdvpn.de</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">乌克兰</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2026.08.15</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">累计约 5,669，近 30 天活跃约 550</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">yt.chocolatemoo53.com</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">美国</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2026.08.29</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">累计约 2,307，近 30 天活跃约 436</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">invidious.tiekoetter.com</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">德国</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2026.08.29</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">未公开统计，已关闭注册</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">invidious.f5.si</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">日本</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">未上报</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">未上报</td>
</tr>
</tbody>
</table>

<p>除了以上 5 个常规 HTTPS 入口，列表里还有 Yggdrasil、I2P、Tor 等匿名网络入口共 6 个，主要服务于需要隐藏访问来源的场景。</p>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#7f1d1d;"><strong>别把公共实例当长期依靠。</strong>总量只剩下个位数、随时可能因新一轮封锁而失效，还要承担"把观看行为交给陌生实例运营者"的信任成本。想长期用，自托管才是正解。</p>
</div>

<h2>八、它做不到的事，也一并说清楚</h2>
<ul>
<li><strong>稳定性没有保障：</strong> YouTube 的反制措施直接影响可用性，可能今天能看、明天就跳验证码，项目方也不保证修复周期。</li>
<li><strong>年龄限制内容经常打不开：</strong> 这类视频需要登录态，一直是替代前端的老大难问题。</li>
<li><strong>评论区偶尔失效：</strong> YouTube 调整内部接口格式时，评论加载可能短暂中断。</li>
<li><strong>直播体验不稳定：</strong> 公共实例上的直播流时断时续，不适合当主力看直播。</li>
<li><strong>没有官方移动端 App：</strong> 手机上使用靠移动浏览器或第三方客户端，"后台播放"依赖浏览器行为，不同系统表现会有差异。</li>
<li><strong>你得信任实例运营者：</strong> 用别人的实例，就等于把请求交给对方中转；只选官方列表内的实例，列表外的都被官方视为不可信。</li>
<li><strong>合规与服务条款风险自担：</strong> 替代前端处于平台服务条款的灰色地带，是否使用、如何使用需自行判断并遵守所在地法律法规。</li>
</ul>

<h2>九、怎么选：按你的实际场景对号入座</h2>

<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:250px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #16a34a;padding:16px 18px;border-radius:6px;">
<p style="margin:0 0 8px;font-weight:bold;color:#15803d;">想要稳、想长期用</p>
<p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#475569;">自己在家或 VPS 上部署一个实例，配合浏览器扩展自动跳转。隐私最好，可控性最高，成本就是一台机器和一点带宽。</p>
<p style="margin:0;font-size:13px;color:#15803d;"><strong>适合：</strong>有闲置主机 / 软路由 / NAS，愿意折腾一次的人</p>
</div>
<div style="flex:1;min-width:250px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #2563eb;padding:16px 18px;border-radius:6px;">
<p style="margin:0 0 8px;font-weight:bold;color:#1d4ed8;">只是偶尔想安静看个视频</p>
<p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#475569;">挑官方列表里的公共实例先用着，同时把订阅导出备份好。哪天实例挂了，换一个或者改用自己的实例即可。</p>
<p style="margin:0;font-size:13px;color:#1d4ed8;"><strong>适合：</strong>不想投入硬件，能接受偶尔不可用的人</p>
</div>
<div style="flex:1;min-width:250px;background:#ffffff;border:1px solid #e2e8f0;border-top:3px solid #475569;padding:16px 18px;border-radius:6px;">
<p style="margin:0 0 8px;font-weight:bold;color:#334155;">只是想免广告、不想碰服务器</p>
<p style="margin:0 0 10px;font-size:14px;line-height:1.7;color:#475569;">可以看看同为开源生态的本地客户端（如桌面端的 FreeTube、安卓的 NewPipe / LibreTube、iOS 的 Yattee 等），它们在你自己的设备上解析播放，不涉及中转服务器。</p>
<p style="margin:0;font-size:13px;color:#475569;"><strong>适合：</strong>只关心免广告和订阅管理的普通用户</p>
</div>
</div>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:26px 0;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>如果你的 Premium 只用在"去广告 + 后台听声音"上，Invidious 能免费替掉它，而且额外送你一份不被追踪的清净；但它换来的代价是<strong>没有官方兜底的稳定性</strong>——真想长期用，就花一台机器的成本自己部署一个，别指望公共实例能一直活着。</p>
</div>

<h2>十、开源与成本</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:240px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 18px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">100% 开源</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">AGPL-3.0 协议，代码公开、可自由审计，也欢迎社区参与共建。用了什么、收集了什么，都能在源码里查到。</p>
</div>
<div style="flex:1;min-width:240px;background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">0 成本</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">软件本身完全免费，用公共实例不花一分钱；自托管只产生服务器或电费成本，不再有按月订阅的账单。</p>
</div>
</div>

<h2>项目地址</h2>
<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:16px 20px;border-radius:6px;">
<p style="margin:0 0 8px;font-size:15px;line-height:1.8;"><strong><a href="https://github.com/iv-org/invidious" target="_blank" rel="nofollow noopener" title="https://github.com/iv-org/invidious">Invidious — GitHub</a></strong></p>
<p style="margin:0;font-size:14px;line-height:1.8;color:#475569;">Invidious 是一个开源的 YouTube 替代前端，主打更轻量、更快速、更注重隐私的观看体验，支持自托管与浏览器扩展生态，欢迎社区参与共建。官方文档与安装指南见 docs.invidious.io，公共实例列表见 instances.invidious.io。</p>
</div>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">Invidious</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">AGPL-3.0</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">100% 开源的 YouTube 替代前端，无广告、不跟踪、支持自托管。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 24319</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 2728</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">AGPL-3.0</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">YouTube 替代</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">无广告</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">自托管</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/iv-org/invidious" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/iv-org/invidious</a></p></div></div>
