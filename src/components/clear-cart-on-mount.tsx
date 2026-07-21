'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart-context';

// Cart is only cleared once we actually land on the success page (i.e. Stripe
// confirmed payment and redirected here) — clearing any earlier would empty
// the cart mid-payment, before the charge is confirmed.
export function ClearCartOnMount() {
  const { clear } = useCart();
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
}
