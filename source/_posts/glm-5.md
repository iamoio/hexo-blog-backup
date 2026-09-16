---
title: "GLM 5.3 免费了！注册拿 Key，我用 WorkBuddy 跑通了"
date: '2026-09-02T14:24:28+08:00'
updated: '2026-09-02T14:24:50+08:00'
slug: glm-5
categories:
- "AI 与大模型"
description: "第三方平台tokenrouter.com提供免费GLM 5.3调用额度（限流，日常够用）。注册获取API Key后，以标准OpenAI兼容接口接入WorkBuddy等工具，两分钟完成配置即可使用。GLM 5.3属国产第一梯队，建议在免费期内充分测试。"
cover: "/wp-content/uploads/2026/09/image-500367be5a4648bbd6b8dbf9ebea20a0.jpg"

---

<p class="wx-cover" style="text-align:center;margin:0 auto 18px">
<img src="/wp-content/uploads/2026/09/image-500367be5a4648bbd6b8dbf9ebea20a0.jpg" alt="封面" style="max-width:100%;height:auto;display:block;margin:0 auto">
</p>

<p>智谱官方每逢周末会放一批免费 Token，但基本靠抢，手慢无。其实还有一条更省心的白嫖路线能用到 <strong>GLM 5.3</strong>——一个第三方聚合平台送的免费额度。我亲测可用，下面把完整步骤记下来。</p>

<p>先说清楚：这是第三方平台（非智谱官方 Token Plan）提供的免费额度，<strong>有速率限制</strong>。不过平时跑跑脚本、测测 demo、给 Claude Code / Cursor 这类编码工具当备用线路，完全够使。</p>

<p><strong>第一步：注册并找到免费模型</strong><br>
打开 <a href="https://tokenrouter.com" target="_blank" rel="nofollow">tokenrouter.com</a>，首页直接挂着「GLM 5.3 免费」，点右上角注册。注册时有个协议勾选框，不勾没法继续，别漏了。</p>

<p><img src="/wp-content/uploads/2026/09/640.jpg" alt="tokenrouter 首页免费 GLM 5.3" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

<p><strong>第二步：新建 API Key</strong><br>
登录后进左侧「API Keys」，新建一个 Key。这串密钥等同于你的账号凭证，别外传，截图记得打码。</p>

<p><img src="/wp-content/uploads/2026/09/640-1.jpg" alt="API Keys 页面" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

<p><strong>第三步：在模型列表里搜 free</strong><br>
到模型列表搜 <code>free</code>，GLM 5.3 就在里面。Base URL 记好：<code>https://api.tokenrouter.com/v1</code></p>

<p><img src="/wp-content/uploads/2026/09/640-2.jpg" alt="模型列表搜索 free" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

<p><strong>实测：接进 AI 编码助手</strong><br>
Key 到手后，我直接丢给 AI 编码助手试（WorkBuddy 这类都行）。填好 Base URL 和 Key，模型选 GLM 5.3，发个请求，通的。又切回日常对话跑了几轮，响应正常，没掉链子。</p>

<p><img src="/wp-content/uploads/2026/09/640-3.jpg" alt="AI 编码助手配置界面" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

<p>整个接入两分钟出头，不用改代码、不用装插件，就是个标准的 OpenAI 兼容接口。Claude Code、Cursor 之类的工具理论上换个 Key 也能直接接。</p>

<p><img src="/wp-content/uploads/2026/09/640-4.jpg" alt="请求成功返回" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

<p><strong>一点补充</strong><br>
GLM 5.3 本身水平不用多吹，国产第一梯队。趁免费期把想测的都测了。这套跑通的流程记下，以后换哪家模型都是一个套路，轻车熟路。</p>

<p><img src="/wp-content/uploads/2026/09/640-5.jpg" alt="补充说明截图" style="max-width:100%;height:auto;display:block;margin:0 auto"></p>

文章来源：<a href="https://mp.weixin.qq.com/s/-g-5zSTD04DQiwSd4O4kMg" target="_blank" rel="nofollow" title="https://mp.weixin.qq.com/s/-g-5zSTD04DQiwSd4O4kMg">mp.weixin.qq.com</a>
