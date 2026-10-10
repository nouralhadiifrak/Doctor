import type { Locale } from "../config";
import ar from "./ar";
import en from "./en";
import fr, { type Dictionary } from "./fr";

const dictionaries: Record<Locale, Dictionary> = { fr, en, ar };

export const getDictionary = (locale: Locale) => dictionaries[locale];
export type { Dictionary };
