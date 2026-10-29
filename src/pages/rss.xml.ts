import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { SITE } from '../data/site';
import { sortByDateDesc } from '../lib/format';
import { withBase } from '../lib/paths';

export async function GET(context: APIContext) {
  const cases = sortByDateDesc(
    await getCollection('cases'),
    (c) => c.data.completedAt ?? c.data.announcedAt,
  );
  const watch = await getCollection('watchlist');

  const items = [
    ...cases.map((c) => ({
      title: `${c.data.name} → ${c.data.acquirer}`,
      description: c.data.summary,
      link: withBase(`/cases/${c.id}`),
      pubDate: c.data.lastVerified,
      categories: ['案例', c.data.status],
    })),
    ...watch.map((w) => ({
      title: `${w.data.name} · 观察名单`,
      description: w.data.summary,
      link: withBase(`/watchlist/${w.id}`),
      pubDate: w.data.lastVerified,
      categories: ['观察名单', w.data.status],
    })),
  ].sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(withBase('/'), context.site ?? SITE.url),
    items,
    customData: '<language>zh-cn</language>',
  });
}
