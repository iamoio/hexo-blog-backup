---
title: "DeepSeek Harness 完整教程：安装、配置与 5 个实战任务全解析 | GKMix"
date: '2026-08-15T09:10:57+08:00'
updated: '2026-08-15T09:11:14+08:00'
slug: deepseek-harness-complete-tutorial-installation
categories:
- "AI 与大模型"
description: "2026年8月13日，DeepSeek在GitHub开源AI Agent框架Harness，一天获6万Star。该框架采用Cordis内核与插件化架构，模型负责推理、插件负责执行，实现\"一切皆插件\"的设计理念。支持Mac/Windows/Linux全平台，一行命令即可启动。框架具备完整可追溯的会话日"
cover: "/wp-content/uploads/2026/08/cover-deepseek-harness-guide.webp"

---

<div class="gk-article">
<p>  <img src="/wp-content/uploads/2026/08/cover-deepseek-harness-guide.webp" alt="DeepSeek Harness 完整教程封面：什么是 AI Agent、怎么装、怎么用" style="aspect-ratio: 16/9;object-fit: cover" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 1"></p>
<div class="gk-summary">
    2026 年 8 月 13 日，DeepSeek 在 GitHub 上开源了 Harness，一天斩获 6 万 Star。
<p>    这篇文章从零开始，把 DeepSeek Harness 是什么、为什么值得关注、怎么在 Mac 和 Windows 上装、怎么配置、怎么用、有哪些坑、和其他 Agent 框架怎么选，逐一讲清楚。读完这一篇，从安装到上手都能搞定。
  </p></div>
