import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** 一条可核验的来源。date 为来源发布/更新日期，retrieved 为本次核验日期。 */
const source = z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string(),
  date: z.coerce.date().optional(),
  retrieved: z.coerce.date().optional(),
  type: z
    .enum(['primary', 'filing', 'press', 'analysis', 'community', 'data'])
    .default('primary'),
  note: z.string().optional(),
});

const timelineEvent = z.object({
  date: z.coerce.date(),
  /** 当只掌握年份/月份精度时，用可读文本替代具体日期显示 */
  dateLabel: z.string().optional(),
  title: z.string(),
  detail: z.string().optional(),
  kind: z
    .enum(['founding', 'funding', 'product', 'deal', 'aftermath', 'shutdown', 'license', 'governance'])
    .default('aftermath'),
  source: z.string().url().optional(),
});

const plan = z.object({
  date: z.coerce.date(),
  dateLabel: z.string().optional(),
  title: z.string(),
  detail: z.string().optional(),
  /** announced：公告给出了具体日期；derived：按公告给出的期限推算 */
  basis: z.enum(['announced', 'derived']).default('announced'),
  source: z.string().url(),
});

const check = z.object({
  date: z.coerce.date(),
  label: z.string(),
  value: z.string(),
  source: z.string().url(),
});

const promise = z.object({
  claim: z.string(),
  status: z.enum(['kept', 'partial', 'pending', 'broken', 'unclear']),
  note: z.string().optional(),
  source: z.string().url().optional(),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    acquirer: z.string(),
    /** completed: 已交割；announced: 已宣布未交割；team-join: 团队加入；terminated: 交易终止 */
    status: z.enum(['completed', 'announced', 'team-join', 'terminated']),
    dealType: z.enum(['acquisition', 'majority-stake', 'acquihire', 'team-join', 'asset-sale']),
    announcedAt: z.coerce.date(),
    completedAt: z.coerce.date().optional(),
    amount: z
      .object({
        disclosed: z.boolean().default(false),
        value: z.number().optional(),
        currency: z.enum(['USD', 'CNY', 'EUR']).default('USD'),
        note: z.string().optional(),
      })
      .default({ disclosed: false, currency: 'USD' }),
    country: z.string().default('中国'),
    founded: z.number().optional(),
    categories: z.array(z.string()).min(1),
    license: z.string().optional(),
    licenseAfter: z.string().optional(),
    /** A: 双方一手公告或监管文件；B: 单方一手公告或权威媒体；C: 仅有二手报道 */
    evidence: z.enum(['A', 'B', 'C']),
    featured: z.boolean().default(false),
    summary: z.string(),
    lastVerified: z.coerce.date(),
    sources: z.array(source).min(1),
    timeline: z.array(timelineEvent).default([]),
    /** 已公布但尚未发生的计划；不要写进 timeline */
    plans: z.array(plan).default([]),
    /** 状态核查：某个时间点的静态事实，不是事件 */
    checks: z.array(check).default([]),
    promises: z.array(promise).default([]),
    openQuestions: z.array(z.string()).default([]),
  }),
});

const watchlist = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/watchlist' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    url: z.string().url().optional(),
    /** independent: 独立经营；venture-backed: 融资支持；bootstrapped: 自筹；acquired: 已被收购 */
    status: z.enum(['independent', 'venture-backed', 'bootstrapped', 'acquired', 'unknown']),
    founded: z.number().optional(),
    founders: z.array(z.string()).default([]),
    location: z.string().optional(),
    license: z.string().optional(),
    licenseNotes: z.string().optional(),
    businessModel: z.string().optional(),
    categories: z.array(z.string()).min(1),
    summary: z.string(),
    /** 为什么值得长期观察：1-3 条 */
    watchReasons: z.array(z.string()).min(1),
    /** 独立性档案：资金、归属、公开表态等可核验信号 */
    signals: z
      .array(
        z.object({
          label: z.string(),
          value: z.string(),
          source: z.string().url().optional(),
        }),
      )
      .default([]),
    featured: z.boolean().default(false),
    lastVerified: z.coerce.date(),
    sources: z.array(source).min(1),
    timeline: z.array(timelineEvent).default([]),
    plans: z.array(plan).default([]),
    openQuestions: z.array(z.string()).default([]),
  }),
});

export const collections = { cases, watchlist };
