#!/usr/bin/env node
/**
 * 每周维护活跃度监测：产出 markdown 片段，供 watch.yml 拼进周报 issue。
 *
 * 覆盖两组对象：
 *   case       已发生的交易（关注收购后维护是否退坡）
 *   watchlist  尚未易主、值得长期观察的项目（关注维护是否停滞——那往往是被收购或走向没落的前兆）
 *
 * 用 fetch + GITHUB_TOKEN 而不是 gh CLI——GitHub Actions 的 runner 镜像
 * 没有预装 gh，用 CLI 会静默失败（空输出追加进报告，看不出错）。
 *
 * 告警阈值（刻意设得保守，避免噪音）：
 *   🔴 仓库被归档
 *   🔴 最近 90 天 0 次提交
 *   🟡 最近 12 个月 0 次发布
 *   🟡 最近 90 天提交少于 5 次
 *
 * 不需要历史基线：绝对阈值就能发现「已经停了」。
 * 「正在变慢」需要人工看趋势，报告里会列出当前数值供对比。
 *
 * 闭源项目（Obsidian、Raycast）没有可观察的公开仓库，显式列出说明为什么不监测，
 * 而不是假装覆盖了。
 *
 * 用法：
 *   GITHUB_TOKEN=xxx node scripts/watch-team.mjs
 *   GITHUB_TOKEN=xxx node scripts/watch-team.mjs --json
 */
const AS_JSON = process.argv.includes('--json');
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

/** slug → 仓库与归类。新增案例或在观察名单加项目时，在这里加一行。 */
const TARGETS = {
  // 已发生的交易
  bun: { repo: 'oven-sh/bun', kind: 'case' },
  deno: { repo: 'denoland/deno', kind: 'case' },
  dioxus: { repo: 'DioxusLabs/dioxus', kind: 'case' },
  hashicorp: { repo: 'hashicorp/terraform', kind: 'case' },
  npm: { repo: 'npm/cli', kind: 'case' },
  netless: { repo: 'netless-io/flat', kind: 'case' },
  // 观察名单
  affine: { repo: 'toeverything/AFFiNE', kind: 'watchlist' },
  excalidraw: { repo: 'excalidraw/excalidraw', kind: 'watchlist' },
  tldraw: { repo: 'tldraw/tldraw', kind: 'watchlist' },
  zed: { repo: 'zed-industries/zed', kind: 'watchlist' },
};

/** 闭源项目：没有可观察的公开仓库，报告里显式说明。 */
const CLOSED_SOURCE = ['obsidian', 'raycast'];

async function api(path, attempt = 0) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'WhatsNext-Watch/1.0' };
  if (TOKEN) headers.Authorization = `Bearer ${TOKEN}`;
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers,
      signal: AbortSignal.timeout(20_000),
    });
    if (res.status === 403 || res.status === 429) {
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 2000 * (attempt + 1)));
        return api(path, attempt + 1);
      }
      return { __error: `速率限制 HTTP ${res.status}` };
    }
    if (!res.ok) return { __error: `HTTP ${res.status}` };
    return await res.json();
  } catch (e) {
    if (attempt < 2) {
      await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      return api(path, attempt + 1);
    }
    return { __error: String(e.message).slice(0, 120) };
  }
}

const daysAgoISO = (n) => new Date(Date.now() - n * 86_400_000).toISOString();

async function inspect(slug, { repo, kind }) {
  const info = await api(`/repos/${repo}`);
  if (info.__error) return { slug, repo, kind, error: info.__error };

  const commits = await api(`/repos/${repo}/commits?since=${daysAgoISO(90)}&per_page=100`);
  const commitCount = Array.isArray(commits) ? (commits.length >= 100 ? 100 : commits.length) : 0;

  const releases = await api(`/repos/${repo}/releases?per_page=100`);
  const cutoff = new Date(Date.now() - 365 * 86_400_000).toISOString();
  const releases12m = Array.isArray(releases)
    ? releases.filter((r) => r.published_at && r.published_at >= cutoff).length
    : 0;

  const lastRelease =
    Array.isArray(releases) && releases[0]?.published_at ? releases[0].published_at.slice(0, 10) : null;

  const alerts = [];
  if (info.archived) alerts.push({ level: 'red', msg: '仓库已被归档' });
  if (commitCount === 0) alerts.push({ level: 'red', msg: '最近 90 天 0 次提交' });
  else if (commitCount < 5) alerts.push({ level: 'yellow', msg: `最近 90 天仅 ${commitCount} 次提交` });
  if (releases12m === 0) alerts.push({ level: 'yellow', msg: '最近 12 个月 0 次发布' });

  return { slug, repo, kind, archived: info.archived, commitCount, releases12m, lastRelease, alerts };
}

const results = [];
for (const [slug, target] of Object.entries(TARGETS)) {
  results.push(await inspect(slug, target));
}

if (AS_JSON) {
  console.log(JSON.stringify({ results, closedSource: CLOSED_SOURCE }, null, 2));
  process.exit(0);
}

const cases = results.filter((r) => r.kind === 'case');
const watching = results.filter((r) => r.kind === 'watchlist');
const flagged = results.filter((r) => r.alerts?.length);
const errors = results.filter((r) => r.error);

const table = (rows) => {
  const out = [
    '| 项目 | 90 天提交 | 12 月发布 | 最后一次发布 | 告警 |',
    '| --- | --- | --- | --- | --- |',
  ];
  for (const r of rows) {
    if (r.error) {
      out.push(`| ${r.slug} | — | — | — | ⚠️ 采集失败：${r.error} |`);
      continue;
    }
    const icon = r.alerts.length ? (r.alerts.some((a) => a.level === 'red') ? '🔴' : '🟡') : '—';
    const msgs = r.alerts.map((a) => a.msg).join('；') || '正常';
    out.push(
      `| ${r.slug} | ${r.commitCount} | ${r.releases12m} | ${r.lastRelease ?? '无'} | ${icon} ${msgs} |`,
    );
  }
  return out;
};

const lines = ['', '## 维护活跃度', ''];
lines.push(`**本周告警 ${flagged.length} 项**（共监测 ${results.length} 个仓库）`, '');
lines.push(...table(results));

if (CLOSED_SOURCE.length) {
  lines.push(
    '',
    `闭源项目不在此监测范围（无可观察的公开仓库）：${CLOSED_SOURCE.join('、')}。`,
  );
}

lines.push('', '<details><summary>按组查看</summary>', '');
lines.push('**已发生的交易**', '', ...table(cases), '');
lines.push('**观察名单**', '', ...table(watching));
lines.push('', '</details>');

if (errors.length) {
  lines.push('', '采集失败：');
  for (const e of errors) lines.push(`- ${e.slug} (${e.repo}): ${e.error}`);
}

console.log(lines.join('\n'));
