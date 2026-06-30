/**
 * @file components/layout/Navbar.tsx
 * Sticky top navigation: logo, section links, theme toggle, and mobile menu.
 *
 * Sits above MainScrollArea and does not scroll. Its height (`h-16`) defines
 * how much viewport is left for the one-screen section scroll pane. Nav links
 * use SectionNavLink to scroll section titles into view (see section-scroll.ts).
 */
"use client";

import { useSyncExternalStore } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { MagnetHover } from "@/components/animations/MagnetHover";
import { LutherSignature } from "@/components/brand/LutherSignature";
import { SectionNavLink } from "@/components/layout/SectionNavLink";
import { getSite } from "@/lib/content";
import {
  getThemeServerSnapshot,
  getThemeSnapshot,
  subscribeToTheme,
  toggleTheme,
} from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const site = getSite();

/** Site header with desktop nav, theme toggle, and mobile sheet menu. */
export function Navbar() {
  const isDark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getThemeServerSnapshot
  );

  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <nav className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <SectionNavLink
          href="#home"
          className="relative z-10 flex items-center text-foreground transition-colors hover:text-primary"
          aria-label={site.name}
        >
          <LutherSignature className="text-[1.875rem] sm:text-[2rem]" />
        </SectionNavLink>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-8">
          {site.nav.links.map((link) => (
            <SectionNavLink
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </SectionNavLink>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span suppressHydrationWarning>
              {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </span>
          </Button>

          <MagnetHover magnetStrength={5} padding={50}>
            <SectionNavLink
              href={site.nav.cta.href}
              className={cn(buttonVariants(), "hidden md:inline-flex")}
            >
              {site.nav.cta.label}
            </SectionNavLink>
          </MagnetHover>

          <Sheet>
            <SheetTrigger
              className={cn(
                buttonVariants({ variant: "outline", size: "icon" }),
                "md:hidden"
              )}
            >
              <Menu className="size-4" />
              <span className="sr-only">Open menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="gap-0 sm:max-w-xs">
              <SheetHeader className="border-b border-border">
                <SheetTitle className="sr-only">{site.name}</SheetTitle>
                <LutherSignature className="text-[1.75rem]" aria-hidden />
              </SheetHeader>
              <div className="flex flex-col gap-1 p-4">
                {site.nav.links.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <SectionNavLink
                        href={link.href}
                        className="rounded-md px-2 py-2.5 text-base text-foreground transition-colors hover:bg-muted hover:text-primary"
                      >
                        {link.label}
                      </SectionNavLink>
                    }
                  />
                ))}
                <SheetClose
                  render={
                    <SectionNavLink
                      href={site.nav.cta.href}
                      className={cn(buttonVariants(), "mt-3 w-full")}
                    >
                      {site.nav.cta.label}
                    </SectionNavLink>
                  }
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
