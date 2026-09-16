---
title: "Tailscale 开源 tailcat：去控制面的 WireGuard 临时通道，甩 token 就能传数据"
date: '2026-09-01T13:12:59+08:00'
updated: '2026-09-01T13:12:59+08:00'
slug: tailcat-wireguard-tunnel
categories:
- "软件与开发"
description: "Tailscale 于 2026 年 8 月 31 日开源 tailcat，是一款无需账号、控制面、root 和 IP 的临时数据传输工具。它将 Tailscale 的 WireGuard + 打洞 + DERP 中继能力剥离为独立 CLI，实现类似 netcat 的使用体验，支持文件收发、端口转发"
cover: "/wp-content/uploads/2026/09/tc-cover-cbf826.png"

---

<p class="wx-cover"><img src="/wp-content/uploads/2026/09/tc-cover-cbf826.png" alt="Tailscale 开源 tailcat：去控制面的 WireGuard 临时通道" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p>Tailscale 在 <strong>2026 年 8 月 31 日的 TailscaleUp 大会</strong>上开源了一个新工具 <strong>tailcat</strong>，作者是 Tailscale 联合创始人 Brad Fitzpatrick。名字取得很直白：tail + cat = Tailscale 家的 netcat。它做的事也是直白到一句话能讲完——像 netcat 那样在两台机器之间甩数据，但走的是 Tailscale 那套 WireGuard + 自动打洞 + DERP 中继，<strong>完全不要账号、不要控制面、不要 root、不用 IP</strong>。</p>
<p>8 月底 GitHub 上线两天，这个仓库就攒到了 <strong>5,300+ star</strong>（实测 2026-09-01 下午为 5,369，半天后又涨了几百）。一家商业 VPN 公司，主动把自己最有价值的一块底层代码（magicsock 数据面）剥出来免费开源，背后的逻辑值得讲清楚。下面这篇文章把能查到的都摆出来：它到底是个什么东西、工作原理、能干什么、不能干什么、和 netcat 差在哪、密钥怎么管才安全、自托管 DERP 怎么搭。</p>

<div style="background:#eaf2ff;border-left:4px solid #2563eb;padding:14px 18px;margin:0 0 22px;border-radius:6px;">
<p style="margin:0;color:#1d4ed8;font-size:15px;line-height:1.8;"><strong>一句话定位：</strong>tailcat 是 Tailscale 官方开源的一个 Go 小工具，把自家数据面（WireGuard + NAT 打洞 + DERP 中继）剥出来给两个进程用，不需要 Tailscale 账号、不需要控制面、不需要分配 IP，开箱就能在两台机器之间传数据。它像一个<strong>自带加密 + 自带打洞的 netcat</strong>，适合临时一次性场景。</p>
</div>

<h2>一、tailcat 到底是什么</h2>
<p>tailcat（GitHub 仓库 <code>tailscale/tailcat</code>，<strong>BSD 3-Clause</strong> 协议）是 Tailscale 数据面的一次"分拆实验"。<strong>Tailscale 不是一个东西，而是四样东西的组合：</strong>①WireGuard 加密 + NAT 打洞 + DERP 中继合起来的<strong>数据面</strong>；②协调设备身份、ACL、SSO 的<strong>控制面</strong>；③Tailscale Inc. <strong>这家公司</strong>（卖的是帮你跑控制面 + 商业支持）；④客户端 / 服务端<strong>开源代码本身</strong>。tailcat 把第一项单独拎出来，做成可独立运行的 CLI 和 Go 库。</p>
<p>它的官网自我介绍只有一句："<strong>Tailscale without Tailscale, by Tailscale</strong>"（出自 Tailscale 而非 Tailscale 服务的 Tailscale 数据面）。Brad Fitzpatrick 在 2023 年 9 月一个十小时长途航班上写了初版（当时叫 derpcat），在 Tailscale 内部冷了好几年；直到今年 AI 智能体编程火了之后，他发现自己一直在用它"把不同世界的两台机器临时拼到一起"——AI 沙盒控制 EC2 实例、让 AI 折腾树莓派集群、远程调试 Hyper-V 虚拟机——才决定正式开源。</p>

