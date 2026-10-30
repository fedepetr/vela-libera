"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function SiteNav({
  dict,
  locale,
}: {
  dict: Dictionary;
  locale: Locale;
}) {
  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 60);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function pathPerLocale(target: Locale) {
    const segmenti = pathname.split("/");
    segmenti[1] = target;
    return segmenti.join("/") || `/${target}`;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 text-white transition-colors duration-300 ${
        scrolled ? "bg-slate-900/95 backdrop-blur-sm shadow-md" : "bg-transparent"
      }`}
    >
      <div
        className={`hidden sm:flex justify-end items-center gap-6 px-10 py-2 text-xs text-white/70 border-b border-white/10 overflow-hidden transition-all duration-300 ${
          scrolled ? "max-h-0 opacity-0 py-0 border-none" : "max-h-10 opacity-100"
        }`}
      >
        <span>WhatsApp: +{numero}</span>
        <span>{dict.nav.area}</span>
      </div>

      <div className="flex items-center justify-between px-6 sm:px-10 py-5">
        <Link
          href={`/${locale}`}
          className="font-serif text-2xl font-bold tracking-wide drop-shadow"
        >
          Vela Libera
        </Link>

        <nav className="hidden sm:flex items-center gap-8 text-sm font-medium tracking-wide">
          <a href="#la-barca" className="hover:text-sky-200 transition drop-shadow">
            {dict.nav.boat}
          </a>
          <a href="#disponibilita" className="hover:text-sky-200 transition drop-shadow">
            {dict.nav.availability}
          </a>
          <a href="#dove-navighiamo" className="hover:text-sky-200 transition drop-shadow">
            {dict.nav.where}
          </a>
          <a href="#contatti" className="hover:text-sky-200 transition drop-shadow">
            {dict.nav.contact}
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-xs font-semibold">
            {LOCALES.map((l, i) => (
              <span key={l} className="flex items-center gap-1">
                {i > 0 && <span className="text-white/40">|</span>}
                <Link
                  href={pathPerLocale(l)}
                  className={`uppercase transition ${
                    l === locale ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {l}
                </Link>
              </span>
            ))}
          </div>

          <a
            href="#disponibilita"
            className="border border-white/70 hover:bg-white hover:text-sky-900 text-white text-sm font-semibold px-5 py-2 rounded-full transition"
          >
            {dict.nav.book}
          </a>
        </div>
      </div>
    </header>
  );
}
