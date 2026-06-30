# Issue 003: Projects carousel has no mobile navigation affordance

**Severity:** P1  
**Section:** `#projects`  
**Viewport:** Mobile (375×812)

## Observed

Only one project card is fully visible. A narrow slice of the second card appears on the right edge. Carousel arrow buttons are hidden below the `sm` breakpoint:

```tsx
<CarouselPrevious className="left-0 hidden border-border bg-background/90 sm:flex" />
<CarouselNext className="right-0 hidden border-border bg-background/90 sm:flex" />
```

## Expected

Mobile users should have a clear way to discover and navigate additional projects (swipe hint, dots, or visible arrows).

## Suggested fix

- Add `CarouselDots` or show smaller nav buttons on mobile (`flex sm:flex` with reduced size).
- Adjust card basis: `basis-[min(88vw,26rem)]` → `basis-[85vw]` so ~15% of next card peeks through more obviously.

## Files

- `components/sections/Projects.tsx` (lines 147-154)
