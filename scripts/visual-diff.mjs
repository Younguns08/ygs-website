// Visual regression: captures the local build at the acceptance breakpoints,
// pixel-diffs each capture against reference/screens/, reports % difference.
// Per-page definition of done: < 1% at every breakpoint (AGENTS.md).
//
// Usage: node scripts/visual-diff.mjs <slug> [--base http://localhost:3311]
//   e.g. node scripts/visual-diff.mjs home
// Writes diff images to reference/diff/ and prints a report row per breakpoint.
import { chromium } from "playwright-core";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import jpeg from "jpeg-js";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";

const slug = process.argv[2];
if (!slug) {
  console.error("usage: node scripts/visual-diff.mjs <slug> [--base URL]");
  process.exit(1);
}
const baseIdx = process.argv.indexOf("--base");
const BASE = baseIdx > -1 ? process.argv[baseIdx + 1] : "http://localhost:3311";

const ROUTES = {
  home: "/",
  approach: "/approach",
  schedule: "/schedule",
  "about-us": "/about-us",
  outcomes: "/outcomes",
  gallery: "/gallery",
  blog: "/blog",
  "lets-chat": "/lets-chat",
  "blog-post": "/blog/young-guns-collective-2024-exhibition",
};

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 900 },
  { name: "tablet", width: 1024, height: 800 },
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-xl", width: 1512, height: 900 },
];

mkdirSync("reference/diff", { recursive: true });
mkdirSync("reference/build", { recursive: true });

// References are stored as JPG (repo size); decode in-process (no canvas —
// large full-page images OOM when round-tripped through the browser).
function loadRefAsPng(refPath) {
  const raw = jpeg.decode(readFileSync(refPath), { useTArray: true, maxMemoryUsageInMB: 2048 });
  const png = new PNG({ width: raw.width, height: raw.height });
  png.data = Buffer.from(raw.data.buffer, raw.data.byteOffset, raw.data.length);
  return png;
}

const browser = await chromium.launch({
  channel: process.env.CI ? undefined : "chrome",
});

const rows = [];
for (const vp of VIEWPORTS) {
  const refPath = `reference/screens/${slug}--${vp.name}.jpg`;
  const refPathPng = refPath.replace(/\.jpg$/, ".png");
  const refFile = existsSync(refPath) ? refPath : existsSync(refPathPng) ? refPathPng : null;
  if (!refFile) {
    rows.push({ vp: vp.name, note: "no reference capture" });
    continue;
  }

  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const p = await ctx.newPage();
  await p.goto(BASE + ROUTES[slug], { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(2500);
  await p.evaluate(async () => {
    const step = window.innerHeight / 2;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 900));
  });
  const buildPath = `reference/build/${slug}--${vp.name}.png`;
  await p.screenshot({ path: buildPath, fullPage: true });
  await ctx.close();

  const ref = refFile.endsWith(".png")
    ? PNG.sync.read(readFileSync(refFile))
    : loadRefAsPng(refFile);
  const build = PNG.sync.read(readFileSync(buildPath));

  // Compare on the union canvas — height mismatch counts as difference.
  const W = Math.max(ref.width, build.width);
  const H = Math.max(ref.height, build.height);
  const pad = (src) => {
    const out = new PNG({ width: W, height: H, fill: true });
    PNG.bitblt(src, out, 0, 0, src.width, src.height, 0, 0);
    return out;
  };
  const a = pad(ref);
  const b = pad(build);
  const diff = new PNG({ width: W, height: H });
  const mismatched = pixelmatch(a.data, b.data, diff.data, W, H, { threshold: 0.12 });
  const pct = (mismatched / (W * H)) * 100;
  writeFileSync(`reference/diff/${slug}--${vp.name}.png`, PNG.sync.write(diff));
  rows.push({
    vp: vp.name,
    pct: pct.toFixed(2) + "%",
    heights: `${ref.height} ref / ${build.height} build`,
    pass: pct < 1 ? "PASS" : "fail",
  });
}

await browser.close();
console.log(`\nVisual diff — ${slug}`);
for (const r of rows) {
  console.log(
    `  ${r.vp.padEnd(14)} ${r.note ?? `${String(r.pct).padStart(7)}  (${r.heights})  ${r.pass}`}`,
  );
}
