"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";

export async function creaPrenotazione(formData: FormData) {
  const slotId = formData.get("slot_id") as string;
  const localeRaw = formData.get("locale") as string;
  const locale = isLocale(localeRaw) ? localeRaw : DEFAULT_LOCALE;

  const nome = (formData.get("nome") as string)?.trim();
  const telefono = (formData.get("telefono") as string)?.trim();
  const email = (formData.get("email") as string)?.trim() || null;
  const numPersone = Number(formData.get("num_persone"));
  const note = (formData.get("note") as string)?.trim() || null;

  if (!slotId || !nome || !telefono || !numPersone) {
    redirect(`/${locale}/prenota/${slotId}?errore=1`);
  }

  const supabase = await createClient();

  const { data: slot, error: slotError } = await supabase
    .from("slots")
    .select("*")
    .eq("id", slotId)
    .single();

  if (slotError || !slot || slot.stato !== "disponibile") {
    redirect(`/${locale}/prenota/${slotId}?errore=occupato`);
  }

  const { error: insertError } = await supabase.from("prenotazioni").insert({
    slot_id: slotId,
    nome,
    telefono,
    email,
    num_persone: numPersone,
    note,
  });

  if (insertError) {
    // Slot preso da un altro tra il controllo sopra e l'insert: il database lo rifiuta.
    const occupato = insertError.message.includes("slot_non_disponibile");
    redirect(`/${locale}/prenota/${slotId}?errore=${occupato ? "occupato" : "1"}`);
  }

  // Lo slot passa "in_attesa" nel database, con il trigger in supabase/schema.sql.
  redirect(`/${locale}/prenota/${slotId}/grazie`);
}
