# Voice + Media Upgrade Plan

> **Wave A–E status: DONE** — 2026-08-17. Protocol locked in `docs/HELP-CENTER.md` (§ب · §ب٤ · §ج · §د). Waves **B** (Inbox), **C** (Quick Start + use-cases), **D** (WA / Campaigns / Automations / AI), and **E** (rest + contacts gold polish) **DONE**. Full voice+media upgrade complete.

**Status:** Waves A–E complete · library voice+media upgrade finished  
**Date:** 2026-08-17  
**Audience:** Docs agents + product review  
**Decision (locked):** Prefer **respond.io-style Friendly SaaS** help writing over the current dense MSA “operator handbook / jump-to-action” soul. Articles with **rich media placeholders** (still / GIF / video) beat good-but-dry text. Media assets ship later; **maximize correct placeholder coverage now**.

**Grounding:**

| Artifact | Role |
| --- | --- |
| [`docs/HELP-CENTER.md`](../../HELP-CENTER.md) | Protocol — Wave A **applied** to **ب٤** + §ج voice (+ §ب · §د) |
| [`_INBOX_VS_RESPONDIO.md`](./_INBOX_VS_RESPONDIO.md) | Parity benchmark (openers, Next steps, FAQ, per-step media) |
| [`_EXECUTIVE_SUMMARY.md`](./_EXECUTIVE_SUMMARY.md) | Library state; media still the decisive gap |
| [`_MEDIA_INVENTORY.md`](./_MEDIA_INVENTORY.md) | ~359 inventoried paths — extend for `-gif` / `-video` |
| Gold pages | `contacts/*`, `inbox/filters`, `inbox/reply`, `broadcasts/create` |

**Out of scope for this file:** Rewriting article bodies (except BEFORE/AFTER samples below). Do not start Wave B–E rewrites from this task alone.

---

## 0) North star (one paragraph)

Keep **operator accuracy** (glossary locks, hedges, no false chrome, ب١ meaning completeness). Change the **reader experience**: open like Friendly SaaS (situation → promise → “هذا الدليل يشرح…”), then a calm how-to body with H2 rhythm, Steps, tables, FAQ, and **الخطوة التالية**. Place **media under each Step or UI region**, not as one blob at the end. Prefer inventing a correct placeholder over shipping a dry page that “could wait for design.”

**What we are *not* doing:** English calques, marketing fluff (“بلا سقف”, “الأقوى”), inventing features (Custom Inbox / command palette) we don’t ship, collapsing role paths, or softening accuracy hedges.

---

## 1) Voice & body contract (new “soul”)

### 1.1 Opening formula (Arabic MSA · Friendly SaaS)

Every page’s first prose block (after frontmatter) follows **three beats**, usually 2–4 short paragraphs / sentences:

| Beat | Purpose | Arabic cue (natural, not calque) |
| --- | --- | --- |
| **١. الموقف** | Reader’s situation / friction | «عندما…» / «مع ازدياد…» / «إذا احتجت…» |
| **٢. وعد المنتج** | What Karzoun gives in one calm sentence | feature name bold + benefit without hype |
| **٣. وعد الدليل** | Meta purpose — *allowed* | **«يشرح هذا الدليل كيف…»** أو **«في هذا الدليل تتعلّم…»** |

Then body starts with `## قبل أن تبدأ` (when needed) or the first content H2 / `<Steps>`.

**Rules:**

- Arabic must feel native (Cairo/Riyadh ops MSA), not “This article explains how to…” translated word-for-word.
- Prefer **أنت** / calm second person over stacked imperatives in the opener.
- Soften pure jump-to-action openers (“ثبّت التبويب…”, “ضع **رد**…”) — move the imperative into Steps.
- `description` frontmatter stays a **different** sentence from `title` and from the opener’s meta line (contract ب٤).
- Role/path pages may keep “اختر مسارك” tables; still add beats ١–٣ above the table.

**Banned openers (unchanged + refined):**

| ممنوع | بديل |
| --- | --- |
| `## المقدمة` / `## في هذا الدليل` كـ H2 | الجملة الثالثة من الافتتاح فقط — ليست عنواناً |
| `يهدف هذا المقال` / `هذه الصفحة لـ…` / `الجمهور:` | وعد الدليل بصيغة «يشرح هذا الدليل…» |
| `title === description` | جملتان مختلفتان |
| افتتاح بأمر تشغيلي كثيف بلا موقف | موقف → وعد → وعد الدليل → ثم الخطوات |

