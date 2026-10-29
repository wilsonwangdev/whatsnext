#!/usr/bin/env node
/**
 * 每周监测：只找“确定性变化”，产出 markdown 报告，供 GitHub issue 使用。
 * 不修改内容、不提交、不发布。
 *
 * 检查项：
 *   1. GitHub 仓库：新 release、许可证与内容不一致、归档、转移
 *   2. 产品站点：404 / 410 / 5xx / DNS 失败
 *   3. 来源链接：404 / 410
 *   4. 内容：超过 90 天未核验、未来 120 天内的计划
 *
 * 用法：
 *   node scripts/watch.mjs          # 输出 markdown
 *   node scripts/watch.mjs --json   # 输出 JSON
 */
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';

const ROOT = process.cwd();
const AS_JSON = process.argv.includes('--json');
const TOKEN = process.env.GITHUB_TOKEN;
const SITE = process.env.SITE_URL ?? 'https://wilsonwangdev.github.io';
const BASE = process.env.BASE_PATH ?? '/postclose/';
const TODAY = new Date();
TODAY.setUTCHours(0, 0, 0, 0);

const RECENT_DAYS = 8;
const STALE_DAYS = 90;
const PLAN_WINDOW = 120;

const config = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/watch.json'), 'utf8'));

const findings = {
  changes: [],
  broken: [],
  stale: [],
  plans: [],
  blocked: [],
};

/* -------------------------------------------------------------------------- */
/* helpers                                                                     */
/* -------------------------------------------------------------------------- */

function daysAgo(date) {
  return Math.round((TODAY.getTime() - date.getTime()) / 86_400_000);
}

function daysUntil(date) {
  return Math.round((date.getTime() - TODAY.getTime()) / 86_400_000);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url, { timeout = 15_000, headers = {} } = {}, attempt = 0) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'PostClose-Watch/1.0 (+https://github.com/wilsonwangdev/postclose)',
        ...headers,
      },
    });
    // 只关心状态码，及时释放响应体
    res.body?.cancel().catch(() => {});
    return { status: res.status, ok: res.ok, url: res.url };
  } catch (error) {
    if (attempt < 1) {
      await sleep(500);
      return request(url, { timeout, headers }, attempt + 1);
    }
    return { status: 0, ok: false, error: String(error?.cause?.code ?? error?.message ?? error) };
  } finally {
    clearTimeout(timer);
  }
}

function gitHubHeaders() {
  const headers = { Accept: 'application/vnd.github+json' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  return headers;
}

async function githubApi(url, attempt = 0) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  let res;
  try {
    res = await fetch(url, { headers: gitHubHeaders(), signal: controller.signal });
  } catch {
    if (attempt < 1) {
      await sleep(500);
      return githubApi(url, attempt + 1);
    }
    return { ok: false, status: 0, data: null };
  } finally {
    clearTimeout(timer);
  }
  if (res.status === 404) return { ok: false, status: 404, data: null };
  if (!res.ok) return { ok: false, status: res.status, data: null };
  return { ok: true, status: res.status, data: await res.json() };
}

function normalizeLicense(value) {
  const v = String(value ?? '').toLowerCase();
  if (v.startsWith('gpl-3')) return 'gpl-3.0';
  if (v.startsWith('agpl-3')) return 'agpl-3.0';
  if (v.startsWith('apache-2')) return 'apache-2.0';
  return v;
}

function isNotableTag(tag) {
  const match = String(tag ?? '').match(/(\d+)\.(\d+)\.(\d+)/);
  if (!match) return true;
  return Number(match[3]) === 0;
}

function pageUrl(entry) {
  return `${SITE.replace(/\/$/, '')}${BASE.replace(/\/$/, '')}${entry.replace(/^\//, '/')}/`;
}

/* -------------------------------------------------------------------------- */
/* content                                                                     */
/* -------------------------------------------------------------------------- */

function parseEntry(file) {
  const raw = fs.readFileSync(path.join(ROOT, file), 'utf8');
  if (!raw.startsWith('---')) return null;
  const end = raw.indexOf('\n---', 3);
  if (end === -1) return null;
  try {
    return YAML.parse(raw.slice(4, end)) ?? {};
  } catch {
    return null;
  }
}

const entries = [];
for (const dir of ['src/content/cases', 'src/content/watchlist']) {
  if (!fs.existsSync(path.join(ROOT, dir))) continue;
  for (const name of fs.readdirSync(path.join(ROOT, dir)).filter((f) => f.endsWith('.md'))) {
    const data = parseEntry(`${dir}/${name}`);
    if (data) {
      entries.push({
        file: `${dir}/${name}`,
        data,
        kind: dir.endsWith('cases') ? 'cases' : 'watchlist',
        slug: name.replace(/\.md$/, ''),
      });
    }
  }
}

/* -------------------------------------------------------------------------- */
/* 1 + 2: repos and sites                                                      */
/* -------------------------------------------------------------------------- */

