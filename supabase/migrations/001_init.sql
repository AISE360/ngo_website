-- ═══════════════════════════════════════════════════════
-- Al-Huda Welfare Society — Supabase DB Migration 001
-- ═══════════════════════════════════════════════════════

-- PROFILES (extends supabase auth.users)
create table if not exists profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  email       text,
  full_name   text,
  role        text default 'staff' check (role in ('admin','staff')),
  created_at  timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- MEMBERS (165 community members)
create table if not exists members (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  phone          text,
  whatsapp_group text,
  join_date      date default current_date,
  is_active      boolean default true,
  notes          text,
  created_at     timestamptz default now()
);

-- BENEFICIARIES
create table if not exists beneficiaries (
  id             uuid primary key default gen_random_uuid(),
  full_name      text not null,
  age            int,
  gender         text check (gender in ('male','female','other')),
  category       text check (category in ('education','health','marriage')),
  address        text,
  guardian       text,
  guardian_phone text,
  photo_url      text,
  doc_urls       text[],
  status         text default 'pending' check (status in ('pending','verified','rejected','active')),
  created_at     timestamptz default now()
);

-- CASES (individual aid requests)
create table if not exists cases (
  id               uuid primary key default gen_random_uuid(),
  beneficiary_id   uuid references beneficiaries(id) on delete set null,
  case_type        text check (case_type in ('education','health','marriage')),
  amount_requested numeric(10,2),
  amount_approved  numeric(10,2),
  description      text,
  verified_by      uuid references profiles(id) on delete set null,
  status           text default 'submitted'
                     check (status in ('submitted','under_review','approved','disbursed','rejected')),
  submitted_at     timestamptz default now(),
  updated_at       timestamptz default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin new.updated_at = now(); return new; end;
$$ language plpgsql;

drop trigger if exists set_cases_updated_at on cases;
create trigger set_cases_updated_at
  before update on cases
  for each row execute procedure public.set_updated_at();

-- SPONSORS
create table if not exists sponsors (
  id              uuid primary key default gen_random_uuid(),
  donor_name      text not null,
  donor_email     text,
  donor_phone     text,
  beneficiary_id  uuid references beneficiaries(id) on delete set null,
  amount_per_year numeric(10,2),
  start_date      date default current_date,
  end_date        date,
  is_active       boolean default true,
  notes           text,
  created_at      timestamptz default now()
);

-- DONATIONS
create table if not exists donations (
  id                  uuid primary key default gen_random_uuid(),
  donor_name          text,
  donor_email         text,
  amount              numeric(10,2) not null,
  currency            text default 'INR',
  payment_method      text check (payment_method in ('upi','card','netbanking','cash','cheque','other')),
  razorpay_order_id   text,
  razorpay_payment_id text,
  receipt_no          text unique default
                        'RCP-' || to_char(now(),'YYYYMMDD-') || substr(gen_random_uuid()::text,1,6),
  purpose             text check (purpose in ('general','education','health','marriage','sponsor')),
  case_id             uuid references cases(id) on delete set null,
  status              text default 'pending' check (status in ('pending','success','failed')),
  created_at          timestamptz default now()
);

-- ═══════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════

alter table profiles      enable row level security;
alter table members       enable row level security;
alter table beneficiaries enable row level security;
alter table cases         enable row level security;
alter table sponsors      enable row level security;
alter table donations     enable row level security;

-- Public: insert only (no auth required)
create policy if not exists "public_submit_case"
  on cases for insert with check (true);

create policy if not exists "public_donate"
  on donations for insert with check (true);

-- Public: read beneficiaries (for sponsor-a-child page)
create policy if not exists "public_read_beneficiaries"
  on beneficiaries for select using (status in ('active','verified'));

-- Authenticated staff: full access
create policy if not exists "staff_all_members"
  on members for all using (auth.role() = 'authenticated');

create policy if not exists "staff_all_benef"
  on beneficiaries for all using (auth.role() = 'authenticated');

create policy if not exists "staff_all_cases"
  on cases for all using (auth.role() = 'authenticated');

create policy if not exists "staff_all_sponsors"
  on sponsors for all using (auth.role() = 'authenticated');

create policy if not exists "staff_all_donations"
  on donations for all using (auth.role() = 'authenticated');

create policy if not exists "staff_profiles"
  on profiles for select using (auth.uid() = id);

-- ═══════════════════════════════
-- STORAGE BUCKETS
-- ═══════════════════════════════

-- Run these in Supabase Dashboard → Storage → New Bucket
-- OR via supabase-js storage API after initial setup:
--
--   bucket: beneficiary-photos  (public:  true,  file size: 5MB)
--   bucket: beneficiary-docs    (public:  false, file size: 10MB)
--   bucket: ngo-assets          (public:  true,  file size: 10MB)