<h2>二、和 netcat 到底差在哪：5 步连上 + 一张图</h2>
<p>用户角度看到的<strong>使用体验</strong>就是 netcat：服务端起一个进程、吐出一串 token、客户端拿着 token 连上、stdin/stdout 互通。但背后走的不是裸 TCP，而是下面这条完整链路：</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/tc-arch-2de964.png" alt="tailcat 连接流程：DERP 握手后升级为 UDP 直连" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：连接流程示意。①客户端先通过 DERP 中继发出"Meow"握手；②WireGuard 隧道建立后，magicsock 自动尝试 UDP 打洞；③打洞成功就走直连，打洞失败则一直用 DERP 兜底。整个过程对操作系统不可见——不建 TUN 设备、不改路由表、不需要 root。</p>

<p>具体到一次连接的内部步骤，README 写得很清楚：</p>
<ol>
<li><strong>服务端启动</strong>：生成（或加载）一个 WireGuard 密钥对，连上选定的 DERP 中继，在 stderr 吐出一串形如 <code>tcom...</code> 的连接 token，然后阻塞等连接。</li>
<li><strong>客户端解析 token</strong>：从 base64(CBOR) 里读出服务端公钥 + 路径发现密钥 + DERP region，自己也生成临时密钥对，连上同一个 DERP。</li>
<li><strong>Meow 握手</strong>：客户端通过 DERP 向服务端公钥发"Meow"消息，把自己的节点公钥告诉服务端。服务端验证后把它加入 WireGuard peer 列表，回"Meowed"。</li>
<li><strong>WireGuard 隧道建立</strong>：标准 WireGuard 握手（最初也走 DERP），完成后隧道就位。</li>
<li><strong>NAT 打洞升级</strong>：双方通过 STUN 拿到公网 IP:端口，用 Tailscale 自研的 disco 协议尝试 UDP 打洞；打通就直接走 P2P UDP，打不通就一直用 DERP 中继兜底。</li>
</ol>
<p>所有 TCP 连接都跑在进程内的 gVisor Netstack（用户态 TCP/IP 协议栈）里——操作系统在 TCP 层完全感知不到这个隧道，不建 TUN、不动路由表、不改 DNS，所以<strong>root 权限不是必需的</strong>。</p>

<h2>三、四种典型用法 + 四个真命令</h2>

<h3>3.1 标准 netcat 模式（stdin/stdout 互通）</h3>
<p>服务端起一个进程，吐出 token：</p>

```sh
$ tailcat
# Selected bootstrap relay region 302, San Francisco
# 🐈 Server listening with new address: tcomFwWCCcjS5nKNqAod034nWoJZW0LZqDhhC8U_dKdnDRYQ8uNGFpGQEu
```

<p>客户端拿 token 甩一行字符串过去：</p>
<div style="background:#0f172a;color:#e2e8f0;font-family:Menlo,Consolas,monospace;font-size:13px;padding:10px 14px;border-radius:6px;margin:8px 0 14px;line-height:1.6;">$ echo hello | tailcat tcomFwWCCcjS5nKNqAod034nWoJZW0LZqDhhC8U_dKdnDRYQ8uNGFpGQEu</div>
<p>服务端那边 stdout 就会印出 <code>hello</code>。整条链路全部用 WireGuard 加密，<strong>裸 TCP 的 netcat</strong>做不到这件事——尤其两端都在 NAT 后、没有公网 IP 时，netcat 几乎不可能直连。</p>

<h3>3.2 端口转发（替代 SSH -L 和 ngrok）</h3>

```sh
# 服务端把本机 8080、8443 暴露到 tailcat 隧道
$ tailcat serve 8080,8443
# 🐈 Server listening with new address: tcXXXXXXXXX

# 客户端：把这台机器的 8080 当成服务端的 localhost:8080
$ tailcat tcXXXXXXXXX 8080
# 现在 curl http://localhost:8080/ 实际打到了对端的 8080
```

<h3>3.3 零认证 SSH（Linux/macOS）</h3>

```sh
# 服务端起一个不需要密码的 SSH（认证由 WireGuard 握手承担）
$ tailcat serve no-auth-ssh

# 客户端一行命令登进去
$ tailcat ssh tcXXXXXXXXX
$ tailcat ssh tcXXXXXXXXX ls -la
```

<h3>3.4 文件收发（scp / sftp 兼容）</h3>

```sh
# 服务端起一个只写收件箱
$ tailcat recv ~/inbox

# 客户端像用 scp 一样把文件甩过去
$ tailcat cp report.pdf tcXXXXXXXXX:
```

