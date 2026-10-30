#!/usr/bin/env node
/**
 * 每周维护活跃度监测：产出 markdown 片段，供 watch.yml 拼进周报 issue。
 *
 * 与 team-signals.mjs 的区别：
 *   team-signals.mjs  采集原始数据，人工判断后写入 checks（一次性）
 *   watch-team.mjs    只做阈值告警，每周跑，不需要人工介入（持续性）
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
 * 用法：
 *   GITHUB_TOKEN=xxx node scripts/watch-team.mjs
 *   GITHUB_TOKEN=xxx node scripts/watch-team.mjs --json
 */
const AS_JSON = process.argv.includes('--json');
const TOKEN = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;

/** slug → 仓库。新增案例时在这里加一行即可。 */
const REPOS = {
  bun: 'oven-sh/bun',
  deno: 'denoland/deno',
  dioxus: 'DioxusLabs/dioxus',
  hashicorp: 'hashicorp/terraform',
  npm: 'npm/cli',
  netless: 'netless-io/flat',
};

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

async function inspect(slug, repo) {
  const info = await api(`/repos/${repo}`);
  if (info.__error) return { slug, repo, error: info.__error };

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

  return { slug, repo, archived: info.archived, commitCount, releases12m, lastRelease, alerts };
}

const results = [];
for (const [slug, repo] of Object.entries(REPOS)) {
  results.push(await inspect(slug, repo));
}

if (AS_JSON) {
  console.log(JSON.stringify(results, null, 2));
  process.exit(0);
}

const flagged = results.filter((r) => r.alerts?.length);
const errors = results.filter((r) => r.error);

const lines = ['', '## 维护活跃度', ''];

if (flagged.length === 0 && errors.length === 0) {
  lines.push('本周无异常。');
} else if (flagged.length > 0) {
  lines.push('| 案例 | 90 天提交 | 12 月发布 | 最后一次发布 | 告警 |');
  lines.push('| --- | --- | --- | --- | --- |');
  for (const r of flagged) {
    const icon = r.alerts.some((a) => a.level === 'red') ? '🔴' : '🟡';
    const msgs = r.alerts.map((a) => a.msg).join('；');
    lines.push(
      `| ${r.slug} | ${r.commitCount} | ${r.releases12m} | ${r.lastRelease ?? '无'} | ${icon} ${msgs} |`,
    );
  }
}

if (errors.length) {
  lines.push('', '采集失败：');
  for (const e of errors) lines.push(`- ${e.slug} (${e.repo}): ${e.error}`);
}

lines.push('', '<details><summary>全部案例当前数值</summary>', '');
lines.push('| 案例 | 90 天提交 | 12 月发布 | 最后发布 |');
lines.push('| --- | --- | --- | --- |');
for (const r of results) {
  if (r.error) continue;
  lines.push(`| ${r.slug} | ${r.commitCount} | ${r.releases12m} | ${r.lastRelease ?? '无'} |`);
}
lines.push('', '</details>');

console.log(lines.join('\n'));
