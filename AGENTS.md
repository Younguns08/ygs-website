<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# YGS Website — Young Guns Studio

Ground-up Next.js rebuild of ygstudio.ca. The goal is a pixel-accurate ("1:1")
reproduction of the Framer site it replaces, but fast, light, accessible, and
editable in plain code.

## Visual reference (the acceptance targets)

- `reference/screens/` holds full-page screenshots of the original Framer site
  at 4 widths (1512 / 1280 / 1024 / 390 — matching Framer's breakpoints).
  Every rebuilt page must match its screenshots before it ships.
- Re-capture with `node scripts/capture-reference.mjs [slug]` (needs the
  Framer site up at enchanted-side-407924.framer.app).
- Full page content/markup reference lives outside this repo at
  `../ygstudio-mirror/www.ygstudio.ca/` (static capture of the Framer HTML —
  source of truth for copy, image assets, and exact CSS values).

## Brand (see globals.css for tokens)

- Colors: `ygs-red` rgb(211,88,96) · `ygs-navy` rgb(52,52,89) ·
  `ygs-blue` rgb(96,141,164) · `ygs-pink` rgb(229,183,178). No new colors.
- Type: Cooper Hewitt (titles, ALL CAPS, Bold Italic priority) ·
  Clear Sans (headings) · Source Sans Pro (body). All self-hosted in
  `public/fonts/`, wired via `app/fonts.ts` CSS variables
  (`--font-title` / `--font-heading` / `--font-sans` in Tailwind).

## Performance budget (hard rules)

- Homepage first load ≤ 1.5 MB on mobile (the old Framer site was ~20 MB).
- Hero video: lazy-loaded, poster first; use the optimized encode, never the
  37 MB original.
- Images: next/image only, AVIF/WebP, properly sized per breakpoint.
- No client JS unless a component genuinely needs interactivity.

## Site pages

/ · /approach · /schedule · /about-us · /outcomes · /gallery · /blog ·
/blog/[slug] · /lets-chat — nav and footer are shared components; edit once.

## Deployment

GitHub `Younguns08/ygs-website` → Vercel project `ygs-rebuild`
(https://ygs-rebuild.vercel.app). Do NOT deploy to the `ygs-website` Vercel
project — that one proxies Framer and holds the live ygstudio.ca domain until
Pete approves cutover (Phase 9, written go-ahead only).

## Non-negotiables (from Pete's migration spec — binding)

1. Framer is read-only. Never modify, republish over, or delete anything in it.
2. No GoDaddy DNS changes until final cutover, and only with Pete's written OK.
3. Never deploy to the production domain during the build. Preview URLs only.
4. No band-aids or "temporary" fixes. Blocked? Stop and ask Pete.
5. Feature branches + small reviewable commits. No force-pushing main.
6. One page at a time; a page is not done until it passes the checks below.

## Per-page definition of done

- Visual regression: pixel-diff vs `reference/screens/` at 390 / 768 / 1024 /
  1440 (+1512 for Framer's xl tier) is **< 1%**, or Pete accepted the diff in
  writing (record it in MIGRATION-LOG.md).
- Every link and CTA on the page resolves to the same destination as the
  original. Zero broken links (`npm run test:links`).
- Animations match the captured timing/easing, or the difference is approved.
- Conventional commit per page; MIGRATION-LOG.md updated.

## Code standards

- TypeScript strict; zero `any`, zero `@ts-ignore` without a justification
  comment. Server Components by default; `"use client"` only at the smallest
  interactive leaf.
- Design tokens only — every brand color/size exists exactly once
  (`app/globals.css` @theme). No hex values or magic numbers in components.
- `/app` routes · `/components` UI · `/lib` logic/integrations · `/content` MDX.
- Env vars validated at boot in `lib/env.ts` (zod). Secrets only in Vercel env.
- Lint/format/typecheck run pre-commit (husky + lint-staged) and in CI; CI
  also runs the Playwright suite. Red CI = no merge.
