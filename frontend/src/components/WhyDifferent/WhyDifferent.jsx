import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import GlowOrb from '../ui/GlowOrb';

const highlights = [
  { icon: '🎯', title: '100+ AI Tools Covered', desc: 'Not just ChatGPT — the complete ecosystem.' },
  { icon: '🚀', title: 'Real-World Projects', desc: 'Build actual AI workflows, not toy examples.' },
  { icon: '♾️', title: 'Lifetime Access', desc: 'Yours forever, including all future updates.' },
  { icon: '📡', title: 'Live Sessions', desc: 'Monthly live Q&A with the instructor.' },
  { icon: '🤝', title: 'Community Support', desc: '5,000+ member Discord with daily activity.' },
  { icon: '🎓', title: 'Certificate', desc: 'Industry-recognized completion certificate.' },
  { icon: '💼', title: 'Resume & Career Guidance', desc: 'Land AI-adjacent roles or command higher pay.' },
  { icon: '🔄', title: 'AI Automation Techniques', desc: 'Zapier, Make, n8n — automate everything.' },
  { icon: '💡', title: 'Prompt Engineering', desc: 'Advanced techniques beyond basic prompting.' },
  { icon: '💰', title: 'Freelancing & Business', desc: 'Earn with AI — real business applications.' },
  { icon: '📅', title: 'Daily-use AI Workflows', desc: 'AI embedded into your day-to-day routine.' },
  { icon: '🏭', title: 'Industry Use Cases', desc: 'See AI applied across 10+ industries.' },
  { icon: '🌱', title: 'Beginner Friendly', desc: 'Zero prior AI knowledge required.' },
  { icon: '🔧', title: 'Practical Learning', desc: 'Hands-on every session — zero fluff.' },
  { icon: '📊', title: 'Productivity Systems', desc: 'Build your personal AI productivity stack.' },
];

const comparisonRows = [
  { feature: 'Practical hands-on projects', us: true, others: false },
  { feature: '100+ tools in one course', us: true, others: false },
  { feature: 'Lifetime access + updates', us: true, others: false },
  { feature: 'Live monthly Q&A sessions', us: true, others: false },
  { feature: 'Private community access', us: true, others: true },
  { feature: 'Certificate of completion', us: true, others: true },
  { feature: 'Career & resume guidance', us: true, others: false },
  { feature: 'AI automation workflows', us: true, others: false },
  { feature: 'Freelancing & business module', us: true, others: false },
  { feature: 'Beginner to advanced path', us: true, others: false },
];

export default function WhyDifferent() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="why" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#ff6b35" size={500} x="90%" y="50%" opacity={0.07} />
      <GlowOrb color="#8b5cf6" size={400} x="5%" y="20%" opacity={0.07} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-accent-purple uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-purple/20">
            Why Choose This
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Everything Others{' '}
            <span className="text-gradient-full">Don't Teach</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Most AI courses teach you ChatGPT basics. We teach you to build an AI-powered career.
          </p>
        </motion.div>

        {/* What you get — creative mosaic */}
        <div className="mb-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`glass rounded-2xl p-4 border border-white/10 hover:border-accent-orange/30 transition-all duration-300 cursor-default
                ${i === 0 || i === 6 ? 'col-span-2 sm:col-span-1 lg:col-span-2' : ''}
              `}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-semibold text-white text-sm leading-tight mb-1">{item.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-3xl overflow-hidden border border-white/10"
        >
          {/* Table header */}
          <div className="grid grid-cols-3 gap-4 p-6 border-b border-white/10">
            <div className="col-span-1">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Feature</h3>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-orange to-accent-pink px-4 py-2 rounded-full">
                <span className="text-white font-bold text-sm">⚡ AI Career Accelerator</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-sm text-gray-500 font-medium">Other Courses</span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-white/5">
            {comparisonRows.map((row, i) => (
              <motion.div
                key={row.feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="grid grid-cols-3 gap-4 px-6 py-4 hover:bg-white/2 transition-colors"
              >
                <div className="col-span-1 flex items-center">
                  <span className="text-sm text-gray-300">{row.feature}</span>
                </div>
                <div className="flex items-center justify-center">
                  {row.us ? (
                    <div className="w-7 h-7 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                      <Check size={14} className="text-green-400" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                      <X size={14} className="text-red-400" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center">
                  {row.others ? (
                    <div className="w-7 h-7 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
                      <Check size={14} className="text-green-400" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                      <X size={14} className="text-red-400" />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer CTA */}
          <div className="p-6 bg-gradient-to-r from-accent-orange/10 to-accent-pink/10 border-t border-white/10 text-center">
            <p className="text-white font-semibold">The choice is obvious.</p>
            <p className="text-gray-400 text-sm mt-1">Join 5,000+ learners who chose the smarter path.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
