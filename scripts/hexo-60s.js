'use strict';
/*
 * hexo-60s — 每天60秒读懂世界（jun.la 风格）自动生成插件
 * ----------------------------------------------------------------------------
 * 数据源：60s.viki.moe（开源 https://github.com/vikiboss/60s）
 *   - text 接口（?encoding=text）：新闻条目 + 【微语】
 *   - JSON 接口（/v2/60s）：date / day_of_week / lunar_date / 海报 image
 * 行为：
 *   1) 作为 hexo 脚本被自动加载时：
 *      - 注册控制台命令 `hexo 60s [--date=YYYY-MM-DD] [--force]` 手动生成
 *      - 注册 generateBefore 过滤器：每次 `hexo generate` 前自动补齐“当日”早报
 *   2) 也可独立运行：`node scripts/hexo-60s.js [--date=YYYY-MM-DD] [--force]`
 * 产出：source/_posts/YYYY-MM-DD-60s-world.md（与既有 60s 文章格式完全一致）
 * 特性：幂等（当日已存在则跳过，除非 --force）；网络失败不致命（仅告警）。
 */

const fs = require('fs');
const path = require('path');

const CONFIG = {
  apiBase: 'https://60s.viki.moe/v2/60s',
  postsDir: path.join(__dirname, '..', 'source', '_posts'),
  // 海报固定用本站预存素材库（按星期几映射 w1-w7），不热链、不怕防盗链
  posterBase: '/wp-content/uploads/60s-posters/w',
  centerLogo: '每天60秒读懂世界',
  sourceLine: '来源：澎湃新闻、人民日报、腾讯新闻、网易新闻、新华网、中国新闻网',
  category: '60秒读懂世界',
  ua: 'Mozilla/5.0 (compatible; Junla60Hexo/1.0)',
  timeoutMs: 20000,
};

/* 北京当前日期 YYYY-MM-DD */
function todayCST() {
  // 在 UTC 时间上 +8h 再取日期部分，即北京时间日期（中国无夏令时）
  return new Date(Date.now() + 8 * 3600 * 1000).toISOString().slice(0, 10);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function fetchText(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), CONFIG.timeoutMs);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': CONFIG.ua }, signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

async function fetchJson(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), CONFIG.timeoutMs);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': CONFIG.ua }, signal: ctrl.signal });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const j = await res.json();
    if (!j || !j.data) throw new Error('返回数据格式异常');
    return j.data;
  } finally {
    clearTimeout(t);
  }
}

/* 解析 text 接口：标题行取日期，编号行取新闻，含“微语”的行取金句 */
function parseText(body) {
  const news = [];
  let tip = '';
  let date = '';
  const lines = body.split(/\r\n|\r|\n/);
  for (const raw of lines) {
    const ln = raw.trim();
    if (!ln) continue;
    const mDate = ln.match(/每天\s*60s.*?(\d{4}-\d{2}-\d{2})/iu);
    if (mDate) { date = mDate[1]; continue; }
    if (ln.includes('微语')) { tip = ln; continue; }
    const mNews = ln.match(/^\d+[.．、]\s*(.+)$/u);
    if (mNews) { news.push(mNews[1].trim()); continue; }
  }
  if (!news.length) throw new Error('text 接口未解析到新闻条目');
  if (!date) date = todayCST();
  return { date, news, tip };
}

/* 取星期几（中文） */
function weekdayCn(ts) {
  const w = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  return w[new Date(ts).getUTCDay()];
}

/* 农历去“X年”前缀，仅保留“八月初六” */
function stripLunarYear(lunar) {
  if (!lunar) return '';
  const m = lunar.match(/年(.+)$/u);
  return m ? m[1] : lunar;
}

/* 组装 markdown 全文 */
function buildMarkdown(data) {
  const ts = new Date(data.date + 'T08:00:00+08:00').getTime();
  const year = new Date(ts).getUTCFullYear();
  const month = new Date(ts).getUTCMonth() + 1;
  const day = new Date(ts).getUTCDate();
  const md = `${month}月${day}日`;
  const week = data.day_of_week || weekdayCn(ts);
  const lunar = stripLunarYear(data.lunar_date);

  const w = new Date(ts).getUTCDay(); // 0=周日
  const posterIdx = w === 0 ? 7 : w; // 1=周一 … 7=周日
  const cover = CONFIG.posterBase + posterIdx + '.png';

  const title = `${md}，${week}，在这里每天60秒读懂世界！`;
  const dateISO = `${data.date}T08:00:00+08:00`;

  // 描述：前 3 条新闻摘要
  const desc = data.news.slice(0, 3).join('；');
  const description = desc.length > 110 ? desc.slice(0, 110) + '…' : desc;

  // 卡片 HTML（与既有 60s 文章结构完全一致）
  let card = '<div class="junla-60s"><div class="js-card">';
  card += `<div class="js-cover"><img src="${cover}" alt="${escapeHtml(title + ' ' + data.date)}"></div>`;
  card += '<div class="js-news-label">NEWS</div>';
  card += '<div class="js-datebar">';
  card += `<div class="js-date-left"><span>农历</span><span>${escapeHtml(lunar)}</span></div>`;
  card += `<div class="js-date-center"><span class="js-logo">${escapeHtml(CONFIG.centerLogo)}</span></div>`;
  card += `<div class="js-date-right"><span>${year}年</span><span>${md}</span></div>`;
  card += '</div>';
  card += '<div class="js-news">';
  data.news.forEach((item, i) => {
    card += `<p class="js-item">${i + 1}、${escapeHtml(item)}</p>`;
  });
  card += '</div>';
  if (data.tip) {
    card += `<p class="js-quote">${escapeHtml(data.tip)}</p>`;
  }
  card += `<p class="js-source">${escapeHtml(CONFIG.sourceLine)}</p>`;
  card += '</div></div>';

  const fm = [
    '---',
    `title: "${title}"`,
    `date: '${dateISO}'`,
    `updated: '${dateISO}'`,
    `slug: ${data.date}-60s-world`,
    'categories:',
    `- "${CONFIG.category}"`,
    `description: "${escapeHtml(description)}"`,
    `cover: "${cover}"`,
    '---',
    '',
    card,
    '',
  ].join('\n');

  return { fm, title, cover };
}

