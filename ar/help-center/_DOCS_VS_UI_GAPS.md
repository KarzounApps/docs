# Docs vs UI gap backlog

Inventory from 10 module audits (Help MDX vs v4 UI / locales / code), 17 Aug 2026. Reconciled after **Wave 0 + Wave 1** landings (same day). **Do not treat older Help drafts as UI truth** — prefer the patched pages listed under Fixed this wave.

Scores below are the **pre-wave** audit baseline (kept for history). Contacts 58/100 → **2.9**. WhatsApp 78/100 → **3.9**. Insights+ is the mean of Insights 3 / Store 2 / KB 4 / Files 1 / Orders 2 → **2.4**.

Mean across 10 modules (pre-wave): **3.1**. Was **42** P0 publish blockers → **~42 fixed** across Wave 0–2 → **0 P0 still open** (Wave 2 closed the remaining ~6).

## Scorecard (pre-wave baseline)

| Module | Score | Worst P0 (then) |
| --- | ---: | --- |
| Insights+ (reports / store / KB / files / orders) | 2.4 | File Manager + Orders nav 404s; Insights invents dashboard compare/date |
| Settings / team / billing | 2.5 | Currency/language/date are not org-wide; tags/properties/lead-stages have no pages |
| Contacts / CRM | 2.9 | Custom fields, lead stages, tags undocumented; Pixel segment conditions are false |
| Inbox | 3.0 | `search-and-notifications` redirected; Alt+B / save-as-template / `newOutgoingMsg` are dead |
| Campaigns | 3.0 | A/B and attachments are UI-only; wallet launch-block is overclaimed |
| Automations | 3.0 | Trigger catalog refused; permissions map is wrong; task triggers/actions missing |
| AI | 3.0 | Studio is custom-only (not tabs); Zaki owns the inbox rail, not a details tab |
| Pixel / popups | 3.5 | `path-marketer` 404; targeting overclaimed; cart events land as custom |
| Team+ (chat / tasks / meetings / attendance) | 3.7 | Meetings detail thin; `_MEDIA_INVENTORY` missing meetings/attendance |
| WhatsApp + channels | 3.9 | Initialize Catalog skipped; general settings wrongly claim auto-reply/assignment |

Mini-scores inside Insights+: KB **4** (usable). Insights **3**. Store **2**. Orders **2**. File Manager **1**.

Mini-scores inside Team+: Team Chat **4.2**. Tasks **4.0**. Attendance **3.4**. Meetings **3.2**.

## Fixed this wave (Wave 0 + Wave 1)

Reconcile pass confirmed pages on disk + matching `docs.json` nav (334/334 Help Center nav paths resolve). Marked **DONE** — do not re-open unless UI regresses.

### Wave 0 — nav 404s

1. **DONE** File Manager: `folders`, `uploads-library`, `sharing` written + nav.
2. **DONE** Orders: `views-and-status` (10 order + 5 payment statuses), `sources` written + nav.
3. **DONE** Pixel: `guides/pixel/path-marketer` written + nav. *(No conflict: `contacts/path-marketer` and `broadcasts/path-marketer` are different role indexes, not duplicate Pixel copy.)*

### Wave 1 — false-claim / operator patches

