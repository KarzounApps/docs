# Documentation project instructions

## About this project

- This is the **Karzoun Chat** documentation site on [Mintlify](https://mintlify.com)
- Product name: **Karzoun** (also stylized Karzoun Chat)
- Pages are MDX with YAML frontmatter
- Configuration lives in `docs.json`
- GraphQL public API schema: live SDL at `https://dev.api.karzoun.chat/public-api.graphql` (gateway `GET /public-api.graphql`) → Mintlify generates `api-reference/`
- Do **not** treat a checked-in `public-api.graphql` as source of truth; `docs.json` graphql `source` must be that HTTPS URL
- This Mintlify site is the current docs source of truth. Legacy sources were Redocly Realm / old `karzounChatDocs` (migration complete for most areas; Help Center still migrating)
- Prefer Mintlify components (`Steps`, `Card`, `Tip`, `Note`, `Info`, `Warning`, `Tabs`, `CodeGroup`) over custom HTML
- Use the Mintlify docs at https://www.mintlify.com/docs (and MCP `https://www.mintlify.com/docs/mcp` when available)

## Product areas (tabs)

| Tab | Audience | Path prefix |
| --- | --- | --- |
| Home | Everyone | `/`, `/changelog`, `/legal` |
| GraphQL API | Integrators | `/developers` guides + `/api-reference` schema (one tab) |
| Partners | Agencies / platforms | `/partners` |
| MCP | AI / agent builders | `/mcp-server` |
| SDK | Frontend / analytics | `/sdk` |
| MiniApps | Marketplace builders | `/miniapps` |
| Help Center | End users | `/help-center` (EN) · `/ar/help-center` (AR) |

## Languages (i18n)

- Configured in `docs.json` → `navigation.languages`
- **`en`** (default): full product tabs; English pages stay at repo root (`index.mdx`, `developers/…`)
- **`ar`**: pages under `ar/` only — never reuse an English path in Arabic nav
- Partial Arabic coverage is OK; only list translated pages in the `ar` navigation
- Translate tab/group/navbar/footer labels for Arabic
- GraphQL auto-reference is shared (`api-reference/`, English schema text) and linked from both language entries
- Help Center hub exists in both languages; bulk articles land next under `ar/help-center/…`
- Mintlify does **not** currently set `dir="rtl"` automatically for `ar`
- We force RTL via `rtl.js` + `style.css` (Cairo font on Arabic pages; code blocks stay LTR)
- Mintlify custom JS runs **after** interactive paint — use `rtl-boot.css` (`html:not([data-rtl-ready]) { visibility: hidden }`) + `rtl.js` setting `data-rtl-ready` so Arabic does not flash LTR→RTL. Do not add `@import` to `rtl-boot.css`
- Prefer CSS logical properties (`inset-inline-*`, `margin-inline-*`, `padding-inline-*`, `border-inline-*`) over physical left/right when overriding Mintlify chrome for RTL
- `style.css` is the full Arabic RTL audit — update it when new Mintlify chrome breaks under `/ar` (do not wait for per-component reports). Never re-enable `list-style` on prose `ul` (Mintlify uses `li::before` bullets)
- **Arabic content parity:** every English MDX page (except Help Center articles and generated `api-reference/`) has a matching `ar/…` translation with the same structure; AR nav mirrors EN tabs. Keep internal links under `/ar/…`
- **Help Center:** protocol + rebuild plan in `HELP-CENTER.md`. Gold standard: `ar/help-center/guides/contacts/`. Active rewrite wave order: Campaigns (broadcasts) → Karzoun Pixel → Inbox → … (see plan in HELP-CENTER.md). Verify `v4UI` + monorepo packages before rewriting. Images: `images/help/`. Do not put Developers / Partners / stub pages in Help nav.

## Terminology

- Use **Karzoun** or **Karzoun Chat** for the product — not Octobots in customer-facing docs
- Prefer **workspace** over "tenant" or "organization" in English when describing a customer account
- In Arabic Help Center / `ar/` prose: use **حساب** / **حسابك في كرزون** / **حساب كرزون** — not **مساحة** / **مساحة العمل**. (حسابك في كرزون = مساحة العمل التي يعمل من خلالها الفريق.) Keep literal «مساحة» only for physical/UI space, namespace, storage, etc.
- Prefer **app token** / `x-app-token` for public API auth
- Prefer **Help Center** for end-user docs (not "customers docs")
- Prefer **MiniApps** (one word, capital A) for marketplace JSON apps
- Prefer **MCP** for Model Context Protocol tooling
- GraphQL endpoint pattern: `https://YOUR_SUBDOMAIN.api.karzoun.chat/graphql`
- Public SDL (unauthenticated): `https://YOUR_SUBDOMAIN.api.karzoun.chat/public-api.graphql` — docs/CI canonical: `https://dev.api.karzoun.chat/public-api.graphql`
- Playground: `https://karzoun.chat/developer/playground`
- Developer dashboard: `https://karzoun.chat/developer`
- Public operation docs live in `packages/core/src/data/schema/descriptions/*.ts` (imported by thin `schema/*.ts`); pilot: Apps (`apps` / `appsAdd`)
- When authoring or rolling out SDL descriptions, follow the agent skill `.cursor/skills/graphql-sdl-descriptions/SKILL.md` (not human-facing docs). Deep links: `/api-reference/queries/{name}`, `/api-reference/mutations/{name}`, `/api-reference/types/{Name}`


## Brand

- Primary blue: `#387CEC` (also `#5B9BFF` light / `#2563C7` dark)
- Logo mark uses red `#E03C28`, green `#2CA04C`, yellow `#F0B400`, blue `#387CEC`
- Font: Inter (English); Cairo applied on Arabic via `style.css` when `dir=rtl`
- Theme: `maple` in `docs.json`
- Do not reintroduce Mintlify starter green or Mintlify logos

## Style preferences

- Use active voice and second person ("you")
- Keep sentences concise — one idea per sentence
- Use sentence case for headings
- Bold for UI elements: Click **Settings**
- Code formatting for file names, commands, paths, headers, and code references
- Prefer tables for comparisons; prefer `Steps` for procedures
- Every migrated page needs frontmatter `title` and `description`

## Content boundaries

- **Do** document public GraphQL API, webhooks, MCP, SDK, MiniApps, partner flows, and Help Center
- **Do not** document internal MiniApps team-only ops (`miniapps/internal/*`) unless explicitly asked — keep those out of public nav
- **Do not** invent API fields; prefer schema descriptions from the live SDL / generated `api-reference/`
- Help Center articles are largely Arabic; plan `navigation.languages` with `en` + `ar` before bulk-migrating that tab
- When migrating from Redocly Markdoc/MD, convert to Mintlify MDX components and fix asset paths under `/images`

## Migration checklist (for agents)

1. Keep `docs.json` navigation in sync when adding pages
2. Convert `.md` → `.mdx`, add frontmatter, replace Redocly-only components
3. Copy images from `images/` as needed
4. Preserve meaning; improve clarity; do not drop warnings/security notes
5. After large batches, run `mint validate` / `mint dev`
