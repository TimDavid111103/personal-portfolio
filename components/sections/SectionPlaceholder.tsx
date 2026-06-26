/**
 * @file components/sections/SectionPlaceholder.tsx
 * Stand-in for nav sections not yet built (Projects, Skills, etc.).
 *
 * Uses the standard one-screen Section wrapper. The `<h2>` is both the visible
 * title (centered in the section via Section's place-items-center) and the
 * scroll target for navbar links (`id` matches the hash in site.json nav).
 */
import { Section } from "@/components/layout/Section";

type SectionPlaceholderProps = {
  id: string;
  title: string;
};

export function SectionPlaceholder({ id, title }: SectionPlaceholderProps) {
  return (
    <Section aria-labelledby={id}>
      {/* id must match nav href (e.g. site.json "#projects" → id="projects") */}
      <h2
        id={id}
        className="m-0 text-center font-serif text-3xl font-bold text-muted-foreground/50 sm:text-4xl"
      >
        {title}
      </h2>
    </Section>
  );
}
