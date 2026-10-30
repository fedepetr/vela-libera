import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Hero from "@/components/Hero";
import BoatGallery from "@/components/BoatGallery";
import Included from "@/components/Included";
import Destinations from "@/components/Destinations";
import SiteFooter from "@/components/SiteFooter";
import Reveal from "@/components/Reveal";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import { LOCALES, isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import type { Slot } from "@/lib/types";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  const supabase = await createClient();
  const oggi = new Date().toISOString().slice(0, 10);

  const { data: slots, error } = await supabase
    .from("slots")
    .select("*")
    .gte("data", oggi)
    .neq("stato", "bloccato")
    .order("data", { ascending: true })
    .order("ora_inizio", { ascending: true });

  return (
    <main className="min-h-screen bg-slate-50">
      <Hero dict={dict} locale={locale} />

      <BoatGallery dict={dict} />

      <Included dict={dict} />

      <section
        id="disponibilita"
        className="scroll-mt-24 max-w-5xl mx-auto px-6 py-16"
      >
        <Reveal className="max-w-2xl mb-8">
          <p className="text-sky-600 font-semibold uppercase tracking-wide text-sm mb-2">
            {dict.availability.eyebrow}
          </p>
          <h2 className="font-serif text-3xl font-bold text-slate-800">
            {dict.availability.title}
          </h2>
        </Reveal>

        {error && <p className="text-red-600">{dict.availability.error}</p>}

        {!error && (
          <Reveal delayMs={150}>
            <AvailabilityCalendar
              slots={(slots as Slot[] | null) ?? []}
              dict={dict}
              locale={locale}
            />
          </Reveal>
        )}
      </section>

      <Destinations dict={dict} />

      <SiteFooter dict={dict} />
    </main>
  );
}
