---
name: Zed
tagline: 用 GPL 开源编辑器，赌一个托管服务的未来
url: https://zed.dev
status: venture-backed
founded: 2021
founders:
  - Nathan Sobo（CEO）
  - Antonio Scandurra
  - Max Brunsfeld
location: 美国（Zed Industries, Inc.，全远程）
license: GPL-3.0 + Apache-2.0
licenseNotes: 2024-01-24 之前闭源，当天宣布全部开源：编辑器 GPL、服务端组件 AGPL、GPUI 采用 Apache 2.0。当前仓库 README 表述为“主要为 GPL-3.0-or-later，标注处为 Apache-2.0”；根目录提供 LICENSE-GPL 与 LICENSE-APACHE，已不见 AGPL 文件。
businessModel: open-core + 托管服务：免费 Personal（自带 API key 或外部 agent）、Pro 10 美元/月（无限 edit predictions，含 5 美元 token 后按量计费）、Business 30 美元/席位/月（组织级 AI 策略、数据治理、RBAC）；另在构建基于 DeltaDB 的付费托管服务。
categories:
  - 代码编辑器
  - 协作
  - 开源
summary: Zed 由 Atom 的核心团队在 2021 年创立，2024 年把编辑器整体开源为 GPL，2025 年完成 3,200 万美元 B 轮，2026 年发布 1.0 并推出 Delta 公测。它想证明 copyleft 编辑器也能靠托管服务养活。
watchReasons:
  - 它是“copyleft + 托管服务”在风险投资规模下直接的实验。
  - 2024 年开源时承诺“专有代码只占极小部分”，这句话值得长期核对。
  - Delta/DeltaDB 试图替代 PR 工作流的一部分，是在 GitHub 腹地做生意。
signals:
  - label: 归属状态
    value: 独立经营，未发现收购；VC 支持
  - label: 累计融资
    value: 超过 4,200 万美元（A 轮 1,000 万 + B 轮 3,200 万）
    source: https://zed.dev/blog/sequoia-backs-zed
  - label: 许可
    value: GPL-3.0-or-later 编辑器；Apache-2.0 组件
    source: https://zed.dev/blog/zed-is-now-open-source
  - label: 产品节点
    value: 2024-01 开源；2026-04-29 发布 1.0
    source: https://zed.dev/blog/zed-1-0
  - label: 商业
    value: Pro 10 美元/月；Business 30 美元/席位/月
    source: https://zed.dev/pricing
featured: false
lastVerified: 2026-10-29
sources:
  - title: Zed is now open source
    url: https://zed.dev/blog/zed-is-now-open-source
    publisher: Zed Industries
    date: 2024-01-24
    type: primary
    note: 开源日期、GPL/AGPL/Apache 的许可划分与变现思路。
  - title: Sequoia Backs Zed's Vision for Collaborative Coding
    url: https://zed.dev/blog/sequoia-backs-zed
    publisher: Zed Industries
    date: 2025-08-20
    type: primary
    note: B 轮 3,200 万美元、累计融资超过 4,200 万、DeltaDB 计划。
  - title: Zed is 1.0
    url: https://zed.dev/blog/zed-1-0
    publisher: Zed Industries
    date: 2026-04-29
    type: primary
    note: 1.0 发布与 Business 版。
  - title: Delta public beta
    url: https://zed.dev/blog/delta-public-beta
    publisher: Zed Industries
    date: 2026-09-16
    type: primary
    note: Delta 进入公测，基于 DeltaDB 的 operation-level review。
timeline:
  - date: 2021-01-01
    dateLabel: 2021 年
    title: Nathan Sobo 等人创立 Zed
    kind: founding
    source: https://zed.dev/blog/zed-1-0
  - date: 2023-03-17
    title: 完成 1,000 万美元 A 轮
    detail: Redpoint Ventures 领投。
    kind: funding
    source: https://www.goodwinlaw.com/en/news-and-events/news/2023/03/03_17-redpoint-ventures-leads-zed-10-million-series-a
  - date: 2024-01-24
    title: 编辑器整体开源
    detail: GPL 编辑器、AGPL 服务端、Apache 2.0 的 GPUI；承诺专有代码只占极小部分。
    kind: license
    source: https://zed.dev/blog/zed-is-now-open-source
  - date: 2025-08-20
    title: 完成 3,200 万美元 B 轮
    detail: Sequoia 领投，资金用于 DeltaDB。
    kind: funding
    source: https://zed.dev/blog/sequoia-backs-zed
  - date: 2026-04-29
    title: 发布 1.0 与 Zed for Business
    kind: product
    source: https://zed.dev/blog/zed-1-0
  - date: 2026-09-16
    title: Delta 进入公测
    kind: product
    source: https://zed.dev/blog/delta-public-beta
openQuestions:
  - 累计融资只有“超过 4,200 万美元”的口径，A 轮之前的种子轮没有一手记录。
  - 估值与收入未披露。
  - 服务端组件是否仍为 AGPL，仓库根目录已不见 AGPL 文件，需进一步核对。
---

## 开源编辑器，靠托管服务赚钱

Zed 由 Atom 的核心团队在 2021 年创立。2024 年 1 月，它把全部代码开源：编辑器用 GPL，服务端组件用 AGPL，UI 框架 GPUI 用 Apache 2.0。官方给出的变现思路是——编辑器免费，协作与 AI 服务收费，“专有代码只占极小部分”。

这是 copyleft 商业化的经典赌注：代码可以被分叉，但托管、协作与 AI 的运营能力不能。GPL 也意味着任何分叉都必须回馈代码，社区不至于被锁死。

## 1.0 与 Delta 的赌注

2025 年 8 月，Zed 完成 3,200 万美元 B 轮，累计融资超过 4,200 万美元，资金用于 DeltaDB——一个基于 CRDT 的 operation-level 版本控制系统。2026 年 4 月，Zed 发布 1.0 与 Business 版；9 月，Delta 进入公测，试图用“操作级评审”替代 PR 的一部分工作流。

这是一家在 GitHub 的腹地做生意的公司：编辑器是入口，协作与版本控制才是收入。

## 为什么值得观察

- 它检验“GPL + 托管服务”能否支撑风险投资级别的增长。
- 2024 年“专有代码只占极小部分”的承诺，可以用仓库与产品结构来核对。
- 如果 Delta 失败，Zed 可能会更依赖 AI 订阅；如果成功，它会成为“编辑器公司挑战 GitHub”的样本。
