/**
 * @file lib/site.ts
 * Site content types and loader. All copy, nav links, and social URLs
 * come from content/site.json — edit that file to update the site.
 */
import siteData from "@/content/site.json";

/** A single nav or CTA link (label + hash href). */
export type NavLink = {
  label: string;
  href: string;
};

/** A social profile or contact link with platform metadata. */
export type SocialLink = {
  platform: string;
  handle: string;
  url: string;
  icon: string;
};

/** Full site content shape matching content/site.json. */
export type SiteData = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  nav: {
    links: NavLink[];
    cta: NavLink;
  };
  socials: {
    heading: string;
    description: string;
    links: SocialLink[];
  };
  contact: {
    heading: string;
    description: string;
    buttonLabel: string;
    email: string;
  };
  footer: {
    copyright: string;
  };
};

/** Loads site.json as typed SiteData. */
export function getSite(): SiteData {
  return siteData as SiteData;
}
