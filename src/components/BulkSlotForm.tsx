"use client";

import { useState } from "react";
import { creaSlotMultipli } from "@/app/admin/actions";
import { MAX_PERSONE_DEFAULT } from "@/lib/slotConfig";

const GIORNI = [
  { valore: 1, label: "Lun" },
  { valore: 2, label: "Mar" },
  { valore: 3, label: "Mer" },
  { valore: 4, label: "Gio" },
  { valore: 5, label: "Ven" },
  { valore: 6, label: "Sab" },
  { valore: 0, label: "Dom" },
];

const TIPI_SLOT = [
  { valore: "mattina", label: "Mattina" },
  { valore: "pomeriggio", label: "Pomeriggio" },
  { valore: "giornata_intera", label: "Giornata intera" },
];

export default function BulkSlotForm() {
  const [giorniSelezionati, setGiorniSelezionati] = useState<number[]>([
    1, 2, 3, 4, 5, 6, 0,
  ]);
  const [tipiSelezionati, setTipiSelezionati] = useState<string[]>([
    "mattina",
  ]);

  function toggleGiorno(valore: number) {
    setGiorniSelezionati((prev) =>
      prev.includes(valore) ? prev.filter((g) => g !== valore) : [...prev, valore]
    );
  }

  function toggleTipo(valore: string) {
    setTipiSelezionati((prev) =>
      prev.includes(valore) ? prev.filter((t) => t !== valore) : [...prev, valore]
    );
  }

  return (
    <form
      action={creaSlotMultipli}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col gap-4"
    >
      <p className="text-sm text-slate-500">
        Crea tante uscite insieme su un intervallo di date. Quelle gi&agrave;
        esistenti (stessa data + stesso tipo) non vengono duplicate. Le puoi
        sempre bloccare o eliminare singolarmente dopo.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Dal
          </label>
          <input
            name="data_inizio"
            type="date"
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Al
          </label>
          <input
            name="data_fine"
            type="date"
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Giorni della settimana
        </label>
        <div className="flex flex-wrap gap-2">
          {GIORNI.map((g) => (
            <label
              key={g.valore}
              className={`text-sm px-3 py-1.5 rounded-full border cursor-pointer transition ${
                giorniSelezionati.includes(g.valore)
                  ? "bg-sky-600 border-sky-600 text-white"
                  : "border-slate-300 text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                name="giorni_settimana"
                value={g.valore}
                checked={giorniSelezionati.includes(g.valore)}
                onChange={() => toggleGiorno(g.valore)}
                className="hidden"
              />
              {g.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Slot da creare ogni giorno selezionato
        </label>
        <div className="flex flex-wrap gap-2">
          {TIPI_SLOT.map((t) => (
            <label
              key={t.valore}
              className={`text-sm px-3 py-1.5 rounded-full border cursor-pointer transition ${
                tipiSelezionati.includes(t.valore)
                  ? "bg-sky-600 border-sky-600 text-white"
                  : "border-slate-300 text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                name="tipi_slot"
                value={t.valore}
                checked={tipiSelezionati.includes(t.valore)}
                onChange={() => toggleTipo(t.valore)}
                className="hidden"
              />
              {t.label}
            </label>
          ))}
        </div>
      </div>

      <div className="max-w-xs">
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Max persone (per ogni slot creato)
        </label>
        <input
          name="max_persone"
          type="number"
          min={1}
          required
          defaultValue={MAX_PERSONE_DEFAULT}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={giorniSelezionati.length === 0 || tipiSelezionati.length === 0}
          className="bg-sky-600 hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition"
        >
          Crea disponibilit&agrave; multiple
        </button>
      </div>
    </form>
  );
}
