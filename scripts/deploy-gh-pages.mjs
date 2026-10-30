#!/usr/bin/env node
/**
 * 构建并部署到 GitHub Pages 的 gh-pages 分支。
 *
 * 默认目标：https://wilsonwangdev.github.io/whatsnext/
 * 可用环境变量覆盖：
 *   SITE_URL   站点源（默认 https://wilsonwangdev.github.io）
 *   BASE_PATH  子路径（默认 /whatsnext/）
 *   GH_REPO    仓库（默认 wilsonwangdev/whatsnext）
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const site = process.env.SITE_URL ?? 'https://wilsonwangdev.github.io';
const base = process.env.BASE_PATH ?? '/whatsnext/';
const repo = process.env.GH_REPO ?? 'wilsonwangdev/whatsnext';
const remote = `git@github.com:${repo}.git`;

console.log(`[deploy] building with site=${site} base=${base}`);
execFileSync('pnpm', ['build'], {
  stdio: 'inherit',
  env: { ...process.env, SITE_URL: site, BASE_PATH: base },
});

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'postclose-pages-'));
try {
  fs.cpSync('dist', tmp, { recursive: true });
  if (!fs.existsSync(path.join(tmp, '.nojekyll'))) {
    fs.writeFileSync(path.join(tmp, '.nojekyll'), '');
  }
  const git = (args) => execFileSync('git', args, { cwd: tmp, stdio: 'inherit' });
  git(['init', '-b', 'gh-pages']);
  git(['add', '-A']);
  git(['-c', 'user.name=PostClose Deploy', '-c', 'user.email=deploy@postclose.local', 'commit', '-m', `deploy ${new Date().toISOString()}`]);
  git(['push', '--force', remote, 'gh-pages']);
  const url = new URL(base.replace(/\/$/, '/'), site).href;
  console.log(`[deploy] pushed gh-pages → ${url}`);
} finally {
  fs.rmSync(tmp, { recursive: true, force: true });
}
