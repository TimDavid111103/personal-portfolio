"use client";

import { MailIcon } from "lucide-react";
import { MagnetHover } from "@/components/animations/MagnetHover";
import { ScrollAnimate } from "@/components/animations/ScrollAnimate";
import GlareHover from "@/components/GlareHover";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { buttonVariants } from "@/components/ui/button";
import { getSite } from "@/lib/content";
import { cn } from "@/lib/utils";

const site = getSite();

/** Contact CTA with mailto link and email display. */
export function Contact() {
  const { heading, description, buttonLabel, email } = site.contact;
  const mailtoHref = `mailto:${email}?subject=${encodeURIComponent(`Hello from ${site.name}'s portfolio`)}`;

  return (
    <Section>
      <div className="mx-auto w-full max-w-2xl text-center">
        <SectionHeader
          id="contact"
          title={heading}
          subtitle={description}
          className="text-center md:text-center"
        />

        <ScrollAnimate duration={0.8} delay={0.15}>
          <GlareHover
            width="100%"
            height="auto"
            background="transparent"
            borderRadius="0.75rem"
            borderColor="hsl(var(--border))"
            glareColor="#6b9e7a"
            glareOpacity={0.2}
            className="mx-auto max-w-md border-border bg-card shadow-sm"
          >
            <div className="flex flex-col items-center gap-5 px-6 py-10 sm:px-8 sm:py-12">
              <div className="flex size-14 items-center justify-center rounded-full border border-primary/25 bg-primary/10">
                <MailIcon className="size-7 text-primary" aria-hidden />
              </div>

              <MagnetHover magnetStrength={4} padding={80}>
                <a
                  href={mailtoHref}
                  className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
                >
                  {buttonLabel}
                </a>
              </MagnetHover>

              <a
                href={mailtoHref}
                className="font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                {email}
              </a>
            </div>
          </GlareHover>
        </ScrollAnimate>
      </div>
    </Section>
  );
}
