-- NXT Frame dashboard: tables, row level security and the documents bucket.
-- Run once in Supabase: SQL Editor > New query > paste this file > Run. Safe to run again.
--
-- Who may read and change what:
--   * the site itself (tracker, contact form) writes with the service role key, server side only;
--   * the dashboard reads and writes as the logged-in user, and every policy below lets through
--     one account only: the admin e-mail in is_admin(). Change it there if it ever changes.

create or replace function public.is_admin() returns boolean
language sql stable as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'justinstreurr@gmail.com'
$$;

-- ---------- Analytics (cookieless: visitor = daily rotating hash, never an IP) ----------

create table if not exists public.page_views (
  id uuid primary key,
  visitor text not null,
  path text not null,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  device text,
  browser text,
  country text,
  duration_ms integer,
  max_scroll smallint,
  created_at timestamptz not null default now()
);
create index if not exists page_views_created_at on public.page_views (created_at desc);
create index if not exists page_views_path on public.page_views (path);

create table if not exists public.clicks (
  id bigint generated always as identity primary key,
  view_id uuid references public.page_views (id) on delete cascade,
  path text not null,
  label text not null,
  href text,
  kind text,
  x smallint,
  y integer,
  created_at timestamptz not null default now()
);
create index if not exists clicks_created_at on public.clicks (created_at desc);

-- ---------- Contact form ----------

create table if not exists public.submissions (
  id uuid primary key default gen_random_uuid(),
  naam text not null,
  email text not null,
  telefoon text,
  website text,
  onderwerp text,
  bericht text not null,
  status text not null default 'nieuw' check (status in ('nieuw', 'opgevolgd', 'klant', 'afgewezen')),
  notes text,
  mailed boolean not null default false,
  path text,
  client_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists submissions_created_at on public.submissions (created_at desc);

-- ---------- Clients, projects, tasks, documents ----------

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact_name text,
  email text,
  phone text,
  website text,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.submissions drop constraint if exists submissions_client_id_fkey;
alter table public.submissions add constraint submissions_client_id_fkey
  foreign key (client_id) references public.clients (id) on delete set null;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  name text not null,
  kind text not null default 'website',
  status text not null default 'offerte' check (status in ('lead', 'offerte', 'bezig', 'live', 'onderhoud', 'afgerond', 'gestopt')),
  phase smallint not null default 0 check (phase between 0 and 4),
  price numeric(10, 2),
  monthly numeric(10, 2),
  start_date date,
  deadline date,
  live_url text,
  notes text,
  created_at timestamptz not null default now()
);
create index if not exists projects_client on public.projects (client_id);

create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  done boolean not null default false,
  due date,
  created_at timestamptz not null default now()
);
create index if not exists tasks_project on public.tasks (project_id);

-- the task board: te doen, bezig, klaar (added 29 Oct 2026; `done` stays in step with 'klaar')
alter table public.tasks add column if not exists status text not null default 'todo';
alter table public.tasks drop constraint if exists tasks_status_check;
alter table public.tasks add constraint tasks_status_check check (status in ('todo', 'bezig', 'klaar'));
update public.tasks set status = 'klaar' where done and status <> 'klaar';

create table if not exists public.documents (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  name text not null,
  path text not null unique,
  size bigint,
  mime text,
  created_at timestamptz not null default now()
);
create index if not exists documents_client on public.documents (client_id);

-- ---------- Row level security: the admin only ----------

do $$
declare t text;
begin
  foreach t in array array['page_views', 'clicks', 'submissions', 'clients', 'projects', 'tasks', 'documents'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists admin_all on public.%I', t);
    execute format('create policy admin_all on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())', t);
  end loop;
end $$;

-- ---------- Storage: private bucket for client documents ----------

insert into storage.buckets (id, name, public)
values ('documenten', 'documenten', false)
on conflict (id) do nothing;

drop policy if exists documenten_admin on storage.objects;
create policy documenten_admin on storage.objects for all to authenticated
  using (bucket_id = 'documenten' and public.is_admin())
  with check (bucket_id = 'documenten' and public.is_admin());
