'use server';

import { createClient } from '@/lib/supabase/server';
import { sendNotification, sendConfirmation } from '@/lib/resend';

export type ContactState = { ok: boolean; error?: string } | null;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const service = String(formData.get('service') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: 'Please enter your name and a valid email address.' };
  }
  if (!message) {
    return { ok: false, error: 'Please tell us a bit about your project.' };
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_messages').insert({
    name,
    email,
    service: service || null,
    message,
  });
  if (error) {
    console.error('[contact] insert failed:', error);
    return { ok: false, error: 'Something went wrong sending your message. Please try again.' };
  }

  void sendNotification(`New contact message from ${name}`, {
    name,
    email,
    service: service || 'not specified',
    message,
  });

  void sendConfirmation(email, {
    subject: 'We received your message',
    heading: `Thanks for reaching out, ${name.split(' ')[0]}`,
    message:
      "We've received your message and a member of the Maxora team will get back to you within 24 hours. If it's urgent, feel free to reply directly to this email.",
  });

  return { ok: true };
}
