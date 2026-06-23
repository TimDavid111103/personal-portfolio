import { Send } from "lucide-react";
import { getSite } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const site = getSite();

export function Contact() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <Card className="shadow-lg">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center sm:px-12">
            <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-primary/10">
              <Send className="size-7 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              {site.contact.heading}
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              {site.contact.description}
            </p>
            <a
              href={`mailto:${site.contact.email}`}
              className={buttonVariants({ size: "lg", className: "mt-8" })}
            >
              {site.contact.buttonLabel}
            </a>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