<p>drop box 默认只写不能列，发送方既列不出目录也读不回文件。文件服务走 SFTP 协议，所以<strong>系统自带的 sftp / scp 客户端同样能跑</strong>，服务端通过 Go 的 <code>os.Root</code> 把所有路径锁在服务目录里，<code>..</code> 和符号链接都逃不出去。传输不压缩——Go 的 SSH 栈默认就关掉了传输压缩（SFTP 协议本身也没有压缩层），需要的话请先压再传。</p>

<h2>四、谁最该用它：5 类典型场景</h2>
<p>Brad 在发布博文中列了几个自己亲历过的用法：</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/tc-scene-f6f7e2.png" alt="tailcat 典型使用场景：临时文件传输、AI 沙盒、短期云实例、远程硬件" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：典型使用场景示意。中央是一串 tailcat 连接 token（连谁的关键凭证），周围是四类常见的对端：临时文件传输、AI 智能体沙盒、短期云 VM、远程硬件（树莓派 / IoT）。</p>

<ul>
<li><strong>AI 编程沙盒：</strong>把不可信的沙盒 VM 与一台宿主 EC2 通过 tailcat 拼起来，AI 在沙盒里 kexec 重启 EC2、调 Amazon Nitro ENA 驱动到纯 Go（项目 Tamago），全程不污染生产网络。</li>
<li><strong>远程硬件调试：</strong>Brad 把它接到一屋子的树莓派上，让 AI 自己测不同型号、不同固件版本，再也不用一台一台去插显示器。</li>
<li><strong>短期云实例：</strong>CI/CD 跑完就销毁的临时 runner、调试 Go runtime 用的可反复创建 / 销毁的 Hyper-V 虚拟机，都用 tailcat 临时串一下。</li>
<li><strong>两台机器临时传文件：</strong>替代 SSH 反向隧道 + rsync / scp；尤其在两边都拿不到公网 IP 的场景下，能省去中转一台带公网 IP 的跳板。</li>
<li><strong>跨网络临时通 SSH：</strong>你有一台机器在 A 网络（公司内网）、另一台在 B 网络（家里或酒店），想 SSH 过去又不想碰任何防火墙规则——一个 token 就解决。</li>
</ul>
<p>注意：这些都是"<strong>已经开了两个 shell 在两台机器上、想把它们临时拼起来</strong>"的场景。Brad 自己也说，多数情况下正经用 Tailscale 也能干，但太麻烦，不如直接用 tailcat 顺手。</p>

<h2>五、密钥怎么管：ephemeral 是默认、saved 是例外</h2>
<p>token 长这样：<code>tc</code> + 一段 base64url 编码的 CBOR（包含服务端 WireGuard 公钥 + 路径发现公钥 + DERP region 整数）。一个 token 就是一个不可撤销的"未公开的连接凭证"——任何拿到 token 的人都能连到对应服务端，直到这个 key 销毁。所以<strong>怎么发这个 token，决定了 tailcat 是省事还是出事</strong>。</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/tc-risk-6d882c.png" alt="token 安全要点：ephemeral 一次性最安全，saved 持续 key 风险大" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：tailcat token 安全的两种典型模式。左侧一次性 ephemeral 模式（绿色）：进程退出 key 销毁、token 失效，天然抵御"token 流传"。右侧持久 saved 模式（红色）：token 一旦分享给过谁，谁未来都能用，需要靠 <code>--allow</code> 显式限制客户端公钥才行。</p>

<p>tailcat 提供两种模式：</p>
<ul>
<li><strong>Ephemeral（默认）：</strong>每次启动生成全新内存里的 key，进程退出 key 销毁、token 永久失效。启动那行会明确写 "<code>with new address</code>"——这才是安全默认，分享这个 token 永远只代表这一次运行。</li>
<li><strong>Saved：</strong><code>tailcat genkey --key=default</code> 把 key 存到 <code>~/.config/tailcat/keys/</code>，重启后还能用同一个 token 连上来。<strong>翻转面</strong>：只要 token 曾经发出去过，对方就永远能连未来的服务端。补救办法是 <code>tailcat serve --allow=&lt;客户端 nodekey&gt;</code> 显式列白名单；不过 <code>--allow</code> 锁的是"谁能进"，不是"key 是否作废"。</li>
</ul>
<p>另外一种分发方式值得专门说一下：把 token 写到 DNS TXT 记录（<code>my-server.example.com 300 IN TXT "tailcat=tcXXXXXXXXX"</code>），客户端就能直接用 <code>tailcat ssh my-server.example.com</code> 当主机名——既免了复制粘贴，也能在 DNS 这层做最小权限。README 里的"零认证 SSH 服务器"示例就用了这种模式：服务端 <code>--allow</code> 锁死单一客户端公钥，陌生人连 DNS 都查不到端口，握手直接被丢弃。</p>