for (const item of config.repos) {
  const api = await githubApi(`https://api.github.com/repos/${item.repo}`);
  if (!api.ok) {
    findings.blocked.push(`${item.label} · GitHub API ${api.status || '网络错误'}（无法判断仓库状态）`);
    continue;
  }
  const repo = api.data;
  const page = pageUrl(item.entry);

  if (repo.archived) {
    findings.changes.push({
      label: item.label,
      entry: page,
      text: '仓库已被归档',
      source: repo.html_url,
    });
  }
  if (String(repo.full_name).toLowerCase() !== item.repo.toLowerCase()) {
    findings.changes.push({
      label: item.label,
      entry: page,
      text: `仓库地址已变更：${item.repo} → ${repo.full_name}`,
      source: repo.html_url,
    });
  }
  if (item.license && repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION') {
    if (normalizeLicense(repo.license.spdx_id) !== normalizeLicense(item.license)) {
      findings.changes.push({
        label: item.label,
        entry: page,
        text: `许可证与内容不一致：内容写 ${item.license}，GitHub 返回 ${repo.license.spdx_id}`,
        source: `${repo.html_url}/blob/${repo.default_branch}/LICENSE`,
      });
    }
  }

  const release = await githubApi(`https://api.github.com/repos/${item.repo}/releases/latest`);
  if (release.ok && release.data?.published_at) {
    const published = new Date(release.data.published_at);
    const age = daysAgo(published);
    if (age >= 0 && age <= RECENT_DAYS && isNotableTag(release.data.tag_name)) {
      findings.changes.push({
        label: item.label,
        entry: page,
        text: `新 release：${release.data.tag_name}（${published.toISOString().slice(0, 10)}）`,
        source: release.data.html_url,
      });
    }
  }
}

for (const site of config.sites) {
  const res = await request(site.url);
  const page = pageUrl(site.entry);
  if (res.status === 0) {
    findings.blocked.push(`${site.label} · 网络错误，无法判断：${res.error ?? 'unknown'}`);
  } else if ([404, 410].includes(res.status)) {
    findings.changes.push({
      label: site.label,
      entry: page,
      text: `站点返回 ${res.status}，可能已停运或迁移`,
      source: site.url,
    });
  } else if (res.status >= 500) {
    findings.changes.push({
      label: site.label,
      entry: page,
      text: `站点返回 ${res.status}`,
      source: site.url,
    });
  } else if ([401, 403, 429].includes(res.status)) {
    findings.blocked.push(`${site.label} · 站点返回 ${res.status}（可能拦截了自动访问）`);
  }
}

/* -------------------------------------------------------------------------- */
/* 3: source links                                                             */
/* -------------------------------------------------------------------------- */

const links = new Map();
for (const { data } of entries) {
  const add = (url, label) => {
    if (typeof url === 'string' && /^https?:/.test(url) && !links.has(url)) {
      links.set(url, label);
    }
  };
  for (const source of data.sources ?? []) add(source.url, data.name);
  for (const event of data.timeline ?? []) add(event.source, data.name);
  for (const plan of data.plans ?? []) add(plan.source, data.name);
  for (const check of data.checks ?? []) add(check.source, data.name);
  for (const signal of data.signals ?? []) add(signal.source, data.name);
}

const linkList = [...links.entries()];
for (let i = 0; i < linkList.length; i += 6) {
  const batch = linkList.slice(i, i + 6);
  await Promise.all(
    batch.map(async ([url, label]) => {
      const res = await request(url, { timeout: 20_000 });
      if ([404, 410].includes(res.status)) {
        findings.broken.push({ label, url, status: res.status });
      } else if (res.status === 0 || res.status >= 500) {
        findings.blocked.push(`${label} · ${url} 无法判断（${res.status || res.error}）`);
      } else if ([401, 403, 429].includes(res.status)) {
        findings.blocked.push(`${label} · ${url} 返回 ${res.status}`);
      }
    }),
  );
}

/* -------------------------------------------------------------------------- */
/* 4: stale entries and upcoming plans                                         */
/* -------------------------------------------------------------------------- */

for (const { data, kind, slug } of entries) {
  const verified = new Date(data.lastVerified);
  const age = daysAgo(verified);
  if (age > STALE_DAYS) {
    findings.stale.push({
      name: data.name,
      age,
      entry: pageUrl(`/${kind}/${slug}`),
    });
  }
  for (const plan of data.plans ?? []) {
    const date = new Date(plan.date);
    const days = daysUntil(date);
    if (days >= 0 && days <= PLAN_WINDOW) {
      findings.plans.push({
        name: data.name,
        title: plan.title,
        date: date.toISOString().slice(0, 10),
        days,
      });
    }
  }
}

/* -------------------------------------------------------------------------- */
/* output                                                                      */
/* -------------------------------------------------------------------------- */

if (AS_JSON) {
  console.log(JSON.stringify({ generatedAt: new Date().toISOString(), checked: { repos: config.repos.length, sites: config.sites.length, links: links.size }, findings }, null, 2));
  process.exit(0);
}

const date = new Date().toISOString().slice(0, 10);
const lines = [];
lines.push(`# 每周监测 · ${date}`);
lines.push('');
lines.push(`检查范围：${config.repos.length} 个仓库、${config.sites.length} 个站点、${links.size} 条来源链接。`);
lines.push('');

const section = (title, items, render) => {
  lines.push(`## ${title}`);
  lines.push('');
  if (items.length === 0) {
    lines.push('本周没有需要处理的项目。');
  } else {
    for (const item of items) lines.push(render(item));
  }
  lines.push('');
};

section('需要核验的变化', findings.changes, (item) =>
  `- [ ] **${item.label}** · ${item.text} — [页面](${item.entry}) · [来源](${item.source})`,
);
section('疑似失效的来源', findings.broken, (item) => `- **${item.label}** · ${item.status} · ${item.url}`);
section('超过 90 天未核验', findings.stale, (item) => `- **${item.name}** · ${item.age} 天 · [查看](${item.entry})`);
section('未来 120 天内的计划', findings.plans, (item) => `- ${item.date} · **${item.name}** · ${item.title}（还有 ${item.days} 天）`);
section('无法判断（被拦截）', findings.blocked, (item) => `- ${item}`);

lines.push('---');
lines.push('');
lines.push('本报告由 `scripts/watch.mjs` 自动生成，只提交线索，不修改内容。核验后请更新 `lastVerified` 并运行 `pnpm facts`。');

console.log(lines.join('\n'));
