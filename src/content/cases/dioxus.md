---
name: Dioxus
tagline: Rust 跨平台 UI 框架，团队整体加入 Cognition
acquirer: Cognition
status: team-join
dealType: acquihire
announcedAt: 2026-09-10
completedAt: 2026-09-10
amount:
  disclosed: false
  note: 公告未使用"收购"一词，也未披露对价或法律结构。
currency: USD
country: 美国
categories:
  - Rust
  - UI 框架
  - 开源
license: MIT / Apache-2.0
licenseAfter: MIT / Apache-2.0
evidence: A
featured: false
summary: 2026 年 9 月，Cognition 宣布 Dioxus 团队整体加入，继续支持 Dioxus、Blitz、Taffy 与 Subsecond。交易没有改变许可证，却让多个关键 crate 的发布权限转移到了收购方。
lastVerified: 2026-10-28
sources:
  - title: Welcoming Dioxus to Cognition
    url: https://cognition.com/blog/welcoming-dioxus
    publisher: Cognition
    date: 2026-09-10
    type: primary
    note: 官方公告，确认团队加入、继续支持的开源项目与 Devin 相关分工。
  - title: Dioxus Labs is joining Cognition
    url: https://dioxuslabs.com/blog/joining-cognition
    publisher: Dioxus Labs
    date: 2026-09-10
    type: primary
    note: Dioxus 侧的官方公告，确认团队加入与继续维护的开源项目。
  - title: Cognition Hired Dioxus. Blitz's Publishers Went With It.
    url: https://www.beri.net/article/cognition-dioxus-acquihire-blitz-taffy-crate-owners-kitesurf-dependency
    publisher: Beri
    date: 2026-09-14
    type: analysis
    note: 统计 crates.io owner 的变化，并指出 Cloudflare Kitesurf 构建于 Blitz 之上。
timeline:
  - date: 2026-09-10
    title: Cognition 宣布 Dioxus 团队整体加入
    detail: Jonathan Kelley 与团队加入；官方称将继续支持 Dioxus、Blitz、Taffy、Subsecond，并加大对 Dioxus-Native 与 Blitz 的投入。
    kind: deal
    source: https://cognition.com/blog/welcoming-dioxus
  - date: 2026-09-14
    title: 分析指出 Blitz 与 Taffy 的 crate owner 已转移
    detail: Beri 统计，Blitz 核心 crate 的全部 owner、Taffy 三位 owner 中的两位目前在 Cognition 工作。
    kind: governance
    source: https://www.beri.net/article/cognition-dioxus-acquihire-blitz-taffy-crate-owners-kitesurf-dependency
promises:
  - claim: 继续支持 Dioxus、Blitz、Taffy 和 Subsecond 的开源工作。
    status: pending
    note: 公告发布仅一个多月，需观察后续发布节奏与维护者结构。
    source: https://cognition.com/blog/welcoming-dioxus
  - claim: 增加对 Dioxus-Native 和 Blitz 的投入。
    status: pending
    source: https://cognition.com/blog/welcoming-dioxus
openQuestions:
  - 交易的法律结构（人才收购、资产收购或团队加入）未披露。
  - Dioxus 项目是否仍由独立基金会或社区治理，没有公开说明。
  - 其他下游使用者（如 Zed、Bevy、Slint）如何评估 Taffy 的治理变化。
  - 团队规模无公开记录：Dioxus 为小规模维护团队，从未披露人数，人才收购的规模无法量化。
---

## 背景：Rust 生态里的跨平台 UI

Dioxus 是 Jonathan Kelley 发起的 Rust UI 框架，目标是用一套代码构建 Web、桌面和移动应用。它不是一个孤立的库，而是一组项目：Dioxus 本体、原生渲染器 Blitz、布局引擎 Taffy、热重载工具 Subsecond。

这些子项目在生态里的位置比 Dioxus 本身更关键：Taffy 被 Zed 的 GPUI、Bevy、Slint 等采用；Blitz 则被 Cloudflare 用于其 Kitesurf 浏览器。换句话说，Dioxus 团队维护的不只是自己的框架，还有一段其他公司依赖的公共基础设施。

## 交易：Cognition 把整个团队招走

2026 年 9 月 10 日，Cognition 发布公告：“欢迎 Jonathan Kelley 和整个 Dioxus 团队加入。”公告没有使用“收购”一词，也没有披露对价或法律结构，只说明团队会参与 Devin 的虚拟机、computer use 和测试能力，同时继续支持 Dioxus、Blitz、Taffy 和 Subsecond，并加大对 Dioxus-Native 与 Blitz 的投入。

本档案因此把它记为“团队加入 / 人才收购”，而不是“收购了 Dioxus 公司”。

## 之后：代码没动，所有权动了

真正值得记录的变化发生在 crates.io 上。据 Beri 在 9 月 14 日的分析，Blitz 核心 crate 的全部 crates.io owner、以及 Taffy 三位 owner 中的两位，现在都在 Cognition 工作。

这意味着：许可证没变、仓库没搬、代码也没删，但**发布权限——也就是供应链上的实际控制权——转移了**。对使用 Blitz 或 Taffy 的团队来说，这是需要重新评估的依赖风险；对 Cognition 来说，这是不用买公司就能获得维护权的低成本路径。

## 为什么值得研究

- **人才收购改变的是治理，不是许可证。** 开源项目的“所有权”分散在仓库、商标、crate 发布权和维护者时间里，收购往往只动最后一层。
- **crates.io owner 是隐性的控制权。** 它不体现在任何许可证文本里，却能决定下一个版本由谁发布。
- **下游公司会被动卷入。** Cloudflare 的浏览器构建在 Blitz 上，Zed 的 UI 依赖 Taffy；上游团队加入一家 AI 公司，下游必须重新做风险评估。
