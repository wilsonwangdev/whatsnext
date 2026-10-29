// 部署前请把 url 与 repo 改为你自己的域名与仓库地址。
export const SITE = {
  name: 'PostClose',
  nameZh: '交割之后',
  title: 'PostClose · 交割之后',
  description:
    '开发者软件、开源项目与团队归属的公开档案：记录收购与团队加入的事实、公开承诺，以及之后真正发生了什么。每条事实附来源，每次更新注明核验日期。',
  tagline: '开发者软件的收购、团队加入与后续档案',
  url: 'https://wilsonwangdev.github.io/postclose',
  locale: 'zh-CN',
  author: 'PostClose 维护者',
  repo: 'https://github.com/wilsonwangdev/postclose',
} as const;

export const NAV = [
  { href: '/cases', label: '案例库', en: 'Cases' },
  { href: '/watchlist', label: '观察名单', en: 'Watchlist' },
  { href: '/timeline', label: '时间线', en: 'Timeline' },
  { href: '/method', label: '方法', en: 'Method' },
] as const;

export const STATUS_LABEL: Record<string, string> = {
  completed: '已交割',
  announced: '已宣布',
  'team-join': '团队加入',
  terminated: '已终止',
};

export const DEAL_TYPE_LABEL: Record<string, string> = {
  acquisition: '整体收购',
  'majority-stake': '控股权',
  acquihire: '人才收购',
  'team-join': '团队加入',
  'asset-sale': '资产收购',
};

export const EVIDENCE_LABEL: Record<string, string> = {
  A: 'A · 双方一手来源',
  B: 'B · 单方或权威媒体',
  C: 'C · 二手报道',
};

export const EVIDENCE_NOTE: Record<string, string> = {
  A: '交易双方均有官方公告，或存在监管文件直接支持。',
  B: '一方有官方公告，或权威媒体基于工商/监管记录报道。',
  C: '仅见二手报道，尚未找到一手来源，结论需谨慎引用。',
};

export const EVENT_KIND_LABEL: Record<string, string> = {
  founding: '创立',
  funding: '融资',
  product: '产品',
  deal: '交易',
  aftermath: '后续',
  shutdown: '停运',
  license: '许可',
  governance: '治理',
};

export const WATCH_STATUS_LABEL: Record<string, string> = {
  independent: '独立经营',
  'venture-backed': '融资支持',
  bootstrapped: '自筹资金',
  acquired: '已被收购',
  unknown: '待核验',
};
