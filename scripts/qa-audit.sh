#!/usr/bin/env bash
# Visual QA pass: screenshots each section at desktop + mobile viewports.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

BASE_URL="${QA_BASE_URL:-http://localhost:3000}"
SESSION="${PLAYWRIGHT_CLI_SESSION:-portfolio-qa}"
HEADED="${QA_HEADED:-1}"
AUDIT_DIR="$ROOT/qa-audit"
DESKTOP_DIR="$AUDIT_DIR/desktop"
MOBILE_DIR="$AUDIT_DIR/mobile"
ISSUES_DIR="$AUDIT_DIR/issues"
CLI=(npx playwright-cli -s="$SESSION")

mkdir -p "$DESKTOP_DIR" "$MOBILE_DIR" "$ISSUES_DIR"

echo "→ QA audit against $BASE_URL (session: $SESSION, headed: $HEADED)"

# Clean up any prior session
"${CLI[@]}" close 2>/dev/null || true

if [[ "$HEADED" == "1" ]]; then
  "${CLI[@]}" open "$BASE_URL" --headed
else
  "${CLI[@]}" open "$BASE_URL"
fi
sleep 2

capture_section() {
  local name="$1"
  local out_dir="$2"
  echo "  • $name → $out_dir/${name}.png"
  "${CLI[@]}" screenshot --filename="$out_dir/${name}.png"
}

scroll_to_section() {
  local hash="$1"
  "${CLI[@]}" eval "() => {
    const container = document.getElementById('main-scroll');
    const el = document.querySelector('${hash}');
    if (!container || !el) return;
    const section = el.closest('section') ?? el;
    const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 64;
    const padding = 32;
    const delta = section.getBoundingClientRect().top - (nav + padding);
    container.scrollTo({ top: container.scrollTop + delta, behavior: 'instant' });
  }"
  sleep 0.8
}

echo "→ Desktop viewport (1440×900)"
"${CLI[@]}" resize 1440 900
sleep 0.5

scroll_to_section "#home"
capture_section "01-hero" "$DESKTOP_DIR"

scroll_to_section "#projects"
capture_section "02-projects" "$DESKTOP_DIR"

scroll_to_section "#skills"
capture_section "03-skills" "$DESKTOP_DIR"

scroll_to_section "#socials"
capture_section "04-socials" "$DESKTOP_DIR"

scroll_to_section "#contact"
capture_section "05-contact" "$DESKTOP_DIR"

echo "→ Mobile viewport (375×812)"
"${CLI[@]}" resize 375 812
sleep 0.5

scroll_to_section "#home"
capture_section "01-hero" "$MOBILE_DIR"

scroll_to_section "#projects"
capture_section "02-projects" "$MOBILE_DIR"

scroll_to_section "#skills"
capture_section "03-skills" "$MOBILE_DIR"

scroll_to_section "#socials"
capture_section "04-socials" "$MOBILE_DIR"

scroll_to_section "#contact"
capture_section "05-contact" "$MOBILE_DIR"

echo "→ Console errors"
"${CLI[@]}" console error > "$AUDIT_DIR/console-errors.txt" 2>&1 || true

echo "→ Page snapshot"
"${CLI[@]}" snapshot --filename="$AUDIT_DIR/page-snapshot.yml"

echo "→ Done. Screenshots in $AUDIT_DIR"
"${CLI[@]}" close
