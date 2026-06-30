# Visual QA Audit

Automated visual QA for the personal portfolio using [Playwright CLI](https://playwright.dev/docs/getting-started-cli).

## Run a new audit

```bash
# Ensure dev server is running
npm run dev

# Headed pass (watch the browser)
npm run qa:audit

# Headless pass (CI / unattended)
npm run qa:audit:headless
```

## Structure

- `findings.md` — master issue list with severity and fix notes
- `desktop/` — 1440×900 screenshots per section
- `mobile/` — 375×812 screenshots per section
- `issues/` — per-issue screenshot + `note.md` pairs

## Session

Named session `portfolio` keeps the browser open across CLI commands:

```bash
npx playwright-cli -s=portfolio open http://localhost:3000 --headed --persistent
```
