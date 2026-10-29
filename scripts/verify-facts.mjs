#!/usr/bin/env node
/**
 * PostClose fact check — 站点事实的内置校验器。
 *
 * 目标：让「时间、人数、金额」这类最容易出错的数字，在进入构建前就被检查。
 * 它不判断叙事是否精彩，只判断：
 *   1. 日期是否自洽、是否在未来、精度是否被夸大；
 *   2. 金额是否被标成「已披露」却没有数字，或用未披露的数字冒充对价；
 *   3. 带有数字的结构化信号是否都有来源；
 *   4. 来源链接是否合法、重复、日期是否在未来；
 *   5. 正文里的数字/年份是否有就近来源（警告，供人工判断）。
 *
 * 用法：
 *   pnpm facts            # 规则检查
 *   pnpm facts --strict   # 警告也视为失败
 *   pnpm facts --links    # 额外检查来源链接可访问性（需要网络）
 *   pnpm facts --json     # 机器可读输出
 */
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = process.cwd();
const COLLECTIONS = [
  { name: 'cases', dir: 'src/content/cases', kind: 'case' },
  { name: 'watchlist', dir: 'src/content/watchlist', kind: 'watchlist' },
];

const argv = new Set(process.argv.slice(2));
const STRICT = argv.has('--strict');
const CHECK_LINKS = argv.has('--links');
const AS_JSON = argv.has('--json');
const MAX_AGE_DAYS = 180;
const STALE_WARN_DAYS = 90;

const TODAY = startOfUtcDay(new Date());
const issues = [];

/* -------------------------------------------------------------------------- */
/* helpers                                                                     */
/* -------------------------------------------------------------------------- */

function startOfUtcDay(d) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

function daysBetween(a, b) {
  return Math.round((startOfUtcDay(a) - startOfUtcDay(b)) / 86_400_000);
}

function toDate(value) {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) return value;
  if (typeof value === 'string' || typeof value === 'number') {
    const d = new Date(value);
    if (!Number.isNaN(d.valueOf())) return d;
  }
  return null;
}

function iso(d) {
  return d ? d.toISOString().slice(0, 10) : '—';
}

function report(level, file, rule, message) {
  issues.push({ level, file, rule, message });
}

function info(file, rule, message) {
  report('info', file, rule, message);
}

function parseEntry(raw, file) {
  if (!raw.startsWith('---')) {
    report('error', file, 'FM-01', '文件缺少 frontmatter');
    return null;
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    report('error', file, 'FM-01', 'frontmatter 未闭合');
    return null;
  }
  const fmText = raw.slice(4, end);
  const body = raw.slice(end + 4);
  try {
    return { data: YAML.parse(fmText) ?? {}, body };
  } catch (error) {
    report('error', file, 'FM-02', `YAML 解析失败：${error.message}`);
    return null;
  }
}

