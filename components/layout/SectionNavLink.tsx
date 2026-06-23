"use client";

import type { ComponentProps } from "react";
import { scrollToSectionHash } from "@/lib/section-scroll";
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
