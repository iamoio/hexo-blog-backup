---
title: "博客每日早报自动生成：Hexo + 每天 60 秒读懂世界"
date: '2026-07-30T16:40:06+08:00'
updated: '2026-08-01T03:58:26+08:00'
slug: hexo-auto-daily-news
categories:
- "建站与运维"
description: "文章介绍如何通过ALAPI每日早报接口在Hexo博客中实现每日新闻展示。提供两种方法：静态页面直接嵌入图片链接，或使用JavaScript脚本动态生成含标题、封面的文章，需安装axios和moment插件，并配置data_dir为source/_data以确保数据加载。用户需替换token并调整路径"
cover: "/wp-content/uploads/2026/07/1778491822678_670fbe73aa961.png"

---

<article class="post-content" id="article-container"><div id="postchat_postcontent"><h1 id="一、介绍"><a href="#%E4%B8%80%E3%80%81%E4%BB%8B%E7%BB%8D" class="headerlink" title="一、介绍"></a>一、介绍</h1><p>之前一直想做的功能，今天终于有机会来实现一下，正如描述那样，计划任务每天生成一篇文章用于展示每日新闻</p>
<p>具体效果如下</p>
<p><img src="/wp-content/uploads/2026/07/1778491822678_670fbe73aa961.png" alt="image-20240620184437493" loading="lazy" /></p>
<p>详情页如下所示</p>
<p><img src="/wp-content/uploads/2026/07/1778491821891_670fbe743a377.png" alt="image-20240620185945691" loading="lazy" /></p>
<h1 id="二、实现"><a href="#%E4%BA%8C%E3%80%81%E5%AE%9E%E7%8E%B0" class="headerlink" title="二、实现"></a>二、实现</h1><h2 id="2-1、-仅固定单页面访问"><a href="#2-1%E3%80%81-%E4%BB%85%E5%9B%BA%E5%AE%9A%E5%8D%95%E9%A1%B5%E9%9D%A2%E8%AE%BF%E9%97%AE" class="headerlink" title="2.1、 仅固定单页面访问"></a>2.1、 仅固定单页面访问</h2><p>需要使用到 <a target="_blank" rel="noopener" href="https://www.alapi.cn/">ALAPI</a> 的 <a target="_blank" rel="noopener" href="https://www.alapi.cn/api/view/93">每日60秒早报</a> 接口，可免费调用</p>
<p>注册登录后在 <code>个人管理 =&gt; 个人中心 =&gt;  获取token</code></p>
<p>如果只想生成一个固定的静态页面访问，可以直接使用以下代码，替换自己的token即可</p>

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日早报</title>
</head>

<body>
    <div style="text-align: center;"> <img src="https://img.shiguang666.eu.org/file/1778491852710_zaobao"
            alt="每日早报" width="100%"> </div>
</body>

</html>
```

<p>将代码保存到一个html文件内，存放博客主目录<code>source</code>文件夹即可</p>
<p>例如我保存到 <code>source\api\60s.html</code> </p>
<p><img src="/wp-content/uploads/2026/07/1778491824218_670fbe748b79e.png" alt="image-20240620202425352" loading="lazy" /></p>
<p>直接访问该目录即可</p>
<p><img src="/wp-content/uploads/2026/07/1778491830827_670fbe750ef6b.png" alt="image-20240620202608057" loading="lazy" /></p>
<p>或者创建一个page页面，例如</p>

```bash
hexo new page "daily-news-detail"
```

<p>然后修改 <code>source\daily-news-detail\index.md</code>文件，打开源码模式，粘贴以下代码，替换<code>token</code>内容</p>

```markdown
---
title: 每日早报
---

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日早报</title>
</head>
<body>
    <div style="text-align: center;"> <img src="https://img.shiguang666.eu.org/file/1778491852710_zaobao"
            alt="每日早报" width="100%"> </div>
</body>

