# EmailJS Setup Instructions

Your contact form is now configured to use EmailJS to send emails directly to your Gmail account (christianmiguelandal@gmail.com).

## Step 1: Create EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up for a free account (200 emails/month free)
3. Verify your email address

## Step 2: Add Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Select **Gmail** as your email service
4. Connect your Gmail account (christianmiguelandal@gmail.com)
5. Copy your **Service ID** (you'll need this)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use the following template:

**Template Name:** Contact Form

**Subject:** New Contact Form Message: {{subject}}

**Content:**
```
You have received a new message from your portfolio contact form.

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your portfolio website.
```

4. Copy your **Template ID** (you'll need this)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the EmailJS dashboard
2. Copy your **Public Key** (also called API Key)

## Step 5: Update Your Code

Open `script.js` and find the `EMAILJS_CONFIG` object (around line 55). Replace the three placeholder values:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "YOUR_PUBLIC_KEY",        // ← Replace this with your Public Key
    SERVICE_ID: "YOUR_SERVICE_ID",        // ← Replace this with your Service ID
    TEMPLATE_ID: "YOUR_TEMPLATE_ID"       // ← Replace this with your Template ID
};
```

### Example:

After updating, it should look like this:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "abc123xyz789",                    // Your actual Public Key
    SERVICE_ID: "service_abc123",                  // Your actual Service ID
    TEMPLATE_ID: "template_xyz789"                 // Your actual Template ID
};
```

**Important:** 
- Keep the quotes around the values
- Don't remove any commas
- Make sure there are no extra spaces

## Testing

1. Fill out the contact form on your portfolio
2. Submit the form
3. Check your Gmail inbox (christianmiguelandal@gmail.com)
4. You should receive the email!

## Troubleshooting

- If emails don't send, check the browser console (F12) for errors
- Make sure all three IDs are correctly replaced in script.js
- Verify your Gmail account is properly connected in EmailJS
- Check EmailJS dashboard for any error messages

## Security Note

The Public Key is safe to expose in client-side code. EmailJS uses it to verify your account, but it doesn't give access to your emails or account settings.

