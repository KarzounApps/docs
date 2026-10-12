# Page contract sample audit — Arabic Help Center

**Date:** 2026-08-18  
**Scope:** Light ~10% sample (high-traffic entry + one page per hub). Excludes `_legacy`. No corpus rewrite.

## Counts

| Metric | Count |
| --- | --- |
| Corpus (guides + hub, exclude `_legacy`) | 338 MDX |
| Sampled | 33 |
| Sample % | ~10% |
| Issues found | 6 (in 4 files) |
| Files patched | 4 |
| Skipped as already fine | 29 |
| `mint validate` | passed |

## Sample (33)

| Hub | Files | Verdict |
| --- | --- | --- |
| Entry | `index.mdx` | OK (already done) |
| getting-started | `overview` · `first-day-customer-service` · `get-support` | OK |
| quick-start | `what-is-karzoun` · `account-setup` · `first-channel` · `first-reply` | OK — see skip note |
| inbox | `overview` · `path-agent` · `reply` · `sla` | OK |
| channels | `overview` · `whatsapp` | 1 patched |
| whatsapp | `overview` · `connect` · `errors` | OK (errors not undone) |
| broadcasts | `overview` · `create` · `failures` | 1 patched |
| automations | `overview` · `create-first` | OK |
| ai | `overview` · `credits` | OK |
| contacts | `overview` · `import` | OK |
| settings | `overview` · `billing/plan-and-payment` · `audit` | 1 patched |
| use-cases | `overview` · `ecommerce` | OK |
| notifications | `overview` | OK |
| store | `overview` | 1 patched |

## Issues found

### Fixed

| # | Kind | File | What |
| --- | --- | --- | --- |
| 1 | Raw `/settings/…` without Arabic UI label | `guides/settings/billing/plan-and-payment.mdx` | Path-first breadcrumb; H2 had `/settings/billing` with no **الفوترة**; table cell was only `/settings/billing/seats` |
| 2 | Raw `/settings/…` without Arabic UI label | `guides/store/overview.mdx` | `/settings/applications` with no **الإعدادات ← التطبيقات** |
| 3 | Cut-off / mangled sentence | `guides/channels/whatsapp.mdx` | Opener «عندما تريد الفريق أن يرد» |
| 4 | Cut-off / leftover English | `guides/broadcasts/failures.mdx` | «وplaybook إعادة الإرسال» in the guide promise |

### Checked, none in sample

| Kind | Result |
| --- | --- |
| Published «وسائط مطلوبة» | 0 (only `_legacy` — skipped) |
| Missing `## الخطوة التالية` on **task** pages that already have **ذات صلة** | 0 |

### Skipped on purpose

- **`what-is-karzoun.mdx`** (`type: concept`) has **ذات صلة** and no **الخطوة التالية**. Rule is task pages only — did not invent a next-step block.
- **WhatsApp `errors.mdx`:** just merged — no edits.
- Tone / 3-beat / identical H2s: not in the fix list; pages already had frozen-label sections where they applied.
- Non-`/settings/` UI routes (`/inbox`, `/channels`, `/marketplace`, `/copilot`) left as-is when an Arabic name was already adjacent.

## Files patched

1. `docs/ar/help-center/guides/settings/billing/plan-and-payment.mdx`
2. `docs/ar/help-center/guides/store/overview.mdx`
3. `docs/ar/help-center/guides/channels/whatsapp.mdx`
4. `docs/ar/help-center/guides/broadcasts/failures.mdx`

## Validation

`npx mint validate` from `docs/` — **passed** (2026-08-18).
