import Photo from "./Photo";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const FILE_LUOGHI = ["comino.jpg", "gozo.jpg", "valletta.jpg", "dingli.jpg"];

export default function Destinations({ dict }: { dict: Dictionary }) {
  return (
    <section id="dove-navighiamo" className="scroll-mt-24 bg-sky-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-2xl mb-8">
          <p className="text-sky-600 font-semibold uppercase tracking-wide text-sm mb-2">
            {dict.destinations.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-bold text-slate-800">
            {dict.destinations.title}
          </h2>
        </Reveal>

        <Reveal
          delayMs={150}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {FILE_LUOGHI.map((file, i) => {
            const luogo = dict.destinations.places[i];
            return (
              <div
                key={file}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100"
              >
                <div className="overflow-hidden h-36">
                  <Photo
                    src={`/images/luoghi/${file}`}
                    alt={luogo.nome}
                    label={`${luogo.nome}\npublic/images/luoghi/${file}`}
                    className="w-full h-full transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-slate-800">{luogo.nome}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {luogo.descrizione}
                  </p>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
