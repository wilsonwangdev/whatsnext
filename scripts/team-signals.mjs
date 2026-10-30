#!/usr/bin/env node
/**
 * 采集「团队是否还在维护」的替代信号。
 *
 * 背景：团队人数在多数收购案里拿不到（非上市公司不披露、小团队不公开），
 * 导致 promises 里涉及团队的承诺永远判为 unclear。改用公开可查的仓库信号：
 *
 *   1. archived          —— 仓库是否被归档
 *   2. pushed_at         —— 最后一次推送时间
 *   3. commits_90d       —— 最近 90 天的 commit 数（活跃度）
 *   4. top_authors_90d   —— 最近 90 天的前三位 commit 作者
 *   5. releases_12m      —— 最近 12 个月的 release 次数
 *
 * 用法：node scripts/team-signals.mjs [slug:owner/repo ...]
 * 无参数时使用内置清单。输出 JSON，供人工判断后写入 checks。
 */
import { execFileSync } from 'node:child_process';

const DEFAULT = {
  bun: 'oven-sh/bun',
  deno: 'denoland/deno',
  dioxus: 'DioxusLabs/dioxus',
  hashicorp: 'hashicorp/terraform',
  npm: 'npm/cli',
  netless: 'netless-io/flat',
};

const gh = (path) => {
  try {
    return JSON.parse(
      execFileSync('gh', ['api', path], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }),
    );
  } catch (e) {
    return { __error: String(e.stderr || e.message).slice(0, 200) };
  }
};

const daysAgo = (n) => new Date(Date.now() - n * 86400_000).toISOString();

function collect(slug, repo) {
  const info = gh(`repos/${repo}`);
  if (info.__error) return { slug, repo, error: info.__error };

  const since = daysAgo(90);
  const commits = gh(`repos/${repo}/commits?since=${since}&per_page=100`);
  // GitHub 单页上限 100：达到上限时标为 "100+"，不要当成准确值
  const commitCount = Array.isArray(commits)
    ? commits.length >= 100
      ? '100+'
      : commits.length
    : 0;

  const authors = Array.isArray(commits)
    ? Object.entries(
        commits.reduce((acc, c) => {
          const login = c.author?.login ?? c.commit?.author?.name ?? 'unknown';
          acc[login] = (acc[login] ?? 0) + 1;
          return acc;
        }, {}),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(([login, n]) => `${login}(${n})`)
    : [];

  const releases = gh(`repos/${repo}/releases?per_page=100`);
  const cutoff = new Date(Date.now() - 365 * 86400_000).toISOString();
  const relCount = Array.isArray(releases)
    ? releases.filter((r) => r.published_at && r.published_at >= cutoff).length
    : 0;
  const releases12m = relCount >= 100 ? '100+' : relCount;

  return {
    slug,
    repo,
    archived: info.archived,
    pushed_at: info.pushed_at,
    commits_90d: commitCount,
    top_authors_90d: authors,
    releases_12m: releases12m,
  };
}

const pairs = process.argv.slice(2).length
  ? Object.fromEntries(process.argv.slice(2).map((a) => a.split(':')))
  : DEFAULT;

const out = Object.entries(pairs).map(([slug, repo]) => collect(slug, repo));
console.log(JSON.stringify(out, null, 2));
