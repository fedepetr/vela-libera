import type { Slot } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { INTL_LOCALE } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function formatData(data: string, locale: Locale): string {
  const d = new Date(data + "T00:00:00");
  return d.toLocaleDateString(INTL_LOCALE[locale], {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatOra(ora: string): string {
  return ora.slice(0, 5);
}

export function formatPrezzo(prezzo: number, locale: Locale): string {
  return prezzo.toLocaleString(INTL_LOCALE[locale], {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  });
}

function riempi(template: string, valori: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, chiave) => valori[chiave] ?? "");
}

export function linkWhatsapp(slot: Slot, locale: Locale): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const dict = getDictionary(locale);
  const testo = riempi(dict.whatsapp.slotMessage, {
    tipo: dict.slot.types[slot.tipo_slot].toLowerCase(),
    data: formatData(slot.data, locale),
    orario: `${formatOra(slot.ora_inizio)}-${formatOra(slot.ora_fine)}`,
  });
  return `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
}

export function linkWhatsappRichiestaData(data: string, locale: Locale): string {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const dict = getDictionary(locale);
  const testo = riempi(dict.whatsapp.dateRequest, {
    data: formatData(data, locale),
  });
  return `https://wa.me/${numero}?text=${encodeURIComponent(testo)}`;
}