### 1.2 Body rhythm

Default spine (omit sections that don’t apply; use **frozen H2 labels** from ب٤ when they do):

```
[افتتاح ٣ نبضات]
## قبل أن تبدأ          ← اختياري
## {موضوع / مناطق الواجهة}
  … جداول أو فقرات قصيرة
  MEDIA تحت كل منطقة UI
## الخطوات             ← صفحات task/setup (Mintlify <Steps>)
  MEDIA تحت كل Step رئيسي أو كل ٢–٣ خطوات قصيرة جداً
## بعد الانتهاء          ← اختياري (نتائج / تحقق)
## أسئلة شائعة         ← اختياري لكن مُفضّل على task اليومية
## أخطاء شائعة         ← جدول عند وجود anti-patterns
## الخطوة التالية        ← NEW frozen closer (انظر أدناه)
## ذات صلة             ← روابط؛ لا تغني عن الخطوة التالية
```

**الخطوة التالية (new frozen H2):**

| القسم | H2 المجمد |
| --- | --- |
| خاتمة توجيهية بأسلوب respond.io Next steps | `## الخطوة التالية` |

نمط المحتوى (٢–٤ نقاط):

> تعلّمت X. بعد ذلك:
> - افتح [Y](/…) عندما…
> - راجع [Z](/…) إذا…

لا تكرر قائمة **ذات صلة** حرفياً؛ اختر **الخطوة التالية المنطقية في الرحلة** (١–٣ روابط فقط) واترك الباقي لـ **ذات صلة**.

**H2 / Steps / tables:**

- عنوان H2 = موضوع واحد (قاعدة ب٣).
- `<Steps>` للمهام؛ جداول للمقارنات والحالات والأخطاء.
- FAQ: سؤال جريء + جواب قصير (نمط filters الحالي جيد — أبقِه).
- Callouts: `Warning` للحدود الخطرة؛ `Tip` لتركيبة يومية؛ لا تستخدم `Info` كـ TODO وسائط.

### 1.3 What to KEEP from current protocol

| Keep | Why |
| --- | --- |
| ب١ اكتمال المعنى التشغيلي | Situation→promise must not erase “ماذا / متى / كيف / أثر” |
| Glossary locks | البريد الوارد · موظف ≠ وكيل · حساب ≠ مساحة · إسناد · لا طابور… |
| Accuracy hedges | `showConversations`، Alt غير مربوط، حدود المنتج، متاح/قريباً/غير موجود |
| Anti-hype | لا «بلا سقف» / «موحّد بالكامل» / وعود لا يدعمها المنتج |
| ب٢/ب٣ IA + مسارات الدور | لا نسطح الشجرة لأسلوب hub مسطّح |
| ب٤ frontmatter + frozen labels | machine-checkable؛ نوسّع فقط |
| Gold accuracy bar (contacts) | Wave E = polish voice/media last — لا تكسر الدقة |
| Media comment + Frame path sync | عقد الآلة يبقى |

### 1.4 Ban list / allow list (voice)

**Allow**

- «يشرح هذا الدليل كيف…» / «في هذا الدليل تتعلّم…»
- «عندما… يوفّر كرزون…»
- Calm “استخدم / اختر / افتح” داخل Steps
- «الخطوة التالية» كخاتمة ودية
- جداول أخطاء شائعة + أسئلة شائعة
- Placeholders كثيفة تحت الخطوات

**Ban / soften**

| Pattern | Action |
| --- | --- |
| افتتاح بأمر تشغيلي مباشر بلا موقف | أعد للكتابة بـ ٣ نبضات |
| تكديس ٣+ أوامر في أول فقرة | انقل للأوامر داخل Steps |
| تسويق فارغ («بلا سقف»، «الأذكى»، «ثورة») | احذف |
| اختراع ميزة للمقارنة مع respond.io | وثّق البديل الصادق أو FAQ «كيف نقارب» |
| لصق تعليمات الوكيل في الصفحة | تغذية الكاتب ≠ نص الصفحة (§ج) |
| كتالوج أسماء أحداث/حقول بلا سياق | ممنوع (درس مشغّلات F3) |
| H2: المقدمة / في هذا الدليل / يهدف هذا المقال | ممنوع |

