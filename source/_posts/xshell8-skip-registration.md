---
title: "XShell8 Xftp8 离线 内网 如何跳过注册弹窗"
date: '2026-01-31T12:00:00+08:00'
updated: '2026-08-01T03:58:31+08:00'
slug: xshell8-skip-registration
categories:
- "软件与开发"
description: "在离线环境下，Xshell 8和Xftp 8免费版需手动修改注册表以跳过注册窗口。通过注册表编辑器设置License路径下的SubmitTime为十六进制值68c78068，即可实现无需注册使用。"
cover: "/wp-content/uploads/2026/07/xshell8-img1.png"

---

<div class="single-content">
															<h3>前言</h3>
<p>虽然 Xshell 和 Xftp 官方有免费版，但还要在线注册一下，否则每次打开都会先弹出注册窗口，<br>
但离线环境无法连接外网怎么办？有没有什么办法能跳过这一步呢？</p>
<h3>环境：</h3>
<ul>
<li>Windows 10 专业版</li>
<li>Xshell 8</li>
<li>Xftp 8</li>
</ul>
<h3>具体步骤</h3>
<p>下面以 Xshell 为例说下具体步骤：</p>
<ol>
<li style="list-style-type: none;">
<ol>
<li>打开 Windows 注册表编辑器<br>
Win+R 打开运行，在运行框里输入 <b>regedit</b> ，回车</li>
<li>找到下面位置，可以直接复制到上方地址栏，回车<br>
<b>计算机\HKEY_CURRENT_USER\SOFTWARE\NetSarang\Xshell\8\License</b></li>
<li>在空白处右键，新建 DWORD(32位)</li>
</ol>
</li>
</ol>
<p><img alt="XShell8 Xftp8 离线 内网 如何跳过注册弹窗-图片1" decoding="async" src="/wp-content/uploads/2026/07/xshell8-img1.png"></p>
<p>名称为 <b>SubmitTime</b>，值为十六进制 <b>68c78068</b>，其实就是十进制的时间戳 十六进制格式。<br>
<img alt="XShell8 Xftp8 离线 内网 如何跳过注册弹窗-图片2" decoding="async" src="/wp-content/uploads/2026/07/xshell8-img2.png"><br>
结束！再次打开 Xshell 就不会出现注册窗口了。</p>
				</div>

			
			
						
				
	
				<div class="clear"></div>
文章来源：<a href="https://www.jun.la/collect/2553.html" target="_blank" rel="nofollow" title="https://www.jun.la/collect/2553.html">www.jun.la
