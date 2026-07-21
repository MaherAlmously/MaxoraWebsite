import Stripe from 'stripe';

let _stripe: Stripe | undefined;

export function getStripeClient() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  }
  return _stripe;
}