/* 抓取并组装指定日期的早报数据（多源兜底） */
async function fetchData(dateStr) {
  const textUrl = `${CONFIG.apiBase}?encoding=text` + (dateStr !== todayCST() ? `&date=${dateStr}` : '');
  const jsonUrl = CONFIG.apiBase + (dateStr !== todayCST() ? `?date=${dateStr}` : '');

  // 主源：text 接口（新闻 + 微语 + 日期）
  try {
    const body = await fetchText(textUrl);
    const t = parseText(body);
    const data = {
      date: t.date,
      news: t.news,
      tip: t.tip,
      day_of_week: '',
      lunar_date: '',
    };
    // 元信息（农历 / 星期）从 JSON 接口补齐；失败则降级
    try {
      const m = await fetchJson(jsonUrl);
      data.day_of_week = m.day_of_week || '';
      data.lunar_date = m.lunar_date || '';
    } catch (e) {
      // 优雅降级：新闻/微语已齐，仅缺农历与星期
    }
    if (!data.day_of_week) data.day_of_week = weekdayCn(new Date(data.date + 'T08:00:00+08:00').getTime());
    return data;
  } catch (e) {
    // text 失败 → 退回 JSON（含 news/tip/农历/星期/海报）
    const m = await fetchJson(jsonUrl);
    return {
      date: m.date,
      news: m.news || [],
      tip: m.tip ? '【微语】' + m.tip : '',
      day_of_week: m.day_of_week || '',
      lunar_date: m.lunar_date || '',
    };
  }
}

/* 生成单篇早报；幂等；返回 { created, skipped, message, path } */
async function generate60s(dateStr, force) {
  dateStr = dateStr || todayCST();
  const filePath = path.join(CONFIG.postsDir, `${dateStr}-60s-world.md`);

  if (fs.existsSync(filePath) && !force) {
    return { created: false, skipped: true, message: `已存在，跳过：${dateStr}-60s-world.md`, path: filePath };
  }

  const data = await fetchData(dateStr);
  if (!data.news || !data.news.length) {
    return { created: false, skipped: false, message: `当日无新闻内容，未生成（${dateStr}）`, path: null };
  }

  const { fm, title, cover } = buildMarkdown(data);
  fs.mkdirSync(CONFIG.postsDir, { recursive: true });
  fs.writeFileSync(filePath, fm, 'utf8');
  return {
    created: true,
    skipped: false,
    message: `${force ? '已覆盖' : '已生成'}：${dateStr}-60s-world.md （${data.news.length} 条新闻，封面 ${cover}）`,
    path: filePath,
    title,
  };
}

/* ============================ 入口 ============================ */
async function main() {
  const argv = process.argv.slice(2);
  let date = null;
  let force = false;
  for (const a of argv) {
    const dm = a.match(/^--date=(\d{4}-\d{2}-\d{2})$/);
    if (dm) date = dm[1];
    if (a === '--force' || a === '-f') force = true;
  }
  const r = await generate60s(date, force);
  console.log(r.message);
  process.exit(r.created || r.skipped ? 0 : 1);
}

// 作为 hexo 脚本被加载时注册命令与钩子
try {
  if (typeof hexo !== 'undefined' && hexo.extend) {
    hexo.extend.console.register('60s', async (args) => {
      const date = (args && (args.date || args._ && args._[0])) || todayCST();
      const r = await generate60s(date, !!(args && args.force));
      console.log(r.message);
    });
    // 每次构建前自动补齐当日早报（已存在则跳过，不重复抓取）
    hexo.extend.filter.register('generateBefore', async () => {
      try {
        const r = await generate60s(todayCST(), false);
        if (r.created) console.log('[60s] ' + r.message);
      } catch (e) {
        console.warn('[60s] 自动生成失败（已跳过，不影响构建）：', e.message);
      }
    });
  }
} catch (e) {
  /* 非 hexo 环境（独立运行）忽略 */
}

// 独立运行
if (require.main === module) {
  main().catch((e) => {
    console.error('生成失败：', e && e.message ? e.message : e);
    process.exit(1);
  });
}

module.exports = { generate60s, buildMarkdown, todayCST };