function isUrl(value) {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/* -------------------------------------------------------------------------- */
/* rules                                                                       */
/* -------------------------------------------------------------------------- */

function checkVerified(data, file) {
  const verified = toDate(data.lastVerified);
  if (!verified) {
    report('error', file, 'DATE-01', 'lastVerified 缺失或无法解析');
    return;
  }
  if (verified > TODAY) {
    report('error', file, 'DATE-07', `lastVerified 在未来：${iso(verified)}`);
    return;
  }
  const age = daysBetween(TODAY, verified);
  if (age > MAX_AGE_DAYS) {
    report('error', file, 'DATE-08', `最后核验已过期 ${age} 天（上限 ${MAX_AGE_DAYS} 天）`);
  } else if (age > STALE_WARN_DAYS) {
    report('warn', file, 'DATE-08', `最后核验已 ${age} 天，建议回查`);
  }
}

function checkCaseDates(data, file) {
  const announced = toDate(data.announcedAt);
  const completed = toDate(data.completedAt);

  if (!announced) report('error', file, 'DATE-01', 'announcedAt 缺失或无法解析');

  if (announced && announced > TODAY) {
    report('error', file, 'DATE-02', `公告日期在未来：${iso(announced)}`);
  }
  if (completed && announced && completed < announced) {
    report('error', file, 'DATE-03', `完成日期早于公告日期：${iso(completed)} < ${iso(announced)}`);
  }
  if (completed && completed > TODAY) {
    report('error', file, 'DATE-04', `完成日期在未来：${iso(completed)}`);
  }

  if (data.status === 'completed' && !completed) {
    report('error', file, 'DATE-05', '状态为 completed，但缺少 completedAt');
  }
  if (['announced', 'terminated'].includes(data.status) && completed) {
    report('error', file, 'DATE-06', `状态为 ${data.status}，不应有 completedAt`);
  }
  if (data.status === 'team-join' && !completed) {
    report('error', file, 'DATE-05', '状态为 team-join，但缺少团队加入日期');
  }

  if (data.founded != null) {
    if (!Number.isInteger(data.founded) || data.founded < 1900 || data.founded > TODAY.getUTCFullYear()) {
      report('error', file, 'DATE-09', `founded 不合法：${data.founded}`);
    } else if (announced && data.founded > announced.getUTCFullYear()) {
      report('error', file, 'DATE-09', `founded ${data.founded} 晚于交易年份`);
    }
  }
}

function checkWatchDates(data, file) {
  if (data.founded != null) {
    if (!Number.isInteger(data.founded) || data.founded < 1900 || data.founded > TODAY.getUTCFullYear()) {
      report('error', file, 'DATE-09', `founded 不合法：${data.founded}`);
    }
  }
}

function checkTimeline(data, file) {
  const events = Array.isArray(data.timeline) ? data.timeline : [];
  let last = null;
  for (const [index, event] of events.entries()) {
    const where = `timeline[${index}]「${event?.title ?? '?'}」`;
    const date = toDate(event?.date);
    if (!date) {
      report('error', file, 'DATE-10', `${where} 日期无法解析`);
      continue;
    }
    const year = date.getUTCFullYear();
    if (year < 1990 || date > addYears(TODAY, 5)) {
      report('error', file, 'DATE-10', `${where} 日期超出合理范围：${iso(date)}`);
    }
    if (date > TODAY && !event.detail) {
      report('error', file, 'DATE-11', `${where} 是未来事件，但没有 detail 说明计划内容`);
    }
    if (event.dateLabel) {
      const mismatch = checkDateLabel(event.dateLabel, date);
      if (mismatch) report('error', file, 'DATE-12', `${where} ${mismatch}`);
    }
    if (last && date < last) {
      report('warn', file, 'DATE-13', `${where} 未按时间升序排列`);
    }
    last = date;
  }
}

function addYears(date, n) {
  const d = new Date(date);
  d.setUTCFullYear(d.getUTCFullYear() + n);
  return d;
}

function checkDateLabel(label, date) {
  const yearOnly = /^(\d{4})\s*年$/.exec(label);
  if (yearOnly) {
    const year = Number(yearOnly[1]);
    if (year !== date.getUTCFullYear()) return `dateLabel「${label}」与日期年份不一致`;
    if (date.getUTCMonth() !== 0 || date.getUTCDate() !== 1) {
      return `dateLabel「${label}」只到年份，日期应记为 ${year}-01-01`;
    }
    return null;
  }
  const yearMonth = /^(\d{4})\s*年\s*(\d{1,2})\s*月$/.exec(label);
  if (yearMonth) {
    const year = Number(yearMonth[1]);
    const month = Number(yearMonth[2]) - 1;
    if (year !== date.getUTCFullYear() || month !== date.getUTCMonth()) {
      return `dateLabel「${label}」与日期不一致`;
    }
    if (date.getUTCDate() !== 1) {
      return `dateLabel「${label}」只到月份，日期应记为当月 1 日`;
    }
  }
  return null;
}

function checkAmount(data, file) {
  const amount = data.amount ?? {};
  const value = amount.value;
  if (amount.disclosed === true) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0) {
      report('error', file, 'AMT-01', 'amount.disclosed 为 true，但 value 不是正数');
    } else if (value < 1_000 || value > 10_000_000_000_000) {
      report('error', file, 'AMT-04', `amount.value 超出合理范围：${value}`);
    }
    if (!amount.note) {
      report('warn', file, 'AMT-06', '披露了对价，但没有 note 说明口径（现金/股票/企业价值）');
    }
  } else {
    if (value != null) {
      report('error', file, 'AMT-02', '未披露对价却填了 value；应删除 value，把口径写进 note');
    }
    if (!amount.note) {
      report('error', file, 'AMT-03', '未披露对价时必须在 note 中说明（例如媒体口径或未披露原因）');
    }
  }
  if (data.status === 'terminated' && amount.disclosed) {
    const note = String(amount.note ?? '');
    if (!/(终止|未完成|未交割|取消)/.test(note)) {
      report('error', file, 'AMT-05', '交易已终止，对价 note 必须说明交易未完成');
    }
  }
}

