#!/usr/bin/env node
/**
 * Migrate Redocly Help Center (customers/) → Mintlify ar/help-center (+ EN bilingual pages).
 *
 * Sources:
 *   AR bodies: octobots/docs/@l10n/ar/customers/
 *   EN bodies: octobots/docs/customers/ (full articles for hand-written guides; stubs skipped)
 *   Nav:       octobots/docs/customers/sidebars.yaml
 *   Images:    octobots/docs/images/help/
 *
 * Usage:
 *   node scripts/migrate-help-center.mjs
 *   node scripts/migrate-help-center.mjs --skip-images
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MINT = path.resolve(__dirname, "..");
const REDocly = path.resolve(
  MINT,
  "../../octobots/docs",
);

const args = new Set(process.argv.slice(2));
const SKIP_IMAGES = args.has("--skip-images");

const SRC_AR = path.join(REDocly, "@l10n/ar/customers");
const SRC_EN = path.join(REDocly, "customers");
const SRC_IMAGES = path.join(REDocly, "images/help");
const SIDEBAR = path.join(REDocly, "customers/sidebars.yaml");
const OUT_AR = path.join(MINT, "ar/help-center");
const OUT_EN = path.join(MINT, "help-center");
const OUT_IMAGES = path.join(MINT, "images/help");
const NAV_FRAGMENT = path.join(MINT, "scripts/_generated/help-center-ar-nav.json");

/** EN pages that have real English bodies (not locale stubs). */
const EN_FULL_PAGES = new Set([
  "guides/whatsapp/whatsapp-ctwa-ads.md",
  "guides/whatsapp/whatsapp-calling.md",
  "guides/channels/email-channels.md",
]);

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function yamlSidebarToTree(yamlText) {
  // Minimal YAML parser for our sidebars.yaml shape (page/group/items/label).
  const lines = yamlText.split(/\r?\n/);
  const root = [];
  const stack = [{ indent: -2, items: root }];

  function current() {
    return stack[stack.length - 1];
  }

  let pending = null;

  for (const raw of lines) {
    if (!raw.trim() || raw.trim().startsWith("#")) continue;
    const indent = raw.match(/^ */)[0].length;
    const line = raw.trim();

    while (stack.length > 1 && indent <= current().indent) stack.pop();

    if (line.startsWith("- page:")) {
      const page = line.replace(/^- page:\s*/, "").trim();
      pending = { type: "page", page, indent };
      current().items.push(pending);
      continue;
    }
    if (line.startsWith("- group:")) {
      const group = line.replace(/^- group:\s*/, "").trim();
      pending = { type: "group", group, label: group, items: [], indent };
      current().items.push(pending);
      stack.push({ indent, items: pending.items, node: pending });
      continue;
    }
    if (line.startsWith("label:") && pending) {
      let label = line.replace(/^label:\s*/, "").trim();
      if (
        (label.startsWith('"') && label.endsWith('"')) ||
        (label.startsWith("'") && label.endsWith("'"))
      ) {
        label = label.slice(1, -1);
      }
      if (pending.type === "page") pending.label = label;
      if (pending.type === "group") pending.label = label;
      continue;
    }
    // ignore labelTranslationKey / expanded
  }

  return root;
}

function stripFrontmatter(md) {
  if (!md.startsWith("---")) return { fm: {}, body: md };
  const end = md.indexOf("\n---", 3);
  if (end === -1) return { fm: {}, body: md };
  const raw = md.slice(3, end).trim();
  const body = md.slice(end + 4).replace(/^\n/, "");
  const fm = {};
  for (const line of raw.split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (!m) continue;
    let v = m[2].trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    fm[m[1]] = v;
  }
  return { fm, body };
}

