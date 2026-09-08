-- ═══════════════════════════════════════════════════════
-- Thoughtful Hearts Foundation — Migration 003 (cleanup)
-- Drops old Al-Huda domain tables that the new site no longer uses.
-- Run AFTER 002. Safe to run even on a fresh DB (IF EXISTS guards).
--
-- KEEP (used by site + admin):
--   profiles, donations, programs, gallery, volunteers,
--   contact_messages, csr_inquiries, blog_posts, impact_stats,
--   newsletter_subscribers
--
-- DELETE (below): members, cases, beneficiaries, sponsors
--   + the submit_case() RPC that wrote to them.
-- ═══════════════════════════════════════════════════════

-- Drop FKs FIRST (donations references cases/sponsors), then the tables.
alter table public.donations drop constraint if exists donations_case_id_fkey;

-- Drop RPC (depends on the tables). The DO block removes EVERY
-- overload, so it never hits "function name is not unique" (42725) even
-- if an older/different submit_case signature exists in the project.
do $$
declare r record;
begin
  for r in
    select oid::regprocedure as sig from pg_proc
    where proname = 'submit_case' and pronamespace = 'public'::regnamespace
  loop
    execute 'drop function if exists ' || r.sig;
  end loop;
end $$;

-- Drop tables (policies/triggers on them go away automatically)
drop table if exists public.cases;
drop table if exists public.sponsors;
drop table if exists public.beneficiaries;
drop table if exists public.members;

-- Optional: drop old storage buckets ONLY if you created them for Al-Huda
-- and are sure nothing references them. Do this in Dashboard → Storage,
-- buckets: beneficiary-photos, beneficiary-docs
-- (ngo-assets can stay — reuse it for gallery uploads.)

-- Verify: after running, you should have exactly these tables:
--   select tablename from pg_tables where schemaname='public' order by 1;
