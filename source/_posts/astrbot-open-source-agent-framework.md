---
title: "想自己搭 AI Agent？聊聊 AstrBot 这个开源框架"
date: '2026-09-06T12:05:34+08:00'
updated: '2026-09-06T12:05:34+08:00'
slug: astrbot-open-source-agent-framework
categories:
- "AI 与大模型"
description: "AstrBot是开源一站式Agent聊天机器人平台（AGPL协议，GitHub约4万star），作为IM与模型/工具间的中间层，支持多模型接入、工具调用、知识库及1329+插件，可对接QQ、飞书等平台。适合希望私有化部署、具备一定动手能力的用户，商业集成需注意协议限制。"
cover: "/wp-content/uploads/2026/09/astrbot-e04608.png"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/09/astrbot-e04608.png" alt="AstrBot 开源 AI Agent 框架" /></p>

<p>AstrBot 是 AstrBotDevs 团队维护的开源一站式 Agent 聊天机器人平台，目前在 GitHub 上有约 4 万 star（40,075）、2,876 fork，采用 AGPL 协议。它的定位不是「又一个聊天机器人」，而是把大模型接入、工具调用、知识库、工作流和插件系统整合到一起，让你把 AI 能力直接装进已经在用的聊天平台里。</p>

<h2>一、它解决的到底是什么问题</h2>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:18px 0;border-radius:4px">
<strong>一句话定位：</strong>AstrBot 是「聊天平台 ↔ 大模型 ↔ 工具/知识库」之间的中间层。你在 QQ、飞书、企业微信里发一句话，它负责把消息交给大模型、按需调用工具或检索知识库，再把结果送回聊天窗口。
</div>

<p>换句话说，它省掉的是你自己写「接 IM 协议 → 管会话 → 调模型 → 管插件」这一整套骨架的活。你要做的是配模型和插件，而不是从零搭框架。</p>

<h2>二、核心能力清单</h2>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px">
<thead>
<tr style="background:#f1f5f9">
<th style="border:1px solid #e2e8f0;padding:10px 12px;text-align:left">能力</th>
<th style="border:1px solid #e2e8f0;padding:10px 12px;text-align:left">说明</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc"><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>大模型对话</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">官方列出 OpenAI、Anthropic（Claude）、Gemini 等主流模型接入</td></tr>
<tr><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>多模态</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">支持图片等多模态输入</td></tr>
<tr style="background:#f8fafc"><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>MCP / 工具调用</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">支持 MCP 协议与 Agent 工具调用</td></tr>
<tr><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>知识库</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">内置知识库，可做文档问答、企业知识库</td></tr>
<tr style="background:#f8fafc"><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>Skills / 工作流</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">技能与流程编排</td></tr>
<tr><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>Agent Sandbox</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">隔离环境里安全执行代码、调用 Shell，支持会话级资源复用</td></tr>
<tr style="background:#f8fafc"><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>人格设定</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">可配置人设</td></tr>
<tr><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>上下文自动压缩</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">长对话自动压缩，省 token</td></tr>
<tr style="background:#f8fafc"><td style="border:1px solid #e2e8f0;padding:10px 12px"><strong>WebUI / ChatUI</strong></td><td style="border:1px solid #e2e8f0;padding:10px 12px">可视化管理面板 + 网页聊天界面（内置沙盒、网页搜索）</td></tr>
</tbody>
</table>

<h2>三、能接哪些聊天平台</h2>

<p>官方文档和中文 README 列出的平台包括：<strong>QQ、企业微信、飞书、钉钉、微信公众号、Telegram、Slack、Discord</strong> 等。推文里提到的是 QQ、飞书、企业微信、Telegram、Slack，官方清单其实还多出钉钉、微信公众号和 Discord。</p>

