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
import { cn } from "@/lib/utils";

type SectionNavLinkProps = ComponentProps<"a">;

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
      className={cn(className)}
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
