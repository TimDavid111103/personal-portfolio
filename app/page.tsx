import { MainScrollArea } from "@/components/layout/MainScrollArea";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SectionPlaceholder } from "@/components/sections/SectionPlaceholder";
import { getSite } from "@/lib/site";

const site = getSite();

export default function Home() {
  return (
    <>
      <Navbar />
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
