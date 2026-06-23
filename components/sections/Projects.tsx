"use client";

import Image from "next/image";
import { Code2, ExternalLink } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const { heading, subtitle, projects } = getProjects();

export function Projects() {
  return (
    <section id="projects" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={heading} subtitle={subtitle} />

        <div className="relative px-12">
          <Carousel opts={{ align: "start", loop: true }}>
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id}>
                  <Card className="overflow-hidden shadow-md">
                    <CardContent className="grid gap-8 p-6 lg:grid-cols-2 lg:p-8">
                      <div className="flex flex-col justify-center">
                        <h3 className="font-serif text-2xl font-bold text-foreground">
                          {project.title}
                        </h3>
                        <p className="mt-3 text-muted-foreground leading-relaxed">
                          {project.description}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {project.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonVariants({ size: "sm" })}
                          >
                            <ExternalLink className="size-4" />
                            Live Demo
                          </a>
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={buttonVariants({ variant: "outline", size: "sm" })}
                          >
                            <Code2 className="size-4" />
                            GitHub
                          </a>
                        </div>
                      </div>
                      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-muted">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
