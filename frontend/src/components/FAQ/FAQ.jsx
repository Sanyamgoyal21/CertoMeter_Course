import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import GlowOrb from '../ui/GlowOrb';

const faqs = [
  {
    q: 'Do I need any prior experience with AI or tech?',
    a: 'Absolutely not! This course is designed for complete beginners. We start from scratch — what AI is, how it works, and how to use it — before moving to advanced techniques. If you can use a smartphone, you can do this course.',
  },
  {
    q: 'How long will I have access to the course?',
    a: 'Lifetime access! Once you enroll, the course is yours forever. You also get all future updates and new modules added to the course — at no extra cost. AI is evolving rapidly, and we update the course regularly.',
  },
  {
    q: 'What if I\'m not satisfied with the course?',
    a: 'We offer a full 30-day money-back guarantee. If you watch the first few modules and don\'t find value, simply email us and we\'ll refund you 100% — no questions asked, no hoops to jump through.',
  },
  {
    q: 'How is this different from free YouTube tutorials?',
    a: 'Free content is scattered, unstructured, and quickly outdated. This course gives you a structured learning path, hands-on projects, personal community support, a verified certificate, career guidance, and regular updates. It\'s the difference between random googling and a GPS.',
  },
  {
    q: 'Will I actually learn 100+ AI tools?',
    a: 'Yes — and you won\'t just "learn about" them. You\'ll actually use them in real projects. We cover tools across writing, design, video, code, research, automation, and business. By the end, you\'ll have a personal AI toolkit you actively use daily.',
  },
  {
    q: 'How much time do I need per day?',
    a: 'The course is designed for busy professionals. Even 30-60 minutes a day is enough. It\'s fully self-paced — watch on your commute, during lunch, or before bed. Most students complete it in 2-3 weeks.',
  },
  {
    q: 'Will this course stay relevant as AI evolves?',
    a: 'We continuously update the course with new tools, prompts, and workflows. You\'re not just buying today\'s content — you\'re buying a living resource that grows with the AI landscape. That\'s part of our promise.',
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes! You receive a digital Certificate of Completion that you can add to your LinkedIn, resume, and portfolio. It includes your name, the course details, and a unique verification link.',
  },
  {
    q: 'Can I pay in EMI or installments?',
    a: 'Yes! We support EMI options through Razorpay for eligible debit/credit cards. You can also pay via UPI, bank transfer, or contact us on WhatsApp to arrange a payment plan if needed.',
  },
  {
    q: 'Is there live support if I get stuck?',
    a: 'Yes — on two levels. First, our active Discord community has 5,000+ members who can help within hours. Second, we run monthly live Q&A sessions where you can ask the instructor directly. You\'re never alone.',
  },
];

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
      >
        <span className={`font-medium transition-colors duration-200 ${open ? 'text-accent-orange' : 'text-gray-200 group-hover:text-white'}`}>
          {faq.q}
        </span>
        <div className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
          open ? 'border-accent-orange bg-accent-orange/10 rotate-0' : 'border-white/20 bg-white/5 group-hover:border-white/40'
        }`}>
          {open ? (
            <Minus size={14} className="text-accent-orange" />
          ) : (
            <Plus size={14} className="text-gray-400 group-hover:text-white" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="text-gray-400 leading-relaxed pb-5 pr-11">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#8b5cf6" size={400} x="80%" y="50%" opacity={0.07} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-accent-cyan uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-cyan/20">
            Got Questions?
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Everything You{' '}
            <span className="text-gradient-cyan">Need to Know</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Still unsure? Message us on WhatsApp — we typically reply within 15 minutes.
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-6 md:p-10 border border-white/10"
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 mb-4">Still have questions?</p>
          <a
            href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}?text=${encodeURIComponent('Hi! I have a question about the AI Career Accelerator course.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.545 5.874L.057 23.868a.5.5 0 00.612.612l5.994-1.488A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.928 0-3.73-.504-5.287-1.383l-.37-.218-3.819.948.963-3.725-.24-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
