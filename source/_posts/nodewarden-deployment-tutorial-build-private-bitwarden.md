---
title: "NodeWarden 部署教程：零成本搭建私有 Bitwarden 密码管理器，无需服务器，使用 Cloudflare"
date: '2026-08-19T05:04:13+08:00'
updated: '2026-08-23T09:20:10+08:00'
slug: nodewarden-deployment-tutorial-build-private-bitwarden
categories:
- "建站与运维"
description: "NodeWarden是一款可部署在Cloudflare Workers上的免费Bitwarden自建方案，无需VPS即可零成本实现完整密码管理功能。支持官方客户端同步、自动填充、云端备份及TOTP双重验证，兼容所有Bitwarden客户端，个人单用户场景功能完备，比Vaultwarden更轻量。"
cover: "/wp-content/uploads/2026/08/20260416231545122.webp"

---

<p class="wx-cover" style="text-align:center;margin:0 auto 18px">
<img src="/wp-content/uploads/2026/08/20260416231545122.webp" alt="封面" style="max-width:100%;height:auto;display:block;margin:0 auto">
</p>

<h1 id="NodeWarden"><a href="#NodeWarden" class="headerlink" title="NodeWarden"></a>NodeWarden</h1><p>想找免费的 Bitwarden 自建方案？这篇文章会手把手教你如何部署使用 NodeWarden，在 Cloudflare Workers 上 <strong>零成本搭建一个属于自己的密码管理器</strong> ，全程无需 VPS 服务器。</p>
<p>相比传统部署方式，这套方案不仅完全免费，还支持官方客户端同步、自动填充、云端备份以及 TOTP 双重验证，几乎可以替代官方付费功能，非常适合个人长期使用。</p>
<p>我们都知道，Bitwarden 是目前最受欢迎的开源密码管理器之一，但过去自建往往需要一台长期运行的 VPS 服务器，既麻烦又有成本。</p>
<p>而现在大佬更进一步用 NodeWarden 直接把 Bitwarden 服务端搬到了 “赛博大善人” Cloudflare 的 Workers 上，让我们可以用 <strong>零服务器成本实现完整功能</strong> 。</p>
<p>部署 NodeWarden 完成后，你就可以在手机、电脑、浏览器插件中无缝使用 Bitwarden，实现密码同步、自动填充等功能，在这里统统 <strong>直接白嫖</strong> 爽翻～</p>
<blockquote>
<p><strong>为什么选择 NodeWarden？</strong></p>
<ul>
<li><strong>费用：</strong> 0元（利用 Cloudflare Workers 免费额度）</li>
<li><strong>性能：</strong> 极速（部署在 CF 全球边缘节点）</li>
<li><strong>安全：</strong> 私有化部署，数据存储在自己的 CF D1/KV 数据库</li>
<li><strong>兼容性：</strong> 支持所有 Bitwarden 官方客户端（iOS/Android/Chrome/桌面端）</li>
<li><strong>核心优势：</strong> 比 Vaultwarden 更轻量，完全不需要购买 VPS 服务器。</li>
</ul>
</blockquote>
<h2 id="NodeWarden-与-Bitwarden-官方服务端能力对比"><a href="#NodeWarden-%E4%B8%8E-Bitwarden-%E5%AE%98%E6%96%B9%E6%9C%8D%E5%8A%A1%E7%AB%AF%E8%83%BD%E5%8A%9B%E5%AF%B9%E6%AF%94" class="headerlink" title="NodeWarden 与 Bitwarden 官方服务端能力对比"></a>NodeWarden 与 Bitwarden 官方服务端能力对比</h2><p>在开搞之前，我们先看看这个 NodeWarden 版本，和官方版有什么区别。简单总结：<strong>个人单用户使用完美，企业/多人协作功能精简。</strong></p>
<table>
<thead>
<tr>
<th>能力</th>
<th>Bitwarden</th>
<th>NodeWarden</th>
<th>说明</th>
</tr>
</thead>
<tbody><tr>
<td>网页密码库</td>
<td>✅</td>
<td>✅</td>
<td><strong>原创Web Vault界面</strong></td>
</tr>
<tr>
<td>全量同步 <code>/api/sync</code></td>
<td>✅</td>
<td>✅</td>
<td>已针对官方客户端做兼容优化</td>
</tr>
<tr>
<td>附件上传 / 下载</td>
<td>✅</td>
<td>✅</td>
<td>Cloudflare R2 或 KV</td>
</tr>
<tr>
<td>Send</td>
<td>✅</td>
<td>✅</td>
<td>支持文本与文件 Send</td>
</tr>
<tr>
<td>导入 / 导出</td>
<td>✅</td>
<td>✅</td>
<td>支持 Bitwarden JSON / CSV / <strong>ZIP 导入（包括附件）</strong></td>
</tr>
<tr>
<td><strong>云端备份中心</strong></td>
<td>❌</td>
<td>✅</td>
<td><strong>支持 WebDAV / E3 定时备份</strong></td>
</tr>
<tr>
<td>密码提示（网页端）</td>
<td>⚠️ 有限</td>
<td>✅</td>
<td><strong>无需发送邮件</strong></td>
</tr>
<tr>
<td>TOTP / Steam TOTP</td>
<td>✅</td>
<td>✅</td>
<td>含 <code>steam://</code> 支持</td>
</tr>
<tr>
<td>多用户</td>
<td>✅</td>
<td>✅</td>
<td>支持邀请码注册</td>
</tr>
<tr>
<td>组织 / 集合 / 成员权限</td>
<td>✅</td>
<td>❌</td>
<td>未实现</td>
</tr>
<tr>
<td>登录 2FA</td>
<td>✅</td>
<td>⚠️ 部分支持</td>
<td>当前仅支持用户级 TOTP</td>
</tr>
<tr>
<td>SSO / SCIM / 企业目录</td>
<td>✅</td>
<td>❌</td>
<td>未实现</td>
</tr>
</tbody></table>
<p>可以看出，对于咱们个人日常使用，NodeWarden 的功能已经完全绰绰有余了！我甚至更喜欢这个，免费且能使用 <strong>云端备份</strong> 去掉了我之前的焦虑。</p>
<h2 id="NodeWarden-部署前准备"><a href="#NodeWarden-%E9%83%A8%E7%BD%B2%E5%89%8D%E5%87%86%E5%A4%87" class="headerlink" title="NodeWarden 部署前准备"></a>NodeWarden 部署前准备</h2><ol>
<li><strong>一个 Cloudflare 账号</strong><ul>
<li>需要拥有一个托管在 CF 上的 <strong>域名</strong>，没有域名可以查看 <a href="https://blog.zrf.me/p/Free-Domains/">最新免费域名资源汇总</a>（因为 CF 默认的 <code>workers.dev</code> 域名在国内访问是被阻断的）。</li>
<li>需要绑定信用卡或 PayPal（开通 R2储存桶 服务，免费额度对个人绝对够用，不会扣费）。</li>
</ul>
</li>
<li><strong>一个 GitHub 账号</strong><ul>
<li>用于 Fork 源码并授权一键部署。</li>
</ul>
</li>
</ol>
<h2 id="NodeWarden-部署教程"><a href="#NodeWarden-%E9%83%A8%E7%BD%B2%E6%95%99%E7%A8%8B" class="headerlink" title="NodeWarden 部署教程"></a>NodeWarden 部署教程</h2><h3 id="第一步：Fork-项目源码"><a href="#%E7%AC%AC%E4%B8%80%E6%AD%A5%EF%BC%9AFork-%E9%A1%B9%E7%9B%AE%E6%BA%90%E7%A0%81" class="headerlink" title="第一步：Fork 项目源码"></a>第一步：Fork 项目源码</h3><p>首先，我们需要把大佬的源码复刻到咱们自己的 GitHub 仓库里。</p>
<ol>
<li><p>打开 NodeWarden 的 GitHub 开源地址：<a target="_blank" rel="noopener" href="https://github.com/shuaiplus/NodeWarden">https://github.com/shuaiplus/NodeWarden</a></p>
</li>
<li><p>来到页面右上角，可以给大佬点个 <strong>Star</strong> ，然后 <strong>Fork</strong> 按钮，将项目复制到你自己的账号下。<br><img src="/wp-content/uploads/2026/08/20260328035657529.webp" alt="NodeWarden GitHub 源码 Fork 步骤"> </p>
</li>
<li><p>项目同步更新（可选）</p>
<ul>
<li>本来我这里写的是建议开启，但是由于自动同步更新，导致我创建的二十多个号通行密钥全部失效，我全部转移到此项目上，费了我老半天劲呢，我很难受！！！原由：<a target="_blank" rel="noopener" href="https://github.com/shuaiplus/nodewarden/commit/76623d72014efb994d390e9bcab019088fb219e3">重构：移除与密码相关的功能和类型</a> <strong>最新现已修复数据还在的，不难受了</strong></li>
<li>自动：进入你的 Fork 仓库 ➜ <code>Actions</code> ➜ <code>Sync upstream</code> ➜ <code>Enable workflow</code>，会在每天凌晨 3 点自动同步上游。<br><img src="/wp-content/uploads/2026/08/20260328040648270.webp" alt="NodeWarden GitHub 源码 项目同步更新1"><br><img src="/wp-content/uploads/2026/08/20260328040846436.webp" alt="NodeWarden GitHub 源码 项目同步更新2"></li>
</ul>
</li>
</ol>
<h3 id="第二步：一键部署到-Cloudflare"><a href="#%E7%AC%AC%E4%BA%8C%E6%AD%A5%EF%BC%9A%E4%B8%80%E9%94%AE%E9%83%A8%E7%BD%B2%E5%88%B0-Cloudflare" class="headerlink" title="第二步：一键部署到 Cloudflare"></a>第二步：一键部署到 Cloudflare</h3><p>这步非常丝滑，不需要你敲任何代码。但是要明确你的 Cloudflare 是否开通 R2 存储功能。没有就先去开通一下，需要绑卡，功能是免费的，如开通过一直下一步就可以了。</p>
<table>
<thead>
<tr>
<th>储存</th>
<th>是否需绑卡</th>
<th>单个附件/Send文件上限</th>
<th>免费额度</th>
</tr>
</thead>
<tbody><tr>
<td>R2</td>
<td>需要</td>
<td>100 MB（软限制可更改）</td>
<td>10 GB</td>
</tr>
<tr>
<td>KV</td>
<td>不需要</td>
<td>25 MiB（Cloudflare限制）</td>
<td>1 GB</td>
</tr>
</tbody></table>
<ol>
<li>打开 <a target="_blank" rel="noopener" href="https://dash.cloudflare.com/?to=/:account/workers-and-pages/create">Workers</a> ➜ <code>Continue with GitHub</code> ➜ 选择你 Fork 后的仓库（<code>NodeWarden</code>）➜ 下一步 ➜ （默认使用 R2 存储；若未开通，可用 KV 来代替，将<strong>部署命令</strong>改为 <code>npm run deploy:kv</code>）➜ 部署 ➜ 打开生成的链接</li>
</ol>
<p><img src="/wp-content/uploads/2026/08/20260328043332698.webp" alt="Cloudflare Workers 部署 NodeWarden 部署设置1"><br><img src="/wp-content/uploads/2026/08/20260328043419975.webp" alt="Cloudflare Workers 部署 NodeWarden 部署设置2"><br><img src="/wp-content/uploads/2026/08/20260328043458144.webp" alt="Cloudflare Workers 部署 NodeWarden 部署设置3"></p>
<h3 id="第三步：初始化设置与绑定域名"><a href="#%E7%AC%AC%E4%B8%89%E6%AD%A5%EF%BC%9A%E5%88%9D%E5%A7%8B%E5%8C%96%E8%AE%BE%E7%BD%AE%E4%B8%8E%E7%BB%91%E5%AE%9A%E5%9F%9F%E5%90%8D" class="headerlink" title="第三步：初始化设置与绑定域名"></a>第三步：初始化设置与绑定域名</h3><ol>
<li><p>部署成功后，Cloudflare 会为你分配一个类似 <code>nodewarden.xxx.workers.dev</code> 的域名地址。</p>
<blockquote>
<p><strong>注意：</strong><br>由于国内网络环境，<code>.workers.dev</code> 通常是打不开的。来到设置，找到 <strong>域和路由</strong> ➜  <strong>自定义域</strong> ，绑定一个你自己的二级域名（例如 <code>nodewarden.zrf.me</code>）。我就使用默认的来教程，自用建议绑定。</p>
</blockquote>
<p> <img src="/wp-content/uploads/2026/08/20260328044419790.webp" alt="设置自定义域名"></p>
</li>
<li><p>绑定好自定义域名后，用浏览器打开这个域名，你就会看到 NodeWarden 的页面。提示你 <strong>设置 JWT_SECRET</strong>：这是用于加密你的会话 Token 的密钥，系统会随机生成，复制下来我们按照页面中的提示去添加这个变量。<br><img src="/wp-content/uploads/2026/08/20260328045053658.webp" alt="Cloudflare Workers 部署 NodeWarden 部署 设置 JWT_SECRET 环境变量 1"></p>
</li>
<li><p>回到 Cloudflare 面板刚刚的 <code>nodewarden</code> 项目页面，点击顶部的 <strong>设置</strong>，找到 <strong>变量和机密</strong>，点击添加。按照下图所示填写：</p>
<ul>
<li><strong>类型</strong>：下拉选择 <strong>密钥</strong>（必须选 <strong>密钥</strong> 不然后期项目同步更新，变量：JWT_SECRET 会失效，别问我怎么知道）。</li>
<li><strong>变量名称</strong>：填入 <code>JWT_SECRET</code>。</li>
<li><strong>值</strong>：<strong>粘贴</strong>你刚才在第 2 步网页上复制的那串密钥。</li>
<li>填写完成后，点击<strong>部署</strong>保存即可。<br><img src="/wp-content/uploads/2026/08/20260328045828090.webp" alt="Cloudflare Workers 部署 NodeWarden 部署 设置 JWT_SECRET 环境变量 2"></li>
</ul>
</li>
<li><p>刷新域名地址，我们就来到项目首页了，去创建 <strong>主账号密码</strong>：<strong>关键！</strong> 这是你以后登录 Bitwarden 客户端的唯一账号和主密码，千万别忘了！创建完登录即可。<br><img src="/wp-content/uploads/2026/08/20260328052039316.webp" alt="NodeWarden 项目中 创建账户"></p>
</li>
<li><p>到这里项目部署就全部完成了，非常的简单。</p>
</li>
</ol>
<h2 id="NodeWarden-简单使用教程"><a href="#NodeWarden-%E7%AE%80%E5%8D%95%E4%BD%BF%E7%94%A8%E6%95%99%E7%A8%8B" class="headerlink" title="NodeWarden 简单使用教程"></a>NodeWarden 简单使用教程</h2><h3 id="1-设置二次验证"><a href="#1-%E8%AE%BE%E7%BD%AE%E4%BA%8C%E6%AC%A1%E9%AA%8C%E8%AF%81" class="headerlink" title="1. 设置二次验证"></a>1. 设置二次验证</h3><ol>
<li><p>来到项目 <strong>账户设置</strong> ➜  <strong>设置二次验证 (TOTP)</strong> ：强烈建议开启！有些小伙伴可能对 TOTP 不太熟，其实它就是咱们常说的 <strong>2FA 双重身份验证</strong>，支持 <strong>Google Authenticator (谷歌验证器)</strong> 或微软验证器。赶紧绑定一下，或者使用本项目去保存，稍后会教，这里就不写了。</p>
<ul>
<li>不知道为啥我扫码添加失败了，如果你也遇到这情况，直接使用 <strong>输入设置密钥</strong> 就可以成功绑定了！</li>
</ul>
</li>
<li><p>保存 <strong>恢复代码</strong> ：千万别漏了这一步！ 顺手生成一下，找个安全的地方保存好。 万一哪天你手机丢了、或者验证器没法用进不去账号，这就是你登入账号的最后一把救命钥匙！<br><img src="/wp-content/uploads/2026/08/20260328055519187.webp" alt="NodeWarden 项目中 设置二次验证"></p>
</li>
</ol>
<h3 id="2-连接Bitwarden客户端"><a href="#2-%E8%BF%9E%E6%8E%A5Bitwarden%E5%AE%A2%E6%88%B7%E7%AB%AF" class="headerlink" title="2. 连接Bitwarden客户端"></a>2. 连接Bitwarden客户端</h3><p>项目服务端搞定了，接下来就是连接 Bitwarden 客户端！</p>
<ol>
<li><p>来到官方下载页面 <a target="_blank" rel="noopener" href="https://bitwarden.com/download/">Bitwarden-点击前往</a> 下载好的 <strong>Bitwarden 客户端</strong> ，我一般喜欢用浏览器插件，我以 Chrome 为例 <a target="_blank" rel="noopener" href="https://chromewebstore.google.com/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb?browser=chrome">Chrome-Bitwarden 密码管理器-点击前往</a> 安装完成后，在浏览器的右上角 <strong>扩展程序</strong> 找到Bitwarden，点击图钉图标来固定Bitwarden扩展。<br><img src="/wp-content/uploads/2026/08/20260328063716060.webp" alt="安装 Bitwarden 扩展程序"></p>
</li>
<li><p>我发现这个插件页面登录UI有问题还是怎么，反正我这里是异常显示，可以点右上角的 <strong>弹出新窗口</strong> ，弹出后就可以自由拖动大小了，在登录界面，不要急着输入账号，点击最下方的 <strong>“bitwarden.com”</strong> 选择 <strong>自托管</strong> 选项，弹出的 <strong>服务器URL</strong> 中填写你的项目域名地址，如你设置了自定义域名就写自定义的。然后输入你的账户密码进行登录就行了，如果刚才开启了二次验证，系统会要求你输入 6 位动态验证码。<br><img src="/wp-content/uploads/2026/08/20260328064648613.webp" alt="登录 Bitwarden 程序1"><br><img src="/wp-content/uploads/2026/08/20260328065225096.webp" alt="登录 Bitwarden 程序2"></p>
</li>
</ol>
<h3 id="3-从浏览器导出密码"><a href="#3-%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E5%AF%BC%E5%87%BA%E5%AF%86%E7%A0%81" class="headerlink" title="3. 从浏览器导出密码"></a>3. 从浏览器导出密码</h3><ol>
<li><p>从 Chrome 或 Edge 浏览器导出密码：</p>
<ul>
<li>打开浏览器的设置，然后导航到密码设置，例如 <code>chrome://password-manager/settings</code> 或 <code>edge://wallet/passwords</code></li>
<li>找到“导出密码”并点击“下载文件”。系统可能会提示您输入计算机密码进行验证。对于 Microsoft Edge 浏览器，此选项可能隐藏在“已保存密码”部分的菜单下。</li>
<li>指定导出文件的保存位置，并确认格式为逗号分隔值( CSV )。</li>
<li>选择“保存”完成导出。<br><img src="/wp-content/uploads/2026/08/20260328132513507.webp" alt="从 Chrome 或 Edge 浏览器导出密码"></li>
</ul>
</li>
<li><p>将数据导入密码库：拿到导出的 CSV 文件后，你可以直接你部署的 NodeWarden 网页端导入，也可以在 Bitwarden 浏览器扩展插件进行导入。随便选一个就行，两边的数据都是云端实时同步的。<br><img src="/wp-content/uploads/2026/08/20260328134232628.webp" alt="导入数据到 NodeWarden 或 Bitwarden"></p>
</li>
<li><p>拿我自己来说，平时习惯把 Chrome 当主力大号用，Edge 当备用小号，结果两边浏览器存了大量重复或者交叉的账号密码。现在哪怕你导入了多个浏览器的多份数据，直接在网页端左侧菜单点击 「重复项」，项目就会自动帮你找出所有重复的账号密码。点击上方的「选择重复项」即可智能勾选，然后一键「删除」，这下整个密码库清爽了， <strong>强迫症狂喜</strong><br><img src="/wp-content/uploads/2026/08/20260328135604084.webp" alt="NodeWarden 项目中 去重复项"></p>
</li>
</ol>
<h3 id="4-云端备份（推荐）"><a href="#4-%E4%BA%91%E7%AB%AF%E5%A4%87%E4%BB%BD%EF%BC%88%E6%8E%A8%E8%8D%90%EF%BC%89" class="headerlink" title="4. 云端备份（推荐）"></a>4. 云端备份（推荐）</h3><ol>
<li><p>InfiniCLOUD：是日本的云存储服务，支持 WebDAV，只需邮箱即可注册免费 20 GB；填写推荐码后总计 25 GB，还不错我用了蛮久的了，当时搞了 45G 空间只用来存储数据根本用不完。</p>
</li>
<li><p>你在<a target="_blank" rel="noopener" href="https://infini-cloud.net/en/">InfiniCLOUD-点击前往</a>注册后，在<a target="_blank" rel="noopener" href="https://infini-cloud.net/en/modules/mypage/usage/">My Page-点击前往</a>里输入邀请码: <code>DYZYJ</code>，就能额外再获得 5GB 永久免费空间，总共可到 25GB。<br><img src="/wp-content/uploads/2026/08/20260328145642528.webp" alt="InfiniCLOUD"></p>
</li>
<li><p>在左侧导航栏点击 「云端备份」，然后在「备份地点」区域点击 「+ 新增地点」，选择 WebDAV 类型。</p>
<ul>
<li>WebDAV 服务地址：输入 InfiniCLOUD 地址 <a target="_blank" rel="noopener" href="https://miya.teracloud.jp/dav">https://miya.teracloud.jp/dav</a>  （替换为你的实际地址）</li>
<li>WebDAV 用户名：输入你的 InfiniCLOUD 账号（如 zrfme）</li>
<li>WebDAV 密码：输入你的 InfiniCLOUD 应用密码（不是登录密码）</li>
<li>远程目录：输入备份存放目录（如 nodewarden，会自动创建）</li>
<li>配置完成后，先点击「启用」开启自动备份计划,再点击「保存设置」；你也可以按需点击「手动执行」立即触发一次备份测试，或点击「删除」来移除该备份地点。</li>
</ul>
</li>
</ol>
<p><img src="/wp-content/uploads/2026/08/20260328150759898.webp" alt="NodeWarden 项目中 设置云端备份"></p>
<h3 id="5-使用-NodeWarden-为-账号-开启通行密钥-Passkeys-与-TOTP"><a href="#5-%E4%BD%BF%E7%94%A8-NodeWarden-%E4%B8%BA-%E8%B4%A6%E5%8F%B7-%E5%BC%80%E5%90%AF%E9%80%9A%E8%A1%8C%E5%AF%86%E9%92%A5-Passkeys-%E4%B8%8E-TOTP" class="headerlink" title="5. 使用 NodeWarden 为 账号 开启通行密钥 (Passkeys) 与 TOTP"></a>5. 使用 NodeWarden 为 账号 开启通行密钥 (Passkeys) 与 TOTP</h3><p>接下来的操作才是 <strong>NodeWarden</strong> 的真正魅力所在：我们要直接“白嫖”官方 Bitwarden 只有高级会员（Premium）才能享有的 <strong>内置 TOTP 验证器</strong> 和 <strong>通行密钥 (Passkeys)</strong> 功能。</p>
<p>很多大佬可能还习惯在手机上装个 Google Authenticator，每次登录都要翻手机找验证码，简直是“反人类”操作。（当然我把这个 NodeWarden 项目的 TOTP 在谷歌验证器与此项目都绑定了，以防这个项目出现了什么问题。导致后续验证出现问题。）</p>
<p>用了 NodeWarden 之后，咱们直接把这些全部集成到插件软件里面，电脑用插件手机端用客户端也是一样使用。</p>
<h4 id="5-1-配置-Passkeys（通行密钥）"><a href="#5-1-%E9%85%8D%E7%BD%AE-Passkeys%EF%BC%88%E9%80%9A%E8%A1%8C%E5%AF%86%E9%92%A5%EF%BC%89" class="headerlink" title="5.1 配置 Passkeys（通行密钥）"></a>5.1 配置 Passkeys（通行密钥）</h4><p>Passkeys 是未来的趋势，不用背密码，安全性还爆表。下面我以 GitHub 为例，带大家感受一下什么叫真正的“丝滑”。</p>
<ol>
<li><strong>进入 GitHub 设置：</strong> 登录你的 GitHub，点头像进入 <code>Settings</code> ➜ <code>Password and authentication</code>。</li>
<li><strong>点击添加：</strong> 在 <strong>Passkeys</strong> 栏目找到 <code>Add a passkey</code>，新添加需要收验证码验证身份。验证完成添加既可，然后叫你命名你就随便写，你知道这个用于哪里就行，方便后续记忆。<br> <img src="/wp-content/uploads/2026/08/20260414173952252.webp" alt="配置 Passkeys（通行密钥）"></li>
<li><strong>插件接管：</strong> 此时浏览器会进入等待界面，只要你安装并登录了 Bitwarden 插件，它会 <strong>自动跳出</strong> “保存通行密钥”的窗口。如我下面的截图所示，插件非常智能，它会自动匹配你库里现有的 GitHub 账号。</li>
<li><strong>一键关联保存：</strong> 在插件弹窗中，直接点击你那个 <strong>对应的登录账号</strong>（就是图中红框标出的账号）。如果你想存成一个新项目，也可以点右上角的 <code>+ 新增</code>。点完之后，这个 Passkey 就稳稳地存进你的 NodeWarden 数据库了。<br> <img src="/wp-content/uploads/2026/08/20260414174838023.webp" alt="谷歌插件接管 Passkeys 保存界面"></li>
</ol>
<ul>
<li><strong>爽点：</strong> 下次你登录 GitHub 电脑端只要点一下“使用通行密钥”，手机端指纹或面容一刷，瞬间进后台，连账号密码都不用输入，安全又快捷！<br> <img src="/wp-content/uploads/2026/08/20260414183701046.webp" alt="Bitwarden 程序中 使用通行密钥 登录"></li>
</ul>
<h4 id="5-2-开启内置-TOTP"><a href="#5-2-%E5%BC%80%E5%90%AF%E5%86%85%E7%BD%AE-TOTP" class="headerlink" title="5.2 开启内置 TOTP"></a>5.2 开启内置 TOTP</h4><p>大家注意，官方 Bitwarden 的内置 TOTP（就是那个 30 秒一变的 6 位验证码）是 <strong>收费功能</strong> 。但使用 NodeWarden ，<strong>直接免费了！</strong></p>
<ol>
<li><strong>获取密钥：</strong> 在 GitHub 的双因素认证（2FA）页面，选择 <code>Enable two-factor authentication</code>。你会看到一个 <strong>二维码</strong> 。<br> <img src="/wp-content/uploads/2026/08/20260414192347503.webp" alt="开启 Enable two-factor authentication"></li>
<li><strong>编辑条目：</strong> 打开 Bitwarden 插件，找到你的 GitHub 账号，点右侧的三个点，再点 <code>编辑</code>。</li>
<li><strong>注入灵魂：</strong> 找到 <code>验证器密钥 (TOTP)</code> 这一行：<ul>
<li>你可以点右边的 <strong>相机图标</strong> 直接对着屏幕扫。</li>
<li>或者直接点击把二维码下方 <strong>Setup Key</strong> 的那一串字符，粘贴进去。<br> <img src="/wp-content/uploads/2026/08/20260414192129164.webp" alt="验证器密钥 (TOTP) 导入密钥 到 Bitwarden 程序中"></li>
</ul>
</li>
<li><strong>保存即用：</strong> 保存后，使用 TOTP 进行验证一下。你会发现条目里出现了一个不断刷新的 6 位数字。<br> <img src="/wp-content/uploads/2026/08/20260414191933373.webp" alt="保存密钥 并 TOTP 验证"></li>
<li><strong>附件保存：非常重要，如果丢失会导致你的账号无法登录</strong> 我们可以把这些恢复代码直接保存到项目中，下载下来添加在<code>附件</code>中 或 添加复制到 <code>字段</code> 去保存，项目有自动备份功能。我并不担心数据丢失。<br> <img src="/wp-content/uploads/2026/08/20260414194437285.webp" alt="恢复代码 备份 很重要"></li>
</ol>
<ul>
<li><strong>强迫症狂喜：</strong> 以后登录需要验证码，插件会自动帮你填充，或者点一下直接复制，再也不用满世界找手机了！</li>
</ul>
<h2 id="完结撒花！发哥小提示！（必看）"><a href="#%E5%AE%8C%E7%BB%93%E6%92%92%E8%8A%B1%EF%BC%81%E5%8F%91%E5%93%A5%E5%B0%8F%E6%8F%90%E7%A4%BA%EF%BC%81%EF%BC%88%E5%BF%85%E7%9C%8B%EF%BC%89" class="headerlink" title="完结撒花！发哥小提示！（必看）"></a>完结撒花！发哥小提示！（必看）</h2><p>至此，你拥有了一个完全属于自己、无需维护服务器、基于 Cloudflare 全球边缘节点加速，并且支持密码同步、自动填充、云端备份以及 TOTP 功能的满血版密码管理器！。</p>
<p>相比传统自建方案，这种基于 Cloudflare 的无服务器部署方式，不仅成本为 0，还兼顾了性能与可用性，可以说是目前个人用户最优雅的 Bitwarden 自建方案之一。</p>
<p>虽然“白嫖”很爽，但因为我们把“鸡蛋都放进了一个篮子”（账号密码、Passkey、TOTP）都集中在同一个 NodeWarden 系统中。因此，有两件事情你<strong>必须认真对待</strong>：</p>
<ol>
<li><p><strong>所有账号的 TOTP 必须额外备份：</strong><br>一定要确认 NodeWarden 主账号已开启 TOTP 双重验证。但请记住：不仅是 NodeWarden 本身，只要是被你放进密码管理器里的重要账号（如谷歌账户、Apple ID、域名服务商等），其 TOTP 都强烈建议在第三方验证器（如 Google Authenticator）或备用的旧手机中额外备份一份！</p>
<blockquote>
<p>就在写这篇教程不久之后，我之前设置好的 NodeWarden 的 TOTP 突然出现 Bug，不知道为什么项目无故显示“未启用”。我当时就重新设置了新的 TOTP，但忘记立刻将其备份到其他身份验证器上。结果到了第二天，我所有的设备突然全部掉线（退出登录状态）！</p>
<p>因为登录需要 TOTP，而唯一的 TOTP 又锁在了我登不进去的 NodeWarden 项目里，给我直接吓出一身冷汗，还好之前设置了恢复代码！并且保存在了其他地方，所以成功恢复且登录，因此，记住无论何时重置 TOTP，<strong>第一件事就是扫码备份到第三方验证器，且保存恢复代码！</strong></p>
</blockquote>
</li>
<li><p><strong>备份恢复代码：</strong><br>虽然 NodeWarden 已支持定时云端备份（如 WebDAV），在大多数情况下数据是安全的，但恢复代码依然建议保留一份离线备份。比如说 Cloudflare 崩了，刚好你这个时候要使用（小概率但是会发生）</p>
<p>因为一旦出现设备丢失、TOTP 无法使用等情况，恢复代码可能是你重新访问账号的唯一方式。</p>
</li>
</ol>
<p>最后记住一句话：<br><strong>你可以忘记密码，但绝不能丢掉恢复代码。</strong></p>


文章来源：<a href="https://blog.zrf.me/p/NodeWarden-Bitwarden/" target="_blank" rel="nofollow" title="https://blog.zrf.me/p/NodeWarden-Bitwarden/">blog.zrf.me</a>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">NodeWarden</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">在 Cloudflare 上零成本部署私有 Bitwarden 密码管理器，无需服务器。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 3617</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 4065</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">开源</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">密码管理</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">Bitwarden</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">Cloudflare</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/shuaiplus/nodewarden" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/shuaiplus/nodewarden</a></p></div></div>
