'use server';

import { createClient } from '@/lib/supabase/server';

export type SouqlyDeleteState = { ok: boolean; error?: string } | null;

export async function submitSouqlyDeleteRequest(
  _prev: SouqlyDeleteState,
  formData: FormData,
): Promise<SouqlyDeleteState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const reason = String(formData.get('reason') ?? '').trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter your name and the email your Souqly account uses.' };
  }

  const message = ['Souqly account deletion request', reason ? `Reason: ${reason}` : null]
    .filter(Boolean)
    .join('\n');

  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    service: 'souqly-account-deletion',
    message,
  });
  if (error) {
    console.error('[souqly-delete] insert failed:', error);
    return { ok: false, error: 'Something went wrong sending your request. Please try again.' };
  }

  return { ok: true };
}
