# Branded Auth Emails — send from maxoradev@gmail.com

Supabase sends auth emails (signup confirmation, password reset, etc.) from its own
address until you connect an email account via SMTP. This is a Supabase dashboard
setting — I can't do it for you since it needs your Google account, but it only takes
about 5 minutes. After this, confirmation emails come from maxoradev@gmail.com with
the Maxora-branded template below (no Supabase mention).

## Step 1: Turn on 2-Step Verification (if not already on)

1. Log into maxoradev@gmail.com.
2. Go to https://myaccount.google.com/security
3. Under "How you sign in to Google", turn on **2-Step Verification** if it isn't
   already. Gmail requires this before it will issue an app password.

## Step 2: Create a Gmail App Password

1. Go to https://myaccount.google.com/apppasswords (while logged into maxoradev@gmail.com)
2. App name: `Maxora Supabase`
3. Click **Create**. Copy the 16-character password shown — you won't see it again.

## Step 3: Turn on custom SMTP in Supabase

1. Open https://supabase.com/dashboard/project/qcejbzcrpipgqiuelvqr/settings/auth
2. Scroll to **SMTP Settings** and enable **Custom SMTP**.
3. Fill in exactly:
   - Sender email: `maxoradev@gmail.com`
   - Sender name: `Maxora`
   - Host: `smtp.gmail.com`
   - Port: `465`
   - Username: `maxoradev@gmail.com`
   - Password: the 16-character app password from Step 2
4. Save.

## Step 4: Replace the email template (removes Supabase branding from the content)

1. Go to Authentication -> Email Templates -> "Confirm signup".
2. Set Subject to: `Confirm your Maxora account`
3. Replace the body with the HTML below and save.

**Note on the link:** the button uses `{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup`,
not Supabase's default `{{ .ConfirmationURL }}`. The default link routes through Supabase's
hosted PKCE verify endpoint, which only works if opened in the same browser that started the
signup - it fails (silently, landing on `/login` unauthenticated) when the link opens in a
different browser or mail-client webview, which is common. The `token_hash` link verifies
directly via `src/app/auth/callback/route.ts` (`supabase.auth.verifyOtp`) regardless of which
browser opens it. See `docs/confirm-email-template.html` for the full current template.

```html
<div style="margin:0;padding:32px 16px;background-color:#111a21;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:480px;margin:0 auto;background-color:#16212b;border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:36px 32px;">
    <p style="margin:0 0 6px;font-size:22px;font-weight:bold;color:#ffffff;letter-spacing:1px;">
      Maxora
    </p>
    <h1 style="margin:24px 0 12px;font-size:20px;color:#ffffff;">Confirm your email</h1>
    <p style="margin:0 0 20px;font-size:14px;line-height:1.6;color:#a8b3bd;">
      Thanks for creating a Maxora account. Click the button below to confirm your
      email address and activate your account.
    </p>
    <a href="{{ .SiteURL }}/auth/callback?token_hash={{ .TokenHash }}&type=signup"
       style="display:inline-block;background-color:#35e0e0;color:#111a21;font-size:14px;font-weight:bold;text-decoration:none;padding:12px 28px;border-radius:8px;">
      Confirm my account
    </a>
    <p style="margin:28px 0 0;font-size:12px;line-height:1.6;color:#6b7885;">
      If you did not create this account, you can ignore this email — no account will
      be created and no further emails will be sent.
    </p>
  </div>
  <p style="max-width:480px;margin:16px auto 0;text-align:center;font-size:11px;color:#6b7885;">
    Maxora · Websites, branding, and digital growth<br>
    This is a one-time transactional email sent because you signed up at our website.
  </p>
</div>
```

Optional: update the "Magic Link" and "Reset Password" templates the same way,
changing only the heading and first paragraph to match ("Reset your password",
"Log in to Maxora", etc.) — keep the same look.

## Step 5: Test

Sign up on the site with a fresh email address. The confirmation email should now
arrive from maxoradev@gmail.com, titled "Confirm your Maxora account", with no
Supabase name or branding anywhere in it.

## Reducing spam/trash placement with Gmail SMTP

If confirmation emails are still landing in spam or trash even after custom SMTP is
on, the template alone won't fully fix it — Gmail SMTP relay from a personal address
has weak sender reputation for automated transactional mail, and this compounds over
time as more signups happen from different receiving providers. The template changes
above (plain-text link fallback, explicit "no more emails" language, a short footer
disclosure) reduce common spam-filter triggers, but the underlying fix if this
persists is moving off Gmail SMTP to a transactional provider (Resend, SendGrid,
Postmark) with your own domain + SPF/DKIM/DMARC — that's what actually builds sender
reputation. Same Supabase SMTP form, just different host/port/username/password.

Also worth checking meanwhile:
- Ask early testers to mark the message "Not spam" once — this feeds provider spam
  filters faster than any template change.
- In Gmail, open the received email -> "Show original" -> confirm `SPF: PASS` and
  `DKIM: PASS`. If either fails, the app password or SMTP config in Step 2/3 is wrong.
- Gmail SMTP has a ~500 emails/day limit; if signups scale up this will also start
  bouncing outright, not just landing in spam.
