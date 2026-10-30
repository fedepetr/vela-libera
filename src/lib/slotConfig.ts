import type { TipoSlot } from "@/lib/types";

export const PREZZO_ORA_PERSONA = 10;
export const MAX_PERSONE_DEFAULT = 8;

export const PRESET_ORARI: Record<TipoSlot, { ora_inizio: string; ora_fine: string }> = {
  mattina: { ora_inizio: "09:00", ora_fine: "13:00" },
  pomeriggio: { ora_inizio: "14:00", ora_fine: "18:00" },
  giornata_intera: { ora_inizio: "09:00", ora_fine: "18:00" },
};

export function calcolaOre(inizio: string, fine: string): number {
  const [hi, mi] = inizio.split(":").map(Number);
  const [hf, mf] = fine.split(":").map(Number);
  return Math.max(0, hf + mf / 60 - (hi + mi / 60));
}

export function calcolaPrezzo(inizio: string, fine: string, persone: number): number {
  return calcolaOre(inizio, fine) * persone * PREZZO_ORA_PERSONA;
}
