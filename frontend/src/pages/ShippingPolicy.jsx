import PolicyLayout, { Section, SubSection, BulletList, InfoBox } from '../components/PolicyLayout';
import { Package, Zap, Mail, Monitor } from 'lucide-react';

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title="Shipping & Delivery Policy"
      subtitle="All our products are digital — no physical shipping involved."
      lastUpdated="May 29, 2025"
      metaDescription="AI Career Accelerator Shipping and Delivery Policy — instant digital course delivery after payment."
    >
      <InfoBox type="success">
        AI Career Accelerator sells exclusively digital products. There is no physical product, no shipping charge, and no delivery wait time. You get instant access upon successful payment.
      </InfoBox>

      <Section title="1. Nature of Product">
        <p>AI Career Accelerator provides <strong>100% digital educational products</strong>, including:</p>
        <BulletList items={[
          'Online video course content (streamed on-demand)',
          'Downloadable PDF guides, worksheets, and templates',
          'Access to live Q&A session recordings',
          'Digital completion certificate (PDF format)',
          'Community access (Discord/online forum)',
          'AI tool tutorials and workflow templates',
        ]} />
        <p className="mt-3">No physical goods, books, DVDs, USB drives, or any tangible materials are sold or shipped. No shipping charges will ever be applied to your order.</p>
      </Section>

      <Section title="2. Delivery Method">
        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          {[
            {
              icon: Zap,
              title: 'Instant Platform Access',
              desc: 'Your course is immediately accessible in your student dashboard upon payment confirmation.',
              color: '#ff6b35',
            },
            {
              icon: Mail,
              title: 'Email Confirmation',
              desc: 'A payment receipt and course access link are sent to your registered email address within 5 minutes.',
              color: '#00d9ff',
            },
            {
              icon: Monitor,
              title: 'Multi-Device Access',
              desc: 'Access your course from any device — desktop, laptop, tablet, or smartphone — at any time.',
              color: '#8b5cf6',
            },
            {
              icon: Package,
              title: 'Downloadable Materials',
              desc: 'Supplementary PDFs, templates, and resources are available for download from your dashboard.',
              color: '#10b981',
            },
          ].map((item) => (
            <div key={item.title} className="glass rounded-xl p-5 border border-white/10">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: `${item.color}20`, border: `1px solid ${item.color}30` }}>
                <item.icon size={18} style={{ color: item.color }} />
              </div>
              <h3 className="font-semibold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="3. Delivery Timeline">
        <div className="glass rounded-xl border border-white/10 overflow-hidden mt-3">
          <table>
            <thead><tr><th>Delivery Item</th><th>Delivery Time</th></tr></thead>
            <tbody>
              {[
                ['Course access (platform)', 'Immediate — within 60 seconds of payment'],
                ['Email confirmation & receipt', 'Within 5 minutes of payment'],
                ['Course access link via email', 'Within 5–10 minutes'],
                ['Downloadable materials', 'Immediately upon course access'],
                ['Completion certificate', 'Within 24 hours of course completion'],
                ['Live session recordings', 'Within 24 hours of the live session'],
              ].map(([item, time]) => (
                <tr key={item}><td>{item}</td><td className="text-green-400 font-mono text-xs">{time}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="4. Access Requirements">
        <SubSection title="4.1 Technical Requirements">
          <BulletList items={[
            'A stable internet connection (minimum 2 Mbps recommended for HD video)',
            'A modern web browser (Chrome, Firefox, Safari, or Edge — latest version)',
            'JavaScript must be enabled in your browser',
            'Minimum screen resolution of 1024×768 pixels recommended',
            'For mobile access: iOS 12+ or Android 8+ recommended',
          ]} />
        </SubSection>
        <SubSection title="4.2 Email Access">
          <p>Ensure your registered email address is correct before purchase. Course access emails may occasionally land in your spam/junk folder. Add <strong>hello@aicareers.com</strong> to your contacts to prevent this.</p>
        </SubSection>
      </Section>

      <Section title="5. Delayed or Missing Access">
        <p>In the rare event that you do not receive course access within 30 minutes of payment:</p>
        <BulletList items={[
          'Check your spam/junk email folder',
          'Verify your registered email address is correct',
          'Check if your payment was successfully processed (check bank statement)',
          'Contact our support team via WhatsApp or email with your Order ID',
          'We will manually grant access within 2 hours during business hours',
        ]} />
        <InfoBox type="info">
          Payment processing delays from your bank may occasionally delay access. If your payment shows as "pending" in Razorpay, access will be granted once the payment clears (typically within 2–4 hours).
        </InfoBox>
      </Section>

      <Section title="6. International Access">
        <p>Our digital courses are accessible from anywhere in the world with an internet connection. However:</p>
        <BulletList items={[
          'Course content is primarily in English (with Hindi explanations where noted)',
          'Pricing is in Indian Rupees (INR)',
          'Razorpay supports international cards for payment',
          'Currency conversion fees are charged by your bank, not us',
          'Live sessions are conducted in IST (Indian Standard Time)',
        ]} />
      </Section>

      <Section title="7. Contact for Delivery Issues">
        <div className="glass rounded-xl p-5 border border-white/10 space-y-2 text-sm">
          <p><strong className="text-white">Delivery Support — AI Career Accelerator</strong></p>
          <p>Email: <a href="mailto:support@aicareers.com" className="text-accent-orange">support@aicareers.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/918360341355" target="_blank" rel="noreferrer" className="text-accent-orange">+91 83603 41355</a></p>
          <p>Response Time: Within 2 hours during business hours (Mon–Sat, 9 AM – 9 PM IST)</p>
        </div>
      </Section>
    </PolicyLayout>
  );
}
