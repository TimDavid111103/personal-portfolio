"use client";

import BlurText from "@/components/BlurText";
import { ScrollAnimate } from "@/components/animations/ScrollAnimate";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
};

/** Shared section heading with blur reveal — id is the navbar scroll target. */
export function SectionHeader({
  id,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 text-center md:mb-8 md:text-left", className)}>
      <ScrollAnimate distance={40} duration={0.65} className="mb-0">
        <div id={id}>
          <BlurText
            text={title}
            delay={60}
            animateBy="words"
            direction="top"
            className={cn(
              "m-0 justify-center font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
              "md:justify-start"
            )}
          />
        </div>
      </ScrollAnimate>
      {subtitle ? (
        <ScrollAnimate distance={24} duration={0.6} delay={0.08}>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            {subtitle}
          </p>
        </ScrollAnimate>
      ) : null}
    </div>
  );
}
