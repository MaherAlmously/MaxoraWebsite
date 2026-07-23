# Stripe Payment Plan

Status: **built and live**. This doc now describes what was implemented, kept as the
reference for how the flow actually works.

## How checkout works today

One page, one flow, no redirects:

1. Customer lands on `/checkout`, sees their cart summary, fills in name/email/phone/notes.
2. `placeOrder` (`src/app/actions/checkout.ts`) validates every line against the canonical
   catalog (`src/lib/products.ts` - client-submitted prices are never trusted), inserts the
   order + order_items into Supabase, then creates a Stripe **PaymentIntent** (one-time items)
   or **Subscription** (recurring plans, e.g. the monthly social-media/flyer tiers) and returns
   a `clientSecret`.
3. `src/components/embedded-payment.tsx` renders Stripe's Payment Element inline using that
   `clientSecret` - still on `/checkout`, no new tab.
4. On success the page redirects to `/checkout/success`.

**Mixed carts** (one-time item + monthly plan together): a subscription is created with the
recurring line(s) as subscription items and the one-time line(s) as `add_invoice_items` on the
same first invoice, so it's still a single payment confirmation, not two separate charges.

**Monthly plans have a fixed term** (6 or 12 months, `termMonths` on the tier in
`src/lib/products.ts`) but this is currently just descriptive data - nothing schedules the
Stripe subscription to auto-cancel at the end of the term yet. If that matters, it still needs
to be wired up (e.g. `cancel_at` on subscription creation, or a scheduled job).

## Payment confirmation

`src/app/api/webhooks/stripe/route.ts` is the only source of truth for marking an order or
payment request `paid` - the client finishing the Payment Element flow is never trusted on its
own. It listens for `payment_intent.succeeded` (one-time) and `invoice.paid` (subscriptions,
via the invoice's parent subscription) and flips `orders.status`/`payment_requests.status` using
`order_id`/`payment_request_id` from the Stripe object's metadata.

## Promo codes

`src/app/actions/promo.ts` + `src/lib/stripe-discount.ts`: one-time PaymentIntents apply the
discount to the amount up front (PaymentIntents have no `coupon` param); subscriptions pass the
Stripe promotion code directly as a `discounts` entry so Stripe tracks it as a recurring
discount rather than a one-off deduction.

## Quick payment requests

A separate, simpler flow (`src/app/actions/payment-request.ts`, `payment_requests` table,
`/pay`) for one-off payment links outside the product catalog - same guest-friendly pattern
(anonymous insert, service-role client patches `stripe_session_id` back after Stripe object
creation).
