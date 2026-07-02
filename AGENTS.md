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

GitHub `Younguns08/ygs-website` → Vercel (project TBD — do NOT deploy to the
existing `ygs-website` Vercel project; that one proxies Framer and holds the
live ygstudio.ca domain until Pete approves cutover).
