import Link from "next/link";
import type { Slot } from "@/lib/types";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { formatData, formatOra, formatPrezzo, linkWhatsapp } from "@/lib/format";

export default function SlotCard({
  slot,
  dict,
  locale,
}: {
  slot: Slot;
  dict: Dictionary;
  locale: Locale;
}) {
  const prenotabile = slot.stato === "disponibile";

  return (
    <div className="border border-slate-200 rounded-xl p-5 shadow-sm bg-white flex flex-col gap-3">
      <div>
        <p className="text-sm uppercase tracking-wide text-sky-600 font-semibold">
          {dict.slot.types[slot.tipo_slot]}
        </p>
        <h3 className="text-lg font-bold text-slate-800 first-letter:uppercase">
          {formatData(slot.data, locale)}
        </h3>
        <p className="text-slate-500 text-sm">
          {formatOra(slot.ora_inizio)} - {formatOra(slot.ora_fine)} ·{" "}
          {dict.slot.maxPeople} {slot.max_persone} {dict.slot.people}
        </p>
      </div>

      <p className="text-2xl font-extrabold text-slate-900">
        {formatPrezzo(slot.prezzo, locale)}
      </p>

      {prenotabile ? (
        <div className="flex flex-col sm:flex-row gap-2 mt-auto">
          <Link
            href={`/${locale}/prenota/${slot.id}`}
            className="flex-1 text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {dict.slot.bookNow}
          </Link>
          <a
            href={linkWhatsapp(slot, locale)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {dict.slot.whatsapp}
          </a>
        </div>
      ) : (
        <p className="mt-auto text-center text-slate-400 font-medium py-2 border border-dashed border-slate-300 rounded-lg">
          {dict.slot.unavailable}
        </p>
      )}
    </div>
  );
}