<h2><span class="ez-toc-section" id="%E4%B8%80%E3%80%81AI_Agent_%E6%98%AF%E4%BB%80%E4%B9%88%EF%BC%9F%E5%92%8C_AI_%E5%AF%B9%E8%AF%9D%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB%EF%BC%9F"></span>一、AI Agent 是什么？和 AI 对话有什么区别？<span class="ez-toc-section-end"></span></h2>
<p>先说清楚概念。很多人把 AI Agent 和 AI Chat 搞混了，觉得都是”跟 AI 说话”。其实差别很大，这直接决定了 DeepSeek Harness 能干什么、不能干什么。</p>
<p><strong>AI Chat</strong>（DeepSeek 网页版、ChatGPT 等）：你问，它答。你问”帮我写个 Python 爬虫”，它给你一段代码。你复制粘贴到自己电脑上，跑一下，报错了，截图回去问它，它给你改，你再跑……来回三五次才能用。</p>
<p><strong>AI Agent</strong>：你给目标，它自己干。同样一句话，Agent 会自己创建文件、自己写代码、自己运行、自己看报错、自己改。你最后打开文件确认一下就行。</p>
<p>用一个生活化的比喻：AI Chat 是一个你打电话问问题的专家，AI Agent 是一个坐在你旁边的实习生，你告诉它要做什么，它自己动手干，遇到不确定的会来问你。</p>
<p>DeepSeek Harness 就是帮你在自己电脑上搭这样一个”AI 实习生”的开源框架。</p>
<h2><span class="ez-toc-section" id="%E4%BA%8C%E3%80%81DeepSeek_Harness_%E6%98%AF%E4%BB%80%E4%B9%88"></span>二、DeepSeek Harness 是什么<span class="ez-toc-section-end"></span></h2>
<p>DeepSeek Harness（简称 dsh）是 DeepSeek 团队在 2026 年 8 月 13 日开源的 AI Agent 框架。GitHub 地址：<a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener">github.com/deepseek-ai/deepseek-harness</a>。</p>
<p>官方给的定位是：<strong>Agent = Model + Harness</strong>。模型负责”想”（推理、理解、决策），Harness 负责”做”（读文件、写代码、跑命令、调用工具）。</p>
<p>核心设计理念：<strong>一切皆插件</strong>。模型、工具、技能、会话、存储、UI，全部是可替换的插件，基于 <a href="https://github.com/cordiverse/cordis" target="_blank" rel="noopener">Cordis</a> 内核。你想搭一个写代码的 Agent，装一套编程插件。想搭一个做研究的 Agent，换一套搜索和文档插件。底层同一套系统，换配置文件就行，不用改代码。</p>
<p>MIT 开源协议，TypeScript 编写，Mac / Windows / Linux 全平台支持。</p>
<p>官方同时上线了完整的 Harness 官网，网页端和移动端都做了适配，文档、社区入口都在上面。</p>
<p>  <img src="/wp-content/uploads/2026/08/deepseek-harnessE5AE98E7BD91-E7BD91E9A1B5E7ABAF.webp" alt="DeepSeek Harness 官网网页端截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 2"></p>
<p>  <img src="/wp-content/uploads/2026/08/deepseek-harnessE5AE98E7BD91-E6898BE69CBAE7ABAF.webp" alt="DeepSeek Harness 官网手机端截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 3"></p>
<h2><span class="ez-toc-section" id="%E4%B8%89%E3%80%81%E4%B8%BA%E4%BB%80%E4%B9%88%E5%80%BC%E5%BE%97%E5%85%B3%E6%B3%A8"></span>三、为什么值得关注<span class="ez-toc-section-end"></span></h2>
<p>市面上 Agent 框架已经不少了，Claude Code、AutoGPT、CrewAI、LangChain Agent 都有。为什么 DeepSeek Harness 发布一天就能拿 6 万 Star？</p>
<h3><span class="ez-toc-section" id="31_%E6%8F%92%E4%BB%B6%E5%8C%96%E5%81%9A%E5%88%B0%E4%BA%86%E6%9E%81%E8%87%B4"></span>3.1 插件化做到了极致<span class="ez-toc-section-end"></span></h3>
<p>传统 Agent 框架的功能是写死的。你想加一个新工具，得改代码、处理依赖、测试兼容。DeepSeek Harness 的所有能力都是 Cordis 插件，想加能力就装插件，想换模型改配置，想换 UI 换插件。源码一行不用碰。</p>
<p>这意味着一个底层框架可以快速变出不同用途的 Agent：写代码的、做研究的、管文件的、跑测试的。同一套系统，不同插件组合。</p>
<h3><span class="ez-toc-section" id="32_%E5%AE%8C%E6%95%B4%E5%8F%AF%E8%BF%BD%E6%BA%AF"></span>3.2 完整可追溯<span class="ez-toc-section-end"></span></h3>
<p>这是用过多个 Agent 框架之后最看重的特性。Agent 跑的时候到底在想什么？调了哪些工具？每一步的输入输出是什么？</p>
<p>DeepSeek Harness 把每次运行的所有行为，包括系统提示词、思维链推理、工具调用及其结果、子 agent 调度，全部记录在 append-only 的 session log 里。出了问题可以回放（replay）、可以分叉（fork）、可以检索（search）。</p>
<p>AutoGPT 最大的问题就是不知道 Agent 在干嘛。Harness 解决了这个问题。</p>
<h3><span class="ez-toc-section" id="33_%E4%B8%80%E8%A1%8C%E5%91%BD%E4%BB%A4%E5%90%AF%E5%8A%A8"></span>3.3 一行命令启动<span class="ez-toc-section-end"></span></h3>
<p>不需要 Docker、不需要配环境变量、不需要克隆仓库。前提是有 Node.js，一行 <code>npx @deepseek-ai/dsh web</code> 就启动了。十分钟从零装好。</p>
<h3><span class="ez-toc-section" id="34_%E5%A4%9A%E7%A7%8D%E8%BF%90%E8%A1%8C%E6%A8%A1%E5%BC%8F"></span>3.4 多种运行模式<span class="ez-toc-section-end"></span></h3>
<div class="gk-table-wrapper">
<table class="gk-table">
<thead>
<tr>
<th>模式</th>
<th>适合谁</th>
<th>特点</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>标准模式</strong></td>
<td>日常开发</td>
<td>完整编程 Agent：读写文件、跑命令、检索网页、规划任务、调度子 Agent</td>
</tr>
<tr>
<td><strong>PTC 模式</strong></td>
<td>自动化工作流</td>
<td>用 TypeScript 程序组合多步操作，适合把多个工具串起来自动执行的场景</td>
</tr>
<tr>
<td><strong>极简模式</strong></td>
<td>模型测试</td>
<td>只保留持久化终端和文本编辑器，排除所有工具干扰，纯粹测试模型编程能力</td>
</tr>
<tr>
<td><strong>创造模式</strong></td>
<td>插件开发</td>
<td>可检查运行时状态、实验插件、组合新的 Agent 预设，适合开发者做 Agent 设计</td>
</tr>
</tbody>
</table></div>
<h2><span class="ez-toc-section" id="%E5%9B%9B%E3%80%81Mac_%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B%EF%BC%88%E8%AF%A6%E7%BB%86%E7%89%88%EF%BC%89"></span>四、Mac 安装教程（详细版）<span class="ez-toc-section-end"></span></h2>
<h3><span class="ez-toc-section" id="41_%E5%89%8D%E6%8F%90%EF%BC%9A%E8%A3%85_Nodejs"></span>4.1 前提：装 Node.js<span class="ez-toc-section-end"></span></h3>
<p>DeepSeek Harness 运行在 Node.js 环境上。先检查你的 Mac 上有没有：</p>

