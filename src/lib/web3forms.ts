const ENDPOINT = 'https://api.web3forms.com/submit';

/**
 * Sends an email notification to the site owner via Web3Forms.
 * No-ops (with a warning) when NEXT_PUBLIC_WEB3FORMS_KEY is not set, so
 * forms keep working before the key is configured.
 */
export async function sendNotification(
  subject: string,
  fields: Record<string, string | number | undefined>,
): Promise<void> {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
  if (!key) {
    console.warn('[web3forms] NEXT_PUBLIC_WEB3FORMS_KEY not set, skipping email notification');
    return;
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_key: key, subject, from_name: 'Maxora Website', ...fields }),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) console.error('[web3forms] notification failed:', res.status);
  } catch (err) {
    console.error('[web3forms] notification error:', err);
  }
}
