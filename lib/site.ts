import siteData from "@/content/site.json";

export type NavLink = {
  label: string;
  href: string;
};

export type SocialLink = {
  platform: string;
  handle: string;
  url: string;
  icon: string;
};

export type SiteData = {
  name: string;
  role: string;
  bio: string;
  avatar: string;
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

export function getSite(): SiteData {
  return siteData as SiteData;
}
