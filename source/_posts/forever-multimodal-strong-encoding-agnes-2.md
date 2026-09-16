---
title: "永久免费+多模态+编码强：agnes-2.5-flash 国内直连接入指南"
date: '2026-08-28T16:22:04+08:00'
updated: '2026-08-29T02:53:23+08:00'
slug: forever-multimodal-strong-encoding-agnes-2
categories:
- "AI 与大模型"
description: "新加坡Sapiens AI发布agnes-2.5-flash，永久免费支持文本、图片、视频多模态，编码能力跃升至SWE Atlas QnA 36.5%。该模型512K上下文、OpenAI兼容，国内节点直连无需代理。免费档瓶颈为每分钟请求数而非Token总量，需通过verify验证接入。这是目前唯一集"
cover: "/wp-content/uploads/2026/08/image-95944ce8bd407519981c9f0d785b7f46.jpg"

---

<p>新加坡 Sapiens AI 发布的 <strong>agnes-2.5-flash</strong>，目前是唯一同时做到<strong>永久免费 + 多模态（文/图/视频）+ 编码强</strong>的模型：SWE Atlas QnA 从 15.8% 直接跳到 36.5%，512K 上下文，国内节点 <code>apihub.agnes-ai.cn/v1</code> 直连，且完全 OpenAI 兼容。下面用一张总表 + 几段实操 + 几个卡片，把「怎么接、怎么验、怎么不踩坑」一次性说清楚。</p>
<img src="/wp-content/uploads/2026/08/image-95944ce8bd407519981c9f0d785b7f46.jpg" alt="agnes-2.5-flash：支持多模态文图视频、编码强、永久免费" style="width:100%;max-width:760px;height:auto;display:block;margin:20px auto;border-radius:8px">

<h2>一、核心参数总表：agnes-2.5-flash 是什么</h2>
<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;line-height:1.65">
  <thead>
    <tr>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px;width:22%">维度</th>
      <th style="background:#eaf2ff;color:#1d4ed8;text-align:left;padding:11px 12px">agnes-2.5-flash</th>
      <th style="background:#f8fafc;color:#334155;text-align:left;padding:11px 12px">说明</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">定价</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><strong style="color:#15803d">永久免费（默认档）</strong></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">无需绑定信用卡，免费/默认 Key 即可用</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">多模态</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">文本 + 图片 + 视频</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">均通过 OpenAI 兼容 endpoint 调用</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">编码能力</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><strong style="color:#1d4ed8">SWE Atlas QnA 36.5%</strong></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">较 2.0 大幅跃升，代码库问答/修改可用</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">上下文</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">512K</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">长文档、大代码库、批量上下文可用</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">国内节点</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>apihub.agnes-ai.cn/v1</code></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">直连，无需代理，延迟低</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">协议</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">OpenAI 兼容</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">改 base_url + model 名即可迁移</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px">速率限制</td><td style="padding:10px 12px">文本约 20 RPM</td><td style="padding:10px 12px">免费档瓶颈在<strong>每分钟请求数</strong>，不在 Token 总量</td></tr>
  </tbody>
</table>

<h2>二、免费档的真实限额</h2>
<p>官方 Token Plan FAQ 把用户分成三类：免费/默认用户、企业认证用户、Token Plan 订阅用户。<strong>本文面向免费/默认用户</strong>，核心限制如下：</p>
<div style="display:flex;gap:16px;flex-wrap:wrap;margin:16px 0">
  <div style="flex:1;min-width:220px;border:1px solid #2563eb;border-radius:8px;padding:14px;background:#eaf2ff">
    <strong style="color:#1d4ed8">文本</strong>
    <p style="margin:8px 0 0;line-height:1.7">允许 30 RPM，实际稳定约 <strong>20 次/分</strong>；512K 上下文。</p>
  </div>
  <div style="flex:1;min-width:220px;border:1px solid #16a34a;border-radius:8px;padding:14px;background:#eafaf0">
    <strong style="color:#15803d">图片</strong>
    <p style="margin:8px 0 0;line-height:1.7">按分辨率分档：<strong>1K 约 20 RPM</strong>、2K 约 10 RPM、3K/4K 约 1 RPM。</p>
  </div>
  <div style="flex:1;min-width:220px;border:1px solid #64748b;border-radius:8px;padding:14px;background:#f1f5f9">
    <strong style="color:#475569">视频</strong>
    <p style="margin:8px 0 0;line-height:1.7">允许 2 RPM，实际约 <strong>1 次/分</strong>；异步生成。</p>
  </div>
</div>
<div style="background:#fff7ed;border-left:5px solid #f97316;padding:14px 18px;margin:18px 0;border-radius:0 8px 8px 0">
  <strong>关键认知：</strong>免费档的瓶颈是 <strong>RPM（每分钟请求数）</strong>，不是「Token 用完即停」。打满请降频，别指望多 Key 叠池。
</div>

