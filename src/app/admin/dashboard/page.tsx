import { createClient } from "@/lib/supabase/server";
import AdminNav from "@/components/AdminNav";
import { TIPO_SLOT_LABEL, type Prenotazione } from "@/lib/types";
import { formatData, formatOra, formatPrezzo } from "@/lib/format";
import { confermaPrenotazione, rifiutaPrenotazione } from "../actions";

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data: prenotazioni } = await supabase
    .from("prenotazioni")
    .select("*, slots(*)")
    .order("created_at", { ascending: false });

  const lista = (prenotazioni as Prenotazione[] | null) ?? [];
  const inAttesa = lista.filter((p) => p.stato === "in_attesa");
  const altre = lista.filter((p) => p.stato !== "in_attesa");

  return (
    <main className="min-h-screen bg-slate-50">
      <AdminNav />

      <div className="max-w-4xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          Richieste in attesa ({inAttesa.length})
        </h1>

        {inAttesa.length === 0 && (
          <p className="text-slate-500 mb-10">Nessuna richiesta in attesa.</p>
        )}

        <div className="flex flex-col gap-4 mb-12">
          {inAttesa.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-amber-300 rounded-xl p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3">
                <div>
                  <p className="font-bold text-slate-800 capitalize">
                    {p.slots ? formatData(p.slots.data, "it") : ""} ·{" "}
                    {p.slots ? TIPO_SLOT_LABEL[p.slots.tipo_slot] : ""}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {p.slots
                      ? `${formatOra(p.slots.ora_inizio)} - ${formatOra(
                          p.slots.ora_fine
                        )} · ${formatPrezzo(p.slots.prezzo, "it")}`
                      : ""}
                  </p>
                  <p className="mt-2 text-slate-700">
                    <strong>{p.nome}</strong> · {p.num_persone} persone
                  </p>
                  <p className="text-slate-600 text-sm">
                    Tel: {p.telefono}
                    {p.email ? ` · Email: ${p.email}` : ""}
                  </p>
                  {p.note && (
                    <p className="text-slate-500 text-sm italic mt-1">
                      Note: {p.note}
                    </p>
                  )}
                </div>

                <div className="flex gap-2 shrink-0">
                  <form
                    action={confermaPrenotazione.bind(null, p.id, p.slot_id)}
                  >
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Conferma
                    </button>
                  </form>
                  <form
                    action={rifiutaPrenotazione.bind(null, p.id, p.slot_id)}
                  >
                    <button
                      type="submit"
                      className="bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold py-2 px-4 rounded-lg transition"
                    >
                      Rifiuta
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-4">Storico</h2>
        <div className="flex flex-col gap-2">
          {altre.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-200 rounded-lg p-4 text-sm flex justify-between items-center"
            >
              <span>
                {p.slots ? formatData(p.slots.data, "it") : ""} · {p.nome} ·{" "}
                {p.num_persone} persone
              </span>
              <span
                className={
                  p.stato === "confermata"
                    ? "text-green-700 font-semibold"
                    : "text-red-500 font-semibold"
                }
              >
                {p.stato === "confermata" ? "Confermata" : "Rifiutata"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
