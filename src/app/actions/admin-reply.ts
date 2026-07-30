'use server';

import { createClient } from '@/lib/supabase/server';
import { sendReply } from '@/lib/resend';

export type AdminReplyState = { ok: boolean; error?: string } | null;

export async function sendAdminReply(
  _prev: AdminReplyState,
  formData: FormData,
): Promise<AdminReplyState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'Not authenticated.' };

  const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
  if (profile?.role !== 'admin') return { ok: false, error: 'Not authorized.' };

  const to = String(formData.get('to') ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim();
  const body = String(formData.get('body') ?? '').trim();

  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return { ok: false, error: 'Missing or invalid recipient email.' };
  }
  if (!subject) return { ok: false, error: 'Please enter a subject.' };
  if (!body) return { ok: false, error: 'Please enter a message.' };

  const result = await sendReply(to, { subject, body });
  if (!result.ok) return { ok: false, error: result.error };

  return { ok: true };
}
