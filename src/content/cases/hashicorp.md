---
name: HashiCorp
tagline: Terraform 的许可证先变，IBM 的 64 亿美元收购随后
acquirer: IBM
status: completed
dealType: acquisition
announcedAt: 2024-04-24
completedAt: 2025-02-27
amount:
  disclosed: true
  value: 6400000000
  currency: USD
  note: 每股 35 美元现金，企业价值约 64 亿美元。
country: 美国
founded: 2012
categories:
  - 基础设施
  - DevOps
  - 开源
license: BUSL 1.1
licenseAfter: BUSL 1.1
evidence: A
featured: false
summary: IBM 以约 64 亿美元收购 HashiCorp，2025 年 2 月完成。交易没有让 Terraform 的许可证回到 MPL——2023 年的 BUSL 变更被完整保留，OpenTofu 分叉继续存在。
lastVerified: 2026-10-28
sources:
  - title: IBM to Acquire HashiCorp, Inc.
    url: https://newsroom.ibm.com/2024-04-24-IBM-to-Acquire-HashiCorp-Inc-Creating-a-Comprehensive-End-to-End-Hybrid-Cloud-Platform
    publisher: IBM
    date: 2024-04-24
    type: primary
    note: 官方公告，确认 64 亿美元企业价值与每股 35 美元现金对价。
  - title: IBM Completes Acquisition of HashiCorp
    url: https://newsroom.ibm.com/2025-02-27-ibm-completes-acquisition-of-hashicorp,-creates-comprehensive,-end-to-end-hybrid-cloud-platform
    publisher: IBM
    date: 2025-02-27
    type: primary
    note: 交割完成公告。
  - title: HashiCorp adopts Business Source License
    url: https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license
    publisher: HashiCorp
    date: 2023-08-10
    type: primary
    note: Terraform 从 MPL 2.0 切换到 BUSL 1.1 的官方说明。
  - title: OpenTofu
    url: https://opentofu.org/
    publisher: OpenTofu
    type: primary
    note: BUSL 变更后社区分叉的 Terraform 替代实现。
  - title: HashiCorp — Wikipedia
    url: https://en.wikipedia.org/wiki/HashiCorp
    publisher: Wikipedia
    type: analysis
    note: 创立时间与创始人的二手汇总，仅用于基础背景。
  - title: HashiCorp officially joins the IBM family
    url: https://www.hashicorp.com/en/blog/hashicorp-officially-joins-the-ibm-family
    publisher: HashiCorp
    date: 2025-02-27
    type: primary
    note: 管理层对整合方向与"继续投资"的表述。
  - title: Terraform LICENSE
    url: https://github.com/hashicorp/terraform/blob/main/LICENSE
    publisher: GitHub
    type: primary
    note: 2026-10 核验，仍为 Business Source License 1.1。
timeline:
  - date: 2012-01-01
    dateLabel: 2012 年
    title: Mitchell Hashimoto 与 Armon Dadgar 创立 HashiCorp
    kind: founding
    source: https://en.wikipedia.org/wiki/HashiCorp
  - date: 2023-08-10
    title: Terraform 从 MPL 2.0 切换到 BUSL 1.1
    detail: 限制与 Terraform 竞争的商业使用，社区随后分叉出 OpenTofu。
    kind: license
    source: https://www.hashicorp.com/blog/hashicorp-adopts-business-source-license
  - date: 2024-04-24
    title: IBM 宣布以约 64 亿美元收购 HashiCorp
    kind: deal
    source: https://newsroom.ibm.com/2024-04-24-IBM-to-Acquire-HashiCorp-Inc-Creating-a-Comprehensive-End-to-End-Hybrid-Cloud-Platform
  - date: 2025-02-27
    title: 交易完成，HashiCorp 成为 IBM Software 的一个部门
    kind: deal
    source: https://newsroom.ibm.com/2025-02-27-ibm-completes-acquisition-of-hashicorp,-creates-comprehensive,-end-to-end-hybrid-cloud-platform
checks:
  - date: 2026-10-28
    label: Terraform 许可证
    value: BUSL 1.1（收购后未回到 MPL）
    source: https://github.com/hashicorp/terraform/blob/main/LICENSE
promises:
  - claim: IBM 将继续投资并发展 HashiCorp 的能力。
    status: pending
    note: 需要观察 2025-2026 的产品投入、人员与定价策略。
    source: https://newsroom.ibm.com/2025-02-27-ibm-completes-acquisition-of-hashicorp,-creates-comprehensive,-end-to-end-hybrid-cloud-platform
  - claim: Terraform 与 Ansible、watsonx 等 IBM 产品线整合。
    status: pending
    source: https://www.hashicorp.com/en/blog/hashicorp-officially-joins-the-ibm-family
openQuestions:
  - 收购后 HashiCorp 的裁员与团队变动没有完整公开数据。
  - OpenTofu 在企业市场的实际采用规模缺少权威统计。
  - IBM 是否会对 Terraform 的许可策略再做调整，尚无信号。
---

## 背景：基础设施即代码的标准

2012 年，Mitchell Hashimoto 与 Armon Dadgar 创立 HashiCorp。Terraform 用声明式配置管理云基础设施，Vault 管理密钥，Consul 做服务发现。十几年里，它们成了基础设施即代码（IaC）的事实标准，几乎所有云平台的教程都会先教你写一段 Terraform。

2023 年 8 月，HashiCorp 把 Terraform 的许可证从 MPL 2.0 改为 BUSL 1.1，限制与 Terraform 竞争的商业使用。社区随即分叉出 OpenTofu，后者由 Linux 基金会托管。许可证变更把一个技术项目变成了治理问题。

## 交易：64 亿美元，现金

2024 年 4 月 24 日，IBM 宣布以每股 35 美元现金收购 HashiCorp，企业价值约 64 亿美元。交易于 2025 年 2 月 27 日完成，HashiCorp 作为 IBM Software 的一个部门继续运营。

IBM 给出的理由是与 Red Hat、watsonx、Ansible 的协同：Terraform 负责创建基础设施，Ansible 负责配置，Vault 负责密钥。这是一个典型的“把相邻能力买进来”的故事，只是金额很大。

## 之后：许可证没有回头

值得核对的一条承诺是许可证。IBM 没有把 Terraform 拉回 MPL；截至 2026 年 10 月，Terraform 仓库仍然是 BUSL 1.1。收购改变的是所有者，不是许可策略。

对用户来说，真正的变化有三层：谁决定路线图、谁定价、以及分叉还有没有意义。OpenTofu 继续存在，但它要面对的是一个由 IBM 拥有的、资源更充足的上游。

## 为什么值得研究

- **许可证变更是收购的前奏，也是分叉的导火索。** 2023 年的 BUSL 切换，为 2024 年的出售铺平了道路，也把一部分社区推向了 OpenTofu。
- **“继续投资”是难以验证的承诺。** 它没有数字、没有期限，只能用产品发布、人员编制和定价变化来间接核对。
- **开源商业模式与云厂商的结构性冲突。** HashiCorp 的 BUSL 转向，本质上是对云厂商“拿走软件去卖托管服务”的反应；被 IBM 收购后，这个冲突只是换了一个所有者。
