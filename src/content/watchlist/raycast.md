---
name: Raycast
tagline: 从 macOS 启动器长成订阅套件，然后被 AI 成本追上
url: https://raycast.com
status: venture-backed
founded: 2020
founders:
  - Thomas Paul Mann（CEO）
  - Petr Nikolaev（CTO）
location: 英国（Raycast Technologies Ltd.，远程团队）
license: 专有
licenseNotes: 应用闭源。扩展基于公开的 React/TypeScript API 开发，通过 Raycast Store 分发；应用本身未发生许可变更。
businessModel: 免费核心启动器 + 订阅：Pro 10 美元/月（500 AI credits）、Pro+ 20 美元/月（3,000）、Max 50 美元/月（7,500），另有 Teams 与 Enterprise。2026-09-10 起 AI 改为按量计费，订阅价格不变；可自带 Claude/ChatGPT 订阅或 API key。
categories:
  - 启动器
  - 生产力
  - macOS
summary: Thomas Paul Mann 与 Petr Nikolaev 在 2020 年通过 YC 创立 Raycast，累计融资至少 4,770 万美元。2026 年它完成底层重写，并把 AI 从固定额度改成按量计费——因为推理成本已经无法用订阅费覆盖。
watchReasons:
  - 它展示了“独立风格产品 + VC 融资”之后的经济学：用户增长、平台扩张，然后是成本压力。
  - 2026 年的 AI 定价改革，是“按席位订阅”被推理成本击穿的清晰案例。
  - 团队公开人数、定价理由与薪酬政策，可核对性较高。
signals:
  - label: 归属状态
    value: 独立经营，未发现收购；YC W20
    source: https://www.raycast.com/careers
  - label: 累计融资
    value: 至少 4,770 万美元（Seed 270 万 + A 轮 1,500 万 + B 轮 3,000 万）
    source: https://www.raycast.com/blog/series-b
  - label: 团队
    value: 39 人，全远程（2026 年公司披露）
    source: https://www.raycast.com/careers
  - label: 定价
    value: Pro 10 / Pro+ 20 / Max 50 美元每月；AI 按 credits 计费
    source: https://www.raycast.com/pricing
  - label: 平台
    value: macOS、Windows（2025 公测）、iOS（2025）
    source: https://www.raycast.com/careers
featured: false
lastVerified: 2026-10-29
sources:
  - title: Raycast Pricing
    url: https://www.raycast.com/pricing
    publisher: Raycast
    type: primary
    note: Pro / Pro+ / Max 计划与 AI credits 额度。
  - title: $30M Series B to bring Raycast to new platforms
    url: https://www.raycast.com/blog/series-b
    publisher: Raycast
    date: 2024-09-25
    type: primary
    note: B 轮金额、平台计划与公司起点。
  - title: Why We're Changing How Raycast AI Is Priced
    url: https://www.raycast.com/blog/changing-how-raycast-ai-is-priced
    publisher: Raycast
    date: 2026-09-10
    type: primary
    note: credits 计费、各档额度、自带 key 政策与成本理由。
  - title: The New Raycast
    url: https://www.raycast.com/blog/the-new-raycast
    publisher: Raycast
    date: 2026-05-14
    type: primary
    note: 2026 年 5 月的底层重写、自建索引与听写功能。
  - title: Careers at Raycast
    url: https://www.raycast.com/careers
    publisher: Raycast
    type: primary
    note: 团队人数、远程设置与产品时间线。
timeline:
  - date: 2020-01-01
    dateLabel: 2020 年
    title: 通过 Y Combinator W20 创立
    kind: founding
    source: https://www.raycast.com/careers
  - date: 2021-11-30
    title: 完成 1,500 万美元 A 轮
    kind: funding
    source: https://www.raycast.com/blog/series-a
  - date: 2024-09-25
    title: 完成 3,000 万美元 B 轮
    detail: Atomico 领投，用于扩展到 Windows 与 iOS。
    kind: funding
    source: https://www.raycast.com/blog/series-b
  - date: 2025-04-30
    title: 推出 iOS 版
    kind: product
    source: https://www.raycast.com/blog/raycast-for-ios
  - date: 2026-05-14
    title: 完成底层重写（The New Raycast）
    detail: 自建磁盘索引替代 Spotlight，加入系统级听写与新的快捷键录制。
    kind: product
    source: https://www.raycast.com/blog/the-new-raycast
  - date: 2026-09-10
    title: AI 改为按量计费
    detail: 订阅价格不变，加入 credits 额度，新增 50 美元/月的 Max；官方称无法再补贴推理成本。
    kind: product
    source: https://www.raycast.com/blog/changing-how-raycast-ai-is-priced
openQuestions:
  - 未发现 C 轮及以后融资；估值与收入未披露。
  - 种子轮的确切日期未知。
  - 2026 年出现的 Glaze 与 Raycast 的关系，现有公告没有说清。
---

## 从启动器到订阅套件

2020 年，Thomas Paul Mann 与 Petr Nikolaev 通过 Y Combinator 创立 Raycast，把 macOS 的 Spotlight 替换成一个可扩展的命令面板。此后它完成 270 万美元种子轮、1,500 万美元 A 轮与 3,000 万美元 B 轮，团队 39 人，全远程。

产品线也从启动器扩到 Windows、iOS、AI 与团队协作。它的扩展生态是关键的护城河：开发者用 React/TypeScript 写扩展，通过 Store 分发，用户换平台的成本被抬高。

## AI 成本改写了定价

2026 年 9 月，Raycast 把 AI 从“订阅内含固定额度”改成 credits 按量计费：Pro 500、Pro+ 3,000、新增 Max 7,500（50 美元/月）；想自带 Claude/ChatGPT 订阅或 API key，也必须先订阅付费计划。

官方解释很直接：无法像大模型实验室那样补贴推理成本。这句话点出了 2026 年一批“AI 功能订阅制”产品的共同困境——按席位收固定费用，却要按 token 付变动成本。

## 为什么值得观察

- 它展示了独立风格产品被 VC 加速后的典型路径：扩张平台、增加功能、然后被成本结构反噬。
- AI 计费改革是一个可复用的观察点：当推理成本超过订阅收入，产品会先改价，还是先砍功能？
- 它仍然独立。如果未来出现收购意向，扩展生态与订阅用户会是估值核心。
