/**
 * @file components/sections/Hero.tsx
 * First section on the page (hash `#home` via the logo in Navbar).
 *
 * Uses the same one-screen Section wrapper as every other section. Unlike
 * placeholders, the Hero has rich content rather than a single centered title;
 * `id="home"` is on the `<h1>` so the logo link scrolls the name to screen center.
 */
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { getSite } from "@/lib/site";
import { cn } from "@/lib/utils";

const site = getSite();

/** Background/border styles cycled across skill tags for visual variety. */
const skillTagStyles = [
  "bg-primary/10 border-primary/25",
  "bg-primary/12 border-primary/28",
  "bg-primary/11 border-primary/26",
  "bg-primary/13 border-primary/30",
  "bg-primary/10 border-primary/25",
  "bg-primary/12 border-primary/28",
  "bg-primary/11 border-primary/26",
  "bg-primary/13 border-primary/30",
] as const;

/** Renders the intro section with profile info and skill tags. */
export function Hero() {
  return (
    <Section>
      <div className="mx-auto w-full max-w-4xl text-center md:text-left lg:max-w-5xl">
        <div
          className={cn(
            // Avatar floats on md+ so text wraps around it (shape-outside: circle).
            "relative z-10 mx-auto mb-5 aspect-square w-[min(82vw,20rem)] shrink-0 overflow-hidden rounded-full border-4 border-border bg-background shadow-xl",
            "sm:w-[min(72vw,22rem)]",
            "md:float-left md:mb-4 md:mr-8 md:w-[min(46vw,24rem)]",
            "lg:mr-10 lg:w-[min(42vw,28rem)]",
            "[shape-outside:circle(50%)]"
          )}
        >
          <Image
            src={site.avatar}
            alt={site.name}
            fill
            className="object-cover object-top"
            priority
            sizes="(max-width: 768px) 82vw, (max-width: 1024px) 46vw, 448px"
          />
        </div>

        <div className="space-y-4 sm:space-y-5">
          <h1
            id="home"
            className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
          >
            {/* id="home" — scroll target for the Navbar logo (SectionNavLink) */}
            {site.name}
          </h1>

          <p className="text-xl font-medium text-primary sm:text-2xl lg:text-3xl">
            {site.role}
          </p>

          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
            {site.bio}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:justify-start">
            {site.skills.map((skill, index) => (
              <span
                key={skill}
                className={cn(
                  "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium tracking-wide text-primary shadow-sm transition-colors hover:bg-primary/15 sm:px-3 sm:py-1.5 sm:text-sm",
                  skillTagStyles[index % skillTagStyles.length]
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
