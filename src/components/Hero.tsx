import SiteNav from "./SiteNav";
import Photo from "./Photo";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Hero({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  return (
    <section className="relative">
      <div className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        <Photo
          src="/images/hero.png"
          alt="Sailing boat off the coast of Malta"
          label={dict.hero.photoLabel}
          className="absolute inset-0 w-full h-full animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-slate-900/80" />

        <SiteNav dict={dict} locale={locale} />

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-10 text-white">
          <div className="max-w-2xl">
            <p className="uppercase tracking-[0.3em] text-sky-200 text-xs sm:text-sm font-semibold mb-5">
              {dict.hero.eyebrow}
            </p>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight drop-shadow-lg">
              {dict.hero.titleLine1} <br className="hidden sm:block" />
              <span className="underline decoration-sky-300 decoration-2 underline-offset-8">
                {dict.hero.titleLine2}
              </span>
            </h1>
            <p className="mt-6 text-lg text-slate-100/90 max-w-lg drop-shadow">
              {dict.hero.subtitle}
            </p>

            <div className="mt-9">
              <a
                href="#disponibilita"
                className="inline-block border border-white text-white hover:bg-white hover:text-sky-900 font-semibold tracking-wide py-3 px-8 rounded-none transition"
              >
                {dict.hero.cta}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative -mt-12 sm:-mt-14 max-w-5xl mx-auto px-4">
        <div className="w-full bg-white shadow-xl rounded-xl grid grid-cols-2 sm:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 overflow-hidden">
          <InfoCella
            titolo={dict.hero.infoDuration}
            valore={dict.hero.infoDurationValue}
          />
          <InfoCella
            titolo={dict.hero.infoPeople}
            valore={dict.hero.infoPeopleValue}
          />
          <InfoCella
            titolo={dict.hero.infoPrice}
            valore={dict.hero.infoPriceValue}
          />
          <a
            href="#disponibilita"
            className="flex items-center justify-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-5 px-4 transition"
          >
            {dict.hero.infoCta}
          </a>
        </div>
      </div>
    </section>
  );
}

function InfoCella({ titolo, valore }: { titolo: string; valore: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-5 px-4">
      <span className="text-xs uppercase tracking-wide text-slate-400 font-semibold">
        {titolo}
      </span>
      <span className="text-slate-800 font-semibold mt-1">{valore}</span>
    </div>
  );
}