<h2>六、项目现状：两天 5,300+ star</h2>
<p>仓库 <code>tailscale/tailcat</code> 在 2026-08-31 公开，截至 <strong>2026-09-01 下午实测 5,369 个 star</strong>（半天后又涨了几百）。代码以 Go module 形式发布，<strong>License 是 BSD 3-Clause</strong>（GitHub LICENSE 文件确认，非 MIT）。</p>

<p style="margin:0 0 8px;"><img src="/wp-content/uploads/2026/09/tc-card-24f790.png" alt="tailscale/tailcat 仓库卡片" style="max-width:100%;height:auto;border-radius:6px;"></p>
<p style="margin:0 0 18px;font-size:13px;color:#64748b;">图：GitHub 仓库卡片。Tailscale 官方仓库，背书等同于商业公司官方支持。License: BSD-3-Clause，star 数截至 2026-09-01 下午为 5,369。</p>

<p>Docker 镜像已经推到 <code>ghcr.io/tailscale/tailcat:v0.1.0</code>，Release 页面同时提供 Linux（amd64 / arm64 / armv7 的 .deb / .rpm / tar.gz）和 Windows（amd64 / arm64 的 .zip）。macOS 用户走 Homebrew（<code>brew install tailcat</code>），Arch 用户有 AUR 包，Nix 用户用 <code>nix run github:tailscale/tailcat</code>。源码构建建议加上 <code>build-tags.txt</code> 里的 tag 列表，官方用这个组合出来的二进制比默认小约 16%。</p>

<h2>七、自托管 DERP：彻底脱离 Tailscale 这家公司</h2>
<p>Brad 在博文中专门强调了一点：<strong>tailcat 不绑定 Tailscale 这家公司</strong>。公共 DERP 是限速的（"带宽要花钱"），但整套 DERP 协议和 <code>cmd/derper</code> 服务器都是开源的，自建一台 <code>derper</code>（需要带 TLS 证书的域名，<code>derper</code> 自身就能用 Let's Encrypt 签）之后，所有限速都归你控制：</p>

```sh
# 服务端用自建 DERP 生成 token
server$ tailcat genkey --key=default --region=derp.example.com
tcomFwWCCAIsKOqPUux6ClG2RM4A_vOqqVBzGgHGGjq9OsJuFKSWFygaFhToGhYWhwZGVycC5leGFtcGxlLmNvbQ

server$ tailcat serve 22

# 客户端不需要任何额外配置：token 里已经嵌入了 DERP 主机名
client$ tailcat ssh <上一步的 token>
```

<p>企业想跑一整张 DERP 网格也行：搭一个 DERP map JSON、双方都加 <code>--derpmap-url</code> 指向它就行。<strong>这时 tailcat 就完全是 Tailscale 这家公司的"数据面合约之外"的存在</strong>——Brad 在 Hacker News 的评论里也直说了：Tailscale 公司倒闭了 tailcat 也能继续用，只要你自己跑 DERP。</p>

<h2>八、为什么 Tailscale 愿意开源它</h2>
<p>这是商业策略问题，不是开源情怀：</p>
<ul>
<li><strong>把数据面用得越多、越扎实，自家付费产品越好用。</strong>magicsock 跑了大量异常网络环境（企业防火墙、4G 漫游、双层 NAT、IPv6-only）才会暴露 bug，open source 等于让整个社区做免费 fuzzing。</li>
<li><strong>把"连接原语"和"管理产品"切开卖。</strong>tailcat 是免费的窄工具；Tailscale 卖的从来不是 WireGuard 本身，而是"帮你跑控制面 + 给你 ACL / SSO / 审计日志 / 合规证书 + 商业支持"那一整套。两件事不冲突。</li>
<li><strong>生态卡位：</strong>对冲"WireGuard 一把梭自己搭"的认知。开源"只想要 WireGuard 数据面的人最方便的那个工具"，比让对方用 curl + wg-quick 凑出来更体面。</li>
</ul>
<p>Brad 在博文结尾的口气很直白："<strong>我们自己更希望人们用、改善、提 bug 给我们的数据面</strong>，这会让 Tailscale 整体产品更好。"</p>

