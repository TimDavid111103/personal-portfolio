/**
 * @file app/layout.tsx
 * Root HTML shell: fonts, page metadata, and global background effects.
 * Wraps every page with doodles, grid spotlight, and the main content area.
 */
import type { Metadata } from "next";
import {
  IBM_Plex_Mono,
  Libre_Baskerville,
  Lora,
} from "next/font/google";
import { BackgroundDoodles } from "@/components/effects/BackgroundDoodles";
import { GridSpotlight } from "@/components/effects/GridSpotlight";
import { getSite } from "@/lib/site";
import "./globals.css";

/** Body and heading font (Libre Baskerville). */
const libreBaskerville = Libre_Baskerville({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

/** Accent serif font (Lora). */
const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

/** Monospace font for skill tags and code-like UI. */
const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const site = getSite();

/** Browser tab title and meta description from site.json. */
export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.bio,
};

/** App-wide layout: fonts, background layers, and page children. */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${lora.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="flex h-dvh flex-col overflow-hidden">
        <BackgroundDoodles />
        <GridSpotlight />
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
