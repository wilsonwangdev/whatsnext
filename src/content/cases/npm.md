---
name: npm
tagline: 全球最大 JavaScript 包注册表，被 GitHub 收进平台
acquirer: GitHub（微软）
status: completed
dealType: acquisition
announcedAt: 2020-03-16
completedAt: 2020-04-15
amount:
  disclosed: false
  note: 对价未披露。
currency: USD
country: 美国
founded: 2014
categories:
  - 包管理
  - 开发者基础设施
  - JavaScript
license: Artistic-2.0（CLI）/ 专有 registry
licenseAfter: Artistic-2.0（CLI）/ 专有 registry
evidence: A
featured: false
summary: GitHub 于 2020 年 3 月宣布收购 npm，4 月完成。公共 registry 保持免费，付费的 npm Enterprise 在一年后停止支持，客户迁往 GitHub Packages。
lastVerified: 2026-10-28
sources:
  - title: npm is joining GitHub
    url: https://github.blog/2020-03-16-npm-is-joining-github/
    publisher: GitHub
    date: 2020-03-16
    type: primary
    note: 收购公告，承诺公共 registry 永久免费，并说明对 npm Pro/Teams/Enterprise 客户的安排。
  - title: npm (software) — Wikipedia
    url: https://en.wikipedia.org/wiki/Npm_(software)
    publisher: Wikipedia
    type: analysis
    note: npm, Inc. 于 2014 年成立、npm 的早期历史，仅用于背景。
  - title: Sunsetting npm Enterprise
    url: https://docs.npmjs.com/enterprise
    publisher: npm Docs
    date: 2023-10-23
    type: primary
    note: 记录 2020 年 6 月 30 日通知客户、2021 年 6 月 30 日停止支持的时间表。
  - title: GitHub Completes Its Acquisition Of The NPM JavaScript/Node.js Package Manager
    url: https://www.phoronix.com/news/GitHub-NPM-Acquisition-Complete
    publisher: Phoronix
    date: 2020-04-15
    type: press
    note: 报道交易完成。
timeline:
  - date: 2014-01-01
    dateLabel: 2014 年
    title: npm, Inc. 成立，运营 npm registry
    kind: founding
    source: https://en.wikipedia.org/wiki/Npm_(software)
  - date: 2020-03-16
    title: GitHub 宣布收购 npm
    detail: 当时 npm 承载超过 130 万个包、每月约 750 亿次下载；GitHub 承诺公共 registry 永远免费。
    kind: deal
    source: https://github.blog/2020-03-16-npm-is-joining-github/
  - date: 2020-04-15
    title: 交易完成
    kind: deal
    source: https://www.phoronix.com/news/GitHub-NPM-Acquisition-Complete
  - date: 2020-06-30
    title: GitHub 通知 npm Enterprise 客户产品将停止支持
    detail: 支持期至 2021 年 6 月 30 日，客户被引导迁移到 GitHub Packages。
    kind: shutdown
    source: https://docs.npmjs.com/enterprise
  - date: 2021-06-30
    title: npm Enterprise 支持结束
    kind: shutdown
    source: https://docs.npmjs.com/enterprise
promises:
  - claim: 公共 npm registry 将永远可用、永远免费。
    status: kept
    note: 截至 2026-10 仍然成立。
    source: https://github.blog/2020-03-16-npm-is-joining-github/
  - claim: 继续投资 registry 基础设施，并改进发布与多因素认证体验。
    status: partial
    note: npm 后来加入了 2FA 强制策略与 provenance 等能力，但供应链安全事件仍反复出现。
    source: https://github.blog/2020-03-16-npm-is-joining-github/
openQuestions:
  - 交易对价从未披露。
  - npm, Inc. 在被收购前的财务状况只有零散报道。
  - 团队规模无公开记录：npm, Inc. 在被收购前的员工人数没有公开数据。
---

## 背景：一个注册表撑起整个生态

npm 最初是 Isaac Schlueter 在 2009 年前后为 Node.js 写的包管理器，后来独立成公司 npm, Inc.，运营全球最大的 JavaScript 包注册表。

到 2020 年，npm 承载超过 130 万个包、每月约 750 亿次下载——它是 JavaScript 生态真正的底座。但底座本身很难赚钱：公共 registry 免费，收入主要来自 npm Pro、Teams 和 Enterprise 这些私有 registry 订阅，规模有限。

## 交易：平台接手基础设施

2020 年 3 月 16 日，GitHub 宣布收购 npm，价格未披露。GitHub 的公告给出三条承诺：公共 registry 永远免费；投资 registry 基础设施；继续支持 npm v7 CLI 与 Workspaces 等特性。交易在 2020 年 4 月完成。

从战略上看，这更像一次“基础设施归位”：GitHub 已经托管了绝大多数 JavaScript 源码，把包注册表也拿进来，可以让“从 PR 到发布”的链路闭环。

## 之后：免费承诺兑现，付费产品线消失

2020 年 6 月 30 日，GitHub 通知 npm Enterprise 客户：产品将于 2021 年 6 月 30 日停止支持，建议迁移到 GitHub Packages。这是收购后直接的产品线收敛——公共 registry 留下了，私有 registry 生意被并进平台。

对开发者来说，npm 变得更稳、更“基础设施化”；对 npm 公司来说，独立商业化到此结束。这个案例的看点不是价格，而是一个关键公共品如何在商业上失败、又被平台以非市场的方式维持。

## 为什么值得研究

- **关键基础设施的“公共品”困境。** 所有人都依赖它，但很少有人愿意为它付费；最终接手的往往是有其他收入来源的平台。
- **免费承诺与商业可持续性。** “永远免费”能兑现，前提是收购方不靠它赚钱。
- **产品线收敛是收购后的常态。** 付费产品被并入更大的平台，客户被迫迁移，这在开发者工具领域反复发生。