/** Fix Apidog/markdown fence bugs that break MDX (glued fences, ```` nesting, orphans). */
function normalizeSourceMarkdown(md) {
  let out = md;
  // Fence glued to previous text: "...):```js" → "...):\n\n```js"
  out = out.replace(/([^\n`])(```+)/g, "$1\n\n$2");
  // Normalize 4+ backtick fences to triple (drops broken nesting)
  out = out.replace(/````+/g, "```");
  // Drop trailing orphan fence-only line after content
  out = out.replace(/\n```\s*$/g, "\n");
  // If still odd number of fence openers, close the last block
  const fenceLines = out.split("\n").filter((l) => l.trim().startsWith("```"));
  if (fenceLines.length % 2 === 1) out += "\n```\n";
  return out;
}

function escapeYaml(s) {
  const t = String(s ?? "").replace(/"/g, '\\"');
  return `"${t}"`;
}

function convertBody(body) {
  let out = body;

  // Remove RTL wrappers (Mintlify ar/ + rtl.js handle direction)
  out = out.replace(/<div\b[^>]*\bdir=["']rtl["'][^>]*>\s*/gi, "");
  out = out.replace(/\s*<\/div>\s*(?=\n---|\n#|$)/gi, "\n");

  // Transform only outside fenced code blocks
  out = mapOutsideCodeFences(out, (text) => {
    let t = text;

    // Supademo / iframe embeds — raw HTML breaks MDX
    t = t.replace(
      /<div\b[^>]*>\s*<iframe\b[^>]*src=["']([^"']+)["'][^>]*(?:\/>|><\/iframe>)\s*(?:<\/div>)?/gi,
      (_, src) =>
        `\n\n<Note>\n  عرض تفاعلي: [فتح العرض](${src})\n</Note>\n\n`,
    );
    t = t.replace(
      /<iframe\b[^>]*src=["']([^"']+)["'][^>]*(?:\/>|><\/iframe>)/gi,
      (_, src) =>
        `\n\n<Note>\n  عرض تفاعلي: [فتح العرض](${src})\n</Note>\n\n`,
    );

    // Bare <script> / <button> (not already in fences)
    t = t.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, (block) => {
      return `\n\n\`\`\`html\n${block.trim()}\n\`\`\`\n\n`;
    });
    t = t.replace(/<button\b[\s\S]*?<\/button>/gi, (block) => {
      return `\n\n\`\`\`html\n${block.trim()}\n\`\`\`\n\n`;
    });

    // Drop remaining HTML style="…" attrs (invalid in MDX)
    t = t.replace(/\sstyle=(["'])[\s\S]*?\1/gi, "");

    // Markdoc admonitions → Mintlify components
    t = t.replace(
      /\{%\s*admonition\s+type=["']info["']\s*%\}([\s\S]*?)\{%\s*\/admonition\s*%\}/gi,
      (_, inner) => `<Info>\n${inner.trim()}\n</Info>`,
    );
    t = t.replace(
      /\{%\s*admonition\s+type=["']warning["']\s*%\}([\s\S]*?)\{%\s*\/admonition\s*%\}/gi,
      (_, inner) => `<Warning>\n${inner.trim()}\n</Warning>`,
    );
    t = t.replace(
      /\{%\s*admonition\s+type=["']danger["']\s*%\}([\s\S]*?)\{%\s*\/admonition\s*%\}/gi,
      (_, inner) => `<Warning>\n${inner.trim()}\n</Warning>`,
    );
    t = t.replace(
      /\{%\s*admonition\s+type=["']success["']\s*%\}([\s\S]*?)\{%\s*\/admonition\s*%\}/gi,
      (_, inner) => `<Tip>\n${inner.trim()}\n</Tip>`,
    );
    t = t.replace(
      /\{%\s*admonition\s+type=["'][^"']+["']\s*%\}([\s\S]*?)\{%\s*\/admonition\s*%\}/gi,
      (_, inner) => `<Note>\n${inner.trim()}\n</Note>`,
    );

    // Escape WhatsApp/template vars {{1}} for MDX
    t = escapeMdxCurlyVarsInText(t);

    // Rewrite internal .md links
    t = t.replace(/\]\(([^)]+\.md)(#[^)]*)?\)/g, (full, link, hash = "") => {
      let p = link.trim();
      if (/^https?:\/\//i.test(p)) return full;
      p = p.replace(/^\.\//, "");
      p = p.replace(/^\/?(customers\/)?/, "");
      if (p.startsWith("../") || p.startsWith("./")) return full;
      if (p.endsWith(".md")) {
        return `](/ar/help-center/${p.replace(/\.md$/, "")}${hash})`;
      }
      return full;
    });

    return t;
  });

  return out.trim() + "\n";
}

function mapOutsideCodeFences(md, fn) {
  const parts = md.split(/(```[\s\S]*?```)/g);
  return parts.map((part) => (part.startsWith("```") ? part : fn(part))).join("");
}

/** Wrap bare {{…}} in backticks so MDX does not treat them as JS. */
function escapeMdxCurlyVarsInText(text) {
  const chunks = text.split(/(`[^`]*`)/g);
  return chunks
    .map((c) => {
      if (c.startsWith("`")) return c;
      return c.replace(/\{\{([^{}]+)\}\}/g, "`{{$1}}`");
    })
    .join("");
}

/** @deprecated kept name for callers — redirects */
function escapeMdxCurlyVars(md) {
  return mapOutsideCodeFences(md, escapeMdxCurlyVarsInText);
}

function resolveRelativeLinks(body, fromRelMd) {
  // fromRelMd like guides/inbox/doc-1889759.md
  const fromDir = path.posix.dirname(fromRelMd);
  return body.replace(/\]\(((\.\.\/|\.\/)[^)]+\.md)(#[^)]*)?\)/g, (full, link, _d, hash = "") => {
    const resolved = path.posix.normalize(path.posix.join(fromDir, link));
    const route = `/ar/help-center/${resolved.replace(/\.md$/, "")}`;
    return `](${route}${hash})`;
  });
}

function toMdx(relMd, sourceText, { locale }) {
  const normalized = normalizeSourceMarkdown(sourceText);
  const { fm, body } = stripFrontmatter(normalized);
  let title = fm.title || path.basename(relMd, ".md");
  let description = fm.description || title;
  // Clean EN stub descriptions
  description = description.replace(/\s*—\s*Arabic guide available via locale switcher\.?/i, "");

  let converted = convertBody(body);
  converted = resolveRelativeLinks(converted, relMd);

  // Drop duplicate H1 if it matches title (Mintlify shows page title)
  const h1 = converted.match(/^#\s+(.+)\n/);
  if (h1 && h1[1].replace(/[*_`]/g, "").trim() === title.replace(/[*_`]/g, "").trim()) {
    converted = converted.replace(/^#\s+.+\n+/, "");
  }

  const front = [
    "---",
    `title: ${escapeYaml(title)}`,
    `description: ${escapeYaml(description)}`,
    "---",
    "",
  ].join("\n");

  return front + converted;
}

function pageToNavPath(relMd, locale) {
  // guides/inbox/doc.md → ar/help-center/guides/inbox/doc
  const noExt = relMd.replace(/\.md$/, "");
  if (locale === "ar") {
    if (noExt === "index") return "ar/help-center/index";
    return `ar/help-center/${noExt}`;
  }
  if (noExt === "index") return "help-center/index";
  return `help-center/${noExt}`;
}

function sidebarToMintlifyGroups(tree, locale) {
  const groups = [];
  let startPages = [];

  function flushStart(label) {
    if (startPages.length) {
      groups.push({ group: label, pages: startPages });
      startPages = [];
    }
  }

  function mapItems(items) {
    const pages = [];
    for (const item of items) {
      if (item.type === "page") {
        pages.push(pageToNavPath(item.page, locale));
      } else if (item.type === "group") {
        pages.push({
          group: item.label || item.group,
          pages: mapItems(item.items),
        });
      }
    }
    return pages;
  }

  for (const item of tree) {
    if (item.type === "page") {
      startPages.push(pageToNavPath(item.page, locale));
    } else if (item.type === "group") {
      flushStart(locale === "ar" ? "ابدأ من هنا" : "Start here");
      groups.push({
        group: item.label || item.group,
        pages: mapItems(item.items),
      });
    }
  }
  flushStart(locale === "ar" ? "ابدأ من هنا" : "Start here");
  return groups;
}

function writePage(outRoot, relMd, content) {
  const outRel = relMd.replace(/\.md$/, ".mdx");
  const outPath = path.join(outRoot, outRel);
  ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, content, "utf8");
  return outPath;
}

function isEnStub(text) {
  return (
    /This Help Center article is available in \*\*Arabic\*\*/i.test(text) ||
    /available in Arabic/i.test(text) && text.length < 800
  );
}

function main() {
  if (!fs.existsSync(SRC_AR)) {
    console.error("Missing AR source:", SRC_AR);
    process.exit(1);
  }
  if (!fs.existsSync(SIDEBAR)) {
    console.error("Missing sidebar:", SIDEBAR);
    process.exit(1);
  }

  // Images
  if (!SKIP_IMAGES) {
    ensureDir(path.dirname(OUT_IMAGES));
    console.log("Copying images/help …");
    execSync(`rm -rf "${OUT_IMAGES}" && cp -R "${SRC_IMAGES}" "${OUT_IMAGES}"`, {
      stdio: "inherit",
    });
  }

  const tree = yamlSidebarToTree(fs.readFileSync(SIDEBAR, "utf8"));

  // Collect all page paths from sidebar
  const allPages = [];
  (function walk(items) {
    for (const it of items) {
      if (it.type === "page") allPages.push(it);
      if (it.type === "group") walk(it.items);
    }
  })(tree);

  let arWritten = 0;
  let enWritten = 0;
  let missingAr = [];
  let drafts = 0;

  for (const { page, label } of allPages) {
    const arPath = path.join(SRC_AR, page);
    if (!fs.existsSync(arPath)) {
      missingAr.push(page);
      continue;
    }
    const arSrc = fs.readFileSync(arPath, "utf8");
    if (/المحتوى قيد الإعداد/.test(arSrc) || /status:\s*draft/.test(arSrc)) {
      drafts++;
    }
    const mdx = toMdx(page, arSrc, { locale: "ar" });
    // Prefer sidebar label for title when frontmatter title is weak
    const { fm } = stripFrontmatter(arSrc);
    let finalMdx = mdx;
    if (label && (!fm.title || fm.title.trim() === fm.description?.trim())) {
      // keep converted; title already from fm
    }
    writePage(OUT_AR, page, finalMdx);
    arWritten++;

    // EN: only full bilingual pages (not stubs)
    if (EN_FULL_PAGES.has(page)) {
      const enPath = path.join(SRC_EN, page);
      if (fs.existsSync(enPath)) {
        const enSrc = fs.readFileSync(enPath, "utf8");
        if (!isEnStub(enSrc)) {
          let enMdx = toMdx(page, enSrc, { locale: "en" });
          // EN internal links → /help-center/...
          enMdx = enMdx.replace(
            /\]\(\/ar\/help-center\//g,
            "](/help-center/",
          );
          writePage(OUT_EN, page, enMdx);
          enWritten++;
        }
      }
    }
  }

  // Index pages
  const arIndexSrc = path.join(SRC_AR, "index.md");
  const enIndexSrc = path.join(SRC_EN, "index.md");
  if (fs.existsSync(arIndexSrc)) {
    writePage(OUT_AR, "index.md", toMdx("index.md", fs.readFileSync(arIndexSrc, "utf8"), { locale: "ar" }));
    arWritten++;
  }
  if (fs.existsSync(enIndexSrc)) {
    // Build richer EN hub that lists Arabic as primary + bilingual guides
    const enHub = `---
title: "Help Center"
description: "End-user guides for inbox, WhatsApp, automations, broadcasts, billing, and more."
---

The Help Center is for teams using Karzoun day to day — not for API integrations.

<Info>
  Most Help Center articles are in **Arabic**. Switch language to **عربي** for the full guide library, or open [مركز المساعدة](/ar/help-center).
</Info>

## Available in English

- [WhatsApp ads that open a chat](/help-center/guides/whatsapp/whatsapp-ctwa-ads)
- [WhatsApp calling](/help-center/guides/whatsapp/whatsapp-calling)
- [Email channels](/help-center/guides/channels/email-channels)

## Popular topics (Arabic)

- [مركز المحادثات](/ar/help-center/guides/inbox/doc-1889759)
- [البداية مع كرزون](/ar/help-center/guides/getting-started/doc-1861362)
- [قوالب رسائل واتساب](/ar/help-center/guides/whatsapp/templates/doc-1890476)
- [بناء رد آلي](/ar/help-center/guides/automations/flow-builder-1890495)
- [الرسائل الجماعية](/ar/help-center/guides/broadcasts/doc-1890617)
`;
    writePage(OUT_EN, "index.md", enHub);
    enWritten++;
  }

  // Enrich AR index if thin
  const arIndexOut = path.join(OUT_AR, "index.mdx");
  if (fs.existsSync(arIndexOut)) {
    let arIndex = fs.readFileSync(arIndexOut, "utf8");
    if (arIndex.length < 600) {
      arIndex = `---
title: "مركز المساعدة"
description: "أدلة المستخدم للبريد الوارد وواتساب والأتمتة والرسائل الجماعية والفوترة والمزيد."
---

مركز المساعدة موجّه للفرق التي تستخدم كرزون يومياً — وليس لتكاملات واجهة البرمجة.

## مواضيع شائعة

- [اهلا بك](/ar/help-center/guides/getting-started/doc-1861353)
- [انطلق مع كرزون](/ar/help-center/guides/getting-started/doc-1861362)
- [مركز المحادثات](/ar/help-center/guides/inbox/doc-1889759)
- [الرسائل الجماعية](/ar/help-center/guides/broadcasts/doc-1890617)
- [بناء أول رد آلي](/ar/help-center/guides/automations/flow-builder-1890495)
- [نظرة عامة على مدير الواتساب](/ar/help-center/guides/whatsapp/doc-1890487)
- [قوالب الرسائل](/ar/help-center/guides/whatsapp/templates/doc-1890476)
- [الإعدادات والفوترة](/ar/help-center/guides/settings/doc-2279114)

استخدم القائمة الجانبية لاستعراض كل الأقسام.
`;
      fs.writeFileSync(arIndexOut, arIndex, "utf8");
    }
  }

  const arGroups = sidebarToMintlifyGroups(tree, "ar");
  ensureDir(path.dirname(NAV_FRAGMENT));
  fs.writeFileSync(NAV_FRAGMENT, JSON.stringify(arGroups, null, 2), "utf8");

  // Patch docs.json — replace Help Center tab groups for AR and EN
  const docsJsonPath = path.join(MINT, "docs.json");
  const docs = JSON.parse(fs.readFileSync(docsJsonPath, "utf8"));

  for (const lang of docs.navigation.languages) {
    if (lang.language === "ar") {
      const tab = lang.tabs.find(
        (t) => t.tab === "مركز المساعدة" || t.icon === "life-buoy",
      );
      if (tab) tab.groups = arGroups;
    }
    if (lang.language === "en") {
      const tab = lang.tabs.find(
        (t) => t.tab === "Help Center" || t.icon === "life-buoy",
      );
      if (tab) {
        tab.groups = [
          {
            group: "Help Center",
            pages: [
              "help-center/index",
              "help-center/guides/whatsapp/whatsapp-ctwa-ads",
              "help-center/guides/whatsapp/whatsapp-calling",
              "help-center/guides/channels/email-channels",
            ],
          },
        ];
      }
    }
  }

  fs.writeFileSync(docsJsonPath, JSON.stringify(docs, null, 2) + "\n", "utf8");

  console.log(
    JSON.stringify(
      {
        arWritten,
        enWritten,
        sidebarPages: allPages.length,
        draftsIncluded: drafts,
        missingAr,
        navGroups: arGroups.length,
        images: SKIP_IMAGES ? "skipped" : OUT_IMAGES,
      },
      null,
      2,
    ),
  );
}

main();
