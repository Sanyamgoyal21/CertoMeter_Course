import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Clock, Shield } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import MagneticButton from '../ui/MagneticButton';
import GlowOrb from '../ui/GlowOrb';

const features = [
  '15+ hours of self-paced content',
  '100+ AI tools covered',
  'Lifetime access + all future updates',
  '5 structured learning phases',
  'Real-world projects & assignments',
  'Monthly live Q&A sessions',
  'Private Discord community (5,000+ members)',
  'Certificate of completion',
  'Resume & career guidance module',
  'AI automation workflows (Zapier, Make)',
  'Prompt engineering masterclass',
  'Freelancing & business applications',
  'Daily-use AI workflow templates',
  'Industry use cases across 10+ sectors',
  'Mobile-friendly learning',
  '30-day money-back guarantee',
];

function CountdownTimer({ expiresIn = 3 * 24 * 60 * 60 }) {
  const [remaining, setRemaining] = useState(expiresIn);

  useEffect(() => {
    const timer = setInterval(() => setRemaining((r) => Math.max(0, r - 1)), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(remaining / 3600);
  const mins = Math.floor((remaining % 3600) / 60);
  const secs = remaining % 60;

  return (
    <div className="flex items-center gap-2 justify-center">
      {[{ val: hours, label: 'hrs' }, { val: mins, label: 'min' }, { val: secs, label: 'sec' }].map(({ val, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="w-12 h-12 glass rounded-xl flex items-center justify-center border border-accent-orange/30">
            <span className="font-mono font-bold text-lg text-accent-orange">{String(val).padStart(2, '0')}</span>
          </div>
          <span className="text-xs text-gray-600 mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Pricing() {
  const { ref, isInView } = useScrollReveal();
  const [billingLoading, setBillingLoading] = useState(false);

  const handleEnroll = () => {
    setBillingLoading(true);
    setTimeout(() => {
      setBillingLoading(false);
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 800);
  };

  return (
    <section id="pricing" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#ff6b35" size={600} x="50%" y="50%" opacity={0.08} blur={120} />
      <GlowOrb color="#8b5cf6" size={400} x="10%" y="20%" opacity={0.06} />
      <GlowOrb color="#00d9ff" size={400} x="90%" y="70%" opacity={0.06} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-accent-orange uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-accent-orange/20">
            Simple, Transparent Pricing
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            One Price.{' '}
            <span className="text-gradient-orange">Everything Included.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            No subscriptions. No hidden fees. Pay once, learn forever.
          </p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm text-gray-500 mb-3 flex items-center justify-center gap-2">
            <Clock size={14} className="text-accent-orange" />
            Launch offer expires in:
          </p>
          <CountdownTimer />
        </motion.div>

        {/* Pricing card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow border */}
          <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-accent-orange via-accent-pink to-accent-purple opacity-50 blur-sm" />

          <div className="relative glass-strong rounded-3xl overflow-hidden border border-white/20">
            {/* Header band */}
            <div className="bg-gradient-to-r from-accent-orange to-accent-pink px-8 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-white" fill="white" />
                <span className="font-display font-bold text-white">AI Career Accelerator</span>
              </div>
              <span className="text-xs bg-white/20 text-white px-3 py-1 rounded-full font-semibold">MOST POPULAR</span>
            </div>

            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Left — Price + CTA */}
                <div className="space-y-6">
                  {/* Price */}
                  <div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="font-display font-bold text-6xl text-white">₹5,999</span>
                      <div className="flex flex-col">
                        <span className="text-lg text-gray-500 line-through">₹14,999</span>
                        <span className="text-sm text-accent-orange font-semibold">60% off</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">One-time payment • Lifetime access</p>
                  </div>

                  {/* Per-day math */}
                  <div className="glass rounded-2xl p-4 border border-accent-orange/20">
                    <p className="text-sm text-gray-400">
                      That's just{' '}
                      <span className="text-accent-orange font-bold text-lg">₹16/day</span>{' '}
                      for skills that will last a lifetime.
                    </p>
                    <p className="text-xs text-gray-600 mt-1">Less than a cup of chai ☕</p>
                  </div>

                  {/* CTA */}
                  <MagneticButton strength={0.2} className="w-full">
                    <button
                      onClick={handleEnroll}
                      disabled={billingLoading}
                      className="btn-primary w-full text-lg py-5 animate-glow"
                    >
                      {billingLoading ? (
                        <span className="flex items-center gap-2">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </span>
                      ) : (
                        <>
                          Enroll Now — ₹5,999
                          <span className="ml-1">→</span>
                        </>
                      )}
                    </button>
                  </MagneticButton>

                  <button
                    onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="btn-secondary w-full text-sm"
                  >
                    Pay via WhatsApp / Bank Transfer
                  </button>

                  {/* Trust */}
                  <div className="space-y-2">
                    {[
                      { icon: Shield, text: '30-day money-back guarantee' },
                      { icon: Check, text: 'Secure payment via Razorpay / UPI' },
                      { icon: Zap, text: 'Instant access after payment' },
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-gray-500">
                        <Icon size={14} className="text-green-400 shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — Features list */}
                <div>
                  <h3 className="font-display font-semibold text-white mb-4">Everything you get:</h3>
                  <div className="space-y-2.5">
                    {features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent-orange/10 border border-accent-orange/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={10} className="text-accent-orange" />
                        </div>
                        <span className="text-sm text-gray-300">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom guarantee bar */}
            <div className="px-8 py-4 bg-green-500/5 border-t border-green-500/10 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-green-400" />
                <span>30-day money-back guarantee — no questions asked</span>
              </div>
              <span className="text-gray-700">·</span>
              <span>Join 5,000+ happy learners</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
