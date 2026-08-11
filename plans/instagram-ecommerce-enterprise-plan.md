# Instagram Ecommerce — Enterprise Expansion Plan

**Status:** Draft for product review (not implementation-ready until Definition of Ready is green)  
**Owner:** Product + Platform (Octobots / Karzoun Chat)  
**Date:** 2026-08-11  
**Scope:** Instagram shopping / messaging commerce planning only. Do **not** implement WhatsApp catalog composer toolbar work in this initiative.  
**Research basis:** Live Meta developer + Business Help docs (Graph samples cite **v26.0** on product tagging; codebase IG Graph pin is **v23.0**). Codebase mapping of `plugin-instagram-api`, `plugin-facebook-api`, `plugin-whatsapp-api` catalog stack, web inbox/settings, and product-truth docs.

---

## 1. Executive summary

### Ambition

Ship an **enterprise-grade Instagram commerce layer** that makes Karzoun Chat the system of record for catalog-aware selling on Instagram DMs, comments, and ads intake — not a thin “send a product link” bolt-on. Agents, automations, and (where Meta allows) organic shopping surfaces should share one Meta catalog foundation with WhatsApp.

### Reality check (Meta-accurate, not wishful)

| Dimension | WhatsApp (today in product) | Instagram (Meta allows) | Implication |
|-----------|----------------------------|-------------------------|-------------|
| Catalog | Full: OAuth, BM catalog, CSV feed, sync | Shared Meta Catalog / Commerce Manager; IG Shop connection for tagging | **Reuse WA catalog foundation**; do not rebuild a parallel feed |
| In-thread product UI | Native `product` / `product_list` / `catalog_message` | **Product template** (1–10 products) via Messenger Platform for IG | Highest-ROI agent win |
| Cart / order object | Native order message → cart | **No WA-equivalent order webhook** | Do not promise IG “order → cart” parity |
| Checkout | WhatsApp Flows + commerce settings | **On-site Checkout on IG discontinued** (Sep 2025 → website checkout). Persistent menu / generic template / shop PDP → **merchant site** | Checkout = offsite URL / partner storefront, not Meta-hosted checkout |
| Organic shopping | N/A (WA catalog is messaging-native) | Product tagging / Shop / PDPs — **country-gated**, requires approved Shop + **Facebook Login path** | MENA primary market is **outside** Meta’s published full/beta Shops country lists |
| Auth model in Octobots today | WABA + separate `whatsapp_catalog` USER OAuth | **Instagram Login only** (`graph.instagram.com`, no Page) | Product templates + product tagging **require Page + Facebook Login / Messenger Platform**. Current IG auth is a hard blocker for rich commerce |

**Bottom line:** Instagram ecommerce for Karzoun is **messaging commerce + catalog-powered product cards + offsite checkout**, optionally layered with Instagram Shopping tagging **only for eligible geographies**. It will **not** be a clone of WhatsApp Flows checkout. Treat WA as the catalog/ops reference, not the UX parity target.

**Opinionated product stance:** Wave 1 should obsess over **agent + automation product templates** on Page-linked IG accounts. Defer Shop tagging / publishing until (a) auth dual-path is solved and (b) customer geography eligibility is proven. Do not invest Wave 3 “Meta order management” — Meta already killed Commerce Manager post-purchase for website-checkout shops.

---

## 2. Capability inventory from Meta docs

Official sources cited. API samples in Meta docs currently use **Graph API v26.0** (product tagging). Octobots IG code uses **`graph.instagram.com` / v23.0** — plan assumes version bump + host path changes for commerce.

### 2.1 Meta Catalog / Commerce Manager (shared foundation)

