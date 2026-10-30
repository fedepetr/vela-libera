import Photo from "./Photo";
import Reveal from "./Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

const FILE_FOTO = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"];

export default function BoatGallery({ dict }: { dict: Dictionary }) {
  return (
    <section id="la-barca" className="scroll-mt-24 max-w-6xl mx-auto px-6 py-16">
      <Reveal className="max-w-2xl mb-8">
        <p className="text-sky-600 font-semibold uppercase tracking-wide text-sm mb-2">
          {dict.boat.eyebrow}
        </p>
        <h2 className="font-serif text-3xl font-bold text-slate-800">
          {dict.boat.title}
        </h2>
      </Reveal>

      <Reveal delayMs={150} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {FILE_FOTO.map((file, i) => (
          <div
            key={file}
            className={`relative overflow-hidden rounded-xl ${
              i === 0 ? "col-span-2 h-64" : "h-40"
            }`}
          >
            <Photo
              src={`/images/barca/${file}`}
              alt={dict.boat.photos[i]}
              label={`${dict.boat.photos[i]}\npublic/images/barca/${file}`}
              className="w-full h-full transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
