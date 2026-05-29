import PolicyLayout, { Section, SubSection, BulletList, InfoBox } from '../components/PolicyLayout';

export default function TermsConditions() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before purchasing or using our platform."
      lastUpdated="May 29, 2025"
      metaDescription="AI Career Accelerator Terms and Conditions — eligibility, course access rights, payment terms, and governing law."
    >
      <InfoBox type="warning">
        By purchasing or accessing any course on AI Career Accelerator, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
      </InfoBox>

      <Section title="1. Definitions">
        <BulletList items={[
          '"Platform" refers to the AI Career Accelerator website and all associated services',
          '"Course" refers to any digital educational content purchased through the platform',
          '"User" or "You" refers to any individual accessing or purchasing from the platform',
          '"We", "Us", or "Company" refers to AI Career Accelerator',
          '"Content" refers to videos, documents, quizzes, assignments, and all course materials',
        ]} />
      </Section>

      <Section title="2. Eligibility">
        <BulletList items={[
          'You must be at least 18 years of age to purchase a course',
          'Users between 13–18 may access courses with verifiable parental/guardian consent',
          'You must have the legal capacity to enter into binding agreements',
          'You must provide accurate registration and payment information',
          'Corporate purchases require authorization from the purchasing entity',
          'You must not be banned or previously removed from our platform',
        ]} />
      </Section>

      <Section title="3. Account Responsibilities">
        <SubSection title="3.1 Account Security">
          <BulletList items={[
            'You are responsible for maintaining the confidentiality of your account credentials',
            'You must notify us immediately of any unauthorized access to your account',
            'You are liable for all activities that occur under your account',
            'Use a strong, unique password and enable two-factor authentication when available',
          ]} />
        </SubSection>
        <SubSection title="3.2 Accurate Information">
          <p>You agree to provide accurate, current, and complete information during registration and to keep this information updated. Providing false information may result in immediate account suspension without refund.</p>
        </SubSection>
      </Section>

      <Section title="4. Course Access Rights">
        <SubSection title="4.1 License Grant">
          <p>Upon successful payment, we grant you a <strong>limited, non-exclusive, non-transferable, personal license</strong> to access and view the purchased course content for your own educational purposes.</p>
        </SubSection>
        <SubSection title="4.2 Lifetime Access">
          <p>Lifetime access means access for as long as the platform operates and the course is available. We will provide at least 30 days' notice before removing any course you have purchased.</p>
        </SubSection>
        <SubSection title="4.3 Access Restrictions">
          <BulletList items={[
            'Course access is strictly for personal, non-commercial use only',
            'You may not share your login credentials with any other person',
            'Simultaneous login from more than 2 devices may be restricted',
            'Access from sanctioned countries may be restricted under applicable law',
          ]} />
        </SubSection>
      </Section>

      <Section title="5. Account Sharing Restrictions">
        <InfoBox type="warning">
          Account sharing is strictly prohibited and may result in permanent suspension without refund.
        </InfoBox>
        <BulletList items={[
          'Each account is licensed to a single individual only',
          'You may not sell, transfer, or sublicense your course access',
          'You may not share your login credentials with friends, colleagues, or family',
          'Corporate teams require separate licenses — contact us for group pricing',
          'We monitor login patterns and reserve the right to terminate accounts showing signs of sharing',
          'Users found sharing accounts will be permanently banned without a refund',
        ]} />
      </Section>

      <Section title="6. Intellectual Property Rights">
        <SubSection title="6.1 Our Content">
          <p>All course content, including videos, slides, code samples, worksheets, and written materials, is the exclusive intellectual property of AI Career Accelerator and is protected under Indian Copyright Law and international treaties.</p>
        </SubSection>
        <SubSection title="6.2 Prohibited Actions">
          <BulletList items={[
            'Downloading, recording, or screen-capturing course videos',
            'Reproducing or distributing course materials in any form',
            'Creating derivative works based on our content',
            'Using our content for commercial training or resale purposes',
            'Uploading our content to YouTube, Telegram, or any other platform',
            'Circumventing any technical protection measures on the platform',
          ]} />
        </SubSection>
        <SubSection title="6.3 Your Content">
          <p>Any projects, assignments, or feedback you submit remain your intellectual property. By submitting, you grant us a limited license to use, display, and share your work (with your name) for promotional purposes unless you opt out.</p>
        </SubSection>
      </Section>

      <Section title="7. Payment Terms">
        <BulletList items={[
          'All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes',
          'Payment is processed securely through Razorpay (supports UPI, cards, net banking, wallets)',
          'Course access is granted immediately upon successful payment confirmation',
          'In case of payment failure, no charges will be applied — retry your transaction',
          'Prices are subject to change without notice; enrolled students retain access at the original purchase price',
          'EMI options are available through supported banks via Razorpay',
          'For corporate invoices with GST, contact us before purchase',
        ]} />
      </Section>

      <Section title="8. Prohibited Conduct">
        <BulletList items={[
          'Using the platform for any illegal purpose or in violation of any laws',
          'Harassing, threatening, or abusing other community members or staff',
          'Spamming the community, forums, or support channels',
          'Attempting to hack, reverse-engineer, or disrupt the platform',
          'Creating false reviews or testimonials',
          'Impersonating instructors, staff, or other users',
          'Using automated bots or scripts to access the platform',
          'Engaging in any activity that damages our reputation',
        ]} />
      </Section>

      <Section title="9. Disclaimer of Warranties">
        <p>The course content is provided on an "as is" and "as available" basis. While we strive for accuracy:</p>
        <BulletList items={[
          'We do not guarantee specific career outcomes, salary increases, or job placements',
          'AI tools and technologies evolve rapidly; some content may become dated',
          'We do not warrant uninterrupted or error-free access to the platform',
          'Third-party tool availability is outside our control',
        ]} />
      </Section>

      <Section title="10. Limitation of Liability">
        <p>To the maximum extent permitted by Indian law, AI Career Accelerator's total liability for any claims arising from your use of the platform shall not exceed the amount you paid for the course in the 12 months preceding the claim.</p>
        <p className="mt-2">We are not liable for indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business opportunities.</p>
      </Section>

      <Section title="11. Termination">
        <p>We reserve the right to suspend or terminate your account without notice if you violate these Terms. Upon termination for cause (policy violation), no refund will be issued. You may request account deletion at any time by contacting support.</p>
      </Section>

      <Section title="12. Governing Law and Dispute Resolution">
        <BulletList items={[
          'These Terms are governed by the laws of India',
          'Any disputes shall first be attempted to be resolved through mutual negotiation',
          'Unresolved disputes shall be subject to arbitration under the Arbitration and Conciliation Act, 1996',
          'The courts of India shall have exclusive jurisdiction for any legal proceedings',
          'Consumer complaints may also be filed with the appropriate Consumer Forum under the Consumer Protection Act, 2019',
        ]} />
      </Section>

      <Section title="13. Changes to Terms">
        <p>We may modify these Terms at any time. Significant changes will be communicated via email 7 days before they take effect. Your continued use after changes constitute acceptance.</p>
      </Section>

      <Section title="14. Contact">
        <div className="glass rounded-xl p-5 border border-white/10 space-y-2 text-sm">
          <p><strong className="text-white">AI Career Accelerator</strong></p>
          <p>Email: <a href="mailto:hello@aicareers.com" className="text-accent-orange">hello@aicareers.com</a></p>
          <p>Phone: <a href="tel:+918360341355" className="text-accent-orange">+91 83603 41355</a></p>
          <p>For legal notices: <a href="mailto:legal@aicareers.com" className="text-accent-orange">legal@aicareers.com</a></p>
        </div>
      </Section>
    </PolicyLayout>
  );
}
