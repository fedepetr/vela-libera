-- Schema per Vela Libera - prenotazioni giornate in barca a vela
-- Esegui questo file nell'SQL Editor di Supabase (progetto gratuito)

create extension if not exists "pgcrypto";

-- Slot di disponibilita' (una riga = una fascia oraria in una data)
create table if not exists slots (
  id uuid primary key default gen_random_uuid(),
  data date not null,
  tipo_slot text not null check (tipo_slot in ('mattina', 'pomeriggio', 'giornata_intera')),
  ora_inizio time not null,
  ora_fine time not null,
  prezzo numeric(10, 2) not null default 0,
  max_persone integer not null default 8,
  stato text not null default 'disponibile' check (stato in ('disponibile', 'in_attesa', 'occupato', 'bloccato')),
  created_at timestamptz not null default now(),
  unique (data, tipo_slot)
);

-- Prenotazioni ricevute dai clienti
create table if not exists prenotazioni (
  id uuid primary key default gen_random_uuid(),
  slot_id uuid not null references slots(id) on delete cascade,
  nome text not null,
  telefono text not null,
  email text,
  num_persone integer not null check (num_persone > 0),
  note text,
  stato text not null default 'in_attesa' check (stato in ('in_attesa', 'confermata', 'rifiutata')),
  created_at timestamptz not null default now()
);

create index if not exists idx_prenotazioni_slot_id on prenotazioni(slot_id);
create index if not exists idx_slots_data on slots(data);

-- Una prenotazione mette il suo slot "in attesa", nella stessa transazione.
-- Il cliente non puo' modificare gli slot (solo l'admin): la funzione lo fa per
-- lui con security definer. Se lo slot non e' piu' disponibile la prenotazione
-- viene rifiutata: due clienti non possono prenotare lo stesso slot, nemmeno
-- nello stesso istante (l'update blocca la riga finche' la prima non finisce).
create or replace function blocca_slot_prenotato()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.slots
  set stato = 'in_attesa'
  where id = new.slot_id and stato = 'disponibile';
  if not found then
    raise exception 'slot_non_disponibile';
  end if;
  return new;
end;
$$;

create or replace trigger prenotazione_blocca_slot
  before insert on prenotazioni
  for each row execute function blocca_slot_prenotato();

-- Admin del sito. Essere autenticati non basta: conta solo chi e' in questa lista.
-- RLS attiva e nessuna policy: dal sito nessuno puo' leggerla o modificarla,
-- si gestisce solo dalla dashboard di Supabase (vedi README).
create table if not exists admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

-- true se l'utente collegato e' un admin. security definer: legge admins
-- anche se l'utente non ha accesso alla tabella.
create or replace function is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- Row Level Security
alter table slots enable row level security;
alter table prenotazioni enable row level security;
alter table admins enable row level security;

-- Chiunque (anche non loggato) puo' vedere gli slot -> serve per mostrare il calendario
create policy "slots visibili a tutti" on slots
  for select using (true);

-- Solo l'admin puo' creare/modificare/eliminare slot
create policy "solo admin gestisce slots" on slots
  for all using (is_admin()) with check (is_admin());

-- Chiunque puo' inviare una prenotazione (form pubblico), ma solo "in attesa"
create policy "chiunque puo prenotare" on prenotazioni
  for insert with check (stato = 'in_attesa');

-- Solo l'admin puo' leggere/modificare/eliminare le prenotazioni (dati privati clienti)
create policy "solo admin legge prenotazioni" on prenotazioni
  for select using (is_admin());

create policy "solo admin modifica prenotazioni" on prenotazioni
  for update using (is_admin()) with check (is_admin());

create policy "solo admin elimina prenotazioni" on prenotazioni
  for delete using (is_admin());
