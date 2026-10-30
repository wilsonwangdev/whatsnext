---
name: Bun
tagline: 一个人的 JavaScript 运行时，成为 Claude Code 的基础设施
acquirer: Anthropic
status: completed
dealType: acquisition
announcedAt: 2025-12-02
completedAt: 2025-12-02
amount:
  disclosed: false
  currency: USD
  note: 对价未披露。
country: 美国
founded: 2021
categories:
  - 运行时
  - JavaScript
  - 开发者工具
license: MIT
licenseAfter: MIT
evidence: A
featured: true
summary: Anthropic 于 2025 年 12 月收购 Bun，理由是 Claude Code 的基础设施需要更快的运行时。MIT 许可证保留，但 2026 年 5 月的一次 AI 辅助 Rust 重写改变了项目的技术路线。
lastVerified: 2026-10-28
sources:
  - title: Anthropic acquires Bun as Claude Code reaches $1B milestone
    url: https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone
    publisher: Anthropic
    date: 2025-12-03
    type: primary
    note: 官方公告，确认收购、MIT 许可承诺与 Claude Code 的 10 亿美元年化收入。
  - title: Bun is joining Anthropic
    url: https://bun.sh/blog/bun-joins-anthropic
    publisher: Bun
    date: 2025-12-02
    type: primary
    note: Bun 侧的官方公告，确认被收购并承诺继续开源。
  - title: Bun (software) — Acquisition
    url: https://en.wikipedia.org/wiki/Bun_(software)
    publisher: Wikipedia
    date: 2026-10-22
    type: analysis
    note: 汇总收购、2026 年 Rust 重写与版本发布；引用前建议回查其原始来源。
  - title: What Bun Can Tell Us About AI, Open Source and Anthropic
    url: https://redmonk.com/sogrady/2026/06/04/bun-two-lessons/
    publisher: RedMonk
    date: 2026-06-04
    type: analysis
    note: 对收购后开源治理与 AI 公司角色的评论。
timeline:
  - date: 2021-09-14
    title: 首次发布
    kind: product
    source: https://en.wikipedia.org/wiki/Bun_(software)
  - date: 2022-08-24
    title: Oven 完成 700 万美元融资
    detail: Kleiner Perkins 领投，Guillermo Rauch、Y Combinator 等参投。
    kind: funding
    source: https://en.wikipedia.org/wiki/Bun_(software)
  - date: 2023-09-08
    title: 1.0 发布
    kind: product
    source: https://en.wikipedia.org/wiki/Bun_(software)
  - date: 2025-12-02
    title: Anthropic 宣布收购 Bun
    detail: 官方称 Bun 已支撑 Claude Code 的基础设施与原生安装器；Bun 月下载超过 700 万次，GitHub 星标超过 8.2 万。
    kind: deal
    source: https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone
  - date: 2026-05-01
    title: Sumner 用 AI 工具把 Bun 从 Zig 重写为 Rust
    detail: 重写超过一百万行，几天后合并进主线并通过测试套件；引发关于 AI 改写开源的争论。
    kind: product
    source: https://en.wikipedia.org/wiki/Bun_(software)
  - date: 2026-10-22
    title: 1.4.4 发布
    kind: product
    source: https://en.wikipedia.org/wiki/Bun_(software)
promises:
  - claim: Bun 将继续保持开源。
    status: kept
    note: 截至 2026-10，仓库仍公开，持续发布新版本。
    source: https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone
  - claim: Bun 将继续采用 MIT 许可证。
    status: kept
    note: 收购公告明确承诺；在线仓库与文档仍标注 MIT。
    source: https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone
  - claim: 继续投入，让 Bun 成为 JavaScript/TypeScript 开发者首选的运行时、打包器、包管理器和测试运行器。
    status: pending
    note: 需要更长时间观察路线是否围绕 Anthropic 内部需求收敛。
    source: https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone
openQuestions:
  - 收购对价与交易结构未披露。
  - Rust 重写后，Bun 对 Zig 生态与既有贡献者的长期影响仍待观察。
  - Anthropic 内部需求与外部用户需求出现冲突时，项目如何决策，尚无公开治理说明。
  - 团队规模无公开记录：Oven 从未披露员工人数，收购公告亦未提及。
---

## 背景：一个人的运行时

2021 年，Jarred Sumner 开始写 Bun：用 Zig 实现、以 JavaScriptCore 为引擎，把运行时、包管理器、打包器和测试运行器塞进一个二进制。它的卖点非常直接——比 Node.js 快得多，而且不用装一堆工具。

2022 年 8 月，Oven 完成 700 万美元融资，Kleiner Perkins 领投；2023 年 9 月，Bun 1.0 发布。到 2025 年底，Bun 月下载超过 700 万次，GitHub 星标超过 8.2 万。它的成长方式也很“开发者原生”：创始人在 X 上高频发布进展，性能基准、兼容性清单和失败都摊在台面上。

## 交易：Claude Code 需要一条更快的跑道

2025 年 12 月 2 日，Anthropic 宣布收购 Bun。官方给出的理由不是云、不是平台，而是 Claude Code：Bun 已经是 Claude Code 基础设施的一部分，并支撑了它的原生安装器。同一篇公告里，Anthropic 提到 Claude Code 在 2025 年 11 月达到 10 亿美元年化收入。对价未披露。

Anthropic 同时给出两条承诺：Bun 继续保持开源，继续采用 MIT 许可证。这两条后来都被遵守了。

## 之后：许可证没变，代码变了

真正的变化不在许可证，而在技术路线。2026 年 5 月，Sumner 用大量 AI 工具把 Bun 从 Zig 重写为 Rust，理由是“系统性地防止内存 bug 复发”。重写超过一百万行，最初被称为实验，几天后合并进主线，并通过了测试套件。

这次重写把 Bun 推到了 AI 与开源争论的中心。Zig 作者 Andrew Kelley 公开回应，认为针对 Zig 语言与社区的指责并不公平。对 Bun 的用户来说，短期影响是版本继续发（1.4.4 于 2026 年 10 月 22 日发布）；长期影响则是：一个被 AI 公司收购的运行时，它的路线图会越来越围绕收购方的工程需求展开。

## 为什么值得研究

- **AI 实验室正在收购基础设施。** 收购动机不是财务回报，而是让自己的产品跑得更快；这会改变被收购项目的优先级。
- **“保持开源”的边界。** 许可证不变，不等于治理、技术路线和贡献者结构不变。档案需要同时记录这两层。
- **单人主导项目的脆弱性。** Bun 的路线高度依赖创始人判断；被收购后，这种集中决策既带来了速度，也带来了争议。
