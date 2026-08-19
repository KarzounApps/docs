# Link audit — Arabic Help Center guides

**Date:** 2026-08-18  
**Scope:** `docs/ar/help-center/guides/**/*.mdx` (excludes `_legacy`)

## Summary

| Metric | Count |
| --- | --- |
| Files scanned | 337 |
| Internal links scanned | 3,765 |
| Unique link targets | 338 |
| Broken found | 3 (1 unique URL) |
| Fixed | 3 |
| Remaining broken | 0 |

**Result:** 3 broken → 3 fixed → 0 remaining

## Verification method

Each `](/ar/help-center/...)` link was checked against:

1. Matching `.mdx` on disk under `docs/ar/help-center/`
2. `docs.json` navigation pages
3. `docs.json` redirects (178 entries)

## Fixes applied

| Broken URL | Fixed URL | File | Occurrences |
| --- | --- | --- | --- |
| `/ar/help-center/guides/segments/overview` | `/ar/help-center/guides/contacts/segments/overview` | `guides/insights/contact-insights.mdx` | 3 |

### Top pattern fixed

**Missing `contacts/` segment prefix** — legacy shorthand `/guides/segments/...` instead of `/guides/contacts/segments/...`.

## Patterns checked (none found in guides)

| Pattern | Status |
| --- | --- |
| `doc-*` legacy IDs in links | 0 in guides (handled by redirects if hit externally) |
| `.md` file extensions in URLs | 0 |
| `settings/notifications` as doc path | 0 broken — only UI route literals (`/settings/notifications`) in prose |

## Manual / out of scope

- **UI route literals** (`/settings/notifications`, `/time-clock/report`, etc.) in backticks or tables are product paths, not doc links — left unchanged.
- **Anchor-only links** (`#section`) — not in scan scope.
- **Links outside `guides/`** (hub pages, `_archive`, English docs) — not scanned in this pass.
- **178 redirects** in `docs.json` cover old `doc-*` URLs; no guide MDX still points at them.

## Validation

`mint validate` — **passed** (2026-08-18).
