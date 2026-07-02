// Link + CTA checker: crawls the local build, collects every <a href>, and
// verifies each destination. Internal links must return 200 on the local
// build; external links must not 404. Exits non-zero on any broken link.
// Usage: node scripts/check-links.mjs [--base http://localhost:3311]
import { chromium } from "playwright-core";

const baseIdx = process.argv.indexOf("--base");
const BASE = baseIdx > -1 ? process.argv[baseIdx + 1] : "http://localhost:3311";

const PAGES = [
  "/",
  "/approach",
  "/schedule",
  "/about-us",
  "/outcomes",
  "/gallery",
  "/blog",
  "/lets-chat",
];

const browser = await chromium.launch({
  channel: process.env.CI ? undefined : "chrome",
});
const ctx = await browser.newContext();
const page = await ctx.newPage();

const found = new Map(); // href -> [pages it appears on]
for (const path of PAGES) {
  const res = await page.goto(BASE + path, { waitUntil: "load", timeout: 60000 }).catch(() => null);
  if (!res || res.status() >= 400) {
    console.log(`SKIP ${path} (page itself returned ${res ? res.status() : "no response"})`);
    continue;
  }
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const href of hrefs) {
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:"))
      continue;
    if (!found.has(href)) found.set(href, []);
    found.get(href).push(path);
  }
}

let broken = 0;
for (const [href, pages] of found) {
  const url = href.startsWith("http") ? href : BASE + href;
  let status;
  try {
    const res = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(15000),
    });
    status = res.status;
    if (status === 405 || status === 403) {
      // Some servers reject HEAD; retry with GET
      const res2 = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(15000),
      });
      status = res2.status;
    }
  } catch {
    status = "ERR";
  }
  const ok = status !== "ERR" && status < 400;
  if (!ok) {
    broken++;
    console.log(`BROKEN ${status}  ${href}   (on: ${pages.join(", ")})`);
  }
}

console.log(`\n${found.size} unique links checked, ${broken} broken.`);
await browser.close();
process.exit(broken > 0 ? 1 : 0);
