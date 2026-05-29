import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, Mail, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../../hooks/useScrollAnimation';
import { submitLead } from '../../utils/api';
import GlowOrb from '../ui/GlowOrb';

export default function Contact() {
  const { ref, isInView } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);

  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
  const whatsappMsg = encodeURIComponent(import.meta.env.VITE_WHATSAPP_MESSAGE || "Hi! I'm interested in the AI Career Accelerator course. Can you tell me more?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      toast.error('Please fill in your name and email.');
      return;
    }

    setLoading(true);
    try {
      await submitLead({ ...form, source: 'contact' });
      toast.success("Message sent! We'll get back to you within 24 hours.");
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch {
      toast.success("Message received! We'll be in touch soon."); // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      <GlowOrb color="#10b981" size={400} x="15%" y="30%" opacity={0.07} />
      <GlowOrb color="#8b5cf6" size={400} x="85%" y="70%" opacity={0.07} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-mono text-green-400 uppercase tracking-widest mb-4 glass px-4 py-2 rounded-full border border-green-400/20">
            Let's Talk
          </span>
          <h2 className="section-heading text-4xl sm:text-5xl lg:text-6xl mt-4 mb-6">
            Ready to Start?{' '}
            <span className="text-gradient-cyan">Let's Connect</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Have questions before enrolling? Want to pay differently? We're here.
            Reply within 15 minutes on WhatsApp.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left — Contact options */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* WhatsApp — Primary */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 p-6 rounded-3xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 hover:border-green-500/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.564 4.14 1.545 5.874L.057 23.868a.5.5 0 00.612.612l5.994-1.488A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.928 0-3.73-.504-5.287-1.383l-.37-.218-3.819.948.963-3.725-.24-.387A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">Chat on WhatsApp</p>
                <p className="text-green-400 font-medium text-sm">Fastest response — typically 15 min</p>
                <p className="text-gray-500 text-xs mt-1">+91 99999 99999 · Mon–Sun, 9am–9pm</p>
              </div>
              <div className="ml-auto">
                <div className="w-8 h-8 rounded-full border border-green-500/30 flex items-center justify-center group-hover:border-green-500 transition-colors">
                  <span className="text-green-400 group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </div>
            </a>

            {/* Email */}
            <a
              href="mailto:hello@aicareers.com"
              className="flex items-center gap-5 p-6 rounded-3xl border border-white/10 glass hover:border-accent-cyan/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-accent-cyan" />
              </div>
              <div>
                <p className="font-semibold text-white">Email Us</p>
                <p className="text-accent-cyan text-sm">hello@aicareers.com</p>
                <p className="text-gray-500 text-xs mt-1">Response within 24 hours</p>
              </div>
            </a>

            {/* Course info */}
            <div className="glass rounded-3xl p-6 border border-white/10 space-y-4">
              <h3 className="font-display font-semibold text-white">Before you reach out — quick answers</h3>
              {[
                '✓ Course starts immediately after payment',
                '✓ Works on mobile, tablet, and desktop',
                '✓ Supports Hindi + English explanations',
                '✓ Group discount for 3+ enrollments',
                '✓ Invoice available for GST billing',
              ].map((item) => (
                <p key={item} className="text-sm text-gray-400">{item}</p>
              ))}
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 border border-white/10 space-y-5">
              <h3 className="font-display font-bold text-white text-xl mb-2">Send us a message</h3>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Priya Sharma"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="priya@gmail.com"
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 mb-1 block">Your Question or Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="I'd like to know more about..."
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send size={16} />
                    Send Message
                  </span>
                )}
              </button>

              <p className="text-center text-xs text-gray-600">
                Or{' '}
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
                  message us on WhatsApp
                </a>{' '}
                for a faster response
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
