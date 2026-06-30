/**
 * @file components/layout/SectionNavLink.tsx
 * In-page anchor that scrolls via section-scroll.ts instead of native jump.
 *
 * Each `href` (e.g. `#projects`) must match the `id` on that section's title
 * element. On click we update the URL hash and scroll the title to the screen
 * center (navbar-aware — see section-scroll.ts).
 */
"use client";

import type { ComponentProps } from "react";
import { scrollToSectionHash } from "./section-scroll";

type SectionNavLinkProps = ComponentProps<"a">;

/** Hash link that smoothly scrolls a section title into view. */
export function SectionNavLink({
  href,
  className,
  onClick,
  children,
  ...props
}: SectionNavLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || !href?.startsWith("#")) return;

        event.preventDefault();
        history.pushState(null, "", href);
        scrollToSectionHash(href, "auto");
      }}
      {...props}
    >
      {children}
    </a>
  );
}
