import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/i18n/config";

/** Sceglie la lingua in base all'header Accept-Language del browser. */
function localeDaRichiesta(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;

  const preferite = header
    .split(",")
    .map((parte) => {
      const [lingua, q] = parte.trim().split(";q=");
      return { lingua: lingua.split("-")[0].toLowerCase(), q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { lingua } of preferite) {
    if ((LOCALES as readonly string[]).includes(lingua)) {
      return lingua as Locale;
    }
  }
  return DEFAULT_LOCALE;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return await updateSession(request);
  }

  const haLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (!haLocale) {
    const locale = localeDaRichiesta(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Tutte le richieste tranne file statici, immagini e risorse interne
     * di Next.js, che non devono passare dal redirect di lingua.
     */
    "/((?!_next|images|favicon.ico|.*\\.).*)",
  ],
};
