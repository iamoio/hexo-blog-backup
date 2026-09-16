---
title: "UptimeFlare：基于 Cloudflare Worker 的免费无服务器站点监控与状态页"
date: '2026-09-16T20:00:00+08:00'
updated: '2026-09-16T20:00:00+08:00'
slug: uptimeflare-cloudflare-monitor
categories:
- "建站与运维"
description: "UptimeFlare 是 lyc8503 开源的免费无服务器站点监控与状态页，跑在 Cloudflare Worker 上，支持城市级地理检查、自定义状态码/关键词校验、100+ 通知渠道，10 分钟上线且完全免费。"
cover: "/img/default.avif"
---

UptimeFlare 是一个基于 Cloudflare Worker 的开源免费无服务器站点监控与状态页方案，由开发者 lyc8503 维护，目前 GitHub 收获 3800+ Star。它把监控探针直接跑在 Cloudflare 全球边缘网络上，不必再养一台 7×24 的监控服务器，10 分钟内就能搭起一个支持城市级地理检查、自定义状态码/关键词校验、100+ 通知渠道的监控面板，而且完全免费。

## 一、它到底是什么

传统监控（如 UptimeRobot、自建 Prometheus）要么有免费额度限制，要么需要一台常驻服务器。UptimeFlare 的思路是：把所有检查逻辑塞进 Cloudflare Worker，数据存储从早期的 KV 迁移到了现在的 D1 数据库（2026-01-03 完成），整套服务托管在 Cloudflare 上，你只需要一个 Cloudflare 账号（免费套餐即可）。

它同时提供两样东西：

- **监控引擎**：按你设定的频率去探测网站 / 端口，记录可用率与响应时间；
- **状态页**：一个自带响应式 UI 的公开（或加密码保护的私有）状态面板，访客能直观看到各服务的实时健康状况和历史曲线。

## 二、核心能力

**监控能力**

- 最多 50 个监控项，最小 1 分钟检查间隔
- 全球 310+ 个城市发起地理特定检查（例如只看“上海用户能不能访问”）
- 支持 HTTP / HTTPS / TCP 端口监控
- 最长 90 天可用率历史与可用率百分比
- HTTP(S) 可自定义请求方法、请求头、请求体
- 支持自定义状态码与关键词校验（例如响应里必须包含 “OK”）
- 宕机通知接入 100+ 渠道（基于 apprise，含 Telegram、Bark、邮件等）
- 支持自定义 Webhook
- 界面中英双语

**状态页能力**

- 所有监控类型的交互式响应时间（ping）图表
- 计划维护提醒 + 故障历史页面
- 响应式 UI，自动跟随系统明暗主题
- 状态页可高度自定义
- 支持用自有域名 CNAME 接入
- 可选密码保护，做成私有状态页
- 提供 JSON API 拉取实时状态数据

## 三、工作原理（为什么能免费又无服务器）

UptimeFlare 的检查由部署在 Cloudflare 边缘的 Worker 定时触发，从不同城市的数据中心向你的目标发起请求；结果写入 D1（Cloudflare 的 serverless SQLite）。因为 Cloudflare 免费套餐本身就包含一定量的 Worker 请求与 D1 存储，对于个人站长和小型项目来说，日常监控基本落在免费额度内。

2026-01-03 作者把底层从 KV 迁到 D1，并升级 Terraform Cloudflare provider 到 v5，优化了长期存在的性能问题，老用户有自动迁移流程。新用户直接部署即可，无需关心底层存储细节。

## 四、手把手部署：零基础也能 10 分钟上线

官方确实宣称"10 分钟、无需本地工具"，但它默认走的是 **GitHub Actions 自动部署**这条路——你全程在网页上点几下就行，不用在自己电脑装 Node、wrangler 那些东西。下面按真正第一次部署的小白视角拆开讲。

<div style="background:#eafaf0;border-left:4px solid #16a34a;padding:14px 18px;margin:18px 0;border-radius:6px">
<p style="margin:0;font-size:15px;line-height:1.8;color:#14532d"><strong>开始前你只需要两样东西：</strong></p>
<p style="margin:8px 0 0;font-size:14px;line-height:1.7;color:#14532d">① 一个 <strong>Cloudflare 账号</strong>（免费套餐就够，<strong>不用绑信用卡</strong>）；② 一个 <strong>GitHub 账号</strong>（用来跑自动部署的 Actions）。没有的话先花两分钟注册好。</p>
</div>

### 方法一：GitHub 一键部署（推荐，全程网页操作）

