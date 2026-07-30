import { Resend } from 'resend';

const NOTIFY_FROM = 'Maxora Website <notifications@maxora.tech>';
const NOTIFY_TO = 'mahermously2008@gmail.com';

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

/**
 * Sends an email notification to the site owner via Resend.
 * No-ops (with a warning) when RESEND_API_KEY is not set, so forms keep
 * working before the key is configured.
 */
export async function sendNotification(
  subject: string,
  fields: Record<string, string | number | undefined>,
): Promise<void> {
  const resend = getClient();
  if (!resend) {
    console.warn('[resend] RESEND_API_KEY not set, skipping email notification');
    return;
  }
  const html = Object.entries(fields)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value ?? ''}</p>`)
    .join('\n');
  try {
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject,
      html,
    });
    if (error) console.error('[resend] notification failed:', error);
  } catch (err) {
    console.error('[resend] notification error:', err);
  }
}
