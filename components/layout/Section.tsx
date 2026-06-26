/**
 * @file components/layout/Section.tsx
 * Wrapper for every full-screen page section (Hero, Projects, Skills, …).
 *
 * ## Why each section is one screen tall
 *
 * Sections are direct children of MainScrollArea, which is exactly one visible
 * screen below the navbar. We use `flex-[0_0_100%]` so each section's height
 * equals 100% of that scroll pane — not 100dvh (the full viewport). That way
 * every section matches the area the user actually sees, and N sections stack
 * to N screens of scroll distance.
 *
 * ## Content placement
 *
 * `place-items-center` puts children at the geometric center of the section.
 * Placeholder sections render a single title here; the Hero renders its own layout.
 * Navbar scroll targets are title elements with matching hash ids (see section-scroll.ts).
 */
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/** One screen-sized block inside the scroll area. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        // flex-[0_0_100%] — flex-basis 100% of MainScrollArea: exactly one scroll-pane height.
        // shrink-0 — do not compress when multiple sections are stacked.
        // overflow-hidden — content must not spill into the next section.
        // place-items-center — center children horizontally and vertically in the section.
        "grid min-h-0 w-full shrink-0 flex-[0_0_100%] place-items-center overflow-hidden px-4 sm:px-6",
        className
      )}
    >
      {children}
    </section>
  );
}