**第 1 步：给 Cloudflare 建一个 API 令牌**

1. 打开 [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens)，点「Create Token」→「Use custom token」或选 **Edit Cloudflare Workers** 模板。
2. 在权限里确认有 `Workers Scripts: Edit`；**再手动加一条 `D1: Edit` 权限**（这是 2026-01 项目从 KV 迁到 D1 之后必须的，只给 Worker 权限会部署失败）。
3. 一路「Continue to summary」→「Create Token」，把生成的令牌**复制保存好**（只显示一次）。

<div style="background:#fff5e8;border-left:4px solid #ea7317;padding:14px 18px;margin:18px 0;border-radius:6px">
<p style="margin:0;font-size:15px;line-height:1.8;color:#b45309"><strong>注意（新账号必看）：</strong>如果你的 Cloudflare 从没用过 Workers 功能，第一次要先打开一次 Workers 落地页 <a href="https://dash.cloudflare.com/?to=%2F%3Aaccount%2Fworkers-and-pages" target="_blank" rel="nofollow" style="color:#b45309">dash.cloudflare.com/?to=/:account/workers-and-pages</a>，系统才会<strong>自动给你创建一个 <code>&lt;子域&gt;.workers.dev</code> 子域</strong>。没这步，后面部署会因为找不到 workers.dev 子域而报错（官方 issue #13）。</p>
</div>

**第 2 步：用模板建你自己的仓库**

