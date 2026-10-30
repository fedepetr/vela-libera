import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function SiteFooter({ dict }: { dict: Dictionary }) {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <footer id="contatti" className="scroll-mt-24 bg-slate-900 text-slate-300 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-white font-bold text-lg">Vela Libera</p>
          <p className="text-sm text-slate-400 mt-1">{dict.footer.tagline}</p>
        </div>

        <a
          href={`https://wa.me/${numero}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-green-600 hover:bg-green-500 text-white font-semibold py-2.5 px-5 rounded-lg transition text-center"
        >
          {dict.footer.whatsapp}
        </a>
      </div>
    </footer>
  );
}