</html>
```

<p>直接访问刚才生成的 <code>daily-news-detail </code>目录即可</p>
<p><img src="/wp-content/uploads/2026/07/1778491830181_670fbe75dde2d.png" alt="image-20240620203357815" loading="lazy" /></p>
<h2 id="2-2、-每天生成新的文章"><a href="#2-2%E3%80%81-%E6%AF%8F%E5%A4%A9%E7%94%9F%E6%88%90%E6%96%B0%E7%9A%84%E6%96%87%E7%AB%A0" class="headerlink" title="2.2、 每天生成新的文章"></a>2.2、 每天生成新的文章</h2><p>由于 <code>Front Matter</code> 是静态的，不能直接在 Markdown 文件中动态引用 JSON 文件的内容。所以如果想仅生成一篇文章每天动态加载文章标题及封面也需要使用下面的方法。</p>
<p>在 主题目录<code>scripts</code> 文件夹下创建一个新的JavaScript文件，例如 <code>fetch-daily-news.js</code>，我使用的主题是 <code>Butterfly</code>，具体目录为 <code>themes\butterfly\scripts</code>，替换代码中的<code>token</code></p>

```js
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// 设置 moment 的语言环境为中文
moment.locale('zh-cn');

hexo.on('ready', () => {
    const apiUrl = 'https://v2.alapi.cn/api/zaobao';
    const token = 'xxxxxxxxxxx'; // 替换为你的token

    axios.get(apiUrl, {
        params: {
            token: token
        }
    })
        .then(response => {
            const data = response.data;
            if (data.code === 200) {
                let newsData = data.data;

                // 执行历史数据 Start

                // const oldDataFileName = "daily_news_2024-06-20.json"  // 修改需要执行的数据文件名称
                // const oldDataPath = path.join(__dirname, '../../../source/_data/'+oldDataFileName);
                // console.log("Daily news oldDataPath is :",oldDataPath);
                // const oldData = JSON.parse(fs.readFileSync(oldDataPath, 'utf8'));
                // newsData = oldData;

                // 执行历史数据 End

                // 使用 newsData.date 转换为星期几
                const postDate = newsData.date;
                const postDayOfWeek = moment(postDate).format('dddd');
            
                const filePath = path.join(__dirname, '../../../source/_data/daily_news_'+postDate+'.json');
                console.log('Daily news save data filePath is :', filePath);

                // 生成json文件
                fs.writeFileSync(filePath, JSON.stringify(newsData, null, 2));
                

                // 生成 Markdown 文件
                // const postDayOfWeek = moment().format('dddd'); // 获取中文的星期几
                const postTitle = `【每日早报】-${postDate} - ${postDayOfWeek}`;
                const postContent = `---
title: ${postTitle}
date: ${postDate} 00:00:00
tags:
  - 每日早报
categories:
  - 每日早报
series: 每日早报
cover: ${newsData.head_image}
---

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日早报</title>
</head>

<body>
    <div style="text-align: center;"> <img src="https://blog.shiguang666.eu.org/`+newsData.image+`"
            alt="每日早报" width="100%"> </div>
</body>

</html>`;

                const postFilePath = path.join(__dirname, '../../../source/_posts', `${postTitle}.md`);
                fs.writeFileSync(postFilePath, postContent);

                
                console.log('Daily news post generated successfully:', postFilePath);
            } else {
                console.error('Failed to fetch daily news:', data.msg);
            }
        })
        .catch(error => {
            console.error('Error fetching daily news:', error);
        });
});
```

<p>此处需要 用到两个插件 <code>axios</code> 和 <code>moment</code></p>
<p>安装 <code>axios</code> </p>

```bash
npm install axios
```

<p>安装 <code>moment</code></p>

```bash
npm install moment
```

<p>调用接口生成的数据会保存在博客主目录 <code>/source/_data/daily_news_xxxx-xx-xx.json</code>，如果没有<code>_data</code>目录可以手动创建一下，防止因找不到目录文件保存失败。</p>
<p>注意根据实际情况调整文件的存放路径</p>

```js
const postFilePath = path.join(__dirname, '../../../source/_posts', `${postTitle}.md`);
```

<p>文章的标题，目录，标签，系列文章分类等也可自行调整</p>

```yaml
tags:
  - 每日早报
categories:
  - 每日早报
