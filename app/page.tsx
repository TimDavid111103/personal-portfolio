/**
 * @file app/page.tsx
 * Home page: navbar + a vertical stack of full-screen sections.
 *
 * Viewport chain: layout body (`h-dvh`) → Navbar (`h-16`, fixed) → MainScrollArea
 * (`flex-1`, scroll pane) → Section children (`flex-[0_0_100%]`, one screen each).
 *
 * Nav links in content/site.json use SectionNavLink → section-scroll.ts to scroll
 * section title elements (matching hash ids) just below the navbar.
 */
import { MainScrollArea } from "@/components/layout/MainScrollArea";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Socials } from "@/components/sections/Socials";

/** Renders the single-page portfolio: nav + scrollable sections. */
export default function Home() {
  return (
    <>
      <Navbar />
      <MainScrollArea>
        <Hero />
        <Projects />
        <Skills />
        <Socials />
        <Contact />
      </MainScrollArea>
    </>
  );
}
