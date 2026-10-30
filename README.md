# Vela Libera - sito prenotazioni giornate in barca a vela

Sito per mostrare le disponibilita' di uscite in barca a vela. I clienti possono
prenotare direttamente (richiesta, nessun pagamento online) oppure contattare
via WhatsApp. Un pannello admin permette di gestire il calendario e confermare
o rifiutare le richieste.

Stack: Next.js + Tailwind (frontend, gratis su Vercel) + Supabase (database +
autenticazione admin, piano gratuito).

- **Sito**: [vela-libera.vercel.app](https://vela-libera.vercel.app)
- **Area admin**: [vela-libera.vercel.app/admin/login](https://vela-libera.vercel.app/admin/login)

## Lingue

Il sito pubblico e' bilingue: inglese (`/en`, predefinito) e italiano (`/it`).
Chi arriva su `/` viene mandato alla lingua del suo browser, e puo' cambiarla
con il selettore EN|IT nel menu.

Tutti i testi stanno in un unico file, [`src/lib/i18n/dictionaries.ts`](src/lib/i18n/dictionaries.ts):
per modificare una frase basta cambiarla li' nelle due lingue, non serve
toccare i componenti. Il pannello admin resta solo in italiano.

## 1. Crea il progetto Supabase (gratis)

1. Vai su [supabase.com](https://supabase.com), crea un account e un nuovo progetto.
2. Nella dashboard vai su **SQL Editor**, incolla il contenuto di
   [`supabase/schema.sql`](supabase/schema.sql) ed eseguilo. Crea le tabelle
   `slots` e `prenotazioni` con le regole di sicurezza corrette.
3. Vai su **Authentication -> Sign In / Providers** e disattiva **Allow new
   users to sign up**: l'unico account e' quello dell'admin, creato a mano.
4. Vai su **Authentication -> Users** e crea manualmente un utente (la tua
   email + una password) che sara' l'accesso all'area admin del sito.
5. Nello **SQL Editor** rendi admin quell'utente (le policy danno accesso ai
   dati dei clienti solo a chi e' nella tabella `admins`):

   ```sql
   insert into admins (user_id)
   select id from auth.users where email = 'la-tua-email@example.com';
   ```

6. Vai su **Project Settings -> API** e copia `Project URL` e `anon public key`.

## 2. Configura le variabili d'ambiente

Copia `.env.local.example` in `.env.local` e inserisci i valori copiati da
Supabase, piu' il numero WhatsApp da usare per il contatto rapido (formato
internazionale senza `+` o spazi, es. `391234567890`):

```bash
cp .env.local.example .env.local
```

## 3. Avvia in locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) per il sito pubblico e
[http://localhost:3000/admin/login](http://localhost:3000/admin/login) per
l'area riservata (usa l'utente creato al punto 1.4).

## 4. Aggiungi le prime uscite disponibili

Accedi all'area admin -> **Uscite / Calendario** -> compila il form per
aggiungere una data (mattina/pomeriggio/giornata intera). Il prezzo si
calcola automaticamente a 10 €/persona/ora (in base a orari e numero massimo
persone scelti), modificabile a mano prima di salvare.

## 5. Deploy gratuito su Vercel

1. Crea un repository su GitHub con questo codice.
2. Vai su [vercel.com](https://vercel.com), collega il repository ("New
   Project").
3. Nelle impostazioni del progetto Vercel, aggiungi le stesse variabili
   d'ambiente presenti in `.env.local`.
4. Deploy. Il sito sara' online su un indirizzo tipo `nome-progetto.vercel.app`
   (gratuito, dominio personalizzato collegabile in seguito se vorrai).

## Come funziona il flusso di prenotazione

1. Il cliente vede le uscite disponibili in home.
2. Puo' scrivere su WhatsApp (link precompilato) oppure cliccare "Prenota ora".
3. Il form di prenotazione salva la richiesta con stato "in attesa" e il
   database blocca quello slot nella stessa operazione (non piu' prenotabile
   da altri, nemmeno con due richieste nello stesso istante).
4. Nel pannello admin ricevi la richiesta e puoi **Confermare** (lo slot
   diventa "occupato") o **Rifiutare** (lo slot torna disponibile).

Nessun pagamento avviene sul sito: e' solo una richiesta di prenotazione, il
resto si concorda direttamente con il cliente.
