-- ═══════════════════════════════════════════════════════
-- Thoughtful Hearts Foundation — Migration 002
-- Run AFTER 001_init.sql. Adds CMS-lite + engagement tables.
-- ═══════════════════════════════════════════════════════

-- PROGRAMS (CMS-lite: editable without redeploy)
create table if not exists programs (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  short       text,
  description text,
  hero_url    text,
  image_urls  text[] default '{}',
  stats       jsonb default '[]',
  is_active   boolean default true,
  sort_order  int default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- GALLERY with category tagging
create table if not exists gallery (
  id         uuid primary key default gen_random_uuid(),
  image_url  text not null,
  category   text not null check (category in ('medical','livelihood','education','tech','art','community')),
  caption    text,
  program_id uuid references programs(id) on delete set null,
  is_active  boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- VOLUNTEERS
create table if not exists volunteers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  interest   text,
  message    text,
  status     text default 'new' check (status in ('new','contacted','active','inactive')),
  created_at timestamptz default now()
);

-- CONTACT MESSAGES
create table if not exists contact_messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  phone      text not null,
  email      text,
  message    text not null,
  status     text default 'new' check (status in ('new','replied','closed')),
  created_at timestamptz default now()
);

-- CSR / PARTNERSHIP INQUIRIES
create table if not exists csr_inquiries (
  id             uuid primary key default gen_random_uuid(),
  org_name       text not null,
  contact_person text not null,
  email          text not null,
  phone          text not null,
  message        text,
  status         text default 'new' check (status in ('new','contacted','partner','closed')),
  created_at     timestamptz default now()
);

-- BLOG POSTS
create table if not exists blog_posts (
  id           uuid primary key default gen_random_uuid(),
  slug         text unique not null,
  title        text not null,
  excerpt      text,
  body         text,
  cover_url    text,
  tag          text,
  published    boolean default false,
  published_at timestamptz,
  created_at   timestamptz default now()
);

-- IMPACT STATS (editable counters)
create table if not exists impact_stats (
  id         uuid primary key default gen_random_uuid(),
  label      text not null,
  value      int not null default 0,
  suffix     text default '+',
  sort_order int default 0,
  is_active  boolean default true
);

-- NEWSLETTER
create table if not exists newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text unique not null,
  created_at timestamptz default now()
);

-- Extend donations for THF (safe if columns exist)
alter table donations add column if not exists donor_phone text;
alter table donations add column if not exists frequency text default 'once' check (frequency in ('once','monthly'));
alter table donations add column if not exists pan text;
alter table donations add column if not exists notes text;
-- widen purpose check to THF programs
alter table donations drop constraint if exists donations_purpose_check;
alter table donations add constraint donations_purpose_check
  check (purpose in ('general','medical-support','vocational-training','school-outreach','tech-coding','art-workshops','education','health','marriage','sponsor'));

-- updated_at trigger for programs
drop trigger if exists set_programs_updated_at on programs;
create trigger set_programs_updated_at before update on programs
  for each row execute procedure public.set_updated_at();

-- ═══ RLS ═══
alter table programs enable row level security;
alter table gallery enable row level security;
alter table volunteers enable row level security;
alter table contact_messages enable row level security;
alter table csr_inquiries enable row level security;
alter table blog_posts enable row level security;
alter table impact_stats enable row level security;
alter table newsletter_subscribers enable row level security;

-- Public read: programs / gallery / stats / published posts
drop policy if exists "public_read_programs" on programs;
create policy "public_read_programs" on programs for select using (is_active = true);
drop policy if exists "public_read_gallery" on gallery;
create policy "public_read_gallery" on gallery for select using (is_active = true);
drop policy if exists "public_read_stats" on impact_stats;
create policy "public_read_stats" on impact_stats for select using (is_active = true);
drop policy if exists "public_read_posts" on blog_posts;
create policy "public_read_posts" on blog_posts for select using (published = true);

-- Public insert: engagement forms
drop policy if exists "public_insert_volunteers" on volunteers;
create policy "public_insert_volunteers" on volunteers for insert with check (true);
drop policy if exists "public_insert_contact" on contact_messages;
create policy "public_insert_contact" on contact_messages for insert with check (true);
drop policy if exists "public_insert_csr" on csr_inquiries;
create policy "public_insert_csr" on csr_inquiries for insert with check (true);
drop policy if exists "public_insert_newsletter" on newsletter_subscribers;
create policy "public_insert_newsletter" on newsletter_subscribers for insert with check (true);

-- Staff full access
drop policy if exists "staff_all_programs" on programs;
create policy "staff_all_programs" on programs for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_gallery" on gallery;
create policy "staff_all_gallery" on gallery for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_volunteers" on volunteers;
create policy "staff_all_volunteers" on volunteers for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_contact" on contact_messages;
create policy "staff_all_contact" on contact_messages for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_csr" on csr_inquiries;
create policy "staff_all_csr" on csr_inquiries for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_posts" on blog_posts;
create policy "staff_all_posts" on blog_posts for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_stats" on impact_stats;
create policy "staff_all_stats" on impact_stats for all using (auth.role() = 'authenticated');
drop policy if exists "staff_all_newsletter" on newsletter_subscribers;
create policy "staff_all_newsletter" on newsletter_subscribers for all using (auth.role() = 'authenticated');

-- ═══ SEED (edit freely in dashboard) ═══
insert into programs (slug, title, short, description, hero_url, image_urls, stats, sort_order) values
  ('medical-support','Medical & Patient Support','Hospital visits, treatment aid & follow-up','Hospital visits, financial help for treatment/medicines, emotional support and follow-up coordination.','/field/field-3.jpg', array['/field/field-3.jpg','/field/field-5.jpg','/field/field-7.jpg'], '[{"value":850,"suffix":"+","label":"Patients supported"}]', 1),
  ('vocational-training','Vocational Training (Tailoring & Livelihood)','Women’s stitching & income skills','Block-printing, embroidery, cutting and machine stitching for women.','/field/field-1.jpg', array['/field/field-1.jpg','/field/field-2.jpg','/field/field-4.jpg'], '[{"value":220,"suffix":"+","label":"Women trained"}]', 2),
  ('school-outreach','School & Education Outreach','Classroom sessions & counselling','Motivational talks, counselling and awareness inside partner schools.','/field/field-8.jpg', array['/field/field-8.jpg','/field/field-10.jpg','/field/field-12.jpg'], '[{"value":1500,"suffix":"+","label":"Students reached"}]', 3),
  ('tech-coding','Tech & Coding Education Center','Computer lab for youth','Digital literacy + programming fundamentals with mentoring.','/field/field-13.jpg', array['/field/field-13.jpg','/field/field-16.jpg','/field/field-17.jpg'], '[{"value":180,"suffix":"+","label":"Youth trained"}]', 4),
  ('art-workshops','Art & Creative Workshops','Sketching, painting & craft','Sketching, painting, embroidery-hoop art and fashion illustration.','/field/field-6.jpg', array['/field/field-6.jpg','/field/field-9.jpg','/field/field-14.jpg'], '[{"value":300,"suffix":"+","label":"Children in workshops"}]', 5)
on conflict (slug) do nothing;

insert into impact_stats (label, value, suffix, sort_order) values
  ('Patients & families supported', 850, '+', 1),
  ('Students reached in schools', 1500, '+', 2),
  ('Women trained in tailoring', 220, '+', 3),
  ('Youth in coding & computers', 180, '+', 4)
on conflict do nothing;