### 1.5 Proposed edits to `HELP-CENTER.md` (Wave A — concrete)

Agents implementing Wave A should patch:

1. **§ب — قواعد الافتتاح**  
   Replace “ابدأ بجملة عملية: موقف + ماذا سيحصل” with the **٣ نبضات** formula; explicitly **allow** «يشرح هذا الدليل…» in prose (not as H2). Soften “jump-to-action” as default.

2. **§ب٤ — عناوين H2 المجمّدة**  
   Add row: `الخطوة التالية` → `## الخطوة التالية`.  
   Clarify: meta purpose is **prose opener beat 3**, never an H2 named «في هذا الدليل».

3. **§ب٤ — وسائط**  
   Extend placeholder rules for `-gif` / `-video` (see §2). Raise density targets by page `type`. Prefer media **under each Step / UI region**.

4. **§ج — اللغة**  
   Add short “Friendly SaaS MSA” paragraph: calm second person; opener not imperative stack; keep glossary + anti-hype.

5. **§د — الوسائط**  
   Point to this plan + inventory conventions; Inbox daily pages: still + gif/video where state changes.

6. **Glossary notes**  
   In `getting-started/glossary` (or protocol pointer): one line that Help voice = ودّي تشغيلي، ليس كتيّب أوامر جاف — without changing locked terms.

### 1.6 BEFORE / AFTER examples (samples only — not live edits)

#### A) `inbox/filters` — task page

**BEFORE (current soul):**

> افتح **الفلاتر** عندما لا يكفي التبويب (**الكل** / **خاصتي** / **غير مسندة** / **شاركت فيها**). الفلتر يضيّق القائمة الحالية؛ لا يغيّر الإسناد ولا الحالة. ابدأ بأقل عدد ممكن حتى لا تُخفي محادثة تحتاجك.

**AFTER (Friendly SaaS):**

> عندما تمتلئ قائمة المحادثات، يصعب إيجاد ما يحتاج ردّاً الآن دون إخفاء عمل مهم.  
> يوفّر **البريد الوارد** في كرزون فلاتر سريعة وهيكلية تضيّق قائمتك الحالية دون أن تغيّر الإسناد أو الحالة.  
> يشرح هذا الدليل كيف تختار التبويب ثم تبني أضيق فلتر مفيد، ومتى تعيد التعيين.

*(ثم الإبقاء على جداول الفلاتر + Steps + FAQ؛ إضافة MEDIA تحت كل Step رئيسي + `## الخطوة التالية`.)*

#### B) `inbox/reply` — task page

**BEFORE:**

> وضع **رد** في وسط المحادثة يرسل للعميل. وضع **ملاحظة** للتنسيق الداخلي فقط. قبل الكتابة اقرأ شارة القناة واسم العميل وآخر طلب — بعض القنوات تفرض قالباً أو نافذة زمنية، والمرفق لا يُرسل إن ضغطت **إرسال** أثناء الرفع.

**AFTER:**

> العميل ينتظر جواباً واضحاً؛ الفريق يحتاج تنسيقاً لا يراه العميل.  
> في **البريد الوارد** يفصل المحرّر بين وضع **رد** (يصل للعميل) ووضع **ملاحظة** (داخلي فقط)، مع حدود القناة والمرفقات.  
> يشرح هذا الدليل كيف تقرأ السياق، تكتب وترسل بأمان، وتربط الرد برسالة محددة عند الحاجة.

*(انقل تحذير المرفق/النافذة إلى `قبل أن تبدأ` و Steps — لا تحذفه.)*

#### C) `inbox/overview` — overview page

**BEFORE (already close; tighten meta + Next steps):**

> عندما يكتب عميل على واتساب وآخر على البريد وثالث يعلّق على منشور، يتشتت الفريق بين تطبيقات مختلفة. **البريد الوارد** في كرزون (`/inbox`) يجمع رسائل القنوات المرتبطة في حساب واحد: ترد، تتعاون داخلياً، وتعرف من المسؤول وما حالة الطلب.

**AFTER:**

