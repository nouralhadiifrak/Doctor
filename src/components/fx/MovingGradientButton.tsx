// Moving Gradient Button — adapted from Originkit.
// A pill whose border carries light trails that travel around it; on hover the
// fill and text change and the whole border lights up.

"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type MouseEventHandler,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useAnimate, useReducedMotion, type Transition } from "framer-motion";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const radiusFromPercent = (w: number, h: number, pct: number) =>
  (Math.min(w, h) / 2) * (Math.max(0, Math.min(100, pct)) / 100);

const BAND_MASK: CSSProperties = {
  maskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
  maskClip: "border-box, content-box",
  maskComposite: "exclude",
  WebkitMaskImage: "linear-gradient(#000 0 0), linear-gradient(#000 0 0)",
  WebkitMaskClip: "border-box, content-box",
  WebkitMaskComposite: "xor",
} as CSSProperties;

const DEG_PER_UNIT = 36;
const PX_PER_UNIT = 60;
const TRAIL_LAYERS = 6;

const perimeterOf = (w: number, h: number, r: number) => {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  return 2 * (w - 2 * rr) + 2 * (h - 2 * rr) + 2 * Math.PI * rr;
};

const outlinePath = (w: number, h: number, r: number) => {
  const rr = Math.max(0, Math.min(r, w / 2, h / 2));
  return (
    `M ${rr} 0 H ${w - rr} A ${rr} ${rr} 0 0 1 ${w} ${rr} ` +
    `V ${h - rr} A ${rr} ${rr} 0 0 1 ${w - rr} ${h} ` +
    `H ${rr} A ${rr} ${rr} 0 0 1 0 ${h - rr} ` +
    `V ${rr} A ${rr} ${rr} 0 0 1 ${rr} 0 Z`
  );
};

export type GradientPalette = {
  fill: string;
  hoverFill: string;
  textColor: string;
  hoverTextColor: string;
  borderColor: string;
  strokeColor: string;
  headColor: string;
};

export type GradientStroke = {
  direction?: "cw" | "ccw";
  movement?: "step" | "continuous";
  count?: number;
  trail?: number;
  speed?: number;
};

const DEFAULT_TRANSITION: Transition = { type: "tween", duration: 0.4, ease: [0.44, 0, 0.56, 1] };

export type MovingGradientButtonProps = {
  children: ReactNode;
  palette: GradientPalette;
  icon?: ReactNode;
  iconSide?: "start" | "end";
  href?: string;
  newTab?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  ariaLabel?: string;
  className?: string;
  /** Border band thickness in px. */
  band?: number;
  rounded?: number;
  stroke?: GradientStroke;
  transition?: Transition;
};