<h2>三、三种用法怎么选</h2>
<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;line-height:1.65">
  <thead>
    <tr>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">你想干嘛</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">走哪条</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">要不要 Key</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">怎么算过</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">注册、建 Key、看 Usage</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">Agnes Platform 控制台（国内 .cn）</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">登录即可</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">能复制一把 API Key；Usage 页能打开</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">脚本 / 自己写代码</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>apihub.agnes-ai.cn/v1</code> + verify</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">要（免费/默认 Key）</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">终端出现 <code>OK model=agnes-2.5-flash</code></td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px">终端 Agent</td><td style="padding:10px 12px">OpenCode 手动 OpenAI 兼容</td><td style="padding:10px 12px">要</td><td style="padding:10px 12px">选中 Agnes 型号后能回一句</td></tr>
  </tbody>
</table>

<h2>四、四步验收：从拿 Key 到能对话</h2>
<img src="/wp-content/uploads/2026/08/640-117.png" alt="接入流程：Platform 拿 Key → Verify 验通 → OpenCode 对话" style="width:100%;max-width:760px;height:auto;display:block;margin:20px auto;border-radius:8px">
<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;line-height:1.65">
  <thead>
    <tr>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px;width:14%">步骤</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">你做什么</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">怎么算过</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">1 开平台</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">打开 <a href="https://platform.agnes-ai.cn" target="_blank" rel="noopener">platform.agnes-ai.cn</a> 注册/登录（国内优先）</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">进入开发者控制台</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">2 拿 Key</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">API Keys → 创建 → 复制（免费/默认即可）</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">能粘贴完整 Key（不要带 <code>Bearer</code> 前缀）</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">3 验通</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">仓库根目录设 <code>AGNES_API_KEY</code> → 跑 <code>verify_agnes_api.py</code></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">打印以 <code>OK model=agnes-2.5-flash</code> 开头</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px">4 挂终端</td><td style="padding:10px 12px">OpenCode：Base <code>https://apihub.agnes-ai.cn/v1</code> + 同一 Key + <code>agnes-2.5-flash</code></td><td style="padding:10px 12px">发「只回复 OK」能回；勿只看「获取模型」红字</td></tr>
  </tbody>
</table>
<img src="/wp-content/uploads/2026/08/640-50.jpg" alt="终端验证成功：OK model=agnes-2.5-flash" style="width:100%;max-width:760px;height:auto;display:block;margin:20px auto;border-radius:8px">

<h2>五、Platform API：拿 Key 并验通（必做）</h2>
<p>成败线不是海报上的「永久免费」，而是终端里出现 <code>OK model=agnes-2.5-flash</code>。下面两条命令任选一条跑通即可。</p>

```bash
# 1) 控制台（浏览器）
# platform.agnes-ai.cn → 登录 → API Keys → Create → 复制

# 2) PowerShell（仓库根目录 · 成败线）
$env:AGNES_API_KEY = "粘贴你的Key"
# 可选：$env:AGNES_MODEL = "agnes-2.0-flash"
python scripts/verify_agnes_api.py

# 期望：OK model=agnes-2.5-flash …
# 未设置 Key：FAIL 提示设置 AGNES_API_KEY
# 假 Key / 错 Key：常见 HTTP 401「无效的令牌」（端点可达）
# 本机超时/DNS：退出码 2，先打通 platform 与 apihub
```

```bash
# 可选 curl（verify 已绿可跳过）
curl.exe -sL "https://apihub.agnes-ai.cn/v1/chat/completions" `
  -H "Content-Type: application/json" `
  -H "Authorization: Bearer $env:AGNES_API_KEY" `
  -d "{"model":"agnes-2.5-flash","messages":[{"role":"user","content":"只回复OK"}],"max_tokens":32}"
```

<h2>六、终端 Agent：OpenCode 接入</h2>
<p>Base URL 只写到 <code>/v1</code>，不要拼 <code>/chat/completions</code>；API Key 不要加 <code>Bearer</code> 前缀。官方集成指南示例仍多用 <code>agnes-2.0-flash</code>，能升就升 2.5。</p>

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "agnes/agnes-2.5-flash",
  "provider": {
    "agnes": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Agnes",
      "options": {
        "baseURL": "https://apihub.agnes-ai.cn/v1",
        "apiKey": "{env:AGNES_API_KEY}"
      },
      "models": {
        "agnes-2.5-flash": { "name": "agnes-2.5-flash" }
      }
    }
  }
}
```