> عندما يكتب عميل على واتساب وآخر على البريد وثالث يعلّق على منشور، يتشتت الفريق بين تطبيقات مختلفة.  
> **البريد الوارد** في كرزون (`/inbox`) يجمع رسائل القنوات المرتبطة في مكان عمل واحد: ترد، تتعاون داخلياً، وتعرف من المسؤول وما حالة الطلب.  
> يشرح هذا الدليل ماذا يعني البريد الوارد عملياً، وكيف تبدو الشاشات الثلاث، وأين يبدأ الموظف مقابل المشرف.

*(أضف في الختام `## الخطوة التالية` → path-agent / path-supervisor / quick-tour بدل الاعتماد على جدول المسار وحده.)*

---

## 2) Media richness contract

### 2.1 Still / GIF / short video — rules of thumb

| Signal | Format | Duration / notes | Filename suffix |
| --- | --- | --- | --- |
| UI region, layout, labels, empty state | **Still** `.webp` | Single frame; highlight control | *(default)* `-scene.webp` |
| State change, toggle, filter apply, menu open→result | **GIF** (or short silent loop) | 2–8s loop; one interaction | `-scene-gif.webp` or `.gif` if needed |
| End-to-end task (day path, create campaign, handoff) | **Short video** | **20–60s**; one job | `-scene-video.mp4` (or `.webm`) |
| Compare two outcomes | Still pair **or** interactive demo note in comment | Prefer two stills side-by-side in scene text | `-a.webp` / `-b.webp` |

**Prefer GIF over still** when the reader must *see motion* to understand (filter apply, snooze menu, reply-to preview appearing, bulk bar appearing).  
**Prefer video** when ≥3 sequential screens matter (agent-day, create-first automation, WhatsApp connect).  
**Prefer still** for anatomy / “where is this control.”

### 2.2 Placement (respond.io pattern)

| Do | Don’t |
| --- | --- |
| MEDIA immediately **under** the Step it illustrates | One media dump after all Steps |
| MEDIA under each major UI region H2/H3 | Only hero image on overview |
| Caption names the control/state | Generic “لقطة شاشة” |
| Inventory row matches MDX path + scene | Orphan inventory paths with no MDX |

**Density targets by `type`:**

| `type` | Min placeholders | Target density |
| --- | --- | --- |
| `task` / `setup` / `routine` | 1 per major Step (≥3 Steps → ≥3) + 1 overview still if useful | **≥4** on daily Inbox tasks; include ≥1 `-gif` or video note when state changes |
| `tour` | 1 per panel/region | **≥3** |
| `overview` | 1 hero layout + 1 secondary | **≥2**; add video note for “day in life” modules |
| `concept` / `reference` | 1 anatomy still; GIF if interaction | **≥1–2** |
| `path` / `faq` | 1 optional map still | **≥1** encouraged |
| `faq` alone | 0–1 | OK thin if linked from rich parents |

**Inbox special (highest parity ask):** no live daily page without ≥1 still; pages `reply`, `filters`, `list`, `agent-day`, `customer-panel`, `statuses`, `assign` → still + **gif or video note** in MEDIA comment.

### 2.3 Placeholder format (extend ب٤)

**Still (current, keep):**

```mdx
{/* MEDIA: /images/help/<module>/<slug>-<scene>.webp | وصف المشهد بدقة */}
<Frame caption="…">
  <img src="/images/help/<module>/<slug>-<scene>.webp" alt="…" />
</Frame>
```

**GIF:**

```mdx
{/* MEDIA: /images/help/<module>/<slug>-<scene>-gif.webp | GIF 4ث: فتح الفلاتر → تفعيل بانتظار الرد → تغيّر العدد */}
<Frame caption="…">
  <img src="/images/help/<module>/<slug>-<scene>-gif.webp" alt="…" />
</Frame>
```

**Video:**

```mdx
{/* MEDIA: /images/help/<module>/<slug>-<scene>-video.mp4 | فيديو 35ث: من غير مسندة حتى أول رد وإغلاق */}
<Frame caption="…">
  <video controls src="/images/help/<module>/<slug>-<scene>-video.mp4" />
</Frame>
```

