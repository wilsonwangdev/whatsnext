---
name: fact-check
description: Use when adding or editing PostClose cases, watchlist entries, timelines, dates, amounts, headcounts, licenses, or sources, and before any build or deploy. Runs the project's verifier and enforces sourced, dated, precision-correct claims.
---

# Fact-check

Every number is a **claim**: a value, an as-of date, and a source. The site's credibility rests on that triple, not on how confident the prose sounds.

## Steps

1. Run `pnpm facts`.
   **Done when** the command exits 0. Read every error before editing; the rule code (`DATE-12`, `AMT-03`, …) names the failure class in the reference below.

2. Find the primary source for each claim you changed.
   Official announcement, filing, registry record, or the company's own page. Add it to `sources` (with `date` and `type`) or to the specific `signals[].source`.
   **Done when** every changed number or date has a URL a reader can open, and that URL actually states the number.

3. Match the display precision to what the source supports.
   Only a year → `date: YYYY-01-01` plus `dateLabel: "YYYY 年"`. Only a month → day `01` plus `dateLabel: "YYYY 年 M 月"`.
   **Done when** no date is more precise than its source.

4. Update the record's honesty fields.
   Set `lastVerified` to today. Put what you still cannot confirm into `openQuestions`; do not fill the gap with a plausible number.
   **Done when** `lastVerified` is today and every unresolved point is listed.

5. Re-run `pnpm facts --strict`, then `pnpm build`.
   **Done when** both pass. `--strict` also fails on warnings.

6. Triage the verifier's `info` list.
   These are body-prose 人数/金额 mentions and undated primary pages. Open each snippet, confirm it against the source, and add an inline link or move the figure into a sourced `signals` entry.
   **Done when** each info line is either verified by a source you can name or removed.

## Reference

### Date rules

| Situation | Required |
| --- | --- |
| 公告 vs 交割 | `announcedAt` and `completedAt` are separate fields; never collapse them |
| 状态 `completed` | `completedAt` required |
| 状态 `announced` / `terminated` | no `completedAt` |
| 状态 `team-join` | `completedAt` = the date the team joined |
| 未来事件 | **not** in `timeline`; put it in `plans` with `basis: announced \| derived` |
| 计划日期 | `plans[].source` required; derived dates must explain the推算 in `detail` |
| 只有年份 | `date: YYYY-01-01`, `dateLabel: "YYYY 年"` |
| 只有月份 | `date: YYYY-MM-01`, `dateLabel: "YYYY 年 M 月"` |
| 核验有效期 | `lastVerified` ≤ 90 天（>180 天直接失败） |

### Amount rules

- `disclosed: true` requires a numeric `value` and a `note` stating the basis (cash / stock / enterprise value).
- `disclosed: false` forbids `value`; `note` must say why or give the media figure explicitly.
- A terminated deal keeps the announced figure only if the note says the deal did not close.
- Never promote a funding round, valuation, or media estimate into `amount.value`.

### Headcount and other counts

- Any `signals` value containing a digit requires `source`.
- Counts belong to a date: write “39 人（2026 年公司披露）”, not “39 人”.
- Body prose counts surface in the `info` list; treat them as claims, not decoration.

### Source quality

`primary` (company announcement, filing, registry) > `press` (credible outlet citing records) > `analysis` (secondary). Aggregators and reposts are not new sources. Evidence level `A` needs at least two direct primary sources; if only the acquirer published, record `B`.

The link must land on a page that **states the claim**. A homepage, blog index, or announcement that only implies the date does not count: link the specific post. A changelog page is acceptable when the entry is visible on it.

### Common traps

- 融资额 as 收购价 (Teambition).
- 宣布 as 完成 (every deal).
- 团队加入 as 收购公司 (Deno, Dioxus).
- 媒体口径 as 公司披露 (Netless).
- Vendor marketing counts as audited numbers (AFFiNE “200K+ Pro users”).
- Same-name companies (Obsidian vs Obsidian Security).

### Events, plans, checks

- `timeline`: things that happened. Past tense, source per event.
- `plans`: announced or derived future dates, marked 尚未发生.
- `checks`: a state at a point in time (“license is still BUSL as of 2026-10-28”), never an event.

### Future dates

`timeline` is a record of what happened. Anything dated after today belongs in `plans`, is rendered as “尚未发生”, and must say whether the date was announced (`basis: announced`) or derived from a stated duration (`basis: derived`). Derived plans also explain the arithmetic in `detail`.

### What the verifier does not do

It cannot judge whether a body sentence is true, whether a source was read correctly, or whether a number is complete. Those are the steps above. `--links` checks reachability only; a 200 does not make a source authoritative.

### Rule codes

`DATE-*` 日期与精度（`DATE-14`：未来事件必须移入 plans） · `PLAN-*` 计划 · `CHECK-*` 状态核查 · `AMT-*` 对价 · `SIG-*` 结构化信号 · `SRC-*` 来源 · `EV-*` 证据等级 · `DEAL-*` 状态与结构一致性 · `BODY-*` 正文数字（提示） · `LINK-*` 链接可达性（提示）。
