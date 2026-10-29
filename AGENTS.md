# AGENTS.md

PostClose（交割之后）是一个 Astro 静态站点，记录软件收购、团队加入与收购后的实际走向。事实准确性优先于叙事完整。

## 开始任何内容修改前

1. 读 [`.agents/skills/fact-check/SKILL.md`](.agents/skills/fact-check/SKILL.md)。这是本仓库的**内置事实核验技能**，规定了日期、金额、人数、来源的处理方式。
2. 运行 `pnpm facts`，确认当前基线是 0 errors。

## 常用命令

```bash
pnpm dev          # 本地开发 http://localhost:4321
pnpm facts        # 事实校验（构建前自动运行）
pnpm facts:strict # 警告也视为失败
pnpm facts:links  # 额外检查来源链接可达性
pnpm verify       # astro check + 事实校验
pnpm build        # 事实校验 + 静态构建
pnpm watch        # 生成本周监测报告（不修改内容）
```

## 内容位置

- `src/content/cases/*.md`：已发生的交易
- `src/content/watchlist/*.md`：尚未易主的观察对象
- `src/content.config.ts`：字段与 Zod 校验
- `scripts/verify-facts.mjs`：事实校验器
- `src/data/site.ts`：站点名、域名、仓库地址

## 不可协商的三条

1. 每个数字都要有来源；没有来源就写进 `openQuestions`，不要猜。
2. 日期精度不能超过来源：「只有年份」就记 `YYYY-01-01` 加 `dateLabel`，不要编月份和日。
3. 区分宣布、交割、团队加入、交易终止；对价未披露就写未披露。

## 部署

`pnpm deploy:pages` 会构建并推送到 `gh-pages` 分支，GitHub Pages 从该分支发布。部署前确认 `src/data/site.ts` 与 `astro.config.mjs` 中的域名、base 与仓库地址。
