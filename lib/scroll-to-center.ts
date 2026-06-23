export function scrollElementToCenter(
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