<h2>九、别在什么场合用它</h2>
<p>看 README 末尾"Stability"小节，Tailscale 把丑话说在前面：tailcat <strong>不承诺 Go API、CLI 标志、wire format 任何稳定性</strong>；公共 DERP 没 SLA、没吞吐保证、可能随时回收。如果你有下列需求，<strong>别用 tailcat</strong>，回去用完整版 Tailscale + 控制面：</p>
<ul>
<li>需要审计日志（谁在什么时候连了哪台机器）</li>
<li>需要 ACL / SSO / 设备健康检查 / MDM 集成</li>
<li>需要长期稳定运行的"公司网络基础设施"</li>
<li>需要稳定性承诺、SLA、商业支持</li>
<li>需要给客户、合作伙伴按角色授权访问</li>
</ul>
<p>换句话说，<strong>tailcat 是工具（tool），不是基础设施（infrastructure）</strong>。</p>

<h2>十、和 netcat / socat / Magic Wormhole 的对比</h2>

<table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:15px;">
<thead>
<tr>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">工具</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">加密</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">NAT 穿透</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">需账号</th>
<th style="background:#2563eb;color:#ffffff;padding:10px 12px;text-align:left;border:1px solid #e2e8f0;">典型场景</th>
</tr>
</thead>
<tbody>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>netcat</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">无（明文）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">不支持（需两端有公网或端口转发）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">无</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">同子网两台 Linux 临时传文件</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>socat</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">无原生（要套 SSL/TLS）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">不支持</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">无</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">复杂协议转发、串口转 TCP</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>Magic Wormhole</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">PAKE 端到端</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">支持（走 relay）</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">无</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">人类可念的短码一次性传文件</td>
</tr>
<tr>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>tailcat</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>WireGuard</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>magicsock + DERP 兜底</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>无</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">程序化调用、临时端口转发、AI 沙盒、远程硬件</td>
</tr>
<tr style="background:#f8fafc;">
<td style="padding:10px 12px;border:1px solid #e2e8f0;"><strong>Tailscale 完整版</strong></td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">WireGuard</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">magicsock + DERP 兜底</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">需 Tailscale 账号 / SSO</td>
<td style="padding:10px 12px;border:1px solid #e2e8f0;">完整 VPN 网络 + ACL + SSO + 审计</td>
</tr>
</tbody>
</table>

<p>几点提醒：<br>
①Magic Wormhole 走的是 PAKE（密码认证密钥交换），<strong>适合人类口述短码的一次性文件传输</strong>；tailcat 是字符串 token，更适合程序化调用——两个工具不互替。<br>
②读一些二手解读文章时，常见几处与官方不一致：</p>

<div style="background:#fff7ed;border-left:4px solid #ea7317;padding:14px 18px;margin:14px 0;border-radius:6px;">
<p style="margin:0 0 6px;font-size:14px;line-height:1.8;color:#7c2d12;"><strong>纠错 ①：命令语法是子命令式</strong>，不是 <code>--serve=8080</code> 这类 flag 写法。正确是 <code>tailcat serve 8080,8443</code>、<code>tailcat ssh &lt;token&gt;</code>、<code>tailcat cp file.pdf &lt;token&gt;:</code>。README 里的子命令有 <code>serve / ssh / cp / recv / ls / socks / ping / parse / resolve / genkey</code>，没有 <code>listen</code> / <code>connect</code>。</p>
<p style="margin:0 0 6px;font-size:14px;line-height:1.8;color:#7c2d12;"><strong>纠错 ②：token 前缀是 <code>tcom…</code></strong>（tc + base64url of CBOR），不是 <code>tc1q…</code>。注意 <code>tc</code> 在 ASCII 范围里大小写敏感，浏览器会自动小写、curl / 大多数 CLI 不会——所以浏览器场景里 token 当主机名用不通。</p>
<p style="margin:0 0 6px;font-size:14px;line-height:1.8;color:#7c2d12;"><strong>纠错 ③：许可证是 BSD 3-Clause</strong>（仓库 LICENSE 文件确认），不是"MIT or BSD 混用"。主仓库就是单一 BSD 3-Clause。</p>
</div>

<h2>十一、安装</h2>

