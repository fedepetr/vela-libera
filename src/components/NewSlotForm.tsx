"use client";

import { useState } from "react";
import { creaSlot } from "@/app/admin/actions";
import {
  PRESET_ORARI,
  PREZZO_ORA_PERSONA,
  MAX_PERSONE_DEFAULT,
  calcolaPrezzo,
} from "@/lib/slotConfig";

export default function NewSlotForm() {
  const [tipoSlot, setTipoSlot] = useState("mattina");
  const [oraInizio, setOraInizio] = useState(PRESET_ORARI.mattina.ora_inizio);
  const [oraFine, setOraFine] = useState(PRESET_ORARI.mattina.ora_fine);
  const [maxPersone, setMaxPersone] = useState(MAX_PERSONE_DEFAULT);
  const [prezzo, setPrezzo] = useState(
    calcolaPrezzo(
      PRESET_ORARI.mattina.ora_inizio,
      PRESET_ORARI.mattina.ora_fine,
      MAX_PERSONE_DEFAULT
    )
  );

  function handleTipoChange(value: string) {
    setTipoSlot(value);
    const preset = PRESET_ORARI[value as keyof typeof PRESET_ORARI];
    setOraInizio(preset.ora_inizio);
    setOraFine(preset.ora_fine);
    setPrezzo(calcolaPrezzo(preset.ora_inizio, preset.ora_fine, maxPersone));
  }

  function handleOraChange(inizio: string, fine: string) {
    setOraInizio(inizio);
    setOraFine(fine);
    setPrezzo(calcolaPrezzo(inizio, fine, maxPersone));
  }

  function handlePersoneChange(persone: number) {
    setMaxPersone(persone);
    setPrezzo(calcolaPrezzo(oraInizio, oraFine, persone));
  }

  return (
    <form
      action={creaSlot}
      className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Data
        </label>
        <input
          name="data"
          type="date"
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Tipo uscita
        </label>
        <select
          name="tipo_slot"
          value={tipoSlot}
          onChange={(e) => handleTipoChange(e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        >
          <option value="mattina">Mattina</option>
          <option value="pomeriggio">Pomeriggio</option>
          <option value="giornata_intera">Giornata intera</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Ora inizio
        </label>
        <input
          name="ora_inizio"
          type="time"
          required
          value={oraInizio}
          onChange={(e) => handleOraChange(e.target.value, oraFine)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Ora fine
        </label>
        <input
          name="ora_fine"
          type="time"
          required
          value={oraFine}
          onChange={(e) => handleOraChange(oraInizio, e.target.value)}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Max persone
        </label>
        <input
          name="max_persone"
          type="number"
          min={1}
          required
          value={maxPersone}
          onChange={(e) => handlePersoneChange(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Prezzo (€) · {PREZZO_ORA_PERSONA}€/persona/ora
        </label>
        <input
          name="prezzo"
          type="number"
          min={0}
          step="0.01"
          required
          value={prezzo}
          onChange={(e) => setPrezzo(Number(e.target.value))}
          className="w-full border border-slate-300 rounded-lg px-3 py-2"
        />
      </div>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 px-6 rounded-lg transition"
        >
          Aggiungi uscita singola
        </button>
      </div>
    </form>
  );
}
