# PostClose · 交割之后

[![verify](https://github.com/wilsonwangdev/postclose/actions/workflows/verify.yml/badge.svg)](https://github.com/wilsonwangdev/postclose/actions/workflows/verify.yml)
[站点](https://wilsonwangdev.github.io/postclose/)

> 开发者软件、开源项目与团队归属的公开档案：记录收购与团队加入的事实、公开承诺，以及之后真正发生了什么。

收购公告只讲愿景。这个项目想记录愿景之后的部分：产品是否还在、许可证有没有变、团队去了哪里、当初的承诺兑现了多少。

每条核心事实都链接到公开来源，并注明核验日期；拿不准的地方会写进「待核验的问题」，而不是补一个看起来合理的答案。

## 现在有什么

- **8 个案例**：Teambition → 阿里巴巴、Netless → 声网、Bun → Anthropic、Deno → Cloudflare、Dioxus → Cognition、HashiCorp → IBM、Figma → Adobe（已终止）、npm → GitHub。
- **6 个观察对象**：tldraw、AFFiNE、Excalidraw、Obsidian、Raycast、Zed。
- **可筛选的目录**、案例详情页（交易事实 / 承诺核对 / 来源 / 时间线）、全局时间线、方法与贡献规范。
- **机器可读导出**：[`/cases.json`](https://wilsonwangdev.github.io/postclose/cases.json)、RSS。
- 每条案例带 **证据等级**（A/B/C）与 **最后核验日期**。
- **内置事实核验技能**：`.agents/skills/fact-check/` + `scripts/verify-facts.mjs`，构建前自动检查日期、金额、人数与来源。

## 技术栈

- [Astro](https://astro.build/)（静态输出，无客户端框架）
- Astro Content Collections + Zod 做构建时字段校验
- 手写 CSS（无 Tailwind），系统字体，深色模式
- 原生 JS 实现筛选与主题切换，无运行时依赖

## 本地开发

需要 Node.js 20+ 与 pnpm。

```bash
pnpm install
pnpm dev          # http://localhost:4321
pnpm facts        # 事实核验：日期 / 金额 / 人数 / 来源
pnpm facts:strict # 警告也视为失败
pnpm facts:links  # 额外检查来源链接（需要网络）
pnpm verify       # astro check + 事实核验
pnpm build        # 事实核验 + 构建到 dist/
pnpm preview      # 预览构建产物
```

## 目录结构

```text
src/
├── content.config.ts        # 内容模型与校验规则
├── content/
│   ├── cases/*.md           # 已发生的交易
│   └── watchlist/*.md       # 尚未易主的观察对象
├── components/              # 卡片、时间线、来源列表等
├── data/site.ts             # 站点信息、导航、标签映射
├── layouts/BaseLayout.astro
├── lib/format.ts            # 日期、金额、时长格式化
├── pages/
│   ├── index.astro
│   ├── cases/{index,[...slug]}.astro
│   ├── watchlist/{index,[...slug]}.astro
│   ├── timeline.astro
│   ├── method.astro
│   ├── contribute.astro
│   ├── rss.xml.ts
│   └── cases.json.ts
└── styles/global.css
```

## 内容模型

每个案例都是 `src/content/cases/` 下的一个 Markdown 文件，frontmatter 受 Zod 校验，正文写叙事。

关键字段：

| 字段 | 说明 |
| --- | --- |
| `status` | `completed` / `announced` / `team-join` / `terminated` |
| `dealType` | `acquisition` / `majority-stake` / `acquihire` / `team-join` / `asset-sale` |
| `announcedAt` / `completedAt` | 公告日与交割日分开记录 |
| `amount` | 只填官方披露的金额；未披露写明 `disclosed: false` |
| `evidence` | A：双方一手来源；B：单方或权威媒体；C：仅二手报道 |
| `timeline` | 只记录已发生的事件；只有年份时用 `dateLabel` 标注精度 |
| `plans` | 已公布但尚未发生的日期；标注 `announced` / `derived` 与来源 |
| `checks` | 某个时点的状态核查（如许可证现状），不混入时间线 |
| `promises` | 公告里的可检验承诺及兑现情况 |
| `openQuestions` | 明确写出还不知道什么 |

完整字段说明见 [`src/content.config.ts`](src/content.config.ts) 与站点的 [`/method`](https://postclose.dev/method) 页面。

## 事实核验（内置技能）

`.agents/skills/fact-check/SKILL.md` 是给 AI 代理与维护者的事实核验技能，`scripts/verify-facts.mjs` 是它的可执行部分。`pnpm build` 会先运行校验，任何日期/金额/来源错误都会阻断构建。

校验范围：

- 公告日、交割日、最后核验日期是否自洽、是否在未来、是否过期；
- 只有年份/月份的事件是否用 `dateLabel` 标注了正确精度；
- 对价「已披露/未披露」与 `value`、`note` 是否一致，终止交易是否注明未完成；
- 观察名单里带数字的 `signals` 是否都有来源；
- 来源 URL 是否合法、重复，来源日期是否在未来；
- 正文里的人数/金额会列成 `info`，供人工回查（不阻断构建）。

## 数据导出

`/cases.json` 输出全部案例与观察对象，日期为 ISO 8601，字段与内容文件一致。适合做校对、二次分析或构建其他视图。

## 部署

站点已部署在 **<https://wilsonwangdev.github.io/postclose/>**（GitHub Pages，`gh-pages` 分支）。

```bash
pnpm deploy:pages
```

部署使用子路径 `/postclose/`，因此 `astro.config.mjs` 通过 `BASE_PATH` 设置 base，站内链接统一走 `src/lib/paths.ts` 的 `withBase()`。

换域名或仓库时修改：

- `src/data/site.ts` 中的 `url` 与 `repo`
- 部署环境变量：`SITE_URL`、`BASE_PATH`、`GH_REPO`（见 `scripts/deploy-gh-pages.mjs`）

首次部署后需要在仓库 Settings → Pages 中把 Source 设为 `gh-pages` 分支（本仓库已配置）。

## 贡献

欢迎提名案例、纠错、补充后续。流程与证据要求见 [CONTRIBUTING.md](CONTRIBUTING.md)，或直接读站点上的 [`/contribute`](https://postclose.dev/contribute)。

## 许可

- 代码：[MIT](LICENSE)
- 案例文本与结构化数据：[CC BY-SA 4.0](LICENSE-CONTENT.md)

## 免责声明

本站为独立项目，与文中提及的任何公司无隶属或赞助关系。商标归各自所有者。内容不构成投资、法律或商业建议。
