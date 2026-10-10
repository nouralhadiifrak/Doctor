import type { ReactNode } from "react";
import { CurtainReveal } from "./fx/CurtainReveal";

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
      <CurtainReveal
        tag="h2"
        text={title}
        className="mt-4 pb-1 font-display text-4xl font-semibold leading-[1.1] text-balance sm:text-5xl"
      />
      {intro && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{intro}</p>}
    </div>
  );
}
