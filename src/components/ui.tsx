import type { ReactNode } from "react";

export const btn = {
  base: "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
  primary: "bg-brand text-brand-ink shadow-lg shadow-navy-950/10 hover:bg-brand-hover",
  cream: "bg-cream text-navy-950 shadow-lg shadow-black/20 hover:bg-white",
  ghostLight: "border border-cream/30 text-cream hover:border-cream/60 hover:bg-cream/5",
  outline: "border border-line text-ink hover:border-accent/50 hover:bg-surface-2",
};

export function SectionHeading({
  kicker,
  title,
  intro,
  align = "center",
}: {
  kicker: string;
  title: string;
  intro?: ReactNode;
  align?: "center" | "start";
}) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-kicker text-gold ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-gold/60" aria-hidden="true" />
        {kicker}
        {center && <span className="h-px w-8 bg-gold/60" aria-hidden="true" />}
      </p>
      <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.1] text-balance sm:text-5xl">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}
