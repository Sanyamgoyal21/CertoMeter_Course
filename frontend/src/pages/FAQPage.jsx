import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import PolicyLayout from '../components/PolicyLayout';

const categories = [
  {
    label: 'Course Access',
    emoji: '🎓',
    faqs: [
      {
        q: 'How do I access the course after purchase?',
        a: 'Immediately after successful payment, you\'ll receive an email with your course access link. You can also log in directly to our platform using the email address you used during checkout. Access is granted within 60 seconds of payment confirmation.',
      },
      {
        q: 'On which devices can I access the course?',
        a: 'The course is fully accessible on all devices — desktop computers, laptops, tablets, and smartphones. You can switch between devices anytime. We recommend a desktop/laptop for the best learning experience, especially for hands-on practice sessions.',
      },
      {
        q: 'Can I download course videos for offline viewing?',
        a: 'Video downloads are not supported to protect our intellectual property. However, PDF guides, worksheets, templates, and supplementary resources are downloadable for offline reference. Videos are available for streaming anytime from your dashboard.',
      },
      {
        q: 'What happens to my access if the platform shuts down?',
        a: 'In the unlikely event that we discontinue the platform, we will provide at least 30 days\' notice. You will be offered either a full refund or downloadable versions of all course materials. We are committed to honoring our lifetime access promise.',
      },
    ],
  },
  {
    label: 'Payments',
    emoji: '💳',
    faqs: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept all major payment methods through Razorpay: UPI (PhonePe, Google Pay, Paytm, etc.), credit/debit cards (Visa, Mastercard, RuPay, Amex), net banking (all major Indian banks), mobile wallets, and EMI on eligible cards.',
      },
      {
        q: 'Is the payment secure?',
        a: 'Absolutely. All payments are processed by Razorpay, a PCI-DSS Level 1 compliant payment gateway. Your card details are never stored on our servers. The checkout uses 256-bit SSL encryption, and Razorpay uses 3D Secure authentication for added safety.',
      },
      {
        q: 'Can I pay in EMI?',
        a: 'Yes! EMI is available through Razorpay for eligible credit and debit cards. EMI options (3, 6, 9, 12 months) will be shown during checkout. Note that EMI availability depends on your bank and card type. Contact your bank for EMI-specific charges.',
      },
      {
        q: 'I was charged but didn\'t receive course access. What should I do?',
        a: 'First, check your spam/junk folder for the access email. If you still can\'t find it, WhatsApp us at +91 83603 41355 with your payment screenshot or transaction ID. We\'ll manually grant access within 2 hours during business hours.',
      },
      {
        q: 'Can I get a GST invoice?',
        a: 'Yes, we can provide a GST-compliant invoice for your purchase. Contact us at billing@aicareers.com with your GSTIN and billing details within 7 days of purchase, and we\'ll send the invoice within 2 business days.',
      },
    ],
  },
  {
    label: 'Refunds',
    emoji: '💰',
    faqs: [
      {
        q: 'What is your refund policy?',
        a: 'We offer a 7-day money-back guarantee. If you\'re not satisfied with the course for any reason, contact us within 7 days of purchase and you\'ll receive a full refund — no awkward questions asked. The only condition is that you\'ve accessed less than 10% of the course content.',
      },
      {
        q: 'How long does a refund take to process?',
        a: 'Once your refund request is approved (1–2 business days for verification), the refund is initiated within 3–5 business days. The credit appears in your account within 7–10 business days depending on your bank. UPI refunds are typically faster (2–3 business days).',
      },
      {
        q: 'I consumed more than 10% of content but I\'m unhappy. Can I still get a refund?',
        a: 'We evaluate these cases individually. If you experienced a genuine technical issue or the course was significantly different from what was advertised, please reach out to us. We may offer a partial refund or course credit depending on the circumstances.',
      },
    ],
  },
  {
    label: 'Certificate',
    emoji: '🏆',
    faqs: [
      {
        q: 'Do I get a certificate after completing the course?',
        a: 'Yes! Upon completing all course modules, you\'ll receive a digital Certificate of Completion. The certificate includes your name, course title, completion date, and a unique verification link. It\'s issued in PDF format and can be added to your LinkedIn profile, resume, and portfolio.',
      },
      {
        q: 'Is the certificate industry-recognized?',
        a: 'Our certificate is from AI Career Accelerator and is recognized by the thousands of companies whose employees have taken our course. While it\'s not a government-issued certification, it demonstrates practical AI skills which employers value highly in today\'s market.',
      },
      {
        q: 'How long does it take to receive the certificate?',
        a: 'Certificates are issued automatically within 24 hours of completing all course modules and passing the final assessment. You\'ll receive it via email and it\'ll also be available for download from your dashboard.',
      },
    ],
  },
  {
    label: 'Course Content',
    emoji: '📚',
    faqs: [
      {
        q: 'Is the course suitable for complete beginners?',
        a: 'Absolutely! The course is designed from the ground up for people with zero AI or technical background. We start with the basics — what AI is, how it works, why it matters — before progressing to advanced techniques. If you can use a smartphone, you can take this course.',
      },
      {
        q: 'How long does it take to complete the course?',
        a: 'The course contains 15+ hours of content. At 1 hour per day, you can complete it in about 3 weeks. At 2–3 hours per day, it takes about a week. It\'s completely self-paced, so you can go faster or slower based on your schedule.',
      },
      {
        q: 'Will the course be updated as AI evolves?',
        a: 'Yes — this is one of our core commitments. AI tools and techniques evolve rapidly, and we update the course regularly to stay current. As a lifetime access holder, you automatically receive all updates, new modules, and fresh content at no extra cost.',
      },
      {
        q: 'Does the course cover ChatGPT, Midjourney, and other specific tools?',
        a: 'Yes! We cover 100+ tools across all categories including ChatGPT (advanced), Claude, Gemini, Midjourney, DALL-E, Stable Diffusion, Runway, ElevenLabs, Perplexity, Notion AI, GitHub Copilot, Zapier, Make, and many more. See our full tools list on the homepage.',
      },
    ],
  },
  {
    label: 'Technical Support',
    emoji: '🔧',
    faqs: [
      {
        q: 'What if I face technical issues accessing the course?',
        a: 'First, try refreshing the page, clearing your browser cache, or trying a different browser. If the issue persists, WhatsApp us at +91 83603 41355 with a screenshot of the error. We typically resolve technical issues within 2 hours during business hours.',
      },
      {
        q: 'Is there a community or forum for questions?',
        a: 'Yes! All enrolled students get access to our private Discord community with 5,000+ active members. You can ask questions, share projects, get feedback, and connect with fellow learners. Our instructors are also active in the community and respond to questions.',
      },
    ],
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/5 last:border-0">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-4 text-left group">
        <span className={`text-sm font-medium transition-colors ${open ? 'text-accent-orange' : 'text-gray-200 group-hover:text-white'}`}>
          {faq.q}
        </span>
        <div className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${open ? 'border-accent-orange bg-accent-orange/10' : 'border-white/20 bg-white/5'}`}>
          {open ? <Minus size={12} className="text-accent-orange" /> : <Plus size={12} className="text-gray-400" />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 text-sm leading-relaxed pb-4 pr-8">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState(0);
  const totalFAQs = categories.reduce((sum, c) => sum + c.faqs.length, 0);

  return (
    <PolicyLayout
      title="Frequently Asked Questions"
      subtitle={`${totalFAQs} questions answered across ${categories.length} categories.`}
      metaDescription="AI Career Accelerator FAQ — answers about course access, payments, refunds, certificates, and technical support."
    >
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat, i) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeCategory === i
                ? 'bg-accent-orange/20 text-accent-orange border border-accent-orange/30'
                : 'glass border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            <span className="text-xs opacity-60">({cat.faqs.length})</span>
          </button>
        ))}
      </div>

      {/* FAQ list */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="glass rounded-3xl p-6 sm:p-8 border border-white/10"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">{categories[activeCategory].emoji}</span>
            <h2 className="font-display font-bold text-lg text-white">{categories[activeCategory].label}</h2>
          </div>
          <div>
            {categories[activeCategory].faqs.map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* All FAQs summary */}
      <div className="mt-8 glass rounded-2xl p-6 border border-white/10">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center">
          {categories.map((cat) => (
            <button key={cat.label} onClick={() => setActiveCategory(categories.indexOf(cat))}
              className="group cursor-pointer">
              <div className="text-2xl mb-1">{cat.emoji}</div>
              <p className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">{cat.label}</p>
              <p className="text-xs text-accent-orange font-mono">{cat.faqs.length} Q&A</p>
            </button>
          ))}
        </div>
      </div>

      {/* Still have questions */}
      <div className="mt-8 text-center glass rounded-2xl p-8 border border-white/10">
        <h3 className="font-display font-bold text-lg text-white mb-2">Still Have Questions?</h3>
        <p className="text-gray-400 text-sm mb-5">Our team is available to help. We typically reply within 15 minutes on WhatsApp.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href="https://wa.me/918360341355" target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-5 py-2.5 rounded-full transition-all text-sm">
            💬 WhatsApp Us
          </a>
          <Link to="/contact" className="btn-secondary text-sm px-5 py-2.5">
            Contact Form →
          </Link>
        </div>
      </div>
    </PolicyLayout>
  );
}
