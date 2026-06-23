import Image from "next/image";
import { getSite } from "@/lib/site";

const site = getSite();

export function Hero() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center font-serif text-3xl font-bold tracking-tight text-foreground sm:text-left sm:text-4xl">
          {site.name}
        </h1>

        <div className="mt-4 flex flex-col items-center gap-4 sm:mt-5 sm:flex-row sm:items-start sm:gap-6">
          <div className="relative size-28 shrink-0 overflow-hidden rounded-full border-4 border-border shadow-lg sm:size-32">
            <Image
              src={site.avatar}
              alt={site.name}
              fill
              className="object-cover object-top"
              priority
              sizes="128px"
            />
          </div>

          <div className="text-center sm:pt-1 sm:text-left">
            <p className="text-base font-medium text-primary sm:text-lg">
              {site.role}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:mt-3 sm:text-base">
              {site.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
