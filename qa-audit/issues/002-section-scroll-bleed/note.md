# Issue 002: Section scroll centering causes content bleed

**Severity:** P1  
**Section:** `#socials`, `#skills`  
**Viewport:** Desktop + Mobile

## Observed

- **Desktop:** Navigating to Socials shows Skills "INFRA & DEPLOY" tool tiles in the top portion of the screen above "Let's Connect".
- **Mobile:** Projects carousel content is visible alongside Skills when scrolled to `#skills`.

## Expected

Each section should feel visually distinct when navigated to via navbar. Users should see the target section's content dominate the viewport.

## Root cause

`scrollElementToViewportCenter()` in `section-scroll.ts` aligns the section title's vertical center with the viewport center. For full-screen stacked sections, this inherently shows ~50% of the adjacent section.

Additionally, `Skills.tsx` uses an inner scroll container (`overflow-y-auto`) within a single-screen `Section`, packing more content at the section boundary.

## Suggested fix

```ts
// Option A: scroll to section top with navbar offset
container.scrollTo({
  top: container.scrollTop + (targetRect.top - navbarHeight - padding),
  behavior,
});
```

Or use `scrollIntoView({ block: 'start' })` with `scroll-margin-top` on section ids.

## Files

- `components/layout/section-scroll.ts`
- `components/sections/Skills.tsx` (inner overflow)
