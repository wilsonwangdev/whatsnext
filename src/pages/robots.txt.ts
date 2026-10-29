import type { APIContext } from 'astro';
import { SITE } from '../data/site';
import { withBase } from '../lib/paths';

export function GET(context: APIContext) {
  const origin = context.site ?? new URL(SITE.url);
  const sitemap = new URL(withBase('/sitemap-index.xml'), origin).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
