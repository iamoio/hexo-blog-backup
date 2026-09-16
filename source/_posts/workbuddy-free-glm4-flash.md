---
title: "别再给 AI 烧钱：0 元接上智谱大模型（图文教程）"
date: '2026-08-02T06:01:21+08:00'
updated: '2026-08-02T07:06:01+08:00'
slug: workbuddy-free-glm4-flash
categories:
- "AI 与大模型"
description: "通过WorkBuddy自定义模型功能接入智谱GLM-4-Flash，可实现日常任务零积分消耗。该模型提供永久免费API调用，兼容OpenAI接口，支持千万级Token额度。操作分三步：注册获取密钥、添加模型配置、验证接入成功。进阶用户可通过配置文件批量接入，需注意密钥保存、Base URL格式及进程"
cover: "/wp-content/uploads/2026/08/cover_185.png"

---

<section style="margin:0 0 24px;background:#4f46e5;border-radius:20px;overflow:hidden;width:100%">
  <div style="padding:30px 32px">
    <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:3px;color:#c7d2fe;margin-bottom:12px">WORKBUDDY 教程</div>
    <h1 style="margin:0 0 10px;font-size:25px;font-weight:900;color:#ffffff;line-height:1.28">别再给 AI 烧钱：0 元接上智谱大模型</h1>
    <p style="margin:0;font-size:13px;color:#e0e7ff;line-height:1.7">用 WorkBuddy 自带的「自定义模型」通道，把永久免费的智谱 GLM-4-Flash 接进来，日常任务零积分消耗。</p>
  </div>
</section>

<p style="margin:0 0 6px;line-height:1.75;color:#374151">用 WorkBuddy 做批量任务、深度文档分析时，官方积分掉得飞快。其实它内置了「自定义模型」入口——只要把兼容 OpenAI 接口的免费大模型（比如智谱 GLM-4-Flash）接进来，对话和任务就走第三方 API，一分钱积分都不用花。下面 3 步搞定。</p>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">为什么是智谱 GLM-4-Flash</h2>
<p style="margin:0 0 6px;line-height:1.75;color:#374151">智谱 AI 开放平台的 GLM-4-Flash 是国内少数官方承诺「永久免费调用」的对话模型，注册完成实名认证后即可领取千万级 Token 免费额度，接口完全兼容 OpenAI /v1 规范，长文本处理、日常问答、文案优化都很能打。</p>
<div style="background:#eef2ff;border-left:4px solid #4f46e5;border-radius:0 10px 10px 0;padding:14px 18px;margin:10px 0">
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">模型 ID：</strong>glm-4-flash（固定）</p>
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">接口地址：</strong>open.bigmodel.cn/api/paas/v4</p>
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">免费额度：</strong>千万级 Token，永久免费</p>
  <p style="margin:0;line-height:1.7;color:#374151"><strong style="color:#4f46e5">兼容性：</strong>OpenAI 标准接口，国内网络直连</p>
</div>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">第一步 · 领取智谱免费 API Key</h2>
<p style="margin:0 0 6px;line-height:1.75;color:#374151">先到智谱开放平台拿到密钥，这是后续接入的凭证。</p>
<ol style="margin:0 0 6px;padding-left:22px;color:#374151;line-height:1.75">
  <li style="margin:0 0 6px">打开智谱 AI 开放平台（bigmodel.cn），手机号注册并完成实名认证；</li>
  <li style="margin:0 0 6px">进入控制台，左侧菜单找到「API 密钥管理」；</li>
  <li style="margin:0 0 6px">点击「创建密钥」，自定义备注名（如「WorkBuddy 专用」）；</li>
  <li style="margin:0">复制生成的 sk- 开头密钥——关闭页面后无法再次查看，务必立即保存。</li>
</ol>
<div style="background:#fef2f2;border-left:4px solid #ef4444;border-radius:0 10px 10px 0;padding:14px 18px;margin:10px 0">
  <p style="margin:0;line-height:1.7;color:#7f1d1d">密钥属于个人私密凭证，不要泄露或代购；一旦外泄可能被刷光免费额度。建议在密码管理器或本地加密文件里存一份。</p>
