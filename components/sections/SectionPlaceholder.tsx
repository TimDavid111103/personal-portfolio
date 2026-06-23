/**
 * @file components/sections/SectionPlaceholder.tsx
 * Temporary stand-in for nav sections not yet built (Projects, Skills, etc.).
 * Shows the section title centered on a full viewport section.
 */
import { Section } from "@/components/layout/Section";

type SectionPlaceholderProps = {
  id: string;
  title: string;
};

/** Placeholder section until real content is added for this nav item. */
export function SectionPlaceholder({ id, title }: SectionPlaceholderProps) {
  return (
    <Section aria-labelledby={id}>
      <h2
        id={id}
        className="m-0 text-center font-serif text-3xl font-bold text-muted-foreground/50 sm:text-4xl"
      >
        {title}
      </h2>
    </Section>
  );
}
