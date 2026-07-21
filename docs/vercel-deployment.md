# Deploying to Vercel

Status: not deployed yet. This is the plan we agreed on.

## Why Vercel instead of HostGator

HostGator shared hosting (checked in cPanel: no "Node.js Selector") only serves static
files — no server running. This site needs a live server for the Stripe checkout server
action and the `/api/webhooks/stripe` route, so it can't run there as-is. Vercel runs
Next.js natively, has a free tier that covers this site, and the domain can stay pointed
at maxora.tech the whole time — only where the app *runs* changes, not who owns the
domain.

## Steps

### 1. Push the project to GitHub
Vercel deploys from a GitHub repo. If this project isn't already on GitHub, that's step
zero (there's a `github-push` skill for this).

### 2. Connect the repo to Vercel
- Go to vercel.com, sign in (GitHub login works), click "Add New Project"
- Select the MaxoraWebsite repo
- Framework preset should auto-detect as Next.js — leave defaults

### 3. Add environment variables in Vercel
Before the first deploy, go to Project Settings → Environment Variables and add every
value currently in `.env.local`:

- `NEXT_PUBLIC_SITE_URL` → `https://maxora.tech` (not localhost)
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET` — **note:** the current value in `.env.local` came from the
  Stripe Dashboard webhook endpoint, so it's already the right one for production, not a
  local-only value. No change needed here.
- `NEXT_PUBLIC_GA_ID` (if set)
- `NEXT_PUBLIC_CLARITY_ID` (if set)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WEB3FORMS_KEY`

These are separate from `.env.local` — Vercel doesn't read that file at all, everything
has to be re-entered in its dashboard.

### 4. Deploy
Click Deploy. Vercel gives a temporary `*.vercel.app` URL first — use that to test the
whole site (browse, checkout, a real small Stripe payment) before touching DNS.

### 5. Point maxora.tech at Vercel
In Vercel: Project Settings → Domains → add `maxora.tech`. Vercel shows the exact DNS
records to set (typically an A record for the root domain and a CNAME for `www`).

In HostGator's DNS management (cPanel → Zone Editor, or wherever maxora.tech's DNS
currently lives): update those records to Vercel's values, replacing whatever currently
points to the old WordPress site.

This is a live DNS change on the domain — confirm before doing it, and expect it to take
anywhere from a few minutes to a few hours to fully propagate.

### 6. Post-deploy checklist
- Load maxora.tech in an incognito window, confirm it's the new site, not a cached old
  page or a HostGator placeholder
- Click through all nav links and pages
- Test checkout end to end with a real (small) payment, confirm the order lands in
  Supabase with `status = 'paid'`
- Check the Stripe Dashboard → Webhooks → the endpoint's recent deliveries show
  `200 OK`, not failures
- Confirm SSL is active (`https://` with padlock) — Vercel issues this automatically,
  no AutoSSL step needed like HostGator

## What happens to the old WordPress site

Once DNS points to Vercel, the WordPress site on HostGator stops being reachable at
maxora.tech, but the files and hosting plan stay untouched — nothing gets deleted. It can
be kept dormant, moved to a subdomain, or the hosting plan cancelled later, whenever
that decision is made.
