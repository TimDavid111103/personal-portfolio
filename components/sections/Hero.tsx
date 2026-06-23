/**
 * @file components/sections/Hero.tsx
 * Home section: avatar, name, role, bio, and skill tags from site.json.
 * Includes the pipeline doodle behind the avatar on large screens.
 */
import Image from "next/image";
import { HeroPipelineDoodle } from "@/components/effects/HeroPipelineDoodle";
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

/** Slight rotations applied to skill tags for a hand-placed look. */
const skillTagRotations = [
  "-rotate-2",
  "rotate-1",
  "rotate-0",
  "-rotate-1",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
] as const;

/** Vertical offsets paired with rotations on skill tags. */
const skillTagOffsets = [
  "translate-y-0.5",
  "-translate-y-1",
  "translate-y-1",
  "-translate-y-0.5",
  "translate-y-0",
  "translate-y-1.5",
  "-translate-y-1",
  "translate-y-0.5",
] as const;

/** Skills split into three rows of up to three tags each. */
const skillRows = [
  site.skills.slice(0, 3),
  site.skills.slice(3, 6),
  site.skills.slice(6),
] as const;

/** Renders the intro section with profile info and skill tags. */
export function Hero() {
  return (
    <Section id="home" className="py-4 sm:py-6">
      <div className="flex h-full min-h-0 w-full max-w-2xl flex-col items-center justify-center gap-3 text-center sm:gap-4 md:gap-5">
        <div className="relative mx-auto w-[min(85vw,38dvh,24rem)]">
          <HeroPipelineDoodle
            className={cn(
              "absolute top-1/2 left-1/2 z-0 hidden max-w-none -translate-x-1/2 -translate-y-1/2",
              "lg:block lg:h-[clamp(6rem,56%,13rem)] lg:w-[min(100vw,250%)]",
              "xl:h-[clamp(6.5rem,60%,14.5rem)] xl:w-[min(100vw,265%)]",
              "2xl:h-[clamp(7rem,62%,15.5rem)] 2xl:w-[min(100vw,275%)]"
            )}
          />

          <div className="relative z-10 aspect-square w-full shrink-0 overflow-hidden rounded-full border-4 border-border bg-background shadow-xl">
            <Image
              src={site.avatar}
              alt={site.name}
              fill
              className="object-cover object-top"
              priority
              sizes="(max-width: 640px) 85vw, (max-width: 1024px) 38dvh, 384px"
            />
          </div>
        </div>

        <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {site.name}
        </h1>

        <p className="text-lg font-medium text-primary sm:text-2xl">
          {site.role}
        </p>

        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-lg">
          {site.bio}
        </p>

        <div className="flex w-full max-w-3xl flex-col gap-3 sm:gap-3.5">
          {skillRows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex min-h-9 flex-wrap items-center justify-center gap-2 sm:min-h-8 sm:flex-nowrap sm:gap-2.5"
            >
              {row.map((skill, index) => {
                const tagIndex = rowIndex * 3 + index;

                return (
                  <span
                    key={skill}
                    className={cn(
                      "inline-flex shrink-0 items-center rounded-md border px-2 py-1 font-mono text-[0.625rem] font-medium tracking-wide text-primary shadow-sm transition-transform hover:-translate-y-0.5 sm:px-2.5 sm:py-1 sm:text-xs sm:whitespace-nowrap",
                      skillTagStyles[tagIndex % skillTagStyles.length],
                      skillTagRotations[tagIndex % skillTagRotations.length],
                      skillTagOffsets[tagIndex % skillTagOffsets.length]
                    )}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
