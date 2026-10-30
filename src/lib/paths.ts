/**
 * 站点可能部署在子路径（例如 GitHub Pages 的 /whatsnext/）。
 * 所有站内链接都必须经过 withBase，避免根路径写死。
 */
export const BASE = import.meta.env.BASE_URL;

export function withBase(path = '/'): string {
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}` || '/';
}