4. **DONE** Locale truth: currency/date/time = `localStorage`; language = per-user (`settings/general`, `getting-started` account-setup).
5. **DONE** Insights: no dashboard date/channel/compare — per-chart only (`charts-and-filters`, `csat`, `overview`).
6. **DONE** Insights: «تحديث الآن» does not refetch (`live-and-export`).
7. **DONE** Campaigns: email subject A/B is UI-only (`broadcasts/email`).
8. **DONE** Campaigns: email attachments Browse unwired (`broadcasts/email`).
9. **DONE** Campaigns: no launch wallet/credit reject (`broadcasts/whatsapp`, `failures`).
10. **DONE** Campaigns: `{{unsubscribeUrl}}` Mailgun/SES honesty (`broadcasts/email`, `email-templates`).
11. **DONE** Campaigns: multi segment/tag = **union** (`broadcasts/audience`).
12. **DONE** Campaigns: calendar plots once/created only — recurring preview elsewhere (`broadcasts/calendar`).
13. **DONE** Inbox: `Alt+B` shown but unbound (`shortcuts`).
14. **DONE** Inbox: «حفظ كقالب» placeholder (`quick-responses`).
15. **DONE** Inbox: `newOutgoingMsg` / الرسائل الصادرة unused (`smart-assignment`).
16. **DONE** Inbox: `search-and-notifications` restored + nav.
17. **DONE** AI · Inbox: Zaki **replaces** right rail (`copilot-in-inbox`, `customer-panel`).
18. **DONE** AI: Studio custom-only; All/Custom/System tabs = Skills (`agent-studio`).
19. **DONE** AI: Agent Builder live system skill (`agent-recipes`, `agent-skills`).
20. **DONE** AI: Studio/Copilot need `ai_copilot` + `showCopilot`.
21. **DONE** AI: Skills wizard Identity→Trigger→Playbook→Required tools→Knowledge (`agent-skills`).
22. **DONE** WhatsApp: general settings = **name + department** only (`whatsapp/overview`, `connect`).
23. **DONE** WhatsApp: mandatory **تهيئة الكتالوج** before toggles (`commerce/overview`, `commerce/sync`).
24. **DONE** Contacts · Pixel: no Pixel page-view segment condition (`segments/overview`, `pixel/with-segments`).
25. **DONE** Contacts: export honesty — no contacts UI export button (`contacts/overview`).
26. **DONE** Pixel: geo/visits cannot evaluate; URL contains needs full `https://`; AND rules (`popups/targeting-rules`).
27. **DONE** Pixel: popups show immediately — no delay/exit/scroll in builder (`targeting-rules`).
28. **DONE** Pixel: cart → `product_added_to_cart` as **مخصص** (`pixel/events`).
29. **DONE** Pixel/popups: options (no tags picker), install honesty (`popups/options`, `pixel/install`, `popups/install-code`).
30. **DONE** Settings pages: `settings/tags`, `settings/properties`, `settings/lead-stages` + nav.
31. **DONE** Inbox gate: `showConversations` (not `showInbox`) — permissions + inbox pages.
32. **DONE** Automations RBAC: `showAutomations` / `automationsAdd` / `Edit` / `Archive` (not `manageAutomations`).
33. **DONE** Settings: dept/branch permission inheritance + default roles Admin/Manager/Agent/Viewer/Developer (`permissions`).
34. **DONE** Settings: seats sync on `/settings/billing/seats`; Freemium called out (`billing/plan-and-payment`).
35. **DONE** Automations: trigger event tables by family (`triggers/types`).
36. **DONE** Automations: task triggers + five task actions (`triggers/types`, `operations-actions`).
37. **DONE** Automations: message node ports / failure branches (`nodes/message`).
38. **DONE** Automations: split types percentage / random / field (`nodes/split`).

## P0 still open (publish blockers)

*None.* Wave 2 closed the remaining six (17 Aug 2026). See **Fixed this wave → Wave 2** below.

## Fixed this wave — Wave 2 (remaining P0)

39. **DONE** Inbox composer extras: catalog / call button / IMAP Subject·Cc·Bcc (`inbox/composer-extras` + link from `reply`).
40. **DONE** Store install depth: OAuth vs API key, initial sync once, مثبّت ≠ متصل (`store/install-apps`).
41. **DONE** Meetings detail drawer: agenda, notes, actions→task, decisions append-only, RSVP, attendance (`meetings/detail-drawer` + nav).
42. **DONE** Tasks custom properties hedge: define only under Settings `/settings/properties`; Tasks Settings Properties tab commented out (`tasks/task`, `settings/properties`).
43. **DONE** `_MEDIA_INVENTORY.md`: added `### meetings` and `### attendance` (+ composer/billing/store placeholders).
44. **DONE** `/billing/activate` recovery documented honestly — banner commented; EN fallbacks (`settings/billing/activate-subscription`).