```
node --version
```

<p>如果输出类似 <code>v22.x.x</code>，说明已经装好了，跳到 4.2。</p>
<p>如果提示 <code>command not found</code>，需要先装 Node.js。有三种方式：</p>
<p><strong>方式 A：Homebrew（推荐，如果你已经装了 Homebrew）</strong></p>

```
brew install node
```

<p>大概 1-2 分钟。装完验证：</p>

```
node --version
npm --version
```

<p><strong>方式 B：nvm（Node 版本管理器，适合需要切换 Node 版本的开发者）</strong></p>

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

<p>装完重启终端，然后：</p>

```
nvm install --lts
nvm use --lts
```

<p><strong>方式 C：官网下载（最简单）</strong></p>
<p>去 <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a>，下载 LTS 版本的 macOS 安装包（.pkg），双击安装，一路继续。</p>
<h3><span class="ez-toc-section" id="42_%E5%90%AF%E5%8A%A8_DeepSeek_Harness"></span>4.2 启动 DeepSeek Harness<span class="ez-toc-section-end"></span></h3>
<p>打开终端，一行命令：</p>

```
npx @deepseek-ai/dsh web
```

<p>第一次运行会自动下载依赖，需要几分钟，取决于你的网速。下载完成后终端会打印：</p>

```
Server running at http://127.0.0.1:3080
```

<p>  <img src="/wp-content/uploads/2026/08/deepseek-harnessE5AE89E8A385E591BDE4BBA4.webp" alt="DeepSeek Harness 安装命令终端截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 4"></p>
<h3><span class="ez-toc-section" id="43_%E9%85%8D%E7%BD%AE_DeepSeek_API_Key"></span>4.3 配置 DeepSeek API Key<span class="ez-toc-section-end"></span></h3>
<p>浏览器打开 <code>http://127.0.0.1:3080</code>，进入 Web UI。</p>
<p>点右上角 <strong>Settings → Models</strong>，填入你的 DeepSeek API Key，保存。模型路由立刻生效，不需要重启。</p>
<p>还没有 Key？可以先看这篇 <a href="https://gkmix.com/deepseek-api-chatbox-setup/">DeepSeek API 完整配置教程</a> 拿到 Key，或者直接去 <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a> 注册。新用户有免费额度（具体以官方公告为准）。用完之后按量付费，DeepSeek 的 API 价格在主流模型里算便宜的。</p>
<p>  <img src="/wp-content/uploads/2026/08/claude-code-deepseek-api-key-scaled-1.webp" alt="DeepSeek Harness 配置 API Key 截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 5"></p>
<h3><span class="ez-toc-section" id="44_%E9%80%89%E5%B7%A5%E4%BD%9C%E7%9B%AE%E5%BD%95"></span>4.4 选工作目录<span class="ez-toc-section-end"></span></h3>
<p>点击 <strong>Select Workspace</strong>，选一个你电脑上的文件夹。这就是 Agent 的”工作区”，它会在这个目录下读写文件。</p>
<p>建议先用一个测试项目目录，不要直接往正式项目上扔。</p>
<p>  <img src="/wp-content/uploads/2026/08/deepseek-harnessE98089E5B7A5E4BD9CE79BAEE5BD95.webp" alt="DeepSeek Harness 选择工作目录截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 6"></p>
<h3><span class="ez-toc-section" id="45_%E7%AC%AC%E4%B8%80%E4%B8%AA%E4%BB%BB%E5%8A%A1"></span>4.5 第一个任务<span class="ez-toc-section-end"></span></h3>
<p>选完工作目录后，对话框就可以输入了。试试这个：</p>

