---
name: Excalidraw
tagline: 完全 MIT 的手绘风白板，靠托管服务而不是许可证赚钱
url: https://excalidraw.com
status: independent
founded: 2020
founders:
  - Christopher Chedeau（2020 年创建）
  - David Luzar
  - Milos Vetesnik
location: 捷克布尔诺（Excalidraw s.r.o.，2021 年 5 月注册）
license: MIT
licenseNotes: excalidraw.com 编辑器与 @excalidraw/excalidraw npm 包均为 MIT，未发现许可变更；商业托管产品 Excalidraw+ 是独立的专有服务。因为核心是 MIT 且可自托管，即使未来所有权变化，免费产品仍可继续存在。
businessModel: 免费 MIT 编辑器 + Excalidraw+ 订阅（6 美元/用户/月，按年计费），提供无限云端画布、访问控制、评论、演示、SOC 2 Type 2、更高 AI 额度与 MCP/REST API；免费版含每天 10 次 AI 请求与无限协作。
categories:
  - 白板
  - 开源
  - 协作
summary: Excalidraw 是这份名单里直接的反例：编辑器完全 MIT、可自托管，公司只对托管层收费。它没有外部融资记录，却做到约 85 万月活（2024 年公司披露）与 13 万+ GitHub stars。
watchReasons:
  - 它证明“MIT + 托管订阅”可以支撑一个数百万人使用的产品，而不需要改许可证。
  - 没有融资记录、没有收购，是研究独立软件可持续性的干净样本。
  - 中文、日文、韩文手绘字体的工程实现，说明小团队也能做长期基础设施级投入。
signals:
  - label: 归属状态
    value: 独立经营；未发现收购
  - label: 融资
    value: 未发现外部融资记录
  - label: 许可
    value: MIT（编辑器与 npm 包），核心可自托管
  - label: 规模（公司披露）
    value: 约 85 万月活、8.9 万 stars（2024 年）
    source: https://plus.excalidraw.com/blog/excalidraw-in-2024
  - label: 仓库
    value: 13.4 万 stars（2026-10）
    source: https://github.com/excalidraw/excalidraw
  - label: 商业产品
    value: Excalidraw+，6 美元/用户/月（年付）
    source: https://plus.excalidraw.com/pricing
featured: true
lastVerified: 2026-10-29
sources:
  - title: Excalidraw in 2024
    url: https://plus.excalidraw.com/blog/excalidraw-in-2024
    publisher: Excalidraw
    date: 2025-01-09
    type: primary
    note: 约 85 万月活、8.9 万 stars 与 2024 年功能回顾。
  - title: excalidraw/excalidraw
    url: https://github.com/excalidraw/excalidraw
    publisher: GitHub
    type: data
    note: MIT 许可、13.4 万 stars、2026-10-28 仍有提交。
  - title: Excalidraw+ 定价
    url: https://plus.excalidraw.com/pricing
    publisher: Excalidraw
    type: primary
    note: 免费版限制、Plus 价格、SOC 2 与 AI 额度。
  - title: Adding hand-drawn font for Chinese, Japanese, Korean
    url: https://plus.excalidraw.com/blog/adding-hand-drawn-font-for-chinese-japanese-korean
    publisher: Excalidraw
    date: 2024-11-07
    type: primary
    note: CJK 手绘字体的工程实现（209 个分块、Web Worker 子集化）。
timeline:
  - date: 2020-01-01
    dateLabel: 2020 年 1 月
    title: Christopher Chedeau 创建 Excalidraw
    kind: founding
    source: https://en.wikipedia.org/wiki/Excalidraw
  - date: 2021-05-01
    dateLabel: 2021 年 5 月
    title: Excalidraw s.r.o. 在布尔诺注册
    kind: founding
    source: https://en.wikipedia.org/wiki/Excalidraw
  - date: 2024-11-07
    title: 支持中文、日文、韩文手绘字体
    kind: product
    source: https://plus.excalidraw.com/blog/adding-hand-drawn-font-for-chinese-japanese-korean
  - date: 2025-01-09
    title: 公布 2024 年数据：约 85 万月活
    kind: product
    source: https://plus.excalidraw.com/blog/excalidraw-in-2024
  - date: 2026-09-30
    title: 发布演示动画与便签工具
    kind: product
    source: https://plus.excalidraw.com/changelog
openQuestions:
  - 没有公开融资记录，但 Excalidraw s.r.o. 是否有外部股东未知。
  - 收入与人数未披露。
  - 2026 年 Miro 被 Bending Spoons 收购的传闻与 Excalidraw 无关，未找到一手证据。
---

## 一个 MIT 白板如何赚钱

Excalidraw 由 Christopher Chedeau 在 2020 年创建，随后由捷克的 David Luzar、Milos Vetesnik 接手运营，2021 年 5 月在布尔诺注册公司。它的编辑器、npm 包全部 MIT，任何人都可以自托管、修改、再发布。

商业产品是 Excalidraw+：6 美元/用户/月的托管订阅，卖的是云端画布、权限、评论、演示、合规与更高的 AI 额度。换句话说，它卖的不是代码，而是“不用自己运维”的那部分。

这个模式的效果不错。公司披露 2024 年 excalidraw.com 约有 85 万月活、8.9 万 GitHub stars；到 2026 年 10 月，仓库有 13.4 万 stars，仍在持续提交。它没有融资记录，也没有被收购。

## 为什么值得观察

- 它是“MIT + 托管订阅”可行性的有力证据：不改许可证也能养活产品。
- 它说明开源项目的护城河可以是运维、合规与协作体验，而不是代码封锁。
- 如果它某天被收购，MIT 核心仍然可以被分叉——这是许可证给用户的真正保险。
