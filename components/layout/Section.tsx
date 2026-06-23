/**
 * @file components/layout/Section.tsx
 * Full-viewport section wrapper used by Hero and placeholder sections.
 * Each section fills one screen height and centers its content.
 */
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
};

/** A single full-height page section with centered content. */
export function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "grid h-full w-full shrink-0 place-items-center overflow-hidden px-4 sm:px-6",
        className
      )}
    >
      {children}
    </section>
  );
}
