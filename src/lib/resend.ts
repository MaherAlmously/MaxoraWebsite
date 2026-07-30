import { Resend } from 'resend';

const NOTIFY_FROM = 'Maxora Website <notifications@maxora.tech>';
const REPLY_FROM = 'Maxora <hello@maxora.tech>';
const NOTIFY_TO = 'maxoradev@gmail.com';
const LOGO_URL = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxora.tech'}/logo-mark.png`;

const INK = '#0a0e13';
const CARD = '#151d27';
const LOGO_FRAME = '#0a0e13';
const BORDER = '#2a3644';
const TEXT = '#ffffff';
const MUTED = '#a7b3bd';
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

function layout(opts: { preheader: string; bodyHtml: string }): string {
  return `<!doctype html>
<html style="background-color:${INK} !important;">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="dark" />
    <meta name="supported-color-schemes" content="dark" />
    <style>
      body, table, td { -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; }
      body { background-color:${INK} !important; }
      a { color:${ACCENT}; }
      @media (prefers-color-scheme: light), (prefers-color-scheme: dark) {
        body, .mx-bg { background-color:${INK} !important; }
        .mx-card { background-color:${CARD} !important; }
        .mx-frame { background-color:${LOGO_FRAME} !important; }
        .mx-text { color:${TEXT} !important; }
        .mx-muted { color:${MUTED} !important; }
      }
    </style>
  </head>
  <body bgcolor="${INK}" style="margin:0;padding:0;background-color:${INK} !important;font-family:Helvetica,Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(opts.preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${INK}" class="mx-bg" style="background-color:${INK} !important;">
      <tr>
        <td align="center" style="padding:40px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;">
            <tr>
              <td align="center" style="padding-bottom:28px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td
                      align="center"
                      valign="middle"
                      bgcolor="${LOGO_FRAME}"
                      class="mx-frame"
                      style="width:64px;height:64px;background-color:${LOGO_FRAME} !important;border:1px solid ${ACCENT};border-radius:16px;"
                    >
                      <img
                        src="${LOGO_URL}"
                        width="40"
                        height="40"
                        alt="Maxora"
                        style="display:block;width:40px;height:40px;border-radius:10px;"
                      />
                    </td>
                  </tr>
                </table>
                <div class="mx-text" style="margin-top:12px;font-size:16px;font-weight:700;letter-spacing:0.06em;color:${TEXT} !important;text-transform:uppercase;">
                  Maxora
                </div>
              </td>
            </tr>
            <tr>
              <td bgcolor="${CARD}" class="mx-card" style="background-color:${CARD} !important;border:1px solid ${BORDER};border-radius:14px;padding:36px 32px;">
                ${opts.bodyHtml}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding-top:24px;">
                <p class="mx-muted" style="margin:0;font-size:12px;color:${MUTED} !important;">
                  <a href="https://maxora.tech" style="color:${ACCENT};text-decoration:underline;">maxora.tech</a>
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
          <td style="padding:0 0 14px;">
            <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;color:${MUTED};text-transform:uppercase;">${escapeHtml(key)}</div>
            <div style="margin-top:3px;font-size:14px;line-height:1.55;color:${TEXT};white-space:pre-wrap;">${escapeHtml(String(value ?? ''))}</div>
          </td>
        </tr>`,
    )
    .join('');
}

/**
 * Sends an internal email notification to the Maxora team via Resend.
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
  const bodyHtml = `
    <div style="font-size:11px;font-weight:700;letter-spacing:0.05em;color:${ACCENT};text-transform:uppercase;">New submission</div>
    <h1 style="margin:8px 0 24px;font-size:19px;line-height:1.4;color:${TEXT};font-weight:700;">${escapeHtml(subject)}</h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailRows(fields)}</table>
  `;
  try {
    const { error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: NOTIFY_TO,
      subject,
      html: layout({ preheader: subject, bodyHtml }),
    });
    if (error) console.error('[resend] notification failed:', error);
  } catch (err) {
    console.error('[resend] notification error:', err);
  }
}

/**
 * Sends a branded "we received it and will reply" confirmation to the
 * person who submitted a form. Best-effort, same no-op behavior as
 * sendNotification when RESEND_API_KEY is not set.
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
    <h1 style="margin:0 0 16px;font-size:19px;line-height:1.4;color:${TEXT};font-weight:700;">${escapeHtml(opts.heading)}</h1>
    <p style="margin:0;font-size:15px;line-height:1.7;color:${TEXT};">${escapeHtml(opts.message)}</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: REPLY_FROM,
      to,
      subject: opts.subject,
      html: layout({ preheader: opts.message, bodyHtml }),
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
    <h1 style="margin:0 0 16px;font-size:19px;line-height:1.4;color:${TEXT};font-weight:700;">${escapeHtml(opts.subject)}</h1>
    <p style="margin:0;font-size:15px;line-height:1.7;color:${TEXT};">${escapeHtml(opts.body).replace(/\n/g, '<br />')}</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: REPLY_FROM,
      to,
      subject: opts.subject,
      html: layout({ preheader: opts.body, bodyHtml }),
      replyTo: NOTIFY_TO,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Failed to send reply.' };
  }
}
