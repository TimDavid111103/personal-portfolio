"use client";

/**
 * @file components/sections/Hero.tsx
 * First section on the page (hash `#home` via the logo in Navbar).
 */
import Image from "next/image";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import { ScrollAnimate } from "@/components/animations/ScrollAnimate";
import { Section } from "@/components/layout/Section";
import { getSite } from "@/lib/content";
import { cn } from "@/lib/utils";

const site = getSite();

const skillTagStyles = [
  "bg-primary/10 border-primary/25",
  "bg-primary/12 border-primary/28",
  "bg-primary/11 border-primary/26",
  "bg-primary/13 border-primary/30",
] as const;

/** Renders the intro section with profile info and skill tags. */
export function Hero() {
  return (
    <Section className="items-start justify-center py-8 sm:items-center sm:py-6">
      <div className="mx-auto w-full max-w-4xl text-center md:text-left lg:max-w-5xl">
        <ScrollAnimate distance={32} duration={0.8} delay={0} className="mb-5 md:mb-0">
          <div
            className={cn(
              "relative z-10 mx-auto aspect-square w-[min(82vw,20rem)] shrink-0 overflow-hidden rounded-full border-4 border-border bg-background shadow-xl",
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
              className="object-cover object-top transition-transform duration-500 hover:scale-105"
              priority
              sizes="(max-width: 768px) 82vw, (max-width: 1024px) 46vw, 448px"
            />
          </div>
        </ScrollAnimate>

        <div className="space-y-4 pt-2 sm:space-y-5">
          <div id="home">
            <BlurText
              text={site.name}
              delay={70}
              animateBy="words"
              direction="top"
              className={cn(
                "m-0 justify-center font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl",
                "md:justify-start"
              )}
            />
          </div>

          <p className="text-xl font-medium sm:text-2xl lg:text-3xl">
            <ShinyText
              text={site.role}
              speed={3}
              delay={0.5}
              color="oklch(0.55 0.03 155)"
              shineColor="oklch(0.78 0.04 155)"
              className="font-medium"
            />
          </p>

          <ScrollAnimate duration={0.7} delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg lg:text-xl">
              {site.bio}
            </p>
          </ScrollAnimate>

          <ScrollAnimate duration={0.7} delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 md:justify-start">
              {site.skills.map((skill, index) => (
                <span
                  key={skill}
                  className={cn(
                    "inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs font-medium tracking-wide text-primary shadow-sm",
                    "transition-all duration-200 hover:-translate-y-0.5 hover:bg-primary/15 hover:shadow-md",
                    "sm:px-3 sm:py-1.5 sm:text-sm",
                    skillTagStyles[index % skillTagStyles.length]
                  )}
                >
                  {skill}
                </span>
              ))}
            </div>
          </ScrollAnimate>
        </div>
      </div>
    </Section>
  );
}
