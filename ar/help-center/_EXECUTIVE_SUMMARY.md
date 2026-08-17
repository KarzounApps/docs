# Karzoun Help Center — Executive Summary

**Period:** August 2026 (this initiative)  
**Audience:** Leadership  
**Scope:** Public Help Center (`docs.karzoun.chat` / Arabic Help)

---

## Bottom line

We did **not** throw away the Help Center and start from zero. We kept what already worked, fixed what was wrong against the live product, and raised the bar toward (and in some areas beyond) respond.io-style help.

**Outcome today:** a cleaner navigation, stronger operator content, honest documentation of what the product actually does, and a build that compiles cleanly for publish.

---

## What changed (results)

### 1. Strategy locked

- **Decision:** evolve the existing Arabic Help library (Git MDX + Mintlify), not migrate to a new CMS or blank rewrite.
- **Benchmark:** full comparison vs [respond.io/help](https://respond.io/help) across structure, writing, media, search, journeys, coverage, UX, linking, and ops.
- **Artifacts for the team:** comparison brief + gap backlog (internal).

### 2. Navigation & structure

- Help sidebar collapsed from **~20 top-level groups → 8 hubs** (easier first click; WhatsApp nested under Channels; team chat under Customer Service).
- Legacy / empty / partner–developer stubs removed from live Help (~**68** archived, **~56** empty stubs removed, redirects **135 → 179**).
- New journeys live:
  - **Quick Start** (9 sequential onboarding pages)
  - **Use-case playbooks** (ecommerce, sales, support at scale, migration, marketer week-1)
  - **EN Help hub stubs** pointing to Arabic canonicals for core topics

### 3. Content quality & consistency

- Public **glossary** + locked product terminology (e.g. Inbox = البريد الوارد; human agent = موظف; AI = وكيل).
- Article **template contract** (page types, standard section labels, media placeholder format).
- Major modules upgraded for operator depth: **Inbox, WhatsApp, Campaigns, Automations, AI**, plus cross-links / support escalation patterns.
- **Support chrome:** in-app Help URLs point at Mintlify Help (not old Redocly `/customers/`); operator Support path + «الحصول على الدعم» page; developer email kept under Build only.

### 4. Product truth (docs vs real UI)

We audited Help against the **shipping product** (UI + code), module by module.

| Finding | Result |
| --- | --- |
| Average fidelity before fixes | ~**3.1 / 5** vs live UI |
| Publish blockers identified | **42** P0 items |
| P0s fixed in this pass | **~36 / 42** |

Examples of corrected false claims (docs now match the product):

- Email campaign A/B and attachments are **not** live send features  
- No Karzoun **wallet block at campaign launch** (Meta payment failures still documented)  
- General WhatsApp settings = **name + department only** (not auto-reply / assignment)  
- Commerce requires **Initialize Catalog** before toggles  
- Zaki is a **right-rail takeover**, not an Inbox details tab  
- Studio lists **custom agents only** (no fake System/All tabs)  
- Insights has **per-chart filters**; refresh does **not** reload chart data today  
- Account “currency / date format” are **not** org-wide settings  
- Pixel cart events and segment “pixel conditions” documented accurately (no overclaim)

Also shipped missing Help pages that were **404s in the sidebar** (File Manager children, Orders status/sources, Pixel marketer path) plus settings how-tos for **tags, custom fields, lead stages**.

### 5. Publish readiness

- Media placeholders standardized across the library (**~324** paths inventoried for design/product to fill with real screenshots/GIFs/video).
- MDX compile blockers fixed (invalid HTML comments and markdown images inside Frames) → **`mint validate` passes**.

---

## What we did *not* finish (honest remaining work)

| Still open | Why it matters |
| --- | --- |
| ~**6** residual P0 items | e.g. deeper inbox composer (catalog/call/IMAP), store install depth, meetings detail drawer, billing activate path |
| Real **screenshots / GIFs / videos** | Placeholders are ready; assets not shot yet — this is respond.io’s biggest remaining visual advantage |
| Full **P1** backlog | Template button depth, AI dock polish, Insights task reports, more settings/wallet detail |
| Exact **operator Support channel** | Product decision (contact form vs WhatsApp vs mailbox) |
| Mintlify thumbs / content ops ownership | Feedback is configured; process still needs an owner |

---

## Business impact (why this matters)

1. **Fewer support tickets from wrong Help** — docs no longer teach features that don’t exist or buttons that don’t work.  
2. **Faster time-to-value** — Quick Start + role/use-case paths give new customers a clear first week.  
3. **Safer sales & onboarding demos** — Help and product story stay aligned.  
4. **Publishable foundation** — navigation, redirects, and build validation are in place for continuous improvement instead of a risky full rewrite.

---

## Recommended next investment

1. **Media factory** — shoot the inventoried screenshots/GIFs (highest leverage vs respond.io).  
2. Close the **remaining ~6 P0** accuracy gaps.  
3. Assign **module owners + review SLA** so Help stays true as the product ships weekly.

---

*Internal references (not for external share): `_DOCS_VS_UI_GAPS.md`, `_MEDIA_INVENTORY.md`, comparison canvas in the engineering workspace.*
