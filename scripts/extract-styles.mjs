// Measures exact computed styles from the original Framer site so the rebuild
// can use measured values instead of approximations.
// Usage: node scripts/extract-styles.mjs [path] > reference/styles-home.json
import { chromium } from "playwright-core";

const BASE = "https://enchanted-side-407924.framer.app";
const path = process.argv[2] || "/";

const browser = await chromium.launch({ channel: "chrome" });
const ctx = await browser.newContext({ viewport: { width: 1512, height: 900 } });
const p = await ctx.newPage();
await p.goto(BASE + path, { waitUntil: "load", timeout: 60000 });
await p.waitForTimeout(3000);

// Scroll through to force all entrance animations to their final state.
await p.evaluate(async () => {
  const step = window.innerHeight / 2;
  for (let y = 0; y < document.body.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 120));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 800));
});

const data = await p.evaluate(() => {
  const PROPS = [
    "fontFamily", "fontSize", "fontWeight", "fontStyle", "lineHeight",
    "letterSpacing", "textTransform", "textAlign", "color",
    "backgroundColor", "borderRadius", "padding", "margin", "gap",
    "maxWidth", "width", "height", "boxShadow", "opacity",
  ];
  const pick = (el) => {
    const cs = getComputedStyle(el);
    const out = {};
    for (const p of PROPS) out[p] = cs[p];
    return out;
  };
  const trim = (s) => (s || "").replace(/\s+/g, " ").trim().slice(0, 80);

  const results = [];
  // Every heading and visible text block, with geometry
  const els = document.querySelectorAll("h1,h2,h3,h4,p,a,li,blockquote,figcaption,span[data-framer-name],div[data-framer-name]");
  const seen = new Set();
  for (const el of els) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    const text = trim(el.textContent);
    if (!text) continue;
    const key = el.tagName + "|" + text.slice(0, 40);
    if (seen.has(key)) continue; // skip breakpoint duplicates
    seen.add(key);
    results.push({
      tag: el.tagName.toLowerCase(),
      framerName: el.getAttribute("data-framer-name") || undefined,
      text,
      absTop: Math.round(r.top + window.scrollY),
      w: Math.round(r.width),
      styles: pick(el),
    });
  }
  return results;
});

console.log(JSON.stringify(data, null, 1));
await browser.close();
