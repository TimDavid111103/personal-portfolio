import Link from "next/link";
import {
  AtSign,
  BookOpen,
  Code2,
  Link2,
  Mail,
} from "lucide-react";
import { getSite, type SocialLink } from "@/lib/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

const site = getSite();

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  linkedin: Link2,
  github: Code2,
  twitter: AtSign,
  mail: Mail,
  devto: Code2,
  medium: BookOpen,
};

function SocialIcon({ icon }: { icon: string }) {
  const Icon = iconMap[icon] ?? Mail;
  return <Icon className="size-6 text-primary" />;
}

export function Socials() {
  return (
    <section id="socials" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={site.socials.heading}
          subtitle={site.socials.description}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.socials.links.map((link: SocialLink) => (
            <Link
              key={link.platform}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full shadow-sm transition-shadow hover:shadow-md">
                <CardContent className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
                    <SocialIcon icon={link.icon} />
                  </div>
                  <h3 className="font-serif text-lg font-semibold text-foreground">
                    {link.platform}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {link.handle}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
