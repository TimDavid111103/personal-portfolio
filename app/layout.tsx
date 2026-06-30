/**
 * @file app/layout.tsx
 * Root HTML shell: fonts, page metadata, and global background effects.
 *
 * The body uses `h-dvh overflow-hidden` so the app never grows beyond one device
 * viewport. All vertical scrolling happens inside MainScrollArea (see page.tsx).
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import {
  IBM_Plex_Mono,
  Libre_Baskerville,
  Lora,
} from "next/font/google";
import { BackgroundDoodles } from "@/components/effects/BackgroundDoodles";
import { GridSpotlight } from "@/components/effects/GridSpotlight";
import { getSite } from "@/lib/content";
import { themeInitScript } from "@/lib/theme";
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
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${libreBaskerville.variable} ${lora.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body className="flex h-dvh flex-col overflow-hidden">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <BackgroundDoodles />
        <GridSpotlight />
        <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
