# Deployment — Vercel / Netlify + Supabase

## Build

```bash
cd thoughtful-hearts
npm install
npm run build   # → dist/
npm run preview # local check
```

## Vercel

- Import `thoughtful-hearts/` as project root.
- Framework: Vite. Build: `npm run build`. Output: `dist`.
- Env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_RAZORPAY_KEY_ID`.
- SPA fallback included via `vercel.json` below.

## Netlify

- Base directory: `thoughtful-hearts`. Build: `npm run build`. Publish: `dist`.
- `netlify.toml` already handles SPA redirect + env.
- Add same `VITE_*` vars in Site settings → Environment.

## Post-deploy checklist

- [ ] Supabase RLS: public read on `programs/gallery/impact_stats/blog_posts(published)`; admin-only write.
- [ ] Upload field photos to Supabase storage if you outgrow repo hosting; update `image_url`s.
- [ ] Compress `/public/field/*` (e.g. Squoosh → WebP, ≤200KB each) for fast mobile load.
- [ ] Replace logo favicon + OG image (already `/logo.png`).
- [ ] Verify hours, reg numbers, 80G, contact details.