function checkSignals(data, file) {
  const signals = Array.isArray(data.signals) ? data.signals : [];
  for (const [index, signal] of signals.entries()) {
    const value = String(signal?.value ?? '');
    if (/\d/.test(value) && !signal?.source) {
      report(
        'error',
        file,
        'SIG-01',
        `signals[${index}]「${signal?.label ?? '?'}」含有数字，但没有 source`,
      );
    }
    if (signal?.source && !isUrl(signal.source)) {
      report('error', file, 'SRC-01', `signals[${index}] 的 source 不是合法 URL`);
    }
  }
}

function checkSources(data, file) {
  const sources = Array.isArray(data.sources) ? data.sources : [];
  if (sources.length === 0) report('error', file, 'SRC-00', '至少需要一条来源');

  const seen = new Map();
  for (const [index, source] of sources.entries()) {
    const label = `sources[${index}]「${source?.title ?? '?'}」`;
    if (!isUrl(source?.url)) {
      report('error', file, 'SRC-01', `${label} 的 URL 不合法`);
      continue;
    }
    if (seen.has(source.url)) {
      report('error', file, 'SRC-02', `${label} 与 sources[${seen.get(source.url)}] 重复`);
    } else {
      seen.set(source.url, index);
    }
    const date = toDate(source.date);
    if (date && date > TODAY) {
      report('error', file, 'SRC-03', `${label} 的来源日期在未来：${iso(date)}`);
    }
    if (source.type === 'primary' && !date) {
      info(file, 'SRC-04', `${label} 是一手来源，但没有发布日期`);
    }
    if (source.retrieved && toDate(source.retrieved) > TODAY) {
      report('error', file, 'SRC-03', `${label} 的 retrieved 在未来`);
    }
  }

  if (data.evidence === 'A') {
    const primary = sources.filter((s) => s.type === 'primary' || s.type === 'filing');
    if (primary.length < 2) {
      report('warn', file, 'EV-01', '证据等级为 A，但直接一手来源少于 2 条');
    }
  }
}

function checkStatusConsistency(data, file) {
  if (data.dealType === 'team-join' && data.status !== 'team-join') {
    report('error', file, 'DEAL-01', 'dealType 为 team-join，status 也应为 team-join');
  }
  if (data.status === 'team-join' && !['team-join', 'acquihire'].includes(data.dealType)) {
    report('error', file, 'DEAL-02', 'status 为 team-join 时，dealType 应为 team-join 或 acquihire');
  }
}

/**
 * 正文数字检查：只列出「人数 / 金额」，不判断真伪，也不阻断构建。
 * 每个文件汇总成一条 info，供维护者或代理逐条回查。
 */
function collectBodyClaims(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}.*$/gm, '');
  const claims = [];
  const patterns = [
    { re: /(\d[\d,]*(?:\.\d+)?)\s*(?:人|名员工|名|位)/g, kind: '人数' },
    { re: /(?:\$|US\$)\s?\d[\d,.]*\s?(?:[BMK])?|\d[\d,.]*\s*(?:万|亿)?\s*(?:美元|美金)/g, kind: '金额' },
  ];
  for (const { re, kind } of patterns) {
    for (const match of text.matchAll(re)) {
      const snippet = text.slice(Math.max(0, match.index - 18), match.index + match[0].length + 24).replace(/\s+/g, ' ');
      claims.push({ kind, text: match[0], snippet });
    }
  }
  return claims;
}

/* -------------------------------------------------------------------------- */
/* link checking                                                               */
/* -------------------------------------------------------------------------- */

