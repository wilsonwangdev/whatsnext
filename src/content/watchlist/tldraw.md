---
name: tldraw
tagline: 把“无限画布”做成 SDK，两年内两次改写许可证
url: https://tldraw.dev
status: venture-backed
founded: 2022
founders:
  - Steve Ruiz
location: 英国伦敦
license: tldraw license
licenseNotes: SDK 源码公开，但按 OSI 定义不算开源。当前许可只允许在开发环境使用；生产环境需要试用、商业或爱好许可，并通过客户端 license key 校验。v3.0.0（2024-09-13）采用“带水印即可免费商用”的模式；v4.0.0（2025-09-18）改为“默认仅限开发 + 许可密钥 + 100 天试用”。示例与 starter kit 为 MIT。
businessModel: 按价值定价的年度商业 SDK 许可（含多人同步 tldraw sync），另有 100 天试用、非商业爱好许可与创业公司折扣；tldraw.com 免费白板作为旗舰演示。
categories:
  - 白板
  - 协作 SDK
  - 开发者工具
summary: Steve Ruiz 在 2022 年创立 tldraw，把无限画布做成可嵌入的 React SDK。公司累计融资约 1,470 万美元，并在 2024 与 2025 年两次收紧许可证，试图把免费采用者转化为付费客户。
watchReasons:
  - 它是“源码可见、生产收费”模式清晰的活体实验：代码可读，但不能自由发布。
  - 创始人长期 build in public，公开收入、客户与许可变更理由，可核对性高。
  - 许可证在两年内两次收紧，说明“开源获客 + 商业许可”的张力真实存在。
signals:
  - label: 归属状态
    value: 独立经营，未发现收购；VC 支持
  - label: 累计融资
    value: 约 1,470 万美元（Seed 270 万 + 扩展 200 万 + A 轮 1,000 万）
    source: https://tldraw.dev/blog/announcing-tldraw-series-a
  - label: 收入披露
    value: 首个销售年 license 收入“略低于 100 万美元”（2025-04 公司披露）
    source: https://tldraw.dev/blog/announcing-tldraw-series-a
  - label: 团队规模
    value: 近 20 人，分布于伦敦、欧洲与美国（2025-04）
    source: https://tldraw.dev/blog/announcing-tldraw-series-a
  - label: 许可性质
    value: source-available，非 OSI 开源；生产使用需付费
featured: true
lastVerified: 2026-10-29
sources:
  - title: tldraw raises $10M to build the infinite canvas for developers
    url: https://tldraw.dev/blog/announcing-tldraw-series-a
    publisher: tldraw
    date: 2025-04-09
    type: primary
    note: A 轮金额、领投方、首年 license 收入、客户名单与团队规模。
  - title: Announcing tldraw SDK 4.0
    url: https://tldraw.dev/blog/tldraw-sdk-4-0
    publisher: tldraw
    date: 2025-09-18
    type: primary
    note: 改为“仅限开发环境 + 许可密钥”的许可变更与理由。
  - title: License
    url: https://tldraw.dev/community/license
    publisher: tldraw
    type: primary
    note: 当前许可机制：开发默认、试用/商业/爱好许可、客户端密钥校验。
  - title: Announcing tldraw's seed round
    url: https://tldraw.dev/blog/announcing-tldraws-seed-round
    publisher: tldraw
    date: 2022-11-30
    type: primary
    note: 270 万美元种子轮与投资方。
timeline:
  - date: 2022-11-30
    title: 完成 270 万美元种子轮
    detail: Lux Capital 领投，Amplify Partners 等参投。
    kind: funding
    source: https://tldraw.dev/blog/announcing-tldraws-seed-round
  - date: 2023-11-22
    title: 完成 200 万美元内部扩展轮
    kind: funding
    source: https://tldraw.dev/blog/tldraw-raised-another-2m
  - date: 2024-09-13
    title: SDK v3.0.0 引入水印式许可
    detail: 展示“Made with tldraw”水印即可免费商用，付费商业许可用于移除水印。
    kind: license
    source: https://tldraw.dev/releases/v3.0.0
  - date: 2025-04-09
    title: 完成 1,000 万美元 A 轮
    detail: Lux Capital 与 Definition 投资；披露首年 license 收入略低于 100 万美元。
    kind: funding
    source: https://tldraw.dev/blog/announcing-tldraw-series-a
  - date: 2025-09-18
    title: SDK 4.0 收紧许可，生产使用必须持证
    kind: license
    source: https://tldraw.dev/blog/tldraw-sdk-4-0
  - date: 2026-05-06
    title: SDK 5.0 发布，许可条款未再变化
    kind: product
    source: https://tldraw.dev/releases/v5.0.0
openQuestions:
  - A 轮后的 ARR、估值与人数未披露。
  - 2026 年没有新融资或被收购的一手信号。
  - 6.0 是否会再次收紧许可，目前无法判断。
---

## 从 build in public 到许可证工程

Steve Ruiz 在 2022 年创立 tldraw，把无限画布做成一个可嵌入的 React SDK：开发者不必从零实现多人同步、笔迹渲染和画布交互，只要接入组件，就能在自己的产品里放一块白板。

tldraw 是 build in public 的典型样本：融资公告里写收入（首个销售年 license 收入“略低于 100 万美元”），公布客户名字（ClickUp、Padlet、Craft、Jam），把团队规模和许可变更的理由都摊开写。它的消费者版 tldraw.com 免费，充当旗舰演示。

## 两次改写许可证

2024 年 9 月，SDK 3.0 引入“水印换免费”的模式：只要展示“Made with tldraw”水印，商用也可以免费；想移除水印就买商业许可。

一年后，4.0 把这个模式整个换掉：SDK 默认只允许在开发环境使用，生产环境必须购买试用、商业或爱好许可，并通过 license key 在客户端校验。官方博客给出的理由很直白——“命运和资本都要求 tldraw 成为一个可持续的项目”。

这就是“源码可见、生产收费”的核心张力：代码在 GitHub 上人人可读，但把它发布到生产环境需要付费。对学习者友好，对商业使用严格。

## 为什么值得观察

- 它是“source-available”模式清晰的活体实验：既不是 MIT 的慷慨，也不是闭源的隔绝。
- 许可证在两年内两次收紧，说明免费采用与商业收入之间的转换并不顺滑。
- 如果这种模式成立，它会给独立 SDK 作者提供一条不依赖被收购的路径；如果不成立，它会成为“开源获客”叙事的反例。
