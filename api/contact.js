// Vercel serverless function for the portfolio contact form.
// Required environment variable: RESEND_API_KEY.
// CONTACT_FROM_EMAIL is recommended for production and defaults to Resend's test sender.
// CONTACT_TO_EMAIL is optional and defaults to andalpapi33@gmail.com.

module.exports = async function handler(request, response) {
    if (request.method !== 'POST') {
        response.setHeader('Allow', 'POST');
        return response.status(405).json({ error: 'Method not allowed.' });
    }

    const { from_name, from_email, subject, message, website } = request.body || {};
    if (website) return response.status(200).json({ ok: true });

    if (!from_name || !from_email || !subject || !message) {
        return response.status(400).json({ error: 'Please complete all required fields.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(String(from_email)) || String(message).length > 10000) {
        return response.status(400).json({ error: 'Please provide a valid email and message.' });
    }

    if (!process.env.RESEND_API_KEY) {
        return response.status(500).json({ error: 'Email service is not configured.' });
    }

    const recipient = process.env.CONTACT_TO_EMAIL || 'andalpapi33@gmail.com';
    const sender = process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>';

    const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            from: sender,
            to: [recipient],
            reply_to: String(from_email),
            subject: `Portfolio contact: ${String(subject).slice(0, 160)}`,
            text: [
                `Name: ${String(from_name).slice(0, 160)}`,
                `Email: ${String(from_email).slice(0, 254)}`,
                `Subject: ${String(subject).slice(0, 160)}`,
                '',
                String(message).slice(0, 10000)
            ].join('\n')
        })
    });

    if (!emailResponse.ok) {
        console.error('Resend error:', await emailResponse.text());
        return response.status(502).json({ error: 'Email provider rejected the message.' });
    }

    return response.status(200).json({ ok: true });
};
