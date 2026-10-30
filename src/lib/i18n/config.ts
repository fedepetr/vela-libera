export const LOCALES = ["en", "it", "es"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Codice per toLocaleDateString / toLocaleString */
export const INTL_LOCALE: Record<Locale, string> = {
  en: "en-GB",
  it: "it-IT",
  es: "es-ES",
};