<h2>七、可抄的 model id（别还停在 2.0）</h2>
<p><code>agnes-2.5-flash</code> 与 2.0 同 Base、同 Chat Completions 路径，多数场景只改 model 名。下表现价以各模型页「当前价格」为准。</p>
<table style="width:100%;border-collapse:collapse;margin:20px 0;font-size:15px;line-height:1.65">
  <thead>
    <tr>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">用途</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">API model（优先抄）</th>
      <th style="background:#0f172a;color:#fff;text-align:left;padding:11px 12px">免费档注意</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">文本 / 编码（推荐验通）</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>agnes-2.5-flash</code></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">永久免费不限 token；512K 上下文；实际约 20 次/分</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">兼容旧教程</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>agnes-2.0-flash</code></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0">仍可用；OpenCode 官文示例常写它，能升就升 2.5</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">文生图 / 修图</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>agnes-image-2.1-flash</code></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>POST /v1/images/generations</code>；1K 约 20 次/分，2K 约 10 次/分，更高更慢</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px;border-bottom:1px solid #e2e8f0">文生视频 / 图生视频</td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>agnes-video-v2.0</code></td><td style="padding:10px 12px;border-bottom:1px solid #e2e8f0"><code>POST /v1/videos</code> 异步；允许 2 次/分，实际约 1 次/分</td></tr>
    <tr><td style="font-weight:700;background:#f8fafc;padding:10px 12px">付费推理</td><td style="padding:10px 12px"><code>agnes-2.5-pro-alpha</code></td><td style="padding:10px 12px">官档付费档；<strong style="color:#dc2626">verify 默认别用它</strong></td></tr>
  </tbody>
</table>

<h2>八、接 Agnes 前对这六条</h2>
<ol style="line-height:1.9;margin:16px 0">
  <li>只认 <code>platform.agnes-ai.cn</code> 的 Key 与 <code>apihub.agnes-ai.cn/v1</code>（国内优先）。</li>
  <li>成败线是 verify 的 <code>OK model=...</code>，不是海报上的「永久免费」。</li>
  <li>瓶颈是 <strong>RPM</strong>（每分钟最多可发起的请求数，文本实际约 20 次/分），不是「Token 用完即停」那套；打满请降频，勿指望多 Key 叠池。</li>
  <li>验通默认 <code>agnes-2.5-flash</code>；旧文 / OpenCode 官例常写 2.0，能升就升；<code>pro-alpha</code> 付费勿拿来证明免费档。</li>
  <li>目前 Agnes 是唯一同时做到「永久免费 + 多模态 + 编码强」的平台，但免费策略可能调整：发出前再看一眼当页价格。</li>
  <li>图/视频另有 endpoint 与 RPM；文本 verify 绿 ≠ 视频已压测。</li>
</ol>

<h2>九、官方资源链接</h2>
<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;margin:16px 0">
  <a href="https://agnes-ai.cn" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>Agnes AI 国内官网</strong><br><span style="color:#475569;font-size:13px">agnes-ai.cn</span></a>
  <a href="https://platform.agnes-ai.cn" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>API Platform（拿 Key）</strong><br><span style="color:#475569;font-size:13px">platform.agnes-ai.cn</span></a>
  <a href="https://agnes-ai.cn/zh-Hans/docs/agnes-25-flash" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>Agnes 2.5 Flash 模型页</strong><br><span style="color:#475569;font-size:13px">含当前价格</span></a>
  <a href="https://agnes-ai.cn/zh-Hans/docs/agnes-image-21-flash" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>Agnes Image 2.1 Flash</strong><br><span style="color:#475569;font-size:13px">文生图/修图</span></a>
  <a href="https://agnes-ai.cn/zh-Hans/docs/agnes-video-v20" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>Agnes Video V2.0</strong><br><span style="color:#475569;font-size:13px">文生视频/图生视频</span></a>
  <a href="https://agnes-ai.cn/zh-Hans/docs/tokenplan" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>Token Plan / RPM FAQ</strong><br><span style="color:#475569;font-size:13px">官方限额说明</span></a>
  <a href="https://wiki.agnes-ai.com/en/docs/cid7" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>OpenCode 集成指南</strong><br><span style="color:#475569;font-size:13px">wiki.agnes-ai.com</span></a>
  <a href="https://github.com/AgnesAI-Labs/AgnesAI-Models" target="_blank" rel="noopener" style="display:block;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px;background:#f8fafc;text-decoration:none;color:#1d4ed8"><strong>模型目录仓 AgnesAI-Models</strong><br><span style="color:#475569;font-size:13px">GitHub</span></a>
</div>

<h2>十、一句话结论</h2>
<div style="background:#0f172a;color:#fff;padding:22px;border-radius:12px;margin:18px 0;text-align:center;line-height:1.9">
  <p style="margin:0;font-size:16px">要 <span style="color:#4ade80;font-weight:700">永久免费、国内直连、OpenAI 兼容</span> 的多模态 API → 直接接 <strong style="color:#4ade80">agnes-2.5-flash</strong>；<br>文本/编码用它默认名，图/视频切对应 endpoint，<strong>验通是底线，RPM 是瓶颈</strong>。</p>
  <p style="margin:12px 0 0;font-size:14px;color:#cbd5e1">发文前再确认一次当页价格：免费策略可能调整，别拿旧截图当免死金牌。</p>
</div>
<p style="color:#64748b;font-size:14px">如果你已经跑通 verify，下一步通常是把 <code>baseURL</code> 和 <code>model</code> 写进自己的 Agent 或客户端里；需要的话可以把 OpenCode / Cline / Continue 的配置模板再整理一份。</p>

文章来源：mp.weixin.qq.com
