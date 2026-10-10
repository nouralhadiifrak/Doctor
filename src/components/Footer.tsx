import { cacheLife } from "next/cache";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

async function currentYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export async function Footer({ dict, nav }: { dict: Dictionary["footer"]; nav: Dictionary["nav"] }) {
  const links = [
    ["#about", nav.about],
    ["#services", nav.services],
    ["#cabinet", nav.cabinet],
    ["#booking", nav.booking],
    ["#contact", nav.contact],
  ] as const;
  const year = await currentYear();

  return (
    <footer className="bg-navy-950 pb-28 pt-16 text-cream lg:pb-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
        <div>
          <Logo tagline={dict.tagline} className="[&_svg]:text-cream" />
          <p className="mt-6 text-sm leading-relaxed text-cream/60" dir="ltr" lang="fr">
            {site.address.line1}, {site.address.line2}, {site.address.city}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-cream/75">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="hover:text-cream">
              {label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-2 text-sm">
          {(["office", "mobile"] as const).map((k) => (
            <a key={k} href={`tel:${site.phones[k].tel}`} dir="ltr" className="font-semibold tabular-nums hover:underline">
              {site.phones[k].display}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-cream/10 px-4 pt-6 text-xs text-cream/50 sm:px-6 lg:px-8">
        © {year} {site.name}. {dict.rights}
      </p>
    </footer>
  );
}
