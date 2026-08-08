# Documentation project instructions

## About this project

- This is the **Karzoun Chat** documentation site on [Mintlify](https://mintlify.com)
- Product name: **Karzoun** (also stylized Karzoun Chat)
- Pages are MDX with YAML frontmatter
- Configuration lives in `docs.json`
- GraphQL public API schema: `public-api.graphql` → generated under `api-reference/`
- Source of truth for content migration: `octobots/docs` (legacy Redocly Realm)
- Prefer Mintlify components (`Steps`, `Card`, `Tip`, `Note`, `Info`, `Warning`, `Tabs`, `CodeGroup`) over custom HTML
- Use the Mintlify docs at https://www.mintlify.com/docs (and MCP `https://www.mintlify.com/docs/mcp` when available)

## Product areas (tabs)

| Tab | Audience | Path prefix |
| --- | --- | --- |
| Home | Everyone | `/`, `/changelog`, `/legal` |
| Developers | Integrators | `/developers` |
| GraphQL API | Integrators | `/api-reference` (generated, English nav only) |
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
- GraphQL auto-reference stays on the English language entry (shared generated paths)
- Help Center bulk content will land primarily under `ar/help-center/…`
- Mintlify enables RTL automatically for `ar`

## Terminology

- Use **Karzoun** or **Karzoun Chat** for the product — not Octobots in customer-facing docs
- Prefer **workspace** over "tenant" or "organization" when describing a customer account
- Prefer **app token** / `x-app-token` for public API auth
- Prefer **Help Center** for end-user docs (not "customers docs")
- Prefer **MiniApps** (one word, capital A) for marketplace JSON apps
- Prefer **MCP** for Model Context Protocol tooling
- GraphQL endpoint pattern: `https://YOUR_SUBDOMAIN.api.karzoun.chat/graphql`
- Playground: `https://karzoun.chat/developer/playground`
- Developer dashboard: `https://karzoun.chat/developer`

## Brand

- Primary blue: `#387CEC` (also `#5B9BFF` light / `#2563C7` dark)
- Logo mark uses red `#E03C28`, green `#2CA04C`, yellow `#F0B400`, blue `#387CEC`
- Font: Inter (Arabic Help Center will use Cairo when `ar` locale is enabled)
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
- **Do not** invent API fields; prefer schema descriptions from `public-api.graphql`
- Help Center articles are largely Arabic; plan `navigation.languages` with `en` + `ar` before bulk-migrating that tab
- When migrating from Redocly Markdoc/MD, convert to Mintlify MDX components and fix asset paths under `/images`

## Migration checklist (for agents)

1. Keep `docs.json` navigation in sync when adding pages
2. Convert `.md` → `.mdx`, add frontmatter, replace Redocly-only components
3. Copy images from `octobots/docs/images` as needed
4. Preserve meaning; improve clarity; do not drop warnings/security notes
5. After large batches, run `mint validate` / `mint dev`
