"use client";

import { useIsDark } from "@/lib/useIsDark";
import {
  MovingGradientButton,
  type GradientPalette,
  type MovingGradientButtonProps,
} from "./fx/MovingGradientButton";

// Palettes from the logo: navy #0E275B, teal #1A9B8F, light #F2F7F0.
const NAVY: GradientPalette = {
  fill: "#0E275B",
  hoverFill: "#0A1E46",
  textColor: "#FFFFFF",
  hoverTextColor: "#FFFFFF",
  borderColor: "#0E275B",
  strokeColor: "#0A1E46",
  headColor: "#1A9B8F",
};

const TEAL: GradientPalette = {
  fill: "#1A9B8F",
  hoverFill: "#22B3A5",
  textColor: "#071631",
  hoverTextColor: "#071631",
  borderColor: "#1A9B8F",
  strokeColor: "#137A70",
  headColor: "#F2F7F0",
};

const LIGHT: GradientPalette = {
  fill: "#F2F7F0",
  hoverFill: "#FFFFFF",
  textColor: "#0E275B",
  hoverTextColor: "#137A70",
  borderColor: "#F2F7F0",
  strokeColor: "#1A9B8F",
  headColor: "#0E275B",
};

const GHOST: GradientPalette = {
  fill: "rgba(242, 247, 240, 0)",
  hoverFill: "rgba(242, 247, 240, 0.08)",
  textColor: "#F2F7F0",
  hoverTextColor: "#FFFFFF",
  borderColor: "rgba(242, 247, 240, 0.28)",
  strokeColor: "rgba(26, 155, 143, 0.5)",
  headColor: "#1A9B8F",
};

const OUTLINE_LIGHT: GradientPalette = {
  fill: "rgba(234, 244, 243, 0)",
  hoverFill: "rgba(234, 244, 243, 1)",
  textColor: "#0E275B",
  hoverTextColor: "#137A70",
  borderColor: "rgba(14, 39, 91, 0.16)",
  strokeColor: "rgba(26, 155, 143, 0.5)",
  headColor: "#1A9B8F",
};

const OUTLINE_DARK: GradientPalette = {
  fill: "rgba(10, 30, 70, 0)",
  hoverFill: "rgba(10, 30, 70, 1)",
  textColor: "#EEF6F5",
  hoverTextColor: "#FFFFFF",
  borderColor: "rgba(238, 246, 245, 0.18)",
  strokeColor: "rgba(26, 155, 143, 0.55)",
  headColor: "#1A9B8F",
};

// "primary" and "outline" follow the theme; "navy" and "outlineLight" are fixed,
// for buttons inside the light cards that dark mode keeps light.
export type BrandVariant = "primary" | "navy" | "cream" | "ghost" | "outline" | "outlineLight";

type Props = Omit<MovingGradientButtonProps, "palette"> & { variant?: BrandVariant };

export function BrandButton({ variant = "primary", ...props }: Props) {
  const dark = useIsDark();
  const palette =
    variant === "navy"
      ? NAVY
      : variant === "cream"
        ? LIGHT
        : variant === "ghost"
          ? GHOST
          : variant === "outlineLight"
            ? OUTLINE_LIGHT
            : variant === "outline"
              ? dark
                ? OUTLINE_DARK
                : OUTLINE_LIGHT
              : dark
                ? TEAL
                : NAVY;
  return <MovingGradientButton palette={palette} {...props} />;
}
