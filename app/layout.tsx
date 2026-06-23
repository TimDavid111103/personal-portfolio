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

const libreBaskerville = Libre_Baskerville({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const site = getSite();

export const metadata: Metadata = {
  title: `${site.name} | ${site.role}`,
  description: site.bio,
};

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
