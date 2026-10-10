"use client";

import { useSyncExternalStore } from "react";

const subscribe = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
};

export const isDarkNow = () => document.documentElement.classList.contains("dark");

/** Tracks the `dark` class that the theme toggle sets on <html>. */
export function useIsDark() {
  return useSyncExternalStore(subscribe, isDarkNow, () => false);
}
