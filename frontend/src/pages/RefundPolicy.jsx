import PolicyLayout, { Section, SubSection, BulletList, InfoBox } from '../components/PolicyLayout';

export default function RefundPolicy() {
  return (
    <PolicyLayout
      title="Cancellation & Refund Policy"
      subtitle="We stand behind the quality of our course with a 7-day satisfaction guarantee."
      lastUpdated="May 29, 2025"
      metaDescription="AI Career Accelerator Refund Policy — 7-day money-back guarantee for online AI courses."
    >
      <InfoBox type="success">
        We offer a 7-day money-back guarantee. If you're not satisfied with the course for any reason, contact us within 7 days of purchase and we'll process a full refund — no awkward questions.
      </InfoBox>

      <Section title="1. Our Refund Commitment">
        <p>At AI Career Accelerator, we are confident in the quality of our course content. We offer a straightforward refund policy designed to protect you while ensuring the sustainability of our platform.</p>
        <p className="mt-2">This policy complies with the Consumer Protection Act, 2019 (India) and Razorpay's merchant refund guidelines.</p>
      </Section>

      <Section title="2. Eligibility for Refund">
        <SubSection title="2.1 You ARE eligible for a refund if:">
          <BulletList items={[
            'Your refund request is submitted within 7 calendar days of the original purchase date',
            'You have accessed less than 10% of the total course content',
            'You have not downloaded any offline-accessible materials',
            'You have not received a completion certificate',
            'This is your first refund request on our platform',
            'You provide a brief reason for the refund (helps us improve)',
          ]} />
        </SubSection>
        <SubSection title="2.2 You are NOT eligible for a refund if:">
          <BulletList items={[
            'More than 7 calendar days have passed since your purchase date',
            'You have consumed more than 10% of the course content',
            'You have downloaded course materials or certificates',
            'The refund request is for a course purchased during a promotional/discounted sale (unless defective)',
            'You have previously received a refund on our platform',
            'Your account has been suspended due to policy violations',
            'The purchase was made through a third-party reseller',
          ]} />
        </SubSection>
      </Section>

      <Section title="3. How to Request a Refund">
        <p>To initiate a refund, follow these steps:</p>
        <div className="space-y-3 mt-3">
          {[
            { step: '01', title: 'Contact Us', desc: 'Email refunds@aicareers.com or WhatsApp +91 83603 41355 within 7 days of purchase.' },
            { step: '02', title: 'Provide Details', desc: 'Include your full name, registered email, Order ID (from your payment confirmation email), and reason for refund.' },
            { step: '03', title: 'Verification', desc: 'We will verify your eligibility by checking course access logs and consumption percentage within 2 business days.' },
            { step: '04', title: 'Approval & Processing', desc: 'Approved refunds are processed within 7–10 business days to your original payment method.' },
          ].map((item) => (
            <div key={item.step} className="flex gap-4 glass rounded-xl p-4 border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center shrink-0">
                <span className="text-accent-orange font-mono font-bold text-sm">{item.step}</span>
              </div>
              <div>
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="4. Refund Processing Timeline">
        <div className="glass rounded-xl border border-white/10 overflow-hidden mt-3">
          <table>
            <thead><tr><th>Stage</th><th>Timeline</th></tr></thead>
            <tbody>
              {[
                ['Refund request acknowledgement', 'Within 24 hours'],
                ['Eligibility verification', '1–2 business days'],
                ['Refund approval/rejection notification', '2–3 business days'],
                ['Refund initiation to Razorpay', '3–5 business days'],
                ['Credit to your account/card', '7–10 business days (bank dependent)'],
              ].map(([s, t]) => (
                <tr key={s}><td>{s}</td><td className="text-accent-cyan font-mono">{t}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <InfoBox type="info">
          Refunds are processed to the original payment instrument. UPI refunds typically credit within 2–3 business days. Credit/debit card refunds may take up to 10 business days depending on your bank.
        </InfoBox>
      </Section>

      <Section title="5. Course Cancellation">
        <SubSection title="5.1 Cancellation Before Access">
          <p>If you wish to cancel your purchase immediately after payment and before accessing any content, contact us within 2 hours for a same-day full refund with no questions asked.</p>
        </SubSection>
        <SubSection title="5.2 Live Session Cancellation">
          <p>If you have registered for a live Q&A session and cannot attend, notify us at least 4 hours in advance. Sessions are recorded and made available within 24 hours for enrolled students.</p>
        </SubSection>
      </Section>

      <Section title="6. Technical Issues">
        <p>If you experience technical issues preventing course access (not related to your device or internet connection), we will:</p>
        <BulletList items={[
          'First attempt to resolve the technical issue within 48 hours',
          'Extend your course access period by the duration of the disruption',
          'Offer a full refund if we are unable to resolve the issue within 7 days',
          'Not count downtime as part of your refund eligibility period',
        ]} />
      </Section>

      <Section title="7. Fraudulent Refund Requests">
        <InfoBox type="warning">
          We take fraud seriously. Attempting to obtain a refund through false claims is a violation of our Terms and may result in account termination and reporting to relevant authorities.
        </InfoBox>
        <p>We reserve the right to reject refund requests that show evidence of:</p>
        <BulletList items={[
          'Significant course consumption while claiming minimal access',
          'Multiple accounts created to circumvent the one-refund policy',
          'Chargebacks filed without first contacting our support team',
          'Refund requests accompanied by abusive or threatening behavior',
          'Coordinated refund fraud with multiple users',
        ]} />
      </Section>

      <Section title="8. Chargebacks">
        <p>If you initiate a chargeback with your bank without first contacting us for a refund, we will contest the chargeback with evidence of course access. We strongly recommend contacting our support team first — we resolve most issues quickly and amicably.</p>
        <p className="mt-2">Successful chargebacks without merit may result in permanent account ban and legal action for recovery of disputed amounts.</p>
      </Section>

      <Section title="9. Contact for Refunds">
        <div className="glass rounded-xl p-5 border border-white/10 space-y-2 text-sm">
          <p><strong className="text-white">Refund Support — AI Career Accelerator</strong></p>
          <p>Email: <a href="mailto:refunds@aicareers.com" className="text-accent-orange">refunds@aicareers.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/918360341355" target="_blank" rel="noreferrer" className="text-accent-orange">+91 83603 41355</a></p>
          <p>Response Time: Within 24 hours (Mon–Sat, 9 AM – 6 PM IST)</p>
          <p className="text-gray-500 text-xs mt-2">Please include your Order ID in all refund communications for faster processing.</p>
        </div>
      </Section>
    </PolicyLayout>
  );
}
