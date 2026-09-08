# Deployment — Cloudflare Pages / Vercel / Netlify + Supabase

## Build

```bash
cd thoughtful-hearts
npm install
npm run build   # → dist/
npm run preview # local check
```

## Cloudflare Pages (recommended — repo is already Cloudflare-prepped)

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick `AISE360/ngo_website`.
2. Project name: `thoughtful-hearts` (or any). Production branch: `main`.
3. Build settings → Framework preset: **Vite**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (repo root is the app — there is no subfolder)
4. Environment variables (Pages → Settings → Variables): `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_RAZORPAY_KEY_ID` — set for **Production and Preview**.
5. Deploy. SPA fallback is handled by `public/_redirects` (`/* → /index.html`), so `/donate`, `/admin/*` etc. work on refresh/share.
6. Custom domain (optional): Pages → Custom domains → add `thoughtfulhearts.org.in` → add the CNAME Cloudflare shows at your registrar.

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
