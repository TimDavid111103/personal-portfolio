/**
 * @file app/page.tsx
 * Home page: navbar + a vertical stack of full-screen sections.
 *
 * ## How sections are organized
 *
 * The portfolio is a single page with multiple independent sections (Hero,
 * Projects, Skills, …). Each section is exactly one screen tall. Scrolling
 * moves between sections — nothing spills from one into the next.
 *
 * ## Viewport height chain (top → bottom)
 *
 * 1. `layout.tsx` — `body` is `h-dvh` (one device viewport, no page-level scroll).
 * 2. `Navbar` — fixed `h-16` at the top (`shrink-0`, does not scroll away).
 * 3. `MainScrollArea` — `flex-1 h-0` fills the remaining height below the navbar.
 *    This is the **scroll pane**: one visible screen of content at a time.
 * 4. `Section` (inside MainScrollArea) — each child uses `flex-[0_0_100%]`, so it
 *    is exactly 100% of the scroll pane height. Sections stack vertically; total
 *    scroll height = N × one screen.
 *
 * ## Navigation
 *
 * Navbar links use `SectionNavLink` → `section-scroll.ts`. Each link's `href`
 * (e.g. `#projects`) matches the `id` on that section's title element.
 * Clicking scrolls the title to the visual center of the screen (accounting for
 * the navbar via `--navbar-height` in globals.css).
 *
 * ## Adding a new section
 *
 * Wrap content in `<Section>`, put the nav hash `id` on the section title, and
 * add a matching link in `content/site.json`.
 */
import { MainScrollArea } from "@/components/layout/MainScrollArea";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SectionPlaceholder } from "@/components/sections/SectionPlaceholder";
import { getSite } from "@/lib/site";

const site = getSite();

/** Renders the single-page portfolio: nav + scrollable sections. */
export default function Home() {
  return (
    <>
      <Navbar />
      {/*
        MainScrollArea is one screen tall. Each direct child Section is also
        one screen tall, so they stack: [Hero][Projects][Skills]…
      */}
      <MainScrollArea>
        <Hero />
        {site.nav.links.map((link) => (
          <SectionPlaceholder
            key={link.href}
            id={link.href.replace("#", "")}
            title={link.label}
          />
        ))}
      </MainScrollArea>
    </>
  );
}