## P1 (still open)

Operator-critical, ship after remaining P0. Grouped; not every audit row.

**Contacts** — Bulk «الحالة» vs list «التصنيف» (non-lead/customer values drop out of People filters). Segment archive / duplicate / draft / building. Add-contact dialog tabs (details / social / relations / lead stage).

**WhatsApp** — Template buttons (FLOW pick, `REQUEST_CONTACT_INFO`, voice-call TTL, call permission). Ad Insights when `ad_id` is present. Coexistence post-connect sync statuses. Wallet ↔ Karzoun-managed WhatsApp metering / 131042. Channel Repair when/why.

**AI** — Capability catalog vs `agent-tools-access` examples (commerce / internet / RAG / staff modules). Zaki as global dock (header, Mod+Shift+Z, float, search) beyond inbox rail. Per-message reasoning, queue, attach, voice, tool approval. Personality presets + creativity slider. Nav names: **زكي AI** → المحادثات / استوديو / المهارات. Tools still clipped by the signed-in member’s RBAC.

**Team+** — Team Chat reactions + forward. Tasks Move dialog + advanced filters. Meetings toolbar filters. Attendance devices + pay period. Dashboard lives in Timeclock shell, not the platform sidebar. *(Meetings action→task documented in Wave 2 `detail-drawer`.)*

**Insights+** — Entire **tasks** report family missing from Insights docs. Conversation templates `ongoingResponseTime_*` / `responsesCount_*`. Custom report (dimensions / measures / pivot). File Manager share depth beyond new pages (users vs department), acknowledgements polish. Marketplace listing types / install statuses. `/marketplace/orders` ≠ `/orders`.

**Automations** — WhatsApp event triggers depth (ads, catalog order, Flow done, calls) if any family rows still thin. `/automations/triggers` list page. `removeProperty` / `removeAllProperties`. FB/IG: events fire, picker stays empty (`triggers: []`). Plan `maxAutomations` (Freemium = 3) callout elsewhere if needed.

**Inbox** — Default list is **Open** (includes New), not All. Starred filter with no star control. Reset filters also resets status + tab. Spam from overflow only; marketing display-only. Interactive messages stub. Social comment hide/delete/thread (IG vs FB depth). Calls list (waiting / Answer / Coach). Visibility OR-rule (assigned **or** department **or** participated). Bulk = current loaded page only.

**Campaigns** — Missing `isSubscribed` counts as subscribed (partially touched in email audience). Bounce/complaint auto-unsub. Recurring: monthly relative, exclude ranges, timezone, next-5 preview; Push recurring **re-notifies**. WA Overview child failure counters. Folders / tags / bulk.

**Pixel** — UTM captured in the browser, **not** on the contact / segments (called out on path-marketer; still P1 polish). Script Manager: messenger forces Pixel on; form codes required. Salla/Zid: theme `<head>` still required; login → identify; Salla-only events are custom. Callout fields; default display is shoutbox. Field validation is date not URL.

**Settings** — Invite extras (multi group/dept, phone, avatar). Invitation status is a column, not a filter. Fix permissions + per-user rules polish. Wallet restriction reasons + auto-top-up. Usage Explorer meters / CSV. Plan: monthly→yearly matrix depth, quota card ≠ wallet meters. Branding is `custom_branding` (real fields). Audit filters exist; **no export**. Notification type catalog (~30 types). Product currency is per-SKU; no brand filter.

## P2 (summary only)

~70 remaining polish items. Do not block publish.

