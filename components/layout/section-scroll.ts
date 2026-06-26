/**
 * @file components/layout/section-scroll.ts
 * Programmatic scroll for in-page section navigation.
 *
 * ## How it fits the section layout
 *
 * - MainScrollArea is the scroll container (one screen below the navbar).
 * - Each Section is one screen tall inside that container.
 * - Navbar links point to section **titles** via hash ids (e.g. `#projects` →
 *   `<h2 id="projects">`).
 *
 * ## Scroll behavior
 *
 * We scroll the title to the **visual center of the screen**, not the center of
 * the scroll container alone. The visible "screen" includes the navbar at the
 * top, so the target Y is halfway between the navbar bottom and the viewport
 * bottom. `--navbar-height` in globals.css must match Navbar `h-16`.
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

/**
 * Visual center Y of the content area: midpoint between navbar bottom and
 * viewport bottom. Used so scrolled titles appear centered on screen.
 */
function getViewportContentCenterY(): number {
  const navbarHeight = getNavbarHeight();
  return navbarHeight + (window.innerHeight - navbarHeight) / 2;
}

/** Aligns the target element's vertical center with getViewportContentCenterY(). */
function scrollElementToViewportCenter(
  container: HTMLElement,
  target: HTMLElement,
  behavior: ScrollBehavior = "smooth"
) {
  const targetRect = target.getBoundingClientRect();
  const targetCenterY = targetRect.top + targetRect.height / 2;
  const viewportCenterY = getViewportContentCenterY();
  const delta = targetCenterY - viewportCenterY;

  container.scrollTo({
    top: container.scrollTop + delta,
    behavior,
  });
}

/** Called by MainScrollArea on mount so hash links know which element to scroll. */
export function registerMainScrollElement(element: HTMLElement | null) {
  mainScrollElement = element;
}

/** Scrolls to a section title by hash (e.g. "#projects"). */
export function scrollToSectionHash(
  hash: string,
  behavior: ScrollBehavior = "smooth"
) {
  const id = hash.replace(/^#/, "");
  if (!id || !mainScrollElement) return;

  const target = document.getElementById(id);
  if (!target) return;

  scrollElementToViewportCenter(mainScrollElement, target, behavior);
}
