"use client";

import { getSkills } from "@/lib/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const { heading, subtitle, categories } = getSkills();

export function Skills() {
  return (
    <section id="skills" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title={heading} subtitle={subtitle} />

        <div className="grid gap-6 sm:grid-cols-2">
          {categories.map((category) => (
            <Card key={category.name} className="shadow-sm">
              <CardHeader>
                <CardTitle className="font-serif text-lg">
                  {category.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{skill.name}</span>
                      <span className="text-muted-foreground tabular-nums">
                        {skill.level}%
                      </span>
                    </div>
                    <Progress value={skill.level} />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
