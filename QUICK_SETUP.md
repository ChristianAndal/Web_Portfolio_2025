# Quick EmailJS Setup Guide

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Sign Up & Login
- Go to: **https://www.emailjs.com/**
- Click **"Sign Up"** (free account)
- Verify your email

### 2️⃣ Add Gmail Service
1. In dashboard, click **"Email Services"** (left sidebar)
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"** and authorize
5. **Copy the Service ID** (starts with `service_`)

### 3️⃣ Create Template
1. Click **"Email Templates"** (left sidebar)
2. Click **"Create New Template"**
3. **Template Name:** `Contact Form`
4. **Subject:** `New Contact: {{subject}}`
5. **Content:** Copy and paste this:

```
You have a new message from your portfolio!

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from portfolio contact form
```

6. Click **"Save"**
7. **Copy the Template ID** (starts with `template_`)

### 4️⃣ Get Public Key
1. Click **"Account"** → **"General"** (left sidebar)
2. Find **"Public Key"** section
3. **Copy the Public Key**

### 5️⃣ Update script.js

Open `script.js` and find this section (around line 55):

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "YOUR_PUBLIC_KEY",        // ← Paste your Public Key here
    SERVICE_ID: "YOUR_SERVICE_ID",        // ← Paste your Service ID here
    TEMPLATE_ID: "YOUR_TEMPLATE_ID"       // ← Paste your Template ID here
};
```

**Replace all three values** with your actual IDs from EmailJS.

### ✅ Example After Setup:

```javascript
const EMAILJS_CONFIG = {
    PUBLIC_KEY: "aBc123XyZ789",
    SERVICE_ID: "service_abc123",
    TEMPLATE_ID: "template_xyz789"
};
```

### 6️⃣ Test It!

1. Save `script.js`
2. Refresh your portfolio page
3. Fill out the contact form
4. Submit!
5. Check your Gmail inbox (christianmiguelandal@gmail.com)

---

## 🐛 Troubleshooting

**Still seeing "EmailJS not configured"?**
- Make sure you saved `script.js` after updating
- Check that all three values are replaced (not the placeholder text)
- Verify there are quotes around each value
- Refresh the browser page

**Getting errors?**
- Open browser console (Press F12)
- Look for error messages
- Check EmailJS dashboard for any service errors

**Need help?**
- Check the full guide: `EMAILJS_SETUP.md`
- EmailJS docs: https://www.emailjs.com/docs/

