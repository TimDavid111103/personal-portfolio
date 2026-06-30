"use client";

import { ScrollAnimate } from "@/components/animations/ScrollAnimate";
import { StaggerItems } from "@/components/animations/StaggerItems";
import { SocialBrandIcon } from "@/components/brand/SocialBrandIcon";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import SpotlightCard from "@/components/SpotlightCard";
import { StackIconWrapper } from "@/components/ui/stack-icon";
import { getSite } from "@/lib/content";

const site = getSite();

/** Profile links for LinkedIn, GitHub, and X. */
export function Socials() {
  return (
    <Section>
      <div className="mx-auto w-full max-w-3xl text-center">
        <SectionHeader
          id="socials"
          title={site.socials.heading}
          subtitle={site.socials.description}
          className="text-center md:text-center"
        />

        <ScrollAnimate duration={0.75} delay={0.12}>
          <StaggerItems
            className="grid gap-4 sm:grid-cols-3"
            itemClassName="h-full"
            staggerDelay={0.1}
          >
            {site.socials.links.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block h-full"
              >
                <SpotlightCard className="h-full transition-colors duration-300 hover:border-primary/30">
                  <div className="flex flex-col items-center gap-3 px-6 py-8">
                    {link.icon === "linkedin" ? (
                      <SocialBrandIcon
                        platform={link.icon}
                        className="size-10 text-primary transition-transform duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <StackIconWrapper
                        name={link.icon}
                        label={link.platform}
                        size={40}
                      />
                    )}
                    <div>
                      <p className="font-serif text-lg font-semibold text-foreground">
                        {link.platform}
                      </p>
                      <p className="mt-1 font-mono text-sm text-primary">
                        {link.handle}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            ))}
          </StaggerItems>
        </ScrollAnimate>
      </div>
    </Section>
  );
}
