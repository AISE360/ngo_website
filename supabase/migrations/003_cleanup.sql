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

-- Drop RPC first (depends on the tables)
drop function if exists public.submit_case(text,int,text,text,text,text,text,numeric,text);

-- Drop tables (policies/triggers on them go away automatically)
drop table if exists public.cases;
drop table if exists public.sponsors;
drop table if exists public.beneficiaries;
drop table if exists public.members;

-- Donations: remove FK to cases if it still exists (002 kept it nullable)
alter table public.donations drop constraint if exists donations_case_id_fkey;

-- Optional: drop old storage buckets ONLY if you created them for Al-Huda
-- and are sure nothing references them. Do this in Dashboard → Storage,
-- buckets: beneficiary-photos, beneficiary-docs
-- (ngo-assets can stay — reuse it for gallery uploads.)

-- Verify: after running, you should have exactly these tables:
--   select tablename from pg_tables where schemaname='public' order by 1;
