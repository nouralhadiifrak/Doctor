"use client";

import { useIsDark } from "@/lib/useIsDark";
import {
  MovingGradientButton,
  type GradientPalette,
  type MovingGradientButtonProps,
} from "./fx/MovingGradientButton";

// Palettes built from the brand colours #010736 · #0D1C42 · #22396F · #FCF1D0;
// the moving arrow heads use the logo's teal #1A9B8F. Filled light-mode buttons
// use that teal too (the "B").
const NAVY: GradientPalette = {
  fill: "#1A9B8F",
  hoverFill: "#137A70",
  textColor: "#FFFFFF",
  hoverTextColor: "#FFFFFF",
  borderColor: "#1A9B8F",
  strokeColor: "#137A70",
  headColor: "#FCF1D0",
};

const CREAM: GradientPalette = {
  fill: "#FCF1D0",
  hoverFill: "#FFFFFF",
  textColor: "#010736",
  hoverTextColor: "#22396F",
  borderColor: "#FCF1D0",
  strokeColor: "#22396F",
  headColor: "#010736",
};

const GHOST: GradientPalette = {
  fill: "rgba(252, 241, 208, 0)",
  hoverFill: "rgba(252, 241, 208, 0.08)",
  textColor: "#FCF1D0",
  hoverTextColor: "#FFFFFF",
  borderColor: "rgba(252, 241, 208, 0.28)",
  strokeColor: "rgba(252, 241, 208, 0.35)",
  headColor: "#1A9B8F",
};

const OUTLINE_LIGHT: GradientPalette = {
  fill: "rgba(245, 238, 219, 0)",
  hoverFill: "rgba(245, 238, 219, 1)",
  textColor: "#010736",
  hoverTextColor: "#22396F",
  borderColor: "rgba(1, 7, 54, 0.14)",
  strokeColor: "rgba(34, 57, 111, 0.45)",
  headColor: "#1A9B8F",
};

const OUTLINE_DARK: GradientPalette = {
  fill: "rgba(13, 28, 66, 0)",
  hoverFill: "rgba(13, 28, 66, 1)",
  textColor: "#FCF1D0",
  hoverTextColor: "#FFFFFF",
  borderColor: "rgba(252, 241, 208, 0.16)",
  strokeColor: "rgba(252, 241, 208, 0.35)",
  headColor: "#1A9B8F",
};

export type BrandVariant = "primary" | "navy" | "cream" | "ghost" | "outline";

type Props = Omit<MovingGradientButtonProps, "palette"> & { variant?: BrandVariant };

export function BrandButton({ variant = "primary", ...props }: Props) {
  const dark = useIsDark();
  const palette =
    variant === "navy"
      ? NAVY
      : variant === "cream"
        ? CREAM
        : variant === "ghost"
          ? GHOST
          : variant === "outline"
            ? dark
              ? OUTLINE_DARK
              : OUTLINE_LIGHT
            : NAVY; // teal in both themes
  return <MovingGradientButton palette={palette} {...props} />;
}
