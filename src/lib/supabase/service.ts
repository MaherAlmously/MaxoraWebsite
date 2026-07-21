import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Service-role client for trusted server contexts only (e.g. the Stripe
 * webhook), where RLS must be bypassed to update order status.
 */
export function createServiceClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
