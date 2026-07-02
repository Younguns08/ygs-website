// Captures full-page reference screenshots of the published Framer site.
// These are the visual acceptance targets for the 1:1 rebuild.
// Usage: node scripts/capture-reference.mjs [pageSlug]
import { chromium } from "playwright-core";
import { mkdirSync } from "node:fs";

const BASE = "https://enchanted-side-407924.framer.app";
const OUT = "reference/screens";

const PAGES = [
  { slug: "home", path: "/" },
  { slug: "approach", path: "/approach" },
  { slug: "schedule", path: "/schedule" },
  { slug: "about-us", path: "/about-us" },
  { slug: "outcomes", path: "/outcomes" },
  { slug: "gallery", path: "/gallery" },
  { slug: "blog", path: "/blog" },
  { slug: "lets-chat", path: "/lets-chat" },
  {
    slug: "blog-post",
    path: "/blog/young-guns-collective-2024-exhibition",
  },
];

// Framer breakpoints: >=1496 / 1200-1495 / 810-1199 / <=809
const VIEWPORTS = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "tablet-768", width: 768, height: 900 },
  { name: "desktop-xl", width: 1512, height: 900 },
  { name: "desktop", width: 1280, height: 800 },
  { name: "tablet", width: 1024, height: 800 },
  { name: "mobile", width: 390, height: 844 },
];

const only = process.argv[2];
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });

for (const page of PAGES) {
  if (only && page.slug !== only) continue;
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });
    const p = await ctx.newPage();
    try {
      // networkidle never fires on pages with looping video — use load + settle.
      await p.goto(BASE + page.path, { waitUntil: "load", timeout: 60000 });
      await p.waitForTimeout(3000);

      // Scroll through the page to trigger Framer's in-view reveal animations,
      // then return to top so the full-page capture shows everything revealed.
      await p.evaluate(async () => {
        const step = window.innerHeight / 2;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 800));
      });

      const file = `${OUT}/${page.slug}--${vp.name}.png`;
      await p.screenshot({ path: file, fullPage: true });
      console.log("captured", file);
    } catch (err) {
      console.error("FAILED", page.slug, vp.name, err.message.split("\n")[0]);
    }
    await ctx.close();
  }
}

await browser.close();