<div style="background:#fff5e8;border-left:4px solid #ea7317;padding:14px 18px;margin:18px 0;border-radius:4px">
<strong>补一句：</strong>接入 QQ 这类平台通常需要配合 NapCat 等协议端，属于「AstrBot + 协议端」的组合，不是 AstrBot 单包搞定。部署前建议先看官方文档里对应平台的接入页。
</div>

<h2>四、插件生态：实际 1329 个</h2>

<div style="background:#eafaf0;border-left:4px solid #16a34a;padding:14px 18px;margin:18px 0;border-radius:4px">
README 写的是「1000+ 插件可一键安装」，我们用官方插件市场的接口实际查了一下，当前数量是 <strong>1329</strong> 个 —— 推文说「超过 1000 个」没夸大，甚至偏保守。
</div>

<p>除此之外，它还能接入 Dify、阿里云百炼、Coze 等智能体平台，等于把别人的 Agent 能力也当成一种扩展源。</p>

<h2>五、怎么部署</h2>

<p>官方给了三条路，按门槛从低到高排：</p>

<p><strong>1）uv 一键部署（最快体验，需要装 uv）</strong></p>

```bash
uv tool install astrbot --python 3.12
astrbot init   # 仅首次执行，初始化环境
astrbot run
```

<p>后续升级：</p>

```bash
uv tool upgrade astrbot --python 3.12
```

<p><strong>2）Docker / Docker Compose（推荐生产环境）</strong>：官方有一整套 compose 方案，具体配置文件以官方文档的 Docker 部署页为准，不要照抄第三方博客里的旧 compose。</p>

<p><strong>3）雨云一键云部署</strong>：不想自己管服务器、要 24 小时在线的，可以直接用官方推荐的云部署模板。</p>

<h2>六、适合谁、不适合谁</h2>

<div style="display:flex;gap:16px;flex-wrap:wrap;margin:18px 0">
<div style="flex:1;min-width:260px;background:#eafaf0;border:1px solid #16a34a;border-radius:6px;padding:14px 16px">
<div style="font-weight:700;color:#15803d;margin-bottom:8px">适合</div>
<ul style="margin:0;padding-left:20px">
<li>想把 AI 接进 QQ / 飞书 / 企业微信等现有聊天平台的个人或小团队</li>
<li>想要知识库 + 工具调用组合能力，但不想自己写框架骨架</li>
<li>想本地或私有化部署、模型自己可控的场景</li>
<li>喜欢用现成插件快速试功能的折腾型用户</li>
</ul>
</div>
<div style="flex:1;min-width:260px;background:#fef2f2;border:1px solid #dc2626;border-radius:6px;padding:14px 16px">
<div style="font-weight:700;color:#dc2626;margin-bottom:8px">不适合</div>
<ul style="margin:0;padding-left:20px">
<li>只想买一个开箱即用的 SaaS 客服产品、不想运维的人</li>
<li>完全没有命令行和服务器基础、装环境都要人帮的纯新手</li>
<li>需要闭源商用的场景 —— 它是 AGPL 协议，有传染性，商业集成前务必确认合规</li>
</ul>
</div>
</div>

<h2>七、值不值得研究</h2>

<div style="background:#0f172a;color:#e2e8f0;padding:18px 22px;border-radius:6px;margin:18px 0">
<p style="margin:0 0 10px 0">如果你的目标是「在 IM 里跑一个能调工具、能查知识库、能装插件的 Agent」，AstrBot 目前是同类里完成度相当高、且社区活跃（4 万 star）的选择，值得一试。</p>
<p style="margin:0">但别把它当成零门槛产品：部署、协议端对接、模型 Key 配置这几件事仍然要自己动手，AGPL 协议也需要提前看清。</p>
</div>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">AstrBot</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">AGPL</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">开源一站式 AI Agent 聊天机器人框架，接入大模型与工具调用。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 40287</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 2902</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">AGPL</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">AI Agent</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">聊天机器人</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">大模型</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/AstrBotDevs/AstrBot" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/AstrBotDevs/AstrBot</a></p></div></div>
