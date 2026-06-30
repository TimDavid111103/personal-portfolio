/**
 * @file components/layout/Section.tsx
 * Wrapper for every full-screen page section (Hero, Projects, Skills, …).
 *
 * Each section is exactly one scroll-pane tall (`flex-[0_0_100%]` of MainScrollArea).
 * Navbar hash links target title elements inside sections — see section-scroll.ts.
 */
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Size to content; optional min height of one viewport below the navbar. */
  fluid?: boolean;
};

/** Full-screen block, or fluid height when `fluid` is set. */
export function Section({ children, className, fluid }: SectionProps) {
  return (
    <section
      className={cn(
        "grid min-h-0 w-full shrink-0 overflow-hidden px-4 sm:px-6",
        fluid
          ? "min-h-[calc(100dvh-var(--navbar-height))] flex-[0_0_auto] place-items-stretch"
          : "flex-[0_0_100%] place-items-center",
        className
      )}
    >
      {children}
    </section>
  );
}
