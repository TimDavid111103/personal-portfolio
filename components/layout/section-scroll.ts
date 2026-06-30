/**
 * @file components/layout/section-scroll.ts
 * Programmatic scroll for in-page section navigation.
 *
 * Scrolls section title elements to just below the navbar (top-aligned), so each
 * section's heading is the first thing visible in the content area.
 */
let mainScrollElement: HTMLElement | null = null;

/** Reads --navbar-height; falls back to measuring the header element. */
function getNavbarHeight(): number {
  const fromToken = parseFloat(
    getComputedStyle(document.documentElement).getPropertyValue("--navbar-height")
  );
  if (!Number.isNaN(fromToken) && fromToken > 0) return fromToken;

  return document.querySelector("header")?.getBoundingClientRect().height ?? 64;
}

/** Padding between navbar bottom and section title when scrolling. */
const SECTION_SCROLL_PADDING = 32;

/** Aligns the target element's top edge just below the navbar. */
function scrollElementToSectionStart(
  container: HTMLElement,
  target: HTMLElement,
  behavior: ScrollBehavior = "smooth"
): void {
  const navbarHeight = getNavbarHeight();
  const targetRect = target.getBoundingClientRect();
  const desiredTop = navbarHeight + SECTION_SCROLL_PADDING;
  const delta = targetRect.top - desiredTop;

  container.scrollTo({
    top: container.scrollTop + delta,
    behavior,
  });
}

/** Called by MainScrollArea on mount so hash links know which element to scroll. */
export function registerMainScrollElement(element: HTMLElement | null): void {
  mainScrollElement = element;
}

/** Scrolls to a section by hash — aligns the section top below the navbar. */
export function scrollToSectionHash(
  hash: string,
  behavior: ScrollBehavior = "smooth"
): void {
  const id = hash.replace(/^#/, "");
  if (!id || !mainScrollElement) return;

  const target = document.getElementById(id);
  if (!target) return;

  const section = target.closest("section");
  const scrollTarget = (section ?? target) as HTMLElement;

  scrollElementToSectionStart(mainScrollElement, scrollTarget, behavior);
}
