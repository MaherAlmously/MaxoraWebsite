import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient } from '@/lib/stripe';
import { createServiceClient } from '@/lib/supabase/service';

export async function POST(req: NextRequest) {
  const stripe = getStripeClient();
  const signature = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('[stripe webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
    const session = event.data.object as { id: string; metadata?: Record<string, string> | null };
    const orderId = session.metadata?.order_id;
    const paymentRequestId = session.metadata?.payment_request_id;
    const supabase = createServiceClient();

    if (orderId) {
      const { error } = await supabase
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId)
        .eq('stripe_session_id', session.id);
      if (error) console.error('[stripe webhook] failed to mark order paid:', error);
    }

    if (paymentRequestId) {
      const { error } = await supabase
        .from('payment_requests')
        .update({ status: 'paid' })
        .eq('id', paymentRequestId)
        .eq('stripe_session_id', session.id);
      if (error) console.error('[stripe webhook] failed to mark payment request paid:', error);
    }
  }

  return NextResponse.json({ received: true });
}