Until Mintlify/`video` patterns are confirmed in-repo, agents may keep video as **comment-only annotation** on a still path (legacy style: `… | فيديو 30ث: …`) **and** add a dedicated inventory row with `-video` path so media factory can shoot it. Prefer introducing real `<video>` once one module proves the component in `mint validate`.

**Machine rules (additive):**

1. Comment starts with `MEDIA:` then path then `|` then scene.  
2. Path under `/images/help/`.  
3. Suffixes: default still `.webp`; motion `-gif.webp`; narrative `-video.mp4`.  
4. Frame src must match comment path (except comment-only video annotations paired with a still — document both in inventory).  
5. Scene text must name **state before/after** for GIF/video.

### 2.4 Inventory conventions (`_MEDIA_INVENTORY.md`)

When adding placeholders:

1. Add checkbox row under the module section.  
2. Path unique; no reuse across unrelated scenes.  
3. Tag motion explicitly in scene: `GIF:` or `فيديو:` at start of scene when applicable.  
4. After Wave B+, run a quick count: `rg -c 'MEDIA:' guides/<module>` vs inventory unchecked count — fix orphans.  
5. Do **not** delete old still paths when adding `-gif`; keep still for anatomy + gif for motion when both help.

---

## 3) Rollout waves (prioritized)

Effort scale: **S** ≤0.5 day · **M** 1–2 days · **L** 3–5 days · **XL** >5 days (one agent-week). Assumes familiar agents + protocol already read; no product research redo unless fidelity risk.

### Wave A — Protocol + glossary notes

| | |
| --- | --- |
| **Pages** | `docs/HELP-CENTER.md` (ب / ب٤ / ج / د); light note in `getting-started/glossary.mdx` *or* protocol-only pointer; this plan already in `_VOICE…` |
| **Estimate** | 1 protocol file + optional glossary blurb → **~2–4 files** |
| **Effort** | **S–M** |
| **Status** | ✅ **DONE** 2026-08-17 |
| **DoD** | ب٤ lists `## الخطوة التالية`; opener = ٣ نبضات; media suffixes documented; mintignore already lists this plan; product owner ACK on voice sample (filters AFTER) |
| **Risk** | Low. Agents may over-allow marketing tone — mitigate with ban list in protocol. |

### Wave B — Inbox full body rewrite + media densify — **DONE** (2026-08-17)

| | |
| --- | --- |
| **Why first content** | Highest respond.io parity ask (`_INBOX_VS_RESPONDIO`); daily readership |
| **Pages** | All `guides/inbox/**` (**36** MDX incl. routines) — rewritten |
| **Priority order inside B** | 1) overview, path-*, quick-tour 2) list, filters, reply, attachments, statuses, snooze 3) agent-day + routines 4) assign, bulk, customer-panel, internal-notes 5) sla, smart-assignment, supervise-queue 6) rest |
| **Effort** | **XL** (split B1 orientation · B2 reply/list · B3 ops scale · B4 remainder) |
| **DoD** | Every page: ٣-beat opener; `## الخطوة التالية` on task/overview/path; media under Steps/regions; density targets met; inventory updated; no glossary regressions; `mint validate` green; sample audit 5 pages vs AFTER style |
| **Risk** | **High** fidelity drift while rewriting. Mitigate: no product claims without UI check; keep mistake tables; don’t invent Custom Inbox/palette. |
| **Shipped** | 36/36 pages with beat-3 openers + `## الخطوة التالية`; ~117 unique Inbox MEDIA paths (incl. `-gif` / `-video`); `_MEDIA_INVENTORY.md` inbox section refreshed |

### Wave C — Getting-started Quick Start + use-cases — **DONE** (2026-08-17)

| | |
| --- | --- |
| **Pages** | Quick Start (9) + getting-started hubs (9) + use-cases (6) → **24** |
| **Focus** | Openings + الخطوة التالية + media under each launch step (first channel / first reply especially) |
| **Effort** | **L** |
| **DoD** | Sequential Quick Start reads as Friendly SaaS onboarding; each use-case ends with next concrete module link; ≥2 media/page on quick-start tasks |
| **Risk** | Medium — onboarding can slip into marketing. Keep hedges; no “بلا سقف”. |
| **Shipped** | 24/24 live pages: ٣-beat openers + `## الخطوة التالية`; getting-started inventory **12 → 62**; new **use-cases** module **17** paths (incl. `-gif` / `-video`); no `بلا سقف` |

