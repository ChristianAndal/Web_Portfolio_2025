# Vercel contact form setup

The contact form posts to `api/contact.js`, a Vercel serverless function that sends mail through Resend. No email API key is exposed in the browser.

## Environment variables

In Vercel → Project Settings → Environment Variables, add these variables for the Production environment:

```text
RESEND_API_KEY=re_xxxxxxxxx
# Optional; defaults to andalpapi33@gmail.com
CONTACT_TO_EMAIL=andalpapi33@gmail.com
# Recommended: use an address on a domain verified in Resend
CONTACT_FROM_EMAIL=Portfolio <contact@your-verified-domain.com>
```

`RESEND_API_KEY` is required. `CONTACT_FROM_EMAIL` is recommended for production; if it is omitted, the function uses Resend's `onboarding@resend.dev` test sender, which may be restricted by Resend. For reliable delivery, verify your domain in Resend and use a matching sender address.

Redeploy after adding or changing variables. Vercel environment variable changes are applied to new deployments, not the already-running deployment.

The visitor's email is set as `reply_to`, so replies go directly to the person who submitted the form.

If the form still fails, open the latest Vercel deployment → Functions → `/api/contact` → Logs. A missing key returns `Email service is not configured`; a sender/domain or recipient problem returns `Email provider rejected the message`.
