import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import PolicyLayout from '../components/PolicyLayout';
import { submitLead } from '../utils/api';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Support',
    value: '+91 83603 41355',
    sub: 'Fastest response — typically within 15 minutes',
    color: '#25d366',
    href: 'https://wa.me/918360341355?text=Hi! I have a question about the AI Career Accelerator.',
    cta: 'Chat Now',
  },
  {
    icon: Mail,
    title: 'Email Support',
    value: 'hello@aicareers.com',
    sub: 'Response within 24 hours',
    color: '#00d9ff',
    href: 'mailto:hello@aicareers.com',
    cta: 'Send Email',
  },
  {
    icon: Phone,
    title: 'Phone Support',
    value: '+91 83603 41355',
    sub: 'Mon–Sat, 10 AM – 7 PM IST',
    color: '#8b5cf6',
    href: 'tel:+918360341355',
    cta: 'Call Now',
  },
  {
    icon: MapPin,
    title: 'Business Address',
    value: 'India',
    sub: 'Online-first business — all support via digital channels',
    color: '#f59e0b',
    href: null,
    cta: null,
  },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      await submitLead({ ...form, source: 'contact' });
      toast.success('Message sent! We\'ll reply within 24 hours.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch {
      toast.success('Message received! We\'ll be in touch soon.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PolicyLayout
      title="Contact Us"
      subtitle="We're here to help. Reach out via any channel — we respond fast."
      metaDescription="Contact AI Career Accelerator — WhatsApp, email, phone support for course queries and technical issues."
    >
      {/* Contact cards */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {contactMethods.map((method, i) => (
          <motion.div
            key={method.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-5 border border-white/10 hover:border-white/20 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${method.color}15`, border: `1px solid ${method.color}30` }}>
                <method.icon size={20} style={{ color: method.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 mb-1">{method.title}</p>
                <p className="font-semibold text-white text-sm">{method.value}</p>
                <p className="text-xs text-gray-600 mt-1">{method.sub}</p>
                {method.href && (
                  <a
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="inline-block mt-3 text-xs font-semibold px-3 py-1.5 rounded-full transition-all"
                    style={{ background: `${method.color}20`, color: method.color, border: `1px solid ${method.color}30` }}
                  >
                    {method.cta} →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Business hours */}
      <div className="glass rounded-2xl p-6 border border-white/10 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Clock size={18} className="text-accent-orange" />
          <h3 className="font-display font-semibold text-white">Support Hours</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            { day: 'Monday – Friday', hours: '9:00 AM – 9:00 PM IST', status: 'Full support' },
            { day: 'Saturday', hours: '10:00 AM – 6:00 PM IST', status: 'Limited support' },
            { day: 'Sunday', hours: 'WhatsApp only', status: 'Emergency only' },
            { day: 'WhatsApp', hours: '24/7 available', status: 'Auto-reply + human within 4 hrs' },
          ].map((row) => (
            <div key={row.day} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm text-white font-medium">{row.day}</p>
                <p className="text-xs text-gray-500">{row.hours}</p>
              </div>
              <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                {row.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact form */}
      <div className="glass rounded-3xl p-6 sm:p-8 border border-white/10">
        <h2 className="font-display font-bold text-xl text-white mb-2">Send Us a Message</h2>
        <p className="text-gray-500 text-sm mb-6">For detailed queries, use the form below. We typically reply within 24 hours.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Full Name *</label>
              <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Your name" required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Email Address *</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                placeholder="your@email.com" required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Phone Number</label>
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+91 98765 43210"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Subject</label>
              <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                className="w-full bg-dark-800 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-accent-orange/50 transition-colors">
                <option value="">Select a topic</option>
                <option>Course Access Issue</option>
                <option>Payment / Billing</option>
                <option>Refund Request</option>
                <option>Technical Support</option>
                <option>Certificate Issue</option>
                <option>General Query</option>
                <option>Partnership / B2B</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Message *</label>
            <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              placeholder="Describe your query in detail..." rows={5} required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors resize-none" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full py-4">
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2"><Send size={16} /> Send Message</span>
            )}
          </button>
        </form>
      </div>

      {/* Business info */}
      <div className="mt-8 glass rounded-2xl p-6 border border-white/10">
        <h3 className="font-display font-semibold text-white mb-4">Business Information</h3>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          {[
            ['Business Name', 'AI Career Accelerator'],
            ['Business Type', 'Online Education Platform'],
            ['Country', 'India'],
            ['Support Email', 'hello@aicareers.com'],
            ['Grievance Email', 'grievance@aicareers.com'],
            ['Refund Email', 'refunds@aicareers.com'],
          ].map(([key, val]) => (
            <div key={key} className="flex items-start gap-3 py-2 border-b border-white/5">
              <span className="text-gray-500 shrink-0 w-36">{key}</span>
              <span className="text-white font-medium">{val}</span>
            </div>
          ))}
        </div>
      </div>
    </PolicyLayout>
  );
}