```
帮我读一下当前目录的 README 文件，总结它的核心功能，用中文回答。
```

<p>Agent 会自己读文件、分析内容、写总结。整个过程你不需要做任何操作。</p>
<p>  <img src="/wp-content/uploads/2026/08/deepseek-harnessE7ACACE4B880E4B8AAE4BBBBE58AA1.webp" alt="DeepSeek Harness 执行第一个任务截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 7"></p>
<h2><span class="ez-toc-section" id="%E4%BA%94%E3%80%81Windows_%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B%EF%BC%88%E8%AF%A6%E7%BB%86%E7%89%88%EF%BC%89"></span>五、Windows 安装教程（详细版）<span class="ez-toc-section-end"></span></h2>
<h3><span class="ez-toc-section" id="51_%E8%A3%85_Nodejs"></span>5.1 装 Node.js<span class="ez-toc-section-end"></span></h3>
<p>去 <a href="https://nodejs.org" target="_blank" rel="noopener">nodejs.org</a> 下载 LTS 版本的 Windows 安装包（.msi）。双击安装，一路 Next。</p>
<p>安装完成后，打开 PowerShell（按 Win+X 选”终端”），验证：</p>

```
node --version
npm --version
```

<p>两个命令都有版本号输出就对了。</p>
<h3><span class="ez-toc-section" id="52_%E5%90%AF%E5%8A%A8"></span>5.2 启动<span class="ez-toc-section-end"></span></h3>

```
npx @deepseek-ai/dsh web
```

<p>第一次运行会下载依赖，等几分钟。完成后浏览器打开 <code>http://127.0.0.1:3080</code>。</p>
<h3><span class="ez-toc-section" id="53_%E5%90%8E%E7%BB%AD%E9%85%8D%E7%BD%AE"></span>5.3 后续配置<span class="ez-toc-section-end"></span></h3>
<p>和 Mac 完全一样：Settings → Models → 填 API Key → 选工作目录 → 开始用。Linux 用户也是走 Mac 那套流程，命令完全一致。</p>
<div class="gk-tip">
    💡 <strong>Windows 用户注意</strong>：如果你的公司电脑限制了 npm 的安装权限，尝试用管理员权限打开 PowerShell 再跑命令。如果还是不行，可以考虑用 <a href="https://github.com/nvm-sh/nvm" target="_blank" rel="noopener">nvm-windows</a> 来管理 Node.js。
  </div>