series: 每日早报
```

<p>为了确保 Hexo 能够正确加载 <code>_data</code> 目录下的数据文件。可以在 <code>_config.yml</code> 文件中添加以下配置，确保 <code>_data</code> 目录被正确加载</p>

```yaml
data_dir: source/_data
```

<p>执行 <code>hexo g</code> 重新生成html文件时会保存 <code>daily_news_xxxx-xx-xx.json</code> 并 生成一篇新的文章，控制台会打印相应日志</p>
<p><img src="/wp-content/uploads/2026/07/1778491837973_670fbe765e6c2.png" alt="image-20240621103332176" loading="lazy" /></p>
<p>获取到的数据如下，只要有了数据，我们就能自由发挥，实现无限可能，例如挂载到侧边栏等等</p>
<p><img src="/wp-content/uploads/2026/07/1778491831853_670fbe76c444f.png" alt="image-20240620205056880" loading="lazy" /></p>
<p>如果你只想生成一篇文章，然后把这篇文章置顶，那只需要将生成的markdown文件名固定就可以了，例如</p>

```js
const postFilePath = path.join(__dirname, '../../../source/_posts', `每日早报.md`);
```

<p>这样每次执行 <code>hexo g</code> 时重新生成的文件会覆盖原来的文件</p>
<p>如果想要执行历史数据，只需将执行历史数据部分取消注释，修改数据文件名称就可以了</p>

```js
 // 执行历史数据 Start

// const oldDataFileName = "daily_news_2024-06-20.json"  // 修改需要执行的数据文件名称
// const oldDataPath = path.join(__dirname, '../../../source/_data/'+oldDataFileName);
// console.log("Daily news oldDataPath is :",oldDataPath);
// const oldData = JSON.parse(fs.readFileSync(oldDataPath, 'utf8'));
// newsData = oldData;

