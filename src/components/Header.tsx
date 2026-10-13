"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { site } from "@/lib/site";
import { PhoneRingIcon } from "./AnimatedIcons";
import { CloseIcon, MenuIcon } from "./Icons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { BrandButton } from "./BrandButton";

type Nav = Dictionary["nav"];

export function Header({ lang, dict }: { lang: Locale; dict: Nav }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    ["#about", dict.about],
    ["#services", dict.services],
    ["#cabinet", dict.cabinet],
    ["#reviews", dict.reviews],
    ["#booking", dict.booking],
    ["#contact", dict.contact],
  ] as const;

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solid
          ? "border-b border-line bg-bg/90 text-ink shadow-sm shadow-navy-950/5 backdrop-blur-xl"
          : "border-b border-transparent text-ink"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-3 sm:h-18 sm:gap-4 sm:px-6 lg:px-8">
        <a href="#top" className="shrink-0" onClick={() => setOpen(false)}>
          <Logo tagline={dict.tagline} className="[&_svg]:text-current" />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium xl:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="opacity-80 transition hover:opacity-100">
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher lang={lang} label={dict.language} compact />
          <ThemeToggle labels={{ light: dict.themeLight, dark: dict.themeDark }} />
          <div className="hidden lg:block">
            <BrandButton
              href={`tel:${site.phones.office.tel}`}
              icon={<PhoneRingIcon />}
              className="!px-5 !py-2.5"
            >
              <span dir="ltr">{site.phones.office.display}</span>
            </BrandButton>
          </div>
          <button
            type="button"
            className="grid size-9 shrink-0 place-items-center rounded-full border border-current/15 text-lg sm:size-10 sm:text-xl xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.close : dict.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-line bg-bg px-4 pb-6 pt-2 text-ink sm:px-6 xl:hidden"
      >
        <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col">
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-2xl font-semibold"
            >
              {label}
            </a>
          ))}
          <div className="mt-6">
            <BrandButton href={`tel:${site.phones.office.tel}`} icon={<PhoneRingIcon />} className="w-full !py-3">
              {dict.call}
            </BrandButton>
          </div>
        </nav>
      </div>
    </header>
  );
}
