# Issue 004: Mobile Projects view clips section header

**Severity:** P1  
**Section:** `#projects`  
**Viewport:** Mobile (375×812)

## Observed

When the projects section is in view:
- Hero skill tags from the previous section remain visible at the top.
- The "Featured Projects" subtitle is partially hidden behind the first project card.

## Expected

The section header (title + subtitle) should be fully visible when the user navigates to Projects.

## Suggested fix

1. Add mobile-specific top padding on the Projects section: `className="items-start py-8 sm:py-10"` → include `pt-12` on small screens.
2. Adjust scroll target to account for header block height — scroll to the section wrapper top rather than centering `#projects` id.
3. Consider reducing hero skill tag count or collapsing tags on mobile to shorten the Hero section.

## Files

- `components/sections/Projects.tsx`
- `components/sections/Hero.tsx`
- `components/layout/section-scroll.ts`
