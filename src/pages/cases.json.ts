import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';
import { withBase } from '../lib/paths';

/**
 * 机器可读的数据导出。字段与内容文件一致，日期统一为 ISO 8601。
 * 供校对、复用与二次分析使用。
 */
export async function GET(context: APIContext) {
  const cases = await getCollection('cases');
  const watchlist = await getCollection('watchlist');

  const iso = (_key: string, value: unknown) =>
    value instanceof Date ? value.toISOString().slice(0, 10) : value;

  const payload = {
    generatedAt: new Date().toISOString(),
    site: new URL(withBase('/'), context.site ?? SITE.url).href,
    license: 'CC BY-SA 4.0',
    counts: { cases: cases.length, watchlist: watchlist.length },
    cases: cases.map((c) => ({ id: c.id, ...c.data, body: c.body })),
    watchlist: watchlist.map((w) => ({ id: w.id, ...w.data, body: w.body })),
  };

  return new Response(JSON.stringify(payload, iso, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