<h2><span class="ez-toc-section" id="%E5%85%AD%E3%80%81%E5%AE%9E%E9%99%85%E6%B5%8B%E8%AF%95%EF%BC%9A%E6%88%91%E8%B7%91%E4%BA%86%E4%BA%94%E4%B8%AA%E4%BB%BB%E5%8A%A1"></span>六、实际测试：我跑了五个任务<span class="ez-toc-section-end"></span></h2>
<p>装好之后我做了五个测试，从简单到复杂，看看 DeepSeek Harness 到底能做什么。</p>
<h3><span class="ez-toc-section" id="%E6%B5%8B%E8%AF%95_1%EF%BC%9A%E8%AF%BB_README_%E6%80%BB%E7%BB%93%E5%8A%9F%E8%83%BD"></span>测试 1：读 README 总结功能<span class="ez-toc-section-end"></span></h3>
<p><strong>任务</strong>：读当前目录的 README，总结核心功能。</p>
<p><strong>结果</strong>：30 秒出结果。Agent 自己读了文件、分析了结构、列出了主要模块。准确，没有遗漏。</p>
<h3><span class="ez-toc-section" id="%E6%B5%8B%E8%AF%95_2%EF%BC%9A%E6%89%BE_bug_%E5%B9%B6%E4%BF%AE%E5%A5%BD"></span>测试 2：找 bug 并修好<span class="ez-toc-section-end"></span></h3>
<p><strong>任务</strong>：给了一段有 bug 的 Python 脚本（一个文件遍历函数，有两个逻辑错误：路径拼接用了字符串拼接而不是 os.path.join，以及没有处理文件不存在的情况）。</p>
<p><strong>结果</strong>：Agent 先读了代码，找到两个问题，写了原因解释，然后自动修改了文件。改完我检查了一遍，逻辑没问题。用了大约 2 分钟。</p>
<h3><span class="ez-toc-section" id="%E6%B5%8B%E8%AF%95_3%EF%BC%9A%E6%95%B4%E7%90%86%E6%96%87%E4%BB%B6%E5%A4%B9"></span>测试 3：整理文件夹<span class="ez-toc-section-end"></span></h3>
<p><strong>任务</strong>：”帮我把 screenshots 文件夹里的图片按拍摄日期重命名，格式为 YYYY-MM-DD_序号.jpg。”</p>
<p><strong>结果</strong>：Agent 自己写了 Python 脚本（读 EXIF 日期信息、排序、重命名），运行，检查输出。全程我只说了一句话。脚本还处理了没有 EXIF 信息的情况，用文件修改时间作为备用。</p>
<h3><span class="ez-toc-section" id="%E6%B5%8B%E8%AF%95_4%EF%BC%9A%E5%86%99%E5%8D%95%E5%85%83%E6%B5%8B%E8%AF%95"></span>测试 4：写单元测试<span class="ez-toc-section-end"></span></h3>
<p><strong>任务</strong>：”帮我给 utils.py 里的三个函数写单元测试。”</p>
<p><strong>结果</strong>：Agent 读了 utils.py，理解了每个函数的功能和边界情况，写了 pytest 测试文件，还自己跑了测试确认全部通过。测试覆盖了正常输入、空输入、异常输入三种情况。</p>
<h3><span class="ez-toc-section" id="%E6%B5%8B%E8%AF%95_5%EF%BC%9A%E4%BB%A3%E7%A0%81%E9%87%8D%E6%9E%84"></span>测试 5：代码重构<span class="ez-toc-section-end"></span></h3>
<p><strong>任务</strong>：”这个项目的配置管理太乱了，帮我重构一下，把散落在各处的配置统一放到 config.py 里。”</p>
<p><strong>结果</strong>：Agent 先读了整个项目的文件结构，找到所有硬编码的配置项，创建了 config.py，然后逐个修改引用。最后自己跑了项目确认没有报错。这个任务最复杂，花了大约 5 分钟。</p>
<p>  <img src="/wp-content/uploads/2026/08/deepseek-harnessE8BF90E8A18CE79C9FE5AE9EE4BBBBE58AA1.webp" alt="DeepSeek Harness 实际测试结果截图" style="max-width: 100%;height: auto" title="DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows） 8"></p>
<h2><span class="ez-toc-section" id="%E4%B8%83%E3%80%81%E4%BB%8E%E6%BA%90%E7%A0%81%E6%9E%84%E5%BB%BA%EF%BC%88%E5%8F%AF%E9%80%89%EF%BC%89"></span>七、从源码构建（可选）<span class="ez-toc-section-end"></span></h2>
<p>如果你想参与开发或者需要修改源码，可以从 GitHub 克隆：</p>

```
git clone https://github.com/deepseek-ai/deepseek-harness.git
cd deepseek-harness
pnpm install
pnpm run build
pnpm dsh web
```

