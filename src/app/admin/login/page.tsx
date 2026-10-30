import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ errore?: string }>;
}) {
  const { errore } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <form
        action={login}
        className="w-full max-w-sm bg-white border border-slate-200 rounded-xl shadow-sm p-8 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-slate-800 text-center mb-2">
          Area riservata
        </h1>

        {errore && (
          <p className="text-red-600 text-sm text-center">
            Credenziali non valide.
          </p>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <button
          type="submit"
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2.5 rounded-lg transition mt-2"
        >
          Accedi
        </button>
      </form>
    </main>
  );
}
