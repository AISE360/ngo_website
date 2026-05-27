# Al-Huda Welfare Society Website

This is a React + Vite web application for an NGO website with a public-facing site and a protected admin area. The app uses Supabase for authentication and data storage, and it is prepared for deployment on Netlify.

## What It Does

- Public pages for the NGO story, programs, contact, gallery, and donation-related flows.
- Case submission for education, health, and marriage assistance.
- Sponsorship and donation forms backed by Supabase tables.
- Admin dashboard for members, cases, beneficiaries, sponsors, and donations.
- Protected admin routes under `/admin`.

## Stack

- React 18
- Vite
- React Router
- Supabase Auth and Postgres
- Tailwind CSS

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file in the project root:

```bash
cp .env.local.example .env.local
```

3. Fill in your Supabase values in `.env.local`:

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

4. Run the app:

```bash
npm run dev
```

## Supabase Setup

1. Create a Supabase project.
2. Run the SQL migration in `supabase/migrations/001_init.sql`.
3. Create your admin user in Supabase Auth.
4. Set that user's `profiles.role` to `admin` in the database.
5. Create storage buckets later if you need uploads:
	 - `beneficiary-photos`
	 - `beneficiary-docs`
	 - `ngo-assets`

Razorpay and WhatsApp support are present in the codebase but disabled for now, so you do not need to set those secrets unless you enable them later.

## Admin Area

- Login page: `/admin/login`
- Dashboard entry: `/admin`
- Main dashboard: `/admin/dashboard`

## Netlify Deployment

This repo includes `netlify.toml`, so Netlify can serve the React Router app correctly.

- Build command: `npm run build`
- Publish directory: `dist`
- Add these environment variables in Netlify:
	- `VITE_SUPABASE_URL`
	- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Notes

- Do not commit `.env.local` or other secret files.
- `VITE_` variables are exposed to the browser, so only use public Supabase keys there.
- The app currently treats `VITE_SUPABASE_PUBLISHABLE_KEY` as the primary public key variable, with `VITE_SUPABASE_ANON_KEY` kept as a compatibility fallback.
