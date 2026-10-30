"use client";

import { useMemo, useState } from "react";
import type { Slot } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import { INTL_LOCALE } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { linkWhatsappRichiestaData } from "@/lib/format";
import SlotCard from "./SlotCard";

function toDateStr(d: Date): string {
  const anno = d.getFullYear();
  const mese = String(d.getMonth() + 1).padStart(2, "0");
  const giorno = String(d.getDate()).padStart(2, "0");
  return `${anno}-${mese}-${giorno}`;
}

export default function AvailabilityCalendar({
  slots,
  dict,
  locale,
}: {
  slots: Slot[];
  dict: Dictionary;
  locale: Locale;
}) {
  const oggi = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const slotPerData = useMemo(() => {
    const mappa = new Map<string, Slot[]>();
    for (const slot of slots) {
      const lista = mappa.get(slot.data) ?? [];
      lista.push(slot);
      mappa.set(slot.data, lista);
    }
    return mappa;
  }, [slots]);

  const primaDataDisponibile = slots[0]?.data ?? toDateStr(oggi);

  const [meseVisualizzato, setMeseVisualizzato] = useState(() => {
    const d = new Date(primaDataDisponibile + "T00:00:00");
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const [dataSelezionata, setDataSelezionata] = useState(primaDataDisponibile);

  const celle = useMemo(() => {
    const anno = meseVisualizzato.getFullYear();
    const mese = meseVisualizzato.getMonth();
    const primoGiorno = new Date(anno, mese, 1);
    const ultimoGiorno = new Date(anno, mese + 1, 0);

    const offsetIniziale = (primoGiorno.getDay() + 6) % 7;
    const risultato: { data: Date | null }[] = [];

    for (let i = 0; i < offsetIniziale; i++) risultato.push({ data: null });
    for (let giorno = 1; giorno <= ultimoGiorno.getDate(); giorno++) {
      risultato.push({ data: new Date(anno, mese, giorno) });
    }
    return risultato;
  }, [meseVisualizzato]);

  const meseCorrente =
    meseVisualizzato.getFullYear() === oggi.getFullYear() &&
    meseVisualizzato.getMonth() === oggi.getMonth();

  function cambiaMese(delta: number) {
    setMeseVisualizzato(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1)
    );
  }

  const slotsGiornoSelezionato = slotPerData.get(dataSelezionata) ?? [];
  const dataSelezionataObj = new Date(dataSelezionata + "T00:00:00");
  const dataPassata = dataSelezionataObj < oggi;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <button
            type="button"
            onClick={() => cambiaMese(-1)}
            disabled={meseCorrente}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            aria-label={dict.availability.prevMonth}
          >
            &lsaquo;
          </button>
          <span className="font-semibold text-slate-800 capitalize">
            {dict.availability.months[meseVisualizzato.getMonth()]}{" "}
            {meseVisualizzato.getFullYear()}
          </span>
          <button
            type="button"
            onClick={() => cambiaMese(1)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            aria-label={dict.availability.nextMonth}
          >
            &rsaquo;
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-400 mb-1">
          {dict.availability.weekdays.map((g) => (
            <span key={g}>{g}</span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {celle.map((cella, i) => {
            if (!cella.data) return <span key={i} />;

            const dataStr = toDateStr(cella.data);
            const slotsGiorno = slotPerData.get(dataStr) ?? [];
            const haDisponibilita = slotsGiorno.some(
              (s) => s.stato === "disponibile"
            );
            const passata = cella.data < oggi;
            const selezionata = dataStr === dataSelezionata;

            return (
              <button
                key={i}
                type="button"
                disabled={passata}
                onClick={() => setDataSelezionata(dataStr)}
                className={`relative aspect-square rounded-lg text-sm flex flex-col items-center justify-center gap-0.5 transition ${
                  passata
                    ? "text-slate-300 cursor-not-allowed"
                    : selezionata
                    ? "bg-sky-600 text-white font-semibold"
                    : "text-slate-700 hover:bg-sky-50"
                }`}
              >
                {cella.data.getDate()}
                {!passata && (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      haDisponibilita
                        ? selezionata
                          ? "bg-white"
                          : "bg-sky-500"
                        : "bg-transparent"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 mt-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
          {dict.availability.legend}
        </p>
      </div>

      <div className="lg:col-span-3">
        <h3 className="font-semibold text-slate-800 first-letter:uppercase mb-4">
          {dataSelezionataObj.toLocaleDateString(INTL_LOCALE[locale], {
            weekday: "long",
            day: "numeric",
            month: "long",
          })}
        </h3>

        {slotsGiornoSelezionato.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {slotsGiornoSelezionato.map((slot) => (
              <SlotCard
                key={slot.id}
                slot={slot}
                dict={dict}
                locale={locale}
              />
            ))}
          </div>
        ) : dataPassata ? (
          <p className="text-slate-400">{dict.availability.pastDate}</p>
        ) : (
          <div className="bg-white border border-dashed border-slate-300 rounded-xl p-6 text-center">
            <p className="text-slate-500 mb-4">{dict.availability.noSlots}</p>
            <a
              href={linkWhatsappRichiestaData(dataSelezionata, locale)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition"
            >
              {dict.availability.requestWhatsapp}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
