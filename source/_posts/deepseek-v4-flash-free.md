---
title: "免费使用DeepSeek V4 Flash"
date: '2026-08-02T01:20:30+08:00'
updated: '2026-08-02T01:21:07+08:00'
slug: deepseek-v4-flash-free
categories:
- "AI 与大模型"
description: "7月31日，OpenCode内置DeepSeek V4 Flash正式版免费模型，支持终端直接调用无需API Key或充值。安装方式适配Windows/Mac系统，三步操作即可使用：进入项目目录、切换模型、开始编码。模型在Agent编程基准测试中得分提升至54.4，隐私数据不存储，支持撤销与重做功能"
cover: "/wp-content/uploads/2026/08/image-7127d582e649c488fe9aca74155399e9.jpg"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/08/image-7127d582e649c488fe9aca74155399e9.jpg" alt="免费使用DeepSeek V4 Flash" /></p>

          
          
          

          
          

          
          
          
            
              
              
            
              
              
                
              
            
          

          
          

          
                                        

          
                    

          
                    
                    
          
          
          
          
          
                                                            <div class="rich_media_content js_underline_content
                       defaultNoSetting
            " id="js_content"><section style="max-width:100%;font-family:-apple-system,BlinkMacSystemFont,&apos;Segoe UI&apos;,&apos;PingFang SC&apos;,&apos;Hiragino Sans GB&apos;,&apos;Microsoft YaHei&apos;,sans-serif;color:#333;line-height:1.8;font-size:16px;padding:4px 0"><p style="margin:12px 0;color:#333"><span> 今天7月31号，两件事撞一起了：DeepSeek V4 Flash正式版发布，OpenCode第一时间内置免费模型。</span><strong><span>不用API Key，不用充值，终端打开就能用</span></strong><span>。 </span></p><p style="margin:10px 0;color:#333"><span> 先说结论：已经验证是真的。OpenCode官网写着"内置免费模型"，启动后按Tab键切换模型，列表里明确有"DeepSeek V4 Flash Free (New)"选项，就是截图里那个。 </span></p><p style="margin:10px 0;color:#333"><span> DeepSeek V4 Flash今天刚从预览版转正，编码能力不是一般地猛。DeepSWE这个Agent编程基准，预览版才7.3分，正式版直接干到54.4分，翻了7倍多。而且原生支持Responses API格式，跟Codex生态无缝对接。 </span></p><section style="text-align:center;margin:16px 0"><img alt="OpenCode界面" data-aistatus="1" data-ratio="0.5824074074074074" data-w="1080" style="max-width:100%;border-radius:6px" src="/wp-content/uploads/2026/08/640.jpg"></section><h2 style="font-size:18px;color:#1a1a1a;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #2563eb"><span> 怎么安装 </span></h2><p style="margin:10px 0;color:#333"><span> OpenCode是个开源的终端AI编程工具，GitHub上16万Star，750万月活开发者，不是什么野鸡软件。安装方式按你系统选一个： </span></p><section style="text-align:center;margin:16px 0"><img alt="安装命令" data-aistatus="1" data-ratio="0.5972222222222222" data-w="1080" style="max-width:100%;border-radius:6px" src="/wp-content/uploads/2026/08/640-1.jpg"></section><p style="margin:10px 0;color:#333"><strong><span>Windows用户</span></strong><span>推荐用npm装，先确保你装了Node.js，然后跑： </span></p>

```
<span>npm install -g opencode-ai</span>
```

<p style="margin:10px 0;color:#333"><span> 如果你用Chocolatey或Scoop，也能直接装。Mac用户用brew或者那个curl一键脚本都行。 </span></p><h2 style="font-size:18px;color:#1a1a1a;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #2563eb"><span> 怎么用 </span></h2><p style="margin:10px 0;color:#333"><span> 装好之后三步： </span></p><p style="margin:10px 0;color:#333"><strong><span>第一步，进项目目录</span></strong><span>，终端里cd到你想让AI帮你写代码的文件夹： </span></p>

```
<span>cd your-project-folder opencode</span>
```

<p style="margin:10px 0;color:#333"><strong><span>第二步，切换模型</span></strong><span>。启动后按</span><strong><span>Tab键</span></strong><span>，在模型列表里找到"DeepSeek V4 Flash Free (New)"，选中它。不需要配置任何API Key，不需要登录，直接选了就能用。 </span></p><p style="margin:10px 0;color:#333"><strong><span>第三步，开始用</span></strong><span>。第一次用建议先跑一下</span><code style="background:#f0f0f0;padding:2px 6px;border-radius:3px;font-size:14px"><span>/init</span></code><span>，它会分析你的项目结构生成AGENTS.md，之后用起来更准。然后你就可以直接跟它说话了： </span></p>