### Wave D — WhatsApp / Campaigns / Automations / AI — **DONE** (2026-08-17)

| | |
| --- | --- |
| **Pages** | WhatsApp 42 · broadcasts 17 · automations 42 · AI 17 → **118** |
| **Approach** | Module batches; don’t rewrite node reference pages into essays — openers + media densify + Next steps; preserve F-series accuracy |
| **Effort** | **XL** (D-WA · D-BC · D-AU · D-AI) |
| **DoD** | Per-module: opener audit pass rate ≥90% sample; placeholder density ≥ targets for task/setup; inventory rows for new -gif/-video; validate green |
| **Risk** | High volume + complex accuracy (Meta, nodes). Mitigate: voice pass ≠ behavior rewrite; flag product doubts instead of inventing. |
| **Shipped** | 118/118: ٣-beat openers + `## الخطوة التالية`; MEDIA densified (WA 128 · BC 77 · AU 69 · AI 53 comments); inventory whatsapp **135** · broadcasts **77** · automations **68** · ai **54** |

### Wave E — Rest + contacts gold polish last — **DONE** (2026-08-17)

| | |
| --- | --- |
| **Pages** | channels, pixel, business-verification, settings, notifications, team-chat, tasks, meetings, attendance, training, knowledge-base, insights, popups, store, orders, file-manager, index + GS soft-touch, **contacts last** |
| **Contacts** | Voice/media polish only; accuracy bar preserved; hedges (bulk tag replace, no export, pixel≠segment page condition) kept |
| **Effort** | **XL** (phased by hub) |
| **DoD** | Library-wide metrics (§5) hit; contacts AFTER matches Friendly SaaS without term drift; EN stubs untouched |
| **Risk** | Medium — fatigue rewrites. Mitigate: contacts = last; spot-check glossary terms with `rg`. |
| **Shipped** | All Wave E live modules: ٣-beat openers + `## الخطوة التالية`; inventory **988** unique paths (24 modules); contacts **42** MEDIA paths; `mint validate` green; Waves **A–E complete** |

### Wave summary

| Wave | Scope | Pages (est.) | Effort | Risk |
| --- | --- | --- | --- | --- |
| **A** | Protocol + glossary note | 2–4 | S–M | Low — ✅ DONE 2026-08-17 |
| **B** | Inbox | ~36 | XL | High (fidelity) — **DONE 2026-08-17** |
| **C** | Quick Start + use-cases | 24 | L | Medium — **DONE 2026-08-17** |
| **D** | WA / Campaigns / Automations / AI | 118 | XL | High (volume) — **DONE 2026-08-17** |
| **E** | Rest; contacts last | ~150+ | XL | Medium — **DONE 2026-08-17** |

---

## 4) Agent / execution playbook

**Do not rewrite pages until Wave A is merged** (or explicitly waived by product). Then one page at a time:

### Checklist — rewrite one Help page

1. **Read** this plan §1–2 + page’s current MDX + linked gold sibling if any.  
2. **Classify** `type` from frontmatter; pick density target.  
3. **Preserve truth:** skim for hedges, permission keys, “not in UI”, glossary terms — keep them.  
4. **Rewrite opener** to ٣ نبضات; remove imperative stack from paragraph 1.  
5. **Body pass:** calm Steps; keep tables; add/adjust FAQ if task page lacks edge cases.  
6. **Add `## الخطوة التالية`** (1–3 journey links) before or after **ذات صلة** — don’t duplicate dumps.  
7. **Media densify:**  
   - Map each Step / UI region → placeholder.  
   - Choose still vs `-gif` vs `-video` per §2.1.  
   - Place Frame **under** the Step/region.  
   - Sync `_MEDIA_INVENTORY.md`.  
8. **Frozen H2 audit:** only approved labels for template sections.  
9. **Frontmatter:** bump `updated`; ensure `description ≠ title`.  
10. **Self-test:** read aloud first 5 lines — does it sound Friendly SaaS Arabic, not a drill sergeant and not an English calque?  
11. **Validate:** `npx mint validate` after batch.  
12. **Do not:** invent features; remove أخطاء شائعة; change IA/nav unless Wave explicitly says so.