- **Product Catalog (Marketing / Commerce API):** catalogs, items, product sets, feeds — power ads, shops, and messaging product templates.  
  - Docs: [Product Catalog](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/), [Catalog Integration (partners)](https://developers.facebook.com/docs/commerce-platform/partners/catalog-integration/)
- **Feeds / sync:** partner guidance to prefer one catalog for ads + commerce to avoid signal split; `commerce_merchant_settings` / CTA signals for shop association.
- **Checkout URL (website checkout):** required for shops after Meta’s checkout migration — cart/product params appended (`cart_origin=instagram|facebook|meta_shops`).  
  - Docs: [Set Up a Checkout URL](https://developers.facebook.com/docs/commerce-platform/setup-checkout-url)
- **Shops checkout change (Sep 2025):** on-platform checkout discontinued; purchases complete on merchant website; Commerce Manager order/payout/returns/disputes for new orders discontinued.  
  - Docs: [About changes to Shops and checkout](https://www.facebook.com/business/help/1314349509894768)

### 2.2 Instagram Shopping / product tagging / PDPs

- Tag products on Feed / Reels / carousel media via Instagram Graph API (**Facebook Login path only** — not Instagram Login).  
  - Docs: [Product Tagging](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/product-tagging/) (Updated Apr 22, 2026)
- Eligibility: `shopping_product_tag_eligibility` on IG User; approved Instagram Shop + catalog; Business Manager admin on shop owner; app associated with verified business for App Review of shopping permissions.
- Endpoints (representative):
  - `GET /{ig-user-id}?fields=shopping_product_tag_eligibility`
  - `GET /{ig-user-id}/available_catalogs`
  - `GET /{ig-user-id}/catalog_product_search`
  - `POST /{ig-user-id}/media` (+ `product_tags`) → `POST /{ig-user-id}/media_publish`
  - `GET|POST /{ig-media-id}/product_tags`
  - `GET|POST /{ig-user-id}/product_appeal`
- Limits: no Stories/Live tagging; no Creator accounts for tagging; ≤25 tagged publishes / 24h; tag caps (Feed ~20, Reels ~30).
- Note (Aug 10, 2023+): businesses without checkout-enabled shops may lose tagging; check eligibility field. With Sep 2025 website-checkout world, “checkout-enabled” means shop + website checkout URL path, not Meta-hosted checkout.
- Permissions (tagging endpoints): `instagram_shopping_tag_products`, `catalog_management`, plus basic IG/page scopes; often `ads_management` / `ad_reads` when roles are BM-granted.

### 2.3 Instagram Messaging commerce surfaces

| Surface | What Meta allows | Docs |
|---------|------------------|------|
| **Product template** | Send 1 product or carousel ≤10; image/title/price pulled from catalog; requires **Page access token** of Page that owns catalog products; `POST /{PAGE-ID}/messages`, `template_type: product` | [Product Template for Instagram Messaging](https://developers.facebook.com/docs/messenger-platform/instagram/features/product-template/) |
| **Generic / button / carousel templates** | Offsite CTAs (`web_url`), product deep links without catalog binding | [Send a Message (IG)](https://developers.facebook.com/docs/messenger-platform/instagram/features/send-message/) |
| **Ice breakers** | ≤4 FAQ starters via Messenger Profile `platform=instagram`; postback payloads — **not** native product objects | [Ice Breakers](https://developers.facebook.com/docs/messenger-platform/instagram/features/ice-breakers) |
| **Persistent menu** | Always-on menu; `postback` or `web_url` (e.g. Shop now → website) | [Persistent Menu](https://developers.facebook.com/docs/messenger-platform/instagram/features/persistent-menu/) |
| **Private replies** | One DM to commenter on post/ad/reel/live; recipient = `comment_id`; can carry structured message types subject to platform rules | [Private Replies](https://developers.facebook.com/docs/messenger-platform/instagram/features/private-replies/) |
| **Instagram Login messaging** | Text/media/templates subset via `graph.instagram.com` — **product tagging unsupported**; messaging OK without Page | [Instagram Platform Overview](https://developers.facebook.com/docs/instagram-platform/overview) |

**Critical platform split:**

| Capability | Instagram Login | Facebook Login + Page (Messenger Platform for IG) |
|------------|-----------------|--------------------------------------------------|
| DM send/receive | ✅ | ✅ |
| Product tagging | ❌ | ✅ |
| Product template (catalog) | ❌ (docs require Page token + Page-owned catalog) | ✅ |
| Partnership ads / some Graph features | ❌ | ✅ |

### 2.4 Ads → IG DM / CTM with product context

- **Click-to-Instagram** messaging ads: image/video/carousel/slideshow → IG Direct; customizable `page_welcome_message` + ice breakers.  
  - Docs: [Ads that Click to Instagram](https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-instagram/)
- **Multidestination** messaging ads (Messenger / IG / WA).  
  - Docs: [Click to Multidestination](https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-multidestination/)
- **Product extensions** (“Show product”): catalog products under creative — documented strongly for Click-to-Messenger; CTM IG welcome flows are ice-breaker–centric, not automatic product-template injection. Product context often arrives as referral / ad metadata + human or bot follow-up with product template.
- **Collection ads + Instant Experiences:** catalog product sets in Feed/Stories Instant Experience — **Marketing API / ads creative**, not agent send API.  
  - Docs: [Collection Ads](https://developers.facebook.com/docs/marketing-api/guides/collection/), [Instant Experiences](https://developers.facebook.com/docs/marketing-api/guides/instant-experiences/), [Advantage+ Creative for Catalog](https://developers.facebook.com/docs/marketing-api/advantage-creative-for-catalog/)

### 2.5 Comments → commerce

- Comment webhooks → private reply (single) with text or richer payloads where allowed.
- No first-class “product mention in comment → auto cart” API. Pattern is: detect intent/SKU → private reply with **product template** or **web_url** to PDP/checkout.
- Product tagging on media creates organic PDP discovery; comments remain a messaging handoff.

### 2.6 Orders, inventory, checkout deep links

- **Inventory / availability:** catalog fields (`availability`, quantity-related commerce fields in partner catalog docs); tagging supports out-of-stock tags but review_status gates visibility.
- **Orders via Meta Shops:** post–Sep 2025, **not** a partner order API opportunity for new checkout — Meta discontinued CM order management for website-checkout shops.
- **WhatsApp-style order messages:** **not available on Instagram Messaging**.
- **Checkout deep links:** product `link` / checkout URL + Meta-appended params from shops; messaging CTAs use merchant URLs (Salla/Zid/custom).

### 2.7 Permissions / scopes (commerce-relevant)

| Scope / permission | Used for |
|--------------------|----------|
| `catalog_management` | Catalog CRUD, feeds, tagging prerequisites |
| `instagram_shopping_tag_products` | Product tagging APIs |
| `instagram_manage_messages` / `instagram_business_manage_messages` | Messaging (path-dependent naming) |
| `instagram_manage_comments` / `instagram_business_manage_comments` | Comments + private reply |
| `pages_messaging`, `pages_manage_metadata`, `pages_show_list` | Messenger Platform IG + Page token |
| `business_management` | BM assets, catalog ownership |
| Ads-related (`ads_management`, `ad_reads`) | Often required when BM roles / creative |

App Review + verified business required for shopping permissions per tagging guide.

### 2.8 Regional / MENA / Saudi constraints

**Official Meta Shops country list** ([Supported countries](https://www.facebook.com/business/help/549256849084694)):

- **Full:** United States only  
- **Open beta (full-ish):** Canada, Mexico, FR/DE/IT/ES/UK, AU/JP/KR/TW/TH  
- **Limited (no Shops ads):** Brazil, DK/NL/NO/SE/CH/UA, Indonesia  

**Saudi Arabia, UAE, Egypt, and broader MENA are not on Meta’s published Shops eligibility tables.** Third-party blogs claim “limited” SA Shopping — **do not treat as enterprise contract**. For Karzoun’s core market:

1. Assume **Instagram Shop + product tagging may be unavailable or unstable**.  
2. Assume **catalog for ads + messaging product templates + offsite checkout** is the durable MENA play.  
3. Local compliance (Maroof, VAT, e-invoicing, PDPL) applies to chat-assisted selling regardless of Meta Shop status — product/legal track, not Meta API.

### 2.9 Deprecations / platform differences

| Item | Status | Source |
|------|--------|--------|
| **Instagram Basic Display API** | Deprecated / dead (2024-12-04) | [Instagram Platform Changelog](https://developers.facebook.com/docs/instagram-platform/changelog/) |
| **Checkout on Facebook/Instagram** | Ended; website checkout only (Sep 2025) | [Business Help](https://www.facebook.com/business/help/1314349509894768) |
| **Product tagging eligibility** | Tightened for non-checkout shops (2023+) | Product Tagging guide |
| **Messenger Platform vs IG Messaging** | Facebook Login → Messenger Platform (`graph.facebook.com` + Page); Instagram Login → `graph.instagram.com` without Page; **product tagging only on FB Login** | [Platform Overview](https://developers.facebook.com/docs/instagram-platform/overview) |
| **Third-party “Shopping API sunset Dec 2026” claims** | **Not corroborated** in official Instagram Platform changelog as of this research; tagging guide still live (Apr 2026). Track officially; do not plan on rumor. | N/A |

---

## 3. Capability matrix

Status = state in Octobots today. Priority = recommended for IG ecommerce program.

| # | Meta capability | Status | Priority | Notes |
|---|-----------------|--------|----------|-------|
| C1 | Meta Catalog create/link/sync (BM + feed CSV) | **Partial** (WA only) | **P0** | Core feed at `/meta/catalog/feed.csv`; WA `initializeCatalog`. Generalize to multi-channel Meta Catalog foundation |
| C2 | Catalog OAuth (`catalog_management`) | **Partial** (WA `whatsapp_catalog`) | **P0** | Reuse pattern; bind catalog to IG Page asset |
| C3 | IG Product template send (1–10) | **None** | **P0** | Blocked by Instagram Login–only auth |
| C4 | Agent composer: pick products → send | **None** (even WA composer lacks picker) | **P0** | Enterprise UX must include IG + shared picker |
| C5 | Automation: send product / product carousel | **Partial** (WA native; IG text fallback) | **P0** | `buildIgPayloadFromInteractive` falls back text for `product` / `product_list` / `catalog_message` |
| C6 | Message renderer for inbound/outbound product cards | **Partial** (WA OrderRenderer; no IG product template renderer) | **P1** | Need IG product template bubble |
| C7 | Ice breakers | **Done** | **P2** | Extend payloads to trigger product automations |
| C8 | Persistent menu Shop CTA | **Done** (generic) | **P2** | Prefer `web_url` to storefront/catalog landing |
| C9 | Private reply | **Done** | **P1** | Add product-template / PDP reply presets |
| C10 | CTM / ads referral intake | **Partial** | **P1** | Enrich with catalog product context when ad/referral carries it |
| C11 | Comment → commerce automation | **Partial** (comment automations exist) | **P1** | SKU/intent → private reply with product |
| C12 | Instagram Shop eligibility check | **None** | **P2** | Gate UI by `shopping_product_tag_eligibility` + country |
| C13 | Product tagging on publish | **None** | **P3** (MENA) / **P2** (eligible geos) | Requires FB Login + Shop |
| C14 | Tag existing media / appeals | **None** | **P3** | Same prerequisites |
| C15 | Collection / Instant Experience ads | **None** | **P3** | Ads product, not inbox; partner with ads tooling later |
| C16 | IG native order → cart | **None** | **—** | **Meta does not offer WA-parity**; out of scope |
| C17 | Meta-hosted Checkout on IG | **None** | **—** | **Deprecated by Meta** |
| C18 | Offsite checkout deep links (Salla/Zid/custom) | **Partial** (generic URLs / WA Flows) | **P0** | Primary IG conversion path |
| C19 | FB `Product_catalogs` stub | **Partial** (unused model) | **P3** | Prefer evolving WA/core catalog registry; avoid resurrecting dead stub without design |
| C20 | Instagram Login messaging (current) | **Done** | **P0 keep** | Must coexist or migrate carefully |
| C21 | Page-linked FB Login commerce path | **None** on IG plugin | **P0** | Foundational unlock |

---

## 4. Architecture recommendation

### 4.1 Shared Meta Catalog foundation (opinionated)

```
                    ┌─────────────────────────────────────┐
                    │  Core Products + Meta CSV Feed       │
                    │  /meta/catalog/feed.csv (+ status)   │
                    └──────────────┬──────────────────────┘
                                   │
                    ┌──────────────▼──────────────────────┐
                    │  MetaCatalogService (new shared)     │
                    │  - OAuth catalog_management          │
                    │  - BM owned_product_catalogs         │
                    │  - feed attach / sync / health       │
                    │  - retailer_id ↔ core product map    │
                    └───────┬───────────────┬─────────────┘
                            │               │
              ┌─────────────▼──┐     ┌──────▼────────────┐
              │ WhatsApp WABA  │     │ IG/FB Page asset  │
              │ (existing)     │     │ (new binding)     │
              └───────┬────────┘     └──────┬────────────┘
                      │                     │
              product/list/order      product template
              Flows checkout          + optional Shop tagging
```

**Do:**

- Extract WA catalog utilities (`plugin-whatsapp-api/src/catalog/**`, `api-utils/src/commerce/**`) into a **channel-agnostic Meta catalog module** (package or core service) with channel adapters.
- One catalog per workspace (or explicit multi-catalog) feeding **WA + IG + ads**.
- Keep FB `Product_catalogs` stub **out of the hot path** until a deliberate migration; it has no GraphQL/UI and must not fork truth.

**Do not:**

- Build an IG-only catalog sync that duplicates CSV/OAuth.
- Promise IG Flows / order webhooks.

### 4.2 Accounts & auth model (the hard part)

Today IG = **Business Login for Instagram** only (`instagram_business_*` scopes, `graph.instagram.com`).

Commerce requires **Facebook Login for Business + Page linked to IG Professional + Page access token** for product templates, and the same path for product tagging.

**Recommended model: Dual-path / Commerce upgrade**

1. **Messaging-basic (current):** Instagram Login — DMs, comments, ice breakers.  
2. **Commerce-enabled (new):** Customer completes **Page linking + Facebook Login** commerce grant (`catalog_management`, messaging page scopes, optionally shopping scopes). Store Page token alongside IG user token; send product templates via `graph.facebook.com/{PAGE-ID}/messages`.  
3. Settings UX: clear “Enable Instagram Commerce” wizard with eligibility checks (Page linked? catalog? Shop? country?).

**Migration options (decision required — see Open Questions):**

| Option | Pros | Cons |
|--------|------|------|
| **A. Dual-path (recommended)** | Non-destructive; MENA customers can use product templates without Shop | Two auth stacks to maintain |
| **B. Force migrate all IG to FB Login** | One path | Breaks Page-less creators; large migration risk |
| **C. Commerce-only separate integration kind** | Clean separation | Split inbox identity / worse UX |

### 4.3 How IG relates to existing WA catalog

- **Same feed, same retailer IDs** where possible so agent product picker is channel-agnostic.  
- **Different send adapters:** WA Cloud API interactive vs IG product template attachment.  
- **Different checkout:** WA Flows vs IG `web_url` / shop website checkout.  
- **Capability flags per integration:** `canSendProductTemplate`, `canTagProducts`, `canUseShop`, `checkoutMode: offsite_url | wa_flows | none`.

### 4.4 Runtime send path (target)

1. Agent/automation selects core product(s).  
2. Resolver maps → Meta product id / retailer id (reuse `resolveCommerceMessagesForWhatsApp` patterns → generalize).  
3. Channel adapter:
   - WA → existing interactive types  
   - IG → `{ attachment: { type: template, payload: { template_type: product, elements: [{ id }] }}}`  
4. Persist outbound message metadata for rich rendering in inbox.

---

## 5. Phased roadmap

### Wave 0 — Foundations (auth, catalog binding, capability gates)

| | |
|--|--|
| **Goals** | Unblock Meta-accurate IG commerce; shared catalog binding; honest eligibility UX |
| **Scope** | Dual-path auth design + spike; generalize Meta catalog service from WA; bind catalog to IG’s linked Page; GraphQL capability flags; App Review inventory; bump IG Graph version strategy |
| **Non-goals** | Agent product picker; tagging UI; ads manager |
| **Dependencies** | Meta App Dashboard products (Messenger IG + catalog); customer BM access; Page–IG link |
| **Effort** | **4–6 eng-weeks** |
| **Risks** | Instagram Login customers refuse Page link; App Review delays; token storage complexity |

### Wave 1 — Agent-visible wins (product templates + offsite CTA)

| | |
|--|--|
| **Goals** | Agents and bots send real catalog products in IG DMs; inbox renders them; private reply can include product |
| **Scope** | Product template send adapter; shared product picker in composer (IG first, design for WA reuse); automation nodes for product / carousel; message renderer; settings **Instagram Commerce** tab (catalog status, test send); offsite checkout button patterns |
| **Non-goals** | Shop tagging; Collection ads; order objects |
| **Dependencies** | Wave 0 green; at least one pilot BM with catalog |
| **Effort** | **6–8 eng-weeks** |
| **Risks** | Page-owned product id mismatches vs WA retailer_id; template failures without clear agent errors |

### Wave 2 — Automation / ads / comments commerce loops

| | |
|--|--|
| **Goals** | Close the loop from ads + comments → product-aware conversations |
| **Scope** | CTM referral enrichment; ice breaker / persistent menu → product automation; comment keyword/SKU → private reply with product template; bot commerce toggles analogous to WA `isCatalogEnabled` (IG-shaped); analytics events (product_sent, cta_clicked if measurable) |
| **Non-goals** | Building full Ads Manager; Instant Experience builder |
| **Dependencies** | Wave 1; webhook referral fields validated on production traffic |
| **Effort** | **5–7 eng-weeks** |
| **Risks** | Referral payload variance; private-reply one-shot limit; rate limits |

### Wave 3 — Checkout / orders / organic shopping (only where Meta allows meaningfully)

| | |
|--|--|
| **Goals** | For **eligible geos**: Shop connection health, tagging assist, website-checkout URL validation. For **all geos**: deepen offsite checkout handoff (Salla/Zid/custom) with cart deep links — **not** Meta order APIs |
| **Scope** | Eligibility dashboard; optional product tagging for publishing tools; checkout URL validation guidance; partner deep-link builders; explicitly **no** Meta order ingest |
| **Non-goals** | Meta-hosted checkout; WA-parity cart from IG order messages; resurrecting Commerce Manager order ops |
| **Dependencies** | Customer in supported country + approved Shop; Wave 0 FB Login path; legal/compliance review for MENA chat-selling |
| **Effort** | **4–10 eng-weeks** (wide band: MENA-only offsite vs full tagging) |
| **Risks** | Building tagging for a market that cannot activate Shop; over-scoping ads Instant Experiences |

**Suggested sequencing for Karzoun MENA-first:** Wave 0 → Wave 1 → Wave 2 → **Wave 3-offsite only**; park tagging until a concrete eligible-geo customer demands it.

---

## 6. UX surfaces (enterprise quality)

### 6.1 Settings — Instagram Commerce tab

Mirror the clarity of `WhatsAppEcommerceTab`, not a buried toggle:

1. **Connection status:** IG account, linked Page (required for commerce), catalog link, feed health.  
2. **Enable Commerce** wizard (Page + catalog OAuth).  
3. **Eligibility panel:** Shop eligibility, country warning for MENA, tagging locked with explanation.  
4. **Checkout:** default offsite base URL / partner (Salla/Zid/custom); UTM/`cart_origin` education.  
5. **Test send** product template to a test IGSID.  
6. **Permissions doctor:** missing scopes with re-auth CTA.

### 6.2 Inbox composer

- Toolbar action: **Products** (catalog search, multi-select ≤10 for IG).  
- Preview card (image, title, price, availability).  
- Send as: Product template (IG) | fallback generic+URL if capability false.  
- Private Reply dialog: same picker + “Send product” preset.  
- Do **not** ship a dead control when commerce path is incomplete — gate on capabilities.

### 6.3 Message renderers

- Outbound/inbound product template bubbles (parity quality with WA commerce visuals, IG-specific).  
- CTA affordances: open PDP (merchant URL).  
- No fake “Order” renderer unless a future partner webhook exists.

### 6.4 Comment tools

- From comment thread: Private reply with product; “Match SKU” assist.  
- Automation recipes: “comment contains SKU → PR product”.

### 6.5 Automation nodes

- **Send IG Product** / **Send IG Product Carousel**.  
- **Start offsite checkout** (build URL from product + customer context).  
- Triggers: DM keyword, ice breaker payload, comment, CTM referral.  
- Replace text-fallback paths for `product` / `product_list` when capability true.

### 6.6 Explicit non-surfaces (for now)

- Meta Ads Instant Experience builder inside Karzoun.  
- Instagram Shop storefront CMS.  
- In-inbox Meta order management.

---

## 7. API / permissions / compliance checklist

### Engineering / Meta app

- [ ] Confirm App Dashboard: Instagram product + Messenger Instagram Messaging + Catalog.  
- [ ] App Review plan: `catalog_management`, messaging, comments; shopping scopes only if Wave 3 tagging.  
- [ ] Verified business association for shopping permissions.  
- [ ] Token model: IG user token + Page token + catalog user token; rotation/refresh; least privilege.  
- [ ] Webhooks: `messages`, `messaging_postbacks`, `comments`, `live_comments`; validate product send errors.  
- [ ] Graph host routing: `graph.instagram.com` vs `graph.facebook.com` by operation.  
- [ ] API version policy: align toward Meta current (docs v26.x) from codebase v23.0.  
- [ ] Rate limits / human_agent tags respected.  
- [ ] Capability flags persisted per integration.

### Merchant / BM setup (customer-facing runbook)

- [ ] IG Professional linked to Facebook Page.  
- [ ] Commerce Manager catalog with clean retailer ids matching core feed.  
- [ ] Website checkout URL if using Shops (eligible geos).  
- [ ] Domain ownership / commerce eligibility requirements.  
- [ ] Pixel / dataset optional for ads signal (partner catalog docs).

### Compliance (esp. KSA / MENA)

- [ ] Chat-assisted sales disclosure, returns, VAT/e-invoicing, Maroof where applicable.  
- [ ] PDPL / data retention for IGSIDs and product browse events.  
- [ ] Honest marketing: do not claim “Checkout on Instagram” or “IG Shop” for ineligible geos.  
- [ ] Align public site product-truth (`KarzounChatPublicWebsitePlan`) when shipping — today WA commerce is the locked differentiator; IG is messaging-only.

---

## 8. Open questions for product review

1. **Auth strategy:** Dual-path commerce upgrade (recommended) vs force FB Login migration vs separate commerce integration kind?  
2. **MENA positioning:** Commit to **messaging commerce + offsite checkout** as the sold IG ecommerce product, with Shop tagging as “eligible countries only”?  
3. **Catalog tenancy:** One shared Meta catalog across WA+IG per workspace, or allow distinct catalogs?  
4. **Checkout partners for IG:** First-class Salla/Zid deep links vs generic URL builder only in Wave 1?  
5. **Composer scope:** Build shared product picker for IG now and reuse for WA, or IG-only in Wave 1?  
6. **Page-less Instagram Login customers:** Keep forever without commerce, or eventually require Page for all new IG connects?  
7. **Facebook Messenger product templates:** Same Wave 1 adapter or IG-only first?  
8. **Wave 3 tagging:** Any committed customer geography that makes tagging P1 within 2 quarters?  
9. **Ads:** Is Collection/Instant Experience in-roadmap for Karzoun, or permanently “use Ads Manager + our CTM inbox”?  
10. **Success metrics:** What is enterprise success — products sent / DM, assisted revenue (offsite), or Shop GMV (eligible geos only)?

---

## 9. Definition of Ready for Implementation

All must be **green** before coding Waves 1+:

| # | Criterion | Owner |
|---|-----------|-------|
| R1 | Open questions **1, 2, 3, 5** decided and written into this doc | Product |
| R2 | Auth option chosen; sequence diagram for tokens approved | Eng + Product |
| R3 | Pilot Business Manager + Page-linked IG + catalog with ≥10 approved products | Solutions / Customer |
| R4 | Successful manual Graph spike: product template send to real IGSID using Page token | Eng |
| R5 | App Review scope list + timeline (or existing advanced access confirmed) | Eng / Meta admin |
| R6 | MENA eligibility statement approved for sales/marketing (no Shop overclaim) | Product + Marketing |
| R7 | UX wireframes: Commerce tab + composer picker + product bubble | Design |
| R8 | Shared vs WA-specific catalog service boundary RFC (1–2 pages) | Eng |
| R9 | Non-goals locked (no IG order→cart, no Meta checkout, no WA toolbar work in this track) | Product |
| R10 | Security review notes for new OAuth tokens & feed URL auth | Eng / Security |

**Spike exit criteria (pre-Wave 1):** documented request/response of a successful IG product template send from a staging app, plus failure modes (missing Page ownership, invalid product id, messaging window).

---

## Appendix A — Codebase evidence (current)

| Area | Evidence | Gap |
|------|----------|-----|
| IG auth | `plugin-instagram-api` → `graph.instagram.com`, scopes `instagram_business_basic,manage_messages,manage_comments` | No catalog / page commerce scopes |
| IG interactive | `buildIgPayloadFromInteractive` — product/catalog → **text fallback** | No product template |
| IG features | DMs, comments, live comments, private reply, ice breakers, persistent menu, bots | No ecommerce tab |
| WA catalog | `plugin-whatsapp-api/src/catalog/**`, Ecommerce tab, feed CSV in core, order→cart, Flows | Reference architecture |
| FB | `Product_catalogs` model unused; same interactive text fallback | Do not revive blindly |
| Web | `InteractiveMessageBuilder` — no catalog picker on any channel | Enterprise composer gap |
| Product-truth | WA commerce = differentiator; IG = inbox messaging | Update when shipping |

## Appendix B — Key official URLs

- [Instagram Platform Overview](https://developers.facebook.com/docs/instagram-platform/overview)  
- [Product Tagging](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-facebook-login/product-tagging/)  
- [IG Media Product Tags](https://developers.facebook.com/docs/instagram-platform/instagram-graph-api/reference/ig-media/product_tags/)  
- [Product Template (IG Messaging)](https://developers.facebook.com/docs/messenger-platform/instagram/features/product-template/)  
- [Ice Breakers](https://developers.facebook.com/docs/messenger-platform/instagram/features/ice-breakers)  
- [Persistent Menu](https://developers.facebook.com/docs/messenger-platform/instagram/features/persistent-menu/)  
- [Private Replies](https://developers.facebook.com/docs/messenger-platform/instagram/features/private-replies/)  
- [Click to Instagram Ads](https://developers.facebook.com/docs/marketing-api/ad-creative/messaging-ads/click-to-instagram/)  
- [Product Catalog](https://developers.facebook.com/docs/marketing-api/reference/product-catalog/)  
- [Checkout URL](https://developers.facebook.com/docs/commerce-platform/setup-checkout-url)  
- [Shops checkout changes](https://www.facebook.com/business/help/1314349509894768)  
- [Supported Shops countries](https://www.facebook.com/business/help/549256849084694)  
- [Commerce eligibility](https://www.facebook.com/business/help/2296757057080455)  
- [Collection Ads](https://developers.facebook.com/docs/marketing-api/guides/collection/)  
- [Instant Experiences](https://developers.facebook.com/docs/marketing-api/guides/instant-experiences/)  
- [Instagram Platform Changelog](https://developers.facebook.com/docs/instagram-platform/changelog/)  

---

*End of plan. Refine via product review until Section 9 is green; then open Wave 0 implementation tickets.*
