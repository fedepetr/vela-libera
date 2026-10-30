"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PRESET_ORARI, calcolaPrezzo } from "@/lib/slotConfig";
import type { TipoSlot } from "@/lib/types";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?errore=1");
  }

  redirect("/admin/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function confermaPrenotazione(prenotazioneId: string, slotId: string) {
  const supabase = await createClient();

  await supabase
    .from("prenotazioni")
    .update({ stato: "confermata" })
    .eq("id", prenotazioneId);

  await supabase.from("slots").update({ stato: "occupato" }).eq("id", slotId);

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function rifiutaPrenotazione(prenotazioneId: string, slotId: string) {
  const supabase = await createClient();

  await supabase
    .from("prenotazioni")
    .update({ stato: "rifiutata" })
    .eq("id", prenotazioneId);

  await supabase
    .from("slots")
    .update({ stato: "disponibile" })
    .eq("id", slotId);

  revalidatePath("/admin/dashboard");
  revalidatePath("/");
}

export async function creaSlot(formData: FormData) {
  const supabase = await createClient();

  const data = formData.get("data") as string;
  const tipoSlot = formData.get("tipo_slot") as string;
  const oraInizio = formData.get("ora_inizio") as string;
  const oraFine = formData.get("ora_fine") as string;
  const prezzo = Number(formData.get("prezzo"));
  const maxPersone = Number(formData.get("max_persone"));

  await supabase.from("slots").insert({
    data,
    tipo_slot: tipoSlot,
    ora_inizio: oraInizio,
    ora_fine: oraFine,
    prezzo,
    max_persone: maxPersone,
  });

  revalidatePath("/admin/slots");
  revalidatePath("/");
}

const GIORNI_MAX_RANGE = 366;

export async function creaSlotMultipli(formData: FormData) {
  const supabase = await createClient();

  const dataInizio = formData.get("data_inizio") as string;
  const dataFine = formData.get("data_fine") as string;
  const giorniSettimana = formData.getAll("giorni_settimana").map(Number);
  const tipiSlot = formData.getAll("tipi_slot") as TipoSlot[];
  const maxPersone = Number(formData.get("max_persone"));

  if (!dataInizio || !dataFine || giorniSettimana.length === 0 || tipiSlot.length === 0) {
    revalidatePath("/admin/slots");
    return;
  }

  const righe: {
    data: string;
    tipo_slot: TipoSlot;
    ora_inizio: string;
    ora_fine: string;
    prezzo: number;
    max_persone: number;
  }[] = [];

  const cursor = new Date(dataInizio + "T00:00:00");
  const fine = new Date(dataFine + "T00:00:00");

  for (let i = 0; cursor <= fine && i < GIORNI_MAX_RANGE; i++) {
    if (giorniSettimana.includes(cursor.getDay())) {
      const dataStr = cursor.toISOString().slice(0, 10);
      for (const tipo of tipiSlot) {
        const preset = PRESET_ORARI[tipo];
        if (!preset) continue;
        righe.push({
          data: dataStr,
          tipo_slot: tipo,
          ora_inizio: preset.ora_inizio,
          ora_fine: preset.ora_fine,
          prezzo: calcolaPrezzo(preset.ora_inizio, preset.ora_fine, maxPersone),
          max_persone: maxPersone,
        });
      }
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  if (righe.length > 0) {
    await supabase
      .from("slots")
      .upsert(righe, { onConflict: "data,tipo_slot", ignoreDuplicates: true });
  }

  revalidatePath("/admin/slots");
  revalidatePath("/");
}

export async function bloccaSlot(slotId: string) {
  const supabase = await createClient();
  await supabase.from("slots").update({ stato: "bloccato" }).eq("id", slotId);
  revalidatePath("/admin/slots");
  revalidatePath("/");
}

export async function sbloccaSlot(slotId: string) {
  const supabase = await createClient();
  await supabase
    .from("slots")
    .update({ stato: "disponibile" })
    .eq("id", slotId);
  revalidatePath("/admin/slots");
  revalidatePath("/");
}

export async function eliminaSlot(slotId: string) {
  const supabase = await createClient();
  await supabase.from("slots").delete().eq("id", slotId);
  revalidatePath("/admin/slots");
  revalidatePath("/");
}
