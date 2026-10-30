export type TipoSlot = "mattina" | "pomeriggio" | "giornata_intera";

export type StatoSlot = "disponibile" | "in_attesa" | "occupato" | "bloccato";

export type StatoPrenotazione = "in_attesa" | "confermata" | "rifiutata";

export interface Slot {
  id: string;
  data: string; // YYYY-MM-DD
  tipo_slot: TipoSlot;
  ora_inizio: string; // HH:MM:SS
  ora_fine: string;
  prezzo: number;
  max_persone: number;
  stato: StatoSlot;
  created_at: string;
}

export interface Prenotazione {
  id: string;
  slot_id: string;
  nome: string;
  telefono: string;
  email: string | null;
  num_persone: number;
  note: string | null;
  stato: StatoPrenotazione;
  created_at: string;
  slots?: Slot;
}

export const TIPO_SLOT_LABEL: Record<TipoSlot, string> = {
  mattina: "Mattina",
  pomeriggio: "Pomeriggio",
  giornata_intera: "Giornata intera",
};

export const STATO_SLOT_LABEL: Record<StatoSlot, string> = {
  disponibile: "Disponibile",
  in_attesa: "In attesa di conferma",
  occupato: "Occupato",
  bloccato: "Non disponibile",
};
