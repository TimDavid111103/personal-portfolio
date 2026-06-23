import { scrollElementToCenter } from "@/lib/scroll-to-center";

let mainScrollElement: HTMLElement | null = null;

export function registerMainScrollElement(element: HTMLElement | null) {
  mainScrollElement = element;
}

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