### Batching tips for multi-agent

- One agent owns **one subdirectory batch** (e.g. `inbox/` B2).  
- Share a **forbidden terms** paste from glossary.  
- PR description: list pages + “voice+media only” vs “fidelity fix”.  
- If product UI uncertain → note in PR; don’t guess.

### Stop conditions

- Stop the page if rewrite would require undocumented product behavior.  
- Stop the wave if `mint validate` fails on media/MDX patterns — fix contract first.

---

## 5) Success metrics

Track before/after Wave B and again after D/E.

| Metric | Baseline (approx. 2026-08-17) | Target |
| --- | --- | --- |
| Unique inventory paths | ~359 | ≥ baseline; Inbox +20% rows after densify |
| `MEDIA:` comments in `guides/` | ~367 | **≥1.4×** after B–D densify |
| % Inbox pages with ≥3 media placeholders | Low (many have 1–2) | **≥80%** of task/tour/overview |
| % Inbox daily pages with gif **or** video annotation | Low | **100%** of: reply, filters, list, agent-day, statuses, assign, customer-panel |
| Opener audit | Situation-first / imperative-heavy | **≥90%** of sampled pages have explicit beat-3 («يشرح هذا الدليل» or «في هذا الدليل تتعلّم») |
| `## الخطوة التالية` coverage | Rare / absent | **≥90%** of `task`+`overview`+`path` in touched waves |
| Marketing-fluff hits (`بلا سقف`, etc.) | Should be ~0 | **0** on changed pages |
| Glossary regressions (صندوق الوارد، وكلاء الدعم، مساحة العمل) | Controlled | **0** new hits on changed pages |
| `mint validate` | Green | Remains green |

**Opener audit method (sample):**

1. Pick 10 pages per finished wave (mix of types).  
2. Score each 0–2: (1) situation, (1) promise, (1) meta guide line → pass if ≥2 and includes meta.  
3. Fail if opener is pure imperative or English-calque meta.

**Qualitative bar:** A new agent reading Inbox filters should feel guided like respond.io Getting Started, while still trusting Karzoun’s mistake tables and permission honesty.

---

## 6) Explicit non-goals

- Full CMS migration or EN Inbox library expansion.  
- Shooting final media (Wave K / design factory) — placeholders only here.  
- Collapsing role paths into a 12-article flat hub.  
- Matching respond.io feature set in prose (Custom Inbox, command palette, AI Assist) without product.  
- Rewriting contacts accuracy model in Wave E beyond voice/media.

---

## 7) Immediate next action

1. ~~Product ACK on §1.6 AFTER samples (filters + reply + overview).~~ / execute as product prefers.  
2. ~~Execute **Wave A** protocol patch in `HELP-CENTER.md`.~~ ✅ DONE 2026-08-17.  
3. ~~Spawn Inbox agents on **Wave B1** (overview + paths + quick-tour) using §4 checklist.~~ ✅ Wave B DONE.  
4. ~~Execute **Wave C** (Quick Start + getting-started hubs + use-cases).~~ ✅ DONE 2026-08-17.  
5. ~~Execute **Wave D** (WhatsApp / Campaigns / Automations / AI).~~ ✅ DONE 2026-08-17.  
6. ~~Execute **Wave E** (rest + contacts gold polish last).~~ ✅ DONE 2026-08-17 — **Waves A–E complete**.  
7. Next (outside this plan): media factory / shoot placeholders (`_MEDIA_INVENTORY.md`); optional EN Help stubs only if asked.

---

## Quick Start power bar (2026-08-17)

Quick Start spine rewritten to **respond.io power bar**: hub = one calm sentence + article list with capability/outcome one-liners; `what-is-karzoun` = confident product definition + H3 core capabilities (no 3-beat filler / no «يشرح هذا الدليل» spam); subsequent QS pages = one job each, crisp steps, single «الخطوة التالية», no outage/status lecture. Prefer clarity + power over rigid Friendly SaaS 3-beat on this hub only.

---

*Internal only. Related: `_INBOX_VS_RESPONDIO.md`, `_MEDIA_INVENTORY.md`, `_EXECUTIVE_SUMMARY.md`, `docs/HELP-CENTER.md`.*
