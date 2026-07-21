import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/service';
import type Stripe from 'stripe';

async function markPaid(metadata: Stripe.Metadata | null | undefined) {
  const orderId = metadata?.order_id;
  const paymentRequestId = metadata?.payment_request_id;
  if (!orderId && !paymentRequestId) return;

  const supabase = createServiceClient();

  if (orderId) {
    const { error } = await supabase.from('orders').update({ status: 'paid' }).eq('id', orderId);
    if (error) console.error('[stripe webhook] failed to mark order paid:', error);
  }

  if (paymentRequestId) {
    const { error } = await supabase
      .from('payment_requests')
      .update({ status: 'paid' })
      .eq('id', paymentRequestId);
    if (error) console.error('[stripe webhook] failed to mark payment request paid:', error);
  }
}

export async function POST(req: NextRequest) {
  const stripe = getStripeClient();
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[stripe webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    await markPaid(paymentIntent.metadata);
  }

  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice;
    const subscriptionId =
      typeof invoice.parent?.subscription_details?.subscription === 'string'
        ? invoice.parent.subscription_details.subscription
        : undefined;
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      await markPaid(subscription.metadata);
    }
  }

  return NextResponse.json({ received: true });
}
