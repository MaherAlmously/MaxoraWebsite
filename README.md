# Maxora

Website and store for Maxora, a tech and marketing agency offering web
development, app development, branding, social media management, flyer
design, video production, and content editing.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui (Base UI)
- Supabase (auth, orders, contact messages)
- Stripe Checkout (one-time and subscription payments)
- Web3Forms (contact/order email notifications)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in real values:

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your deployed site's URL (or `http://localhost:3000` locally) |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks (endpoint's signing secret) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project → Settings → API (secret, server-only) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | [web3forms.com](https://web3forms.com) (free) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 property (optional) |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project (optional) |

The Stripe webhook must point to `/api/webhooks/stripe` on the deployed
domain, listening for `checkout.session.completed` (and
`checkout.session.async_payment_succeeded`).

## Deployment

This app uses Next.js server actions and API routes (Stripe checkout,
Stripe webhook), so it needs a Node-capable host — it cannot run on
static shared hosting. See `docs/vercel-deployment.md` for the deploy
runbook.

## Data

The product catalog is defined in `src/lib/products.ts` (no CMS). Orders,
order items, and contact messages are stored in Supabase; table
definitions live in the Supabase project itself (project ref
`qcejbzcrpipgqiuelvqr`), not in this repo.