```sh
# Go（任意平台）
go install github.com/tailscale/tailcat/cmd/tailcat@latest

# macOS
brew install tailcat

# Arch / Manjaro
yay -S tailcat            # 从源码打包
yay -S tailcat-bin        # 直接装二进制

# Docker
docker pull ghcr.io/tailscale/tailcat:latest
docker run --rm -it ghcr.io/tailscale/tailcat:latest

# 预编译二进制（Linux .deb/.rpm/.tar.gz，Windows .zip）
# 全部在 GitHub Releases 页面：https://github.com/tailscale/tailcat/releases
```

<p>还有个值得提的<strong>实验性</strong>玩法：tailcat 编译到了 WebAssembly，浏览器打开 <a href="https://tailscale.github.io/tailcat/" target="_blank" rel="nofollow noopener">tailscale.github.io/tailcat/</a> 就能和 CLI 互发文件或文本——浏览器流量全部走 DERP，WebRTC 还没实现所以没有 P2P 直连，传输受公共 DERP 限速影响。</p>

<div style="background:#0f172a;color:#ffffff;padding:18px 22px;margin:26px 0;border-radius:8px;">
<p style="margin:0;font-size:16px;line-height:1.9;"><strong>一句话结论：</strong>tailcat 解决的是"<strong>我已经能在两台机器上各开一个 shell、想把它俩临时拼起来</strong>"这个特定场景——替代 netcat、SSH 反向隧道、ngrok，但比它们都更省事、还自带端到端加密和 NAT 穿透。代价是<strong>没有官方稳定性承诺、没有管理面、密钥一旦分享就永远有效</strong>，不能当基础设施用。如果你只是想要"免账号的临时加密通道"，它就是当下最顺手的选择；如果你想要"公司网络 / 审计 / 长期 SLA"，回去用完整版 Tailscale。</p>
</div>

<h2>项目地址</h2>
<div style="background:#f8fafc;border:1px solid #e2e8f0;padding:16px 20px;border-radius:6px;">
<p style="margin:0 0 8px;font-size:15px;line-height:1.8;"><strong><a href="https://github.com/tailscale/tailcat" target="_blank" rel="nofollow noopener" title="https://github.com/tailscale/tailcat">tailcat — GitHub</a></strong> · <strong><a href="https://tailscale.com/blog/tailcat" target="_blank" rel="nofollow noopener" title="https://tailscale.com/blog/tailcat">官方发布博文</a></strong></p>
<p style="margin:0;font-size:14px;line-height:1.8;color:#475569;">tailcat 是 Tailscale 官方开源的 Go CLI / Go 库，把自家数据面（WireGuard + NAT 打洞 + DERP）剥出来给两个进程用，无需账号、无需控制面、无需 root。License: BSD 3-Clause。安装方式见 § 十一；如需自托管 DERP 中继，见 § 七。</p>
</div>

<div data-ghbox="1" style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 100%);border-radius:14px;padding:22px 24px;margin:0 0 22px;color:#ffffff;box-shadow:0 6px 20px rgba(15,23,42,0.12);"><div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span style="font-size:20px;font-weight:700;color:#ffffff;">tailcat</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">开源</span><span style="font-size:12px;background:rgba(255,255,255,0.14);color:#dbeafe;padding:3px 10px;border-radius:999px;">BSD-3-Clause</span></div><p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#cbd5e1;">Tailscale 开源的去控制面 WireGuard 临时通道，甩个 token 就能传数据。</p><div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">★ 6854</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">GitHub Star</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">⑂ 276</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">Fork</div></div><div style="flex:1;min-width:96px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:10px;padding:10px 12px;text-align:center;"><div style="font-size:18px;font-weight:700;color:#ffffff;">BSD-3-Clause</div><div style="font-size:11px;color:#94a3b8;margin-top:2px;">开源协议</div></div></div><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px;"><span style="font-size:12px;background:#2563eb;color:#ffffff;padding:4px 12px;border-radius:6px;">WireGuard</span><span style="font-size:12px;background:#16a34a;color:#ffffff;padding:4px 12px;border-radius:6px;">Tailscale</span><span style="font-size:12px;background:#ea7317;color:#ffffff;padding:4px 12px;border-radius:6px;">传输</span></div><div style="margin-top:4px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.12);text-align:center;"><p style="margin:0;font-size:15px;line-height:1.6;color:#e2e8f0;font-weight:500;">项目地址：<a href="https://github.com/tailscale/tailcat" target="_blank" rel="nofollow" style="font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;border-bottom:2px solid #2563eb;padding-bottom:1px;">github.com/tailscale/tailcat</a></p></div></div>
