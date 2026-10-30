"use client";

import { useState } from "react";
import NewSlotForm from "./NewSlotForm";
import BulkSlotForm from "./BulkSlotForm";

export default function SlotFormTabs() {
  const [tab, setTab] = useState<"singola" | "multipla">("singola");

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setTab("singola")}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
            tab === "singola"
              ? "bg-sky-600 text-white"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          Uscita singola
        </button>
        <button
          type="button"
          onClick={() => setTab("multipla")}
          className={`text-sm font-semibold px-4 py-2 rounded-lg transition ${
            tab === "multipla"
              ? "bg-sky-600 text-white"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          Piu&apos; giorni insieme
        </button>
      </div>

      {tab === "singola" ? <NewSlotForm /> : <BulkSlotForm />}
    </div>
  );
}
