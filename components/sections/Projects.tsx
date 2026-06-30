"use client";

import { ExternalLinkIcon } from "lucide-react";
import { ScrollAnimate } from "@/components/animations/ScrollAnimate";
import GlareHover from "@/components/GlareHover";
import { StaggerItems } from "@/components/animations/StaggerItems";
import { ProjectDoodle } from "@/components/effects/project-doodles";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getProjects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { StackIconWrapper } from "@/components/ui/stack-icon";

const { heading, subtitle, projects } = getProjects();

function ProjectCard({ project }: { project: Project }) {
  const Doodle = (
    <div className="rounded-lg border border-border/60 bg-primary/5 px-2 py-1">
      <ProjectDoodle name={project.doodle} />
    </div>
  );

  return (
    <GlareHover
      width="100%"
      height="auto"
      background="transparent"
      borderRadius="0.75rem"
      borderColor="hsl(var(--border))"
      glareColor="#6b9e7a"
      glareOpacity={0.25}
      className={cn(
        "h-full w-full border-border bg-card shadow-sm",
        project.featured && "border-primary/40 ring-1 ring-primary/20"
      )}
      style={{ minHeight: "100%" }}
    >
      <Card className="h-full border-0 bg-transparent shadow-none ring-0">
        <CardHeader className="gap-2 pb-2">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <CardTitle className="font-serif text-xl font-bold sm:text-2xl">
              {project.title}
            </CardTitle>
            <div className="flex flex-wrap gap-1.5">
              {project.featured ? (
                <Badge variant="default">Featured</Badge>
              ) : null}
              {project.role ? (
                <Badge variant="outline">{project.role}</Badge>
              ) : null}
              {project.status ? (
                <Badge variant="secondary">{project.status}</Badge>
              ) : null}
            </div>
          </div>
          <CardDescription className="text-sm leading-relaxed">
            {project.goal}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {Doodle}

          <StaggerItems
            className="space-y-2"
            itemClassName="flex gap-2 text-sm text-muted-foreground"
          >
            {project.highlights.map((highlight) => (
              <div key={highlight} className="flex gap-2">
                <span className="mt-2 size-1 shrink-0 rounded-full bg-primary" />
                <span className="leading-relaxed">{highlight}</span>
              </div>
            ))}
          </StaggerItems>

          <div className="flex flex-wrap gap-1.5">
            {project.layerStack.map((layer) => (
              <Badge key={layer.label} variant="outline" className="font-mono">
                {layer.label}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="gap-2 border-t-0 bg-transparent pt-0">
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              <StackIconWrapper name="github" label="GitHub" size={14} />
              GitHub
            </a>
          ) : null}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "sm" })}
            >
              <ExternalLinkIcon data-icon="inline-start" />
              Live
            </a>
          ) : null}
        </CardFooter>
      </Card>
    </GlareHover>
  );
}

/** Horizontal carousel of featured project cards with pipeline doodles. */
export function Projects() {
  return (
    <Section className="items-start pt-14 pb-8 sm:py-10">
      <div className="mx-auto w-full max-w-5xl">
        <SectionHeader id="projects" title={heading} subtitle={subtitle} />

        <ScrollAnimate duration={0.8} delay={0.1}>
          <Carousel
            opts={{ align: "start", loop: false }}
            className="w-full px-10 sm:px-0"
          >
            <CarouselContent className="-ml-3 sm:-ml-4">
              {projects.map((project) => (
                <CarouselItem
                  key={project.id}
                  className="basis-[min(88vw,26rem)] pl-3 sm:basis-[min(85vw,28rem)] sm:pl-4"
                >
                  <ProjectCard project={project} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 flex size-8 border-border bg-background/90 shadow-sm sm:left-0 sm:size-9" />
            <CarouselNext className="right-1 flex size-8 border-border bg-background/90 shadow-sm sm:right-0 sm:size-9" />
          </Carousel>
        </ScrollAnimate>
      </div>
    </Section>
  );
}
