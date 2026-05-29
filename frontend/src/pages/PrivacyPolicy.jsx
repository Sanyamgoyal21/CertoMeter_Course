import PolicyLayout, { Section, SubSection, BulletList, InfoBox } from '../components/PolicyLayout';

export default function PrivacyPolicy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your personal information."
      lastUpdated="May 29, 2025"
      metaDescription="AI Career Accelerator Privacy Policy — learn how we collect, use and protect your data."
    >
      <InfoBox type="info">
        This Privacy Policy applies to AI Career Accelerator ("we", "us", "our") and governs data collection and usage in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
      </InfoBox>

      <Section title="1. Information We Collect">
        <SubSection title="1.1 Personal Information You Provide">
          <p>When you register, purchase, or contact us, we collect:</p>
          <BulletList items={[
            'Full name and email address',
            'Phone number (optional but required for WhatsApp support)',
            'Billing address and payment details (processed securely via Razorpay)',
            'Profile information and learning preferences',
            'Messages and communications sent to us',
          ]} />
        </SubSection>
        <SubSection title="1.2 Automatically Collected Information">
          <p>When you use our platform, we automatically collect:</p>
          <BulletList items={[
            'IP address and approximate geographic location',
            'Browser type, version, and operating system',
            'Device type and screen resolution',
            'Pages visited, time spent, and navigation patterns',
            'Referring website or source',
            'Session identifiers and cookies',
          ]} />
        </SubSection>
      </Section>

      <Section title="2. Payment Information">
        <p>All payment transactions are processed by <strong>Razorpay Software Private Limited</strong>, a PCI-DSS compliant payment gateway.</p>
        <BulletList items={[
          'We do NOT store your credit/debit card numbers, CVV, or net banking credentials on our servers',
          'Payment data is encrypted using industry-standard SSL/TLS technology',
          'Razorpay processes your payment information under their own Privacy Policy',
          'We only receive a transaction confirmation and partial payment details (last 4 digits) for order fulfillment',
          'UPI IDs used for payment are not stored beyond transaction verification',
        ]} />
        <InfoBox type="warning">
          Never share your OTP, CVV, or full card number with anyone, including us. We will never ask for this information.
        </InfoBox>
      </Section>

      <Section title="3. How We Use Your Information">
        <BulletList items={[
          'To process your course enrollment and provide access to purchased content',
          'To send course access credentials, receipts, and important updates',
          'To send weekly newsletter and educational content (you can unsubscribe anytime)',
          'To respond to customer support queries and technical issues',
          'To improve our platform based on usage analytics',
          'To detect and prevent fraudulent transactions or abuse',
          'To comply with legal obligations under Indian law',
          'To send promotional offers (only with your consent)',
        ]} />
      </Section>

      <Section title="4. Cookies and Analytics">
        <SubSection title="4.1 Types of Cookies">
          <BulletList items={[
            'Essential Cookies: Required for platform functionality (login sessions, cart)',
            'Analytics Cookies: Help us understand usage patterns (Google Analytics)',
            'Preference Cookies: Remember your settings and preferences',
            'Marketing Cookies: Used to show relevant content (only with consent)',
          ]} />
        </SubSection>
        <SubSection title="4.2 Cookie Control">
          <p>You can control cookies through your browser settings. Disabling essential cookies may affect platform functionality. We use session storage for temporary visitor identification that expires when you close your browser.</p>
        </SubSection>
      </Section>

      <Section title="5. Third-Party Services">
        <p>We integrate with the following third-party services, each with their own privacy policies:</p>
        <div className="glass rounded-xl border border-white/10 overflow-hidden mt-3">
          <table>
            <thead><tr><th>Service</th><th>Purpose</th></tr></thead>
            <tbody>
              {[
                ['Razorpay', 'Secure payment processing'],
                ['MongoDB Atlas', 'Secure data storage (India/Singapore region)'],
                ['Brevo (Sendinblue)', 'Transactional email delivery'],
                ['Google Analytics', 'Website usage analytics (anonymized)'],
                ['WhatsApp Business', 'Customer support communication'],
              ].map(([s, p]) => (
                <tr key={s}><td className="font-medium text-white">{s}</td><td>{p}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="6. Data Storage and Security">
        <BulletList items={[
          'Your data is stored on secure, encrypted servers hosted by MongoDB Atlas',
          'We implement HTTPS/TLS encryption for all data transmission',
          'Access to personal data is restricted to authorized personnel only',
          'We conduct regular security audits and vulnerability assessments',
          'Data backups are encrypted and stored securely',
          'We follow ISO 27001 best practices for information security',
        ]} />
        <p className="mt-3">While we implement industry-standard security measures, no system is 100% secure. In the event of a data breach, we will notify affected users within 72 hours as required by applicable law.</p>
      </Section>

      <Section title="7. Data Retention">
        <BulletList items={[
          'Account data: Retained for the duration of your account and 3 years after deletion',
          'Transaction records: Retained for 7 years as required by Indian tax laws',
          'Support communications: Retained for 2 years',
          'Marketing preferences: Until you unsubscribe or request deletion',
          'Analytics data: Retained in anonymized form for up to 2 years',
        ]} />
      </Section>

      <Section title="8. Your Rights">
        <p>Under applicable Indian privacy laws, you have the right to:</p>
        <BulletList items={[
          'Access: Request a copy of the personal data we hold about you',
          'Correction: Request correction of inaccurate personal data',
          'Deletion: Request deletion of your personal data (subject to legal obligations)',
          'Portability: Receive your data in a structured, machine-readable format',
          'Objection: Object to processing of your personal data for marketing purposes',
          'Withdraw Consent: Withdraw consent for optional data processing at any time',
        ]} />
        <p className="mt-3">To exercise these rights, email us at <strong>privacy@aicareers.com</strong> with the subject "Data Request — [Your Name]". We will respond within 30 days.</p>
      </Section>

      <Section title="9. Children's Privacy">
        <p>Our services are not directed to children under 18 years of age. We do not knowingly collect personal information from minors. If you believe a minor has provided us personal data, please contact us immediately and we will delete such information promptly.</p>
      </Section>

      <Section title="10. Changes to This Policy">
        <p>We may update this Privacy Policy periodically. We will notify you of significant changes via email or a prominent notice on our website at least 7 days before changes take effect. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
      </Section>

      <Section title="11. Contact Information">
        <p>For privacy-related queries, concerns, or requests:</p>
        <div className="glass rounded-xl p-5 border border-white/10 mt-3 space-y-2 text-sm">
          <p><strong className="text-white">AI Career Accelerator</strong></p>
          <p>Email: <a href="mailto:privacy@aicareers.com">privacy@aicareers.com</a></p>
          <p>Phone: <a href="tel:+918360341355">+91 83603 41355</a></p>
          <p>Address: India</p>
          <p>Grievance Officer: Sanyam Goyal — <a href="mailto:sanyamgoyal21@gmail.com">sanyamgoyal21@gmail.com</a></p>
        </div>
      </Section>
    </PolicyLayout>
  );
}
