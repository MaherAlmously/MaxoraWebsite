# Maxora

**Live site: [maxora.tech](https://maxora.tech)**

Website and online store for Maxora, a tech and marketing agency. Clients
can browse services, buy them directly, and pay either once or on a monthly
plan, all without creating an account.

## What it does

- **Service catalog** with detail pages for web development, app
  development, branding, social media management, flyer design, video
  production, and content editing.
- **Guest checkout.** Customers can buy without signing up. Orders are
  saved either way.
- **One-time and recurring payments** through Stripe, including monthly
  retainer plans and promo codes.
- **Quick payment page** at `/pay` for sending a client a custom amount to
  pay, separate from the catalog.
- **Accounts** with email confirmation, so returning customers can see
  their order history at `/account`.
- **Admin dashboard** at `/admin` listing every order, contact message,
  and payment request, with search and filtering.

## Stack

- Next.js 15 (App Router), React 19, TypeScript
- Tailwind CSS v4, shadcn/ui built on Base UI
- Supabase for auth and data
- Stripe for payments
- Web3Forms for contact and order email notifications
- Hosted on Vercel

## Running it locally

You need Node 20+ and pnpm.

```bash
pnpm install
cp .env.local.example .env.local   # then fill in the values below
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Other commands:

```bash
pnpm build         # production build
pnpm start         # run the production build
pnpm lint          # eslint
pnpm format        # prettier
pnpm exec tsc --noEmit   # typecheck
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in real values. Nothing
runs without the Supabase and Stripe values.

| Variable | Where to get it |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL, or `http://localhost:3000` locally |
| `STRIPE_SECRET_KEY` | Stripe Dashboard, Developers, API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard, Developers, API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard, Developers, Webhooks, the endpoint's signing secret |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project, Settings, API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase project, Settings, API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project, Settings, API. Secret, server only |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | [web3forms.com](https://web3forms.com), free |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 property. Optional |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project. Optional |

## Stripe setup

Payments work in two halves, and both have to be right.

1. **Taking the payment.** `STRIPE_SECRET_KEY` lets the app create charges
   and subscriptions. If this is wrong, checkout fails outright.
2. **Hearing back about it.** Stripe calls the app at
   `/api/webhooks/stripe` to report that a payment succeeded, and the app
   verifies that call using `STRIPE_WEBHOOK_SECRET`. If this is wrong, the
   money still moves but orders stay stuck on `pending`.

Point the Stripe webhook at `https://your-domain/api/webhooks/stripe` and
have it send `payment_intent.succeeded` and `invoice.paid`.

Keep exactly one webhook endpoint per environment. Each endpoint has its
own signing secret, and the app only holds one, so a second endpoint will
fail signature checks on every event. For local testing use
`stripe listen --forward-to localhost:3000/api/webhooks/stripe`, which
prints a separate secret meant only for local use.

## Where the data lives

The service catalog is a plain TypeScript file, `src/lib/products.ts`.
There is no CMS, so editing prices or adding a service means editing that
file and redeploying.

Everything else is in Supabase (project ref `qcejbzcrpipgqiuelvqr`):
orders, order items, contact messages, payment requests, and user profiles.
Profiles carry a role of either `client` or `admin`, and new signups default
to `client`. To make someone an admin, change their `profiles.role` to
`admin` in the Supabase table editor.

The schema is not managed by migration files. `db/schema.sql` is a snapshot
of the live database, kept here so the database could be rebuilt from
scratch if the Supabase project were ever lost. It is a recovery copy, not
something that gets applied on deploy, so regenerate it whenever the real
schema changes.

## Deployment

Deploys to Vercel automatically on every push to `main`.

This app needs a Node host. It uses server actions and API routes for
Stripe, so it cannot be dropped onto static shared hosting as plain files.
See `docs/vercel-deployment.md` for the full deploy steps.

## Things that live outside this repo

If the laptop dies, this repo plus the following accounts is everything:

- **Vercel**, hosting and production environment variables
- **Supabase**, the database and auth (project ref `qcejbzcrpipgqiuelvqr`)
- **Stripe**, payments and the webhook endpoint
- **The domain registrar** for maxora.tech
- **Web3Forms**, the contact form key

Real secret values are not in this repo by design. They live in Vercel's
environment variable settings and in the local `.env.local`, which is
gitignored.
