# Issue 005: Contact placeholder text fails contrast

**Severity:** P1  
**Section:** `#contact`  
**Viewport:** Desktop 1440×900

## Observed

The placeholder heading uses `text-muted-foreground/50` — approximately 50% opacity muted text on a light grid background. The word "Contact" is barely legible.

## Expected

Minimum WCAG AA contrast ratio of 4.5:1 for normal text (3:1 for large text).

## Suggested fix

Short term (if keeping placeholder):

```tsx
// SectionPlaceholder.tsx
className="... text-muted-foreground sm:text-4xl"  // remove /50
```

Long term: implement real Contact section (#001) with full-opacity `text-foreground` heading via `SectionHeader`.

## Files

- `components/sections/SectionPlaceholder.tsx` (line 21)
