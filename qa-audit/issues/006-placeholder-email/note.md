# Issue 006: Placeholder email in site config

**Severity:** P2  
**Section:** N/A (content)  
**Viewport:** N/A

## Observed

`content/site.json` contains `"email": "hello@example.com"` in the contact block. This data is not yet rendered but will surface once Contact is built.

## Suggested fix

Replace with the real contact email before deploying.

## Files

- `content/site.json` (line 53)
