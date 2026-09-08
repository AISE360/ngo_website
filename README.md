# Thoughtful Hearts Foundation — NGO Website

React 18 + Vite + Tailwind + Supabase. Antara-inspired, parallax, photography-first theme (coral `#E86A5E` + deep teal `#0E4C5E`).

## Folder structure

```
thoughtful-hearts/
├── public/
│   ├── logo.png            # new THF logo (coral + teal heart)
│   └── field/              # 17 real field photos (field-1..17.jpg)
├── src/
│   ├── assets/logo.png
│   ├── data/content.js     # CMS-lite fallback (programs, gallery, stats, posts)
│   ├── components/
│   │   ├── layout/Navbar.jsx  Footer.jsx
│   │   ├── ui/Button.jsx  SectionHeading.jsx
│   │   └── effects/Parallax.jsx  # ParallaxBand + Reveal
│   ├── pages/public/
│   │   ├── Home.jsx  About.jsx  Programs.jsx  ProgramDetail.jsx
│   │   ├── Gallery.jsx  GetInvolved.jsx  DonatePage.jsx  Blog.jsx  Contact.jsx
│   ├── lib/supabaseClient.js
│   └── App.jsx  (routes: / /about /programs /programs/:slug /gallery /get-involved /donate /blog /contact)
├── supabase/
│   ├── migrations/001_init.sql  (base: members/cases/donations/…)
│   ├── migrations/002_thoughtful_hearts.sql  (programs/gallery/volunteers/contact/csr/blog/stats/newsletter)
│   └── functions/whatsapp-notify
├── .env.example  netlify.toml  vercel.json
└── DEPLOYMENT.md
```

## Supabase setup

1. Create project → run `001_init.sql`, then `002_thoughtful_hearts.sql` in SQL Editor.
2. Auth → create admin user → set `profiles.role='admin'`.
3. Storage → public bucket `field` (or reuse `ngo-assets`) → upload `public/field/*` (or keep in repo; Supabase optional).
4. Functions:
```bash
supabase functions deploy whatsapp-notify
supabase secrets set WA_PHONE_ID=… WA_ACCESS_TOKEN=… ADMIN_WHATSAPP=919876543210
```
5. `.env.local` from `.env.example`, then `npm install && npm run dev`.

## Donation flow (no payment gateway)

`DonatePage` → insert `donations(pending)` → donor pays via UPI/bank transfer → sends screenshot on WhatsApp with Ref → volunteer verifies and marks `success` in `/admin/donations` → `whatsapp-notify(type=donation)` alerts the team on each pledge.

## Hours / legal placeholders to fix before launch

- Hours currently: Tue & Thu 2PM–6PM, Sun 2PM–8PM (source looked auto-generated — verify).
- Registration / 80G / 12A numbers are `[editable placeholder]` in About + Footer.
- Impact counters are placeholders — wire to `impact_stats` table or edit `src/data/content.js`.
- Phone/email `+91 98765 43210 / hello@thoughtfulhearts.org.in` are placeholders.
