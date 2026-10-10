// Mask Text Reveal — adapted from Originkit.
// Clips the text away and wipes it into view once it scrolls on screen.

"use client";

import { useEffect, type ElementType } from "react";
import { useAnimate, useInView, useReducedMotion, type AnimationOptions } from "framer-motion";

const TAGS = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "span"] as const;
type Tag = (typeof TAGS)[number];

export type RevealDirection =
  | "center-horizontal"
  | "center-vertical"
  | "left-to-right"
  | "right-to-left"
  | "top-to-bottom"
  | "bottom-to-top";

const INSET_MAP: Record<RevealDirection, string> = {
  "center-horizontal": "inset(0% 50% 0% 50%)",
  "center-vertical": "inset(50% 0% 50% 0%)",
  "left-to-right": "inset(0% 100% 0% 0%)",
  "right-to-left": "inset(0% 0% 0% 100%)",
  "top-to-bottom": "inset(0% 0% 100% 0%)",
  "bottom-to-top": "inset(100% 0% 0% 0%)",
};

const END_CLIP = "inset(0% 0% 0% 0%)";

const DEFAULT_TRANSITION: AnimationOptions = {
  type: "tween",
  ease: [0.42, 0, 1, 1],
  duration: 1,
};

type Props = {
  text: string;
  tag?: Tag;
  direction?: RevealDirection;
  transition?: AnimationOptions;
  delay?: number;
  className?: string;
  /** Inline text color; defaults to the surrounding color so it follows the theme. */
  color?: string;
  id?: string;
};

export function CurtainReveal({
  text,
  tag = "h2",
  direction = "bottom-to-top",
  transition = DEFAULT_TRANSITION,
  delay = 0,
  className = "",
  color,
  id,
}: Props) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const inView = useInView(scope, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const startClip = INSET_MAP[direction] ?? INSET_MAP["bottom-to-top"];

  useEffect(() => {
    if (!scope.current) return;
    if (reduceMotion) {
      animate(scope.current, { clipPath: END_CLIP }, { duration: 0 });
      return;
    }
    if (!inView) {
      animate(scope.current, { clipPath: startClip }, { duration: 0 });
      return;
    }
    const t = setTimeout(() => {
      if (scope.current) animate(scope.current, { clipPath: END_CLIP }, { ...transition, delay });
    }, 50);
    return () => clearTimeout(t);
  }, [inView, reduceMotion, animate, scope, startClip, transition, delay]);

  const Element = ((TAGS as readonly string[]).includes(tag) ? tag : "h2") as ElementType;

  return (
    <Element
      ref={scope}
      id={id}
      className={className}
      style={{ clipPath: startClip, willChange: "clip-path", color }}
    >
      {text}
    </Element>
  );
}
