const dateFmt = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'UTC',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const shortFmt = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'UTC',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

/** 2025 年 12 月 2 日 */
export function fmtDate(date: Date | undefined | null): string {
  if (!date) return '未披露';
  return dateFmt.format(date);
}

/** 2025.12.02 */
export function fmtShort(date: Date | undefined | null): string {
  if (!date) return '—';
  const parts = shortFmt.formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('year')}.${get('month')}.${get('day')}`;
}

/** 2025-12-02 */
export function fmtISO(date: Date | undefined | null): string {
  if (!date) return '';
  return date.toISOString().slice(0, 10);
}

export function fmtYear(date: Date | undefined | null): string {
  if (!date) return '—';
  return String(date.getUTCFullYear());
}

/** 2025 年 12 月 */
export function fmtMonth(date: Date | undefined | null): string {
  if (!date) return '';
  return new Intl.DateTimeFormat('zh-CN', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
  }).format(date);
}

const CURRENCY_SYMBOL: Record<string, string> = { USD: '$', CNY: '¥', EUR: '€' };

/** 把金额格式化为 $6.4B / $400M 这样的紧凑形式 */
export function fmtAmount(value: number | undefined, currency = 'USD'): string {
  if (value == null) return '未披露';
  const symbol = CURRENCY_SYMBOL[currency] ?? '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${symbol}${trim(value / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${symbol}${trim(value / 1_000_000)}M`;
  if (abs >= 1_000) return `${symbol}${trim(value / 1_000)}K`;
  return `${symbol}${value}`;
}

function trim(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace(/\.0$/, '');
}

/** 交易发生至今的时间，例如「5 年 11 个月」；以构建时间为基准。 */
export function elapsed(date: Date | undefined | null): string {
  if (!date) return '';
  const now = new Date();
  let months =
    (now.getUTCFullYear() - date.getUTCFullYear()) * 12 +
    (now.getUTCMonth() - date.getUTCMonth());
  if (now.getUTCDate() < date.getUTCDate()) months -= 1;
  if (months < 0) return '尚未发生';
  if (months < 1) return '不足 1 个月';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  if (years === 0) return `${rest} 个月`;
  if (rest === 0) return `${years} 年`;
  return `${years} 年 ${rest} 个月`;
}

export function sortByDateDesc<T>(items: T[], get: (item: T) => Date | undefined): T[] {
  return [...items].sort((a, b) => (get(b)?.getTime() ?? 0) - (get(a)?.getTime() ?? 0));
}

export function unique<T>(items: T[]): T[] {
  return [...new Set(items)];
}

/** 用于静态路径与锚点 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}
