import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import { subscribeNewsletter } from '../../utils/api';

const links = {
  Course: [
    { label: 'About the Course', href: '#about' },
    { label: 'Curriculum', href: '#about' },
    { label: 'AI Tools List', href: '#tools' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Certificate', href: '#why' },
    { label: 'FAQ', href: '#faq' },
  ],
  Community: [
    { label: 'Discord Community', href: '#community' },
    { label: 'Live Sessions', href: '#community' },
    { label: 'Student Projects', href: '#community' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Instructor', href: '#about' },
    { label: 'Blog', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'WhatsApp Support', href: `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999'}` },
    { label: 'Refund Policy', href: '#faq' },
    { label: 'Help Center', href: '#contact' },
    { label: 'Affiliate Program', href: '#contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
    { label: 'Disclaimer', href: '#' },
  ],
};

const socials = [
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      await subscribeNewsletter(email);
      toast.success('Subscribed! Check your email for a welcome gift 🎁');
      setEmail('');
    } catch {
      toast.success('Subscribed! Watch for our next email.');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center">
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                AI<span className="text-accent-orange">Career</span>
              </span>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The complete AI education platform for professionals, students, and entrepreneurs
              who want to thrive in the age of artificial intelligence.
            </p>

            {/* Newsletter */}
            <div>
              <p className="text-sm font-semibold text-white mb-3">Get weekly AI tips — free</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-orange/50 transition-colors min-w-0"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-accent-orange hover:bg-accent-orange-light text-white px-4 py-2.5 rounded-xl transition-colors shrink-0"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </form>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 glass rounded-xl border border-white/10 flex items-center justify-center hover:border-white/30 hover:text-white text-gray-500 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(links).map(([category, items]) => (
              <div key={category}>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{category}</h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item.label}>
                      {item.href.startsWith('#') && item.href.length > 1 ? (
                        <button
                          onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-sm text-gray-600 hover:text-gray-300 transition-colors text-left"
                        >
                          {item.label}
                        </button>
                      ) : (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-gray-600 hover:text-gray-300 transition-colors"
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">
            © 2025 AI Career Accelerator. All rights reserved. Made with ❤️ for curious minds.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-700">
            <span className="hover:text-gray-500 transition-colors cursor-default">Privacy</span>
            <span className="hover:text-gray-500 transition-colors cursor-default">Terms</span>
            <span className="hover:text-gray-500 transition-colors cursor-default">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
