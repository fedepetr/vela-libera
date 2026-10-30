import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function GraziePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md text-center bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-3">
          {dict.booking.thanksTitle}
        </h1>
        <p className="text-slate-600 mb-6">{dict.booking.thanksText}</p>
        <Link
          href={`/${locale}`}
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-5 rounded-lg transition"
        >
          {dict.booking.thanksCta}
        </Link>
      </div>
    </main>
  );
}
