---
name: AFFiNE
tagline: 从爆红的开源 Notion 替代品，到创始人离任与未兑现的 Apache 2.0
url: https://affine.pro
status: venture-backed
founded: 2022
founders:
  - 贺嘉琛（JiaChen He，2026 年 5 月前任 CEO）
  - 张驰（CTO）
  - 王译锋（首席架构师）
  - 魏伊培（COO）
location: 新加坡（TOEVERYTHING PTE. LTD.）
license: MIT + EE
licenseNotes: 除 packages/backend 与 packages/common/native 外为 MIT；后端采用 AFFiNE Enterprise Edition 许可，生产使用需要有效的 EE 订阅。2026-05-13 新任 CEO 宣布将“从 open-core 转向 Apache 2.0 的全开源仓库”，截至 2026-10-29 仓库仍为 MIT + EE 拆分，承诺尚未落地。
businessModel: open-core SaaS：免费社区版与自托管、付费 Pro 云计划、Team/Enterprise（私有云、自托管、授权），以及 8.9 美元/月的 AI 附加包；另有 OEM/白标代码授权。
categories:
  - 知识库
  - 协作
  - 开源
summary: AFFiNE 在 2022 年以开源 Notion/Miro 替代品的定位爆红，2023 年完成约千万美元 Pre-A。2026 年 5 月创始人贺嘉琛离任，新任 CEO 承诺转向 Apache 2.0，但截至 10 月尚未执行。
watchReasons:
  - 它完整走过了“爆红开源 → open-core 变现 → 创始人离任”的弧线，是研究开源项目生命周期的样本。
  - 新 CEO 承诺 Apache 2.0 却未落地，是检验“过渡期开源承诺”可信度的直接案例。
  - 中文开发者社区对它的讨论密集，但大量说法缺少一手来源，适合做事实核对的示范。
signals:
  - label: 归属状态
    value: 独立经营，未发现收购；2026-05 管理层更替
    source: https://affine.pro/blog/next-chapter-of-affine
  - label: 融资
    value: 约千万美元 Pre-A（2023-02），华创资本、红点中国、创新工场联合领投
    source: http://www.chinagrowthcapital.com/Index/article/id/1633
  - label: 治理
    value: 创始人贺嘉琛离任去做 Bridge；Vincent Chen 接任 CEO
  - label: 许可
    value: MIT + EE 后端；Apache 2.0 迁移已宣布、未执行
    source: https://github.com/toeverything/AFFiNE/blob/canary/LICENSE
  - label: 规模（公司口径）
    value: 68.3k GitHub stars、700 万+ 下载（2026-05）
    source: https://affine.pro/blog/next-chapter-of-affine
featured: true
lastVerified: 2026-10-29
sources:
  - title: AFFiNE's Next Chapter
    url: https://affine.pro/blog/next-chapter-of-affine
    publisher: AFFiNE（Vincent Chen）
    date: 2026-05-13
    type: primary
    note: 创始人离任、CEO 更替、Apache 2.0 计划与路线图。
  - title: 开源软件 AFFiNE 完成 Pre-A 轮融资，华创资本联合领投
    url: http://www.chinagrowthcapital.com/Index/article/id/1633
    publisher: 华创资本
    date: 2023-02-14
    type: primary
    note: Pre-A 轮、投资方、新加坡主体与创始团队。
  - title: AFFiNE LICENSE（canary 分支）
    url: https://github.com/toeverything/AFFiNE/blob/canary/LICENSE
    publisher: GitHub / Toeverything Pte. Ltd.
    type: primary
    note: 确认 MIT + EE 的现状，Apache 2.0 尚未落地。
  - title: AFFiNE 定价
    url: https://affine.pro/pricing
    publisher: AFFiNE
    type: primary
    note: Pro、AI 附加包与自托管/企业版定价。
timeline:
  - date: 2022-01-01
    dateLabel: 2022 年
    title: AFFiNE 开源并快速获得关注
    detail: 投资方称其 72 小时获得 1,000 stars、43 天达到 10,000 stars。
    kind: product
    source: http://www.chinagrowthcapital.com/Index/article/id/1633
  - date: 2023-02-14
    title: 完成约千万美元 Pre-A 轮
    detail: 华创资本、红点中国、创新工场联合领投，奇绩创坛跟投。
    kind: funding
    source: http://www.chinagrowthcapital.com/Index/article/id/1633
  - date: 2024-03-04
    title: AFFiNE AI 进入早期访问
    kind: product
    source: https://affine.pro/blog/affine-0-12-0-launch-week-day-3-early-access-affine-ai-self-host-upcoming-0-13-unveiled
  - date: 2025-02-17
    title: 通过 SourceNext 进入日本零售渠道
    detail: 日本经销商开始销售 AFFiNE 一年期许可与 AI 计划。
    kind: product
    source: https://sourcenext.co.jp/pressrelease_html/JS/2025/2025021701
  - date: 2026-05-13
    title: 创始人离任，CEO 更替，宣布转向 Apache 2.0
    detail: 贺嘉琛去做 agent-native 产品 Bridge；Vincent Chen 接任 CEO，承诺 Markdown 优先、BYOK 与全开源。
    kind: governance
    source: https://affine.pro/blog/next-chapter-of-affine
  - date: 2026-10-29
    title: Apache 2.0 迁移仍未执行
    detail: 仓库仍为 MIT + EE 拆分；承诺已宣布五个月。
    kind: license
    source: https://github.com/toeverything/AFFiNE/blob/canary/LICENSE
openQuestions:
  - 2023 年 Pre-A 之后是否还有融资，缺少一手确认。
  - Pre-A 金额只有“千万美元”口径，精确数字未知。
  - Apache 2.0 是否会在 2026 年内落地，仍待观察。
  - 社区关于“团队解散、只剩一名维护者”的说法无法核实，GitHub 显示仍在持续提交。
---

## 从爆红到 open-core

AFFiNE 在 2022 年以“开源 Notion + Miro 替代品”的定位出现，投资方华创资本称它 72 小时获得 1,000 stars、43 天达到 10,000 stars。2023 年 2 月，它完成约千万美元 Pre-A 轮，华创资本、红点中国、创新工场联合领投。

商业化走的是 open-core：编辑器 MIT，后端走 AFFiNE Enterprise Edition 许可，生产使用需要订阅；云版 Pro、团队版、企业版与 AI 附加包构成收入。这是开源项目常见的变现结构，也埋下了“哪些部分算开源”的争议。

## 创始人离任与未兑现的承诺

2026 年 5 月 13 日，创始人贺嘉琛宣布离任，去做 agent-native 产品 Bridge；Vincent Chen 接任 CEO。同一篇公告里，新 CEO 承诺把 AFFiNE 从 open-core 转向 Apache 2.0 的全开源仓库，并把 Markdown 作为一等文件格式、支持 BYOK 与 agent 互操作。

截至 2026 年 10 月 29 日，仓库仍然是 MIT + EE 拆分。承诺已经宣布五个月，代码还没动。这不是说承诺一定不会兑现，而是提醒：**过渡期的开源承诺，需要用仓库状态来验证，而不是用公告语气来判断。**

## 为什么值得观察

- 它是一条完整的生命周期样本：爆红、融资、open-core、创始人离任、治理承诺。
- 它是“承诺与执行之间时差”的活案例；档案会持续核对 Apache 2.0 是否落地。
- 中文社区对它的讨论很多，但大量说法没有一手来源。把它放进观察名单，也是在做一次事实核对的示范。
