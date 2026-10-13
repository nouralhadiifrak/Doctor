"use client";

import { isDarkNow, useIsDark } from "@/lib/useIsDark";
import { MoonIcon, SunIcon } from "./Icons";

/**
 * Glass slider switch. Light mode = "on": the glow is lit behind the frosted
 * knob. Positions come from the `dark` class on <html> (see globals.css), so
 * the switch is correct on first paint, before React hydrates.
 */
export function ThemeToggle({ labels, className = "" }: { labels: { light: string; dark: string }; className?: string }) {
  const dark = useIsDark();

  const toggle = () => {
    const next = !isDarkNow();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  const label = dark ? labels.light : labels.dark;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={!dark}
      onClick={toggle}
      aria-label={label}
      title={label}
      dir="ltr"
      className={`theme-switch ${className}`}
    >
      <SunIcon className="theme-switch__icon theme-switch__icon--sun" />
      <MoonIcon className="theme-switch__icon theme-switch__icon--moon" />
      <span className="theme-switch__orb" aria-hidden="true" />
      <span className="theme-switch__knob" aria-hidden="true">
        <span className="theme-switch__dots" />
        <span className="theme-switch__lens" />
      </span>
    </button>
  );
}
