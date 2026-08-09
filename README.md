# Karzoun Docs (Mintlify)

Documentation for [Karzoun Chat](https://karzoun.chat) — GraphQL API, partners, MCP, SDK, MiniApps, and Help Center.

## Stack

- **Platform:** [Mintlify](https://mintlify.com)
- **Config:** `docs.json`
- **Pages:** MDX with YAML frontmatter
- **API reference:** GraphQL SDL from `https://dev.api.karzoun.chat/public-api.graphql` (auto-generated under `api-reference/`)

This site replaces the previous Redocly Realm docs in `octobots/docs`.

## Local development

```bash
npm i -g mint
mint dev
```

Preview at [http://localhost:3000](http://localhost:3000).

```bash
mint validate
mint update
```

## AI-assisted writing

```bash
npx skills add https://mintlify.com/docs
```

Project-specific agent guidance lives in `AGENTS.md`.

## Publishing

Connect the GitHub app from the [Mintlify dashboard](https://dashboard.mintlify.com/settings/organization/github-app). Pushes to the default branch deploy automatically.

## Migration status

| Area | Status |
| --- | --- |
| Branding, theme, SEO, nav | Done |
| GraphQL schema wiring | Done (live `GET /public-api.graphql`) |
| Developers | Done |
| MCP (+ tool catalog) | Done |
| SDK | Done |
| Partners | Done |
| MiniApps (public guides) | Done |
| Legal + changelog | Done |
| Help Center (AR, ~153 articles) | Locale scaffolding ready — content pending your go |

## Need help?

- [Mintlify docs](https://mintlify.com/docs)
- [Karzoun developer dashboard](https://karzoun.chat/developer)
- developers@karzoun.chat
