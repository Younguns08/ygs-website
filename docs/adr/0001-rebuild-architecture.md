# ADR 0001 — Rebuild architecture and key choices

Date: 2026-07-02 · Status: accepted

## Context

ygstudio.ca must move off Framer to a codebase editable via Claude Code,
versioned on GitHub, deployed on Vercel, reproducing the Framer site 1:1.
Two prior approaches failed and are prohibited: mirroring Framer's generated
HTML (unmaintainable, breaks without its JS) and proxying Framer (keeps the
dependency we're removing; acceptable only as the temporary live-domain holder).

## Decisions

1. **Next.js 16 App Router + TypeScript strict + Tailwind v4.** Vercel-native,
   static-prerendered pages, huge ecosystem; Tailwind keeps styles co-located
   and NL-editable. Design tokens live once in `app/globals.css` `@theme`.
2. **Fonts via next/font** (self-hosted at build): Inter Variable + Source
   Sans 3 — the fonts the live site actually renders (measured, see
   `reference/styles-home.json`), not the brand-kit faces. Cooper Hewitt kept
   as local woff2 for inner-page display banners.
3. **Reference-driven 1:1:** full-page screenshots of the Framer staging site
   (`reference/screens/`) are the acceptance targets; a measured-styles
   extractor (`scripts/extract-styles.mjs`) supplies exact computed values.
   Visual regression = pixelmatch < 1% per page per breakpoint.
4. **Animations in CSS/small client components** (Reveal, SplitText,
   HeroVideo) instead of importing framer-motion wholesale: the original's
   entrance effects are simple fade/slide/stagger patterns; CSS keeps the
   bundle small. Revisit if a page needs genuinely complex motion.
5. **Media strategy:** hero video re-encoded (37 MB → 7 MB), poster-first
   lazy load; images via next/image AVIF/WebP. Perf budget: ≤ 1.5 MB homepage
   first load on mobile (measured 1.27 MB).
6. **Two Vercel projects:** `ygs-rebuild` (this repo, preview) and
   `ygs-website` (Framer proxy, holds live domain until Phase 9 cutover).
   The repo's git integration connects **only** to `ygs-rebuild` — connecting
   it to the proxy caused the 2026-07-02 outage (MIGRATION-LOG.md).