async function checkLinks(entries) {
  const urls = new Map();
  for (const { file, data } of entries) {
    for (const source of data.sources ?? []) {
      if (isUrl(source?.url) && !urls.has(source.url)) urls.set(source.url, file);
    }
    for (const signal of data.signals ?? []) {
      if (isUrl(signal?.source) && !urls.has(signal.source)) urls.set(signal.source, file);
    }
  }

  const list = [...urls.entries()];
  const queue = [...list];
  const results = [];
  const worker = async () => {
    while (queue.length > 0) {
      const [url, file] = queue.shift();
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15_000);
        const res = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          signal: controller.signal,
          headers: { 'User-Agent': 'PostCloseFactCheck/1.0 (+https://github.com/wilsonwangdev/postclose)' },
        });
        clearTimeout(timer);
        results.push({ url, file, status: res.status });
      } catch (error) {
        results.push({ url, file, status: 0, error: String(error?.message ?? error) });
      }
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));

  for (const r of results) {
    if (r.status === 0 || r.status >= 400) {
      const blocked = [401, 403, 429].includes(r.status);
      report(
        'warn',
        r.file,
        'LINK-01',
        `${blocked ? '被站点拦截（可能仍可访问）' : '无法访问'} ${r.status || r.error} · ${r.url}`,
      );
    }
  }
  return results.length;
}

/* -------------------------------------------------------------------------- */
/* main                                                                        */
/* -------------------------------------------------------------------------- */

const entries = [];
for (const collection of COLLECTIONS) {
  const dir = path.join(ROOT, collection.dir);
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir).filter((f) => f.endsWith('.md')).sort()) {
    const file = path.join(collection.dir, name);
    const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const parsed = parseEntry(raw, file);
    if (!parsed) continue;
    entries.push({ ...parsed, file, kind: collection.kind });
  }
}

for (const entry of entries) {
  const { data, body, file } = entry;
  checkVerified(data, file);
  checkSources(data, file);
  checkTimeline(data, file);
  checkSignals(data, file);

  if (entry.kind === 'case') {
    checkCaseDates(data, file);
    checkAmount(data, file);
    checkStatusConsistency(data, file);
  } else {
    checkWatchDates(data, file);
    if (data.status === 'acquired') {
      report('warn', file, 'WATCH-01', '观察对象已被收购，考虑移入 cases 并保留原页面重定向');
    }
  }

  const claims = collectBodyClaims(body);
  if (claims.length > 0) {
    const sample = claims.slice(0, 3).map((c) => `${c.kind}「${c.text}」`).join('、');
    info(file, 'BODY-01', `正文含 ${claims.length} 处人数/金额表述，需人工核对来源：${sample}${claims.length > 3 ? ' 等' : ''}`);
  }
}

let checkedLinks = 0;
if (CHECK_LINKS) checkedLinks = await checkLinks(entries);

const errors = issues.filter((i) => i.level === 'error');
const warnings = issues.filter((i) => i.level === 'warn');
const infos = issues.filter((i) => i.level === 'info');

if (AS_JSON) {
  console.log(JSON.stringify({ entries: entries.length, checkedLinks, errors, warnings, infos }, null, 2));
} else {
  const bold = (s) => (process.stdout.isTTY ? `\x1b[1m${s}\x1b[0m` : s);
  const red = (s) => (process.stdout.isTTY ? `\x1b[31m${s}\x1b[0m` : s);
  const yellow = (s) => (process.stdout.isTTY ? `\x1b[33m${s}\x1b[0m` : s);
  const dim = (s) => (process.stdout.isTTY ? `\x1b[2m${s}\x1b[0m` : s);

  console.log(bold(`PostClose fact check · ${entries.length} 个条目${CHECK_LINKS ? ` · ${checkedLinks} 条链接` : ''}`));
  for (const issue of issues) {
    if (issue.level === 'info') continue;
    const color = issue.level === 'error' ? red : yellow;
    console.log(`${color(issue.level === 'error' ? '✗' : '!')} ${issue.file} ${dim(`[${issue.rule}]`)} ${issue.message}`);
  }
  if (infos.length > 0) {
    console.log(dim(`\n待人工核对（不阻断构建）：${infos.length} 条`));
    for (const issue of infos) {
      console.log(dim(`· ${issue.file} [${issue.rule}] ${issue.message}`));
    }
  }
  if (issues.length === 0) console.log('✓ 所有规则通过');
  console.log(
    `\n${errors.length === 0 ? '✓' : '✗'} ${errors.length} errors · ${warnings.length} warnings · ${infos.length} info`,
  );
}

process.exit(errors.length > 0 || (STRICT && warnings.length > 0) ? 1 : 0);
