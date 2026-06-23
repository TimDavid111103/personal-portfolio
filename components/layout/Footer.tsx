import { getSite } from "@/lib/site";

const site = getSite();

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <p className="text-center text-sm text-muted-foreground">
        {site.footer.copyright}
      </p>
    </footer>
  );
}
