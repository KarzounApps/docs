# Inbox Help: Karzoun vs respond.io

**Audience:** CEO / Product  
**Date:** 2026-08-17  
**Scope:** Inbox Help only — not full Help Centers  
**Theirs:** [respond.io/help/inbox](https://respond.io/help/inbox) (+ 12 related articles)  
**Ours:** `docs/ar/help-center/guides/inbox/**` → live `docs.karzoun.chat/ar/help-center/guides/inbox/...`  
**EN ours:** stub hub only — [`docs/help-center/guides/inbox/overview.mdx`](../../help-center/guides/inbox/overview.mdx)

---

## Verdict (one paragraph)

respond.io wins on **media density**, **saved Custom Inboxes**, **command palette**, and **email-composer depth** — polished EN marketing-help with GIFs beside every control. Karzoun wins on **operator truth**, **role journeys** (agent / supervisor / routines), **SLA + smart assignment depth**, **status-machine accuracy** (incl. Bot), and **Arabic MSA density** for daily agents. We are already ahead on *written* operator content for shared topics; we lose the *visual* and a few *product-feature* help topics. Beating them on Inbox Help is mostly **shoot media + close 4–5 content gaps**, not a rewrite.

---

## 1. Structure & IA

### Theirs — collection / hub pattern

| Layer | Pattern |
| --- | --- |
| Hub | [Inbox](https://respond.io/help/inbox) — one blurb + “Related articles” list |
| Breadcrumb | Help → Product → Inbox → Article |
| Articles | **12** flat peers (no role subgroups) |
| Closers | “Next steps” / “Related articles” / Contact Support |

**Their 12 articles**

1. [Getting Started with Inbox](https://respond.io/help/inbox/getting-started-with-inbox)  
2. [Managing Conversations in Inbox](https://respond.io/help/inbox/managing-conversations-in-inbox)  
3. [Managing Emails in Inbox](https://respond.io/help/inbox/managing-emails-in-inbox)  
4. [Using AI Assist](https://respond.io/help/inbox/using-ai-assist)  
5. [Interacting with AI Prompts](https://respond.io/help/inbox/interacting-with-ai-prompts)  
6. [Filtering and Sorting Conversations](https://respond.io/help/inbox/filtering-and-sorting-conversations-in-inbox)  
7. [Assigning and Closing a Conversation](https://respond.io/help/inbox/assigning-and-closing-a-conversation)  
8. [Using the Command Palette](https://respond.io/help/inbox/using-the-command-palette)  
9. [Managing Calls in Inbox](https://respond.io/help/inbox/managing-calls-in-inbox)  
10. [Managing Contacts in Inbox](https://respond.io/help/inbox/managing-contacts-in-inbox)  
11. [Managing Custom Inboxes](https://respond.io/help/inbox/managing-custom-inbox)  
12. [Collaborating with your Team in Inbox](https://respond.io/help/inbox/collaborating-with-your-team-in-inbox)

**Role paths:** none. Same articles for agents and admins. Access nuances appear as callouts inside Getting Started (Contact Visibility), not as separate journeys.

### Ours — module tree + role paths

| Layer | Pattern |
| --- | --- |
| Hub | Overview + nested Mintlify groups under خدمة العملاء |
| Groups | ابدأ هنا → للموظفين → للمشرفين والمدراء → روتين يومي |
| Live AR pages | **35** MDX under `guides/inbox/` (+ routines) |
| Role paths | [`path-agent`](https://docs.karzoun.chat/ar/help-center/guides/inbox/path-agent) · [`path-supervisor`](https://docs.karzoun.chat/ar/help-center/guides/inbox/path-supervisor) |
| EN | Single stub overview pointing to Arabic canonicals |

**Topic split (ours)**

| Bucket | Count (approx.) | Examples |
| --- | --- | --- |
| Orientation / paths / routines | 7 | overview, path-*, quick-tour, agent-day, shift-* |
| List / filter / bulk | 3 | list, filters, bulk-actions |
| Reply / composer / channel tools | 7 | reply, attachments, quick-responses, WA templates, interactive, social, channels |
| Status / ownership | 4 | statuses, snooze, assign, bot-handoff |
| Ops at scale | 4 | smart-assignment, sla, supervise-queue, macros |
| Collaboration / context | 5 | internal-notes, participants, customer-panel, ai-summary, search-and-notifications |
| Calls / shortcuts / extras | 5 | calls, shortcuts, tasks-from-conversation, dashboard-apps, … |

**IA takeaway:** They optimize for *few long walkthroughs* under one hub. We optimize for *many task pages* behind role indexes. Findability by role favors us; findability by “one Getting Started GIF tour” favors them.

---

## 2. Where we WIN

Concrete examples (live AR paths):

| Win | Why | Path / URL |
| --- | --- | --- |
| **Role journeys** | Explicit agent vs supervisor reading order; they have none | `/ar/help-center/guides/inbox/path-agent`, `path-supervisor` |
| **Shift routines** | Day-in-the-life + escalate / review | `agent-day`, `routines/shift-start`, `routines/escalate`, `routines/shift-review` |
| **Status machine truth** | Open / waiting / snooze / Bot / spam + inbound transition tables | `statuses` |
| **SLA as ops** | Wait clock vs internal note; per-dept target; breach actions | `sla` |
| **Smart assignment depth** | When it runs, strategies, load, reopen rules | `smart-assignment` |
| **Permission honesty** | `showConversations` not fake `showInbox` | overview, path-agent, search-and-notifications |
| **Shortcut honesty** | Documents `Alt+B` as *unbound* UI chrome | `shortcuts` |
| **Zaki placement truth** | Right-rail takeover, not a details tab | `customer-panel` → AI `copilot-in-inbox` |
| **Common-mistakes tables** | Operator anti-patterns | `reply` «أخطاء شائعة» |
| **WhatsApp / social depth in Inbox tree** | Templates, interactive, social comments as first-class pages | `whatsapp-templates`, `interactive-messages`, `social-comments` |
| **Tasks from conversation** | Ticket handoff without pretending Inbox is a ticketing system | `tasks-from-conversation` |
| **Volume of operator pages** | ~35 vs their 12 | whole module |

---

## 3. Where they WIN

| Win | Why | URL |
| --- | --- | --- |
| **Real screenshots + GIFs per control** | Media ships with the article; ours are mostly placeholders | e.g. [Managing Emails](https://respond.io/help/inbox/managing-emails-in-inbox) (Show original GIF), [Custom Inbox](https://respond.io/help/inbox/managing-custom-inbox) (filter GIF) |
| **Custom Inboxes as a product + help topic** | Saved shareable filtered views; full CRUD + sharing | [Managing Custom Inboxes](https://respond.io/help/inbox/managing-custom-inbox) |
| **Command palette** | Deep article: search prefixes, actions table, FAQ | [Using the Command Palette](https://respond.io/help/inbox/using-the-command-palette) |
| **Email in Inbox** | Dedicated composer: subject, CC/BCC, show original, timestamps | [Managing Emails](https://respond.io/help/inbox/managing-emails-in-inbox) |
| **Inbox AI Assist + AI Prompts** | Draft replies + tone/translate/grammar in composer | [AI Assist](https://respond.io/help/inbox/using-ai-assist), [AI Prompts](https://respond.io/help/inbox/interacting-with-ai-prompts) |
| **Calls: recordings / transcripts / AI transfer** | Richer call activity help | [Managing Calls](https://respond.io/help/inbox/managing-calls-in-inbox) |
| **Contacts CRUD from Inbox** | Create contact, block, search messages/comments in one article | [Managing Contacts](https://respond.io/help/inbox/managing-contacts-in-inbox) |
| **Conversation events catalog** | Large event-type table for audit literacy | [Collaborating…](https://respond.io/help/inbox/collaborating-with-your-team-in-inbox) |
| **Closing notes + auto-close** | Product + FAQ for edge cases | [Assigning and Closing](https://respond.io/help/inbox/assigning-and-closing-a-conversation) |
| **Flat hub findability** | 12 titles on one page; easy “Help me with…” browse | [Inbox hub](https://respond.io/help/inbox) |
| **EN primary language** | Global SaaS default; our EN Inbox is a stub | our `help-center/guides/inbox/overview` |

---

## 4. Written content deep-dive

### Opening pattern

| | Them | Us |
| --- | --- | --- |
| Pattern | Meta purpose line: “This article explains…” / “Learn how to…” | Situation-first: pain → product → action |
| Tone | Friendly SaaS EN | MSA operator Arabic |

**Them** ([Filtering…](https://respond.io/help/inbox/filtering-and-sorting-conversations-in-inbox)):

> As conversations grow in volume, Inbox provides tools to help you organize and prioritize conversations. This article explains how to filter and sort conversations, including advanced filters and unreplied conversations.

**Us** (`reply`):

> وضع **رد** في وسط المحادثة يرسل للعميل. وضع **ملاحظة** للتنسيق الداخلي فقط. قبل الكتابة اقرأ شارة القناة واسم العميل وآخر طلب…

**Us** (`overview`):

> عندما يكتب عميل على واتساب وآخر على البريد وثالث يعلّق على منشور، يتشتت الفريق بين تطبيقات مختلفة.

### Voice

| Dimension | Them | Us |
| --- | --- | --- |
| Person | Second person (“you”) | Second person (أنت / صيغة أمر عملية) |
| Imperative | Mild (“Click…”, “Use…”) | Stronger ops (“ثبّت التبويب”, “أعد التعيين”) |
| Marketing residue | Light product praise rare; mostly how-to | Explicit anti-hype: “ليست حالة محادثة”, “ليست بديلاً عن الإسناد” (`sla`) |
| Terminology | Agent, Contact, Workspace | موظف، عميل، حساب — glossary-locked |

### Scannability

| Device | Them | Us |
| --- | --- | --- |
| H2/H3 | Strong; TOC-friendly | Strong; template sections |
| Tables | Yes (events, prompts, shortcuts) | Heavy (status transitions, filters, mistakes) |
| Numbered Steps | Often inline 1–2–3 + GIFs | Mintlify `<Steps>` on ~18 pages |
| Callouts | Notes / Important / Warnings | Warning / Info / media shot briefs |

### UI label quoting

Both bold UI labels. We additionally quote **exact empty states and permission keys** (`showConversations`, «لا يوجد ملخص…»).

**Them:** click **AI Assist**, **Close**, **Unreplied**.  
**Us:** **بانتظار العميل**, **إرسال رسالة قالب**, `Alt + P`.

### Prerequisites / What’s next / FAQ / Troubleshooting

| Closer | Them | Us |
| --- | --- | --- |
| Requirements / Before you start | Yes (esp. email connect) | **قبل أن تبدأ** on most task pages |
| Next steps | Yes (“You’ve learned… Next, explore…”) | **بعد الانتهاء** + **ذات صلة** |
| FAQ / Troubleshooting | Strong on AI Assist, Assign/Close, Command Palette | **أسئلة شائعة** + **أخطاء شائعة** tables |
| Related articles rail | Always (emoji “Related articles 👩‍💻”) | Link lists; no social share chrome |

### Screenshot / GIF density

| | Them | Us |
| --- | --- | --- |
| Placement | Per subsection / per step | Placeholders in `<Frame>` + `MEDIA:` comments |
| Format | PNG + short GIFs (filters, email reply, comments) | Paths inventoried in `_MEDIA_INVENTORY.md` — mostly unchecked |
| Density | High (Getting Started alone is a visual tour) | Low live visual; high *shot briefs* ready for media factory |

### Length & density

| | Them | Us |
| --- | --- | --- |
| Model | Fewer, longer walkthroughs (Managing Conversations / Contacts are mega-pages) | More micro–task pages + path indexes |
| Risk | Skim fatigue inside one URL | Click fatigue across many URLs |
| Fit | Feature discovery | Shift execution |

### Accuracy discipline (“operator truth”)

Recent fidelity pass (see `_EXECUTIVE_SUMMARY.md`, `_DOCS_VS_UI_GAPS.md`) shows our Inbox tone is deliberately **skeptical of chrome**:

- Shortcut page: `Alt+B` shown in UI but **not bound**.  
- Overview / paths: gate is `showConversations`, not `showInbox`.  
- Customer panel: Zaki **replaces** the right rail.  
- List: default filter **Open includes New** — documented explicitly.  
- Residual thin spots still called out internally: composer catalog / call button / IMAP headers (P0/P1).

**Them** also document limits honestly when needed (AI Assist inactive reasons; HTML email render caveat; unread count 90-day cache). Their bar is good product help; ours is slightly more *forensic* against false claims.

### Snippet pair — collaboration / notes

**Them** ([Collaborating…](https://respond.io/help/inbox/collaborating-with-your-team-in-inbox)):

> The **comments** feature helps your team collaborate directly within a conversation by sharing internal notes that are visible only to Workspace users and never to Contacts.

**Us** (`reply` FAQ / notes boundary):

> هل يظهر «أحدهم يكتب...» للعميل؟  
> مؤشر الكتابة للقنوات التي تدعمه أثناء مسودة **الرد**، لا أثناء الملاحظة الداخلية.

### Snippet pair — filters

**Them:**

> A conversation appears in the **Unreplied** filter if its most recent message is an incoming message from the Contact.  
> **Important**: Replies sent via **Broadcast messages do not count**… **Automated messages count as replies**.

**Us** (`filters`):

> **بانتظار الرد** أضيق من حالة **مفتوح**: يستبعد ما رددتم عليه آخر مرة حتى لو بقي مفتوحاً.

Same operator precision; we split list vs filters across pages and add dept/channel/tag depth they put partly in Custom Inboxes.

---

## 5. Topic coverage matrix

| Topic | Us | Them | Gap notes |
| --- | --- | --- | --- |
| Getting started / layout | Strong (`overview`, `quick-tour`) | Strong ([Getting Started](https://respond.io/help/inbox/getting-started-with-inbox)) | They: Standard/Team/Custom/Blocked side panel. We: three panels + role pick |
| Role paths | **Win** (`path-agent`, `path-supervisor`) | — | Unique to us |
| Day / shift routines | **Win** (`agent-day`, routines/*) | — | Unique to us |
| List / tabs / sort | Strong (`list`) | Inside Managing Conversations + Filtering | We: Open includes New; SLA sort |
| Filters | Strong (`filters`) | Strong ([Filtering…](https://respond.io/help/inbox/filtering-and-sorting-conversations-in-inbox)) | They: Unreplied + advanced → Custom Inbox |
| Custom / saved inboxes | Weak / N/A as product | **Win** ([Custom Inboxes](https://respond.io/help/inbox/managing-custom-inbox)) | Product+help gap if we lack saved views |
| Reply / composer | Strong (`reply`) | Inside Managing Conversations | We thinner on IMAP headers / catalog / call button (known residual) |
| Email-specific Inbox | Thin (channel mention) | **Win** ([Managing Emails](https://respond.io/help/inbox/managing-emails-in-inbox)) | Dedicated email composer article needed if product supports it |
| Assign / close | Strong (`assign`, `statuses`) | Strong ([Assigning…](https://respond.io/help/inbox/assigning-and-closing-a-conversation)) | They: closing notes + auto-close FAQ |
| Snooze | Strong (`snooze`) | Covered in Contacts / Conversations / palette | Ours clearer vs “waiting on customer” |
| SLA | **Win** (`sla`) | Not a dedicated Inbox article | Major differentiator |
| Smart assignment | **Win** (`smart-assignment`) | Not in Inbox collection (may live elsewhere) | Major differentiator |
| Supervise / bulk | Strong (`supervise-queue`, `bulk-actions`) | Quick actions only | Ours deeper for leads |
| Calls | Thin–medium (`calls-in-inbox` + WA guides) | **Win** ([Managing Calls](https://respond.io/help/inbox/managing-calls-in-inbox)) | They: recordings, transcripts, AI transfer |
| Contacts panel | Strong (`customer-panel`) | **Win** breadth ([Managing Contacts](https://respond.io/help/inbox/managing-contacts-in-inbox)) | They: create/block/search in one mega-page |
| Collaboration / notes | Strong (`internal-notes`, `participants`) | Strong ([Collaborating…](https://respond.io/help/inbox/collaborating-with-your-team-in-inbox)) | They: events catalog + AI summarize-as-comment |
| AI in Inbox | Split: `ai-summary` + AI hub `copilot-in-inbox` | **Win** in-collection AI Assist + Prompts | Cross-link Zaki more from Inbox hub; don’t duplicate wrong UI |
| Shortcuts / command palette | Shortcuts only (`shortcuts`) | **Win** ([Command Palette](https://respond.io/help/inbox/using-the-command-palette)) | Document palette if product has one; else keep honest Alt map |
| WhatsApp templates / interactive | **Win** in tree | Point out to Channels / Quick Start | Our Inbox-local depth is better |
| Social comments | **Win** (`social-comments`) | Light in Conversations | Keep |
| Bot handoff / macros | Strong (`bot-handoff`, `macros`) | Bot events in Collaborating table | Ours actionable |
| Tasks from conversation | **Win** | — | Keep; clarifies Inbox ≠ tickets |
| Media | Placeholders | **Win** shipped assets | Highest leverage |
| EN coverage | Stub | Full EN library | Stub OK if AR is canonical; expand later |

---

## 6. Scorecard (1–5)

| Dimension | Us | Them | Comment |
| --- | --- | --- | --- |
| **IA** | **4.5** | 4.0 | Role tree + routines beat flat hub; their hub is simpler to browse |
| **Writing quality** | **4.5** | 4.0 | Our MSA operator prose + mistakes tables; their EN is clean but meta-openers |
| **Richness / media** | **2.0** | **5.0** | Decisive gap — GIFs vs placeholders |
| **Completeness** | **4.0** | **4.0** | Different coverage: we win SLA/assignment/roles; they win email/custom inbox/palette/AI Assist |
| **Findability** | **3.5** | **4.0** | They: 12 titles on one page + search. We: deeper nav; EN stub weak |
| **Operator accuracy** | **4.5** | 4.0 | Recent false-claim purge; residual composer gaps remain |

**Weighted read:** On *words and ops truth*, we are competitive or ahead. On *shipped visual help + a few feature topics*, they still look more “premium Help.”

---

## 7. Top 10 recommendations to beat them on Inbox (content/style; prioritized)

1. **Media factory for Inbox first** — Shoot the inventoried frames (`overview-three-panels`, `reply-composer`, `filters-panel`, `sla-list-urgency`, `snooze-status-menu`, `agent-day-triage`, …). One GIF per critical interaction beats another article.  
2. **Add “Next steps” closers** on overview + path pages in their style (“You’ve learned X → open Y”) without watering down situation-first openings.  
3. **Email-in-Inbox article** (when product supports it) — subject / To-Cc-Bcc / reply-to-thread / known IMAP limits — mirror [Managing Emails](https://respond.io/help/inbox/managing-emails-in-inbox); close residual composer P0.  
4. **Command palette or global search deep-dive** — If we have palette-like UX, document it like [theirs](https://respond.io/help/inbox/using-the-command-palette). If not, expand `search-and-notifications` + `shortcuts` into one “Find & act fast” page so the gap is intentional.  
5. **Saved views / Custom Inbox** — If product ships saved filters, write CRUD + sharing like [Managing Custom Inboxes](https://respond.io/help/inbox/managing-custom-inbox). If not, one FAQ on overview: how to approximate with tabs + filters.  
6. **Inbox AI entry page** — Short hub: AI summary card vs Zaki rail vs (if any) composer assist — link out; avoid duplicating wrong UI. Steal their FAQ pattern for “why isn’t AI active?”  
7. **Closing / auto-close FAQ block** on `statuses` or `assign` — closing notes, reopen rules, what resets timers (broadcast vs human) — patterned on their Assigning FAQ.  
8. **Calls enrichment** — Link WA softphone guides; add Answer / Coach / missed outcomes; recordings/transcripts only if product-true.  
9. **Conversation events / audit literacy** — Compact table of what appears in thread history (assign, snooze, bot, merge) like their Collaborating events table.  
10. **Keep role paths; add a one-page “Inbox map”** — Visual index of the 35 pages in 6 tiles (Start / Reply / Status / Team / Scale / Channels) so flat-hub fans get their browse experience without collapsing our tree.

**Do not:** Rewrite Arabic into marketing-EN tone; drop status/SLA tables; invent Custom Inbox or palette docs for features we don’t ship.

---

## Appendix — quick counts

| Metric | Us (AR Inbox) | Them (Inbox collection) |
| --- | --- | --- |
| Hub articles | 35 live MDX | 12 |
| Role paths | 2 + routines | 0 |
| EN Inbox | 1 stub | Full EN set |
| Pages with `<Steps>` | ~18 | Many inline numbered lists |
| Media placeholders tagged | ~26+ in Inbox inventory | Shipped PNGs/GIFs |

---

*Internal only. Related: `_EXECUTIVE_SUMMARY.md`, `_MEDIA_INVENTORY.md`, `_DOCS_VS_UI_GAPS.md`.*
