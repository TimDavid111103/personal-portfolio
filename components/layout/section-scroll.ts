/**
 * @file components/layout/section-scroll.ts
 * Hash-based section scrolling inside the main scroll container.
 * Centers the target section vertically instead of using native anchor jump.
 */
let mainScrollElement: HTMLElement | null = null;

/** Scrolls a target element to the vertical center of its scroll container. */
function scrollElementToCenter(
  container: HTMLElement,
  target: HTMLElement,
  behavior: ScrollBehavior = "smooth"
) {
  const containerRect = container.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const targetCenterY =
    targetRect.top - containerRect.top + targetRect.height / 2 + container.scrollTop;
  const scrollTop = Math.round(targetCenterY - container.clientHeight / 2);

  container.scrollTo({ top: scrollTop, behavior });
}

/** Stores the main scroll container so hash navigation can target it. */
export function registerMainScrollElement(element: HTMLElement | null) {
  mainScrollElement = element;
}

/** Scrolls to a section by hash (e.g. "#projects") within the main scroll area. */
export function scrollToSectionHash(
  hash: string,
  behavior: ScrollBehavior = "smooth"
) {
  const id = hash.replace(/^#/, "");
  if (!id || !mainScrollElement) return;

  const target = document.getElementById(id);
  if (!target) return;

  scrollElementToCenter(mainScrollElement, target, behavior);
}