```
<span>帮我在@src/App.tsx里加一个暗黑模式切换按钮 重构一下这个函数，性能太差了 这个报错怎么修：TypeError: Cannot read properties of undefined</span>
```

<p style="margin:10px 0;color:#333"><span> 它跟ChatGPT写代码不一样。OpenCode是Agent模式，能直接读你项目文件、执行终端命令、修改代码。Tab键还能切换Plan（只规划不改代码）和Build（直接改）两种模式，先用Plan看方案，满意了再切Build让它动手，不会乱改。 </span></p><section style="text-align:center;margin:16px 0"><img alt="功能亮点" data-aistatus="1" data-ratio="0.5166666666666667" data-w="1080" style="max-width:100%;border-radius:6px" src="/wp-content/uploads/2026/08/640-2.jpg"></section><h2 style="font-size:18px;color:#1a1a1a;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #2563eb"><span> 几个要点 </span></h2><p style="margin:10px 0;color:#333"><strong><span>关于免费</span></strong><span>：DeepSeek V4 Flash Free是内置免费模型，现在就能用，没有额度限制的公告。但毕竟是免费通道，用的人多了可能会排队或者限速，趁早上车。 </span></p><p style="margin:10px 0;color:#333"><strong><span>关于隐私</span></strong><span>：OpenCode本身不存你的代码，免费模型走的是DeepSeek的API。如果是公司项目，注意公司的数据安全政策。个人项目随便用。 </span></p><p style="margin:10px 0;color:#333"><strong><span>关于桌面版</span></strong><span>：官网也有桌面Beta版可以下载，不想用终端的可以去opencode.ai/download拿，但终端版是最成熟的。 </span></p><p style="margin:10px 0;color:#333"><strong><span>改坏了怎么办</span></strong><span>：输</span><code style="background:#f0f0f0;padding:2px 6px;border-radius:3px;font-size:14px"><span>/undo</span></code><span>撤销，或者</span><code style="background:#f0f0f0;padding:2px 6px;border-radius:3px;font-size:14px"><span>/redo</span></code><span>重做，跟git一样可以一步步回退。建议用之前确保git是干净的，方便整体回滚。 </span></p><p style="background:#ecfdf5;border-left:4px solid #10b981;padding:12px 14px;border-radius:4px;margin:18px 0 8px;color:#333;font-size:14px"><strong><span>一句话总结</span></strong><span>：今天刚出的福利，OpenCode免费送DeepSeek V4 Flash正式版，不用花钱不用折腾Key，npm装完Tab选模型直接用。对于经常写代码的人来说，这波白嫖很香。 </span></p><p style="margin:10px 0;color:#999;font-size:13px;text-align:center;margin-top:24px"><strong style="margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: #2563eb;font-family: &quot;PingFang SC NEW&quot;, system-ui, -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;font-size: 14px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;white-space: normal;background-color: #ffffff;text-decoration-style: initial;text-decoration-color: initial" data-pm-slice="0 0 []"><span style="margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important">关注「柒柒进阶社」</span></strong><span style="margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: #2563eb;font-family: &quot;PingFang SC NEW&quot;, system-ui, -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;font-size: 14px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;background-color: #ffffff;text-decoration-style: initial;text-decoration-color: initial"><br></span><span style="margin: 0px;padding: 0px;outline: 0px;max-width: 100%;box-sizing: border-box !important;overflow-wrap: break-word !important;color: #2563eb;font-family: &quot;PingFang SC NEW&quot;, system-ui, -apple-system, BlinkMacSystemFont, &quot;Helvetica Neue&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, Arial, sans-serif;font-size: 14px;font-style: normal;font-variant-ligatures: normal;font-variant-caps: normal;font-weight: 400;letter-spacing: 0.544px;orphans: 2;text-align: center;text-indent: 0px;text-transform: none;widows: 2;word-spacing: 0px;background-color: #ffffff;text-decoration-style: initial;text-decoration-color: initial">每天一条干货，不灌水</span></p><p style="margin:10px 0;color:#999;font-size:13px;text-align:center;margin-top:24px"><span> — END — </span></p></section></div>
          
        

文章来源：<a href="https://mp.weixin.qq.com/s/8xIHMKIPMfYXF1bgKhAnrg" target="_blank" rel="nofollow" title="https://mp.weixin.qq.com/s/8xIHMKIPMfYXF1bgKhAnrg">mp.weixin.qq.com</a>
