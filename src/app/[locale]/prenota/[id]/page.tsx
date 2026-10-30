import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { type Slot } from "@/lib/types";
import { formatData, formatOra, formatPrezzo } from "@/lib/format";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { creaPrenotazione } from "./actions";

export default async function PrenotaPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; locale: string }>;
  searchParams: Promise<{ errore?: string }>;
}) {
  const { id, locale } = await params;
  const { errore } = await searchParams;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const supabase = await createClient();

  const { data: slotData } = await supabase
    .from("slots")
    .select("*")
    .eq("id", id)
    .single();

  if (!slotData) {
    notFound();
  }

  const slot = slotData as Slot;
  const nonDisponibile = slot.stato !== "disponibile";

  return (
    <main className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-lg mx-auto bg-white border border-slate-200 rounded-xl shadow-sm p-6">
        <Link href={`/${locale}`} className="text-sky-600 text-sm hover:underline">
          &larr; {dict.booking.back}
        </Link>

        <h1 className="text-2xl font-bold text-slate-800 mt-3 first-letter:uppercase">
          {formatData(slot.data, locale)}
        </h1>
        <p className="text-slate-500 mb-1">
          {dict.slot.types[slot.tipo_slot]} · {formatOra(slot.ora_inizio)} -{" "}
          {formatOra(slot.ora_fine)} · {dict.slot.maxPeople} {slot.max_persone}{" "}
          {dict.slot.people}
        </p>
        <p className="text-xl font-extrabold text-slate-900 mb-5">
          {formatPrezzo(slot.prezzo, locale)}
        </p>

        {nonDisponibile ? (
          <p className="text-red-600 font-medium">{dict.booking.unavailable}</p>
        ) : (
          <>
            {errore && (
              <p className="text-red-600 text-sm mb-4">
                {errore === "occupato"
                  ? dict.booking.errorTaken
                  : dict.booking.errorGeneric}
              </p>
            )}

            <form action={creaPrenotazione} className="flex flex-col gap-4">
              <input type="hidden" name="slot_id" value={slot.id} />
              <input type="hidden" name="locale" value={locale} />

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {dict.booking.name} *
                </label>
                <input
                  name="nome"
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {dict.booking.phone} *
                </label>
                <input
                  name="telefono"
                  type="tel"
                  required
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {dict.booking.email}
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {dict.booking.people} *
                </label>
                <input
                  name="num_persone"
                  type="number"
                  min={1}
                  max={slot.max_persone}
                  required
                  defaultValue={1}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  {dict.booking.notes}
                </label>
                <textarea
                  name="note"
                  rows={3}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <p className="text-xs text-slate-400">{dict.booking.disclaimer}</p>

              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-lg transition"
              >
                {dict.booking.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
