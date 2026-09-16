---
title: "Agnes 3.0 Flash 上手：把活干完的免费模型"
date: '2026-09-08T15:47:10+08:00'
updated: '2026-09-08T15:47:10+08:00'
slug: agnes-3-0-flash-review
categories:
- "AI 与大模型"
description: "Agnes 3.0 Flash是Agnes AI 2026年9月推出的免费大模型，主打真正完成任务而非只给建议。支持OpenAI/Anthropic双协议、函数调用、图片URL识图及轻量思考，256K上下文窗口。相比2.5版本显著降低延迟，适合Agent工作流编排、工具调用场景，个人和小团队可免费试"
---

<p>Agnes 3.0 Flash 是 Agnes AI 在 2026 年 9 月初推出的一款免费大模型，主打「把任务真正跑完」而不是只回一段漂亮文字。它在 OpenAI 与 Anthropic 双协议下提供函数调用、图片 URL 识图和轻量思考，免费 Key 开箱即用，上下文窗口沿用 256K 规格，适合喂长文档、跑长链路 Agent 任务。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:0 0 22px;border-radius:6px;">
<p style="margin:0;color:#1d4ed8;font-size:15px;line-height:1.8;"><strong>一句话定位：</strong>免费、双协议、带工具编排的实干型模型——接到任务会自己调接口、查数据、收结果，而不是停在「我建议你……」。</p>
</div>

<h2>一、它到底是啥</h2>
<p>把它想成「雇了个会自己跑流程的实习生」：你给一个目标，它先规划步骤，需要查天气就调天气接口，需要读图就传图片地址，拿到返回直接整理成结论交给你。前代 2.x 更像「会聊天的助手」，3.0 把重心挪到「动手把活干完」。</p>
<p>能力上支持文本输入、图片 URL 识图，完整具备 Function Calling 与思考模式，同时兼容 OpenAI、Anthropic 两套接口协议，迁移现有代码基本只改一个 base_url 就行。</p>

<h2>二、核心能力</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">任务执行</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">减少「话说完、活没干」的现象，接到指令就推进到出结果。</p>
</div>
<div style="flex:1;min-width:260px;background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#1d4ed8;">工具编排</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">合理地调工具，拿回数据就收尾，不空转、不反复错调。</p>
</div>
<div style="flex:1;min-width:260px;background:#fff5e8;border-left:4px solid #ea7317;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#b45309;">上下文遵循</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">长任务里不跑偏，不漏掉你给的约束条件。</p>
</div>
<div style="flex:1;min-width:260px;background:#f2eeff;border-left:4px solid #6d4aff;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#5b21b6;">可信交付</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">拒绝虚构结果，不会假装「我已经做完了」。</p>
</div>
</div>

<h2>三、三个月三次大更新</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">时间</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">版本</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">更新重点</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">05-26</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2.0 首发</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">起步 256K 超大上下文窗口</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">06-01</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">全模态免费 API</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">正式永久免费，首周释放 1T tokens 额度</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">07-13</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">2.5 版本</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">强化代码能力，SWE-bench 分数 72.4% 提升到 75.6%</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">09 月初</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">3.0 版本</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">全力优化 Agent 链路，覆盖规划→调用→确认全流程</td>
</tr>
</tbody>
</table>
<p>路线很清晰：2.0 解决「免费可用」，2.5 打磨「代码能力」，3.0 攻坚「任务执行」。</p>

<h2>四、和 2.5 Flash 同条件对照</h2>
<p>同一把 Key、同一组提示词，挑了几个典型 Agent 场景跑对照：</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">测试场景</th>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">表现</th>
<th style="background:#16a34a;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">耗时</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">基础问答</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">回答准确简洁，不堆废话</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">6.5s</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">函数调用</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">干净调起 get_weather 查上海天气</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">1.5s</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;">工具结果编排</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">拿回 JSON 直接总结，不重复调工具</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">3.9s</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">代码指令</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">只输出代码，无多余解释</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">6.6s</td>
</tr>
</tbody>
</table>
<p>对照 2.5 Flash：答案同样正确，但会吐出大量思考 token，整体耗时拉到 <strong style="color:#dc2626;">52s</strong>。3.0 内置轻量思考（响应里能看到 reasoning_tokens），但最终输出克制干净——比如「只输出代码、别解释」，它能严格执行。</p>
<p>在 Agent 自动化高频调用里，几十秒的差距会被持续放大，这也是 3.0 最值得换的理由。</p>

<h2>五、30 秒接入</h2>
<ol style="line-height:2;font-size:15px;">
<li>前往 <a href="https://platform.agnes-ai.com" target="_blank" rel="nofollow">platform.agnes-ai.com</a> 注册，生成 API Key，免信用卡、完全免费；</li>
<li>接口地址：国际站 <a href="https://apihub.agnes-ai.com/v1" target="_blank" rel="nofollow">https://apihub.agnes-ai.com/v1</a>，国内 CN 站 <a href="https://api.agnes-ai.cn/v1" target="_blank" rel="nofollow">https://api.agnes-ai.cn/v1</a>；</li>
<li>请求模型名填 <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">agnes-3.0-flash</code>；</li>
<li>用 Anthropic 协议时，访问路径为 <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">/v1/messages</code>；</li>
<li>要开深度思考，请求参数加 <code style="background:#f1f5f9;padding:2px 6px;border-radius:4px;">chat_template_kwargs.enable_thinking: true</code>。</li>
</ol>

<div style="background:#fef2f2;border-left:4px solid #dc2626;padding:14px 18px;margin:18px 0;border-radius:6px;">
<p style="margin:0;font-size:15px;line-height:1.8;color:#7f1d1d;"><strong>坑点提醒：</strong>国际站与国内 CN 站的账号、API Key <strong>互不通用</strong>。密钥字符串看着一样，跨域名调用会返回「令牌无效」。追求低延迟就单独在 CN 站注册一把 Key，别混用。</p>
</div>

```python
from openai import OpenAI

client = OpenAI(
    api_key="你的API-Key",
    base_url="https://apihub.agnes-ai.cn/v1"
)

resp = client.chat.completions.create(
    model="agnes-3.0-flash",
    messages=[{"role": "user", "content": "你好"}]
)

print(resp.choices[0].message.content)
```

<h2>六、适合谁，不适合谁</h2>
<div style="display:flex;flex-wrap:wrap;gap:14px;margin:18px 0;">
<div style="flex:1;min-width:260px;background:#eafaf0;border-left:4px solid #16a34a;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#15803d;">适合</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">做 Agent / 工作流编排、要函数调用、想白嫖且不接受「只给建议不动手」的场景；免费档够个人和小团队试水。</p>
</div>
<div style="flex:1;min-width:260px;background:#fef2f2;border-left:4px solid #dc2626;padding:14px 16px;border-radius:6px;">
<p style="margin:0 0 6px;font-weight:bold;color:#7f1d1d;">暂不适合</p>
<p style="margin:0;font-size:14px;line-height:1.7;color:#334155;">重度生产高并发（免费档限频）、需要超长输出或私有化部署的商业关键链路，那类还是上付费方案更稳。</p>
</div>
</div>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:26px 0;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>想要一个「免费、双协议、会自己把任务跑完」的模型，Agnes 3.0 Flash 是目前最顺手的选择之一——把 2.5 的思考开销砍掉，换来的是真能交货的 Agent 体验。</p>
</div>

<p style="font-size:14px;color:#64748b;">项目地址：<a href="https://platform.agnes-ai.com" target="_blank" rel="nofollow">platform.agnes-ai.com</a></p>
