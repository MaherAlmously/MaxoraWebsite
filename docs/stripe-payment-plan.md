# Stripe Payment Plan

Status: planned, not built yet.

## Where things stand today

When someone checks out, we save their order in Supabase and email you. **No money is
actually charged yet.** Stripe is installed but not connected. The API keys are already in
`.env.local`, so we're ready to wire it up.

## What checkout will feel like

One page, one flow, no redirects and no separate "next step":

1. Customer lands on `/checkout` and sees their cart summary (like today).
2. Below it, on the same page: name, email, phone, notes, **and** the card fields, all
   visible at once.
3. They fill it in and hit **Pay $X**.
4. The charge happens right there. On success, the page shows a confirmation — no new
   tab, no leaving maxora.tech.

## The two things that make this slightly more than "one click"

1. **Mixed orders (one-time item + monthly plan in the same cart).** Stripe can only
   charge one or the other per payment, so if a cart has both, the customer pays for the
   one-time part first, then the same page immediately shows a second "confirm your
   monthly plan" card form right after — still on `/checkout`, still no redirect, just two
   quick taps instead of one.
2. **Monthly plans have a fixed term** (6 or 12 months), not forever. Stripe is told to
   automatically stop billing once the term is up — nobody has to remember to cancel it.

## What we'll build, step by step

**1. Add a few tracking fields to the `orders` table**
So we can tell whether an order has actually been paid, or is just sitting there
unconfirmed.

**2. Add Stripe's card fields directly into the checkout form**
Using Stripe's "Payment Element," which renders inline next to your name/email/phone
fields — not a popup, not a redirect. One "Pay" button submits everything together.

**3. Listen for Stripe to confirm payment**
Stripe calls our server the moment a payment succeeds. That's the only signal we trust to
mark an order as "paid" — we never mark it paid just because the customer's browser says
it finished.

**4. Update the success/cancel screens**
"Success" should say the payment went through, not "we'll send you a payment link" like it
does now. Add a proper "cancelled" state too, so a failed or abandoned payment doesn't
lose the cart.

**5. Test it with fake cards**
Before going live, we'll run through all three cases — one-time order, subscription order,
mixed order — using Stripe's test mode.

## Build order

1. Database changes
2. Add card fields to the checkout form
3. Wire up the Pay button
4. Listen for payment confirmation
5. Update success/cancelled screens
6. Test everything