// 执行历史数据 End
```

<h2 id="2-4、通过计划任务自动生成并部署博客文件"><a href="#2-4%E3%80%81%E9%80%9A%E8%BF%87%E8%AE%A1%E5%88%92%E4%BB%BB%E5%8A%A1%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%8D%9A%E5%AE%A2%E6%96%87%E4%BB%B6" class="headerlink" title="2.4、通过计划任务自动生成并部署博客文件"></a>2.4、通过计划任务自动生成并部署博客文件</h2><p>每天都需手动执行命令生成文件不够优雅，我们可以创建计划任务，每天自动执行命令生成文件</p>
<p>在 Windows 上，你可以使用任务计划程序（Task Scheduler）来设置一个计划任务，以便每天自动执行 <code>hexo g</code> 命令来生成文件。以下是详细步骤：</p>
<h3 id="打开任务计划程序"><a href="#%E6%89%93%E5%BC%80%E4%BB%BB%E5%8A%A1%E8%AE%A1%E5%88%92%E7%A8%8B%E5%BA%8F" class="headerlink" title="打开任务计划程序"></a><strong>打开任务计划程序</strong></h3><ul>
<li><p>按 <code>Win + S</code> 打开搜索栏，输入 <code>任务计划程序</code>，或者 <code>Win + R</code> 打开运行输入框输入 <code>taskschd.msc</code>然后按回车键。</p>
<p><img src="/wp-content/uploads/2026/07/1778491833429_670fbe772b1e2.png" alt="image-20240620210504118" loading="lazy" /></p>
</li>
</ul>
<h3 id="创建基本任务"><a href="#%E5%88%9B%E5%BB%BA%E5%9F%BA%E6%9C%AC%E4%BB%BB%E5%8A%A1" class="headerlink" title="创建基本任务"></a><strong>创建基本任务</strong></h3><ul>
<li>在任务计划程序窗口的右侧，点击 <code>创建基本任务</code>。</li>
</ul>
<ol>
<li><p><strong>填写基本任务信息</strong>：</p>
<ul>
<li><p>输入任务的名称和描述，例如 <code>Hexo Generate Daily</code>。</p>
<p><img src="/wp-content/uploads/2026/07/1778491838679_670fbe77b1170.png" alt="image-20240620211411416" loading="lazy" /></p>
</li>
<li><p>点击 <code>下一页</code>。</p>
</li>
</ul>
</li>
<li><p><strong>设置触发器</strong>：</p>
<ul>
<li><p>选择 <code>每天</code>，然后点击 <code>下一页</code>。</p>
<p><img src="/wp-content/uploads/2026/07/1778491835519_670fbe7819e92.png" alt="image-20240620211511880" loading="lazy" /></p>
</li>
<li><p>设置开始日期和时间，以及重复间隔（例如每天），例如我设置为每天早上9点执行一次</p>
<p><img src="/wp-content/uploads/2026/07/1778491835408_670fbe786a0ac.png" alt="image-20240620211712722" loading="lazy" /></p>
</li>
<li><p>点击 <code>下一页</code>。</p>
</li>
</ul>
</li>
<li><p><strong>设置操作</strong>：</p>
<ul>
<li><p>选择 <code>启动程序</code>，然后点击 <code>下一页</code>。</p>
<p><img src="/wp-content/uploads/2026/07/1778491842553_670fbe78ab9a7.png" alt="image-20240620211803878" loading="lazy" /></p>
</li>
</ul>
</li>
<li><p><strong>配置启动程序</strong>：</p>
<ul>
<li><p>在 <code>程序/脚本</code> 字段中，输入 <code>cmd</code>，点击预览，选择<code>cmd.exe</code></p>
</li>
<li><p>在 <code>添加参数</code> 字段中，输入 <code>/c "cd /d D:\path\to\your\hexo\blog &amp;&amp; hexo g &amp;&amp; hexo d"</code>，其中 <code>D:\path\to\your\hexo\blog</code> 是你的 Hexo 博客目录的路径。</p>
</li>
<li><p>点击 <code>下一页</code>。</p>
<p><img src="/wp-content/uploads/2026/07/1778491842874_670fbe78e92a4.png" alt="image-20240620212207650" loading="lazy" /></p>
</li>
</ul>
</li>
<li><p><strong>完成任务创建</strong>：</p>
<ul>
<li>确认所有设置，然后点击 <code>完成</code>。</li>
</ul>
</li>
<li><p><strong>检查任务</strong>：</p>
<ul>
<li>在任务计划程序库中，找到你创建的任务，确保它已启用。</li>
</ul>
</li>
<li><p><strong>启用历史记录</strong></p>
</li>
</ol>
<p>​			<img src="/wp-content/uploads/2026/07/1778491846711_670fbe79506ae.png" alt="image-20240620215553151" loading="lazy" /></p>
<p>这样，任务计划程序会每天在指定的时间自动执行 <code>hexo g &amp;&amp; hexo d</code> 命令来生成并部署你的 Hexo 博客文件。</p>
<p>当然，也可以执行 <code>hexo clean &amp;&amp; hexo g &amp;&amp; hexo d</code> 清除缓存数据</p>
<h3 id="注意事项"><a href="#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9" class="headerlink" title="注意事项"></a>注意事项</h3><ul>
<li><p>确保你的 Hexo 博客目录路径正确无误。</p>
</li>
<li><p>确保你的系统中已经安装了 Node.js 和 Hexo，并且 <code>hexo</code> 命令可以在命令行中正常运行。</p>
</li>
<li><p>如果你在执行命令时需要管理员权限，可以在任务计划程序中属性设置使用最高权限运行该任务。</p>
<p><img src="/wp-content/uploads/2026/07/1778491842369_670fbe7993958.png" alt="image-20240620214050771" loading="lazy" /></p>
<p>如果保存时提示”一个或多个指定的参数无效”错误，可参考下面的文章</p>
<p><a target="_blank" rel="noopener" href="https://jingyan.baidu.com/article/3052f5a116814597f31f86b8.html">解决任务计划程序出错一个或多个指定的参数无效</a></p>
</li>
</ul>
<h2 id="2-5、后续"><a href="#2-5%E3%80%81%E5%90%8E%E7%BB%AD" class="headerlink" title="2.5、后续"></a>2.5、后续</h2><p>现已将插件发布到<a target="_blank" rel="noopener" href="https://www.npmjs.com/package/hexo-daily-news">NPM</a>，并开源到 <a target="_blank" rel="noopener" href="https://github.com/Shiguang-coding/hexo-daily-news/">Github</a>，可直接通过命令安装</p>

```bash
npm install hexo-daily-news --save
```

<p>现插件已被 <a target="_blank" rel="noopener" href="https://hexo.io/">Hexo</a>官方收录，你可也在 <a target="_blank" rel="noopener" href="https://hexo.io/plugins/">Hexo 插件列表</a>里查看</p>
<p><img src="/wp-content/uploads/2026/07/1778491846481_670fbe7a0a118.png" alt="image-20240625182035596" loading="lazy" /></p>
</div></article>

文章来源：<a href="https://blog.shiguang666.eu.org/2024/06/20/b12b7a6a9c77/" target="_blank" rel="nofollow" title="https://blog.shiguang666.eu.org/2024/06/20/b12b7a6a9c77/">blog.shiguang666.eu.org
