import { Resend } from 'resend';

const NOTIFY_FROM = 'Maxora Website <notifications@maxora.tech>';
const REPLY_FROM = 'Maxora <hello@maxora.tech>';
const NOTIFY_TO = 'maxoradev@gmail.com';
const LOGO_URL = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxora.tech'}/logo-mark.png`;

const INK = '#090d12';
const CARD = '#1a2432';
const BORDER = '#33455a';
const TEXT = '#ffffff';
const MUTED = '#b7c2cc';
const ACCENT = '#3ee0f5';

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function layout(opts: { preheader: string; eyebrow?: string; bodyHtml: string }): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
  </head>
  <body bgcolor="${INK}" style="margin:0;padding:0;background-color:${INK} !important;font-family:Helvetica,Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${INK}" style="background-color:${INK} !important;">
      <tr>
        <td align="center" style="padding:48px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:540px;">
            <tr>
              <td align="center" style="padding-bottom:24px;">
                <img
                  src="${LOGO_URL}"
                  width="52"
                  height="52"
                  alt="Maxora"
                  style="display:block;width:52px;height:52px;border-radius:12px;border:2px solid ${ACCENT};"
                />
              </td>
            </tr>
            <tr>
              <td bgcolor="${CARD}" style="background-color:${CARD} !important;border:1px solid ${BORDER};border-radius:16px;padding:40px 36px;">
                ${opts.eyebrow ? `<p style="margin:0 0 10px;font-size:12px;font-weight:700;letter-spacing:0.08em;color:${ACCENT};text-transform:uppercase;">${escapeHtml(opts.eyebrow)}</p>` : ''}
                ${opts.bodyHtml}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:28px;">
                <p style="margin:0;font-size:13px;color:${MUTED};">
                  Maxora &middot; <a href="https://maxora.tech" style="color:${ACCENT};text-decoration:underline;">maxora.tech</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function detailRows(fields: Record<string, string | number | undefined>): string {
  return Object.entries(fields)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:14px 0;border-bottom:1px solid ${BORDER};">
            <div style="font-size:12px;font-weight:700;letter-spacing:0.05em;color:${MUTED};text-transform:uppercase;">${escapeHtml(key)}</div>
            <div style="margin-top:4px;font-size:15px;line-height:1.6;color:${TEXT};white-space:pre-wrap;">${escapeHtml(String(value ?? ''))}</div>
          </td>
        </tr>`,
    )
    .join('');
}

/**
 * Sends an internal email notification to the Maxora team via Resend.
 * No-ops (with a warning) when RESEND_API_KEY is not set, so forms keep
 * working before the key is configured. Always awaited by callers so the
 * send completes before the serverless function exits.
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
  const bodyHtml = `
    <h1 style="margin:0 0 22px;font-size:22px;line-height:1.4;color:${TEXT};font-weight:700;">${escapeHtml(subject)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(fields)}</table>
  `;
  try {
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject,
      html: layout({ preheader: subject, eyebrow: 'New submission', bodyHtml }),
    });
    if (error) console.error('[resend] notification failed:', error);
  } catch (err) {
    console.error('[resend] notification error:', err);
  }
}

/**
 * Sends a branded "we received it and will reply" confirmation to the
 * person who submitted a form. Best-effort, same no-op behavior as
 * sendNotification when RESEND_API_KEY is not set. Always awaited by
 * callers so the send completes before the serverless function exits.
 *
 * `from` stays on the verified maxora.tech domain because Resend can only
 * send from a domain you prove ownership of via DNS, and Gmail's DMARC
 * policy rejects mail spoofing @gmail.com. Replies route to the Gmail
 * inbox via replyTo instead, so hitting Reply still lands in maxoradev@.
 */
export async function sendConfirmation(
  to: string,
  opts: { subject: string; heading: string; message: string },
): Promise<void> {
  const resend = getClient();
  if (!resend) {
    console.warn('[resend] RESEND_API_KEY not set, skipping confirmation email');
    return;
  }
  const bodyHtml = `
    <h1 style="margin:0 0 18px;font-size:22px;line-height:1.4;color:${TEXT};font-weight:700;">${escapeHtml(opts.heading)}</h1>
    <p style="margin:0;font-size:16px;line-height:1.75;color:${MUTED};">${escapeHtml(opts.message)}</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: REPLY_FROM,
      to,
      subject: opts.subject,
      html: layout({ preheader: opts.message, eyebrow: 'Received', bodyHtml }),
      replyTo: NOTIFY_TO,
    });
    if (error) console.error('[resend] confirmation failed:', error);
  } catch (err) {
    console.error('[resend] confirmation error:', err);
  }
}

/**
 * Sends a manual reply typed by an admin from the dashboard.
 */
export async function sendReply(
  to: string,
  opts: { subject: string; body: string },
): Promise<{ ok: true } | { ok: false; error: string }> {
  const resend = getClient();
  if (!resend) return { ok: false, error: 'Email is not configured (missing RESEND_API_KEY).' };

  const bodyHtml = `
    <h1 style="margin:0 0 18px;font-size:22px;line-height:1.4;color:${TEXT};font-weight:700;">${escapeHtml(opts.subject)}</h1>
    <p style="margin:0;font-size:16px;line-height:1.75;color:${MUTED};">${escapeHtml(opts.body).replace(/\n/g, '<br />')}</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: REPLY_FROM,
      to,
      subject: opts.subject,
      html: layout({ preheader: opts.body, eyebrow: 'Maxora replied', bodyHtml }),
      replyTo: NOTIFY_TO,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to send reply.' };
  }
}