IMAP / TikTok / KB article triggers; GraphQL `loadActions` flood; import entity reconciliation; internal `BROKEN` status. Push iOS subtitle/sound/badge; Urgent TTL = 15 min; Queued status missing from the filter. Insights chart types / lock layout; goal-line stubs; `customersByHasAuthority` stale. KB topic color/image not in explorer UI. Structure has no «معلومات الشركة» tab. Product UOM / SEO tabs. Timeclock `showTimeclocks` gate temporarily disabled. Recurring meeting options depth. CSS still `.octobots-*`. Skill import «قريباً». `persona.voiceId` with no voice picker. Orders drawer archive/delete unwired (overview «لا حذف» is correct). SSO / `advanced_security` undiscussed. Busy availability vs inbox assignment — hedge.

## Incorrect claims — status after Wave 1

| Claim | Reality | Pages | Status |
| --- | --- | --- | --- |
| Currency / language / date format are org-wide and drive invoices, reports, WhatsApp catalog | `localStorage` + per-user language; timezone is org; product currency is per-SKU (default SAR); WABA currency is Meta | `settings/general`, `account-setup`, … | **Patched** |
| Insights dashboard has date range, channel, and compare-previous-period | Per-chart filters only; no `comparePeriod` | `insights/charts-and-filters`, `csat`, `overview` | **Patched** |
| «تحديث الآن» reloads data | Timer UI only | `insights/live-and-export` | **Patched** |
| Email A/B splits traffic evenly | Variants never sent | `broadcasts/email` | **Patched** |
| Email attachments from the wizard | Browse is inert | `broadcasts/email` | **Patched** |
| Campaign rejected at launch for low wallet | No engages go-live credit check (TODO) | `broadcasts/whatsapp`, `failures` | **Patched** |
| `{{unsubscribeUrl}}` is the working opt-out | Mailgun does not inject it; SES uses a hardcoded footer | `broadcasts/email`, `email-templates` | **Patched** |
| `Alt+B` hands to bot | Not bound | `inbox/shortcuts` | **Patched** |
| «حفظ كقالب» from the composer | Placeholder | `inbox/quick-responses` | **Patched** |
| Inbox Copilot is a details **tab** | Rail takeover | `copilot-in-inbox`, `customer-panel` | **Patched** |
| Allow `showInbox` | `showConversations` | `settings/team/permissions` | **Patched** |
| WhatsApp general settings = auto-reply + assignment | Name + department; bots = `/automations/channel-bots` | `whatsapp/overview`, `connect` | **Patched** |
| Studio tabs All / Custom / System; Zaki listed in studio | Custom-only; Zaki excluded | `ai/agent-studio` | **Patched** |
| «حتى تتوفر أدوات بناء الوكلاء» | Agent Builder is live | `ai/agent-recipes` | **Patched** |
| Pixel page/product view as a segment condition | Not in the builder catalog | `contacts/segments/overview`, `pixel/with-segments` | **Patched** |
| Country / city / visit targeting | Client cannot evaluate; geo **hides** the form | `popups/targeting-rules` | **Patched** |
| Cart as ecommerce automation event | Name mismatch → **مخصص** | `pixel/events`, `with-automations` | **Patched** |
| Message node: single output, no branches | Reply buttons, list rows, template/flow failure ports | `automations/nodes/message` | **Patched** |
| Contacts list can export | API/locales only; no button | `contacts/overview` | **Patched** |
| Settings appearance / login look lives on General | Appearance tab commented out; branding is `/settings/branding` | `settings/general`, `branding` | Still watch |
| Structure has «معلومات الشركة» | Does not exist | `settings/positions` | Still watch (P2) |

## Suggested next wave (do **not** start until asked)

**Wave 2 — DONE** (remaining P0 closed 17 Aug 2026)

**Wave 3 — gates and money polish** (much of seats/Freemium/permissions already landed)

- Automations Agent/Viewer matrix depth; `maxAutomations` Freemium = 3
- Unsubscribe / `isSubscribed` edge cases beyond email honesty

**Wave 4 — thin-but-real** (does not block a truthful Help)

Template buttons, Ad Insights, coexistence sync, recurring schedule extras, AI capability catalog, Insights task reports, Team Chat reactions.

Interactive filterable copy of this backlog: open the canvas beside chat (`help-docs-vs-ui-gaps.canvas.tsx`) if present.
