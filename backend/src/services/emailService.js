const validator = require('validator');

function getFrontendUrl() {
  return (process.env.PUBLIC_SITE_URL || process.env.FRONTEND_URL || 'http://localhost:5173').replace(/\/$/, '');
}

function getEmailConfigStatus() {
  const notificationEmail = process.env.EMAIL_TO || '';
  const from = process.env.BREVO_SENDER_EMAIL || '';

  return {
    provider: 'brevo',
    hasBrevoApiKey: !!process.env.BREVO_API_KEY,
    from,
    notificationEmailConfigured: validator.isEmail(notificationEmail),
  };
}

function parseSender() {
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const senderName = process.env.BREVO_SENDER_NAME || 'AI Career Accelerator';

  if (!senderEmail || !validator.isEmail(senderEmail)) {
    throw new Error('Email sender is not configured. Set BREVO_SENDER_EMAIL to a verified Brevo sender email.');
  }

  return { email: senderEmail, name: senderName };
}

async function sendEmail({ to, subject, html }) {
  if (!process.env.BREVO_API_KEY) {
    throw new Error('Email is not configured. Set BREVO_API_KEY.');
  }

  console.log(`Sending email via Brevo API to ${to}`);
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'api-key': process.env.BREVO_API_KEY,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      sender: parseSender(),
      to: [{ email: to }],
      replyTo: parseSender(),
      subject,
      htmlContent: html,
    }),
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result.message || JSON.stringify(result) || response.statusText;
    throw new Error(`Brevo email failed: ${message}`);
  }

  return result;
}

