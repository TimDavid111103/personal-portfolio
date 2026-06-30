/**
 * @file components/sections/SectionPlaceholder.tsx
 * Stand-in for nav sections not yet built (Projects, Skills, etc.).
 *
 * The `<h2>` is both the visible title and the scroll target for navbar links
 * (`id` matches the hash in content/site.json nav).
 */
import { Section } from "@/components/layout/Section";

type SectionPlaceholderProps = {
  id: string;
  title: string;
};

/** Temporary centered heading until a real section is implemented. */
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
