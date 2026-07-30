import { Resend } from 'resend';

const NOTIFY_FROM = 'Maxora Website <notifications@maxora.tech>';
const REPLY_FROM = 'Maxora <hello@maxora.tech>';
const NOTIFY_TO = 'maxoradev@gmail.com';
const LOGO_URL = `${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://maxora.tech'}/logo-mark.png`;

let client: Resend | null = null;

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  if (!client) client = new Resend(key);
  return client;
}

function layout(opts: { preheader: string; heading: string; bodyHtml: string }): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0;padding:0;background-color:#0b1015;font-family:'Segoe UI',Helvetica,Arial,sans-serif;">
    <span style="display:none;max-height:0;overflow:hidden;opacity:0;">${opts.preheader}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b1015;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background-color:#111a21;border-radius:16px;overflow:hidden;border:1px solid rgba(94,234,255,0.15);">
            <tr>
              <td style="padding:28px 32px;background:linear-gradient(135deg,#0d151b,#152029);border-bottom:1px solid rgba(94,234,255,0.15);">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td valign="middle" style="width:44px;">
                      <img src="${LOGO_URL}" width="36" height="36" alt="Maxora" style="display:block;border-radius:8px;" />
                    </td>
                    <td valign="middle" style="padding-left:12px;">
                      <span style="font-size:18px;font-weight:700;letter-spacing:0.02em;color:#f2f6f8;">Maxora</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 18px;font-size:20px;line-height:1.4;color:#f2f6f8;font-weight:700;">${opts.heading}</h1>
                ${opts.bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:#0d151b;border-top:1px solid rgba(94,234,255,0.1);">
                <p style="margin:0;font-size:12px;color:#7c8b94;">
                  Maxora &middot; <a href="https://maxora.tech" style="color:#5eeaff;text-decoration:none;">maxora.tech</a>
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

function fieldRows(fields: Record<string, string | number | undefined>): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    ${Object.entries(fields)
      .map(
        ([key, value]) => `<tr>
          <td style="padding:10px 0;border-bottom:1px solid rgba(94,234,255,0.08);font-size:13px;color:#7c8b94;width:130px;vertical-align:top;">${key}</td>
          <td style="padding:10px 0;border-bottom:1px solid rgba(94,234,255,0.08);font-size:14px;color:#f2f6f8;vertical-align:top;">${value ?? ''}</td>
        </tr>`,
      )
      .join('')}
  </table>`;
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
  const html = layout({
    preheader: subject,
    heading: subject,
    bodyHtml: fieldRows(fields),
  });
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
  const html = layout({
    preheader: opts.message,
    heading: opts.heading,
    bodyHtml: `<p style="margin:0;font-size:14px;line-height:1.7;color:#c3ced3;">${opts.message}</p>`,
  });
  try {
    const { error } = await resend.emails.send({
      from: REPLY_FROM,
      to,
      subject: opts.subject,
      html,
    });
    if (error) console.error('[resend] confirmation failed:', error);
  } catch (err) {
    console.error('[resend] confirmation error:', err);
  }
}
