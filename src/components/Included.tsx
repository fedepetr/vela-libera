import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const ICONE = [
  // Skipper (timone)
  "M12 3a9 9 0 100 18 9 9 0 000-18zm0 0v9m0 0l6.4 6.4M12 12l-6.4 6.4M12 12h9",
  // Cibo (posate)
  "M6 3v8a2 2 0 002 2h0a2 2 0 002-2V3M8 13v8M17 3c-1.1 1.5-1.5 3-1.5 5s.4 2.5 1.5 3v10",
  // Bevande (bicchiere)
  "M6 4h12l-1.5 7.5a3 3 0 01-3 2.5h-3a3 3 0 01-3-2.5L6 4zM12 14v6M9 20h6",
  // Carburante (goccia)
  "M12 3s6 6.5 6 10.5a6 6 0 01-12 0C6 9.5 12 3 12 3z",
  // Porto (ancora)
  "M12 7a2 2 0 100-4 2 2 0 000 4zm0 0v14m-7-7a7 7 0 0014 0M5 14h3m8 0h3",
];

export default function Included({ dict }: { dict: Dictionary }) {
  return (
    <section id="incluso" className="scroll-mt-24 bg-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl mb-10">
          <p className="text-sky-400 font-semibold uppercase tracking-wide text-sm mb-2">
            {dict.included.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-bold text-white">
            {dict.included.title}
          </h2>
          <p className="text-slate-400 mt-3">{dict.included.subtitle}</p>
        </Reveal>

        <Reveal
          delayMs={150}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8"
        >
          {dict.included.items.map((item, i) => (
            <div key={item.titolo} className="flex gap-4">
              <div className="shrink-0 w-11 h-11 rounded-full bg-sky-500/15 border border-sky-400/30 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-sky-400"
                >
                  <path d={ICONE[i]} />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">{item.titolo}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {item.testo}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