export function MovingGradientButton({
  children,
  palette,
  icon,
  iconSide = "start",
  href,
  newTab = false,
  type = "button",
  disabled,
  onClick,
  ariaLabel,
  className = "",
  band = 2,
  rounded = 100,
  stroke = {},
  transition = DEFAULT_TRANSITION,
}: MovingGradientButtonProps) {
  const { fill, hoverFill, textColor, hoverTextColor, borderColor, strokeColor, headColor } = palette;
  const { direction = "cw", movement = "step", count = 2, trail = 100, speed: speedPct = 22 } = stroke;
  const speed = 2 * (Math.max(0, Math.min(100, Math.round(speedPct))) / 50);
  const reduceMotion = useReducedMotion();

  const [scope, animate] = useAnimate<HTMLElement>();
  const glowRef = useRef<HTMLDivElement | null>(null);
  const coverRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLSpanElement | null>(null);
  const dashRefs = useRef<Array<SVGPathElement | null>>([]);

  const [box, setBox] = useState({ w: 0, h: 0 });
  useIsoLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;
    const read = () =>
      setBox((prev) =>
        prev.w === el.offsetWidth && prev.h === el.offsetHeight ? prev : { w: el.offsetWidth, h: el.offsetHeight },
      );
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [scope]);

  const radiusPx = radiusFromPercent(box.w, box.h, rounded);
  const side = Math.ceil(Math.hypot(box.w, box.h) * 1.02);

  const hovered = useRef(false);
  const focused = useRef(false);
  const lit = useRef(false);

  const sign = direction === "ccw" ? -1 : 1;
  const live = useRef({ degPerSec: 0, pxPerSec: 0, sign: 1, movement, lens: [] as number[] });

  const n = Math.max(1, Math.round(count));
  const period = 360 / n;
  const tailDeg = Math.max(0.5, (period * Math.max(0, Math.min(100, trail))) / 100);
  const knee = (tailDeg * 0.45).toFixed(2);
  const gradient =
    direction === "cw"
      ? `repeating-conic-gradient(from 0deg, transparent 0deg, transparent ${(period - tailDeg).toFixed(2)}deg, ${strokeColor} ${(period - tailDeg * 0.45).toFixed(2)}deg, ${headColor} ${period.toFixed(2)}deg)`
      : `repeating-conic-gradient(from 0deg, ${headColor} 0deg, ${strokeColor} ${knee}deg, transparent ${tailDeg.toFixed(2)}deg, transparent ${period.toFixed(2)}deg)`;

  const perimeter = perimeterOf(box.w, box.h, radiusPx);
  const slice = perimeter > 0 ? perimeter / n : 0;
  const trailLen = Math.max(1, (slice * Math.max(0, Math.min(100, trail))) / 100);
  const dashLayers = useMemo(
    () =>
      Array.from({ length: TRAIL_LAYERS }, (_, i) => ({
        len: (trailLen * (TRAIL_LAYERS - i)) / TRAIL_LAYERS,
        color: i === TRAIL_LAYERS - 1 ? headColor : strokeColor,
        opacity: (i + 1) / TRAIL_LAYERS,
      })),
    [trailLen, strokeColor, headColor],
  );

  useEffect(() => {
    live.current = {
      movement,
      sign,
      degPerSec: Math.max(0, speed) * DEG_PER_UNIT * sign,
      pxPerSec: Math.max(0, speed) * PX_PER_UNIT * sign,
      lens: dashLayers.map((d) => d.len),
    };
  }, [movement, sign, speed, dashLayers]);

  // Animation loop; paused while off screen and disabled for reduced motion.
  useEffect(() => {
    const el = scope.current;
    if (!el || reduceMotion) return;
    let raf = 0;
    let last = 0;
    let angle = 0;
    let head = 0;
    let visible = false;

    const tick = (t: number) => {
      if (!last) last = t;
      const dt = (t - last) / 1000;
      last = t;
      const l = live.current;
      if (l.movement === "continuous") {
        head += l.pxPerSec * dt;
        dashRefs.current.forEach((path, i) => {
          const len = l.lens[i];
          if (path && len !== undefined) path.style.strokeDashoffset = String(l.sign >= 0 ? len - head : -head);
        });
      } else {
        angle = (angle + l.degPerSec * dt) % 360;
        if (glowRef.current) glowRef.current.style.transform = `rotate(${angle}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !visible) {
        visible = true;
        last = 0;
        raf = requestAnimationFrame(tick);
      } else if (!entry.isIntersecting && visible) {
        visible = false;
        cancelAnimationFrame(raf);
      }
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [scope, reduceMotion]);

  const paint = useCallback(
    (want: boolean, instant: boolean) => {
      const t = instant ? { duration: 0 } : transition;
      if (scope.current) animate(scope.current, { backgroundColor: want ? hoverFill : fill }, t);
      if (coverRef.current) animate(coverRef.current, { opacity: want ? 1 : 0 }, t);
      if (contentRef.current) animate(contentRef.current, { color: want ? hoverTextColor : textColor }, t);
    },
    [animate, scope, transition, fill, hoverFill, textColor, hoverTextColor],
  );

  // Repaint instantly when the palette changes (e.g. theme switch).
  useEffect(() => {
    paint(lit.current, true);
  }, [paint]);

  const sync = useCallback(() => {
    const want = hovered.current || focused.current;
    if (want === lit.current) return;
    lit.current = want;
    paint(want, false);
  }, [paint]);

  const onFocus = useCallback(
    (e: FocusEvent<HTMLElement>) => {
      let visible = true;
      try {
        visible = e.currentTarget.matches(":focus-visible");
      } catch {}
      if (!visible) return;
      focused.current = true;
      sync();
    },
    [sync],
  );

  const coverGradient = `conic-gradient(from 0deg, ${strokeColor}, ${headColor}, ${strokeColor}, ${headColor}, ${strokeColor})`;
  const isLink = Boolean(href);
  const external = isLink && newTab;

  const shared = {
    "aria-label": ariaLabel,
    onClick,
    onPointerEnter: () => {
      hovered.current = true;
      sync();
    },
    onPointerLeave: () => {
      hovered.current = false;
      sync();
    },
    onFocus,
    onBlur: () => {
      focused.current = false;
      sync();
    },
    className: `relative isolate inline-flex min-h-11 items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold transition-transform duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${className}`,
    style: {
      borderRadius: radiusPx || 9999,
      backgroundColor: fill,
      color: textColor,
      textDecoration: "none",
      WebkitTapHighlightColor: "transparent",
    } as CSSProperties,
  };

  const inner = (
    <>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          boxSizing: "border-box",
          padding: band,
          borderRadius: radiusPx || 9999,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
          ...BAND_MASK,
        }}
      >
        <span style={{ position: "absolute", inset: 0, background: borderColor }} />
        {movement !== "continuous" && side > 0 && (
          <span
            ref={glowRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: side,
              height: side,
              marginTop: -side / 2,
              marginLeft: -side / 2,
              background: gradient,
            }}
          />
        )}
        {movement === "continuous" && box.w > 0 && box.h > 0 && (
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${box.w} ${box.h}`}
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, overflow: "visible" }}
          >
            {dashLayers.map((d, i) => (
              <path
                key={i}
                ref={(el) => {
                  dashRefs.current[i] = el;
                }}
                d={outlinePath(box.w, box.h, radiusPx)}
                fill="none"
                stroke={d.color}
                strokeOpacity={d.opacity}
                strokeWidth={2 * band + 2}
                strokeDasharray={`${d.len} ${Math.max(0.01, slice - d.len)}`}
              />
            ))}
          </svg>
        )}
        <span ref={coverRef} style={{ position: "absolute", inset: 0, background: coverGradient, opacity: 0 }} />
      </span>
      <span
        ref={contentRef}
        className={`relative z-[1] inline-flex items-center gap-2 whitespace-nowrap ${iconSide === "end" ? "flex-row-reverse" : ""}`}
        style={{ color: textColor }}
      >
        {icon && (
          <span aria-hidden="true" className="inline-flex text-base">
            {icon}
          </span>
        )}
        {children}
      </span>
    </>
  );

  if (isLink) {
    return (
      <motion.a
        {...shared}
        ref={scope as unknown as RefObject<HTMLAnchorElement>}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {inner}
      </motion.a>
    );
  }
  return (
    <motion.button {...shared} ref={scope as unknown as RefObject<HTMLButtonElement>} type={type} disabled={disabled}>
      {inner}
    </motion.button>
  );
}
