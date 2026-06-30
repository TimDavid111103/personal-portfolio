# Issue 001: Contact section is an unfinished placeholder

**Severity:** P0  
**Section:** `#contact`  
**Viewport:** All

## Observed

The Contact section shows only a faint centered "Contact" heading. The navbar "Get In Touch" button links here but there is no contact form, email link, or descriptive copy.

## Expected

A fully designed Contact section using the content already defined in `content/site.json`:

```json
"contact": {
  "heading": "Ready to Build Something Amazing?",
  "description": "Have a project in mind or just want to say hello? ...",
  "buttonLabel": "Get In Touch",
  "email": "hello@example.com"
}
```

## Suggested fix

1. Create `components/sections/Contact.tsx` modeled after `Socials.tsx`.
2. Replace `<SectionPlaceholder id="contact" title="Contact" />` in `app/page.tsx`.
3. Update `hello@example.com` to a real address.

## Files

- `app/page.tsx` (line 29)
- `components/sections/SectionPlaceholder.tsx` (current implementation)
- `content/site.json` (unused contact data)
