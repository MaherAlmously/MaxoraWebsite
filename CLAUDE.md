# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev             # dev server (Turbopack) - lands on :3000, or next free port if occupied
pnpm build           # production build (Turbopack) + next-sitemap generation
pnpm start           # run the production build
pnpm lint            # eslint
pnpm format          # prettier --write .
pnpm format:check    # prettier --check .
pnpm exec tsc --noEmit   # typecheck (no dedicated script - run directly)
```

There is no test suite in this repo. Verify changes with `pnpm exec tsc --noEmit` and `pnpm build`.

## Architecture

Next.js 15 App Router, React 19, TypeScript, Tailwind v4, shadcn/ui on Base UI (not Radix -
`Button` etc. use `useRender`/`render` props, not `asChild`; see `src/components/ui/button.tsx`
for the asChild→render shim pattern). No CMS - the product/pricing catalog is a static file at
`src/lib/products.ts`.

### Data layer: Supabase

Project ref `qcejbzcrpipgqiuelvqr`. Table definitions live only in the live DB (no
`supabase/migrations` directory in this repo) - use the `mcp__maxora__*` tools
(`list_tables`, `execute_sql`, `apply_migration`) to inspect/change schema, not local SQL files.
`db/schema.sql` is a point-in-time snapshot of that live schema (tables, RLS policies,
functions, triggers) kept in the repo as disaster recovery, not an applied migration -
regenerate it from the live DB whenever the schema changes, don't hand-edit it out of sync.

Three Supabase client variants, each for a different trust boundary:
- `src/lib/supabase/client.ts` - browser client (anon key), for client components.
- `src/lib/supabase/server.ts` - server client (anon key, cookie-based), for Server
  Components/Actions. Respects RLS.
- `src/lib/supabase/service.ts` - service-role client, bypasses RLS. Used only in narrow
  trusted contexts (Stripe webhook, patching `stripe_session_id` back onto an order/payment
  request after Stripe object creation, since RLS has no UPDATE policy for anon/authenticated).

Core tables: `orders`, `order_items`, `contact_messages`, `payment_requests` (all allow
anonymous INSERT by design - guest checkout has no auth requirement), and `profiles` (role-based
access - see below).

### Auth & roles

Supabase email/password auth. `profiles` table (`id` FK → `auth.users.id`, `email`, `role`
`'client' | 'admin'` default `'client'`, `confirmed_at`) is kept in sync with `auth.users` via
DB triggers (`handle_new_user`, `handle_user_confirmed`) - every new signup gets a profile row
automatically. `is_admin()` is a `SECURITY DEFINER` SQL function used in RLS policies so admins
can read/update `orders`/`order_items`/`contact_messages`/`payment_requests` without those
tables needing their own per-role policies duplicated everywhere.

Email confirmation is enforced at the **application layer**, not just the Supabase dashboard
toggle: `auth-form.tsx` checks `data.user.email_confirmed_at` after `signInWithPassword` and
signs the user back out if unconfirmed (shows a resend-confirmation UI instead). Confirmation
links must use the `token_hash`+`type` format (see `docs/confirm-email-template.html`), not
Supabase's default `{{ .ConfirmationURL }}` PKCE-code link - the PKCE code only verifies in the
same browser that started the signup, which breaks when the link opens in a different
browser/mail client. `src/app/auth/callback/route.ts` handles both formats for robustness.

`src/lib/supabase/middleware.ts` (invoked from `src/middleware.ts` on every request) is the
single choke point for route protection: gates `/account` (any authenticated+confirmed user)
and `/admin` (must additionally have `profiles.role = 'admin'`, checked via a DB query). Do not
add a second, separate signOut()/redirect call here per-route - it runs on every request, so
extra network calls here (e.g. a stray `supabase.auth.signOut()`) become a global performance
tax across the whole site.

The admin dashboard (`src/app/admin/`) is server-rendered, reads directly through the
authenticated user's own Supabase session (relying on the `is_admin()` RLS policies), not the
service-role client - keep that pattern when extending it rather than reaching for
`createServiceClient()`.

### Checkout flow

`src/app/actions/checkout.ts` (`placeOrder` server action) is guest-first: it reads the current
user via `supabase.auth.getUser()` but doesn't require one, sets `orders.user_id` to `user?.id
?? null`. The order UUID is generated client-side with `randomUUID()` before insert, because RLS
blocks `.select()` returning rows for anonymous inserts. Creates either a Stripe PaymentIntent
(one-time) or Subscription (recurring plans, e.g. the $125/100 monthly social-media/flyer
tiers), applies promo codes via `src/lib/stripe-discount.ts`. `src/app/actions/payment-request.ts`
is a parallel, simpler flow for the standalone "quick payment" feature (`payment_requests`
table). Both patch `stripe_session_id` back via the service-role client post-creation.

### Theming

Dark navy/cyan theme, dark-mode-default via a class on `<html>` plus a pre-paint localStorage
script (key `maxora-theme`) to avoid flash. Light values in `:root`, dark overrides in `.dark`.
Signature utilities in `src/app/globals.css`: `facet-cut`/`facet-cut-sm`, `eyebrow`,
`text-gradient`/`text-gradient-flow`, `glow`, `glass`. Reuse these rather than inventing new
card/heading treatments - they're what keeps every page visually consistent.

### Deployment

Requires a Node-capable host (server actions + API routes for Stripe) - cannot run on static
shared hosting. See `docs/vercel-deployment.md`.
