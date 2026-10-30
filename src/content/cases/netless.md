---
name: Netless
tagline: 把互动白板做成 SDK，上市五个月后被声网整体买下
acquirer: 声网 Agora
status: completed
dealType: acquisition
announcedAt: 2020-11-27
completedAt: 2020-11-27
amount:
  disclosed: false
  currency: USD
  note: 公司未单独披露总对价。20-F 显示约 20 万美元开发技术资产与约 310 万美元商誉；部分中文报道称约 400 万美元，未获公司原文确认。
country: 中国
founded: 2019
categories:
  - 实时互动
  - 互动白板
  - 教育科技
license: 商业 SDK
evidence: B
featured: false
summary: 上海团队把实时互动白板做成可嵌入的 White SDK，2020 年 11 月被刚上市的声网收购 100% 股权。能力被并入 RTE 产品线，独立品牌随后淡出。
lastVerified: 2026-10-28
sources:
  - title: Agora acquires Netless — deal terms
    url: https://vectorshift.ai/research/deals/agora-netless-2020
    publisher: VectorShift Research
    date: 2020-11-27
    type: analysis
    note: 依据声网 20-F 整理交易结构、开发技术资产与商誉数字。
  - title: Netless 项目信息
    url: https://pitchhub.36kr.com/project/2316531749456134
    publisher: 36氪
    type: data
    note: 记录运营主体上海它山石信息科技有限公司、法定代表人丁楠、创始人伍双与股东结构。
  - title: 声网 20-F（2020 财年）
    url: https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=API&type=20-F
    publisher: SEC EDGAR
    type: filing
    note: 交易对价与商誉的原始披露出处；本页数字经二手分析转述，建议引用前回查原文。
timeline:
  - date: 2019-01-16
    title: 上海它山石信息科技有限公司注册
    detail: 法定代表人为丁楠，创始人伍双；产品以 White SDK / herewhite 为开发者所知。
    kind: founding
    source: https://pitchhub.36kr.com/project/2316531749456134
  - date: 2020-06-26
    title: 声网在纳斯达克上市
    kind: funding
    source: https://vectorshift.ai/research/deals/agora-netless-2020
  - date: 2020-11-27
    title: 声网完成收购 Netless 100% 股权
    detail: 结构为现金加向加入声网的 Netless 员工发放的股份激励；总对价未单独披露。
    kind: deal
    source: https://vectorshift.ai/research/deals/agora-netless-2020
  - date: 2021-04-01
    title: 声网 20-F 披露交易带来的开发技术与商誉
    detail: 约 20 万美元开发技术（五年摊销）与约 310 万美元商誉，商誉归因于与实时互动平台的协同。
    kind: aftermath
    source: https://vectorshift.ai/research/deals/agora-netless-2020
checks:
  - date: 2026-10-30
    label: 维护活跃度
    value: 维护显著减弱：flat 仓库最近 90 天 0 次提交，最后一次发布是 2025-01 的 v2.3.6（21 个月前），最后提交停在 2026-07-08
    source: https://github.com/netless-io/flat
openQuestions:
  - Netless 团队加入声网后的具体去向与存续时间，缺少公开记录。
  - 声网互动白板产品线的最终状态（继续售卖、合并或停运）没有一手公告。
  - 交易总对价的不同口径（约 400 万美元 vs 未披露）需要回查 20-F 原文。
  - 团队规模无公开记录：Netless 被收购前的人数未见披露，声网 20-F 未单列该团队的编制。
---

## 背景：不做白板，做白板的 SDK

Netless 是一家上海团队，运营主体上海它山石信息科技有限公司注册于 2019 年 1 月，创始人为伍双。它没有做面向终端用户的协作白板，而是把实时互动白板做成 SDK：开发者接入 White SDK，就能在在线课堂、会议或协作应用里嵌入一块多人同步的画布。

这个定位很直接。在线教育最热的几年，几乎所有课堂产品都需要白板，但自研实时同步、笔迹渲染和多人协作的成本很高。Netless 卖的是“能力”，不是“应用”，因此可以嵌进别人的产品里，避开与客户竞争。

2020 年 6 月，声网在纳斯达克上市。五个月后，它买下了这家白板公司。

## 交易：上市后的第一笔补强

2020 年 11 月 27 日，声网完成对 Netless 100% 股权的收购。交易结构是现金，加上向加入声网的 Netless 员工发放的股份激励——这不是单纯买资产，而是把团队一起留下。

声网没有单独披露总对价。其 20-F 显示，这笔交易带来约 20 万美元的开发技术资产（按五年摊销）和约 310 万美元商誉，商誉归因于白板能力与实时音视频平台的预期协同。中文媒体常引用“约 400 万美元”的口径，但我们没有找到公司原文确认这个数字，因此档案把它标为“未披露”，并在注释里保留两种口径。

从战略上看，这笔交易几乎不需要解释：白板是实时音视频最自然的邻近能力。客户买的是“一整套在线课堂/会议能力”，声网不希望这块拼图落在别人手里。

## 之后：能力留下，品牌淡出

收购后，Netless 没有保持独立品牌运营。白板能力被并入声网的实时互动（RTE）产品组合，Netless 作为独立 SDK 品牌的存在感迅速下降。截至 2026 年 10 月，herewhite.com 已无法访问（本次核验直接访问的结果）。

需要说明的是：我们没有找到声网发布的“白板产品线整合/停运”专门公告。这段过程缺少一手记录，只能从品牌网站消失、产品文档收敛这些侧面观察。对档案来说，这是一个诚实的空白，而不是可以补写的剧情。

## 为什么值得研究

- **小额并购补的是产品拼图，不是增长。** 几百万美元买一个能力、一个团队，让它消失在母体产品里——这是 To B 软件常见的并购形态，却很少被记录。
- **对价披露可以很模糊。** 商誉、开发技术资产、现金与股份激励分散在不同段落，“交易值多少钱”往往没有单一答案。
- **被收购的开发者品牌如何消失。** 代码和能力继续存在，品牌、文档、社区却可能在一两年内归零；依赖这些 SDK 的开发者需要提前评估迁移路径。
