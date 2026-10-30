import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/AdminNav";
import SlotFormTabs from "@/components/SlotFormTabs";
import { STATO_SLOT_LABEL, TIPO_SLOT_LABEL, type Slot } from "@/lib/types";
import { formatData, formatOra, formatPrezzo } from "@/lib/format";
import { bloccaSlot, sbloccaSlot, eliminaSlot } from "../actions";

const STATO_COLORE: Record<string, string> = {
  disponibile: "text-green-700 bg-green-50",
  in_attesa: "text-amber-700 bg-amber-50",
  occupato: "text-slate-700 bg-slate-100",
  bloccato: "text-red-600 bg-red-50",
};

export default async function SlotsPage() {
  const supabase = await createClient();
  const oggi = new Date().toISOString().slice(0, 10);

  const { data: slots } = await supabase
    .from("slots")
    .select("*")
    .gte("data", oggi)
    .order("data", { ascending: true })
    .order("ora_inizio", { ascending: true });

  const lista = (slots as Slot[] | null) ?? [];

  return (
    <main className="min-h-screen bg-slate-50">
      <AdminNav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">
          Nuova uscita
        </h1>
        <SlotFormTabs />

        <h2 className="text-xl font-bold text-slate-800 mt-10 mb-4">
          Calendario uscite
        </h2>

        <div className="flex flex-col gap-2">
          {lista.length === 0 && (
            <p className="text-slate-500">Nessuna uscita programmata.</p>
          )}

          {lista.map((slot) => (
            <div
              key={slot.id}
              className="bg-white border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
            >
              <div>
                <p className="font-semibold text-slate-800 capitalize">
                  {formatData(slot.data, "it")} · {TIPO_SLOT_LABEL[slot.tipo_slot]}
                </p>
                <p className="text-sm text-slate-500">
                  {formatOra(slot.ora_inizio)} - {formatOra(slot.ora_fine)} ·{" "}
                  {formatPrezzo(slot.prezzo, "it")} · max {slot.max_persone} persone
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${STATO_COLORE[slot.stato]}`}
                >
                  {STATO_SLOT_LABEL[slot.stato]}
                </span>

                {slot.stato === "bloccato" ? (
                  <form action={sbloccaSlot.bind(null, slot.id)}>
                    <button className="text-sm text-sky-600 hover:underline">
                      Sblocca
                    </button>
                  </form>
                ) : (
                  slot.stato === "disponibile" && (
                    <form action={bloccaSlot.bind(null, slot.id)}>
                      <button className="text-sm text-slate-500 hover:underline">
                        Blocca
                      </button>
                    </form>
                  )
                )}

                <form action={eliminaSlot.bind(null, slot.id)}>
                  <button className="text-sm text-red-500 hover:underline">
                    Elimina
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
