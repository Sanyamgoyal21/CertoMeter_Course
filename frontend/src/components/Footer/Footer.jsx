import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Youtube, Send } from 'lucide-react';
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
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund-policy' },
    { label: 'Shipping Policy', href: '/shipping-policy' },
  ],
};

const socials = [
  { icon: Twitter, label: 'Twitter', href: 'https://x.com/sanyamgoyal21' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/sanyam3651?igsh=MXhjdGR5eGp4YnVjaw==' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/sanyam-goyal-9a0b2a244?utm_source=share_via&utm_content=profile&utm_medium=member_android' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtu.be/kxFGS0s2AyA?si=LVtzyM-vmqmWN2Tz' },
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
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                <img src="/Logo.png" alt="AI Career Accelerator" className="w-full h-full object-cover" style={{ transform: 'scale(1.45)', transformOrigin: 'center' }} />
              </div>
              <span className="font-display font-bold text-lg text-white">
                AI Career Accelerator
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
                  target="_blank"
                  rel="noopener noreferrer"
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
                      ) : item.href.startsWith('/') ? (
                        <Link to={item.href} className="text-sm text-gray-600 hover:text-gray-300 transition-colors">
                          {item.label}
                        </Link>
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
            © 2026 AI Career Accelerator. All rights reserved. Made with ❤️ for curious minds.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-700">
            <Link to="/privacy-policy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link to="/refund-policy" className="hover:text-gray-400 transition-colors">Refunds</Link>
            <Link to="/shipping-policy" className="hover:text-gray-400 transition-colors">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
