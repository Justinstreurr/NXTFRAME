-- Task board statuses (te doen, bezig, klaar). Run once in Supabase: SQL Editor > New query > Run.
-- Already part of schema.sql for new projects.
alter table public.tasks add column if not exists status text not null default 'todo';
alter table public.tasks drop constraint if exists tasks_status_check;
alter table public.tasks add constraint tasks_status_check check (status in ('todo', 'bezig', 'klaar'));
update public.tasks set status = 'klaar' where done and status <> 'klaar';