async function sendWelcomeEmail(email) {
  const frontendUrl = getFrontendUrl();

  await sendEmail({
    to: email,
    subject: '🎁 Welcome! Your free AI toolkit is inside',
    html: `
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0;padding:0;background:#050810;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;">

          <!-- Header -->
          <div style="text-align:center;margin-bottom:32px;">
            <div style="display:inline-block;background:linear-gradient(135deg,#ff6b35,#ec4899);border-radius:12px;padding:12px 20px;">
              <span style="color:white;font-weight:bold;font-size:20px;">⚡ AICareer</span>
            </div>
          </div>

          <!-- Hero -->
          <div style="background:linear-gradient(135deg,rgba(255,107,53,0.1),rgba(139,92,246,0.1));border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:32px;text-align:center;margin-bottom:24px;">
            <div style="font-size:48px;margin-bottom:16px;">🎁</div>
            <h1 style="color:white;font-size:24px;margin:0 0 12px;font-weight:700;">Welcome to the AI Revolution!</h1>
            <p style="color:#9ca3af;font-size:15px;margin:0;line-height:1.6;">
              You're now part of a community of <strong style="color:white;">5,000+ learners</strong> mastering AI before it replaces them.
            </p>
          </div>

          <!-- Weekly tips preview -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-bottom:24px;">
            <h2 style="color:white;font-size:16px;margin:0 0 16px;font-weight:600;">📬 What you'll get every week:</h2>
            <div style="space-y:8px;">
              ${[
                '🤖 1 new AI tool breakdown — how to use it practically',
                '⚡ 1 time-saving prompt you can use immediately',
                '🛠 1 automation workflow to try this week',
                '📈 AI news that actually matters to your career',
              ].map(item => `
                <div style="display:flex;align-items:flex-start;gap:8px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="color:#9ca3af;font-size:14px;line-height:1.5;">${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- CTA -->
          <div style="text-align:center;margin-bottom:32px;">
            <a href="${frontendUrl}/#pricing"
               style="display:inline-block;background:linear-gradient(135deg,#ff6b35,#ec4899);color:white;text-decoration:none;font-weight:700;font-size:16px;padding:16px 40px;border-radius:50px;box-shadow:0 0 30px rgba(255,107,53,0.3);">
              🚀 Enroll Now — ₹5,999
            </a>
            <p style="color:#6b7280;font-size:13px;margin-top:12px;">Join 5,000+ learners · Lifetime access · 30-day refund</p>
          </div>

          <!-- Course highlights -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-bottom:24px;">
            <h3 style="color:white;font-size:15px;margin:0 0 16px;font-weight:600;">✅ What's inside the course:</h3>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">
              ${[
                '100+ AI Tools', '15 hrs Content', 'Live Sessions',
                'Certificate', 'Prompt Mastery', 'Automation', 'Career Guidance', 'Community',
              ].map(f => `<div style="color:#9ca3af;font-size:13px;padding:6px 0;">✓ ${f}</div>`).join('')}
            </div>
          </div>

          <!-- Footer -->
          <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);">
            <p style="color:#4b5563;font-size:12px;margin:0;">
              You subscribed at aicareers.com · <a href="#" style="color:#6b7280;">Unsubscribe</a>
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}

async function sendLeadNotification(lead) {
  const notificationEmail = process.env.EMAIL_TO;

  if (!notificationEmail || !validator.isEmail(notificationEmail)) return;

  await sendEmail({
    to: notificationEmail,
    subject: `🔔 New Lead: ${lead.name} (${lead.source})`,
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;background:#050810;color:white;">
        <h2 style="color:#ff6b35;">New Lead Received</h2>
        <table style="border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;color:#9ca3af;">Name</td><td style="padding:8px;color:white;font-weight:bold;">${lead.name}</td></tr>
          <tr><td style="padding:8px;color:#9ca3af;">Email</td><td style="padding:8px;color:#00d9ff;">${lead.email}</td></tr>
          <tr><td style="padding:8px;color:#9ca3af;">Phone</td><td style="padding:8px;color:white;">${lead.phone || '—'}</td></tr>
          <tr><td style="padding:8px;color:#9ca3af;">Message</td><td style="padding:8px;color:white;">${lead.message || '—'}</td></tr>
          <tr><td style="padding:8px;color:#9ca3af;">Source</td><td style="padding:8px;color:#8b5cf6;">${lead.source}</td></tr>
          <tr><td style="padding:8px;color:#9ca3af;">Time</td><td style="padding:8px;color:white;">${new Date().toLocaleString('en-IN')}</td></tr>
        </table>
      </div>
    `,
  });
}

async function sendContactConfirmation(lead) {
  const frontendUrl = getFrontendUrl();

  await sendEmail({
    to: lead.email,
    subject: `Hi ${lead.name.split(' ')[0]}! We got your message 👋`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#050810;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="display:inline-block;background:linear-gradient(135deg,#ff6b35,#ec4899);border-radius:12px;padding:10px 18px;">
              <span style="color:white;font-weight:bold;font-size:18px;">⚡ AICareer</span>
            </div>
          </div>
          <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:32px;">
            <h1 style="color:white;font-size:22px;margin:0 0 16px;">Hi ${lead.name.split(' ')[0]}! 👋</h1>
            <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 20px;">
              Thanks for reaching out! We've received your message and will get back to you within <strong style="color:white;">24 hours</strong>.
            </p>
            <p style="color:#9ca3af;font-size:15px;line-height:1.7;margin:0 0 24px;">
              For a faster response, message us directly on WhatsApp:<br>
              <a href="https://wa.me/918360341355" style="color:#25d366;font-weight:bold;">+91 83603 41355</a>
            </p>
            <div style="background:rgba(255,107,53,0.08);border:1px solid rgba(255,107,53,0.2);border-radius:12px;padding:16px;margin-bottom:24px;">
              <p style="color:#ff6b35;font-weight:600;margin:0 0 8px;font-size:14px;">⏰ Limited Offer</p>
              <p style="color:#9ca3af;font-size:14px;margin:0;">The AI Career Accelerator is available at <strong style="color:white;">₹5,999</strong> (60% off). Enroll before the price goes up!</p>
            </div>
            <div style="text-align:center;">
              <a href="${frontendUrl}/#pricing" style="display:inline-block;background:linear-gradient(135deg,#ff6b35,#ec4899);color:white;text-decoration:none;font-weight:700;padding:14px 36px;border-radius:50px;">
                Enroll Now →
              </a>
            </div>
          </div>
          <p style="text-align:center;color:#4b5563;font-size:12px;margin-top:24px;">AI Career Accelerator · hello@aicareers.com</p>
        </div>
      </body>
      </html>
    `,
  });
}

async function sendTestEmail(to) {
  await sendEmail({
    to,
    subject: 'CertoMeter email test',
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px;">
        <h2>CertoMeter email test</h2>
        <p>If you received this, the deployed backend email configuration is working.</p>
        <p>Sent at ${new Date().toISOString()}</p>
      </div>
    `,
  });
}

async function sendPaymentConfirmation(order) {
  const frontendUrl = getFrontendUrl();
  await sendEmail({
    to: order.email,
    subject: `🎉 Payment Confirmed! Welcome to AI Career Accelerator`,
    html: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#050810;font-family:'Inter',Arial,sans-serif;">
        <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="display:inline-block;background:linear-gradient(135deg,#ff6b35,#ec4899);border-radius:12px;padding:10px 18px;">
              <span style="color:white;font-weight:bold;font-size:18px;">⚡ AICareer</span>
            </div>
          </div>

          <div style="background:linear-gradient(135deg,rgba(16,185,129,0.1),rgba(0,217,255,0.1));border:1px solid rgba(16,185,129,0.3);border-radius:20px;padding:32px;text-align:center;margin-bottom:24px;">
            <div style="font-size:56px;margin-bottom:16px;">🎉</div>
            <h1 style="color:white;font-size:24px;margin:0 0 8px;font-weight:700;">You're In, ${order.name.split(' ')[0]}!</h1>
            <p style="color:#10b981;font-size:16px;font-weight:600;margin:0;">Payment of ₹5,999 confirmed</p>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-bottom:24px;">
            <h3 style="color:white;font-size:15px;margin:0 0 16px;">📋 Order Summary</h3>
            <table style="width:100%;font-size:13px;">
              <tr><td style="color:#9ca3af;padding:6px 0;">Order ID</td><td style="color:white;text-align:right;">${order.razorpayOrderId}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Payment ID</td><td style="color:white;text-align:right;">${order.razorpayPaymentId}</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Amount</td><td style="color:#10b981;text-align:right;font-weight:bold;">₹5,999</td></tr>
              <tr><td style="color:#9ca3af;padding:6px 0;">Date</td><td style="color:white;text-align:right;">${new Date().toLocaleDateString('en-IN')}</td></tr>
            </table>
          </div>

          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;margin-bottom:24px;">
            <h3 style="color:white;font-size:15px;margin:0 0 16px;">🚀 What happens next?</h3>
            ${['You will receive course access within 24 hours', 'Join our Discord community', 'Start with Module 1 — AI Foundations', 'Complete your profile for personalized learning'].map((s, i) =>
              `<div style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                <div style="width:24px;height:24px;background:#ff6b35;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:11px;font-weight:bold;flex-shrink:0;">${i + 1}</div>
                <span style="color:#d1d5db;font-size:14px;">${s}</span>
              </div>`
            ).join('')}
          </div>

          <div style="text-align:center;margin-bottom:24px;">
            <a href="${frontendUrl}" style="display:inline-block;background:linear-gradient(135deg,#ff6b35,#ec4899);color:white;text-decoration:none;font-weight:700;padding:14px 36px;border-radius:50px;">
              Access Your Course →
            </a>
          </div>

          <p style="text-align:center;color:#4b5563;font-size:12px;">
            Questions? WhatsApp us: +91 83603 41355 · hello@aicareers.com
          </p>
        </div>
      </body>
      </html>
    `,
  });
}

module.exports = {
  sendWelcomeEmail,
  sendLeadNotification,
  sendContactConfirmation,
  sendPaymentConfirmation,
  sendTestEmail,
  getEmailConfigStatus,
};
