/**
 * @file components/layout/SectionNavLink.tsx
 * In-page anchor link that scrolls sections via section-scroll instead of
 * the browser's default jump. Updates the URL hash without a full navigation.
 */
"use client";

import type { ComponentProps } from "react";
import { scrollToSectionHash } from "./section-scroll";
import { cn } from "@/lib/utils";

type SectionNavLinkProps = ComponentProps<"a">;

/** Hash link that smoothly scrolls to a section in the main scroll area. */
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
