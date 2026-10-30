---
name: Deno
tagline: 整个团队加入 Cloudflare，运行时进入一年倒计时
acquirer: Cloudflare
status: team-join
dealType: team-join
announcedAt: 2026-10-09
completedAt: 2026-10-09
amount:
  disclosed: false
  note: 双方均未披露对价与法律交易结构；Cloudflare 将其归入 Acquisitions 分类。
currency: USD
country: 美国
founded: 2018
categories:
  - 运行时
  - JavaScript
  - Serverless
license: MIT
licenseAfter: MIT
evidence: A
featured: true
summary: 2026 年 10 月，Deno 团队整体加入 Cloudflare。运行时再支持一年后停止开发，Deno Deploy 六个月后关停，JSR 迁移到 Cloudflare。一个开源运行时给出了明确的退场时间表。
lastVerified: 2026-10-28
sources:
  - title: Deno is joining Cloudflare
    url: https://deno.com/blog/cloudflare
    publisher: Deno
    date: 2026-10-09
    type: primary
    note: 一手公告，列明运行时、Deploy、JSR 与 rusty_v8 的具体安排。
  - title: Deno is joining Cloudflare
    url: https://blog.cloudflare.com/deno-joins-cloudflare
    publisher: Cloudflare
    date: 2026-10-09
    type: primary
    note: 联合公告，说明团队将投入 Workers、Durable Objects 与 celld。
  - title: Deno (software) — Wikipedia
    url: https://en.wikipedia.org/wiki/Deno_(software)
    publisher: Wikipedia
    type: analysis
    note: 创立与版本发布时间线，仅用于背景。
  - title: Deno is joining Cloudflare
    url: https://simonwillison.net/2026/Oct/9/deno-is-joining-cloudflare/
    publisher: Simon Willison
    date: 2026-10-09
    type: analysis
    note: 对公告要点的整理与评论。
timeline:
  - date: 2018-01-01
    dateLabel: 2018 年
    title: Ryan Dahl 与 Bert Belder 发起 Deno
    kind: founding
    source: https://en.wikipedia.org/wiki/Deno_(software)
  - date: 2020-05-13
    title: Deno 1.0 发布
    kind: product
    source: https://en.wikipedia.org/wiki/Deno_(software)
  - date: 2026-10-09
    title: 团队整体加入 Cloudflare
    detail: 双方联合公告；未披露对价与法律结构。
    kind: deal
    source: https://deno.com/blog/cloudflare
plans:
  - date: 2027-04-01
    dateLabel: 2027 年 4 月
    title: Deno Deploy 关停
    detail: 按 2026-10-09 公告给出的“六个月”期限推算；付费客户迁移至 Cloudflare Workers。具体日期以官方后续通知为准。
    basis: derived
    quote: Deno Deploy will continue operating for six months before shutting down.
    source: https://deno.com/blog/cloudflare
  - date: 2027-10-01
    dateLabel: 2027 年 10 月
    title: Deno 运行时停止开发
    detail: 按公告的一年支持期推算；支持期内每月发布 bug 修复与安全更新，之后代码保持开源。
    basis: derived
    quote: We will support the Deno runtime for another year with monthly releases containing bug fixes and security updates.
    source: https://deno.com/blog/cloudflare
checks:
  - date: 2026-10-30
    label: 维护活跃度
    value: 最近 90 天 100+ 次提交、12 个月 40 次发布；核心维护者 bartlomieju 提交 41 次
    source: https://github.com/denoland/deno
promises:
  - claim: Deno 运行时再支持一年，每月发布 bug 修复与安全更新。
    status: pending
    note: 承诺期到 2027 年 10 月；本页将持续核对月度发布是否兑现。
    source: https://deno.com/blog/cloudflare
  - claim: 一年后结束 Deno 运行时开发，但代码保持开源，欢迎他人接手。
    status: pending
    note: 截至 2026-10 尚未到期。
    source: https://deno.com/blog/cloudflare
  - claim: Deno Deploy 继续运营六个月后关停，为付费客户提供迁移支持。
    status: pending
    note: 关停时间约为 2027 年 4 月。
    source: https://deno.com/blog/cloudflare
  - claim: JSR 继续运营，基础设施迁移到 Cloudflare。
    status: pending
    source: https://deno.com/blog/cloudflare
  - claim: 继续支持 rusty_v8，并推进集成进 workerd。
    status: pending
    source: https://deno.com/blog/cloudflare
openQuestions:
  - 交易的法律结构（团队加入、资产收购还是公司收购）未披露。
  - Deno 公司主体与商标、域名、JSR 的归属如何安排，没有公开说明。
  - 一年支持期结束后，是否会有基金会或社区接手运行时。
  - 团队规模无公开记录：Deno Land 未披露员工人数；「团队整体加入」的表述没有对应的绝对人数。
---

## 背景：修掉 Node 的遗憾

2018 年，Node.js 的作者 Ryan Dahl 与 Bert Belder 发起 Deno，试图修掉 Node 的一些设计遗憾：默认安全、原生 TypeScript、URL 模块、内置工具链。Deno 1.0 于 2020 年 5 月发布，后来又推出托管平台 Deno Deploy 与包注册表 JSR。

但 Deno 一直面对一个结构性问题：运行时本身很难赚钱，托管平台又要和 Cloudflare Workers、Vercel 等正面竞争。团队把越来越多精力放在 Deploy 上，后来又转向一个新的分布式应用框架 celld——它直接构建在 Cloudflare Workers 的编程模型之上。

## 交易：团队加入，而不是公司被买下

2026 年 10 月 9 日，Deno 与 Cloudflare 同时发布公告：**整个 Deno 团队加入 Cloudflare**。Cloudflare 把这笔交易归入 Acquisitions 分类，但双方都没有披露对价、法律结构，也没有说明 Deno 公司主体如何处理。因此本档案把它记为“团队加入（team-join）”，而不是“已证实的整体收购”。

公告没有停留在“我们会继续支持”这种模糊表述上，而是给出了具体安排：

- **Deno 运行时**：再支持一年，每月发布包含 bug 修复和安全更新的版本；一年后停止开发。代码保持开源，欢迎其他人接手。
- **Deno Deploy**：继续运营六个月，然后关停；为付费客户提供迁移到 Cloudflare Workers 的支持。
- **JSR**：继续运营，基础设施迁移到 Cloudflare。
- **rusty_v8**：继续支持，并推进集成进 workerd。

这几乎是一份“有序退场”清单。

## 之后：一个开源项目如何体面地结束

团队加入后，工作重心转向 Cloudflare 的 Workers、Durable Objects 和 celld。对 Deno 的用户来说，最重要的不是“谁买了谁”，而是三个日期：Deploy 的六个月、运行时的十二个月、以及 JSR 的迁移。

这份档案会在 2027 年 4 月和 10 月回来核对：月度发布是否真的持续、Deploy 是否按时关停、JSR 的迁移是否平滑、以及有没有社区分叉接手运行时。

## 为什么值得研究

- **团队加入 ≠ 公司收购。** 法律结构决定了谁对用户负责、商标和基础设施归谁；公告里不写，档案就不能替它写。
- **“继续开源”和“继续开发”是两件事。** Deno 的代码会留下，但官方开发会停止。对依赖它的团队来说，这两者的风险完全不同。
- **平台型公司吸收运行时团队。** Cloudflare 要的是把 JavaScript 容器模型做成默认；运行时的独立命运，不在这个目标里。
