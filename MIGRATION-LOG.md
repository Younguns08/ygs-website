# Migration Log — ygstudio.ca: Framer → Next.js on Vercel

Source of truth: https://enchanted-side-407924.framer.app (Framer staging, read-only).
Live domain during build: ygstudio.ca stays on the Vercel proxy → Framer (Pete's call, 2026-07-02).
Cutover: Phase 9 only, written approval required.

## Page status

| Page            | Rebuilt                                | Visual diff | Links       | Status                         |
| --------------- | -------------------------------------- | ----------- | ----------- | ------------------------------ |
| / (home)        | yes (first pass + measured hero/stats) | not yet run | not yet run | in progress                    |
| /approach       | no                                     | —           | —           | pending                        |
| /schedule       | no                                     | —           | —           | pending                        |
| /about-us       | no                                     | —           | —           | pending                        |
| /outcomes       | no                                     | —           | —           | pending                        |
| /gallery        | no                                     | —           | —           | pending                        |
| /blog           | no                                     | —           | —           | pending                        |
| /blog/[slug] ×7 | no                                     | —           | —           | pending (MDX, Phase 7)         |
| /lets-chat      | no                                     | —           | —           | pending (Lark iframe, Phase 4) |

## Decisions

- **2026-07-02** Keep existing repo (scaffold + homepage + reference captures carry
  forward); retrofit all spec quality gates. — Pete
- **2026-07-02** Live domain stays on the Vercel proxy during the build; no DNS
  changes until Phase 9. — Pete
- **2026-07-02** Reference screenshots captured at the spec's 390/768/1024/1440
  plus 1512, because Framer's xl breakpoint starts at 1496 and the spec's widths
  would never exercise that tier.
- **2026-07-02** Contact form today is a Lark share-form **iframe** on /lets-chat
  (verified in source). Phase 4 wiring choice (native form → Bitable API vs keep
  iframe) not yet decided with Pete.
- **2026-07-02** Measured typography shows the live site uses Inter Variable +
  Source Sans 3, not the brand-kit faces (Cooper Hewitt/Clear Sans headings).
  1:1 follows what is live. Brand-kit discrepancy flagged to Pete separately.

## Incidents

- **2026-07-02** ygstudio.ca 404'd ~13:40–13:59 UTC: the proxy Vercel project had
  a leftover GitHub integration, so rebuild pushes auto-deployed over it.
  Fixed: `vercel git disconnect` on the proxy project; repo now deploys only to
  `ygs-rebuild`. Recovery runbook: `cd ygstudio-proxy && vercel deploy --prod`.

## Open questions

- Phase 4: native form → Lark Bitable API (needs Lark app credentials from Pete)
  or keep iframe?
- Hero video: is trimming the 37s loop acceptable at optimization time?
- Faculty-quote carousel on home: rotation timing to match original (measure).