<p>需要先装 <a href="https://pnpm.io" target="_blank" rel="noopener">pnpm</a>（<code>npm install -g pnpm</code>）。</p>
<h2><span class="ez-toc-section" id="%E5%85%AB%E3%80%81%E9%85%8D%E7%BD%AE%E9%80%89%E9%A1%B9%E8%AF%A6%E8%A7%A3"></span>八、配置选项详解<span class="ez-toc-section-end"></span></h2>
<h3><span class="ez-toc-section" id="81_%E6%A8%A1%E5%9E%8B%E9%85%8D%E7%BD%AE"></span>8.1 模型配置<span class="ez-toc-section-end"></span></h3>
<p>Settings → Models 页面可以添加多个模型提供商。DeepSeek Harness 支持 DeepSeek 官方 API 和其他 OpenAI 兼容的端点。如果你有自己的私有部署，也可以填自定义 endpoint。</p>
<h3><span class="ez-toc-section" id="82_%E6%9D%83%E9%99%90%E7%AD%96%E7%95%A5"></span>8.2 权限策略<span class="ez-toc-section-end"></span></h3>
<p>Agent 在执行某些操作时（比如删除文件、运行 shell 命令），会根据权限策略决定是否需要你确认。你可以在 Settings 里调整权限级别：</p>
<ul>
<li><strong>宽松模式</strong>：大部分操作自动执行，适合你信任 Agent 的场景</li>
<li><strong>严格模式</strong>：所有写操作都需要你手动确认，适合正式项目</li>
</ul>
<h3><span class="ez-toc-section" id="83_%E6%8F%92%E4%BB%B6%E7%AE%A1%E7%90%86"></span>8.3 插件管理<span class="ez-toc-section-end"></span></h3>
<p>DeepSeek Harness 的所有功能都是 Cordis 插件。社区插件可以在 <a href="https://github.com/topics/dsh-plugin" target="_blank" rel="noopener">GitHub dsh-plugin 话题</a> 下找到。安装插件通常只需要在配置文件里加一行。</p>
<h2><span class="ez-toc-section" id="%E4%B9%9D%E3%80%81%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9%E5%92%8C%E5%B7%B2%E7%9F%A5%E9%99%90%E5%88%B6"></span>九、注意事项和已知限制<span class="ez-toc-section-end"></span></h2>
<p><strong>开发者预览版。</strong>官方明确说了”会有不兼容的变化”。不建议拿来跑生产环境的项目，自己学习、体验、折腾可以。</p>
<p><strong>需要 DeepSeek API Key。</strong>模型推理走云端 API，不是本地运行。这意味着你每次让 Agent 做事都会消耗 API 额度。DeepSeek 的价格不贵，但如果你让 Agent 跑复杂任务（比如重构整个项目），消耗会比较大。</p>
<p><strong>Agent 会读写你的文件。</strong>跑的时候真的会改你电脑上的文件。建议先在测试项目里试，别直接往正式代码上扔。如果你用 git 管理项目，跑之前先 commit，方便回退。</p>
<p><strong>网络依赖。</strong>npx 首次运行需要下载依赖，后续启动也需要网络连接（API 调用）。断网环境下无法使用。</p>
<h2><span class="ez-toc-section" id="%E5%8D%81%E3%80%81DeepSeek_Harness_vs_%E5%85%B6%E4%BB%96_Agent_%E6%A1%86%E6%9E%B6"></span>十、DeepSeek Harness vs 其他 Agent 框架<span class="ez-toc-section-end"></span></h2>
<div class="gk-table-wrapper">
<table class="gk-table">
<thead>
<tr>
<th>框架</th>
<th>核心优势</th>
<th>局限</th>
<th>适合谁</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>DeepSeek Harness</strong></td>
<td>插件化极致、完整可追溯、一行命令启动、MIT 开源</td>
<td>开发者预览、依赖 DeepSeek API</td>
<td>想折腾 Agent 的开发者</td>
</tr>
<tr>
<td>Claude Code</td>
<td>终端里的编程 Agent，深度集成 Claude 模型</td>
<td>需要 Anthropic API，闭源</td>
<td>Claude 生态用户</td>
</tr>
<tr>
<td>OpenAI Codex</td>
<td>OpenAI 官方 Agent，和 GPT 模型深度集成</td>
<td>需要 OpenAI API</td>
<td>OpenAI 生态用户</td>
</tr>
<tr>
<td>AutoGPT</td>
<td>最早火的 Agent 框架（2023）</td>
<td>不稳定、难调试、社区活跃度下降</td>
<td>历史参考</td>
</tr>
<tr>
<td>CrewAI</td>
<td>多 Agent 协作编排</td>
<td>调试困难、文档不够完善</td>
<td>需要多 Agent 协作的场景</td>
</tr>
<tr>
<td>LangChain Agent</td>
<td>生态丰富、社区大</td>
<td>抽象层太厚、上手门槛高</td>
<td>需要复杂工具链的项目</td>
</tr>
</tbody>
</table></div>
<p>如果你已经在用 Claude Code，可以看这篇 <a href="https://gkmix.com/claude-code-deepseek-api-setup/">Claude Code + DeepSeek API 配置教程</a>，把后端换成 DeepSeek，成本能降一大截。</p>
<h2><span class="ez-toc-section" id="%E5%8D%81%E4%B8%80%E3%80%81%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98_FAQ"></span>十一、常见问题 FAQ<span class="ez-toc-section-end"></span></h2>
<p><strong>Q：DeepSeek Harness 免费吗？</strong></p>
<p>A：框架本身免费开源（MIT 协议）。但模型推理需要 DeepSeek API，按量付费。新用户有免费额度。</p>
<p><strong>Q：没有 DeepSeek API Key 能用吗？</strong></p>
<p>A：不能。Harness 是框架，模型推理走云端 API。去 <a href="https://platform.deepseek.com" target="_blank" rel="noopener">platform.deepseek.com</a> 注册。</p>
<p><strong>Q：能用其他模型吗？</strong></p>
<p>A：支持 OpenAI 兼容的 API 端点，可以在 Settings 里配置自定义 provider。具体看官方文档的 providers 指南。</p>
<p><strong>Q：Agent 会不会删我的文件？</strong></p>
<p>A：会。Agent 有完整的文件读写权限。建议在测试目录里用，正式项目先 commit 再跑。</p>
<p><strong>Q：和 DeepSeek 网页版有什么区别？</strong></p>
<p>A：网页版是 AI Chat（你问它答）。Harness 是 AI Agent（你给目标，它自己干）。Agent 能读写文件、跑命令、调用工具，网页版做不到。</p>
<p><strong>Q：我的电脑配置够吗？</strong></p>
<p>A：DeepSeek Harness 本身对电脑配置要求不高（它只是框架，模型推理在云端）。能跑 Node.js 的电脑就行。但如果你同时跑很多插件或子 Agent，内存消耗会大一些。</p>
<p><strong>Q：Windows 能用吗？</strong></p>
<p>A：能。装好 Node.js 后和 Mac 完全一样。</p>
<p><strong>Q：支持中文吗？</strong></p>
<p>A：支持。你可以用中文给 Agent 下任务，它会用中文回复。DeepSeek 模型的中文能力很强。</p>
<h2><span class="ez-toc-section" id="%E5%8D%81%E4%BA%8C%E3%80%81%E6%88%91%E7%9A%84%E5%88%A4%E6%96%AD"></span>十二、我的判断<span class="ez-toc-section-end"></span></h2>
<p>DeepSeek Harness 的定位很清楚：<strong>它不是给普通用户用的聊天工具，是给开发者搭 Agent 的基础设施。</strong></p>
<p>如果你平时写代码、做项目、管文件，值得今天就装上试试。一行命令，十分钟装好，半小时跑完测试。</p>
<p>如果你不写代码，可以先观望。等社区生态起来了，会有更傻瓜化的上层工具出现。但底层技术值得了解，因为 AI Agent 是接下来几年最重要的技术方向之一。</p>
<p>如果你是那种”想第一时间知道 AI 界在发生什么”的人，DeepSeek Harness 是 2026 年下半年最值得关注的开源项目之一。一天 6 万 Star 不是偶然的。</p>
<div class="gk-cta">
<p>觉得有用？还有这些你可能会喜欢：</p>
<ul>
<li><a href="https://gkmix.com/claude-code-deepseek-api-setup/">Claude Code + DeepSeek API 配置教程</a> — 用 DeepSeek API 跑顶级 AI 编程</li>
<li><a href="https://gkmix.com/deepseek-api-chatbox-setup/">DeepSeek API 完整配置教程</a> — 5 分钟拿到 API Key，不需要懂代码</li>
<li><a href="https://gkmix.com/ai-prompt-tips-guide/">AI 提示词技巧指南</a> — 6 个模板让 AI 输出质量翻倍</li>
</ul>
<p></p>
<p>关注公众号，回复 “DeepSeek” 获取完整安装指南 + 配置教程 + 常见报错解决方案。</p>
<p>    <a href="https://gkmix.com/wechat" target="_blank">关注公众号 →</a>
  </p></div>
</div>
<div style="margin-top:40px;padding:16px 20px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;color:#64748b;line-height:1.8">
            <strong style="color:#475569">© 2026 DeepSeek Harness 完整教程：什么是 AI Agent、怎么装、怎么用（Mac / Windows）</strong> ·
            本文由 <strong style="color:#475569">GK</strong> 原创撰写，发布于 <a href="https://gkmix.com/" style="color:#2563eb">gkmix.com</a>。
            未经授权禁止转载、洗稿、机器抓取。AI 训练数据使用需获得书面授权。
        </div>		

文章来源：<a href="https://gkmix.com/deepseek-harness-guide/" target="_blank" rel="nofollow" title="https://gkmix.com/deepseek-harness-guide/">gkmix.com</a>