</div>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">第二步 · WorkBuddy 添加自定义模型（图形界面）</h2>
<p style="margin:0 0 6px;line-height:1.75;color:#374151">2026 年 5 月后的新版客户端支持可视化添加，全程不用写代码。</p>
<ol style="margin:0 0 6px;padding-left:22px;color:#374151;line-height:1.75">
  <li style="margin:0 0 6px">完全退出 WorkBuddy（后台进程也结束），重新打开；</li>
  <li style="margin:0 0 6px">点击左下角齿轮「系统设置」→ 顶部切到「模型管理 / Model List」；</li>
  <li style="margin:0 0 6px">下滑找到「自定义模型（Custom Model）」板块，点「添加模型 / Add Model」；</li>
  <li style="margin:0 0 6px">按智谱填写：提供商选 <strong>Custom / OpenAI Compatible</strong>；Base URL 填 <code style="background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:12px">open.bigmodel.cn/api/paas/v4</code>；API Key 粘贴刚才复制的 sk- 密钥；模型 ID 填 <code style="background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:12px">glm-4-flash</code>；显示名称可自定义（如「智谱免费版」）；</li>
  <li style="margin:0">点「保存」，重启 WorkBuddy 客户端。</li>
</ol>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">第三步 · 验证是否接入成功</h2>
<p style="margin:0 0 6px;line-height:1.75;color:#374151">打开新对话，顶部模型下拉列表里应能看到刚添加的「智谱免费版」。发一句「帮我写一段工作总结」，能正常回复即说明接入成功。</p>
<div style="background:#eef2ff;border-left:4px solid #4f46e5;border-radius:0 10px 10px 0;padding:14px 18px;margin:10px 0">
  <p style="margin:0;line-height:1.7;color:#374151">想确认走的是免费通道？回复正常、且 WorkBuddy 积分没掉，就对了。</p>
</div>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">进阶 · 用配置文件批量接入（可选）</h2>
<p style="margin:0 0 6px;line-height:1.75;color:#374151">老版本没有可视化按钮，或想一次接入多个模型，可手写配置文件。Windows 路径一般为 <code style="background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:12px">C:/Users/你的用户名/.workbuddy</code>，macOS/Linux 为 <code style="background:#f1f5f9;padding:1px 6px;border-radius:4px;font-size:12px">~/.workbuddy</code>。</p>

```
models:
  - name: glm4-flash
    provider: openai_compatible
    base_url: "open.bigmodel.cn/api/paas/v4"
    api_key: "你的sk密钥"
    model_id: "glm-4-flash"
    max_tokens: 8192
```

<p style="margin:0;line-height:1.75;color:#374151">保存后彻底退出并重启 WorkBuddy，模型下拉里即可看到新增模型。</p>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">常见踩坑排查</h2>
<div style="background:#eef2ff;border-left:4px solid #4f46e5;border-radius:0 10px 10px 0;padding:14px 18px;margin:10px 0">
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">重启后模型不显示：</strong>90% 是进程没完全退出，去任务管理器结束 WorkBuddy 后台进程再开。</p>
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">401 鉴权失败：</strong>检查密钥是否过期、实名是否完成、平台是否限制了 IP 白名单。</p>
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">429 请求过频：</strong>降低发送频率，或在后台切换另一个免费模型。</p>
  <p style="margin:0 0 4px;line-height:1.7;color:#374151"><strong style="color:#4f46e5">Base URL 报错：</strong>确认没漏写 /v4 后缀，API Key 前后不要带空格与换行。</p>
  <p style="margin:0;line-height:1.7;color:#374151"><strong style="color:#4f46e5">Craft 模式调不动自定义模型：</strong>官方对第三方模型的 Agent 能力有策略限制，属正常现象，复杂任务仍可用原生积分模型。</p>
</div>

<h2 style="margin:28px 0 10px;font-size:20px;font-weight:900;color:#4f46e5;padding-bottom:8px;border-bottom:2px solid #e0e7ff;line-height:1.3">写在最后</h2>
<p style="margin:0;line-height:1.75;color:#374151">把智谱 GLM-4-Flash 接进 WorkBuddy 后，日常问答、文案改写、简单总结全走免费通道，原生积分留给高价值任务，等于白嫖一个国产顶级模型。这套「接免费模型」的思路同样适用于 DeepSeek、硅基流动等兼容 OpenAI 接口的平台——掌握一次，以后换任何同类工具都能复用。</p>
<hr style="margin:28px 0 10px;border:none;border-top:1px solid #e5e7eb"><h2 style="font-size:19px;color:#4f46e5;margin:18px 0 10px;padding-bottom:8px;border-bottom:2px solid #e0e7ff"><span>文章来源</span></h2><p style="margin:0 0 6px;line-height:1.75;color:#374151">本文根据以下公开资料整理改写：</p><ul style="margin:0 0 6px;line-height:1.75;color:#374151"><li><a href="https://www.toutiao.com/article/7663415123779863040/" target="_blank" rel="noopener" style="color:#4f46e5">WorkBuddy 接入免费大模型（图文教程）· 今日头条</a></li><li><a href="https://cloud.tencent.com/developer/article/2665853" target="_blank" rel="noopener" style="color:#4f46e5">WorkBuddy 加载自定义模型（以智谱 GLM 为例）· 腾讯云开发者社区</a></li></ul>
