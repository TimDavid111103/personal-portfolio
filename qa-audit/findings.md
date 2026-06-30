# Visual QA Findings — 2026-06-30

**URL:** http://localhost:3000  
**Tool:** Playwright CLI (`npm run qa:audit`)  
**Viewports:** Desktop 1440×900, Mobile 375×812  
**Browser:** Chromium (headed)  
**Console errors:** None

## Summary

| Severity | Count | Status |
|----------|-------|--------|
| P0 — Broken / incomplete | 1 | **Fixed** (#001) |
| P1 — Layout / UX issues | 4 | **Fixed** (#002–005) |
| P2 — Polish / content | 2 | **Fixed** (#007); Open (#006 email) |
| Pass 2 — Animation / scroll | 4 | **Fixed** (#008–011) |

> Re-audited 2026-06-30 after fixes. Pass 3 after React Bits integration — see `desktop/` and `mobile/`.

---

## Pass 2 — Animation, scroll & responsiveness (2026-06-30)

### [#008] Hero name clipped during BlurText entrance — **FIXED**

- **Observed:** "Tim-Luther David" top edge clipped on desktop.
- **Fix:** Added `padding-block` on `.blur-text` / `.split-parent`; hero section uses `pt-2` and `items-start` on mobile.

### [#009] Adjacent section visible when scrolling to hash targets — **FIXED**

- **Observed:** Featured Projects visible at bottom of hero; Skills tiles above Socials.
- **Fix:** `section-scroll.ts` now scrolls the parent `<section>` top (not the `#id` element) below the navbar.

### [#010] Socials heading clipped under navbar on mobile — **FIXED**

- **Observed:** "Let's Connect" partially hidden on 375px viewport.
- **Fix:** Section-level scroll alignment + `scroll-margin-top` on `#main-scroll section`.

### [#011] Static entrance animations / no micro-interactions — **FIXED**

- **Fix:** Integrated [React Bits](https://reactbits.dev/get-started/introduction) components:
  - `ShinyText` — hero role subtitle
  - `AnimatedContent` via `ScrollAnimate` — section content slide-up reveals
  - `SpotlightCard` — social link cards with cursor spotlight
  - `Magnet` via `MagnetHover` — navbar CTA + contact button
  - `StaggerItems` — staggered social card entrance
  - Skill tag hover lift transitions

**Installed via:** `npx shadcn@latest add https://reactbits.dev/r/<Component>-TS-TW`

---

## P0 — Broken / incomplete

### [#001] Contact section is an unfinished placeholder — **FIXED**

- **Resolution:** Added `components/sections/Contact.tsx` with SectionHeader, mailto CTA, and email display. Replaced `SectionPlaceholder` in `app/page.tsx`.
- **Screenshot:** `desktop/05-contact.png`

---

## P1 — Layout / UX issues

### [#002] Section scroll centering causes content bleed between sections — **FIXED**

- **Resolution:** Changed `section-scroll.ts` to top-align section titles below the navbar (`scrollElementToSectionStart`) instead of viewport-centering.
- **Screenshot:** `desktop/04-socials.png` (post-fix)

### [#003] Projects carousel has no navigation affordance on mobile — **FIXED**

- **Resolution:** Carousel prev/next buttons now visible on all breakpoints; added `px-10` mobile gutter so arrows don't overlap card content.
- **Screenshot:** `mobile/02-projects.png` (post-fix)

### [#004] Mobile Projects view clips section header — **FIXED**

- **Resolution:** Added `pt-14` top padding on Projects section; scroll alignment fix (#002) also helps.

### [#005] Contact placeholder text fails contrast requirements — **FIXED**

- **Resolution:** Superseded by real Contact section with full-opacity `SectionHeader` typography.

---

## P2 — Polish / content

### [#006] Placeholder email address in site config — **OPEN**

- **Observed:** `content/site.json` → `contact.email` is still `hello@example.com`.
- **Action needed:** Replace with your real email before deploying.

### [#007] Skills tabs stretch full width on mobile — **FIXED**

- **Resolution:** Changed `TabsList` from `w-full` to `w-fit`.

---

## Screenshots index

| File | Section | Viewport |
|------|---------|----------|
| `desktop/01-hero.png` | Hero | 1440×900 |
| `desktop/02-projects.png` | Projects | 1440×900 |
| `desktop/03-skills.png` | Skills | 1440×900 |
| `desktop/04-socials.png` | Socials | 1440×900 |
| `desktop/05-contact.png` | Contact | 1440×900 |
| `mobile/01-hero.png` | Hero | 375×812 |
| `mobile/02-projects.png` | Projects | 375×812 |
| `mobile/03-skills.png` | Skills | 375×812 |
| `mobile/04-socials.png` | Socials | 375×812 |
| `mobile/05-contact.png` | Contact | 375×812 |

## React Bits components in repo

| Component | Path | Used in |
|-----------|------|---------|
| BlurText | `components/BlurText.tsx` | Hero, SectionHeader |
| FadeContent | `components/FadeContent.tsx` | (legacy — prefer ScrollAnimate) |
| GlareHover | `components/GlareHover.tsx` | Projects, Contact |
| AnimatedContent | `components/AnimatedContent.tsx` | via `ScrollAnimate` |
| ShinyText | `components/ShinyText.tsx` | Hero role |
| Magnet | `components/Magnet.tsx` | via `MagnetHover` |
| SpotlightCard | `components/SpotlightCard.tsx` | Socials |
| SplitText | `components/SplitText.tsx` | available for future use |
| ScrollReveal | `components/ScrollReveal.tsx` | available for future use |

---

```bash
npm run dev          # ensure localhost:3000
npm run qa:audit     # headed
npm run qa:audit:headless
```