打开 [github.com/lyc8503/UptimeFlare](https://github.com/lyc8503/UptimeFlare)，点右上角绿色的 **「Use this template」→「Create a new repository」**，起个名字（比如 `uptimeflare`），可勾选 **Private** 避免别人看到你监控了哪些站点，最后「Create repository」。

**第 3 步：把令牌存进仓库密钥**

进入你刚建好的仓库 → 顶部 **Settings** → 左侧 **Secrets and variables → Actions** → **New repository secret**。Name 填 `CLOUDFLARE_API_TOKEN`，Secret 里粘贴第 1 步复制的令牌，点 **Add secret**。这个令牌只存在 GitHub 加密区，不会泄露。

**第 4 步：改配置文件，填上你要监控的站点**

点开仓库根目录的 `uptime.config.ts` → 点右上角铅笔图标编辑 → 按下面的示例改成你自己的监控目标 → 拉到底点 **Commit changes** 提交。

**第 5 步：等它自动部署**

提交后点仓库顶部的 **Actions** 标签，会看到一条 `Deploy` 工作流自动跑起来（改文件就触发）。等它从黄点变 **绿色 ✅** 就成功了。如果变红，点进去看日志——九成是「D1 权限没加」或「workers.dev 子域没创建」这两件事漏了。

**第 6 步：看成果**

进 Cloudflare 控制台 → **Workers 与 Pages**，你会看到两个项目：

- `uptimeflare` —— **状态页**（你给别人看的那个面板），默认地址 `https://<项目名>.pages.dev`；
- `uptimeflare_worker` —— 负责定时发起检查的 Worker（不用管它）。

打开状态页地址，就能看到实时监控面板了。

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:18px 0;border-radius:6px">
<p style="margin:0;font-size:15px;line-height:1.8;color:#1d4ed8"><strong>以后怎么改监控项？</strong>任何时候回去改 `uptime.config.ts` 再提交，Actions 会自动重新部署，不用手动敲任何命令。等于「改配置 = 重新上线」。</p>
</div>

### 一份能直接抄的配置文件

把下面内容整段替换掉你仓库里的 `uptime.config.ts` 即可（字段名都是官方约定的，照着改值就行）：

```ts
// uptime.config.ts —— 你只需要改这一个文件
const pageConfig = {
  title: "我的状态页",
  links: [
    { link: "https://oaoaoaaa.hyperphp.com", label: "我的博客" },
  ],
};

const workerConfig = {
  // 可选：给状态页加账号密码（格式 用户名:密码），不设就是完全公开
  passwordProtection: "admin:123456",
  monitors: [
    {
      id: "blog",                       // id 要唯一，改 id 会让历史曲线断掉
      name: "我的博客",
      method: "GET",
      target: "https://oaoaoaaa.hyperphp.com",
      expectedCodes: [200],             // 返回 200 才算正常，可写多个如 [200, 301]
      responseKeyword: "Claw",          // 响应里必须含此关键词，否则判宕机（可选）
      timeout: 10000,                   // 超时毫秒，默认 10 秒
    },
    {
      id: "ssh_port",
      name: "服务器 SSH 端口",
      method: "TCP_PING",               // 监控 TCP 端口，非网站也能盯
      target: "1.2.3.4:22",
    },
    // 想加更多监控项，照着上面继续写，最多 50 个
  ],
  // 宕机/恢复时的通知配置较复杂，按官方 Wiki 填 apprise URL 或 Webhook：
  // https://github.com/lyc8503/UptimeFlare/wiki/Setup-notification
  notification: {},
};

// 维护公告：用不到也至少留这一行空数组，否则部署会报错
const maintenances = [];

export default { pageConfig, workerConfig, maintenances };
```

每个监控项支持的常用字段：`method`（GET/POST/TCP_PING 等）、`target`（网址或 `IP:端口`）、`expectedCodes`（期望状态码）、`responseKeyword`（必须包含的关键词）、`responseForbiddenKeyword`（不能包含的关键词）、`timeout`、`headers`、`body`、`checkProxy`（做城市级地理检查用）。不了解的字段就别写，留默认。

### 方法二：换成你自己的域名（可选）

默认状态页是 `xxx.pages.dev` 这种二级域名，想用自己域名也简单：进 Cloudflare 控制台 **Workers 与 Pages → 点 `uptimeflare` 状态页项目（注意不是 `uptimeflare_worker`）→ Custom domains → Setup a custom domain**，按提示添加一条 CNAME 解析记录即可。如果你的域名 DNS 不在 Cloudflare，第 2 步选「My DNS provider」手动去域名商后台加 CNAME。

在线演示（官方）：https://uptimeflare.pages.dev/

## 五、适合谁 / 不适合谁

**✅ 适合**

- 个人站长、独立开发者、小团队，想零成本拥有专业状态页
- 希望监控探针分布在不同地理位置，而非单一机房
- 已经在用 Cloudflare（域名解析 / 加速）的用户，无缝衔接
- 想要一个好看、可自定义、能绑自己域名的公开状态页

**⚠️ 不适合**

- 需要亚分钟级（如 10 秒）超高频检查——免费套餐最低 1 分钟间隔
- 强合规要求数据必须留在自己服务器（数据存在 Cloudflare）
- 需要 SSL 证书到期检查——该功能仍在 TODO
- 想要开箱即用的图形化配置后台（目前以改配置文件为主）

## 六、一个必须注意的安全点

2026-03-04 作者披露并修复了一个漏洞 **CVE-2026-29779**：在 2025-09-21 至 2026-03-04 之间的版本中，`uptime.config.ts` 里的监控配置与凭据可能被暴露给客户端。如果你在这个时间段部署过，请务必升级到最新版，并建议顺手轮换相关凭据。

<div style="background:#0f172a;border-radius:14px;padding:20px 22px;margin:0 0 22px;color:#ffffff">
<p style="margin:0;font-size:14px;line-height:1.8;color:#e2e8f0"><strong>结论：</strong>UptimeFlare 是目前最省心的「零成本专业状态页」方案：开源（Apache-2.0）、3800+ Star、10 分钟上线，把监控探针铺满全球 310+ 城市还不用养服务器。唯一的前提是——你得有个 Cloudflare 账号，并且能接受数据托管在 Cloudflare 上。</p>
</div>
<div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12)">
<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px">
<span style="font-size:20px;font-weight:700;color:#ffffff">UptimeFlare</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px">开源</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px">Apache-2.0</span>
<span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px">TypeScript</span>
</div>
<p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1">跑在 Cloudflare Workers 上的免费无服务器站点监控与状态页：50 个监控项 1 分钟间隔、310+ 城市地理检查、90 天历史、100+ 通知渠道。</p>
<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px">
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center">
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff">★ 3807</p>
<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">Star</p>
</div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center">
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff">⑂ 603</p>
<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">Fork</p>
</div>
<div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center">
<p style="margin:0;font-size:18px;font-weight:700;color:#ffffff">Apache-2.0</p>
<p style="margin:4px 0 0;font-size:11px;color:#94a3b8">协议</p>
</div>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px">
<span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px">无服务器</span>
<span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px">地理监控</span>
<span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px">状态页</span>
<span style="font-size:12px;background:#6d4aff;color:#ffffff;padding:4px 12px;border-radius:6px">100+ 通知</span>
</div>
<div style="margin-top:16px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.18);text-align:center">
<p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500">项目地址：<a href="https://github.com/lyc8503/UptimeFlare" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px">github.com/lyc8503/UptimeFlare</a></p>
</div>
</div>
