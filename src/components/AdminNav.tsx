import Link from "next/link";
import { logout } from "@/app/admin/actions";

export default function AdminNav() {
  return (
    <nav className="bg-slate-800 text-white px-6 py-3 flex items-center justify-between">
      <div className="flex gap-5 text-sm font-medium">
        <Link href="/admin/dashboard" className="hover:text-sky-300">
          Prenotazioni
        </Link>
        <Link href="/admin/slots" className="hover:text-sky-300">
          Uscite / Calendario
        </Link>
        <Link href="/" className="hover:text-sky-300">
          Vedi sito
        </Link>
      </div>
      <form action={logout}>
        <button type="submit" className="text-sm text-slate-300 hover:text-white">
          Esci
        </button>
      </form>
    </nav>
  );
}
